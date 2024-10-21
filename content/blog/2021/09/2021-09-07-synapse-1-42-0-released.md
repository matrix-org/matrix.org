+++
title = "Synapse 1.42.0 released"
path = "/blog/2021/09/07/synapse-1-42-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.42.0 is out now!

This release includes changes that you may need to be aware of before upgrading, such as the removal of two deprecated Admin APIs or a retroactive fix to ensure that email notifications are only sent to addresses which are presently associated with an account. Please see the  [Upgrade Notes](https://matrix-org.github.io/synapse/v1.42/upgrade.html#upgrading-to-v1420) for details.

## Room Version 9: A Bugfix for Restricted Rooms

Synapse 1.42 includes support for [Room Version 9](https://github.com/matrix-org/matrix-doc/pull/3375), which fixes [an oversight](https://github.com/matrix-org/matrix-doc/issues/3373) in the list of event fields which were protected from redaction in Room Version 8's [restricted rooms](https://github.com/matrix-org/matrix-doc/pull/3083). This makes it possible, in certain circumstances, for a restricted room to degrade into a state where participating servers will disagree about the room's membership.

Because changing a room version's redaction algorithm also changes the way that event IDs are calculated, properly fixing this issue required the creation of a new room version.

To ensure compatibility with existing servers, Synapse 1.42's [MSC3244: Room version capabilities](https://github.com/matrix-org/matrix-doc/pull/3244) hints will continue to ask clients to prefer Room Version 8 when creating restricted rooms and Room Version 6 otherwise. A future release of Synapse will ask clients to prefer Room Version 9 for restricted rooms.

## Handling Unknown Rooms

Very rarely, users find themselves in rooms created with unstable or experimental room versions. Then, when Synapse removes support for these versions, bad things happen. The server no longer understands how to interact with that room version, which means *you* can't interact with that room. And if you can't interact with that room, you can't *leave*.

In Synapse 1.42, rooms with unknown room versions are no longer returned down `/sync`. This prevents them from appearing in your client, though you may need to empty your client's cache and re-sync to see any effect.

## New MSCs

In addition to Room Version 9 ([MSC3375](https://github.com/matrix-org/matrix-doc/pull/3375)), this release includes:

* An initial implementation of [MSC3231: Token authenticated registration](https://github.com/matrix-org/matrix-doc/pull/3231), which makes it possible for homeservers to disable user registration while still allowing new accounts to be made by people who know a pre-shared secret.

  This MSC and its implementations were produced as part of a Google Summer of Code (GSoC) project by Callum Brown.

* An updated implementation of [MSC2946: Spaces Summary](https://github.com/matrix-org/matrix-doc/pull/2946) following recent changes to the proposal.

* Support for [MSC3283: Expose capabilities for profile actions](https://github.com/matrix-org/matrix-doc/pull/3283), which hints to clients whether or not a server allows users to change their display name, avatar, or email address.

## Everything Else

In addition to the usual array of improvements to performance, type hints, error messages, and documentation:

* Custom Presence Router modules can now be built using Synapse's [new, unified module interface](https://matrix-org.github.io/synapse/v1.42/modules.html#presence-router-callbacks) which debuted in Synapse 1.37.
* Code around federation event handling and authentication has been significantly refactored to improve reliability and maintainability, including extracting nearly 1,800 lines of code from the `FederationHandler` class into a separate `FederationEventHandler` class.
* Backfilling history and fetching missing events now use the same code paths, reducing the potential for bugs.
* Concurrently fetching the same large set of events ([#10703](https://github.com/matrix-org/synapse/pull/10703)) is now much more efficient, preventing the process hangs which were possible in prior, extreme cases.

These are just the highlights; please see the [Upgrade Notes](https://matrix-org.github.io/synapse/v1.42/upgrade.html#upgrading-to-v1420) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.42.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [aaronraimist](https://github.com/aaronraimist), [dklimpel](https://github.com/dklimpel), [govynnus](https://github.com/govynnus), and [HugoDelval](https://github.com/HugoDelval).
