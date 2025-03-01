+++
title = "Synapse 1.8.0 released"
path = "/blog/2020/01/09/synapse-1-8-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.8.0 has arrived, it contains a whole host of bug fixes and tweaks, most notably fixing some long standing problems with search.

More generally we are spending a lot of time  improving the e2ee experience ahead of switching on e2ee by default, so watch this space.

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.8.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

## Synapse 1.8.0 (2020-01-09)

### Bugfixes

- Fix `GET` request on `/_synapse/admin/v2/users` endpoint. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#6563](https://github.com/matrix-org/synapse/issues/6563))
- Fix incorrect signing of responses from the key server implementation. ([\#6657](https://github.com/matrix-org/synapse/issues/6657))

## Synapse 1.8.0rc1 (2020-01-07)

### Features

- Add v2 APIs for the `send_join` and `send_leave` federation endpoints (as described in [MSC1802](https://github.com/matrix-org/matrix-doc/pull/1802)). ([\#6349](https://github.com/matrix-org/synapse/issues/6349))
- Add a develop script to generate full SQL schemas. ([\#6394](https://github.com/matrix-org/synapse/issues/6394))
- Add custom SAML username mapping functionality through an external provider plugin. ([\#6411](https://github.com/matrix-org/synapse/issues/6411))
- Automatically delete empty groups/communities. ([\#6453](https://github.com/matrix-org/synapse/issues/6453))
- Add option `limit_profile_requests_to_users_who_share_rooms` to prevent requirement of a local user sharing a room with another user to query their profile information. ([\#6523](https://github.com/matrix-org/synapse/issues/6523))
- Add an `export_signing_key` script to extract the public part of signing keys when rotating them. ([\#6546](https://github.com/matrix-org/synapse/issues/6546))
- Add experimental config option to specify multiple databases. ([\#6580](https://github.com/matrix-org/synapse/issues/6580))
- Raise an error if someone tries to use the `log_file` config option. ([\#6626](https://github.com/matrix-org/synapse/issues/6626))

### Bugfixes

- Prevent redacted events from being returned during message search. ([\#6377](https://github.com/matrix-org/synapse/issues/6377), [\#6522](https://github.com/matrix-org/synapse/issues/6522))
- Prevent error on trying to search a upgraded room when the server is not in the predecessor room. ([\#6385](https://github.com/matrix-org/synapse/issues/6385))
- Improve performance of looking up cross-signing keys. ([\#6486](https://github.com/matrix-org/synapse/issues/6486))
- Fix race which occasionally caused deleted devices to reappear. ([\#6514](https://github.com/matrix-org/synapse/issues/6514))
- Fix missing row in `device_max_stream_id` that could cause unable to decrypt errors after server restart. ([\#6555](https://github.com/matrix-org/synapse/issues/6555))
- Fix a bug which meant that we did not send systemd notifications on startup if acme was enabled. ([\#6571](https://github.com/matrix-org/synapse/issues/6571))
- Fix exception when fetching the `matrix.org:ed25519:auto` key. ([\#6625](https://github.com/matrix-org/synapse/issues/6625))
- Fix bug where a moderator upgraded a room and became an admin in the new room. ([\#6633](https://github.com/matrix-org/synapse/issues/6633))
- Fix an error which was thrown by the `PresenceHandler` `_on_shutdown` handler. ([\#6640](https://github.com/matrix-org/synapse/issues/6640))
- Fix exceptions in the synchrotron worker log when events are rejected. ([\#6645](https://github.com/matrix-org/synapse/issues/6645))
- Ensure that upgraded rooms are removed from the directory. ([\#6648](https://github.com/matrix-org/synapse/issues/6648))
- Fix a bug causing Synapse not to fetch missing events when it believes it has every event in the room. ([\#6652](https://github.com/matrix-org/synapse/issues/6652))

### Improved Documentation

- Document the Room Shutdown Admin API. ([\#6541](https://github.com/matrix-org/synapse/issues/6541))
- Reword sections of [docs/federate.md](docs/federate.md) that explained delegation at time of Synapse 1.0 transition. ([\#6601](https://github.com/matrix-org/synapse/issues/6601))
- Added the section 'Configuration' in [docs/turn-howto.md](docs/turn-howto.md). ([\#6614](https://github.com/matrix-org/synapse/issues/6614))

### Deprecations and Removals

- Remove redundant code from event authorisation implementation. ([\#6502](https://github.com/matrix-org/synapse/issues/6502))
- Remove unused, undocumented `/_matrix/content` API. ([\#6628](https://github.com/matrix-org/synapse/issues/6628))

### Internal Changes

- Add *experimental* support for multiple physical databases and split out state storage to separate data store. ([\#6245](https://github.com/matrix-org/synapse/issues/6245), [\#6510](https://github.com/matrix-org/synapse/issues/6510), [\#6511](https://github.com/matrix-org/synapse/issues/6511), [\#6513](https://github.com/matrix-org/synapse/issues/6513), [\#6564](https://github.com/matrix-org/synapse/issues/6564), [\#6565](https://github.com/matrix-org/synapse/issues/6565))
- Port sections of code base to async/await. ([\#6496](https://github.com/matrix-org/synapse/issues/6496), [\#6504](https://github.com/matrix-org/synapse/issues/6504), [\#6505](https://github.com/matrix-org/synapse/issues/6505), [\#6517](https://github.com/matrix-org/synapse/issues/6517), [\#6559](https://github.com/matrix-org/synapse/issues/6559), [\#6647](https://github.com/matrix-org/synapse/issues/6647), [\#6653](https://github.com/matrix-org/synapse/issues/6653))
- Remove `SnapshotCache` in favour of `ResponseCache`. ([\#6506](https://github.com/matrix-org/synapse/issues/6506))
- Silence mypy errors for files outside those specified. ([\#6512](https://github.com/matrix-org/synapse/issues/6512))
- Clean up some logging when handling incoming events over federation. ([\#6515](https://github.com/matrix-org/synapse/issues/6515))
- Test more folders against mypy. ([\#6534](https://github.com/matrix-org/synapse/issues/6534))
- Update `mypy` to new version. ([\#6537](https://github.com/matrix-org/synapse/issues/6537))
- Adjust the sytest blacklist for worker mode. ([\#6538](https://github.com/matrix-org/synapse/issues/6538))
- Remove unused `get_pagination_rows` methods from `EventSource` classes. ([\#6557](https://github.com/matrix-org/synapse/issues/6557))
- Clean up logs from the push notifier at startup. ([\#6558](https://github.com/matrix-org/synapse/issues/6558))
- Improve diagnostics on database upgrade failure. ([\#6570](https://github.com/matrix-org/synapse/issues/6570))
- Reduce the reconnect time when worker replication fails, to make it easier to catch up. ([\#6617](https://github.com/matrix-org/synapse/issues/6617))
- Simplify http handling by removing redundant `SynapseRequestFactory`. ([\#6619](https://github.com/matrix-org/synapse/issues/6619))
- Add a workaround for synapse raising exceptions when fetching the notary's own key from the notary. ([\#6620](https://github.com/matrix-org/synapse/issues/6620))
- Automate generation of the sample log config. ([\#6627](https://github.com/matrix-org/synapse/issues/6627))
- Simplify event creation code by removing redundant queries on the `event_reference_hashes` table. ([\#6629](https://github.com/matrix-org/synapse/issues/6629))
- Fix errors when `frozen_dicts` are enabled. ([\#6642](https://github.com/matrix-org/synapse/issues/6642))

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.8.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.
