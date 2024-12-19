+++
title = "Synapse 1.12.2 released"
path = "/blog/2020/04/02/synapse-1-12-2-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

A small patch release to fix regressions introduced in v1.11.0 and v1.12.0.

Update 1.12.3 is a fast follow release from 1.12.2

Get 1.12.3 (not 1.12.2) from [github](https://github.com/matrix-org/synapse/releases/tag/v1.12.3) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since v1.12.0

## Synapse 1.12.3 (2020-04-03)

- Remove the the pin to Pillow 7.0 which was introduced in Synapse 1.12.2, and
correctly fix the issue with building the Debian packages. ([\#7212](https://github.com/matrix-org/synapse/issues/7212))

## Synapse 1.12.2 (2020-04-02)

This release fixes [an issue](https://github.com/matrix-org/synapse/issues/7208) with building the debian packages.

## Synapse 1.12.1 (2020-04-02)

No significant changes since 1.12.1rc1.

## Synapse 1.12.1rc1 (2020-03-31)

### Bugfixes

- Fix starting workers when federation sending not split out. ([\#7133](https://github.com/matrix-org/synapse/issues/7133)). Introduced in v1.12.0.
- Avoid importing `sqlite3` when using the postgres backend. Contributed by David Vo. ([\#7155](https://github.com/matrix-org/synapse/issues/7155)). Introduced in v1.12.0rc1.
- Fix a bug which could cause outbound federation traffic to stop working if a client uploaded an incorrect e2e device signature. ([\#7177](https://github.com/matrix-org/synapse/issues/7177)). Introduced in v1.11.0.
