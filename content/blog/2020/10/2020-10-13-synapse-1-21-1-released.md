+++
title = "Synapse 1.21.1 released"
path = "/blog/2020/10/13/synapse-1-21-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.21.1 has landed!

Highlights of 1.21.1 include:-

* Add experimental support for sharding event persister. ([\#8294](https://github.com/matrix-org/synapse/issues/8294), [\#8387](https://github.com/matrix-org/synapse/issues/8387), [\#8396](https://github.com/matrix-org/synapse/issues/8396), [\#8419](https://github.com/matrix-org/synapse/issues/8419))

* Add experimental prometheus metric to track numbers of "large" rooms for state resolutiom. ([\#8425](https://github.com/matrix-org/synapse/issues/8425))
* Add prometheus metrics to track federation delays. ([\#8430](https://github.com/matrix-org/synapse/issues/8430))

* Fix messages not being sent over federation until an event is sent into the same room. ([\#8230](https://github.com/matrix-org/synapse/issues/8230), [\#8247](https://github.com/matrix-org/synapse/issues/8247), [\#8258](https://github.com/matrix-org/synapse/issues/8258), [\#8272](https://github.com/matrix-org/synapse/issues/8272), [\#8322](https://github.com/matrix-org/synapse/issues/8322))

We've also made some improvements to SSO and added new admin APIs.

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.21.1 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.21.1)

The changelog for 1.21.1 is as follows:

## Synapse 1.21.1 (2020-10-13)

This release fixes a regression in v1.21.0 that prevented debian packages from being built.

It is otherwise identical to v1.21.0.

## Synapse 1.21.0 (2020-10-12)

No significant changes since v1.21.0rc3.

As [noted in v1.20.0](https://github.com/matrix-org/synapse/blob/release-v1.21.1/CHANGES.md#synapse-1200-2020-09-22), a future release will drop support for accessing Synapse's [Admin API](https://github.com/matrix-org/synapse/tree/master/docs/admin_api) under the `/_matrix/client/*` endpoint prefixes. At that point, the Admin API will only be accessible under `/_synapse/admin`.

## Synapse 1.21.0rc3 (2020-10-08)

### Bugfixes

* Fix duplication of events on high traffic servers, caused by PostgreSQL `could not serialize access due to concurrent update` errors. ([\#8456](https://github.com/matrix-org/synapse/issues/8456))

### Internal Changes

* Add Groovy Gorilla to the list of distributions we build `.deb`s for. ([\#8475](https://github.com/matrix-org/synapse/issues/8475))

## Synapse 1.21.0rc2 (2020-10-02)

### Features

* Convert additional templates from inline HTML to Jinja2 templates. ([\#8444](https://github.com/matrix-org/synapse/issues/8444))

### Bugfixes

* Fix a regression in v1.21.0rc1 which broke thumbnails of remote media. ([\#8438](https://github.com/matrix-org/synapse/issues/8438))
* Do not expose the experimental `uk.half-shot.msc2778.login.application_service` flow in the login API, which caused a compatibility problem with Element iOS. ([\#8440](https://github.com/matrix-org/synapse/issues/8440))
* Fix malformed log line in new federation "catch up" logic. ([\#8442](https://github.com/matrix-org/synapse/issues/8442))
* Fix DB query on startup for negative streams which caused long start up times. Introduced in [\#8374](https://github.com/matrix-org/synapse/issues/8374). ([\#8447](https://github.com/matrix-org/synapse/issues/8447))

## Synapse 1.21.0rc1 (2020-10-01)

### Features

* Require the user to confirm that their password should be reset after clicking the email confirmation link. ([\#8004](https://github.com/matrix-org/synapse/issues/8004))
* Add an admin API `GET /_synapse/admin/v1/event_reports` to read entries of table `event_reports`. Contributed by @dklimpel. ([\#8217](https://github.com/matrix-org/synapse/issues/8217))
* Consolidate the SSO error template across all configuration. ([\#8248](https://github.com/matrix-org/synapse/issues/8248), [\#8405](https://github.com/matrix-org/synapse/issues/8405))
* Add a configuration option to specify a whitelist of domains that a user can be redirected to after validating their email or phone number. ([\#8275](https://github.com/matrix-org/synapse/issues/8275), [\#8417](https://github.com/matrix-org/synapse/issues/8417))
* Add experimental support for sharding event persister. ([\#8294](https://github.com/matrix-org/synapse/issues/8294), [\#8387](https://github.com/matrix-org/synapse/issues/8387), [\#8396](https://github.com/matrix-org/synapse/issues/8396), [\#8419](https://github.com/matrix-org/synapse/issues/8419))
* Add the room topic and avatar to the room details admin API. ([\#8305](https://github.com/matrix-org/synapse/issues/8305))
* Add an admin API for querying rooms where a user is a member. Contributed by @dklimpel. ([\#8306](https://github.com/matrix-org/synapse/issues/8306))
* Add `uk.half-shot.msc2778.login.application_service` login type to allow appservices to login. ([\#8320](https://github.com/matrix-org/synapse/issues/8320))
* Add a configuration option that allows existing users to log in with OpenID Connect. Contributed by @BBBSnowball and @OmmyZhang. ([\#8345](https://github.com/matrix-org/synapse/issues/8345))
* Add prometheus metrics for replication requests. ([\#8406](https://github.com/matrix-org/synapse/issues/8406))
* Support passing additional single sign-on parameters to the client. ([\#8413](https://github.com/matrix-org/synapse/issues/8413))
* Add experimental reporting of metrics on expensive rooms for state-resolution. ([\#8420](https://github.com/matrix-org/synapse/issues/8420))
* Add experimental prometheus metric to track numbers of "large" rooms for state resolutiom. ([\#8425](https://github.com/matrix-org/synapse/issues/8425))
* Add prometheus metrics to track federation delays. ([\#8430](https://github.com/matrix-org/synapse/issues/8430))

### Bugfixes

* Fix a bug in the media repository where remote thumbnails with the same size but different crop methods would overwrite each other. Contributed by @deepbluev7. ([\#7124](https://github.com/matrix-org/synapse/issues/7124))
* Fix inconsistent handling of non-existent push rules, and stop tracking the `enabled` state of removed push rules. ([\#7796](https://github.com/matrix-org/synapse/issues/7796))
* Fix a longstanding bug when storing a media file with an empty `upload_name`. ([\#7905](https://github.com/matrix-org/synapse/issues/7905))
* Fix messages not being sent over federation until an event is sent into the same room. ([\#8230](https://github.com/matrix-org/synapse/issues/8230), [\#8247](https://github.com/matrix-org/synapse/issues/8247), [\#8258](https://github.com/matrix-org/synapse/issues/8258), [\#8272](https://github.com/matrix-org/synapse/issues/8272), [\#8322](https://github.com/matrix-org/synapse/issues/8322))
* Fix a longstanding bug where files that could not be thumbnailed would result in an Internal Server Error. ([\#8236](https://github.com/matrix-org/synapse/issues/8236), [\#8435](https://github.com/matrix-org/synapse/issues/8435))
* Upgrade minimum version of `canonicaljson` to version 1.4.0, to fix an unicode encoding issue. ([\#8262](https://github.com/matrix-org/synapse/issues/8262))
* Fix longstanding bug which could lead to incomplete database upgrades on SQLite. ([\#8265](https://github.com/matrix-org/synapse/issues/8265))
* Fix stack overflow when stderr is redirected to the logging system, and the logging system encounters an error. ([\#8268](https://github.com/matrix-org/synapse/issues/8268))
* Fix a bug which cause the logging system to report errors, if `DEBUG` was enabled and no `context` filter was applied. ([\#8278](https://github.com/matrix-org/synapse/issues/8278))
* Fix edge case where push could get delayed for a user until a later event was pushed. ([\#8287](https://github.com/matrix-org/synapse/issues/8287))
* Fix fetching malformed events from remote servers. ([\#8324](https://github.com/matrix-org/synapse/issues/8324))
* Fix `UnboundLocalError` from occurring when appservices send a malformed register request. ([\#8329](https://github.com/matrix-org/synapse/issues/8329))
* Don't send push notifications to expired user accounts. ([\#8353](https://github.com/matrix-org/synapse/issues/8353))
* Fix a regression in v1.19.0 with reactivating users through the admin API. ([\#8362](https://github.com/matrix-org/synapse/issues/8362))
* Fix a bug where during device registration the length of the device name wasn't limited. ([\#8364](https://github.com/matrix-org/synapse/issues/8364))
* Include `guest_access` in the fields that are checked for null bytes when updating `room_stats_state`. Broke in v1.7.2. ([\#8373](https://github.com/matrix-org/synapse/issues/8373))
* Fix theoretical race condition where events are not sent down `/sync` if the synchrotron worker is restarted without restarting other workers. ([\#8374](https://github.com/matrix-org/synapse/issues/8374))
* Fix a bug which could cause errors in rooms with malformed membership events, on servers using sqlite. ([\#8385](https://github.com/matrix-org/synapse/issues/8385))
* Fix "Re-starting finished log context" warning when receiving an event we already had over federation. ([\#8398](https://github.com/matrix-org/synapse/issues/8398))
* Fix incorrect handling of timeouts on outgoing HTTP requests. ([\#8400](https://github.com/matrix-org/synapse/issues/8400))
* Fix a regression in v1.20.0 in the `synapse_port_db` script regarding the `ui_auth_sessions_ips` table. ([\#8410](https://github.com/matrix-org/synapse/issues/8410))
* Remove unnecessary 3PID registration check when resetting password via an email address. Bug introduced in v0.34.0rc2. ([\#8414](https://github.com/matrix-org/synapse/issues/8414))

### Improved Documentation

* Add `/_synapse/client` to the reverse proxy documentation. ([\#8227](https://github.com/matrix-org/synapse/issues/8227))
* Add note to the reverse proxy settings documentation about disabling Apache's mod_security2. Contributed by Julian Fietkau (@jfietkau). ([\#8375](https://github.com/matrix-org/synapse/issues/8375))
* Improve description of `server_name` config option in `homserver.yaml`. ([\#8415](https://github.com/matrix-org/synapse/issues/8415))

### Deprecations and Removals

* Drop support for `prometheus_client` older than 0.4.0. ([\#8426](https://github.com/matrix-org/synapse/issues/8426))

### Internal Changes

* Fix tests on distros which disable TLSv1.0. Contributed by @danc86. ([\#8208](https://github.com/matrix-org/synapse/issues/8208))
* Simplify the distributor code to avoid unnecessary work. ([\#8216](https://github.com/matrix-org/synapse/issues/8216))
* Remove the `populate_stats_process_rooms_2` background job and restore functionality to `populate_stats_process_rooms`. ([\#8243](https://github.com/matrix-org/synapse/issues/8243))
* Clean up type hints for `PaginationConfig`. ([\#8250](https://github.com/matrix-org/synapse/issues/8250), [\#8282](https://github.com/matrix-org/synapse/issues/8282))
* Track the latest event for every destination and room for catch-up after federation outage. ([\#8256](https://github.com/matrix-org/synapse/issues/8256))
* Fix non-user visible bug in implementation of `MultiWriterIdGenerator.get_current_token_for_writer`. ([\#8257](https://github.com/matrix-org/synapse/issues/8257))
* Switch to the JSON implementation from the standard library. ([\#8259](https://github.com/matrix-org/synapse/issues/8259))
* Add type hints to `synapse.util.async_helpers`. ([\#8260](https://github.com/matrix-org/synapse/issues/8260))
* Simplify tests that mock asynchronous functions. ([\#8261](https://github.com/matrix-org/synapse/issues/8261))
* Add type hints to `StreamToken` and `RoomStreamToken` classes. ([\#8279](https://github.com/matrix-org/synapse/issues/8279))
* Change `StreamToken.room_key` to be a `RoomStreamToken` instance. ([\#8281](https://github.com/matrix-org/synapse/issues/8281))
* Refactor notifier code to correctly use the max event stream position. ([\#8288](https://github.com/matrix-org/synapse/issues/8288))
* Use slotted classes where possible. ([\#8296](https://github.com/matrix-org/synapse/issues/8296))
* Support testing the local Synapse checkout against the [Complement homeserver test suite](https://github.com/matrix-org/complement/). ([\#8317](https://github.com/matrix-org/synapse/issues/8317))
* Update outdated usages of `metaclass` to python 3 syntax. ([\#8326](https://github.com/matrix-org/synapse/issues/8326))
* Move lint-related dependencies to package-extra field, update CONTRIBUTING.md to utilise this. ([\#8330](https://github.com/matrix-org/synapse/issues/8330), [\#8377](https://github.com/matrix-org/synapse/issues/8377))
* Use the `admin_patterns` helper in additional locations. ([\#8331](https://github.com/matrix-org/synapse/issues/8331))
* Fix test logging to allow braces in log output. ([\#8335](https://github.com/matrix-org/synapse/issues/8335))
* Remove `__future__` imports related to Python 2 compatibility. ([\#8337](https://github.com/matrix-org/synapse/issues/8337))
* Simplify `super()` calls to Python 3 syntax. ([\#8344](https://github.com/matrix-org/synapse/issues/8344))
* Fix bad merge from `release-v1.20.0` branch to `develop`. ([\#8354](https://github.com/matrix-org/synapse/issues/8354))
* Factor out a `_send_dummy_event_for_room` method. ([\#8370](https://github.com/matrix-org/synapse/issues/8370))
* Improve logging of state resolution. ([\#8371](https://github.com/matrix-org/synapse/issues/8371))
* Add type annotations to `SimpleHttpClient`. ([\#8372](https://github.com/matrix-org/synapse/issues/8372))
* Refactor ID generators to use `async with` syntax. ([\#8383](https://github.com/matrix-org/synapse/issues/8383))
* Add `EventStreamPosition` type. ([\#8388](https://github.com/matrix-org/synapse/issues/8388))
* Create a mechanism for marking tests "logcontext clean". ([\#8399](https://github.com/matrix-org/synapse/issues/8399))
* A pair of tiny cleanups in the federation request code. ([\#8401](https://github.com/matrix-org/synapse/issues/8401))
* Add checks on startup that PostgreSQL sequences are consistent with their associated tables. ([\#8402](https://github.com/matrix-org/synapse/issues/8402))
* Do not include appservice users when calculating the total MAU for a server. ([\#8404](https://github.com/matrix-org/synapse/issues/8404))
* Typing fixes for `synapse.handlers.federation`. ([\#8422](https://github.com/matrix-org/synapse/issues/8422))
* Various refactors to simplify stream token handling. ([\#8423](https://github.com/matrix-org/synapse/issues/8423))
* Make stream token serializing/deserializing async. ([\#8427](https://github.com/matrix-org/synapse/issues/8427))
