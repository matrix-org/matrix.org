+++
title = "The Matrix Spring Special!"
path = "/blog/2016/03/26/the-matrix-spring-special"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "GSOC"]
+++

It's been 3 months since the <a href="/blog/2015/12/25/the-matrix-holiday-special/">Matrix Holiday Special</a> and once again we've all been too busy writing code to put anything that detailed on the blog.  So without further a do here's a quick overview of how things have progressed so far in 2016!

### Home servers

<br/>

#### Synapse

Work on <a href="http://github.com/matrix-org/synapse">Synapse</a> (our reference homeserver) has been primarily focused on improving performance.  This may sound boring, but there's been a huge amount of improvement here since synapse 0.12 was released on Jan 4. Synapse 0.13 on Feb 10 brought huge CPU savings thanks to a whole fleet of caching and other optimisation work - the best way of seeing the difference here is to look at the load graph of the server that hosts matrix.org's synapse+postgres over the last few months:

<img src="/blog/wp-content/uploads/2016/03/matrix-org-load.png" alt="matrix-org-load" width="497" height="173" class="aligncenter size-full wp-image-1563" />

Ignoring the unrelated blip during March, you can see an enormous step change in system load (which had a matching decrease in actual CPU usage) at the beginning of Feb when the 0.13 optimisations landed on matrix.org :)

Meanwhile, Synapse 0.14 is due any day now with <a href="https://github.com/matrix-org/synapse/releases/tag/v0.14.0-rc2">0.14.0-rc2</a> released on Wednesday.  Here, the focus has been all about memory optimisation - anyone who's run a Synapse seriously will be aware that it can be a memory hog thanks to aggressively caching as much state and history in RAM as possible to avoid hitting the database and keeping everything responsive.  0.14 should improve memory usage just as dramatically as 0.13 improved CPU utilisation - introducing a quick-and-dirty SYNAPSE_CACHE_FACTOR environment variable that lets admins dial down the aggressiveness of the caching (at the expense of performance), but more interestingly implementing string interning and ensuring that events are cached by ID rather than duplicated across multiple caches in order to make memory usage more efficient.  It's too early to have impressive looking graphs, and there are still a few memory spikes being tracked down before we release 0.14, but we're hoping for at least a 50% reduction in memory footprint.

Featurewise the highlights include: server-generated unread notification & highlight counts and push badge support, lots of support and refinements for guest access and 3rd party ID invites.  Meanwhile we've finally fixed some of the most embarrassing long-standing missing features such as letting folks logout serverside(!), delete aliases and determine whether rooms should be published in the room directory or not.

Finally, Synapse is now part of <a href="http://www.freshports.org/net/py-matrix-synapse/">FreeBSD Ports</a> thanks to Brendan Molloy, and <a href="https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/services/misc/matrix-synapse.nix">NixOS</a> thanks to Robin Lambertz!  Huge thanks to them for contributing the packages to the respective OSes and to all the other synapse package maintainers out there!

It's incredibly exciting to see Synapse's maturity improving and hitting the optimisation stage of its life; huge kudos to Erik for spearheading the optimisation work.  We strongly recommend folks upgrade to 0.14 when it's available; it's never been a better time to run a homeserver! :D

<br/>

#### Dendron

Meanwhile, <a href="https://github.com/matrix-org/dendron">Dendron</a> (our next generation homeserver) development has been progressing interestingly: we finished an initial spike to get a Golang skeleton server in place, albeit one that delegates most of the endpoints through to Synapse.  In fact, matrix.org itself has been running via Dendron since February!

The whole point of Dendron is to provide an architecture where we can split apart the various endpoints that Synapse provides today, re-implementing them where appropriate in Golang, and critically letting the endpoints scale horizontally with clusters of backend servers abstracted by the single Dendron API facade.  As a result, most of the Dendron work has actually ended up going into restructuring Synapse such that multiple Synapses can be run in a cluster behind a single Dendron, allowing us to horizontally scale API endpoints at last.  This takes the form of adding <a href="https://github.com/matrix-org/synapse/commit/1acc319070c0390d2330003bdc1e71cc66383dbb">cluster replication support</a> to Synapse.  This is still work-in-progress as we go through fixing up more and more state to be replicable (replicatable?) between synapses - hopefully it should land in the Synapse 0.15 timeframe.  And then we enter a very very interesting new world of horizontally scalable homeservers...

<br/>

#### Ruma

<a href="https://ruma.dev/">Ruma</a> has also seen some progress over the last few months - Ruma is an independent Rust language homeserver project led by Jimmy Cuadra, and whilst in early development still (currently focusing on the user login and registration system) shows a lot of promise.  Lots of work has ended up going into the required Rust dependencies rather than the Matrix code itself, but if you're interested in Rust then please drop by <a href="https://vector.im/beta/#/room/#ruma:matrix.org">#ruma:matrix.org</a> or #ruma on Freenode and say hi!

<br/>

### Clients

Whilst homeserver development is mainly all about performance and scaling work currently, the client side of the Matrix ecosystem is the polar opposite - with lots of rapid progress on exciting new clients happening from all over the community.

<br/>

#### Perpetually Talking Online (PTO)

<a href="http://pto.im/">PTO</a> has evolved enormously since Torrie Fischer first revealed it at the end of 2015.  PTO is an independent project that acts as a Matrix client that exposes an IRC server interface - effectively turning any Matrix homeserver into an ircd; letting folks hook their favourite IRC clients directly into Matrix and use it as an enormous decentralised IRC network.  (N.B. this is not to be confused with <a href="https://github.com/matrix-org/matrix-appservice-irc">matrix-appservice-irc</a>, which acts as a server-side bridge between Matrix rooms and IRC channels.)  Obviously you lose some of the Matrix specific features (read receipts, typing notifs, VoIP, etc) but there's clearly a huge benefit for the IRC community to be able to use Matrix as if it were an IRC network.

There have been three releases so far, with the <a href="https://github.com/tdfischer/pto/releases">v0.3.0 ("Carburetor") release</a> in March being tantalisingly close to being usable for everyday purposes.  We actually have pto.matrix.org all set up and ready to go as an IRC frontend for the matrix.org homeserver and once <a href="https://github.com/tdfischer/pto/issues/60">issue #60</a> is resolved we'll be turning it on :)

There's one catch though - XChat was never quite built to handle the hundreds of rooms that we've got used to Matrix supporting... :D

<img src="/blog/wp-content/uploads/2016/03/Screen-Shot-2016-03-26-at-00.17.08-988x1024.png" alt="Screen Shot 2016-03-26 at 00.17.08" width="988" height="1024" class="aligncenter size-large wp-image-1565" />

Come hang out in <a href="https://vector.im/beta/#/room/#pto:oob.systems">#pto:oob.systems</a> if you're interested in PTO!

<br/>

#### Quaternion

<a href="https://github.com/Fxrh/Quaternion">Quaternion</a> is a new Qt/QML/C++ desktop client created by Felix Rohrbach.  It's a fairly early alpha but still quite usable and in very active development. <a href="https://vector.im/beta/#/room/#quaternion:matrix.org">#quaternion:matrix.org</a> is the place to talk all things Quaternion :)

<img src="/blog/wp-content/uploads/2016/03/quaternion-1024x702.png" alt="quaternion" width="1024" height="702" class="aligncenter size-large wp-image-1566" />

<br/>

#### matrix-glib-sdk

Meanwhile, over on the GTK side of the world, Gergely Polonkai has been been making great progress on his <a href="https://github.com/gergelypolonkai/matrix-glib-sdk">matrix-glib-sdk</a> Glib client SDK for Matrix.  The end goal here is to implement a full <a href="https://telepathy.freedesktop.org">Telepathy</a> plugin for Matrix on top of the SDK.  Originally written in C, but now shifted to Vala, the SDK is in very active development and now implements all(?) of the Matrix client-server API - a snapshot of the work-in-progress SDK API docs can be found at <a href="http://gergely.polonkai.eu/matrix-glib-sdk/">http://gergely.polonkai.eu/matrix-glib-sdk</a>.  Next up is a formal release and building out clients on top!

<br/>

#### matrix-react-sdk, matrix-ios-sdk, matrix-android-sdk and Vector

Finally, huge amounts of time and effort have continued to be pumped into the official <a href="http://github.com/matrix-org/matrix-react-sdk">matrix-react-sdk</a>, <a href="http://github.com/matrix-org/matrix-ios-sdk">matrix-ios-sdk</a> and <a href="http://github.com/matrix-org/matrix-android-sdk">matrix-android-sdk</a> - driven substantially by requirements for <a href="http://vector.im">Vector</a>, the <a href="http://github.com/vector-im">FOSS</a> Matrix-powered collaboration app that we've been helping with:

<br/>
<img src="/blog/wp-content/uploads/2016/03/Screen-Shot-2016-03-21-at-14.39.16-1024x753.png" alt="Screen Shot 2016-03-21 at 14.39.16" width="1024" height="753" class="aligncenter size-large wp-image-1567" />
<p style="text-align: center">
<img src="/blog/wp-content/uploads/2016/03/android-vector.png" alt="android-vector" width="330" height="640" class="size-full wp-image-1568" /><img src="/blog/wp-content/uploads/2016/03/Screen-Shot-2016-03-26-at-00.58.48-505x1024.png" alt="Screen Shot 2016-03-26 at 00.58.48" width="316" height="640" class="size-large wp-image-1569" />
</p>
<br/>

The best way of seeing what's been going on here is probably by considering Vector itself, which is currently in formal beta (0.4.1 for web, 0.1.2 for iOS and #116 on Android).  The big news includes:

<ul>
<li>Beta iOS and Android apps.  These are early beta but feedback is very much appreciated - the Android beta can be downloaded from <a href="http://matrix.org/jenkins/job/VectorAndroidDevelop/">Jenkins</a>; if you want to help beta iOS via TestFlight, come ask on <a href="https://vector.im/beta/#/room/#ios:matrix.org">#ios:matrix.org</a>.</li>
<li>Guest access.  Anyone can jump straight into Matrix by going to http://vector.im without even having to sign up for an account.  Guests are quite restricted on what they can do (and can only join rooms which explicitly have guest access enabled), but this is a *huge* improvement in getting folks using Matrix.</li>
<li>Ability to jump to any message ever - e.g. when clicking through search results or when permalinking a message... using precisely the same UI that you use when chatting.  Permalinks are awesome.  If you want to <a href="https://vector.im/develop/#/room/#matrix:matrix.org/$1416420724004tADpi:matrix.org">randomly jump back in time</a> to the first weeks of #matrix:matrix.org, now you can...</li>
<li>Read Markers, scrolling that remembers the scroll offset per-room, and the ability to jump to unread messages</li>
<li>Synchronised missed notification and missed highlighted notification information per-room</li>
<li>Badge counts for unread notifications</li>
<li>Entirely reworked Room Settings</li>
<li>Entirely reworked User Settings, including push notification configuration</li>
<li>Entirely reworked Room Directory</li>
<li>Lots of performance improvements</li>
<li>Much improved inviting by email</li>
<li>Much improved reliability on video conferencing</li>
<li>Closing literally <a href="https://github.com/vector-im/vector-web/issues?q=is%3Aissue+is%3Aclosed">hundreds and hundreds of bugs</a>...</li>
</ul>

All that remains right now is yet more bugfixing and incorporating feedback from the current betas!  Please give as much feedback as possible in <a href="https://vector.im/beta/#/room/#vector:matrix.org">#vector:matrix.org</a> :)

<br/>

### Bridges & Bots

Bridges, bots, and other integrations and application services have inevitably taken slightly lower priority whilst we've been focusing on the core server and client bits of the ecosystem.  However, as of March we've started a major new project to get these moving again, starting with a big update to the <a href="https://github.com/matrix-org/matrix-appservice-irc">IRC Bridge</a>.  This is due to be released next week, but you can get a sneak peek at what's going into the release at the <a href="https://github.com/matrix-org/matrix-appservice-irc/commits/develop">commit log</a>.  Highlights include the ability to persist nicks; connect via IPv6; improve formatted message handling; actually feed error messages from IRC back to Matrix; and much much more.

<a href="https://github.com/matrix-org/matrix-appservice-verto">matrix-appservice-verto</a> also got some love, which means that multiway video conferencing powered by FreeSWITCH now works reliably.  The quality still could be improved, but the unreliable call setup that plagued earlier versions is now fixed.

In the next few months we're expecting to see a lot more activity on bridges & bots... watch this space :)

<b>Update Sat March 26:</b>

Totally forgot to mention a few of the key new bridges which have been contributed by the community this year - particularly interesting are the <a href="https://github.com/RocketChat/Rocket.Chat.Federation">Rocket.Chat<->Matrix bridge</a> written by Sing-Li over at Rocket.Chat which provides basic bridging between the awesome <a href="http://rocket.chat">Rocket.Chat</a> collaboration app and the wider Matrix ecosystem.  It's early days, but this is incredibly promising for 'hardcoded' bridging between specific rooms - it just needs Rocket.Chat to support 'virtual' users and will then be seamless federation.

Similarly, <a href="https://github.com/matrix-org/matrix-appservice-gitter">matrix-appservice-gitter</a> is a Gitter<->Matrix bridge built by Leonerd on top of the <a href="https://github.com/matrix-org/matrix-appservice-bridge">matrix-appservice-bridge</a> Node library.  Again, it's early days but is working well for 'hardcoded' bridging - supporting dynamic rooms and users is next on the todo list :)

<br/>

### The Spec

We started our formal release process for the spec just before Christmas with r0.0.0 - and released <a href="http://matrix.org/docs/spec/r0.0.1">r0.0.1</a> in January with <a href="http://matrix.org/docs/spec/r0.0.1/client_server.html#changelog">minor clarifications and updates</a>.  In practice the spec feels quite stable right now, although things have moved on a bit since January and r0.0.2 is definitely overdue at this point.

In the meantime, you can always get the very latest bleeding edge copy of the spec via <a href="http://matrix.org/speculator">the speculator</a>.  We've also added an initial cut at a spec for the <a href="http://matrix.org/speculator/spec/HEAD/identity_service.html">Identity Service</a> at last.

<br/>

### Events

We've been focusing on writing code than evangelising Matrix recently, although we did get out to <a href="/blog/2016/02/03/fosdem-16-retrospective/">FOSDEM 2016</a> and <a href="/blog/2016/02/09/matrix-in-japan/">TADHack Mini Japan and WebRTC Conference</a> and <a href="https://twitter.com/matrixdotorg/status/706916982960967680">Enterprise Connect 2016</a> where we showed off Matrix & Vector in the WebRTC Real World Innovation showcase.

<br/>

### GSoC

We are incredibly grateful to have been accepted as an organisation into Google Summer of Code 2016!  The last two weeks have been the window for students to propose projects to us that they could work on over the course of the summer, and it's been fascinating to meet the GSoCers and see a whole new community pop up on Matrix and advise and mentor applicants through their proposals.  At the last count we've received 35 proposals, many inspired by <a href="https://github.com/matrix-org/GSoC/blob/master/IDEAS.md">our list of ideas</a>, including some really impressive candidates - many thanks to all the students who have applied to us.  We don't know yet how many slots Google will allocate to us, but one way or another we're really looking forward to helping the GSoCers make the most out of their summer of Matrix!  All GSoC discussion is happening in <a href="https://vector.im/beta/#/room/#gsoc:matrix.org">#gsoc:matrix.org</a>.

<br/>

### What's next?

In no particular order, the urgent stuff that still remains includes:

<ul>
<li>Continuing to polish synapse and build out dendron-based clustering</li>
<li>Building as many bridges, bots and other integrations as possible</li>
<li>The matrix.to URL-handler service: having client-agnostic https://matrix.to/#matrix:matrix.org URLs to help with sharing matrix room aliases etc</li>
<li>End-to-end crypto.  No progress since December; we need to get back to it asap.</li>
<li>Exiting Vector from beta</li>
<li>Finishing the server-to-server API specification</li>
<li>Improving the security model for access_tokens</li>
<li>Editable messages</li>
<li>Pinned, tagged, and 'liked' messages</li>
<li>Threading</li>
<li>Decentralised accounts</li>
<li>Decentralised reputation</li>
</ul>

In practice, Bridging and E2E crypto is likely to get the most attention first (beyond the standard ongoing polishing).  There's obviously a significant amount of work there, but we expect to see benefits pretty quickly throughout Matrix - especially from bridging.  Hopefully it's true to say that the next few months should be quite transformational :D

Anyway, thanks for reading this sprawling update and for supporting Matrix.  And please come say hi in <a href="https://vector.im/beta/#/room/#matrix:matrix.org">#matrix:matrix.org</a> if you have any questions :)

- Matthew, Amandine & the Matrix.org team.
