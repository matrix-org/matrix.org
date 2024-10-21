+++
title = "Synapse 1.45.1 released"
path = "/blog/2021/10/20/synapse-1-45-1-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.45.1 is out now! Python 3.10 and PostgreSQL 14 are now tested and supported by Synapse. Support for Python 3.6 and PostgreSQL 9.6 will be removed by the end of the year.

> **Note:** This release may require changes to how media storage providers access your homeserver's configuration. See the [Upgrade Notes](https://matrix-org.github.io/synapse/v1.45/upgrade.html#upgrading-to-v1450) for more information.
>
> **Note:** Synapse 1.45.0 was released yesterday and [changed](https://github.com/matrix-org/synapse/pull/10947) how Synapse's monthly active user limits were calculated. Today's release of 1.45.1 [reverts](https://github.com/matrix-org/synapse/pull/11127) that change, but is otherwise identical to 1.45.0.

## Support for oEmbed Autodiscovery

Synapse can now automatically discover rich metadata when generating previews of links to sites which support [oEmbed](https://oembed.com).

Before:

![synapse-1.44-link-preview](/blog/img/2021-10-20-synapse-1.44-link-preview.png)

After:

![synapse-1.45-link-preview](/blog/img/2021-10-20-synapse-1.45-link-preview.png)

Note that URL previews are generated server-side, and thus generally disabled in encrypted rooms to avoid leaking information about message content to your homeserver. You may need to adjust the room's settings to see the new oEmbed previews.

## Fixing Stuck Messages

This release of Synapse [fixes a race condition](https://github.com/matrix-org/synapse/issues/9424) which would occasionally prevent your sent events from syncing back down to all of your clients. This caused messages to look like they were stuck at the bottom of the room, waiting to finish sending, even though other users would receive and see them normally.

## Improved Privacy for Per-Room Nicknames

Matrix allows users to set their display names to be different things in different rooms. For example, you might use an alias in public rooms, but your real name in rooms shared with friends and family.

To make it easy to initiate conversations with people, each homeserver maintains a user directory with the Matrix ID, display name, and avatar of the users it sees. Previously, this directory would be updated with the most recent profile metadata that Synapse had seen for a user, even if it was only changed in a single room.

As of 1.45, Synapse only uses includes the *default* display name of local users in its user directory, ignoring room-specific nicknames or avatars. ([#5677](https://github.com/matrix-org/synapse/issues/5677)).

## Internals

This release includes numerous fixes and improvements to Synapse's internals.

- We've added countless static type annotations to Synapse (and related projects like Sydent), giving us greater confidence in its correctness and reducing maintenance costs. Several modules newly have *all* of their definitions typed, allowing us to require and enforce complete type coverage for all future edits therein.
- This release includes meaningful fixes and improvements to our OpenTracing and logging machinery, helping us better catch and eliminate bugs in Synapse. This work ultimately reduced matrix.org's Sentry event volume by an order of magnitude.

- Magic accessor methods have been removed from Synapse's `Config` class. Previously, Synapse would interpret references like `config.send_federation` by attempting to guess a reasonable full path, like `config.worker.send_federation`. As of Synapse 1.45, the full path must be specified directly. This prevents errors where values could be drawn from unexpected or incorrect sections of the server's configuration.

## Everything Else

We'd like to extend a special thanks to Fizzadar from [Beeper](https://www.beeper.com/) for improving Synapse's `update_synapse_database` script ([#10954](https://github.com/matrix-org/synapse/pull/10954)) to allow schema changes to occur while Synapse is running. This is a great step toward reducing the downtime associated with upgrades.

These are just the highlights; please see the [Upgrade Notes](https://matrix-org.github.io/synapse/v1.45/upgrade.html#upgrading-to-v1450) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.45.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [AndrewFerr](https://github.com/AndrewFerr), [dklimpel](https://github.com/dklimpel), [Fizzadar](https://github.com/Fizzadar), [lukaslihotzki](https://github.com/lukaslihotzki), and [maxkratz](https://github.com/maxkratz).
