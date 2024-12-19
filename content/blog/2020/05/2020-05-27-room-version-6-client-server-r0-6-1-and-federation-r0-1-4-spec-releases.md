+++
title = "Room Version 6, Client-Server r0.6.1, and Federation r0.1.4 spec releases"
path = "/blog/2020/05/27/room-version-6-client-server-r0-6-1-and-federation-r0-1-4-spec-releases"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

## Room Version 6, Client-Server r0.6.1, and Federation r0.1.4 spec releases

Hey all,

It's been [a little while](https://matrix.org/blog/2019/11/08/client-server-r-0-6-0-and-identity-service-r-0-3-0-releases) since we've done a spec release, so here we are with [Room Version 6](https://matrix.org/docs/spec/rooms/v6), [Client-Server r0.6.1](https://matrix.org/docs/spec/client_server/r0.6.1), and [Federation r0.1.4](https://matrix.org/docs/spec/server_server/r0.1.4).

Room Version 6 (and the associated Federation r0.1.4 release) is largely something for implementations to worry about. It contains new event authorisation rules, changes to the redaction algorithm, and stricter compliance for JSON.

Client-Server r0.6.1 contains a number of clarifications as well as SSO support for authorisation, "soft logout" to avoid needlessly destroying e2e history, and new ways to publish aliases within rooms.

If you're wondering where all the E2E-by-default related MSCs are - we're doing final iterations based on the real-world feedback from the E2E-by-default launch a few weeks ago, and they are then expected to land in the upcoming Client-Server r0.7.

Here's all the MSCs that got merged since the last release:

- [MSC2240](https://github.com/matrix-org/matrix-doc/pull/2240): Room version 6
- [MSC2457](https://github.com/matrix-org/matrix-doc/pull/2457): Invalidating devices during password modification
- [MSC2454](https://github.com/matrix-org/matrix-doc/pull/2454): Support UI auth for SSO
- [MSC2451](https://github.com/matrix-org/matrix-doc/pull/2451): Remove `query_auth` federation endpoint
- [MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432): Updated semantics for publishing room aliases
- [MSC2324](https://github.com/matrix-org/matrix-doc/pull/2324): Facilitating early releases of software dependent on spec
- [MSC2313](https://github.com/matrix-org/matrix-doc/pull/2313): Moderation policies as rooms
- [MSC1466](https://github.com/matrix-org/matrix-doc/issues/1466): Soft Logout
- [MSC2540](https://github.com/matrix-org/matrix-doc/pull/2540): Stricter event validation: JSON compliance
- [MSC2209](https://github.com/matrix-org/matrix-doc/pull/2209): Alter auth rules to check notifications in m.room.power_levels
- [MSC1802](https://github.com/matrix-org/matrix-doc/pull/1802): Remove the '200' value from some federation responses

### Client-Server r0.6.1 changelog

#### New Endpoints

- Added `/rooms/{roomId}/aliases` for retrieving local aliases for a room. ([\#2562](https://github.com/matrix-org/matrix-doc/issues/2562))

#### Backwards Compatible Changes

- Added data structures for defining moderation policies in rooms per [MSC2313](https://github.com/matrix-org/matrix-doc/pull/2313). ([\#2434](https://github.com/matrix-org/matrix-doc/issues/2434))
- Optionally invalidate other access tokens during password modification per [MSC2457](https://github.com/matrix-org/matrix-doc/pull/2457). ([\#2523](https://github.com/matrix-org/matrix-doc/issues/2523))
- Add User-Interactive Authentication for SSO-backed homeserver per [MSC2454](https://github.com/matrix-org/matrix-doc/pull/2454). ([\#2532](https://github.com/matrix-org/matrix-doc/issues/2532))
- Add soft-logout support per [MSC1466](https://github.com/matrix-org/matrix-doc/issues/1466). ([\#2546](https://github.com/matrix-org/matrix-doc/issues/2546))
- Replaced legacy room alias handling with a more sustainable solution per [MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432). ([\#2562](https://github.com/matrix-org/matrix-doc/issues/2562))

#### Spec Clarifications

- List available enum values for the room versions capability. ([\#2245](https://github.com/matrix-org/matrix-doc/issues/2245))
- Fix various spelling errors throughout the specification. ([\#2351](https://github.com/matrix-org/matrix-doc/issues/2351), [\#2415](https://github.com/matrix-org/matrix-doc/issues/2415), [\#2453](https://github.com/matrix-org/matrix-doc/issues/2453), [\#2524](https://github.com/matrix-org/matrix-doc/issues/2524), [\#2553](https://github.com/matrix-org/matrix-doc/issues/2553), [\#2569](https://github.com/matrix-org/matrix-doc/issues/2569))
- Minor clarifications to token-based User-Interactive Authentication. ([\#2369](https://github.com/matrix-org/matrix-doc/issues/2369))
- Minor clarification for what the user directory searches. ([\#2381](https://github.com/matrix-org/matrix-doc/issues/2381))
- Fix key export format example to match the specification. ([\#2430](https://github.com/matrix-org/matrix-doc/issues/2430))
- Clarify the IV data type for encrypted files. ([\#2492](https://github.com/matrix-org/matrix-doc/issues/2492))
- Fix the `.m.rule.contains_user_name` default push rule to set the highlight tweak. ([\#2519](https://github.com/matrix-org/matrix-doc/issues/2519))
- Clarify that an `event_id` is returned when sending events. ([\#2525](https://github.com/matrix-org/matrix-doc/issues/2525))
- Fix some numbers in the specification to match their explanation text. ([\#2554](https://github.com/matrix-org/matrix-doc/issues/2554))
- Move redaction algorithm into the room version specifications. ([\#2563](https://github.com/matrix-org/matrix-doc/issues/2563))
- Clarify signature object structures for encryption. ([\#2566](https://github.com/matrix-org/matrix-doc/issues/2566))
- Clarify which events are created as part of `/createRoom`. ([\#2571](https://github.com/matrix-org/matrix-doc/issues/2571))
- Remove claims that the homeserver is exclusively responsible for profile information in membership events. ([\#2574](https://github.com/matrix-org/matrix-doc/issues/2574))

### Server-Server (Federation) r0.1.4 changelog

#### New Endpoints

- Add new `POST /publicRooms` endpoint for filtering the room directory. ([\#2305](https://github.com/matrix-org/matrix-doc/issues/2305))
- Add new v2 `/send_join` and `/send_leave` endpoints per [MSC1802](https://github.com/matrix-org/matrix-doc/pull/1802). ([\#2547](https://github.com/matrix-org/matrix-doc/issues/2547))

#### Removed Endpoints

- Remove the unused `query_auth` API per [MSC2451](https://github.com/matrix-org/matrix-doc/pull/2451). ([\#2470](https://github.com/matrix-org/matrix-doc/issues/2470))

#### Spec Clarifications

- Move auth event selection to a more obvious location. ([\#2392](https://github.com/matrix-org/matrix-doc/issues/2392))
- Fix typo in Request Authentication python example. ([\#2510](https://github.com/matrix-org/matrix-doc/issues/2510))
- Clarify which fields are required on the key server endpoints. ([\#2527](https://github.com/matrix-org/matrix-doc/issues/2527))
- Clarify the limits of `prev_events` and `auth_events` for PDUs. ([\#2538](https://github.com/matrix-org/matrix-doc/issues/2538))
- Clarify which events are targeted by backfill. ([\#2559](https://github.com/matrix-org/matrix-doc/issues/2559))
- Fix the response format of the `/send` endpoint. ([\#2560](https://github.com/matrix-org/matrix-doc/issues/2560))
- Clarify signature object structures for encryption. ([\#2566](https://github.com/matrix-org/matrix-doc/issues/2566))
- Clarify the server names to use when signing requests. ([\#2570](https://github.com/matrix-org/matrix-doc/issues/2570))
- Clarify the state/auth chain requirements for `/send_join`. ([\#2575](https://github.com/matrix-org/matrix-doc/issues/2575))
- Fix various spelling errors throughout the specification. ([\#2577](https://github.com/matrix-org/matrix-doc/issues/2577))
