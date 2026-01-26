+++
date = "2025-07-16"
title = "Pre-disclosure: Upcoming coordinated security fix for all Matrix server implementations"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "Security"]
+++

Hi all,

Over the last 6 months a major project has been underway by the Element server team and the Matrix.org Foundation security team to investigate “state resets”: scenarios where Matrix’s state resolution algorithm can give unexpected results.  As part of this work we’ve identified two high severity protocol vulnerabilities (CVE-2025-49090; the other not yet allocated a CVE).

Given the security implications of a federation protocol vulnerability, we’ve shared details under embargo over the last 4 weeks with all known active server implementations, and are now aiming for a coordinated security release across all Matrix server implementations on <del>**Tuesday Jul 22nd**</del> **Monday Aug 11th 2025 at 17:00 UTC**.  If you run a Matrix server in an untrusted federation (e.g. the public federation), please be prepared to upgrade as soon as the patched versions are available.

These vulnerabilities have been addressed via MSCs which have been shared, reviewed and are in the final comment period (disposition merge) with the Spec Core Team and server implementor community, under embargo.  This will result in an off-cycle Matrix spec release (1.16) introducing a new room version (**12**) to address the vulnerabilities in question, requiring a room upgrade of existing rooms.  Having given server and room admins time to upgrade, we are then planning to un-embargo the MSCs and complement tests on <del>Friday Jul 25th</del> Thursday Aug 14th 2025 at 17:00 UTC.

**UPDATE: Jul 18th 16:45 UTC**: We've heard a lot of feedback that 6 days isn't enough for clients/bots/bridge/tooling developers to test the changes introduced by room v12, and that it also doesn't give enough time for community admins to prepare for the necessary room upgrades. Underestimating the time needed here for client/community testing is entirely our fault, due to being overfocused on coordinating the significant serverside work needed. **As a result, we've pushed back the coordinated server release date to Aug 11th**, to give everyone more time to test and prepare.  We've also opened up registration on the `beta.matrix.org` homeserver, which is already running v12 rooms by default, to make it easier for client developers to test their clients.  We've also made one clarification below for client developers, explaining the new permissions needed to send `m.room.tombstone` events.

**CLARIFICATION: Jul 16 17:30 UTC**: Room admins should plan to upgrade rooms at their convenience, similar to previous security-related room version upgrades (e.g. v1 to v2).  Much like installing an operating system patch, sooner is better, but as these are not Critical Severity vulnerabilities, there is no requirement for room admins to upgrade rooms immediately on Jul 22nd. For instance, the Matrix.org Foundation will likely upgrade its public rooms at some point after Jul 25th (having given server admins a chance to upgrade, and having given any server implementations running late a chance to release).  N.B. Only rooms which include users on potentially malicious servers (e.g. publicly joinable rooms on untrusted federations) are vulnerable.

**Important information for client developers:**

* Client developers should review [MSC4291: “Room IDs as hashes of the create event”](https://github.com/matrix-org/matrix-spec-proposals/blob/matthew/msc4291/proposals/4291-room-ids-as-hashes.md) to ensure their clients can accept the new proposed format of room IDs, and no longer expects `content.predecessor.event_id` in `m.room.create` events.

* One of the other changes coming in v12 is that room creators will be privileged over other users in the room. Therefore clients which restrict user behaviour based on power level will need to be updated to be aware that room creators effectively have infinite power level. Creators are **not** listed in the users block of the `m.room.power_levels` event, and are instead defined as the `sender` field of the `m.room.create` event, or entries in a new optional `additional_creators` array field in the `content` of the create event. Full details will be released in the MSCs when embargo lifts.

* Finally, clients which use `power_level_content_override` when creating rooms MUST NOT assign a power level to the room creator, otherwise the `/createRoom` request will fail.

* **UPDATE: Jul 18th**: We should have mentioned that the default power level in room v12 for sending `m.room.tombstone` events to upgrade rooms is 150. This stops normal admins from upgrading the room (and so assuming creator privileges) - instead, a creator has to explicitly boost an admin's power level to 150 in order to let them upgrade the room and effectively assume creator rights going forwards.

This has been an exceptionally complicated project to coordinate and its security implications required us to deviate from our usual MSC process and develop the changes under embargo. This and the expedited release of a new stable room version are exceptional choices that are far from ideal, which we’re having to take to keep the ecosystem secure.  To be clear, normal MSC development and process will continue in the open, just as it always has. We’d like to sincerely thank the Matrix server implementor community for their impressive support in preparing the coordinated security releases - both in terms of vital MSC review, and then working together to implement the necessary changes. Matrix’s server heterogeneity has never looked healthier. We’d also like to thank Timo Kösters for helping precipitate the project in the first place.

We’ll follow up with more details on Aug 11th (assuming the disclosure timeline doesn’t slip further).

Thanks all for your time, patience and understanding while we ship this protocol upgrade (the first coordinated upgrade since [Matrix 1.0](https://matrix.org/blog/2019/03/15/matrix-1-0-https-arewereadyyet-com/) back in 2019!)

Matthew

