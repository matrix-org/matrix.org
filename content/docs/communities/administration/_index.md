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

- Rooms have certain way of working that are bound to room versions
- Rooms can have other settings that are fixed and cannot be changed in hindsight (e.g. e2ee, room creator)
- Demoting admins (sub room v12) or removing creators (room v12+)
- The Matrix way to handle this is to create a new room with the desired settings and create a link between old and new room. The old room is then considered "upgraded" to the new room.
- Split rooms, see chapter below?
- The current reason at hand is room v12 releasing to fix a security issue (in which cases is this relevant? as far as we know rooms that may contain malicious homeservers, i.e. primarily public rooms)
- Room upgrades can only be executed by users with sufficient powerlevel

### How to upgrade a room

- We recommend to read this chapter first in its entirety and make a plan before starting to execute any upgrades. Room upgrades are a bit messy due to their nature and you want to get them right first try to cause as little friction as possible.
- Clients that support upgrading rooms may offer a button or similar in UI. Might depend on your homeserver allowing this.
- Sometimes you might be able to choose the room version, but usually the default room version defined by the server is used.
- If you really need to upgrade before your homeserver admin recommends it by updating the server's config (TODO: add info for homeserver admins on how to do this?), then you can use e.g. Element Web's `/upgraderoom <version>` chat command after enabling the developer tools (TODO: link to Element web docs?)
- Recommendations
  - for reasoning about this, see the "Limitations" section
  - ensure your bots and integrations are reconfigured to the new room
    - particularly moderation tooling
    - consider if you need to copy some room state over, e.g. hookshot configuration
  - use the "right" account on the "right" server
    - the server should be fast and well connected
    - if your community is centered around a certain server, probably use that one
    - only aliases on the same homeserver will be transferred automatically
    - consider romo v12 creator semantics: use a service account the access to which you can control outside of the rules of matrix
    - if your community is using a canonical space, the one upgrading the room needs at least enough access to the parent space to update the reference from the old to the upgraded room
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

non-comprehensive list, please PR to add your client!

- Sending room upgrades
  - Element Web -> where/how?
  - Fractal
  - Neochat
  - FluffyChat
- Following Tombstones to the new room
  - Element Web
  - Fractal
  - Neochat, probably
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
