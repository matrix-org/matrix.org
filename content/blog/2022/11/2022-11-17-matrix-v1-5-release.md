+++
title = "Matrix v1.5 release"
date = "2022-11-17T16:56:36Z"
updated = "2022-11-17T16:44:47Z"
path = "/blog/2022/11/17/matrix-v-1-5-release"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

We’ve just released [Matrix 1.5](https://spec.matrix.org/v1.5), a largely maintenance update for the spec. We intentionally haven’t landed any major features in this release as Matrix 1.4, [just shy of 2 months ago](https://matrix.org/blog/2022/09/29/matrix-v-1-4-release), had introduced fairly large features for clients and servers to consider. As with all spec releases, we encourage implementations to gradually update over the next few months rather than expect them to have support for everything on release day.

Matrix 1.5 sees just 2 MSCs get merged, though this is to be expected from a maintenance release. We expect that the next release (in Q1 2023) will have a few more exciting features to it :)

We’ve covered both MSCs below, but read on to the full changelog for the full picture.

## MSC3267: Reference relations

Already supported implicitly by the spec up until now, [reference relations](https://spec.matrix.org/v1.5/client-server-api/#reference-relations) are a way to simply reference another event. Usually these sorts of relations are used for events which need to be related to each other, but a dedicated relationship type doesn’t make a lot of sense.

[In-room verification](https://spec.matrix.org/v1.5/client-server-api/#key-verification-framework) and [MSC3381: Polls](https://github.com/matrix-org/matrix-spec-proposals/pull/3381) are examples of how these relations get used.

## MSC3905: Clarify appservice interest in user IDs

[MSC3905](https://github.com/matrix-org/matrix-spec-proposals/pull/3905) fixes an issue in the specification where appservices (usually bridges) specifying a users regex without homeserver domain would end up receiving far more event traffic than they would have intended. With the MSC, appservices are now only considered interested in “local” users, regardless of how vague their users namespace is.

Overall this should have no effect on most bridges/appservices, however if an appservice in the wild really does need to listen to all users on all homeservers, it can specify a non-exclusive namespace on all rooms instead.

While writing this MSC into the spec we took some time to clarify the appservice registration requirements more generally: check them out [here](https://spec.matrix.org/v1.5/application-service-api/#registration).

## The full changelog

MSCs are how the spec changes in the way it does - adding, fixing, and maintaining features for the whole ecosystem to use. Check out the full changelog below, and the [Spec Change Proposals](https://spec.matrix.org/proposals/) page for more information on how these MSCs got merged (hint: they submitted a proposal, which anyone can do - take a look at the [Matrix Live episode](https://www.youtube.com/watch?v=SFkZz60RRfc) where Matthew covers the proposal process).

### Client-Server API

<strong>Backwards Compatible Changes</strong>

- Add `m.reference` relations, as per [MSC3267](https://github.com/matrix-org/matrix-spec-proposals/pull/3267). ([#1206](https://github.com/matrix-org/matrix-spec/issues/1206))
- Add missing documentation for `m.key.verification.request` msgtype for in-room verification. ([#1271](https://github.com/matrix-org/matrix-spec/issues/1271))

<strong>Spec Clarifications</strong>

- Fix various typos throughout the specification. ([#1260](https://github.com/matrix-org/matrix-spec/issues/1260), [#1265](https://github.com/matrix-org/matrix-spec/issues/1265), [#1276](https://github.com/matrix-org/matrix-spec/issues/1276))
- Fix naming of `device_one_time_keys_count` in `/sync`. ([#1266](https://github.com/matrix-org/matrix-spec/issues/1266))
- Improve display of event subtypes. ([#1283](https://github.com/matrix-org/matrix-spec/issues/1283))
- Improve documentation about ephemeral events. ([#1284](https://github.com/matrix-org/matrix-spec/issues/1284))
- Define a 400 response from `/_matrix/client/v3/directory/rooms/{roomAlias}`. ([#1286](https://github.com/matrix-org/matrix-spec/issues/1286))
- Clarify parts of the end-to-end encryption sections. ([#1294](https://github.com/matrix-org/matrix-spec/issues/1294), [#1345](https://github.com/matrix-org/matrix-spec/issues/1345))
- Various clarifications throughout the specification. ([#1306](https://github.com/matrix-org/matrix-spec/issues/1306))
- Replace `set_sound` push rule action by `set_tweak`. ([#1318](https://github.com/matrix-org/matrix-spec/issues/1318))
- Clarify the behavior of `PUT /_matrix/client/v3/pushrules/{scope}/{kind}/{ruleId}`. ([#1319](https://github.com/matrix-org/matrix-spec/issues/1319))
- Clarify that `.m.rule.master` has a higher priority than any push rule. ([#1320](https://github.com/matrix-org/matrix-spec/issues/1320))
- Require request field `refresh_token` at endpoint `POST /_matrix/client/v3/refresh`. ([#1323](https://github.com/matrix-org/matrix-spec/issues/1323))
- Fix a number of broken links in the specification. ([#1330](https://github.com/matrix-org/matrix-spec/issues/1330))
- Add example read receipt to `GET /_matrix/client/v3/sync` response example. ([#1341](https://github.com/matrix-org/matrix-spec/issues/1341))

### Server-Server API

<strong>Spec Clarifications</strong>

- Fix a number of broken links in the specification. ([#1330](https://github.com/matrix-org/matrix-spec/issues/1330))

### Application Service API

<strong>Spec Clarifications</strong>

- Clarify that application services can only register an interest in local users, as per [MSC3905](https://github.com/matrix-org/matrix-spec-proposals/issues/3905). ([#1305](https://github.com/matrix-org/matrix-spec/issues/1305))

### Identity Service API

<strong>Spec Clarifications</strong>

- Fix a number of broken links in the specification. ([#1330](https://github.com/matrix-org/matrix-spec/issues/1330))

### Push Gateway API

No significant changes.

### Room Versions

<strong>Spec Clarifications</strong>

- Reword the event auth rules to clarify that users cannot demote other users with the same power level. ([#1269](https://github.com/matrix-org/matrix-spec/issues/1269))
- Various clarifications to the text on event authorisation rules. ([#1270](https://github.com/matrix-org/matrix-spec/issues/1270))
- Fix a number of broken links in the specification. ([#1330](https://github.com/matrix-org/matrix-spec/issues/1330))

### Appendices

No significant changes.

### Internal Changes/Tooling

<strong>Backwards Compatible Changes</strong>

- Update docsy theme to v0.5.0 + matrix.org modifications (<https://github.com/matrix-org/docsy/commit/a0032f8db919a6c67ba6cdef2c455f105b6272a2>). ([#1295](https://github.com/matrix-org/matrix-spec/issues/1295))

<strong>Spec Clarifications</strong>

- Improve error messages emitted by `resolve-additional-types` template. ([#1303](https://github.com/matrix-org/matrix-spec/issues/1303))
- Fix link to API viewer. ([#1308](https://github.com/matrix-org/matrix-spec/issues/1308))
- Stop rendering the subsections of the Client-Server API and Room Versions specs as their own separate pages. ([#1317](https://github.com/matrix-org/matrix-spec/issues/1317))
- Use a link checker to ensure that we do not have broken links. ([#1329](https://github.com/matrix-org/matrix-spec/issues/1329), [#1338](https://github.com/matrix-org/matrix-spec/issues/1338))
- Update instructions to preview Swagger definitions. ([#1331](https://github.com/matrix-org/matrix-spec/issues/1331))
- Make definition anchors more unique. ([#1339](https://github.com/matrix-org/matrix-spec/issues/1339))
- Generate the unstable changelogs with towncrier, for consistency. ([#1340](https://github.com/matrix-org/matrix-spec/issues/1340))
- Update CONTRIBUTING.md to mention that non-content changes to this repo should have an "internal" changelog entry. ([#1342](https://github.com/matrix-org/matrix-spec/issues/1342))
- Update module summary table with new modules: Event Replacements, Threading and Reference Relations. ([#1344](https://github.com/matrix-org/matrix-spec/issues/1344))
- Disable RSS generation for the spec. ([#1346](https://github.com/matrix-org/matrix-spec/issues/1346))
