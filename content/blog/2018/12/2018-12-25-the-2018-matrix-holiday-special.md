+++
title = "The 2018 Matrix Holiday Special!"
path = "/blog/2018/12/25/the-2018-matrix-holiday-special"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

It's that time again where we break out the mince pies and brandy butter (at least for those of us in the UK) and look back on the year to see how far Matrix has come, as well as anticipate what 2019 may bring!

### Overview

It's fair to say that 2018 has been a pretty crazy year.  We have had one overriding goal: to take the <a href="/blog/2018/01/29/status-partners-up-with-new-vector-fueling-decentralised-comms-and-the-matrix-ecosystem/">funding</a> we received in January, stabilise and freeze the protocol and get it and the reference implementations out of beta and to a 1.0 - to provide a genuinely open and decentralised mainstream alternative to the likes of Slack, Discord, WhatsApp etc.  What's so crazy about that, you might ask?

Well, in parallel with this we've also seen adoption of Matrix accelerating ahead of our dev plan at an unprecedented speed: with France selecting Matrix to power the communication infrastructure of its whole public sector - first <a href="/blog/2018/04/26/matrix-and-riot-confirmed-as-the-basis-for-frances-secure-instant-messenger-app/">trialling over the summer</a>, and now <a href="https://twitter.com/matrixdotorg/status/1070392608801910784">confirmed for full roll-out</a> as of a few weeks ago.  Meanwhile there are several other similar-sized projects on the horizon which we can't talk about yet.  We've had the growing pains of establishing <a href="https://vector.im">New Vector</a> as a startup in order to hire the core team and support these projects.  We've launched <a href="https://modular.im">Modular</a> to provide professional-quality SaaS Matrix hosting for the wider community and help fund the team.  And most importantly, we've also been establishing the non-profit <a href="/blog/2018/10/29/introducing-the-matrix-org-foundation-part-1-of-2/">Matrix.org Foundation</a> to formalise the open governance of the Matrix protocol and protect and isolate it from any of the for-profit work.

However: things have just about come together.  Almost all the spec work for 1.0 is done and we are now aiming to get a 1.0 released in time by the end of January (in time for FOSDEM).  Meanwhile Synapse has improved massively in terms of performance and stability (not least having migrated over to <a href="/blog/2018/12/21/porting-synapse-to-python-3/">Python 3</a>); Riot's spectacular redesign is now <a href="https://medium.com/@RiotChat/redesign-experimenters-needed-afa7c2d4c858">available for testing</a> right now; E2E encryption is more stable than ever with the usability rework <a href="https://github.com/matrix-org/matrix-js-sdk/compare/develop...uhoreg:e2e_cross-signing">landing</a> as we speak.  And we've even got a full rewrite of Riot/Android in the wings.

But it's certainly been an interesting ride.  Longer-term spec work has been delayed by needing to apply band-aids to mitigate abuse of the outstanding issues.  Riot redesign was pushed back considerably due to prioritising Riot performance over UX. The E2E UX work has forced us to consider E2E holistically… which does not always interact well with structuring the dev work into bite-sized chunks.  Dendrite has generally been idling whilst we instead pour most of our effort into getting to 1.0 on Synapse (rather than diluting 1.0 work across both projects). These tradeoffs have been hard to make, but hopefully we have chosen the correct path in the end.

Overall, as we approach 1.0, the project is looking better than ever - hopefully everyone has seen both Riot and Synapse using less RAM and being more responsive and stable, E2E being more reliable, and anyone who has played with the <a href="https://riot.im/experimental">Riot redesign</a> beta should agree that it is light-years ahead of yesterday's Riot and something which can genuinely surpass today's centralised proprietary incumbents. And that is unbelievably exciting :D

We'd like to thank everyone for continuing to support Matrix - especially our <a href="http://patreon.com/matrixdotorg">Patreon</a> & <a href="http://liberapay.com/matrixdotorg">Liberapay</a> supporters, whose donations continue to be critical for helping fund the core dev team, and also those who are supporting the project indirectly by hosting homeservers with <a href="https://modular.im">Modular</a>.  We are going to do everything humanly possible to ship 1.0 over the coming weeks, and then the sky will be the limit!

Before going into what else 2019 will hold, however, let's take the opportunity to give a bit more detail on the various core team projects which landed in 2018…

## France

DINSIC (France's Ministry of Digital, IT & Comms) have been busy building out their massive cross-government Matrix deployment and custom Matrix client throughout most of the year.  After the <a href="/blog/2018/04/26/matrix-and-riot-confirmed-as-the-basis-for-frances-secure-instant-messenger-app/">announcement in April</a>, this started off with an initial deployment over the summer, and is now moving towards the full production rollout, as confirmed at the Paris Open Source Summit a few weeks ago by Mounir Mahjoubi, the Secretary of State of Digital.  All the press coverage about this ended up in French, with the biggest writeup being at <a href="https://www.cio-online.com/actualites/lire-mounir-mahjoubi%C2%A0-%C2%A0le-libre-n-est-pas-toujours-moins-cher-mais-c-est-toujours-plus-transparent%C2%A0-10842.html">CIO Online</a>, but the main mention of Matrix (badly translated from French) is:

<p style="padding-left: 30px;"><i>Denouncing the use of tools such as WhatsApp; a practice that has become commonplace within ministerial offices, Mounir Mahjoubi announced the launch in production of Tchap, based on Matrix and Riot: an instant messaging tool that will be provided throughout the administrations. So, certainly, developing a product can have a certain cost. Integrating it too. "Free is not always cheaper but it's always more transparent," admitted the Secretary of State.
</i></p>
The project really shows off Matrix at its best, with up to 60 different deployments spread over different ministries and departments; multiple clusters per Ministry; end-to-end encryption enabled by default (complete with e2e-aware antivirus scanning); multiple networks for different classes of traffic; and the hope of federating with the public Matrix network once the S2S API is finalised and suitable border gateways are available.  It's not really our project to talk about, but we'll try to share as much info as we can as roll-out continues.

## The Matrix Specification

A major theme throughout the year has been polishing the <a href="/docs/spec">Matrix Spec</a> itself for its first full stable release, having had more than enough time to see which bits work in practice now and which bits need rethinking.  This all kicked off with the <a href="/blog/2018/05/17/introducing-matrix-specification-changes/">creation of the Matrix Spec Change process</a> back in May, which provides a formal process for reviewing and accepting contributions from anyone into the spec.  Getting the balance right between agility and robustness has been quite tough here, especially pre-1.0 where we've needed to move rapidly to resolve the remaining long-lived sticking points.  However, a process like this risks encouraging the classic “<a href="https://en.wikipedia.org/wiki/Perfect_is_the_enemy_of_good">Perfect is the Enemy of Good</a>” problem, as all and sundry jump in to apply their particular brand of perfectionism to the spec (and/or the process around it) and risk smothering it to death with enthusiasm.  So we've ended up iterating a few times on the process and hopefully now converged on an approach which will work for 1.0 and beyond. If you haven't checked out the current <a href="/docs/spec/proposals">proposals guide</a> please give it a look, and feel free to marvel at all the MSCs in flight.  You can also see a <a href="/~richardv/proposal_news.html">quick and dirty timeline of all the MSC status changes</a> since we introduced the process, to get an idea of how it's all been progressing.

In August we had a big sprint to cut <a href="/blog/2018/09/03/matrix-spec-update-august-2018/">stable “r0” releases of all the APIs</a> of the spec which had not yet reached a stable release (i.e. all apart from the Client-Server API, which has been stable since Dec 2015 - hence in part the large number of usable independent Matrix clients relative to the other bits of the ecosystem).  In practice, we managed to release 3 out of the 4 remaining APIs - but needed more time to solve the remaining blocking issues with the Server-Server API. So since August (modulo operational and project distractions) we've been plugging away on the S2S API.  

The main blocking issue for a stable S2S API has been State Resolution. This is the fundamental algorithm used to determine the state of a given room whenever a race or partition happens between the servers participating in it.  For instance: if Alice kicks Bob on her server at the same time as Charlie ops Bob on his server, who should win? It's vital that all servers reach the same conclusion as to the state of the room, and we don't want servers to have to replicate a full copy of the room's history (which could be massive) to reach a consistent conclusion.  Matrix's original state resolution algorithm dates back to the initial usable S2S implementation at the beginning of 2015 - but over time deficiencies in the algorithm became increasingly apparent. The most obvious issue is the “<a href="https://github.com/matrix-org/synapse/issues/2432">Hotel California</a>” bug, where users can be spontaneously re-joined to a room they've previously left if the room's current state is merged with an older copy of the room on another server and the ‘wrong' version wins the conflict - a so-called state-reset.

After a lot of thought we ended up proposing an <a href="https://github.com/matrix-org/matrix-doc/blob/erikj/state_res_rejections/proposals/1442-state-resolution.md">all new State Resolution algorithm</a> in July 2018, nicknamed State Resolution Reloaded.  This extends the original algorithm to consider the ‘auth chain' of state events when performing state resolution (i.e. the sequence of events that a given state event cites as evidence of its validity) - as well as addressing a bunch of other issues.  For those wishing to understand in more detail, there's <a href="https://github.com/matrix-org/matrix-doc/blob/erikj/state_res_rejections/proposals/1442-state-resolution.md">the MSC</a> itself, the formal terse description of the algorithm now merged into the <a href="/docs/spec/server_server/unstable.html#state-resolution-algorithm-for-version-2-rooms">unstable S2S spec</a> - or alternatively there's an excellent <a href="https://matrix.uhoreg.ca/stateres/reloaded.html">step-by-step explanation and guided example</a> from uhoreg (warning: contains Haskell :)  Or you can watch Erik and Matthew try to explain it all on <a href="https://youtu.be/f6ZdmPSUUBA">Matrix Live</a> back in July.

Since the initial proposal in July, the algorithm has been proofed out in a <a href="https://github.com/matrix-org/matrix-test-state-resolution-ideas">test jig</a>, iterated on some more to better specify <a href="https://github.com/matrix-org/matrix-doc/pull/1693">how to handle rejected events</a>, <a href="https://github.com/matrix-org/synapse/pull/4040">implemented in Synapse</a>, and is now ready to roll.  The only catch is that to upgrade to it we've had to introduce the concept of <a href="https://github.com/matrix-org/matrix-doc/pull/1516/files">room versioning</a>, and to flush out historical issues we require you to <a href="https://github.com/matrix-org/matrix-doc/blob/rav/room_upgrades/proposals/1501-room-version-upgrades.md">re-create rooms to upgrade them</a> to the new resolution algorithm. Getting the logistics in place for this is a massive pain, but we've got an approach now which should be sufficient. Clients will be free to smooth over the transition in the UI as gracefully as possible (and in fact Riot has this already hooked up).  So: watch this space as v2 rooms with all-new state resolution in the coming weeks!

Otherwise, there are a bunch of other issues in the S2S API which we are still working through (e.g. <a href="https://github.com/matrix-org/matrix-doc/blob/erikj/event_id_hashes/proposals/1640-event-id-as-hashes.md">changing event IDs to be hashes</a> of event contents to avoid lying about IDs, <a href="https://github.com/matrix-org/matrix-doc/pull/1711">switching to use normal X.509 certificates for federation</a> and so resolve problems with Perspectives, etc).  

Once these land and are implemented in Synapse over the coming weeks, we will be able to finally declare a 1.0!

Also on the spec side of things, it's worth noting that a lot of effort went into improving performance for clients in the form of the <a href="https://github.com/matrix-org/matrix-doc/issues/1227">Lazy Loading Members MSC</a>.  This ended up consuming a lot of time over the summer as we updated Synapse and the various matrix-*-sdks (and thus Riot) to only calculate and send details to the clients about members who are currently talking in a room, whereas previously we sent the entire state of the room to the client (even including users who had left). The end result however is a 3-5x reduction in RAM on Riot, and a 3-5x speedup on initial sync.  The current MSC is currently being <a href="https://github.com/matrix-org/matrix-doc/pull/1758">merged as we speak</a> into the main spec (thanks Kitsune!) for inclusion in upcoming CS API 0.5.

## The Matrix.org Foundation (CIC!)

Alongside getting the open spec process up and running, we've been establishing The Matrix.org Foundation as an independent non-profit legal entity responsible for neutrally safeguarding the Matrix spec and evolution of the protocol.  This kicked off in June with the “<a href="/blog/2018/06/20/towards-open-governance-for-matrix-org/">Towards Open Governance</a>” blog post, and continued with the <a href="/blog/2018/10/29/introducing-the-matrix-org-foundation-part-1-of-2/">formal incorporation</a> of The Matrix.org Foundation in October.  Since then, we've spent a lot of time with the non-profit lawyers evolving <a href="https://github.com/matrix-org/matrix-doc/issues/1318">MSC1318</a> into the final Articles of Association (and other guidelines) for the Foundation.  This work is basically solved now; it just needs MSC1318 to be updated with the conclusions (which we're running late on, but is top of Matthew's MSC todo list).

In other news, we have confirmation that the <a href="https://en.wikipedia.org/wiki/Community_interest_company">Community Interest Company</a> (CIC) status for The Matrix.org Foundation has been approved - this means that the CIC Regulator has independently reviewed the initial Articles of Association and approved that they indeed lock the mission of the Foundation to be non-profit and to act solely for the good of the wider online community.  In practice, this means that the Foundation will be formally renamed The Matrix.org Foundation C.I.C, and provides a useful independent safeguard to ensure the Foundation remains on track.

The remaining work on the Foundation is:

<ul>
  <li style="font-weight: 400;">Update and land MSC1318, particularly on clarifying the relationship between the legal Guardians (Directors) of the Foundation and the technical members of the core spec team, and how funds of the Foundation will be handled.
</li>
  <li style="font-weight: 400;">Update the Articles of Association of the Foundation based on the end result of MSC1318
</li>
  <li style="font-weight: 400;">Transfer any Matrix.org assets over from New Vector to the Foundation.  Given Matrix's code is all open source, there isn't much in the way of assets - we're basically talking about the matrix.org domain and website itself.
</li>
  <li style="font-weight: 400;">Introduce the final Guardians for the Foundation.
</li>
</ul>
We'll keep you posted with progress as this lands over the coming months.

## Riot

2018 has been a bit of a chrysalis year for Riot: the vast majority of work has been going into the <a href="https://medium.com/@RiotChat/a-sneak-peek-at-a-whole-new-riot-im-1114df653782">massive redesign</a> we started in May to improve usability & cosmetics, performance, stability, and E2E encryption usability improvements.  We've consciously spent most of the year feature frozen in order to polish what we already have, as we've certainly been guilty in the past of landing way too many features without necessarily applying the needed amount of UX polish.

However, as of today, we're super-excited to announce that Riot's redesign is at the point where the intrepid can start experimenting with it - in fact, internally most of the team has switched over to dogfooding (testing) the redesign as of a week or so ago.  Just shut down your current copy of Riot/Web or Desktop and go to <a href="https://riot.im/experimental">https://riot.im/experimental</a> instead if you want to experiment (we don't recommend running both at the same time).  Please note that it is still work-in-progress and there's a lot of polish still to land and some cosmetic bugs still hanging around, but it's definitely at the point of feeling better than the old app.  Most importantly, please provide feedback (by hitting the lifesaver-ring button at the bottom left) to let us know how you get on. See the <a href="https://medium.com/@RiotChat/redesign-experimenters-needed-afa7c2d4c858">Riot blog</a> for more details!

<a href="/blog/wp-content/uploads/2018/12/Screenshot-2018-12-25-at-04.00.44.png"><img class="aligncenter size-large wp-image-3854" src="/blog/wp-content/uploads/2018/12/Screenshot-2018-12-25-at-04.00.44-1024x578.png" alt="" width="1024" height="578" /></a>

Meanwhile, on the performance and stability side of things - Lazy Loading (see above) made a <a href="https://medium.com/@RiotChat/riot-im-web-0-17-and-ios-0-7-6-smaller-footprint-faster-launch-5ddd18a65abb">massive difference</a> to performance on all platforms; shrinking RAM usage by 3-5x and similarly speeding up launch and initial sync times.  Ironically, this ended up pushing back the redesign work, but hopefully the performance improvements will have been noticeable in the interim.  We also <a href="https://github.com/vector-im/riot-web/issues/6477">switched</a> the entire rich text composer from using Facebook's <a href="https://draftjs.org/">Draft.js</a> library to instead use <a href="https://www.slatejs.org">Slate.js</a> (which has generally been a massive improvement for stability and maintainability, although took *<a href="https://github.com/matrix-org/matrix-react-sdk/pull/1890">ages</a>* to land - huge thanks to t3chguy for getting it over the line). Meanwhile Travis has been blitzing through a massive list of key “<a href="https://github.com/vector-im/riot-web/projects/12">First Impression</a>” bugs to ensure that as many of Riot's most glaring usability gotchas are solved.

We also welcomed ever-popular <a href="https://medium.com/@RiotChat/stickers-are-here-introducing-riot-im-0-15-for-web-desktop-284c32b93acc">Stickers</a> to the fold - the first instance of per-account rather than per-room widgets, which ended up requiring a lot of new infrastructure in both Riot and the underlying integration manager responsible for hosting the widgets.  But judging by how popular they are, the effort seems to be worth it - and paves the way for much more exciting interactive widgets and integrations in future!

An unexpectedly large detour/distraction came in the form of GDPR back in May - we spent a month or so running around ensuring that both Riot and Matrix are GDPR compliant (including the necessary legal legwork to establish how GDPR even applies to a decentralised technology like Matrix).  If you missed all that fun, you can <a href="/blog/2018/05/08/gdpr-compliance-in-matrix/">read about it here</a>.  Hopefully we won't have to do anything like that again any time soon...

And finally: on the mobile side, much of the team has been distracted helping out France with their Matrix deployment.  However, we've been plugging away on Riot/Mobile, keeping pace with the development on Riot/Web - but most excitingly, we've also found time to experiment with a <a href="https://github.com/vector-im/riot-android-redesign-PoC/tree/develop">complete rewrite of Riot/Android</a> in Kotlin, using Realm and Rx (currently nicknamed Riot X).  The rewrite was originally intended as a test-jig for experimenting with the redesign on mobile, but it's increasingly becoming a fully fledged Matrix client… which launches and syncs over 5x faster than today's Riot/Android.  If you're particularly intrepid you should be able to run the app by checking out the project in Android Studio and hitting ‘run'. We expect the rewrite to land properly in the coming months - watch this space for progress!

## E2E Encryption

One of the biggest projects this year has been to get E2E encryption out of beta and <a href="https://github.com/vector-im/riot-web/issues/6779">turned on by default</a>.  Now, whilst the encryption itself in Matrix has been <a href="/blog/2016/11/21/matrixs-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last/">cryptographically robust</a> since 2016 - its usability has been minimal at best, and we'd been running around polishing the underlying implementation rather than addressing the UX.  However, this year that changed, as we opened a war on about 6 concurrent battlefronts to address the remaining issues. These are:

<ul>
  <li style="font-weight: 400;">Holistic UX.  Designing a coherent, design-led UX across all of the encryption and key-management functionality.  Nad (who joined Matrix as a fulltime Lead UI/UX designer in August) has been leading the charge on this - you can see a <a href="/blog/2018/11/02/user-experience-preview-end-to-end-encryption-by-default/">preview of the end result</a><span style="font-weight: 400;"> here.  Meanwhile, Dave and Ryan are working through implementing it as we speak.
</span>
</li>
  <li style="font-weight: 400;">Decryption failures (UISIs).  Whenever something goes wrong with E2E encryption, the symptoms are generally the same: you find yourself unable to decrypt other people's messages.  We've been plugging away chasing these down - for instance, <a href="https://github.com/matrix-org/matrix-js-sdk/pull/597">switching from localStorage to IndexedDB</a> in Riot/Web for storing encryption state (to make it harder for multiple tabs to collide and corrupt your encryption state); providing mechanisms to <a href="https://github.com/matrix-org/matrix-js-sdk/pull/780">unwedge Olm sessions</a><span style="font-weight: 400;"> which have got corrupted (e.g. by restoring from backup); and many others.  We also added full telemetry to track the number of UISIs people are seeing in practice - and the good news is that over the course of the year their occurrence has been steadily reducing.  The bad news is that there are still some edge cases left: so please, whenever you fail to decrypt a message, please make sure you submit a bug report and debug logs from *both* the sender and receiving device.  The end is definitely in sight on these, however, and good news is other battlefronts will also help mitigate UISIs.
</span>
</li>
  <li style="font-weight: 400;">Incremental Key Backup.  Previously, if you only used one device (e.g. your phone) and you lost that phone, you would lose all your E2E history unless you were in the habit of explicitly manually backing up your keys.  Nowadays, we have the ability to optionally let users encrypt their keys with a passphrase (or recovery key) and <a href="https://github.com/matrix-org/matrix-doc/pull/1703">constantly upload them to the server</a> for safe keeping.  This was a significant chunk of work, but has actually <a href="https://github.com/matrix-org/matrix-react-sdk/pull/2169">landed already</a><span style="font-weight: 400;"> in Riot/Web and Riot/iOS, but is hidden behind a “Labs” feature flag in Settings whilst we test it and sort out the final UX.
</span>
</li>
  <li style="font-weight: 400;">Cross-signing Keys. Previously, the only way to check whether you were talking to a legitimate user or an imposter was to independently compare the fingerprints of the keys of the device they claim to be using.  In the near future, we will let users prove that they own their devices by <a href="https://github.com/matrix-org/matrix-doc/pull/1756">signing them with a per-user identity key</a>, so you only have to do this check once. We've actually <a href="https://github.com/matrix-org/matrix-js-sdk/pull/795">already implemented</a> one iteration of cross-signing, but this <a href="https://github.com/matrix-org/matrix-doc/issues/1680">allowed arbitrary devices for a given user to attest each other</a><span style="font-weight: 400;"> (which creates a directed graph of attestations, and associated problems with revocations), hence switching to a simpler approach.
</span>
</li>
  <li style="font-weight: 400;">Improved Verification. Verifying keys by manually comparing elliptic key fingerprints is incredibly cumbersome and tedious.  Instead, we have proposals for using <a href="https://github.com/matrix-org/matrix-doc/issues/1267">Short Authentication String</a> comparisons and <a href="https://github.com/matrix-org/matrix-doc/issues/1543">QR-code scanning</a><span style="font-weight: 400;"><span style="font-weight: 400;"> to simplify the process.  uhoreg is currently implementing these as we speak :)
</span>
</span>
</li>
  <li style="font-weight: 400;">Search.  Solving encrypted search is Hard, but t3chguy did a lot of work earlier in the year to build out <a href="https://github.com/matrix-org/matrix-search">matrix-search</a>: essentially a js-sdk bot which you can host, hand your keys to, and will archive your history using a golang full-text search engine (bleve) and expose a search interface that replaces Synapse's default one.  Of all the battlefronts this one is progressing the least right now, but the hope is to integrate it into Riot/Desktop or other clients so that folks who want to index all their conversations have the means to do so.  On the plus side, all the necessary building blocks are available thanks to t3chguy's hacking.
</li>
</ul>
So, TL;DR: E2E is hard, but the end is in sight thanks to a lot of blood, sweat and tears.  It's possible that we may have opened up too many battlefronts in finishing it off rather than landing stuff gradually.  But it should be transformative when it all lands - and we'll finally be able to turn it on by default for private conversations.  Again, we're aiming to pull this together by the end of January.

Separately, we've been keeping a close eye on <a href="https://datatracker.ietf.org/wg/mls/about/">MLS</a> - the IETF's activity around standardising scalable group E2E encryption.  MLS has a lot of potential and could provide algorithmic improvements over Olm & Megolm (whist paving the way for interop with other MLS-encrypted comms systems).  But it's also quite complicated, and is at risk of designing out support of decentralised environments. For now, we're obviously focusing on ensuring that Matrix is rock solid with Olm & Megolm, but once we hit that 1.0 we'll certainly be experimenting a bit with MLS too.

## Homeservers

The story of the Synapse team in 2018 has been one of alternating between solving scaling and performance issues to support the ever-growing network (especially the massive matrix.org server)... and dealing with S2S API issues; both in terms of fixing the design of State Resolution, Room Versioning etc (see the Spec section above) and doing stop-gap fixes to the current implementation.

Focusing on the performance side of things, the main wins have been:

<ul>
  <li style="font-weight: 400;"><span style="font-weight: 400;">Splitting yet more functionality out into worker processes which can scale independently of the master Synapse process.
</span>
</li>
  <li style="font-weight: 400;"><span style="font-weight: 400;"><span style="font-weight: 400;">Yet more profiling and optimisation (particularly caching).  Between this and the worker split-out we were able to resolve the performance ceiling that we hit over the summer, and as of right now matrix.org feels relatively snappy.
</span>
</span>
</li>
  <li style="font-weight: 400;"><span style="font-weight: 400;">Lazy Loading Members.
</span>
</li>
  <li style="font-weight: 400;"><a href="/blog/2018/12/21/porting-synapse-to-python-3/">Python 3</a>.  As everyone should have seen by now, Synapse is now Python 3 by default as of 0.34, which provides significant RAM and CPU improvements across the board as well as a path forwards given Python 2's planned demise at the end of 2019.  If you're not running your Synapse on Python 3 today, you are officially doing it wrong.
</li>
</ul>
There are also some major improvements which haven't fully landed yet:
<span style="font-weight: 400;">
</span>

<ul>
  <li style="font-weight: 400;">State compression.  We have a new algorithm for storing room state which is ~10x more efficient than the current one.  We'll be migrating to it in by default in future. If you're feeling particularly intrepid you can actually <a href="https://github.com/matrix-org/rust-synapse-compress-state">manually use it today</a><span style="font-weight: 400;"> (but we don't recommend it yet).
</span>
</li>
  <li style="font-weight: 400;">Incremental state resolution.  Before we got sucked into redesigning state resolution in general, Erik came up with a <a href="/_matrix/media/v1/download/jki.re/ubNfLtrmXZMmlGjJZYPnlHHy">proof that it's possible to memoize state resolution</a><span style="font-weight: 400;"> and incrementally calculate it whenever state is resolved in a room rather than recalculate it from scratch each time (as is the current implementation).  This would be a significant performance improvement, given non-incremental state res can consume a lot of CPU (making everything slow down when there are lots of room extremities to resolve), and can consume a lot of RAM and has been one of the reasons that synapse's RAM usage can sometimes spike badly. The good news is that the new state res algorithm was designed to also work in this manner.  The bad news is that we haven't yet got back to implementing it yet, given the new algorithm is only just being rolled out now.
</span>
</li>
  <li style="font-weight: 400;"><a href="https://github.com/matrix-org/matrix-doc/issues/1229">Chunks</a>.  Currently, Synapse models all events in a room as being part of a single DAG, which can be problematic if you can see lots of disconnected sections of the DAG (e.g. due to intermittent connectivity somewhere in the network), as Synapse will frantically try to resolve all these disconnected sections of DAG together.  Instead, a better solution is to explicitly model these sections of DAG as separate entities called Chunks, and not try to resolve state between disconnected Chunks but instead consider them independent fragments of the room - and thus simplify state resolution calculations significantly. It also fixes an S2S API design flaw where previously we trusted the server to state the ordering (depth) of events they provided; with chunks, the receiving server can keep track of that itself by tracking a DAG of chunks (as well as the normal event DAG within the chunks).  Now, most of the work for this happened already, but is <a href="https://github.com/matrix-org/synapse/issues/3785">currently parked</a> until new state res has landed.
</li>
</ul>
Meanwhile, over on Dendrite, we made the conscious decision to get 1.0 out the door on Synapse first rather than trying to implement and iterate on the stuff needed for 1.0 on both Synapse & Dendrite simultaneously.  However, Dendrite has been ticking along thanks to work from Brendan, Anoa and APWhitehat - and the plan is to use it for more niche homeserver work at first; e.g. constrained resource devices (Dendrite uses 5-10x less RAM than Synapse on Py3), clientside homeservers, experimental routing deployments, etc.  In the longer term we expect it to grow into a fully fledged HS though!

## Bridging

2018 was a bit of a renaissance for Bridging, largely thanks to Half-Shot coming on board in the Summer to work on IRC bridging and finally get to the bottom of the stability issues which plagued Freenode for the previous, uh, few years.  Meanwhile the Slack bridge got its first ever release - and more recently there's some Really Exciting Stuff happening with <a href="https://github.com/matrix-org/matrix-appservice-purple">matrix-appservice-purple</a>; a properly usable bridge through to any protocol that libpurple can speak… and as of a few days ago also supports *native* XMPP bridging via XMPP.js.  There'll probably be a dedicated blogpost about all of this in the new year, especially when we deploy it all on Matrix.org. Until then, the best bet is to learn more is to watch <a href="https://youtu.be/B0faoVdw0ak">last week's Matrix Live</a> and hear it all first hand.

## Modular

One of the biggest newcomers of 2018 was the launch of <a href="https://modular.im">Modular.im</a> in October - the world's first commercial Matrix hosting service.  Whilst (like Riot), Modular isn't strictly-speaking a Matrix.org project - it feels appropriate to mention it here, not least because it's helping directly fund the core Matrix dev team.

So far Modular has seen a lot of interest from folks who want to spin up a super-speedy dedicated homeserver run by us rather than having to spend the time to build one themselves - or folks who have yet to migrate from IRC and want a better-than-IRC experience which still bridges well.  One of the nice bits is that the servers are still decentralised and completely operationally independent of one another, and there have been a bunch of really nice refinements since launch, including the ability to point your own DNS at the server; matrix-&gt;matrix migration tools; with custom branding and other goodness coming soon.  If you want one-click Matrix hosting, please give Modular a go :)

Right now we're promoting Modular mainly to existing Matrix users, but once the Riot redesign is finished you should expect to see some very familiar names popping up on the platform :D

## TWIM

Unless you were living under a rock, you'll hopefully have also realised that 2018 was the year that brought us <a href="/blog/category/general/this-week-in-matrix/">This Week In Matrix</a> (TWIM) - our very own blog tracking all the action across the whole Matrix community on a weekly basis.  Thank you to everyone who contributes updates, and to Ben for editing it each week. Go flip through the archives to find out what's been going on in the wider community over the course of the year!  (This blog post is already way too long without trying to cover the rest of the ecosystem too :)

## Shapes of Things to Come

Finally, a little Easter egg (it is Christmas, after all) for anyone crazy enough to have read this far: The eagle-eyed amongst you might have noticed that one of our accepted talks for FOSDEM 2019 is “<a href="https://fosdem.org/2019/schedule/event/matrix/">Breaking the 100bps barrier with Matrix</a>” in the Real Time Communications devroom.  We don't want to spoil the full surprise, but here's a quick preview of some of the more exotic <a href="https://en.wikipedia.org/wiki/Skunkworks_project">skunkworks</a> we've been doing on low-bandwidth routing and transports recently.  Right now it shamelessly assumes that you're running within a trusted network, but once we solve that it will of course be be proposed as an MSC for Matrix proper.  A full write-up and code will follow, but for now, here's a mysterious video…

<div>{{ youtube_player(video_id="vimXuCTxV6k") }}

(If you're interested in running Matrix over low-bandwidth networks, please <a href="https://matrix.to/#/@matthew:matrix.org">get in touch</a> - we'd love to hear from you...)

## 2019

So, what will 2019 bring?

In the short term, as should be obvious from the above, our focus is on:

<ul>
  <li style="font-weight: 400;">r0 spec releases across the board (aka Matrix 1.0)
</li>
  <li style="font-weight: 400;">Implementing them in Synapse
</li>
  <li style="font-weight: 400;">Landing the Riot redesign
</li>
  <li style="font-weight: 400;">Landing all the new E2E encryption UX and features
</li>
  <li style="font-weight: 400;">Finalising the Matrix.org Foundation
</li>
</ul>
However, beyond that, there's a lot of possible options on the table in the medium term:

<ul>
  <li style="font-weight: 400;">Reworking and improving Communities/Groups.
</li>
  <li style="font-weight: 400;">Reactions.
</li>
  <li style="font-weight: 400;">E2E-encrypted Search
</li>
  <li style="font-weight: 400;">Filtering. (empowering users to filter out rooms & content they're not interested in).
</li>
  <li style="font-weight: 400;">Extensible events.
</li>
  <li style="font-weight: 400;">Editable messages.
</li>
  <li style="font-weight: 400;">Extensible Profiles (we've actually been experimenting with this already).
</li>
  <li style="font-weight: 400;">Threading.
</li>
  <li style="font-weight: 400;">Landing the Riot/Android rewrite
</li>
  <li style="font-weight: 400;">Scaling synapse via sharding the master process
</li>
  <li style="font-weight: 400;">Bridge UI for discovery of users/rooms and bridge status
</li>
  <li style="font-weight: 400;">Considering whether to do a similar overhaul of Riot/iOS
</li>
  <li style="font-weight: 400;">Bandwidth-efficient transports
</li>
  <li style="font-weight: 400;">Bandwidth-efficient routing
</li>
  <li style="font-weight: 400;">Getting Dendrite to production.
</li>
  <li style="font-weight: 400;">Inline widgets (polls etc)
</li>
</ul>
<ul>
  <li style="font-weight: 400;">Improving VoIP over Matrix.
</li>
</ul>
<ul>
  <li style="font-weight: 400;">Adding more bridges, and improving the current ones..
</li>
  <li style="font-weight: 400;">Account portability
</li>
  <li style="font-weight: 400;">Replacing MXIDs with public keys
</li>
</ul>
In the longer term, options include:

<ul>
  <li style="font-weight: 400;">Shared-code cross-platform client SDKs (e.g. sharing a native core library between matrix-{'{'}js,ios,android{'}'}-sdk)
</li>
  <li style="font-weight: 400;">Matrix daemons (e.g. running an always-on client as a background process in your OS which apps can connect to via a lightweight CS API)
</li>
  <li style="font-weight: 400;">Push notifications via Matrix (using a daemon-style architecture)
</li>
  <li style="font-weight: 400;">Clientside homeservers (i.e. p2p matrix) - e.g. compiling Dendrite to WASM and running it in a service worker.
</li>
  <li style="font-weight: 400;">Experimenting with MLS for E2E Encryption
</li>
  <li style="font-weight: 400;">Storing and querying more generic data structures in Matrix (e.g. object trees; scene graphs)
</li>
  <li style="font-weight: 400;">Alternate use cases for VR, IoT, etc.
</li>
</ul>
Obviously we're not remotely going to do all of that in 2019, but this serves to give a taste of the possibilities on the menu post-1.0; we'll endeavour to publish a more solid roadmap when we get to that point.

And on that note, it's time to call this blogpost to a close. Thanks to anyone who read this far, and thank you, as always, for flying Matrix and continuing to support the project.  The next few months should be particularly fun; all the preparation of 2018 will finally pay off :)

Happy holidays,

Matthew, Amandine & the whole Matrix.org team.
