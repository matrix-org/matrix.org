+++
title = "Synapse 1.16.0 released"
date = "2020-07-08T19:18:23Z"
updated = "2020-07-08T14:45:15Z"
path = "/blog/2020/07/08/synapse-1-16-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.16.0 is here!

Notable additions in 1.16.0 include:-

* An important performance fix to improve room state resolution.
* An option to enable e2e by default for new rooms.
* Ability to run multiple media repo workers side by side.
* Ability to mark specific content as being safe from quarantine.
* Bug fixes to make migrating from SQLite to Postgres more reliable - if you are running sqlite for anything other than evaluation purposes then please migrate!

Note, we have deprecated the `m.login.jwt` login method in favour of `org.matrix.login.jwt` see the changelog for more details.

Enjoy!

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.16.0 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.16.0).

Changelog for 1.16.0 follows:

## Synapse 1.16.0 (2020-07-08)

No significant changes since 1.16.0rc2.

Note that this release deprecates the `m.login.jwt` login method, renaming it to `org.matrix.login.jwt`, as `m.login.jwt` is not part of the Matrix spec. Otherwise the behaviour is identical. Synapse will accept both names for now, but this may change in a future release.

## Synapse 1.16.0rc2 (2020-07-02)

Synapse 1.16.0rc2 includes the security fixes released with Synapse 1.15.2.
Please see the [1.15.2 release notes](https://github.com/matrix-org/synapse/releases/tag/v1.15.2) for more details.

### Improved Documentation

* Update postgres image in example `docker-compose.yaml` to tag `12-alpine`. ([\#7696](https://github.com/matrix-org/synapse/issues/7696))

### Internal Changes

* Add some metrics for inbound and outbound federation latencies: `synapse_federation_server_pdu_process_time` and `synapse_event_processing_lag_by_event`. ([\#7771](https://github.com/matrix-org/synapse/issues/7771))

## Synapse 1.16.0rc1 (2020-07-01)

### Features

* Add an option to enable encryption by default for new rooms. ([\#7639](https://github.com/matrix-org/synapse/issues/7639))
* Add support for running multiple media repository workers. See [docs/workers.md](https://github.com/matrix-org/synapse/blob/release-v1.16.0/docs/workers.md) for instructions. ([\#7706](https://github.com/matrix-org/synapse/issues/7706))
* Media can now be marked as safe from quarantined. ([\#7718](https://github.com/matrix-org/synapse/issues/7718))
* Expand the configuration options for auto-join rooms. ([\#7763](https://github.com/matrix-org/synapse/issues/7763))

### Bugfixes

* Remove `user_id` from the response to `GET /_matrix/client/r0/presence/{userId}/status` to match the specification. ([\#7606](https://github.com/matrix-org/synapse/issues/7606))
* In worker mode, ensure that replicated data has not already been received. ([\#7648](https://github.com/matrix-org/synapse/issues/7648))
* Fix intermittent exception during startup, introduced in Synapse 1.14.0. ([\#7663](https://github.com/matrix-org/synapse/issues/7663))
* Include a user-agent for federation and well-known requests. ([\#7677](https://github.com/matrix-org/synapse/issues/7677))
* Accept the proper field (`phone`) for the `m.id.phone` identifier type. The legacy field of `number` is still accepted as a fallback. Bug introduced in v0.20.0. ([\#7687](https://github.com/matrix-org/synapse/issues/7687))
* Fix "Starting db txn 'get_completed_ui_auth_stages' from sentinel context" warning. The bug was introduced in 1.13.0. ([\#7688](https://github.com/matrix-org/synapse/issues/7688))
* Compare the URI and method during user interactive authentication (instead of the URI twice). Bug introduced in 1.13.0. ([\#7689](https://github.com/matrix-org/synapse/issues/7689))
* Fix a long standing bug where the response to the `GET room_keys/version` endpoint had the incorrect type for the `etag` field. ([\#7691](https://github.com/matrix-org/synapse/issues/7691))
* Fix logged error during device resync in opentracing. Broke in v1.14.0. ([\#7698](https://github.com/matrix-org/synapse/issues/7698))
* Do not break push rule evaluation when receiving an event with a non-string body. This is a long-standing bug. ([\#7701](https://github.com/matrix-org/synapse/issues/7701))
* Fixs a long standing bug which resulted in an exception: "TypeError: argument of type 'ObservableDeferred' is not iterable". ([\#7708](https://github.com/matrix-org/synapse/issues/7708))
* The `synapse_port_db` script no longer fails when the `ui_auth_sessions` table is non-empty. This bug has existed since v1.13.0. ([\#7711](https://github.com/matrix-org/synapse/issues/7711))
* Synapse will now fetch media from the proper specified URL (using the r0 prefix instead of the unspecified v1). ([\#7714](https://github.com/matrix-org/synapse/issues/7714))
* Fix the tables ignored by `synapse_port_db` to be in sync the current database schema. ([\#7717](https://github.com/matrix-org/synapse/issues/7717))
* Fix missing `Content-Length` on HTTP responses from the metrics handler. ([\#7730](https://github.com/matrix-org/synapse/issues/7730))
* Fix large state resolutions from stalling Synapse for seconds at a time. ([\#7735](https://github.com/matrix-org/synapse/issues/7735), [\#7746](https://github.com/matrix-org/synapse/issues/7746))

### Improved Documentation

* Spelling correction in sample_config.yaml. ([\#7652](https://github.com/matrix-org/synapse/issues/7652))
* Added instructions for how to use Keycloak via OpenID Connect to authenticate with Synapse. ([\#7659](https://github.com/matrix-org/synapse/issues/7659))
* Corrected misspelling of PostgreSQL. ([\#7724](https://github.com/matrix-org/synapse/issues/7724))

### Deprecations and Removals

* Deprecate `m.login.jwt` login method in favour of `org.matrix.login.jwt`, as `m.login.jwt` is not part of the Matrix spec. ([\#7675](https://github.com/matrix-org/synapse/issues/7675))

### Internal Changes

* Refactor getting replication updates from database. ([\#7636](https://github.com/matrix-org/synapse/issues/7636))
* Clean-up the login fallback code. ([\#7657](https://github.com/matrix-org/synapse/issues/7657))
* Increase the default SAML session expiry time to 15 minutes. ([\#7664](https://github.com/matrix-org/synapse/issues/7664))
* Convert the device message and pagination handlers to async/await. ([\#7678](https://github.com/matrix-org/synapse/issues/7678))
* Convert typing handler to async/await. ([\#7679](https://github.com/matrix-org/synapse/issues/7679))
* Require `parameterized` package version to be at least 0.7.0. ([\#7680](https://github.com/matrix-org/synapse/issues/7680))
* Refactor handling of `listeners` configuration settings. ([\#7681](https://github.com/matrix-org/synapse/issues/7681))
* Replace uses of `six.iterkeys`/`iteritems`/`itervalues` with `keys()`/`items()`/`values()`. ([\#7692](https://github.com/matrix-org/synapse/issues/7692))
* Add support for using `rust-python-jaeger-reporter` library to reduce jaeger tracing overhead. ([\#7697](https://github.com/matrix-org/synapse/issues/7697))
* Make Tox actions work on Debian 10. ([\#7703](https://github.com/matrix-org/synapse/issues/7703))
* Replace all remaining uses of `six` with native Python 3 equivalents. Contributed by @ilmari. ([\#7704](https://github.com/matrix-org/synapse/issues/7704))
* Fix broken link in sample config. ([\#7712](https://github.com/matrix-org/synapse/issues/7712))
* Speed up state res v2 across large state differences. ([\#7725](https://github.com/matrix-org/synapse/issues/7725))
* Convert directory handler to async/await. ([\#7727](https://github.com/matrix-org/synapse/issues/7727))
* Move `flake8` to the end of `scripts-dev/lint.sh` as it takes the longest and could cause the script to exit early. ([\#7738](https://github.com/matrix-org/synapse/issues/7738))
* Explain the "test" conditional requirement for dependencies is not all of the modules necessary to run the unit tests. ([\#7751](https://github.com/matrix-org/synapse/issues/7751))
* Add some metrics for inbound and outbound federation latencies: `synapse_federation_server_pdu_process_time` and `synapse_event_processing_lag_by_event`. ([\#7755](https://github.com/matrix-org/synapse/issues/7755))
