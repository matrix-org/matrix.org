+++
title = "Matrix v1.7 release"
date = "2023-05-25T18:56:10Z"
path = "/blog/2023/05/25/matrix-v-1-7-release"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

[Matrix 1.7](https://spec.matrix.org/v1.7/) has just been released! The last spec release was [about 3 months ago](https://matrix.org/blog/2023/02/14/matrix-v-1-6-release), keeping us on track for regular quarterly releases. Unlike Matrix 1.6 though, today’s release is packed with plenty of features, some of which we’d like to call out here. Not all implementations will have support for these features yet though, and that’s okay (expected, even).

Adding support for a spec release can be a significant body of work. Instead of implementations having everything ready for spec release day, the idea is that they gain support over the next few months. If you’re able, please help those projects get v1.7’s features.

Today, we see 15 MSCs achieve their formally adopted status. All of them bring forward some much-needed features to Matrix, and a few highlights are below. Read on to the full changelog for a complete overview, and for a sneak peak at what the Spec Core Team (SCT) is planning to look at for v1.8 👀

<!-- more -->

## 🖼️ Finally, improvements to media in Matrix

The media repo has been largely unchanged since it was first released in 2015 as [r0.0.0](https://spec.matrix.org/historical/r0.0.0/client_server.html#id25) - the only change being the addition of URL previews in [r0.3.0](https://spec.matrix.org/historical/client_server/r0.3.0.html#id67) (released in 2017). Thankfully, the folks over at [Beeper](https://www.beeper.com/) have been busy changing this situation!

[MSC3860](https://github.com/matrix-org/matrix-spec-proposals/pull/3860) and [MSC2246](https://github.com/matrix-org/matrix-spec-proposals/pull/2246) are both available as of today in the spec, improving how much bandwidth media repos need to offer and fixing a long-standing issue where uploading large files can be a challenge. MSC3860, specified [here](https://spec.matrix.org/v1.7/client-server-api/#get_matrixmediav3downloadservernamemediaid) as `allow_redirect`, allows clients to opt-in to HTTP redirects on downloads, avoiding slowdowns from the server having to proxy and move the media twice. It’s particularly useful if your server uses a CDN like S3 to host media - just tell clients to go grab media directly from S3 instead.

Meanwhile, MSC2246 (largely specified [here](https://spec.matrix.org/v1.7/client-server-api/#post_matrixmediav1create)) gives clients an ability to upload their media after sending the associated event. The MSC was originally designed with bridges in mind, where message order and delays are very perceivable problems for users, however clients like Element X are thinking about using the feature to improve local echo on uploads as well. We’re excited to see uploads finally be reliable, and non-blocking for the conversation flow!

History would indicate that we’ve got several years to go before the next major improvement to media, but we’re looking to change that: [MSC3916: Authentication for media](https://github.com/matrix-org/matrix-spec-proposals/pull/3916), [MSC4016: Streaming E2EE file transfers](https://github.com/matrix-org/matrix-spec-proposals/pull/4016), and [MSC3870: Upload direct to URL](https://github.com/matrix-org/matrix-spec-proposals/pull/3870) are all fairly promising MSCs we’re planning to take a look at in the next year or so.

## 💖 Reactions are here

Reactions have actually been in use for quite some time already, but the MSC struggled to make it into the spec formally. With Matrix 1.7 though, [MSC2677](https://github.com/matrix-org/matrix-spec-proposals/pull/2677) is [merged](https://spec.matrix.org/v1.7/client-server-api/#event-annotations-and-reactions).

MSC2677 was the last part of the [MSC1849](https://github.com/matrix-org/matrix-spec-proposals/pull/1849) saga, with [MSC2674](https://github.com/matrix-org/matrix-spec-proposals/pull/2674) (relationships) and [MSC2675](https://github.com/matrix-org/matrix-spec-proposals/pull/2675) (server-side aggregation) landing in Matrix 1.3, and [MSC2676](https://github.com/matrix-org/matrix-spec-proposals/pull/2676) (edits) landing in Matrix 1.4 back in September 2022. There’s still some work to be done in this area though, and certainly some quality of life improvements asking to be written up as MSCs - watch this space for progress on those fronts.

## 🎉 Achievement: First MSC merged

One of the best parts about writing an MSC is eventually seeing it released in the spec, and these folks saw their MSCs reach this milestone for the first time. Congratulations everyone, and please keep them coming!

In no particular order:

* [benkuly](https://github.com/benkuly) with [MSC3925](https://github.com/matrix-org/matrix-spec-proposals/pull/3925) (their first ever MSC!).
* [Fizzadar](https://github.com/Fizzadar) with [MSC3758](https://github.com/matrix-org/matrix-spec-proposals/pull/3758) and [MSC3860](https://github.com/matrix-org/matrix-spec-proposals/pull/3860).
* [hughns](https://github.com/hughns) with [MSC3970](https://github.com/matrix-org/matrix-spec-proposals/pull/3970) and [MSC3882](https://github.com/matrix-org/matrix-spec-proposals/pull/3882).
* [Johennes](https://github.com/Johennes) with [MSC3873](https://github.com/matrix-org/matrix-spec-proposals/pull/3873).

Anyone can contribute MSCs, improving the whole of Matrix for everyone. If you have an idea (or bugfix), check out the [guidelines](https://github.com/matrix-org/matrix-spec-proposals#matrix-specification-proposals) and let us know if you run into any questions in [#matrix-spec:matrix.org](https://matrix.to/#/#matrix-spec:matrix.org) on Matrix - we’re always happy to help.

## 🔜 Early considerations for Matrix 1.8

The SCT aims to cut a release in the middle of each calendar quarter, largely to avoid most conflicts with regional holidays, and since Matrix 1.1 the releases have been getting less and less organic. Instead of looking at MSCs whenever they’re raised, the SCT has been aiming to hear about which MSCs will need looking at. This is a very subtle difference, but one that dramatically changes how the quarterly releases are structured.

With each spec release, the SCT has slowly been working towards a place where the majority of MSC work is thought about in advance, and Matrix 1.8 is another milestone along this journey. Over the next couple weeks we’ll be working on a roadmap based on the MSCs that are raised to us in the [SCT Office room](https://matrix.to/#/#sct-office:matrix.org) on Matrix, starting with the ideas we raised ourselves earlier in the year.

As of writing, our current plan for Matrix 1.8 includes:

* Further work on adopting OIDC (namely progress on [MSC3824](https://github.com/matrix-org/matrix-spec-proposals/pull/3824), [MSC2965](https://github.com/matrix-org/matrix-spec-proposals/pull/2965), and other similar proposals).
* Pushing the [MSC3995](https://github.com/matrix-org/matrix-spec-proposals/pull/3995) suite of MSCs towards acceptance/merge status.
* Continuing the improvements of VoIP (MatrixRTC) as we work towards [Matrix 2.0](https://fosdem.org/2023/schedule/event/matrix20/).
* Various improvements to event relationships, such as [MSC3981](https://github.com/matrix-org/matrix-spec-proposals/pull/3981), and push in general, such as [MSC3958](https://github.com/matrix-org/matrix-spec-proposals/pull/3958) and [MSC3391](https://github.com/matrix-org/matrix-spec-proposals/pull/3391).

While this doesn’t represent a commitment to have these MSCs merged, these are the areas that the SCT is likely to be thinking about for the next 3ish months. If you have MSCs that might be possible to merge before roughly August, let us know in the [SCT Office room](https://matrix.to/#/#sct-office:matrix.org) (even if those MSCs aren’t on-theme with the above - we still want to hear about them!).

Critically, our release planning does not just include MSCs that are on track for being merged. We are also aiming to track that a given MSC needs technical review (for example), or that it might be receiving attention external to the SCT (such as implementation). We’d love to hear what you’re working on so we can start bringing those MSCs to the top of the list - let us know in the [SCT Office room](https://matrix.to/#/#sct-office:matrix.org).

As is the theme for this section, if you have any questions about what the release process looks like (or where a given MSC currently sits in the roadmap), let us know in the [SCT Office room](https://matrix.to/#/#sct-office:matrix.org).

## The full changelog

There’s so many more things than what we covered in this blog post - flip through the changelog below for a full idea of what’s landed. Special thanks to [MichaelKohler](https://github.com/MichaelKohler), [zecakeh](https://github.com/zecakeh), and [Cadair](https://github.com/Cadair) for contributing clarification & bug fix PRs in this release - we greatly appreciate it!

<!-- Intentionally blank line to ensure headers work in the concatenated changelog -->
### Client-Server API

<strong>New Endpoints</strong>

* [`POST /_matrix/media/v1/create`](/client-server-api/#post_matrixmediav1create) ([#1499](https://github.com/matrix-org/matrix-spec/issues/1499))
* [`PUT /_matrix/media/v3/upload/{serverName}/{mediaId}`](/client-server-api/#put_matrixmediav3uploadservernamemediaid) ([#1499](https://github.com/matrix-org/matrix-spec/issues/1499))
* [`POST /_matrix/client/v1/login/get_token`](/client-server-api/#post_matrixclientv1loginget_token) ([#1530](https://github.com/matrix-org/matrix-spec/issues/1530))

<strong>Backwards Compatible Changes</strong>

* Changes to the server-side aggregation of `m.replace` (edit) events, as per [MSC3925](https://github.com/matrix-org/matrix-spec-proposals/pull/3925). ([#1440](https://github.com/matrix-org/matrix-spec/issues/1440), [#1525](https://github.com/matrix-org/matrix-spec/issues/1525))
* Add new push rule conditions `event_property_is` and `event_property_contains`, as per [MSC3758](https://github.com/matrix-org/matrix-spec-proposals/pull/3758) and [MSC3966](https://github.com/matrix-org/matrix-spec-proposals/pull/3966). ([#1464](https://github.com/matrix-org/matrix-spec/issues/1464))
* Add `m.annotation` relations (reactions), as per [MSC2677](https://github.com/matrix-org/matrix-spec-proposals/pull/2677). ([#1475](https://github.com/matrix-org/matrix-spec/issues/1475), [#1531](https://github.com/matrix-org/matrix-spec/issues/1531))
* Support asynchronous media uploads, as per [MSC2246](https://github.com/matrix-org/matrix-spec-proposals/pull/2246). ([#1499](https://github.com/matrix-org/matrix-spec/issues/1499), [#1510](https://github.com/matrix-org/matrix-spec/issues/1510))
* Document the `m.mentions` property; the `.m.rule.is_user_mention` and `.m.rule.is_room_mention` push rules; and other notification behaviour, as per [MSC3952](https://github.com/matrix-org/matrix-spec-proposals/pull/3952). ([#1508](https://github.com/matrix-org/matrix-spec/issues/1508))
* Improve VoIP signaling, as per [MSC2746](https://github.com/matrix-org/matrix-spec-proposals/pull/2746). ([#1511](https://github.com/matrix-org/matrix-spec/issues/1511), [#1540](https://github.com/matrix-org/matrix-spec/issues/1540))
* Update the scope of transaction IDs, as per [MSC3970](https://github.com/matrix-org/matrix-spec-proposals/pull/3970). ([#1526](https://github.com/matrix-org/matrix-spec/issues/1526))
* Add an ability to redirect media downloads, as per [MSC3860](https://github.com/matrix-org/matrix-spec-proposals/pull/3860). ([#1529](https://github.com/matrix-org/matrix-spec/issues/1529))
* Add an ability to use an existing session to log in another, as per [MSC3882](https://github.com/matrix-org/matrix-spec-proposals/pull/3882). ([#1530](https://github.com/matrix-org/matrix-spec/issues/1530))

<strong>Spec Clarifications</strong>

* Clarify the sections of the specification concerning aggregation of child events. ([#1424](https://github.com/matrix-org/matrix-spec/issues/1424))
* Fix various typos throughout the specification. ([#1432](https://github.com/matrix-org/matrix-spec/issues/1432), [#1442](https://github.com/matrix-org/matrix-spec/issues/1442), [#1447](https://github.com/matrix-org/matrix-spec/issues/1447), [#1455](https://github.com/matrix-org/matrix-spec/issues/1455), [#1465](https://github.com/matrix-org/matrix-spec/issues/1465), [#1500](https://github.com/matrix-org/matrix-spec/issues/1500), [#1509](https://github.com/matrix-org/matrix-spec/issues/1509))
* Clarify that reply chain fallback for threads might not be present. ([#1439](https://github.com/matrix-org/matrix-spec/issues/1439))
* Clarify what event property the content-specific push rules match against. ([#1441](https://github.com/matrix-org/matrix-spec/issues/1441))
* Clarify the semantics that make requests idempotent. ([#1449](https://github.com/matrix-org/matrix-spec/issues/1449))
* Improve documentation of how clients use push rules. ([#1461](https://github.com/matrix-org/matrix-spec/issues/1461))
* Clarify that servers should enforce a default `limit` on a filter if one is not specified. ([#1463](https://github.com/matrix-org/matrix-spec/issues/1463))
* Disambiguate using property names with dots in them during push rule processing, as per [MSC3873](https://github.com/matrix-org/matrix-spec-proposals/pull/3873) and [MSC3980](https://github.com/matrix-org/matrix-spec-proposals/pull/3980). ([#1464](https://github.com/matrix-org/matrix-spec/issues/1464))
* Fix phrasing & typography in the registration endpoint description. Contributed by @HarHarLinks. ([#1474](https://github.com/matrix-org/matrix-spec/issues/1474))
* Remove outdated text saying that `state_default` is 0 if there is no `m.room.power_levels` event in a room. ([#1479](https://github.com/matrix-org/matrix-spec/issues/1479))
* Remove fictitious `token` parameter on `/keys/query` endpoint. ([#1485](https://github.com/matrix-org/matrix-spec/issues/1485))
* Fix rendering of properties with a list of types. ([#1487](https://github.com/matrix-org/matrix-spec/issues/1487))
* Clarify parts of the cross-signing signature upload request. ([#1495](https://github.com/matrix-org/matrix-spec/issues/1495))
* Remove the `dont_notify` and `coalesce` push rule actions, as per [MSC3987](https://github.com/matrix-org/matrix-spec-proposals/pull/3987). ([#1501](https://github.com/matrix-org/matrix-spec/issues/1501))
* Clarify `m.location` scheme by partially reverting [f1f32d3](https://github.com/matrix-org/matrix-spec/commit/f1f32d3a15c325ee8aa9d2c6bafd96c38069bb53). Contributed by @HarHarLinks. ([#1507](https://github.com/matrix-org/matrix-spec/issues/1507))
* Add missing `knock_restricted` join rule to the `m.room.join_rules` schema. ([#1535](https://github.com/matrix-org/matrix-spec/issues/1535))

### Server-Server API

<strong>Spec Clarifications</strong>

* Fix various typos throughout the specification. ([#1431](https://github.com/matrix-org/matrix-spec/issues/1431), [#1447](https://github.com/matrix-org/matrix-spec/issues/1447), [#1466](https://github.com/matrix-org/matrix-spec/issues/1466), [#1518](https://github.com/matrix-org/matrix-spec/issues/1518))
* Fix PDU examples by removing invalid OpenAPI reference to `examples/minimal_pdu.json`. ([#1454](https://github.com/matrix-org/matrix-spec/issues/1454))
* Remove leftover `{key_id}` from `/_matrix/key/v2/server/`. ([#1473](https://github.com/matrix-org/matrix-spec/issues/1473))
* Remove extraneous `age_ts` field from the reference hash calculation section. ([#1536](https://github.com/matrix-org/matrix-spec/issues/1536))

### Application Service API

<strong>New Endpoints</strong>

* [`POST /_matrix/app/v1/ping`](/application-service-api/#post_matrixappv1ping) ([#1516](https://github.com/matrix-org/matrix-spec/issues/1516))
* [`POST /_matrix/client/v1/appservice/{appserviceId}/ping`](/application-service-api/#post_matrixclientv1appserviceappserviceidping) ([#1516](https://github.com/matrix-org/matrix-spec/issues/1516))

<strong>Backwards Compatible Changes</strong>

* Add homeserver->appservice ping mechanism, as per [MSC2659](https://github.com/matrix-org/matrix-spec-proposals/pull/2659). Contributed by @tulir at @beeper. ([#1516](https://github.com/matrix-org/matrix-spec/issues/1516), [#1541](https://github.com/matrix-org/matrix-spec/issues/1541))

<strong>Spec Clarifications</strong>

* Fix various typos throughout the specification. ([#1447](https://github.com/matrix-org/matrix-spec/issues/1447))

### Identity Service API

<strong>Spec Clarifications</strong>

* Corrections to the response format of `/_matrix/identity/v2/store-invite`. ([#1486](https://github.com/matrix-org/matrix-spec/issues/1486))

### Push Gateway API

No significant changes.

### Room Versions

<strong>Spec Clarifications</strong>

* Clarifications of event ID formats in early room versions ([#1484](https://github.com/matrix-org/matrix-spec/issues/1484))

### Appendices

<strong>Spec Clarifications</strong>

* Clarify that the term "Canonical JSON" is a specific thing within the Matrix specification. ([#1468](https://github.com/matrix-org/matrix-spec/issues/1468))
* Remove references to groups. ([#1483](https://github.com/matrix-org/matrix-spec/issues/1483))
* Clarifications of event ID formats in early room versions. ([#1484](https://github.com/matrix-org/matrix-spec/issues/1484))

### Internal Changes/Tooling

<strong>Spec Clarifications</strong>

* Update references to Inter font. ([#1444](https://github.com/matrix-org/matrix-spec/issues/1444))
* Endpoint disclosures now hide everything but the URL. ([#1446](https://github.com/matrix-org/matrix-spec/issues/1446))
* Wrap $ref in allOf where other attributes are present, to improve OpenAPI compliance. ([#1457](https://github.com/matrix-org/matrix-spec/issues/1457))
* Minor cleanups to the GitHub Actions workflows ([#1476](https://github.com/matrix-org/matrix-spec/issues/1476))
* Fix generation of anchors for additional properties. ([#1488](https://github.com/matrix-org/matrix-spec/issues/1488))
* Fix various typos throughout the specification. ([#1534](https://github.com/matrix-org/matrix-spec/issues/1534))
* Document more of the spec release timeline/process. ([#1538](https://github.com/matrix-org/matrix-spec/issues/1538))
