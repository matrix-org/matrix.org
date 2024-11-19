+++
title = "Matrix v1.1 release"
date = "2021-11-09T21:28:29Z"
updated = "2021-11-09T16:06:10Z"
path = "/blog/2021/11/09/matrix-v1-1-release"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

Once again it's been [a little while](https://matrix.org/blog/2020/05/27/room-version-6-client-server-r-0-6-1-and-federation-r-0-1-4-spec-releases) since we've done a spec release (sorry; we're aiming for quarterly releases from here on out), but this time we have some pretty big news: we've got an [all-new spec platform](https://spec.matrix.org) and a new versioning scheme. The new spec platform has been needed for a long time to make better sense of what Matrix is, and as part of getting that out the door we reduced the number of "Matrix versions" to just one.

Huge thanks to Will Bamberg for building it out for us, anoa for working out the deployment details, and everyone for testing it all. They talk at length about what this specification even is and about the platform itself on [Matrix Live S6E19](https://www.youtube.com/watch?v=gsdMgXug7u8). It's the single greatest improvement to the spec we've seen to date.

The new versioning scheme presents the whole specification as a single document, making it easier to check compatibility between implementations and the spec itself. Previously, a grid would have to be drawn to show whether Server-Server r0.1.4 is compatible with Client-Server r0.6.1 - while obvious at release time, the historical context gets lost quite easily. Now, with a single version number, the entire specification is compatible across a single version number: servers implementing Matrix 1.1 will be compatible with clients implementing v1.1, and vice versa. For the specification itself, this means we no longer have to carefully point and update links between the APIs, as they'll instead be versioned together.

Changing the versioning of the specification does have an impact on the Client-Server API in particular, however. You may have noticed that Client-Server APIs are currently versioned at "r0". By removing rX.Y.Z versioning, all of the endpoints suddenly don't have a version to reference. All endpoints across the specification are now versioned individually to allow for breaking changes at the endpoint level. They no longer require the whole specification to be listed as a breaking change: a v1 endpoint can get additions/changes which are backwards compatible, but if we need to change format (for example) then it'll get bumped up to v2, leaving v1 in its last known state.

For the Client-Server API, a slight complication is that v1 and v2 (alpha) are already versions familiar to those that have been around for a while - to avoid confusing those people, existing Client-Server API endpoints will start at v3. New endpoints introduced after v1.1 will start at v1 instead.

It's been well over a year since the last release, which means there's a whole lot of features and changes to cover. Here we'll try to cover the things most clients/servers will have to worry about, but we do still recommend reading through the changelog included below. Overall, 28 MSCs have been merged through this release, but some have had to be excluded in the interest of getting the spec release out there. Many of them are expected to be in the next anticipated release (which should hopefully be next quarter).

## Clients: There's a lot of stuff

In Matrix 1.1, client developers get all sorts of new features to play with. Clients which support end-to-end encryption should explore **[key backups](https://spec.matrix.org/v1.1/client-server-api/#server-side-key-backups)**, **[cross-signing](https://spec.matrix.org/v1.1/client-server-api/#cross-signing)**, **[SSSS](https://spec.matrix.org/v1.1/client-server-api/#secrets)**, and **[breaking changes to verification](https://spec.matrix.org/v1.1/client-server-api/#key-verification-framework)**. Quite a lot of this stuff has existed for a while, but has made it into the specification formally now. As an added bonus, the emoji for SAS verification [have been translated](https://github.com/matrix-org/matrix-doc/tree/master/data-definitions) ([contribute here](https://translate.element.io/projects/matrix-doc/sas-emoji-v1/)).

Knocking has also landed in the spec (thanks Sorunome for leading the charge on this!), opening up the ability for rooms to optionally allow people to request invites to join. This can be helpful for semi-private rooms where it can be easier to approve/deny requests compared to finding someone's MXID and manually inviting them. This does require a [v7 room](https://spec.matrix.org/v1.1/rooms/v7/) to work, however.

Thanks again to Sorunome, [Message Spoilers](https://spec.matrix.org/v1.1/client-server-api/#spoiler-messages) have been officially included in Matrix. People can now safely discuss the ending to the latest movie without being banned for spoilers. Though, as a new feature, there's a chance that the spoiler text still gets included in the message: clients should update as soon as possible to avoid their users accidentally getting banned for spoiling the conclusion to the [Spaces saga](https://github.com/matrix-org/matrix-doc/pull/1772) ;)

There's a few other smaller improvements/additions, and of course the regular "various clarifications and bug fixes" to take a look at. For a sample checklist, check out [element-web's issue](https://github.com/vector-im/element-web/issues/16876) on the subject.

## Servers: Knock knock, it's a new room version

[Room version 7](https://spec.matrix.org/v1.1/rooms/v7/) has landed, bringing forth the ability for users to knock on rooms (requesting an invite to join). The changes are largely scoped to using the reserved keywords for join rules and membership, and are described through the auth rules. Thankfully, the changes over v6 are minimally invasive so should be quick to implement.

Additionally, the [cross-signing bits](https://spec.matrix.org/v1.1/server-server-api/#end-to-end-encryption) have been included in the API responses and EDU definitions. [Matthew's blog post](https://matrix.org/blog/2020/05/06/cross-signing-and-end-to-end-encryption-by-default-is-here) from last year (it really has been that long...) describes cross-signing and the history of its implementation.

As per usual, there's also various specification errors corrected to aid understanding. [Synapse has an exhaustive issue](https://github.com/matrix-org/synapse/issues/11079) to detail what servers might need to do.

*PS: Room versions 8 and 9 are also out there, but will be included in a future spec release.*

## The full changelog

We haven't mentioned identity servers, bridges, etc in this post but they have changes too! Below is the whole changelog, the entire year and a bit of it. Thank you to everyone who has submitted MSCs, and congratulations on getting them released. If we forgot yours, please mention it in [#matrix-spec:matrix.org](https://matrix.to/#/#matrix-spec:matrix.org) so we can apologize and correct.

PS: The MSC process is how changes to Matrix are made, and you (yes, you) can propose those changes too. Check out the [Matrix Live episode](https://www.youtube.com/watch?v=SFkZz60RRfc) where Matthew talks about how this process works, and how we avoid blocking clients from implementing their proposals behind the relatively slow spec release cycles.

### Client-Server API

<strong>Breaking Changes</strong>

- Document `curve25519-hkdf-sha256` key agreement method for SAS verification, and deprecate old method as per [MSC2630](https://github.com/matrix-org/matrix-doc/pull/2630). ([#2687](https://github.com/matrix-org/matrix-doc/issues/2687))
- Add `m.key.verification.ready` and `m.key.verification.done` to key verification framework as per [MSC2366](https://github.com/matrix-org/matrix-doc/pull/2366). ([#3139](https://github.com/matrix-org/matrix-doc/issues/3139))

<strong>Deprecations</strong>

- Deprecate starting verifications that don't start with `m.key.verification.request` as per [MSC3122](https://github.com/matrix-org/matrix-doc/pull/3122). ([#3199](https://github.com/matrix-org/matrix-doc/issues/3199))

<strong>New Endpoints</strong>

- Add key backup (`/room_keys/*`) endpoints as per [MSC1219](https://github.com/matrix-org/matrix-doc/pull/1219). ([#2387](https://github.com/matrix-org/matrix-doc/issues/2387), [#2639](https://github.com/matrix-org/matrix-doc/issues/2639))
- Add `POST /keys/device_signing/upload` and `POST /keys/signatures/upload` as per [MSC1756](https://github.com/matrix-org/matrix-doc/pull/1756). ([#2536](https://github.com/matrix-org/matrix-doc/issues/2536))
- Add `/knock` endpoint as per [MSC2403](https://github.com/matrix-org/matrix-doc/pull/2403). ([#3154](https://github.com/matrix-org/matrix-doc/issues/3154))
- Add `/login/sso/redirect/{idpId}` as per [MSC2858](https://github.com/matrix-org/matrix-doc/pull/2858). ([#3163](https://github.com/matrix-org/matrix-doc/issues/3163))

<strong>Removed Endpoints</strong>

- Remove unimplemented `m.login.oauth2` and `m.login.token` user-interactive authentication mechanisms as per [MSC2610](https://github.com/matrix-org/matrix-doc/pull/2610) and [MSC2611](https://github.com/matrix-org/matrix-doc/pull/2611). ([#2609](https://github.com/matrix-org/matrix-doc/issues/2609))

<strong>Backwards Compatible Changes</strong>

- Document how clients can advise recipients that it is withholding decryption keys as per [MSC2399](https://github.com/matrix-org/matrix-doc/pull/2399). ([#2399](https://github.com/matrix-org/matrix-doc/issues/2399))
- Add cross-signing properties to the response of `POST /keys/query` as per [MSC1756](https://github.com/matrix-org/matrix-doc/pull/1756). ([#2536](https://github.com/matrix-org/matrix-doc/issues/2536))
- Document Secure Secret Storage and Sharing as per [MSC1946](https://github.com/matrix-org/matrix-doc/pull/1946) and [MSC2472](https://github.com/matrix-org/matrix-doc/pull/2472). ([#2597](https://github.com/matrix-org/matrix-doc/issues/2597))
- Add a `device_id` parameter to login fallback as per [MSC2604](https://github.com/matrix-org/matrix-doc/pull/2604). ([#2709](https://github.com/matrix-org/matrix-doc/issues/2709))
- Added a common set of translations for SAS Emoji. ([#2728](https://github.com/matrix-org/matrix-doc/issues/2728))
- Added support for `reason` on all membership events and related endpoints as per [MSC2367](https://github.com/matrix-org/matrix-doc/pull/2367). ([#2795](https://github.com/matrix-org/matrix-doc/issues/2795))
- Add a 404 `M_NOT_FOUND` error to push rule endpoints as per [MSC2663](https://github.com/matrix-org/matrix-doc/pull/2663). ([#2796](https://github.com/matrix-org/matrix-doc/issues/2796))
- Make `reason` and `score` parameters optional in the content reporting API as per [MSC2414](https://github.com/matrix-org/matrix-doc/pull/2414). ([#2807](https://github.com/matrix-org/matrix-doc/issues/2807))
- Allow guests to get the list of members for a room as per [MSC2689](https://github.com/matrix-org/matrix-doc/pull/2689). ([#2808](https://github.com/matrix-org/matrix-doc/issues/2808))
- Add support for spoilers as per [MSC2010](https://github.com/matrix-org/matrix-doc/pull/2010) and [MSC2557](https://github.com/matrix-org/matrix-doc/pull/2557), and `color` attribute as per [MSC2422](https://github.com/matrix-org/matrix-doc/pull/2422). ([#3098](https://github.com/matrix-org/matrix-doc/issues/3098))
- Add `<details>` and `<summary>` to the suggested HTML subset as per [MSC2184](https://github.com/matrix-org/matrix-doc/pull/2184). ([#3100](https://github.com/matrix-org/matrix-doc/issues/3100))
- Add key verification using in-room messages as per [MSC2241](https://github.com/matrix-org/matrix-doc/pull/2241). ([#3139](https://github.com/matrix-org/matrix-doc/issues/3139), [#3150](https://github.com/matrix-org/matrix-doc/issues/3150))
- Add information about using SSSS for cross-signing and key backup. ([#3147](https://github.com/matrix-org/matrix-doc/issues/3147))
- Add key verification method using QR codes as per [MSC1544](https://github.com/matrix-org/matrix-doc/pull/1544). ([#3149](https://github.com/matrix-org/matrix-doc/issues/3149))
- Document how clients can simplify usage of Secure Secret Storage as per [MSC2874](https://github.com/matrix-org/matrix-doc/pull/2874). ([#3151](https://github.com/matrix-org/matrix-doc/issues/3151))
- Add support for knocking, as per [MSC2403](https://github.com/matrix-org/matrix-doc/pull/2403). ([#3154](https://github.com/matrix-org/matrix-doc/issues/3154), [#3254](https://github.com/matrix-org/matrix-doc/issues/3254))
- Multiple SSO providers are possible through `m.login.sso` as per [MSC2858](https://github.com/matrix-org/matrix-doc/pull/2858). ([#3163](https://github.com/matrix-org/matrix-doc/issues/3163))
- Add `device_id` to `/account/whoami` response as per [MSC2033](https://github.com/matrix-org/matrix-doc/pull/2033). ([#3166](https://github.com/matrix-org/matrix-doc/issues/3166))
- Downgrade identity server discovery failures to `FAIL_PROMPT` as per [MSC2284](https://github.com/matrix-org/matrix-doc/pull/2284). ([#3169](https://github.com/matrix-org/matrix-doc/issues/3169))
- Re-version all endpoints to be `v3` as a starting point instead of `r0` as per [MSC2844](https://github.com/matrix-org/matrix-doc/pull/2844). ([#3421](https://github.com/matrix-org/matrix-doc/issues/3421))

<strong>Spec Clarifications</strong>

- Fix issues with `age` and `unsigned` being shown in the wrong places. ([#2591](https://github.com/matrix-org/matrix-doc/issues/2591))
- Fix definitions for room version capabilities. ([#2592](https://github.com/matrix-org/matrix-doc/issues/2592))
- Fix various typos throughout the specification. ([#2594](https://github.com/matrix-org/matrix-doc/issues/2594), [#2599](https://github.com/matrix-org/matrix-doc/issues/2599), [#2809](https://github.com/matrix-org/matrix-doc/issues/2809), [#2878](https://github.com/matrix-org/matrix-doc/issues/2878), [#2885](https://github.com/matrix-org/matrix-doc/issues/2885), [#2888](https://github.com/matrix-org/matrix-doc/issues/2888), [#3116](https://github.com/matrix-org/matrix-doc/issues/3116), [#3339](https://github.com/matrix-org/matrix-doc/issues/3339))
- Clarify link to OpenID Connect specification. ([#2605](https://github.com/matrix-org/matrix-doc/issues/2605))
- Clarify the behaviour of SSO login and UI-Auth. ([#2608](https://github.com/matrix-org/matrix-doc/issues/2608))
- Remove spurious `room_id` from `/sync` examples. ([#2629](https://github.com/matrix-org/matrix-doc/issues/2629))
- Reorganize information in Push Notifications module for clarity. ([#2634](https://github.com/matrix-org/matrix-doc/issues/2634))
- Improve consistency and clarity of event schema `title`s. ([#2647](https://github.com/matrix-org/matrix-doc/issues/2647))
- Fix schema issues in `m.key.verification.accept` and secret storage. ([#2653](https://github.com/matrix-org/matrix-doc/issues/2653))
- Reword "UI Authorization" to "User-Interactive Authentication" to be more clear. ([#2667](https://github.com/matrix-org/matrix-doc/issues/2667))
- Fix schemas for push rule actions to represent their alternative object form. ([#2669](https://github.com/matrix-org/matrix-doc/issues/2669))
- Fix usage of `highlight` tweak for consistency. ([#2670](https://github.com/matrix-org/matrix-doc/issues/2670))
- Clarify the behaviour of `state` for `/sync` with lazy-loading. ([#2754](https://github.com/matrix-org/matrix-doc/issues/2754))
- Clarify description of `m.room.redaction` event. ([#2814](https://github.com/matrix-org/matrix-doc/issues/2814))
- Mark `messages` as a required JSON body field in `PUT /_matrix/client/r0/sendToDevice/{eventType}/{txnId}` calls. ([#2928](https://github.com/matrix-org/matrix-doc/issues/2928))
- Correct examples of `client_secret` request body parameters so that they do not include invalid characters. ([#2985](https://github.com/matrix-org/matrix-doc/issues/2985))
- Fix example MXC URI for `m.presence`. ([#3091](https://github.com/matrix-org/matrix-doc/issues/3091))
- Clarify that event bodies are untrusted, as per [MSC2801](https://github.com/matrix-org/matrix-doc/pull/2801). ([#3099](https://github.com/matrix-org/matrix-doc/issues/3099))
- Fix the maximum event size restriction (65535 bytes -> 65536). ([#3127](https://github.com/matrix-org/matrix-doc/issues/3127))
- Update `Access-Control-Allow-Headers` recommendation to fit CORS specification. ([#3225](https://github.com/matrix-org/matrix-doc/issues/3225))
- Explicitly state that `replacement_room` is a room ID in `m.room.tombstone` events. ([#3233](https://github.com/matrix-org/matrix-doc/issues/3233))
- Clarify that all request bodies are required. ([#3238](https://github.com/matrix-org/matrix-doc/issues/3238), [#3332](https://github.com/matrix-org/matrix-doc/issues/3332))
- Add missing titles to some scheams. ([#3330](https://github.com/matrix-org/matrix-doc/issues/3330))
- Add User-Interactive Authentication fields to cross-signing APIs as per [MSC1756](https://github.com/matrix-org/matrix-doc/pull/1756). ([#3331](https://github.com/matrix-org/matrix-doc/issues/3331))
- Mention that a canonical alias event should be added when a room is created with an alias. ([#3337](https://github.com/matrix-org/matrix-doc/issues/3337))
- Add an 'API conventions' section to the Appendices. ([#3350](https://github.com/matrix-org/matrix-doc/issues/3350))
- Clarify the documentation around the pagination tokens used by `/sync`, `/rooms/{room_id}/messages`, `/initialSync`, `/rooms/{room_id}/initialSync`, and `/notifications`. ([#3353](https://github.com/matrix-org/matrix-doc/issues/3353))
- Remove the inaccurate 'Pagination' section. ([#3366](https://github.com/matrix-org/matrix-doc/issues/3366))
- Clarify how `redacted_because` is meant to work. ([#3411](https://github.com/matrix-org/matrix-doc/issues/3411))
- Remove extraneous `mimetype` from `EncryptedFile` examples, as per [MSC2582](https://github.com/matrix-org/matrix-doc/pull/2582). ([#3412](https://github.com/matrix-org/matrix-doc/issues/3412))
- Describe how [MSC2844](https://github.com/matrix-org/matrix-doc/pull/2844) affects the `/versions` endpoint. ([#3420](https://github.com/matrix-org/matrix-doc/issues/3420))
- Fix documentation errors around `threepid_creds`. ([#3471](https://github.com/matrix-org/matrix-doc/issues/3471))

### Server-Server API

<strong>New Endpoints</strong>

- Add `/make_knock` and `/send_knock` endpoints as per [MSC2403](https://github.com/matrix-org/matrix-doc/pull/2403). ([#3154](https://github.com/matrix-org/matrix-doc/issues/3154))

<strong>Backwards Compatible Changes</strong>

- Add cross-signing information to `GET /user/keys` and `GET /user/devices/{userId}`, `m.device_list_update` EDU, and a new `m.signing_key_update` EDU as per [MSC1756](https://github.com/matrix-org/matrix-doc/pull/1756). ([#2536](https://github.com/matrix-org/matrix-doc/issues/2536))
- Add support for knocking, as per [MSC2403](https://github.com/matrix-org/matrix-doc/pull/2403). ([#3154](https://github.com/matrix-org/matrix-doc/issues/3154))

<strong>Spec Clarifications</strong>

- Specify that `GET /_matrix/federation/v1/make_join/{roomId}/{userId}` can return a 404 if the room is unknown. ([#2688](https://github.com/matrix-org/matrix-doc/issues/2688))
- Fix various typos throughout the specification. ([#2888](https://github.com/matrix-org/matrix-doc/issues/2888), [#3116](https://github.com/matrix-org/matrix-doc/issues/3116), [#3128](https://github.com/matrix-org/matrix-doc/issues/3128), [#3207](https://github.com/matrix-org/matrix-doc/issues/3207))
- Correct the `/_matrix/federation/v1/user/devices/{userId}` response which actually returns `"self_signing_key"` instead of `"self_signing_keys"`. ([#3312](https://github.com/matrix-org/matrix-doc/issues/3312))
- Explain the reasons why `<hostname>` TLS certificate is needed rather than `<delegated_hostname>` for SRV delegation. ([#3322](https://github.com/matrix-org/matrix-doc/issues/3322))
- Tweak the example PDU diagram to better demonstrate situations with multiple `prev_events`. ([#3340](https://github.com/matrix-org/matrix-doc/issues/3340))

### Application Service API

<strong>Spec Clarifications</strong>

- Fix various typos throughout the specification. ([#2888](https://github.com/matrix-org/matrix-doc/issues/2888))

### Identity Service API

<strong>New Endpoints</strong>

- Add `GET /_matrix/identity/versions` API as per [MSC2320](https://github.com/matrix-org/matrix-doc/pull/2320). ([#3101](https://github.com/matrix-org/matrix-doc/issues/3101))

<strong>Removed Endpoints</strong>

- The v1 identity service API has been removed in favour of the v2 API, as per [MSC2713](https://github.com/matrix-org/matrix-doc/pull/2713). ([#3170](https://github.com/matrix-org/matrix-doc/issues/3170))

<strong>Spec Clarifications</strong>

- Fix various typos throughout the specification. ([#2888](https://github.com/matrix-org/matrix-doc/issues/2888))
- Clarify that some identifiers must be case folded prior to processing, as per [MSC2265](https://github.com/matrix-org/matrix-doc/pull/2265). ([#3167](https://github.com/matrix-org/matrix-doc/issues/3167), [#3176](https://github.com/matrix-org/matrix-doc/issues/3176))
- Describe how [MSC2844](https://github.com/matrix-org/matrix-doc/pull/2844) affects the `/versions` endpoint. ([#3459](https://github.com/matrix-org/matrix-doc/issues/3459))

### Push Gateway API

<strong>Spec Clarifications</strong>

- Clarify where to get information about the various parameter values for the notify endpoint. ([#2763](https://github.com/matrix-org/matrix-doc/issues/2763))
