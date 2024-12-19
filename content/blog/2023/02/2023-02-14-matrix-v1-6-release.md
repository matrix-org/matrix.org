+++
title = "Matrix v1.6 release"
date = "2023-02-14T17:04:46Z"
path = "/blog/2023/02/14/matrix-v-1-6-release"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

[Matrix 1.6](https://spec.matrix.org/v1.6/) is out there! Like Matrix 1.5 [back in November](https://matrix.org/blog/2022/11/17/matrix-v-1-5-release), this release is largely a maintenance update. Matrix 1.1 through 1.4 have been relatively major upgrades, so a little time between features doesn’t feel like a bad idea :)

As with all spec releases, we encourage implementations to gradually update over the next few months rather than have support for everything on release day - please be kind to the projects you use, and help them gain support if able.

Matrix 1.6 sees just 7 MSCs get merged, though this is to be expected from a maintenance release. Check out [Matthew’s Matrix 2.0 talk](https://www.youtube.com/watch?v=eUPJ9zFV5IE) at FOSDEM for an idea of what’s expected over the next few releases.

We’ve covered a couple of the MSCs below, but read on to the full changelog for the full picture.

<!-- more -->

## MSC3030: Jump to date API

_It’s here! The time machine we’ve been waiting for!_

Primarily part of the [Gitter feature parity project](https://github.com/vector-im/roadmap/issues/26) (congratulations to the team [going all-in on Matrix](https://blog.gitter.im/2023/02/13/gitter-has-fully-migrated-to-matrix/), by the way) to drive the [Matrix Public Archive](https://github.com/matrix-org/matrix-public-archive), the [new API](https://spec.matrix.org/v1.6/client-server-api/#get_matrixclientv1roomsroomidtimestamp_to_event) gives clients the ability to jump back in time to a nearby event. Being able to find something that was posted on a given day/week, but not being sure of which keywords to look for is a major usability improvement - many thanks to the Gitter team for making Matrix better!

## MSC3706: Faster joins (part 1)

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
_Matrix is going voom_

[Synapse 1.76](https://matrix.org/blog/2023/01/31/synapse-1-76-released) enabled faster joins by default, and while there’s a lot of Python going into making joins as fast as possible, the specification side is a relatively small change at the moment: [just don’t send as many events during joins](https://spec.matrix.org/v1.6/server-server-api/#put_matrixfederationv2send_joinroomideventid) (`omit_members`).

There’s potentially more work on the horizon for making faster joins even faster and more robust, and some of that might involve spec work: keep an eye on Synapse releases and [TWIM](https://matrix.org/blog/category/this-week-in-matrix) for updates as we make our way to faster joins in Matrix 2.0 :)

## The full changelog

MSCs are how the spec changes in the way it does - adding, fixing, and maintaining features for the whole ecosystem to use. Check out the full changelog below, and the [Spec Change Proposals](https://spec.matrix.org/proposals/) page for more information on how these MSCs got merged (hint: they submitted a proposal, which anyone can do - take a look at the [Matrix Live episode](https://www.youtube.com/watch?v=SFkZz60RRfc) where Matthew covers the proposal process).

<!-- Intentionally blank line to ensure headers work in the concatenated changelog -->
### Client-Server API

<strong>Backwards Compatible Changes</strong>

- Add information on standard error responses for unknown endpoints/methods, as per [MSC3743](https://github.com/matrix-org/matrix-spec-proposals/pull/3743). ([#1347](https://github.com/matrix-org/matrix-spec/issues/1347))
- Add `/rooms/<roomID>/timestamp_to_event` endpoint, as per [MSC3030](https://github.com/matrix-org/matrix-spec-proposals/pull/3030). ([#1366](https://github.com/matrix-org/matrix-spec/issues/1366))
- Define `hkdf-hmac-sha256.v2` MAC method for SAS verification, as per [MSC3783](https://github.com/matrix-org/matrix-spec-proposals/pull/3783). ([#1412](https://github.com/matrix-org/matrix-spec/issues/1412))

<strong>Spec Clarifications</strong>

- Clarify the power levels integer range. ([#1169](https://github.com/matrix-org/matrix-spec/issues/1169), [#1355](https://github.com/matrix-org/matrix-spec/issues/1355))
- Clarify that `/context` always returns `event` even if `limit` is zero. Contributed by @sumnerevans at @beeper. ([#1239](https://github.com/matrix-org/matrix-spec/issues/1239))
- Clarify what fields are required when deleting a pusher ([#1321](https://github.com/matrix-org/matrix-spec/issues/1321))
- Improve the presentation of push rule kinds and actions. ([#1348](https://github.com/matrix-org/matrix-spec/issues/1348))
- Add missing description to m.call.answer schema. ([#1353](https://github.com/matrix-org/matrix-spec/issues/1353))
- Fix various typos throughout the specification. ([#1363](https://github.com/matrix-org/matrix-spec/issues/1363))
- Clarify parts of the end-to-end encryption sections. ([#1381](https://github.com/matrix-org/matrix-spec/issues/1381))
- Move login API definitions to the right heading. Contributed by @HarHarLinks. ([#1382](https://github.com/matrix-org/matrix-spec/issues/1382))
- Clarify which events will be included in Stripped State. Contributed by @andybalaam. ([#1409](https://github.com/matrix-org/matrix-spec/issues/1409))
- Add links to the spec for the definition of 3PID `medium`. ([#1417](https://github.com/matrix-org/matrix-spec/issues/1417))
- Correct the order of the default override pushrules in the spec. ([#1421](https://github.com/matrix-org/matrix-spec/issues/1421))
- Improve distinction between tags and their attributes in the rich text section. Contributed by Nico. ([#1433](https://github.com/matrix-org/matrix-spec/issues/1433))

### Server-Server API

<strong>Breaking Changes</strong>

- Remove `keyId` from the server `/keys` endpoints, as per [MSC3938](https://github.com/matrix-org/matrix-spec-proposals/pull/3938). ([#1350](https://github.com/matrix-org/matrix-spec/issues/1350))

<strong>Backwards Compatible Changes</strong>

- Add information on standard error responses for unknown endpoints/methods, as per [MSC3743](https://github.com/matrix-org/matrix-spec-proposals/pull/3743). ([#1347](https://github.com/matrix-org/matrix-spec/issues/1347))
- Add `/timestamp_to_event/<roomID>` endpoint, as per [MSC3030](https://github.com/matrix-org/matrix-spec-proposals/pull/3030). ([#1366](https://github.com/matrix-org/matrix-spec/issues/1366))
- Extend `/_matrix/federation/v2/send_join` to allow omitting membership events, per [MSC3706](https://github.com/matrix-org/matrix-doc/pull/3706). ([#1393](https://github.com/matrix-org/matrix-spec/issues/1393), [#1398](https://github.com/matrix-org/matrix-spec/issues/1398))
- Note that `/_matrix/federation/v2/send_join` should include heroes for nameless rooms, even when allowed to omit membership events, per [MSC3943](https://github.com/matrix-org/matrix-doc/pull/3943). ([#1425](https://github.com/matrix-org/matrix-spec/issues/1425))

<strong>Spec Clarifications</strong>

- Include examples inline instead of using a reference for invite endpoint definitions. ([#1349](https://github.com/matrix-org/matrix-spec/issues/1349))
- Fix `POST _matrix/federation/v1/user/keys/claim` response schema. ([#1351](https://github.com/matrix-org/matrix-spec/issues/1351))
- Correct the default invite level definition in the "Checks performed on receipt of a PDU" section. ([#1371](https://github.com/matrix-org/matrix-spec/issues/1371))
- Clarify that CNAMEs are permissible for server names. ([#1376](https://github.com/matrix-org/matrix-spec/issues/1376))
- Fix `edu_type` in EDU examples. ([#1383](https://github.com/matrix-org/matrix-spec/issues/1383))

### Application Service API

<strong>Backwards Compatible Changes</strong>

- Add information on standard error responses for unknown endpoints/methods, as per [MSC3743](https://github.com/matrix-org/matrix-spec-proposals/pull/3743). ([#1347](https://github.com/matrix-org/matrix-spec/issues/1347))

### Identity Service API

<strong>Backwards Compatible Changes</strong>

- Add information on standard error responses for unknown endpoints/methods, as per [MSC3743](https://github.com/matrix-org/matrix-spec-proposals/pull/3743). ([#1347](https://github.com/matrix-org/matrix-spec/issues/1347))

### Push Gateway API

<strong>Backwards Compatible Changes</strong>

- Add information on standard error responses for unknown endpoints/methods, as per [MSC3743](https://github.com/matrix-org/matrix-spec-proposals/pull/3743). ([#1347](https://github.com/matrix-org/matrix-spec/issues/1347))

### Room Versions

<strong>Backwards Compatible Changes</strong>

- Update the default room version to 10, as per [MSC3904](https://github.com/matrix-org/matrix-spec-proposals/pull/3904). ([#1397](https://github.com/matrix-org/matrix-spec/issues/1397))

<strong>Spec Clarifications</strong>

- Clarify the grammar for room versions. ([#1422](https://github.com/matrix-org/matrix-spec/issues/1422))
- Fix various typos throughout the specification. ([#1423](https://github.com/matrix-org/matrix-spec/issues/1423))

### Appendices

No significant changes.

### Internal Changes/Tooling

<strong>Spec Clarifications</strong>

- Add link to the unstable spec to the README. ([#1357](https://github.com/matrix-org/matrix-spec/issues/1357))
- Improve safety of the proposals retrieval script in the event of failure. ([#1368](https://github.com/matrix-org/matrix-spec/issues/1368))
- Rename `<content>` to `content` in the OpenAPI files for content uploads. ([#1370](https://github.com/matrix-org/matrix-spec/issues/1370))
- Stop autogenerating examples where we already have an example. ([#1384](https://github.com/matrix-org/matrix-spec/issues/1384))
- Improve formatting of definitions in the Push Notifications section. ([#1415](https://github.com/matrix-org/matrix-spec/issues/1415))
