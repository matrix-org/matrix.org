+++
date = "2025-08-14"
title = "Project Hydra: Improving state resolution in Matrix"

[taxonomies]
author = ["Kegan Dougal, Staff Engineer - Element"]
category = ["General", "Security"]
+++

Hi all,

On July 16th 2025 we issued a [pre-disclosure](https://matrix.org/blog/2025/07/security-predisclosure/) for vulnerabilities in the federation protocol, and [announced new releases](https://matrix.org/blog/2025/08/security-release/) of Matrix homeservers on Mon August 11\. Today we are ending the embargo and disclosing the remaining MSCs. This post will go into more detail about the changes and what led up to them.

This project has the codename “Hydra” and is an ongoing exercise in improving the security of the federation protocol. Given the security-sensitive nature of this work, it was done under embargo by the backend team at Element, the [Matrix.org](http://Matrix.org) Security Team, the Spec Core Team, alongside Timo Kösters (who privately reported a related vulnerability, helping jumpstart the project) and Florian Jacob (at Karlsruher Institut für Technologie). The work was subsequently shared, reviewed and MSC’d under embargo with maintainers of all known Matrix homeserver implementations which implement State Resolution 2.0 on June 13th, so they could prepare for the coordinated release on August 11\. We have then given server admins 3 more days to upgrade before lifting the embargo and disclosing the vulnerability details here.

This entire process has been highly unusual for the ecosystem, and it’s unfortunate that we were unable to make these changes out in the open. Where possible, we moved to release redacted versions of the MSCs as soon as we were comfortable from a security perspective (e.g. releasing [MSC4289](https://github.com/matrix-org/matrix-spec-proposals/pull/4289) and [MSC4291](https://github.com/matrix-org/matrix-spec-proposals/pull/4291) ahead of time, with redacted sections). Furthermore, we’d like to apologise for the disruption in landing a new stable room version and specification release with immediate effect rather than allowing for a period of public review. Going forwards, normal MSC work will continue in public as it ever has, along with normal on-cycle specification releases.

#### Key Information

The MSCs added under embargo were:

- [MSC4289](https://github.com/matrix-org/matrix-spec-proposals/pull/4289): Explicitly privilege room creators
- [MSC4291](https://github.com/matrix-org/matrix-spec-proposals/pull/4291): Room IDs as hashes of the create event
- [MSC4297](https://github.com/matrix-org/matrix-spec-proposals/pull/4297): State Resolution v2.1
- [MSC4304](https://github.com/matrix-org/matrix-spec-proposals/pull/4304): Room Version 12

Supporting these MSCs are:

- Server-agnostic [Complement tests](https://github.com/matrix-org/complement/blob/dd9b896fead36504c97e35456fe3c0e09fc7328d/tests/v12_test.go).
- [The specification PR introducing room version 12](https://github.com/matrix-org/matrix-spec/pull/2193)
- [The implementor’s guide to State Res 2.1](@/docs/spec-guides/state-res-2.1/_index.md)
- [Creator power level in room version 12](@/docs/spec-guides/creator-power-level/_index.md)

These changes fixed the following vulnerabilities:

- [CVE-2025-49090](https://www.cve.org/CVERecord?id=CVE-2025-49090) (State Resolution 2.0 deficiencies)
- [CVE-2025-54315](https://www.cve.org/CVERecord?id=CVE-2025-54315) (Lack of create event uniqueness)

#### Impact

These issues only affect servers which are federating with untrusted or potentially malicious servers, such as participating in the public Matrix network.  Servers which are not federated, or which federate in private trusted networks such as BwMessenger, Tchap or TI-Messenger are not affected.

The impact of these issues is rated as ‘high’ rather than ‘critical’ as they do not result in data compromise or exposure. Instead, the risk here is of a malicious homeserver operator corrupting the chatroom’s state by resetting it to a prior value (e.g. reverting access control or room membership to an earlier configuration). This does **not** expose conversation history nor any additional data.
We are not aware of these issues being exploited, but would recommend servers to upgrade immediately if they are operating rooms with users participating from untrusted servers, as per [Monday’s announcement](https://matrix.org/blog/2025/08/security-release/). Room admins should then upgrade such rooms to version 12 to guard against these attacks in future \- see the [new room upgrade guide](https://matrix.org/docs/communities/administration/#room-upgrades).

#### Summary of changes

This project has resulted in four new Matrix Spec Change proposals to the protocol. At high level, these are:

[MSC4289](https://github.com/matrix-org/matrix-spec-proposals/pull/4289): “Explicitly privilege room creators”. This makes explicit the fact that room creators have 'infinite' power level. The reason we've done this is because in practice the creator’s server can already effectively control a room by backdating events: access control requires a hierarchy, and the creator is at the top of this hierarchy.  This also adds the concept of multiple creators, to avoid control of rooms being centralised on a single server, and to support rooms where ownership genuinely needs to be shared between multiple users (e.g. DMs).  It’s worth noting this does *not* impact decentralisation – the creators can still sit on multiple servers, and the room itself is replicated equally over participating servers.  Instead, it’s just recognising that access control requires someone to be at the top of the hierarchy, and that person is the room creator.  Separately, we’re looking at approaches to prevent backdating in general by adding ‘finality’ to Matrix.

This MSC also solves the [age-old problem](https://github.com/matrix-org/matrix-spec/issues/165) where admins could lose control of their own rooms by promoting other users to admin or demoting themselves: now, the creator can always fix such situations. If creators go rogue or disappear, the solution is to establish a new creator by either upgrading the room or creating a new one. Given whoever upgrades a room becomes its new creator, we've changed the default power level needed to upgrade a room to be 150, referred to as 'owner' power level. This allows the room creator to effectively delegate permission to upgrade the room (and so become the new creator) to specific admins by explicitly giving them power level 150\.

[MSC4291](https://github.com/matrix-org/matrix-spec-proposals/pull/4291): “Room IDs as hashes of the create event”. This changes the format of room IDs so that they are literally the same as the event ID of the create event. This is a precautionary measure to prevent a potential theoretical class of attacks where malicious server admins could try to introduce false m.room.create events into a room in order to hijack it.

[MSC4297](https://github.com/matrix-org/matrix-spec-proposals/pull/4297): “State Resolution v2.1”.  This is an incremental change over the current State Resolution 2.0 algorithm, which protects against various classes of 'state resets', where delayed federation traffic could cause key-value state associated with a room to revert to an earlier state. This caused symptoms such as users being re-added into a room they have left, or the server no longer recognising users as being present in a room, or access control resetting to a previous state. The new algorithm works by changing the starting state on top of which conflicting events are replayed and it replays more events than previously (replaying not just the conflicted events but all the events in between any two conflicted events—the conflicted state subgraph). This fixes state resets observed in the rooms including: \#rust, the [Office of the Matrix.org](http://matrix.org/) Foundation, the TWIM room, Techlore and Furrytech.

[MSC4304](https://github.com/matrix-org/matrix-spec-proposals/pull/4304): “Room Version 12”. This simply defines the combination of the previous 3 MSCs as room version 12\.

For full technical details, please read the actual MSCs: [MSC4289,](https://github.com/matrix-org/matrix-spec-proposals/pull/4289) [MSC4291,](https://github.com/matrix-org/matrix-spec-proposals/pull/4291) [MSC4297](https://github.com/matrix-org/matrix-spec-proposals/pull/4297) and [MSC4304.](https://github.com/matrix-org/matrix-spec-proposals/pull/4304)

#### History

Matrix optimistically applies changes to room state without waiting for all servers to achieve consensus. This means that sometimes servers will update the room state (e.g. modify the room name) while concurrently, they lose their permission to set said room state (e.g. the user changing the room name is banned). When this happens, the room name change gets rolled back to its previous value. Counterintuitively this can happen even when there is no specific event that causes the user to lose their permission to set room state. This unexpected class of rollbacks is called a “state reset”.

Work on fixing known cases of state resets in the current State Resolution 2.0 algorithm began in 2022 when [David Robertson](https://github.com/DMRobertson) on Element’s backend team investigated known occurrences of the problem that were happening on the public network. He made good progress on identifying the root causes of these occurrences, resulting in the State Resolution v2.1 algorithm. Unfortunately, [lack of funding](https://matrix.org/blog/2023/12/25/the-matrix-holiday-update-2023/) meant work had to be paused. (N.B. if your organisation is operationally dependent on Matrix’s security, **please** contribute financially by [joining the Foundation as a member](https://matrix.org/support/) in order to fund security work like this.)

The project was then resumed at the end of 2024 as part of a general security review by Element’s backend team and the Matrix Foundation security team which ultimately resulted in [MSC4297](http://github.com/matrix-org/matrix-spec-proposals/pull/4297). Broadly speaking, State Resolution v2.1 makes two changes: it changes the starting state on top of which conflicting events are replayed and it replays more events than previously (replaying not just the conflicted events but all the events in between any two conflicted events—the *conflicted state subgraph*). This fixes state resets observed in public rooms including: \#rust, the Office of the Matrix.org Foundation, the TWIM room, Techlore and Furrytech.

This work coincided with Timo Kösters highlighting an issue to [security@matrix.org](mailto:security@matrix.org) that the room creator always has had complete power over the room and dominates other admins. This works even if the creator had left the room or gave away their admin permissions in the past. This spurred the creation of [MSC4289](http://github.com/matrix-org/matrix-spec-proposals/pull/4289) which formally acknowledges the power that creators have over every other member in the room. We’d like to thank Timo for reporting these points to [security@matrix.org](mailto:security@matrix.org) and we will be adding him to the Security Hall of Fame.

The security review also brought to light another potentially serious vulnerability in the federation protocol. Our on-paper analysis suggested it may be possible to replace the create event in the room. If so, this would have grave consequences as all permissions in the room are derived from the create event.

However, when we tried to reproduce the vulnerability in real implementations we found that they were not vulnerable due to the way those implementations handled rejected events. Nevertheless, the protocol was missing a strong guarantee that there can never be multiple create events for the same room. This was sufficiently worrying as a soundness issue to warrant fixing, and so [MSC4291](http://github.com/matrix-org/matrix-spec-proposals/pull/4291) was created to guarantee that each room has exactly one immutable create event.

We took the unusual decision to embargo these MSCs due to risk of exploitation, taking each in turn:

- [MSC4289](https://github.com/matrix-org/matrix-spec-proposals/pull/4289): The risk of a room created by a user on a server that is no longer trusted, using their creator powers to disrupt the room
- [MSC4291](https://github.com/matrix-org/matrix-spec-proposals/pull/4291): The risk of an unknown vector allowing multiple create events to be accepted into a room, allowing rooms to be taken over.
- [MSC4297](https://github.com/matrix-org/matrix-spec-proposals/pull/4297): The risk of manipulation of the federation re-sync mechanism allowing state resets to be intentionally triggered.

These MSCs were reviewed under embargo by the SCT and server implementors, and passed final comment period for merge. These MSCs are bundled up into [Room Version 12](https://spec.matrix.org/unstable/rooms/v12/), expected to be released formally in Matrix 1.16 later this month.

This work fixes the most common set of state resets we’ve seen in the wild, although we’re continuing work on Hydra. We’ll be doing as much of this work as possible in the open to minimise any future embargoes. We’d like to thank all the server implementors ([Conduit,](https://conduit.rs/) [Continuwuity,](https://continuwuity.org/) [ejabberd,](https://www.ejabberd.im/index.html) [Dendrite,](https://element-hq.github.io/dendrite/) [Rocket.chat,](https://www.rocket.chat/) [Synapse,](https://github.com/element-hq/synapse) [Synapse Pro](https://element.io/server-suite/synapse-pro) and [Tuwunel](https://github.com/matrix-construct/tuwunel)) who took the time to make these changes at such short notice.

We’d also like to thank the client/bot/bridge implementors for accommodating the client-side breaking changes introduced in room version 12, particularly around the new power level semantics and room ID format change.

Finally, we’d like to thank the community at large, particularly those who have been disrupted and have had to upgrade rooms in response to this work. Thanks all for your patience, and we look forward to a talk all about this at the Matrix Conference in October\!
