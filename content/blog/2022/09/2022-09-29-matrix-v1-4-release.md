+++
title = "Matrix v1.4 release"
date = "2022-09-29T15:30:32Z"
path = "/blog/2022/09/29/matrix-v-1-4-release"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

It’s finally here: <a href="https://spec.matrix.org/v1.4/client-server-api/#threading">threads</a>, <a href="https://spec.matrix.org/v1.4/client-server-api/#event-replacements">edits</a>, and <a href="https://spec.matrix.org/v1.4/client-server-api/#private-read-receipts">private read receipts</a>. v1.4 has been a little later than usual in the quarter because we wanted to make sure we nailed down all the core MSCs for threads before publishing the spec itself, but we’ve done that now and we’re excited about it.

<!-- more -->

Matrix 1.3 was <a href="https://matrix.org/blog/2022/06/16/matrix-v-1-3-release">just over 3 months ago</a>, though with the relatively large features there and the colossal implementation effort of v1.4 we’re not expecting everyone to have implementations on day 1. Instead, as with all spec releases, we encourage implementations to gradually update over the next few months. We’re additionally planning to make v1.5 (Q4 2022) more of a maintenance update to help make the backlog a bit easier on everyone, though we might prioritize a couple cool features in there too :)

Matrix 1.4 sees 14 MSCs get merged, but we can’t possibly go into detail on them all here. We’ve instead focused on the 3 major features we’re excited about - check out the changelog at the end for the full picture.

## 🧵 Threads

<a href="https://spec.matrix.org/v1.4/client-server-api/#threading">Threads</a>, a critical feature in terms of parity with other chat systems, have landed thanks to a whopping 6 MSCs: <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3440">MSC3440</a>, <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3816">MSC3816</a>, <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3856">MSC3856</a>, <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3715">MSC3715</a>, <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3771">MSC3771</a>, and <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3773">MSC3773</a>. It’s been a lot of iteration on the reference implementations to get threads this far, and we’re excited to see how the client implementations evolve to provide more structured and less noisy communication for everyone - keep us updated with <a href="https://matrix.org/blog/category/this-week-in-matrix">TWIM</a> posts, please!

Threads have involved changes to event relationships (which were <a href="https://matrix.org/blog/2022/06/16/matrix-v-1-3-release#aggregations-and-the-relationships-made-along-the-way">fixed in v1.3</a>), read receipts, and notification counts, resulting in several different models and ways of solving the problem. We think we’ve reached a point that works for conversational threads, though there’s work on the horizon for threads-only rooms, Twitter-style free-form threads, etc to cover more needs of users.

Currently, the demonstration implementation of threads in Synapse and Element is working its way out of the proof-of-concept and beta stages (which were sufficient to validate the MSCs) and are on their way to exiting beta. Keep an eye on the respective blogs for news about production-ready threads!

## 📝 Edits

Similar to reactions, err, <em><a href="https://matrix.org/blog/2022/06/16/matrix-v-1-3-release#aggregations-and-the-relationships-made-along-the-way">aggregations</a></em>, <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/2676">MSC2676</a> and its predecessors have been around for a long while. Edits have existed in the Element clients seemingly forever, and other clients have had troubles trying to implement the same feature: with it now in the spec, it should be a lot easier to bring edits into clients.

For edits, we’ve taken the route of making the MSC match reality, for better or worse. MSCs which improve or add functionality to the system are very much welcome - <a href="https://spec.matrix.org/proposals/">writing an MSC</a> is relatively easy and helps the whole community.

## 👥 Private read receipts

Not everyone wants to broadcast that they’ve read a message, but also with read receipts tied into notifications those same people also probably don’t want stuck notifications. To address the problem, we’ve added a new <a href="https://spec.matrix.org/v1.4/client-server-api/#private-read-receipts">m.read.private receipt type</a> which behaves exactly like m.read, but is only visible to you.

We still have a rework of the notifications system in our long-term plan, but this should hopefully cover the privacy concerns for the time being :)

## The full changelog

MSCs are how the spec changes in the way it does - adding, fixing, and maintaining features for the whole ecosystem to use. The blog post can’t cover them all, but that doesn’t make them any less important! Check out the full changelog below, and the <a href="https://spec.matrix.org/proposals/">Spec Change Proposals</a> page for more information on how these MSCs got merged (hint: they submitted a proposal, which anyone can do - take a look at the <a href="https://www.youtube.com/watch?v=SFkZz60RRfc">Matrix Live episode</a> where Matthew covers the proposal process).

### Client-Server API

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Removed Endpoints**

- Remove unused policy room sharing mechanism, as per [MSC3844](https://github.com/matrix-org/matrix-spec-proposals/pull/3844). ([#1196](https://github.com/matrix-org/matrix-spec/issues/1196))

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Backwards Compatible Changes**

- Add a `.m.rule.room.server_acl` push rule to match `m.room.server_acl` events, as per [MSC3786](https://github.com/matrix-org/matrix-spec-proposals/pull/3786). ([#1190](https://github.com/matrix-org/matrix-spec/issues/1190), [#1201](https://github.com/matrix-org/matrix-spec/issues/1201))
- Add `Cross-Origin-Resource-Policy` (CORP) headers to media repository, as per [MSC3828](https://github.com/matrix-org/matrix-spec-proposals/pull/3828). ([#1197](https://github.com/matrix-org/matrix-spec/issues/1197))
- Copy a room's `type` when upgrading it, as per [MSC3818](https://github.com/matrix-org/matrix-spec-proposals/pull/3818). ([#1198](https://github.com/matrix-org/matrix-spec/issues/1198))
- Add `room_types` filter and `room_type` response to `/publicRooms`, as per [MSC3827](https://github.com/matrix-org/matrix-spec-proposals/pull/3827). ([#1199](https://github.com/matrix-org/matrix-spec/issues/1199))
- Add `m.replace` relations (event edits), as per [MSC2676](https://github.com/matrix-org/matrix-spec-proposals/pull/2676). ([#1211](https://github.com/matrix-org/matrix-spec/issues/1211))
- Add `m.read.private` receipts, as per [MSC2285](https://github.com/matrix-org/matrix-spec-proposals/pull/2285). ([#1216](https://github.com/matrix-org/matrix-spec/issues/1216))
- Make `m.fully_read` optional on `/read_markers`, as per [MSC2285](https://github.com/matrix-org/matrix-spec-proposals/pull/2285). ([#1216](https://github.com/matrix-org/matrix-spec/issues/1216))
- Allow `m.fully_read` markers to be set from `/receipts`, as per [MSC2285](https://github.com/matrix-org/matrix-spec-proposals/pull/2285). ([#1216](https://github.com/matrix-org/matrix-spec/issues/1216))
- Add threading via `m.thread` relations, as per [MSC3440](https://github.com/matrix-org/matrix-spec-proposals/pull/3440), [MSC3816](https://github.com/matrix-org/matrix-spec-proposals/pull/3816), [MSC3856](https://github.com/matrix-org/matrix-spec-proposals/pull/3856), and [MSC3715](https://github.com/matrix-org/matrix-spec-proposals/pull/3715). ([#1254](https://github.com/matrix-org/matrix-spec/issues/1254))
- Add per-thread notifications and read receipts, as per [MSC3771](https://github.com/matrix-org/matrix-spec-proposals/pull/3771) and [MSC3773](https://github.com/matrix-org/matrix-spec-proposals/pull/3773). ([#1255](https://github.com/matrix-org/matrix-spec/issues/1255))

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Spec Clarifications**

- Mention that the `/rooms/{roomId}/invite` endpoint will return a 200 response if the user is already invited to the room. ([#1084](https://github.com/matrix-org/matrix-spec/issues/1084))
- Fix various typos throughout the specification. ([#1135](https://github.com/matrix-org/matrix-spec/issues/1135), [#1161](https://github.com/matrix-org/matrix-spec/issues/1161), [#1164](https://github.com/matrix-org/matrix-spec/issues/1164), [#1170](https://github.com/matrix-org/matrix-spec/issues/1170), [#1180](https://github.com/matrix-org/matrix-spec/issues/1180), [#1215](https://github.com/matrix-org/matrix-spec/issues/1215), [#1238](https://github.com/matrix-org/matrix-spec/issues/1238), [#1243](https://github.com/matrix-org/matrix-spec/issues/1243))
- Describe return codes for account data endpoints, and clarify that per-room data does not inherit from the global data. ([#1155](https://github.com/matrix-org/matrix-spec/issues/1155))
- Clarify that policy rule globs work like ACL globs. Contributed by Nico. ([#1165](https://github.com/matrix-org/matrix-spec/issues/1165))
- Clarify the format of some structures in the End-to-end encryption module. ([#1166](https://github.com/matrix-org/matrix-spec/issues/1166))
- Add HTML anchors for object definitions in the formatted specification. ([#1174](https://github.com/matrix-org/matrix-spec/issues/1174))
- Tweak the styling of `<code>` snippets in tables rendered from OpenAPI definitions. ([#1179](https://github.com/matrix-org/matrix-spec/issues/1179))
- Update "API Standards" section to clarify how JSON is used. ([#1185](https://github.com/matrix-org/matrix-spec/issues/1185))
- Clarify that the "device_id", "user_id" and "access_token" fields are required in the response body of `POST /_matrix/client/v3/login`. ([#1210](https://github.com/matrix-org/matrix-spec/issues/1210))
- Reinforce the relationship of refreshed access tokens to transaction IDs. ([#1236](https://github.com/matrix-org/matrix-spec/issues/1236))
- Clarify enum values by separating possible values with commas. ([#1240](https://github.com/matrix-org/matrix-spec/issues/1240))

### Server-Server API

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Backwards Compatible Changes**

- Add per-thread notifications and read receipts, as per [MSC3771](https://github.com/matrix-org/matrix-spec-proposals/pull/3771) and [MSC3773](https://github.com/matrix-org/matrix-spec-proposals/pull/3773). ([#1255](https://github.com/matrix-org/matrix-spec/issues/1255))

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Spec Clarifications**

- Add HTML anchors for object definitions in the formatted specification. ([#1174](https://github.com/matrix-org/matrix-spec/issues/1174))
- Tweak the styling of `<code>` snippets in tables rendered from OpenAPI definitions. ([#1179](https://github.com/matrix-org/matrix-spec/issues/1179))
- Update "API Standards" section to clarify how JSON is used. ([#1185](https://github.com/matrix-org/matrix-spec/issues/1185))

### Application Service API

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Breaking Changes**

- Replace homeserver authorization approach with an `Authorization` header instead of `access_token` when talking to the application service, as per [MSC2832](https://github.com/matrix-org/matrix-spec-proposals/pull/2832). ([#1200](https://github.com/matrix-org/matrix-spec/issues/1200))

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Spec Clarifications**

- Add HTML anchors for object definitions in the formatted specification. ([#1174](https://github.com/matrix-org/matrix-spec/issues/1174))

### Identity Service API

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Spec Clarifications**

- Add HTML anchors for object definitions in the formatted specification. ([#1174](https://github.com/matrix-org/matrix-spec/issues/1174))
- Update "API Standards" section to clarify how JSON is used. ([#1185](https://github.com/matrix-org/matrix-spec/issues/1185))

### Push Gateway API

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Spec Clarifications**

- Add HTML anchors for object definitions in the formatted specification. ([#1174](https://github.com/matrix-org/matrix-spec/issues/1174))

### Room Versions

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Spec Clarifications**

- For room versions 1 through 10, clarify that events with rejected `auth_events` must be rejected. ([#1137](https://github.com/matrix-org/matrix-spec/issues/1137))
- For room versions 2–10: correct a mistaken clarification to the state resolution algorithm. ([#1158](https://github.com/matrix-org/matrix-spec/issues/1158))
- For room versions 7 through 10: Clarify that `invite->knock` is actually a legal transition. ([#1175](https://github.com/matrix-org/matrix-spec/issues/1175))

### Appendices

No significant changes.

### Internal Changes/Tooling

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Backwards Compatible Changes**

- Add internal changes changelog section. ([#1194](https://github.com/matrix-org/matrix-spec/issues/1194))

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Spec Clarifications**

- Render HTML anchors for object definition tables. ([#1191](https://github.com/matrix-org/matrix-spec/issues/1191))
- Give rendered-data sections a background and some padding. ([#1195](https://github.com/matrix-org/matrix-spec/issues/1195))
- Fix rendering of shortcodes within the client-server API. ([#1205](https://github.com/matrix-org/matrix-spec/issues/1205))
- Fix the spacing of mapping types generated from the OpenAPI spec. ([#1230](https://github.com/matrix-org/matrix-spec/issues/1230))
