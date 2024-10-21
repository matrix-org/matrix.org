+++
title = "Synapse 1.22.0 released"
date = "2020-10-27T17:01:23Z"
path = "/blog/2020/10/27/synapse-1-22-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

[Synapse 1.22.0](https://github.com/matrix-org/synapse/releases/tag/v1.22.0) now available!

This release focused on improving Synapse's horizontal scalability, including:

* Support for running background tasks in separate worker processes.
* Fixes to sharded event persisters, which were experimentally introduced in 1.21.0.
* Fixing a message duplication bug with worker-based deployments. ([\#8476](https://github.com/matrix-org/synapse/issues/8476))

Synapse 1.22.0 also has a few other notable changes:

* Defaulting to [version 6](https://matrix.org/docs/spec/rooms/v6) rooms, per [MSC2788](https://github.com/matrix-org/matrix-doc/pull/2788/).
* Initial support for three new experimental MSCs:
    * [MSC2732](https://github.com/matrix-org/matrix-doc/pull/2732): Supporting olm fallback keys
    * [MSC2697](https://github.com/matrix-org/matrix-doc/pull/2697): Supporting device dehydration
    * [MSC2409](https://github.com/matrix-org/matrix-doc/pull/2409): Allowing appservices to receive ephemeral events like read receipts, presence, and typing indicators.
* Multi-arch Docker images, covering `arm64` and `arm/v7` in addition to `amd64`.

Installation instructions are available [on GitHub](https://github.com/matrix-org/synapse/blob/master/INSTALL.md), as is the `v1.22.0` [release tag](https://github.com/matrix-org/synapse/releases/tag/v1.22.0).

Lastly, Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [@Akkowicz](https://github.com/Akkowicz), [@BBBSnowball](https://github.com/BBBSnowball), [@maquis196](https://github.com/maquis196), and [@samuel-p](https://github.com/samuel-p).

The full changelog for 1.22.0 is as follows:

## Synapse 1.22.0 (2020-10-27)

No significant changes.

## Synapse 1.22.0rc2 (2020-10-26)

### Bugfixes

* Fix bugs where ephemeral events were not sent to appservices. Broke in v1.22.0rc1. ([\#8648](https://github.com/matrix-org/synapse/issues/8648), [\#8656](https://github.com/matrix-org/synapse/issues/8656))
* Fix `user_daily_visits` table to not have duplicate rows per user/device due to multiple user agents. Broke in v1.22.0rc1. ([\#8654](https://github.com/matrix-org/synapse/issues/8654))

## Synapse 1.22.0rc1 (2020-10-22)

### Features

* Add a configuration option for always using the "userinfo endpoint" for OpenID Connect. This fixes support for some identity providers, e.g. GitLab. Contributed by Benjamin Koch. ([\#7658](https://github.com/matrix-org/synapse/issues/7658))
* Add ability for `ThirdPartyEventRules` modules to query and manipulate whether a room is in the public rooms directory. ([\#8292](https://github.com/matrix-org/synapse/issues/8292), [\#8467](https://github.com/matrix-org/synapse/issues/8467))
* Add support for olm fallback keys ([MSC2732](https://github.com/matrix-org/matrix-doc/pull/2732)). ([\#8312](https://github.com/matrix-org/synapse/issues/8312), [\#8501](https://github.com/matrix-org/synapse/issues/8501))
* Add support for running background tasks in a separate worker process. ([\#8369](https://github.com/matrix-org/synapse/issues/8369), [\#8458](https://github.com/matrix-org/synapse/issues/8458), [\#8489](https://github.com/matrix-org/synapse/issues/8489), [\#8513](https://github.com/matrix-org/synapse/issues/8513), [\#8544](https://github.com/matrix-org/synapse/issues/8544), [\#8599](https://github.com/matrix-org/synapse/issues/8599))
* Add support for device dehydration ([MSC2697](https://github.com/matrix-org/matrix-doc/pull/2697)). ([\#8380](https://github.com/matrix-org/synapse/issues/8380))
* Add support for [MSC2409](https://github.com/matrix-org/matrix-doc/pull/2409), which allows sending typing, read receipts, and presence events to appservices. ([\#8437](https://github.com/matrix-org/synapse/issues/8437), [\#8590](https://github.com/matrix-org/synapse/issues/8590))
* Change default room version to "6", per [MSC2788](https://github.com/matrix-org/matrix-doc/pull/2788). ([\#8461](https://github.com/matrix-org/synapse/issues/8461))
* Add the ability to send non-membership events into a room via the `ModuleApi`. ([\#8479](https://github.com/matrix-org/synapse/issues/8479))
* Increase default upload size limit from 10M to 50M. Contributed by @Akkowicz. ([\#8502](https://github.com/matrix-org/synapse/issues/8502))
* Add support for modifying event content in `ThirdPartyRules` modules. ([\#8535](https://github.com/matrix-org/synapse/issues/8535), [\#8564](https://github.com/matrix-org/synapse/issues/8564))

### Bugfixes

* Fix a longstanding bug where invalid ignored users in account data could break clients. ([\#8454](https://github.com/matrix-org/synapse/issues/8454))
* Fix a bug where backfilling a room with an event that was missing the `redacts` field would break. ([\#8457](https://github.com/matrix-org/synapse/issues/8457))
* Don't attempt to respond to some requests if the client has already disconnected. ([\#8465](https://github.com/matrix-org/synapse/issues/8465))
* Fix message duplication if something goes wrong after persisting the event. ([\#8476](https://github.com/matrix-org/synapse/issues/8476))
* Fix incremental sync returning an incorrect `prev_batch` token in timeline section, which when used to paginate returned events that were included in the incremental sync. Broken since v0.16.0. ([\#8486](https://github.com/matrix-org/synapse/issues/8486))
* Expose the `uk.half-shot.msc2778.login.application_service` to clients from the login API. This feature was added in v1.21.0, but was not exposed as a potential login flow. ([\#8504](https://github.com/matrix-org/synapse/issues/8504))
* Fix error code for `/profile/{userId}/displayname` to be `M_BAD_JSON`. ([\#8517](https://github.com/matrix-org/synapse/issues/8517))
* Fix a bug introduced in v1.7.0 that could cause Synapse to insert values from non-state `m.room.retention` events into the `room_retention` database table. ([\#8527](https://github.com/matrix-org/synapse/issues/8527))
* Fix not sending events over federation when using sharded event writers. ([\#8536](https://github.com/matrix-org/synapse/issues/8536))
* Fix a long standing bug where email notifications for encrypted messages were blank. ([\#8545](https://github.com/matrix-org/synapse/issues/8545))
* Fix increase in the number of `There was no active span...` errors logged when using OpenTracing. ([\#8567](https://github.com/matrix-org/synapse/issues/8567))
* Fix a bug that prevented errors encountered during execution of the `synapse_port_db` from being correctly printed. ([\#8585](https://github.com/matrix-org/synapse/issues/8585))
* Fix appservice transactions to only include a maximum of 100 persistent and 100 ephemeral events. ([\#8606](https://github.com/matrix-org/synapse/issues/8606))

### Updates to the Docker image

* Added multi-arch support (arm64,arm/v7) for the docker images. Contributed by @maquis196. ([\#7921](https://github.com/matrix-org/synapse/issues/7921))
* Add support for passing commandline args to the synapse process. Contributed by @samuel-p. ([\#8390](https://github.com/matrix-org/synapse/issues/8390))

### Improved Documentation

* Update the directions for using the manhole with coroutines. ([\#8462](https://github.com/matrix-org/synapse/issues/8462))
* Improve readme by adding new shield.io badges. ([\#8493](https://github.com/matrix-org/synapse/issues/8493))
* Added note about docker in manhole.md regarding which ip address to bind to. Contributed by @Maquis196. ([\#8526](https://github.com/matrix-org/synapse/issues/8526))
* Document the new behaviour of the `allowed_lifetime_min` and `allowed_lifetime_max` settings in the room retention configuration. ([\#8529](https://github.com/matrix-org/synapse/issues/8529))

### Deprecations and Removals

* Drop unused `device_max_stream_id` table. ([\#8589](https://github.com/matrix-org/synapse/issues/8589))

### Internal Changes

* Check for unreachable code with mypy. ([\#8432](https://github.com/matrix-org/synapse/issues/8432))
* Add unit test for event persister sharding. ([\#8433](https://github.com/matrix-org/synapse/issues/8433))
* Allow events to be sent to clients sooner when using sharded event persisters. ([\#8439](https://github.com/matrix-org/synapse/issues/8439), [\#8488](https://github.com/matrix-org/synapse/issues/8488), [\#8496](https://github.com/matrix-org/synapse/issues/8496), [\#8499](https://github.com/matrix-org/synapse/issues/8499))
* Configure `public_baseurl` when using demo scripts. ([\#8443](https://github.com/matrix-org/synapse/issues/8443))
* Add SQL logging on queries that happen during startup. ([\#8448](https://github.com/matrix-org/synapse/issues/8448))
* Speed up unit tests when using PostgreSQL. ([\#8450](https://github.com/matrix-org/synapse/issues/8450))
* Remove redundant database loads of stream_ordering for events we already have. ([\#8452](https://github.com/matrix-org/synapse/issues/8452))
* Reduce inconsistencies between codepaths for membership and non-membership events. ([\#8463](https://github.com/matrix-org/synapse/issues/8463))
* Combine `SpamCheckerApi` with the more generic `ModuleApi`. ([\#8464](https://github.com/matrix-org/synapse/issues/8464))
* Additional testing for `ThirdPartyEventRules`. ([\#8468](https://github.com/matrix-org/synapse/issues/8468))
* Add `-d` option to `./scripts-dev/lint.sh` to lint files that have changed since the last git commit. ([\#8472](https://github.com/matrix-org/synapse/issues/8472))
* Unblacklist some sytests. ([\#8474](https://github.com/matrix-org/synapse/issues/8474))
* Include the log level in the phone home stats. ([\#8477](https://github.com/matrix-org/synapse/issues/8477))
* Remove outdated sphinx documentation, scripts and configuration. ([\#8480](https://github.com/matrix-org/synapse/issues/8480))
* Clarify error message when plugin config parsers raise an error. ([\#8492](https://github.com/matrix-org/synapse/issues/8492))
* Remove the deprecated `Handlers` object. ([\#8494](https://github.com/matrix-org/synapse/issues/8494))
* Fix a threadsafety bug in unit tests. ([\#8497](https://github.com/matrix-org/synapse/issues/8497))
* Add user agent to user_daily_visits table. ([\#8503](https://github.com/matrix-org/synapse/issues/8503))
* Add type hints to various parts of the code base. ([\#8407](https://github.com/matrix-org/synapse/issues/8407), [\#8505](https://github.com/matrix-org/synapse/issues/8505), [\#8507](https://github.com/matrix-org/synapse/issues/8507), [\#8547](https://github.com/matrix-org/synapse/issues/8547), [\#8562](https://github.com/matrix-org/synapse/issues/8562), [\#8609](https://github.com/matrix-org/synapse/issues/8609))
* Remove unused code from the test framework. ([\#8514](https://github.com/matrix-org/synapse/issues/8514))
* Apply some internal fixes to the `HomeServer` class to make its code more idiomatic and statically-verifiable. ([\#8515](https://github.com/matrix-org/synapse/issues/8515))
* Factor out common code between `RoomMemberHandler._locally_reject_invite` and `EventCreationHandler.create_event`. ([\#8537](https://github.com/matrix-org/synapse/issues/8537))
* Improve database performance by executing more queries without starting transactions. ([\#8542](https://github.com/matrix-org/synapse/issues/8542))
* Rename `Cache` to `DeferredCache`, to better reflect its purpose. ([\#8548](https://github.com/matrix-org/synapse/issues/8548))
* Move metric registration code down into `LruCache`. ([\#8561](https://github.com/matrix-org/synapse/issues/8561), [\#8591](https://github.com/matrix-org/synapse/issues/8591))
* Replace `DeferredCache` with the lighter-weight `LruCache` where possible. ([\#8563](https://github.com/matrix-org/synapse/issues/8563))
* Add virtualenv-generated folders to `.gitignore`. ([\#8566](https://github.com/matrix-org/synapse/issues/8566))
* Add `get_immediate` method to `DeferredCache`. ([\#8568](https://github.com/matrix-org/synapse/issues/8568))
* Fix mypy not properly checking across the codebase, additionally, fix a typing assertion error in `handlers/auth.py`. ([\#8569](https://github.com/matrix-org/synapse/issues/8569))
* Fix `synmark` benchmark runner. ([\#8571](https://github.com/matrix-org/synapse/issues/8571))
* Modify `DeferredCache.get()` to return `Deferred`s instead of `ObservableDeferred`s. ([\#8572](https://github.com/matrix-org/synapse/issues/8572))
* Adjust a protocol-type definition to fit `sqlite3` assertions. ([\#8577](https://github.com/matrix-org/synapse/issues/8577))
* Support macOS on the `synmark` benchmark runner. ([\#8578](https://github.com/matrix-org/synapse/issues/8578))
* Update `mypy` static type checker to 0.790. ([\#8583](https://github.com/matrix-org/synapse/issues/8583), [\#8600](https://github.com/matrix-org/synapse/issues/8600))
* Re-organize the structured logging code to separate the TCP transport handling from the JSON formatting. ([\#8587](https://github.com/matrix-org/synapse/issues/8587))
* Remove extraneous unittest logging decorators from unit tests. ([\#8592](https://github.com/matrix-org/synapse/issues/8592))
* Minor optimisations in caching code. ([\#8593](https://github.com/matrix-org/synapse/issues/8593), [\#8594](https://github.com/matrix-org/synapse/issues/8594))
