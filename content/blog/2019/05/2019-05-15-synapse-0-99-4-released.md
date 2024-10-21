+++
title = "Synapse 0.99.4 released!"
path = "/blog/2019/05/15/synapse-0-99-4-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Hey ho Synapse release day.

0.99.4 is a maintenance release collecting together all of the bug fixes and performance improvements over the past few weeks, additionally there is further support for the upcoming 1.0 release (more info coming soon). One thing worth calling out is how many community contributions have made their way into 0.99.4, take a look at the change log for details, but many thanks to everyone submitting PRs, keep them coming!

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v0.99.4) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Note, Synapse is now available from PyPI, pick it up [here](https://pypi.org/project/matrix-synapse/). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

## Synapse 0.99.4 Changelog

### Features

- Add systemd-python to the optional dependencies to enable logging to the systemd journal. Install with `pip install matrix-synapse[systemd]`. ([\#4339](https://github.com/matrix-org/synapse/issues/4339))
- Add a default .m.rule.tombstone push rule. ([\#4867](https://github.com/matrix-org/synapse/issues/4867))
- Add ability for password provider modules to bind email addresses to users upon registration. ([\#4947](https://github.com/matrix-org/synapse/issues/4947))
- Implementation of [MSC1711](https://github.com/matrix-org/matrix-doc/pull/1711) including config options for requiring valid TLS certificates for federation traffic, the ability to disable TLS validation for specific domains, and the ability to specify your own list of CA certificates. ([\#4967](https://github.com/matrix-org/synapse/issues/4967))
- Remove presence list support as per MSC 1819. ([\#4989](https://github.com/matrix-org/synapse/issues/4989))
- Reduce CPU usage starting pushers during start up. ([\#4991](https://github.com/matrix-org/synapse/issues/4991))
- Add a delete group admin API. ([\#5002](https://github.com/matrix-org/synapse/issues/5002))
- Add config option to block users from looking up 3PIDs. ([\#5010](https://github.com/matrix-org/synapse/issues/5010))
- Add context to phonehome stats. ([\#5020](https://github.com/matrix-org/synapse/issues/5020))
- Configure the example systemd units to have a log identifier of `matrix-synapse`
  instead of the executable name, `python`.
  Contributed by Christoph Müller. ([\#5023](https://github.com/matrix-org/synapse/issues/5023))
- Add time-based account expiration. ([\#5027](https://github.com/matrix-org/synapse/issues/5027), [\#5047](https://github.com/matrix-org/synapse/issues/5047), [\#5073](https://github.com/matrix-org/synapse/issues/5073), [\#5116](https://github.com/matrix-org/synapse/issues/5116))
- Add support for handling /versions, /voip and /push_rules client endpoints to client_reader worker. ([\#5063](https://github.com/matrix-org/synapse/issues/5063), [\#5065](https://github.com/matrix-org/synapse/issues/5065), [\#5070](https://github.com/matrix-org/synapse/issues/5070))
- Add an configuration option to require authentication on /publicRooms and /profile endpoints. ([\#5083](https://github.com/matrix-org/synapse/issues/5083))
- Move admin APIs to `/_synapse/admin/v1`. (The old paths are retained for backwards-compatibility, for now). ([\#5119](https://github.com/matrix-org/synapse/issues/5119))
- Implement an admin API for sending server notices. Many thanks to @krombel who provided a foundation for this work. ([\#5121](https://github.com/matrix-org/synapse/issues/5121), [\#5142](https://github.com/matrix-org/synapse/issues/5142))

### Bugfixes

- Avoid redundant URL encoding of redirect URL for SSO login in the fallback login page. Fixes a regression introduced in [#4220](https://github.com/matrix-org/synapse/pull/4220). Contributed by Marcel Fabian Krüger ("[zaugin](https://github.com/zauguin)"). ([\#4555](https://github.com/matrix-org/synapse/issues/4555))
- Fix bug where presence updates were sent to all servers in a room when a new server joined, rather than to just the new server. ([\#4942](https://github.com/matrix-org/synapse/issues/4942), [\#5103](https://github.com/matrix-org/synapse/issues/5103))
- Fix sync bug which made accepting invites unreliable in worker-mode synapses. ([\#4955](https://github.com/matrix-org/synapse/issues/4955), [\#4956](https://github.com/matrix-org/synapse/issues/4956))
- start.sh: Fix the --no-rate-limit option for messages and make it bypass rate limit on registration and login too. ([\#4981](https://github.com/matrix-org/synapse/issues/4981))
- Transfer related groups on room upgrade. ([\#4990](https://github.com/matrix-org/synapse/issues/4990))
- Prevent the ability to kick users from a room they aren't in. ([\#4999](https://github.com/matrix-org/synapse/issues/4999))
- Fix issue #4596 so synapse_port_db script works with --curses option on Python 3. Contributed by Anders Jensen-Waud <anders@jensenwaud.com>. ([\#5003](https://github.com/matrix-org/synapse/issues/5003))
- Clients timing out/disappearing while downloading from the media repository will now no longer log a spurious "Producer was not unregistered" message. ([\#5009](https://github.com/matrix-org/synapse/issues/5009))
- Fix "cannot import name execute_batch" error with postgres. ([\#5032](https://github.com/matrix-org/synapse/issues/5032))
- Fix disappearing exceptions in manhole. ([\#5035](https://github.com/matrix-org/synapse/issues/5035))
- Workaround bug in twisted where attempting too many concurrent DNS requests could cause it to hang due to running out of file descriptors. ([\#5037](https://github.com/matrix-org/synapse/issues/5037))
- Make sure we're not registering the same 3pid twice on registration. ([\#5071](https://github.com/matrix-org/synapse/issues/5071))
- Don't crash on lack of expiry templates. ([\#5077](https://github.com/matrix-org/synapse/issues/5077))
- Fix the ratelimting on third party invites. ([\#5104](https://github.com/matrix-org/synapse/issues/5104))
- Add some missing limitations to room alias creation. ([\#5124](https://github.com/matrix-org/synapse/issues/5124), [\#5128](https://github.com/matrix-org/synapse/issues/5128))
- Limit the number of EDUs in transactions to 100 as expected by synapse. Thanks to @superboum for this work! ([\#5138](https://github.com/matrix-org/synapse/issues/5138))
- Fix bogus imports in unit tests. ([\#5154](https://github.com/matrix-org/synapse/issues/5154))

### Internal Changes

- Add test to verify threepid auth check added in #4435. ([\#4474](https://github.com/matrix-org/synapse/issues/4474))
- Fix/improve some docstrings in the replication code. ([\#4949](https://github.com/matrix-org/synapse/issues/4949))
- Split synapse.replication.tcp.streams into smaller files. ([\#4953](https://github.com/matrix-org/synapse/issues/4953))
- Refactor replication row generation/parsing. ([\#4954](https://github.com/matrix-org/synapse/issues/4954))
- Run `black` to clean up formatting on `synapse/storage/roommember.py` and `synapse/storage/events.py`. ([\#4959](https://github.com/matrix-org/synapse/issues/4959))
- Remove log line for password via the admin API. ([\#4965](https://github.com/matrix-org/synapse/issues/4965))
- Fix typo in TLS filenames in docker/README.md. Also add the '-p' commandline option to the 'docker run' example. Contributed by Jurrie Overgoor. ([\#4968](https://github.com/matrix-org/synapse/issues/4968))
- Refactor room version definitions. ([\#4969](https://github.com/matrix-org/synapse/issues/4969))
- Reduce log level of .well-known/matrix/client responses. ([\#4972](https://github.com/matrix-org/synapse/issues/4972))
- Add `config.signing_key_path` that can be read by `synapse.config` utility. ([\#4974](https://github.com/matrix-org/synapse/issues/4974))
- Track which identity server is used when binding a threepid and use that for unbinding, as per MSC1915. ([\#4982](https://github.com/matrix-org/synapse/issues/4982))
- Rewrite KeyringTestCase as a HomeserverTestCase. ([\#4985](https://github.com/matrix-org/synapse/issues/4985))
- README updates: Corrected the default POSTGRES_USER. Added port forwarding hint in TLS section. ([\#4987](https://github.com/matrix-org/synapse/issues/4987))
- Remove a number of unused tables from the database schema. ([\#4992](https://github.com/matrix-org/synapse/issues/4992), [\#5028](https://github.com/matrix-org/synapse/issues/5028), [\#5033](https://github.com/matrix-org/synapse/issues/5033))
- Run `black` on the remainder of `synapse/storage/`. ([\#4996](https://github.com/matrix-org/synapse/issues/4996))
- Fix grammar in get_current_users_in_room and give it a docstring. ([\#4998](https://github.com/matrix-org/synapse/issues/4998))
- Clean up some code in the server-key Keyring. ([\#5001](https://github.com/matrix-org/synapse/issues/5001))
- Convert SYNAPSE_NO_TLS Docker variable to boolean for user friendliness. Contributed by Gabriel Eckerson. ([\#5005](https://github.com/matrix-org/synapse/issues/5005))
- Refactor synapse.storage._base._simple_select_list_paginate. ([\#5007](https://github.com/matrix-org/synapse/issues/5007))
- Store the notary server name correctly in server_keys_json. ([\#5024](https://github.com/matrix-org/synapse/issues/5024))
- Rewrite Datastore.get_server_verify_keys to reduce the number of database transactions. ([\#5030](https://github.com/matrix-org/synapse/issues/5030))
- Remove extraneous period from copyright headers. ([\#5046](https://github.com/matrix-org/synapse/issues/5046))
- Update documentation for where to get Synapse packages. ([\#5067](https://github.com/matrix-org/synapse/issues/5067))
- Add workarounds for pep-517 install errors. ([\#5098](https://github.com/matrix-org/synapse/issues/5098))
- Improve logging when event-signature checks fail. ([\#5100](https://github.com/matrix-org/synapse/issues/5100))
- Factor out an "assert_requester_is_admin" function. ([\#5120](https://github.com/matrix-org/synapse/issues/5120))
- Remove the requirement to authenticate for /admin/server_version. ([\#5122](https://github.com/matrix-org/synapse/issues/5122))
- Prevent an exception from being raised in a IResolutionReceiver and use a more generic error message for blacklisted URL previews. ([\#5155](https://github.com/matrix-org/synapse/issues/5155))
- Run `black` on the tests directory. ([\#5170](https://github.com/matrix-org/synapse/issues/5170))
- Fix CI after new release of isort. ([\#5179](https://github.com/matrix-org/synapse/issues/5179))
