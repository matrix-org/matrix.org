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

Rooms are a central concept to Matrix: they are where users exchange messages.
Each room has a set of rules that describe how a room works, such as setting ID formats, or how certain events interact.
These sets of rules form a "[room version](https://spec.matrix.org/latest/rooms/)" so that when rules need to change, it does not mess with the expectations already established in an existing room.
When Matrix adds new features, or when bugs emerge, it can be necessary to change those rules.
But a Matrix room will not follow the latest rules automatically!
To enjoy the new features and the bug fixes, rooms need to be "upgraded".
The Matrix way to handle this is to create a new room with the desired settings and create a link between old and new room.
The old room is then considered [upgraded](https://spec.matrix.org/latest/client-server-api/#room-upgrades) to the new room.

{% notice_box() %}
On August 11th 2025 there was a [planned](@/blog/2025/08/2025-08-11-security-release.md) coordinated security release introducing the new room version 12, with a security disclosure following on August 14th.
If you are responsible for public rooms, you should make a plan to upgrade those rooms. The rest of this guide will help you to build that plan.
{% end %}

#### Advanced use cases

Some room settings are immutable without moving to a new version of the room.
So, to change the room's end-to-end encryption setting, or the room creator, you would need to upgrade.
As Matrix room versions are not ordered, it is possible to "downgrade" or "sidegrade" a room's version, e.g. to go from version 12 to version 12.
For example, in rooms up to version 12, you could "sidegrade" to remove admins from a room.
Likewise, to adjust creators from room version 12 onwards.

<!-- TODO: Fixing split rooms, see chapter below? -->

### How to upgrade a room

{% notice_box() %}
We recommend to read this chapter first in its entirety and **make a plan** before starting to upgrade rooms.
Room upgrades are disruptive for users.
You want to get it right first try to cause as little friction to your community as possible.
{% end %}

#### Prerequisites

When you upgrade a room, the user performing the upgrade needs the permission ("[power level](@/docs/communities/moderation/_index.md#power-levels)") to send a [`m.room.tombstone`](https://spec.matrix.org/latest/client-server-api/#server-behaviour-19) event.
This might be named differently in client UI, e.g. "Upgrade the room" in Element Web.

#### Upgrading 

Clients that [support upgrading rooms](#sending-room-upgrades) usually offer a button or similar in their UI when an upgrade is available.
Sometimes the client UI  allows you to choose the target room version, but usually it uses the default room version defined by the [homeserver](@/docs/matrix-concepts/elements-of-matrix/_index.md#homeserver).

If the option is missing, the combination of your client and your homeserver's configuration may not recommend an upgrade.
Read on to learn how to upgrade anyway.

#### Advanced upgrading  

There are some reasons why your client might not be showing you the upgrading UI despite an upgrade being possible, including:
- Your homeserver implementation or admin doesn't advertise support for the room version, via the [homeserver's configuration](https://spec.matrix.org/latest/client-server-api/#mroom_versions-capability).
- Your client only recommends upgrading from or between certain versions.

In these cases you can use e.g. Element Web's `/upgraderoom <version>` chat command.
You can also downgrade and sidegrade in this way.

#### Limitations

While the [Matrix specification](https://spec.matrix.org/v1.15/client-server-api/#server-behaviour-19) is not strict about it, your homeserver will typically perform the room upgrade on a best effort basis, trying to create the new room with settings matching the old room.
The decentralised nature of Matrix can lead to circumstances that your homeserver cannot automatically mitigate.
The following recommendations can help.

### Recommendations

This is a non-exhaustive list of recommendations to consider when planning a room upgrade.
Which of these cases apply to your room depends on your specific setup, for example the size of your community.

#### Choose the right account

You should choose the "right" account on the "right" homeserver to perform your upgrade.
The account that starts the upgrade decides which homeserver performs the upgrade.
Here are some important factors to guide your choice:

1. Upgrading a room means that the room members need to receive the info about the upgrade and then join the new room.
   The homeserver performing the upgrade initially acts as a gateway to the new room.
   You want to choose a homeserver that is fast and well connected so it can handle all the joins following the room upgrade.
   If your community centers around a certain homeserver, it makes sense use that one.
2. Users may have set up [aliases](https://spec.matrix.org/latest/client-server-api/#room-aliases) - shareable addresses to find the room that are hosted by a specific homeserver.
   By definition, a homeserver can only update aliases that it hosts.
   Only aliases on the upgrading homeserver transfer automatically.
   However, you can (and should) always update the aliases on other homeservers after the upgrade, using respective accounts on these servers.
3. If your community is using a space to organise its rooms, the user upgrading a room needs at least enough permissions in the parent space to update the reference from the old to the upgraded room.
4. Room version 12 introduces some changes to room ownership semantics, such as [irrevocable full control](https://github.com/matrix-org/matrix-spec-proposals/pull/4289) of the room.
   For communities, you should use a long-lived, trusted account, such as a moderation bot account, to upgrade your rooms.
   Using a separate service account to execute the upgrade means that this account will be the creator of the new room with the new special access rights.
   As a special account, you can manage access to it among your admins outside of Matrix.
   You could also consider setting up backup accounts on homeservers as [`additional_creators`](https://github.com/matrix-org/matrix-spec-proposals/pull/4289), in case one of them becomes unavailable.

#### Bots and integrations

Bots and integrations in your rooms may require additional manual migration steps.
After upgrading, reconfigure your bots and integrations for the new room.
This is particularly important for any moderation tooling you are using, such as [draupnir](https://the-draupnir-project.github.io/draupnir-documentation/) or [mjolnir](@/docs/communities/moderation/_index.md#your-community-s-security-guard).
Check if your integrations need a configuration update, e.g. supplying them with the new room ID, and check that they have joined the upgraded room.
Some integrations also store state in Matrix rooms, so consider if you need to recreate or copy some [room state](https://spec.matrix.org/latest/client-server-api/#types-of-room-events) over, as is the case for example with [Hookshot](https://matrix-org.github.io/matrix-hookshot/latest/usage/room_configuration.html) configuration.

#### Room Directories

The [published room directory](https://spec.matrix.org/latest/client-server-api/#published-room-directory) is a per-homeserver index of advertised rooms.
As with aliases, each homeserver can only update its own room directory.
If your old room is in the room directory, you might have to update the reference to the new room manually, especially on those homeservers that did not perform the upgrade.

#### Rate limits

Rate limits might apply to your upgrade in several different ways.
This means that certain actions, such as creating a room, can only be done a few times before needing to wait.

1. Homeservers will only allow you to create a certain amount of new rooms within a certain time, so you might get stuck half-way if you have many rooms to upgrade.
   Using a special account as mentioned above can work around this: some servers allow their admins to specify accounts that are exempt from rate limits.
   For example, your moderation bot account can be a good candidate for this, as it usually already has exemptions so it can execute many moderation actions in a short amount of time.
2. Homeservers will only allow you to send a certain amount of invites as well as...
3. ...only allow users to join public rooms at a certain rate. It may make sense for your community to inform your users about this up front.
4. Homeservers will only allow a single user to join a certain amount of rooms at a time.
   If your community has a lot of rooms that are being upgraded, your users might receive a lot of room upgrade notifications asking them to join the upgraded room, but they might get rate-limited depending on *their* homeserver's configuration.
   You might thus consider sending follow-up pings to the old rooms to make sure everyone got notified about every room and followed the upgrade successfully, since it is easy to lose a room due to the different notification and rate limiting mechanics in play.

#### Communicate the upgrade plans to your users

There are several situations that users will need to handle on the "receiving" side.
For example, there might be aliases, room directories, and spaces referencing your room, which you might not be aware of and that will need to be updated by the respective users.

There are also some [clients that do not have support](#following-tombstones-to-the-new-room) to find and join the upgraded room from the old room.
You should send a manual message into the old room with a link to the new room as a workaround for these users.
You might consider pinning the message, using a room ping, renaming the old room, and similar methods to make sure your users are aware of the upgrade.

If you're upgrading a room that is not public, you will need to invite the old members or make the new room joinable in another way, so users can join the new room when prompted.
Some clients offer an option to automatically invite all users to the new room.

### Clients supporting room upgrades

The following lists are not comprehensive.
If your client supports room upgrades, please consider [contributing](https://github.com/matrix-org/matrix.org/blob/main/content/docs/communities/administration/_index.md) to this list.

#### Sending room upgrades

- Element Web/Desktop
- Element Classic Android
- Fractal
- NeoChat
- Quaternion
- FluffyChat
- < polycule >
- Cinny

{{ figure(
    img="upgrade-command.avif"
    caption="Executing an upgrade using the `/upgraderoom <version>` command in Element Web."
) }}

#### Following tombstones to the new room

- Element Web/Desktop
- Element X iOS and Android
- Element Classic iOS and Android
- Fractal
- NeoChat
- Quaternion
- FluffyChat
- < polycule >
- Cinny
- Tammy
- Nheko

### Significant changes between room versions

You can find comprehensive information about the differences between room versions in the [Matrix specification](https://spec.matrix.org/latest/rooms/).
Here is a short summary of some significant changes.

#### Upgrading to room version 12

Find a summary of the most relevant changes in the [security pre-disclosure](@/blog/2025/07/2025-07-16-security-predisclosure.md) on the blog.

Further info and recommendations can be found in [Matrix Live S11E05 - Project Hydra](https://www.youtube.com/watch?v=Xje32fIIUyg&t=1240s).
{{youtube_player(video_id="Xje32fIIUyg",start="1240",noscript_text="Matrix Live S11E05 - Project Hydra")}}

### Tools and scripts

The Matrix community has created some tooling to aid with performing room upgrades which you might find useful.

- <https://gist.github.com/turt2live/a99c8e794d6115d4ddfaadb72aabf063>
- <https://gitea.blesmrt.net/mikaela/scripts/src/branch/master/bash/matrix-upgrade-room.bash>
- <https://github.com/FSG-Cat/Cats-PS-Collection/releases/tag/FMA_v1.0>
- <https://codeberg.org/Apothecary/apothecary-upgrade/src/branch/main/upgrades.py>

Further, the following tools can help you assess what room versions the servers participating in your room support.

- <https://github.com/maubot/rsvc>
- <https://codeberg.org/june64/mrvc/>

### References and further reading

Community admins are documenting their experiences about upgrading rooms which can be useful as additional references.

- <https://gadgetbridge.org/blog/managing-a-public-end-to-end-room-on-matrix-lessons-learned/#the-room-upgrade-may-2025>
- <https://aminda.eu/matrix/#what-exactly-is-room-upgrading>
