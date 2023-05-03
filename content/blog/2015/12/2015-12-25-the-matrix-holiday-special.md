+++
title = "The Matrix Holiday Special!"
path = "/blog/2015/12/25/the-matrix-holiday-special"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Events"]
+++

Hi all,

We've been pretty bad at updating the blog over the last few months with all the progress that's been happening with Matrix.  Whilst Matrix rooms like #matrix:matrix.org and #matrix-dev:matrix.org have been very active (and our <a href="https://twitter.com/matrixdotorg">twitter account</a> too), in general we've ended up spending way too much time actually writing software and not enough time talking about it, at least here. When a blog goes quiet it normally means that either the authors have got bored, or they're too busy building cool stuff to keep it updated. I'm happy to say that option 2 is the case here!

As a result, there's a huge backlog of really cool stuff we should have talked about. Hopes of writing an Advent Calendar series of blog posts also went out the window as we set Christmas as an arbitrary deadline for loads of work on Synapse, the Matrix Spec and matrix-react-sdk.

So, to try to break the impasse, here's a slightly unorthodox whistle-stop tour of all the amazing blogposts we *would* have written if we'd had time. And perhaps some of them will actually expand into full write-ups when we have more time to spare in the future :)

## End to End Encryption Update

One of the great promises of Matrix is to provide End-to-end encryption as part of the baseline standard (configurable per-room). In practice, our progress has been a little non-linear - we started writing an <a href="https://github.com/trevp/axolotl/wiki">Axolotl</a> ratchet implementation in C++14 (with a pure C API) named <a href="/git/olm">Olm</a> back in February, and then finished it off and wired a basic 1:1 proof-of-concept implementation into matrix-react-sdk in June. We then announced Olm back at the wonderful <a href="https://jardin-entropique.eu.org/">Jardin Entropique</a> conference in Rennes:

<img class="aligncenter size-large wp-image-1426" src="/blog/wp-content/uploads/2015/12/je-1024x768.jpg" alt="Jardin Entropique" width="1024" height="768" />

You can read the full presentation that we gave at <a href="/~matthew/2015-06-26 Matrix Jardin Entropique.pdf">https://matrix.org/~matthew/2015-06-26 Matrix Jardin Entropique.pdf</a> - and you can even play with a very basic test jig at <a href="/~markjh/olm/javascript/demo.html">https://matrix.org/~markjh/olm/javascript/demo.html</a> which uses an emscripten compiled version of Olm in the browser to put the ratchet through its paces.

Things then stalled for a bit, but as of this month they're moving again, and if you're interested in the progress you can read all about it at:

<ul>
<li><a href="/jira/browse/SPEC-162">https://matrix.org/jira/browse/SPEC-162</a></li>
<li>and a full draft spec at <a href="http://matrix.org/speculator/spec/drafts%2Fe2e/client_server.html#end-to-end-encryption">http://matrix.org/speculator/spec/drafts%2Fe2e/client_server.html#end-to-end-encryption</a></li>
<li>the Olm git repo at <a href="http://matrix.org/git/olm/about/">http://matrix.org/git/olm/about/</a></li>
<li>and the formal Olm spec at <a href="/docs/spec/olm.html">https://matrix.org/docs/spec/olm.html</a></li>
</ul>

The main stuff remaining is basically key management (in Synapse and the matrix spec), group conversation ratchets, and UX for wiring it properly into various Matrix clients.  We expect to make progress on this over the next few months :)

Meanwhile, huge kudos to Tor who was crazy enough to <a href="https://github.com/torhve/weechat-matrix-protocol-script#encryption">add the basic 1:1 Olm ratchet</a> to Weechat before we'd even finished writing our test jig!  

## Lean DUS

A few days after Jardin Entropique we made it to <a href="https://www.leandus.de/">Lean DUS</a> - a great tech meetup in Düsseldorf organised by <a href="http://sipgate.de">Sipgate</a>, who were kind enough to invite us to speak.  This was a chance to give a full update on Matrix (as of July!) and talk some more about Olm and plans for end-to-end encryption.  This one got recorded - and you can see it below.  There's also an official page with full videos, slide deck and photos up at <a href="https://www.leandus.de/2015/08/weil-und-hodgson/">https://www.leandus.de/2015/08/weil-und-hodgson/</a>.

<iframe src="https://player.vimeo.com/video/134821506" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>

<a href="https://vimeo.com/134821506">Lean Dus #9 - End to end encryption for decentralised communication mit Matthew Hodgson</a> from <a href="https://vimeo.com/sipgate">sipgate</a> on <a href="https://vimeo.com">Vimeo</a>.

## New Matrix Bridges

Somehow we've failed to blog about the amazing <a href="https://github.com/matrix-org/matrix-appservice-bridge">matrix-appservice-bridge</a> Node framework which we've built as general purpose infrastructure for building Matrix Application Services which act as bridges between existing networks and comms solutions and Matrix.  The architecture here looks something like this:

<img src="/blog/wp-content/uploads/2015/12/bridge.jpg" alt="matrix-appservice-bridge" width="720" height="540" class="aligncenter size-full wp-image-1429" />

...and the goal is to end up with something like this:

<img src="/blog/wp-content/uploads/2015/12/bridge2.jpg" alt="bridge2" width="720" height="540" class="aligncenter size-full wp-image-1430" />

matrix-appservice-bridge is still in development, but there are a bunch of really cool bridges already using it - and a great howto that shows how you can use it to <a href="https://github.com/matrix-org/matrix-appservice-bridge/blob/master/HOWTO.md">write a Matrix{'<->'}Slack bridge in under 100 lines of code</a>.

<ul>
  <li><a href="https://github.com/matrix-org/matrix-appservice-verto">the Matrix/Verto Bridge</a> uses it to hook FreeSWITCH up to Matrix - currently used to provide multiway video and voice conferencing for <a href="https://vector.im">Vector</a>.  It could be easily extended to do generic Matrix{'<->'}SIP or Matrix{'<->'}anything-that-FreeSWITCH-can-speak though.</li>
  <li><a href="https://github.com/matrix-org/matrix-appservice-slack">a basic Matrix/Slack Bridge</a>, which works well enough for hardcoding bridges between specific Matrix and Slack rooms.</li>
  <li><a href="https://github.com/matrix-org/matrix-appservice-respoke">matrix-appservice-respoke</a> - a crazy experiment that bridges Asterisk to Matrix by implementing the Respoke API such that Asterisk can connect to Matrix using chan_respoke.</li>
  <li><a href="https://github.com/matrix-org/node-purple/tree/master/appservice">matrix-appservice-purple</a> - another crazy experiment that hooks libpurple up to matrix-appservice-bridge such that *any* network that libpurple can talk to can be bridged into Matrix.  So far we've experimented with Lync, Skype and Facebook (and AIM(!)) and it works - but it needs a lot more love to be usable other than as a toy.</li>
</ul>

Meanwhile, there's also:
<ul>
 <li><a href="https://github.com/matrix-org/matrix-appservice-irc">the Matrix/IRC Bridge</a>, which doesn't actually use it yet, but will do soon.</li>
 <li><a href="https://github.com/illicitonion/slackbridge">an experimental Golang Matrix/Slack Bridge</a>, which looks at whether we should be doing this all in Golang rather than Node.</li>
</ul>

As of right now our work on bridging has been on hiatus for a month or so, and we would *love* support from the community in advancing and extending the stuff we've built so far.  Otherwise we'll get back to it ourselves in the new year.

## Astricon 2015

We had a lot of fun in Orlando in October at <a href="http://www.asterisk.org/community/astricon-user-conference/sessions/bridging-asterisk-matrix-ecosystem">Astricon 2015</a> - we put together <a href="https://github.com/matrix-org/matrix-appservice-respoke">matrix-appservice-respoke</a> (see above) for our talk and Dangerous Demo in a desperate 24 hour hack and it even worked!  The judges were kind enough to give us the "Swan Award" prize in the dangerous demo shoot-out for the glossiest demo :)

<img src="/blog/wp-content/uploads/2015/12/2015-10-15-Matrix-Astricon.jpg" alt="2015-10-15 Matrix Astricon" width="720" height="540" class="aligncenter size-full wp-image-1433" />
<img src="/blog/wp-content/uploads/2015/12/swan-1024x768.jpg" alt="swan award" width="1024" height="768" class="aligncenter size-large wp-image-1432" />

The slides for our 'Bridging Asterisk to the Matrix Ecosystem' talk are <a href="/~matthew/2015-10-15 Matrix Astricon.pdf">downloadable here</a>.

## Pidgin!

We also implemented a basic libpurple plugin for Matrix - adding Matrix support to any app like Pidgin or Bitlbee that uses libpurple.  (You could in theory even use it with matrix-appservice-purple to bridge from Matrix to Matrix, but that'd be silly :).  It supports basic functionality and uses the new 'v2' APIs for syncing to Matrix.  Adventurous libpurplers can go check it out and experiment with it from <a href="https://github.com/matrix-org/purple-matrix">https://github.com/matrix-org/purple-matrix</a> - feedback welcome.

## OpenWebRTC Support on iOS

We went and hooked <a href="http://openwebrtc.org">OpenWebRTC</a> up to <a href="https://github.com/matrix-org/matrix-ios-sdk">matrix-ios-sdk</a> so that iOS Matrix apps can use the OpenWebRTC stack from Ericsson Research for VoIP and Video.  Apparently we haven't written it up fully yet, but you can find the code at <a href="https://github.com/matrix-org/matrix-ios-openwebrtc-wrapper">https://github.com/matrix-org/matrix-ios-openwebrtc-wrapper</a> for those interested in using OWR with Matrix!

## Debian Repository for Synapse

We built a 3rd party Debian package repository for Synapse... and then forgot to tell anyone about it, other than buried in the Synapse readme!  Well, it exists, and intrepid debianers should go check it out at <a href="http://matrix.org/packages/debian/">http://matrix.org/packages/debian/</a>.

## TADSummit

In November we attended <a href="http://tadsummit.com/2015/">TADSummit</a> in Lisbon - a great event for folks hacking on telco applications and the telcos themselves.  Apparently we failed to do a writeup, but we had a wonderful time: highlights included sitting down with Maarten Ectors from Canonical to wrap up Synapse as an <a href="https://uappexplorer.com/app/matrix.mectors">Ubuntu Snappy app</a> such that anyone in the Ubuntu Core ecosystem can trivially run a Matrix homeserver, and demoing it as part of the Dangerous Demos track there.  We also gave a 'Matrix: One Year In' talk to summarise what we got up to in 2015.

<img src="/blog/wp-content/uploads/2015/12/ubuntu-768x1024.jpg" alt="Matthew & Maarten" width="768" height="1024" class="aligncenter size-large wp-image-1435" />
<img src="/blog/wp-content/uploads/2015/12/2015-11-17-Matrix-TADSummit.jpg" alt="2015-11-17 Matrix TADSummit" width="720" height="540" class="aligncenter size-full wp-image-1434" />

## WebRTC Paris

Whilst on the subject of conferences that we forgot to write up - we just got back from WebRTC Paris, where we demoed the latest & greatest Matrix clients and bridges, hung out with the OpenWebRTC guys and gave another ecosystem update.  You can see the slides at <a href="/~daniel/Matrix- One-year Status Report.pdf">https://matrix.org/~daniel/Matrix- One-year Status Report.pdf</a>.

<img src="/blog/wp-content/uploads/2015/12/paris-1024x768.jpg" alt="WebRTC Paris" width="1024" height="768" class="aligncenter size-large wp-image-1436" />

## New Clients and App Services

There have been a flurry of really interesting new clients and other projects which certainly deserve whole blog posts of their own!

There's <a href="https://github.com/davidar/tensor">Tensor</a> from David A Roberts - a multiplatform <b>native</b> client written in QML that heavily leverages the matrix-js-sdk:

<img src="/blog/wp-content/uploads/2015/12/tensor-1024x789.png" alt="tensor" width="1024" height="789" class="aligncenter size-large wp-image-1438" />

There's <a href="http://fort.kickass.systems:10082/cgit/personal/rrix/pub/matrix.el.git/">matrix.el</a> from Ryan Rix - a native Matrix client for Emacs! You can read all about the whys and wherefores <a href="http://whatthefuck.computer/blog/2015/10/26/mclient/">here</a>.

<img src="/blog/wp-content/uploads/2015/10/mclient1-1024x346.png" alt="mclient" width="1024" height="346" class="aligncenter size-large wp-image-1355" />

There's also loads of cool stuff that Ryan's been doing with Matrix on <a href="http://whatthefuck.computer/blog/">his blog</a> - including <a href="http://whatthefuck.computer/blog/2015/12/06/polynomial-a-decentralized-webring/">Polynomial - a decentralised webring</a> built on Matrix (yes, webrings were and are cool, ok!?!), and his Matrix-powered <a href="http://whatthefuck.computer/blog/2015/11/22/body-computing-system-continuations/">Body Computing System</a>.  Also, some <a href="http://whatthefuck.computer/blog/2015/11/01/on-the-balkinization-of-my-chat-communities/">philosophical</a> <a href="http://whatthefuck.computer/blog/2015/12/19/matrix-and-indieweb/">posts</a> on the benefits of Matrix which give us some hope that we're on the right track!

Then there's <a href="https://github.com/tdfischer/pto">Power Take-Off</a> from Torrie Fischer - an early lets-IRC-clients-connect-to-Matrix project in Rust...

...and there's <a href="https://github.com/Xe/morpheus">Morpheus</a> from Christine Dodrill (Xena) - a Matrix client and bot framework for Haskell; part of a more over-arching IRC{'<->'}Matrix unification project.  Xena also wrote <a href="https://christine.website/blog/matrix-has-u-2015-11-27">a great call to arms for Matrix</a> :)

Very recently there's the <a href="https://github.com/ruma/ruma">Ruma</a> project from Jimmy Cuadra - an ambitious mission to build Matrix components (up to and including a homeserver) in Rust!

Other stuff includes a <a href="https://github.com/davidar/hubot-matrix/">Hubot adaptor</a> from davidar, <a href="https://github.com/DylanGriffith/bender">Bender</a>: an Elixir client and bot library from Dylan Griffith, Jon Frederickson's <a href="https://github.com/jfrederickson/matrix-xmpp-bridge">matrix-xmpp-bridge</a>, rzr's <a href="http://www.element14.com/community/people/rzr/blog/2015/11/24/how-to-setup-a-webrtc-gateway-using-matrix-on-minnowmax">guide to installing synapse on a minnowmax</a>, and I'm sure many others we don't know about or have missed!

Finally, Tor has done an amazing job on <a href="https://github.com/torhve/weechat-matrix-protocol-script">weechat-matrix-protocol-script</a> in implementing features like V2 Sync and E2E crypto faster than we've managed to add them in the official client SDKs!

## Release Zero of the Matrix Specification

We have made some major improvements to <a href="/spec">the spec</a> over the last few months: adding in feature profiles and spec modules to better structure the document, and most recently splitting it up explicitly into separate Client-Server, Server-Server and Application-Server APIs, each with a well-defined single global 'release' number for versioning.  We started this with a 'r0.0.0' release of the Client-Server API, which consolidates the horrible mess of 'v1' and 'v2' APIs we had previously flying around into a single well-defined version of the spec.  Meanwhile the spec is now entirely consolidated into a set of JSON schema and Swagger 2 API descriptors, with a bunch of ReStructured Text for the verbiage - you can find it all at <a href="https://github.com/matrix-org/matrix-doc">https://github.com/matrix-org/matrix-doc</a>.

The r0.0.0 changelog is exciting stuff - you can see it in its entirety at <a href="http://matrix.org/docs/spec/r0.0.0/client_server.html#changelog">http://matrix.org/docs/spec/r0.0.0/client_server.html#changelog</a>.  Synapse itself will support the full r0 API set in 0.12, which will be released any day now.

We've also switched the Swagger-based API viewer over to Swagger 2.0: <a href="http://matrix.org/docs/api">http://matrix.org/docs/api</a>.  We also rejigged the Matrix documentation website entirely, generating it via Jekyll and adding in a new <a href="http://matrix.org/docs/guides/">guides section</a>.

Also, we should have mentioned the existence of <a href="/speculator">Speculator</a> - a golang helper app (<a href="https://github.com/matrix-org/matrix-doc/tree/master/scripts/speculator">source here</a>) which, as the name suggests, renders out copies of the spec as HTML from different branches and pull requests for ease of previewing.

## Dendron

Over the last few months we've also started an entirely new project, codenamed Dendron.  Dendron is the project to evolve Synapse from the current single-threaded Python/Twisted monolithic homeserver into something with a lot more type-safety, horizontal scalability and high availability.  We've mainly been experimenting with different ways of doing this, but the current plan is to split Synapse itself up into multiple services which can each scale independently, and then rewrite some/all of them in languages with better type safety and/or performance or profiling tools.

Some folks may remember a survey that we posted a few months ago asking for the community's thoughts on what languages they'd like their ideal homeserver to be written in, from the perspectives of someone running it as well as hacking on it.  Whilst we haven't (at all) based our decisions for Dendron purely on the survey, it was still quite an interesting exercise.  And here are the results (maximum 'score' is 5, not 10):

<img src="/blog/wp-content/uploads/2015/12/Screen-Shot-2015-12-25-at-01.58.55-1024x964.png" alt="language survey 1" width="1024" height="964" class="aligncenter size-large wp-image-1439" />
<img src="/blog/wp-content/uploads/2015/12/Screen-Shot-2015-12-25-at-01.59.17-1024x968.png" alt="language survey 2" width="1024" height="968" class="aligncenter size-large wp-image-1440" />

The basic feedback was that from the existing community: folks dislike running Java or Node servers; are okayish with Python, but would prefer native or near-native code (be that C, Rust or Go). Meanwhile, for contributing code, there's slightly more interest in the (relatively) new shinies of Go and Rust.  And of course, everyone wanted to plug their own special snowflake language in the 'Others' section, which was mainly a mix of Erlang, Elixir, Haskell, Lisp and Perl :)

This reinforced the choices we were looking at anyway - either Rust (for its safety), or Go (for its simplicity, python-likeness, and concurrency).  (We'd also consider Java, but have to concede that the FOSS community doesn't like running it.)

So we looked at the dependencies that Synapse currently has, and the Rust equivalents, and concluded that the Rust ecosystem unfortunately isn't quite mature enough yet to reliably handle the rather large set of complicated deps that we need in a homeserver.  Also, nobody on the core team is really a Rust guru yet.  Meanwhile, we have at least one ex-Google Go expert in the core team, and in practice it has the edge in terms of maturity.  So, right now, we're looking at switching chunks of Dendron to Go where it makes sense.  (This is subject to change though depending on how we get on).  You should expect to hear a lot more about Dendron in 2016 :)

## matrix-react-sdk, Vector, and latest Matrix features

Last but not least: huge amounts of our time over the last year has gone into building <a href="https://github.com/matrix-org/matrix-react-sdk">matrix-react-sdk</a> - a full set of glossy Web UI components for building super-high quality glossy apps based on Matrix, built on the <a href="https://github.com/matrix-org/matrix-js-sdk">matrix-js-sdk</a>.  This is basically a reaction against the original <a href="https://github.com/matrix-org/matrix-angular-sdk">matrix-angular-sdk</a> and Matrix Console app that we launched Matrix with back in 2014 - which had minimal attention to UI/UX and suffered from major performance problems; it was built purely as the fastest possible way we knew to prototype and demo Matrix in the first place.  matrix-react-sdk however has been built for both performance and quality of UI/UX, as well as obviously using all the latest and greatest Matrix APIs.  (In fact, the transition from matrix-angular-sdk to matrix-react-sdk is pretty similar to the Synapse to Dendron transition on the horizon - although the latter should be more incremental and less 'rewrite the world').

Meanwhile, as part of our commercial work at our day job (i.e. <b>not</b> as Matrix.org) we've been helping on a glossy FOSS app called <a href="https://github.com/vector-im/vector-web">Vector</a> which is layered on top of matrix-react-sdk as a thin 'skin' layer of CSS and a few custom components.  The intention for Vector is to ensure that Matrix has a flagship glossy client: which it clearly needs, in order to gain credibility and drive uptake of the Matrix standard, and also ensure that the Matrix standard actually does indeed fit the needs for a state-of-the-art collaboration tool.

matrix-react-sdk (and thus Vector) is still in incredibly heavy development - we're going to start a formal beta fairly soon, but as of right now it's still sprouting features and refinements on a daily basis.  Meanwhile matrix-react-sdk's APIs are not remotely frozen (we entirely refactored it as recently as a few weeks ago), so not yet ready for use as a general purpose building block.

Some of the stuff going into react-sdk is *incredibly* cool - recent Matrix stuff that it shows off includes:

<ul>
 <li>Animated read receipts.  If you haven't seen these, you haven't lived.  They are a <a href="http://matrix.org/docs/spec/r0.0.0/client_server.html#id15">relatively new addition to the Matrix spec.</a>
 </li><li>Full server-side search.  We now have <a href="http://matrix.org/docs/spec/r0.0.0/client_server.html#id42">full-text search</a> in the Matrix spec, and implemented on synapse both on sqlite and postgres - and now in Vector too.  Having good search over all of your chat history makes Matrix *so* much more usable.
 </li><li>Video conferencing.  We have full multi-way conferencing in Vector via matrix-appservice-verto and FreeSWITCH.  The intention is to add this to the core Matrix spec (having first made it a bit more generic) - see the <a href="https://github.com/vector-im/vector-web/blob/master/docs/conferencing.md">draft spec</a> for details.
 </li><li><a href="http://matrix.org/docs/spec/r0.0.0/client_server.html#third-party-invites">3rd party invites</a>.  You can now invite users into Matrix by email address as well as matrix ID, and it works.  Vector implements this.
 </li><li><a href="http://matrix.org/docs/spec/r0.0.0/client_server.html#room-tagging">Room tagging</a>.  You can now tag rooms as favourites, low priority, or with arbitrary namespaced metadata.  Vector implements this through a swanky drag & drop UI.
 </li><li>"V2" Sync API.  Now part of the 'r0.0.0' spec, this lets Matrix support much smarter incremental and partial <a href="http://matrix.org/docs/spec/r0.0.0/client_server.html#get-matrix-client-r0-sync">synchronisation patterns</a>.  Vector now implements this, meaning that browser windows sync much faster after being offline for a bit, and no longer hammer the user with stale desktop notifications.
 </li><li>Accessing 'historical' rooms.  Matrix now lets you keep track of rooms you've left, so you can view and search the conversation logs even after you've left the conversation.  Vector now implements this (as of Monday!)
 </li><li>Tab-complete that doesn't suck.  This is a purely client-side feature which landed on Thursday!
 </li><li>Roll-overable animated GIFs.  'nuff said.
 </li><li>Markdown support. yay!
 </li><li>Synchronised read and notification history.  This hasn't landed yet (in vector or synapse or even the spec), but finally provides a way to keep read and notification state in sync in realtime across all your clients and a meaningful favicon 'badge' telling you how many notifications you missed!
 </li><li>Guest access.  This hasn't landed in Vector yet, but it's in <a href="http://matrix.org/docs/spec/r0.0.0/client_server.html#guest-access">the spec</a> and Synapse.  It will let folks use Matrix without having to create an account (at least for rooms which support 'guest access' from the public).</li>
</ul>

If you haven't given Vector a spin, it's well worth heading over to <a href="https://vector.im">https://vector.im</a> and taking a look.

There's also an Electron desktop version of Vector in progress, contributed by Steven Hammerton at <a href="https://github.com/stevenhammerton/vector-desktop">https://github.com/stevenhammerton/vector-desktop</a> (although it's currently stuck on an old release).

## Epilogue

Okay, this has got a lot longer than it was meant to be - but hopefully makes up a bit for the lack of comms over the last few months whilst we've been drowning in work on Synapse, Vector, the Spec, Dendron, and everything else mentioned above.

2015 has been an epic year as we've taken Matrix from a very early beta to the advanced stage that it's at now.  Obviously there's still a lot of stuff to do though.  Right now we expect the focus in 2016 to be:

<ul>
 <li>Vector - making sure the Matrix protocol has a flagship glossy FOSS client that normal (non-geek) users can use.</li>
 <li> Dendron - making Synapse more reliable, scalable and maintainable.</li>
 <li>Bridging - wiring as much of the rest of the world into Matrix as accurately and efficiently as possible.</li>
 <li>Federation Spec - finishing and releasing the Server-Server API.</li>
 <li>End-to-end crypto - finishing it off.</li>
</ul>

...and obviously continuing to refine and extend the core of Matrix itself with features like threading, editable messages, and possibly even distributed accounts.

There are very fun and exciting times ahead.  We'd just like to say a profound thank you to everyone who's supported Matrix this far and helped make this mission possible - whether it's by running clients/servers/services, or writing your own, or filing bugs and feedback on our code or the spec, or telling folks about the project, or paying us to work on it(!), or just by reading this blog post.  Hopefully 2016 will be the year where online communication starts to open up and interoperate once again, rather than becoming ever more fragmented and closed.

Thanks for reading - and Merry Christmas, for those who celebrate :)

- Matthew, Amandine & the Matrix Team.
