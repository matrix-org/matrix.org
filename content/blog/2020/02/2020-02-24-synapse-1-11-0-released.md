+++
title = "Synapse 1.11.0 released"
path = "/blog/2020/02/24/synapse-1-11-0-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

Synapse 1.11 landed on Friday (sorry for running late on blogging the release notes!)

The main change is to introduce an experimental API [MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432) for managing aliases for rooms on your local server.  In Synapse 1.10 we removed support for `m.room.aliases` events, which were a way to try to track which aliases a room had on the room itself (but were vulnerable to abuse).  In this release we've re-added the ability to query which aliases a given server has for the room, giving visibility for managing aliases, without having them spray all over the room state itself.  Riot/Web 1.5.10 supports the new API, giving a way to manage aliases on your local server while we finish off the remaining work to improve alias safety & maintenance.

We've also changed the default power levels for new rooms so that room upgrades and ACLs require you to be an Admin (PL100), and invites in public rooms now require you to be a moderator (PL50).

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.11.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

## Synapse 1.11.0 (2020-02-21)

### Improved Documentation

- Small grammatical fixes to the ACME v1 deprecation notice. ([\#6944](https://github.com/matrix-org/synapse/issues/6944))

## Synapse 1.11.0rc1 (2020-02-19)

### Features

- Admin API to add or modify threepids of user accounts. ([\#6769](https://github.com/matrix-org/synapse/issues/6769))
- Limit the number of events that can be requested by the backfill federation API to 100. ([\#6864](https://github.com/matrix-org/synapse/issues/6864))
- Add ability to run some group APIs on workers. ([\#6866](https://github.com/matrix-org/synapse/issues/6866))
- Reject device display names over 100 characters in length to prevent abuse. ([\#6882](https://github.com/matrix-org/synapse/issues/6882))
- Add ability to route federation user device queries to workers. ([\#6873](https://github.com/matrix-org/synapse/issues/6873))
- The result of a user directory search can now be filtered via the spam checker. ([\#6888](https://github.com/matrix-org/synapse/issues/6888))
- Implement new `GET /_matrix/client/unstable/org.matrix.msc2432/rooms/{roomId}/aliases` endpoint as per [MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432). ([\#6939](https://github.com/matrix-org/synapse/issues/6939), [\#6948](https://github.com/matrix-org/synapse/issues/6948), [\#6949](https://github.com/matrix-org/synapse/issues/6949))
- Stop sending `m.room.aliases` events when adding / removing aliases. Check `alt_aliases` in the latest `m.room.canonical_alias` event when deleting an alias. ([\#6904](https://github.com/matrix-org/synapse/issues/6904))
- Change the default power levels of invites, tombstones and server ACLs for new rooms. ([\#6834](https://github.com/matrix-org/synapse/pull/6834))

### Bugfixes

- Fixed third party event rules function `on_create_room`'s return value being ignored. ([\#6781](https://github.com/matrix-org/synapse/issues/6781))
- Allow URL-encoded User IDs on `/_synapse/admin/v2/users/<user_id>[/admin]` endpoints. Thanks to @NHAS for reporting. ([\#6825](https://github.com/matrix-org/synapse/issues/6825))
- Fix Synapse refusing to start if `federation_certificate_verification_whitelist` option is blank. ([\#6849](https://github.com/matrix-org/synapse/issues/6849))
- Fix errors from logging in the purge jobs related to the message retention policies support. ([\#6945](https://github.com/matrix-org/synapse/issues/6945))
- Return a 404 instead of 200 for querying information of a non-existent user through the admin API. ([\#6901](https://github.com/matrix-org/synapse/issues/6901))

### Updates to the Docker image

- The deprecated "generate-config-on-the-fly" mode is no longer supported. ([\#6918](https://github.com/matrix-org/synapse/issues/6918))

### Improved Documentation

- Add details of PR merge strategy to contributing docs. ([\#6846](https://github.com/matrix-org/synapse/issues/6846))
- Spell out that the last event sent to a room won't be deleted by a purge. ([\#6891](https://github.com/matrix-org/synapse/issues/6891))
- Update Synapse's documentation to warn about the deprecation of ACME v1. ([\#6905](https://github.com/matrix-org/synapse/issues/6905), [\#6907](https://github.com/matrix-org/synapse/issues/6907), [\#6909](https://github.com/matrix-org/synapse/issues/6909))
- Add documentation for the spam checker. ([\#6906](https://github.com/matrix-org/synapse/issues/6906))
- Fix worker docs to point `/publicised_groups` API correctly. ([\#6938](https://github.com/matrix-org/synapse/issues/6938))
- Clean up and update docs on setting up federation. ([\#6940](https://github.com/matrix-org/synapse/issues/6940))
- Add a warning about indentation to generated configuration files. ([\#6920](https://github.com/matrix-org/synapse/issues/6920))
- Databases created using the compose file in contrib/docker will now always have correct encoding and locale settings. Contributed by Fridtjof Mund. ([\#6921](https://github.com/matrix-org/synapse/issues/6921))
- Update pip install directions in readme to avoid error when using zsh. ([\#6855](https://github.com/matrix-org/synapse/issues/6855))

### Deprecations and Removals

- Remove `m.lazy_load_members` from `unstable_features` since lazy loading is in the stable Client-Server API version r0.5.0. ([\#6877](https://github.com/matrix-org/synapse/issues/6877))

### Internal Changes

- Add type hints to `SyncHandler`. ([\#6821](https://github.com/matrix-org/synapse/issues/6821))
- Refactoring work in preparation for changing the event redaction algorithm. ([\#6823](https://github.com/matrix-org/synapse/issues/6823), [\#6827](https://github.com/matrix-org/synapse/issues/6827), [\#6854](https://github.com/matrix-org/synapse/issues/6854), [\#6856](https://github.com/matrix-org/synapse/issues/6856), [\#6857](https://github.com/matrix-org/synapse/issues/6857), [\#6858](https://github.com/matrix-org/synapse/issues/6858))
- Fix stacktraces when using `ObservableDeferred` and async/await. ([\#6836](https://github.com/matrix-org/synapse/issues/6836))
- Port much of `synapse.handlers.federation` to async/await. ([\#6837](https://github.com/matrix-org/synapse/issues/6837), [\#6840](https://github.com/matrix-org/synapse/issues/6840))
- Populate `rooms.room_version` database column at startup, rather than in a background update. ([\#6847](https://github.com/matrix-org/synapse/issues/6847))
- Reduce amount we log at `INFO` level. ([\#6833](https://github.com/matrix-org/synapse/issues/6833), [\#6862](https://github.com/matrix-org/synapse/issues/6862))
- Remove unused `get_room_stats_state` method. ([\#6869](https://github.com/matrix-org/synapse/issues/6869))
- Add typing to `synapse.federation.sender` and port to async/await. ([\#6871](https://github.com/matrix-org/synapse/issues/6871))
- Refactor `_EventInternalMetadata` object to improve type safety. ([\#6872](https://github.com/matrix-org/synapse/issues/6872))
- Add an additional entry to the SyTest blacklist for worker mode. ([\#6883](https://github.com/matrix-org/synapse/issues/6883))
- Fix the use of sed in the linting scripts when using BSD sed. ([\#6887](https://github.com/matrix-org/synapse/issues/6887))
- Add type hints to the spam checker module. ([\#6915](https://github.com/matrix-org/synapse/issues/6915))
- Convert the directory handler tests to use HomeserverTestCase. ([\#6919](https://github.com/matrix-org/synapse/issues/6919))
- Increase DB/CPU perf of `_is_server_still_joined` check. ([\#6936](https://github.com/matrix-org/synapse/issues/6936))
- Tiny optimisation for incoming HTTP request dispatch. ([\#6950](https://github.com/matrix-org/synapse/issues/6950))
