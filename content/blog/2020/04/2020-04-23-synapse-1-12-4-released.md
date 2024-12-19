+++
title = "Synapse 1.12.4 released"
date = "2020-04-23T19:04:16Z"
path = "/blog/2020/04/23/synapse-1-12-4-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

A small patch release containing features and bugs to support the upcoming launch of cross signing. We are very close now :)

Get 1.12.4 from [github](https://github.com/matrix-org/synapse/releases/tag/v1.12.4) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since v1.12.3

## Synapse 1.12.4 (2020-04-23)

No significant changes.

## Synapse 1.12.4rc1 (2020-04-22)

### Features

- Always send users their own device updates. ([\#7160](https://github.com/matrix-org/synapse/issues/7160))
- Add support for handling GET requests for `account_data` on a worker. ([\#7311](https://github.com/matrix-org/synapse/issues/7311))

### Bugfixes

- Fix a bug that prevented cross-signing with users on worker-mode synapses. ([\#7255](https://github.com/matrix-org/synapse/issues/7255))
- Do not treat display names as globs in push rules. ([\#7271](https://github.com/matrix-org/synapse/issues/7271))
- Fix a bug with cross-signing devices belonging to remote users who did not share a room with any user on the local homeserver. ([\#7289](https://github.com/matrix-org/synapse/issues/7289))
