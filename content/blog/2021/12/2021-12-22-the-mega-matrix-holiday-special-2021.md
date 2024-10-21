+++
title = "The Mega Matrix Holiday Special 2021"
date = "2021-12-22T23:27:06Z"
updated = "2021-12-22T17:54:48Z"
path = "/blog/2021/12/22/the-mega-matrix-holiday-special-2021"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

Hi all,

If you’re reading this - congratulations; you made it through another year :)  Every winter we sit down and review Matrix’s progress over the last twelve months, and look forward to the next - for it’s all too easy to get lost in the day-to-day development and fail to realise how much the overall project is evolving, especially when it’s one as large and ambitious as Matrix!

Looking back at 2021, it’s unbelievable how much stuff has been going on in the core team (as you can tell by the length of this post - sorry!).  There’s been a really interesting mix of activity too - between massive improvements to the core functionality and baseline features that Matrix provides, and also major breakthroughs on next generation work.  But first, let’s check out what’s been happening in the wider ecosystem…

## The Matrix Ecosystem

Over 2021 the Matrix ecosystem has expanded unrecognisably.  This time last year we were aware of 2 governments who were seriously adopting Matrix at scale (France and Germany), with the UK and US starting to roll out initial deployments.  12 months later, and we are now aware of **12** governments who are adopting Matrix in various capacities - and we hope to be able to talk about at least some of them in public in 2022!  The UK and US have both progressed significantly too.

Meanwhile, one of the most exciting new public sector stories this year has been [gematik](https://www.gematik.de/anwendungen/ti-messenger): Germany’s national healthcare agency, who [announced Matrix](https://matrix.org/blog/2021/07/21/germanys-national-healthcare-system-adopts-matrix) as the basis for interoperable secure messaging throughout the whole healthcare sector.  This is a genuine step change for Matrix: rather than a government putting out tenders for “a secure messaging solution”, instead we are seeing tenders for Matrix solution providers.  The Matrix industry is real; it exists today, and we’re seeing more and more new providers such as [Famedly](https://famedly.com/) (building on the [Flutter/Dart stack](https://gitlab.com/famedly/company/frontend) which powers [FluffyChat](https://fluffychat.im)) and [Folivonet](https://folivo.net/portfolio/timmy-messenger/) (building on the [Trixnity](https://gitlab.com/benkuly/trixnity) Kotlin Multiplatform stack) stepping up to get involved - as well as many more big incumbents.  We created Matrix in order to bootstrap a new decentralised communication industry, and frankly it’s amazing to see it actually taking shape.

Another big step change has been the number of existing chat providers looking to become part of the wider Matrix network. Back in September our friends at [Rocket.Chat announced that they’re working on Matrix support](https://www.youtube.com/watch?v=jBtBiUXLqAk&t=1691s) for federation, perhaps inspired by our case study in making [Gitter speak Matrix](https://matrix.org/blog/2020/12/07/gitter-now-speaks-matrix) - and meanwhile Matrix comes up a lot in the context of Twitter’s Bluesky initiative, and a few big players we can’t yet mention have also been in touch wanting to natively talk Matrix too.

We’ve also seen a huge shift in big enterprises adopting Matrix for self-sovereign secure communication (although we can’t drop any names yet 😔). This may have been spurred on by such misadventures as Electronic Arts being compromised via a [leaked Slack access token](https://www.vice.com/en/article/7kvkqb/how-ea-games-was-hacked-slack), but it feels like many of the biggest organisations now realise that unquestioningly handing their data to Slack or Teams is a bad idea, when they could have an end-to-end encrypted deployment of their own instead.

There has also been a turning point in legislation in favour of Matrix - with the EU Digital Markets Act [pushing hard for interoperability](https://twitter.com/matrixdotorg/status/1471191916838633481) for ‘big tech’ communication services in the EU (see [Amandine’s take](https://interoperability.news/2021/12/eu-parliament-upgrades-dma-to-open-gatekeepers-gates/) here), and meanwhile Eric Migicovsky, CEO at [Beeper](https://www.beeper.com/) has been busy [testifying to US Congress](https://www.c-span.org/video/?c4992173/user-clip-eric-migicovsky-testimony) on the merits of interoperability too. It’s not inconceivable that we will soon live in a world where governments mandate that the walled gardens will finally have to open up, and we may see a whole new level of interest in communication providers wanting to join Matrix!

Communities themselves have also been embracing Matrix more and more over the last year: we were incredibly proud to host [FOSDEM 2021](https://matrix.org/blog/2021/02/15/how-we-hosted-fosdem-2021-on-matrix), the world’s biggest open source conference via Matrix (all 35K attendees!) - and we’re gearing up to do it again in February for [FOSDEM 2022](https://twitter.com/fosdem/status/1451475324684980241) (this time with our [very first FOSDEM Matrix dev room](https://matrix.org/blog/2021/12/02/call-for-participation-for-the-fosdem-2022-matrix-dev-room)!). We were also really glad that [Libera.chat](https://libera.chat/) let us point a dedicated homeserver and IRC bridge at their new IRC network (meaning you can join anywhere on Libera from Matrix as #channel:libera.chat, and talk to anyone as @nick:libera.chat). High profile open source projects have been adopting Matrix all over the place - [Debian](https://wiki.debian.org/Teams/DebianSocial/Matrix), [Fedora](https://fedoramagazine.org/multiple-matrix-sessions-with-element-on-fedora-linux/), [NixOS](https://nixos.wiki/wiki/Matrix), [Arch](https://wiki.archlinux.org/title/Matrix), [Tor](https://blog.torproject.org/entering-the-matrix/), [Ansible](https://ansible.github.io/community/posts/matrix_and_ansible.html), [WHATWG](https://whatwg.org/chat) and many others (check out [this list](https://www.ubuntubuzz.com/2021/10/matrix-chat-adoption-by-community-in.html)!) now have their own Matrix servers and spaces.  (You know things are busy when we haven’t had time to do a big blog post to announce folk as important as these joining the network!)

Finally, there has been an explosion of new projects and milestones in the wider community - [Conduit](https://conduit.rs) entered [beta](https://conduit.rs/release-0-2-0/) as a super exciting lightweight Rust homeserver implementation; [FluffyChat](https://fluffychat.im) hit 1.0 with an impressively polished Flutter-based experience; [Beeper](https://beeper.com) pre-launched to huge amounts of mainstream excitement; [Cinny](https://cinny.in/) exploded out of the blue as an incredibly elegant next-generation web client; [Keanu](https://keanu.im/) materialised from [The Guardian Project](https://guardianproject.info/) as their glossy Matrix client suite; [Commune](https://commune.chat/) appeared as a hybrid messageboard/chatroom interface; [Nheko](https://github.com/Nheko-Reborn/nheko/) has matured significantly with huge E2EE improvements and feature and VoIP polish; [NeoChat](https://apps.kde.org/en-gb/neochat/) and [libQuotient](https://github.com/quotient-im/libQuotient) development is progressing solidly; [Fractal](https://gitlab.gnome.org/GNOME/fractal) is busy with the [fractal-next](https://gitlab.gnome.org/GNOME/fractal/-/tree/fractal-next) rewrite to move everything over to matrix-rust-sdk and GTK 4;  [Syphon](https://syphon.org/) continues to forge ahead as a privacy-focused Flutter-based client, and non-chat clients like [The Board](https://github.com/toger5/TheBoard), [Populus](https://github.com/opentower/populus-viewer) and [Matrix Highlight](https://github.com/DanilaFe/matrix-highlight) have started to appear in earnest too!  We also had a super successful [Google Summer of Code](https://matrix.org/blog/2021/05/20/google-summer-of-code-2021) this year, with a record number of 7 students participating in both core team and community projects.

Please note this is just a random sample of all the community news over the last year - to get more colour on what’s been going on, we highly recommend flipping through the [This Week In Matrix archives](https://matrix.org/blog/category/this-week-in-matrix)!

## The Matrix Spec

The Matrix spec is the single source of truth of what Matrix actually is, and this year it got some major improvements thanks to a beautiful new website at [https://spec.matrix.org](https://spec.matrix.org) thanks to Will Bamberg, formerly of [MDN](https://developer.mozilla.org/) (and who’s now back fighting the good fight with the MDN team at [OWD](https://opencollective.com/open-web-docs/updates/will-bamberg-joins-open-web-docs-staff)).

Aside from the new spec site, we also released our first official point release in a while - [Matrix 1.1](https://matrix.org/blog/2021/11/09/matrix-v-1-1-release), and we’re going to aim to keep regular releases happening once a quarter from here on in.  It’s also worth noting that it’s very much a feature and not a bug that spec releases lag behind the various [spec proposals](https://matrix.org/docs/spec/proposals) which fly around as the core team and community experiment with new features like spaces, threads, etc.  We very deliberately only merge change proposals to the spec which have been proven to work in real life implementations, and which have fully passed the spec review process (along with any dependencies they might have!).

Talking of which, in 2021 we saw a record **109** Matrix Spec Change proposals (MSCs) created. Even better, we closed **62** MSCs - so while the backlog is still growing, we’re still making very concrete progress.  Of the 109 new MSCs: 34 were from the wider Matrix community, 34 were from ex-community contributors who are now part of the core team, 13 were from the founding Matrix team, and 28 were from folks hired to work on Matrix by Element on behalf of the Matrix.org Foundation.  This feels like a pretty healthy blend of contributions, and while it’s true that spec work could always progress faster, things do seem to be heading in the right direction.

![The latest MSC stats](/blog/img/2021-12-22-spec.png)

In the new year, the Spec Core Team (responsible for reviewing MSCs and voting on what gets merged to the spec) is going to make a concerted effort to carve out more dedicated time for spec work - thankfully one of the side-effects of Matrix growing is that there are now a lot more people around with whom we can share other work, hopefully meaning that we can put significantly more hours into keeping the spec growing healthily.

## Synapse

Synapse is the primary homeserver implementation published by the Matrix core team, and its maturity is unrecognisable from where we were a year ago.  One of the big breakthroughs has been stabilising memory usage through caching improvements - the Matrix.org synapse now reliably only uses 2-3GB of RAM on its main process, despite its activity having more than doubled over the last year (up from 513K monthly active users to 1.11M!).

![Synapse memory performance fixes](/blog/img/2021-12-22-perf.jpg)

Further signs of maturity include Synapse’s radically improved new [documentation](https://matrix-org.github.io/synapse/latest/) and the new [module API](https://matrix-org.github.io/synapse/latest/modules/index.html), the fact that mypy type-safety coverage has improved from ~75% to over 89.7% (across 151,903 lines of code!), and the fact that Open Tracing support has matured to the point that visualising complex cross-worker behaviour is nowadays a genuine pleasure.  Frankly, Synapse should be feeling robust and stable these days - if you see folks claiming otherwise, please check they’re not basing that on outdated info (or failing that, get them to file bug reports that we can jump on!).

Meanwhile, on the feature side, we’ve landed a huge spate of long-awaited core functionality.  Probably the best way to track it is by the Matrix Spec Change proposals (MSCs) which have been implemented (although I dare you to also go and check out Synapse’s [changelog](https://github.com/matrix-org/synapse/blob/develop/CHANGES.md), all 675KB of it, which is frankly a thing of beauty and will take you down a rabbithole all the way back to v0.0.0 in Aug 2014 if you so desire ;P). Major MSCs which we’ve landed include:

* Spaces! It’s hard to overstate how positive this has been for Matrix’s usability: at last, we can group our rooms together however we please, both for our own edification and to share with others - and we can view space hierarchies over federation, complete with pagination ([MSC2946](https://github.com/matrix-org/matrix-doc/pull/2946)) as well as specify who can join a room based on whether they’re a member of a given space/room ([MSC3083](https://github.com/matrix-org/matrix-doc/pull/3083)).
* Threads! Yes, that’s right - coming any day now to a Matrix client close to you, we have ‘classic’ threaded messaging landing, providing sidebars of conversation through the new m.thread relation type ([MSC3440](https://github.com/matrix-org/matrix-doc/pull/3440)), building on Matrix’s existing aggregation API as used for edits and reactions.  We’ve chosen to prioritise single-level-deep-threads rather than arbitrarily-deep-trees ([MSC2836](https://github.com/matrix-org/matrix-doc/pull/2836)) as it maps more easily to a chat UX, although the two approaches are not mutually exclusive.
* Aggregations! Everyone’s favourite bête noire in Matrix tends to be that aggregations for edits & reactions predate today’s Matrix Spec Change process and went mainstream without using a vendor prefix before their spec had been stabilised.  Better late than never, we’ve taken advantage of Threads to go back and fix what once went wrong - and now [MSC2674](https://github.com/matrix-org/matrix-doc/pull/2674) and [MSC2675](https://github.com/matrix-org/matrix-doc/pull/2675) and friends are hopefully on a much better track to provide a basis for how aggregations work - both in the spec and in the reference implementation in Synapse.

![Anatomy of a bête noire](/blog/img/2021-12-22-aggs.png)

* Social Login via multiple SSO providers ([MSC2858](https://github.com/matrix-org/matrix-doc/pull/2858)) - almost 50% of new registrations on the Matrix.org homeserver now use social login!  Interestingly the split of SSO usage is roughly 70% Google, 12% GitHub, 11% Apple, 6% Facebook and 1% GitLab. Make of that what you will!
* Knocking ([MSC2403](https://github.com/matrix-org/matrix-doc/pull/2403))! Huge thanks to Sorunome and Anoa, we now support the ability to knock to ask to join a room if not yet invited. If this sounds unfamiliar, it may be because it hasn’t landed in Element yet, but expect it to land next year.
* Refresh tokens ([MSC2918](https://github.com/matrix-org/matrix-doc/pull/2918))! At last, we have a standard way for clients to refresh their access tokens, so that if your access token leaks it will not give access to your account indefinitely.  (This also has yet to land in Element, but has been proved on a branch on Hydrogen).

Finally, last but not least, Eric from Gitter has been fearlessly hacking his way through some of Matrix’s gnarliest problems in his quest to bring Matrix+Element up to full feature parity with Gitter. In practice, this means adding the ability to incrementally import old history into existing Matrix rooms ([MSC2716](https://github.com/matrix-org/matrix-doc/pull/2716)), so we can expose the vast amounts of knowledge in Gitter’s archives directly into Matrix - and in future provide bridging in general of existing archives (Slack, Discord, mailing lists, newsgroups, forums, etc.) into Matrix.

This is a *tough* problem, as Matrix rooms are fundamentally immutable - events sent into a room cannot be changed.  However, we can bend time a bit and add old chapters of history to the room as if we’d just discovered them down the back of the sofa - and this is what [MSC2716](https://github.com/matrix-org/matrix-doc/pull/2716) does.  The (rewritten!) [spec proposal](https://github.com/matrix-org/matrix-doc/blob/matthew/[MSC2716](https://github.com/matrix-org/matrix-doc/pull/2716)/proposals/2716-batch-send-historical-messages.md) is a thing of beauty and well worth a look, and you can see an early preview in action back on [Matrix Live in June](https://youtu.be/gSrqj2IzJew?t=529). Over the last few months it’s been merging and maturing in Synapse and we should see it in the wild in the near future!  And for bonus points Eric’s also just added in Jump-to-date support ([MSC3030](https://github.com/matrix-org/matrix-doc/pull/3030)), letting clients jump around room history by timestamp - another Gitter feature that we sorely need, and will also help us publish excellent Gitter-style online chat archives in future.  You can see it in action in last week’s [Matrix Live](https://youtu.be/Hsyqa5ozWIo?t=581)!

## Element

Meanwhile, on the client side, Element continues to act as a flagship client to drive the development of the official client SDKs we ship as the Matrix.org Foundation - and our focus more than ever before has been to ensure that Matrix can be used to create mainstream-usable polished glossy apps.  After all, Matrix will only succeed if clients emerge which can punch their weight against the enormous incumbents - be they Slack, Teams, WhatsApp or Discord.

This year, improving UX quality has been front and center - and hopefully the shift has been obvious in the app (and huge thanks to everyone who tweeted/tooted/enthused about improvements when they saw them!).  Part of this has been ensuring that all new features are built in a design- and product-led fashion by folks who are explicitly focused on product engineering - with product design involved from the outset and with coordination and focus provided by product management folks. This is far from the typical way that FOSS operates, but if we’re to succeed against the incumbents we have to beat them at their own game (just as, for instance, Mozilla wields conventional product management in their browser wars).

More recently, there’s also been a major shift towards structured [user testing](https://twitter.com/element_hq/status/1470798993122807809) in order to evaluate new features and analyse how users trip over the app in general, including radically improved analytics (for those who opt in!) to help visualise which bits of the app aren’t working.  In the new year, the expectation is to double down on user testing: quite simply, if you can hand Element to a casual mainstream user and they can get the core jobs done (sign up, chat to someone, call someone, etc.) without tripping over, then mission successful :)

The [Element blog](https://element.io/blog/) covers the work this year from the Element side, but from the Matrix side, the key changes include:

* finalising [Spaces](https://element.io/blog/spaces-blast-out-of-beta/) as a way to group together rooms - providing the equivalent of Discord servers or Slack workspaces, or alternatively letting you gather your own rooms together into a private space.
* building out Threads (available in labs; launching soon!)
* Social Login!
* radically improving Element’s Information Architecture (i.e. the layout of the UI, so that the panels and buttons are correctly semantically grouped together in a visual hierarchy)
* adding [Voice Messages](https://element.io/blog/introducing-voice-messages-and-so-much-more/) as a really beautiful polished feature powered by [MSC3245](https://github.com/matrix-org/matrix-doc/pull/3245)
* adding Location Share (available in labs; launching soon!) powered by [MSC3488](https://github.com/matrix-org/matrix-doc/pull/3488) (and in future [MSC3489](https://github.com/matrix-org/matrix-doc/pull/3489) for live-location sharing - in dev on iOS right now!)
* adding [Chat Export](https://element.io/blog/element-1-9-1-export-is-finally-here/), thanks to the amazing GSOC work by Jaiwanth
* adding Polls via [MSC3381](https://github.com/matrix-org/matrix-doc/pull/3381).

![Spaces in all their glory](/blog/img/2021-12-22-spaces.gif)

From a spec perspective, it’s been particularly exciting to be finally using Extensible Events ([MSC1767](https://github.com/matrix-org/matrix-doc/pull/1767)) for many of these new features: voice messages, location sharing and polls are all experimenting with this new idiom for expressing richer structured data over Matrix while presenting a consistent and useful ‘fallback’ representation for clients which don’t know how to natively render the richer data.

We’ve also done a huge amount of work this year in improving 1:1 VoIP - both via [MSC2746](https://github.com/matrix-org/matrix-doc/pull/2746) and within the JS, iOS & Android Matrix SDKs. If you haven’t tried doing a 1:1 call via Matrix recently we’d highly recommend giving it a go - probably the main remaining bug at this point is that we need to find a better default ringtone for Element(!). Huge thanks go to Šimon Brandner both for his community contributions to VoIP and across all of Element Web - including proper screensharing for 1:1 (and group!) VoIP calls. This has also laid excellent groundwork for native Group VoIP/Video over Matrix - more on that later.

On Element Mobile, work on all the above features has been balanced by fighting against the various platform’s quirks, and lots of under-the-hood work improving performance. iOS has gone through a long journey to get back to stability after iOS’s push notification API changes, while also improving incremental sync performance by rearchitecting the local cache in the client.  Android meanwhile has been working away improving the app; reworking Notifications, migrating to Kotlin coroutines and Hilt, and closing over 690 GH issues.  Android has also had its fair [share of dramas](https://element.io/blog/element-on-google-play-store/), including some recent long Play Store review times, but we’ve come through the other side intact.

However, we’ve been thinking more and more about the nightmarish pain point that is the amount of time we spend implementing the same features across the three different platforms. This becomes particularly apparent for security-sensitive features such as end-to-end encryption, or major API changes such as aggregations, spaces or sync v3 (more on that later). Or simply rapidly sharing improvements to implementation best practices between platforms.

Historically we consciously built platform-native Matrix SDKs in order to provide entirely idiomatic SDKs for other Matrix developers to use - and also to better dogfood the protocol and ensure that the heterogenous implementations could interoperate successfully. However, in practice, relatively few third party projects other than Element build on top of matrix-ios-sdk and matrix-android-sdk2 - and meanwhile there are more than enough other Matrix clients out there nowadays to dogfood interoperability against (including alternative experimental clients from the core team such as Hydrogen).

So, we’ve been thinking increasingly seriously about how to solve this…

## A new hope: matrix-rust-sdk

[matrix-rust-sdk](https://github.com/matrix-org/matrix-rust-sdk) is an attempt to build a new reference client SDK for Matrix which can be used by as many platforms as possible - hopefully forever stopping us from reimplementing the wheel more than we need to. Work began towards the end of 2019, building on top of [Ruma](https://ruma.dev/)’s excellent Matrix rust crates, and poljar has been working away solidly at it ever since.  We teased matrix-rust-sdk in last year’s update, but as of this year it is properly coming of age and we’ve started using it in earnest - beginning by swapping out Element Android’s encryption implementation for matrix-rust-sdk-crypto (the E2EE cryptography crate provided by the SDK).

If you’re not familiar with Rust, the main benefits we get here are a heavy emphasis on safety and security without compromising performance; while providing a single codebase which can be used equally from iOS, native Desktop apps such as Fractal, Android (with native bindings) and even Web (via WASM, in future).  While technically this results in a “non-native” SDK relative to matrix-js-sdk, matrix-ios-sdk and matrix-android-sdk - in practice, it’s become so common to depend on native-code shared libraries (outside the web, at least) that it’s not really a problem.

Initial results look wildly promising here: “Element R” (formerly known as Corroded Element - the codename for the Rust-enhanced version of Element Android) builds are now out there, and out-perform the kotlin E2EE implementation by [roughly 10x](https://github.com/matrix-org/matrix-rust-sdk/pull/170), thanks to using native code and Rust’s improved parallelisation.

Our next step is to start using it on iOS, and we’ll be experimenting with a next-generation of Element iOS shortly in the new year with the SDK provided exclusively by matrix-rust-sdk.  Element will also be funding more people to work fulltime on matrix-rust-sdk itself, and to see what the developer experience is like when you use it seriously on the Web - watch this space!

## Bridges, Bots, Widgets and Integration Managers

Elsewhere in Matrix, the Bridge Crew has busy polishing bridges like crazy - working away on encrypted application services ([MSC3202](https://github.com/matrix-org/matrix-doc/pull/3202)), massively improving the IRC bridge (particularly in the fallout of the great Freenode->Libera migration), stabilising and extending [matrix-bifrost](https://github.com/matrix-org/matrix-bifrost) (our XMPP-and-more bridge), getting libpurple bridging working properly in bifrost, getting [matrix-appservice-slack](https://github.com/matrix-org/matrix-appservice-slack) and [matrix-appservice-discord](https://github.com/Half-Shot/matrix-appservice-discord) stable enough to be hosted by [EMS](https://element.io/blog/slack-bridging/), experimenting with [matrix-bot-sdk](https://github.com/turt2live/matrix-bot-sdk) as an alternative bridging API, and even looking at adding [matrix-rust-sdk-crypto](https://github.com/matrix-org/matrix-rust-sdk/tree/main/crates/matrix-sdk-crypto) into matrix-bot-sdk as an elegant way to power robust encrypted bridges (thus replacing Panatalaimon for that use case).

There’s also a new kid in town: [matrix-hookshot](https://github.com/Half-Shot/matrix-hookshot) (formerly known as matrix-github) is a new all-singing-all-dancing general purpose integration built on matrix-bot-sdk, coming soon to an integration manager near you, which can bridge through to GitHub, GitLab, JIRA and freeform webhooks! Check it out a few weeks ago on [Matrix Live](https://youtu.be/55P-NdDa-UI?t=1018). matrix-hookshot is primarily Node, but is also getting in on the Rust action with some functions being implemented in native code.

Meanwhile, change is afoot for integration managers, which have been screaming out for an overhaul for years. There was a cheeky hint in last week’s [Matrix Live](https://youtu.be/Hsyqa5ozWIo?t=724) where [Dimension](https://dimension.t2bot.io/) did an unexpected cameo looking particularly swish…  All shall be revealed next year!

![A whole new Dimension](/blog/img/2021-12-22-dimension.png)

## Dendrite, Low bandwidth Matrix and Peer-to-Peer Matrix

Dendrite is our next-generation homeserver implementation written in Go, and having shipped the first beta in Oct 2020, we’ve cut another 11 releases over the course of this year - adding in features such as E2EE key backups, cross-signing, support for room versions 7, 8 and 9 (knocking and restricted join rules), massive state resolution performance improvements, an entirely new state storage implementation that uses ~15x less disk space, sync filtering, experimental support for peeking-over-federation ([MSC2444](https://github.com/matrix-org/matrix-doc/pull/2444)) - not to mention huge numbers of bug fixes. Even more excitingly, we’re in the process of ditching Kafka in favour of native-Go message queuing in the form of [NATS](https://github.com/matrix-org/dendrite/compare/nats)!

However, it’s been a bit of a weird year as the team has been repeatedly pulled onto other projects due to competing priorities - and there’s still a bunch of stuff left which is keeping us in beta.  Some of this is plain old missing features (search, push rules/notifications, room upgrades, presence etc) - but we’ve also run up against some problems over the last few months while implementing new room versions and similar thanks to the sheer number of different microservices which Dendrite is made out of. In retrospect, it feels like Dendrite has ended up too granular, and when hacking on it you get slowed down badly by all the boilerplate required to glue the various services together.  Therefore, we’ve just started to [merge some of the services together](https://github.com/matrix-org/dendrite/pull/2055) - still preserving horizontal scaling of course, but refactoring the architecture a bit while we’re still in beta to help speed up development again. So far things are looking promising!  We’re also really looking forwards to [s7evinK](https://github.com/matrix-org/dendrite/pulls?q=+is%3Apr+author%3As7evinK) joining the team to work on Dendrite fulltime in the coming weeks :)

Talking of competing priorities, there have been three other big missions going on at the same time as Dendrite dev: firstly - formalising Low Bandwidth Matrix. LB Matrix is super important for maximising battery life on mobile, as well as (obviously) supporting worse network conditions - and it’s effectively a prerequisite for P2P Matrix.  We did a bunch of experiments around it back in [2019](https://matrix.org/blog/2019/03/12/breaking-the-100-bps-barrier-with-matrix-meshsim-coap-proxy), but earlier in the year we needed it [for real](https://twitter.com/element_hq/status/1418632867626770433) and [MSC3079](https://github.com/matrix-org/matrix-doc/pull/3079) was the result. The low bandwidth dialect which we’ve proposed in the MSC is designed for use on the real Internet using standard IETF protocols (CoAP + DTLS + CBOR) and so isn’t quite as exotic as the 2019 version, but still gives a ~10-20x bandwidth improvement over normal HTTP+JSON based Matrix.  It hasn’t made it to Element yet, but if you’re interested go [check out the blog post](https://matrix.org/blog/2021/06/10/low-bandwidth-matrix-an-implementation-guide)!

Secondly, we’ve been sidetracked by the entirety of P2P Matrix.  This is our long-term mission to let Matrix run peer-to-peer without the need for any servers (or indeed Internet connectivity, thanks to Bluetooth Low Energy) by embedding servers such as Dendrite into clients such as Element and so let each Matrix Client have its own personal local homeserver.  We’ve made massive progress over the course of the year on P2P - the biggest breakthroughs being [Pinecone](https://matrix.org/blog/2021/05/06/introducing-the-pinecone-overlay-network) as an entirely new P2P overlay network, with the novel SNEK (sequentially networked edwards key) routing topology.  (The animation below shows a P2P network arranging itself into a SNEK!)

![SNEK](/blog/img/2021-12-22-pinecone.gif)

You can read all about it in [the blog post](https://matrix.org/blog/2021/05/06/introducing-the-pinecone-overlay-network), but suffice it to say that Pinecone outperformed all the other P2P overlay networks in [meshnet-lab](https://github.com/mwarning/meshnet-lab)’s [Mobility2](https://github.com/mwarning/meshnet-lab/tree/master/tests/mobility2) test:

![Pinecone perf benchmarks](/blog/img/2021-12-22-pinecone-perf.png)

You can play with P2P Matrix today on iOS and Android (head over to [#p2p:matrix.org](https://matrix.to/#/#p2p:matrix.org) for builds), but there is some major work still to be done:

* We need to bridge to today’s Matrix network. Right now, having a weird experimental test network for P2P means that in practice nobody actually uses it other than for demos - whereas if you could actually talk to everything else in Matrix, it’d be way more compelling and interesting to use and dogfood.  We’re currently thinking about how best to do this!
* We need to standardise the actual transport to be used over Pinecone.  Currently it uses HTTPS over [μTP](https://en.wikipedia.org/wiki/Micro_Transport_Protocol) (purely because empirically it handled packet loss and congestion well, and LB Matrix wasn’t ready at the time).  We’re currently experimenting with switching to LB Matrix using our own CoAP implementation called PineCoAP (potentially using pCoCoA congestion control, given CoAP doesn’t provide any congestion control out of the box), but this is early days.
* We still need to finalise store-and-forward: if your destination is offline, do you buffer your transactions in the network somehow, or do you use another Matrix node to buffer them?
* Relatedly, we need to tweak federation so that if events get lost, federation for a room can recover more gracefully than it does today - for instance, by bundling redundant auth events on transactions, or by providing more recovery mechanisms.
* We still need to spec and implement multihomed accounts, so that your identity on your phone is not divorced from your identity on your laptop.
* …and obviously, we need a robust post-beta Dendrite to act as the local homeserver!

Right now focus is going back to Dendrite for a bit, but P2P work will resume again in the new year :)

Finally, the third big distraction from Dendrite has been… sync v3.

## Sync v3

Sync v3 is shaping up to be the single most significant improvement to Matrix since we began.

Syncing data from the homeserver to the client is obviously fundamental to Matrix - and the current behaviour (sync v2) is far from perfect, as it’s designed around the assumption that your client wants to receive information for every room that it’s in.  In the early days of Matrix, this was fine: a typical user might be in tens of conversations, and it’s useful to have them all available for offline access.  Nowadays, however, it’s a disaster: users can easily accumulate hundreds or thousands of rooms - especially with rooms used to describe spaces or profiles and other structured realtime data.  Moreover, the number of rooms you’re in typically increases linearly over time, unbounded, as nobody wants to archive their old conversations.

So, the idea of sync v3 is that you only sync the strict subset of data that your client actually cares about to display in its UI - effectively making both initial and incremental sync instant, incredibly low bandwidth, and completely independent of the number of rooms you’re in (just as filesystem performance should be independent of the number of directories or files present).

For instance, the full initial sync for @matthew:matrix.org in sync v2 is 417MB of JSON uncompressed - or ~100MB if gzipped, and takes about 5 minutes to calculate on matrix.org (during which it murders the sync worker responsible and hammers the database like crazy).  By contrast, sync v3’s initial sync is 15KB uncompressed, or 5106 bytes compressed - and synced in 250 microseconds from a local sync-v3 server.  **Yes folks, that’s somewhere between a 30,000x to 1,200,000x improvement over sync v2, depending on how you count it.**

Sync v3 gets this unbelievable performance by the client defining a sliding window into the server’s datasets, sized and ordered as needed for the client’s UI. This effectively performs real-time serverside pagination, so that as the client scrolls around or filters their roomlist or membership list, the client requests new views from the server.  Meanwhile the server sends incremental updates to the client if they intersect with the sliding window.  This may sound unwieldy, but in practice it works fine (although we’ll have some interesting challenges when we get around to encrypting state events, given serverside ordering and filtering will become distinctly harder).  It also doesn’t design out offline access, as the client caches its view of the world so even if you do go offline you can still work with all the data that has sent to your client so far (and the client could even proactively paginate in other content, if it wanted to, similar to an email client synchronising for offline access).

Sync v3 exists today as a proxy called [sync-v3](https://github.com/matrix-org/sync-v3) which sits between any existing homeserver and a sync-v3-capable Matrix client.  It’s very early days, but Hydrogen has [basic v3 support](https://github.com/vector-im/hydrogen-web/compare/kegan/syncv3) on a branch which we’ve been using to experiment with the API and flesh it out - and you can see a demo and intro talk in [last week’s Matrix Live](https://youtu.be/Hsyqa5ozWIo?t=59)!

{{ youtube_player(video_id="Hsyqa5ozWIo?t=59") }}

The API itself is still in flux, but those interested can see the initial spec design at [https://github.com/matrix-org/sync-v3/blob/main/api.md](https://github.com/matrix-org/sync-v3/blob/main/api.md) and also an MSC is emerging at [MSC3575](https://github.com/matrix-org/matrix-doc/blob/kegan/sync-v3/proposals/3575-sync.md).  Next steps will be to finish hooking up to Hydrogen (including filtering the room list), finish the MSC, and then start thinking about implementing it in other clients and servers!

## Fast Joins over Federation

While we’re on the subject of speeding up Matrix… it’s all very well being able to sync your client instantly, but the other big complaint everyone has about Matrix is how long it takes to join rooms - especially big ones.  As most people will know, it can easily take 5-10 minutes to join a large room like Matrix HQ on a new homeserver - and given this is the first experience most users have of running their own homeserver, it can prove pretty disastrous and we are determined to fix it.  It will become even more relevant when we implement peeking over federation, as the last thing you want is to have to wait 5 minutes to temporarily dip into some random federated room to see if you want to join it or not (or to sniff its room state for things like extensible profiles or [MSC2313](https://github.com/matrix-org/matrix-doc/pull/2313) reputation rooms).

So, to address this, we’re currently in the middle of experimenting with [MSC2775](https://github.com/matrix-org/matrix-doc/pull/2775) (Lazyloading over Federation) in Synapse. This MSC lets servers participate in a room before they’ve received the full room state by defining a subset of state which is mandatory for participation, and then letting the rest get added lazily.  It’s quite a violent change as it means the assumption that room state is complete (to the best of the server’s knowledge) is no longer true - but given Matrix already has to handle incomplete room state, it’s not necessarily a showstopper.

Watch this space for how well it works in practice, but we’re hoping for a ~20x speed improvement in joining Matrix HQ.

## Hydrogen

2021 has been a busy year for Hydrogen - our ultra-lightweight Matrix Client, which provides a small but perfectly formed progressive web app for us to experiment on! There have been no fewer than 56 releases over the course of the year, with loads of contributions from Bruno, Midhun (who joined first as a GSOCcer and then as a fulltime Element employee) and also Danila who interned at Element on Hydrogen over the summer.

People often ask why Hydrogen exists as well as Element Web - and the reason is because Element Web is (for now at least) very far from a progressive web app and is stuffed full of features, whereas Hydrogen is intended to be as lightweight and simple and efficient as possible while also targeting as wide a range of web browsers as possible (even Internet Explorer!).  It also provides a simpler platform for experimenting with new approaches such as sync v3 or OIDC without getting entangled in the constant hive of activity around Element Web.  Finally, it gives us a playground to experiment with embeddable chat clients thanks to Hydrogen’s strict [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) component model.

In terms of features, 2021 has seen huge steps forwards as Hydrogen converges on feature parity with Element - proper mentions and replies; rich formatted linkified messages; reactions; redactions; memberlist; member info; webpush notifications; proper image, video & file uploads; SSO login; sync v3(!) and so much more. Can’t wait to see what 2022 will bring!

## End-to-End Encryption

2021 saw the long-awaited creation of a dedicated cryptography team to focus exclusively on improving encryption in Matrix: previously encryption expertise was split across various different areas, meaning that it could prove hard to carve out time to tackle the bigger remaining encryption challenges.

So far the team has been busy digging deep into the few remaining causes of UISIs (undecryptable messages), including automated UISI reporting and tracing E2EE flows end-to-end (from client to server to server to client).  There’s also been an initial wave of UX work - with much more to come next year as we overhaul cross-signing and device backups to make it way more user friendly.

Meanwhile, on the more foundational side of things, we’re continuing to define Decentralised MLS as a potential next-generation form of end-to-end encryption, building on the IETF’s [MLS](https://datatracker.ietf.org/wg/mls/about/) work - providing much better scalability for large chat rooms and potentially helping with some causes of encryption failures.  Hubert (uhoreg) has been leading the charge here, with his [latest thoughts emerging here](https://gitlab.matrix.org/matrix-org/mls-ts/-/blob/decentralised2/decentralised.org) alongside a [brand new demo](https://www.youtube.com/watch?v=UiUyWZg3J7k) showing his [DMLS simulator](https://gitlab.matrix.org/uhoreg/mls-demo) - which under the hood is actually sending real Matrix events over DMLS!

![DMLS](/blog/img/2021-12-22-dmls.png)

Otherwise, the team has had three big projects: adding matrix-rust-sdk-crypto into Element Android (which we already covered above), arranging a fresh security audit of Matrix’s end-to-end encryption (due to complete January 2022)… and, most excitingly: vodozemac.

[Vodozemac](https://github.com/matrix-org/vodozemac) (pronounced roughly vod-oz-eh-matz) is an entirely new implementation of our Olm and Megolm end-to-end encryption system, written from scratch in pure Rust, aiming to replace the original reference C/C++11 implementation in [libolm](https://gitlab.matrix.org/matrix-org/olm).  Originally written as an [experiment for matrix-rust-sdk](https://github.com/matrix-org/matrix-rust-sdk/compare/vodozemac-bench) at the beginning of the year, in the last week it’s received a [huge explosion of attention](https://github.com/matrix-org/vodozemac/graphs/contributors) from poljar and dkasak to bring it up to production quality… for we decided that if we are doing a full E2EE audit for Matrix, we should target the new and future codebase rather than burn money on re-auditing the legacy libolm library (much as the [original 2016 review of libolm](https://matrix.org/blog/2016/11/21/matrixs-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last) happened when the library was fresh and new).

The motivation for vodozemac in general is to benefit from the intrinsic type and memory safety and fearless parallelism provided by Rust - and also maintain full type & memory safety throughout the matrix-rust-sdk stack, including encryption.  Over the last year we’ve been taking[more and more of a careful look at libolm](https://matrix.org/blog/2021/06/14/adventures-in-fuzzing-libolm), and despite our best efforts a [few](https://matrix.org/blog/2021/12/13/disclosure-buffer-overflow-in-libolm-and-matrix-js-sdk) memory management bugs have crept in - which vodozemac should be immune to.  Vodozemac will solve another embarrassing problem with libolm: that its default cryptography primitives are designed for correctness rather than performance or safety.  By switching to Rust’s ed25519-dalek and rustCrypto AES primitives we should be in a much better position in terms of performance and safety.

Next up, we’ll be fully integrating vodozemac into matrix-rust-sdk, and figuring out how best to provide it as a libolm replacement in general.

## Matrix Security

Alongside the new Cryptography team we’ve also established a new dedicated Security team for Matrix, led by dkasak.  As well as [fuzzing excursions](https://matrix.org/blog/2021/06/14/adventures-in-fuzzing-libolm) into libolm and similar research, Denis has been handling all our [security disclosure policy](https://matrix.org/security-disclosure-policy) submissions, managing the [Intigriti bug bounty](https://blog.intigriti.com/matrix/) programme, helping coordinate all our security releases, and coordinating the upcoming external independent security audit of vodozemac, matrix-rust-sdk, Element and Synapse.  It’s a huge step forwards to be able to fund full-time infosec researchers to focus exclusively on Matrix, and this is just the beginning!

## Trust and Safety

Another place where we’ve created a dedicated team this year is around Trust & Safety: building tools to fight spam and abuse on our own servers, while also empowering the wider network of users, moderators and admins to manage abuse as they see fit.  This includes lots of work on Mjolnir, our primary moderation bot, but also defining MSCs such as [MSC3215](https://github.com/matrix-org/matrix-doc/pull/3215) (Aristotle: Moderation in all things) and [MSC3531](https://github.com/matrix-org/matrix-doc/pull/3531) (Letting moderators hide messages pending moderation) and internal tooling as we experiment with different approaches.

We’ll have more updates on this in the coming year as we release the tools we’ve been working on, but suffice it to say that the goal is to empower mainstream users in the wider Matrix network to apply their own rules as they see fit, directly from the comfort of their favourite Matrix client - without having to know what a Mjolnir is (or how to run one), and without having to be a moderation expert.

## OpenID Connect

A new project brewing throughout 2021 has been the investigation into replacing the entirety of Matrix’s authentication APIs with industry standard OpenID Connect.  Spearheaded by Quentin, this has proved to be a fascinating and challenging endeavour, but we’re starting to see some really interesting results.  The problem we’re trying to solve here is:

* As Matrix grows, we’re seeing more and more clients and services appearing which you might want to log into with your Matrix account.  But do you really want to trust each app with your account password?  And what if you only want to give it access to a small subset of your account?
* Similarly, we’re seeing more and more login mechanisms used to access Matrix - it’s no longer just a matter just a username + password; many servers use single-sign-on (e.g. mozilla.org) or social login (fosdem.org, matrix.org), or layer on 2FA or MFA hardware tokens and similar to access their accounts via an SSO provider.  We also see passwordless login on the horizon.

So, do we really want to mandate each new Matrix client to have to implement custom flows to handle this explosion of login/registration mechanisms?  And is it even really the client’s problem in the first place?  You’re securing access to your account on your chosen server, which isn’t really a client-specific thing at all.

The real turning point for the project however has been our recent experiences building out a new wave of single-use domain-specific clients (see below) for video conferencing, whiteboarding, metaverse-browsing etc… where by *far* the most painful bit of the project has been hooking up the UI for login, registration, guest access, incremental signup, password reset, email verification, CAPTCHA, SSO, etc.  And that’s even when building on top of matrix-react-sdk, which theoretically has it all already thanks to Element Web!

Frankly, it has become blindingly obvious that it’s crazy for clients to reimplement this every time, and they should instead chuck the user over to a sign-on portal provided by their homeserver - just like Google and everyone else’s single-sign-on does.  And rather than inventing our own homebrew way of doing that, we should just use the existing industry standard SSO best practices defined by OpenID Connect.

The main objections which have come up against this are: “what if my Matrix client doesn’t have a web browser, or what if I want to provide my own native login UI”, and “does this design out the idea of using a single password to access your account as well as your E2EE history”?  In both instances, we have workarounds: in practice, there are so many Matrix clients around that we won’t be removing today’s legacy login/registration APIs any time soon (just like HTTP Basic Auth is still very much a thing on the web!).  And in terms of “cryptographic login”, there are ways we could daisychain the auth required to unlock your E2EE storage to also authenticate you with your server - although this would be a major extension (much as cryptographic login is already today!)

The current status is that we’ve defined a set of initial MSCs ([MSC2964](https://github.com/matrix-org/matrix-doc/pull/2964), [MSC2965](https://github.com/matrix-org/matrix-doc/pull/2965), [MSC2966](https://github.com/matrix-org/matrix-doc/pull/2966) and [MSC2967](https://github.com/matrix-org/matrix-doc/pull/2967)), and are implementing an initial Open ID Connect auth server (in Rust!) called [matrix-authentication-service](https://github.com/matrix-org/matrix-authentication-service) (better name suggestions welcome!) designed to sit alongside your homeserver, and we’re experimenting with hooking [Hydrogen](https://github.com/sandhose/hydrogen-web/tree/sandhose/oidc-login) (and some of the new domain-specific clients) up to see how it feels.  But if it goes as well as we think it might, folks should prepare for 2022 to be the year where Matrix’s authentication system finally gets fixed!

## Native Matrix Video/VoIP Conferencing

One of the most anticipated features in Matrix over the years has been the prospect of native, decentralised, end-to-end encrypted video and voice conferencing.  Today, voice and video conferencing in Matrix works by embedding Jitsi as a third party centralised service into your chatroom.  This works fairly well - but Jitsi is an entirely separate service with lots of moving parts, and its own concept of users and access control (provided by XMPP!) and its megolm-based end-to-end-encryption doesn’t actually integrate with Matrix’s own Olm identities, verification or cross-signing.  The fact that the conference is then logically centralised on whoever is hosting the Jitsi service also misses one Matrix’s main goals - that users should be able to hold a conversation without being dependent on any single service or provider.  Plus it’s really confusing that Matrix has proper native 1:1 calls for DMs… but then switches to a totally different system in group chats.

So, this year we set out to fix it - and succeeded :D  The solution hinges around [MSC3401](https://github.com/matrix-org/matrix-doc/blob/matthew/group-voip/proposals/3401-group-voip.md) - a spec proposal that describes how to extend native 1:1 calls to work for groups, while providing real flexibility on how to actually mix the calls together.  At the simplest extreme, it defines how full mesh calls work (where every client simply calls every other client simultaneously) - but then also defines how you can mix calls together either using a single focus (conferencing server) or multiple foci run by different parties, where foci can either be Selective Forwarding Units (SFUs, like Jitsi) or Multipoint Conferencing Units (MCUs, like FreeSWITCH).  The end result is to give us decentralised, cascading, end-to-end encrypted conferencing which even has direct compatibility with today’s 1:1 Matrix calling, letting you easily hook in bots and bridges which already support 1:1 Matrix calls!

Robert Long has been frantically hacking away at the [initial implementation](https://github.com/vector-im/matrix-video-chat) over the last few months, fleshing out full-mesh conferencing at first and getting it running in as many browsers as possible (including Mobile Safari and Chrome Android!).  We were hoping to fully unveil the end result in time for Christmas, but in practice we hit some last minute snags (turns out Matthew forgot guest users can’t use TURN, who knew? so much for incremental login! 😰) which have pushed the launch to early next year.  But hopefully in a few weeks, you’ll be able to start jumping on a native group call in Matrix!

Meanwhile, those interested can see all the gory details from our CommCon 2021 talk a few weeks ago, complete with a demo of the shape of things to come…

{{ youtube_player(video_id="A4k7DVIK5TE") }}

Next up, we’ll be working on building an [MSC3401](https://github.com/matrix-org/matrix-doc/pull/3401)-compatible SFU so we can go beyond full mesh (which typically supports a maximum of ~7 callers).  Our candidates right now are mediasoup, ion-sfu, janus and signal-calling-service - we’ll let you know how it goes!  Also, if you’re interested in helping us build this out quicker, we are frantically searching for more WebRTC & VoIP gurus to [join the team at Element](https://apply.workable.com/elementio/j/25BB112FBD/) working on this.

## Applications Beyond Chat

Finally, 2021 was the year where we seriously started building out functionality on Matrix which goes far beyond plain old chat rooms.

Work began in the summer as a research project led by Ryan, formerly tech lead for Element Web - looking at ways to store hierarchical structured data into Matrix while preserving real-time semantics; effectively using Matrix as a collaborative decentralised object tree, providing CRDT (Conflict-free Replicated Data Types) to allow richer applications to be built on Matrix.  This journey led him to create [Patience](https://github.com/matrix-org/patience) as a test environment for building out these sort of clients, and meanwhile Timo (famous of [The Board](https://github.com/toger5/TheBoard)) joined the team to build out [Full Screen Widgets](https://youtu.be/Hsyqa5ozWIo?t=1054) in Element, providing a much better UI for beyond-chat experiments.

Meanwhile, Matthew Weidner and the Composable Systems Lab at CMU stunned us all by presenting a complete CRDT solution using Matrix named [Collabs](https://github.com/composablesys/collabs) at [Strange Loop 2021](https://youtu.be/Exr0iY_D-vw?t=382).  This is *really* impressive stuff - the brave of heart can go and embed a Matrix-powered end-to-end-encrypted collaborative markdown editor straight into Element via Collabs by following the [instructions here](https://compoventuals-tests.herokuapp.com/).  In practice, Collabs works by serialising the CRDT updates as base64 blobs inside Matrix timeline events (hello [Wave](https://svn.apache.org/repos/asf/incubator/wave/whitepapers/federation/wavespec.html#anchor35), is that you?), but we’re now investigating how you might reconcile this with maintaining a proper realtime object tree in Matrix.

It’s hard to overstate how powerful storing freeform tree CRDTs in Matrix would be.  It could open up everything from decentralised encrypted collaborative document editing to collaborative whiteboarding and collaborative [Figma](https://figma.com/)-style (or [Penpot](https://penpot.app/)- or [Blender](https://www.blender.org/)-style) design.  You could even start storing an HTML DOM into a room, alongside its binary assets, giving you a multiplayer DOM to build on… and then imagine if you could store the [syntax tree](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format) of the code operating on that DOM alongside it, in the same room.  Before you know it, we will have created kind of some incredible [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) / [Croquet](https://en.wikipedia.org/wiki/Croquet_Project) / [Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay) nirvana where code is data and data is code and it’s all running live in some kind of decentralised encrypted multiplayer Metaverse :D

While we’ve been looking at storing object trees in Matrix, another obvious angle that has emerged is to use Matrix for encrypted decentralised file storage. [MSC3089](https://github.com/matrix-org/matrix-doc/pull/3089) is a proposal on how you might represent hierarchies of files in Matrix - where each room acts effectively as a directory of files, with spaces forming a directory structure (much as they do already in today’s Matrix), leveraging Matrix’s existing decentralised access control mechanisms to control who can access what.  Combine such a file storage system with the collaborative editing capabilities mentioned above, and suddenly a really exciting proposition starts to emerge.  We’re investigating this right now, and all will be revealed early next year…

Finally, and last but not least, Robert Long has been building on top of our shiny new Native Matrix Voice/Video Conferencing capabilities to use Matrix as the communication backbone for a truly open, equitable and interoperable vision of the Metaverse.  The best way of describing it is to look at his awesome [Third Room demo from the Open Metaverse Interoperability Group demo session](https://www.youtube.com/watch?v=e26UJRCGfGk&t=2263s) in September:

{{ youtube_player(video_id="e26UJRCGfGk?t=2263s") }}

Now, some folks will recall that since day one (in fact, since before day one) the hope for Matrix was that it might end up as the communications fabric of the Metaverse.  We were about 4 years early when we [first starting enthusing about this](https://matrix.org/blog/2017/04/04/opening-up-cyberspace-with-matrix-and-webvr), and then still ahead of our time when we did the world’s first [3D Video calling](https://matrix.org/blog/2018/02/05/3-d-video-calling-with-matrix-webrtc-and-webvr-at-fosdem-2018) over Matrix.  However, it now feels like the world has finally caught up - and we’re in grave danger of being overtaken by a dystopia where the big tech companies balkanize the Metaverse into a series of closed proprietary user-exploiting walled gardens, much like today’s incumbent chat silos - but even worse.

**This is our chance to fix it before it’s too late**, and [Element is funding a small but highly targeted team](https://element.io/careers) to focus exclusively on building out open interoperable Metaverse over Matrix - ensuring that collaboration in 3D (and 2D) spatial environments in future is decentralised, secure and standards-based.  This obviously ties in directly with the rest of the Beyond Chat projects listed above: it’s early days, but it’s incredibly exciting to imagine where we could end up if this works!

Finally, a question which has kept coming up while working on Beyond Chat projects has been whether to implement this new functionality as Matrix widgets, bake them into existing Matrix clients, or build them as domain-specific dedicated Matrix clients.  But perhaps we’re thinking about this all wrong: what if your Matrix client was just a browser for Matrix rooms?  Some of these could be chatrooms.  Some of these could be VoIP/Video conferences or Discord-style voice/video rooms.  Some of these could be message boards or mailing lists.  Some of these could be collaborative editors or whiteboards.  Some of these could be 3D views into the metaverse.  Some of these could be rendered via widgets; some could be rendered natively if the client knows how.  And some of these could even be good old web pages(!!!).

Imagine if your Matrix client was effectively a genuine browser of arbitrary decentralised realtime content?  If your view into a Matrix room was just that: a full window view into that room, be it textual or 2D or 3D - and your Matrix client was just a browser which added the necessary chrome and navigation to help you tab between rooms, login and logout, manage your encryption, track who’s in the room, track your notifications, etc.?

Meanwhile, if you’re in a web browser, you might hop into a lightweight single-page domain-specific webapp which happens to use Matrix for collaboration.  Or if you’re in a Matrix client/browser, you could hop to the same matrix URL to get at the same functionality with all the supporting chrome and UI overlays sliding in as needed…

Perhaps the vision of Matrix as the missing communication layer of the open Web is more literal than we ever thought.  Eitherway, it will be fascinating to see how Applications Beyond Chat evolves over the next year.

## 2022

Now, I dare you to cross-reference all of the above with [last year’s predictions for 2021](https://matrix.org/blog/2020/12/25/the-matrix-holiday-special-2020#2021) to see how we did :D In practice, the only things from the list we haven’t got to are peeking-over-federation (although arguably fast joins are a key part of that), account portability, and restoring incremental sign-up (although our new clients have it!).

So, here go the predictions for 2022 (keeping it short, otherwise it’ll be 2023 before this blog post gets finished…):

* **Client polish and performance** - our prime directive is to ensure that Matrix clients can be built with UX polish and quality which exceeds our centralised alternatives.  In practice, this means:
    * **Element must spark joy**.  Ensuring Element’s Information Architecture continues to be simplified and refined, and that *nobody* who knows how to use a computer hits a WTF moment when first using the app.  Never again do we want to see someone on Twitter saying “I have no idea how to use Matrix”.
    * **Instant launch**.  With Sync v3 and matrix-rust-sdk we hope to make Element launch instantly on all platforms - including initial sync.
    * **Fast joins**.  We should never get bored while waiting to join a room or accept an invite.
    * **Spaces**.  While Spaces are already a huge improvement in letting users organise and discover rooms, there’s still much more to be done:
        * **Flair** - Users who are members of a space should be able to announce it loud and proud with a Flair badge on their avatar, like we used to with the old pre-spaces Communities feature ([MSC3219](https://github.com/matrix-org/matrix-doc/pull/3219) being the potential proposal).
        * **Synchronising access controls** - You should be able to apply access controls based on whether a user is a member of a given group (so that if you invite them to #moderators:example.com, they automatically get made moderator in all the rooms in a given space).  It looks likely that this will be implemented at last using joepie91’s [MSC3216](https://github.com/matrix-org/matrix-doc/pull/3216) proposal for Synchronized access control for Spaces (rather than Matthew’s original [MSC2962](https://github.com/matrix-org/matrix-doc/pull/2962) - an excellent example of the community steering the spec process :)
        * **Bulk joins** - It should be a one-button operation to join all the rooms in a space.
        * **Subspaces**- as more and more spaces emerge, the ability to navigate them as a hierarchy becomes more and more useful.  We want to get to the point where we can turn off the Matrix.org public rooms list, and instead present a Space tree of all the good rooms we know about in Matrix… delegating over curation to the wider community; building a huge USENET-style hierarchy of where to go in Matrix.  To do that, we need subspaces to sing!
        * **Removing communities/groups**, which will then be entirely superseded by spaces.
    * **Threads**go-live!
    * **Location share** go-live
    * **Pinned messages**, so the most important messages are always visible to everyone n the room
    * **Starred messages**, so you never lose a message ever again
    * **Custom emoji**, finally merging in all the custom emoji work from the community.
* **matrix-rust-sdk**
    * **Element iOS on rust-sdk**
    * **Element Android on rust-sdk-crypto**
    * …and experiment to see how matrix-rust-sdk feels on Web? It’s a real shame that [Daydream](https://github.com/daydream-mx/Daydream) got archived…
* **Encryption**
    * **Vodozemac** in matrix-rust-sdk, maybe even elsewhere.
    * **Updated E2EE Audit**spanning vodozemac, olm+megolm, matrix-rust-sdk… and a representative sample of a typical Element+Synapse deployment.
    * **DMLS** - getting to the point where we can experiment with it in real clients.
    * **Encryption Agility** - the ability to [migrate encrypted history](https://github.com/matrix-org/matrix-doc/issues/3516) is going to become really important as we evolve our E2EE, whether that’s by adding in post-quantum algorithms, or moving from Megolm to MLS, or any other shifts.  We will need to start thinking about it in 2022.
* **Next-generation MSCs**
    * **Aggregations** - finalising the foundational MSCs for aggregations, at last
    * **Extensible events** - finalising the foundational MSCs for extensible events, at last
    * **Sync v3**- finalising the MSC and implementing it in matrix-rust-sdk
    * **Fast joins** - getting them implemented in Synapse and Dendrite
    * **Peeking over federation** - getting them implemented in Synapse and Dendrite
    * **Extensible profiles** - who needs a facebook wall when you have a profile room on Matrix?
    * **Open ID Connect** - using OIDC as an alternative auth mechanism for new clients.
* **Gitter parity**
    * **Importing the Gitter archives into Matrix** via [MSC2716](https://github.com/matrix-org/matrix-doc/pull/2716)
    * **Implementing excellent public static Matrix archives** (replacing both view.matrix.org and gitter.im’s static views)
    * **Transfiguring Gitter into a Gitter-themed Element**
* **Dendrite**
    * **Parity with Synapse**- and out of beta, with any luck!
* **P2P Matrix**
    * **Exposing the normal Matrix network via P2P!**
    * **Multihomed accounts**
    * **Store and forward** (if only by relaying via other P2P Matrix nodes)
    * **Low bandwidth transports**- via PineCoAP or similar
    * **Making federation robust in a highly disconnected network.**
* **Hydrogen**
    * **Daily Driver**- making sure that Hydrogen can be readily used as a daily driver Matrix client, even if it lacks full parity with Element.
    * **Embeddable Hydrogen**- making the most of Hydrogen as a tiny lightweight PWA to embed it into existing websites.
* **Bots and Bridges**
    * **Landing End-to-Bridge-Encryption**for all existing matrix-appservice-bridge based bridges
    * **All the integrations!**
    * **First-class UI for configuring integrations!**
* **Trust & Safety**
    * **Empower users to manage abuse within their communities**.
* **Native Group Voice/Video Conferencing**
    * **Launch a standalone conferencing app!**
    * **Build a [MSC3401](https://github.com/matrix-org/matrix-doc/pull/3401)-capable SFU**
    * **Add native group calling to Element**
* **Border gateways**
    * Something we didn’t mention in 2021 is the increasing interest in building border gateways and hardware cross domain gateways to safely link different Matrix federations together.  We expect to see a lot of activity in this space in 2022, and there should be some new MSCs too :)
* **Beyond Chat**
    * **Metaverse on Matrix**- building out the dream as per above!
    * **Collaborative editing**- extending Matrix to store trees of events, and collaborate on them in realtime - starting with a collaborative editor!
    * **File storage in Matrix** - building out real-life file storage on top of Matrix.

So, there you have it. If you’ve got this far… it’s incredible; you’re amazing: thank you for reading!  The sheer length of this update shows just how much Matrix has grown in 2021 relative to previous years; it’s frankly terrifying to imagine how long the equivalent post will be next year.  We may have to change the format a little :)

And that’s a wrap for 2021: we hope you stay safe and have an excellent end of the year.  Huge thanks for flying Matrix and supporting the project - we literally wouldn’t be here without you.

\- Matthew, Amandine & the whole Matrix core team.
