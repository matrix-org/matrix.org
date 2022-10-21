+++
title = "Synapse 1.34.0 released"
date = "2021-05-17T16:45:18Z"
updated = "2021-05-17T15:13:26Z"
path = "/blog/2021/05/17/synapse-1-34-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.34.0 is now available, and it's loaded with new features and performance improvements.

> **Note:** This release deprecates and replaces the `room_invite_state_types` configuration option. If you've customized that for your homeserver, please review the [Upgrade Notes](https://github.com/matrix-org/synapse/blob/v1.34.0/UPGRADE.rst#upgrading-to-v1340).
>
> We've also marked the v1 room deletion Admin API as deprecated. Instead of sending a `POST` to a path ending in `/delete`, administrators are encourage to instead send an HTTP `DELETE` to `/_synapse/admin/v1/rooms/<room_id>`. Thanks to ThibF for implementing this ([#9889](https://github.com/matrix-org/synapse/pull/9889)).

## Spaces

The highlight of this release is support for Spaces, now that [MSC1772: Matrix Spaces](https://github.com/matrix-org/matrix-doc/pull/1772) has merged into the Matrix spec!

Synapse also has support for [MSC2946: Spaces Summary](https://github.com/matrix-org/matrix-doc/pull/2946) and [MSC3083: Restricting room membership based on space membership](https://github.com/matrix-org/matrix-doc/pull/3083), but these are off by default as they're still under development. To enable these experimental MSCs, set `experimental_features: { spaces_enabled: true }` in your homeserver configuration. These _are_ enabled on the matrix.org homeserver, and we encourage you to experiment with Spaces there and let us know in the [Spaces Feedback Room](https://matrix.to/#/#spaces-feedback:matrix.org) if you encounter any issues.

## Memory and Caching

Memory consumption and caching have been a major focus of the Synapse team this quarter, and we've made significant strides:

* Synapse has a new `gc_min_interval` [configuration option](https://github.com/matrix-org/synapse/blob/v1.34.0/docs/sample_config.yaml#L155-L163) with reasonable defaults to prevent Python's garbage collector from running too frequently and thrashing when a large homeserver has its collection thresholds set too low.
* Synapse will report [memory allocation stats](https://github.com/matrix-org/synapse/pull/9882) to Prometheus when using jemalloc.
* Synapse will also [measure Redis cache response times](https://github.com/matrix-org/synapse/pull/9904) and report those to Prometheus.
* For debugging, Synapse can [optionally track](https://github.com/matrix-org/synapse/pull/9881) the memory use of each LruCache.

We have a few more tricks up our sleeves; to learn more about how we're planning to improve the memory cost of joining large rooms, check out last week's [Matrix Live](https://www.youtube.com/watch?v=694VuhmVmfo).

## Other Fixes and Improvements

We've also landed significant improvements to:

* Sending events when Redis is available ([#9905](https://github.com/matrix-org/synapse/issues/9905), [#9950](https://github.com/matrix-org/synapse/issues/9950), [#9951](https://github.com/matrix-org/synapse/issues/9951))
* Joining large rooms when presence is enabled ([#9910](https://github.com/matrix-org/synapse/issues/9910), [#9916](https://github.com/matrix-org/synapse/issues/9916))
* Backfilling history in large rooms ([#9935](https://github.com/matrix-org/synapse/issues/9935))

...and fixed bugs that:

* Prevented cross-account `m.room_key_request` messages from being delivered ([#9961](https://github.com/matrix-org/synapse/issues/9961), [#9965](https://github.com/matrix-org/synapse/issues/9965))
* Incorrectly applied room creation / invitation rate limits to users and app services which _should_ have been exempt ([#9968](https://github.com/matrix-org/synapse/issues/9968))

The health check on our Docker images now responds more quickly upon successful startup thanks to improvements by maquis196 ([#9913](https://github.com/matrix-org/synapse/pull/9913)), and for especially privacy-conscious homeservers, device names can now be shielded over federation thanks to a contribution by aaronraimist ([#9945](https://github.com/matrix-org/synapse/pull/9945)).

## New Access Token Format

Inspired by [GitHub's new token format](https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/), we've [restructured Synapse's access token format](https://github.com/matrix-org/synapse/pull/5588) to follow the pattern:

    syt_<UnpaddedBase64MXIDLocalPart>_<20RandomLetters>_<CRC32>

So a token for `@example:matrix.org` might look like:

    syt_ZXhhbXBsZQ_KfJetOcLWEKCvYdKnQLV_0i3W80

Existing tokens remain valid; this is just for new tokens. We hope the new format reduces network overhead while also making it easier identify misplaced tokens in logs and repositories.

## Everything Else

See the [Upgrading Instructions](https://github.com/matrix-org/synapse/blob/v1.34.0/UPGRADE.rst#upgrading-to-v1340) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.34.0/CHANGES.md) for further information on this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [aaronraimist](https://github.com/aaronraimist), [maquis196](https://github.com/maquis196), and [ThibF](https://github.com/ThibF).
