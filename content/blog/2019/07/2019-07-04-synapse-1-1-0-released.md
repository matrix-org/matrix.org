+++
title = "Synapse 1.1.0 released"
path = "/blog/2019/07/04/synapse-1-1-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Right folks, this is our first post 1.0 release, which means that we have now
officially [dropped support for Python 2 and Postgres
9.4](https://matrix.org/blog/2019/04/08/synapse-deprecating-postgres-9-4-and-python-2-x).
This means that we can start making use of Python 3 specific features and you
should expect lots of associated performance wins over the coming months. See the [upgrade notes](https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst#upgrading-to-v110) for more.

Synapse 1.1.0 also contains a reworked approach to the Docker image, as well lots
of performance improvements with special focus on DB IO - expect more to come
in this area.

Special thanks to community member [Alexander
Trost](https://github.com/galexrt) for rounding out  our SAML support and also
to [Daniel Hoffend](https://github.com/dhoffend) for contributing the ability
to disable local password authentication.

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.1.0) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Note, Synapse is now available from PyPI, pick it up [here](https://pypi.org/project/matrix-synapse/). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 1.0.0 follows:

## Synapse 1.1.0 (2019-07-04)

As of v1.1.0, Synapse no longer supports Python 2, nor Postgres version 9.4.
See the [upgrade notes](https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst#upgrading-to-v110) for more details.

This release also deprecates the use of environment variables to configure the
docker image. See the [docker README](https://github.com/matrix-org/synapse/blob/release-v1.1.0/docker/README.md#legacy-dynamic-configuration-file-support)
for more details.

No changes since 1.1.0rc2.

## Synapse 1.1.0rc2 (2019-07-03)

### Bugfixes

- Fix regression in 1.1rc1 where OPTIONS requests to the media repo would fail. ([\#5593](https://github.com/matrix-org/synapse/issues/5593))
- Removed the `SYNAPSE_SMTP_*` docker container environment variables. Using these environment variables prevented the docker container from starting in Synapse v1.0, even though they didn't actually allow any functionality anyway. ([\#5596](https://github.com/matrix-org/synapse/issues/5596))
- Fix a number of "Starting txn from sentinel context" warnings. ([\#5605](https://github.com/matrix-org/synapse/issues/5605))

### Internal Changes

- Update github templates. ([\#5552](https://github.com/matrix-org/synapse/issues/5552))

## Synapse 1.1.0rc1 (2019-07-02)

As of v1.1.0, Synapse no longer supports Python 2, nor Postgres version 9.4.
See the [upgrade notes](UPGRADE.rst#upgrading-to-v110) for more details.

### Features

- Added possibility to disable local password authentication. Contributed by Daniel Hoffend. ([\#5092](https://github.com/matrix-org/synapse/issues/5092))
- Add monthly active users to phonehome stats. ([\#5252](https://github.com/matrix-org/synapse/issues/5252))
- Allow expired user to trigger renewal email sending manually. ([\#5363](https://github.com/matrix-org/synapse/issues/5363))
- Statistics on forward extremities per room are now exposed via Prometheus. ([\#5384](https://github.com/matrix-org/synapse/issues/5384), [\#5458](https://github.com/matrix-org/synapse/issues/5458), [\#5461](https://github.com/matrix-org/synapse/issues/5461))
- Add --no-daemonize option to run synapse in the foreground, per issue #4130. Contributed by Soham Gumaste. ([\#5412](https://github.com/matrix-org/synapse/issues/5412), [\#5587](https://github.com/matrix-org/synapse/issues/5587))
- Fully support SAML2 authentication. Contributed by [Alexander Trost](https://github.com/galexrt) - thank you! ([\#5422](https://github.com/matrix-org/synapse/issues/5422))
- Allow server admins to define implementations of extra rules for allowing or denying incoming events. ([\#5440](https://github.com/matrix-org/synapse/issues/5440), [\#5474](https://github.com/matrix-org/synapse/issues/5474), [\#5477](https://github.com/matrix-org/synapse/issues/5477))
- Add support for handling pagination APIs on client reader worker. ([\#5505](https://github.com/matrix-org/synapse/issues/5505), [\#5513](https://github.com/matrix-org/synapse/issues/5513), [\#5531](https://github.com/matrix-org/synapse/issues/5531))
- Improve help and cmdline option names for --generate-config options. ([\#5512](https://github.com/matrix-org/synapse/issues/5512))
- Allow configuration of the path used for ACME account keys. ([\#5516](https://github.com/matrix-org/synapse/issues/5516), [\#5521](https://github.com/matrix-org/synapse/issues/5521), [\#5522](https://github.com/matrix-org/synapse/issues/5522))
- Add --data-dir and --open-private-ports options. ([\#5524](https://github.com/matrix-org/synapse/issues/5524))
- Split public rooms directory auth config in two settings, in order to manage client auth independently from the federation part of it. Obsoletes the "restrict_public_rooms_to_local_users" configuration setting. If "restrict_public_rooms_to_local_users" is set in the config, Synapse will act as if both new options are enabled, i.e. require authentication through the client API and deny federation requests. ([\#5534](https://github.com/matrix-org/synapse/issues/5534))
- The minimum TLS version used for outgoing federation requests can now be set with `federation_client_minimum_tls_version`. ([\#5550](https://github.com/matrix-org/synapse/issues/5550))
- Optimise devices changed query to not pull unnecessary rows from the database, reducing database load. ([\#5559](https://github.com/matrix-org/synapse/issues/5559))
- Add new metrics for number of forward extremities being persisted and number of state groups involved in resolution. ([\#5476](https://github.com/matrix-org/synapse/issues/5476))

### Bugfixes

- Fix bug processing incoming events over federation if call to `/get_missing_events` fails. ([\#5042](https://github.com/matrix-org/synapse/issues/5042))
- Prevent more than one room upgrade happening simultaneously on the same room. ([\#5051](https://github.com/matrix-org/synapse/issues/5051))
- Fix a bug where running synapse_port_db would cause the account validity feature to fail because it didn't set the type of the email_sent column to boolean. ([\#5325](https://github.com/matrix-org/synapse/issues/5325))
- Warn about disabling email-based password resets when a reset occurs, and remove warning when someone attempts a phone-based reset. ([\#5387](https://github.com/matrix-org/synapse/issues/5387))
- Fix email notifications for unnamed rooms with multiple people. ([\#5388](https://github.com/matrix-org/synapse/issues/5388))
- Fix exceptions in federation reader worker caused by attempting to renew attestations, which should only happen on master worker. ([\#5389](https://github.com/matrix-org/synapse/issues/5389))
- Fix handling of failures fetching remote content to not log failures as exceptions. ([\#5390](https://github.com/matrix-org/synapse/issues/5390))
- Fix a bug where deactivated users could receive renewal emails if the account validity feature is on. ([\#5394](https://github.com/matrix-org/synapse/issues/5394))
- Fix missing invite state after exchanging 3PID invites over federaton. ([\#5464](https://github.com/matrix-org/synapse/issues/5464))
- Fix intermittent exceptions on Apple hardware. Also fix bug that caused database activity times to be under-reported in log lines. ([\#5498](https://github.com/matrix-org/synapse/issues/5498))
- Fix logging error when a tampered event is detected. ([\#5500](https://github.com/matrix-org/synapse/issues/5500))
- Fix bug where clients could tight loop calling `/sync` for a period. ([\#5507](https://github.com/matrix-org/synapse/issues/5507))
- Fix bug with `jinja2` preventing Synapse from starting. Users who had this problem should now simply need to run `pip install matrix-synapse`. ([\#5514](https://github.com/matrix-org/synapse/issues/5514))
- Fix a regression where homeservers on private IP addresses were incorrectly blacklisted. ([\#5523](https://github.com/matrix-org/synapse/issues/5523))
- Fixed m.login.jwt using unregistered user_id and added pyjwt>=1.6.4 as jwt conditional dependencies. Contributed by Pau Rodriguez-Estivill. ([\#5555](https://github.com/matrix-org/synapse/issues/5555), [\#5586](https://github.com/matrix-org/synapse/issues/5586))
- Fix a bug that would cause invited users to receive several emails for a single 3PID invite in case the inviter is rate limited. ([\#5576](https://github.com/matrix-org/synapse/issues/5576))

### Updates to the Docker image

- Add ability to change Docker containers [timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) with the `TZ` variable. ([\#5383](https://github.com/matrix-org/synapse/issues/5383))
- Update docker image to use Python 3.7. ([\#5546](https://github.com/matrix-org/synapse/issues/5546))
- Deprecate the use of environment variables for configuration, and make the use of a static configuration the default. ([\#5561](https://github.com/matrix-org/synapse/issues/5561), [\#5562](https://github.com/matrix-org/synapse/issues/5562), [\#5566](https://github.com/matrix-org/synapse/issues/5566), [\#5567](https://github.com/matrix-org/synapse/issues/5567))
- Increase default log level for docker image to INFO. It can still be changed by editing the generated log.config file. ([\#5547](https://github.com/matrix-org/synapse/issues/5547))
- Send synapse logs to the docker logging system, by default. ([\#5565](https://github.com/matrix-org/synapse/issues/5565))
- Open the non-TLS port by default. ([\#5568](https://github.com/matrix-org/synapse/issues/5568))
- Fix failure to start under docker with SAML support enabled. ([\#5490](https://github.com/matrix-org/synapse/issues/5490))
- Use a sensible location for data files when generating a config file. ([\#5563](https://github.com/matrix-org/synapse/issues/5563))

### Deprecations and Removals

- Python 2.7 is no longer a supported platform. Synapse now requires Python 3.5+ to run. ([\#5425](https://github.com/matrix-org/synapse/issues/5425))
- PostgreSQL 9.4 is no longer supported. Synapse requires Postgres 9.5+ or above for Postgres support. ([\#5448](https://github.com/matrix-org/synapse/issues/5448))
- Remove support for cpu_affinity setting. ([\#5525](https://github.com/matrix-org/synapse/issues/5525))

### Improved Documentation

- Improve README section on performance troubleshooting. ([\#4276](https://github.com/matrix-org/synapse/issues/4276))
- Add information about how to install and run `black` on the codebase to code_style.rst. ([\#5537](https://github.com/matrix-org/synapse/issues/5537))
- Improve install docs on choosing server_name. ([\#5558](https://github.com/matrix-org/synapse/issues/5558))

### Internal Changes

- Add logging to 3pid invite signature verification. ([\#5015](https://github.com/matrix-org/synapse/issues/5015))
- Update example haproxy config to a more compatible setup. ([\#5313](https://github.com/matrix-org/synapse/issues/5313))
- Track deactivated accounts in the database. ([\#5378](https://github.com/matrix-org/synapse/issues/5378), [\#5465](https://github.com/matrix-org/synapse/issues/5465), [\#5493](https://github.com/matrix-org/synapse/issues/5493))
- Clean up code for sending federation EDUs. ([\#5381](https://github.com/matrix-org/synapse/issues/5381))
- Add a sponsor button to the repo. ([\#5382](https://github.com/matrix-org/synapse/issues/5382), [\#5386](https://github.com/matrix-org/synapse/issues/5386))
- Don't log non-200 responses from federation queries as exceptions. ([\#5383](https://github.com/matrix-org/synapse/issues/5383))
- Update Python syntax in contrib/ to Python 3. ([\#5446](https://github.com/matrix-org/synapse/issues/5446))
- Update federation_client dev script to support `.well-known` and work with python3. ([\#5447](https://github.com/matrix-org/synapse/issues/5447))
- SyTest has been moved to Buildkite. ([\#5459](https://github.com/matrix-org/synapse/issues/5459))
- Demo script now uses python3. ([\#5460](https://github.com/matrix-org/synapse/issues/5460))
- Synapse can now handle RestServlets that return coroutines. ([\#5475](https://github.com/matrix-org/synapse/issues/5475), [\#5585](https://github.com/matrix-org/synapse/issues/5585))
- The demo servers talk to each other again. ([\#5478](https://github.com/matrix-org/synapse/issues/5478))
- Add an EXPERIMENTAL config option to try and periodically clean up extremities by sending dummy events. ([\#5480](https://github.com/matrix-org/synapse/issues/5480))
- Synapse's codebase is now formatted by `black`. ([\#5482](https://github.com/matrix-org/synapse/issues/5482))
- Some cleanups and sanity-checking in the CPU and database metrics. ([\#5499](https://github.com/matrix-org/synapse/issues/5499))
- Improve email notification logging. ([\#5502](https://github.com/matrix-org/synapse/issues/5502))
- Fix "Unexpected entry in 'full_schemas'" log warning. ([\#5509](https://github.com/matrix-org/synapse/issues/5509))
- Improve logging when generating config files. ([\#5510](https://github.com/matrix-org/synapse/issues/5510))
- Refactor and clean up Config parser for maintainability. ([\#5511](https://github.com/matrix-org/synapse/issues/5511))
- Make the config clearer in that email.template_dir is relative to the Synapse's root directory, not the `synapse/` folder within it. ([\#5543](https://github.com/matrix-org/synapse/issues/5543))
- Update v1.0.0 release changelog to include more information about changes to password resets. ([\#5545](https://github.com/matrix-org/synapse/issues/5545))
- Remove non-functioning check_event_hash.py dev script. ([\#5548](https://github.com/matrix-org/synapse/issues/5548))
- Synapse will now only allow TLS v1.2 connections when serving federation, if it terminates TLS. As Synapse's allowed ciphers were only able to be used in TLSv1.2 before, this does not change behaviour. ([\#5550](https://github.com/matrix-org/synapse/issues/5550))
- Logging when running GC collection on generation 0 is now at the DEBUG level, not INFO. ([\#5557](https://github.com/matrix-org/synapse/issues/5557))
- Reduce the amount of stuff we send in the docker context. ([\#5564](https://github.com/matrix-org/synapse/issues/5564))
- Point the reverse links in the Purge History contrib scripts at the intended location. ([\#5570](https://github.com/matrix-org/synapse/issues/5570))
