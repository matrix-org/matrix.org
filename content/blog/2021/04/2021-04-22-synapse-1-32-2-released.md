+++
title = "Synapse 1.32.2 released"
date = "2021-04-22T18:16:38Z"
path = "/blog/2021/04/22/synapse-1-32-2-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.32.2 is out! **Synapse now requires Python 3.6** (or later) and we've made a few small changes which you should be aware of before upgrading. These are documented in the [upgrade notes](https://github.com/matrix-org/synapse/blob/v1.32.2/UPGRADE.rst#upgrading-to-v1320).

> **Note:** We scrubbed the releases of Synapse 1.32.0 and 1.32.1 as we discovered a pair of regressions including [a bug](https://github.com/matrix-org/synapse/issues/9853) with Prometheus metrics after tagging the release. These have been resolved.

On Monday, humankind flew a helicopter on Mars. And while our pursuit of [Space(s)](https://github.com/matrix-org/matrix-doc/pull/1772) is considerably more modest, it is nevertheless progressing apace: Synapse 1.32 includes an experimental implementation of [MSC3083](https://github.com/matrix-org/matrix-doc/pull/3083).

This release also includes a [new Synapse module](https://github.com/matrix-org/synapse/pull/9491) for routing of presence updates, which can allow devices to share presence information without requiring that they also share a room. Please note there are some [nuances to worker configuration](https://github.com/matrix-org/synapse/pull/9823) when using this module which we hope to iron out in a future release.

The Admin API is newly able to [manage rate limits](https://github.com/matrix-org/synapse/blob/v1.32.2/docs/admin_api/user_admin_api.rst#override-ratelimiting-for-users), and the user listing endpoint can finally [sort its results](https://github.com/matrix-org/synapse/pull/9691) by a variety of criteria.

Otherwise, this is again a very internals-focused release: many additional type hints, [improvements to structured logging](https://github.com/matrix-org/synapse/pull/9654), and small cleanups, especially those possible now that we've left Python 3.5 behind. We've made changes to how we check whether accounts are [exempt from rate limits](https://github.com/matrix-org/synapse/pull/9711) to avoid cases where we mistakenly applied limits to Application Services which should have been exempt, and we've fixed a bug with sharded federation senders which could occasionally [pin the CPU](https://github.com/matrix-org/synapse/pull/9770).

See the [Upgrading Instructions](https://github.com/matrix-org/synapse/blob/v1.32.2/UPGRADE.rst#upgrading-to-v1320) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.32.2/CHANGES.md#synapse-1322-2021-04-22) for further information.

### Thank You

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [dklimpel](https://github.com/dklimpel), [languitar](https://github.com/languitar), [ShadowJonathan](https://github.com/ShadowJonathan), and [xmunoz](https://github.com/xmunoz).
