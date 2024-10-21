+++
title = "Synapse 1.19.0 released"
path = "/blog/2020/08/17/synapse-1-19-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.19.0 is here and ready for action.

1.19.0 contains lots of async/await changes, 27 separate PRs to be precise(thanks Patrick). These changes will provide some level of performance improvement, but the real value to us is that it will improve our ability to profile Synapse more effectively.

It also features improved logging performance, this is in part to reduce IO but also to reduce the total amount logged. We’d be really interested to get some feedback on if the changes help. You may also want to take a look at our new logging defaults to see if they would help reduce total disk space usage.

Some admins will rejoice that we have added a ```/health``` end point to every configured HTTP listener which should make it easier to monitor multi-worker installs.

Finally 1.19.0 contains improvements to the Admin API allowing the admin to optionally purge rooms on deletion.

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.19.0 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.19.0).

Changelog for 1.19.0 follows:

## Synapse 1.19.0 (2020-08-17)

No significant changes since 1.19.0rc1.

### Removal warning

As outlined in the [previous release](https://github.com/matrix-org/synapse/releases/tag/v1.18.0), we are no longer publishing Docker images with the `-py3` tag suffix. On top of that, we have also removed the `latest-py3` tag. Please see [the announcement in the upgrade notes for 1.18.0](https://github.com/matrix-org/synapse/blob/develop/UPGRADE.rst#upgrading-to-v1180).

## Synapse 1.19.0rc1 (2020-08-13)

### Features

- Add option to allow server admins to join rooms which fail complexity checks. Contributed by @lugino-emeritus. ([\#7902](https://github.com/matrix-org/synapse/issues/7902))
- Add an option to purge room or not with delete room admin endpoint (`POST /_synapse/admin/v1/rooms/<room_id>/delete`). Contributed by @dklimpel. ([\#7964](https://github.com/matrix-org/synapse/issues/7964))
- Add rate limiting to users joining rooms. ([\#8008](https://github.com/matrix-org/synapse/issues/8008))
- Add a `/health` endpoint to every configured HTTP listener that can be used as a health check endpoint by load balancers. ([\#8048](https://github.com/matrix-org/synapse/issues/8048))
- Allow login to be blocked based on the values of SAML attributes. ([\#8052](https://github.com/matrix-org/synapse/issues/8052))
- Allow guest access to the `GET /_matrix/client/r0/rooms/{room_id}/members` endpoint, according to MSC2689. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#7314](https://github.com/matrix-org/synapse/issues/7314))

### Bugfixes

- Fix a bug introduced in Synapse v1.7.2 which caused inaccurate membership counts in the room directory. ([\#7977](https://github.com/matrix-org/synapse/issues/7977))
- Fix a long standing bug: 'Duplicate key value violates unique constraint "event_relations_id"' when message retention is configured. ([\#7978](https://github.com/matrix-org/synapse/issues/7978))
- Fix "no create event in auth events" when trying to reject invitation after inviter leaves. Bug introduced in Synapse v1.10.0. ([\#7980](https://github.com/matrix-org/synapse/issues/7980))
- Fix various comments and minor discrepancies in server notices code. ([\#7996](https://github.com/matrix-org/synapse/issues/7996))
- Fix a long standing bug where HTTP HEAD requests resulted in a 400 error. ([\#7999](https://github.com/matrix-org/synapse/issues/7999))
- Fix a long-standing bug which caused two copies of some log lines to be written when synctl was used along with a MemoryHandler logger. ([\#8011](https://github.com/matrix-org/synapse/issues/8011), [\#8012](https://github.com/matrix-org/synapse/issues/8012))

### Updates to the Docker image

- We no longer publish Docker images with the `-py3` tag suffix, as [announced in the upgrade notes](https://github.com/matrix-org/synapse/blob/develop/UPGRADE.rst#upgrading-to-v1180). ([\#8056](https://github.com/matrix-org/synapse/issues/8056))

### Improved Documentation

- Document how to set up a client .well-known file and fix several pieces of outdated documentation. ([\#7899](https://github.com/matrix-org/synapse/issues/7899))
- Improve workers docs. ([\#7990](https://github.com/matrix-org/synapse/issues/7990), [\#8000](https://github.com/matrix-org/synapse/issues/8000))
- Fix typo in `docs/workers.md`. ([\#7992](https://github.com/matrix-org/synapse/issues/7992))
- Add documentation for how to undo a room shutdown. ([\#7998](https://github.com/matrix-org/synapse/issues/7998), [\#8010](https://github.com/matrix-org/synapse/issues/8010))

### Internal Changes

- Reduce the amount of whitespace in JSON stored and sent in responses. Contributed by David Vo. ([\#7372](https://github.com/matrix-org/synapse/issues/7372))
- Switch to the JSON implementation from the standard library and bump the minimum version of the canonicaljson library to 1.2.0. ([\#7936](https://github.com/matrix-org/synapse/issues/7936), [\#7979](https://github.com/matrix-org/synapse/issues/7979))
- Convert various parts of the codebase to async/await. ([\#7947](https://github.com/matrix-org/synapse/issues/7947), [\#7948](https://github.com/matrix-org/synapse/issues/7948), [\#7949](https://github.com/matrix-org/synapse/issues/7949), [\#7951](https://github.com/matrix-org/synapse/issues/7951), [\#7963](https://github.com/matrix-org/synapse/issues/7963), [\#7973](https://github.com/matrix-org/synapse/issues/7973), [\#7975](https://github.com/matrix-org/synapse/issues/7975), [\#7976](https://github.com/matrix-org/synapse/issues/7976), [\#7981](https://github.com/matrix-org/synapse/issues/7981), [\#7987](https://github.com/matrix-org/synapse/issues/7987), [\#7989](https://github.com/matrix-org/synapse/issues/7989), [\#8003](https://github.com/matrix-org/synapse/issues/8003), [\#8014](https://github.com/matrix-org/synapse/issues/8014), [\#8016](https://github.com/matrix-org/synapse/issues/8016), [\#8027](https://github.com/matrix-org/synapse/issues/8027), [\#8031](https://github.com/matrix-org/synapse/issues/8031), [\#8032](https://github.com/matrix-org/synapse/issues/8032), [\#8035](https://github.com/matrix-org/synapse/issues/8035), [\#8042](https://github.com/matrix-org/synapse/issues/8042), [\#8044](https://github.com/matrix-org/synapse/issues/8044), [\#8045](https://github.com/matrix-org/synapse/issues/8045), [\#8061](https://github.com/matrix-org/synapse/issues/8061), [\#8062](https://github.com/matrix-org/synapse/issues/8062), [\#8063](https://github.com/matrix-org/synapse/issues/8063), [\#8066](https://github.com/matrix-org/synapse/issues/8066), [\#8069](https://github.com/matrix-org/synapse/issues/8069), [\#8070](https://github.com/matrix-org/synapse/issues/8070))
- Move some database-related log lines from the default logger to the database/transaction loggers. ([\#7952](https://github.com/matrix-org/synapse/issues/7952))
- Add a script to detect source code files using non-unix line terminators. ([\#7965](https://github.com/matrix-org/synapse/issues/7965), [\#7970](https://github.com/matrix-org/synapse/issues/7970))
- Log the SAML session ID during creation. ([\#7971](https://github.com/matrix-org/synapse/issues/7971))
- Implement new experimental push rules for some users. ([\#7997](https://github.com/matrix-org/synapse/issues/7997))
- Remove redundant and unreliable signature check for v1 Identity Service lookup responses. ([\#8001](https://github.com/matrix-org/synapse/issues/8001))
- Improve the performance of the register endpoint. ([\#8009](https://github.com/matrix-org/synapse/issues/8009))
- Reduce less useful output in the newsfragment CI step. Add a link to the changelog section of the contributing guide on error. ([\#8024](https://github.com/matrix-org/synapse/issues/8024))
- Rename storage layer objects to be more sensible. ([\#8033](https://github.com/matrix-org/synapse/issues/8033))
- Change the default log config to reduce disk I/O and storage for new servers. ([\#8040](https://github.com/matrix-org/synapse/issues/8040))
- Add an assertion on `prev_events` in `create_new_client_event`. ([\#8041](https://github.com/matrix-org/synapse/issues/8041))
- Add a comment to `ServerContextFactory` about the use of `SSLv23_METHOD`. ([\#8043](https://github.com/matrix-org/synapse/issues/8043))
- Log `OPTIONS` requests at `DEBUG` rather than `INFO` level to reduce amount logged at `INFO`. ([\#8049](https://github.com/matrix-org/synapse/issues/8049))
- Reduce amount of outbound request logging at `INFO` level. ([\#8050](https://github.com/matrix-org/synapse/issues/8050))
- It is no longer necessary to explicitly define `filters` in the logging configuration. (Continuing to do so is redundant but harmless.) ([\#8051](https://github.com/matrix-org/synapse/issues/8051))
- Add and improve type hints. ([\#8058](https://github.com/matrix-org/synapse/issues/8058), [\#8064](https://github.com/matrix-org/synapse/issues/8064), [\#8060](https://github.com/matrix-org/synapse/issues/8060), [\#8067](https://github.com/matrix-org/synapse/issues/8067))
