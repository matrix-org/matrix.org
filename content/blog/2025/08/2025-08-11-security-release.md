+++
date = "2025-08-11"
title = "Security Release"

[taxonomies]
author = ["Jim Mackenzie, VP Trust & Safety — The Matrix.org Foundation"]
category = ["Security"]
+++

Hi all,

Last month we issued a [Pre-disclosure: Upcoming coordinated security fix for all Matrix server implementations](@/blog/2025/07/2025-07-16-security-predisclosure.md), describing a coordinated release to fix two high severity protocol vulnerabilities (CVE-2025-49090; the other not yet allocated a CVE). That release is now available as of 17:00 UTC on August 11, 2025. Server updates are now available, and MSCs & spec updates will follow on Thursday, August 14, 2025, bringing us to version 1.16 of the spec later in the month, and introducing room version 12.

<!-- more -->

## What is changing?

Room version 12 includes some changes to the semantics for room creators. Room creators are now privileged over other users in the room as of [MSC4289](https://github.com/matrix-org/matrix-spec-proposals/pull/4289). There is also a new `additional_creators` field in the `m.room.create` event for a room.

The default power level in room version 12 for sending `m.room.tombstone` events to upgrade rooms is now 150. This stops normal admins from upgrading the room (and so assuming creator privileges) - instead, a creator has to explicitly boost an admin's power level to 150 in order to let them upgrade the room and effectively assume creator rights going forwards.

Room IDs are now hashes of the `m.room.create` event via [MSC4291](https://github.com/matrix-org/matrix-spec-proposals/pull/4291). This changes the format of the room ID that you are used to seeing, and your Matrix client will need to be updated to handle this new format.

## What do I need to do?

### As a Matrix user

Upgrade your client to the latest version, making sure that it supports room version 12. Check your client’s upgrade notes or documentation for information on room version 12 support.

### As a Matrix server administrator

Upgrade your server software to the latest version, making sure that it supports room version 12. The following implementations are releasing fixes shortly as part of this coordinated update:

* [Conduit](https://conduit.rs/)
* [Continuwuity](https://continuwuity.org/)
* [ejabberd](https://www.ejabberd.im/index.html)
* [Dendrite](https://element-hq.github.io/dendrite/)
* [Rocket.chat](https://www.rocket.chat/)
* [Synapse](https://github.com/element-hq/synapse)
* [Synapse Pro](https://element.io/server-suite/synapse-pro)
* [Tuwunel](https://github.com/matrix-construct/tuwunel)

For questions around these implementations, please visit their respective support rooms.

Note: Whether or not you need to apply the security updates depends on your homeserver configuration:

* *Single instance, unfederated homeserver*  
  You are running a single instance of a Matrix homeserver, and federation is disabled. There is nothing you need to do urgently.
* *Homeservers operating in a restricted federation*  
  Your server(s) are running as part of a restricted federation - i.e. you have mechanisms in place (homeserver configuration, network restrictions etc) that limit which other homeservers your homeservers can talk to.
  * If you *fully trust* all of the homeservers in this restricted federation then there is nothing you need to do urgently.
  * If you *do not fully trust* all of the homeservers in this restricted federation (e.g. if they are run by partners outside of your direct span of control), you should update your server as soon as possible.
* *Homeservers participating in open, unrestricted federation*  
  If your server is participating in an open federation, you should update your server as soon as possible.

### As a room owner or community

If your rooms or spaces federate with untrusted servers, you should **plan** to upgrade your rooms to room version 12. The urgency of this upgrade may depend on your community’s readiness for the changes. At the Foundation, we are aiming to upgrade our rooms in September 2025. There needs to be enough time to allow clients and servers participating in your room to support version 12 *before upgrading your room*.

The new version includes some changes to room creator semantics, which means that choosing which user performs the upgrade needs some careful thought. Using a long-lived, trusted account, such as a moderation bot account, is advised. For more detailed advice, two of the Foundation Governing Board working groups — the Trust & Safety Research & Development Working Group, and the Website & Content Working Group — have collaborated on a guide for [upgrading rooms and spaces](@/docs/communities/administration/_index.md#room-upgrades) to version 12. That guide will help you to plan your upgrades and to make them happen.
