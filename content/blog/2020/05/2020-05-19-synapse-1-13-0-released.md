+++
title = "Synapse 1.13.0 released"
path = "/blog/2020/05/19/synapse-1-13-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.13.0 is here and it's a whopper!

Highlights include new support for User Interactive Authentication (UIA) for Single Sign-on (SSO) installations. This means that for the first time features that require the user to re-authenticate are available for servers that authenticate by SSO. Notably this means that these servers now support cross signing!

SSO admins should take a look at the SSO notes in the changelog.

We have been working hard on performance for large scale installations. Anyone supporting more than a few thousand users is probably running Synapse in worker mode. This means splitting out functionality from the master process and making use of multiple cores (or machines) to spread the load. Cross process communication was previously handled by a home grown TCP based replication protocol. As part of our ongoing efforts to improve performance we have replaced this replication system with Redis and have been running Redis in production on matrix.org for the past 2 weeks.

Redis itself does not provide a significant performance win directly but it means that it is much less expensive to add new workers to a cluster. The topology of the old system meant that every additional worker carried a small but not insignificant overhead to the master process. Since moving to Redis we have doubled the number of workers backing matrix.org.

We still consider Redis to be experimental and admins should not feel obliged to upgrade. However it looks very promising and we are likely to deprecate the old replication system in future. So watch this space - Redis is the future.

Finally we've seen lots of improvements to our documentation and many thanks for those in the community making contributions in this area.

It is also worth noting for those of you contributing to Synapse that the `develop` branch is now the default. More details in the changelog, so take a look.

Get 1.13.0 from [github](https://github.com/matrix-org/synapse/releases/tag/v1.13.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since v1.12.4

## Synapse 1.13.0 (2020-05-19)

This release brings some potential changes necessary for certain configurations of Synapse:

* If your Synapse is configured to use SSO and have a custom `sso_redirect_confirm_template_dir` configuration option set, you will need to duplicate the new `sso_auth_confirm.html`, `sso_auth_success.html` and `sso_account_deactivated.html` templates into that directory.
* Synapse plugins using the `complete_sso_login` method of `synapse.module_api.ModuleApi` should instead switch to the async/await version, `complete_sso_login_async`, which includes additional checks. The former version is now deprecated.
* A bug was introduced in Synapse 1.4.0 which could cause the room directory to be incomplete or empty if Synapse was upgraded directly from v1.2.1 or earlier, to versions between v1.4.0 and v1.12.x.

Please review [UPGRADE.rst](https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst) for more details on these changes and for general upgrade guidance.

### Notice of change to the default `git` branch for Synapse

With the release of Synapse 1.13.0, the default `git` branch for Synapse has changed to `develop`, which is the development tip. This is more consistent with common practice and modern `git` usage.

The `master` branch, which tracks the latest release, is still available. It is recommended that developers and distributors who have scripts which run builds using the default branch of Synapse should therefore consider pinning their scripts to `master`.

### Features

* Extend the `web_client_location` option to accept an absolute URL to use as a redirect. Adds a warning when running the web client on the same hostname as homeserver. Contributed by Martin Milata. ([\#7006](https://github.com/matrix-org/synapse/issues/7006))
* Set `Referrer-Policy` header to `no-referrer` on media downloads. ([\#7009](https://github.com/matrix-org/synapse/issues/7009))
* Add support for running replication over Redis when using workers. ([\#7040](https://github.com/matrix-org/synapse/issues/7040), [\#7325](https://github.com/matrix-org/synapse/issues/7325), [\#7352](https://github.com/matrix-org/synapse/issues/7352), [\#7401](https://github.com/matrix-org/synapse/issues/7401), [\#7427](https://github.com/matrix-org/synapse/issues/7427), [\#7439](https://github.com/matrix-org/synapse/issues/7439), [\#7446](https://github.com/matrix-org/synapse/issues/7446), [\#7450](https://github.com/matrix-org/synapse/issues/7450), [\#7454](https://github.com/matrix-org/synapse/issues/7454))
* Admin API `POST /_synapse/admin/v1/join/<roomIdOrAlias>` to join users to a room like `auto_join_rooms` for creation of users. ([\#7051](https://github.com/matrix-org/synapse/issues/7051))
* Add options to prevent users from changing their profile or associated 3PIDs. ([\#7096](https://github.com/matrix-org/synapse/issues/7096))
* Support SSO in the user interactive authentication workflow. ([\#7102](https://github.com/matrix-org/synapse/issues/7102), [\#7186](https://github.com/matrix-org/synapse/issues/7186), [\#7279](https://github.com/matrix-org/synapse/issues/7279), [\#7343](https://github.com/matrix-org/synapse/issues/7343))
* Allow server admins to define and enforce a password policy ([MSC2000](https://github.com/matrix-org/matrix-doc/issues/2000)). ([\#7118](https://github.com/matrix-org/synapse/issues/7118))
* Improve the support for SSO authentication on the login fallback page. ([\#7152](https://github.com/matrix-org/synapse/issues/7152), [\#7235](https://github.com/matrix-org/synapse/issues/7235))
* Always whitelist the login fallback in the SSO configuration if `public_baseurl` is set. ([\#7153](https://github.com/matrix-org/synapse/issues/7153))
* Admin users are no longer required to be in a room to create an alias for it. ([\#7191](https://github.com/matrix-org/synapse/issues/7191))
* Require admin privileges to enable room encryption by default. This does not affect existing rooms. ([\#7230](https://github.com/matrix-org/synapse/issues/7230))
* Add a config option for specifying the value of the Accept-Language HTTP header when generating URL previews. ([\#7265](https://github.com/matrix-org/synapse/issues/7265))
* Allow `/requestToken` endpoints to hide the existence (or lack thereof) of 3PID associations on the homeserver. ([\#7315](https://github.com/matrix-org/synapse/issues/7315))
* Add a configuration setting to tweak the threshold for dummy events. ([\#7422](https://github.com/matrix-org/synapse/issues/7422))

### Bugfixes

* Don't attempt to use an invalid sqlite config if no database configuration is provided. Contributed by @nekatak. ([\#6573](https://github.com/matrix-org/synapse/issues/6573))
* Fix single-sign on with CAS systems: pass the same service URL when requesting the CAS ticket and when calling the `proxyValidate` URL. Contributed by @Naugrimm. ([\#6634](https://github.com/matrix-org/synapse/issues/6634))
* Fix missing field `default` when fetching user-defined push rules. ([\#6639](https://github.com/matrix-org/synapse/issues/6639))
* Improve error responses when accessing remote public room lists. ([\#6899](https://github.com/matrix-org/synapse/issues/6899), [\#7368](https://github.com/matrix-org/synapse/issues/7368))
* Transfer alias mappings on room upgrade. ([\#6946](https://github.com/matrix-org/synapse/issues/6946))
* Ensure that a user interactive authentication session is tied to a single request. ([\#7068](https://github.com/matrix-org/synapse/issues/7068), [\#7455](https://github.com/matrix-org/synapse/issues/7455))
* Fix a bug in the federation API which could cause occasional "Failed to get PDU" errors. ([\#7089](https://github.com/matrix-org/synapse/issues/7089))
* Return the proper error (`M_BAD_ALIAS`) when a non-existent canonical alias is provided. ([\#7109](https://github.com/matrix-org/synapse/issues/7109))
* Fix a bug which meant that groups updates were not correctly replicated between workers. ([\#7117](https://github.com/matrix-org/synapse/issues/7117))
* Fix starting workers when federation sending not split out. ([\#7133](https://github.com/matrix-org/synapse/issues/7133))
* Ensure `is_verified` is a boolean in responses to `GET /_matrix/client/r0/room_keys/keys`. Also warn the user if they forgot the `version` query param. ([\#7150](https://github.com/matrix-org/synapse/issues/7150))
* Fix error page being shown when a custom SAML handler attempted to redirect when processing an auth response. ([\#7151](https://github.com/matrix-org/synapse/issues/7151))
* Avoid importing `sqlite3` when using the postgres backend. Contributed by David Vo. ([\#7155](https://github.com/matrix-org/synapse/issues/7155))
* Fix excessive CPU usage by `prune_old_outbound_device_pokes` job. ([\#7159](https://github.com/matrix-org/synapse/issues/7159))
* Fix a bug which could cause outbound federation traffic to stop working if a client uploaded an incorrect e2e device signature. ([\#7177](https://github.com/matrix-org/synapse/issues/7177))
* Fix a bug which could cause incorrect 'cyclic dependency' error. ([\#7178](https://github.com/matrix-org/synapse/issues/7178))
* Fix a bug that could cause a user to be invited to a server notices (aka System Alerts) room without any notice being sent. ([\#7199](https://github.com/matrix-org/synapse/issues/7199))
* Fix some worker-mode replication handling not being correctly recorded in CPU usage stats. ([\#7203](https://github.com/matrix-org/synapse/issues/7203))
* Do not allow a deactivated user to login via SSO. ([\#7240](https://github.com/matrix-org/synapse/issues/7240), [\#7259](https://github.com/matrix-org/synapse/issues/7259))
* Fix --help command-line argument. ([\#7249](https://github.com/matrix-org/synapse/issues/7249))
* Fix room publish permissions not being checked on room creation. ([\#7260](https://github.com/matrix-org/synapse/issues/7260))
* Reject unknown session IDs during user interactive authentication instead of silently creating a new session. ([\#7268](https://github.com/matrix-org/synapse/issues/7268))
* Fix a SQL query introduced in Synapse 1.12.0 which could cause large amounts of logging to the postgres slow-query log. ([\#7274](https://github.com/matrix-org/synapse/issues/7274))
* Persist user interactive authentication sessions across workers and Synapse restarts. ([\#7302](https://github.com/matrix-org/synapse/issues/7302))
* Fixed backwards compatibility logic of the first value of `trusted_third_party_id_servers` being used for `account_threepid_delegates.email`, which occurs when the former, deprecated option is set and the latter is not. ([\#7316](https://github.com/matrix-org/synapse/issues/7316))
* Fix a bug where event updates might not be sent over replication to worker processes after the stream falls behind. ([\#7337](https://github.com/matrix-org/synapse/issues/7337), [\#7358](https://github.com/matrix-org/synapse/issues/7358))
* Fix bad error handling that would cause Synapse to crash if it's provided with a YAML configuration file that's either empty or doesn't parse into a key-value map. ([\#7341](https://github.com/matrix-org/synapse/issues/7341))
* Fix incorrect metrics reporting for `renew_attestations` background task. ([\#7344](https://github.com/matrix-org/synapse/issues/7344))
* Prevent non-federating rooms from appearing in responses to federated `POST /publicRoom` requests when a filter was included. ([\#7367](https://github.com/matrix-org/synapse/issues/7367))
* Fix a bug which would cause the room directory to be incorrectly populated if Synapse was upgraded directly from v1.2.1 or earlier to v1.4.0 or later. Note that this fix does not apply retrospectively; see the [upgrade notes](UPGRADE.rst#upgrading-to-v1130) for more information. ([\#7387](https://github.com/matrix-org/synapse/issues/7387))
* Fix bug in `EventContext.deserialize`. ([\#7393](https://github.com/matrix-org/synapse/issues/7393))
* Fix a long-standing bug which could cause messages not to be sent over federation, when state events with state keys matching user IDs (such as custom user statuses) were received. ([\#7376](https://github.com/matrix-org/synapse/issues/7376))
* Restore compatibility with non-compliant clients during the user interactive authentication process, fixing a problem introduced in v1.13.0rc1. ([\#7483](https://github.com/matrix-org/synapse/issues/7483))
* Hash passwords as early as possible during registration. ([\#7523](https://github.com/matrix-org/synapse/issues/7523))

### Improved Documentation

* Update Debian installation instructions to recommend installing the `virtualenv` package instead of `python3-virtualenv`. ([\#6892](https://github.com/matrix-org/synapse/issues/6892))
* Improve the documentation for database configuration. ([\#6988](https://github.com/matrix-org/synapse/issues/6988))
* Improve the documentation of application service configuration files. ([\#7091](https://github.com/matrix-org/synapse/issues/7091))
* Update pre-built package name for FreeBSD. ([\#7107](https://github.com/matrix-org/synapse/issues/7107))
* Update postgres docs with login troubleshooting information. ([\#7119](https://github.com/matrix-org/synapse/issues/7119))
* Clean up INSTALL.md a bit. ([\#7141](https://github.com/matrix-org/synapse/issues/7141))
* Add documentation for running a local CAS server for testing. ([\#7147](https://github.com/matrix-org/synapse/issues/7147))
* Improve README.md by being explicit about public IP recommendation for TURN relaying. ([\#7167](https://github.com/matrix-org/synapse/issues/7167))
* Fix a small typo in the `metrics_flags` config option. ([\#7171](https://github.com/matrix-org/synapse/issues/7171))
* Update the contributed documentation on managing synapse workers with systemd, and bring it into the core distribution. ([\#7234](https://github.com/matrix-org/synapse/issues/7234))
* Add documentation to the `password_providers` config option. Add known password provider implementations to docs. ([\#7238](https://github.com/matrix-org/synapse/issues/7238), [\#7248](https://github.com/matrix-org/synapse/issues/7248))
* Modify suggested nginx reverse proxy configuration to match Synapse's default file upload size. Contributed by @ProCycleDev. ([\#7251](https://github.com/matrix-org/synapse/issues/7251))
* Documentation of media_storage_providers options updated to avoid misunderstandings. Contributed by Tristan Lins. ([\#7272](https://github.com/matrix-org/synapse/issues/7272))
* Add documentation on monitoring workers with Prometheus. ([\#7357](https://github.com/matrix-org/synapse/issues/7357))
* Clarify endpoint usage in the users admin api documentation. ([\#7361](https://github.com/matrix-org/synapse/issues/7361))

### Deprecations and Removals

* Remove nonfunctional `captcha_bypass_secret` option from `homeserver.yaml`. ([\#7137](https://github.com/matrix-org/synapse/issues/7137))

### Internal Changes

* Add benchmarks for LruCache. ([\#6446](https://github.com/matrix-org/synapse/issues/6446))
* Return total number of users and profile attributes in admin users endpoint. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#6881](https://github.com/matrix-org/synapse/issues/6881))
* Change device list streams to have one row per ID. ([\#7010](https://github.com/matrix-org/synapse/issues/7010))
* Remove concept of a non-limited stream. ([\#7011](https://github.com/matrix-org/synapse/issues/7011))
* Move catchup of replication streams logic to worker. ([\#7024](https://github.com/matrix-org/synapse/issues/7024), [\#7195](https://github.com/matrix-org/synapse/issues/7195), [\#7226](https://github.com/matrix-org/synapse/issues/7226), [\#7239](https://github.com/matrix-org/synapse/issues/7239), [\#7286](https://github.com/matrix-org/synapse/issues/7286), [\#7290](https://github.com/matrix-org/synapse/issues/7290), [\#7318](https://github.com/matrix-org/synapse/issues/7318), [\#7326](https://github.com/matrix-org/synapse/issues/7326), [\#7378](https://github.com/matrix-org/synapse/issues/7378), [\#7421](https://github.com/matrix-org/synapse/issues/7421))
* Convert some of synapse.rest.media to async/await. ([\#7110](https://github.com/matrix-org/synapse/issues/7110), [\#7184](https://github.com/matrix-org/synapse/issues/7184), [\#7241](https://github.com/matrix-org/synapse/issues/7241))
* De-duplicate / remove unused REST code for login and auth. ([\#7115](https://github.com/matrix-org/synapse/issues/7115))
* Convert `*StreamRow` classes to inner classes. ([\#7116](https://github.com/matrix-org/synapse/issues/7116))
* Clean up some LoggingContext code. ([\#7120](https://github.com/matrix-org/synapse/issues/7120), [\#7181](https://github.com/matrix-org/synapse/issues/7181), [\#7183](https://github.com/matrix-org/synapse/issues/7183), [\#7408](https://github.com/matrix-org/synapse/issues/7408), [\#7426](https://github.com/matrix-org/synapse/issues/7426))
* Add explicit `instance_id` for USER_SYNC commands and remove implicit `conn_id` usage. ([\#7128](https://github.com/matrix-org/synapse/issues/7128))
* Refactored the CAS authentication logic to a separate class. ([\#7136](https://github.com/matrix-org/synapse/issues/7136))
* Run replication streamers on workers. ([\#7146](https://github.com/matrix-org/synapse/issues/7146))
* Add tests for outbound device pokes. ([\#7157](https://github.com/matrix-org/synapse/issues/7157))
* Fix device list update stream ids going backward. ([\#7158](https://github.com/matrix-org/synapse/issues/7158))
* Use `stream.current_token()` and remove `stream_positions()`. ([\#7172](https://github.com/matrix-org/synapse/issues/7172))
* Move client command handling out of TCP protocol. ([\#7185](https://github.com/matrix-org/synapse/issues/7185))
* Move server command handling out of TCP protocol. ([\#7187](https://github.com/matrix-org/synapse/issues/7187))
* Fix consistency of HTTP status codes reported in log lines. ([\#7188](https://github.com/matrix-org/synapse/issues/7188))
* Only run one background database update at a time. ([\#7190](https://github.com/matrix-org/synapse/issues/7190))
* Remove sent outbound device list pokes from the database. ([\#7192](https://github.com/matrix-org/synapse/issues/7192))
* Add a background database update job to clear out duplicate `device_lists_outbound_pokes`. ([\#7193](https://github.com/matrix-org/synapse/issues/7193))
* Remove some extraneous debugging log lines. ([\#7207](https://github.com/matrix-org/synapse/issues/7207))
* Add explicit Python build tooling as dependencies for the snapcraft build. ([\#7213](https://github.com/matrix-org/synapse/issues/7213))
* Add typing information to federation server code. ([\#7219](https://github.com/matrix-org/synapse/issues/7219))
* Extend room admin api (`GET /_synapse/admin/v1/rooms`) with additional attributes. ([\#7225](https://github.com/matrix-org/synapse/issues/7225))
* Unblacklist '/upgrade creates a new room' sytest for workers. ([\#7228](https://github.com/matrix-org/synapse/issues/7228))
* Remove redundant checks on `daemonize` from synctl. ([\#7233](https://github.com/matrix-org/synapse/issues/7233))
* Upgrade jQuery to v3.4.1 on fallback login/registration pages. ([\#7236](https://github.com/matrix-org/synapse/issues/7236))
* Change log line that told user to implement onLogin/onRegister fallback js functions to a warning, instead of an info, so it's more visible. ([\#7237](https://github.com/matrix-org/synapse/issues/7237))
* Correct the parameters of a test fixture. Contributed by Isaiah Singletary. ([\#7243](https://github.com/matrix-org/synapse/issues/7243))
* Convert auth handler to async/await. ([\#7261](https://github.com/matrix-org/synapse/issues/7261))
* Add some unit tests for replication. ([\#7278](https://github.com/matrix-org/synapse/issues/7278))
* Improve typing annotations in `synapse.replication.tcp.streams.Stream`. ([\#7291](https://github.com/matrix-org/synapse/issues/7291))
* Reduce log verbosity of url cache cleanup tasks. ([\#7295](https://github.com/matrix-org/synapse/issues/7295))
* Fix sample SAML Service Provider configuration. Contributed by @frcl. ([\#7300](https://github.com/matrix-org/synapse/issues/7300))
* Fix StreamChangeCache to work with multiple entities changing on the same stream id. ([\#7303](https://github.com/matrix-org/synapse/issues/7303))
* Fix an incorrect import in IdentityHandler. ([\#7319](https://github.com/matrix-org/synapse/issues/7319))
* Reduce logging verbosity for successful federation requests. ([\#7321](https://github.com/matrix-org/synapse/issues/7321))
* Convert some federation handler code to async/await. ([\#7338](https://github.com/matrix-org/synapse/issues/7338))
* Fix collation for postgres for unit tests. ([\#7359](https://github.com/matrix-org/synapse/issues/7359))
* Convert RegistrationWorkerStore.is_server_admin and dependent code to async/await. ([\#7363](https://github.com/matrix-org/synapse/issues/7363))
* Add an `instance_name` to `RDATA` and `POSITION` replication commands. ([\#7364](https://github.com/matrix-org/synapse/issues/7364))
* Thread through instance name to replication client. ([\#7369](https://github.com/matrix-org/synapse/issues/7369))
* Convert synapse.server_notices to async/await. ([\#7394](https://github.com/matrix-org/synapse/issues/7394))
* Convert synapse.notifier to async/await. ([\#7395](https://github.com/matrix-org/synapse/issues/7395))
* Fix issues with the Python package manifest. ([\#7404](https://github.com/matrix-org/synapse/issues/7404))
* Prevent methods in `synapse.handlers.auth` from polling the homeserver config every request. ([\#7420](https://github.com/matrix-org/synapse/issues/7420))
* Speed up fetching device lists changes when handling `/sync` requests. ([\#7423](https://github.com/matrix-org/synapse/issues/7423))
* Run group attestation renewal in series rather than parallel for performance. ([\#7442](https://github.com/matrix-org/synapse/issues/7442))
* Fix linting errors in new version of Flake8. ([\#7470](https://github.com/matrix-org/synapse/issues/7470))
* Update the version of dh-virtualenv we use to build debs, and add focal to the list of target distributions. ([\#7526](https://github.com/matrix-org/synapse/issues/7526))
