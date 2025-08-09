+++
title = "Room Administration"
template = "docs/with_menu.html"
weight = 250
[extra]
updated = "2025-08-06T17:00:00Z"
authors = ["T&S R&D WG", "Website & Content WG"]
+++

## Room Upgrades

### What's a room upgrade? (Why) should I upgrade my room?

Rooms are a central concept to Matrix: they are where messages between users are exchanged.
To facilitate this, there are certain rules which determine how a room works from basics like ID formats to algorithms about how certain events interact with each other.
Such a set of rules is assigned a "[room version](https://spec.matrix.org/latest/rooms/)" so that when the rules need to get updated, it does not mess with the expectations already established in an existing room.
Nevertheless, it is often desirable to eventually migrate the existing room to the new room version to be able to enjoy the new features or fixes.
The Matrix way to handle this is to create a new room with the desired settings and create a link between old and new room.
The old room is then considered "[upgraded](https://spec.matrix.org/latest/client-server-api/#room-upgrades)" to the new room.

Beyond this main use case, there are some additional cases where you might want to replace an existing room with a new room.
Matrix does not prescribe an order in which to upgrade, so "room downgrades" or "room sidegrades" are possible using the same process.
For example, rooms can have certain settings that are fixed and cannot be changed in hindsight.
This includes for example enabling end-to-end encryption, or determining the room creator.
Similarly, this process could be used in rooms up to version 12 to remove admins from a room or to adjust creators from room version 12 onwards.

<!-- TODO: Fixing split rooms, see chapter below? -->

On August 11th 2025 there is a [planned](@/blog/2025/07/2025-07-16-security-predisclosure.md) coordinated security release intoducing the new room version 12, with a security disclosure following on August 14th.
Affected rooms should be upgraded within a reasonable time frame.

<!-- in which cases is this relevant? as far as we know rooms that may contain malicious homeservers, i.e. primarily public rooms -->

### How to upgrade a room

{% notice_box() %}
We recommend to read this chapter first in its entirety and make a plan before starting to execute any upgrades.
Room upgrades are not a frictionless process and you want to get it right first try to cause as little friction to your community as possible.
{% end %}

**Prerequisites:**  
Executing a room upgrade in its entirety, including establishing the link between the rooms, requires the executing user to have a sufficient amount of rights ("[power level](https://spec.matrix.org/latest/client-server-api/#mroompower_levels)" to send a [`m.room.tombstone`](https://spec.matrix.org/latest/client-server-api/#server-behaviour-19) event) in the room that they want to upgrade.

**Upgrading:**  
Clients that [support upgrading rooms](#sending-room-upgrades) usually offer a button or similar in their UI when an upgrade is available.
Sometimes the client UI might allow you to choose the target room version, but usually the default room version defined by the server is used.

If the option is missing unexpectedly, it is possible that the combination of your client's UI and your [homeserver](@/docs/matrix-concepts/elements-of-matrix/_index.md#homeserver)'s configuration does not recommend an upgrade at this time.
Read on to learn how to upgrade anyway.

**Advanced upgrading:**  
There are some reasons why your client might not be showing you the upgrading UI despite an upgrade being available, including:
- Your homeserver implementation or admin doesn't recommend it, via the [server's configuration](https://spec.matrix.org/latest/client-server-api/#mroom_versions-capability).
- Your client only recommends upgrading from or between certain versions.

In these cases you can use e.g. Element Web's `/upgraderoom <version>` chat command after [enabling the developer tools](https://docs.element.io/latest/element-support/frequently-asked-questions/?h=devtools#matrix-general).
You can also downgrade and sidegrade in this way.

**Limitations:**  
While the [Matrix specification](https://spec.matrix.org/v1.15/client-server-api/#server-behaviour-19) is not overly strict about it, your homeserver will execute the room upgrade on a best effort basis, trying to create the new room with settings matching the old room.
The decentralised nature of Matrix can lead to circumstances that cannot be covered automatically by your homeserver.
We suggest considering the following recommendations to mitigate this.

#### Recommendations

This is a non-exhaustive list of recommendations to consider when planning a room upgrade.
Which of these cases apply to your room depends on your specific setup, for example size of your community.
For more background information and reasoning about the recommendations, see the "[Limitations](#limitations-and-things-to-consider)" section further below.

**Choose the "right" account on the "right" server** to execute your upgrade.  
The choice of the account starting the upgrade implies the homeserver that will perform the upgrade.

1. Upgrading a room means that the room members need to receive the info about the upgrade and then join the new room.
   The server performing the upgrade by necessity becomes the center of attention here for a while, acting as a gateway to the new room in a sense.
   It thus makes sense to choose a server that is fast and well connected so it can handle all the joins following the room upgrade itself well.
   If your community is centered around a certain server, it probably makes sense use that one.
2. You as well as users on other servers may have set up [aliases](https://spec.matrix.org/latest/client-server-api/#room-aliases) - shareable addresses to find the room that are hosted by a specific server.
   By definition, a server can thus only update aliases itself hosts.
   Thus only aliases on the same homeserver will be transferred automatically.
   However you can (and should) always update the aliases on other servers after the upgrade.
3. If your community is using a space to organise its rooms, the user upgrading a room needs at least enough access to the parent space to update the reference from the old to the upgraded room.
4. Room version 12 introduces some changes to room ownership semantics, such as irrevokable full control of the room.
   Using a separate service account to execute the upgrade means that this account will be the creator of the new room with the special access rights.
   It being a special account means you can manage access to it among your admins independently of the rules Matrix imposes on you.

- ensure your bots and integrations are reconfigured to the new room
  - particularly moderation tooling
  - consider if you need to copy some room state over, e.g. hookshot configuration
- if your old room was published in the public room directory, you might have to update the reference to the new room manually
- plan with rate limits
  - servers will only allow you to create so many new rooms within a certain time, so you might get stuck half-way if you have many rooms. a workaround would be to use a special account that your server admin has excepted from this rate limiting. for example, your moderation bot account is a good candidate for this.
  - servers will only allow you to send a certain amount of invites as well as only allow users to join proactively at a certain rate
  - if your community has a lot of rooms that are being upgraded, you might consider sending follow-up pings to the old rooms to make sure everyone got notified about every room, since it is easy to lose a room due to the different notification and rate limiting mechanics in play
- remind your users that they may need to "complete" the update on their side
  - e.g. their non-canonical spaces, room directories, external aliases
- send a message linking to the new room into the old room to support clients without support for room upgrades (see list below). you might consider pining the message, using a room ping, etc.

### Limitations and things to consider

- Matrix does not tightly define what clients or servers do when using the room upgrade function (link to spec)
- ...
- Rate limits
  - for executing upgrades (room creation)
  - for inviting users
  - for users (re-)joining proactively
- Upgrading spaces
- Upgrading rooms in spaces
  - spaces you own
  - spaces others own you know nothing about
- Moving external aliases that may not be visible to you
- Moving over integrations with external references to the room (bridges? Moderation bots? Webhooks?)
- Migrating certain room state (e.g. custom state events)
- Certain room state getting carried over unintentionally (e.g. bans)
- Restricted room join references? Does anybody care about those?
- Published Room directory
  - on other servers
  - when the room directory is not writable by users
- Cover clients that do not support tombstones -> need to send a link, pin, etc in the old room that links to the new one
- Making old rooms read-only
  - Some clients make rooms read-only when they see a tombstone even when technically that's not the case
- Matrix.org premium accounts
  - free users will be able to upgrade public rooms (<https://matrix.to/#/!sWpnrYUMmaBrlqfRdn:matrix.org/%24G6iZU-2eJu5QQgdxu5yMX2aXza642UKMCxyvLjpMMEI?via=matrix.org&via=t2l.io&via=element.io>)
- Can upgrades be undone? (Bell cant be unrung but you can fight over it.)
- funkyness causing both old and new version of a room appearing in the room list?
- losing room upgrades in the noise of many notifications and with possible rate limiting
- Upgrading invite only rooms
  - pro tip: set join rule to restricted by the predecessor

### Clients supporting room upgrades

The following lists are not comprehensive.
If your client supports room upgrades, please consider [contributing](https://github.com/matrix-org/matrix.org/blob/main/content/docs/communities/administration/_index.md) to this list.

#### Sending room upgrades

- Element Web/Desktop
- Fractal
- NeoChat
- FluffyChat

#### Following Tombstones to the new room

- Element Web/Desktop
- Fractal
- NeoChat
- FluffyChat, probably
- Tammy
- Nheko

### Changes in room v12?

- new concept of creators with infinite PL that cannot be dropped means new semantics
- suggest that communities use a (multiple?) system account(s) the access to which can be managed externally, e.g. when community leadership changes. has additional benefits of rate limits

### How to upgrade a room (advanced)

- aka client driven upgrades
- step by step guide on how to plan a manual upgrade as comprehensively as possible

### Tools and scripts

### Split rooms

- how to fix a split room using room upgrades?

### References and further reading
