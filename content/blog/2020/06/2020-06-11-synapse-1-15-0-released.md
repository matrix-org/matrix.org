+++
title = "Synapse 1.15.0 released"
date = "2020-06-11T18:27:48Z"
path = "/blog/2020/06/11/synapse-1-15-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.15.0 release day folks.

We continue our push to improve performance across the board. Factoring out event persistence into a separate worker pointed the way to a host of small but collectively important improvements. Expect further changes in coming releases.

Aside from that the admin API continues to grow (this time device management) and we have improved device list syncing to aid e2ee reliability.

We are receiving an increasing number of high quality PRs from the community, please keep them coming. Special thanks to [cg505](https://github.com/cg505), [dklimpel](https://github.com/dklimpel), [WGH](https://github.com/WGH), [olof](https://github.com/olof) and [ilmari](https://github.com/ilmari)

Get 1.15.0 from [github](https://github.com/matrix-org/synapse/releases/tag/v1.15.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since v1.14.0

## Synapse 1.15.0 (2020-06-11)

No significant changes.

## Synapse 1.15.0rc1 (2020-06-09)

### Features

- Advertise support for Client-Server API r0.6.0 and remove related unstable feature flags. ([\#6585](https://github.com/matrix-org/synapse/issues/6585))
- Add an option to disable autojoining rooms for guest accounts. ([\#6637](https://github.com/matrix-org/synapse/issues/6637))
- For SAML authentication, add the ability to pass email addresses to be added to new users' accounts via SAML attributes. Contributed by Christopher Cooper. ([\#7385](https://github.com/matrix-org/synapse/issues/7385))
- Add admin APIs to allow server admins to manage users' devices. Contributed by @dklimpel. ([\#7481](https://github.com/matrix-org/synapse/issues/7481))
- Add support for generating thumbnails for WebP images. Previously, users would see an empty box instead of preview image. Contributed by @WGH-. ([\#7586](https://github.com/matrix-org/synapse/issues/7586))
- Support the standardized `m.login.sso` user-interactive authentication flow. ([\#7630](https://github.com/matrix-org/synapse/issues/7630))

### Bugfixes

- Allow new users to be registered via the admin API even if the monthly active user limit has been reached. Contributed by @dklimpel. ([\#7263](https://github.com/matrix-org/synapse/issues/7263))
- Fix email notifications not being enabled for new users when created via the Admin API. ([\#7267](https://github.com/matrix-org/synapse/issues/7267))
- Fix str placeholders in an instance of `PrepareDatabaseException`. Introduced in Synapse v1.8.0. ([\#7575](https://github.com/matrix-org/synapse/issues/7575))
- Fix a bug in automatic user creation during first time login with `m.login.jwt`. Regression in v1.6.0. Contributed by @olof. ([\#7585](https://github.com/matrix-org/synapse/issues/7585))
- Fix a bug causing the cross-signing keys to be ignored when resyncing a device list. ([\#7594](https://github.com/matrix-org/synapse/issues/7594))
- Fix metrics failing when there is a large number of active background processes. ([\#7597](https://github.com/matrix-org/synapse/issues/7597))
- Fix bug where returning rooms for a group would fail if it included a room that the server was not in. ([\#7599](https://github.com/matrix-org/synapse/issues/7599))
- Fix duplicate key violation when persisting read markers. ([\#7607](https://github.com/matrix-org/synapse/issues/7607))
- Prevent an entire iteration of the device list resync loop from failing if one server responds with a malformed result. ([\#7609](https://github.com/matrix-org/synapse/issues/7609))
- Fix exceptions when fetching events from a remote host fails. ([\#7622](https://github.com/matrix-org/synapse/issues/7622))
- Make `synctl restart` start synapse if it wasn't running. ([\#7624](https://github.com/matrix-org/synapse/issues/7624))
- Pass device information through to the login endpoint when using the login fallback. ([\#7629](https://github.com/matrix-org/synapse/issues/7629))
- Advertise the `m.login.token` login flow when OpenID Connect is enabled. ([\#7631](https://github.com/matrix-org/synapse/issues/7631))
- Fix bug in account data replication stream. ([\#7656](https://github.com/matrix-org/synapse/issues/7656))

### Improved Documentation

- Update the OpenBSD installation instructions. ([\#7587](https://github.com/matrix-org/synapse/issues/7587))
- Advertise Python 3.8 support in `setup.py`. ([\#7602](https://github.com/matrix-org/synapse/issues/7602))
- Add a link to `#synapse:matrix.org` in the troubleshooting section of the README. ([\#7603](https://github.com/matrix-org/synapse/issues/7603))
- Clarifications to the admin api documentation. ([\#7647](https://github.com/matrix-org/synapse/issues/7647))

### Internal Changes

- Convert the identity handler to async/await. ([\#7561](https://github.com/matrix-org/synapse/issues/7561))
- Improve query performance for fetching state from a PostgreSQL database. Contributed by @ilmari. ([\#7567](https://github.com/matrix-org/synapse/issues/7567))
- Speed up processing of federation stream RDATA rows. ([\#7584](https://github.com/matrix-org/synapse/issues/7584))
- Add comment to systemd example to show postgresql dependency. ([\#7591](https://github.com/matrix-org/synapse/issues/7591))
- Refactor `Ratelimiter` to limit the amount of expensive config value accesses. ([\#7595](https://github.com/matrix-org/synapse/issues/7595))
- Convert groups handlers to async/await. ([\#7600](https://github.com/matrix-org/synapse/issues/7600))
- Clean up exception handling in `SAML2ResponseResource`. ([\#7614](https://github.com/matrix-org/synapse/issues/7614))
- Check that all asynchronous tasks succeed and general cleanup of `MonthlyActiveUsersTestCase` and `TestMauLimit`. ([\#7619](https://github.com/matrix-org/synapse/issues/7619))
- Convert `get_user_id_by_threepid` to async/await. ([\#7620](https://github.com/matrix-org/synapse/issues/7620))
- Switch to upstream `dh-virtualenv` rather than our fork for Debian package builds. ([\#7621](https://github.com/matrix-org/synapse/issues/7621))
- Update CI scripts to check the number in the newsfile fragment. ([\#7623](https://github.com/matrix-org/synapse/issues/7623))
- Check if the localpart of a Matrix ID is reserved for guest users earlier in the registration flow, as well as when responding to requests to `/register/available`. ([\#7625](https://github.com/matrix-org/synapse/issues/7625))
- Minor cleanups to OpenID Connect integration. ([\#7628](https://github.com/matrix-org/synapse/issues/7628))
- Attempt to fix flaky test: `PhoneHomeStatsTestCase.test_performance_100`. ([\#7634](https://github.com/matrix-org/synapse/issues/7634))
- Fix typos of `m.olm.curve25519-aes-sha2` and `m.megolm.v1.aes-sha2` in comments, test files. ([\#7637](https://github.com/matrix-org/synapse/issues/7637))
- Convert user directory, state deltas, and stats handlers to async/await. ([\#7640](https://github.com/matrix-org/synapse/issues/7640))
- Remove some unused constants. ([\#7644](https://github.com/matrix-org/synapse/issues/7644))
- Fix type information on `assert_*_is_admin` methods. ([\#7645](https://github.com/matrix-org/synapse/issues/7645))
- Convert registration handler to async/await. ([\#7649](https://github.com/matrix-org/synapse/issues/7649))
