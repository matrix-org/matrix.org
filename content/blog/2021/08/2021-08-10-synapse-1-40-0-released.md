+++
title = "Synapse 1.40.0 released"
path = "/blog/2021/08/10/synapse-1-40-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.40.0 is out now!

## Support for Room Version 8

This release of Synapse includes stable support for [Room Version 8](https://github.com/matrix-org/matrix-doc/pull/3289)! Version 8 codifies a concept of "[restricted rooms](https://github.com/matrix-org/matrix-doc/pull/3083)" which are private rooms joinable only by direct invitation or by being a member of other, designated Spaces / rooms.

This means you can create a Matrix Space for your company, team, or guild, and instead of inviting people to the Space _and_ directly to a bunch of private rooms, you can simply configure your private rooms such that membership in the Space _automatically_ confers access to the private rooms.

This is a major improvement to access control in Matrix, and we can't wait to use it ourselves.

Note that client support for managing restricted rooms is still forthcoming, and you'll want to ensure that your users are on homeservers which support v8 before upgrading existing rooms. To ensure compatibility across federation, the default for newly created rooms remains at v6 for the time being.

## Everything Else

A few other items worth calling out:

- Synapse can now optionally recycle PostgreSQL connections after a specified number of transactions ([#10440](https://github.com/matrix-org/synapse/pull/10440)), which may mitigate slow memory leaks in the database. Thanks to GitHub user hifi.
- We have a whole new documentation page explaining [Room DAG Concepts](https://matrix-org.github.io/synapse/v1.40/development/room-dag-concepts.html) like depth, stream ordering, extremities, outliers, and state groups.
- The [Admin API for listing accounts](https://matrix-org.github.io/synapse/v1.40/admin_api/user_admin_api.html#list-accounts) now returns a `creation_ts` property indicating when an account was created. Thanks to work by dklimpel.
- Synapse should better detect character encodings in URL previews thanks to a contribution by srividyut.

In addition to further work towards implementing [MSC2716: Incrementally Importing History into Existing Rooms](https://github.com/matrix-org/matrix-doc/pull/2716), we've landed support for:

- [MSC2033](https://github.com/matrix-org/matrix-doc/pull/2033): The `/account/whoami` endpoint now includes the `device_id` associated with the access token used to make the request.
- (Experimental) [MSC3244](https://github.com/matrix-org/matrix-doc/pull/3244): The `/_matrix/client/r0/capabilities` endpoint may include metadata about which room versions support which capabilities (like knocking on restricted joins).
- (Experimental) [MSC2285](https://github.com/matrix-org/matrix-doc/pull/2285): Clients may mark messages as read on the server without updating their externally visible read receipts, implemented by SimonBrandner.

These are just the highlights; please see the [Release Notes](https://github.com/matrix-org/synapse/blob/v1.40.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [dklimpel](https://github.com/dklimpel), [hifi](https://github.com/hifi), [SimonBrandner](https://github.com/SimonBrandner), and [srividyut](https://github.com/srividyut).
