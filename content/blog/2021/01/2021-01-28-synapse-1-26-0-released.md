+++
title = "Synapse 1.26.0 released"
path = "/blog/2021/01/28/synapse-1-26-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

[Synapse 1.26.0](https://github.com/matrix-org/synapse/releases/tag/v1.26.0) is now available!

> __Note:__ This release includes a new database schema version. If you need to roll back to Synapse 1.25.0, you will also need to follow the associated [database downgrade instructions](https://github.com/matrix-org/synapse/blob/v1.26.0/UPGRADE.rst#upgrading-to-v1260).

In addition to a truckload of refactoring and general improvements, Synapse 1.26.0 includes three major new features:

1. A [brand new algorithm](https://github.com/matrix-org/synapse/blob/v1.26.0/docs/auth_chain_difference_algorithm.md) for calculating the auth chain difference, which should dramatically improve worst case performance during state resolution ([#8622](https://github.com/matrix-org/synapse/issues/8622)).
2. Initial support for enabling [multiple OpenID Connect providers](https://github.com/matrix-org/synapse/pull/9110), paving the way for proper multi-provider social login workflows.
3. A significant speed-up to redaction performance in large rooms.

It also brings several improvements to Admin APIs:

- Specific media items can be [protected from quarantine](https://github.com/matrix-org/synapse/blob/v1.26.0/docs/admin_api/media_admin_api.md#protecting-media-from-being-quarantined).
- The `joined_rooms` API now [works for remote users](https://github.com/matrix-org/synapse/blob/v1.26.0/docs/admin_api/user_admin_api.rst#list-room-memberships-of-an-user).
- Deactivating a user can now [optionally remove their avatar URL and display name](https://github.com/matrix-org/synapse/blob/v1.26.0/docs/admin_api/user_admin_api.rst#deactivate-account).

We've also made it possible to offload several additional APIs to worker processes, including read receipts and account data persistence, further improving Synapse's scalability.

See the [full changelog](https://github.com/matrix-org/synapse/blob/v1.26.0/CHANGES.md) for more.

Lastly, a reminder: we have __deprecated Python 3.5 and PostgreSQL 9.5__ and will cease support at the end of March. Due to deprecations in our Python tooling, we were unable to produce a binary package for Ubuntu 16.04 LTS (Xenial) in time for this release. We have resolved this for 1.27.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [0xflotus](https://github.com/0xflotus), [chris-ruecker](https://github.com/chris-ruecker), [dklimpel](https://github.com/dklimpel), [emelie-qis](https://github.com/emelie-qis), [jerinjtitus](https://github.com/jerinjtitus), and [tzyl](https://github.com/tzyl).
