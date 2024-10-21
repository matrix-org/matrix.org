+++
title = "Synapse 1.0.0 released"
path = "/blog/2019/06/11/synapse-1-0-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["General", "Releases", "In the News"]
+++

Well here it is: Synapse 1.0.

Synapse 1.0 is the reference implementation of the [Matrix 1.0 spec](https://matrix.org/docs/spec). The goal of the release overall has been to focus on security and stability, such that we can officially declare Synapse (and Matrix) out of beta and recommended for production use. This means changing the default room protocol version used for new rooms to be [v4](https://github.com/matrix-org/matrix-doc/blob/37871106c6fc6013c17b5711fb93853fff140267/proposals/2002-rooms-v4.md), which includes the new [state resolution algorithm](https://github.com/matrix-org/matrix-doc/blob/f714aaadd011ac736d779f8460202a8d95799123/proposals/1442-state-resolution.md), as well as [collision-resistant event IDs](https://github.com/matrix-org/matrix-doc/blob/erikj/event_id_hashes/proposals/1659-event-id-as-hashes.md), which are now formatted to be [URL safe](https://github.com/matrix-org/matrix-doc/blob/rav/proposal/no_slash_in_event_id/proposals/1884-replace-slashes-in-event_ids.md).

Synapse 1.0 also ships with support for the upcoming [v5 room protocol](https://matrix.org/docs/spec/rooms/v5.html) (which enforces honouring server key validity periods), but this will not be used as the default for new rooms until a sufficient number of servers support it.

Please note that Synapse 1.0 does **not** include significant performance work or new features - our focus has been almost exclusively on providing a reference implementation of the Matrix 1.0 protocol. But having cleared our backlog on security/stability issues we will finally be now unblocked to pursue work around reducing RAM footprint, eliminating forward-extremity build up, and shipping new features like Edits, Reactions & E2E cross-signing support.

As part of the security work, Synapse 1.0 contains a [breaking change](https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md#it-used-to-work-just-fine-why-are-you-breaking-everything) that requires a valid TLS certificate on the federation API endpoint. **Servers that do not configure their certificate will no longer be able to federate post 1.0.**

It is also worth noting that Synapse 1.0.0 is the last release that will support Python 2.x and Postgres 9.4. For more information see [here](/blog/2019/04/08/synapse-deprecating-postgres-9-4-and-python-2-x) but the TL;DR is that you should upgrade asap.

This release has been a long time coming. Many thanks indeed to everyone who helped test the release candidates and provided feedback along the way.

Synapse 1.0 is just one component of a larger Matrix 1.0 release, which you can [read all about here](/blog/2019/06/11/introducing-matrix-1-0-and-the-matrix-org-foundation).

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.0.0) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Note, Synapse is now available from PyPI, pick it up [here](https://pypi.org/project/matrix-synapse/). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 0.99.5 follows:

## Synapse 1.0.0 (2019-06-11)

### Bugfixes

- Fix bug where attempting to send transactions with large number of EDUs can fail. ([\#5418](https://github.com/matrix-org/synapse/issues/5418))

### Improved Documentation

- Expand the federation guide to include relevant content from the MSC1711 FAQ ([\#5419](https://github.com/matrix-org/synapse/issues/5419))

### Internal Changes

- Move password reset links to /_matrix/client/unstable namespace. ([\#5424](https://github.com/matrix-org/synapse/issues/5424))

## Synapse 1.0.0rc3 (2019-06-10)

Security: Fix authentication bug introduced in 1.0.0rc1. Please upgrade to rc3 immediately

## Synapse 1.0.0rc2 (2019-06-10)

### Bugfixes

- Remove redundant warning about key server response validation. ([\#5392](https://github.com/matrix-org/synapse/issues/5392))
- Fix bug where old keys stored in the database with a null valid until timestamp caused all verification requests for that key to fail. ([\#5415](https://github.com/matrix-org/synapse/issues/5415))
- Fix excessive memory using with default `federation_verify_certificates: true` configuration. ([\#5417](https://github.com/matrix-org/synapse/issues/5417))

## Synapse 1.0.0rc1 (2019-06-07)

### Features

- Synapse now more efficiently collates room statistics. ([\#4338](https://github.com/matrix-org/synapse/issues/4338), [\#5260](https://github.com/matrix-org/synapse/issues/5260), [\#5324](https://github.com/matrix-org/synapse/issues/5324))
- Add experimental support for relations (aka reactions and edits). ([\#5220](https://github.com/matrix-org/synapse/issues/5220))
- Ability to configure default room version. ([\#5223](https://github.com/matrix-org/synapse/issues/5223), [\#5249](https://github.com/matrix-org/synapse/issues/5249))
- Allow configuring a range for the account validity startup job. ([\#5276](https://github.com/matrix-org/synapse/issues/5276))
- CAS login will now hit the r0 API, not the deprecated v1 one. ([\#5286](https://github.com/matrix-org/synapse/issues/5286))
- Validate federation server TLS certificates by default (implements [MSC1711](https://github.com/matrix-org/matrix-doc/blob/master/proposals/1711-x509-for-federation.md)). ([\#5359](https://github.com/matrix-org/synapse/issues/5359))
- Update /_matrix/client/versions to reference support for r0.5.0. ([\#5360](https://github.com/matrix-org/synapse/issues/5360))
- Add a script to generate new signing-key files. ([\#5361](https://github.com/matrix-org/synapse/issues/5361))
- Update upgrade and installation guides ahead of 1.0. ([\#5371](https://github.com/matrix-org/synapse/issues/5371))
- Replace the `perspectives` configuration section with `trusted_key_servers`, and make validating the signatures on responses optional (since TLS will do this job for us). ([\#5374](https://github.com/matrix-org/synapse/issues/5374))
- Add ability to perform password reset via email without trusting the identity server. ([\#5377](https://github.com/matrix-org/synapse/issues/5377))
- Set default room version to v4. ([\#5379](https://github.com/matrix-org/synapse/issues/5379))

### Bugfixes

- Fixes client-server API not sending "m.heroes" to lazy-load /sync requests when a rooms name or its canonical alias are empty. Thanks to @dnaf for this work! ([\#5089](https://github.com/matrix-org/synapse/issues/5089))
- Prevent federation device list updates breaking when processing multiple updates at once. ([\#5156](https://github.com/matrix-org/synapse/issues/5156))
- Fix worker registration bug caused by ClientReaderSlavedStore being unable to see get_profileinfo. ([\#5200](https://github.com/matrix-org/synapse/issues/5200))
- Fix race when backfilling in rooms with worker mode. ([\#5221](https://github.com/matrix-org/synapse/issues/5221))
- Fix appservice timestamp massaging. ([\#5233](https://github.com/matrix-org/synapse/issues/5233))
- Ensure that server_keys fetched via a notary server are correctly signed. ([\#5251](https://github.com/matrix-org/synapse/issues/5251))
- Show the correct error when logging out and access token is missing. ([\#5256](https://github.com/matrix-org/synapse/issues/5256))
- Fix error code when there is an invalid parameter on /_matrix/client/r0/publicRooms ([\#5257](https://github.com/matrix-org/synapse/issues/5257))
- Fix error when downloading thumbnail with missing width/height parameter. ([\#5258](https://github.com/matrix-org/synapse/issues/5258))
- Fix schema update for account validity. ([\#5268](https://github.com/matrix-org/synapse/issues/5268))
- Fix bug where we leaked extremities when we soft failed events, leading to performance degradation. ([\#5274](https://github.com/matrix-org/synapse/issues/5274), [\#5278](https://github.com/matrix-org/synapse/issues/5278), [\#5291](https://github.com/matrix-org/synapse/issues/5291))
- Fix "db txn 'update_presence' from sentinel context" log messages. ([\#5275](https://github.com/matrix-org/synapse/issues/5275))
- Fix dropped logcontexts during high outbound traffic. ([\#5277](https://github.com/matrix-org/synapse/issues/5277))
- Fix a bug where it is not possible to get events in the federation format with the request `GET /_matrix/client/r0/rooms/{roomId}/messages`. ([\#5293](https://github.com/matrix-org/synapse/issues/5293))
- Fix performance problems with the rooms stats background update. ([\#5294](https://github.com/matrix-org/synapse/issues/5294))
- Fix noisy 'no key for server' logs. ([\#5300](https://github.com/matrix-org/synapse/issues/5300))
- Fix bug where a notary server would sometimes forget old keys. ([\#5307](https://github.com/matrix-org/synapse/issues/5307))
- Prevent users from setting huge displaynames and avatar URLs. ([\#5309](https://github.com/matrix-org/synapse/issues/5309))
- Fix handling of failures when processing incoming events where calling `/event_auth` on remote server fails. ([\#5317](https://github.com/matrix-org/synapse/issues/5317))
- Ensure that we have an up-to-date copy of the signing key when validating incoming federation requests. ([\#5321](https://github.com/matrix-org/synapse/issues/5321))
- Fix various problems which made the signing-key notary server time out for some requests. ([\#5333](https://github.com/matrix-org/synapse/issues/5333))
- Fix bug which would make certain operations (such as room joins) block for 20 minutes while attemoting to fetch verification keys. ([\#5334](https://github.com/matrix-org/synapse/issues/5334))
- Fix a bug where we could rapidly mark a server as unreachable even though it was only down for a few minutes. ([\#5335](https://github.com/matrix-org/synapse/issues/5335), [\#5340](https://github.com/matrix-org/synapse/issues/5340))
- Fix a bug where account validity renewal emails could only be sent when email notifs were enabled. ([\#5341](https://github.com/matrix-org/synapse/issues/5341))
- Fix failure when fetching batches of events during backfill, etc. ([\#5342](https://github.com/matrix-org/synapse/issues/5342))
- Add a new room version where the timestamps on events are checked against the validity periods on signing keys. ([\#5348](https://github.com/matrix-org/synapse/issues/5348), [\#5354](https://github.com/matrix-org/synapse/issues/5354))
- Fix room stats and presence background updates to correctly handle missing events. ([\#5352](https://github.com/matrix-org/synapse/issues/5352))
- Include left members in room summaries' heroes. ([\#5355](https://github.com/matrix-org/synapse/issues/5355))
- Fix `federation_custom_ca_list` configuration option. ([\#5362](https://github.com/matrix-org/synapse/issues/5362))
- Fix missing logcontext warnings on shutdown. ([\#5369](https://github.com/matrix-org/synapse/issues/5369))

### Improved Documentation

- Fix docs on resetting the user directory. ([\#5282](https://github.com/matrix-org/synapse/issues/5282))
- Fix notes about ACME in the MSC1711 faq. ([\#5357](https://github.com/matrix-org/synapse/issues/5357))

### Internal Changes

- Synapse will now serve the experimental "room complexity" API endpoint. ([\#5216](https://github.com/matrix-org/synapse/issues/5216))
- The base classes for the v1 and v2_alpha REST APIs have been unified. ([\#5226](https://github.com/matrix-org/synapse/issues/5226), [\#5328](https://github.com/matrix-org/synapse/issues/5328))
- Simplifications and comments in do_auth. ([\#5227](https://github.com/matrix-org/synapse/issues/5227))
- Remove urllib3 pin as requests 2.22.0 has been released supporting urllib3 1.25.2. ([\#5230](https://github.com/matrix-org/synapse/issues/5230))
- Preparatory work for key-validity features. ([\#5232](https://github.com/matrix-org/synapse/issues/5232), [\#5234](https://github.com/matrix-org/synapse/issues/5234), [\#5235](https://github.com/matrix-org/synapse/issues/5235), [\#5236](https://github.com/matrix-org/synapse/issues/5236), [\#5237](https://github.com/matrix-org/synapse/issues/5237), [\#5244](https://github.com/matrix-org/synapse/issues/5244), [\#5250](https://github.com/matrix-org/synapse/issues/5250), [\#5296](https://github.com/matrix-org/synapse/issues/5296), [\#5299](https://github.com/matrix-org/synapse/issues/5299), [\#5343](https://github.com/matrix-org/synapse/issues/5343), [\#5347](https://github.com/matrix-org/synapse/issues/5347), [\#5356](https://github.com/matrix-org/synapse/issues/5356))
- Specify the type of reCAPTCHA key to use. ([\#5283](https://github.com/matrix-org/synapse/issues/5283))
- Improve sample config for monthly active user blocking. ([\#5284](https://github.com/matrix-org/synapse/issues/5284))
- Remove spurious debug from MatrixFederationHttpClient.get_json. ([\#5287](https://github.com/matrix-org/synapse/issues/5287))
- Improve logging for logcontext leaks. ([\#5288](https://github.com/matrix-org/synapse/issues/5288))
- Clarify that the admin change password API logs the user out. ([\#5303](https://github.com/matrix-org/synapse/issues/5303))
- New installs will now use the v54 full schema, rather than the full schema v14 and applying incremental updates to v54. ([\#5320](https://github.com/matrix-org/synapse/issues/5320))
- Improve docstrings on MatrixFederationClient. ([\#5332](https://github.com/matrix-org/synapse/issues/5332))
- Clean up FederationClient.get_events for clarity. ([\#5344](https://github.com/matrix-org/synapse/issues/5344))
- Various improvements to debug logging. ([\#5353](https://github.com/matrix-org/synapse/issues/5353))
- Don't run CI build checks until sample config check has passed. ([\#5370](https://github.com/matrix-org/synapse/issues/5370))
- Automatically retry buildkite builds (max twice) when an agent is lost. ([\#5380](https://github.com/matrix-org/synapse/issues/5380))
