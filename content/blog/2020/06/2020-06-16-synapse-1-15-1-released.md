+++
title = "Synapse 1.15.1 released"
date = "2020-06-16T12:25:32Z"
path = "/blog/2020/06/16/synapse-1-15-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.15.1 is a bug fix release to fix two bugs introduced in 1.15.0.

The first prevented users of certain clients (including Riot) to add or remove third party identifiers such as email addresses.

The second caused Synapse not to start when configured with certain password auth providers.

Sorry if you have been bitten!

Get 1.15.1 from [github](https://github.com/matrix-org/synapse/releases/tag/v1.15.1) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since v1.15.0

## Synapse 1.15.1 (2020-06-16)

### Bugfixes

- Fix a bug introduced in v1.15.0 that would crash Synapse on start when using certain password auth providers. ([\#7684](https://github.com/matrix-org/synapse/issues/7684))
- Fix a bug introduced in v1.15.0 which meant that some 3PID management endpoints were not accessible on the correct URL. ([\#7685](https://github.com/matrix-org/synapse/issues/7685))
