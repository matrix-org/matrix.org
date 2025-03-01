+++
title = "Matrix.org status update - July 2017"
path = "/blog/2017/07/19/status-update"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

<p style="text-align: left;">Hi folks,</p>
Thought it was worth giving a quick status update on what's going on since our <a href="/blog/2017/07/07/a-call-to-arms-supporting-matrix/">last blog post</a>, which explained the funding situation Matrix has found itself in.  The TL;DR is that we're still here; things are moving faster than ever (not least as we refocus on getting everything needed to get Matrix funded and sustainable in the longer term), but we still need concrete support from the community (both company sponsorship and personal donations) to ensure things keep going at the current rate.

### Funding Status

So, the good news is that we had a great initial response to last week's call to help - right now we have 199 people signed up on <a href="https://patreon.com/matrixdotorg">Patreon</a> (go on, be the 200th! you know you want to :D), ~30 on <a href="https://liberapay.com/matrixdotorg/">Liberapay</a>, and 14 bitcoin donations.  This sums up to just over $2000/month - which is getting close to our initial Patreon goal of $2500/month to helping support half the cost of the less senior devs working on Matrix. <strong>Endless thanks to everyone who has donated - especially the 19 folks (18 on Patreon, one on Liberapay) who have so generously pledged $50 or more a month!! </strong>Meanwhile, if you're reading this and you haven't pledged support yet - *please* consider heading over to <a href="https://patreon.com/matrixdotorg">Patreon</a> or <a href="https://liberapay.com/matrixdotorg">Liberapay</a> or Bitcoin 1LxowEgsquZ3UPZ68wHf8v2MDZw82dVmAE and helping keep the project running.  Literally every dollar counts.

Meanwhile, while Patreon & friends are headed in the right direction to support one developer, we still have another 10 people working on all the various core components of Matrix itself who need to be supported in the near future.  (We look to be safe for the next month or two, but beyond that we're counting on having solved this problem ;).  <strong>Right now we are hoping that companies who believe in Matrix and/or are building services on top will step up to sponsor development</strong> - as it's pretty obvious that accelerating Dendrite, final E2E, Groups etc will improve professional Matrix-based services immeasurably.  If this sounds like you, please <a href="mailto:matthew@matrix.org">get in touch</a> asap.

We're also able to provide <strong>paid consulting and development (and prioritised development)</strong> services on Matrix (through Vector, the for-profit company responsible for Riot) for large pieces of work - for instance, if you're anxious to see enterprise-focused Matrix features land sooner than later, please <a href="mailto:matthew@matrix.org">reach out</a>.

Exciting news is that we already have one concrete offer of paid consulting work from a very major company who happens to love Matrix, building out Integrations capabilities which should directly benefit the wider Matrix ecosystem - and we also are very proud to announce our very first official corporate sponsor (see the next section for details)!  However, we still have a long way to go, so don't be shy about getting in touch: <strong>we need your support</strong>!

Heads up that we've also started our various reward schemes for supporters - folks donating more than $5 on Patreon will have already heard most of this update in the first episode of the video blog that Amandine & I posted last Friday; and folks donating more than $10 will have heard some of the other details first hand through the broadcast of the global team weekly sync on Monday!  We're still figuring out how to get these rewards over to liberapay & bitcoin supporters (not helped by both services being anonymous...).  We haven't yet opened up the #matrix-supporters:matrix.org room as maintaining the accesslist is effectively blocked on Groups landing.  We also want to use Groups to manage the various lists of supporters around the place, so apologies that we haven't got the lists published yet!

Finally on the funding side of things: we're setting up the Matrix.org Foundation non-profit legal entity this week, letting us accept donations and sponsorship in a way which can directly fund the core developers (more details as we have them).  As soon as it's incorporated, we'll be able to sign up fully on Liberapay to accept donations there.

### Announcing <strong>UpCloud</strong>: our very first official Matrix.org Corporate Sponsor

<a href="https://www.upcloud.com/matrix"><img style="padding: 1em" src="/blog/wp-content/uploads/2017/07/upcloud-logo-horizontal-300x60.png" alt="" width="300" height="60" class="aligncenter size-medium wp-image-2631" /></a>

As hinted above, we're incredibly excited and happy that UpCloud have signed up as our first official corporate sponsor.  UpCloud has already been hosting all of Matrix.org's infrastructure for the last 6 months (no mean feat, given the scale of the Matrix.org synapse & postgres!) - and last week they committed to extend their sponsorship further to help the project out in our time of need.

We've been very impressed with UpCloud's service since migrating over back in February - particularly their spectacularly fast block IO (<b>~350MB/s write, 92,000 IOPS, and over 5GB/s read!!</b>) which is incredibly useful for running a huge synapse deployment like Matrix.org's - and they have a great footprint of datacentres around the world.

They also like Matrix so much that they've written this <a href="https://www.upcloud.com/support/install-matrix-synapse/">great tutorial for getting Synapse up and running on their hosts</a> - and best of all, they have a special $25 discount for anyone in the Matrix community who wishes to use them: check out <a href="https://www.upcloud.com/matrix/">https://www.upcloud.com/matrix/</a> for the details!

We'd like to thank them profusely for being first in line to support us - and we look forward to seeing how far we can push their hardware over the coming months! :D

### Development Status

Finally, loads and loads of stuff is happening on Matrix itself.  The main headlines are:
<ul>
  <li><strong>Groups</strong>.  Work in Synapse and matrix-react-sdk is happening at breakneck speed to get Groups out the door as soon as possible, so we can use them both to support the funding drive and in general to implement one of the most asked-for features of Matrix: the ability to group rooms together into a well-defined community (similar to Slack Teams or Discord Servers etc).  The way Groups work is to let users define groupings of both users and rooms; you can also define a metadata for the group to let you build homepages similar to the one which Riot/Web sprouted a few months ago.  You can then refer to the group of users when inviting/banning/kicking etc - or when managing your own roomlist.  We think it's going to completely change how people use Matrix, and can't wait to see it land on riot.im/develop, although it's still a few weeks away.</li>
  <li><strong>E2E Crypto</strong>.  We have three main things remaining here, after which E2E should be much much more usable for day-to-day purposes:
<ol>
  <li>Fixing the matrix-js-sdk to store crypto state in indexeddb rather than localstorage, to prevent multiple browser tabs racing and corrupting localstorage (which provides no locking mechanism).  This turns out to be much more of an epic than we thought, as indexeddb's APIs are all strictly async, resulting in a whole bunch of previously synchronous APIs in matrix-js-sdk needing to become async too, as well as requiring us to switch promises library at least from Q to Bluebird.  However, most of this is now done so hopefully the new storage layer will land shortly. <a href="https://github.com/vector-im/riot-web/issues/2325"> https://github.com/vector-im/riot-web/issues/2325</a> is the bug tracking this one...</li>
  <li>Fixing the overall UX of managing devices in a room (including key shares). <a href="https://github.com/vector-im/riot-web/issues/4522"> https://github.com/vector-im/riot-web/issues/4522</a> is the bug for this one :)  Relatedly we also need to ensure invitees can decrypt messages in e2e rooms before they join (if history visibility allows it) - this is <a href="https://github.com/vector-im/riot-web/issues/3821">https://github.com/vector-im/riot-web/issues/3821</a></li>
  <li>Fixing the UX of verifying devices (including cross-signing devices), to minimise the pain in verifying device ownership. <a href="https://github.com/vector-im/riot-web/issues/2142">https://github.com/vector-im/riot-web/issues/2142</a> is the master bug for this.</li>
</ol>
</li>
  <li><strong>Integrations.  </strong>A large slice of the team is working on our next-generation integration hosting platform, which is starting to look unspeakably awesome.  We'll be yelling loudly about this once there's something to see and play with...
<strong>
</strong></li>
  <li><strong>Rich Text Editor</strong>.  This was originally a GSoC project from last year, but is finally on by default now in matrix-react-sdk - letting users author their messages with full WYSIWYG behaviour and critically have a radically improved autocompletion UI/UX, including emoji, user names, room names, etc.  You can check it out at <a href="https://riot.im/develop">riot.im/develop</a> already :)</li>
  <li><strong>Mentions</strong>.  We're finally semantically tagging references to users in messages so that they can be displayed nicely in the UI, and help with highlighting notifications!  This is due as soon as the Rich Text Editor work has finished.</li>
  <li><strong>Mobile SDKs</strong>.  The iOS & Android teams are currently on a mission to get parity between the iOS & Android SDKs and matrix-react-sdk.  This is stuff like implementing the new User Search API; Membership Event List Summaries; Dark theme(!); Translations; etc.  Progress is looking good!</li>
  <li><strong>Synapse performance</strong>.  Many many optimisations when calculating push rules when sending messages, which was taking up a substantial amount of the send path time.  Synapse develop looks to have reduced this significantly now - and as of Monday we're running the new optimisations on Matrix.org.</li>
  <li><strong>Dendrite.  </strong>Lots of work going into implementing Invitations currently, including improvements to the overall append-only log architecture to support them nicely.</li>
  <li><strong>Riot-Static</strong>.  This is one of our GSoC projects this year, written by Michael Telatynski (t3chguy) - providing a full static (no-JS) read-only view of Matrix, suitable for dumb web browsers and search engines.  It's looking really exciting (although needs CSS) - there's a copy currently deployed over at <a href="https://stormy-bastion-98790.herokuapp.com/">https://stormy-bastion-98790.herokuapp.com/</a>.</li>
</ul>
Meanwhile, there's a tonne of stuff happening in the community - an excellent summary may be found at this <a href="https://www.uhoreg.ca/blog/20170714-0834">Community Round Up blog post by uhoreg</a>!

So: this is where things stand right now - the team is sprinting away getting all the stuff above landed, and meanwhile I'm spending most of my life worrying about funding.  We'll try to keep blogging more regularly to give better visibility on progress on both the funding & development situation, as well as to ensure there's a written public record as well as the regular supporter-only updates.  However, for the latest realtime updates and sneak previews and tidbits you'll probably want to sign up on <a href="https://patreon.com/matrixdotorg">Patreon</a> or <a href="https://liberapay.com/matrixdotorg">Liberapay</a> :D

--Matthew

[EDIT: I got the UpCloud stats completely wrong - they are even faster (by 10x!) than I quoted; the figures are now updated :)]
