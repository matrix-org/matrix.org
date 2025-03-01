+++
title = "The Matrix Summer Special!!"
path = "/blog/2016/07/04/the-matrix-summer-special"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "GSOC"]
+++

Hi folks - another few months have gone by and once again the core Matrix team has ended up too busy hacking away on the final missing pieces of the Matrix jigsaw puzzle to have been properly updating the blog; sorry about this. The end is in sight for the current crunch however, and we expect to return to regular blog updates shortly! Meanwhile, rather than letting news stack up any further, here's a quick(?) attempt to summarise all the things which have been going on!

### Synapse 0.16.1 released

This one's a biggy: in the mad rush during June to support the public debut for <a href="https://vector.im">Vector</a>, we made a series of major <a href="https://github.com/matrix-org/synapse">Synapse</a> releases which apparently we forgot to tell anyone about (sorry!). The full changelog is at the bottom of the post as it's huge, but the big features are:
<ul>
  <li>Huge performance improvements, including adding write-thru event caches and improving caching throughout, and massive improvements to the speed of the room directory API.</li>
  <li>Add support for inline URL previewing!</li>
  <li>Add email notifications!</li>
  <li>Add support for LDAP authentication (thanks to Christoph Witzany)</li>
  <li>Add support for JWT authentication (thanks to Niklas Riekenbrauck)</li>
  <li>Add basic server-side ignore functionality and abuse reporting API</li>
  <li>Add ability to delegate /publicRooms API requests to a list of secondary homeservers</li>
  <li>Lots and lots and lots of bug fixes.</li>
</ul>
If you haven't upgraded, please do asap from <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>!

There's also been a huge amount of work going on behind the scenes on horizontal scalability for Synapse.  We haven't drawn much attention to this yet (or documented it) as it's still quite experimental and in flux, but the main change is to add the concept of application-layer replication to Synapse - letting you split the codebase into multiple endpoints which can then be run in parallel, each replicating their state off the master synapse process.  For instance, right now the Matrix.org homeserver is actually running off three different processes: the main synapse; another specific to calculating push notifications and another specific to serving up the /sync endpoint.  These three are then abstracted behind the <a href="https://github.com/matrix-org/dendron">dendron</a> layer (which also implements the /login endpoint). The idea is that one can then run multiple instances of the /sync and pusher (and other future) endpoints to horizontally scale.  For now, they share a single database writer, but in practice this has improved our scalability and performance on the Matrix.org HS radically.

In future we'll actually document how to run these, as well as making it easy to spin up multiple concurrent instances - in the interim if you find you're hitting performance limits running high-traffic synapses come talk to us about it on <a href="https://matrix.to/#/#matrix-dev:matrix.org">#matrix-dev:matrix.org</a>.  And the longer term plan continues to be to switch out these python endpoint implementations in future for more efficient implementations.  For instance, there's a golang implementation of the media repository currently in development which could run as another endpoint cluster.

### Vector released

<a href="https://medium.com/@Vector/2d33b23a787">Much has been written</a> about this <a href="https://news.ycombinator.com/item?id=11871527">elsewhere</a>, but Web, iOS and Android versions of the <a href="https://www.vector.im">Vector</a> clients were finally released to the general public on June 9th at the <a href="http://www.decentralizedweb.net/">Decentralised Web Summit</a> in San Francisco.  Vector is a relatively thin layer on top of the <a href="https://github.com/matrix-org/matrix-react-sdk">matrix-react-sdk</a>, <a href="https://github.com/matrix-org/matrix-ios-sdk">matrix-ios-sdk</a> and <a href="https://github.com/matrix-org/matrix-android-sdk">matrix-android-sdk</a> Matrix.org client SDKs which showcases Matrix's collaboration and messaging capabilities in a mass-market usable app.  There's been huge amounts of work here across the SDKs for the 3 platforms, with literally thousands of issues resolved.  You can find the full SDK changelogs on github for <a href="https://github.com/matrix-org/matrix-react-sdk/blob/master/CHANGELOG.md">React</a>, <a href="https://github.com/matrix-org/matrix-ios-kit/blob/master/CHANGES.rst">iOS</a> and <a href="https://github.com/matrix-org/matrix-android-sdk/blob/master/CHANGES.rst">Android</a>.  Some of the more interesting recent additions to Vector include improved room notifications, URL previews, configurable email notifications, and huge amounts of performance stability work.

Future work on Vector is focused on showcasing end-to-end encryption, providing a one-click interface for adding bots/integrations & bridges to a room, and generally enormously improving the UX and polish.  Meanwhile, there's an F-Droid release for Android landing <a href="https://f-droid.org/repository/browse/?fdid=im.vector.alpha">any day now</a>.

If you haven't checked it out recently, it's really worth a look :)

<a href="https://vector.im"><img class="aligncenter size-large wp-image-1658" src="/blog/wp-content/uploads/2016/07/Screen-Shot-2016-07-04-at-12.18.10-1024x591.png" alt="Vector" width="1024" height="591" /></a>

### Matrix Spec 0.1.0

In case you didn't notice, we also released <a href="http://matrix.org/docs/spec/">v0.1.0 of the Matrix spec</a> itself in May - this is a fairly minor update which improves the layout of the document somewhat (thanks to a PR from Jimmy Cuadra) and a some bugfixes.  You can see the <a href="http://matrix.org/docs/spec/client_server/r0.1.0.html#changelog">full changelog here</a>. We're overdue a new release since then (albeit again with relatively minor changes).

### Google Summer of Code

We're in the middle of the second half of GSoC right now, with our GSoC students Aviral and Half-Shot hacking away on Vector and Microblogging projects respectively.  There's a lot of exciting stuff coming out of this - Aviral contributing Rich Text Editing, Emoji autocompletion, DuckDuckGo and other features into Vector (currently on branches, but will be released soon) and Half-Shot building a Twitter bridge as part of his Matrix-powered microblogging system.  Watch this space for updates!

### Ruma

Lots of exciting stuff has been happening recently over at <a href="https://ruma.dev/">Ruma.io</a> - an independent Matrix homeserver implementation written in Rust.  Over the last few weeks Jimmy and friends have got into the real meat of implementing e<a href="https://github.com/ruma/ruma/commit/8a2fe269196dfd5b629c6e301e8d78e19ae6d279">vents</a> and the core of the Matrix CS API, and as of the time of writing they're the <a href="https://news.ycombinator.com/item?id=12028475">topmost link</a> on HackerNews!  There's a lot of work involved in writing a homeserver, but Ruma is looking incredibly promising and the feedback from their team has been incredibly helpful in keeping us honest on the Matrix spec and ensuring that it's fit for purpose for 3rd party server implementers.

Also, Ruma just released some <a href="https://ruma.dev/docs/matrix">truly excellent documentation</a> as a high-level introduction to Matrix (thanks to Leah and Jimmy) - much better than anything we have on the official Matrix.org site.  Go check it out if you haven't already!

### End to End Encryption

There has been *LOADS* of work happening on End to End encryption: finalising the core 1:1 "<a href="/git/olm">Olm</a>" cryptographic ratchet; implementing the group "<a href="http://matrix.org/git/olm/tree/src/megolm.c">Megolm</a>" ratchet (which shares a single ratchet over all the participants of a room for scalability); fully hooking Olm into matrix-js-sdk and Vector-web at last, and preparing for a formal and published-to-the-public 3rd party security audit on Olm which will be happening during July.

This deserves a post in its own right, but the key thing to know is that Olm is almost ready - and indeed the work-in-progress E2E UX is even available on the <a href="https://vector.im/develop">develop branch of vector</a> if you enable E2E in the new 'Labs' section in User Settings.  Olm itself is usable only for 'burn after reading' strictly PFS messages, but Megolm integration with Vector & Synapse will follow shortly afterwards which will finally provide the E2E nirvana we've all been waiting for :)

### Decentralised Web Summit

Matrix had a major presence as a sponsor at the first ever <a href="http://www.decentralizedweb.net/">Decentralised Web Summit</a> hosted by the Internet Archive in San Francisco back in June.  This was a truly incredible event - with folks gathering from across the world to discuss, collaborate and debate on ensure that the web is not fragmented or trapped into proprietary silos - with the likes of Tim Berners-Lee, Vint Cerf and Brewster Kahle in attendance.  We ran a long 2 hour workshop on Matrix and showed off Vector to anyone and everyone - and meanwhile the organisers were kind enough to promote Matrix as the main decentralised chat interface for the conference itself (bridged with their Slack).  A full writeup of the conference really merits a blog post in its own right, but the punchline is that you could genuinely tell that this is the beginning of a new era of the internet - whether it's using Merkle DAGs (like Matrix) or Blockchain or similar technologies: we are about to see a major shift in the balance of power on the internet back towards its users.

We strongly recommend checking out the videos which have all been published at <a href="http://www.decentralizedweb.net/">Decentralised Web Summit</a>, including <a href="https://archive.org/details/DWebSummit2016_Lightning_Talks_Session_B">lightning talks introducing both Matrix and Vector</a>, and digging into as many of the projects advertised as possible.  It was particularly interesting for us to get to know Tim Berners-Lee's latest project at MIT: <a href="https://solid.mit.edu/">Solid</a> - which shares quite a lot of the same goals as Matrix, and subsequently seeing Tim pop up on <a href="https://vector.im/develop/#/room/#decentralizedweb-general:matrix.org/$146549767249761pyAQF:matrix.org">Matrix via Vector</a>.  We're really looking forward to working out how Matrix & Solid can complement each other in future.

<a href="https://twitter.com/parkan/status/740324969884700672"><img class="aligncenter wp-image-1660 size-large" src="/blog/wp-content/uploads/2016/07/timbl-768x1024.jpg" alt="Matthew, Tim Berners-Lee and Matrix" width="384" height="512" /></a>

### Matrix.to

Not the most exciting thing ever, but heads up that there's a simple site up at <a href="https://matrix.to">https://matrix.to</a> to provide a way of doing client-agnostic links to content in Matrix.  For instance, rather than linking specifically into an app like Vector, you can now say <a href="https://matrix.to/#/#matrix:matrix.org">https://matrix.to/#/#matrix:matrix.org</a> to go there via whatever app you choose.  This is basically a bootstrapping process towards having proper mx:// URLs in circulation, but given mx:// doesn't exist yet, <https://matrix.to> hopefully provides a useful step in the right direction :)

PRs very welcome at <a href="https://github.com/matrix-org/matrix.to">https://github.com/matrix-org/matrix.to</a>.

### Bridges and Bots

Much of the promise of Matrix is the ability to bridge through to other silos, and we've been gradually adding more and more bridging capabilities in.

For instance, the <a href="https://github.com/matrix-org/matrix-appservice-irc">IRC bridge</a> has had a complete overhaul to add in huge numbers of new features and finally deployed for Freenode a few weeks ago:

New Features:
<ul>
  <li>Nicks set via <code>!nick</code> will now be preserved across bridge restarts.</li>
  <li>EXPERIMENTAL: IRC clients created by the bridge can be assigned their own IPv6 address.</li>
  <li>The bridge will now send connection status information to real Matrix users via the admin room (the same room <code>!nick</code>commands are issued).</li>
  <li>Added <code>!help</code>.</li>
  <li>The bridge will now fallback to <code>body</code> if the HTML content contains <em>any</em> unrecognised tags. This makes passing Markdown from Matrix to IRC much nicer.</li>
  <li>The bridge will now send more metrics to the statsd server, including the join/part rate to and from IRC.</li>
  <li>The config option <code>matrixClients.displayName</code> is now implemented.</li>
</ul>
Bug fixes:
<ul>
  <li>Escape HTML entities when sending from IRC to Matrix. This prevents munging occurring between IRC formatting and textual &lt; element &gt; references, whereby if you sent a tag and some colour codes from IRC it would not escape the tag and therefore send invalid HTML to Matrix.</li>
  <li>User IDs starting with <code>-</code> are temporarily filtered out from being bridged.</li>
  <li>Deterministically generate the configuration file.</li>
  <li>Recognise more IRC error codes as non-fatal to avoid IRC clients reconnecting unnecessarily.</li>
  <li>Add a 10 second timeout to join events injected via the <code>MemberListSyncer</code> to avoid HOL blocking.</li>
  <li>'Frontier' Matrix users will be forcibly joined to IRC channels even if membership list syncing I-&gt;M is disabled. This ensures that there is always a Matrix user in the channel being bridged to avoid losing traffic.</li>
  <li>Cache the <code>/initialSync</code> request to avoid hitting this endpoint more than once, as it may be very slow.</li>
  <li>Indexes have been added to the NeDB .db files to improve lookup times.</li>
  <li>Do not recheck if the bridge bot should part the channel if a virtual user leaves the channel: we know it shouldn't.</li>
  <li>Refine what counts as a "request" for metrics, reducing the amount of double-counting as requests echo back from the remote side.</li>
  <li>Fixed a bug which caused users to be provisioned off their <code>user_id</code> even if they had a display name set.</li>
</ul>
Meanwhile, a <a href="https://github.com/matrix-org/matrix-appservice-gitter">Gitter bridge</a> is in active development (and in testing with the Neovim community on Gitter/Matrix/Freenode), although lacking documentation so far.

Finally, <a href="https://github.com/matrix-org/Matrix-NEB">NEB</a> - the Matrix.org bot framework is currently being ported from Python to Golang to act as a general Go SDK for rapidly implementing new bot capabilities.

There's little point in all of the effort going into bridges and bots if it's too hard for normal users to deploy them, so on the Vector side of things there's an ongoing project to build a commercial-grade bot/bridge hosted service offering for Matrix which should make it *much* easier for non-sysadmins to quickly add their own bots and bridges into their rooms.  There's nothing to see yet, but we'll be yelling about it when it's ready!

### Conclusion

I'm sure there's a lot of stuff missing from the quick summary above - suffice it to say that the Matrix ecosystem is growing so fast and so large that it's pretty hard to keep track of everything that's going on.  The big remaining blockers we see at this point are:
<ul>
  <li>End-to-end Encryption roll-out</li>
  <li>Polishing UX on Vector - showing that it's possible to build better-than-Slack quality UX on top of Matrix</li>
  <li>Bots, Integrations and Bridges - making them absolutely trivial to build and deploy, and encouraging everyone to write as many as they can!</li>
  <li>Improving VoIP, especially for conferencing, especially on Mobile</li>
  <li>Threading</li>
  <li>Editable messages</li>
  <li>Synapse scaling and stability - this is massively improved, but there's still work to be done.  Meanwhile projects like <a href="https://ruma.dev/">Ruma</a> give us hope for light at the end of the Synapse tunnel!</li>
  <li>Spec refinements - there are still a <a href="/jira/browse/SPEC">lot of open spec bugs</a> which we need to resolve so we can declare the spec (and thus Matrix!) out of beta.</li>
  <li>More clients - especially desktop ones; helping out with <a href="https://github.com/Fxrh/Quaternion">Quaternion</a>, <a href="https://github.com/davidar/tensor">Tensor</a>, <a href="https://pto.im">PTO</a>, etc.</li>
</ul>
...and then all the pieces of the jigsaw will finally be in place, and Matrix should hopefully fulfil its potential as an invaluable, open and decentralised data fabric for the web.

Thanks, once again, to everyone who's been supporting and using Matrix - whether it's by hanging out in the public chatrooms, running your own server, writing your own clients, bots, or servers, or just telling your friends about the project.  The end of the beginning is in sight: thanks for believing in us, and thank you for flying Matrix.

Matthew, Amandine & the Matrix Team.

### Appendix: The Missing Synapse Changelogs

### Changes in synapse v0.16.1 (2016-06-20)

Bug fixes:
<ul>
  <li>Fix assorted bugs in <code>/preview_url</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/872" data-url="https://github.com/matrix-org/synapse/issues/872" data-id="160459814" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#872</a>)</li>
  <li>Fix TypeError when setting unicode passwords (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/873" data-url="https://github.com/matrix-org/synapse/issues/873" data-id="160576835" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#873</a>)</li>
</ul>
Performance improvements:
<ul>
  <li>Turn <code>use_frozen_events</code> off by default (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/877" data-url="https://github.com/matrix-org/synapse/issues/877" data-id="160897209" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#877</a>)</li>
  <li>Disable responding with canonical json for federation (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/878" data-url="https://github.com/matrix-org/synapse/issues/878" data-id="160910639" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#878</a>)</li>
</ul>

### Changes in synapse v0.16.1-rc1 (2016-06-15)

Features: None

Changes:
<ul>
  <li>Log requester for <code>/publicRoom</code> endpoints when possible (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/856" data-url="https://github.com/matrix-org/synapse/issues/856" data-id="159162802" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#856</a>)</li>
  <li>502 on <code>/thumbnail</code> when can't connect to remote server (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/862" data-url="https://github.com/matrix-org/synapse/issues/862" data-id="159375931" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#862</a>)</li>
  <li>Linearize fetching of gaps on incoming events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/871" data-url="https://github.com/matrix-org/synapse/issues/871" data-id="160433511" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#871</a>)</li>
</ul>
Bugs fixes:
<ul>
  <li>Fix bug where rooms where marked as published by default (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/857" data-url="https://github.com/matrix-org/synapse/issues/857" data-id="159171952" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#857</a>)</li>
  <li>Fix bug where joining room with an event with invalid sender (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/868" data-url="https://github.com/matrix-org/synapse/issues/868" data-id="160169477" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#868</a>)</li>
  <li>Fix bug where backfilled events were sent down sync streams (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/869" data-url="https://github.com/matrix-org/synapse/issues/869" data-id="160383501" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#869</a>)</li>
  <li>Fix bug where outgoing connections could wedge indefinitely, causing push notifications to be unreliable (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/870" data-url="https://github.com/matrix-org/synapse/issues/870" data-id="160388703" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#870</a>)</li>
</ul>
Performance improvements:
<ul>
  <li>Improve <code>/publicRooms</code> performance (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/859" data-url="https://github.com/matrix-org/synapse/issues/859" data-id="159188459" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#859</a>)</li>
</ul>

### Changes in synapse v0.16.0 (2016-06-09)

NB: As of v0.14 all AS config files must have an ID field.

Bug fixes:
<ul>
  <li>Don't make rooms published by default (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/857" data-url="https://github.com/matrix-org/synapse/issues/857" data-id="159171952" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#857</a>)</li>
</ul>

### Changes in synapse v0.16.0-rc2 (2016-06-08)

Features:
<ul>
  <li>Add configuration option for tuning GC via <code>gc.set_threshold</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/849" data-url="https://github.com/matrix-org/synapse/issues/849" data-id="158942313" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#849</a>)</li>
</ul>
Changes:
<ul>
  <li>Record metrics about GC (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/771" data-url="https://github.com/matrix-org/synapse/issues/771" data-id="153734745" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#771</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/847" data-url="https://github.com/matrix-org/synapse/issues/847" data-id="158911645" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#847</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/852" data-url="https://github.com/matrix-org/synapse/issues/852" data-id="158961878" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#852</a>)</li>
  <li>Add metric counter for number of persisted events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/841" data-url="https://github.com/matrix-org/synapse/issues/841" data-id="158673436" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#841</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix 'From' header in email notifications (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/843" data-url="https://github.com/matrix-org/synapse/issues/843" data-id="158692541" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#843</a>)</li>
  <li>Fix presence where timeouts were not being fired for the first 8h after restarts (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/842" data-url="https://github.com/matrix-org/synapse/issues/842" data-id="158689045" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#842</a>)</li>
  <li>Fix bug where synapse sent malformed transactions to AS's when retrying transactions (Commits<a class="commit-link" href="https://github.com/matrix-org/synapse/commit/310197bab5cf8ed2c26fae522f15f092dbcdff58"><tt>310197b</tt></a>, <a class="commit-link" href="https://github.com/matrix-org/synapse/commit/84379062f9ec259abc302af321d4ed8f5a958c01"><tt>8437906</tt></a>)</li>
</ul>
Performance Improvements:
<ul>
  <li>Remove event fetching from DB threads (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/835" data-url="https://github.com/matrix-org/synapse/issues/835" data-id="158404359" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#835</a>)</li>
  <li>Change the way we cache events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/836" data-url="https://github.com/matrix-org/synapse/issues/836" data-id="158410030" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#836</a>)</li>
  <li>Add events to cache when we persist them (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/840" data-url="https://github.com/matrix-org/synapse/issues/840" data-id="158647785" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#840</a>)</li>
</ul>

### Changes in synapse v0.16.0-rc1 (2016-06-03)

Version 0.15 was not released. See v0.15.0-rc1 below for additional changes.

Features:
<ul>
  <li>Add email notifications for missed messages (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/759" data-url="https://github.com/matrix-org/synapse/issues/759" data-id="151860508" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#759</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/786" data-url="https://github.com/matrix-org/synapse/issues/786" data-id="155084975" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#786</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/799" data-url="https://github.com/matrix-org/synapse/issues/799" data-id="156336186" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#799</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/810" data-url="https://github.com/matrix-org/synapse/issues/810" data-id="157876958" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#810</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/815" data-url="https://github.com/matrix-org/synapse/issues/815" data-id="158088266" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#815</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/821" data-url="https://github.com/matrix-org/synapse/issues/821" data-id="158184002" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#821</a>)</li>
  <li>Add a <code>url_preview_ip_range_whitelist</code> config param (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/760" data-url="https://github.com/matrix-org/synapse/issues/760" data-id="152195317" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#760</a>)</li>
  <li>Add /report endpoint (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/762" data-url="https://github.com/matrix-org/synapse/issues/762" data-id="152983097" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#762</a>)</li>
  <li>Add basic ignore user API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/763" data-url="https://github.com/matrix-org/synapse/issues/763" data-id="153078662" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#763</a>)</li>
  <li>Add an openidish mechanism for proving that you own a given user_id (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/765" data-url="https://github.com/matrix-org/synapse/issues/765" data-id="153225023" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#765</a>)</li>
  <li>Allow clients to specify a server_name to avoid 'No known servers' (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/794" data-url="https://github.com/matrix-org/synapse/issues/794" data-id="155729287" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#794</a>)</li>
  <li>Add secondary_directory_servers option to fetch room list from other servers (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/808" data-url="https://github.com/matrix-org/synapse/issues/808" data-id="157727869" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#808</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/813" data-url="https://github.com/matrix-org/synapse/issues/813" data-id="157957443" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#813</a>)</li>
</ul>
Changes:
<ul>
  <li>Report per request metrics for all of the things using request_handler (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/756" data-url="https://github.com/matrix-org/synapse/issues/756" data-id="151597373" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#756</a>)</li>
  <li>Correctly handle <code>NULL</code> password hashes from the database (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/775" data-url="https://github.com/matrix-org/synapse/issues/775" data-id="154218069" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#775</a>)</li>
  <li>Allow receipts for events we haven't seen in the db (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/784" data-url="https://github.com/matrix-org/synapse/issues/784" data-id="154729615" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#784</a>)</li>
  <li>Make synctl read a cache factor from config file (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/785" data-url="https://github.com/matrix-org/synapse/issues/785" data-id="155061473" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#785</a>)</li>
  <li>Increment badge count per missed convo, not per msg (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/793" data-url="https://github.com/matrix-org/synapse/issues/793" data-id="155472279" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#793</a>)</li>
  <li>Special case m.room.third_party_invite event auth to match invites (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/814" data-url="https://github.com/matrix-org/synapse/issues/814" data-id="158008655" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#814</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix typo in event_auth servlet path (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/757" data-url="https://github.com/matrix-org/synapse/issues/757" data-id="151841944" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#757</a>)</li>
  <li>Fix password reset (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/758" data-url="https://github.com/matrix-org/synapse/issues/758" data-id="151842844" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#758</a>)</li>
</ul>
Performance improvements:
<ul>
  <li>Reduce database inserts when sending transactions (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/767" data-url="https://github.com/matrix-org/synapse/issues/767" data-id="153422719" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#767</a>)</li>
  <li>Queue events by room for persistence (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/768" data-url="https://github.com/matrix-org/synapse/issues/768" data-id="153453122" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#768</a>)</li>
  <li>Add cache to <code>get_user_by_id</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/772" data-url="https://github.com/matrix-org/synapse/issues/772" data-id="153734759" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#772</a>)</li>
  <li>Add and use <code>get_domain_from_id</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/773" data-url="https://github.com/matrix-org/synapse/issues/773" data-id="153737866" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#773</a>)</li>
  <li>Use tree cache for <code>get_linearized_receipts_for_room</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/779" data-url="https://github.com/matrix-org/synapse/issues/779" data-id="154683780" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#779</a>)</li>
  <li>Remove unused indices (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/782" data-url="https://github.com/matrix-org/synapse/issues/782" data-id="154703597" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#782</a>)</li>
  <li>Add caches to <code>bulk_get_push_rules*</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/804" data-url="https://github.com/matrix-org/synapse/issues/804" data-id="157677823" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#804</a>)</li>
  <li>Cache <code>get_event_reference_hashes</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/806" data-url="https://github.com/matrix-org/synapse/issues/806" data-id="157702778" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#806</a>)</li>
  <li>Add <code>get_users_with_read_receipts_in_room</code> cache (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/809" data-url="https://github.com/matrix-org/synapse/issues/809" data-id="157867129" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#809</a>)</li>
  <li>Use state to calculate <code>get_users_in_room</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/811" data-url="https://github.com/matrix-org/synapse/issues/811" data-id="157921429" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#811</a>)</li>
  <li>Load push rules in storage layer so that they get cached (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/825" data-url="https://github.com/matrix-org/synapse/issues/825" data-id="158334922" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#825</a>)</li>
  <li>Make <code>get_joined_hosts_for_room</code> use get_users_in_room (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/828" data-url="https://github.com/matrix-org/synapse/issues/828" data-id="158336691" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#828</a>)</li>
  <li>Poke notifier on next reactor tick (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/829" data-url="https://github.com/matrix-org/synapse/issues/829" data-id="158337243" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#829</a>)</li>
  <li>Change CacheMetrics to be quicker (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/830" data-url="https://github.com/matrix-org/synapse/issues/830" data-id="158337903" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#830</a>)</li>
</ul>

### Changes in synapse v0.15.0-rc1 (2016-04-26)

Features:
<ul>
  <li>Add login support for Javascript Web Tokens, thanks to Niklas Riekenbrauck (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/671" data-url="https://github.com/matrix-org/synapse/issues/671" data-id="144065761" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#671</a>,<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/687" data-url="https://github.com/matrix-org/synapse/issues/687" data-id="145233458" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#687</a>)</li>
  <li>Add URL previewing support (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/688" data-url="https://github.com/matrix-org/synapse/issues/688" data-id="145553608" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#688</a>)</li>
  <li>Add login support for LDAP, thanks to Christoph Witzany (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/701" data-url="https://github.com/matrix-org/synapse/issues/701" data-id="146343240" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#701</a>)</li>
  <li>Add GET endpoint for pushers (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/716" data-url="https://github.com/matrix-org/synapse/issues/716" data-id="147499520" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#716</a>)</li>
</ul>
Changes:
<ul>
  <li>Never notify for member events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/667" data-url="https://github.com/matrix-org/synapse/issues/667" data-id="143242675" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#667</a>)</li>
  <li>Deduplicate identical <code>/sync</code> requests (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/668" data-url="https://github.com/matrix-org/synapse/issues/668" data-id="143315296" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#668</a>)</li>
  <li>Require user to have left room to forget room (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/673" data-url="https://github.com/matrix-org/synapse/issues/673" data-id="144534572" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#673</a>)</li>
  <li>Use DNS cache if within TTL (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/677" data-url="https://github.com/matrix-org/synapse/issues/677" data-id="144834970" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#677</a>)</li>
  <li>Let users see their own leave events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/699" data-url="https://github.com/matrix-org/synapse/issues/699" data-id="146331932" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#699</a>)</li>
  <li>Deduplicate membership changes (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/700" data-url="https://github.com/matrix-org/synapse/issues/700" data-id="146337782" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#700</a>)</li>
  <li>Increase performance of pusher code (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/705" data-url="https://github.com/matrix-org/synapse/issues/705" data-id="146665406" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#705</a>)</li>
  <li>Respond with error status 504 if failed to talk to remote server (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/731" data-url="https://github.com/matrix-org/synapse/issues/731" data-id="148606730" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#731</a>)</li>
  <li>Increase search performance on postgres (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/745" data-url="https://github.com/matrix-org/synapse/issues/745" data-id="150119333" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#745</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix bug where disabling all notifications still resulted in push (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/678" data-url="https://github.com/matrix-org/synapse/issues/678" data-id="144837338" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#678</a>)</li>
  <li>Fix bug where users couldn't reject remote invites if remote refused (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/691" data-url="https://github.com/matrix-org/synapse/issues/691" data-id="145946732" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#691</a>)</li>
  <li>Fix bug where synapse attempted to backfill from itself (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/693" data-url="https://github.com/matrix-org/synapse/issues/693" data-id="145966417" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#693</a>)</li>
  <li>Fix bug where profile information was not correctly added when joining remote rooms (PR <a class="issue-link js-issue-link" title="Set profile information when joining rooms remotely" href="https://github.com/matrix-org/synapse/pull/703" data-id="146548756" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#703</a>)</li>
  <li>Fix bug where register API required incorrect key name for AS registration (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/727" data-url="https://github.com/matrix-org/synapse/issues/727" data-id="148368853" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#727</a>)</li>
</ul>
