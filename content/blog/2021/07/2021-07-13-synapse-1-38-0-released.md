+++
title = "Synapse 1.38.0 released"
path = "/blog/2021/07/13/synapse-1-38-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.38.0 is out now!

> __NOTE:__ We released Synapse 1.38.1 on Thursday, July 22nd. It [mitigates](https://github.com/matrix-org/synapse/issues/10456) a client bug with Synapse 1.38.0's smaller sync responses which prevented new Element Android sessions from successfully participating in encrypted conversations. Server administrators are strongly encouraged to upgrade.

## (Big) Integers

Synapse's database schema used `integer` columns in a few places where values could potentially overflow a maximum value of 2<sup>31</sup>. One such column is `events.stream_ordering`, which surpassed 2<sup>31</sup> on matrix.org last week.

To prevent overflows, Synapse 1.38 will automatically convert several `integer` columns to `bigint` as a background update. While homeservers will function normally during this task, it could result in increased disk I/O for several hours or days. Note that __homeservers may need several gigabytes of free space__ to successfully rebuild associated database indexes and complete the upgrade.

See the [upgrade notes](https://matrix-org.github.io/synapse/v1.38/upgrade.html#upgrading-to-v1380) for more details.

## Expiring Caches

Synapse has a new configuration option, `caches.expiry_time`, which can be set to enable evicting items from caches if they go too long without being accessed. This helps servers reclaim memory used by large yet infrequently used caches.

## Smaller Sync Responses

The response to `/sync` now omits optional keys when they would otherwise be empty. This can significantly reduce the size of incremental syncs, as demonstrated in [#6579](https://github.com/matrix-org/synapse/issues/6579). Thanks to deepbluev7 for  initially submitting this in [#9919](https://github.com/matrix-org/synapse/pull/9919), which made it into this release via [#10214](https://github.com/matrix-org/synapse/pull/10214).

## Everything Else

A few other items worth calling out:

- This release includes an experimental implementation of [MSC2918: Refresh tokens](https://github.com/matrix-org/matrix-doc/pull/2918), which adds initial support for complementary access / refresh tokens in line with OAuth best practices ([#9450](https://github.com/matrix-org/synapse/pull/9450)).
- Synapse now [ships a script](https://github.com/matrix-org/synapse/pull/10290) to review recently registered accounts, which can be useful in cleaning up servers in the wake of malicious, automated registrations like we witnessed during last month's [spam attack](https://matrix.org/blog/2021/06/30/security-update-synapse-1-37-1-released).
- We've also fixed a few rough edges ([#10263](https://github.com/matrix-org/synapse/pull/10263), [#10303](https://github.com/matrix-org/synapse/pull/10303), [#10336](https://github.com/matrix-org/synapse/pull/10336)) in the spam mitigations from 1.37.1, and would encourage you to update.
- The [Admin API for querying user information](https://matrix-org.github.io/synapse/v1.38/admin_api/user_admin_api.html) now includes information about a user's SSO identities in its response.

These are just the highlights; please see the [Upgrade Notes](https://matrix-org.github.io/synapse/v1.38/upgrade.html#upgrading-to-v1380) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.38.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [deepbluev7](https://github.com/deepbluev7), [dklimpel](https://github.com/dklimpel), [fkr](https://github.com/fkr), and [sideshowbarker](https://github.com/sideshowbarker)
