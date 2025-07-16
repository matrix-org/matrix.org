+++
date = "2025-07-16"
title = "Pre-disclosure: Upcoming coordinated security fix for all Matrix server implementations"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "Security"]
+++

Hi all,

Over the last 6 months a major project has been underway by the Element server team and the Matrix.org Foundation security team to investigate “state resets”: scenarios where Matrix’s state resolution algorithm can give unexpected results.  As part of this work we’ve identified two high severity protocol vulnerabilities (CVE-2025-49090; the other not yet allocated a CVE).

Given the security implications of a federation protocol vulnerability, we’ve shared details under embargo over the last 4 weeks with all known active server implementations, and are now aiming for a coordinated security release across all Matrix server implementations on **Tuesday Jul 22nd 2025 at 17:00 UTC**.  If you run a Matrix server in an untrusted federation (e.g. the public federation), please be prepared to upgrade as soon as the patched versions are available.

These vulnerabilities have been addressed via MSCs which have been shared, reviewed and are in the final comment period (disposition merge) with the Spec Core Team and server implementor community, under embargo.  This will result in an off-cycle Matrix spec release (1.16) introducing a new room version (**12**) to address the vulnerabilities in question, requiring a room upgrade of existing rooms.  Having given server and room admins time to upgrade, we are then planning to un-embargo the MSCs and complement tests on Friday Jul 25th 2025 at 17:00 UTC.

**Important information for client developers:**

* Client developers should review [MSC4291: “Room IDs as hashes of the create event”](https://github.com/matrix-org/matrix-spec-proposals/blob/matthew/msc4291/proposals/4291-room-ids-as-hashes.md) to ensure their clients can accept the new proposed format of room IDs.

* One of the other changes coming in v12 is that room creators will be privileged over other users in the room. Therefore clients which restrict user behaviour based on power level will need to be updated to be aware that room creators effectively have infinite power level. Creators are **not** listed in the users block of the `m.room.power_levels` event, and are instead defined as the `sender` field of the `m.room.create` event, or entries in a new optional `additional_creators` array field in the `content` of the create event. Full details will be released in the MSCs when embargo lifts.

* Finally, clients which use `power_level_content_override` when creating rooms MUST NOT assign a power level to the room creator, otherwise the `/createRoom` request will fail.

This has been an exceptionally complicated project to coordinate and its security implications required us to deviate from our usual MSC process and develop the changes under embargo. This and the expedited release of a new stable room version are exceptional choices that are far from ideal, which we’re having to take to keep the ecosystem secure.  To be clear, normal MSC development and process will continue in the open, just as it always has.. We’d like to sincerely thank the Matrix server implementor community for their impressive support in preparing the coordinated security releases - both in terms of vital MSC review, and then working together to implement the necessary changes. Matrix’s server heterogeneity has never looked healthier. We’d also like to thank Timo Kösters for helping precipitate the project in the first place.

We’ll follow up with more details next Tuesday (assuming the disclosure timeline doesn’t slip).

Thanks all for your time, patience and understanding while we ship this protocol upgrade (the first coordinated upgrade since Matrix 1.0 back in 2020!)

Matthew

