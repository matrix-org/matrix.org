+++
title = "Synapse 1.23.0 released"
path = "/blog/2020/11/18/synapse-1-23-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

> __Reminder:__ On Monday, we will be announcing a denial of service vulnerability which affects Synapse versions prior to 1.20.0. If you have not upgraded recently, please do so.

[Synapse 1.23.0](https://github.com/matrix-org/synapse/releases/tag/v1.23.0) now available!

For Synapse admins, this release support generating structured logs via the standard logging configuration ([#8607](https://github.com/matrix-org/synapse/issues/8607), [#8685](https://github.com/matrix-org/synapse/issues/8685)). This may require changing your synapse configuration; see the [upgrade notes](https://github.com/matrix-org/synapse/blob/v1.23.0rc1/UPGRADE.rst#upgrading-to-v1230) for more information.

We've also added many new Admin APIs, contributed by [@dklimpel](https://github.com/dklimpel):

* Add API to get information about uploaded media ([#8647](https://github.com/matrix-org/synapse/issues/8647))
* Add API for local user media statistics ([#8700](https://github.com/matrix-org/synapse/issues/8700))
* Make it possible to delete files that were not used for a defined time ([#8519](https://github.com/matrix-org/synapse/issues/8519))
* Split API for reported events into detail and list endpoints. This is a breaking change to [#8217](https://github.com/matrix-org/synapse/issues/8217) which was introduced in Synapse v1.21.0. Those who already use this API should check their scripts ([#8539](https://github.com/matrix-org/synapse/issues/8539))
* Allow server admins to list users' notification pushers ([#8610](https://github.com/matrix-org/synapse/issues/8610), [#8689](https://github.com/matrix-org/synapse/issues/8689))

Lastly, Synapse 1.23.0 addresses some significant bugs, including regressions in the SQLite-to-PostgreSQL database porting script ([#8729](http://github.com/matrix-org/synapse/issues/8729), [#8730](http://github.com/matrix-org/synapse/issues/8730), [#8755](http://github.com/matrix-org/synapse/issues/8755)) and an issue which could prevent Synapse from recovering after losing its connection to its database ([#8726](https://github.com/matrix-org/synapse/issues/8726)). Synapse will also reject ACL modifications from clients which would otherwise cause a server to ban itself from a room ([#8708](https://github.com/matrix-org/synapse/issues/8708)).

Installation instructions are available [on GitHub](https://github.com/matrix-org/synapse/blob/master/INSTALL.md), as is the `v1.23.0` [release tag](https://github.com/matrix-org/synapse/releases/tag/v1.23.0).

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [@chagai95](https://github.com/chagai95) and [@dklimpel](https://github.com/dklimpel).

The full changelog for 1.23.0 is as follows:

## Synapse 1.23.0 (2020-11-18)

This release changes the way structured logging is configured. See the [upgrade notes](UPGRADE.rst#upgrading-to-v1230) for details.

__Note__: We are aware of a trivially exploitable denial of service vulnerability in versions of Synapse prior to 1.20.0. Complete details will be disclosed on Monday, November 23rd. If you have not upgraded recently, please do so.

### Bugfixes

* Fix a dependency versioning bug in the Dockerfile that prevented Synapse from starting. ([\#8767](https://github.com/matrix-org/synapse/issues/8767))

## Synapse 1.23.0rc1 (2020-11-13)

### Features

* Add a push rule that highlights when a jitsi conference is created in a room. ([\#8286](https://github.com/matrix-org/synapse/issues/8286))
* Add an admin api to delete a single file or files that were not used for a defined time from server. Contributed by @dklimpel. ([\#8519](https://github.com/matrix-org/synapse/issues/8519))
* Split admin API for reported events (`GET /_synapse/admin/v1/event_reports`) into detail and list endpoints. This is a breaking change to #8217 which was introduced in Synapse v1.21.0. Those who already use this API should check their scripts. Contributed by @dklimpel. ([\#8539](https://github.com/matrix-org/synapse/issues/8539))
* Support generating structured logs via the standard logging configuration. ([\#8607](https://github.com/matrix-org/synapse/issues/8607), [\#8685](https://github.com/matrix-org/synapse/issues/8685))
* Add an admin API to allow server admins to list users' pushers. Contributed by @dklimpel. ([\#8610](https://github.com/matrix-org/synapse/issues/8610), [\#8689](https://github.com/matrix-org/synapse/issues/8689))
* Add an admin API `GET /_synapse/admin/v1/users/<user_id>/media` to get information about uploaded media. Contributed by @dklimpel. ([\#8647](https://github.com/matrix-org/synapse/issues/8647))
* Add an admin API for local user media statistics. Contributed by @dklimpel. ([\#8700](https://github.com/matrix-org/synapse/issues/8700))
* Add `displayname` to Shared-Secret Registration for admins. ([\#8722](https://github.com/matrix-org/synapse/issues/8722))

### Bugfixes

* Fix fetching of E2E cross signing keys over federation when only one of the master key and device signing key is cached already. ([\#8455](https://github.com/matrix-org/synapse/issues/8455))
* Fix a bug where Synapse would blindly forward bad responses from federation to clients when retrieving profile information. ([\#8580](https://github.com/matrix-org/synapse/issues/8580))
* Fix a bug where the account validity endpoint would silently fail if the user ID did not have an expiration time. It now returns a 400 error. ([\#8620](https://github.com/matrix-org/synapse/issues/8620))
* Fix email notifications for invites without local state. ([\#8627](https://github.com/matrix-org/synapse/issues/8627))
* Fix handling of invalid group IDs to return a 400 rather than log an exception and return a 500. ([\#8628](https://github.com/matrix-org/synapse/issues/8628))
* Fix handling of User-Agent headers that are invalid UTF-8, which caused user agents of users to not get correctly recorded. ([\#8632](https://github.com/matrix-org/synapse/issues/8632))
* Fix a bug in the `joined_rooms` admin API if the user has never joined any rooms. The bug was introduced, along with the API, in v1.21.0. ([\#8643](https://github.com/matrix-org/synapse/issues/8643))
* Fix exception during handling multiple concurrent requests for remote media when using multiple media repositories. ([\#8682](https://github.com/matrix-org/synapse/issues/8682))
* Fix bug that prevented Synapse from recovering after losing connection to the database. ([\#8726](https://github.com/matrix-org/synapse/issues/8726))
* Fix bug where the `/_synapse/admin/v1/send_server_notice` API could send notices to non-notice rooms. ([\#8728](https://github.com/matrix-org/synapse/issues/8728))
* Fix PostgreSQL port script fails when DB has no backfilled events. Broke in v1.21.0. ([\#8729](https://github.com/matrix-org/synapse/issues/8729))
* Fix PostgreSQL port script to correctly handle foreign key constraints. Broke in v1.21.0. ([\#8730](https://github.com/matrix-org/synapse/issues/8730))
* Fix PostgreSQL port script so that it can be run again after a failure. Broke in v1.21.0. ([\#8755](https://github.com/matrix-org/synapse/issues/8755))

### Improved Documentation

* Instructions for Azure AD in the OpenID Connect documentation. Contributed by peterk. ([\#8582](https://github.com/matrix-org/synapse/issues/8582))
* Improve the sample configuration for single sign-on providers. ([\#8635](https://github.com/matrix-org/synapse/issues/8635))
* Fix the filepath of Dex's example config and the link to Dex's Getting Started guide in the OpenID Connect docs. ([\#8657](https://github.com/matrix-org/synapse/issues/8657))
* Note support for Python 3.9. ([\#8665](https://github.com/matrix-org/synapse/issues/8665))
* Minor updates to docs on running tests. ([\#8666](https://github.com/matrix-org/synapse/issues/8666))
* Interlink prometheus/grafana documentation. ([\#8667](https://github.com/matrix-org/synapse/issues/8667))
* Notes on SSO logins and media_repository worker. ([\#8701](https://github.com/matrix-org/synapse/issues/8701))
* Document experimental support for running multiple event persisters. ([\#8706](https://github.com/matrix-org/synapse/issues/8706))
* Add information regarding the various sources of, and expected contributions to, Synapse's documentation to `CONTRIBUTING.md`. ([\#8714](https://github.com/matrix-org/synapse/issues/8714))
* Migrate documentation `docs/admin_api/event_reports` to markdown. ([\#8742](https://github.com/matrix-org/synapse/issues/8742))
* Add some helpful hints to the README for new Synapse developers. Contributed by @chagai95. ([\#8746](https://github.com/matrix-org/synapse/issues/8746))

### Internal Changes

* Optimise `/createRoom` with multiple invited users. ([\#8559](https://github.com/matrix-org/synapse/issues/8559))
* Implement and use an `@lru_cache` decorator. ([\#8595](https://github.com/matrix-org/synapse/issues/8595))
* Don't instantiate Requester directly. ([\#8614](https://github.com/matrix-org/synapse/issues/8614))
* Type hints for `RegistrationStore`. ([\#8615](https://github.com/matrix-org/synapse/issues/8615))
* Change schema to support access tokens belonging to one user but granting access to another. ([\#8616](https://github.com/matrix-org/synapse/issues/8616))
* Remove unused OPTIONS handlers. ([\#8621](https://github.com/matrix-org/synapse/issues/8621))
* Run `mypy` as part of the lint.sh script. ([\#8633](https://github.com/matrix-org/synapse/issues/8633))
* Correct Synapse's PyPI package name in the OpenID Connect installation instructions. ([\#8634](https://github.com/matrix-org/synapse/issues/8634))
* Catch exceptions during initialization of `password_providers`. Contributed by Nicolai Søborg. ([\#8636](https://github.com/matrix-org/synapse/issues/8636))
* Fix typos and spelling errors in the code. ([\#8639](https://github.com/matrix-org/synapse/issues/8639))
* Reduce number of OpenTracing spans started. ([\#8640](https://github.com/matrix-org/synapse/issues/8640), [\#8668](https://github.com/matrix-org/synapse/issues/8668), [\#8670](https://github.com/matrix-org/synapse/issues/8670))
* Add field `total` to device list in admin API. ([\#8644](https://github.com/matrix-org/synapse/issues/8644))
* Add more type hints to the application services code. ([\#8655](https://github.com/matrix-org/synapse/issues/8655), [\#8693](https://github.com/matrix-org/synapse/issues/8693))
* Tell Black to format code for Python 3.5. ([\#8664](https://github.com/matrix-org/synapse/issues/8664))
* Don't pull event from DB when handling replication traffic. ([\#8669](https://github.com/matrix-org/synapse/issues/8669))
* Abstract some invite-related code in preparation for landing knocking. ([\#8671](https://github.com/matrix-org/synapse/issues/8671), [\#8688](https://github.com/matrix-org/synapse/issues/8688))
* Clarify representation of events in logfiles. ([\#8679](https://github.com/matrix-org/synapse/issues/8679))
* Don't require `hiredis` package to be installed to run unit tests. ([\#8680](https://github.com/matrix-org/synapse/issues/8680))
* Fix typing info on cache call signature to accept `on_invalidate`. ([\#8684](https://github.com/matrix-org/synapse/issues/8684))
* Fail tests if they do not await coroutines. ([\#8690](https://github.com/matrix-org/synapse/issues/8690))
* Improve start time by adding an index to `e2e_cross_signing_keys.stream_id`. ([\#8694](https://github.com/matrix-org/synapse/issues/8694))
* Re-organize the structured logging code to separate the TCP transport handling from the JSON formatting. ([\#8697](https://github.com/matrix-org/synapse/issues/8697))
* Use Python 3.8 in Docker images by default. ([\#8698](https://github.com/matrix-org/synapse/issues/8698))
* Remove the "draft" status of the Room Details Admin API. ([\#8702](https://github.com/matrix-org/synapse/issues/8702))
* Improve the error returned when a non-string displayname or avatar_url is used when updating a user's profile. ([\#8705](https://github.com/matrix-org/synapse/issues/8705))
* Block attempts by clients to send server ACLs, or redactions of server ACLs, that would result in the local server being blocked from the room. ([\#8708](https://github.com/matrix-org/synapse/issues/8708))
* Add metrics the allow the local sysadmin to track 3PID `/requestToken` requests. ([\#8712](https://github.com/matrix-org/synapse/issues/8712))
* Consolidate duplicated lists of purged tables that are checked in tests. ([\#8713](https://github.com/matrix-org/synapse/issues/8713))
* Add some `mdui:UIInfo` element examples for `saml2_config` in the homeserver config. ([\#8718](https://github.com/matrix-org/synapse/issues/8718))
* Improve the error message returned when a remote server incorrectly sets the `Content-Type` header in response to a JSON request. ([\#8719](https://github.com/matrix-org/synapse/issues/8719))
* Speed up repeated state resolutions on the same room by caching event ID to auth event ID lookups. ([\#8752](https://github.com/matrix-org/synapse/issues/8752))
