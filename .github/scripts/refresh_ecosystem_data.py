#!/usr/bin/env python3
"""Refresh ecosystem client/server data: repo archived status, dead links, and
diffs from a maintainer's optional `doap_url` file (doc/ecosystem-doap-extension.md).
Only flat fields (maturity, licence, room) are rewritten; everything else is reported
for a human to apply. Run weekly by refresh-ecosystem-data.yml.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import tomllib
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any
from urllib.parse import quote, unquote, urlparse
from xml.etree import ElementTree as ET

TomlTable = dict[str, Any]

CLIENTS_DIR = Path("content/ecosystem/clients")
SERVERS_FILE = Path("content/ecosystem/servers/servers.toml")

GITHUB_API = "https://api.github.com/repos/{owner}/{repo}"
GITLAB_API = "https://gitlab.com/api/v4/projects/{path}"
USER_AGENT = "matrix-org-ecosystem-refresh/1.0"

DOAP_NS = {
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "doap": "http://usefulinc.com/ns/doap#",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "matrix": "https://matrix.org/ns/ecosystem#",
    # Client vs. server feature support live in their own namespaces rather than
    # a shared element with a type attribute, so which one applies is inherent
    # to the tag rather than something to check separately.
    "matrix_client": "https://matrix.org/ns/ecosystem/client#",
    "matrix_server": "https://matrix.org/ns/ecosystem/server#",
}
# "unknown" is deliberately not a value here - it's what a feature means when a
# DOAP file simply doesn't mention it, not something to assert explicitly.
FEATURE_STATUSES = {"supported", "partial", "unsupported"}
FEATURE_KINDS = ("client", "server")
FEATURE_PREFIX = {"client": "matrix_client", "server": "matrix_server"}
# https://spec.matrix.org/v1.18/appendices/#matrix-uri-scheme
MATRIX_URI_ROOM_SIGILS = {"r": "#", "roomid": "!"}
# Keep in sync with the feature keys under [extra.features] documented in CONTENT.md.
KNOWN_FEATURES: dict[str, set[str]] = {
    "client": {
        "e2ee",
        "spaces",
        "voip_1to1",
        "threads",
        "sso",
        "voip_jitsi",
        "multi_account",
        "multi_language",
        "oauth",
        "invisible_crypto",
        "voip_matrixrtc",
        "sliding_sync",
    },
    "server": set(),  # servers don't have a published feature matrix yet
}


@dataclass
class CategoryConfig:
    kind: str  # "client" or "server" - selects which matrix:SupportedFeature apply
    repo_field: str
    licence_field: str
    maturity_field: str
    doap_field: str
    room_field: str


CLIENT_CONFIG = CategoryConfig(
    kind="client",
    repo_field="repo",
    licence_field="licence",
    maturity_field="maturity",
    doap_field="doap_url",
    room_field="matrix_room",
)
SERVER_CONFIG = CategoryConfig(
    kind="server",
    repo_field="repository",
    licence_field="licence",
    maturity_field="maturity",
    doap_field="doap_url",
    room_field="room",
)


@dataclass
class FieldEdit:
    field: str
    old: str | None
    new: str
    reason: str


@dataclass
class EntryReport:
    location: str
    edits: list[FieldEdit] = field(default_factory=list)
    findings: list[str] = field(default_factory=list)


# HTTP


def http_get(
    url: str, headers: dict[str, str] | None = None, timeout: float = 10.0
) -> tuple[int, bytes]:
    """GET a URL. Returns (0, b"") on network errors rather than raising."""
    request = urllib.request.Request(
        url, headers={"User-Agent": USER_AGENT, **(headers or {})}
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as error:
        return error.code, b""
    except (urllib.error.URLError, TimeoutError):
        return 0, b""


def is_dead_link(url: str) -> bool | None:
    """True if the URL is confirmed gone (404/410). None if we can't tell."""
    status, _ = http_get(url)
    if status == 0:
        return None
    return status in (404, 410)


# Repo archived-status check - GitHub/GitLab only. Other forges and VCS systems
# (Codeberg, sourcehut, self-hosted Gitea, ...) are skipped here, not treated as
# an error; dead-link checking above still covers them regardless of host.


def repo_host(url: str) -> tuple[str, str] | None:
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return None
    if parsed.netloc == "github.com":
        parts = path.split("/")
        if len(parts) >= 2:
            return "github", f"{parts[0]}/{parts[1]}"
    elif parsed.netloc == "gitlab.com":
        return "gitlab", path
    return None


def is_archived(repo_url: str, github_token: str | None) -> bool | None:
    host = repo_host(repo_url)
    if host is None:
        return None
    kind, ident = host
    if kind == "github":
        owner, name = ident.split("/", 1)
        headers = {"Accept": "application/vnd.github+json"}
        if github_token:
            headers["Authorization"] = f"Bearer {github_token}"
        status, body = http_get(GITHUB_API.format(owner=owner, repo=name), headers)
    else:
        status, body = http_get(GITLAB_API.format(path=quote(ident, safe="")))
    if status != 200:
        return None
    return bool(json.loads(body).get("archived", False))


# DOAP


def slugify(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", value).strip("_") or "entry"


def fetch_doap_bytes(url: str, cache_key: str, cache_dir: Path) -> bytes | None:
    """Fetch a DOAP file, using the cache only to bridge transient failures."""
    cache_file = cache_dir / f"{slugify(cache_key)}.xml"
    status, body = http_get(url)
    if status == 200 and body:
        cache_file.write_bytes(body)
        return body
    if status in (404, 410):
        # Authoritative "gone" (e.g. removed for moderation) - never resurrect
        # deliberately removed content from the cache.
        cache_file.unlink(missing_ok=True)
        return None
    if cache_file.exists():
        return cache_file.read_bytes()
    return None


def parse_matrix_room_uri(uri: str) -> str | None:
    """ "matrix:r/foo:example.org" -> "#foo:example.org" (or matrix:roomid/... -> "!...").
    Returns None for anything that isn't a room-alias/room-id matrix: URI."""
    parsed = urlparse(uri)
    if parsed.scheme != "matrix":
        return None
    segments = parsed.path.strip("/").split("/")
    if len(segments) != 2:
        return None
    kind, identifier = segments
    sigil = MATRIX_URI_ROOM_SIGILS.get(kind)
    if not sigil or not identifier:
        return None
    return sigil + unquote(identifier)


def validate_doap(root: ET.Element) -> list[str]:
    errors = []
    project = root.find("doap:Project", DOAP_NS)
    if project is None:
        return ["missing <doap:Project> element"]
    for kind in FEATURE_KINDS:
        prefix = FEATURE_PREFIX[kind]
        for supported in project.findall(f"{prefix}:SupportedFeature", DOAP_NS):
            feature = supported.get("feature")
            status = supported.get("status")
            if not feature:
                errors.append(
                    f"{prefix}:SupportedFeature is missing the feature attribute"
                )
            if status not in FEATURE_STATUSES:
                errors.append(
                    f"{prefix}:SupportedFeature has invalid status {status!r}"
                )
    return errors


def doap_warnings(root: ET.Element) -> list[str]:
    """Non-fatal issues: flagged for review but don't invalidate the whole file."""
    warnings: list[str] = []
    project = root.find("doap:Project", DOAP_NS)
    if project is None:
        return warnings

    room = project.find("matrix:room", DOAP_NS)
    if (
        room is not None
        and room.text
        and parse_matrix_room_uri(room.text.strip()) is None
    ):
        warnings.append(
            f"matrix:room {room.text.strip()!r} isn't a valid matrix: URI (expected e.g. "
            f"'matrix:r/your-room:example.org' - see "
            f"https://spec.matrix.org/v1.18/appendices/#matrix-uri-scheme) - ignored"
        )

    for kind in FEATURE_KINDS:
        prefix = FEATURE_PREFIX[kind]
        for supported in project.findall(f"{prefix}:SupportedFeature", DOAP_NS):
            name = supported.get("feature")
            if name and name not in KNOWN_FEATURES[kind]:
                warnings.append(
                    f"{prefix}:SupportedFeature declares unknown feature {name!r} "
                    f"(check for typos - it will be ignored)"
                )
    return warnings


def parse_doap(root: ET.Element) -> TomlTable | None:
    project = root.find("doap:Project", DOAP_NS)
    if project is None:
        return None

    def text(tag: str) -> str | None:
        element = project.find(tag, DOAP_NS)
        return element.text.strip() if element is not None and element.text else None

    def resource(tag: str) -> str | None:
        element = project.find(tag, DOAP_NS)
        return (
            element.get(f"{{{DOAP_NS['rdf']}}}resource")
            if element is not None
            else None
        )

    licence = None
    licence_resource = resource("doap:license")
    spdx_prefix = "https://spdx.org/licenses/"
    if licence_resource and licence_resource.startswith(spdx_prefix):
        licence = licence_resource.removeprefix(spdx_prefix)

    features: dict[str, dict[str, str]] = {kind: {} for kind in FEATURE_KINDS}
    for kind in FEATURE_KINDS:
        prefix = FEATURE_PREFIX[kind]
        for supported in project.findall(f"{prefix}:SupportedFeature", DOAP_NS):
            name = supported.get("feature")
            status = supported.get("status")
            if name in KNOWN_FEATURES[kind] and status in FEATURE_STATUSES:
                features[kind][name] = status

    room_uri = text("matrix:room")

    return {
        "name": text("doap:name"),
        "shortdesc": text("doap:shortdesc"),
        "licence": licence,
        "room": parse_matrix_room_uri(room_uri) if room_uri else None,
        "features": features,
    }


def fetch_and_parse_doap(
    url: str, cache_key: str, cache_dir: Path
) -> tuple[TomlTable | None, list[str]]:
    """Returns (parsed data or None, issues) - issues covers both fetch/parse
    failures and non-fatal warnings (e.g. an unrecognised feature name), so
    callers can always report them regardless of whether parsing succeeded."""
    body = fetch_doap_bytes(url, cache_key, cache_dir)
    if body is None:
        return None, [f"could not fetch {url}"]
    try:
        root = ET.fromstring(body)
    except ET.ParseError as error:
        return None, [f"malformed XML: {error}"]
    errors = validate_doap(root)
    if errors:
        return None, errors
    return parse_doap(root), doap_warnings(root)


def validate_doap_url(url: str) -> list[str]:
    """Used by pr-bot.yml to give contributors immediate feedback on doap_url."""
    status, body = http_get(url)
    if status != 200:
        return [f"could not fetch {url} (HTTP {status})"]
    try:
        root = ET.fromstring(body)
    except ET.ParseError as error:
        return [f"malformed XML: {error}"]
    return validate_doap(root) + doap_warnings(root)


# Change detection


def flat_features(fields: TomlTable) -> dict[str, str]:
    merged: dict[str, str] = {}
    for sub_table in fields.get("features", {}).values():
        if isinstance(sub_table, dict):
            merged.update(sub_table)
    return merged


def collect_changes(
    fields: TomlTable,
    config: CategoryConfig,
    cache_key: str,
    github_token: str | None,
    cache_dir: Path,
) -> EntryReport:
    report = EntryReport(location=cache_key)

    repo_url = fields.get(config.repo_field)
    if repo_url:
        if (
            is_archived(repo_url, github_token)
            and fields.get(config.maturity_field) != "Obsolete"
        ):
            report.edits.append(
                FieldEdit(
                    config.maturity_field,
                    fields.get(config.maturity_field),
                    "Obsolete",
                    "upstream repository is archived",
                )
            )
        if is_dead_link(repo_url) is True:
            report.findings.append(f"repo link is dead (404/410): {repo_url}")

    website = fields.get("website") or fields.get("home")
    if website and is_dead_link(website) is True:
        report.findings.append(f"website link is dead (404/410): {website}")

    doap_url = fields.get(config.doap_field)
    if not doap_url:
        return report

    doap, issues = fetch_and_parse_doap(doap_url, cache_key, cache_dir)
    report.findings.extend(issues)
    if doap is None:
        return report

    if doap["licence"] and doap["licence"] != fields.get(config.licence_field):
        report.edits.append(
            FieldEdit(
                config.licence_field,
                fields.get(config.licence_field),
                doap["licence"],
                f"declared in DOAP file ({doap_url})",
            )
        )
    if doap["room"] and doap["room"] != fields.get(config.room_field):
        report.edits.append(
            FieldEdit(
                config.room_field,
                fields.get(config.room_field),
                doap["room"],
                f"declared in DOAP file ({doap_url})",
            )
        )
    if doap["shortdesc"]:
        current_description = fields.get("description")
        if (
            current_description is None
            or current_description.strip() != doap["shortdesc"].strip()
        ):
            report.findings.append(
                f"DOAP shortdesc differs, review manually: {doap['shortdesc']!r}"
            )
    for feature_name, status in doap["features"][config.kind].items():
        if flat_features(fields).get(feature_name) != status:
            report.findings.append(
                f"DOAP declares feature {feature_name}={status} "
                f"(review and update [extra.features] by hand)"
            )

    return report


def apply_edits(text: str, edits: list[FieldEdit]) -> str:
    for edit in edits:
        pattern = re.compile(rf'(?m)^({re.escape(edit.field)}\s*=\s*)"[^"]*"')
        text, count = pattern.subn(lambda m: f'{m.group(1)}"{edit.new}"', text, count=1)
        if count == 0:
            print(
                f"  ! could not locate field {edit.field!r} to apply edit",
                file=sys.stderr,
            )
    return text


# Clients (frontmatter-per-file)


def split_frontmatter(text: str) -> tuple[str, str, str] | None:
    lines = text.split("\n")
    if not lines or lines[0] != "+++":
        return None
    try:
        end = lines.index("+++", 1)
    except ValueError:
        return None
    pre = "+++\n"
    body = "\n".join(lines[1:end])
    post = "\n" + "\n".join(lines[end:])
    return pre, body, post


def process_clients(
    github_token: str | None, cache_dir: Path, dry_run: bool
) -> list[EntryReport]:
    reports = []
    for path in sorted(CLIENTS_DIR.glob("*.md")):
        if path.name == "_index.md":
            continue
        text = path.read_text(encoding="utf-8")
        split = split_frontmatter(text)
        if split is None:
            continue
        pre, body, post = split
        fields = tomllib.loads(body).get("extra", {})
        report = collect_changes(
            fields, CLIENT_CONFIG, path.name, github_token, cache_dir
        )
        if report.edits and not dry_run:
            path.write_text(
                pre + apply_edits(body, report.edits) + post, encoding="utf-8"
            )
        reports.append(report)
    return reports


# Servers (shared TOML array of tables)


def split_toml_array(text: str, table: str) -> tuple[str, list[str]]:
    marker = f"[[{table}]]"
    parts = text.split(marker)
    return parts[0], [marker + part for part in parts[1:]]


def process_servers(
    github_token: str | None, cache_dir: Path, dry_run: bool
) -> list[EntryReport]:
    text = SERVERS_FILE.read_text(encoding="utf-8")
    header, blocks = split_toml_array(text, "servers")

    reports = []
    new_blocks = []
    changed = False
    for block in blocks:
        entry = tomllib.loads(block)["servers"][0]
        name = entry.get("name", "unknown")
        report = collect_changes(entry, SERVER_CONFIG, name, github_token, cache_dir)
        if report.edits:
            block = apply_edits(block, report.edits)
            changed = True
        new_blocks.append(block)
        reports.append(report)

    if changed and not dry_run:
        SERVERS_FILE.write_text(header + "".join(new_blocks), encoding="utf-8")
    return reports


# Reporting


def render_findings(reports: list[EntryReport]) -> str:
    active = [r for r in reports if r.edits or r.findings]
    if not active:
        return "No changes or findings this run."

    lines = []
    for report in active:
        lines.append(f"#### {report.location}")
        for edit in report.edits:
            lines.append(
                f"- `{edit.field}`: `{edit.old}` -> `{edit.new}` ({edit.reason})"
            )
        for finding in report.findings:
            lines.append(f"- [ ] {finding}")
        lines.append("")
    return "\n".join(lines)


def render_issue_body(reports: list[EntryReport]) -> str:
    """Body for a standing tracking issue, updated in place every run. Findings
    with no accompanying edit produce no file diff and so never surface via the
    PR - this issue is what actually surfaces those (e.g. a link that's been
    dead for months, or a doap_url that started failing after being valid at
    setup)."""
    active = [r for r in reports if r.findings]
    lines = [
        "Automatically maintained by the weekly ecosystem data refresh - "
        "issues found with no proposed fix (e.g. a persistently dead link, or "
        "a `doap_url` that broke after being valid at setup). Updated in place "
        "every run.",
        "",
    ]
    if not active:
        lines.append("Nothing outstanding right now.")
        return "\n".join(lines)
    for report in active:
        lines.append(f"### {report.location}")
        lines.extend(f"- [ ] {finding}" for finding in report.findings)
        lines.append("")
    return "\n".join(lines)


def render_pr_body(reports: list[EntryReport]) -> str:
    """Follows .github/pull_request_template.md so this isn't auto-drafted by pr-bot.yml."""
    return f"""### Description

Automated weekly refresh of ecosystem client/server data: repo archived status, dead
links, and any changes declared in a maintainer's `doap_url` file
(see `doc/ecosystem-doap-extension.md`). Subjective fields (features, good_for,
maintainer, etc.) are never changed by this job — please review each item below.

{render_findings(reports)}

### Related issues

Part of the automation proposed in #2010.

### Role

Automated bot run (Website & Content WG infrastructure).

### Timeline

No deadline, review whenever convenient.

### Signoff

N/A, automated commit.
"""


# Entry point


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run", action="store_true", help="print diffs, don't write files"
    )
    parser.add_argument("--cache-dir", type=Path, default=Path(".cache/doap"))
    parser.add_argument("--pr-body-file", type=Path)
    parser.add_argument("--issue-body-file", type=Path)
    parser.add_argument(
        "--validate-doap-url", help="fetch and validate a single DOAP URL, then exit"
    )
    args = parser.parse_args()

    if args.validate_doap_url:
        errors = validate_doap_url(args.validate_doap_url)
        for error in errors:
            print(error, file=sys.stderr)
        return 1 if errors else 0

    args.cache_dir.mkdir(parents=True, exist_ok=True)
    github_token = os.environ.get("GITHUB_TOKEN")

    reports = process_clients(github_token, args.cache_dir, args.dry_run)
    reports += process_servers(github_token, args.cache_dir, args.dry_run)

    print(render_findings(reports))
    if args.pr_body_file:
        args.pr_body_file.write_text(render_pr_body(reports), encoding="utf-8")
    if args.issue_body_file:
        args.issue_body_file.write_text(render_issue_body(reports), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
