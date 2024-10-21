+++
date = "2023-07-28T14:00:00Z"
title = "Postponing the Libera.Chat deportalling"

[taxonomies]
author = ["Thib"]
category = ["Bridges", "Security"]
+++

We have recently announced that [we will be honouring Libera Chat’s request](https://matrix.org/blog/2023/07/deportalling-libera-chat/) to turn off portalled rooms on the Libera.Chat bridge maintained by the Matrix.org Foundation. The changes were originally scheduled to be effective on 31st July. In the meantime, we posted [instructions for people to turn their portalled rooms into plumbed ones](https://matrix.org/blog/2023/07/make-sure-libera-bridge-keeps-working/) so the bridge keeps working for them.

Some stability issues on the bridge have prevented people from turning their portalled rooms into plumbed ones. We have been actively working on resolving those issues since the first reports and the situation is gradually improving. However, at this point, we do not believe the plumbed mode can be considered sufficiently stable yet.

<!-- more -->

Additionally, as part of the project we have been made aware of several new bridge security issues. These issues must be patched ahead of the plumbing stability work thereby increasing the overall scope of the project. The limited resources of the[Matrix.org](http://Matrix.org) Foundation didn’t allow us to meet the deadline in time.

Rather than plough ahead with the original timeline and risking splitting communities, we have asked Libera Chat for an extension for turning off portal rooms to ensure successful migrations in order to make sure the bridge is ready to handle the traffic in plumbed rooms and to leave people enough time to migrate their rooms after the stabilisation work. We have asked the Libera Chat staff to allow us to postpone the deportalling to Friday 11 August, which they accepted. We’re grateful to the Libera Chat team for accommodating us.

We will turn off the new portal creation on Monday 31 July, but will leave the existing portals active. On Friday 11 August we will make all the portal rooms read-only, and will send a message in each portalled room to list all the public rooms plumbed to the same channel on IRC.

## Security release information

On Monday 31st, we will release new security updates for several bridges and the matrix-appservice-bridge library, including the IRC bridge. These will be:

- matrix-appservice-bridge 9.0.1
- matrix-appservice-irc 1.0.1
- matrix-appservice-slack 2.1.2
- matrix-hookshot 4.4.1

We, and the community, have found several vulnerabilities classified as High severity and strongly recommend upgrading as soon as possible after the release.

A full disclosure of the vulnerabilities will be out 3 days after the release, to allow people time to upgrade.
