+++
title = "Synapse 1.36.0 released"
date = "2021-06-15T11:20:40Z"
updated = "2021-06-14T23:14:35Z"
path = "/blog/2021/06/15/synapse-1-36-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.36.0 is out, and it's a big one!

## Room Join Memory Improvements

We did it! Synapse no longer experiences a memory spike when joining large / complex rooms.

![Memory usage graph for Synapse 1.33 and 1.36](/blog/img/2021-06-15-synapse-1.36-join-memory.png)

These improvements mainly arise from processing join responses incrementally, rather than trying to load everything into memory at once. However, realizing these gains involved a fair bit of rewriting, as the entire processing pipeline had to work incrementally, and with appropriately sized batches, to avoid downstream bottlenecks. You can hear more about our original plans for this work in last month's Matrix Live: [S6E23 — Dan and Erik talk about Synapse](https://www.youtube.com/watch?v=694VuhmVmfo).

## Presence Improvements

Running presence on a single worker process is now expected to work correctly. This feature first debuted in [Synapse 1.33](/blog/2021/05/05/synapse-1-33-0-released), but a few bugs cropped up which could lead to presence state becoming outdated. With [#10149](https://github.com/matrix-org/synapse/pull/10149) merged, we believe the last of these issues to be resolved.

We had also noticed a recent increase in presence load on federation workers; this was ultimately tracked to two bugs, both fixed in this release: We were processing local presence via federation workers ([#10163](https://github.com/matrix-org/synapse/pull/10163)) and we were occasionally sending duplicate presence updates ([#10165)](https://github.com/matrix-org/synapse/pull/10165).

With both issues fixed, outgoing federation load has returned to normal levels:

![Graph of outgoing federation transaction rate ranging from around 75 Hz down to under 25 Hz](/blog/img/2021-06-15-synapse-1.36-fed-sender-tx-rate.png)

(Thank you to David Mehren for this graph from issue [#10153](https://github.com/matrix-org/synapse/issues/10153))

## Everything Else

Synapse now has two new Admin APIs for [unprotecting](https://github.com/matrix-org/synapse/blob/v1.36.0/docs/admin_api/media_admin_api.md#unprotecting-media-from-being-quarantined) and [removing](https://github.com/matrix-org/synapse/blob/v1.36.0/docs/admin_api/media_admin_api.md#remove-media-from-quarantine-by-id) media from quarantine, thanks to contributions by dklimpel.

Synapse now implements the stable `/_matrix/client/r0/rooms/{roomId}/aliases` endpoint originally introduced by [MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432), and, thanks to contributions by govynnus, makes the `reason` and `score` fields of event reports optional per [MSC2414](https://github.com/matrix-org/matrix-doc/pull/2414).

These are just the highlights; please see the [Release Notes](https://github.com/matrix-org/synapse/blob/v1.36.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [14mRh4X0r](https://github.com/14mRh4X0r), [aaronraimist](https://github.com/aaronraimist), [bradtgmurray](https://github.com/bradtgmurray), [crcastle](https://github.com/crcastle), [dklimpel](https://github.com/dklimpel), [govynnus](https://github.com/govynnus), and [RhnSharma](https://github.com/RhnSharma).
