+++
title = "Synapse 1.6.0 released"
path = "/blog/2019/11/26/synapse-1-6-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.6.0 has landed and is here to brighten your day!

1.6.0's most notable feature is that of label based filtering. It allows for messages to be tagged with a given label so that clients can filter on the label, this means that clients can subscribe to specific topics in a room, such as #lunch.

Completely separately, from here on in new rooms will be version 5 by default, all this means in practice is that servers will respect server signing key validity periods. This won't make a lot of difference in day to day operation, but it is an important security consideration and we now have sufficient penetration across the federation to make version 5 the default.

Aside from that there are a bunch of bug fixes and improvements, including fixing a bug that in some cases prevented messages being decrypted shortly after a restart ([\#6363](https://github.com/matrix-org/synapse/issues/6363)) and generally improving the room upgrade experience ([\#6232](https://github.com/matrix-org/synapse/issues/6232), [\#6235](https://github.com/matrix-org/synapse/issues/6235)).

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.6.0) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 1.5.1 follows:

## Synapse 1.6.0 (2019-11-26)

### Bugfixes

- Fix phone home stats reporting. ([\#6418](https://github.com/matrix-org/synapse/issues/6418))

## Synapse 1.6.0rc2 (2019-11-25)

### Bugfixes

- Fix a bug which could cause the background database update handler for event labels to get stuck in a loop raising exceptions. ([\#6407](https://github.com/matrix-org/synapse/issues/6407))

## Synapse 1.6.0rc1 (2019-11-20)

### Features

- Add federation support for cross-signing. ([\#5727](https://github.com/matrix-org/synapse/issues/5727))
- Increase default room version from 4 to 5, thereby enforcing server key validity period checks. ([\#6220](https://github.com/matrix-org/synapse/issues/6220))
- Add support for outbound http proxying via http_proxy/HTTPS_PROXY env vars. ([\#6238](https://github.com/matrix-org/synapse/issues/6238))
- Implement label-based filtering on `/sync` and `/messages` ([MSC2326](https://github.com/matrix-org/matrix-doc/pull/2326)). ([\#6301](https://github.com/matrix-org/synapse/issues/6301), [\#6310](https://github.com/matrix-org/synapse/issues/6310), [\#6340](https://github.com/matrix-org/synapse/issues/6340))

### Bugfixes

- Fix LruCache callback deduplication for Python 3.8. Contributed by @V02460. ([\#6213](https://github.com/matrix-org/synapse/issues/6213))
- Remove a room from a server's public rooms list on room upgrade. ([\#6232](https://github.com/matrix-org/synapse/issues/6232), [\#6235](https://github.com/matrix-org/synapse/issues/6235))
- Delete keys from key backup when deleting backup versions. ([\#6253](https://github.com/matrix-org/synapse/issues/6253))
- Make notification of cross-signing signatures work with workers. ([\#6254](https://github.com/matrix-org/synapse/issues/6254))
- Fix exception when remote servers attempt to join a room that they're not allowed to join. ([\#6278](https://github.com/matrix-org/synapse/issues/6278))
- Prevent errors from appearing on Synapse startup if `git` is not installed. ([\#6284](https://github.com/matrix-org/synapse/issues/6284))
- Appservice requests will no longer contain a double slash prefix when the appservice url provided ends in a slash. ([\#6306](https://github.com/matrix-org/synapse/issues/6306))
- Fix `/purge_room` admin API. ([\#6307](https://github.com/matrix-org/synapse/issues/6307))
- Fix the `hidden` field in the `devices` table for SQLite versions prior to 3.23.0. ([\#6313](https://github.com/matrix-org/synapse/issues/6313))
- Fix bug which caused rejected events to be persisted with the wrong room state. ([\#6320](https://github.com/matrix-org/synapse/issues/6320))
- Fix bug where `rc_login` ratelimiting would prematurely kick in. ([\#6335](https://github.com/matrix-org/synapse/issues/6335))
- Prevent the server taking a long time to start up when guest registration is enabled. ([\#6338](https://github.com/matrix-org/synapse/issues/6338))
- Fix bug where upgrading a guest account to a full user would fail when account validity is enabled. ([\#6359](https://github.com/matrix-org/synapse/issues/6359))
- Fix `to_device` stream ID getting reset every time Synapse restarts, which had the potential to cause unable to decrypt errors. ([\#6363](https://github.com/matrix-org/synapse/issues/6363))
- Fix permission denied error when trying to generate a config file with the docker image. ([\#6389](https://github.com/matrix-org/synapse/issues/6389))

### Improved Documentation

- Contributor documentation now mentions script to run linters. ([\#6164](https://github.com/matrix-org/synapse/issues/6164))
- Modify CAPTCHA_SETUP.md to update the terms `private key` and `public key` to `secret key` and `site key` respectively. Contributed by Yash Jipkate. ([\#6257](https://github.com/matrix-org/synapse/issues/6257))
- Update `INSTALL.md` Email section to talk about `account_threepid_delegates`. ([\#6272](https://github.com/matrix-org/synapse/issues/6272))
- Fix a small typo in `account_threepid_delegates` configuration option. ([\#6273](https://github.com/matrix-org/synapse/issues/6273))

### Internal Changes

- Add a CI job to test the `synapse_port_db` script. ([\#6140](https://github.com/matrix-org/synapse/issues/6140), [\#6276](https://github.com/matrix-org/synapse/issues/6276))
- Convert EventContext to an attrs. ([\#6218](https://github.com/matrix-org/synapse/issues/6218))
- Move `persist_events` out from main data store. ([\#6240](https://github.com/matrix-org/synapse/issues/6240), [\#6300](https://github.com/matrix-org/synapse/issues/6300))
- Reduce verbosity of user/room stats. ([\#6250](https://github.com/matrix-org/synapse/issues/6250))
- Reduce impact of debug logging. ([\#6251](https://github.com/matrix-org/synapse/issues/6251))
- Expose some homeserver functionality to spam checkers. ([\#6259](https://github.com/matrix-org/synapse/issues/6259))
- Change cache descriptors to always return deferreds. ([\#6263](https://github.com/matrix-org/synapse/issues/6263), [\#6291](https://github.com/matrix-org/synapse/issues/6291))
- Fix incorrect comment regarding the functionality of an `if` statement. ([\#6269](https://github.com/matrix-org/synapse/issues/6269))
- Update CI to run `isort` over the `scripts` and `scripts-dev` directories. ([\#6270](https://github.com/matrix-org/synapse/issues/6270))
- Replace every instance of `logger.warn` method with `logger.warning` as the former is deprecated. ([\#6271](https://github.com/matrix-org/synapse/issues/6271), [\#6314](https://github.com/matrix-org/synapse/issues/6314))
- Port replication http server endpoints to async/await. ([\#6274](https://github.com/matrix-org/synapse/issues/6274))
- Port room rest handlers to async/await. ([\#6275](https://github.com/matrix-org/synapse/issues/6275))
- Remove redundant CLI parameters on CI's `flake8` step. ([\#6277](https://github.com/matrix-org/synapse/issues/6277))
- Port `federation_server.py` to async/await. ([\#6279](https://github.com/matrix-org/synapse/issues/6279))
- Port receipt and read markers to async/wait. ([\#6280](https://github.com/matrix-org/synapse/issues/6280))
- Split out state storage into separate data store. ([\#6294](https://github.com/matrix-org/synapse/issues/6294), [\#6295](https://github.com/matrix-org/synapse/issues/6295))
- Refactor EventContext for clarity. ([\#6298](https://github.com/matrix-org/synapse/issues/6298))
- Update the version of black used to 19.10b0. ([\#6304](https://github.com/matrix-org/synapse/issues/6304))
- Add some documentation about worker replication. ([\#6305](https://github.com/matrix-org/synapse/issues/6305))
- Move admin endpoints into separate files. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#6308](https://github.com/matrix-org/synapse/issues/6308))
- Document the use of `lint.sh` for code style enforcement & extend it to run on specified paths only. ([\#6312](https://github.com/matrix-org/synapse/issues/6312))
- Add optional python dependencies and dependant binary libraries to snapcraft packaging. ([\#6317](https://github.com/matrix-org/synapse/issues/6317))
- Remove the dependency on psutil and replace functionality with the stdlib `resource` module. ([\#6318](https://github.com/matrix-org/synapse/issues/6318), [\#6336](https://github.com/matrix-org/synapse/issues/6336))
- Improve documentation for EventContext fields. ([\#6319](https://github.com/matrix-org/synapse/issues/6319))
- Add some checks that we aren't using state from rejected events. ([\#6330](https://github.com/matrix-org/synapse/issues/6330))
- Add continuous integration for python 3.8. ([\#6341](https://github.com/matrix-org/synapse/issues/6341))
- Correct spacing/case of various instances of the word "homeserver". ([\#6357](https://github.com/matrix-org/synapse/issues/6357))
- Temporarily blacklist the failing unit test PurgeRoomTestCase.test_purge_room. ([\#6361](https://github.com/matrix-org/synapse/issues/6361))
