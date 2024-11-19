+++
title = "Synapse 1.20.0 released"
date = "2020-09-22T19:30:01Z"
path = "/blog/2020/09/22/synapse-1-20-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.20.0 is here!

Highlights of 1.20.0 include:-

* Shadow ban support.
* Unread message counts in the sync response to help our client developers, this is a precursor to improving notification support.
* No less than 28 async/await PRs, so we can finally share all the hard work.

Also take note that in a future release, we will be dropping support for accessing Synapse's Admin API using the ```/_matrix/client/* prefixes```. More details follow in the changelog.

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.20.0 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.20.0), and 1.20.0rc4 is [here](https://github.com/matrix-org/synapse/releases/tag/v1.20.0rc4).

The changelog for 1.20.0 is as follows:

## Synapse 1.20.0 (2020-09-22)

No significant changes since v1.20.0rc5.

### Removal warning

Historically, the [Synapse Admin API](https://github.com/matrix-org/synapse/tree/master/docs) has been accessible under the `/_matrix/client/api/v1/admin`, `/_matrix/client/unstable/admin`, `/_matrix/client/r0/admin` and `/_synapse/admin` prefixes. In a future release, we will be dropping support for accessing Synapse's Admin API using the `/_matrix/client/*` prefixes. This makes it easier for homeserver admins to lock down external access to the Admin API endpoints.

## Synapse 1.20.0rc5 (2020-09-18)

In addition to the below, Synapse 1.20.0rc5 also includes the bug fix that was included in 1.19.3.

### Features

* Add flags to the `/versions` endpoint for whether new rooms default to using E2EE. ([\#8343](https://github.com/matrix-org/synapse/issues/8343))

### Bugfixes

* Fix rate limiting of federation `/send` requests. ([\#8342](https://github.com/matrix-org/synapse/issues/8342))
* Fix a longstanding bug where back pagination over federation could get stuck if it failed to handle a received event. ([\#8349](https://github.com/matrix-org/synapse/issues/8349))

### Internal Changes

* Blacklist [MSC2753](https://github.com/matrix-org/matrix-doc/pull/2753) SyTests until it is implemented. ([\#8285](https://github.com/matrix-org/synapse/issues/8285))

## Synapse 1.20.0rc4 (2020-09-16)

Synapse 1.20.0rc4 is identical to 1.20.0rc3, with the addition of the security fix that was included in 1.19.2.

## Synapse 1.20.0rc3 (2020-09-11)

### Bugfixes

* Fix a bug introduced in v1.20.0rc1 where the wrong exception was raised when invalid JSON data is encountered. ([\#8291](https://github.com/matrix-org/synapse/issues/8291))

## Synapse 1.20.0rc2 (2020-09-09)

### Bugfixes

* Fix a bug introduced in v1.20.0rc1 causing some features related to notifications to misbehave following the implementation of unread counts. ([\#8280](https://github.com/matrix-org/synapse/issues/8280))

## Synapse 1.20.0rc1 (2020-09-08)

### Removal warning

Some older clients used a [disallowed character](https://matrix.org/docs/spec/client_server/r0.6.1#post-matrix-client-r0-register-email-requesttoken) (`:`) in the `client_secret` parameter of various endpoints. The incorrect behaviour was allowed for backwards compatibility, but is now being removed from Synapse as most users have updated their client. Further context can be found at [\#6766](https://github.com/matrix-org/synapse/issues/6766).

### Features

* Add an endpoint to query your shared rooms with another user as an implementation of [MSC2666](https://github.com/matrix-org/matrix-doc/pull/2666). ([\#7785](https://github.com/matrix-org/synapse/issues/7785))
* Iteratively encode JSON to avoid blocking the reactor. ([\#8013](https://github.com/matrix-org/synapse/issues/8013), [\#8116](https://github.com/matrix-org/synapse/issues/8116))
* Add support for shadow-banning users (ignoring any message send requests). ([\#8034](https://github.com/matrix-org/synapse/issues/8034), [\#8092](https://github.com/matrix-org/synapse/issues/8092), [\#8095](https://github.com/matrix-org/synapse/issues/8095), [\#8142](https://github.com/matrix-org/synapse/issues/8142), [\#8152](https://github.com/matrix-org/synapse/issues/8152), [\#8157](https://github.com/matrix-org/synapse/issues/8157), [\#8158](https://github.com/matrix-org/synapse/issues/8158), [\#8176](https://github.com/matrix-org/synapse/issues/8176))
* Use the default template file when its equivalent is not found in a custom template directory. ([\#8037](https://github.com/matrix-org/synapse/issues/8037), [\#8107](https://github.com/matrix-org/synapse/issues/8107), [\#8252](https://github.com/matrix-org/synapse/issues/8252))
* Add unread messages count to sync responses, as specified in [MSC2654](https://github.com/matrix-org/matrix-doc/pull/2654). ([\#8059](https://github.com/matrix-org/synapse/issues/8059), [\#8254](https://github.com/matrix-org/synapse/issues/8254), [\#8270](https://github.com/matrix-org/synapse/issues/8270), [\#8274](https://github.com/matrix-org/synapse/issues/8274))
* Optimise `/federation/v1/user/devices/` API by only returning devices with encryption keys. ([\#8198](https://github.com/matrix-org/synapse/issues/8198))

### Bugfixes

* Fix a memory leak by limiting the length of time that messages will be queued for a remote server that has been unreachable. ([\#7864](https://github.com/matrix-org/synapse/issues/7864))
* Fix `Re-starting finished log context PUT-nnnn` warning when event persistence failed. ([\#8081](https://github.com/matrix-org/synapse/issues/8081))
* Synapse now correctly enforces the valid characters in the `client_secret` parameter used in various endpoints. ([\#8101](https://github.com/matrix-org/synapse/issues/8101))
* Fix a bug introduced in v1.7.2 impacting message retention policies that would allow federated homeservers to dictate a retention period that's lower than the configured minimum allowed duration in the configuration file. ([\#8104](https://github.com/matrix-org/synapse/issues/8104))
* Fix a long-standing bug where invalid JSON would be accepted by Synapse. ([\#8106](https://github.com/matrix-org/synapse/issues/8106))
* Fix a bug introduced in Synapse v1.12.0 which could cause `/sync` requests to fail with a 404 if you had a very old outstanding room invite. ([\#8110](https://github.com/matrix-org/synapse/issues/8110))
* Return a proper error code when the rooms of an invalid group are requested. ([\#8129](https://github.com/matrix-org/synapse/issues/8129))
* Fix a bug which could cause a leaked postgres connection if synapse was set to daemonize. ([\#8131](https://github.com/matrix-org/synapse/issues/8131))
* Clarify the error code if a user tries to register with a numeric ID. This bug was introduced in v1.15.0. ([\#8135](https://github.com/matrix-org/synapse/issues/8135))
* Fix a bug where appservices with ratelimiting disabled would still be ratelimited when joining rooms. This bug was introduced in v1.19.0. ([\#8139](https://github.com/matrix-org/synapse/issues/8139))
* Fix logging in via OpenID Connect with a provider that uses integer user IDs. ([\#8190](https://github.com/matrix-org/synapse/issues/8190))
* Fix a longstanding bug where user directory updates could break when unexpected profile data was included in events. ([\#8223](https://github.com/matrix-org/synapse/issues/8223))
* Fix a longstanding bug where stats updates could break when unexpected profile data was included in events. ([\#8226](https://github.com/matrix-org/synapse/issues/8226))
* Fix slow start times for large servers by removing a table scan of the `users` table from startup code. ([\#8271](https://github.com/matrix-org/synapse/issues/8271))

### Updates to the Docker image

* Fix builds of the Docker image on non-x86 platforms. ([\#8144](https://github.com/matrix-org/synapse/issues/8144))
* Added curl for healthcheck support and readme updates for the change. Contributed by @maquis196. ([\#8147](https://github.com/matrix-org/synapse/issues/8147))

### Improved Documentation

* Link to matrix-synapse-rest-password-provider in the password provider documentation. ([\#8111](https://github.com/matrix-org/synapse/issues/8111))
* Updated documentation to note that Synapse does not follow `HTTP 308` redirects due to an upstream library not supporting them. Contributed by Ryan Cole. ([\#8120](https://github.com/matrix-org/synapse/issues/8120))
* Explain better what GDPR-erased means when deactivating a user. ([\#8189](https://github.com/matrix-org/synapse/issues/8189))

### Internal Changes

* Add filter `name` to the `/users` admin API, which filters by user ID or displayname. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#7377](https://github.com/matrix-org/synapse/issues/7377), [\#8163](https://github.com/matrix-org/synapse/issues/8163))
* Reduce run times of some unit tests by advancing the reactor a fewer number of times. ([\#7757](https://github.com/matrix-org/synapse/issues/7757))
* Don't fail `/submit_token` requests on incorrect session ID if `request_token_inhibit_3pid_errors` is turned on. ([\#7991](https://github.com/matrix-org/synapse/issues/7991))
* Convert various parts of the codebase to async/await. ([\#8071](https://github.com/matrix-org/synapse/issues/8071), [\#8072](https://github.com/matrix-org/synapse/issues/8072), [\#8074](https://github.com/matrix-org/synapse/issues/8074), [\#8075](https://github.com/matrix-org/synapse/issues/8075), [\#8076](https://github.com/matrix-org/synapse/issues/8076), [\#8087](https://github.com/matrix-org/synapse/issues/8087), [\#8100](https://github.com/matrix-org/synapse/issues/8100), [\#8119](https://github.com/matrix-org/synapse/issues/8119), [\#8121](https://github.com/matrix-org/synapse/issues/8121), [\#8133](https://github.com/matrix-org/synapse/issues/8133), [\#8156](https://github.com/matrix-org/synapse/issues/8156), [\#8162](https://github.com/matrix-org/synapse/issues/8162), [\#8166](https://github.com/matrix-org/synapse/issues/8166), [\#8168](https://github.com/matrix-org/synapse/issues/8168), [\#8173](https://github.com/matrix-org/synapse/issues/8173), [\#8191](https://github.com/matrix-org/synapse/issues/8191), [\#8192](https://github.com/matrix-org/synapse/issues/8192), [\#8193](https://github.com/matrix-org/synapse/issues/8193), [\#8194](https://github.com/matrix-org/synapse/issues/8194), [\#8195](https://github.com/matrix-org/synapse/issues/8195), [\#8197](https://github.com/matrix-org/synapse/issues/8197), [\#8199](https://github.com/matrix-org/synapse/issues/8199), [\#8200](https://github.com/matrix-org/synapse/issues/8200), [\#8201](https://github.com/matrix-org/synapse/issues/8201), [\#8202](https://github.com/matrix-org/synapse/issues/8202), [\#8207](https://github.com/matrix-org/synapse/issues/8207), [\#8213](https://github.com/matrix-org/synapse/issues/8213), [\#8214](https://github.com/matrix-org/synapse/issues/8214))
* Remove some unused database functions. ([\#8085](https://github.com/matrix-org/synapse/issues/8085))
* Add type hints to various parts of the codebase. ([\#8090](https://github.com/matrix-org/synapse/issues/8090), [\#8127](https://github.com/matrix-org/synapse/issues/8127), [\#8187](https://github.com/matrix-org/synapse/issues/8187), [\#8241](https://github.com/matrix-org/synapse/issues/8241), [\#8140](https://github.com/matrix-org/synapse/issues/8140), [\#8183](https://github.com/matrix-org/synapse/issues/8183), [\#8232](https://github.com/matrix-org/synapse/issues/8232), [\#8235](https://github.com/matrix-org/synapse/issues/8235), [\#8237](https://github.com/matrix-org/synapse/issues/8237), [\#8244](https://github.com/matrix-org/synapse/issues/8244))
* Return the previous stream token if a non-member event is a duplicate. ([\#8093](https://github.com/matrix-org/synapse/issues/8093), [\#8112](https://github.com/matrix-org/synapse/issues/8112))
* Separate `get_current_token` into two since there are two different use cases for it. ([\#8113](https://github.com/matrix-org/synapse/issues/8113))
* Remove `ChainedIdGenerator`. ([\#8123](https://github.com/matrix-org/synapse/issues/8123))
* Reduce the amount of whitespace in JSON stored and sent in responses. ([\#8124](https://github.com/matrix-org/synapse/issues/8124))
* Update the test federation client to handle streaming responses. ([\#8130](https://github.com/matrix-org/synapse/issues/8130))
* Micro-optimisations to `get_auth_chain_ids`. ([\#8132](https://github.com/matrix-org/synapse/issues/8132))
* Refactor `StreamIdGenerator` and `MultiWriterIdGenerator` to have the same interface. ([\#8161](https://github.com/matrix-org/synapse/issues/8161))
* Add functions to `MultiWriterIdGen` used by events stream. ([\#8164](https://github.com/matrix-org/synapse/issues/8164), [\#8179](https://github.com/matrix-org/synapse/issues/8179))
* Fix tests that were broken due to the merge of 1.19.1. ([\#8167](https://github.com/matrix-org/synapse/issues/8167))
* Make `SlavedIdTracker.advance` have the same interface as `MultiWriterIDGenerator`. ([\#8171](https://github.com/matrix-org/synapse/issues/8171))
* Remove unused `is_guest` parameter from, and add safeguard to, `MessageHandler.get_room_data`. ([\#8174](https://github.com/matrix-org/synapse/issues/8174), [\#8181](https://github.com/matrix-org/synapse/issues/8181))
* Standardize the mypy configuration. ([\#8175](https://github.com/matrix-org/synapse/issues/8175))
* Refactor some of `LoginRestServlet`'s helper methods, and move them to `AuthHandler` for easier reuse. ([\#8182](https://github.com/matrix-org/synapse/issues/8182))
* Fix `wait_for_stream_position` to allow multiple waiters on same stream ID. ([\#8196](https://github.com/matrix-org/synapse/issues/8196))
* Make `MultiWriterIDGenerator` work for streams that use negative values. ([\#8203](https://github.com/matrix-org/synapse/issues/8203))
* Refactor queries for device keys and cross-signatures. ([\#8204](https://github.com/matrix-org/synapse/issues/8204), [\#8205](https://github.com/matrix-org/synapse/issues/8205), [\#8222](https://github.com/matrix-org/synapse/issues/8222), [\#8224](https://github.com/matrix-org/synapse/issues/8224), [\#8225](https://github.com/matrix-org/synapse/issues/8225), [\#8231](https://github.com/matrix-org/synapse/issues/8231), [\#8233](https://github.com/matrix-org/synapse/issues/8233), [\#8234](https://github.com/matrix-org/synapse/issues/8234))
* Fix type hints for functions decorated with `@cached`. ([\#8240](https://github.com/matrix-org/synapse/issues/8240))
* Remove obsolete `order` field from federation send queues. ([\#8245](https://github.com/matrix-org/synapse/issues/8245))
* Stop sub-classing from object. ([\#8249](https://github.com/matrix-org/synapse/issues/8249))
* Add more logging to debug slow startup. ([\#8264](https://github.com/matrix-org/synapse/issues/8264))
* Do not attempt to upgrade database schema on worker processes. ([\#8266](https://github.com/matrix-org/synapse/issues/8266), [\#8276](https://github.com/matrix-org/synapse/issues/8276))
