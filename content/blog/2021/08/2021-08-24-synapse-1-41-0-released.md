+++
title = "Synapse 1.41.0 released"
path = "/blog/2021/08/24/synapse-1-41-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.41.0 is out now!

> **NOTE:** We anticipate publishing a **security release** next Tuesday, the 31st of August.
>
> Synapse 1.41.1 will contain fixes for two moderate severity issues.

Synapse 1.41 includes changes to forward proxies, template settings, and media workers which may require your attention. Please see the  [Upgrade Notes](https://matrix-org.github.io/synapse/v1.41/upgrade.html#upgrading-to-v1410) for details.

Also, this release **removes support for Ubuntu 20.10** (Groovy Gorilla), which reached End of Life last month. Support for Ubuntu 18.04 LTS (Bionic Beaver) and Ubuntu 21.04 (Hirsute Hippo) will be withdrawn near the end of this year under our [platform deprecation policy](https://matrix-org.github.io/synapse/v1.41/deprecation_policy.html).

## Promoting Restricted Rooms

Synapse 1.41 includes experimental support for [MSC3244: Room version capabilities](https://github.com/matrix-org/matrix-doc/pull/3244), which indicates to clients that they should use Room Version 8 when creating [restricted rooms](https://github.com/matrix-org/matrix-doc/pull/3083). For example, Element's clients will use the MSC3244 metadata, which is on by default in Synapse 1.41, to determine whether to show end users the UI for creating restricted rooms.

Room Version 6 will remain the default for newly created rooms which do not explicitly request the restricted room capabilities at creation time. This strikes a balance between the broad compatibility of an older default room version, while still making newer features available upon request.

## New MSCs

This version of Synapse implements experimental support for:

- [MSC3266: Room summary API](https://github.com/matrix-org/matrix-doc/pull/3266) which provides a simple way to obtain information about a specific room, such as its join rules, room type, etc.
- [MSC3288: Add room type in store invite](https://github.com/matrix-org/matrix-doc/pull/3288) which lets identity servers differentiate between invitations to rooms and invitations to Spaces.
- [MSC3244: Room version capabilities](https://github.com/matrix-org/matrix-doc/pull/3244) as described above.

We've also added pagination to the Spaces Summary API based on updates to [MSC2946](https://github.com/matrix-org/matrix-doc/pull/2946).

Work towards implementing [MSC2716: Incrementally importing history into existing rooms](https://github.com/matrix-org/matrix-doc/pull/2716) continues, with several related pull requests landing in this release.

## More Admin APIs

Synapse now has an Admin APIs to:

- [Delete media uploaded by a user](https://matrix-org.github.io/synapse/v1.41/admin_api/user_admin_api.html#delete-media-uploaded-by-a-user) from your homeserver's local media storage.
- [Edit the external ids](https://matrix-org.github.io/synapse/v1.41/admin_api/user_admin_api.html#create-or-modify-account) associated with a user by Single Sign-On / OpenID Connect providers.
- [Check if a username is available](https://matrix-org.github.io/synapse/v1.41/admin_api/user_admin_api.html#check-username-availability), which behaves similarly to the [related client-server API](https://matrix.org/docs/spec/client_server/r0.6.0#get-matrix-client-r0-register-available) in the Matrix Spec, but the Admin API version works even when registration is disabled on a homeserver.

## Everything Else

In addition to the usual boosts to performance and reliability like [#10119](https://github.com/matrix-org/synapse/pull/10119) or [#10513](https://github.com/matrix-org/synapse/pull/10513), this release includes several notable improvements:

- The `/createRoom` endpoint can now be [handled by workers](https://github.com/matrix-org/synapse/pull/10564).
- Synapse can now route outbound federation requests, remote media downloads, and public key fetches through a [forward proxy](https://matrix-org.github.io/synapse/v1.41/setup/forward_proxy.html).
- Custom template configuration has now been centralized into a single `custom_templates_directory` [configuration setting](https://matrix-org.github.io/synapse/v1.41/templates.html).
- Matrix clients which allow users to [set a `status_msg` with their presence](https://matrix.org/docs/spec/client_server/latest#id64) will find that Synapse no longer arbitrarily unsets the message when a user goes offline. Instead, each user's `status_msg` will persist until it is deliberately cleared by their client.
- The extension module API now exposes a function, `get_userinfo_by_id`, which accepts an MXID and returns a `UserInfo` object. This should simplify writing extension modules like spam checkers.

These are just the highlights; please see the [Upgrade Notes](https://matrix-org.github.io/synapse/v1.41/upgrade.html#upgrading-to-v1410) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.41.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [Bubu](https://github.com/Bubu), [dklimpel](https://github.com/dklimpel), [H-Shay](https://github.com/H-Shay), [ilmari](https://github.com/ilmari), [Kentokamoto](https://github.com/Kentokamoto), [SimonBrandner](https://github.com/SimonBrandner), and [warricksothr](https://github.com/warricksothr).
