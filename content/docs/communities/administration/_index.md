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

<!-- TODO: in which cases is this relevant? as far as we know rooms that may contain malicious homeservers, i.e. primarily public rooms -->

### How to upgrade a room

{% notice_box() %}
We recommend to read this chapter first in its entirety and make a plan before starting to execute any upgrades.
Room upgrades are not a frictionless process and you want to get it right first try to cause as little friction to your community as possible.
{% end %}

**Prerequisites:**  
Executing a room upgrade in its entirety, including establishing the link between the rooms, requires the executing user to have a sufficient amount of rights ("[power level](@/docs/communities/moderation/_index.md#power-levels)" to send a [`m.room.tombstone`](https://spec.matrix.org/latest/client-server-api/#server-behaviour-19) event) in the room that they want to upgrade.

**Upgrading:**  
Clients that [support upgrading rooms](#sending-room-upgrades) usually offer a button or similar in their UI when an upgrade is available.
Sometimes the client UI might allow you to choose the target room version, but usually the default room version defined by the [homeserver](@/docs/matrix-concepts/elements-of-matrix/_index.md#homeserver) is used.

If the option is missing unexpectedly, it is possible that the combination of your client's UI and your homeserver's configuration does not recommend an upgrade at this time.
Read on to learn how to upgrade anyway.

**Advanced upgrading:**  
There are some reasons why your client might not be showing you the upgrading UI despite an upgrade being available, including:
- Your homeserver implementation or admin doesn't recommend it, via the [homeserver's configuration](https://spec.matrix.org/latest/client-server-api/#mroom_versions-capability).
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

**Choose the "right" account on the "right" homeserver** to execute your upgrade.  
The choice of the account starting the upgrade implies the homeserver that will perform the upgrade.
Here are some important factors to guide your choice:

1. Upgrading a room means that the room members need to receive the info about the upgrade and then join the new room.
   The homeserver performing the upgrade by necessity becomes the center of attention here for a while, acting as a gateway to the new room in a sense.
   It thus makes sense to choose a homeserver that is fast and well connected so it can handle all the joins following the room upgrade itself well.
   If your community is centered around a certain homeserver, it probably makes sense use that one.
2. You as well as users on other homeservers may have set up [aliases](https://spec.matrix.org/latest/client-server-api/#room-aliases) - shareable addresses to find the room that are hosted by a specific homeserver.
   By definition, a homeserver can thus only update aliases itself hosts.
   Thus only aliases on the same homeserver will be transferred automatically.
   However you can (and should) always update the aliases on other homeservers after the upgrade.
3. If your community is using a space to organise its rooms, the user upgrading a room needs at least enough access to the parent space to update the reference from the old to the upgraded room.
4. Room version 12 introduces some changes to room ownership semantics, such as [irrevokable full control](https://github.com/matrix-org/matrix-spec-proposals/pull/4289) of the room.
   Using a separate service account to execute the upgrade means that this account will be the creator of the new room with the special access rights.
   It being a special account means you can manage access to it among your admins independently of the rules Matrix imposes on you.
   You could also consider setting up multiple such accounts across multiple homeservers as [`additional_creators`](https://github.com/matrix-org/matrix-spec-proposals/pull/4289), in case one of them becomes unavailable.

**Bots and integrations** may require additional manual migration steps.  
After upgrading, ensure your bots and integrations are reconfigured to the new room.
This is particularly important for any moderation tooling you are using, such as [mjolnir](@/docs/communities/moderation/_index.md#your-community-s-security-guard) or [draupnir](https://the-draupnir-project.github.io/draupnir-documentation/).
Check if your integrations need a configuration update, e.g. supplying them with the new room ID, and check that they have joined the upgraded room.
Some integrations also store state in Matrix rooms, so consider if you need to recreate or copy some room state over, as is the case for example with [Hookshot](https://matrix-org.github.io/matrix-hookshot/latest/usage/room_configuration.html) configuration.

**The [published room directory](https://spec.matrix.org/latest/client-server-api/#published-room-directory)** is a per-homeserver index of advertised rooms.  
Similarly to aliases, each homeserver can only update its own room directory.
If your old room was published in the room directory, you might have to update the reference to the new room manually, especially on those homeservers that did not perform the upgrade.

**Rate limits** might apply to your upgrade in several different ways.  
This means that certain actions such as creating a room can only be done a few times before needing to wait.

1. Homeservers will only allow you to create a certain amount of new rooms within a certain time, so you might get stuck half-way if you have many rooms to upgrade.
   Using a special account as mentioned above can work around this: some servers allow their admins to specify accounts that are exempt from rate limits.
   For example, your moderation bot account can be a good candidate for this, as it usually already has exemptions so it can execute many moderation actions in a short amount of time.
2. Homeservers will only allow you to send a certain amount of invites as well as...
3. ...only allow users to join public rooms at a certain rate. It may make sense for your community to inform your users about this up front.
4. Homeservers will only allow to join a single user to join a certain amount of rooms at a time.
   If your community has a lot of rooms that are being upgraded, you users might receive a lot of room upgrade notifications asking them to join the upgraded room, but they might get rate-limited depending on *their* homeserver's configuration.
   You might thus consider sending follow-up pings to the old rooms to make sure everyone got notified about every room and followed the upgrade successfully, since it is easy to lose a room due to the different notification and rate limiting mechanics in play.

**Communicate the upgrade plans** to your users.  
There are several situations that users will need to handle on the "receiving" side.
For example, there might be aliases, room directories, and spaces referencing your room, which you might not even be aware of and that will need to be updated by the respective users.

There are also some [clients that do not have support](#following-tombstones-to-the-new-room) to find and join the upgraded room from the old room.
You send a manual message into the old room with a link to the new room as a workaround for these users.
You might consider pinning the message, using a room ping, renaming the old room, and similar methods to make sure your users are aware of the upgrade.

### Clients supporting room upgrades

The following lists are not comprehensive.
If your client supports room upgrades, please consider [contributing](https://github.com/matrix-org/matrix.org/blob/main/content/docs/communities/administration/_index.md) to this list.

#### Sending room upgrades

- Element Web/Desktop
- Fractal
- NeoChat
- FluffyChat

{{ figure(
    img="upgrade-command.avif"
    caption="Executing an upgrade using the `/upgraderoom <version>` command in Element Web."
) }}

#### Following tombstones to the new room

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

The Matrix community has created some tooling to aid with performing room upgrades which you might find useful.

- <https://gist.github.com/turt2live/a99c8e794d6115d4ddfaadb72aabf063>
- <https://gitea.blesmrt.net/mikaela/scripts/src/branch/master/bash/matrix-upgrade-room.bash>
- <https://github.com/FSG-Cat/Cats-PS-Collection/releases/tag/FMA_v1.0>
- <https://codeberg.org/Apothecary/apothecary-upgrade/src/branch/main/upgrades.py>

### References and further reading

Community admins are documenting their experiences about upgrading rooms which can be useful as additional references.

- <https://gadgetbridge.org/blog/managing-a-public-end-to-end-room-on-matrix-lessons-learned/#the-room-upgrade-may-2025>
- <https://aminda.eu/matrix/#what-exactly-is-room-upgrading>
