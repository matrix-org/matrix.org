+++
title = "Synapse 0.99.5.1 released!"
path = "/blog/2019/05/21/synapse-0-99-5-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Okay folks, this is an important one. v0.99.5.1 will be the last release before we ship Synapse v1.0. __It is really important that you upgrade to v0.99.5.1 because it implements rooms [version 4](https://github.com/matrix-org/matrix-doc/blob/matthew/room_v4/proposals/2002-rooms-v4.md) - which is the room version that Synapse 1.0 will default to.__

This means that Synapse 1.0 servers will create new rooms as version 4 by default and servers that have not upgraded to at least v0.99.5.1 will not be able to join those rooms.

Over the coming days we will announce a release day for Synapse v1.0, the idea is to give admins 2 weeks notice so that anyone yet to configure their federation SSL certificate has time to do so. __This is important, failure to configure your certs will mean not being able to federate with v1.0 servers.__ If you are not sure if you certs are valid, you can test [here](https://federationtester.matrix.org/) and read [here](https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md) for more info on what to do.

Aside from room v4, this release also includes the ability to blacklist specific IPs from federating as well as experimental support for edits and reactions. We are not quite ready to mark the feature 'done done', but it is very close. Watch out for news as the feature lands properly.

We're really close to v1.0 now, give us a few more days and we'll announce an official release date.

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v0.99.5.1) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Note, Synapse is now available from PyPI, pick it up [here](https://pypi.org/project/matrix-synapse/). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

## Synapse v0.99.5.1 Changelog (since v0.99.4)

### Features

- Add ability to blacklist IP ranges for the federation client. ([\#5043](https://github.com/matrix-org/synapse/issues/5043))
- Ratelimiting configuration for clients sending messages and the federation server has been altered to match login ratelimiting. The old configuration names will continue working. Check the sample config for details of the new names. ([\#5181](https://github.com/matrix-org/synapse/issues/5181))
- Drop support for the undocumented /_matrix/client/v2_alpha API prefix. ([\#5190](https://github.com/matrix-org/synapse/issues/5190))
- Add an option to disable per-room profiles. ([\#5196](https://github.com/matrix-org/synapse/issues/5196))
- Stick an expiration date to any registered user missing one at startup if account validity is enabled. ([\#5204](https://github.com/matrix-org/synapse/issues/5204))
- Add experimental support for relations (aka reactions and edits). ([\#5209](https://github.com/matrix-org/synapse/issues/5209), [\#5211](https://github.com/matrix-org/synapse/issues/5211), [\#5203](https://github.com/matrix-org/synapse/issues/5203), [\#5212](https://github.com/matrix-org/synapse/issues/5212))
- Add a room version 4 which uses a new event ID format, as per [MSC2002](https://github.com/matrix-org/matrix-doc/pull/2002). ([\#5210](https://github.com/matrix-org/synapse/issues/5210), [\#5217](https://github.com/matrix-org/synapse/issues/5217))

### Bugfixes

- Fix image orientation when generating thumbnails (needs pillow>=4.3.0). Contributed by Pau Rodriguez-Estivill. ([\#5039](https://github.com/matrix-org/synapse/issues/5039))
- Exclude soft-failed events from forward-extremity candidates: fixes "No forward extremities left!" error. ([\#5146](https://github.com/matrix-org/synapse/issues/5146))
- Re-order stages in registration flows such that msisdn and email verification are done last. ([\#5174](https://github.com/matrix-org/synapse/issues/5174))
- Fix 3pid guest invites. ([\#5177](https://github.com/matrix-org/synapse/issues/5177))
- Fix a bug where the register endpoint would fail with M_THREEPID_IN_USE instead of returning an account previously registered in the same session. ([\#5187](https://github.com/matrix-org/synapse/issues/5187))
- Prevent registration for user ids that are too long to fit into a state key. Contributed by Reid Anderson. ([\#5198](https://github.com/matrix-org/synapse/issues/5198))
- Fix incompatibility between ACME support and Python 3.5.2. ([\#5218](https://github.com/matrix-org/synapse/issues/5218))
- Fix error handling for rooms whose versions are unknown. ([\#5219](https://github.com/matrix-org/synapse/issues/5219))

### Internal Changes

- Make /sync attempt to return device updates for both joined and invited users. Note that this doesn't currently work correctly due to other bugs. ([\#3484](https://github.com/matrix-org/synapse/issues/3484))
- Update tests to consistently be configured via the same code that is used when loading from configuration files. ([\#5171](https://github.com/matrix-org/synapse/issues/5171), [\#5185](https://github.com/matrix-org/synapse/issues/5185))
- Allow client event serialization to be async. ([\#5183](https://github.com/matrix-org/synapse/issues/5183))
- Expose DataStore._get_events as get_events_as_list. ([\#5184](https://github.com/matrix-org/synapse/issues/5184))
- Make generating SQL bounds for pagination generic. ([\#5191](https://github.com/matrix-org/synapse/issues/5191))
- Stop telling people to install the optional dependencies by default. ([\#5197](https://github.com/matrix-org/synapse/issues/5197))
