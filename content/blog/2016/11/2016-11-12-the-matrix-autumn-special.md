+++
title = "The Matrix Autumn Special!"
path = "/blog/2016/11/12/the-matrix-autumn-special"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News", "GSOC"]
+++

Another season has passed; the leaves are dropping from the trees in the northern hemisphere (actually, in the time it's taken us to finish this post, most of them have dropped :-/) and once again the Matrix team has been hacking away too furiously to properly update the blog. So without further delay here's an update on all things Matrix!

### Synapse 0.18

Back in September, we forgot to properly announce the 0.18 release of Synapse! This is a major oversight given that 0.18 was a huge update with some critical performance improvements, but hopefully everyone has upgraded by now anyway. If not, there's never been a better time to <a href="https://github.com/matrix-org/synapse">run your own homeserver</a>! The main improvement is that the Matrix room state updates are now stored as deltas in the database rather than snapshots, which reduces the size of the database footprint by around 5 - 7x. The first time you run synapse after upgrading to 0.18 it will go through your database deleting all the historical data, after which you can VACUUM the db to reclaim the freed diskspace.

You can tell when it's finished based on whether it's stopped logging about the 'background_deduplicate_state' task. There was a bug in 0.18.0 that meant this process was very slow (weeks) on sqlite DBs and chewed 100% CPU; this was fixed in 0.18.1, and subsequently we've also had 0.18.2 (various perf and bug fixes, and a new modular internal API for authentication) and the current release: 0.18.3 to address a <a href="/blog/2016/11/08/synapse-debian-pacakge-security-announcement/">major vulnerability</a> on deployments using LDAP with obsolete versions (0.9.x) of the python ldap3 library - e.g. Debian Stable. <strong>Folks using the Debian Stable packages must upgrade immediately.</strong>

Other big changes in Synapse 0.18 were:
<ul>
  <li>Adding the final APIs required to support end-to-end encryption: specifically, a new store-and-forward API called "to device messaging", which lets messages be passed between specific devices outside the context of a room or a room DAG. This is used for exchanging authentication tokens and sensitive end-to-end key data between devices (e.g. when a new device joins a room and needs to be looped in) and is not intended for general messaging.</li>
  <li>Changing how remote directory servers are queried. Rather than constantly spidering them via the secondary_directory_servers option (which was causing a load crisis on the matrix.org server, as everyone else in Matrix kept polling it for directory updates), clients can now set a 'server' parameter on the publicRooms request to ask their server to proxy the request through to a specific remote server. Element (the app formally known as Riot/Web) implements this already. This is a stopgap until we have a proper global room discovery database of some kind.</li>
  <li>Adding pagination support to the room directory API. We now have enough rooms in Matrix that downloading the full list every time the user searches for a room was getting completely untenable - we now support paginating and searching the list. Riot (now Element) and Riot-Android (now Element Android) are using the new APIs already.</li>
  <li>Basic support for 'direct room' semantics. When you create a room you can now state the intent for that room to be a 1:1 with someone via the is_direct parameter.</li>
  <li>Making the /notifications API work - this lets clients download a full list of all the notifications a user has been recently sent (highlights, mentions etc)</li>
</ul>
Spec for all of these new APIs are currently making their way into the official matrix spec; you can see the work in progress at <a href="/speculator">https://matrix.org/speculator</a>. Meanwhile, we're waiting for the last bits of the end-to-end encryption APIs to land there before releasing 0.3 of the Matrix spec, which should happen any day now.

To find out more and get upgraded if you haven't already, please check out <a href="https://github.com/matrix-org/synapse/releases/tag/v0.18.3">the full changelog</a>.

### Synapse scalability

Something which we've been quietly adding over the last 6 months is support for running large synapse deployments like the Matrix.org homeserver. Matrix.org has around 500K accounts on it, 50k rooms, and relays around 500K messages per day and obviously the community expects it to have good performance and availability (even though we'd prefer if you ran your own server, for obvious reasons!)

The current scaling approach for this is called 'Workers' - where we've split out a whole bunch of different endpoints from the main Synapse process into child 'worker' processes which replicate their state from the master Synapse process. These workers are designed to scale horizontally, adding as many as you like to handle the traffic load. It's not full active/active horizontal scalability in that you're still limited by the performance of the master process and the database master you're writing to, but it's a great way to escape Python's global interpreter lock limiting processes effectively to a single core, and in practice it's a huge improvement and works pretty well as of Synapse 0.18.

You can read more about the architecture and how to run your Synapse in worker-mode over at <a href="https://github.com/matrix-org/synapse/blob/master/docs/workers.rst">https://github.com/matrix-org/synapse/blob/master/docs/workers.rst</a>.

### Starting a Riot (now Element)

Meanwhile, the biggest news in Matrixland has probably been the renaming of Vector as Riot (now Element) and the 'mass market' launch of Riot as a flagship Matrix client at the <a href="http://pulverhwc.evolero.com/monage">MoNage</a> conference on Sept 19th in Boston. The reasons for renaming Vector have been done to death by now and hopefully folks have got over the shock, but the rationale is to have a more distinctive and memorable (and controversial!) name, which is more aligned with the idea of returning control of communication back to the people :) Amandine has the full story over at the <a href="https://medium.com/@RiotChat/lets-riot-f5b0aa99dc8e">Riot blog</a>.

Riot (now Element) itself is a fairly thin layer on top of the official client Matrix SDKs, and so 95% of the work for Riot (now Element) took the form of updates to <a href="https://github.com/matrix-org/matrix-js-sdk">matrix-js-sdk</a>, <a href="https://github.com/matrix-org/matrix-react-sdk">matrix-react-sdk</a>, <a href="https://github.com/matrix-org/matrix-ios-sdk">matrix-ios-sdk</a>, <a href="https://github.com/matrix-org/matrix-ios-kit">matrix-ios-kit</a>, <a href="https://github.com/matrix-org/matrix-android-sdk">matrix-android-sdk</a> and <a href="https://github.com/matrix-org/synapse">synapse</a> itself. There's been a tonne of changes here since June, but the main highlights are:
<ul>
  <li>End-to-end encryption support landed in matrix-js-sdk and matrix-react-sdk (and thus Riot/Web (now Element)) and in dev on matrix-ios-sdk and matrix-android-sdk using the Olm and Megolm ratchets. More about this later.</li>
  <li>Hosted integrations, bots and bridges! More about this later too.</li>
  <li>Direct Message UI landed in Riot/Web (now Element) to tag rooms which exist for contacting a specific user. These get grouped now as the 'People' list in Riot (now Element). It's in dev on Riot/iOS (now Element (iOS)) & Android (now Element Android).</li>
  <li>Entirely new UI for starting conversations with people - no more creating a room and then inviting; you just say "i want to talk with Bob".</li>
  <li>Entirely new UI for inviting people into a room - no more confusion between searching the membership list and inviting users.</li>
  <li>FilePanel UI in Riot/Web (now Element) to instantly view all the attachments posted in a room</li>
  <li>NotificationPanel UI in Riot/Web (now Element) to instantly view all your missed notifications and mentions in a single place</li>
  <li>"Volume control" UI to have finer grained control over per-room notification noisiness</li>
  <li>Entirely re-worked Room Directory navigator - lazy-loading the directory from the server, and selecting rooms via bridge and remote server</li>
  <li>It's very exciting to see a wider audience discovering Matrix through Riot (now Element) - and Riot (now Element)'s usage stats have been growing steadily since launch, but there's still a lot of room for improvement.</li>
</ul>
Stuff on the horizon includes:
<ul>
  <li>Formal beta-testing the full end-to-end encryption feature-set.</li>
  <li>Performance and optimisation work on all platforms - there are huge improvements to be had.</li>
  <li>Long-awaited poweruser features: 'dark' colour scheme; more whitespace-efficient layout; collapsing consecutive joins/parts...</li>
  <li>"Landing page" to help explain what's going on to new users and to show deployment-specific announcements and room lists.</li>
  <li>Support for arbitrary profile information.</li>
  <li>Threading.</li>
</ul>
Riot (now Element) releases are announced on <a href="https://matrix.to/#/#riot:matrix.org">#riot:matrix.org</a>, the <a href="https://medium.com/@RiotChat">Riot blog</a> and <a href="http://twitter.com/@RiotChat">Twitter</a> - keep your eyes peeled for updates!

### End to End Encryption

Full cross-platform end-to-end encryption is incredibly close now, with the develop branches of iOS & Android SDKs and Riot (now Element) currently in internal testing as of Nov 7 - expect a Big Announcement very shortly.  We're very optimistic based on how the initial implementation on Riot/Web (now Element)has been behaving so far.

When E2E first landed on Riot/Web (now Element) in September we were missing mobile support, encrypted attachments, encrypted VoIP signalling, and the ability to retrieve encrypted history on new devices - as well as a formal audit of the underlying <a href="/docs/spec/olm.html">Olm</a> and <a href="/docs/spec/megolm.html">Megolm</a> libraries. Since then things have progressed enormously with most of the core team working since September on filling in the gaps, as well as getting audited and fixing all the weird and wonderful edge cases that the audit showed up. All the missing stuff has been landing on the develop branches over the last few weeks, with encrypted attachments landing on web on Nov 10; encrypted VoIP landing on Nov 11; etc. Watch this space for news on the upcoming cross-platform public beta!

### Hosted Integrations and introducing go-neb

One of the new features which arrived in Riot (now Element) is the ability to add "single click" integrations (i.e. bots, bridges, application services) into rooms from Riot/Web (now Element) by clicking the "Manage Integrations" button in Room Settings. These integrations are hosted for free by Riot (now Element) in its production infrastructure (codenamed Scalar), but all the actual bots/bridges/services themselves are normal opensource Matrix apps and you can of course run them yourself too.

<img class="aligncenter wp-image-1827" src="/blog/wp-content/uploads/2016/11/Screen-Shot-2016-11-12-at-11.47.29-1024x913.png" alt="screen-shot-2016-11-12-at-11-47-29" width="894" height="797" />

The Bot integrations are all provided by <a href="https://github.com/matrix-org/go-neb">go-neb</a> - a complete rewrite in Golang and general reimagining of the old <a href="https://github.com/matrix-org/Matrix-NEB">python NEB bot</a> which old-timers will recall as the very first bot written for the Matrix ecosystem. Go-neb has effectively now become a general purpose golang bot/integration framework for Matrix, with the various different services implemented as plugins for <a href="https://github.com/matrix-org/go-neb/tree/master/src/github.com/matrix-org/go-neb/services/github">Github</a>, <a href="https://github.com/matrix-org/go-neb/tree/master/src/github.com/matrix-org/go-neb/services/jira">JIRA</a>, <a href="https://github.com/matrix-org/go-neb/tree/master/src/github.com/matrix-org/go-neb/services/giphy">Giphy</a>, <a href="https://github.com/matrix-org/go-neb/tree/master/src/github.com/matrix-org/go-neb/services/guggy">Guggy</a> etc. Critically it supports <a href="https://github.com/matrix-org/go-neb#configuring-realms">authenticating Matrix users through to the remote service</a>, letting normal Matrix users interact with Github and friends using their actual Github identity rather than via a bot user - this is a huge huge improvement over the original naive python NEB.

If you like Go and you like Matrix, we'd strongly suggest having a go (hah) at adding new services into go-neb: anything implemented against go-neb will also magically be hosted and available as part of the "Manage Integrations" interface in Riot (now Element), as well as being available to anyone else running their own go-nebs. For full details of the architecture and how to implement new plugins, go check out the full <a href="https://github.com/matrix-org/go-neb">README</a>.

If Matrix is to provide a good FOSS alternative to systems like Slack it's critical to have a large array of available integrations, so we really hope that the community will help us grow the list!

### Building Bridges

There have been vast improvements to bridging over the last few months, including the ability to "plumb" bridges into arbitrary rooms (letting you link a single Matrix room through to multiple remote networks). Like go-neb, Riot (now Element) is providing free bridge hosting with the ability to add to rooms with a "single click" via the Manage Integrations button in Room Settings. For now, Riot (now Element) is hosting any bridges built on the <a href="https://github.com/matrix-org/matrix-appservice-bridge">matrix-appservice-bridge</a> codebase.

In short, this means that any user can go and take an existing Matrix room and link it through to Slack, IRC, Gitter, and more.

#### matrix-appservice-irc

Huge amounts of work have gone into improving the IRC bridge - both adding new features to try to give the most IRC-friendly experience when bridging into IRC, as well as lots of maintenance and performance work to ensure that the matrix.org hosted bridges can scale to the large amounts of traffic we're seeing going through Freenode and others. We've also added hosted bridges for OFTC and Snoonet, and turned on connecting via IPv6 by default for networks which support it.

You can read the full changelogs for 0.5.0 and 0.6.0 at <a href="https://github.com/matrix-org/matrix-appservice-irc/blob/master/CHANGELOG.md">https://github.com/matrix-org/matrix-appservice-irc/blob/master/CHANGELOG.md</a>, but the main highlights are:

matrix-appservice-irc 0.6.0
<ul>
  <li>Debouncing quits and netsplits: if IRC users quit there can be a window where they are shown as just offline rather than leaving the room, avoiding join/part spam and creating unnecessary state events in Matrix.</li>
  <li>Topic bridging: IRC topics can now be bridged to Matrix!</li>
  <li>Support custom SSL CAs (thanks to @Waldteufel)</li>
  <li>Support custom media repository URLs</li>
  <li>Support the ability to quit your IRC user from the network entirely</li>
  <li>Fix rate limiting for traffic from privileged IRC users and services</li>
</ul>
matrix-appservice-irc 0.5.0:
<ul>
  <li>Support throttling reconnections to IRC servers to avoid triggering abuse thresholds</li>
  <li>Support "Third party lookup": mapping from IRC users & rooms into Matrix IDs for discovery purposes</li>
  <li>Support rate-limiting membership entries to avoid triggering abuse thresholds</li>
  <li>Require permission of an IRC chanop when plumbing an IRC channel into a Matrix room</li>
  <li>Prevent routing loops by advisory m.room.bridging events</li>
  <li>Better error messages</li>
  <li>Sync chanmode +s correctly</li>
  <li>Fix IPv6 support</li>
</ul>
Next up is automating NickServ login, and generally continuing to make the IRC experience as good as we possibly can.

#### matrix-appservice-slack

Similarly, the Slack bridge has had loads of work. The main changes include:
<ul>
  <li>Ability to dynamically bridge ("plumb") rooms on request</li>
  <li>Add Prometheus monitoring metrics</li>
  <li>Ability to discover slack team tokens via OAuth2</li>
  <li>Sync avatars both ways</li>
</ul>
We're currently looking at shifting over to Slack's RTM (Real Time Messaging) API rather than using webhooks in order to get an even better fit with Slack and support bridging DMs, but the current setup is still very usable. For more details: <a href="https://github.com/matrix-org/matrix-appservice-slack">https://github.com/matrix-org/matrix-appservice-slack</a>.

#### matrix-appservice-gitter

The Gitter bridge has provided a lot of inspiration for the more recent work on the Slack bridge. Right now it provides straightforward bridging into Gitter rooms, albeit proxied via a 'matrixbot' user on the Gitter side. We're currently looking at letting also users authenticate using their Gitter credentials so they are bridged through to their 'real' Gitter user - watch this space. For more details: <a href="https://github.com/matrix-org/matrix-appservice-gitter">https://github.com/matrix-org/matrix-appservice-gitter</a>.

### Community updates

#### matrix-ircd

matrix-ircd is a rewrite of the old PTO project (<a href="http://pto.im">pto.im</a>): a Rust application that turns Matrix into a single great big decentralised IRC network. PTO itself has unfortunately been on hiatus and is rather bitrotted, so Erik from the core Matrix Team picked it up to see if it could be resurrected. This ended up turning into a complete rewrite (switching from mio to tokio etc), and the new project can be found at <a href="https://github.com/matrix-org/matrix-ircd">https://github.com/matrix-org/matrix-ircd</a>.

matrix-ircd really is an incredibly promising way of getting folks onto Matrix, as it exposes the entirety of Matrix as a virtual IRC network. This means that IRC addicts can jack straight into Matrix, talking native IRC from their existing IRC clients - but interacting directly with Matrix rooms as if they were IRC channesls without going through a bridge. Obviously you lose all of the features and semantics which Matrix provides beyond IRC, but this is still a great way to get started.

The project is currently alpha but provides a good functioning base to extend, and Erik's explicitly asking for help from the Rust and Matrix community to fill in all the missing features. If you're interested in helping, please come talk on <a href="https://matrix.to/#/#matrix-ircd:matrix.org">#matrix-ircd:matrix.org</a>!.

#### matrix-appservice-gitter-twisted

Not to be confused with the Node-based <a href="https://github.com/matrix-org/matrix-appservice-gitter">matrix-appservice-gitter</a>, <a href="https://github.com/remram44/matrix-appservice-gitter-twisted">matrix-appservice-gitter-twisted</a> is an entirely separate project written in Python/Twisted by Remram (Remi Rampin) that has the opposite architecture: rather than bridging existing rooms into Matrix, matrix-appservice-gitter-twisted lets you provide your Gitter credentials and acts instead as a Gitter client, bridging your personal view of a Gitter room into a private Matrix room just for you.

This obviously has some major advantages (your actions on Gitter use your real Gitter account rather than a bot), and some disadvantages too (you can't use Matrix features when interacting with other Matrix users in the same room, and the Gitter channel itself is not decentralised into Matrix). However, it's a really cool example of how the other model can work - and within the core team, we've been arguing back and forth for ages now on whether normal bridges or "sidecar" bridges like this one are a more preferable architecture. Thanks to Remram's work we can try both side by side! Go check it out at <a href="https://github.com/remram44/matrix-appservice-gitter-twisted">https://github.com/remram44/matrix-appservice-gitter-twisted</a>.

#### telematrix

Telematrix is Telegram&lt;-&gt;Matrix bridge, written by Sijmen Schoon using python3 and asyncio. Right now it's a fairly early alpha hardcoded to bridge a specific Telegram channel into a specific Matrix room, but it works and in use and could be an excellent base for folks interested in a more comprehensive Matrix/Telegram bridge. Go check it out at <a href="https://github.com/SijmenSchoon/telematrix">https://github.com/SijmenSchoon/telematrix</a>
<img class="aligncenter wp-image-1832" src="/blog/wp-content/uploads/2016/11/telematrix-1024x828.png" alt="telematrix" width="641" height="518" />

#### Ruma

Meanwhile, the Ruma project to write a Matrix homeserver in Rust has been progressing steadily, with more and more checkboxes appearing on the <a href="https://github.com/ruma/ruma/blob/master/STATUS.md">status page</a>, with significant new contributions from mujx and farodin91. The best way to keep track of Ruma is to read Jimmy's excellent <a href="https://ruma.dev/news/">This Week in Ruma</a> updates and of course hang out on <a href="https://matrix.to/#/#ruma:matrix.org">#ruma:matrix.org</a>.

#### NaChat

An entirely new client on the block since the last update is <a href="http://github.com/ralith/nachat">NaChat</a>, written by Ralith. NaChat is a pure cross-platform Qt/C++ desktop client written from the ground up, supporting local history synchronisation, excellent performance, native Qt theming, and generally being a lean and mean Matrix client machine. It's still alpha, but it's easy to build and a lot of fun to play with.

<img class="aligncenter wp-image-1828" src="/blog/wp-content/uploads/2016/11/Screen-Shot-2016-11-12-at-12.01.03-1024x664.png" alt="screen-shot-2016-11-12-at-12-01-03" width="1009" height="654" />

Please give a spin, encourage Ralith to finish the <a href="https://github.com/ralith/nachat/tree/timeline-view-rewrite">timeline-view-rewrite</a> branch (which is probably the one you want to be running!), and come hang out on <a href="https://matrix.to/#/#nachat:matrix.org">#nachat:matrix.org</a>.

#### Quaternion

Meanwhile, the <a href="https://github.com/fxrh/quaternion">Quaternion</a> Qt/QML desktop client and its <a href="https://github.com/fxrh/libqmatrixclient">libqmatrixclient</a> library has been making sure and steady progress, with fxrh, kitsune, maralorn and others working away at it. The difference with NaChat here is using QML rather than native Qt widgets, and a focus on more advanced UX features like a custom infinite-scrolling scrollbar widget, unread message notifications, and read-up-to markers.  Recent developments include the <a href="https://github.com/Fxrh/Quaternion/releases/tag/v0.0.1">first official release (0.0.1)</a> on Sept 12, official Windows builds, lots of work on implementing better Read-up-to Markers, scrolling behaviour etc. Again, it's worth keeping a checkout of Quaternion handy and playing with the client - it's loads of fun!

<img class="aligncenter size-large wp-image-1829" src="/blog/wp-content/uploads/2016/11/Screen-Shot-2016-11-12-at-12.12.48-1024x535.png" alt="screen-shot-2016-11-12-at-12-12-48" width="1024" height="535" />

### Google Summer of Code 2016 Retrospective

The summer is long gone now, and along with it Google Summer of Code. This was the first year we've <a href="https://summerofcode.withgoogle.com/archive/2016/organizations/6552738187968512/">participated in GSoC</a>, and it was an incredible experience - both judging all the applications, and then working with Aviral Dasgupta and Will Hunt (Half-Shot) who joined the core team as part of their GSoC endeavours.

Aviral's work has been widespread throughout Riot (now Element): adding consistent Emoji support throughout the app via Emoji One, implementing the beta Rich Text Editor (RTE) and all-new autocompletion UI, as well as a bunch of spec proposals for rich message semantics and an initial Slack Webhooks application service. You can read his wrap up at <a href="http://www.aviraldg.com/p/gsoc-2016-wrapup">http://www.aviraldg.com/p/gsoc-2016-wrapup</a> and use the code in Riot/Web (now Element) today. We're currently working on fixing the final issues on RTE and auto-complete and hope to enable them by default real soon now!

Meanwhile, Half-Shot's work ended up focusing on bridging through to Twitter and working on the Threading spec proposal for Matrix. You can find out all about the Twitter bridge at <a href="https://half-shot.github.io/matrix-appservice-twitter">https://half-shot.github.io/matrix-appservice-twitter</a>; it works incredibly well (arguably too well, given the amount of traffic it can bridge into Matrix! :S) - and we're currently working on hosting a version of it on matrix.org for all your tweeting needs. You can see Half-Shot's wrapup blog post over at <a href="https://half-shot.uk/gsoc16_evaulation">https://half-shot.uk/gsoc16_evaulation</a>.

Finally, as a bit of a wildcard, we discovered the other day that there was also another GSoC project using Matrix by Waqee Khalid, supported by the <a href="https://summerofcode.withgoogle.com/archive/2016/organizations/6488734048452608/">Berkman Center for Internet and Society</a> at Harvard to <a href="https://summerofcode.withgoogle.com/archive/2016/projects/5749069813121024/">switch Apache Wave (formerly Google Wave) over to using Matrix rather than XMPP</a> for federation!  The implementation looks a little curious here, as Wave used XMPP as a blunt pubsub layer for synchronising protobuf deltas - and it looks like this implementation uses Matrix similarly, thus killing any interop with the rest of Matrix, which is a bit of a shame.  If anyone knows more about the project we'd love to hear though!

Either way, it's been a pleasure to work with the GSoC community and we owe Aviral and Half-Shot (and Waqee!) a huge debt of gratitude for spending their summers (and more!) hacking away improving Matrix. So, thanks Google for making GSoC possible and thanks to the GSoCers for all their contributions, effort & enthusiasm! Watch this space for updates on RTE, new-autocomplete and the twitter bridge going live...

### Matrix in the news

Just in case you missed them, there have been a couple of high profile articles flying around about Matrix recently - we made the <a href="http://www.linux-magazine.com/Issues/2016/189/Matrix">front cover of Linux Magazine in August</a> with a comprehensive review of Matrix and Vector (now Riot (now Element)). Then when we launched Riot (now Element) itself we got a cautiously <a href="https://techcrunch.com/2016/09/19/riot-wants-to-be-like-slack-but-with-the-flexibility-of-an-underlying-open-source-platform/">positive write-up from Mike Butcher at Techcrunch</a>. We also wrote an guest column for Techcrunch about the <a href="https://techcrunch.com/2016/10/09/a-decentralized-web-would-give-power-back-to-the-people-online/">importance of bringing power back to the people via decentralisation</a>, which got a surprising amount of attention on <a href="https://news.ycombinator.com/item?id=12670958">HackerNews</a> and elsewhere.

More recently, we were lucky enough to get an <a href="https://www.youtube.com/watch?v=LhCfI-xdvlE">indepth video interview with Bryan Lunduke</a> as part of his 'Linux & Whatnot' series, and also a <a href="http://www.networkworld.com/article/3140014/open-source-tools/down-the-rabbit-hole-part-5-secure-and-private-instant-messaging.html#tk.twt_nww.">write-up in NetworkWorld</a> alongside Signal & Wire as part of Bryan's journeys in the land of encrypted messaging.

<a href="https://www.youtube.com/watch?v=LhCfI-xdvlE"><img class="aligncenter wp-image-1830 size-large" src="/blog/wp-content/uploads/2016/11/Screen-Shot-2016-11-12-at-12.31.34-1024x571.png" alt="screen-shot-2016-11-12-at-12-31-34" width="1024" height="571" /></a>

Huge thanks to everyone who's been nice enough to spread the word of Matrix!

### Matrix In Real Life

Finally, we've been present at a slew of different events. In August we attended FOSSCON again in Philadelphia to give a general update on Matrix to the Freenode community...

> <p dir="ltr" lang="en">It's <a href="https://twitter.com/fossconNE">@fossconNE</a> time! Dave will be talking about Matrix at 1pm today. Come & say hi! <a href="https://t.co/KtfTVRnAVn">pic.twitter.com/KtfTVRnAVn</a></p>
>
> — Matrix (@matrixdotorg) <a href="https://twitter.com/matrixdotorg/status/766998104369426432">August 20, 2016</a>

...and then Riot (now Element) was launched at Monage in Boston in September, with Matthew and Amandine respectively presenting Matrix and Riot (now Element):

> <p dir="ltr" lang="en">Best <a href="https://twitter.com/hashtag/swag?src=hash">#swag</a> of <a href="https://twitter.com/hashtag/MoNage?src=hash">#MoNage</a>? The <a href="https://twitter.com/RiotChat">@RiotChat</a> stand is getting mobbed :) <a href="https://t.co/NltlfO74Y9">pic.twitter.com/NltlfO74Y9</a></p>
>
> — Oisin Lunny (@oisinlunny) <a href="https://twitter.com/oisinlunny/status/778293579605213185">September 20, 2016</a>

Whilst quite a small event, the quality of folks present was incredibly high - much fun was had comparing open communities to walled gardens with Nicola Greco from Tim Berners-Lee's <a href="http://solid.mit.edu">Solid project</a>...

> <p dir="ltr" lang="en">.<a href="https://twitter.com/ara4n">@ara4n</a> & <a href="https://twitter.com/AmandineLePape">@AmandineLePape</a> showing off the new Riot (now Element) at <a href="https://twitter.com/hashtag/MoNage?src=hash">#MoNage</a> in <a href="https://twitter.com/hashtag/Boston?src=hash">#Boston</a>! <a href="https://t.co/U0qSNjNLGs">pic.twitter.com/U0qSNjNLGs</a></p>
>
> — Riot (@RiotChat) <a href="https://twitter.com/RiotChat/status/778610558983634945">September 21, 2016</a>

...comparing notes with the founders of ICQ, hanging out with Alan from Wire...

> <p dir="ltr" lang="en">A meeting of the messaging minds! <a href="https://twitter.com/wire">@Wire</a> and <a href="https://twitter.com/matrixdotorg">@matrixdotorg</a> federating over a pint at <a href="https://twitter.com/hashtag/MoNage?src=hash">#MoNage</a>. <a href="https://t.co/uTUvWrKRqp">pic.twitter.com/uTUvWrKRqp</a></p>
>
> — Oisin Lunny (@oisinlunny) <a href="https://twitter.com/oisinlunny/status/778731058170736640">September 21, 2016</a>

...chatting to FireChat's CTO, catching up with Dan York from the Internet Society, etc.

Then in October we spoke about scaling Python/Twisted for Matrix at PyCon France in Rennes - this was really fun, albeit slightly embarrassing to be the only talk about Python/Twisted in a track otherwise entirely about Python 3 and asyncio :D That said, the talk seemed to be well received and it was fantastic to meet some of the enthusiastic French Python community and see folks in the audience who were already up and running on Matrix!

> <p dir="ltr" lang="en">Lots of fun at <a href="https://twitter.com/pyconfr">@pyconfr</a> today demoing Matrix, including a quick video conference with the audience & <a href="https://twitter.com/hashtag/TADHack?src=hash">#TADHack</a> London! <a href="https://t.co/rwbA43X7wB">pic.twitter.com/rwbA43X7wB</a></p>
>
> — Matrix (@matrixdotorg) <a href="https://twitter.com/matrixdotorg/status/787332779264602112">October 15, 2016</a>

The same weekend also featured TADHack Global - we were present at the London site; you can read all about it in our <a href="/blog/2016/10/20/tadhack-global-2016/">earlier blog post</a>. There was a really high standard of hacks on Matrix this year, and it was incredibly hard to judge the hackathon. In most ways this is a good problem to have though!

> <p dir="ltr" lang="en">Dramatic prep for <a href="https://twitter.com/maffydub">@maffydub</a> and yinyee's Matrix IoT demo with multiple ESP8266, proximity sensor, and <a href="https://twitter.com/Tropo">@tropo</a> ASR!! <a href="https://t.co/eytG8QWFq6">pic.twitter.com/eytG8QWFq6</a></p>
>
> — Matrix (@matrixdotorg) <a href="https://twitter.com/matrixdotorg/status/787639861696139264">October 16, 2016</a>

Meanwhile, coming up on the horizon we have TADSummit in Lisbon next week, where we'll be giving an update on Matrix to the global Telco Application Developer community, and then the week after we'll be in Israel as part of the Geektime Techfest, Devfest and Chatbot Summit. So if you're in Lisbon or Tel Aviv do give us a ping on Matrix and come hang out!

### Matrixing for fun and profit

If you've read this far, we're guessing you're hopefully quite interested in Matrix (or just skipping to the end ;).  Something we don't talk about as much as we should is that if you're interested in being paid to work on Matrix full time, we're always interested in expanding the core team.  Right now we're particularly looking for:
<ul>
  <li>Experienced front-end developers who can help build the next generation of matrix-react-sdk and vector-web</li>
  <li>Professional tech-writers to help keep <a href="/docs/spec">The Spec</a> and tutorials and other docs updated and as kick-ass as possible</li>
  <li>Backend Python/Twisted or Golang wizards to help us improve and evolve Synapse</li>
  <li>Mobile developers (especially Android) to help keep the mobile SDKs and apps evolving as quickly as possible</li>
  <li>Integration fiends who'd like to be paid to build more bridges, bots and other integrations for the overall ecosystem!</li>
</ul>
Most of the core team hangs out in London or Rennes (France), but we're also open to remote folks where it makes sense.  If this sounds interesting, please shoot us a mail to jobs@matrix.org.  Obviously it helps enormously if we already know you from the Matrix community, and you have a proven FOSS track record.

### Conclusion

Apologies once again for an overdue and overlong update, but hopefully this gives a good taste of how Matrix is progressing. Just to give a different datapoint: this graph is quite interesting - showing the volume of events per day sent by native (i.e. non-bridged) Matrix users visible to the matrix.org homeserver since we turned the service on back in 2014:

<img class="aligncenter wp-image-1833" src="/blog/wp-content/uploads/2016/11/Screen-Shot-2016-11-04-at-11.02.58-1-1024x778.png" alt="screen-shot-2016-11-04-at-11-02-58-1" width="958" height="728" />

As you can see, things are accelerating quite nicely - and this is ignoring all the traffic in the rest of the Matrix ecosystem that happens not to be federated onto the matrix.org HS, not to mention the *huge* amounts of traffic due to bridging.

Our plans over the next few months are going to involve:
<ul>
  <li>Turning on end-to-end encryption by default for any rooms with private history - whilst ensuring it's as easy to write Matrix clients, bots and bridges as it ever was.</li>
  <li>Yet more scalability and performance work across the board, to ensure Synapse and the client SDKs can handle the growth curve we're seeing here</li>
  <li>Releasing 0.3.0 of the matrix spec itself.</li>
  <li>Making Riot (now Element)'s UX excellent.</li>
  <li>Editable messages.</li>
  <li>Threading.</li>
  <li>User groups, for applying permissions/invites etc to groups of users as well as individuals.</li>
  <li>Formalising the federation spec at last</li>
  <li>As many bots, bridges and other integrations as possible!</li>
  <li>Making VoIP/Video conferencing and calling awesome.</li>
  <li>More experiments with next-generation homeservers</li>
  <li>Starting to really think hard about decentralised identity and reputation/spam management</li>
  <li>...and a few new things we don't want to talk about yet ;)</li>
</ul>
If you've got this far - congratulations! Thanks for reading, and thank you for supporting the Matrix ecosystem.

Now more than ever before we believe that it is absolutely critical to have a healthy and secure decentralised communications ecosystem on the 'net (whether that's Matrix, XMPP, Tox or whatever) - so thank you again for participating in our one :)  And if you don't already run your server, please <a href="https://github.com/matrix-org/synapse">grab a Synapse</a> and have fun!

- Matthew, Amandine & the Matrix Team.
