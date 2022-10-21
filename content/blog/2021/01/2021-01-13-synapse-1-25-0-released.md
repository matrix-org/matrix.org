+++
title = "Synapse 1.25.0 released"
path = "/blog/2021/01/13/synapse-1-25-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

[Synapse 1.25.0](https://github.com/matrix-org/synapse/releases/tag/v1.25.0) is now available! With this release, we are __deprecating Python 3.5 and PostgreSQL 9.5__ and will cease producing binary packages for Debian 9 (Stretch) and Ubuntu 16.04 (Xenial) after a transition period which lasts through March 2021. See [the changelog](https://github.com/matrix-org/synapse/blob/v1.25.0/CHANGES.md) for further details.

We are also deprecating the [Purge Room](https://github.com/matrix-org/synapse/tree/master/docs/admin_api/purge_room.md) and [Shutdown Room](https://github.com/matrix-org/synapse/tree/master/docs/admin_api/shutdown_room.md) Admin APIs and will remove them in a future release. Please update your code to use the [Delete Room](https://github.com/matrix-org/synapse/tree/master/docs/admin_api/rooms.md#delete-room-api) Admin API instead.

Synapse 1.25.0 brings over a month's worth of improvements, including:

- The ability for users to pick their own username when using Single Sign-On, right from within Synapse.
- Support for `async` Python methods in custom spam checker modules.
- New ways to [restrict allowed IP address ranges](https://github.com/matrix-org/synapse/blob/v1.25.0/UPGRADE.rst#upgrading-to-v1250) for outgoing requests from Synapse.
- Significantly faster v2 state resolution on rooms with large numbers of power level events, which are common in some types of bridged IRC rooms.

See the [full changelog](https://github.com/matrix-org/synapse/blob/v1.25.0/CHANGES.md) and [upgrade notes](https://github.com/matrix-org/synapse/blob/v1.25.0/UPGRADE.rst#upgrading-to-v1250) for more.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [@aaronraimist](https://github.com/aaronraimist), [@Bubu](https://github.com/Bubu), [@dklimpel](https://github.com/dklimpel), [@edwargix](https://github.com/edwargix), [@fossterer](https://github.com/fossterer), [@jdreichmann](https://github.com/jdreichmann), [@jerinjtitus](https://github.com/jerinjtitus), and [@MadLittleMods](https://github.com/MadLittleMods).
