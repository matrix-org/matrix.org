+++
title = "Matrix v1.3 release"
date = "2022-06-16T17:16:38Z"
updated = "2022-06-15T22:00:58Z"
path = "/blog/2022/06/16/matrix-v-1-3-release"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

It’s another quarter and therefore [another spec release](https://spec.matrix.org/v1.3/)! Matrix 1.2 was [released](https://matrix.org/blog/2022/02/02/matrix-v-1-2-release) back in February, and while a bit late in the quarter this time around we’ve still got some exciting additions coming to you in this release.

Like last time, the speed of these releases might feel a bit quick for developers: fret not if you’re still working on v1.1 or v1.2 implementations. We’re not expecting that implementations update as soon as a new spec release is published, but rather that the ecosystem gradually update over the course of the next few months. Implementations should be aiming for as close to realtime as they can get though, particularly considering v1.4 is expected to have some large features (more on that later on).

Matrix 1.3 sees 14 MSCs get merged, but we can’t possibly go into detail on them all here. We’ve picked some notable highlights and recommend the full changelog at the bottom for a complete idea of what’s been going on.

## Aggregations and the relationships made along the way

It’s no secret that [MSC1849](https://github.com/matrix-org/matrix-spec-proposals/pull/1849)-style server-side aggregation of related messages have been in the review backlog for a while. We ended up splitting [MSC1849](https://github.com/matrix-org/matrix-spec-proposals/pull/1849) down into more reviewable chunks like [MSC2675](https://github.com/matrix-org/matrix-spec-proposals/pull/2675), allowing us to finally land the first pieces into Matrix 1.3 today.

In the spec there aren’t currently any defined relationships which make use of aggregations or even the `rel_type` described by [MSC2674](https://github.com/matrix-org/matrix-spec-proposals/pull/2674), but we do expect that v1.4 of the spec will have support for at least threads ([MSC3440](https://github.com/matrix-org/matrix-spec-proposals/pull/3440)) and edits ([MSC2676](https://github.com/matrix-org/matrix-spec-proposals/pull/2676)), filling the gap. For now, we’ve decided that holding aggregations back until v1.4 doesn’t make a lot of sense, so we have launched them into the world as-is for custom relations or for clients & servers to prepare for what’s expected to be coming in v1.4 of the spec.

To further prepare for threads, we’ve also removed some restrictions of rich replies through [MSC3676](https://github.com/matrix-org/matrix-spec-proposals/pull/3676), thus allowing replies to be constructed with non-text messages like images. Check out the [new rich replies module](https://spec.matrix.org/v1.3/client-server-api/#rich-replies) for more information.

## Join if you can, or just knock

When we launched restricted rooms in Matrix 1.2 we [noted](https://matrix.org/blog/2022/02/02/matrix-v-1-2-release#public-but-not-too-public-join-rules) that we forgot to handle a case where someone might want to support _both_ knocking and restricted rooms at the same time. We’ve fixed that with a stop-gap join rule from [MSC3787](https://github.com/matrix-org/matrix-spec-proposals/pull/3787) in [room version 10](https://spec.matrix.org/v1.3/rooms/v10/).

The new `knock_restricted` join rule allows the room to keep its desire to be restricted whilst also allowing members who do not meet the criteria to knock on the room instead. We’ll likely expand on this sort of mixing of join rules in proposals like [MSC3386](https://github.com/matrix-org/matrix-spec-proposals/pull/3386) down the line, however for now this should cover the gap in support. Next up: figuring out how to make encrypted room history available to these new joiners in a safe way.

## A thread for next time

Originally planned for this release, [MSC3440](https://github.com/matrix-org/matrix-spec-proposals/pull/3440)-style threads are anticipated to be ready for v1.4 (next quarter) with support for notifications and, of course, a whole new way to communicate in a room.

Threads are one of the more complicated features we’ve tried to land in recent history as it has a large impact on a wide variety of the spec: everything from event relationships (fixed in this release) to read receipts to push notifications needs to be worked out to build a system that not only users can understand, but also the developers trying to build it. With this massive surface area we just weren’t comfortable with adding threads to v1.3 as-is, given problems like notifications aren’t yet fully solved.

Alongside threads, we also anticipate that [MSC2676](https://github.com/matrix-org/matrix-spec-proposals/pull/2676)-style message editing will be landing in v1.4, finally specifying how to update an event’s contents without having to redact & re-send. Although message editing has been supported for a long time in some clients, we're excited that it will finally become part of the official specification, meaning it can be implemented more widely. Messaging clients are encouraged to give the proposal an early read and possibly even attempt implementation if not already done to help us ensure the system is in a reasonable state for inclusion in the spec, though we do note that feature requests for edits will likely be deferred to a future MSC.

Keep an eye on [This Week In Matrix](https://matrix.org/blog/category/this-week-in-matrix) for updates on what v1.4 is expected to include, and how things are progressing.

## The full changelog

MSCs are how the spec changes in the way it does - adding, fixing, and maintaining features for the whole ecosystem to use. The blog post can’t cover them all, but that doesn’t make them any less important! Check out the full changelog below, and the [Spec Change Proposals](https://spec.matrix.org/unstable/proposals/) page for more information on how these MSCs got merged (hint: they submitted a proposal, which anyone can do - take a look at the [Matrix Live episode](https://www.youtube.com/watch?v=SFkZz60RRfc) where Matthew covers the proposal process).

### Client-Server API

<strong>Deprecations</strong>

- Deprecate the `sender_key` and `device_id` on `m.megolm.v1.aes-sha2` events, and the `sender_key` on `m.room_key_request` to-device messages, as per [MSC3700](https://github.com/matrix-org/matrix-spec-proposals/pull/3700). ([#1101](https://github.com/matrix-org/matrix-spec/issues/1101))

<strong>Backwards Compatible Changes</strong>

- Make `from` optional on `GET /_matrix/client/v3/messages` to allow requesting events from the start or end of the room history, as per [MSC3567](https://github.com/matrix-org/matrix-spec-proposals/pull/3567). ([#1002](https://github.com/matrix-org/matrix-spec/issues/1002))
- Add refresh tokens, per [MSC2918](https://github.com/matrix-org/matrix-spec-proposals/pull/2918). ([#1056](https://github.com/matrix-org/matrix-spec/issues/1056), [#1113](https://github.com/matrix-org/matrix-spec/issues/1113))
- Relax the restrictions on Rich Replies, as per [MSC3676](https://github.com/matrix-org/matrix-spec-proposals/pull/3676). ([#1062](https://github.com/matrix-org/matrix-spec/issues/1062))
- Describe a structured system for event relationships, as per [MSC2674](https://github.com/matrix-org/matrix-spec-proposals/pull/2674). ([#1062](https://github.com/matrix-org/matrix-spec/issues/1062))
- Describe how relationships between events can be "aggregated", as per [MSC2675](https://github.com/matrix-org/matrix-spec-proposals/pull/2675) and [MSC3666](https://github.com/matrix-org/matrix-spec-proposals/pull/3666). ([#1062](https://github.com/matrix-org/matrix-spec/issues/1062))
- Add support for a new `knock_restricted` join rule in supported room versions, as per [MSC3787](https://github.com/matrix-org/matrix-spec-proposals/pull/3787). ([#1099](https://github.com/matrix-org/matrix-spec/issues/1099))

<strong>Spec Clarifications</strong>

- Clarify that the url field in `m.room.avatar` events is not required. ([#987](https://github.com/matrix-org/matrix-spec/issues/987))
- Clarify that the `type` in user-interactive authentication can be omitted. ([#989](https://github.com/matrix-org/matrix-spec/issues/989))
- Adjust the OpenAPI specification so that the type `Flow information` is explicitly defined when the client-server API is rendered. ([#1003](https://github.com/matrix-org/matrix-spec/issues/1003))
- Correct the default value for `invite` where it is not specified in an `m.room.power_levels` event. ([#1021](https://github.com/matrix-org/matrix-spec/issues/1021))
- Update various links which pointed to the old `matrix-doc` github repository. ([#1032](https://github.com/matrix-org/matrix-spec/issues/1032))
- Removed `m.room.message.feedback` per [MSC3582](https://github.com/matrix-org/matrix-spec-proposals/pull/3582). ([#1035](https://github.com/matrix-org/matrix-spec/issues/1035))
- Fix various typos throughout the specification. ([#1051](https://github.com/matrix-org/matrix-spec/issues/1051), [#1054](https://github.com/matrix-org/matrix-spec/issues/1054), [#1059](https://github.com/matrix-org/matrix-spec/issues/1059), [#1081](https://github.com/matrix-org/matrix-spec/issues/1081), [#1097](https://github.com/matrix-org/matrix-spec/issues/1097), [#1110](https://github.com/matrix-org/matrix-spec/issues/1110), [#1115](https://github.com/matrix-org/matrix-spec/issues/1115), [#1126](https://github.com/matrix-org/matrix-spec/issues/1126), [#1127](https://github.com/matrix-org/matrix-spec/issues/1127), [#1128](https://github.com/matrix-org/matrix-spec/issues/1128), [#1129](https://github.com/matrix-org/matrix-spec/issues/1129), [#3681](https://github.com/matrix-org/matrix-spec-proposals/issues/3681), [#3708](https://github.com/matrix-org/matrix-spec-proposals/issues/3708))
- Clarify that state keys starting with `@` are in fact reserved. Regressed from [#3658](https://github.com/matrix-org/matrix-spec-proposals/pull/3658). ([#1100](https://github.com/matrix-org/matrix-spec/issues/1100))
- Remove unenforced size limit on the `name` field of `m.room.name` events. ([#3669](https://github.com/matrix-org/matrix-spec-proposals/issues/3669))
- Remove erroneous `room_id` field from examples of `m.read`, `m.typing` in `/sync` and `m.fully_read` in room account data. ([#3679](https://github.com/matrix-org/matrix-spec-proposals/issues/3679))
- Clarify the behaviour of `event_match` in push rule conditions. ([#3690](https://github.com/matrix-org/matrix-spec-proposals/issues/3690))
- Fix incorrectly referenced `m.login.appservice` login identifier, instead using `m.login.application_service`. ([#3711](https://github.com/matrix-org/matrix-spec-proposals/issues/3711))
- Fix membership state transitions to denote that `invite->knock` and `external->leave` are valid transitions. ([#3730](https://github.com/matrix-org/matrix-spec-proposals/issues/3730))

### Server-Server API

<strong>Backwards Compatible Changes</strong>

- Add a `destination` property to the Authorization header, as per [MSC3383](https://github.com/matrix-org/matrix-spec-proposals/pull/3383). ([#1067](https://github.com/matrix-org/matrix-spec/issues/1067))

<strong>Spec Clarifications</strong>

- Remove largely unused `origin` field from PDUs. ([#998](https://github.com/matrix-org/matrix-spec/issues/998))
- Update various links which pointed to the old `matrix-doc` github repository. ([#1032](https://github.com/matrix-org/matrix-spec/issues/1032))
- Clarify the format for the Authorization header. ([#1038](https://github.com/matrix-org/matrix-spec/issues/1038), [#1067](https://github.com/matrix-org/matrix-spec/issues/1067))
- Clarify what a "valid event" means when performing checks on a received PDU. ([#1045](https://github.com/matrix-org/matrix-spec/issues/1045))
- Clarify that `valid_until_ts` is in milliseconds, like other timestamps used in Matrix. ([#1055](https://github.com/matrix-org/matrix-spec/issues/1055))
- Clarify that checks on PDUs should refer to the state _before_ an event. ([#1070](https://github.com/matrix-org/matrix-spec/issues/1070))
- Clarify the historical handling of non-integer power levels. ([#1099](https://github.com/matrix-org/matrix-spec/issues/1099))
- Fix various typos throughout the specification. ([#1110](https://github.com/matrix-org/matrix-spec/issues/1110))
- Correct misleading text for `/send_join` response. ([#3703](https://github.com/matrix-org/matrix-spec-proposals/issues/3703))
- Clarify that the `content` for `X-Matrix` signature validation is the parsed JSON body. ([#3727](https://github.com/matrix-org/matrix-spec-proposals/issues/3727))

### Application Service API

<strong>Backwards Compatible Changes</strong>

- Add timestamp massaging as per [MSC3316](https://github.com/matrix-org/matrix-spec-proposals/pull/3316). ([#1094](https://github.com/matrix-org/matrix-spec/issues/1094))

### Identity Service API

No significant changes.

### Push Gateway API

No significant changes.

### Room Versions

<strong>Backwards Compatible Changes</strong>

- Add room version 10 as per [MSC3604](https://github.com/matrix-org/matrix-spec-proposals/pull/3604). ([#1099](https://github.com/matrix-org/matrix-spec/issues/1099))
- Enforce integer power levels in room version 10 as per [MSC3667](https://github.com/matrix-org/matrix-spec-proposals/pull/3667). ([#1099](https://github.com/matrix-org/matrix-spec/issues/1099))
- Add a `knock_restricted` join rule supported by room version 10 as per [MSC3787](https://github.com/matrix-org/matrix-spec-proposals/pull/3787). ([#1099](https://github.com/matrix-org/matrix-spec/issues/1099))
- Update the default room version to 9 as per [MSC3589](https://github.com/matrix-org/matrix-spec-proposals/pull/3589). ([#3739](https://github.com/matrix-org/matrix-spec-proposals/issues/3739))

<strong>Spec Clarifications</strong>

- Improve readability and understanding of the state resolution algorithms. ([#1037](https://github.com/matrix-org/matrix-spec/issues/1037), [#1042](https://github.com/matrix-org/matrix-spec/issues/1042), [#1043](https://github.com/matrix-org/matrix-spec/issues/1043), [#1120](https://github.com/matrix-org/matrix-spec/issues/1120))
- Improve readability of the authorization rules. ([#1050](https://github.com/matrix-org/matrix-spec/issues/1050))
- For room versions 8, 9, and 10: clarify which homeserver is required to sign the join event. ([#1093](https://github.com/matrix-org/matrix-spec/issues/1093))
- Clarify that room versions 1 through 9 accept stringy power levels, as noted by [MSC3667](https://github.com/matrix-org/matrix-spec-proposals/pull/3667). ([#1099](https://github.com/matrix-org/matrix-spec/issues/1099))
- For all room versions: Add `m.federate` to the authorization rules, as originally intended. ([#1103](https://github.com/matrix-org/matrix-spec/issues/1103))
- For room versions 2 through 10: More explicitly define the mainline of a power event and the mainline ordering of other events. ([#1107](https://github.com/matrix-org/matrix-spec/issues/1107))
- For room versions 7, 8, 9, and 10: fix join membership authorization rules when `join_rule` is `knock`. ([#3737](https://github.com/matrix-org/matrix-spec-proposals/issues/3737))

### Appendices

No significant changes.
