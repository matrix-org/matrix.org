+++
title = "Synapse 1.9.0 released"
path = "/blog/2020/01/23/synapse-1-9-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.9.0 contains a bunch of new admin APIs as well as bug fixes to existing ones. In particular we have a new end point that allows admins to [query which rooms their server participates in](https://github.com/matrix-org/synapse/blob/master/docs/admin_api/rooms.md).

Aside from that it is worth noting that we have officially dropped support for SQLite versions < 3.11. Though more generally we would recommend that all admins [migrate to Postgres](https://github.com/matrix-org/synapse/blob/release-v1.9.0/docs/postgres.md) for anything other than test and evaluation purposes.

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.9.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since Synapse 1.8.0

## Synapse 1.9.0 (2020-01-23)

**WARNING**: As of this release, Synapse no longer supports versions of SQLite before 3.11, and will refuse to start when configured to use an older version. Administrators are recommended to migrate their database to Postgres (see instructions [here](https://github.com/matrix-org/synapse/blob/release-v1.9.0/docs/postgres.md)).

If your Synapse deployment uses workers, note that the reverse-proxy configurations for the `synapse.app.media_repository`, `synapse.app.federation_reader` and `synapse.app.event_creator` workers have changed, with the addition of a few paths (see the updated configurations [here](https://github.com/matrix-org/synapse/blob/release-v1.9.0/docs/workers.md#available-worker-applications)). Existing configurations will continue to work.

### Improved Documentation

- Fix endpoint documentation for the List Rooms admin API. ([\#6770](https://github.com/matrix-org/synapse/issues/6770))

## Synapse 1.9.0rc1 (2020-01-22)

### Features

- Allow admin to create or modify a user. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#5742](https://github.com/matrix-org/synapse/issues/5742))
- Add new quarantine media admin APIs to quarantine by media ID or by user who uploaded the media. ([\#6681](https://github.com/matrix-org/synapse/issues/6681), [\#6756](https://github.com/matrix-org/synapse/issues/6756))
- Add `org.matrix.e2e_cross_signing` to `unstable_features` in `/versions` as per [MSC1756](https://github.com/matrix-org/matrix-doc/pull/1756). ([\#6712](https://github.com/matrix-org/synapse/issues/6712))
- Add a new admin API to list and filter rooms on the server. ([\#6720](https://github.com/matrix-org/synapse/issues/6720))

### Bugfixes

- Correctly proxy HTTP errors due to API calls to remote group servers. ([\#6654](https://github.com/matrix-org/synapse/issues/6654))
- Fix media repo admin APIs when using a media worker. ([\#6664](https://github.com/matrix-org/synapse/issues/6664))
- Fix "CRITICAL" errors being logged when a request is received for a uri containing non-ascii characters. ([\#6682](https://github.com/matrix-org/synapse/issues/6682))
- Fix a bug where we would assign a numeric user ID if somebody tried registering with an empty username. ([\#6690](https://github.com/matrix-org/synapse/issues/6690))
- Fix `purge_room` admin API. ([\#6711](https://github.com/matrix-org/synapse/issues/6711))
- Fix a bug causing Synapse to not always purge quiet rooms with a low `max_lifetime` in their message retention policies when running the automated purge jobs. ([\#6714](https://github.com/matrix-org/synapse/issues/6714))
- Fix the `synapse_port_db` not correctly running background updates. Thanks @tadzik for reporting. ([\#6718](https://github.com/matrix-org/synapse/issues/6718))
- Fix changing password via user admin API. ([\#6730](https://github.com/matrix-org/synapse/issues/6730))
- Fix `/events/:event_id` deprecated API. ([\#6731](https://github.com/matrix-org/synapse/issues/6731))
- Fix monthly active user limiting support for worker mode, fixes [#4639](https://github.com/matrix-org/synapse/issues/4639). ([\#6742](https://github.com/matrix-org/synapse/issues/6742))
- Fix bug when setting `account_validity` to an empty block in the config. Thanks to @Sorunome for reporting. ([\#6747](https://github.com/matrix-org/synapse/issues/6747))
- Fix `AttributeError: 'NoneType' object has no attribute 'get'` in `hash_password` when configuration has an empty `password_config`. Contributed by @ivilata. ([\#6753](https://github.com/matrix-org/synapse/issues/6753))
- Fix the `docker-compose.yaml` overriding the entire `/etc` folder of the container. Contributed by Fabian Meyer. ([\#6656](https://github.com/matrix-org/synapse/issues/6656))

### Improved Documentation

- Fix a typo in the configuration example for purge jobs in the sample configuration file. ([\#6621](https://github.com/matrix-org/synapse/issues/6621))
- Add complete documentation of the message retention policies support. ([\#6624](https://github.com/matrix-org/synapse/issues/6624), [\#6665](https://github.com/matrix-org/synapse/issues/6665))
- Add some helpful tips about changelog entries to the GitHub pull request template. ([\#6663](https://github.com/matrix-org/synapse/issues/6663))
- Clarify the `account_validity` and `email` sections of the sample configuration. ([\#6685](https://github.com/matrix-org/synapse/issues/6685))
- Add more endpoints to the documentation for Synapse workers. ([\#6698](https://github.com/matrix-org/synapse/issues/6698))

### Deprecations and Removals

- Synapse no longer supports versions of SQLite before 3.11, and will refuse to start when configured to use an older version. Administrators are recommended to migrate their database to Postgres (see instructions [here](docs/postgres.md)). ([\#6675](https://github.com/matrix-org/synapse/issues/6675))

### Internal Changes

- Add `local_current_membership` table for tracking local user membership state in rooms. ([\#6655](https://github.com/matrix-org/synapse/issues/6655), [\#6728](https://github.com/matrix-org/synapse/issues/6728))
- Port `synapse.replication.tcp` to async/await. ([\#6666](https://github.com/matrix-org/synapse/issues/6666))
- Fixup `synapse.replication` to pass mypy checks. ([\#6667](https://github.com/matrix-org/synapse/issues/6667))
- Allow `additional_resources` to implement `IResource` directly. ([\#6686](https://github.com/matrix-org/synapse/issues/6686))
- Allow REST endpoint implementations to raise a `RedirectException`, which will redirect the user's browser to a given location. ([\#6687](https://github.com/matrix-org/synapse/issues/6687))
- Updates and extensions to the module API. ([\#6688](https://github.com/matrix-org/synapse/issues/6688))
- Updates to the SAML mapping provider API. ([\#6689](https://github.com/matrix-org/synapse/issues/6689), [\#6723](https://github.com/matrix-org/synapse/issues/6723))
- Remove redundant `RegistrationError` class. ([\#6691](https://github.com/matrix-org/synapse/issues/6691))
- Don't block processing of incoming EDUs behind processing PDUs in the same transaction. ([\#6697](https://github.com/matrix-org/synapse/issues/6697))
- Remove duplicate check for the `session` query parameter on the `/auth/xxx/fallback/web` Client-Server endpoint. ([\#6702](https://github.com/matrix-org/synapse/issues/6702))
- Attempt to retry sending a transaction when we detect a remote server has come back online, rather than waiting for a transaction to be triggered by new data. ([\#6706](https://github.com/matrix-org/synapse/issues/6706))
- Add `StateMap` type alias to simplify types. ([\#6715](https://github.com/matrix-org/synapse/issues/6715))
- Add a `DeltaState` to track changes to be made to current state during event persistence. ([\#6716](https://github.com/matrix-org/synapse/issues/6716))
- Add more logging around message retention policies support. ([\#6717](https://github.com/matrix-org/synapse/issues/6717))
- When processing a SAML response, log the assertions for easier configuration. ([\#6724](https://github.com/matrix-org/synapse/issues/6724))
- Fixup `synapse.rest` to pass mypy. ([\#6732](https://github.com/matrix-org/synapse/issues/6732), [\#6764](https://github.com/matrix-org/synapse/issues/6764))
- Fixup `synapse.api` to pass mypy. ([\#6733](https://github.com/matrix-org/synapse/issues/6733))
- Allow streaming cache 'invalidate all' to workers. ([\#6749](https://github.com/matrix-org/synapse/issues/6749))
- Remove unused CI docker compose files. ([\#6754](https://github.com/matrix-org/synapse/issues/6754))
