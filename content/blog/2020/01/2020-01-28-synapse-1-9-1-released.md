+++
title = "Synapse 1.9.1 released"
path = "/blog/2020/01/28/synapse-1-9-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

A quick bug fix release that affects admins making use of monthly active user limits. You will know if you are affected because 1.9.0 will not start up. Apologies if you were bitten by this one!

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.9.1) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since Synapse 1.9.1

## Synapse 1.9.1 (2020-01-28)

### Bugfixes

- Fix bug where setting `mau_limit_reserved_threepids` config would cause Synapse to refuse to start. ([\#6793](https://github.com/matrix-org/synapse/issues/6793))
