+++
title = "The Matrix Holiday Special 2024"
path = "/blog/2024/12/25/the-matrix-holiday-special-2024"

[taxonomies]
author = ["Matthew Hodgson", "Josh Simmons"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

Hi all,

Once again we celebrate the end of another year with the traditional Matrix Holiday Special! (see also [2023](https://matrix.org/blog/2023/12/25/the-matrix-holiday-update-2023/), [2022](https://matrix.org/blog/2022/12/25/the-matrix-holiday-update-2022), [2021](https://matrix.org/blog/2021/12/22/the-mega-matrix-holiday-special-2021/), [2020](https://matrix.org/blog/2020/12/25/the-matrix-holiday-special-2020/), [2019](https://matrix.org/blog/2019/12/24/the-2019-matrix-holiday-update/), [2018](https://matrix.org/blog/2018/12/25/the-2018-matrix-holiday-special/), [2017](https://matrix.org/blog/2017/12/25/the-matrix-holiday-mini-special-2017-edition/), [2016](https://matrix.org/blog/2016/12/26/the-matrix-holiday-special-2016-edition/) and [2015](https://matrix.org/blog/2015/12/25/the-matrix-holiday-special/) just in case you missed them).

This year, it is an incredible relief to be able to sit down and write an update which is overwhelmingly positive - in stark contrast to the rather mixed bags of 2022 and 2023. This is not to say that things are perfect: most notably, **The Matrix.org Foundation has not yet hit its funding goals, and urgently needs more organisations who depend on Matrix to [join as members](http://matrix.org/membership) in order to be financially sustainable.** However, in terms of progress of Matrix towards outperforming the centralised alternatives; growth of the ecosystem; the success of the first ever Matrix Conference; we couldn’t be happier - and hopefully the more Matrix matures, the more folks will want to join the Foundation to help fund it.

So, precisely why are we feeling so happy right now?

<!-- more -->

### Matrix 2.0
Matrix 2.0 is the project to ensure that Matrix can be used to build apps which outcompete the incumbent legacy mainstream communication apps.  Since announcing the project at FOSDEM 2023, we’ve been hard at work iterating on:

* Sliding Sync, providing instant sync, instant login and instant launch.
* Next Generation Auth via OIDC, to support instant login by QR code and consistent secure auth no matter the client.
* Native Multiparty VoIP via MatrixRTC, to provide consistent end-to-end-encrypted calling conferencing within Matrix using Matrix’s encryption and security model.
* Invisible Cryptography, to ensure that encryption in Matrix is seamless and no longer confuses users with unable-to-decrypt errors, scary shields and warnings, or other avoidable UX fails.

All of these projects are big, and we’ve been taking the time to iterate and get things right rather than cut corners – the whole name of the game has been to take Matrix from 1.0 (it works) to 2.0 (it works fast and delightfully, and outperforms the others).  However, in September at the Matrix Conference we got to the point of shipping working implementations of all of the Matrix 2.0 MSCs, with the expectation of using these implementations to prove the viability of the MSCs and so propose them for merging into the spec proper.

Sliding Sync ended up evolving into [MSC4186](https://github.com/matrix-org/matrix-spec-proposals/pull/4186): Simplified Sliding Sync, and is now natively integrated into Synapse (no more need to run a sliding sync proxy!) and deployed on matrix.org, and implemented in matrix-rust-sdk and matrix-js-sdk.  MatrixRTC is [MSC4143](https://github.com/matrix-org/matrix-spec-proposals/pull/4143) and dependents and is also deployed on matrix.org and call.element.io. Invisible Cryptography is a mix of MSCs: [MSC4161](https://github.com/matrix-org/matrix-spec-proposals/pull/4161) (Crypto terminology for non-technical users), [MSC4153](https://github.com/matrix-org/matrix-spec-proposals/pull/4153) (Exclude non-cross-signed devices), [MSC3834](https://github.com/matrix-org/matrix-spec-proposals/pull/3834) (Opportunistic user key pinning (TOFU)), and is mostly now implemented in matrix-rust-sdk - and Unable To Decrypt problems have been radically reduced (see [Kegan’s excellent Matrix Conference talk](https://www.youtube.com/watch?v=FHzh2Y7BABQ) for details).  Finally, Next Gen Auth is [MSC3861](https://github.com/matrix-org/matrix-spec-proposals/pull/3861) and is planned to be deployed on matrix.org via [matrix-authentication-service](https://github.com/element-hq/matrix-authentication-service) in Feb 2025.

It’s been controversial to ship Matrix 2.0 implementations prior to the MSCs being fully finalised and merged, but given the MSCs are backwards compatible with Matrix 1.0, and there’s unquestionable benefit to the ecosystem in getting these step-changes in the hands of users ASAP, we believe the aggressive roll-out is justified. Meanwhile, now the implementations are out and post-launch teething issues have largely been resolved, the MSCs will progress forwards.

One of the things we somehow failed to provide when announcing the implementations at the Matrix Conference was a playground for folks to experiment with Matrix 2.0 themselves. There’s now one based on Element’s stack of Synapse + matrix-authentication-service + Element Web + Element Call available at [element-docker-demo](https://github.com/element-hq/element-docker-demo) in case you want to do a quick `docker compose up` to see what all the fuss is about!  Meanwhile, matrix.org should support all the new MSCs in February – which might even coincide with the MSCs being finalised, you never know!

Rather than going through Matrix 2.0 in detail again, best bet is to check out the launch talk from The Matrix Conference…

{{ youtube_player(video_id="ZiRYdqkzjDU") }}

…and in terms of seeing a Matrix 2.0 client in action, the Element X launch talk shows what you can do with it!

{{ youtube_player(video_id="gHyHO3xPfQU") }}

Honestly, it is _insanely_ exciting to see Matrix having evolved from the “good enough for enthusiastic geeks” to the “wow, this feels better than Signal” phase that we’re entering now.  Meanwhile, matrix-rust-sdk is tracking all the latest Matrix 2.0 work, so any client built on matrix-rust-sdk (Fractal, Element X, iamb, etc) can benefit from it immediately.  There’s also some _really_ exciting matrix-rust-sdk improvements on the near horizon in the form of the long-awaited [persistent event cache](https://github.com/matrix-org/matrix-rust-sdk/issues/3280), which will accelerate all event operations enormously by avoiding needless server requests, as well as providing full offline support.

### The Matrix Conference

Talking of The Matrix Conference - this was by far the highlight of the year; not just due to being an excellent excuse to get Matrix 2.0 implementations launched, but because it really showed the breadth and maturity of the wider Matrix ecosystem.

One of the most interesting dynamics was that by far the busiest track was the Public Sector talk track (sponsored by Element) – standing room only, with folks queuing outside or watching the livefeed, whether this was [Gematik talking about Matrix](https://www.youtube.com/watch?v=MoA2cYfHlyA) powering communications for the German healthcare industry, [SwissPost showing off their nationwide Matrix deployment](https://www.youtube.com/watch?v=EIRuxDuWIDE) for Switzerland, [DINUM showing off Tchap](https://www.youtube.com/watch?v=m1roliPrNqc) for France, [NATO explaining NI²CE](https://www.youtube.com/watch?v=4aswIHJRwkk) (their Matrix messenger), [Försäkringskassan showing off Matrix for Sweden](https://www.youtube.com/watch?v=XLt70u0btsM) with SAFOS, [Tele2 showcasing Tele2 Samarbete](https://www.youtube.com/watch?v=Oan-bx84ui8) (Matrix based collaboration from one of Sweden’s main telcos), FITKO explaining how to do [Government-to-Citizen communication with Matrix in Germany](https://www.youtube.com/watch?v=Fj_tBpTlBEE), [ZenDiS using Matrix for secure communication](https://www.youtube.com/watch?v=oMxxfRiaN98) in the German sovereign workspace openDesk project, or [IBM showing off their Matrix healthcare deployments](https://www.youtube.com/watch?v=uRaKEw6Wo3U).

This felt really surprising: not only are we in an era where Matrix appears to be completely dominating secure communication and collaboration in the public sector – but it’s not just GovTech folks interested, but the wider Matrix community too.

I think it’s fair to say that when we created Matrix, we didn’t entirely anticipate this super-strong interest from government deployments – although in retrospect it makes perfect sense, given that more than anyone, nations wish to control their own infrastructure and run it securely without being operationally dependent on centralised solutions run out of other countries.  A particular eye-opener recently has been seeing US Senators Ron Wyden (D) and Eric Schmitt (R) [campaigning for the US Government to deploy Matrix](https://element.io/blog/senators-implore-department-of-defense-to-expand-the-use-of-matrix/) in a way similar to France, Germany, Sweden and others. If this comes to pass, then it will surely create a whole new level of Matrix momentum!

It’s worth noting that while many Matrix vendors like Element, Nordeck, Famedly, connect2x and others have ended up mainly focusing commercially on public sector business (given that’s empirically where the money is right now) – the goal for Matrix itself continues to be mainstream uptake.

Matrix’s goal has always been to be the missing communication layer of the web for **everyone**, providing a worthy modern open replacement to both centralised messaging silos as well as outdated communication networks like email and the PSTN.  It would be a sore failure of Matrix’s potential if it “only” ended up being successful for public sector communication!  As it happens, our FOSDEM 2025 mainstage talk was just accepted, and happens to be named “The Road To Mainstream Matrix.” So watch this space to find out in February how all the Matrix 2.0 work might support mainstream Matrix uptake in the long-run, and how we plan to ensure Matrix expands beyond GovTech!

### The Governing Board

Another transformative aspect of 2024 was the formation of The Matrix.org Foundation Governing Board. _**Over to Josh with the details…**_

The election of our first ever Governing Board this year has gone a long way to ensuring we can truly call Matrix a public good, as something that is not only shared under an open source license and developed in the open, but also openly governed by elected representatives from across the ecosystem.

It took forming the Spec Core Team and the Foundation, both critical milestones on a journey of openness and independence, to pave the way. And with the Governing Board, we have a greater diversity of perspectives and backgrounds looking after Matrix than ever before!

The Governing Board is in the process of establishing its norms and processes and just last week [published the first Governing Board report](https://matrix.org/blog/2024/12/governing-board-first-report/). Soon it’ll have elected committee chairs and vice chairs, and it appears to be on track to introduce our first working groups – official bodies to work together on initiatives in support of Matrix  – at FOSDEM. Working groups will be another massive step forward, as they enable us to harmonize work across the ecosystem, such as on Trust & Safety and community events.

One last note on this, I want to shout out Greg Sutcliffe and Kim Brose, our first duly elected Chair and Vice Chair of the Governing Board, who have been doing great work to keep things in motion.

### Growing Membership

A key part of building the Governing Board has been recruiting to our membership program, which brings together organizations, communities, and individuals who are invested in Matrix. Our members illustrate the breadth of the ecosystem, and many of them are funders who help sustain our mission.

The Foundation has gone from being completely subsidized by Element in 2022, to having nearly half of its annual budget covered by its 11 funding members.

Of course, only being able to sustain half our annual budget is not nearly good enough, and it means that we live hand-to-mouth, extending our financial runway a bit at a time. It’s a nail biter of a ride for the hardworking staff who labor under this uncertainty, but we savor every win and all the progress we’ve made.

I’d like to take this opportunity to thank our funding members, including [Element](https://element.io/), our Gold Members, [Automattic](https://automattic.com/) and [Futurewei Technologies](https://www.futurewei.com/), our Silver Members, [ERCOM](https://ercom.com/), [Fairkom](https://www.fairkom.eu/), [Famedly](https://www.famedly.com/), [Fractal Networks](https://github.com/fractalnetworksco/), [Gematik](https://www.gematik.de/), [IndieHosters](https://indie.host/), [Verji Tech](https://verji.no/en), and [XWiki](https://www.xwiki.org/).

We look forward to welcoming two new funding members in the coming weeks!

Our community-side members also play an important role, and we’re grateful for their work and participation. This includes our Associate Members, [Eclipse Foundation](https://eclipse.org/), [GNOME Foundation](https://gnome.org/), and [KDE](https://kde.org/), and our Ecosystem Members: [Cinny](https://cinny.in/), [Community Moderation Effort](https://matrix.org/support/), [Conduit](https://conduit.rs/), [Draupnir](https://github.com/the-draupnir-project/Draupnir), [Elm SDK](https://github.com/noordstar/elm-matrix-sdk), [FluffyChat](https://fluffychat.im/), [Fractal](https://gitlab.gnome.org/World/fractal), [Matrix Community Events](https://matrix.to/#/#community-events:matrix.org), [NeoChat](https://apps.kde.org/neochat/), [Nheko-Reborn](https://nheko.im/nheko-reborn/nheko/), [Polychat](https://polychat.de/), [Rory&::LibMatrix](https://cgit.rory.gay/matrix), [Thunderbird](https://thunderbird.net/), and [Trixnity](https://trixnity.gitlab.io/trixnity).

If you’d like to see Matrix continue its momentum and the Foundation to further its work in ensuring Matrix is an independently and collectively governed protocol, [please join the Foundation today](https://matrix.org/support/). We need your help!

_**Back to you, Matthew!**_

### Focus

In 2023, we went through the nightmarishly painful process of ruthlessly focusing the core team exclusively on stabilising and polishing the foundations of Matrix – shelving all our next-generation showcases and projects and instead focusing purely on refining and evolving today’s Matrix core use cases for chat and VoIP.  

In 2024, I’m proud to say that we’ve kept that focus – and indeed improved on it (for instance, [we’ve stepped back on DMA work](https://matrix.org/blog/2024/09/whatsapp-dma/) for much of the year in order to focus instead on the Trust & Safety work which has gone into Matrix 1.11, 1.12, and 1.13).  As a result, despite a smaller team, we’ve made huge progress with Matrix 2.0, and the results speak for themselves.  Anecdotally, I now wince whenever I have to use another messaging system – not because of loyalty to Matrix, but because the experience is going to be worse: WhatsApp has more "Waiting for message, this may take a while" errors (aka Unable To Decrypts or UTDs) than Matrix does, takes longer to launch and sync and has no threads; iMessage’s multidevice support can literally take hours to sync up; Signal just feels clunky and my message history is fragmented all over the place.  It feels so good to be in that place, at last.

Meanwhile, it seems that Element’s move to switch development of [Synapse and other projects to AGPL](https://element.io/blog/synapse-now-lives-at-github-com-element-hq-synapse/) may have been for the best – it’s helped concretely address the issue of lack of commercial support from downstream projects, and Element is now in a much better position to continue funding Synapse and other core Matrix work.  It’s also reassuring to see that 3rd party contributions to Synapse are as active as ever, and all the post-AGPL work on Synapse such as native sliding sync shows Element’s commitment to improving Synapse.  Finally, while Dendrite dev is currently slow, the project is not abandoned, and critical fixes should keep coming – and if/when funding is available P2P Matrix & Dendrite work should resume as before. It wouldn’t be the first time Dendrite has come back from stasis!

### The Future

Beyond locking down Matrix 2.0 in the spec and getting folks using it, there are two big new projects on the horizon: MLS and State Res v3.

MLS is Messaging Layer Security (RFC 9420), the IETF standard for group end-to-end-encryption, and we’ve been experimenting with it for years now, starting around 2019, to evaluate it for use in Matrix alongside or instead of our current Double Ratchet implementation (Olm/Megolm).  The complication on MLS is that it requires a logically centralised function to coordinate changes to the membership of the MLS group – whereas Matrix is of course fully decentralised; there’s never a central coordination point for a given conversation.  As a result, we’ve been through several iterations of how to decentralise MLS to make it play nice with Matrix – essentially letting each server maintain its own MLS group, and then defining merge operations to merge those groups together.  You can see the historical work over at [https://arewemlsyet.com](https://arewemlsyet.com/).

However, the resulting dialect of MLS (DMLS) has quite different properties to vanilla RFC 9420 MLS – for instance, you have to keep around some historical key data in case it’s needed to recover from a network partition, which undermines forward secrecy to some extent.  Also, by design, Matrix network partitions can last forever, which means that the existing formal verification work that has been done around MLS’s encryption may not apply, and would need to be redone for DMLS.

Meanwhile, we’ve been participating in MIMI (More Instant Messaging Interoperability), an IETF working group focused on building a new messaging protocol to pair with MLS’s encryption.  A hard requirement for MIMI is to utilise MLS for E2EE, and we went through quite a journey to see if Matrix could be used for MIMI, and understand how Matrix could be used with pure MLS (e.g. by having a centralised Matrix dialect like [Linearized Matrix](https://datatracker.ietf.org/doc/draft-ralston-mimi-linearized-matrix/)).  Right now, MIMI is heading off in its own direction, but we’re keeping an eye on it and haven’t given up on converging somehow with it in future.  And if nothing else, the exercise taught us a lot about marrying up Matrix and MLS!

Over the last few months there has been more and more interest in using MLS in Matrix, and at The Matrix Conference [we gave an update on the latest MLS thinking](https://www.youtube.com/watch?v=PCIg8Qjn74I), following a workshop at the conference with Franziskus from Cryspen (local MLS formal-verification experts in Berlin).  Specifically, the idea is that it might be possible to come up with a dialect of Matrix which used pure RFC 9420 MLS rather than DMLS, potentially using normal Matrix rather than Linearized Matrix… albeit with MLS group changes mediated by a single ‘hub’ server in the conversation.  The good news is that Cryspen proposed a mechanism where in the event of a network partition, both sides of the partition could elect a new hub and then merge the groups back together if the partition healed (handling history-sharing as an out-of-band problem, similar to the problem of sharing E2EE history when you join a new room in Matrix today).  This would then significantly reduce the disadvantages of rooms having to have a centralised hub, given if the hub broke you could seamlessly continue the conversation on a new one.

So, we’ve now had a chance to sketch this out as [MSC4244 - RFC 9420 MLS for Matrix](https://github.com/matrix-org/matrix-spec-proposals/pull/4244), with two dependent MSCs ([MSC4245 - Immutable encryption](https://github.com/matrix-org/matrix-spec-proposals/pull/4245), and [MSC4246 - Sending to-device messages as/to a server](https://github.com/matrix-org/matrix-spec-proposals/pull/4246)) and it’s looking rather exciting.  This is essentially the protocol that Travis & I would have proposed to MIMI had the WG not dismissed decentralisation and dismissed Matrix interop - showing how it’s possible to use MLS for cryptographic group membership of the devices in a conversation, while still using Matrix for the user membership and access control around the room (complete with decentralisation).  Best of all, it should also provide a solution to the longstanding problem of “Homeserver Control of Room Membership” highlighted by [Albrecht & co from RHUL in 2022](https://nebuchadnezzar-megolm.github.io/static/paper.pdf), by using MLS to prove that room membership changes are initiated by clients rather than malicious servers.

Now, we’re deliberately releasing this as a fairly early draft from the Spec Core Team in order to try to ensure that MLS spec work is done in the open, and to give everyone interested the opportunity to collaborate openly and avoid fragmentation.  In the end, the SCT has to sign off on MSCs which are merged into Matrix, and we are responsible for ensuring Matrix has a coherent and secure architecture at the protocol layer – and for something as critical as encryption, the SCT’s role in coordinating the work is doubly important.  So: if you’re interested in this space, we’d explicitly welcome collaboration and feedback on these MSCs in order to get the best possible outcome for Matrix – working together in the open, as per the [Foundation’s values](https://matrix.org/foundation/about/) of ‘collaboration rather than competition’, and ‘transparency rather than stealth’.

Meanwhile, the other big new project on the horizon is State Resolution v3.  Old-timers may remember that when we launched Matrix 1.0, one of the big changes was the arrival of State Resolution v2 ([MSC1442](https://github.com/matrix-org/matrix-spec-proposals/blob/erikj/state_res_msc/proposals/1442-state-resolution.md)), which fixed various nasty issues in the original merge conflict resolution algorithm Matrix uses to keep servers in sync with each other.  Now, State Res v2 has subsequently served us relatively well (especially relative to State Res v1), but there have still been a few situations where rooms have [state reset](https://github.com/matrix-org/synapse/issues/8629) unexpectedly – and we’re currently in the process of chasing them down and proposing some refinements to the algorithm.  There’s nothing to see yet, although part of the work here has been to dust off [TARDIS](https://github.com/matrix-org/tardis), our trusty Time Agnostic Room DAG Inspection Service, to help visualise different scenarios and compare different resolution algorithms.  So watch this space for some very pretty explanations once v3 lands!

![](/blog/img/2024-12-25-tardis.png)

### Happy New Year!

Matrix feels like it entered a whole new era in 2024 – with the Foundation properly spreading its wings, hosting The Matrix Conference, operationalising the Governing Board, and Matrix uptake exploding across the public sector of 20+ countries.  Funding continues to be an existential risk, but as Matrix continues to accelerate we’re hopeful that more organisations who depend on Matrix will lean in to support the Foundation and ensure Matrix continues to prosper.

Meanwhile, 2025 is shaping up to be really exciting. It feels like we’ve come out of the darkness of the last few years with a 2.0 which is better than we could have possibly hoped, and I can’t wait to see where it goes from here!

Thanks to everyone for supporting the project - especially if you are a member of the Foundation (and if not, [please join here!](http://matrix.org/membership)). We hope you have a fantastic end of the year; see you on the other side, and thanks for flying Matrix :)

