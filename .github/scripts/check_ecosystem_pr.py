#!/usr/bin/env python3
"""PR-time check for new/changed ecosystem entries (see pr-bot.yml counterpart
ecosystem-entry-check.yml). Reads changed files from the PR head via `gh api`
(never checks out or executes code from the fork) and reuses
refresh_ecosystem_data's own TOML/DOAP parsing to flag entries with no
repo/doap_url, and to validate any doap_url that was set or changed. Posts (or
updates) a single PR comment via `gh pr comment --edit-last --create-if-none`.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import tomllib
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from refresh_ecosystem_data import (  # noqa: E402
    CLIENT_CONFIG,
    SERVER_CONFIG,
    CategoryConfig,
    TomlTable,
    repo_host,
    split_frontmatter,
    split_toml_array,
    validate_doap_url,
)

REPO = os.environ["GITHUB_REPOSITORY"]
PR_NUMBER = os.environ["PR_NUMBER"]
HEAD_SHA = os.environ["HEAD_SHA"]
DOC_LINK = "doc/ecosystem-doap-extension.md"


def gh(*args: str) -> str:
    result = subprocess.run(["gh", *args, "-R", REPO], capture_output=True, text=True)
    result.check_returncode()
    return result.stdout


def changed_files() -> list[str]:
    return gh("pr", "diff", PR_NUMBER, "--name-only").splitlines()


def fetch_at_head(path: str) -> str | None:
    result = subprocess.run(
        ["gh", "api", f"repos/{REPO}/contents/{path}", "-f", f"ref={HEAD_SHA}"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        return None  # file was deleted in this PR
    content: str = json.loads(result.stdout)["content"]
    return content


def decode_base64(content: str) -> str:
    import base64

    return base64.b64decode(content).decode("utf-8")


def check_entry(location: str, fields: TomlTable, config: CategoryConfig) -> list[str]:
    lines = []
    repo_url = fields.get(config.repo_field)
    doap_url = fields.get(config.doap_field)

    if not repo_url and not doap_url:
        lines.append(
            f"**{location}**: no `{config.repo_field}` or `{config.doap_field}` set, "
            f"so this entry won't be picked up by the automated refresh. Add a "
            f"GitHub/GitLab repo link, or publish a DOAP file and set `{config.doap_field}` "
            f"for full sync (see [{DOC_LINK}]({DOC_LINK}))."
        )
        return lines

    if repo_url and repo_host(repo_url) is None:
        lines.append(
            f"**{location}**: `{config.repo_field}` isn't on GitHub or GitLab, so it "
            f"won't get the automated archived-repo check (dead-link checking still "
            f"applies to any host) — that's fine, it's only skipped, not an error."
        )

    if doap_url:
        issues = validate_doap_url(doap_url)
        if issues:
            formatted = "\n".join(f"  - {issue}" for issue in issues)
            lines.append(
                f"**{location}**: `{config.doap_field}` has issues:\n{formatted}"
            )

    return lines


def check_clients(paths: list[str]) -> list[str]:
    lines = []
    for path in paths:
        if not path.startswith("content/ecosystem/clients/") or path.endswith(
            "_index.md"
        ):
            continue
        content = fetch_at_head(path)
        if content is None:
            continue
        split = split_frontmatter(decode_base64(content))
        if split is None:
            continue
        _, body, _ = split
        fields = tomllib.loads(body).get("extra", {})
        lines += check_entry(Path(path).name, fields, CLIENT_CONFIG)
    return lines


def check_servers(paths: list[str]) -> list[str]:
    servers_path = "content/ecosystem/servers/servers.toml"
    if servers_path not in paths:
        return []
    content = fetch_at_head(servers_path)
    if content is None:
        return []
    _, blocks = split_toml_array(decode_base64(content), "servers")
    lines = []
    for block in blocks:
        entry = tomllib.loads(block)["servers"][0]
        lines += check_entry(entry.get("name", "unknown"), entry, SERVER_CONFIG)
    return lines


def main() -> int:
    paths = changed_files()
    lines = check_clients(paths) + check_servers(paths)

    if not lines:
        return 0  # nothing to say; leave any earlier comment as-is

    body = (
        "### Automated ecosystem entry check\n\n"
        + "\n\n".join(lines)
        + "\n\n<!-- ecosystem-entry-check -->"
    )
    subprocess.run(
        [
            "gh",
            "pr",
            "comment",
            PR_NUMBER,
            "-R",
            REPO,
            "--edit-last",
            "--create-if-none",
            "--body",
            body,
        ],
        check=True,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
