+++
title = "The Matrix Summer Special 2022"
path = "/blog/2022/08/15/the-matrix-summer-special-2022"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-summer.jpg"
+++

Hi all,

At the end of each year it’s been traditional to do a big review of everything that the Matrix core team got up to that year, and announcing our predictions for the next.  You can see the last edition in [2021 here](https://matrix.org/blog/2021/12/22/the-mega-matrix-holiday-special-2021) - and if you’re feeling nostalgic you can head down memory lane with the [2020](https://matrix.org/blog/2020/12/25/the-matrix-holiday-special-2020), [2019](https://matrix.org/blog/2019/12/24/the-2019-matrix-holiday-update), [2018](https://matrix.org/blog/2018/12/25/the-2018-matrix-holiday-special) ones etc too.

This year is turning out to be slightly different, however.  Our plans for 2022 are particularly ambitious: to force a step change in improving Matrix’s performance and usability so that we firmly transition from our historical “make it work” and “make it work right” phases into “**making it fast**”.  Specifically: to succeed, Matrix **has** to succeed in powering apps which punch their weight in terms of performance and usability against the proprietary centralised alternatives of WhatsApp, Discord, Slack and friends.

We’ve seen an absolute tonne of work happening on this so far this year… and somehow the end results all seem to be taking concrete shape at roughly the same time, despite summer traditionally being the quietest point of the year.  The progress is super exciting and we don’t want to wait until things are ready to enthuse about them, and so we thought it’d be fun to do a spontaneous Summer Special gala blog post so that everyone can follow along and see how things are going!

## Making it fast

We have always focused on first making Matrix “work right” before we make it “work fast” - sometimes to a fault.  After all: the longer you build on a given architecture the harder it becomes to swap it out down the line, and the core architecture of Matrix has remained essentially the same since we began in 2014 - frankly it’s amazing that the initial design has lasted for as long as it has.

Over the years we’ve done a lot of optimisation work on the core team implementations of that original architecture - whether that’s Synapse or matrix-{js,react,ios,android}-sdk and friends: for instance Synapse uses 5-10x less RAM than it used to (my personal federated server is only using 145MB of RAM atm! 🤯) and it continues to speed up in pretty much every new release ([this PR](https://github.com/matrix-org/synapse/pull/13522) looks to give a 1000x speedup on calculating push notification actions, for instance!).  However, there are some places where Matrix’s architecture itself ends up being an embarrassingly slow bottleneck: most notably when rapidly syncing data to clients, and when joining rooms for the first time over federation.  We’re addressing these as follows…

### Sliding Sync (aka Sync v3)

Historically, /sync always assumed that the client would typically want to know about all the conversations its user is in - much as an IRC client or XMPP client is aware of all your current conversations.  This provided some nice properties - such as automatically enabling perfect offline support, simplifying client and server development, and making features like “jump to room” and “tab complete” work instantly given the data is all client-side.  In the early days of Matrix, when nobody was yet a power user, this wasn’t really a problem - but as users join more conversations and join bigger rooms, it’s become one of Matrix’s biggest performance bottlenecks.  In practice, logging into a large account (~4000 rooms) can take ~10 minutes and hundreds of megabytes of network traffic, which is clearly ridiculous. Worse: if you go offline for a day or so, the incremental sync to catch back up can take minutes to calculate (and can even end up being worse than an initial sync).

To fix this, we started work on Sliding Sync ([MSC3575](https://github.com/matrix-org/matrix-spec-proposals/blob/kegan/sync-v3/proposals/3575-sync.md)) in 2021: a complete reimagining of the /sync API used by Matrix clients to receive data from their homeserver.  In Sliding Sync, we only send the client the data it needs to render its UI.  Most importantly, we only tell it about the subset of rooms which it is visible in the scroll window of its room list (or that it needs to display notifications about).  As the user scrolls around the room list, they slide the window up and down - hence the name “sliding sync”.  Sliding Sync was originally called Sync v3, given it’s our 3rd iteration of the sync API - it got renamed Sliding Sync given the current sync API confusingly ended up with a prefix of /v3.

[Back in December](https://matrix.org/blog/2021/12/22/the-mega-matrix-holiday-special-2021#sync-v3) our work on Sliding Sync was still pretty early: we had the initial MSC, an experimental proxy that converted the existing sync v2 API into Sliding Sync, and a simple proof-of-concept web client to exercise it.  Since then, however, there has been spectacular progress:

* MSC3575 has undergone some [big](https://github.com/matrix-org/matrix-spec-proposals/pull/3575/commits/bea7323c0b03dbd46600ce8fe01218d55f0de083) [iterations](https://github.com/matrix-org/matrix-spec-proposals/pull/3575/commits/a0bf4027bcef278e43a570c6fa94f2b1bef3488b) as we converge on the optimal API shape.
* The [sliding-sync](https://github.com/matrix-org/sliding-sync) proxy has matured to be something which we’re now running in stealth against matrix.org for those dogfooding the API
* We added the concept of extensions to split out how to sync particular classes of data (to avoid the API becoming a monolithic monster) - specifically:
    * Account Data
    * End-to-end Encryption
    * To-device messages
    * Ephemeral events (to be done)
    * Presence (to be done)
* We added support for spaces!
* We implemented it in [matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk/pull/2242) (which merged a few weeks ago!)
* …and have a WIP implementation in [matrix-rust-sdk](https://github.com/matrix-org/matrix-rust-sdk/pull/728) too.

But most importantly, we’ve also been busy implementing Sliding Sync in Element Web itself so we can start using it for real.  Now, this is still a work in progress, but as of today it’s _just_ getting to the point where one can experiment with it as a daily driver (although it’s definitely alpha and we’re still squishing bugs like crazy!) - and we can see just how well it really performs in real life.

For instance, here’s a video of my account (4055 rooms, redacted for privacy) logging in on an entirely fresh browser via Sliding Sync - the actual sync takes roughly 1 second (at 00:18 in the video).  And if we’d started the sync operation while the user is setting up E2E encryption, it would have completed in the background before they even got to the main screen, giving instant login(!).  Given my account typically takes ~10 minutes to initial sync (plus even more time for encryption to sync up), this is at least a real-life **600x improvement**.  Moreover, the sync response is only 20KB (a ~5000x improvement) - a huge win for low-bandwidth Matrix situations.

{{ youtube_player(video_id="9dbM66tGK5s") }}

Then, having logged in, the client subsequently launches pretty much instantly, _no matter how long you’ve been offline_. Total launch time is roughly 4 seconds, most of which is loading the app’s assets - which in turn could well be improved by progressively loading the app.  It could also be sped up even more if we cached state locally - currently the implementation simply reloads from the server every time the app launches rather than maintaining a local cache.

As you can see, this is palpably coming together, but there’s still a bunch of work to be done before we can encourage folks to try it, including:

* Switching the RoomList to be fully backed by sliding sync (currently the v2 roomlist is jury-rigged up to the sliding sync API, causing some flakey bugs such as duplicate rooms)
* Spec and hook up typing / receipts / presence extensions
* Hook up favourites, low_priority, knocked and historical rooms
* Adding back in loading room members
* Apply quality-of-service to to-device messages so we prioritise ones relevant to the current sliding window
* Sync encrypted rooms in the background to search for notifications (and for indexing).
* More local caching to speed up operations which now require checking the server (e.g. Ctrl/Cmd-K room switching)

We also need to determine whether it’s viable to run the sliding-sync proxy against matrix.org for general production use, or whether we’ll need native support in Synapse before we can turn it on by default for everyone.  But these are good problems to have!!

### matrix-rust-sdk and Element X

Meanwhile, over in the land of Rust, we’ve been making huge progress in maturing and stabilising matrix-rust-sdk and exercising it in Element X: the codename for the next generation of native Element mobile apps.  Most excitingly, we literally just got the first (very alpha) cut of Sliding Sync working in matrix-rust-sdk and hooked up to Element X on iOS - you can see Ștefan’s demo from last week here:

{{ youtube_player(video_id="6KHQSeJTXm0?start=459") }}

matrix-rust-sdk itself is now getting a [steady stream of releases](https://github.com/matrix-org/matrix-rust-sdk/releases) - including long-awaited official node bindings, providing excellent and performant encryption support via the [newly audited](https://matrix.org/blog/2022/05/16/independent-public-audit-of-vodozemac-a-native-rust-reference-implementation-of-matrix-end-to-end-encryption/) vodozemac Rust implementation of Olm. It’s also great to see loads of major contributions to matrix-rust-sdk from across the wider Matrix community - particularly from Ruma, Fractal, Famedly and others - thank you!! As a result the SDK is shaping up to be much more healthy and heterogeneous than the original matrix-{js,ios,android}-sdk projects.

On Element X itself: matrix-rust-sdk is being used first on iOS in [Element X iOS](https://github.com/vector-im/element-x-ios) - aiming first for launching a stable “barbecue” feature set (i.e. personal messaging) asap, followed by adding on “banquet” features (i.e. team collaboration) such as spaces and threads afterwards. We’ve shamelessly misappropriated the barbecue & banquet terminology from Tobias Bernard’s excellent blog post “[Banquets and Barbecues](https://blogs.gnome.org/tbernard/2018/05/16/banquets-and-barbecues/)” - although, ironically, unlike the post, our plan is still to have a single app which incrementally discloses the banquet functionality as the user’s barbecue starts to sprawl.  We’ve just published the brand new [development roadmap](https://github.com/matrix-org/matrix-rust-sdk/projects/1) for Element X from the rust-sdk perspective on GitHub.  Above all else, the goal of Element X is to be the fastest mobile messenger out there in terms of launch and sync time, thanks to Sliding Sync.  Not just for Matrix - but the fastest messenger, full stop :D  Watch this space to see how we do!

Finally: Element is getting a major redesign of the core UI on both iOS and Android - both for today’s Element and Element X.  I’m not going to spoil the final result (which is looking _amazing_) given it’ll have a proper glossy launch in a few weeks, but you can get a rough idea based on the earlier design previewed by Amsha back in June:

{{ youtube_player(video_id="oxfqQ0TrTXU?start=34") }}

In addition to the upcoming overall redesign, Element also landed a complete rework of the login and registration flows last week on iOS and Android - you can see all about it over on the [Element blog](https://element.io/blog/all-aboard-better-ftue-for-less-wtf/).

### Fast Remote Joins

In terms of performance, the other area that we’re reworking at the protocol level is room joins.

One of the most glaring shortcomings of Matrix happens when a new server admin excitedly decides to join the network, installs a homeserver, tries to join a large room like #matrix:matrix.org, and then looks on in horror as it takes 10+ minutes to join the room, promptly despairs of Matrix being slow and complains bitterly about it all over HN and Reddit :)

The reason for the current behaviour is that the Matrix rooms are replicated between the servers who participate in them - and in the initial design of the protocol we made that replication atomic. In other words, a new server joining a room picks a server from which to acquire the room (typically the one in the room’s alias), and gets sent a copy of all the state events (i.e. structural data) about the room, as well as the last 20 or so messages.  For a big room like Matrix HQ, this can be massive - right now, there are 79,969 state events in the room - and 126,510 auth_chain events (i.e. the events used to justify the existence of the state events).  The reason there are so many is typically that the act of a user joining or parting the room is described by a state event - and in the naive implementation, the server needs to know all current state events in the room (e.g. including parted users), in order to keep in sync with the other servers in the room and faithfully authorise each new event which they receive for that room.

However, each event is typically around 500 bytes in size, and so the act of joining a big room could require generating, transmitting, receiving, authenticating and storing up to 100MB of JSON 😱. This is why joining big rooms for the first time is so painfully slow.

Happily, there is an answer: much as Sliding Sync lets clients synchronise with the bare minimum of data required to render their UI, we’ve created [MSC3706](https://github.com/matrix-org/matrix-spec-proposals/blob/rav/proposal/partial_state_on_join/proposals/3706-partial-state-in-send-join.md) (and its precursor [MSC2775](https://github.com/matrix-org/matrix-spec-proposals/blob/matthew/msc2775/proposals/2775-lazy-loading-over-federation.md)) in order to rework the protocol to let servers receive the bare minimum of state needed to join a room in order to participate.  Practically speaking, we only really care about events relevant to the users who are currently participating in the room; the 40,000 other lurkers can be incrementally synced in the background so that our membership list is accurate - but it shouldn’t block us from being able to join or read (or peek) the room.  We already have membership lazyloading in the client-server API to support incrementally loaded membership data, after all.

The problem with this change is that Synapse was written from the outset to assume that each room’s state should be atomically complete: in other words, room state shouldn’t  incrementally load in the background.  So the work for Faster Joins has been an exercise in auditing the entirety of Synapse for this assumption, and generally reviewing and hardening the whole state management system.  This has been [loads of work](https://github.com/matrix-org/synapse/pulls?q=is%3Apr+%22faster+joins%22+is%3Aclosed+) that has been going on since the end of last year - but the end is in sight: you can see the remaining issues [here](https://github.com/matrix-org/synapse/milestone/8).

As of right now, faster joins work (although aren’t enabled by default) - with the main proviso that you can’t speak in the room yet until the background sync has completed, and the new implementation has not yet been optimised.  However, thanks to all the preparation work, this should be relatively straightforward, so the end is in sight on this one too.

In terms of performance: right now, joining Matrix HQ via the unoptimised implementation of faster joins completes on a fresh server in roughly 30 seconds - so a **~25x improvement** over the ~12 minutes we’ve seen previously.  However, the really exciting news is that this only requires synchronising 45 state events and 107 auth_chain events to the new server - a **~1400x improvement**!  So there should be significant scope for further optimising the calculation of these 152 events, given 30 seconds to come up with 152 events is definitely on the high side.  In our ideal world, we’d be getting joins down to sub-second performance, no matter how big the room is - once again, watch this space to see how we do.

Finally, alongside faster remote joins, we’re also working on faster local joins.  This work overlaps a bit with the optimisation needed to speed up the faster remote join logic - given we are seeing relatively simple operations unexpectedly taking tens of seconds in both instances. Some of this is needing to batch database activity more intelligently, but we also have some unknown pauses which we’re currently tracking down.  Profiling is afoot, as well as copious Jaeger and OpenTracing instrumentation - the hunt is on!

### Ratcheting up testing

All the work above describes some pretty bold changes to speed up Matrix and improve usability - but in order to land these changes with confidence, avoiding regressions both now and in future, we have really levelled up our testing this year.

Looking at matrix-react-sdk as used by Element Web/Desktop: all PRs made to matrix-js-sdk must now pass 80% unit test coverage for new code (measured using [Sonarqube](https://sonarcloud.io/project/overview?id=matrix-js-sdk), enforced as a GitHub PR check). All matrix-react-sdk PRs must be accompanied by a mix of unit tests, end-to-end tests (via [Cypress](https://www.cypress.io/)) and screenshot tests (via [percy.io](https://percy.io/)). All regressions (in both nightly and stable) are retro’d to ensure fixed things stay fixed (usually via writing new tests), and we have converted [fully to typescript](https://arewetsyet.bit.ovh/) for full type safety.

Concretely, since May, we’ve increased js-sdk unit test coverage by ~10% globally, increased react-sdk coverage by ~17%, and added ever more Cypress integration tests to cover the broad strokes.  Cypress now [completely replaces](https://github.com/matrix-org/matrix-react-sdk/pull/9104) our old Puppeteer-based end-to-end tests, and Sliding Sync work in matrix-react-sdk is being extensively tested by Cypress from the outset (the Sliding Sync PR literally comes with a Cypress test suite).

In mobile land, the situation is more complex given our long-term strategy is to deprecate matrix-ios-sdk and matrix-android-sdk2 in favour of matrix-rust-sdk. matrix-rust-sdk has always had [excellent coverage](https://app.codecov.io/gh/matrix-org/matrix-rust-sdk), and in particular, adopting the crypto module in the current matrix-{js,ios,android}-sdk will represent a night and day improvement for quality (not to mention perf!). We’ll also be adopting [PR checks](https://github.com/vector-im/element-x-ios/pull/50), and screenshot testing for the mobile SDKs.

On the backend, we continue to build out test cases for our new integration tester [Complement](https://github.com/matrix-org/complement) (in Golang), alongside the original [sytest](https://github.com/matrix-org/sytest) integration test suite (in Perl). In particular, we can now test Synapse in worker mode. The intention with Complement is that it should be homeserver agnostic so that _any_ homeserver implementation can benefit. Indeed the project was initiated by Kegan wearing his Dendrite hat.

Finally, we’ve had a huge breakthrough with true multi-client end-to-end testing in the form of Michael Kaye’s brand new [Traffic Light](https://github.com/matrix-org/trafficlight) project. For the first time, we can fully test things like cross signing and verification and VoIP calls end-to-end across completely different platforms and different clients. It’s early days yet, but this really will be a game changer, especially for crypto and VoIP.

Next up, we will turn our attention to a performance testing framework so that we can reliably track performance improvements and regressions in an automated fashion - heavily inspired by Safari’s [Page Load Test](https://www.goodreads.com/quotes/9844796-don-was-the-one-who-figured-out-how-we-would) approach. This will be essential as we build out new clients like Element X.

## A whole new world

All the stuff above is focused on improving the core performance and usability of Matrix - but in parallel we have also been making enormous progress on entirely new features and capabilities. The following isn’t a comprehensive list, but we wanted to highlight a few of the areas where new development is progressing at a terrifying rate…

### Native VoIP Conferencing

2022 is turning out to be the year that Matrix finally gets fully native voice/video conferencing. After speccing [MSC3401](https://github.com/matrix-org/matrix-spec-proposals/blob/matthew/group-voip/proposals/3401-group-voip.md) at the end of last year, [Element Call Beta 1](https://element.io/blog/introducing-native-matrix-voip-with-element-call/) launched as a reference implementation back in March, followed by enabling E2EE, spatial audio and walkie-talkie mode in [Element Call Beta 2](https://element.io/blog/element-call-beta-2-encryption-spatial-audio-walkie-talkie-mode-and-more/) in June.

However, the catch was that Element Call beta 1 and 2 only ever implemented “full mesh” conferencing - where every participant calls every other participant simultaneously, limiting the size of the conference to ~7 participants on typical hardware, and wasting lots of bandwidth (given you end up sending the same upstream multiple times over for all the other participants).  Element Call has been working surprisingly well in spite of this, but the design of MSC3401 was always to have “foci” (the plural of ‘focus’ - i.e. conference servers) to optionally sit alongside homeservers in order to aggregate the participating calls, a bit like this:

![MSC3401 Architecture](/blog/img/2022-08-15-msc3401.jpg)

With foci, clients only need to send their upstream to their local focus, rather than replicating it across all the other participants - and the focus can then fan it out to other foci or clients as required.  In fact, if no other clients are even watching your upstream, then your client can skip sending an upstream to its focus entirely!

Most importantly, foci are decentralised, just like Matrix: there is no single conference server as a single point of control or failure responsible for powering the group call - users connect to whichever focus is closest to them, and so you automatically get a standards-based heterogeneous network-split-resilient geographically distributed cascading conferencing system with end-to-end-encryption, powered by a potentially infinite number of different implementations.  To the best of our knowledge, this is the first time someone’s proposed an approach like this for decentralised group calling (watch out, Zoom, we’re coming for you!)

Now, the VoIP team have been busy polishing Element Call (e.g. chasing down end-to-end encryption edge cases and reliability), and also figuring out how to embed it into Element and other Matrix clients as a quick way to get excellent group VoIP (more on that later).  As a result, work on building out foci for scalable conferencing had to be pushed down the line.

But in the last few months this completely changed, thanks to an **amazing** open source contribution from Sean DuBois, project lead over at [Pion](https://pion.ly/) - the excellent Golang WebRTC implementation.  Inspired by our [initial talk](https://2021.commcon.xyz/talks/extending-matrix-s-e2ee-calls-to-multiparty) about MSC3401 at CommCon, Sean independently decided to see how hard it’d be to build a Selective Forwarding Unit (SFU) focus that implemented MSC3401 semantics using Pion - and published it at [https://github.com/sean-der/sfu-to-sfu](https://github.com/sean-der/sfu-to-sfu) (subsequently donated to github.com/matrix-org).  In many ways this was a flag day for Matrix: it’s the first time that a core MSC from the core team has been first implemented from outside the core team (let alone outside the Matrix community!).  It’s the VoIP equivalent of Synapse starting off life as a community contribution rather than being written by the core team.

Either way: Sean’s SFU work has opened the floodgates to making native Matrix conferencing actually scale, with Šimon Brandner and I jumping in to [implement SFU support](https://github.com/matrix-org/matrix-js-sdk/pull/2423) in matrix-js-sdk… and as of a few weeks ago we did the first ever SFU-powered Matrix call - which worked impressively well for 12 participants!

![12 person Element Call](/blog/img/2022-08-15-sfu.jpg)

Now, this isn’t released yet, and there is still work to be done, including:

* We actually need to select the subset of streams we care about from the focus
* We need to support thumbnail streams as well as high-res streams
* We need rate control to ensure clients on bad connections don’t get swamped
* We need to hook up cascading between foci (although the SFU already supports it!)
* We need E2EE via insertable streams
* Faster signalling for switching between streams

You can see the full todo list for basic and future features over on GitHub.  However, we’re making good progress thanks to Šimon’s work and Sean’s help - but with any luck beta 3 of Element Call might showcase SFU support!

Meanwhile it’s worth noting that Element Call is not the only MSC3401 implementation out there - the Hydrogen team has added native support to Hydrogen SDK too (skipping over the old 1:1 calling), so expect to see Element &lt;-> Hydrogen calling in the near future. The Hydrogen implementation is also what powers Third Room (see below…)

### Matryoshka VoIP Embedding

Elsewhere on VoIP, we’ve also been hard at work figuring out how to embed Element Call into Matrix clients in general, starting with Element Web, iOS & Android.  Given MSC3401 is effectively a superset of native 1:1 Matrix VoIP calling, we’d ideally like to replace the current 1:1-only VoIP implementation in Element with an embedded instance of Element Call (not least so we don’t have to maintain it in triplicate over Web/iOS/Android, and because WebRTC-in-a-webview really isn’t very different to native WebRTC).  To do this efficiently however, the embedded Element Call needs to share the same underlying Matrix client as the parent Element client (otherwise you end up wasting resources and devices and E2EE overhead between the two).  Effectively Element Call ends up needing to parasite off the parent’s client.  We call this approach “matryoshka embedding”, given it resembles nested Russian dolls. 🪆

In practice, we do this by extending the Widget API to let Matrix clients within the widget share the parent’s Matrix client for operations such as sending and receiving to-device messages and accessing TURN servers (c.f. [MSC3819](https://github.com/matrix-org/matrix-spec-proposals/blob/travis/msc/widgets-send-recv-toDevice/proposals/3819-to-device-messages-for-widgets.md) and [MSC3846](https://github.com/robintown/matrix-doc/blob/widget-turn-servers/proposals/3846-widget-turn-servers.md)).  This in turn has been [implemented](https://github.com/matrix-org/matrix-widget-api/pull/57) in the matrix-widget-api helper library for widget implementers - and then a few days ago Robin demonstrated the world’s first ever matryoshka embedded Element Call call, looking like this:

![Matryoshka embedded Element Call](/blog/img/2022-08-15-matryoshka.jpg)

Note that the MSC3401 events are happening in the actual room where the widget has been added, sent by the right users from Element Web rather than from Element Call, and so are subject to all the normal Matrix access control and encryption semantics.  This is a _huge_ step forwards from embedding Jitsi widgets, where the subsequent call membership and signalling happens in an entirely separate system (XMPP via Prosody, ironically) - instead: this is proper native Matrix calling at last.

Moreover, the same trick could be used to efficiently embed other exotic Matrix clients such as Third Room or [TheBoard](https://github.com/toger5/TheBoard) - giving the user the choice either to use the app standalone or within the context of their existing Matrix client. Another approach could be to use OIDC scopes to transparently log the embedded client in using the parent’s identity; this has the advantage of no code changes being needed on the embedded client - but has the disadvantage that you needlessly end up running two Matrix clients for the same account side by side, and adding another device to your account, which isn’t ideal for a performance sensitive app like Element Call or Third Room.

Matryoshka embedding isn’t live yet, but between scalable calls via SFU and native Element Call in Element Web/iOS/Android, the future is looking incredibly exciting for native Matrix VoIP.  We hope to finish embedding Element Call in Element Web/iOS/Android in Sept/Oct - and if we get lucky perhaps the SFU will be ready too and then Element Call can exit beta!

Finally, we also added Video Rooms to Element Web - adding the user interface for an “always on” video room that you can hop into whenever you want.  You can read about it over on the [Element blog](https://element.io/blog/drop-in-drop-out-chats-with-video-rooms-and-a-new-search-experience/) - the initial implementation uses Jitsi, but once Element Call and Matryoshka embedding is ready, we’ll switch over to using Element Call instead (and add Voice Rooms too!)

![Video Rooms](/blog/img/2022-08-15-video-rooms.jpg)

### Third Room

Just as MSC3401 and Element Call natively adds decentralised voice/video conferences to boring old textual Matrix chatrooms, [MSC3815](https://github.com/matrix-org/matrix-spec-proposals/pull/3815) and [Third Room](https://github.com/matrix-org/thirdroom/blob/main/README.md) go the whole enchilada and adds a full decentralised 3D spatial collaboration environment into your Matrix room - letting you turn your Matrix rooms into a full blown interconnected virtual world.

I can’t overstate how exciting this is: one of the key origins of Matrix was back in Oct 2013 when Amandine and myself found ourselves in Berlin after TechCrunch Disrupt, debating why Second Life hadn’t been more successful - and wondering what you’d have to do to build an immersive 3D social environment which would be as positive and successful as a wildly popular chat network.  Our conclusion was that the first key ingredient you’d need would be a kick-ass open decentralised communication protocol to build it on - providing truly open communication primitives that anyone could build on, much like the open web… and that was what got us thinking about how to build Matrix.

Fast forward 9 years, and Third Room is making _spectacular_ progress in building out this dream, thanks to the incredibly hard work of Robert, Nate and Ajay. The goal of Third Room is to be an open platform layered directly on Matrix for spatial collaboration of any kind: effectively a blank canvas to let folks create freeform collaborative 3D (and in future 2D, VR or AR) experiences, either by using existing assets or building their own user-generated content and functionality. Just like the open web itself, this unlocks a literally infinite range of possibilities, but some of the obvious uses include: spatial telepresence, social VR, 3D visualisation of GIS or weather data, 3D simulated environments, search and rescue and disaster response operations (imagine streaming LIDAR from a drone surveying hurricane devastation into Third Room, where you can then overlay and collaborate on GIS data in realtime), and of course 3D gaming in all its various forms.

Now, we’re hoping to give Third Room a proper launch in a few weeks, so I’m not going to spoil too much right now - but the final pieces which are currently coming together include:

* Finalising the initial version of [Manifold](https://github.com/matrix-org/thirdroom/tree/main/src/engine), the multi-threaded game engine which powers Third Room (built on [Three.JS](https://threejs.org/), [bitECS](https://github.com/NateTheGreatt/bitECS) and [Rapier](https://rapier.rs/)), using SharedArrayBuffers as triple-buffers to synchronise between the various threads.  See [this update](https://github.com/matrix-org/thirdroom/discussions/47#discussion-4033099) for a bit more detail on how the engine works.
* Finalising the Matrix client interface itself, powered by [Hydrogen SDK](https://github.com/vector-im/hydrogen-web/blob/master/doc/SDK.md) in order to be as lightweight as possible
* Adding in full spatial audio and game networking via MSC3401 and Hydrogen SDK (currently full mesh, but will go SFU as soon as SFUs land!)
* Adding in animated avatars (currently using [Mixamo](https://www.mixamo.com/) animations)
* Adding in name tags and object labels
* Adding in 3D Tile support in order to incrementally load 3D map tiles à la Google Earth
* Building an asset pipeline from Unity and Blender through to the glTF assets which Third Room uses.
* Initial framework for an in-world direct-manipulation [editor](https://twitter.com/matrixdotorg/status/1550534909089189888)
* Lightmap support for beautiful high-performance static lighting and shadows
* Full post-processing pipeline (bloom, depth-of-field, anti-aliasing etc)
* Integrating with OIDC for login, registration, and account management (see OIDC below)

As a quick teaser - here’s an example of a [Unity asset](https://assetstore.unity.com/packages/3d/environments/sci-fi/3d-scifi-kit-vol-3-121447) exported into Third Room, showing off lightmaps (check out the light and shadows cast by the strip lighting inside, or the shadow on the ground outside).  Ignore the blurry HDR environment map of Venice in the background, which is just there to give the metals something to reflect.  Check out the stats on the right-hand side: on Robert’s M1 Macbook Pro we’re getting a solid 60fps at 2000x1244px, with 13.12ms of unused gametime available for every 16.67ms frame, despite already showing a relatively complicated asset!

{{ youtube_player(video_id="xvjMyYxZbmM") }}

Meanwhile, here are some shots of Robert and Nate chasing each other around the UK City demo environment (also exported from [Unity](https://assetstore.unity.com/packages/3d/environments/urban/city-builder-london-214943)), showing off blended Mixamo animations and throwing around crates thanks to the Rapier physics engine.

{{ youtube_player(video_id="y2mU19QwZPg") }}

{{ youtube_player(video_id="QEt80wvO4yY") }}

<br/>

And don't forget, it's just a Matrix client - with no infrastructure required other than a normal Matrix server:

![Third Room Overlay](/blog/img/2022-08-15-thirdroom-overlay.jpg)

As you can see, we are rapidly approaching the point where we’ll need support from technical artists to help create beautiful scenes and avatars and assets in order to make it all come to life - especially once the Blender and Unity pipelines, and/or the Third Room editor are finished. If you’re interested in getting involved come chat at [#thirdroom-dev:matrix.org](https://matrix.to/#/#thirdroom-dev:matrix.org)!

### WYSIWYG

Back in the real world, a recent new project that we haven’t spoken about much yet is adding consistent WYSIWYG (What You See Is What You Get) editing to the message composer in matrix-{react,ios,android}-sdk as used by Element Web/iOS/Android - as well as publishing the resulting WYSIWYG editor for the greater glory of the wider ecosystem.

This is a bit of a contentious area, because we’ve tried several times over the years to add a rich text editor to matrix-react-sdk - firstly with the [Draft.js](https://draftjs.org/) [implementation](https://github.com/matrix-org/matrix-react-sdk/pull/292) by Aviral (which we abandoned after Facebook de-staffed Draft), and then later with a [Slate](https://www.slatejs.org) [implementation](https://github.com/matrix-org/matrix-react-sdk/pull/1890) by me (which we abandoned thanks to the maintenance burden of keeping up with Slate’s API changes).  Finally, burnt by the experience with third party solutions, Bruno wrote his own editor called [CIDER](https://github.com/matrix-org/matrix-react-sdk/blob/develop/docs/ciderEditor.md), which was a great success and is what Element Web uses today to author messages including ‘pills’ for structured rooms/users etc… but this deliberately didn’t provide full WYSIWYG functionality.  Meanwhile, Slack added WYSIWYG, forced it on, and [screwed it up](https://quuxplusone.github.io/blog/2019/11/20/slack-rich-text-box/) - and apps like WhatsApp and Discord seem to get by fine without WYSIWYG.

However, given that users are now used to WYSIWYG in Teams and Slack, we’ve now decided to have another go at it, inspired by CIDER’s success - and with the novel twist that the heavy lifting of modelling and versioning the document and handling Unicode + CJK voodoo will be provided by a cross-platform native library written in Rust, ensuring that matrix-{react,ios,android}-sdk (and in future matrix-rust-sdk-based apps like Element X) all have precisely the same consistent semantics, and we don’t spend our lives fixing per-platform WYSIWYG bugs unless it really is a platform-specific issue with the user interface provided on that particular platform.

The project is fairly young but developing fast, and lives over at [https://github.com/matrix-org/matrix-wysiwyg](https://github.com/matrix-org/matrix-wysiwyg) (better name suggestions welcome ;) - we’re aiming to get it into clients by the end of October.  The editor itself is not Matrix specific at all, so it’ll be interesting to see if other projects pick it up at all - and meanwhile, if we’ve done a good job, it’ll be interesting to see if this can be used to power Matrix-backed collaborative-editing solutions in future…

{{ youtube_player(video_id="9_UhNBKUk7A") }}

**Update**: we should have mentioned that the WYSIWYG editor project is being built out by staff at Element, who very kindly have been sponsored to work on it by one of Element's Big Public Sector Customers in order to get to parity with Teams.  Thank you!!

### Are We OIDC Yet?

On the other hand, a project we recently [yelled about](https://matrix.org/blog/2022/08/10/areweoidcyet-com-matrix-and-open-id-connect) a lot is Matrix’s transition to Open ID Connect for standards-based authentication and account management.  We announced this at the [end of the year](https://matrix.org/blog/2021/12/22/the-mega-matrix-holiday-special-2021#openid-connect) and the project has built up huge momentum subsequently, culminating with the release of [https://areweoidcyet.com](https://areweoidcyet.com) last week to track the progress and remaining work.

Our plan is to use native OIDC in production for the first time to provide all the login, registration and account management for Third Room when it launches in a few weeks (using a branded Keycloak instance as the identity provider, for convenience).  After all, the last thing we wanted to do was to waste time building fiddly Matrix-specific login/registration UI in Third Room when we’re about to move to OIDC!  This will be an excellent case study to see how it works, and how it feels, and inform the rest of the great OIDC experiment and proposed migration.

### Dendrite + P2P

Meanwhile, the Next Generation team has continued to focus on their mission to make Dendrite as efficient and usable as possible. Within recent months, Dendrite has matured dramatically, with a considerable list of bugs fixed, performance significantly improved and new features added - push notifications, history visibility and presence to name a few notable additions.

Neil Alexander, Kegan and Till have continued to streamline the Dendrite architecture and to refactor areas of the codebase which have long needed attention, as well as moving from Kafka to NATS JetStream, an all-new caching model and some other fairly major architectural changes. We’ve also seen an increase of code contributions from the community and outside organisations, which is exciting, and the [gomatrixserverlib](https://github.com/matrix-org/gomatrixserverlib) library which underpins much of Dendrite is also seeing more active development and attention thanks to its use in the [Complement](https://github.com/matrix-org/complement) integration testing suite.

With the most recent [0.9.3 release](https://github.com/matrix-org/dendrite/releases), we are proud to announce that **Dendrite now** **passes 90% of Client-Server API tests and 95% of Server-Server API tests** and has support for all specced room versions in use today. We have a growing community of users who are (quite successfully) trialling using Dendrite homeservers day-to-day, as well as our own public `dendrite.matrix.org` homeserver, which is open to the public for registration for anyone who wants to experiment with Dendrite without running their own deployment.

Dendrite plays an important role in our future strategy as it is also the homeserver implementation used for embedded homeservers, P2P development and experimentation. In addition to being able to scale up, we have also successfully scaled down, with the Element P2P demos proving that an embedded Dendrite homeserver can run comfortably on an iOS or Android device.

Research on the [Pinecone](https://github.com/matrix-org/pinecone/) overlay network for P2P Matrix has also continued, with Devon and Neil having experimented with a number of protocol iterations and spent considerable time bringing the [Pinecone Simulator](https://github.com/matrix-org/pinecone/tree/main/cmd/pineconesim) up to scratch to help us to test our designs more rapidly. Our work in this area is helping us to form a better direction and strategy for P2P Matrix as a whole, which is moving more towards a hybridised model with the current Matrix federation — a little different to our original vision, but will hopefully result in a much smoother transition path for existing users whilst solving some potential scaling problems. The [arewep2pyet.com](https://arewep2pyet.com) site is a living page which contains a high level overview of our goals and all the progress being made.

## What’s left?

Comparing all of the above with the [predictions for 2022](https://matrix.org/blog/2021/12/22/the-mega-matrix-holiday-special-2021#2022) section of the end-of-year blog post, we’re making very strong progress in a tonne of areas - and the list above isn’t comprehensive.  For instance, we haven’t called out all the work that the Trust & Safety team are doing to roll out advanced moderation features by default to all communities - or the work that Eric has been doing to close the remaining gap between Gitter and Matrix by creating new static archives throughout Matrix.  Hydrogen has also been beavering away to provide a tiny but perfectly formed web client suitable for embedding, including the new embeddable Hydrogen SDK. We haven’t spoken about the work that the Cryptography team have been doing to adopt vodozemac and matrix-rust-sdk-crypto throughout matrix-{js,ios,android}-sdk, or improve encryption stability and security throughout.  We’ve also not spoken about the new initiative to fix long-term chronic bugs (outside of the work above) in general - or all the work being done around [Digital Markets Act interoperability](https://matrix.org/blog/2022/03/30/technical-faq-on-the-digital-markets-act)…

Other things left on the menu for this year include getting Threads out of beta: we’ve had a bit of an adventure here figuring out how to get the right semantics for notification badges and unread state in rooms with threads (especially if you use a mix of clients which support and don’t support threads), and once that’s done we’ll be returning to Spaces (performance, group permissions etc).

## Matrix 2.0?

Looking through this post (and congratulations if you’re still reading it at this point ;P), it really feels that Matrix is on the verge of shifting into a new phase.  Much as MacOS X started off as a promising but distinctly unoptimised operating system, and then subsequently got unrecognisably faster year by year (even on the same hardware!) as Apple diligently worked away optimising the kernel… similarly: we are now landing the architectural changes to completely transform how Matrix performs.

Between protocol changes like Sliding Sync, Faster Joins, native OIDC and native VoIP conferencing all landing at roughly the same time - and alongside new implementations like matrix-rust-sdk and vodozemac, let alone Third Room - it feels unquestionably like we have an unrecognisable step change on the horizon.  Our aim is to land as much of this as possible by the end of the year, and if we pull it off, I’m tempted to suggest we call the end result Matrix 2.0.

To the future! 🚀

Matthew, Amandine & the whole core team.
