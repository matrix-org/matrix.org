+++
title = "Synapse 1.7.0 released"
path = "/blog/2019/12/13/synapse-1-7-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Hello people, it’s Synapse 1.7.0 time.

This release includes some long requested features, most notably the ability to automatically delete message data after a predefined period. For more details take a look at the config [here](https://github.com/matrix-org/synapse/blob/v1.7.0/docs/sample_config.yaml#L332-L393) ─ it should be pretty self explanatory.

Another significant change this release is to explicitly set room directories to be private by default. Previously it was possible to inadvertently configure the directory to be visible to arbitrary Matrix servers and the internet in general.

This means that for those admins who want their room directories to be publicly searchable (matrix.org for instance) they need to explicitly say so in the config. For more details see the [upgrade notes](https://github.com/matrix-org/synapse/blob/v1.7.0/UPGRADE.rst#upgrading-to-v170) and our [blog post](https://matrix.org/blog/2019/11/09/avoiding-unwelcome-visitors-on-private-matrix-servers/) explaining the situation in greater detail.

We also have early support for ephemeral messages, as well as the ability to specify a reason when rejecting an invite (amongst other actions).

Aside from all of that, we want to let you know about some changes on the horizon. Currently Synapse runs Sqlite by default. This is great in that it gets new admins going quickly without needing to install and configure Postgres. The downside of using Sqlite is that it offers very poor performance, especially once a server tries to join the federation. In truth Sqlite is only really there to demonstrate the service, but for anything other than the most trivial cases it is essential to migrate to Postgres.

Over the past few months we’ve been working to improve the migration path to Postgres such that finally we feel confident to actively encourage admins to migrate. What’s more, in a future release we will forcibly prevent SQLite-backed servers federating unless the admin explicitly sets a config flag to show that they understand the trade-off they are making.

Overall we see these changes as something that will improve everyone’s experience of the matrix federation. We’ll talk more about this closer to the time, but please expect a change in the coming months and if you are running SQLite, consider this a nudge to get yourself migrated.

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.7.0) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse).

The changelog since 1.6.1 follows:

## Synapse 1.7.0 (2019-12-13)

This release changes the default settings so that only local authenticated users can query the server's room directory. See the [upgrade notes](https://github.com/matrix-org/synapse/blob/v1.7.0/UPGRADE.rst#upgrading-to-v170) for details.

Support for SQLite versions before 3.11 is now deprecated. A future release will refuse to start if used with an SQLite version before 3.11.

Administrators are reminded that SQLite should not be used for production instances. Instructions for migrating to Postgres are available [here](https://github.com/matrix-org/synapse/blob/v1.7.0/docs/postgres.md). A future release of synapse will, by default, disable federation for servers using SQLite.

No significant changes since 1.7.0rc2.

## Synapse 1.7.0rc2 (2019-12-11)

### Bugfixes

- Fix incorrect error message for invalid requests when setting user's avatar URL. ([\#6497](https://github.com/matrix-org/synapse/issues/6497))
- Fix support for SQLite 3.7. ([\#6499](https://github.com/matrix-org/synapse/issues/6499))
- Fix regression where sending email push would not work when using a pusher worker. ([\#6507](https://github.com/matrix-org/synapse/issues/6507), [\#6509](https://github.com/matrix-org/synapse/issues/6509))

## Synapse 1.7.0rc1 (2019-12-09)

### Features

- Implement per-room message retention policies. ([\#5815](https://github.com/matrix-org/synapse/issues/5815), [\#6436](https://github.com/matrix-org/synapse/issues/6436))
- Add etag and count fields to key backup endpoints to help clients guess if there are new keys. ([\#5858](https://github.com/matrix-org/synapse/issues/5858))
- Add `/admin/v2/users` endpoint with pagination. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#5925](https://github.com/matrix-org/synapse/issues/5925))
- Require User-Interactive Authentication for `/account/3pid/add`, meaning the user's password will be required to add a third-party ID to their account. ([\#6119](https://github.com/matrix-org/synapse/issues/6119))
- Implement the `/_matrix/federation/unstable/net.atleastfornow/state/<context>` API as drafted in MSC2314. ([\#6176](https://github.com/matrix-org/synapse/issues/6176))
- Configure privacy-preserving settings by default for the room directory. ([\#6355](https://github.com/matrix-org/synapse/issues/6355))
- Add ephemeral messages support by partially implementing [MSC2228](https://github.com/matrix-org/matrix-doc/pull/2228). ([\#6409](https://github.com/matrix-org/synapse/issues/6409))
- Add support for [MSC 2367](https://github.com/matrix-org/matrix-doc/pull/2367), which allows specifying a reason on all membership events. ([\#6434](https://github.com/matrix-org/synapse/issues/6434))

### Bugfixes

- Transfer non-standard power levels on room upgrade. ([\#6237](https://github.com/matrix-org/synapse/issues/6237))
- Fix error from the Pillow library when uploading RGBA images. ([\#6241](https://github.com/matrix-org/synapse/issues/6241))
- Correctly apply the event filter to the `state`, `events_before` and `events_after` fields in the response to `/context` requests. ([\#6329](https://github.com/matrix-org/synapse/issues/6329))
- Fix caching devices for remote users when using workers, so that we don't attempt to refetch (and potentially fail) each time a user requests devices. ([\#6332](https://github.com/matrix-org/synapse/issues/6332))
- Prevent account data syncs getting lost across TCP replication. ([\#6333](https://github.com/matrix-org/synapse/issues/6333))
- Fix bug: TypeError in `register_user()` while using LDAP auth module. ([\#6406](https://github.com/matrix-org/synapse/issues/6406))
- Fix an intermittent exception when handling read-receipts. ([\#6408](https://github.com/matrix-org/synapse/issues/6408))
- Fix broken guest registration when there are existing blocks of numeric user IDs. ([\#6420](https://github.com/matrix-org/synapse/issues/6420))
- Fix startup error when http proxy is defined. ([\#6421](https://github.com/matrix-org/synapse/issues/6421))
- Fix error when using synapse_port_db on a vanilla synapse db. ([\#6449](https://github.com/matrix-org/synapse/issues/6449))
- Fix uploading multiple cross signing signatures for the same user. ([\#6451](https://github.com/matrix-org/synapse/issues/6451))
- Fix bug which lead to exceptions being thrown in a loop when a cross-signed device is deleted. ([\#6462](https://github.com/matrix-org/synapse/issues/6462))
- Fix `synapse_port_db` not exiting with a 0 code if something went wrong during the port process. ([\#6470](https://github.com/matrix-org/synapse/issues/6470))
- Improve sanity-checking when receiving events over federation. ([\#6472](https://github.com/matrix-org/synapse/issues/6472))
- Fix inaccurate per-block Prometheus metrics. ([\#6491](https://github.com/matrix-org/synapse/issues/6491))
- Fix small performance regression for sending invites. ([\#6493](https://github.com/matrix-org/synapse/issues/6493))
- Back out cross-signing code added in Synapse 1.5.0, which caused a performance regression. ([\#6494](https://github.com/matrix-org/synapse/issues/6494))

### Improved Documentation

- Update documentation and variables in user contributed systemd reference file. ([\#6369](https://github.com/matrix-org/synapse/issues/6369), [\#6490](https://github.com/matrix-org/synapse/issues/6490))
- Fix link in the user directory documentation. ([\#6388](https://github.com/matrix-org/synapse/issues/6388))
- Add build instructions to the docker readme. ([\#6390](https://github.com/matrix-org/synapse/issues/6390))
- Switch Ubuntu package install recommendation to use python3 packages in INSTALL.md. ([\#6443](https://github.com/matrix-org/synapse/issues/6443))
- Write some docs for the quarantine_media api. ([\#6458](https://github.com/matrix-org/synapse/issues/6458))
- Convert CONTRIBUTING.rst to markdown (among other small fixes). ([\#6461](https://github.com/matrix-org/synapse/issues/6461))

### Deprecations and Removals

- Remove admin/v1/users_paginate endpoint. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#5925](https://github.com/matrix-org/synapse/issues/5925))
- Remove fallback for federation with old servers which lack the /federation/v1/state_ids API. ([\#6488](https://github.com/matrix-org/synapse/issues/6488))

### Internal Changes

- Add benchmarks for structured logging and improve output performance. ([\#6266](https://github.com/matrix-org/synapse/issues/6266))
- Improve the performance of outputting structured logging. ([\#6322](https://github.com/matrix-org/synapse/issues/6322))
- Refactor some code in the event authentication path for clarity. ([\#6343](https://github.com/matrix-org/synapse/issues/6343), [\#6468](https://github.com/matrix-org/synapse/issues/6468), [\#6480](https://github.com/matrix-org/synapse/issues/6480))
- Clean up some unnecessary quotation marks around the codebase. ([\#6362](https://github.com/matrix-org/synapse/issues/6362))
- Complain on startup instead of 500'ing during runtime when `public_baseurl` isn't set when necessary. ([\#6379](https://github.com/matrix-org/synapse/issues/6379))
- Add a test scenario to make sure room history purges don't break `/messages` in the future. ([\#6392](https://github.com/matrix-org/synapse/issues/6392))
- Clarifications for the email configuration settings. ([\#6423](https://github.com/matrix-org/synapse/issues/6423))
- Add more tests to the blacklist when running in worker mode. ([\#6429](https://github.com/matrix-org/synapse/issues/6429))
- Refactor data store layer to support multiple databases in the future. ([\#6454](https://github.com/matrix-org/synapse/issues/6454), [\#6464](https://github.com/matrix-org/synapse/issues/6464), [\#6469](https://github.com/matrix-org/synapse/issues/6469), [\#6487](https://github.com/matrix-org/synapse/issues/6487))
- Port synapse.rest.client.v1 to async/await. ([\#6482](https://github.com/matrix-org/synapse/issues/6482))
- Port synapse.rest.client.v2_alpha to async/await. ([\#6483](https://github.com/matrix-org/synapse/issues/6483))
- Port SyncHandler to async/await. ([\#6484](https://github.com/matrix-org/synapse/issues/6484))
