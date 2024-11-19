+++
title = "The Matrix Holiday Update 2022"
path = "/blog/2022/12/25/the-matrix-holiday-update-2022"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

Hi all,

2022 has been a rollercoaster of a year for Matrix.

On one hand, the network has doubled in size (44.1M to 80.3M visible matrix IDs). The wider world is having a grand awakening to the importance of decentralisation thanks to the situation at Twitter. We’ve seen an amazing number of major new players entering the Matrix ecosystem: [Reddit appears to be building out new Chat](https://macaw.social/@wongmjane/109529583352532543) functionality using Matrix; [TeamSpeak announced](https://twitter.com/teamspeak/status/1589621116032585728) Matrix-based chat in TS5; [Discourse](https://meta.discourse.org/t/matrix-protocol-for-chat/210780) is working on adding Matrix support; [Thunderbird](https://www.theregister.com/2022/06/30/thunderbird_102) launched Matrix support; Governments from [Luxembourg](https://gouvernement.lu/en/actualites/toutes_actualites/communiques/2022/11-novembre/16-hansen-lancement.html) to [Ukraine](https://delta.mil.gov.ua/wiki/info/) have launched their own Matrix-powered chat infrastructure; and hundreds of other organisations ranging from startups to massive private & public sector entities are betting on the protocol. The European Parliament has used Matrix as a proof-point for the viability for communication interoperability between gatekeepers in the [Digital Markets Act](https://matrix.org/blog/2022/03/29/how-do-you-implement-interoperability-in-a-dma-world). [FOSDEM 2022](https://matrix.org/blog/2022/02/07/hosting-fosdem-2022-on-matrix) ran smoothly via Matrix with over 23,000 attendees, making it the world's largest open source conference (with 70% of attendees using their own servers!). [Sweden](https://element.io/blog/dsam-och-esam-forordar-matrix-for-saker-och-federerad-kommunikation-inom-sveriges-offentliga-sektor/) has published case studies on the benefits of Matrix for messaging interoperability. Meanwhile existing players like Germany’s BWI have expanded their scope to providing Matrix messaging to the [whole German State](https://element.io/blog/bundesmessenger-is-a-milestone-in-germanys-ground-breaking-vision/); Automattic is busy building [Matrix plugins](https://github.com/Automattic/chatrix) for Wordpress; Rocket.Chat launched [federation via Matrix](https://rocket.chat/press-releases/rocket-chat-leverages-matrix-protocol-for-decentralized-and-interoperable-communications), Gematik has been busy progressing their [TI Messenger](https://www.gematik.de/anwendungen/ti-messenger) initiative for interoperable messaging within Germany’s healthcare industry, and [Tchap](https://element.io/case-studies/tchap) in France is continuing to expand.

On the other hand, only a handful of these initiatives have resulted in funding reaching the core Matrix team. **This is directly putting core Matrix development at risk.** We are witnessing a classic tragedy of the commons. We’ve released all the foundational code of Matrix as permissively-licensed open source and got it to the point that anyone can successfully run it at scale themselves. The network is expanding exponentially. But in return, it transpires that the vast majority of these commercial deployments fail to contribute financially to the Matrix Foundation - whether by donating directly or supporting indirectly by working with [Element](https://element.io), who fund the vast majority of core Matrix development today.

In short: folks love the amazing decentralised encrypted comms utopia of Matrix.  But organisations also love that they can use it without having to pay anyone to develop or maintain it. **This is completely unsustainable**, and Element is now *literally* unable to fund the entirety of the Matrix Foundation on behalf of everyone else - and has had to lay off some of the folks working on the core team as a result.

The only viable solution to this is for organisations building on Matrix to contribute to sharing the costs of maintaining Matrix’s core projects.  We made [a proposal](https://matrix.org/blog/2022/12/01/funding-matrix-via-the-matrix-org-foundation) to address this a few weeks ago, which we’ll iterate on further in the new year to find an approach which both empowers the community and encourages organisations to participate.  In the interim, if you are an organisation who’s building on Matrix and you want the project to continue to flourish, **please** mail [funding@matrix.org](mailto:funding@matrix.org) to discuss how you can support the foundations that you are depending on.

As a reminder, the work the [Foundation](https://matrix.org/foundation) does today for the benefit of the Matrix includes:

* Publishing the[Matrix Specification](https://spec.matrix.org)
* Organising the Matrix Spec Core Team, responsible for reviewing and evolving the protocol.
* Writing roughly half the Matrix Spec Change [proposals](https://spec.matrix.org/proposals).
* Developing [Synapse](https://github.com/matrix-org/synapse), the Python matrix homeserver implementation
* Developing [Dendrite](https://github.com/matrix-org/dendrite), the Go homeserver implementation
* Developing client SDKs for Web (matrix-js-sdk, matrix-react-sdk), iOS (matrix-ios-sdk), Android (matrix-android-sdk2), Python (matrix-nio)
* Developing our next-generation client SDKs (matrix-rust-sdk)
* Developing our end-to-end encryption implementations ([libolm](https://gitlab.matrix.org/matrix-org/olm) in C/C++ and [vodozemac](https://github.com/matrix-org/vodozemac) in Rust)
* Developing next-generation end-to-end encryption implementations ([MLS](https://arewemlsyet.com))
* Developing and evolving additional core functionality in Matrix, including:
    * Account portability
    * Faster room joins over federation
    * Sliding Sync for instant client sync
    * Threads
    * Rich Text composer components
    * Spaces
* Developing [open source integrations](https://github.com/matrix-org/matrix-hookshot) to other products (GitLab, GitHub, JIRA... )
* Developing open source bridges to other platforms (IRC, XMPP, Slack, Discord, Telegram, bifrost…)
* Developing [peer-to-peer Matrix](https://arewep2pyet.com) implementations, avoiding the need for servers (and associated data/metadata accumulation) entirely
* Developing [low-bandwidth Matrix](https://github.com/matrix-org/lb) transports
* Developing and hosting static Matrix room archives for the wider network ([matrix-static](https://github.com/matrix-org/matrix-static) and [matrix-public-archive](https://github.com/matrix-org/matrix-public-archive))
* Developing and hosting the [matrix.to](https://matrix.to) link redirect service
* Developing open source authentication mechanisms and integrations for Matrix ([OIDC](https://areweoidcyet.com))
* Developing decentralised Video/VoIP conferencing servers on Matrix ([waterfall](github.com/matrix-org/waterfall))
* Developing decentralised Video/VoIP client components on Matrix ([matrixRTC](https://github.com/matrix-org/matrix-js-sdk/pull/2553))
* Developing showcase "beyond chat" implementations of Matrix such as [Third Room](https://thirdroom.io)
* Developing moderation tooling and applying it to matrix.org ([mjolnir](https://github.com/matrix-org/mjolnir) and much more)
* Publishing moderation reputation lists for the benefit of the wider community
* Developing integration test suites for Matrix compatibility testing ([sytest](github.com/matrix-org/sytest), [complement](https://github.com/matrix-org/complement), [trafficlight](https://github.com/matrix-org/trafficlight))
* Developing a reference push notification server ([sygnal](https://github.com/matrix-org/sygnal))
* Developing a reference identity directory server ([sydent](https://github.com/matrix-org/sydent))
* Procuring and publishing independent [public audits](https://matrix.org/blog/2022/05/16/independent-public-audit-of-vodozemac-a-native-rust-reference-implementation-of-matrix-end-to-end-encryption) of Matrix's encryption and wider stack
* Publishing the matrix.org website and blog
* Publishing the weekly "Matrix Live" video podcast
* Publishing the weekly "This Week In Matrix" news letter
* Organising regular meetups (e.g. "Open Tech Will Save Us")
* Promoting Matrix at open source conferences
* Running the matrix.org homeserver
* Moderating the matrix.org project rooms
* Running free public bridges to networks such as IRC networks and XMPP.

This list is not remotely exhaustive (turns out there are over 240 projects in the matrix.org GitHub org!) but it serves to illustrate the sheer scale of work that the Foundation performs today.  Keeping the core team funded to work on Matrix as our day job is critical for Matrix’s long-term success, and so we **really** hope that organisations depending on Matrix (or passing philanthropists who appreciate Matrix’s value) will drop a line to [funding@matrix.org](mailto:funding@matrix.org) and help keep the show on the road.

### Turbocharging Matrix

Aside from the nightmares of funding open source software, 2022 has very much been a year of building - focusing on implementing a step change in Matrix’s performance and usability: ensuring that the protocol can punch its weight (and more!) against centralised proprietary alternatives. After all, Matrix clients need to be at least as good as the centralised alternatives in order to get widespread uptake.

This work has ended up taking many forms: on the server-side, Synapse sprouted Rust support to accelerate its hot paths, starting with [push rule evaluation](https://github.com/matrix-org/synapse/pull/13838). It’s super exciting to see Synapse performance heading into a new era, building on the foundations of what’s become a very mature and stable homeserver implementation.

Meanwhile work is in the final stages on “[Faster Joins](https://github.com/matrix-org/matrix-spec-proposals/blob/rav/proposal/faster_joins/proposals/3902-faster-remote-joins.md)”, finally letting servers rapidly join rooms over federation by synchronising only the minimal subset of state needed to join, rather than proactively synchronising the room’s full current state.  Faster joins became [available for testing](https://matrix.org/blog/2022/10/18/testing-faster-remote-room-joins) in Synapse in October, and since then the team has been [working through](https://github.com/matrix-org/synapse/milestone/10) making it support workers and addressing the various edge cases and bugs that have shown up during testing.  Current join performance is a roughly 25x speedup on large rooms, although we’re confident that we can improve this even more, and we’re aiming to land it in time for FOSDEM at the beginning of Feb.

On the client-side, the work to transform Matrix client performance has centred around “[Sliding Sync](https://github.com/matrix-org/matrix-spec-proposals/blob/kegan/sync-v3/proposals/3575-sync.md)” - our entirely new API for synchronising the minimal data to a client needed for it to render its UI, thus making login, launch and sync instant.  Sliding sync (originally called “sync v3”) has been a long time in the making; the API has gone through countless iterations as we worked away throughout 2022 implementing it in real-life clients, and adding all the extensions ([MSC3884](https://github.com/matrix-org/matrix-spec-proposals/pull/3884), [MSC3885](https://github.com/matrix-org/matrix-spec-proposals/pull/3885)) needed to get to parity with sync v2.  The wait has been well worth it, though: [support](https://pr9256--matrix-react-sdk.netlify.app/) in Element Web is in the final stages of development - and moreover the next-generation Element X mobile clients will only speak Sliding Sync.

Element X itself is shaping up to be a showcase of just how snappy and performant Matrix can be: built on matrix-rust-sdk, it uses native Swift UI on iOS/macOS and Jetpack Compose on Android to couple together the best possible platform-native user experience with the ultimate underlying native-code SDK implementation, backed by sliding sync. The goal is to be at least as snappy as Telegram, iMessage or WhatsApp (we’ve taken to counting the frames in screen recordings to compare things like time-to-launch and time-to-load scrollback).  Element X is currently in late alpha on iOS, and the hope is to enter public beta in time for FOSDEM.  You can see a sneak peek here of the iPad-style layout (running under macOS) though!

![Element X](/blog/img/2022-12-25-elementx.png)

Finally, in terms of usability, there have been leaps and bounds forwards across Matrix - particularly with Element’s mobile UI being [entirely refreshed](https://element.io/blog/an-unrecognisable-improvement-elements-new-design-is-here/) by the design team in September as a stepping stone to the forthcoming final Element X design.  Any remaining UX quirks should be flushed out with Element X, but the visuals are already a clear step forwards towards an excellent alternative to the centralised encumbents.

{{ youtube_player(video_id="kjZCD14qMK0") }}

### Encryption

We had great plans for E2EE in Matrix this year; starting off in a huge rush to get [vodozemac](https://github.com/matrix-org/vodozemac) finished and [audited](https://matrix.org/blog/2022/05/16/independent-public-audit-of-vodozemac-a-native-rust-reference-implementation-of-matrix-end-to-end-encryption) as our shiny new native-Rust implementation of Olm/Megolm. The plan was then to integrate vodozemac into matrix-rust-sdk’s crypto crate, and then replace the various old fragmented E2EE implementations across matrix-js-sdk, matrix-ios-sdk, matrix-android-sdk2 and matrix-rust-sdk itself with One True audited implementation - with audits booked with Least Authority to get further assurance around matrix-rust-sdk-crypto, matrix-rust-sdk itself and finally the full stack (Element X + Synapse).

Unfortunately, things went sideways when security researchers from Royal Holloway University London & elsewhere got in touch to explain that they had found some [nasty implementation vulnerabilities](https://nebuchadnezzar-megolm.github.io/) in the venerable matrix-js-sdk implementation.  So, we had no choice but to pause “Element R” - the project to converge matrix-{js,ios,android}-sdk on matrix-rust-sdk-crypto, and instead start analysing and addressing the issues across all current shipping Matrix clients in order to resolve them as rapidly as possible.  Ironically, it turned out in the end that only matrix-{js,ios,android}-sdk were affected - all other independent implementations, including matrix-rust-sdk, were okay.  As such, the Element R work would have protected us from these vulnerabilities had it been ready, and failing that it would have let us solve them in a single place.  Instead, Element R ended up getting pushed back for months while we worked through the various issues in triplicate across the legacy SDKs, while also checking all the other client implementations we could find, and dealing with additional issues which the RHUL researchers discovered as they dug deeper.  Eventually we finished the analysis and agreed a [coordinated disclosure](https://matrix.org/blog/2022/09/28/upgrade-now-to-address-encryption-vulns-in-matrix-sdks-and-clients) at the end of September.
(EDIT: to be clear, we are very grateful to the security researchers for discovering and disclosing the vulns responsibly to us. The frustration here stems from the irony that if we'd finished the matrix-rust-sdk-crypto rewrite a few months earlier, we'd have mitigated the severe vulns - but instead, the rewrite got pushed back even further. It's obviously our fault though, not the researchers'.)

Since then, work has been split three ways: firstly, Element R work has resumed - and in fact Element R on iOS is pretty much usable as of today, other than needing some work to support E2EE push notifications (which will also be required for Element X). Element R on Android is very close too, and meanwhile Element R on Web decrypted its first event on Dec 19th! We’re hoping to get Element R in production on all platforms by Feb.

Secondly, we’ve been addressing other points raised by the RHUL researchers to ensure that malicious servers cannot add malicious devices or users to conversations, rather than warning as we do today.  This is not a trivial problem to solve, but we’re making progress via [MSC3917](https://github.com/matrix-org/matrix-spec-proposals/pull/3917) (Cryptographically Constrained Room Membership) and [MSC3834](https://github.com/matrix-org/matrix-spec-proposals/pull/3834) (Opportunistic user key pinning (TOFU)).  However, this work is effectively blocked on Element R landing first, as there’s no way we’re going to fix this in triplicate on the legacy SDKs.

Thirdly, we’ve been pushing ahead on implementing Decentralised MLS as a next-generation encryption protocol for Matrix to potentially replace Olm and Megolm.  This work was badly disrupted by RHUL mitigations, but we’re making good progress again - you can follow all the details over at [https://arewemlsyet.com](https://arewemlsyet.com).  Matrix over DMLS is currently in alpha, but the aim is to start beta testing Decentralised MLS in 2023.

Finally, we’ve been working hard on completely reworking the overall UX of how E2EE should work in Matrix clients - specifically, requiring users to cross-sign their devices in order to use E2EE, and so end up in a much higher trust world (alongside Trust On First Use). Can’t wait to finally simplify the E2EE UX!

### All new features

It’s not all been performance and stability work this year - there have been some large areas of feature work happening too.

One of the most visible projects has been Threads, which [launched in beta](https://element.io/blog/introducing-threads-in-beta/) in April, and subsequently has undergone huge amounts of polish to improve performance, notification semantics, unread behaviour and thread-aware read receipts.  The end result is feeling great now, and threads [exited beta](https://twitter.com/element_hq/status/1605861000296640512) in Element Mobile on Dec 20th. Web narrowly missed the window due to a final ‘stuck notification’ bug which is still being tracked down, but will follow shortly afterwards and then threads will be finally out of beta!

Another big project in 2022 has been to create a general purpose Rich Text Editor to provide WYSIWYG (What You See Is What You Get) message composition for Matrix clients.  This has ended up being a very ambitious project to define all the core editing semantics in a shared rust library, with platform-specific bindings to link it into the editing UI available on Web, iOS & Android.  The end result lives at [https://github.com/matrix-org/matrix-rich-text-editor](https://github.com/matrix-org/matrix-rich-text-editor) - and you can play with it by enabling it in labs on Element Web/iOS/Android or experiment with the [live demo](https://matrix-org.github.io/matrix-rich-text-editor). The core behaviour is feeling excellent, although predictably some of the fine detail is very fiddly to get right. It’s almost there, though, and thanks to its built-in rust test harness generator(!) we are confident we’ll catch and control all the edge cases, and this should form an incredibly strong platform for all future rich text editing requirements in Matrix (and beyond!).  This work was very kindly sponsored by one of Element’s public sector customers in order to get Element to parity with Teams - thank you!

Location Sharing was another feature which landed in 2022 - powered by [MSC3488](https://github.com/matrix-org/matrix-spec-proposals/pull/3488) and [MSC3489](https://github.com/matrix-org/matrix-spec-proposals/pull/3489), and implemented in matrix-{js,ios,android}-sdk in Element Web/iOS/Android, letting users share static and live locations and view them on an OpenStreetMap compatible map tileserver of their server’s choice. The Live Location Sharing is controversial in that it stores location data in the room history (and as such is hidden behind a labs flag on Element), but should eventually be replaced by [MSC3672](https://github.com/matrix-org/matrix-spec-proposals/pull/3672) to share locations are custom ephemeral events instead (once custom EDUs land) in the spec.  Around the same time, Polls also went live thanks to [MSC3381](https://github.com/matrix-org/matrix-spec-proposals/pull/3381) - it’s worth noting that both Location Sharing and Polls are excellent examples of “extensible events” in the wild: ensuring that clients which understand the custom event type will render them appropriately, but letting other clients fall back to showing them as simple timeline events.

### Open ID Connect

The transition to using Open ID Connect for Matrix authentication has been progressing steadily throughout 2022 - with Third Room being the first OIDC-native Matrix client, closely followed by Element X. [matrix-authentication-service](https://github.com/matrix-org/matrix-authentication-service) now exists as a basic OIDC identity provider suitable for being linked into Synapse, and meanwhile Third Room demonstrates how you can integrate Keycloak as a third party IDP (complete with reCAPTCHA and guest access!).  The team also went on a very exciting detour to figure out how to perform login-and-E2EE-setup in a single operation by scanning a QR code ([MSC3906](https://github.com/matrix-org/matrix-spec-proposals/pull/3906)), and how it might integrate into OIDC in future.

Element X looks set to be the showcase for native OIDC in a typical Matrix client going forwards, so watch this space to see how it feels!

You can keep track of the inexorable transition to OIDC over at [https://areweoidcyet.com](https://areweoidcyet.com).

### VoIP

2022 was the year that Matrix finally got native multiparty VoIP.  After launching [Element Call Beta 1](https://element.io/blog/introducing-native-matrix-voip-with-element-call/) in March followed by [Beta 2](https://element.io/blog/element-call-beta-2-encryption-spatial-audio-walkie-talkie-mode-and-more/) in June, we’ve been busy embedding Element Call as a “matryoshka” widget into Element Web, using it to replace Jitsi in powering video rooms and video calls.  You can read all about this in detail in the [summer blog post](https://matrix.org/blog/2022/08/15/the-matrix-summer-special-2022#native-voip-conferencing).

Meanwhile, lots of progress is underway on [Waterfall](https://github.com/matrix-org/waterfall) - the name we picked for the Pion-based decentralised Selective Forwarding Unit (i.e. conferencing focus) contributed by Sean DuBois earlier in the year, including adding simulcast support to support large scale conferences.

There’s only one catch, which is that Element Call is still in (very very late) beta, thanks to a handful of bugs which have been hard to track down, which has in turn kept all the other dependencies (embedded Element Call; video rooms etc) in beta too.  However, we think we’re pretty much there now - which is perfect timing given how Waterfall is coming together, meaning that both stable *and* scalable native Matrix conferences are on the horizon!

Even better, the plan is for Element X to rely entirely on embedding Element Call for VoIP - so we should be able to jump forwards pretty rapidly to having excellent native multiparty VoIP and video rooms on mobile as well as on Web.  So, once Element Call exits beta, everything should follow.  Just for a change, we’re aiming to get this done by the end of January - but there are a lot of unknown unknowns still flying around, so watch this space…

### IETF & MIMI

Another massive new initiative this year has been the process of proposing Matrix to the IETF as a candidate for use in interoperable instant messaging standardisation.  The [MIMI (More Instant Messaging Interoperability) working group](https://datatracker.ietf.org/group/mimi/about/) emerged earlier in the year within IETF as an initiative to define how MLS could be used to interoperate between different instant messaging silos - as shortly to be required by the [Digital Markets Act](https://matrix.org/blog/2022/03/29/how-do-you-implement-interoperability-in-a-dma-world).

One of the things that MIMI aims to do is to define a common application layer protocol to exchange messages. At first [CPIM was proposed](https://datatracker.ietf.org/doc/draft-mahy-mimi-content/01/) (an ancient message format that looks a lot like email) - and then an [entirely new JSON message format](https://datatracker.ietf.org/doc/draft-rosenberg-mimi-msg-format/) proposal emerged which looks somewhat Matrix (but isn’t). At this point it became obvious that we should throw our hat into the ring and encourage MIMI to use Matrix rather than reinvent it, and so we set about proposing Matrix as at least the [message format](https://datatracker.ietf.org/doc/draft-ralston-mimi-matrix-message-format/) and [message transport layer](https://datatracker.ietf.org/doc/draft-ralston-mimi-matrix-transport/) of the stack. It’s quite surreal to see Matrix starting to fly around as IETF Drafts!

The next step here is to re-express the relevant bits of the current Matrix spec as self-contained IETF Drafts (rather than backreferencing the current spec from the drafts).  The idea is that the normal Matrix spec will continue to evolve much as it always has, but we’ll effectively donate a Long Term Supported dialect of it to IETF which can then evolve according to IETF process and be immortalise as RFCs for use in MIMI.  We’ll then backport those changes into spec.matrix.org in order to avoid fragmentation, while retaining the same ability we have to rapidly iterate and extend Matrix with MSCs.  This work is well under way (taking opportunity to use [Extensible Events](https://github.com/matrix-org/matrix-spec-proposals/blob/matthew/msc1767/proposals/1767-extensible-events.md) from the outset!), and we should see explosions of further IETF Drafts emanating from Travis as 2023 progresses.

### Trust & Safety

2022 saw a real uptick in spam and abuse across Matrix, and there have been some valiant attempts to improve our moderation tooling over the course of the year.  Unfortunately it hasn’t come together as rapidly as we might have hoped, however, and we’ve seen several large communities give up on Matrix and move back to Discord thanks in part to needing better anti-abuse mechanisms.

In 2023 we’re resetting our trust & safety work, with Mjolnir dev returning to its original development team, and we’ll be working as tactically as possible to ensure that all communities on Matrix can easily block abuse using whatever mechanisms they need.

### P2P & Dendrite

Meanwhile, Dendrite (our second generation homeserver implementation) development has continued at pace throughout the year. According to sytest we are now at 93% client-server API compliance with 577 out of 620 tests passing, and the server-server API compliance is at 97% with 111 out of 114 tests passing! None of the missing tests are showstoppers, so it’s fair to say that Dendrite is very nearly ready for primetime.

The interesting plot twist is that Dendrite development has ended up increasingly focusing on embedded matrix server use cases - particularly to power Peer-to-Peer Matrix, where clients require a server to be embedded within them.  So while Synapse has ended up increasingly focusing on large-scale deployments, Dendrite has ended up pursuing smaller instances (which is ironic, given originally it was meant to be the other way round!).

P2P Matrix work has been progressing well too - you can follow the blow-by-blow updates over at [https://arewep2pyet.com](https://arewep2pyet.com). After a lot of back and forth evaluating hard-state routing versus soft-state routing in Pinecone, we’ve ended up converging on soft-state routing (which is chattier, but easier to reason about in terms of mitigating attacks). However, the chattiness means that it doesn’t scale as well as one might hope - so we’re now working on a “tiered” approach where separate Pinecone networks can be tiered together into one inter-network, giving us scalability at the expense of being slightly less decentralised. It’s fair to say that the journey here has been pretty frustrating in its twists and turns, and sadly Neil Alexander chose to move on a few months ago. However, Devon has stepped up to fill his shoes as primary Pinecone and P2P wrangler, and is making amazing progress on the remaining work - firstly implementing [Store and Forward relaying](https://github.com/matrix-org/dendrite/pull/2917) in Dendrite so that today’s Pinecone networks can exchange messages even if the recipient node is offline.  Next up will be bridging P2P Matrix with today’s Matrix network - and then working on tiering to provide the scalability we need.  The expectation is that today’s serverside Dendrite instances will effectively turn into static pinecone peers, store and forwarding messages on behalf of P2P nodes, and providing tiering between respective pinecone subnets.

### Hydrogen & Chatterbox

Development on Hydrogen as a super-lightweight progressive-web-app Matrix client has also been progressing throughout the year (with a few detours to help out with end-to-end testing via [trafficlight](https://github.com/matrix-org/trafficlight) both for the benefit of Hydrogen and other clients).

The biggest change has been Hydrogen sprouting a separate SDK layer, letting the engine be embedded into other webapps in order to add noninvasive Matrix messaging with as minimal a footprint as possible.  This was showcased in Element’s [chatterbox](https://element.io/blog/element-launches-chatterbox/) offering in July - providing an open source chatbox which can be trivially embedded into existing sites, and also powers the [Chatrix](https://github.com/Automattic/chatrix) wordpress plugin that Automattic is working on.

Hydrogen also added independent support for [MSC3401](https://github.com/matrix-org/matrix-spec-proposals/pull/3401) multiparty voice/video calling (albeit on a [branch](https://github.com/vector-im/hydrogen-web/pull/705)), letting us showcase heterogeneous Element Call &lt;-> Hydrogen group calling and prove MSC3401 as fit for purpose as a true open interoperable call signalling - and in turn Hydrogen SDK, complete with the multiparty voice/video calling, powers the Matrix engine within Third Room - our metaverse-on-Matrix platform.

We’re looking forwards to Hydrogen continuing to reach full feature parity with Element over the next year, and popping up in increasingly unexpected places as everyone’s favourite embedded Matrix client!

### Third Room

Finally, it’s hard to believe that [Third Room](https://thirdroom.io), our Matrix-based open platform for decentralised realtime spatial collaboration, barely existed at the beginning of the year.  Third Room serves to demonstrate that Matrix is *way* more than just chat and VoIP, but can power the spatial communication layer of the open web. This has ended up driving forwards a tonne of new capabilities for Matrix - showcasing native OIDC auth; scalable multiparty VoIP in Hydrogen SDK, efficient binary-diffed file storage, and more recently has been defining how to store extensible behaviour for Matrix rooms as WASM objects stored in the Matrix room itself.

Third Room itself is a Hydrogen-based Matrix client, which lets you view Matrix rooms as interactive multiparty 3D environments (using [MSC3815](https://github.com/matrix-org/matrix-spec-proposals/pull/3815)) - with the world defined as glTF blobs stored in the Matrix room, and the ability to script and customise any aspect of that world using WASM blobs stored in Matrix rooms, which execute on the participating clients, exposing a new scenegraph API called WebSceneGraph in order to manipulate the glTF that makes up the world.  We also expect to see a variant of Matrix’s normal widget API to be exposed to these WASM blobs, introducing the concept of sandboxed clientside widgets, bots or other integrations - letting users customise and extend Matrix without ever having to run serverside bots again.

The intention is to provide a platform which can be used to build *any* kind of interactive realtime spatial multiparty app in an open standardised, decentralised, end-to-end encrypted way - whether that’s for gaming, social, or professional activity such as building “digital twins” for manufacturing, agriculture, smart cities, search & rescue, etc.  You can read more about the vision at [thirdroom.io/preview](https://thirdroom.io/preview), or via press coverage at [TheNewStack](https://thenewstack.io/third-room-teases-user-generated-content-for-the-metaverse/) or [Golem](https://www.golem.de/news/third-room-das-open-source-metaverse-von-matrix-2212-170638.html).  We were also incredibly flattered to be invited to present Third Room at [SIGGRAPH Asia](https://sa2022.siggraph.org/en/presentation/?id=realcur_102&sess=sess143) a few weeks ago.  The official recording has yet to emerge, but you can find a [cheeky bootleg here](https://twitter.com/o_ob/status/1601442998696677376).

We launched [Tech Preview 1 of Third Room](https://matrix.org/blog/2022/09/27/announcing-third-room-tech-preview-1) at the end of September, and since then all of the work has been around building out WebSceneGraph and the WASM scripting environment - letting users build their own functionality in JS via QuickJS or C (and in future Rust or Zig too).  We’ve also been working on making the networking (via Matrix WebRTC-negotiated data channels) more robust, switching to an ‘authoritative’ simulation model rather than having each client run its own physics simulation, in order to kick the hard problem of decentralised physics simulations down the road a bit further. We’re also adding in a much-needed ‘discover’ page to help users find new rooms and explore everything that’s possible in the platform.  And finally, we’re adding WebXR support so that folks can use ThirdRoom with VR and AR hardware if they so desire. All this should culminate in Tech Preview 2, due in the coming weeks.

If you want a quick sneak preview of the scripting capabilities on the horizon with a [very basic script](https://matrix.thirdroom.io/_matrix/media/r0/download/thirdroom.io/qFfvHcXNQkjeDjTpdMfPCniY) stored in the media repository, head over to [https://thirdroom.io/world/#surprise:thirdroom.dev](https://thirdroom.io/world/#surprise:thirdroom.dev) and click on the television ;)

### Conclusion

So there you have it: it’s been a mixed year for Matrix, but at least the project itself is moving forwards faster than ever, for now. If you look back at the predictions from [last year’s holiday blog post](https://matrix.org/blog/2021/12/22/the-mega-matrix-holiday-special-2021#2022) you’ll see that most of them even came true. This year, we’ll keep the predictions simple: our plans for 2023 are to ensure that the Foundation is well funded, ship all of the step-change improvements in performance and usability which are currently in beta as rapidly as possible - and demonstrate for once and for all that Matrix can indeed punch its weight against the proprietary centralised alternatives.

If you can afford it, please consider donating to the Matrix.org Foundation to support our work. The most efficient way to support us is to [donate via donorbox](https://donorbox.org/keep-matrix-exciting). Our Patreon is not going anywhere, so if you wish to keep supporting it there we're happy to count you in our supporters.

<!-- markdownlint-disable-next-line no-alt-text -->
[![](/images/donorbox.png)](https://donorbox.org/keep-matrix-exciting)

Thanks for flying Matrix;

Matthew, Amandine & the whole core team.
