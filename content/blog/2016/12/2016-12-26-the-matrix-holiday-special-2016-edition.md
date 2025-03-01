+++
title = "The Matrix Holiday Special! (2016 edition)"
path = "/blog/2016/12/26/the-matrix-holiday-special-2016-edition"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

We seem to have fallen into the pattern of giving seasonal 'state of the union' updates on the Matrix blog, despite best intentions to blog more frequently... although given the <a href="/blog/2016/11/12/the-matrix-autumn-special/">Autumn Update</a> ended up being posted in November this one is going to be a relatively incremental update.  Let's jump straight in:

### E2E Encryption

Unless you've been in a coma for the last month you'll have hopefully noticed that we <a href="/blog/2016/11/21/matrixs-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last/">launched the formal beta for E2E Encryption</a> across matrix-{'{'}js,ios,android{'}'}-sdk (and thus Riot/{'{'}Web, iOS, Android{'}'}) in November, complete with the successful <a href="http://nccgroup.trust/us/our-research/matrix-olm-cryptographic-review">independent public security assessment</a> of our Olm and Megolm cryptography library from NCC Group.  So far the beta has gone well in parts: the core Olm/Megolm crypto library has held up well with no bugfixes at all required since the audit (yay!).  However, we've hit a lot of different edge cases in the wild where devices can fail to share their outbound session ratchet state to other devices present in the room.  This results in the infamous "Unknown Inbound Session ID" (UISI) errors which many folks will have seen (now renamed to the more meaningful "Unable to decrypt: The sender's device has not sent us the keys for this message" error).

Unfortunately there's a bunch of entirely different causes for this, both platform-specific and cross-platform, and we've been running around untangling all the error reports and getting to the bottom of it.  The good news is that we think we now know the vast majority of the causes, and fixes are starting to land.  We've also just finished a fairly time-consuming formal crypto code-review on the three application SDK implementations (JS, iOS & Android) to shake out any other issues.  Meanwhile some new features have also landed - e.g. the ability for guests to use E2E!  The remaining stuff at this point before we can consider declaring E2E out of beta is:
<ul>
  <li>Finish fixing the UISI errors (in progress)</li>
  <li>Warn when unverified devices are added to a room</li>
  <li>Implement passphrased backup & restore for E2E state, so that folks can avoid losing their E2E history when they logout or switch to a new device</li>
  <li>Improve device verification.</li>
</ul>
Thanks to everyone who's been using E2E and reporting issues - given the number of different UISI error causes out there, it's been really useful to go through the different bug reports that folks have submitted.  Please continue to submit them when you see unexpected problems (especially over the coming months as stability improves!)

### New Projects

There have been a tonne of new projects popping up from all over the place since the last update.  Looking at the <a href="https://github.com/matrix-org/matrix-doc/commits/master/supporting-docs">git history</a> of the <a href="/docs/projects">projects page</a>, we've been adding one every few days!  Highlights include:

#### Bridges

<ul>
  <li><a href="https://github.com/kfatehi/matrix-appservice-imessage">https://github.com/kfatehi/matrix-appservice-imessage</a> - A solid foundation for an iMessage bridge from kfatehi, built on top of the official matrix-appservice-bridge stack.  iMessage and FaceTime's crypto is tied into Apple's Fairplay DRM (famous for securing the iTunes Music Store and App Store) and is locked all the way down to the <a href="https://www.apple.com/business/docs/iOS_Security_Guide.pdf">keypair baked into your Apple device's CPU</a> at fabrication time, so for now the bridge has to be run on a macOS device in order to bridge.  It's very promising indeed, and exciting to see bridges to relatively inhospitable environments like iMessage popping up!</li>
  <li><a href="https://github.com/Half-Shot/matrix-fb-chat/">https://github.com/Half-Shot/matrix-fb-chat/</a> - A proof-of-concept bridge for Facebook Messenger written by Half-Shot in TypeScript on top of the matrix-js-sdk.  Currently you have to manually configure which conversations to bridge between FB and Matrix, but it works!</li>
  <li><a href="http://github.com/exul/matrix-rocketchat">https://github.com/exul/matrix-rocketchat</a>  - A new Rocket.Chat bridge from exul, written in Rust.</li>
  <li><a href="https://github.com/pztrn/matrix-xmpp-bridge">https://github.com/pztrn/matrix-xmpp-bridge</a> - A major fork from pztrn of jfred's matrix-xmpp-bridge, now using flask, regius, alembic, sleekxmpp and all sorts.  Currently in very active dev!</li>
  <li><a href="https://github.com/CyrusTheHedgehog/Hangouts-Bridge">https://github.com/CyrusTheHedgehog/Hangouts-Bridge</a> - A basic PoC of a Hangouts bridge, written in python3 asyncio</li>
</ul>

#### Clients

<ul>
  <li><a href="https://github.com/lukebarnard1/j">https://github.com/lukebarnard1/j</a> - A blogging and journalism platform built on Matrix from Luke (moonlighting from the core team!)</li>
  <li><a href="https://live.hello-matrix.net/">https://live.hello-matrix.net/</a> - a live-blogging system powered by Matrix from @ar</li>
  <li><a href="https://github.com/pik/interlocutor">https://github.com/pik/interlocutor</a> - An experimental decentralized comment system powered by Matrix, written as a Polymer Webcomponent</li>
  <li><a href="https://github.com/tjgillies/freebird">https://github.com/tjgillies/freebird</a> - a basic twitter clone built on Matrix by tjgillies</li>
</ul>

#### Other projects

<ul>
  <li><a href="https://github.com/slp/matrix-pushgw">https://github.com/slp/matrix-pushgw</a> - A Matrix push gateway written in Golang which exposes a custom TCP push protocol to apps, letting them get push notifications directly from your own gateway rather than via GCM or APNS.  The intention is to use it for Sailfish and Fdroid.  The initial implementation looks very promising - just needs the clientside support, and then folks who don't trust Google with their notifications can run completely indie at last!</li>
  <li><a href="https://github.com/kultsinuppeli/riotchat">https://github.com/kultsinuppeli/riotchat</a> - Ansible playbook for Riot/Web and Synapse</li>
  <li><a href="https://github.com/bismark/matrex">https://github.com/bismark/matrex</a> - Experimental beginnings of a Matrix homeserver written in Elixir!</li>
  <li><a href="https://github.com/mlopezr/node-red-contrib-matrixbot">https://github.com/mlopezr/node-red-contrib-matrixbot</a> - Matrix bot plugin for the <a href="https://nodered.org/">Node-RED</a> IOT platform</li>
</ul>

### Bots and Bridges

There's been a bunch of work from the core team on bots & bridges infrastructure over the last month:

Rearchitecting the slack and gitter bridges to optionally support 'puppeting users'.  This is in some ways the ultimate flavour of bridging - where you authenticate with the remote service using your "real" gitter/slack/... credentials, and then the bridge has access to synchronise your full spectrum of data with Matrix.  This is in contrast to the current implementations where the bridge creates virtual users (e.g. Slack webhook bots or IRC virtual user bots) or uses a predefined bot (e.g. matrixbridge on gitter) to link the rooms.

This has some huge advantages: e.g. ability to bridge Slack and Gitter DMs through properly to Matrix; bridging presence and typing notifications correctly, not requiring any custom bots or integrations to be configured; not proxying via a crappy bridge bot as per gitter today; letting Matrixed users be completely indistinguishable from their native selves on the remote platform - so supporting tab complete in Slack, profiles, presence, etc.  The main disadvantage is that you have to have an account on the platform already (although you could argue this is a feature, especially from the remote network's perspective!) and that you are delegating access to that account through to the bridge, so you'd better trust it.  However, you can always run your own bridge if trust is an issue.

The work on this is mid-progress currently, but we're really looking forward to seeing the official Slack, Gitter and other bridges support this mode of operation in the new year!

We've also been spending some time working with bridges written by the wider community (e.g. Half-Shot's <a href="https://github.com/Half-Shot/matrix-appservice-twitter">twitter bridge</a>) to get them deployed on the matrix.org homeserver itself, to help folks who can't run their own.

Meanwhile there's been a lot of work going into supporting the IRC bridge. Main highlights there are:
<ul>
  <li>The release of <a href="/blog/2016/12/19/matrix-appservice-irc-0-7-0-is-out/">matrix-appservice-irc 0.7</a>, with all sorts of major new features</li>
  <li>Turning on bi-directional membership list syncing at last for all networks other than Freenode!  In theory, at least, you should finally see the same list of room members in both IRC and Matrix!!</li>
  <li>Handling IRC PM botspam from Freenode and OFTC, which bridge through as invite spam into Matrix.  Sorry if you've been bitten by this.  We've worked around it for now by setting appropriate umodes on the IRC bots, and by implementing a 'bulk reject' button on Riot (under in Settings).  This caused a few nasty outages on Freenode and OFTC. On the plus side, at least it shows that Riot scales up to receiving 2000+ invites without exhibiting ill effects...</li>
  <li>Considering how to improve history visibility on IRC to avoid scenarios where channel history is shared between users in the same room (even if their IRC bot has temporarily disconnected).  This was a major problem during the Freenode/OFTC outages mentioned earlier.</li>
</ul>
Last but not least, we've just released <a href="https://github.com/matrix-org/gomatrix">gomatrix - a new official Matrix client SDK for golang</a>!  <a href="https://github.com/matrix-org/go-neb">Go-neb</a> (the reference golang Matrix bot framework) has been entirely refactored to use gomatrix, which should keep it honest as a 1st class Matrix client SDK for those in the Golang community.  We highly recommend all Golang nuts to go <a href="https://godoc.org/github.com/matrix-org/gomatrix">read the documentation</a> and give it a spin!

### Riot Desktop

Riot development has been largely preoccupied with E2E debugging in the respective Matrix Client SDKs, but <a href="https://medium.com/@RiotChat/introducing-riot-0-9-and-desktop-riot-3585d1027243">0.9.3 was released last week adding in Electron-based desktop app support</a>.  (Remember, if you hate Electron-style desktop apps which provide a desktop app by embedded a webbrowser, you can always use another Matrix client!).  If you've been missing having Riot as a proper desktop app, go get involved!

<img class="aligncenter size-large wp-image-1874" src="/blog/wp-content/uploads/2016/12/Screen-Shot-2016-12-26-at-01.00.12-1024x687.png" alt="screen-shot-2016-12-26-at-01-00-12" width="1024" height="687" />

### Next Generation Homeservers

#### Ruma

<a href="https://ruma.dev/">Ruma</a> is a project led by Jimmy Cuadra to build a Matrix homeserver in Rust - the project has been ploughing steadily onwards through 2016 with a bit of an acceleration during December.  You can follow progress at the excellent <a href="https://ruma.dev/news/">This Week in Ruma</a> blog, <a href="https://github.com/ruma/ruma/pulse/monthly">watching the project on Github</a>, and tracking the <a href="https://github.com/ruma/ruma/blob/master/STATUS.md">API status dashboard</a>.  Some of the latest PRs are looking very promising in terms of getting the core remaining CS APIs working, e.g:
<ul class="simple-conversation-list varied-states">
  <li><span class="num">Merged #113</span>
 <a class="title" href="https://github.com/ruma/ruma/pull/113">Add implementation for the filter endpoint.</a> 4 days ago</li>
  <li><span class="state state-merged">Merged</span>
<span class="num">#125</span>
 <a class="title" href="https://github.com/ruma/ruma/pull/125">Adding a Server header to API responses</a> 5 days ago</li>
  <li><span class="state state-merged">Merged</span>
<span class="num">#105</span>
 <a class="title" href="https://github.com/ruma/ruma/pull/105">Add basic implementation for the tags endpoint.</a> 5 days ago</li>
  <li><span class="num">Open #106</span>
 <a class="title" href="https://github.com/ruma/ruma/pull/106">Add basic implementation for the sync endpoint.</a> 2 days ago</li>
  <li><span class="state state-open">Open</span>
<span class="num">#58</span>
 <a class="title" href="https://github.com/ruma/ruma/issues/58">API: GET /events</a> 20 days ago</li>
</ul>
Needless to say, we've been keeping an eye on Ruma with extreme interest, not least as some of the Matrix core team are rabid Rustaceans too :)  We can't wait to see it exposing a usable CS API in the hopefully not-too-distant future!!

#### Dendrite

Meanwhile, in the core team, we've been doing some fairly serious experimentation on next-generation homeservers.  Synapse is in a relatively stable state currently, and we've implemented most of the horizontal scalability tricks available to us there (e.g. splitting out <a href="https://github.com/matrix-org/synapse/blob/master/docs/workers.rst">worker processes</a>).  Instead we're starting to hit some fundamental limitations of the architecture: the fact that the whole codebase effectively assumes that it's talking to a single consistent database instance; python's single-threadedness and memory inefficiency; twisted's lack of profiling; being limited to sqlite's featureset; the fact that the schema has grown organically and is difficulty to refactor aggressively; the fact the app papers over SQL problems by caching everything in RAM (resulting in synapse's high RAM requirements); the constant bugs caused by lack of type safety; etc.

We started an experiment in Golang to fix some of this a year ago in the form of <a href="https://github.com/matrix-org/dendron">Dendron</a> - a "<a href="http://www.martinfowler.com/bliki/StranglerApplication.html">strangler pattern</a>" homeserver skeleton intended to sit in front of a synapse and slowly port endpoints over to Go.  In practice, Dendron ended up just being a rather dubious Matrix-aware loadbalancer, and meanwhile no endpoints got moved into it (other than /login, which then got moved out again due to the extreme confusion of having to maintain implementations in both Dendron & Synapse).  The main reasons for Dendron's failure are a) we had enough on our hands supporting Synapse; b) there were easier scalability improvements (e.g. workers) to be had on Synapse; c) the gradual migration approach looked like it would end up sharing the same storage backend as Synapse anyway, and potentially end up inheriting a bunch of Synapse's woes.

So instead, a month or so ago we started a new project codenamed Dendrite (aka Dendron done right ;D) - this time an entirely fresh standalone Golang codebase for rapid development and iteration on the platonic ideal of a next-generation homeserver (and an excuse to audit and better document & spec some of the <a href="https://docs.google.com/document/d/14KVTNIZIig1iyRBzK91L6B7tnsfmon7CIWh-DCFRd6k/edit">murkier</a> bits of Matrix).  The project is still very early and there's no doc or code to be seen yet, but it's looking cautiously optimistic (especially relative to Dendron!).  The project goals are broadly:
<ol>
  <li>To build a new HS capable of supporting the exponentially increasing load on matrix.org ASAP (which is currently at 600K accounts, 50K rooms, 5 messages/s and growing fast).</li>
  <li>To architecturally support full horizontal scalability through clustering and sharding from the outset - i.e. no single DBs or DB writer processes.</li>
  <li>To optimise for Postgres rather than be constrained by SQLite, whilst still aiming for a simple but optimal schema and storage layer.  Optimising for smaller resource footprints (e.g. environments where a Postgres is overkill) will happen later - but the good news is that the architecture will support it (unlike Synapse, which doesn't scale down nicely even with SQLite).</li>
</ol>
It's too early to share more at this stage, but thought we should give some visibility on where things are headed!  Needless to say, Synapse is here for the foreseeable - we think of it as being the Matrix equivalent of the role Apache httpd played for the Web.  It's not enormously efficient, but it's popular and relatively mature, and isn't going away.  Meanwhile, new generations of servers like Ruma and Dendrite will come along for those seeking a sleeker but more experimental beast, much as nginx and lighttpd etc have come along as alternatives to Apache.  Time will tell how the server ecosystem will evolve in the longer term, but it's obviously critical to the success of Matrix to have multiple active independent server implementations, and we look forward to seeing how Synapse, Ruma & Dendrite progress!

### 2017

Looking back at where we were at <a href="/blog/2015/12/25/the-matrix-holiday-special/">this time last year</a>, 2016 has been a critical year for Matrix as the ecosystem has matured - rolling out E2E encryption; building out proper bot & bridge infrastructure; stabilising and tuning Synapse to keep up with the exponential traffic growth; seeing the explosion of contributors and new projects; seeing Riot edging closer to becoming a viable mainstream communication app.

2017 is going to be all about scaling Matrix - both the network, the ecosystem, and the project.  Whilst we've hopefully transitioned from being a niche decentralisation initiative to a relatively mainstream FOSS project, our ambition is unashamedly to become a mainstream communication (meta)network usable for the widest possible audience (whilst obviously still supporting our current community of FOSS & privacy advocates!).  With this in mind, stuff on the menu for 2017 includes:
<ul>
  <li>Getting E2E Encryption out of beta asap.</li>
  <li>Ensuring we can scale beyond Synapse - see Dendrite, above.</li>
  <li>Getting as many bots and bridges into Matrix as possible, and doing everything we can to support them, host them and help them be as high quality as possible - making the public federated Matrix network as useful and diverse as possible.</li>
  <li>Supporting Riot's leap to the mainstream, ensuring Matrix has at least one killer app.</li>
  <li>Adding the final major missing features:
<ul>
  <li>Customisable User Profiles (this is almost done, actually)</li>
  <li>Groups (i.e. ability to define groups of users, and perform invites, powerlevels etc per-group as well as per-user)</li>
  <li>Threading</li>
  <li>Editable events (and Reactions)</li>
</ul>
</li>
  <li>Maturing and polishing the spec (we are way overdue a new release)</li>
  <li>Improving VoIP - especially conferencing.</li>
  <li>Reputation/Moderation management (i.e. spam/abuse filtering).</li>
  <li>Much-needed SDK performance work on matrix-{'{'}react,ios,android{'}'}-sdk.</li>
  <li>...and a few other things which would be premature to mention right now :D</li>
</ul>
This is going to be an incredibly exciting ride (right now, it feels a bit like being on a toboggan which has made its way onto a fairly steep ski slope...) and we can only thank you: the community, for getting the project to this point - whether you're hacking on Matrix, contributing pull requests, filing issues, testing apps, spreading the word, or just simply using it.

See you in 2017, and thanks again for flying Matrix.

- Matthew, Amandine & the Matrix Team.
