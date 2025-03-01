+++
title = "A Call to Arms: Supporting Matrix!"
path = "/blog/2017/07/07/a-call-to-arms-supporting-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi folks,

<b>TL;DR: if you like Matrix (and especially if you're building stuff on it), please <i>support us via <a href="https://patreon.com/matrixdotorg">Patreon</a> or <a href="https://liberapay.com/matrixdotorg/">Liberapay</a></i> to keep the core team able to work on it full-time, otherwise the project is going to be seriously impacted.  And if you're a company who is invested in Matrix (e.g. itching for Dendrite), please get in touch ASAP if you'd like to sponsor core development work from the team.  And if you're a philanthropic billionaire who believes in our ideals of decentralisation, encryption, and open communication as a basic human right - we'd love to hear from you too O:-)</b>

<img class="aligncenter size-large wp-image-2611" src="/blog/wp-content/uploads/2017/07/matrix-supporters-1024x248.png" alt="" width="1024" height="248" />

I was expecting this blog post to be the Matrix Summer Special, focusing entirely on the incredible progress and updates we've made in the last few months in Matrix.  However, instead I'm going to talk about something different and literally critical to Matrix's success.

As many people know, Matrix.org development has historically been exclusively and very generously sponsored by a large multinational telecoms infrastructure company for whom most of the core team once built telco messaging apps.  However, despite the project progressing better than ever (more on that later), we have just had our funding dramatically cut by &gt;60%. <b>[Update: as of Aug 2017 it is effectively cut entirely, with enough $ left over to cover until end of October.]</b>

We seem to be suffering from a darkly amusing paradox, as the rationale from our corporate overlords is essentially: <i>“Wow! Matrix is doing great and growing well - and you seem to have all sorts of exciting people and companies using and building on it.  But we've been footing the whole development bill since the outset in May 2014, and this simply doesn't feel fair.  We're happy to keep funding though - but only if others do too!”</i>.  In other words, in some ways we are a victim of our own success...

So we now find ourselves in the situation that despite the project looking better than ever and having a tonne of amazing stuff in the pipeline, we are suddenly missing the funding to keep the core team working on it.  And the team is quite sizeable - reflecting the ambition and size of Matrix: right now we have effectively 11 people working specifically on Matrix itself: 1 on Synapse, 1 on Dendrite, 1 on e2e crypto, 2 on matrix-react-sdk (which powers Riot/Web), 2 on matrix-ios-kit / matrix-ios-sdk, 2 on matrix-android-sdk, 1 on bridges, and me (Matthew) managing the overall project.  (This ignores folks who overlap the team who are working specifically on Riot stuff).

Over the last few years we've had countless people ask if they can financially support Matrix. We haven't been able to accept it for various reasons, but now is the time for us to step towards a more independent setup, and avoid a repeat of the situation we're currently facing by opening up to external support.

<b>So we need help from the community to keep going!  </b><b>Please head over to <a href="https://patreon.com/matrixdotorg">Patreon</a></b><b> or <a href="https://liberapay.com/matrixdotorg/">Liberapay </a>and put some money in the meter </b>(or send some bitcoin to 1LxowEgsquZ3UPZ68wHf8v2MDZw82dVmAE or ether to 0xA5f9a4f9E024F6D727f7afdA9257e22329A97485)<b>.</b> In return, you'll get to keep Matrix evolving at a decent rate, be a member of the upcoming <code>+supporters:matrix.org</code> group (complete with flair badges!), and other benefits like access to #matrix-supporters:matrix.org - a new dedicated room for prioritised support, discounted goodies from Riot once paid services arrive, access to a weekly supporters-only status podcast(!), and of course receive our eternal thanks. :)

Meanwhile, <b>if you're a company who depends on Matrix</b>: <a href="mailto:matthew@matrix.org">please get in touch</a>. We have the option for you to sponsor core Matrix development (e.g. Dendrite) or for us to provide you with more targeted support or feature development.  We're already talking to several organisations who want to accelerate Dendrite specifically - and the more support we have there the faster we can go.

We'd also like to thank <a href="https://upcloud.com">UpCloud</a> for sponsoring hosting for the Matrix.org synapse instances - UpCloud has been coping impressively with the massive I/O and CPU/RAM requirements we have, and we recommend them unreservedly for <a href="https://upcloud.com/matrix">folks looking to run their own homeservers</a>.

Finally, one of the longer term plans to help fund Matrix is to get sponsorship from Riot, once Riot starts offering paid services. So, <b>if you're an investor who's interested in the for-profit sides of Riot </b>(paid integrations and paid Matrix hosting) then please <a href="mailto:amandine@riot.im">get in touch with the Riot team</a> ASAP!

Moving forward we are confident that we can secure funding, through sponsorship and Riot paid services, but in truth this decision caught us by surprise and so we need help both long term but also <b><i>right now!</i></b>

And whatever the funding situation, we're of course always looking for contributions for code, bug reports, or just spreading the word about the project too! :)

## Status Update

<strong><em>(or scroll to next section to see why this is bigger than "just" decentralised encrypted communication)</em></strong>

Despite the funding issue, the project really is going very well. Our vital stats (as seen through the lens of the matrix.org synapse) are looking like this:

<img class="aligncenter size-large wp-image-2587" src="/blog/wp-content/uploads/2017/07/Screen-Shot-2017-07-06-at-14.36.42-1024x780.png" alt="" width="1024" height="780" />

<img class="aligncenter size-large wp-image-2585" src="/blog/wp-content/uploads/2017/07/Screen-Shot-2017-07-06-at-14.50.15-1024x918.png" alt="" width="1024" height="918" />
<img class="aligncenter size-large wp-image-2588" src="/blog/wp-content/uploads/2017/07/Screen-Shot-2017-07-06-at-15.45.37-1024x694.png" alt="" width="1024" height="694" />

And meanwhile, looking back at the last big update (<a href="/blog/2016/12/26/the-matrix-holiday-special-2016-edition/">Holiday Special 2016</a>), we can compare our progress with our goals for 2017 thus far:
<ul>
  <li><em>Getting E2E Encryption out of beta ASAP.</em></li>
</ul>
This has progressed massively - we haven't really yelled about it yet, but latest https://riot.im/develop/ now finally implements the ability to share message keys between clients to let them decrypt older history and fix “unable to decrypt” errors (Mobile coming soon).  Meanwhile various root causes of “unable to decrypt” errors have been gradually eliminated; I can't actually remember the last time I saw one! Once key-sharing and improved device verification UX is fully tested and tuned we should be able to declare E2E out of beta.

> <p dir="ltr" lang="en">Work on fixing the final causes of "unable to decrypt" (UISI) errors in E2E is progressing well: here's a sneak preview of things to come!! <a href="https://t.co/0oGJjm8ZHT">pic.twitter.com/0oGJjm8ZHT</a></p>
>
> — Matrix (@matrixdotorg) <a href="https://twitter.com/matrixdotorg/status/867719250194071552">May 25, 2017</a>

<ul>
  <li><em>Ensuring we can scale beyond Synapse – i.e. implement Dendrite</em></li>
</ul>
Likewise, Dendrite is on track: we've implemented all the Hard Stuff which forms the skeleton of Dendrite (core federation, message signing, /sync, message sending, media repository etc) - which takes us to over <a href="https://docs.google.com/spreadsheets/d/1tkMNpIpPjvuDJWjPFbw_xzNzOHBA-Hp50Rkpcr43xTw/edit">50% of Phase 1</a>. After phase 1, we will have an initial usable release for all the core functionality.  Synapse's performance has also improved enormously this year.

> <p dir="ltr" lang="en">New milestone for Dendrite: sending messages over federation BOTH WAYS between dendrite & synapse! A bit more polish & we can cut an alpha!! <a href="https://t.co/DWs6rFqZcQ">pic.twitter.com/DWs6rFqZcQ</a></p>
>
> — Matrix (@matrixdotorg) <a href="https://twitter.com/matrixdotorg/status/878279397106733056">June 23, 2017</a>

<ul>
  <li><em>Getting as many bots and bridges into Matrix as possible, and doing everything we can to support them, host them and help them be as high quality as possible – making the public federated Matrix network as useful and diverse as possible.</em></li>
</ul>
Bridges and bots continue - from the core team we have a ‘puppeting' Telegram bridge (<a href="https://github.com/matrix-org/matrix-appservice-tg">matrix-appservice-tg</a>), and from the wider community we have <a href="https://github.com/Half-Shot/matrix-appservice-discord">Discord</a>, <a href="https://github.com/matrix-hacks/matrix-puppet-skype">Skype</a>, <a href="https://github.com/matrix-hacks/matrix-puppet-signal">Signal</a>, new Rocket.Chat and more.  Getting them polished and live is certainly an area where we need more manpower though.
<ul>
  <li><em>Supporting Riot's leap to the mainstream, ensuring Matrix has at least one killer app.</em></li>
</ul>
Riot has been <a href="https://medium.com/@RiotChat/riot-web-and-desktop-version-0-10-0-is-here-e6147f5f576f">sprouting</a> <a href="https://medium.com/@RiotChat/riot-web-0-11-is-here-3edbf9dbb7ed">new releases</a> every few weeks, with a huge emphasis on proving UX:
<ul>
  <li style="padding-left: 30px;">an entirely new streamlined sign-up process</li>
  <li style="padding-left: 30px;">the new concept of home pages</li>
  <li style="padding-left: 30px;">a user directory search that actually works</li>
  <li style="padding-left: 30px;">internationalised to 27 languages</li>
  <li style="padding-left: 30px;">compact layout</li>
  <li style="padding-left: 30px;">loads of desktop improvements</li>
  <li style="padding-left: 30px;">piwik analytics support; etc.</li>
</ul>
<img class="aligncenter size-large wp-image-2598" src="/blog/wp-content/uploads/2017/07/Screen-Shot-2017-07-06-at-16.12.28-1024x566.png" alt="" width="1024" height="566" />

There is still a lot of UX work to be done, but it's converging fast on being a great entry point into the Matrix ecosystem, driving its growth across different groups and communities..

Meanwhile, a <a href="https://medium.com/@RiotChat/riot-im-unveils-the-next-generation-of-its-mobile-client-6b38e2227ee2">massive update to the iOS & Android apps</a> just landed yesterday, switching to an entirely new UI layout to separate People from Rooms, synchronized Read Markers, and more!
<ul>
  <li><em>Adding the final major missing features:</em>
<ul>
  <li><em>Customisable User Profiles (this is almost done, actually)</em></li>
</ul>
</li>
</ul>
This is still hovering at ‘almost done', and will be needed for some of the implementation of Groups (see below)..
<ul>
  <li><em>Groups (i.e. ability to define groups of users, and perform invites, powerlevels, etc. per-group as well as per-user)</em></li>
</ul>
Groups are also in testing in Synapse too!  These will probably be the single biggest change to Matrix that we've seen since E2E encryption landed: it changes the dynamic of the whole network, given users can explicitly declare allegiance to different groups, which in turn have their own home pages and directories etc.  It lets users form communities, and declare their participation in those communities (if desired), and also lets rooms be grouped together.  One of our single biggest requests has been <a href="https://github.com/vector-im/riot-web/issues/2454">“subrooms”</a> and we're incredibly excited to see how well Groups solve this.
<ul>
  <li><em>Threading</em></li>
</ul>
Sadly no progress on Threading so far this year.
<ul>
  <li><em>Editable events (and Reactions)</em></li>
</ul>
We're hoping to get looking at this (at last!) once Groups are done.
<ul>
  <li><em>Maturing and polishing the spec (we are way overdue a new release)</em></li>
</ul>
You'll have noticed that in the “how many people work on Matrix?” stats above, we didn't mention anyone working on the Spec.  Because right now there isn't anyone explicitly maintaining it, unfortunately; updates are done best-effort when everyone's primary responsibilities allow it.  That said, there's quite a lot of good stuff currently <a href="/speculator/spec/HEAD/client_server/unstable.html">unreleased on HEAD.</a> This is something which is obviously critical to fix once we have sustainable funding sorted again.  We can only apologise to folks like the <a href="https://ruma.dev/">Ruma</a> developers who have suffered from the spec lag. :(
<ul>
  <li><em>Improving VoIP – especially conferencing.</em></li>
</ul>
VoIP is improving lots on iOS, thanks to Denis Morozov's GSoC project, and meanwhile we have all new conferencing powered by Jitsi on the horizon in the next few weeks too.
<ul>
  <li><em>Reputation/Moderation management (i.e. spam/abuse filtering).</em></li>
</ul>
Lots of thinking about this (see below), but no development yet.
<ul>
  <li><em>Much-needed SDK performance work on matrix-{'{'}react,ios,android{'}'}-sdk.</em></li>
</ul>
About 40% of the desired performance work has happened here (although not all has gone live yet).
<ul>
  <li><em>…and a few other things which would be premature to mention right now. :D</em></li>
</ul>
All will be revealed in the next week or two - but suffice it to say that Integrations are going to be getting a Lot More Useful™. :)

## Reflections

There are very very few people actually working professionally on trying to build general-purpose open communication networks and protocols.  There's us, some <a href="http://xmpp.org">XMPP</a>, <a href="http://ircv3.net/">IRCv3</a> and <a href="https://gnu.io/social/">GNU Social</a>/<a href="https://mastodon.social">Mastodon</a> folks, <a href="https://ring.cx/">GNU Ring</a>, <a href="http://tox.chat">Tox</a>, <a href="http://briarproject.org">Briar</a>, <a href="https://github.com/ssbc">Secure Scuttlebutt</a>, <a href="http://ipfs.io">IPFS</a>, <a href="http://status.im">Status.im</a>, <a href="http://ricochet.im">Ricochet</a>… and that's literally all the major projects I can think of (sorry if I missed you!).  There's probably only 50 developers in total working in this domain as their day job.

Meanwhile, there are literally <strong><i>hundreds of thousands </i></strong>of folks trudging away building more and more near-indistinguishable proprietary closed communication systems - trapping users inside ever more silos and fragmenting the basic ability to communicate on the ‘net.  It's like a world where the open web was pushed into a tiny underground resistance, and everyone else was trapped in the walled gardens of AOL and Compuserve (or more contemporarily: Facebook, Twitter, WhatsApp etc).

In other words: the whole world of decentralised communication desperately needs your support.  This is a clear case of user choice and freedom: to give users the ability to pick who they trust with their data and metadata, without being forced into unilaterally trusting the Silicon Valley megacorps.  And this, dear Reader, is your chance to fix the world for the greater good. Seriously, the Matrix team is one of a handful in the world in a position to continue to push things in the right direction and avoid us falling into a permanent dystopia where communication is even more closed and proprietary than the Public Telephone Network!

Finally, there's an even bigger issue at stake here than open communication.  As an open network, people can literally publish whatever content they like into Matrix - same as the web or the internet itself.  As a result, there's scope for spam; abusive/malicious content; propaganda; and generally the whole spectrum of the best and worst of humanity.  Now, if we were a centralised system like Facebook, we might hire <a href="https://www.theguardian.com/news/2017/may/21/facebook-moderators-quick-guide-job-challenges">thousands of content moderators</a> to frantically impose a rulebook on ‘acceptable' content.  Or we might build invisible filter-bubbles for our users based on their social graph, cocooning them from scary unfamiliar content outside their social circles and reinforcing their preconceptions (whilst the resulting self-affirmation keeps them coming back, viewing more and more ads).

But we're decentralised, and we have no absolute moral arbiter, and nor should we - on an open network it should be up to users and users alone to define and manage their own worldview and alignment.  Plus we are not fiscally obligated to keep users coming back to view more ads no matter what.  Instead, we are forced to confront the fundamental problem: building tools which empower users to curate and visualise their own content filters; letting them filter out the stuff they're not interested in or find repellant… while still helping them be aware of their own viewpoint and the shape of the world beyond it.  We haven't really started building this yet, but in the long term our feeling is that these tools will literally be vital for the survival of the human race (e.g. exposing anti-climate-change propaganda for what it is or helping users opt out of World War 3) - let alone the success of decentralisation.  A world where users blindly consume propaganda is doomed, and it's a fascinating situation that the same tools which will allow Matrix users to tune out the rooms, users and conversations they're not interested in could be directly applied to the bigger global problem.

So: <b>Matrix needs you.</b> Please become a supporter on <a href="https://patreon.com/matrixdotorg">Patreon </a>or <a href="https://liberapay.com/matrixdotorg/">Liberapay</a>, and help us save the world :)

- Matthew, Amandine & the whole Matrix.org team.
