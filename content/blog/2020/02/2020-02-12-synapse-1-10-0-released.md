+++
title = "Synapse 1.10.0 released"
path = "/blog/2020/02/12/synapse-1-10-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["General"]
+++


The whole Matrix project is racing towards enabling e2ee by default. Synapse is no different and v1.10.0 contains multiple e2ee UX improvements, as well as a bug fix that prevented cross signing requests over federation to work reliably.

*If* any of your users are on the bleeding edge and have already started using cross signing (by enabling labs flags in Riot), then it will be necessary for them to force Synapse to re-send device updates by renaming all of their devices.

We've also included a temporary fix to address alias abuse. The idea is that until [#6898](https://github.com/matrix-org/synapse/issues/6898) lands, servers will refrain from sharing events of type ```m.room.aliases``` with clients. Most admins will not be affected, but if you are present in rooms subject to alias abuse, then upgrading provides a pragmatic short term solution.

Finally, as of this release Synapse validates ```client_secret``` parameters in the Client-Server API as per the spec. See [#6766](https://github.com/matrix-org/synapse/issues/6766) for details.

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.10.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since Synapse 1.9.0

## Synapse 1.10.0 (2020-02-12)

**WARNING to client developers**: As of this release Synapse validates `client_secret` parameters in the Client-Server API as per the spec. See [\#6766](https://github.com/matrix-org/synapse/issues/6766) for details.

### Updates to the Docker image

- Update the docker images to Alpine Linux 3.11. ([\#6897](https://github.com/matrix-org/synapse/issues/6897))

## Synapse 1.10.0rc5 (2020-02-11)

### Bugfixes

- Fix the filtering introduced in 1.10.0rc3 to also apply to the state blocks returned by `/sync`. ([\#6884](https://github.com/matrix-org/synapse/issues/6884))

## Synapse 1.10.0rc4 (2020-02-11)

This release candidate was built incorrectly and is superseded by 1.10.0rc5.

## Synapse 1.10.0rc3 (2020-02-10)

### Features

- Filter out `m.room.aliases` from the CS API to mitigate abuse while a better solution is specced. ([\#6878](https://github.com/matrix-org/synapse/issues/6878))

### Internal Changes

- Fix continuous integration failures with old versions of `pip`, which were introduced by a release of the `zipp` library. ([\#6880](https://github.com/matrix-org/synapse/issues/6880))

## Synapse 1.10.0rc2 (2020-02-06)

### Bugfixes

- Fix an issue with cross-signing where device signatures were not sent to remote servers. ([\#6844](https://github.com/matrix-org/synapse/issues/6844))
- Fix to the unknown remote device detection which was introduced in 1.10.rc1. ([\#6848](https://github.com/matrix-org/synapse/issues/6848))

### Internal Changes

- Detect unexpected sender keys on remote encrypted events and resync device lists. ([\#6850](https://github.com/matrix-org/synapse/issues/6850))

## Synapse 1.10.0rc1 (2020-01-31)

### Features

- Add experimental support for updated authorization rules for aliases events, from [MSC2260](https://github.com/matrix-org/matrix-doc/pull/2260). ([\#6787](https://github.com/matrix-org/synapse/issues/6787), [\#6790](https://github.com/matrix-org/synapse/issues/6790), [\#6794](https://github.com/matrix-org/synapse/issues/6794))

### Bugfixes

- Warn if postgres database has a non-C locale, as that can cause issues when upgrading locales (e.g. due to upgrading OS). ([\#6734](https://github.com/matrix-org/synapse/issues/6734))
- Minor fixes to `PUT /_synapse/admin/v2/users` admin api. ([\#6761](https://github.com/matrix-org/synapse/issues/6761))
- Validate `client_secret` parameter using the regex provided by the Client-Server API, temporarily allowing `:` characters for older clients. The `:` character will be removed in a future release. ([\#6767](https://github.com/matrix-org/synapse/issues/6767))
- Fix persisting redaction events that have been redacted (or otherwise don't have a redacts key). ([\#6771](https://github.com/matrix-org/synapse/issues/6771))
- Fix outbound federation request metrics. ([\#6795](https://github.com/matrix-org/synapse/issues/6795))
- Fix bug where querying a remote user's device keys that weren't cached resulted in only returning a single device. ([\#6796](https://github.com/matrix-org/synapse/issues/6796))
- Fix race in federation sender worker that delayed sending of device updates. ([\#6799](https://github.com/matrix-org/synapse/issues/6799), [\#6800](https://github.com/matrix-org/synapse/issues/6800))
- Fix bug where Synapse didn't invalidate cache of remote users' devices when Synapse left a room. ([\#6801](https://github.com/matrix-org/synapse/issues/6801))
- Fix waking up other workers when remote server is detected to have come back online. ([\#6811](https://github.com/matrix-org/synapse/issues/6811))

### Improved Documentation

- Clarify documentation related to `user_dir` and `federation_reader` workers. ([\#6775](https://github.com/matrix-org/synapse/issues/6775))

### Internal Changes

- Record room versions in the `rooms` table. ([\#6729](https://github.com/matrix-org/synapse/issues/6729), [\#6788](https://github.com/matrix-org/synapse/issues/6788), [\#6810](https://github.com/matrix-org/synapse/issues/6810))
- Propagate cache invalidates from workers to other workers. ([\#6748](https://github.com/matrix-org/synapse/issues/6748))
- Remove some unnecessary admin handler abstraction methods. ([\#6751](https://github.com/matrix-org/synapse/issues/6751))
- Add some debugging for media storage providers. ([\#6757](https://github.com/matrix-org/synapse/issues/6757))
- Detect unknown remote devices and mark cache as stale. ([\#6776](https://github.com/matrix-org/synapse/issues/6776), [\#6819](https://github.com/matrix-org/synapse/issues/6819))
- Attempt to resync remote users' devices when detected as stale. ([\#6786](https://github.com/matrix-org/synapse/issues/6786))
- Delete current state from the database when server leaves a room. ([\#6792](https://github.com/matrix-org/synapse/issues/6792))
- When a client asks for a remote user's device keys check if the local cache for that user has been marked as potentially stale. ([\#6797](https://github.com/matrix-org/synapse/issues/6797))
- Add background update to clean out left rooms from current state. ([\#6802](https://github.com/matrix-org/synapse/issues/6802), [\#6816](https://github.com/matrix-org/synapse/issues/6816))
- Refactoring work in preparation for changing the event redaction algorithm. ([\#6803](https://github.com/matrix-org/synapse/issues/6803), [\#6805](https://github.com/matrix-org/synapse/issues/6805), [\#6806](https://github.com/matrix-org/synapse/issues/6806), [\#6807](https://github.com/matrix-org/synapse/issues/6807), [\#6820](https://github.com/matrix-org/synapse/issues/6820))
