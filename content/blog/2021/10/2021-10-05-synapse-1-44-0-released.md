+++
title = "Synapse 1.44.0 released"
date = "2021-10-05T23:44:54Z"
path = "/blog/2021/10/05/synapse-1-44-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.44.0 is out now!

## Loads of Bug Fixes

This release primarily includes fixes for over a dozen long-standing bugs. For example:

- Messages containing null bytes are now properly indexed for search.
- The Room Search Admin API now allows searching for rooms with non-ascii titles.
- URL preview caches, which are meant to be ephemeral, are no longer mirrored from the local media store into other media providers.

## Faster JSON Responses

We now stay within C code while generating large JSON objects for responses, which should be substantially faster than the previous technique, which fell back to Python for encoding.

## New Extension Module APIs

Spam checker modules can now use a `user_may_create_room_with_invites` callback to inspect room creation events which include invitations to users via Matrix or other media (email, etc.).

Additionally, the ModuleApi can now inspect IP and User Agent data, as well as checking whether Rooms and MXIDs are local to the current homeserver.

## Everything Else

We've also been busy refactoring. For example:

- Prometheus stats now distinguish between cache evictions due to entries expiring, and cache evictions due to the cache being full.
- The `synapse.handlers`, `synapse.rest`, and `synapse.storage.databases.state` modules are now fully type annotated and checked by mypy, among others.
- The user directory search code was cleaned up in preparation for future fixes.
- Another half dozen pull requests were merged with an aim toward clarifying federated event authentication code (and associated logging).

Lastly, this release has seen considerable work toward supporting [MSC2716: Incrementally importing history into existing rooms](https://github.com/matrix-org/matrix-doc/pull/2716), along with an update to match the current state of [MSC3231: Token authenticated registration](https://github.com/matrix-org/matrix-doc/pull/3231).

These are just the highlights; please see the [Upgrade Notes](https://matrix-org.github.io/synapse/v1.44/upgrade.html#upgrading-to-v1440) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.44.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [aaronraimist](https://github.com/aaronraimist), [cvwright](https://github.com/cvwright), [govynnus](https://github.com/govynnus), [Kokokokoka](https://github.com/Kokokokoka), and [tulir](https://github.com/tulir).
