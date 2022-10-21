+++
title = "Synapse 1.29.0 released"
date = "2021-03-08T22:26:13Z"
updated = "2021-03-08T17:42:33Z"
path = "/blog/2021/03/08/synapse-1-29-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

[Synapse 1.29.0](https://github.com/matrix-org/synapse/releases/tag/v1.29.0) is now available!

This release includes several useful new configuration options for administrators of federated home servers. In all cases, the defaults match Synapse's prior behavior.

- AndrewFerr [implemented](https://github.com/matrix-org/synapse/pull/9203) `include_profile_data_on_invite` and `allow_profile_lookup_over_federation` which can limit disclosure of your users' profile information. These both default to True.
- We've also [implemented](https://github.com/matrix-org/synapse/pull/9383) `user_directory.prefer_local_users` which weights users on the same homeserver higher in directory searches. This defaults to False.

Synapse is now easier to run in proxied environments, with tzyl [implementing](https://github.com/matrix-org/synapse/pull/9372) support for the `NO_PROXY` environment variable, as well as recognizing lowercase variants of that and related proxy variables.

Under the hood, we've been steadily improving our type hints, especially in light of the recent release of Twisted 21.2.0 which includes its own type annotations. We've also landed [some improvements](https://github.com/matrix-org/synapse/pull/9402) which reduce the amount of work Synapse does when presence is enabled and you join a room for the first time. Oh, and the media repository now [regenerates missing thumbnails](https://github.com/matrix-org/synapse/pull/9438) on demand.

Lastly, if you deploy Synapse behind a reverse proxy, Synapse now expects to receive an `X-Forwarded-Proto` header on incoming requests and will log a warning if it is missing. See the [upgrade notes](https://github.com/matrix-org/synapse/blob/release-v1.29.0/UPGRADE.rst#upgrading-to-v1290) for more information. The [full changelog](https://github.com/matrix-org/synapse/blob/release-v1.29.0/CHANGES.md) has more information on what's in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [aaronraimist](https://github.com/aaronraimist), [AndrewFerr](https://github.com/AndrewFerr), [dklimpel](https://github.com/dklimpel), [ShadowJonathan](https://github.com/ShadowJonathan), and [tzyl](https://github.com/tzyl).
