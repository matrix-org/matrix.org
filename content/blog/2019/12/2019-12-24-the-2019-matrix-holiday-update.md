+++
title = "The 2019 Matrix Holiday Update!"
path = "/blog/2019/12/24/the-2019-matrix-holiday-update"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

Every year we do an annual wrap-up and retrospective of all the things happening in the Matrix core team - if you’re feeling particularly curious or bored you can check out the [2015](https://matrix.org/blog/2015/12/25/the-matrix-holiday-special/), [2016](https://matrix.org/blog/2016/12/26/the-matrix-holiday-special-2016-edition/), [2017](https://matrix.org/blog/2017/12/25/the-matrix-holiday-mini-special-2017-edition/) and [2018](https://matrix.org/blog/2018/12/25/the-2018-matrix-holiday-special/) editions for context.  The idea is to look at the bigger picture trends in Matrix outside of the weekly [TWIM](https://matrix.org/blog/category/this-week-in-matrix/) posts to get an idea of the stuff which we made progress on, and the stuff which still remains.

That said, it’s hard to know where to start - Matrix accelerated more than ever before in 2019, and there’s been progress on pretty much all battlefronts.  So as a different format, let’s take the [stuff we said we had planned for 2019](https://matrix.org/blog/2018/12/25/the-2018-matrix-holiday-special#2019) from the end of last year’s update and see what we actually achieved...

#### 2019: the immediate priorities

So, our immediate priorities for 2019 were:

* _r0 spec releases across the board (aka Matrix 1.0)_
* _Implementing them in Synapse_

✅ Well, unless you’ve been floating in a sensory deprivation tank for the last year, hopefully you spotted that Matrix (as a protocol) finally exited beta - starting off with the announcement at FOSDEM in February of the [first stable release of the Server-Server API](https://matrix.org/blog/2019/02/04/matrix-at-fosdem-2019/), alongside the Synapse 0.99.x series as we began the process of migrating to the 1.0 APIs.

Specifically this meant killing off self-signed certificates, adding .well-known server discovery and implementing room version semantics so we could upgrade the underlying room version algorithm to fix the residual flaws.  This culminated in June with the [official release of Matrix 1.0](https://matrix.org/blog/2019/06/11/introducing-matrix-1-0-and-the-matrix-org-foundation/) - now including the remaining APIs and a stable release of Synapse 1.0.  The emphasis was on addressing all the main pre-1.0 design flaws rather than adding features or performance, but with 1.0 out the door at last we’ve been able to make progress there too.

* _Landing the Riot redesign_

✅ The full redesign of Riot’s UI on Web/Desktop landed shortly after FOSDEM in Feb with [The Big 1.0](https://medium.com/@RiotChat/the-big-1-0-68fa7c6050be). Cosmetically we got most of the new look & feel in place, and have had very positive feedback overall - although some of the UX thinkos of the old app remain and coming up on the radar for fixing.

* _Finalising the Matrix.org Foundation_

✅ This happened too, coincident with releasing Matrix 1.0 in June - read all about it at [https://matrix.org/foundation](https://matrix.org/foundation). So far the governance and legal infrastructure the Foundation provides has helped the project significantly, and while it was a mammoth task to organise, we’re very glad it’s here!  Huge thanks go out to Jon, Ross and Jutta for agreeing to join the foundation as Guardians - they have been excellent in patiently listening to the various dramas of the year and ensuring Matrix’s neutrality and that we keep an even keel.

* _Landing all the new E2E encryption UX and features_

The good news on E2E encryption is that we’ve been making solid progress throughout the year - the bad news is that we are still yet to turn it on by default.  Progress updates for the various pieces of the puzzle are as follows:

* ✅ The final UX is pretty much locked down (after several iterations as we try to tread the balance between trustworthiness and security) - here’s a [sneak preview](https://www.figma.com/file/wwqBo5oAFfk8XKmtd2YaIs/Cross-signing) of what we’re aiming at.

* 🏗 Cross-signing is the single biggest remaining piece of work in progress - letting users attest to the trustworthiness of their own devices, so you only ever have to trust a given user once rather than trusting all their devices individually. We gave a [very early demo](https://youtu.be/C2eE7rCUKlE?t=2974) of an experimental implementation back at FOSDEM in Feb, inspired by some of the initial spec proposal at [MSC1680](https://github.com/uhoreg/matrix-doc/blob/cross-signing/proposals/1680-cross-signing.md) (MSC = Matrix Spec Change, our [process for evolving Matrix](https://matrix.org/docs/spec/proposals)).

    However, having played with it a bit, MSC1680 turned out to be too generic and complicated (it worked by the user signing a device with any other of their devices, building a twisted maze of which device vouched for which) - and we replaced it with [MSC1756](https://github.com/matrix-org/matrix-doc/pull/1756), which shifts the model to be the simpler “the user has a key, which they use to sign their devices”. However, this in turn requires more infrastructure - you need somewhere secure to store your signing key, which prompted [MSC1946](https://github.com/uhoreg/matrix-doc/blob/ssss/proposals/1946-secure_server-side_storage.md) - Secure Secret Storage & Sharing (SSSS): the ability to sync your signing key between devices by storing it (encrypted, of course) on the server.

    Meanwhile, it also became obvious that the primitives for key verification needed to be improved too: introducing verification by emoji comparison ([MSC1267](https://github.com/matrix-org/matrix-doc/issues/1267)) and QR codes ([MSC1543](https://github.com/matrix-org/matrix-doc/issues/1543)), and switching key verification to be performed in the context of a DM ([MSC2241](https://github.com/matrix-org/matrix-doc/pull/2241)) so that you can see your verification history, find verifications, and easily dip in and out of verifying users as needed.

    Whilst everyone else was panicking about Matrix 1.0 and associated baggage, Uhoreg was off in the wilderness plugging his way through all of this - iterating on the design, speccing it and implementing it in synapse and matrix-js-sdk, complete with a test jig to demonstrate it all working ([part 1](https://scitech.video/videos/watch/1c8a0262-dee9-4927-b9e9-9856a7f4d8bf) and [part 2](https://scitech.video/videos/watch/d1ef04a8-397a-4570-a9a9-cef143ea637c)).  Over the last few months the rest of the team has joined him though, and we’ve been frantically working away implementing it all on both Riot/Web, iOS & RiotX/Android.  For instance - here’s [verification happening in DM](https://matrix.org/_matrix/media/r0/download/matrix.org/IoFfFRWTmRNTbNDzfmKFPvLq) between Riot/Web & RiotX a few weeks ago, and here’s a very early (unskinned) cut of [verification](https://matrix.org/_matrix/media/r0/download/matrix.org/tAWxQKhrfiPxBvtAOQfMiGjW) happening in Riot/Web’s RightPanel a few days ago.

    We were hoping to get cross-signing ready for the end of 2019, but in practice we’re now sprinting to get it done by FOSDEM 2020 in Feb - not least because we have a main-stage talk proposed to tell everyone how we landed it and turned on E2E by default... ;)

* ✅ Support for non-E2E clients.  The last thing we want is to make it impossible to write a simple Matrix client, or to suddenly excommunicate (hah) all the existing Matrix bots & bridges which haven’t implemented E2E.  To this end, poljar created [pantalaimon](https://github.com/matrix-org/pantalaimon) - our very own Matrix daemon, which can sit in the background and offload all your E2EE from your Matrix client by acting as a transparent Matrix proxy which magically encrypts everything.  Built on matrix-nio and asyncio python3, We use it in production today for running various bots and it works excellently.

* ✅ Support for search in E2E rooms.  Hot off the heels of pantalaimon’s success, poljar also created [seshat](https://github.com/matrix-org/seshat) - a native library for clientside indexing encrypted Matrix events written in Rust, powered by the [tantivy](https://github.com/tantivy-search/tantivy) full-text search engine.  (pantalaimon also has support for indexing via tantivy, which involved contributing python bindings for tantivy, but we ended up going with Rust so we could embed it natively in as many Matrix clients as possible).  Seshat is particularly cool in that the indexes themselves are encrypted in on disk - and in future could even be synced between clients using [SSSS](https://github.com/uhoreg/matrix-doc/blob/ssss/proposals/1946-secure_server-side_storage.md) so you don’t have to reindex your messages every time you log in on a new device.  Seshat is implemented behind a labs flag on Riot/Desktop and it will ship as soon Riot/Desktop’s build pipeline is fully updated to support native modules (which will also unlock other goodies, such as using faster/safer native E2E primitives, safer key storage, and Discord-style keyboard-shortcuts for VoIP).

* 🏗 Fixing “unable to decrypt” errors.  We’ve done big sprint over the last month or so to track down the final straggling causes of unable to decrypt errors.  Some of these are legitimate bugs (e.g. [https://github.com/matrix-org/synapse/issues/6399](https://github.com/matrix-org/synapse/issues/6399)) - but many are artefacts of the current architecture: for instance, if the sender has no way to know your device was in the room when it encrypted a message, you won’t be able to decrypt.  We’re addressing this by improving better error messages and feedback so the user isn’t surprised by what’s going on (aiming for Jan) - and in future we’ll have to revisit E2E’s fundamentals to ensure that it’s impossible to receive a message without also receiving the key to decrypt it.

* ✅ Support for push notifications in E2E rooms.  This is kinda solved right now by having all clients get (silently) pushed whenever they receive a message in an E2E room with push enabled, and relying on the client to be woken up by the push in order to decrypt the message in order to display the push notification.  However, this is battery intensive, and we could probably do better - but this isn’t a blocker for going live.

* 🏗 Support for FilePanel and NotifPanel in E2E rooms.  Seshat should fix this by indexing all your messages (and so tracking whether they contain pushes or files, and populating up your local view of your file & notif panels respectively) - just need to ensure it’s hooked up.

...and that’s where things stand right now on E2E by default.  We’ll start turning it on by default for private rooms as soon as the UX has landed (probably starting first with new DMs and private rooms, prompting the user in case they want to opt out - and then migrating existing ones).  It’s worth noting that we have poured a _lot_ of work into E2E encryption now - often to the detriment of the rest of Matrix; our rich featureset and decentralisation has combined to make this a tough nut to crack, but the end is in sight.  Thanks to all for your patience and support while we’ve been working through this.

That takes us to the end of the stuff we planned to prioritise in 2019 - but what about the more speculative medium-term stuff which was on the menu this time last year?

#### 2019: the medium-term priorities

* _Reworking and improving Communities/Groups._

We have some really promising UX work and a fairly early spec proposal ([MSC1772](https://github.com/matrix-org/matrix-doc/blob/matthew/msc1772/proposals/1772-groups-as-rooms.md)), but work in earnest hasn’t kicked off yet. It’s going to be one of the next big projects though.

* _Reactions._

✅ Riot now has Reactions! 🎉🎉🎉  The only remaining work is to finish the remaining rough edges of the spec proposal ([MSC1849](https://github.com/matrix-org/matrix-doc/blob/matthew/msc1849/proposals/1849-aggregations.md)) and actually land them in the Matrix spec proper.

* _E2E-encrypted Search_

✅ [Seshat](https://github.com/matrix-org/seshat) exists! (see above)

* _Filtering. (empowering users to filter out rooms & content they're not interested in)._

✅ We’ve ended up thinking lots in 2019 about empowering users to filter content.  The main impetus has been to ensure that users and communities can filter out abuse (on their own terms), and also to start building infrastructure which can be used for folks to share their own filters.  Over the last few months, this has started to take concrete form - with the arrival of [MSC2313](https://github.com/matrix-org/matrix-doc/blob/msc2313/proposals/2313-moderation-policy-rooms.md) “Moderation policies as rooms”, and [Mjolnir](https://github.com/matrix-org/mjolnir) - a bot you can run to enforce moderation policies on your rooms.  It’s all quite early, but we expect a lot more work in this space over the coming year (and it’s wryly amusing that [Twitter has also woken up](https://twitter.com/jack/status/1204766078468911106) to it being an interesting problem needing to be solved.)

* _Extensible events_

Sorry folks; no progress here since a flurry of spec work ([MSC1767](https://github.com/matrix-org/matrix-doc/blob/matthew/msc1767/proposals/1767-extensible-events.md)) back in Jan 2019. The good news is that the spec proposal seems to be relatively well received. The bad news is that we haven’t had bandwidth to finish reviewing it, implementing it and migrating it anywhere. It blocks a bunch of really useful stuff in Matrix, and there are users willing to pay for it (via New Vector) - we’ll get to it as soon as we can.

* _Editable messages._

✅ These landed too and are a thing of joy!  Just need to merge [MSC1849](https://github.com/matrix-org/matrix-doc/blob/matthew/msc1849/proposals/1849-aggregations.md).

* _Extensible Profiles (we've actually been experimenting with this already)._

Similar to Extensible Events, there was a flurry of spec work ([MSC1769](https://github.com/matrix-org/matrix-doc/blob/matthew/msc1769/proposals/1769-extensible-profiles-as-rooms.md)) back in Jan, but little progress since.  This will also unlock a lot of really useful features - e.g. custom status, custom profile data, social timeline rooms etc.  We’ll likely get to it shortly after communities work.

* _Threading._

🏗 So we actually landed label-based threading ([MSC2326](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2326/proposals/2326-label-based-filtering.md)) in Synapse 1.6, but it’s not exposed in Riot yet (or elsewhere).  It doesn’t have quite the same semantics as Slack-style threading; the idea is to filter down your room based on which messages are tagged as part of a given topic.  However, it’s very powerful, and it’ll be fun to add it to Riot at some point in 2020.  Meanwhile, better-than-label-based-threading is also on the cards, although slightly lower priority than some of the other stuff in this section.

* _Landing the Riot/Android rewrite_

🏗 As you probably know, RiotX is a full rewrite of Riot/Android in Kotlin using modern AndroidX and Jetpack idioms - and it entered beta [back in June](https://medium.com/@RiotChat/introducing-the-riotx-beta-for-android-b17952e8f771).  Since then we’ve been frantically working away on both playing catch-up with the old app… as well as implementing all the new stuff (reactions, edits, new E2E verification, cross-signing etc) which makes no sense to waste time adding in Riot/Android, but also pushes out the timeline on RiotX itself.

We’re currently sprinting to try to get RiotX ready for FOSDEM in February - hopefully users will have felt the app starting to really stabilise over the last few months (it even supports breadcrumbs now!)

* _Considering whether to do a similar overhaul of Riot/iOS_

🏗 It’s cheating a bit, but Manu (the lead developer on Riot/iOS and delivery manager of Riot/Mobile in general) has been hacking on an entirely new client called [Messagerie](https://github.com/manuroe/messagerie) in his spare time, using SwiftUI.  The idea of throwing away the whole UI layer and replacing it with the latest best practices sounds suspiciously like RiotX - it’ll be interesting to see how RiotX/iOS takes shape next year!

* _Scaling synapse via sharding the master process_

We ended up bottlenecked on IO rather than CPU in 2019, and as a result we worked on splitting synapse’s database across multiple database instances on a per-table granularity.  However, the master process itself doesn’t shard yet; so we’re now bottlenecked on CPU and need to get on and do this asap to unlock further Synapse scalability for mega-monolithic-deployments like the Matrix.org homeserver.

* _Bridge UI for discovery of users/rooms and bridge status_

🏗 There’s been a bit of movement in the last few weeks on this, but nothing concrete yet.

* _Bandwidth-efficient transports_

✅ We finished the 100bps CoAP transport proof-of-concept for Matrix, demoed it at FOSDEM and [shipped it in March](https://matrix.org/blog/2019/03/12/breaking-the-100-bps-barrier-with-matrix-meshsim-coap-proxy). However, we haven’t progressed it much further; it really needs a corporate sponsor who wants to fund work to finish it off and bake it properly into Matrix. **If you’re interested, please [get in touch](https://matrix.to/#/@matthew:matrix.org).**

* _Bandwidth-efficient routing_

🏗 We also did a bunch of related work on bandwidth-efficient routing, which sadly hasn’t been released yet.  However, it’s interesting to note that the [Decentralized Systems and Network Services Research Group](https://dsn.tm.kit.edu/english/) at Karlsruhe Institute of Technology’s Institute of Telematics has been looking into this space too - c.f. their [A Glimpse of the Matrix](https://publikationen.bibliothek.kit.edu/1000100364) paper, which ponders very similar problems.

* _Getting Dendrite to production._

🏗 Dendrite work has been bubbling away in the background thanks to Anoa, Brendan, cnly (our GSoC dendrite contributor) and others.  Inevitably most of our bandwidth has gone into getting Synapse to 1.0 and making sure it’s fit for purpose, but we want and need to keep Dendrite alive for next-generation purposes - and in fact New Vector is hiring new people to work on it in 2020.

* _Inline widgets (polls etc)_

🏗 We have an MSC ([MSC2192](https://github.com/matrix-org/matrix-doc/pull/2192)), but not an implementation.

* _Improving VoIP over Matrix._

Very little progress here, frustratingly.  Jitsi has been upgraded and conference calls should kick ass these days (let us know if they don’t), but 1:1 needs a lot of love.  Hopefully we’ll get to it in 2020.

* _Adding more bridges, and improving the current ones._

Lots of bridging progress in 2020 - all new puppeting Slack support; huge fixes to the IRC bridge (including shifting to Postgres at last); Bifrost (the XMPP bridge) progressed too, and there’s been loads of community bridging work around WhatsApp, Discord and others.

* _Account portability_
* _Replacing MXIDs with public keys_

We’ve just started looking at implementing these seriously via [MSC1228](https://github.com/matrix-org/matrix-doc/blob/rav/proposal/remove_mxids_from_events/proposals/1228-removing-mxids-from-events.md) (as of last week) - expect progress in 2020.

So that sums up progress on the medium term menu - as you can see, a bunch actually happened; a bunch made progress; a few didn’t happen at all.

#### 2019: the longer-term priorities

Finally, on the longer term radar:

* _Shared-code cross-platform client SDKs (e.g. sharing a native core library between matrix-{js,ios,android}-sdk)_

No progress here.  Instead, all three main platforms have continued to write and maintain their own platform-specific SDKs for now.  [Seshat](https://github.com/matrix-org/seshat) however will be the first piece of native rust code shared across all 3 platforms - let’s see how that goes first...

* _Matrix daemons (e.g. running an always-on client as a background process in your OS which apps can connect to via a lightweight CS API)_

✅ [Pantalaimon](https://github.com/matrix-org/pantalaimon) lives!

* _Push notifications via Matrix (using a daemon-style architecture)_

No progress here, unless you count the CoAP low-bandwidth work.  However, Bubu (also Riot/Android Fdroid maintainer) has been working on a project called [OpenPush](https://bubu1.eu/openpush/) which looks to help in this space (albeit not built on Matrix, but could be used by Matrix).  There are a few other related projects.  If someone wants to build this on top of Matrix + CoAP please get in touch asap!

* _Clientside homeservers (i.e. p2p matrix) - e.g. compiling Dendrite to WASM and running it in a service worker._

🏗 Work is actually happening on this currently.  Dendrite has successfully compiled to WASM and runs, and we’ve had it (almost) talking HTTP tunnelled over libp2p as part of P2P Matrix experiments.  In 2020 we’re going to be investing a lot in P2P Matrix - to give users full control of their communication without even having to run a server, and also to simplify onboarding and account portability enormously.  We have a talk about this accepted for FOSDEM 2020 ([The Path to P2P Matrix](https://fosdem.org/2020/schedule/event/dip_p2p_matrix/)) and we’re actively (frantically) hacking on Dendrite to make it happen - keep an eye out for how things develop!  

* _Experimenting with MLS for E2E Encryption_

🏗 Now that E2E-by-default has entered the “it works! let’s land it in Riot asap” phase, Uhoreg has had some time to start thinking about the longer term future of encryption in Matrix.  [MLS (Messaging Layer Security)](https://datatracker.ietf.org/wg/mls/charter/) is the IETF’s initiative to define a standard mechanism for end-to-end-encrypted group chats, which has some major algorithmic improvements over Olm/Megolm and the Double Ratchet Algorithm as used by Signal.  The catch is that it doesn’t work at all well with decentralisation - however, we’ve been [working with them](https://mailarchive.ietf.org/arch/msg/mls/MnLJkbJ_Mwe8Oz0Ll6delGJLPz4) to try to ensure MLS can work in a decentralised world.  More recently, uhoreg has had a chance to think a lot more about this and we’re working on a proposal for Decentralised MLS which builds on plain MLS while also giving the semantics needed for Matrix.  It’s all very experimental at this point (and the proof-of-concept implementation is written in [Julia](https://julialang.org/)!) - but looks promising.  We’ll share more asap, and will certainly be investing more time in this in 2020..

* _Storing and querying more generic data structures in Matrix (e.g. object trees; scene graphs)_

Sadly no progress here :(

* _Alternate use cases for VR, IoT, etc._

...and none here either.

So, of all the myriad things on our radar for 2019 (as of Dec 2018), hopefully this gives some idea of where we hit the mark.

#### 2019: the unpredictable bits

However, there’s also a tonne of other stuff which happened which wasn’t explicitly on the radar.  On the synapse side, we finished fully migrating from Python 2 to Python 3, and started using asyncio and all the latest Python 3 goodies!  We finally [implemented configurable history retention](https://github.com/matrix-org/synapse/pull/6358) for servers and rooms! We even implemented [self-destructing messages](https://github.com/matrix-org/synapse/pull/6409) in Synapse (not that Riot exposes them yet). And there has been loads of optimisation and performance work since 1.0 landed in June.

On the ops side, we overhauled all our ops processes and security after the Matrix.org [datacenter breach](https://matrix.org/blog/2019/05/08/post-mortem-and-remediations-for-apr-11-security-incident/) in April, throwing away our legacy infrastructure and rebuilding it properly - and subsequently have been expanding our ops team from one dedicated ops person to four.  We also found ourselves having to do another emergency datacenter migration back in November when the old one was unable to reliably service IO for our database cluster.

We also spent a bunch time after shipping Matrix 1.0 working on tightening up Matrix’s privacy model - particularly around third party identity servers, integration managers, and making sure that folks self-hosting Matrix don’t accidentally depend on use 3rd party services without realising it.  If you missed out on the fun at the time, you can read all about it [here](https://matrix.org/blog/2019/06/30/tightening-up-privacy-in-matrix/) and [here](https://matrix.org/blog/2019/09/27/privacy-improvements-in-synapse-1-4-and-riot-1-4/).  This ended up being way more work than we expected, but we’re very glad to have sorted it out now.

Meanwhile, mainstream uptake of Matrix has properly taken off, with the French Government launching Tchap (their fork of Riot), now with hundreds of thousands of daily active users.  The [German Government revealed today](https://www.heise.de/newsticker/meldung/Open-Source-Bundeswehr-baut-eigene-verschluesselte-Messenger-App-4623404.html) that they are also formally trialling Matrix, starting with the Bundeswehr (Ministry of Defense); we’ve been helping them out with the deployment too. It is not an exaggeration to suggest that we could end up with an official cross-government Matrix network, publicly federated with the wider Internet, for self-hosted encrypted decentralised instant messaging.  In fact Ulrich Kelber, the Bundesdatenschutzbeauftragte (Federal Data Protection Commissioner) for Germany [pointed out](https://www.golem.de/news/whatsapp-matrix-oder-xmpp-bmi-sucht-einen-messenger-fuer-bundesbehoerden-1912-145326.html): “You could even set up a privacy-friendly messenger service in cooperation with France, which in the medium term could represent a real alternative to existing products on the market as a pan-European solution”.

Alongside all this, [Mozilla announced](https://matrix.org/blog/2019/12/19/welcoming-mozilla-to-matrix/) they are replacing the Moznet IRC network with Matrix; [KDE joined Matrix](https://matrix.org/blog/2019/02/20/welcome-to-matrix-kde/) in Feb, [Wikimedia](https://phabricator.wikimedia.org/T230531) is getting set up on their server, and more and more massive players (including the largest in the world) keep getting in touch to find out how they can best get onboard Matrix - it’s incredibly exciting.  It also means that we were able to [raise capital](https://matrix.org/blog/2019/10/10/new-vector-raises-8-5-m-to-accelerate-matrix-riot-modular/) to keep folks employed to work on Matrix fulltime via [New Vector](https://vector.im) and scale up [Modular.im](https://modular.im) as a paid hosting platform - which massively helps support core Matrix development.

#### 2020

All that remains now is to make some predictions for 2020.  Our main priorities are:

* Get E2E enabled for private rooms by default (see above).

* Riot First-time User Experience (FTUE).  While we redesigned Riot’s UI in 2019, there are still far too many weird gotchas which trip over new users.  Starting in October we began a shift to completely change how Riot development works - transitioning the project to being led by the UX design team rather than the dev team, and ensuring that the design team considers the app holistically across all 3 platforms.  Above all else, our priority is to make it kick ass for normal non-technical mainstream users - not just for opensourcey wizards.  This is a tough ask, but we believe it’s literally make-or-break for the project in the long term if Matrix is ever to become as prevalent as Slack or WhatsApp, and we are throwing everything we have at it.  The second that E2E is on by default, the entirety of the Riot teams will be focusing on the mission to clear our [FTUE backlog](https://github.com/vector-im/riot-web/issues?q=is%3Aopen+is%3Aissue+label%3Aproject%3Aftue).

* RiotX. We’re shipping RiotX on Android as fast as we can - currently users on Riot/Android are left high and dry and we need to do everything we can to finish RiotX and get them upgraded as rapidly as possible.

* Communities.  Off the back of FTUE comes the importance of grouping rooms & users together into communities in a much better way than we have today.  This will be up next.

* Synapse: shard the master by user/room to avoid being it being bottlenecked on CPU.  We also need to apply smarter queue management on federation traffic to better reduce the memory footprint (and so eliminate complexity limits on small-footprint hosted servers!) - and we also desperately need to speed up joins.

* Dendrite & P2P Matrix: the plan currently is to use Dendrite as the basis for our P2P Matrix experiments.  In practice this means making it federate using [MSC1228](https://github.com/matrix-org/matrix-doc/blob/rav/proposal/remove_mxids_from_events/proposals/1228-removing-mxids-from-events.md)-semantics (no point in wasting time implementing the ‘legacy’ key management), and then experiment with hooking it up to various P2P transports (e.g. our low-bandwidth CoAP transport) and discovery systems (e.g. mDNS; libp2p; etc).  How we go about actually getting it into production depends entirely on how well the experiment goes; we could evolve Matrix to be hybrid CS/P2P; we could treat it as a new protocol and bridge to it; who knows.  Watch this space...  

* MLS: figure out our plan for next-generation E2E - for better scaling, and better reliability, and what (if anything) we should do with [MLS](https://datatracker.ietf.org/wg/mls/charter/).

* Bridges: loads of work on the horizon to put a better UX on Bridging.  Bridge stability has improved enormously over the last year (thanks Half-Shot!) but we need to transition from being robust but ugly to being robust and polished...

* Spec: we need to work out how to go faster on reviewing MSCs (both our own and from the wider community).  While the governance process in general feels healthier than it’s ever been, empirically we’re not exactly burning through the MSC backlog - and this is in part that MSC work is squeezed in alongside the other dayjob stuff everyone’s working on. Finding the right balance between sculpting spec and sculpting code is tough, but we’re going to try to improve it in 2020.

* Abuse / Reputation: we want to empower users to make their own minds up about what content they want to see and not see on Matrix (or what they want to host or not host on their servers / communities / rooms).  [Mjolnir](https://github.com/matrix-org/mjolnir) is a good start, but we’ll be continuing to work on this throughout the year.

Meanwhile, all the things listed above that we didn’t get to in 2019 are of course still options on the menu too.

So there you have it.  I’ve not even tried to talk about the amazing stuff that the wider Matrix community has been up to - whether that’s amazing new clients like [Ditto](https://dittochat.org/) (React Native!) or [Nio!](https://github.com/kiliankoe/nio) (SwiftUI), or new bridges like [mautrix-facebook](https://github.com/tulir/mautrix-facebook) and [mautrix-hangouts](https://github.com/tulir/mautrix-hangouts), or even poljar’s secret rewrite of [weechat-matrix in Rust](https://github.com/poljar/weechat-matrix-rs); your best bet there is to skim through [TWIM](https://matrix.org/blog/category/this-week-in-matrix/).  Huge undying thanks go out though to everyone who builds on Matrix and keeps the ecosystem maturing and growing (especially while we’re scurrying around shoring up the foundations) - there’s simply no point in Matrix as a protocol without the vibrant community building on top.

All told, it’s been a bit of an epic year (both in terms of wins and fails), and all that remains is to thank _everyone_ who continues to use Matrix (particularly our [Patreon](https://www.patreon.com/matrixdotorg) supporters) for their ongoing support and for helping the project accelerate forwards.  More than ever before, the world needs free and open communication open to all; the age of proprietary communication silos may be coming to an end - consigned to live alongside AOL CDs and Compuserve IDs in the history books.  With your support, Matrix can provide a decent mainstream yet decentralised alternative - and we’ll do everything we can to make that happen in 2020.

Happy holidays!

Matthew, Amandine & the whole Matrix.org team.
