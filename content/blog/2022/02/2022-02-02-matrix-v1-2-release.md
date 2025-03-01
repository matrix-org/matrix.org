+++
title = "Matrix v1.2 release"
date = "2022-02-02T18:57:31Z"
path = "/blog/2022/02/02/matrix-v-1-2-release"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

Welcome to the second installment of our quarterly spec releases. If it feels like it hasn’t been long since our last release, you’re not alone! Our [last release](https://matrix.org/blog/2021/11/09/matrix-v-1-1-release) was just 3 months ago, introducing the new platform and world we build within.

This improvement in speed might seem _too_ fast, but fret not: implementations are not expected to update as soon as the new spec is published. Rather, it is more realistic to expect that the ecosystem gradually update over the course of the following few months/year. Particularly after the massive release that was v1.1.

So, what’s new in v1.2? With 18 MSCs merged there’s a lot to cover - we’ve picked some notable highlights and recommend the full changelog at the bottom for a complete idea of what’s been going on.

## Rearchitecting with Spaces

Spaces launched into beta [last May](https://matrix.org/blog/2021/05/17/the-matrix-space-beta), redefining how we can use rooms on Matrix to represent different data structures. Described mostly as [MSC1772](https://github.com/matrix-org/matrix-doc/pull/1772), Spaces are simply rooms with a specific [type in their m.room.create event](https://spec.matrix.org/v1.2/client-server-api/#rooms-1). With state events being used to define which other rooms (meaning Spaces too) are part of that Space, the possibilities for tree-like structured data become endless.

There’s still quite a lot of work to do in the Spaces space (hah), though we’re excited to see it all land. For instance, [MSC3216](https://github.com/matrix-org/matrix-doc/pull/3216) and [MSC2962](https://github.com/matrix-org/matrix-doc/pull/2962) target power level syncing, [MSC3219](https://github.com/matrix-org/matrix-doc/pull/3219) aims for flair, and [MSC3089](https://github.com/matrix-org/matrix-doc/pull/3089) looks at file structures using Spaces. We might even be able to replace the public room directory with a server-wide space, making writing clients a little bit easier.

## Public, but not _too_ public, join rules

[Restricted rooms](https://spec.matrix.org/v1.2/client-server-api/#restricted-rooms) are new in this release from [MSC3083](https://github.com/matrix-org/matrix-doc/pull/3083). In these rooms (_and therefore Spaces too!_), the join rules can be configured such that a member of another room can join without needing an invite. In a typical setup, this means that a Space could be set as invite-only, but all the rooms and Spaces underneath that Space could allow joins for members of the parent Space. When someone wishes to explore the universe you’ve laid out in your Space they can simply join the interesting rooms without having to ask for invites _constantly_.

This feature changes how membership events are authorized, so is only available in room versions 8 and 9 (both introduced in this release). Room version 9 fixes a relatively rare bug from version 8, so we’d recommend using v9 if you’re planning an upgrade for this functionality.

Further work in this area involves figuring out how to keep membership lists perfectly in sync between the rooms, which is currently done by external tooling. For example, evicting someone from the parent Space could (optionally) evict the user from all the subsequent rooms and Spaces too.

We also need to figure out how to support both knocking and restricted rooms at the same time (oops). [MSC3613](https://github.com/matrix-org/matrix-doc/pull/3613) and [MSC3386](https://github.com/matrix-org/matrix-doc/pull/3386) both tackle this problem in different ways and timescales.

## Matrix: A URI

A massive shoutout goes to kitsune and the whole community for working on [MSC2312](https://github.com/matrix-org/matrix-doc/pull/2312), giving us a URI we can pass around outside of Matrix to bring us back in. The early work on this [dates all the way back to 2014](https://github.com/matrix-org/matrix-doc/issues/455), the very beginning of Matrix’s development, and has since been [marked Provisional](https://www.iana.org/assignments/uri-schemes/prov/matrix) by the IANA.

The full spec is available [here](https://spec.matrix.org/v1.2/appendices/#uris) - feel free to discuss it at [matrix:r/matrix-spec:matrix.org](matrix:r/matrix-spec:matrix.org) ;)

## The full changelog

MSCs are how the spec changes in the way it does - adding, fixing, and maintaining features for the whole ecosystem to use. The blog post can’t cover them all, but that doesn’t make them any less important! Check out the full changelog below, and the [Spec Change Proposals](https://spec.matrix.org/unstable/proposals/) page for more information on how these MSCs got merged (hint: they submitted a proposal, which anyone can do - take a look at the [Matrix Live episode](https://www.youtube.com/watch?v=SFkZz60RRfc) where Matthew covers the proposal process).

### Client-Server API

<strong>Breaking Changes</strong>

- The `prev_content` field is now returned inside the `unsigned` property of events, rather than at the top level, as per [MSC3442](https://github.com/matrix-org/matrix-doc/pull/3442). ([#3524](https://github.com/matrix-org/matrix-doc/issues/3524))
- The `aliases` property from the chunks returned by `/publicRooms`, as per [MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432). ([#3624](https://github.com/matrix-org/matrix-doc/issues/3624))

<strong>New Endpoints</strong>

- Add the Space Hierarchy API (`GET /_matrix/client/v1/rooms/{roomId}/hierarchy`) as per [MSC2946](https://github.com/matrix-org/matrix-doc/pull/2946). ([#3610](https://github.com/matrix-org/matrix-doc/issues/3610))
- Add `/_matrix/client/v1/register/m.login.registration_token/validity` as per [MSC3231](https://github.com/matrix-org/matrix-doc/pull/3231). ([#3616](https://github.com/matrix-org/matrix-doc/issues/3616))

<strong>Backwards Compatible Changes</strong>

- Extend `/_matrix/client/r0/login` to accept a `m.login.appservice`, as per [MSC2778](https://github.com/matrix-org/matrix-doc/pull/2778). ([#3324](https://github.com/matrix-org/matrix-doc/issues/3324))
- Add support for `restricted` rooms as per [MSC3083](https://github.com/matrix-org/matrix-doc/pull/3083), [MSC3289](https://github.com/matrix-org/matrix-doc/pull/3289), and [MSC3375](https://github.com/matrix-org/matrix-doc/pull/3375). ([#3387](https://github.com/matrix-org/matrix-doc/issues/3387))
- Add `is_guest` to `/account/whoami` as per [MSC3069](https://github.com/matrix-org/matrix-doc/pull/3069). ([#3605](https://github.com/matrix-org/matrix-doc/issues/3605))
- Expand guest access to sending any room event and state event as per [MSC3419](https://github.com/matrix-org/matrix-doc/pull/3419). ([#3605](https://github.com/matrix-org/matrix-doc/issues/3605))
- Add Spaces and room types as per [MSC1772](https://github.com/matrix-org/matrix-doc/pull/1772) and [MSC2946](https://github.com/matrix-org/matrix-doc/pull/2946). ([#3610](https://github.com/matrix-org/matrix-doc/issues/3610))
- Add new `m.set_displayname`, `m.set_avatar_url`, and `m.3pid_changes` capabilities as per [MSC3283](https://github.com/matrix-org/matrix-doc/pull/3283). ([#3614](https://github.com/matrix-org/matrix-doc/issues/3614))
- Add support for fallback keys (optional keys used once one-time keys run out), as per [MSC2732](https://github.com/matrix-org/matrix-doc/pull/2732). ([#3615](https://github.com/matrix-org/matrix-doc/issues/3615))
- Add token-authenticated registration support as per [MSC3231](https://github.com/matrix-org/matrix-doc/pull/3231). ([#3616](https://github.com/matrix-org/matrix-doc/issues/3616))

<strong>Spec Clarifications</strong>

- Make `AesHmacSha2KeyDescription` consistent with `KeyDescription` in marking `name` as optional. ([#3481](https://github.com/matrix-org/matrix-doc/issues/3481))
- Fix various typos throughout the specification. ([#3482](https://github.com/matrix-org/matrix-doc/issues/3482), [#3495](https://github.com/matrix-org/matrix-doc/issues/3495), [#3509](https://github.com/matrix-org/matrix-doc/issues/3509), [#3535](https://github.com/matrix-org/matrix-doc/issues/3535), [#3591](https://github.com/matrix-org/matrix-doc/issues/3591), [#3601](https://github.com/matrix-org/matrix-doc/issues/3601), [#3611](https://github.com/matrix-org/matrix-doc/issues/3611), [#3671](https://github.com/matrix-org/matrix-doc/issues/3671), [#3680](https://github.com/matrix-org/matrix-doc/issues/3680))
- Explicitly mention RFC5870 in the definition of `m.location` events ([#3492](https://github.com/matrix-org/matrix-doc/issues/3492))
- Add `403 M_FORBIDDEN` error code to `/profile/{userId}` as per [MSC3550](https://github.com/matrix-org/matrix-doc/pull/3550). ([#3530](https://github.com/matrix-org/matrix-doc/issues/3530))
- Clarify the description of the `/sync` API, including a fix to an ASCII art diagram. ([#3543](https://github.com/matrix-org/matrix-doc/issues/3543))
- Clarify that `base_url` in client `well_known` may or may not include trailing slash. ([#3562](https://github.com/matrix-org/matrix-doc/issues/3562))
- Clarify which signature to check when decrypting `m.olm.v1.curve25519-aes-sha2` messages. ([#3573](https://github.com/matrix-org/matrix-doc/issues/3573))
- Clarify what "Stripped State" is and what purpose it serves, as per [MSC3173](https://github.com/matrix-org/matrix-doc/pull/3173). ([#3606](https://github.com/matrix-org/matrix-doc/issues/3606))
- Clarify how to interpret missing one-time key counts. ([#3636](https://github.com/matrix-org/matrix-doc/issues/3636))
- Correct the schema for the responses  for various API endpoints. ([#3650](https://github.com/matrix-org/matrix-doc/issues/3650))
- Clarify that group mentions are no longer in the specification. ([#3652](https://github.com/matrix-org/matrix-doc/issues/3652))
- Distinguish between "federation" event format as exchanged by the Federation API, and the "client" event formats as used in the client-server and AS APIs. ([#3658](https://github.com/matrix-org/matrix-doc/issues/3658))
- Fix the rendering of the responses for various API endpoints. ([#3674](https://github.com/matrix-org/matrix-doc/issues/3674))

### Server-Server API

<strong>New Endpoints</strong>

- Add the Space Hierarchy API (`GET /_matrix/federation/v1/hierarchy/{roomId}`) as per [MSC2946](https://github.com/matrix-org/matrix-doc/pull/2946). ([#3610](https://github.com/matrix-org/matrix-doc/issues/3610), [#3660](https://github.com/matrix-org/matrix-doc/issues/3660))

<strong>Backwards Compatible Changes</strong>

- Add support for `restricted` rooms as per [MSC3083](https://github.com/matrix-org/matrix-doc/pull/3083), [MSC3289](https://github.com/matrix-org/matrix-doc/pull/3289), and [MSC3375](https://github.com/matrix-org/matrix-doc/pull/3375). ([#3387](https://github.com/matrix-org/matrix-doc/issues/3387))

<strong>Spec Clarifications</strong>

- Fix various typos throughout the specification. ([#3527](https://github.com/matrix-org/matrix-doc/issues/3527))
- Clarify that `GET /_matrix/federation/v1/event_auth/{roomId}/{eventId}` does _not_ return the auth chain for the full state of the room. ([#3583](https://github.com/matrix-org/matrix-doc/issues/3583))
- Fix the rendering of the responses for various API endpoints. ([#3674](https://github.com/matrix-org/matrix-doc/issues/3674))

### Application Service API

<strong>Spec Clarifications</strong>

- Distinguish between "federation" event format as exchanged by the Federation API, and the "client" event formats as used in the client-server and AS APIs. ([#3658](https://github.com/matrix-org/matrix-doc/issues/3658))
- Fix the rendering of the responses for various API endpoints. ([#3674](https://github.com/matrix-org/matrix-doc/issues/3674))
- Correct the documentation for the response value for `GET /_matrix/app/v1/thirdparty/protocol/{protocol}`. ([#3675](https://github.com/matrix-org/matrix-doc/issues/3675))

### Identity Service API

<strong>Backwards Compatible Changes</strong>

- Add the `room_type` to stored invites as per [MSC3288](https://github.com/matrix-org/matrix-doc/pull/3288). ([#3610](https://github.com/matrix-org/matrix-doc/issues/3610))

<strong>Spec Clarifications</strong>

- Fix the rendering of the responses for various API endpoints. ([#3674](https://github.com/matrix-org/matrix-doc/issues/3674))

### Push Gateway API

<strong>Spec Clarifications</strong>

- Fix the rendering of the responses for various API endpoints. ([#3674](https://github.com/matrix-org/matrix-doc/issues/3674))

### Room Versions

<strong>Backwards Compatible Changes</strong>

- Add Room Version 8 as per [MSC3289](https://github.com/matrix-org/matrix-doc/pull/3289). ([#3387](https://github.com/matrix-org/matrix-doc/issues/3387))
- Add Room Version 9 as per [MSC3375](https://github.com/matrix-org/matrix-doc/pull/3375). ([#3387](https://github.com/matrix-org/matrix-doc/issues/3387))

<strong>Spec Clarifications</strong>

- Fully specify room versions to indicate what exactly is carried over from parent versions. ([#3432](https://github.com/matrix-org/matrix-doc/issues/3432), [#3661](https://github.com/matrix-org/matrix-doc/issues/3661))
- Clarifications to sections on event IDs and event formats. ([#3501](https://github.com/matrix-org/matrix-doc/issues/3501))
- Remove a number of fields which were incorrectly shown to form part of the `unsigned` data of a Federation PDU. ([#3522](https://github.com/matrix-org/matrix-doc/issues/3522))
- Fix heading order of room version specifications to be consistent. ([#3683](https://github.com/matrix-org/matrix-doc/issues/3683))
- Add missing "Signing key validity period" section to room version 6. ([#3683](https://github.com/matrix-org/matrix-doc/issues/3683))
- Fix auth rules to allow membership of `knock` -> `leave` in v7, v8, and v9. ([#3694](https://github.com/matrix-org/matrix-doc/issues/3694))

### Appendices

<strong>Backwards Compatible Changes</strong>

- Describe "Common Namespaced Identifier Grammar" as per [MSC2758](https://github.com/matrix-org/matrix-doc/pull/2758). ([#3171](https://github.com/matrix-org/matrix-doc/issues/3171))
- Describe the `matrix:` URI scheme as per [MSC2312](https://github.com/matrix-org/matrix-doc/pull/2312). ([#3608](https://github.com/matrix-org/matrix-doc/issues/3608))
