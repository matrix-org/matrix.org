+++
title = "Synapse 1.14.0 released"
date = "2020-05-28T17:45:18Z"
updated = "2020-05-28T17:23:47Z"
path = "/blog/2020/05/28/synapse-1-14-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.14.0 has landed.

This release contains OpenId Connect support, so that admins can configure a whole range of SSO options. We're really excited about what this means for helping users sign up and are considering it for matrix.org.

1.14.0 also contains finer grained cache configuration support, so that admins can tune caches in a more granular way. Our experience is that cache tuning can make a big difference to Synapse performance and over time we hope to continue improving cache tooling. Potentially we could even have caches auto-tune.

You'll also find support for [rooms v6](https://matrix.org/docs/spec/rooms/v6). v6 contains some small but important changes to improve the security of the room model. As with all room version upgrades we can't switch to v6 as the default version immediately since we need to build up a critical mass of servers that can support it. So upgrade and watch this space for when we switch over properly.

As an aside we continue to be very happy with using Redis for worker inter-communication and will likely recommend it for production use in the coming weeks.

Get 1.14.0 from [github](https://github.com/matrix-org/synapse/releases/tag/v1.14.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since v1.13.0

## Synapse 1.14.0 (2020-05-28)

No significant changes.

## Synapse 1.14.0rc2 (2020-05-27)

### Bugfixes

- Fix cache config to not apply cache factor to event cache. Regression in v1.14.0rc1. ([\#7578](https://github.com/matrix-org/synapse/issues/7578))
- Fix bug where `ReplicationStreamer` was not always started when replication was enabled. Bug introduced in v1.14.0rc1. ([\#7579](https://github.com/matrix-org/synapse/issues/7579))
- Fix specifying individual cache factors for caches with special characters in their name. Regression in v1.14.0rc1. ([\#7580](https://github.com/matrix-org/synapse/issues/7580))

### Improved Documentation

- Fix the OIDC `client_auth_method` value in the sample config. ([\#7581](https://github.com/matrix-org/synapse/issues/7581))

## Synapse 1.14.0rc1 (2020-05-26)

### Features

- Synapse's cache factor can now be configured in `homeserver.yaml` by the `caches.global_factor` setting. Additionally, `caches.per_cache_factors` controls the cache factors for individual caches. ([\#6391](https://github.com/matrix-org/synapse/issues/6391))
- Add OpenID Connect login/registration support. Contributed by Quentin Gliech, on behalf of [les Connecteurs](https://connecteu.rs). ([\#7256](https://github.com/matrix-org/synapse/issues/7256), [\#7457](https://github.com/matrix-org/synapse/issues/7457))
- Add room details admin endpoint. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#7317](https://github.com/matrix-org/synapse/issues/7317))
- Allow for using more than one spam checker module at once. ([\#7435](https://github.com/matrix-org/synapse/issues/7435))
- Add additional authentication checks for `m.room.power_levels` event per [MSC2209](https://github.com/matrix-org/matrix-doc/pull/2209). ([\#7502](https://github.com/matrix-org/synapse/issues/7502))
- Implement room version 6 per [MSC2240](https://github.com/matrix-org/matrix-doc/pull/2240). ([\#7506](https://github.com/matrix-org/synapse/issues/7506))
- Add highly experimental option to move event persistence off master. ([\#7281](https://github.com/matrix-org/synapse/issues/7281), [\#7374](https://github.com/matrix-org/synapse/issues/7374), [\#7436](https://github.com/matrix-org/synapse/issues/7436), [\#7440](https://github.com/matrix-org/synapse/issues/7440), [\#7475](https://github.com/matrix-org/synapse/issues/7475), [\#7490](https://github.com/matrix-org/synapse/issues/7490), [\#7491](https://github.com/matrix-org/synapse/issues/7491), [\#7492](https://github.com/matrix-org/synapse/issues/7492), [\#7493](https://github.com/matrix-org/synapse/issues/7493), [\#7495](https://github.com/matrix-org/synapse/issues/7495), [\#7515](https://github.com/matrix-org/synapse/issues/7515), [\#7516](https://github.com/matrix-org/synapse/issues/7516), [\#7517](https://github.com/matrix-org/synapse/issues/7517), [\#7542](https://github.com/matrix-org/synapse/issues/7542))

### Bugfixes

- Fix a bug where event updates might not be sent over replication to worker processes after the stream falls behind. ([\#7384](https://github.com/matrix-org/synapse/issues/7384))
- Allow expired user accounts to log out their device sessions. ([\#7443](https://github.com/matrix-org/synapse/issues/7443))
- Fix a bug that would cause Synapse not to resync out-of-sync device lists. ([\#7453](https://github.com/matrix-org/synapse/issues/7453))
- Prevent rooms with 0 members or with invalid version strings from breaking group queries. ([\#7465](https://github.com/matrix-org/synapse/issues/7465))
- Workaround for an upstream Twisted bug that caused Synapse to become unresponsive after startup. ([\#7473](https://github.com/matrix-org/synapse/issues/7473))
- Fix Redis reconnection logic that can result in missed updates over replication if master reconnects to Redis without restarting. ([\#7482](https://github.com/matrix-org/synapse/issues/7482))
- When sending `m.room.member` events, omit `displayname` and `avatar_url` if they aren't set instead of setting them to `null`. Contributed by Aaron Raimist. ([\#7497](https://github.com/matrix-org/synapse/issues/7497))
- Fix incorrect `method` label on `synapse_http_matrixfederationclient_{requests,responses}` prometheus metrics. ([\#7503](https://github.com/matrix-org/synapse/issues/7503))
- Ignore incoming presence events from other homeservers if presence is disabled locally. ([\#7508](https://github.com/matrix-org/synapse/issues/7508))
- Fix a long-standing bug that broke the update remote profile background process. ([\#7511](https://github.com/matrix-org/synapse/issues/7511))
- Hash passwords as early as possible during password reset. ([\#7538](https://github.com/matrix-org/synapse/issues/7538))
- Fix bug where a local user leaving a room could fail under rare circumstances. ([\#7548](https://github.com/matrix-org/synapse/issues/7548))
- Fix "Missing RelayState parameter" error when using user interactive authentication with SAML for some SAML providers. ([\#7552](https://github.com/matrix-org/synapse/issues/7552))
- Fix exception `'GenericWorkerReplicationHandler' object has no attribute 'send_federation_ack'`, introduced in v1.13.0. ([\#7564](https://github.com/matrix-org/synapse/issues/7564))
- `synctl` now warns if it was unable to stop Synapse and will not attempt to start Synapse if nothing was stopped. Contributed by Romain Bouyé. ([\#6590](https://github.com/matrix-org/synapse/issues/6590))

### Updates to the Docker image

- Update docker runtime image to Alpine v3.11. Contributed by @Starbix. ([\#7398](https://github.com/matrix-org/synapse/issues/7398))

### Improved Documentation

- Update information about mapping providers for SAML and OpenID. ([\#7458](https://github.com/matrix-org/synapse/issues/7458))
- Add additional reverse proxy example for Caddy v2. Contributed by Jeff Peeler. ([\#7463](https://github.com/matrix-org/synapse/issues/7463))
- Fix copy-paste error in `ServerNoticesConfig` docstring. Contributed by @ptman. ([\#7477](https://github.com/matrix-org/synapse/issues/7477))
- Improve the formatting of `reverse_proxy.md`. ([\#7514](https://github.com/matrix-org/synapse/issues/7514))
- Change the systemd worker service to check that the worker config file exists instead of silently failing. Contributed by David Vo. ([\#7528](https://github.com/matrix-org/synapse/issues/7528))
- Minor clarifications to the TURN docs. ([\#7533](https://github.com/matrix-org/synapse/issues/7533))

### Internal Changes

- Add typing annotations in `synapse.federation`. ([\#7382](https://github.com/matrix-org/synapse/issues/7382))
- Convert the room handler to async/await. ([\#7396](https://github.com/matrix-org/synapse/issues/7396))
- Improve performance of `get_e2e_cross_signing_key`. ([\#7428](https://github.com/matrix-org/synapse/issues/7428))
- Improve performance of `mark_as_sent_devices_by_remote`. ([\#7429](https://github.com/matrix-org/synapse/issues/7429), [\#7562](https://github.com/matrix-org/synapse/issues/7562))
- Add type hints to the SAML handler. ([\#7445](https://github.com/matrix-org/synapse/issues/7445))
- Remove storage method `get_hosts_in_room` that is no longer called anywhere. ([\#7448](https://github.com/matrix-org/synapse/issues/7448))
- Fix some typos in the `notice_expiry` templates. ([\#7449](https://github.com/matrix-org/synapse/issues/7449))
- Convert the federation handler to async/await. ([\#7459](https://github.com/matrix-org/synapse/issues/7459))
- Convert the search handler to async/await. ([\#7460](https://github.com/matrix-org/synapse/issues/7460))
- Add type hints to `synapse.event_auth`. ([\#7505](https://github.com/matrix-org/synapse/issues/7505))
- Convert the room member handler to async/await. ([\#7507](https://github.com/matrix-org/synapse/issues/7507))
- Add type hints to room member handler. ([\#7513](https://github.com/matrix-org/synapse/issues/7513))
- Fix typing annotations in `tests.replication`. ([\#7518](https://github.com/matrix-org/synapse/issues/7518))
- Remove some redundant Python 2 support code. ([\#7519](https://github.com/matrix-org/synapse/issues/7519))
- All endpoints now respond with a 200 OK for `OPTIONS` requests. ([\#7534](https://github.com/matrix-org/synapse/issues/7534), [\#7560](https://github.com/matrix-org/synapse/issues/7560))
- Synapse now exports [detailed allocator statistics](https://doc.pypy.org/en/latest/gc_info.html#gc-get-stats) and basic GC timings as Prometheus metrics (`pypy_gc_time_seconds_total` and `pypy_memory_bytes`) when run under PyPy. Contributed by Ivan Shapovalov. ([\#7536](https://github.com/matrix-org/synapse/issues/7536))
- Remove Ubuntu Cosmic and Disco from the list of distributions which we provide `.deb`s for, due to end-of-life. ([\#7539](https://github.com/matrix-org/synapse/issues/7539))
- Make worker processes return a stubbed-out response to `GET /presence` requests. ([\#7545](https://github.com/matrix-org/synapse/issues/7545))
- Optimise some references to `hs.config`. ([\#7546](https://github.com/matrix-org/synapse/issues/7546))
- On upgrade room only send canonical alias once. ([\#7547](https://github.com/matrix-org/synapse/issues/7547))
- Fix some indentation inconsistencies in the sample config. ([\#7550](https://github.com/matrix-org/synapse/issues/7550))
- Include `synapse.http.site` in type checking. ([\#7553](https://github.com/matrix-org/synapse/issues/7553))
- Fix some test code to not mangle stacktraces, to make it easier to debug errors. ([\#7554](https://github.com/matrix-org/synapse/issues/7554))
- Refresh apt cache when building `dh_virtualenv` docker image. ([\#7555](https://github.com/matrix-org/synapse/issues/7555))
- Stop logging some expected HTTP request errors as exceptions. ([\#7556](https://github.com/matrix-org/synapse/issues/7556), [\#7563](https://github.com/matrix-org/synapse/issues/7563))
- Convert sending mail to async/await. ([\#7557](https://github.com/matrix-org/synapse/issues/7557))
- Simplify `reap_monthly_active_users`. ([\#7558](https://github.com/matrix-org/synapse/issues/7558))
