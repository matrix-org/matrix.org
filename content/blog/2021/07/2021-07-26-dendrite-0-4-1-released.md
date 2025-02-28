+++
title = "Dendrite 0.4.1 Released"
path = "/blog/2021/07/26/dendrite-0-4-1-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]
+++

It's only been two weeks since Dendrite 0.4 landed, but there's already a
significant new release with Dendrite 0.4.1 (it's amazing how much work we
can do on Dendrite when not off chasing low-bandwidth and P2P Matrix!)

This release further improves memory performance and radically improves
state resolution performance (rumour has it that it's a 10x speed-up).
Meanwhile, SS API sytest coverage is up to 91%(!!) and CS API is now at 63%.

We're going to try to keep the pressure up over the coming weeks - and once
sytest is at 100% coverage (and we're not missing any big features which sytest
doesn't cover yet) we'll be declaring a 1.0 :)

If you're running Dendrite, please upgrade.  If not, perhaps this would be a
good version to give it a try?  You can get it, as always from,
<https://github.com/matrix-org/dendrite/releases/tag/v0.4.1>.  The changelog
follows:

### Features

* Support for room version 7 has been added
* Key notary support is now more complete, allowing Dendrite to be used as a notary server for looking up signing keys
* State resolution v2 performance has been optimised further by caching the create event, power levels and join rules in memory instead of parsing them repeatedly
* The media API now handles cases where the maximum file size is configured to be less than 0 for unlimited size
* The `initial_state` in a `/createRoom` request is now respected when creating a room
* Code paths for checking if servers are joined to rooms have been optimised significantly

### Fixes

* A bug resulting in `cannot xref null state block with snapshot` during the new state storage migration has been fixed
* Invites are now retired correctly when rejecting an invite from a remote server which is no longer reachable
* The DNS cache `cache_lifetime` option is now handled correctly (contributed by [S7evinK](https://github.com/S7evinK))
* Invalid events in a room join response are now dropped correctly, rather than failing the entire join
* The `prev_state` of an event will no longer be populated incorrectly to the state of the current event
* Receiving an invite to an unsupported room version will now correctly return the `M_UNSUPPORTED_ROOM_VERSION` error code instead of `M_BAD_JSON` (contributed by [meenal06](https://github.com/meenal06))

-- Team Dendrite
