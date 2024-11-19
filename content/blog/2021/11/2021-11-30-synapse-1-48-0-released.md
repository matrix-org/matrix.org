+++
title = "Synapse 1.48.0 released"
path = "/blog/2021/11/30/synapse-1-48-0-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

[Synapse 1.48.0](https://github.com/matrix-org/synapse/releases/tag/v1.48.0) is out now!

> __NOTE:__ Synapse 1.49, due out on December 14th, will be the __last release of Synapse to support Python 3.6 or PostgreSQL 9.6__ per our [platform dependency deprecation policy](https://matrix-org.github.io/synapse/v1.48/deprecation_policy.html). Accordingly, we will remove support for Ubuntu 18.04 LTS (Bionic) at the same date, as it ships with Python 3.6.

## Password resets and identity servers

This release removes the long-deprecated `trust_identity_server_for_password_resets` configuration option. This option was initially deprecated in [Synapse 1.4.0](https://github.com/matrix-org/synapse/releases/tag/v1.4.0) back in October 2019.

Admins of servers still using this configuration option will need to update their Synapse configuration to send password resets through an SMTP server directly rather than relying on identity servers to send them on their behalf.

## New [admin APIs](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/index.html) and improved alignment with Matrix 1.1

This release also introduces a handful of new admin APIs, allowing administrators to [un-shadow-ban users](https://matrix-org.github.io/synapse/latest/admin_api/user_admin_api.html#controlling-whether-a-user-is-shadow-banned), [block a room](https://matrix-org.github.io/synapse/latest/admin_api/rooms.html#block-room-api), and [run specific background updates](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/background_updates.html#run) (but we'll talk about this last one a bit later on). The [delete room API](https://matrix-org.github.io/synapse/latest/admin_api/rooms.html#delete-room-api) has also been updated to be able to run in the background or to block a room pre-emptively, even if the server doesn't know about it yet.

This release also brings Synapse into greater alignment with version 1.1 of [the Matrix specification](https://matrix.org/blog/2021/11/09/matrix-v-1-1-release) by adding support for API paths beginning `/_matrix/client/v3` and `/_matrix/media/v3`.

## Background updates

When Synapse updates from one version to another, it might need to run large scale updates on its database. In order to avoid blocking startup for too long while waiting for these updates to run, Synapse runs them in the background after starting.

Lately the Synapse team has been doing some work to improve the performance of these background updates. More specifically, this release includes a [performance fix](https://github.com/matrix-org/synapse/pull/11421) for a background update introduced in Synapse 1.47.0, as well as a [new admin API](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/background_updates.html#run) to let admins rerun specific updates.

Future Synapse updates will also include [module capabilities](https://github.com/matrix-org/synapse/pull/11306) and [more configuration options](https://github.com/matrix-org/synapse/issues/11260) for controlling background updates.

## Everything else

This release also includes some improved support of [MSC3440](https://github.com/matrix-org/matrix-doc/pull/3440) to help threading. It also adds support for the stable identifiers from [MSC2778](https://github.com/matrix-org/matrix-doc/pull/2778), bringing Synapse closer to supporting end-to-end (or end-to-bridge) encryption support for application services.

We also now publish a Docker image, `matrixdotorg/synapse:develop`, which tracks the development head of Synapse.

Please see the Synapse [Release Notes](https://github.com/matrix-org/synapse/blob/v1.48.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [Dirk Klimpel](https://github.com/dklimpel), [Stanislav Motylkov](https://github.com/binarymaster), [Tulir Asokan](https://github.com/tulir) and [Neeeflix](https://github.com/Neeeflix).
