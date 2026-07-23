# Matrix ecosystem DOAP extension

This is the file format read by the ecosystem data refresh automation
(`.github/scripts/refresh_ecosystem_data.py`). It lets a
client or server maintainer publish a small file describing their project, which we fetch
and propose as an update to their `content/ecosystem/{clients,servers}` entry. Publishing
one is entirely optional.

## How to use it

1. Write a DOAP file describing your project (template below).
2. Host it anywhere reachable over plain HTTPS — your own site, or a raw file link inside
   your git repo (e.g. `https://raw.githubusercontent.com/you/project/main/matrix.doap`).
3. Set `doap_url` to that URL:
    - clients: `extra.doap_url = "https://..."` in your entry's frontmatter
    - servers: `doap_url = "https://..."` in your `[[servers]]` entry in `servers.toml`

A weekly job fetches it, and any changes are proposed as a diff in a PR for a human to
review - nothing is auto-merged, and nothing is auto-fetched unless you set `doap_url`.

## Base vocabulary: DOAP

We read standard [DOAP](https://github.com/ewilderj/doap) (`http://usefulinc.com/ns/doap#`)
fields:

| DOAP field                                                                        | Maps to                                                                                            |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `doap:name`                                                                       | `title`                                                                                            |
| `doap:shortdesc`                                                                  | the entry's short body text                                                                        |
| `doap:homepage`                                                                   | `website`/`home`                                                                                   |
| `doap:repository` / `doap:GitRepository` / `doap:SVNRepository` → `doap:location` | `repo` (clients) / `repository` (servers)                                                          |
| `doap:license`                                                                    | `licence` — must be an `rdf:resource` under `https://spdx.org/licenses/`; anything else is ignored |
| `doap:maintainer` / `foaf:Person` / `foaf:name`                                   | `maintainer`                                                                                       |

Fields we don't read are simply ignored. You can include whatever other standard DOAP
data you like.

## Extension namespaces

Three namespaces, defined by us, for the parts DOAP has no vocabulary for:

| Prefix          | Namespace                                 | Used for                        |
| --------------- | ----------------------------------------- | ------------------------------- |
| `matrix`        | `https://matrix.org/ns/ecosystem#`        | shared elements (`matrix:room`) |
| `matrix_client` | `https://matrix.org/ns/ecosystem/client#` | client feature support          |
| `matrix_server` | `https://matrix.org/ns/ecosystem/server#` | server feature support          |

### `matrix:room`

A [`matrix:` URI](https://spec.matrix.org/v1.18/appendices/#matrix-uri-scheme) — either a
room alias (`r`) or a room ID (`roomid`):

```xml
<matrix:room>matrix:r/your-room:example.com</matrix:room>
```

```xml
<matrix:room>matrix:roomid/opaqueid:example.com</matrix:room>
```

Maps to `matrix_room` (clients) / `room` (servers), converted back to their sigil form
(`#your-room:example.com` / `!opaqueid:example.com`). Anything that isn't a valid `r` or
`roomid` `matrix:` URI is flagged as a warning when your PR is opened, and ignored.

### `matrix_client:SupportedFeature`

One element per feature you have an opinion on, as a child of `doap:Project`:

```xml
<matrix_client:SupportedFeature feature="e2ee" status="supported"/>
```

- `feature` — one of: `e2ee`, `spaces`, `voip_1to1`, `threads`, `sso`, `voip_jitsi`,
  `multi_account`, `multi_language`, `oauth`, `invisible_crypto`, `voip_matrixrtc`,
  `sliding_sync` (kept in sync with `[extra.features]` in CONTENT.md). Anything else is
  flagged as a likely typo when your PR is opened, and ignored.
- `status` — one of `supported`, `partial`, `unsupported`.

Maps to `[extra.features]`.

### `matrix_server:SupportedFeature`

Same shape as `matrix_client:SupportedFeature`, reserved for when servers get a published
feature matrix of their own. Accepted today, but not yet applied anywhere (there's
currently no known server feature name, so anything here is flagged as unrecognised).

## Validation

A `doap_url` you set is checked when your PR is opened (see `ecosystem-entry-check.yml`)
and on every weekly run (see `refresh-ecosystem-data.yml`):

**Hard errors** - the whole file is skipped (logged, not applied) if any of these fail:

- must be well-formed XML
- must contain exactly one `doap:Project`
- every `matrix_client:`/`matrix_server:SupportedFeature` must have a `feature` and a
  `status`, and `status` must be one of the three values above

**Warnings** - reported, but only that one piece of data is ignored, the rest of the file
still applies:

- `matrix:room` that isn't a valid room-alias/room-id `matrix:` URI
- a `feature` name we don't recognise (likely a typo)

Either way, issues are also visible in the standing "Ecosystem data refresh: outstanding
issues" tracking issue if they persist across weekly runs.

## Full example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:doap="http://usefulinc.com/ns/doap#"
         xmlns:foaf="http://xmlns.com/foaf/0.1/"
         xmlns:matrix="https://matrix.org/ns/ecosystem#"
         xmlns:matrix_client="https://matrix.org/ns/ecosystem/client#">
  <doap:Project>
    <doap:name>Example Client</doap:name>
    <doap:shortdesc>Supercharge your communications with Example Client.</doap:shortdesc>
    <doap:homepage rdf:resource="https://example.com"/>
    <doap:repository>
      <doap:GitRepository>
        <doap:location rdf:resource="https://github.com/example-org/example-repo"/>
      </doap:GitRepository>
    </doap:repository>
    <doap:license rdf:resource="https://spdx.org/licenses/AGPL-3.0-only"/>
    <doap:maintainer>
      <foaf:Person>
        <foaf:name>Your name or org</foaf:name>
      </foaf:Person>
    </doap:maintainer>
    <matrix:room>matrix:r/example-client:example.com</matrix:room>
    <matrix_client:SupportedFeature feature="e2ee" status="supported"/>
    <matrix_client:SupportedFeature feature="threads" status="partial"/>
    <matrix_client:SupportedFeature feature="sso" status="unsupported"/>
  </doap:Project>
</rdf:RDF>
```
