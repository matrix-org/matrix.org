
+++
date = "2023-06-16"
title = "This Week in Matrix 2023-06-16"

[taxonomies]
author = ["Thib"]
category = ["This Week in Matrix"]

[extra]
image = "<https://matrix.org/blog/img/matrix-logo.png>"
+++

## Matrix Live

{{ youtube_player(video_id="kJPQc0QqVMg") }}

## Dept of Spec 📜

[Andrew Morgan (anoa) [GMT-6]](https://matrix.to/#/@andrewm:element.io) reports

> Here's your weekly spec update! The heart of Matrix is the specification - and this is modified by Matrix Spec Change (MSC) proposals. Learn more about how the process works at <https://spec.matrix.org/proposals>.
>
> ## MSC Status
>
> **New MSCs:**
>
> * [MSC4030: Progressive image in Matrix](https://github.com/matrix-org/matrix-spec-proposals/pull/4030)
> * [MSC4029: \[WIP\] Fixing `X-Matrix` request authentication](https://github.com/matrix-org/matrix-spec-proposals/pull/4029)
> * [MSC4028: Push all encrypted events except for muted rooms](https://github.com/matrix-org/matrix-spec-proposals/pull/4028)
> * [MSC4027: Propose method of specifying custom images in reactions](https://github.com/matrix-org/matrix-spec-proposals/pull/4027)
>
> **MSCs in Final Comment Period:**
>
> * [MSC3989: Redact `origin` property on events](https://github.com/matrix-org/matrix-spec-proposals/pull/3989) (merge)
> * [MSC3821: Update the redaction rules, again](https://github.com/matrix-org/matrix-spec-proposals/pull/3821) (merge)
> * [MSC3077: Support for multi-stream VoIP](https://github.com/matrix-org/matrix-spec-proposals/pull/3077) (merge)
>
> **Accepted MSCs:**
>
> * [MSC4009: Expanding the Matrix ID grammar to enable E.164 IDs](https://github.com/matrix-org/matrix-spec-proposals/pull/4009)
>
> **Closed MSCs:**
>
> * _No MSCs were closed/rejected this week._
>
> ## Spec Updates
>
> This actually happened last week, but a huge shoutout to Kévin Commaille, aka [@zecakeh](https://github.com/zecakeh), for [their work on upgrading the OpenAPI schema data](https://github.com/matrix-org/matrix-spec/pull/1310) for the Matrix Spec to version 3.1. This schema describes all of the requests and responses for all endpoints in the spec, as well as various event types and other bits and pieces. It directly powers the [Matrix spec website](https://spec.matrix.org/), the [Matrix API Playground](https://playground.matrix.org/#overview) and several Client and Homeserver SDKs that generate code from it.
>
> With a diff of `+14,997 −12,660`, this was a multi-month effort of both implementation and review (thank you [@richvdh](https://github.com/richvdh) and [@KitsuneRal](https://github.com/KitsuneRal)!). This change will allow us to use all the new features that OpenAPI 3 has to offer, as well as generally keeps us up to date with modern tooling.
>
> Thank you!
>
> ## Random MSC of the Week
>
> The random MSC of the week is... [MSC3051: A scalable relation format](https://github.com/matrix-org/matrix-spec-proposals/pull/3051)!
>
> This MSC describes a different way of describing how an event relates to other events. In the current Matrix spec, you can use [the `m.relates_to` property](https://spec.matrix.org/v1.7/client-server-api/#forming-relationships-between-events) to indicate that this event (say, a reaction) relates to another event (say, a message) in a certain manner. You can specify how it relates using the `m.relates_to->rel_type` key; a value of "m.annotation" for reactions.
>
> But sometimes you may want to relate to multiple other events. For instance, what if that message you're reacting to is also in a thread? In fact, this MSC has come up recently as one possible way to solve the problem of efficiently discerning whether an event should belong in a thread or not ([discussion](https://github.com/matrix-org/matrix-spec-proposals/pull/4023#discussion_r1211964051)). This MSC isn't the only option for solving such a problem - [MSC4023](https://github.com/matrix-org/matrix-spec-proposals/pull/4023) would also work, and both have tradeoffs.
>
> MSC3051 could also allows for actions such as editing replies; both the text and the message it was a reply to. Neat!
>
> Do read the MSC and give feedback if relations is something that excites you.

<!-- more -->

## Dept of Servers 🏢

### Telodendria ([website](https://telodendria.io))

An open source Matrix homeserver implementation written from scratch in ANSI C and designed to be lightweight and simple, yet functional

[Jordan Bancino](https://matrix.to/#/@jordan:bancino.net) reports

> A Matrix homeserver written in ANSI C, targeting POSIX operating systems.
>
> * **Telodendria v0.3.0:** `v0.3.0` was just released earlier this week. It finishes out the client authentication portion of the specification, including a few basic profile management endpoints. This release also features full TLS support and some major architectural changes to make the code base easier to work with, the details of which I laid out in a previous TWIM.
> * **Cytoplasm:** A lot of the code that makes up Telodendria has been broken out into a separate C library for general-purpose use. I am calling this library **Cytoplasm**. At some point, it will live a life of its own, with its own website, releases, and Matrix rooms. But for now, it is still an integral part of Telodendria, so while it can be built and installed without Telodendria, you'll have to download the Telodendria source code to get it.
> * **Coming Soon:** I think the main thing that has a lot of us really excited around here is that the next step for Telodendria is implementing rooms and events. I'm hoping that the next release, `v0.4.0`, due around the end of this year, will have all of the necessary components in place to allow very basic communication between local users.
>
> As always, feel free to say hi in [#telodendria-general:bancino.net](https://matrix.to/#/#telodendria-general:bancino.net), and for more details, join [#telodendria-newsletter:bancino.net](https://matrix.to/#/#telodendria-newsletter:bancino.net) to read the full-length newsletters. If you want to support Telodendria, please [donate](https://telodendria.io/#donate) to the project.

### Synapse ([website](https://github.com/matrix-org/synapse/))

Synapse is a Matrix homeserver implementation developed by the matrix.org core team

[Shay](https://matrix.to/#/@shayshay:matrix.org) announces

> This week we released 1.86.0rc2. Here are a few of the highlights:
>
> * Support resolving a room's [canonical alias](https://spec.matrix.org/v1.7/client-server-api/#mroomcanonical_alias) via the module API
> * Speed up `/messages` by backfilling in the background when there are no backward extremities where we are directly paginating
> * Correctly clear caches when we delete a room
> * Enable support for [MSC3952](https://github.com/matrix-org/matrix-spec-proposals/pull/3952): intentional mentions
>
> and much more. If you'd like to take a deep dive into the changes, you can find the release notes [here](https://github.com/matrix-org/synapse/releases/tag/v1.82.0) and as always, if you encounter a bug feel free to report it at <https://github.com/matrix-org/synapse/issues/new/choose>.

## Dept of Clients 📱

### Neochat ([website](https://invent.kde.org/network/neochat))

A client for matrix, the decentralized communication protocol

[Tobias Fella](https://matrix.to/#/@tobiasfella:kde.org) says

> Here's what's happened in the last three weeks of NeoChat development:
>
> * You can now create spaces in NeoChat. You can't edit them yet, but it's a start 😀.
> * NeoChat will no longer show outdated notifications.
> * As part of the matrixification of [Itinerary](https://apps.kde.org/itinerary/) (stay tuned for more info about that), Volker implemented support for viewing MSC3489 Live Location Shares.

### Ement.el ([website](https://github.com/alphapapa/ement.el))

Matrix client for Emacs

[alphapapa](https://matrix.to/#/@alphapapa:matrix.org) says

> TWIM: [Ement.el](https://github.com/alphapapa/ement.el), a Matrix client for the [GNU Emacs](https://www.gnu.org/software/emacs/) text editor and Lisp machine, has been released at v0.10.  Changes include:
>
> **Security Fixes**
>
> * When uploading a GPG-encrypted file (i.e. one whose filename ends in `.gpg`), if the recipient's private key or the symmetric encryption key were cached by Emacs (or a configured agent, like `gpg-agent`), Emacs would automatically decrypt the file while reading its contents and then upload the decrypted contents.  (This happened because the function `insert-file-contents` was used, which does many things automatically, some of which are not even mentioned in its docstring; refer to its entry in the Elisp Info manual for details.  The fix is to use `insert-file-contents-literally` instead.)  Thanks to `@welkinsl:matrix.org` for reporting.
>
> **Additions**
>
> * Support for Single Sign-On (SSO) authentication.  ([#24](https://github.com/alphapapa/ement.el/issues/24).  Thanks to [Jeffrey Stoffers](https://github.com/Necronian) for development, and to [Phil Sainty](https://github.com/phil-s), [Jakub Kadlčík](https://github.com/FrostyX), and [Juanjo Presa](https://github.com/oneingan) for testing.)
> * Bind `m` in room buffers to `ement-room-mark-read` (which moves read markers to point).
>
> **Changes**
>
> * Activating a space in the room list uses `ement-view-space` (which shows a directory of rooms in the space) instead of `ement-view-room` (which shows events in the space, which is generally not useful).
> * Command `ement-view-room`, when used for a space, shows a footer explaining that the buffer is showing a space rather than a normal room, with a button to call `ement-view-space` for it (which lists rooms in the space).
> * Command `ement-describe-room` shows whether a room is a space or a normal room.
> * Command `ement-view-space` shows the space's name and alias.
> * Command `ement-room-scroll-up-mark-read` moves the fully read marker to the top of the window (when the marker's position is within the range of known events), rather than only moving it when at the end of the buffer.  (This eases the process of gradually reading a long backlog of messages.)
> * Improve readme export settings.
>
> **Fixes**
>
> * Extra indentation of some membership events.  (Thanks to [Steven Allen](https://github.com/Stebalien).)
> * Customization group for faces.
> * Don't reinitialize `ement-room-list-mode` when room list buffer is refreshed.  ([#146](https://github.com/alphapapa/ement.el/issues/146).  Thanks to [Ted Reed](https://github.com/treed) for reporting.)
> * Don't fetch old events when scrolling to the bottom of a room buffer (only when scrolling to the top).  (Thanks to [Steven Allen](https://github.com/Stebalien).)
> * Minor improvements to auto-detection of homeserver URIs.  (See [#24](https://github.com/alphapapa/ement.el/issues/24#issuecomment-1569518713).  Thanks to [Phil Sainty](https://github.com/phil-s).)
> * Uploading of certain filetypes (e.g. Emacs would decompress some archives before uploading).  Thanks to `@welkinsl:matrix.org` for reporting.
> * Messages edited multiple times sometimes weren't correctly replaced.
>
> Feel free to join us in the chat room, [#ement.el:matrix.org](https://matrix.to/#/#ement.el:matrix.org).

### Element Web/Desktop ([website](https://github.com/vector-im/element-web))

Secure and independent communication, connected via Matrix. Come talk with us in [#element-web:matrix.org](https://matrix.to/#/#element-web:matrix.org)!

[Johannes Marbach](https://matrix.to/#/@johannesm:element.io) announces

> * Our changes to the notification settings are entering code review and we’ve started planning a beta release for further testing
> * The Compound design library has been integrated as a dependency and we started working on an initial color and typography pass
> * OIDC-native support is moving ahead. We’ve mostly finished provider discovery and are now implementing static and dynamic client registration.
> * Our call sounds have been normalized using LUFS. Thanks to JMoVS for contributing this improvement. 🙌

### Element X iOS ([website](https://github.com/vector-im/element-x-ios))

[Doug](https://matrix.to/#/@douge:matrix.org) announces

> * DMs will prompt you to re-invite the other user when trying to send a message after they left.
> * Messages that failed to send can now be tapped to retry sending.
> * Improvements to message decryption in notifications.
> * Colours from our Compound design system are now used throughout the app.
> * Adopted the new RoomList API from the Rust SDK.
> * Work continues on message forwarding, static location sharing and improvements to reactions.

### Element X Android ([website](https://github.com/vector-im/element-x-android))

Everything related to Element but not strictly bound to a client

[benoit](https://matrix.to/#/@benoit.marty:matrix.org) announces

> * Element X Android is getting more and more features and polishing, especially around the timeline. We will also work on the room list screen to make it as snappier as ever.

### Element iOS ([website](https://github.com/vector-im/element-ios))

Secure and independent communication for iOS, connected via Matrix. Come talk with us in [#element-ios:matrix.org](https://matrix.to/#/#element-ios:matrix.org)!

[Doug](https://matrix.to/#/@douge:matrix.org) reports

> * Version 1.10.13 is available on TestFlight with the Jitsi screen sharing feature and an increased voice message length of 5 minutes.

### Element Android ([website](https://github.com/vector-im/element-android))

Secure and independent communication for Android, connected via Matrix. Come talk with us in [#element-android:matrix.org](https://matrix.to/#/#element-android:matrix.org)!

[benoit](https://matrix.to/#/@benoit.marty:matrix.org) says

> * We have started the roll out of Element Android including the Crypto Rust SDK for 5 % of the users in production. We will create a new version 1.6.3 to fix an issue which occurs during the database migration.
> * In the meantime we are fixing more crashes and more ANR.

## Dept of SDKs and Frameworks 🧰

### simplematrixbotlib ([website](https://github.com/KrazyKirby99999/simple-matrix-bot-lib))

simplematrixbotlib is an easy to use bot library for the Matrix ecosystem written in Python and based on matrix-nio.

[imbev](https://matrix.to/#/@imbev:matrix.org) announces

> ### [v2.9.0](https://codeberg.org/imbev/simplematrixbotlib/src/tag/v2.8.0)
>
> ### Notes
>
> * Improvements :)
>
> ### Additions
>
> * Add sending of reactions
> * Add recovery if stored access token is invalid
> * Show proper error message when connection fails
>
> ### Modifications
>
> * Improve api docs
> * Fix circular import bug
> * Update matrix-nio dependency to 0.20
> * Update pillow dependency to 9.0
>
> ### Removals
>
> * None
>
> ### Deprecations
>
> * None

### matrix-rust-sdk ([website](https://github.com/matrix-org/matrix-rust-sdk))

Next-gen crypto-included SDK for developing Clients, Bots and Appservices; written in Rust with bindings for Node, Swift and WASM

[Jonas Platte](https://matrix.to/#/@jplatte:flipdot.org) says

> * [Fixed processing of state events for invited rooms in sliding sync](https://github.com/matrix-org/matrix-rust-sdk/pull/2039)
> * [Added `Timeline::cancel_send` for cancelling local echoes that failed to send](https://github.com/matrix-org/matrix-rust-sdk/pull/2048)
> * [Added `RoomList` API, replaces direct access to sliding sync for GUI clients](https://github.com/matrix-org/matrix-rust-sdk/pull/2035)
> * [Use `short_authentication_string` from `m.key.verification.start` in `m.key.verification.accept`](https://github.com/matrix-org/matrix-rust-sdk/pull/2061)
> * [Always fall back to auto-discovered sliding sync proxy URL](https://github.com/matrix-org/matrix-rust-sdk/pull/2058)
> * [Properly support the `hkdf-hmac-sha256.v2` MAC method for SAS verification](https://github.com/matrix-org/matrix-rust-sdk/pull/2064)
> * [Timeline: Add loading indicator before waiting for `prev_batch` token](https://github.com/matrix-org/matrix-rust-sdk/pull/2073)
> * [Make store requests in btch for `Room::get_members`](https://github.com/matrix-org/matrix-rust-sdk/pull/2021)
> * [Sliding Sync: Lazily generate and include the transaction id, only if it's useful](https://github.com/matrix-org/matrix-rust-sdk/pull/2063)
> * [Fix wrong room state for invites with Sliding Sync](https://github.com/matrix-org/matrix-rust-sdk/pull/2052)
> * [Make upload progress observable (WIP)](https://github.com/matrix-org/matrix-rust-sdk/pull/2088)
> * [`Notification` API (WIP)](https://github.com/matrix-org/matrix-rust-sdk/pull/2023)

## Dept of Bots 🤖

### TeXLily ([website](https://git.freetards.xyz/lda/TexLiLy))

[LoaD Accumulator](https://matrix.to/#/@devhonk:envs.net) announces

> For a while, I and a couple of other people have been working and testing on a bot to parse LaTeX and LilyPond expressions. This allows people on clients like Nheko to send and see math equations on LaTeX(and even more, like custom packages, and TikZ support) and sheet music with LilyPond, both on normal, and encrypted rooms!
>
> Check out the code(and maybe host your own): <https://codeberg.org/lda/TexLiLy> (mirror), <https://git.freetards.xyz/lda/TexLiLy> (original)
>
> <!-- markdownlint-disable-next-line no-alt-text -->
> ![](/blog/img/e67c93d8a829055b8cb9141ecbd2b59ca35a4c3d.png)

### maubot ([website](https://github.com/maubot/maubot))

A plugin-based Matrix bot system.

[wreck](https://matrix.to/#/@wreck:matrix.org) announces

> I have written a handful of Maubot plugins which help me manage my private community on matrix, and figured I could share them a little more publicly with the world:
>
> [maubot-welcome](https://github.com/williamkray/maubot-welcome) is a greeter bot for when new users join a room, and can optionally alert admins in a separate notification room that someone new has joined.
> [maubot-createroom](https://github.com/williamkray/maubot-createroom) allows admins to issue a simple command to create a new room and automatically connect it to a Space, saving you the trouble of configuring it with default settings manually.
> [maubot-join](https://github.com/williamkray/maubot-join) is a helpful plugin that allows you to turn off Maubot's auto-join feature, and rest assured that only a known list of users can invite your maubot to any new rooms.
> [maubot-kickbot](https://github.com/williamkray/maubot-kickbot) will watch activity within the rooms in a Space and generate a report of inactive users. If you make your bot a moderator (or whatever your appropriate power-level is), the bot can also kick inactive users out of all rooms in the space and the space itself. Helpful for tidying up your community.
>
> all of these plugins, and any other Maubot plugin I come across, can be found in a hopefully-easy-to-use list at <https://maubotplugins.mssj.me>. Please feel free to submit more that aren't here!

### flip-matrix-bot ([website](https://gitlab.com/FriendlyLinuxPlayers/flip-matrix-bot))

A Matrix bot for the [Friendly Linux Players](https://friendlylinuxplayers.org/) community.

[HER0](https://matrix.to/#/@HER0:matrix.org) announces

> Hey, I haven't updated here in a while! Shortly after my last update, I did some refactoring work that made the code a little nicer and more testable, then added some more unit tests in, along with implementing CI. After this, I took a bit of a break from working on the bot.
>
> Earlier this week, I implemented an idea suggested by a community member and contributor to the bot: users joining our main Matrix room (#flip:flip.earth ) are now greeted by the bot. This includes a random prompt/ice breaker to help get the conversation going. The first two times this was triggered, it spurred a bunch of conversation, so I'm pretty happy with it so far!
>
> On the website side, the [events page](https://friendlylinuxplayers.org/events) now lists the next upcoming event at the top. Outside of our development work, several FLiP community members participated in a Q&A session with GitLab, resulting in the following blog post (published last month): [Building a more inclusive gaming community with GitLab](https://about.gitlab.com/blog/2023/05/15/building-inclusive-gaming-community-gitlab/).

## Dept of Events and Talks 🗣️

### Matrix @ FrOSCon this year

[Oleg](https://matrix.to/#/@oleg:fiksel.info) announces

> On **August 05-06** the annual **Fr**ee and **O**pen **S**ource **Con**ference (short [FrOSCon](https://www.froscon.de)) will take place at the German University of applied Sciences Bonn Rhine Sieg.
>
> As German Matrix community grown rapidly in the last years, this is a great opportunity to meet each other and hack together.
>
> ### Matrix Dev Room
>
> We will be organizing a Devroom this year. The idea is to exchange on the latest Matrix development and projects, get to know each other and drink `<your_favorite_beverage>` together on the Saturday evening. 😉
>
> ### To make it happen we need your help
>
> #### Devroom is living from talks and workshops - this is your chance to present your Matrix project or to do a workshop on Matrix
>
> * Language: German or English
> * Due date: **please give us feedback ASAP so we can plan now**
>
> Also help in organizing the Devroom (moderation, timekeeping, etc) is needed.
>
> ### Matrix Open Source booth
>
> It was a great place to chit-chat and to get your in-depth answers regarding Matrix at FOSDEM this year. 👍️
>
> We will have a Matrix booth at FrOSCon as well.
>
> **We need your support in answering questions about Matrix or just to have a good time at the booth.** If you have experience with Matrix and want to help us out at the booth - get in touch with us!
>
> ### Get in touch
>
> #### If you want to take part please contact [@oleg:fiksel.info](https://matrix.to/#/@oleg:fiksel.info) (or <oleg@fiksel.info>) ASAP to add you to the Devroom/booth participants list
>
> BTW: we also have a [Matrix FrOSCon room](https://matrix.to/#/#FrOSCon:fiksel.info)
>
> ---
>
> # German
>
> # Matrix auf der FrOSCon dies Jahr
>
> Dieses Jahr wird die [FrOSCon](https://www.froscon.de) (**Fr**ee and **O**pen **S**ource **Con**ference) in-person ablaufen.
>
> Das ist eine gute Möglichkeit die Deutsche Matrix-Community zusammen zu bringen.
>
> Deshalb organisieren wir eine Devroom und ein Matrix-Stand.
>
> Eine Devroom lebt von Vorträgen und Workshops.
>
> ## Wir brauchen eure Hilfe
>
> Wollt ihr euer Matrix-Projekt vorstellen oder ein Workshop machen - das ist die Möglichkeit!
>
> Auch brauchen wir Hilfe beim Moderieren vom Devroom.
>
> Beim Matrix-Stand werden wir auch Unterstützung brauchen.
>
> Wenn ihr interessiert seid kontaktiert mich ([@oleg:fiksel.info](https://matrix.to/#/@oleg:fiksel.info) oder <oleg@fiksel.info>) bitte umgehend, damit wir kurzfristig einen Plan machen können.

## Dept of Guides 🧭

### Matrix Client Tutorial

[uhoreg](https://matrix.to/#/@hubert:uhoreg.ca) says

> As promised, I've been working on the end-to-end encryption chapter of my [Matrix client tutorial](https://uhoreg.gitlab.io/matrix-tutorial/index.html).  I've recently added an sections on [uploading device keys and one-time keys](https://uhoreg.gitlab.io/matrix-tutorial/device_keys.html) and [keeping track of recipient devices](https://uhoreg.gitlab.io/matrix-tutorial/device_tracking.html), both which of were much longer than I expected (and they're not even complete yet).  Next up is the Megolm encryption and decryption section.  As usual, feedback is welome.  The source code is at <https://gitlab.com/uhoreg/matrix-tutorial>

## Dept of Ping

Here we reveal, rank, and applaud the homeservers with the lowest ping, as measured by [pingbot](https://github.com/maubot/echo), a [maubot](https://github.com/maubot/maubot) that you can host on your own server.

### [#ping:maunium.net](https://matrix.to/#/#ping:maunium.net)

Join [#ping:maunium.net](https://matrix.to/#/#ping:maunium.net) to experience the fun live, and to find out how to add YOUR server to the game.

|Rank|Hostname|Median MS|
|:---:|:---:|:---:|
|1|test.zemos.net|251|
|2|zemos.net|435|
|3|fluse.duckdns.org|705|
|4|075-141-169-120.res.spectrum.com:8446|814|
|5|infosec.exchange|881|
|6|kittenface.studio|901.5|
|7|rom4nik.pl|3080.5|
|8|matrix.netho.tk|4976|
|9|herkinf.de|6026|
|10|nerdhouse.io|7082|

### [#ping-no-synapse:maunium.net](https://matrix.to/#/#ping-no-synapse:maunium.net)

Join [#ping-no-synapse:maunium.net](https://matrix.to/#/#ping-no-synapse:maunium.net) to experience the fun live, and to find out how to add YOUR server to the game.

|Rank|Hostname|Median MS|
|:---:|:---:|:---:|
|1|test.zemos.net|110|
|2|zemos.net|153|
|3|075-141-169-120.res.spectrum.com:8446|188|
|4|l1qu1d.net|193|
|5|nerdhouse.io|234.5|
|6|777.tf|302.5|
|7|kumma.juttu.asia|342|
|8|aguiarvieira.pt|427|
|9|matrix.org|519|
|10|davralin.work|828|

## That's all I know

See you next week, and be sure to stop by [#twim:matrix.org](https://matrix.to/#/#twim:matrix.org) with your updates!
