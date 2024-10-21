+++
title = "Matrix Community Year In Review 2022"
path = "/blog/2023/01/03/matrix-community-year-in-review-2022"

[taxonomies]
author = ["Nico"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

> Note: This was originally posted on <https://blog.neko.dev/posts/matrix-year-in-review-2022.html> , which also includes some small info boxes about each projects, which got lost in the translation.

As we send off 2022 with a bang, it makes sense to look back on what we did this year and where we want to go next year. In its holiday special post, the Matrix Foundation has been focusing on the core team's work. This post is focusing on the achievements of the community outside of the Matrix Foundation.

I tried to reach out to as many people I have seen do "stuff" on Matrix and have them write something they would see fitting for a year in review. Now, most people have better things to do between christmas and new years, so I hope you can excuse if some projects are missing. Also I probably forgot like half of the interesting people... HOWEVER! I hope you still enjoy what everyone wrote up. And don't forget to check out the official [Matrix Holiday Update 2022](https://matrix.org/blog/2022/12/25/the-matrix-holiday-update-2022) and of course read you weekly [TWIM](https://matrix.org/blog/category/this-week-in-matrix) to keep up to date with any cool projects you find.

<!-- more -->

<h2>Nheko D-Bus API</h2>
<p>A D-Bus API for the Nheko Matrix client compatible with KRunner and Rofi.</p>

<p>LorenDB tells us</p><blockquote>

<p>As a dedicated user of all things KDE, I make heavy use of KRunner. Naturally, I wondered if KRunner could be extended to join Matrix. This idea led me to create a D-Bus API in nheko for use on Linux. While it currently only supports a few aspects of the full Matrix experience, this API allows external software to make use of some of nheko's functionality, including searching the room list, opening rooms, joining rooms, and creating DMs. Later, I also added support for setting status messages. Now you can write extensions for software such as <a href="https://github.com/LorenDB/nheko-krunner">KRunner</a> or <a href="https://mzte.de/git/LordMZTE/rofi-nheko">rofi</a>. Alternately, you could make a plugin for your favorite game that sets your status message to let your friends know that you are busy (although no known plugins of this sort exist).</p></blockquote>
<h2>Community Moderation Effort</h2>
<p>A collaborative effort to moderate Matrix communities and to fight spam.</p>

<p>Nico mentions</p><blockquote>

<p>Some of you might have heard of us, but we are a few moderators of very
different communities, who have banded together to fight spam and share the
burden of moderating our communities. Different opinions are very hard to align,
so we have one ban list we can agree on, that only includes the most annoying
spam reasons: automated spam, crypto advertisements, gore posting and similar
stuff. This actually works very well against spammers, that just join one room
after the other to send the same content.</p>
<p>You can subscribe to this ban list here:
<a href="https://matrix.to/#/%23community-moderation-effort-bl%3Aneko.dev">#community-moderation-effort-bl:neko.dev</a></p>
<p>We are sometimes internally discussing moderation rules, tooling and recent
events.  In the long term we hope to improve the tooling situation as well as
provide a second, stricter ban list, but we are also already very busy just
moderating our own little communities, so don't expect much progress.</p>
<p>If you have a community that has been troubled by organized spam recently, maybe
our ban list can help you. You might also be interested in contacting one of us
to join the effort, just be aware that we are very careful in accepting new
members. We hope you have a spam-free and enjoyable 2023!</p></blockquote>
<h2>Matrix Releasetracker</h2>
<p>Release tracker that posts updates into Matrix rooms. <a href="https://github.com/ananace/matrix-releasetracker" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Ananace contributes</p><blockquote>
<p>The release tracking project that has been running basically non-stop since 2018 (barring a few periods of downtime due to complete database crashes), having tracked many millions of releases for <em>at least</em> five people from my personally hosted instance.</p>
<p>2022 saw the addition of plenty of additional release sources, as well as a complete refactor of the codebase to hopefully support even more sources going forwards. It now tracks loose repositories (signed tags, lightweight tags, and/or releases) on GitHub/GitLab/Gitea/plain git, as well as supporting the tracking of entire namespaces and user stars on GitHub/GitLab/Gitea.</p>
<p>2023 should hopefully see even more work roll in, with some code underway for tracking Docker images and Helm Chart updates, as well as rework of the bot component to have it offer more use.</p>
</blockquote>
<h2>Self-Host a Matrix Map Tile Server</h2>
<p>FluffyChat implemented location sharing in Matrix last year. More recently, Element announced support for it. Interesting in Element's announcement is not only the mechanism for sharing a location data point, but also how their matrix clients would display a little map to the recipient and how they would support the case where the data for this map display could be self-hosted. This is a blogpost/guide to show how this could be done. <a href="https://wrily.foad.me.uk/self-host-a-matrix-map-server" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>JulianF mentions</p><blockquote>

<p>I set up my own OpenStreetMap tiles server for secure location sharing with Matrix.</p>
<p>See <a href="https://wrily.foad.me.uk/self-host-a-matrix-map-server/" title="Self-Host a Matrix Map Tile Server">this guide on my blog</a> which explains why and how I did it, and the <a href="https://lab.trax.im/matrix/map-tile-server-ansible" title="Map Tile Server Ansible">Ansible role</a>, and the matrix discussion room <a href="https://matrix.to/#/#matrix-map-tile-server:foad.me.uk"><code>#matrix-map-tile-server:foad.me.uk</code></a>.</p>
</blockquote>
<h2>Matrix ClassDojo Bridge</h2>
<p>This bridges ClassDojo teacher-to-parent messaging facilities to matrix. <a href="https://lab.trax.im/matrix/cdj-to-matrix" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>JulianF mentions</p><blockquote>

<p>I began a project to bridge matrix to the teacher-parent messaging silo ClassDojo, which is popular especially in USA and UK schools.</p>
<p><a href="https://lab.trax.im/matrix/cdj-to-matrix">Matrix ClassDojo Bridge</a></p>
<p>I am motivated by my loathing of being coerced into putting my private communications in yet another silo where I am restricted to accessing my messages and photos through the company's own products which subject me to advertising and engagement tactics (&quot;Your child earned a point -- click to see what for!&quot;), where I cannot easily keep my own copy of my own data (&quot;Subscribe now to keep your memories!&quot;), and all the other typical down-sides of a Big Tech silo.</p>
<p>This scenario is of course exactly where Matrix shines. An ideal fit for a school's messaging needs, scrapping the silo business model, putting the organisation in control of its own data and policies.</p>
<p>In the first half of 2022 I got as far as being able to do an offline demo -- manually running the fetching and bridging stages, with the teacher and class names, story text and photos bridged in the to-matrix direction.</p>
<p>My work on this was generously sponsored by my wife.</p>
<p>Since then, the project has been on hold, seeking further funding.</p>
<p>My next step plan for the bridge, when I can get back to it, is to adjust the bridged output to the <a href="https://matrix.to/#/#social-matrix:carnot.cc">matrix-for-social-media</a> formats used in <a href="https://circu.li/">FUTO Circles</a> (previously &quot;Circuli&quot;) and <a href="https://app.minestrix.henri2h.fr/">MinesTRIX</a> to present a familiar and beautiful display.</p>
</blockquote>
<h2>Aine's update</h2>
<p>Aine, one of the people behind <a href="https://etke.cc/" >etke.cc</a> gives an update about what happened in the project this year as well as their contributions to <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy">matrix-docker-ansible-deploy</a>. <a href="https://etke.cc/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Aine contributes</p>
<blockquote>
<p>Ohh, I don't even know where to start and what include, to be honest 😁</p>
<p>The most notable changes were:</p>
<ul>
<li>etke.cc/scheduler brings control over maintenance service and running services to customers. It changed our internal workflows a lot</li>
<li>multilingual support of etke.cc - website, guides, order processing, support. Initially we had 3 supported languages (English, German, Russian) and then dropped Russian</li>
<li>a lot of new components in mdad, starting with cinny and Borg backup and finishing with postmoogle</li>
<li>we developed several new bots and matrix-related tools</li>
</ul>
<p>... Actually, a lot of things were done and much more is in progress, not sure if I can speak about upcoming changes</p>
<p>So, 2022 was awful, scary, heartbreaking (in a bad way), but it also was quite productive</p></blockquote>
<h2>Pauls Podcast (German tech podcast)</h2>
<p>A German tech podcast, that talks a lot about Matrix, but also a few other miscellaneous topics. <a href="https://chrpaul.de/podcast/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>jaller94 shares</p><blockquote>

<p>In the beginning of the year I started a hobby podcast. Most episodes cover Matrix topics, e.g. the release of Matrix Spec v1.2, the FOSDEM 2022 and the Matrix Community Summit in Berlin.</p>
<p><a href="https://chrpaul.de/podcast/" target="_blank" rel="nofollow noopener noreferrer">https://chrpaul.de/podcast/</a></p>
</blockquote>
<h2>Matrix dev room at FrOSCon 2022</h2>
<p>Every year free and open source software is celebrated and talked about at the FroSCon conference near Bonn. There was a dev room dedicated to Matrix this year. <a href="https://matrix.to/#/#FrOSCon:fiksel.info" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>jaller94 tells us</p><blockquote>
<p>Every year free and open source software is celebrated and talked about at the FroSCon conference near Bonn.<br/>Thousands of enthusiasts meet on a university campus for one weekend to listen to presentations, talk in dev rooms and inform themselves at booths.<br/>One ecosystem and community not to miss is Matrix. We've had a dev room where plenty of developers, server admins and newcomers exchanged their ideas and wishes for the protocol, implementations and other aspects of Matrix.</p>
<p>Room link: <a href="https://matrix.to/#/#FrOSCon:fiksel.info" target="_blank" rel="nofollow noopener noreferrer">#FrOSCon:fiksel.info</a></p>
<p>Thanks to the speakers who represented Matrix on stage! Thanks to <a href="https://matrix.to/#/@oleg:fiksel.info">Oleg</a> for continually representing Matrix at FrOSCon each year! Thanks to <a href="https://matrix.to/#/@yan:datanauten.de">Yan</a> for joining me last minute and making the dev room 300% more awesome!</p>
</blockquote>
<h2>Bram's updates on Elm and activism</h2>
<p>A Matrix SDK in Elm. <a href="https://github.com/noordstar/matrix-axelm" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Bram mentions</p><blockquote>

<h3>Experience as a digital activist</h3>
<p>At the Matrix Community Summit 2022, I gave a talk on the struggles as a digital activist if trying to explain concepts like Matrix to politicians. The talk went very well!</p>
<p>I was really impressed by the knowledge and passion that many of the attendees at the Matrix Community Summit displayed, and I feel grateful to have had the opportunity to learn from and such an engaged and informed group of people. I am confident that the insights and perspectives shared at the summit will be invaluable to my activism moving forward, and I hope to have the chance to work with many of you in the future as we continue to strive for a more just and equitable world.</p>
<h3>Implementing Matrix in Elm</h3>
<p>For the past year, I have been looking for ways to implement a Matrix SDK in Elm. Elm is a functional programming language that promises to compile to lightweight JavaScript that raises zero runtime exceptions. This has been quite a learning process and I'm hoping to release a beta version early 2023.</p>
<p>From the past year of trying to build a functional language library, I've learned that:</p>
<ul>
<li>The Matrix spec is surprisingly easy to implement in a functional programming language;</li>
<li>There are still a lot of ambiguities left in the Matrix spec that aren't that big of a deal for imperative programming languages, but can mess up your codebase if you're a functional programmer;</li>
<li>There appears to be a need for some single-use clients that are very good at doing a single thing. (Sending automated messages to multiple clients, moderating permissions across multiple rooms, auto-sending policies, exploring unknown access tokens).</li>
<li>A lot of SDK development still revolves heavily around Element and Synapse implementation. Some events weren't part of spec yet while already widely implemented because either of those two codebases supported it.</li>
<li>The Elm compiler is VERY strict and unforgiving, which can be annoying at times but creates some very robust results. My hope is that rolling out client implementations will be relatively quick and easy as soon as the SDK implementation is ready.</li>
</ul>
<p>Progress on the Elm SDK can be found over <a href="https://github.com/noordstar/matrix-axelm" target="_blank" rel="nofollow noopener noreferrer">here</a> but will be updated in TWIM as well. You can also view my side project of a custom event type directory over at <a href="https://matrix.directory" target="_blank" rel="nofollow noopener noreferrer">https://matrix.directory</a></p>
</blockquote>
<h2>Nico's delight initiative</h2>
<p>Random Matrix related updates from Nico.</p>

<p>Nico mentions</p><blockquote>

<p>Nobody enjoys encountering bugs on a platform they use. So one of my goals for 2022 was to fix some of the bugs I hear often about in the hope it improves the reputation Matrix has. This often involves projects or functionality I don't personally use, but that I can still contribute to. I think I made some progress on it. For example I fixed a bug that prevented all calls using Element Web on servers, that were not Synapse. Similarly I opened a pull request to Element Android repo, where users would get pinged by replying to a user whose userid starts with a room ping like @roomba (however that sadly isn't merged yet). I also made various fixes to Synapse, especially related to notifications.</p>
<p>More long term I tried to push dehydrated devices forward (partially because of my day job) by implementing the second iteration of it: <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3814">MSC3814: Shriveled Sessions</a> as well as writing MSCs to one day get rid of reply fallbacks (by deprecating it and with support of <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3664">MSC3664</a> allow for better control over notifications from replies. Similarly I pushed forward <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3266">MSC3266: Room Summaries</a> to improve the experience when joining rooms via knocking or restricted joins or just previewing rooms in general. (I implemented the federation parts of that MSC in Synapse as well as in several parts of Nheko).</p>
<p>My current work is on improving presence, since that has some fun edge cases. Fingers crossed that works out next year and I find a few more things to drive by fix. Do you have anything you have seen come up often? Maybe 2023 is the year to try to fix one of the bugs you encountered far too often? It is always easier to fix stuff, that has been annoying you, so why not try and make your own life on Matrix a little bit better? Most projects are pretty open to contributors and it also often teaches you some new skills, so there is nothing to lose but lots of time!</p></blockquote>
<h2>Valheim Matrix Bridge</h2>
<p>A Valheim (the game) to Matrix bridge. <a href="https://nheko.im/nheko-reborn/valheimmatrix" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Nico mentions</p>
<blockquote>
<p>I built a Valheim Mod to bridge Matrix messages from and to Valheim, so that I didn't have to switch windows as often when playing with the other Nheko devs. You can find it here: <a href="https://nheko.im/nheko-reborn/valheimmatrix">https://nheko.im/nheko-reborn/valheimmatrix</a></p>
<!-- markdownlint-disable-next-line no-alt-text -->
<img src="/blog/img/neko.dev_cltTmMvhoxagKJMNiPHdcLLB.png" style="display: inline-block"/>
</blockquote>
<h2>Postmoogle</h2>
<p>An Email to Matrix bridge. Postmoogle is an actual SMTP server that allows you to send and receive emails on your matrix server. It can't be used with arbitrary email providers, because it acts as an actual email provider itself, so you can use it to send emails from your apps and scripts as well. <a href="https://gitlab.com/etke.cc/postmoogle" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Aine reports</p><blockquote>
<p>At <a href="https://etke.cc">etke.cc</a> we love matrix, but have to use email as well, especially for some notification things and communication with customers. Let's face it: email ecosystem is awful, there is no really usable and nice looking email clients that allow you to collaborate and use &quot;hivemind&quot; to work on emails, there is no simple backend implementations that will just work with simple configuration, and you have to dig into all that stuff on your own to understand how it works and configure it...</p>
<p>So, we already had experience in bringing stuff into matrix and we decided to do the same for email, that's how Postmoogle was born.</p>
<p>Of course, there was email2matrix, but it's too hard to configure and it's intended only to receive messages.</p>
<p>Our &quot;20 minutes adventure&quot; to develop it was a hell ride with several weeks of nearly full-time working on it even on weekends, and during that time we literally studied SMTP protocol using RFCs, Wikipedia and source code of other mail servers (shoutout to Maddy - you guys did amazing work!).</p>
<p>It was a tough fight, but the result is satisfying - you can get an email server that handles 99% of usual email cases and uses matrix as frontend.</p>
<p>So, what's the result?</p>
<ul>
<li>we use Postmoogle for customer support</li>
<li>we offer it to customers</li>
<li>we have cases when people ditched regular email service (like gmail) and use postmoogle as the only email account</li>
</ul>
<p>Of course, we have other ideas with it, but even now it's pretty satisfying results</p></blockquote>
<h2>Halcyon</h2>
<p>Halcyon is a python matrix library made with the goal of being very easy to use, and requiring no local databases. <a href="https://github.com/WesR/Halcyon" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>gen3 mentions</p><blockquote>
<p>Halcyon is a python matrix library made with the goal of being very easy to use, and requiring no local databases. 2022 brought a few key features that made it usable for general usage in unencrypted room (We reached milestone 2!).</p>
<ul>
<li>Query for room information, with automatic background updating in a local cache. (ex, get the room name, admin, moderators, etc)</li>
<li>Improved polling for reduced server usage and for connection with slow internet</li>
<li>Image sending functionality with automatic blurhash and thumbnail generation</li>
<li>More examples</li>
<li>More documentation!</li>
</ul>
<p>Come chat with us in  <a href="https://matrix.to/#/#halcyon:blackline.xyz" target="_blank" rel="nofollow noopener noreferrer">https://matrix.to/#/#halcyon:blackline.xyz</a><br/>Find the library here:  <a href="https://github.com/WesR/Halcyon" target="_blank" rel="nofollow noopener noreferrer">https://github.com/WesR/Halcyon</a></p>
</blockquote>
<h2>f0x' year of not-so-much Matrix</h2>
<p>f0x gives an update about their Matrix (and not-so-much Matrix) projects.</p>

<p>f0x mentions</p><blockquote>
<p>Looking back I realized I didn't do much with Matrix at all this year, besides actively using it as my main communication platform.<br/><a href="https://git.pixie.town/f0x/matrix-streamchat">matrix-streamchat</a> had some commits at the start of the year but got abandoned shortly after. I stopped streaming myself, and others I knew<br/>mostly used Owncast which had it's own chat, which got some neat ActivityPub integration soon after too.</p>
<p><a href="https://git.pixie.town/f0x/synapse-media-proxy">synapse-media-proxy</a> also had very little changes, but that's quite good, because it's been very solidly running in production for more than a year now,<br/>running all the Matrix media for <a href="https://pixie.town" target="_blank" rel="nofollow noopener noreferrer">https://pixie.town</a>.</p>
<p>There's some stuff on the ops-side; worked on a refactor of my NixOS modules for Synapse with workers (not quite working yet). Moved all my bridges to a <a href="https://git.pixie.town/f0x/nixos/src/branch/main/nodes/via">new NixOS host</a>. (Barely)<br/>maintained my <a href="https://git.pixie.town/f0x/matrix-appservice-irc">matrix-appservice-irc fork</a>, and got some nice <a href="https://git.pixie.town/f0x/gitea-registration-proxy">clickfarm-supplied Haiku's</a><br/>from a bot re-using an account because I still haven't gotten around to giving it it's own access token..</p>
<blockquote>
<p>Successful registration for jamessemith70 (jamessmithp70@gmail.com)<br/>5, Frigid winter night—<br/>7, even the thieves stay at home,<br/>5, except for those two</p>
</blockquote>
<p>In my non-Matrix time I've been working a lot on the frontend and settings interface for <a href="https://github.com/superseriousbusiness/gotosocial">GoToSocial</a>, <a href="https://git.pixie.town/f0x/fedifox/">FediFox</a> Masto-api client and Masto-api compatible alternative frontend <a href="https://git.pixie.town/f0x/fedifox-shield">FediFox Shield</a>. Article about the latter: <a href="https://cthu.lu/projects/fedifox-shield">https://cthu.lu/projects/fedifox-shield</a></p>
</blockquote>
<h2>Gwmngilfen's Matrix Year</h2>
<p>Gwmngilfen gives an update about their work on Matrix in 2022.</p>

<p>Gwmngilfen tells us</p><blockquote>

<p>While 2021 was a big year for me in Matrix, 2022 has been one of steady progress on various projects. Being a community architect, much of those projects are &quot;communities on Matrix&quot; rather than code, but hey! We need users 😀. So, here's what I've been up this year...</p>
<h3><a href="https://matrix.to/#/#space:ansible.com">#space:ansible.com</a></h3>
<p>Ansible started on it's Matrix journey <a href="https://emeraldreverie.org/2021/07/08/ansible_and_matrix">last year</a> but the arguments I made then have proven solid. The community has seen steady decline in the number of IRC users, but a steady rise in the number of Matrix users - enough to make a positive trend overall. As of last month, we're now at over 50% of unique MXIDs talking each day coming from Matrix vs IRC. That's a huge milestone to have reached in just over a year!</p>
<p>We also used Matrix as a key part of our message to the wider tech landscape as part of our Keynote at AnsibleFest. I don't want to make this too product-y, but you can check out that video <a href="https://youtu.be/J7YRaPzKw4A?t=1819">here</a> and also the interview my colleagues Adam and Carol <a href="https://www.youtube.com/watch?v=5EQjSaWRWyQ">here</a> (that's worth a look, Adam crowbars Matrix into almost every sentence 😁)</p>
<p>Steady progress isn't eye catching, but I'm so pleased that the move has been a positive one, and I hope it continues in 2023.</p>
<h3><a href="https://matrix.to/#/#rlang:matrix.org">#rlang:matrix.org</a></h3>
<p>Since part of my work involves doing data science, I've also been trying to boost the presence of the Rstats world on Matrix. The community there is small so far, but we're super supportive and trying to build out our presence. My eventual goal is to make it big enough to be worth setting up a bridge to the larger Slack R4DS community (R for Data Science), but we're not there yet. If you use R at all, come see us!</p>
<h3><a href="https://github.com/GregSutcliffe/ChatStat/">ChatStat for data on your Matrix Rooms</a></h3>
<p>The one Matrix project I did get done this year (although it hasn't been updated in ... a while) is an R library for producing reports on Matrix rooms. I use this for gathering data on the Ansible community regularly, and it comes in two parts. The first part is the API calls to get all the events for a set of rooms over a given time and arrange it in a nice rectangular format. The second part uses this tabular data to produce reports on when people talk, who talks the most, and so on. It's been very useful to me over the past few months to show how the trends I talk about above have developed.</p>
</blockquote>
<h2>Carolinacon in matrix</h2>
<p>CarolinaCon is a yearly cybersecurity conference hosted out of North Carolina. Since 2004 CarolinaCon has been host to talks ranging from BioHacking, to developing OpenBSD, to Web app security, and beyond. Over the years we have run a wide range of events, mostly in person. The past two years we decided to run the conference online. <a href="https://carolinacon.org/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>gen3 mentions</p><blockquote>

<h3>whoami</h3>
<p>CarolinaCon is a yearly cybersecurity conference hosted out of North Carolina. Since 2004 CarolinaCon has been host to talks ranging from BioHacking, to developing OpenBSD, to Web app security, and beyond. Over the years we have run a wide range of events, mostly in person. The past two years we decided to run the conference online.</p>
<h3>How did we use matrix?</h3>
<p>We decided to run a homeserver bridged with our discord. We wanted to take careful consideration to users who have never used matrix before, and offer some background information to enable them to use it even if they were feeling unsure. Along with running our own homeserver and element instance, We also made a Space that users can join to automatically see all the rooms available for the conference. When a user creates an account on our homeserver, they are automatically placed in a few key rooms such as the Space, #CTF, #general, and #announcements. Check it out on <a href="https://carolinacon.org/coms.html" target="_blank" rel="nofollow noopener noreferrer">https://carolinacon.org/coms.html</a></p>
<p>We didn't want anyone to feel left out, so all rooms are mirrored. One challenge this faced was getting permissions to work properly with rooms such as #announcements. The usage of a Space was generally positive in terms of increasing room desirability in Matrix. It was also nice to be able to include the local 2600 room into our space, something that we couldn't do with Discord.</p>
<h3>Stats</h3>
<p>We already had a large userbase on discord, but still had good user interaction on both sides. 150 users interacted in the #general chat. Of those users, 113 were from discord. Of the 37 Matrix only users, we had 7 separate homeservers. Its really cool to see that people who where already on Matrix, decided to federate in. Almost all homeservers had more then one person join, which is good to see.</p>
<p>In the future as we go back to in an person conference, we will continue to run the an online portion. The community seemed to really enjoy it, and we consider it a success as we were able to increase our outreach to world wide. Check us out at <a href="https://carolinacon.org/" target="_blank" rel="nofollow noopener noreferrer">https://carolinacon.org/</a> , we would love to chat!</p>
</blockquote>
<h2>Google-free push notifications with UnifiedPush and Ntfy</h2>
<p>Using the <a href="https://unifiedpush.org/">UnifiedPush open standard</a>, ntfy enables self-hosted (Google-free) push notifications. <a href="https://wrily.foad.me.uk/unifiedpush-notifications-for-your-matrix-server-with-ntfy" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>JulianF reports</p><blockquote>

<p>In the interests of supporting Open Tech in general, I made a small contribution to <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy">matrix-docker-ansible-deploy</a>: it can now install the <a href="https://ntfy.sh/">ntfy</a> push notifications server for you.</p>
<p>To explain what it's for: Using the <a href="https://unifiedpush.org/">UnifiedPush open standard</a>, ntfy enables self-hosted (Google-free) push notifications. The notifications go from Matrix (and other) servers, to our self-hosted ntfy server, and then straight to our phone. Especially useful for users of <a href="https://wrily.foad.me.uk/all-i-want-for-christmas-is" title="A smart phone that doesn't own me">Google-free Android</a> phones, and others who want to reduce their dependence on big tech.</p>
<p>To set it up, see <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-playbook-ntfy.md">Setting up the ntfy push notifications server</a> in the playbook docs.</p>
<p>Read about it on my blog: <a href="https://wrily.foad.me.uk/unifiedpush-notifications-for-your-matrix-server-with-ntfy">UnifiedPush notifications for your Matrix server with ntfy</a>.</p>
</blockquote>
<h2>Paul's updates and blog posts</h2>
<p>Paul shares what they did in 2022. <a href="https://paul.totterman.name/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Paul mentions</p><blockquote>
I haven't had much time, but I did write two tiny projects and small blog posts: <a href="https://paul.totterman.name/posts/matrix-menu-bot/">https://paul.totterman.name/posts/matrix-menu-bot/</a> &amp; <a href="https://paul.totterman.name/posts/remarkable-matrix/">https://paul.totterman.name/posts/remarkable-matrix/</a></blockquote>
<h2>Open Tech Will Save Us on PeerTube</h2>
<p>Hosting of the Open Tech Will Save Us talks on PeerTube. <a href="https://wrily.foad.me.uk/open-tech-will-save-us-on-peertube" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>JulianF mentions</p><blockquote>
<p><a href="https://wrily.foad.me.uk/open-tech-will-save-us-on-peertube" target="_blank" rel="nofollow noopener noreferrer">https://wrily.foad.me.uk/open-tech-will-save-us-on-peertube</a> -- I am publishing the Open Tech Will Save Us (OTWSU) talks on an Open Tech platform — namely on my own instance of Peertube. -- Thanks to Harald for doing it first. -- This article talks more about why, how, etc. </p>
</blockquote>
<h2>This Year in Trixnity</h2>
<p>Trixnity is a multiplatform Matrix SDK written in Kotlin. You can write clients, bots, appservices and servers with it. This SDK supports JVM (also Android), JS and Native as targets for most modules. Ktor is used for the HTTP client/server and kotlinx.serialization for the serialization/deserialization. <a href="https://gitlab.com/trixnity/trixnity/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Benedict mentions</p><blockquote>
<p>Trixnity made some huge steps towards a fully featured cross platform matrix SDK written in Kotlin.</p>
<p>Starting with version 1.0.0 in January I added support for cross signing, secrets and key backup.</p>
<p>Version 2.0.0 in April included a large refactoring. This allows you to share a lot code between server and client implementations of the Matrix APIs. For example you can now implement a server with Trixnity. Also Olm has been bundled into most release files, push rules are evaluated, there is a new better TimelineEvent retrieving API and many more. JS has been enabled for the last module, so Trixnity is now fully multiplatform capable. With v2.3.0 dependency injection has been added to Trixnity to make it even more configurable.</p>
<p>The next big release 3.0.0 was in November. We added support for realm as database backend (e. g. for iOS), allowed to exchange the MediaStore, calculate power levels and many more. Some APIs in trixnity-client has been purified, because I improved the StateFlowCache. The developer experience has increased even more with 3.1.0 in December. It adds a completely new Timeline abstraction.</p></blockquote>
<h2>Matrix Community Summit 2022 Berlin</h2>
<p>The Matrix Community Summit 2022 in Berlin was a conference entirely focused on Matrix. <a href="https://cfp.summit2022.matrixmeetup.de/matrix-summit-conference-2022/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>jaller94 contributes</p><blockquote>
<p>Where do I even begin? This has been such a great and fun event.<br/>On the last days of August more than 60 Matrix enthusiasts from various countries met at c-base in Berlin.<br/>We started with a Barcamp day for attendees to discuss spontaneous topics.<br/>The highlight have been two days with 36 presentations and workshops on three stages.<br/>Check out the schedule, if you want to contact some of the speakers: <a href="https://cfp.summit2022.matrixmeetup.de/matrix-summit-conference-2022/schedule/" target="_blank" rel="nofollow noopener noreferrer">https://cfp.summit2022.matrixmeetup.de/matrix-summit-conference-2022/schedule/</a><br/>Thanks to all attendees for the great conversations we've had! Thanks to all presenters for a schedule full of Matrix knowledge! Thanks to the c-base hackerspace for hosting us! Thanks to the sponsors for paying for the food and drinks!</p>
<p>For those who missed this in-person event or wish to revive some of the memories, we're publishing interviews with some community members as a podcast.<br/>In total there are 2 English and 6 German episodes, the last one being published on Fri, 3rd Jan 2023.<br/><a href="https://anchor.fm/matrix-podcast0" target="_blank" rel="nofollow noopener noreferrer">https://anchor.fm/matrix-podcast0</a></p>
</blockquote>
<h2>Nheko</h2>
<p>The motivation behind the project is to provide a native desktop app for Matrix that feels more like a mainstream chat app (Element, Telegram etc) and less like an IRC client. <a href="https://nheko-reborn.github.io/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Nico reports</p><blockquote>

<p>What a year, eh? I don't know if as much happened in your lives as did in mine, but certainly stuff happened! And that certainly was the case for Nheko too! There have been plenty of new and returning faces. Before I go into more detail what happened with Nheko, I'd like to prefix it with a thank you to some specific people, who noticeably contributed to Nheko in the last year on a regular basis:</p>
<ul>
<li>LorenDB, who while causing us a lot of trouble by breaking stuff, also tackles many of the more annoying issues and brings a lot of creativity to problems and their solutions.</li>
<li>MaltE, who despite being usually busy, reworked most of our mobile UI and gave Nheko a pretty bubble mode.</li>
<li>q234rty, who seems to have a solution to every issue and even upstreamed some of those patches to the KDE Qt collection, so that some of the annoying Wayland bugs won't bother many users anymore.</li>
<li>Linerly, Priit and many of the other translators, who tirelessly keep our translations up to date, even if they have to re-translate whole paragraphs after I fixed a single comma...</li>
<li>And many of the other contributors and the community, who report and fix issues as well as just make the whole journey more enjoyable!</li>
</ul>
<p>Now with that out of the way, where are we going?</p>
<p>Nheko got plenty of new features, even though some of them I tried hard to avoid for a long time! For example you can now send confetti. I prefer to toggle that off, because I think it can be distracting, but it is undeniable, that it looks very fun and fun is very important!</p>
<p>Another one is threads. Nheko now supports them, but I would have liked for threads to work differently. Some features, like notification counts for each thread, we skip out on, since it seems very hard to support well. Instead we integrate threads into the timeline and you can filter them out. Ideally threads would behave like dynamic subrooms, with titles and listed below the room list entry, but that seems not doable with the current design of threads in the specification. So we chose a design, that is still useful, but doesn't run into such limitations.</p>
<p>Apart from that we really started investing into our communities support (which is how we call our UX for spaces). While showing communities as a filter is already useful, you can now also modify those filters. Nheko now shows you notification counts, suggests you to join the space for a community (if possible) and allows you to apply permission changes across the whole community.</p>
<p>Speaking of permissions, we invested a lot into improving our management and moderation tooling. With this you can now fine tune join rules for a room (with toggles for knocking, restricted joins and more), edit the permissions using a role-like interface, edit the addresses for a room, edit your sticker packs and more. You can also knock on rooms now, which is a way to request access to a room without it having to be public or manually messaging someone for an invite and we can now show policy lists.</p>
<p>Oh, one thing that definitely deserves a mention, we had our first official CVE! Now, you might think that is not worth celebrating, but it does feel like Nheko is growing up. Partially this is thanks to Github making it easy to file CVEs for security issues though. Who would have thought we ever would have our own CVE entry? We certainly need to improve our test coverage and hardening against such issues, though to be fair in this case I pretty much already wrote a comment about what the problem would be, but just didn't fix it properly... We however are also constantly improving our encryption in general, so hopefully it only becomes more secure from now on. Part of that is fallback keys, which make it easier to come back after a long period away.</p>
<p>Nheko now also evaluates notifications locally. This is especially great for encrypted rooms, since before the server mostly guessed what should notify or not. But it also means you get highlighted when mentioned now, which makes it much easier to find where you were notified. We also now have a line where you last left off reading the room, which is much more useful than I initially wanted to admit and I use it a lot. We also have experimental support for MSC3664, which allows us to hopefully eventually get rid of reply fallbacks, by evaluating the reply relation instead of relying on every message to include the name of who you replied to for highlight purposes...</p>
<p>We also improved performance, however as always anytime you do, you end up adding features, that slow you down again. However current Nheko should still start up significantly faster than 2021 Nheko.</p>
<p>Speaking of improvements, we have made a few for macOS this year. Apple Silicon is now natively supported, so Rosetta is no longer needed to run Nheko. This means improved battery life and performance! At least on Apple Silicon, launching Nheko on macOS should now be roughly as fast as Alt+Tab-ing to another window. Additionally, you can now reply to messages straight from the notification in the Notification Center.</p>
<p>One thing I didn't imagine we would ever have is a D-Bus API. This means you now can do some limited interactions with Nheko via the D-Bus API, like switching rooms using KRunner or Rofi! For FOSDEM we also added some support for widgets, because I wanted to be able to participate in the online FOSDEM without running a second client. This however is an incomplete experience, since... why run a browser in Nheko, if you have a perfectly capable browser client you can use for widgets? Nheko just shows you how to open a widget in a browser.</p>
<p>As already mentioned, we also significantly improved our support for the PinePhone. We now have a bubble layout, which looks better on mobile than the normal layout without bubbles. There has been significant work to make dialogs fit on mobile screens as well as allowing interaction using touch in almost all places. If you want to play with a PinePhone, definitely give Nheko a try and tell us, how you like it!</p>
<p>You might have noticed that we spent a lot of work on moderation tooling and that is probably something we will continue. I have a lot of ideas on how to integrate policy lists with spaces as well as using them to auto-decline invites, automatically ban people and more. How cool would it be if you could ban people community wide using a &quot;banned members&quot; editor in Nheko that is compatible with Mjolnir? And have permissions in spaces apply globally, maybe with some tweaks based on room types? There are a lot of cool ideas out there and we will certainly be experimenting with them.</p>
<p>Another topic will be building out our call support. I want to be able to use Nheko for my gaming sessions. Just drop into a voice chat room and talk to each other. Maybe do my work conference calls, including presentations as well or do remote help for my parents and grandparents over Matrix! We also really need to support calls on other platforms.</p>
<p>Which brings us on the last big goal: We do want to eventually switch to Qt6. We did have a branch testing out how difficult that would be and it was doable, but we were mostly blocked on GStreamer not supporting Qt6 yet. This is fixed in GStreamer 1.24, which should be out soon, so this is probably the time we can start looking into finalizing the port. Qt6 will fix A LOT of Wayland issues and give us a lot of new optimization opportunities. Maybe that is the year we can get below 100MB RAM usage on my ever growing account and make every room switch feel instant.</p>
<p>Well... this was a bit of a long one? Certainly it wasn't the work of one person. The Nheko community seems to just be constantly growing and there are so many people contributing, that it really makes me love open source! Thank you! All of you! It has been a great year (Nheko wise) and I hope 2023 becomes even greater! Have a great year!</p>

<!-- markdownlint-disable-next-line no-alt-text -->
<img src="/blog/img/neko.dev_qiXeJLZOYzYGDltLQptSTZxb.png" style="display: inline-block;"/>
</blockquote>
<h2>Timo Kösters' year in Matrix</h2>
<p>Timo gives an update about Conduit and their year on Matrix. <a href="https://conduit.rs" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Timo on Conduit ⚡️ tells us</p><blockquote>

<p>Hello everyone, I am the maintainer of the Conduit Matrix project and this year my goal was to make Conduit more reliable. I've released three major updates this year, going from v0.2 to v0.5:</p>
<p>For example, the admin room received a lot of love this year. It's a Conduit-specific way of controlling the Matrix server using a chat bot. Commands are parsed using <code>clap</code> and perform actions like creating or deactivating users, adding appservices or listing rooms.</p>
<p>Conduit now supports RocksDB as the database, which is better than the previous ones, but still has some problems. I have worked on a new database abstraction layer that would allow using PostgreSQL in the future.</p>
<p>I have also worked on all sorts of bug fixes. End-to-end encrypted chats work reliably, Server ACLs are respected, the user directory hides private users and so on.</p>
<p>These and many, many other fixes allow me to use Conduit for most of my Matrix interactions now and most of the issues I encounter are client and not server bugs, see <a href="https://conduit.rs/issues" target="_blank" rel="nofollow noopener noreferrer">https://conduit.rs/issues</a></p>
<p>My goal for 2023 is adding all the modern features we need to be competitive with Synapse, like threading, space exploration, registration tokens and so on.</p>
<p>I also want to contribute to the Matrix spec and implement my ideas in Conduit, for example changing state resolution to speed up room joining.</p>
<p>I can't promise to finish all of this next year. I will finish my Bachelor's degree next year and for now I'm a full time student working on these things in the remaining time.</p>
<p>Thanks to all my individual sponsors this year and to FUTO ( <a href="https://futo.org/" target="_blank" rel="nofollow noopener noreferrer">https://futo.org/</a> ) for making this worth it financially as well. <a href="https://liberapay.com/timokoesters" target="_blank" rel="nofollow noopener noreferrer">https://liberapay.com/timokoesters</a></p></blockquote>
<h2>Sticker/emoji pack collection</h2>
<p>Tastytea maintains a collection of MSC2545 sticker pack rooms and gives an update about how the experience has been so far. <a href="https://matrix.to/#/%23stickers-and-emojis%3Atastytea.de" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>tastytea mentions</p><blockquote>
<p>At the end of 2021 i made a room with a Blobcat emoji pack, and since i could
not find a place to announce it, i started <a href="https://matrix.to/#/%23stickers-and-emojis%3Atastytea.de">a space to collect rooms with
sticker/emoji packs</a>.
It began with 3 rooms and under 500 images, but with
<a href="https://github.com/matrix-org/matrix-spec-proposals/pull/2545">MSC2545</a> getting
implemented in more and more clients in 2022, the space quickly grew and we're
now at 7 rooms with more than 30 packs containing over 2000 stickers and emojis!
<img data-mx-emoticon height="32" src="/blog/img/pixie.town_i2OfzCDAFTltAQ1BlFLITwjx.png" alt="Blobcat tooting a party horn" style="height: 2em;"/></p>
<p>One thing i didn't anticipate was that people started to request new stickers
and sometimes submitted their own. We're not just collectors anymore but also
the prime source for Blobcats on Matrix!<sup>[citation needed]</sup>
If you have a sticker room too, please drop by our lobby and tell us
about it so we can list it and make it known to more people! Do you make your
own Blobcats or want to learn how to? Visit <a href="https://matrix.to/#/%23tastytea_emojis%3Atastytea.de">my
room</a>
so we can spread the blobby joy together! <img data-mx-emoticon height="32" src="/blog/img/pixie.town_A5gZTcUCMSFX0H2ag1kOVkgw.png" alt="Blobcat holding heart in its paws" style="height: 2em;"/></p></blockquote>
<h2>Meetups in Berlin</h2>
<p>Berlin has a vivid Matrix community with not only one, but two Matrix meetups.</p>

<p>jaller94 tells us</p><blockquote>
<p>Berlin has a vivid Matrix community with not only one, but two Matrix meetups.</p>
<p>Once a month, the Matrix User Meetup Berlin (MUMB) invites people to chat about Matrix and meet other users.<br/>In summer this exchange of ideas and starting points into Matrix was sometimes combined with food from the BBQ grill.<br/>For their upcoming events in 2023, check out the room <a href="https://matrix.to/#/#mumb:c-base.org">#mumb:c-base.org</a>. It takes place at c-base on the first Wednesday of a month.<br/>Thanks to the organiser <a href="https://matrix.to/#/@saces:c-base.org">saces</a> for bringing people together!</p>
<p>Furthermore, we have the Berliner Matrix Salon 🍷 (previously called Matrix Meetup Berlin, which made it hard to tell apart from the MUMB).<br/>In the first half of 2022 we had regular meetups for developers and server admins to talk about their Matrix projects. This meetup eventually led to the Matrix Community Summit in August.<br/>We still meet infrequently to discuss our projects and what public events we could host next. We'd love to host a series of presentations at various offices which also appeal to an audience outside the Matrix community (e.g. education, public sector and health care which have a growing Matrix adoption in Germany). Ping me or <a href="https://matrix.to/#/@yan:datanauten.de">Yan</a>, if you want to help by being a presenter, have access to an office or know of a particular audience in Berlin to bring Matrix to.<br/>The room is <a href="https://matrix.to/#/#matrix-berlin:matrix.org">#matrix-berlin:matrix.org</a>. Feel free to ask when we're meeting next.</p>
</blockquote>
<h2>Sailtrix</h2>
<p>Sailtrix is a Matrix client for SailfishOS. <a href="https://forum.sailfishos.org/t/sailtrix-matrix-client-supporting-end-to-end-encryption/7199" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>HengYeDev contributes</p><blockquote>

<p>The following major changes have been applied to Sailtrix in the year 2022, in no particular order:</p>
<ul>
<li>Basic emoji verification</li>
<li>SSO Login</li>
<li>Create room</li>
<li>Integration with Sailfish.Share API</li>
<li>Room searching UI</li>
<li>and numerous cosmetic improvements and bugfixes</li>
</ul>
</blockquote>
<h2>This year in NeoChat</h2>
<p>NeoChat is a client for Matrix, the decentralized communication protocol for instant messaging. It is a fork of Spectral, using KDE frameworks, most notably Kirigami, KConfig and KI18n. <a href="https://invent.kde.org/network/neochat" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Tobias Fella mentions</p><blockquote>

<p>It's been an interesting year, that's for sure :)</p>
<p>Let's start with some statistics:</p>
<p>Some quick git magic shows 689 commits for this year so far; Roughly 200 of those were for translations.</p>
<p>On the topic of translations, NeoChat is currently (almost) fully translated into 17 languages, with 17 others being in progress.</p>
<p>One of the major areas of work this year - like last year - has been end-to-end-encryption, which, as of last week, is released in libQuotient and NeoChat. This means that you can now read new messages and verify your session with other devices. You won't yet be able to recover from (most) undecryptable messages, we're working on implementing those parts of the matrix specification.</p>
<p>NeoChat's user interface saw major improvements this year:</p>
<p>The message list has been improved to be less buggy, adapt better to different form-factors and the different appearance options NeoChat offers, like the &quot;compact&quot; message style.</p>
<p>The compact style also recently gained a sibling in the equivalent style for the room list, which makes the list more compact by not showing the last message of the room.</p>
<p>Input handling has been overhauled, as a result user mentions are now highlighted while writing a message, making them more reliable and appear less magic to the user.</p>
<p>More new features include basic support for room search, improved emoji and reaction handling (including better emoji data, search and a skin tone selector), basic developer tools, support for showing and responding to polls and an improved account switcher. One of my personal highlights is support for collapsing large amounts of state events, which makes low-activity rooms significantly more pleasant to use.</p>
<p>On the moderation side, we've implemented support for reporting messages to the homeserver administrators and improved the kicking and banning support.</p>
<p>Progress on the space support has unfortunately been slower than hoped, with the only result of the GSoC project being the space list that is shown at the top of the room list. Space support will be one of the areas to work on in 2023.</p>
<p>Plasma users have gained some nice integration points with their desktop: File uploads and downloads will now be shown in plasma's job tracker, there is now a D-Bus runner for opening rooms, and you can share messages with purpose-enabled apps.</p>
<p>Finally, we've been working on improving NeoChat's settings. Visually, the application and room settings have been ported to newer components that look significantly nicer, especially on mobile devices. We've also added settings for configuring room visibility, join rules and notifications and added support for configuring a proxy to use when connecting to a homeserver.</p>
<p>In terms of contributors, this year was better than last year, with several people becoming active in development and bug reporting. We're especially excited about having been able to add James Graham as a third maintainer for NeoChat after all his work, focusing mostly on NeoChat's front-end and settings.</p>
</blockquote>
<h2>imbev's year in Matrix</h2>
<p>imbev gives an update about what they have been up to this year.</p>

<p>imbev tells us</p><blockquote>
<p>This past year I have worked on several projects using Matrix:</p>
<ul>
<li><a href="https://gitlab.com/imbev/matrix-rss-bridge">matrix-rss-bridge</a>
<ul>
<li>This is a bot that can be configured to watch RSS/Atom feeds and relay to Matrix rooms. It is written in Python, configured with a single <code>config.toml</code>, and licensed under the GPLv3.</li>
<li>I don't actively work on it, however I will review and merge contributions that improve the project.</li>
</ul>
</li>
<li><a href="https://gitlab.com/imbev/matrix-debate-bot">matrix-debate-bot</a>
<ul>
<li>This is a bot that &quot;moderates&quot; discussion in Matrix rooms. It does nothing more than provide a signal every 2 minutes. Also in Python, interacted with via &quot;command&quot; messages, and licensed under the GPLv3.</li>
<li>Same thing as the previous project :)</li>
</ul>
</li>
<li><a href="https://gitlab.com/imbev/matrix-quicksetup">matrix-quicksetup</a>
<ul>
<li>This is a docker compose file and a few config files to help setup a Matrix homeserver and client. The homeserver setup is Conduit, and the client is Cinny. I don't advise that anyone use this in a serious deployment, but if you want to quickly test Matrix entirely on your local machine, this may be useful.</li>
<li>Same as previous</li>
</ul>
</li>
<li><a href="https://codeberg.org/imbev/simplematrixbotlib">simplematrixbotlib</a>
<ul>
<li>This is an easy to use bot library for the Matrix ecosystem written in Python. Having taken ownership of the project, I maintain the project with help from @kim:sosnowkadub.de, @moanos:hyteck.de, and others. Thank you for your contributions!</li>
<li>While I anticipate releasing version 3 of simplematrixbotlib, this next project has captured my focus recently.</li>
</ul>
</li>
<li><a href="https://codeberg.org/imbev/matrix-social">matrix-social</a>
<ul>
<li>matrix-social is a Matrix &quot;Social Media&quot; client. It is a webapp written in Rust using WASM, Yew, and the Matrix Rust SDK. Inspired by the design of Reddit, matrix-social will provide a similar experience, but based entirely upon Matrix. By providing seamless interoperability with Matrix chat clients, matrix-social will extend the Matrix ecosystem without dividing it. matrix-social currently lacks crucial features that will be added soon.</li>
<li>I actively develop matrix-social and will be doing so for the foreseeable future. At the moment, I am porting the styling from the Bulma CSS framework to TailwindCSS for greater control. If you'd like to try out the current state of matrix-social, <a href="https://imbev.codeberg.page/matrix-social/">https://imbev.codeberg.page/matrix-social/</a> is available. Join us in the Matrix room <a href="https://matrix.to/#/#matrix-social:matrix.org">#matrix-social:matrix.org</a> !</li>
</ul>
</li>
</ul>
</blockquote>
<h2>Kitsune's year in Matrix</h2>
<p>Kitsune, one of the Spec Core Team members and maintainer of the Quotient client for Matrix, gives an update about their work this year as well as some new projects.</p>

<p>kitsune mentions</p><blockquote>

<p>This year hasn't been very productive for me (not in Matrix at least) but a few things are worth a mention.</p>
<h3><a href="https://github.com/quotient-im">Quotient</a></h3>
<p>This year I finally got to diving into the (new) E2EE code for libQuotient that NeoChat fellows started writing back in 2021, and was quite happy to end up collaborating with <a href="https://matrix.to/#/@tobiasfella:kde.org">Tobias Fella</a> on making it even better, all the way to merging and releasing way overdue libQuotient 0.7.0. The best news for me in all this was not even getting E2EE to its first actually usable release but the fact that libQuotient is no more a one man show. And now that there's yet another libQuotient-based client (with much more solid traction than any client before), there's hope that the project will move on at a somewhat steadier pace.</p>
<h3>Spec Core Team</h3>
<p>I did my share of MSC reviews (much fewer than I'd like to) and carried on with my role of ensuring Element doesn't throw too much weight behind its contributions (although there are a few other people in SCT who seriously push for neutrality in things we work on; so that role is rather formal). One thing that I unfortunately did not find enough time to help with this year but I'm sure we'll make it happen in 2023 is to move our API definitions from Swagger (v2) to OpenAPI v3, ditching all the Swagger extensions we had to add - thanks to <a href="https://github.com/zecakeh">Kevin</a> for driving this home.</p>
<h3>CLUP.chat</h3>
<p>About a year ago I was contacted by folks who wanted to use Matrix as a backend to bridge WhatsApp, Signal and Telegram for scout (and other) communities in Germany and asked me to be their technical advisor. Less than a year later we went live (you can connect the groups <a href="https://clup.chat/">here</a>), soon after ran into rate-limiting issues <em>outside</em> of Matrix (centralised networks, heh...), did the homework, and now busy making the whole thing worth charging money for. The backend is almost entirely vanilla code for Synapse and Mautrix-based bridges, plus a small website and a non-Matrix bot to onboard people.</p>
</blockquote>
<h2>Jae's year of Matrix</h2>
<p>Jae gives an update about what they worked on this year.    <a href="From" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Jae (Beep) shares</p><blockquote>

<p>Yet another year well spent on Matrix, which was a bit more <em>dynamic</em> than the previous ones.<br/>
From mitigating spam attacks to creating brand-new projects and also contributing to others, there's no shortage of news.</p>
<h3><a href="https://sr.ht/~jae/cert-monitor/">cert-monitor</a></h3>
<p><code>cert-monitor</code> is a small program made entirely in vanilla Python that checks the validity of your SSL certificates and warn you when they are about to expire.<br/>
The idea for it originated in a Matrix room in which the other administrator would usually forget to renew SSL (bringing down their homeserver).<br/>
The software can send notifications to e-mails and Matrix and other methods are in the works like NTFy (but a bit on stale since Matrix support was the main goal).</p>
<h3><a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3868">MSC3868: Room Contribution</a></h3>
<p>The MSC3868 (currently still a draft) is a spec proposal by me and Aminda to add a way for rooms to advertise easily official links like code repositories, ways to contribute to translations, donations and more but only showing to users inside the room.<br/>
The start of it is that we noticed that usually users don't even bother reading the topic/MOTD of the room, which renders putting links inside of it just about useless in most cases.<br/>
The proposal is still being refined, but the big lines are there already!</p>
<h3><a href="https://git.sr.ht/~jae/gh-bot">gh-bot</a></h3>
<p><code>gh-bot</code> is a small bot made to be used with the webhook function of various Git forges (namely GitHub, GitLab and Gitea/Forgejo).<br/>
The bot itself is pretty simple and will just output new commits, new stars and build statuses in all the rooms the bot is.</p>
<h3><a href="https://git.sr.ht/~jae/hsl-matrix-notifier">hsl-matrix-notifier</a></h3>
<p><code>hsl-matrix-notifier</code> has a bit of an exotic use case: it is made to track problems with the Helsinki public transports company and warn about potential disruptions.<br/>
For now, it is very basic and is still being worked on to have a better version (like if no news, it will still post old stuff when I would like in term something more like an RSS feed).<br/>
When I move, I'll probably spin off this bot to make a local version or even build something, so it can be configured by city.</p>
<hr/>
<p>In the end, this year has been a very dynamic one in the Matrix world, and I can't wait to see what is coming next.<br/>
For my part, I don't intend to stop there, and I have even more Matrix related projects, so stay tuned!<br/>
Oh also, I almost forgot, happy new year Matrixians, stay awesome!</p>
</blockquote>
<h2>Cinny</h2>
<p>Cinny is a Matrix client for instant messaging. Our main goal is to make the best UI/UX so that less technical folks can easily adopt Matrix. <a href="https://cinny.in" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>ajbura shares</p><blockquote>
<p>Cinny is a Matrix client for instant messaging. Our main goal is to make the best UI/UX so that less technical folks can easily adopt Matrix.<br/>2022 has been really productive year for Cinny, we have landed Full Spaces support, Room settings, Custom emojis and stickers, Session verification and cross-signing, and so many cool features.</p><p>Lately, we have been working on a design system for Cinny and it is almost ready to release. Our short-term goals for 2023 would be to incorporate the design system into Cinny, and convert the code to TypeScript both of which will greatly improve the developer and user experience.</p><p>You can join <a href="https://matrix.to/#/#cinny-space:matrix.org">Cinny space</a> to talk about it or browse <a href="https://cinny.in">https://cinny.in</a> </p>

<!-- markdownlint-disable-next-line no-alt-text -->
<img src="/blog/img/matrix.org_nIQXMyDqrhZmlzaPlmcPHPKV.png" style="display: inline-block;"/>
</blockquote>
<h2>2022 year in Nyatrix</h2>
Nyaoori gives us an update about their various Matrix related projects.

<p>Nyaaori ⚛️ tells us</p><blockquote>
      <ul>
        <li>Initial workings on spec.cat
          <ul>
            <li>Intended to be a community-driven extension specification to allow for easier collaboration and client/server integration prior to submitting an MSC</li>
            <li>Would allow for finalising community things even if they get little to no attention from SCT</li>
            <li>Eventually will take over maintenance of Catalyst</li>
          </ul>
        </li>
        <li>Initial work on decentralised trust/moderation system
          <ul>
            <li>Should work on under any federated system, not just matrix</li>
            <li>Intended to reduce workload on moderators/admins</li>
            <li>Makes use of a web of trust system, with each user or server being their own center of trust</li>
          </ul>
        </li>
        <li>Catalyst (fork of conduit) progress
          <ul>
            <li>Cacophony
              <ul>
                <li checked="false">
                  <p>Implementation of Discord C2S inside a matrix homeserver</p>
                </li>
                <li checked="false">
                  <p>Marginally modified Discord web client can connect to it</p>
                </li>
              </ul>
            </li>
            <li>Partial Dendrite API support
              <ul>
                <li checked="false">
                  <p>Allows using TARDIS</p>
                </li>
              </ul>
            </li>
            <li>Room V10 support
              <ul>
                <li checked="false">
                  <p>=&gt; Upstreamed to Conduit</p>
                </li>
              </ul>
            </li>
            <li>Support for private read receipts
              <ul>
                <li checked="false">
                  <p>=&gt; Upstream in progress</p>
                </li>
                <li>Partial support for displaying space hierarchies</li>
              </ul>
            </li>
            <li>Backfill to other servers via S2S
              <ul>
                <li checked="false">
                  <p>=&gt; Upstream in progress</p>
                </li>
              </ul>
            </li>
            <li>Code refactor alongside Conduit</li>
            <li>Many minor bug fixes
              <ul>
                <li checked="false">
                  <p>=&gt; Most upstreamed</p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>Initial research into designing my own matrix client
          <ul>
            <li>Intended to be extensible</li>
            <li>Plugins/extensions should be installable via matrix itself</li>
            <li>Eventually will be spec.cat&apos;s reference client</li>
          </ul>
        </li>
      </ul>

</blockquote>

<h2>Ement</h2>
<p>Ement or ement.el is a Matrix client for GNU Emacs, the classic-yet-ever-new text editor and Lisp environment. <a href="https://github.com/alphapapa/ement.el" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>alphapapa contributes</p><blockquote>
<p>
<a href="https://github.com/alphapapa/ement.el">Ement</a> is a Matrix client for <a href="https://www.gnu.org/software/emacs/">GNU Emacs</a>, the classic-yet-ever-new text editor and Lisp environment.  After a couple of years of off-and-on development, 2022 saw the first versioned release, published to <a href="https://elpa.gnu.org/">GNU ELPA</a>, the official Emacs package repository (so it's installable into Emacs "out-of-the-box," without any additional configuration).
</p>

<p>
This development was enabled by the maturation and publishing of Ement's underlying HTTP library, <a href="https://github.com/alphapapa/plz.el">plz</a>, also to ELPA.  And another library, <a href="https://github.com/alphapapa/taxy.el">taxy</a>, used in Ement for organizing rooms into meaningful groups for the UI, was also released to ELPA.
</p>

<p>
Along the way, Ement gained useful features like a helpful command menu based on the <a href="https://github.com/magit/transient">Transient</a> library (the one used in <a href="https://magit.vc/">Magit</a>, the popular Emacs frontend to git), the ability to show and send images, files, and reactions, read receipts, room directories and searching, an improved notification system, fancy, configurable room grouping provided by <code>taxy</code>, and many other improvements and fixes.
</p>

<p>
As well, although Ement doesn't support E2EE natively, users have successfully used it via <a href="https://github.com/matrix-org/pantalaimon">Pantalaimon</a>, the E2EE proxy daemon, allowing Ement to be used with encrypted rooms.
</p>

<p>
Altogether, Ement now provides a stable, reliable client for Emacs users to "jack in" to the Matrix.  Users and interested parties are invited to join the chat room, <code>#ement.el:matrix.org</code>, where users help each other and announcements are made.
</p>

<p>
Looking forward to 2023, it's planned to improve support for newer versions of the client-server spec.  Sliding-sync support will be especially helpful for improving initial sync times, and the new event-to-timestamp endpoints will aid in searching room events and paging back in history by date.  As well, the next stable release of Emacs, version 29, will include native SQLite support, and the author looks forward to investigating how that might be helpful for Ement (e.g. caching events locally, similar to Element).
</p>

<p>
And as always, like Emacs, Ement is Free Software, so contributions are welcome.  Feel free to submit bug reports, feature requests, and other feedback on the repo's issue tracker and in the chat room.</p></blockquote>
<h2>Matrix Highlight</h2>
<p>Matrix Highlight is a web annotation tool based on Matrix. It allows you to select and highlight text on webpages, as well as comment on it. Because it's built on Matrix, you can keep this information hosted on your own hardware, and highlight pages together with other users. <a href="https://github.com/DanilaFe/matrix-highlight" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Daniel mentions</p><blockquote>

<p>Matrix Highlight is a web annotation tool based on Matrix. It allows you to select and highlight text on webpages, as well as comment on it. Because it's built on Matrix, you can keep this information hosted on your own hardware, and highlight pages together with other users.</p>
<p>This year, Matrix Highlight switched to manifest V2. This is a browser extension version format supported by Firefox (Chrome too, but not for the web store). Now, you can highlight pages from Firefox! In addition to this, the project switched to using a shadow DOM for styling its UI elements, which makes it significantly less likely to be affected by the style and design of the webpage it's running on.</p>
<p>You can find Matrix Highlight on its <a href="https://github.com/DanilaFe/matrix-highlight">GitHub page</a> or read about it in the <a href="https://danilafe.com/blog/introducing_highlight/">introductory blog post</a>.</p></blockquote>
<h2>Populus-Viewer</h2>
<p>Populus-Viewer is a social annotation tool, powered by Matrix. It lets you attach Matrix chats to PDFs, images, videos, and audio files. <a href="https://opentower.github.io/populus-viewer/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>gleachkr tells us</p><blockquote>
<p>Populus-Viewer is a social annotation tool, powered by Matrix. It lets you attach Matrix chats to PDFs, images, videos, and audio files.</p><p>It&#x27;s been a big year for populus! Since last January, we&#x27;ve seen huge improvements in usability, appearance, and Matrix feature support, that have taken populus from a fun experiment to a useful tool (though we&#x27;re still considering ourselves in beta). The topline item is that we&#x27;ve achieved our original goal of supporting matrix-powered social annotation of PDFs and audiovisual media. So what&#x27;s left to do?</p><p>Here are some ideas for the New Year.</p><ul><li>Let&#x27;s add support for annotating web files: HTML (out on the web) and WARC (web archives, stored as files on matrix).</li><li>Let&#x27;s add widget support for populus chats, so you can annotate your documents with all sorts of matrix-powered tools.</li><li>Let&#x27;s get moving on <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3775">the</a> <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3752">social</a> <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3592">annotation</a> <a href="https://github.com/matrix-org/matrix-spec-proposals/pull/3574">MSCs</a></li><li>Stickers?</li></ul><p>If you&#x27;d like to talk about any of these ideas, or add some of your own, come join us at: <a href="https://matrix.to/#/%23opentower%3Amatrix.org">#opentower:matrix.org</a></p></blockquote>

<!-- Stuff I forgot because I didn't tag it... -->
<h2>Aminda's matrix update</h2>

<p>Aminda (she/they 🏳️‍⚧️ MSC1769|MSC3189) reports</p><blockquote>
<p>so I have been doing</p>
<ul>
<li><a href="https://gitea.blesmrt.net/mikaela/gist/commits/branch/master/matrix">https://gitea.blesmrt.net/mikaela/gist/commits/branch/master/matrix</a></li>
<li><a href="https://git.piraattipuolue.fi/Pikaviestimet/Pikaviestimet/commits/branch/master/matrix">https://git.piraattipuolue.fi/Pikaviestimet/Pikaviestimet/commits/branch/master/matrix</a></li>
<li><a href="https://github.com/Mikaela/mikaela.github.io/commits/master/blog/_posts">https://github.com/Mikaela/mikaela.github.io/commits/master/blog/_posts</a></li>
<li><a href="https://github.com/Mikaela/mikaela.github.io/commits/master/pages/matrix.markdown">https://github.com/Mikaela/mikaela.github.io/commits/master/pages/matrix.markdown</a></li>
<li><a href="https://github.com/Mikaela/mikaela.github.io/commits/master/txt/matrix.txt">https://github.com/Mikaela/mikaela.github.io/commits/master/txt/matrix.txt</a></li>
</ul></blockquote>
<h2>matrix-docker-ansible-deploy</h2>
<p>Matrix (An open network for secure, decentralized communication) server setup using Ansible and Docker <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/" target="_blank" rel="nofollow noopener noreferrer">↗</a></p>

<p>Slavi tells us</p><blockquote>
<p>For <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/">matrix-docker-ansible-deploy</a>, 2022 started with <strong>breaking the <a href="https://github.com/matrix-org/synapse">Synapse</a> monopoly</strong> by <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#dendrite-support">adding support</a> for the <a href="https://github.com/matrix-org/dendrite">Dendrite</a> Matrix homeserver in early January. This required various internal changes so that the <a href="https://www.ansible.com/">Ansible</a> playbook would not be Synapse-centric anymore. This groundwork paved the way for continuing in this direction and we <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#conduit-support">added support</a> for <a href="https://conduit.rs/">Conduit</a> in August.</p>
<p>When it comes to the <code>matrix-docker-ansible-deploy</code> Ansible playbook, 2022 was the year of the non-Synapse homeserver implementation. In practice, none of these homeserver implementations seem ready for prime-time yet and there is no migration path when coming from Synapse. Having done our job of adding support for these alternative homeserver implementations, we can say that we're not getting in the way of future progress. It's time for the Dendrite developers to push harder (development-wise) and for the Synapse developers to take a well-deserved long (infinite) break, and we may get to see more people migrating away from Synapse in the next year(s).</p>
<p>Support for the following new <strong>bridges</strong> was added:</p>
<ul>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#postmoogle-email-bridge-support">Postmoogle</a> for bi-directional email bridging, which supersedes my old and simplistic <a href="https://github.com/devture/email2matrix">email2matrix</a> one-way bridge-bot</li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#mautrix-discord-support">mautrix-discord</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#go-skype-bridge-bridging-support">go-skype-bridge</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#matrix-appservice-kakaotalk-support">matrix-appservice-kakaotalk</a></li>
</ul>
<p>Support for the following new <strong>bots</strong> was added:</p>
<ul>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#buscarron-bot-support">buscarron bot</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#honoroit-bot-support">Honoroit bot</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#matrix-registration-bot-support">matrix-registration-bot</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#matrix-hookshot-bridging-support">matrix-hookshot</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#maubot-support">maubot</a></li>
</ul>
<p>Support for the following new <strong>components and services</strong> was added:</p>
<ul>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#borg-backup-support">Borg backup</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#cactus-comments-support">Cactus Comments</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#cinny-support">Cinny</a> client support</li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#ntfy-push-notifications-support">ntfy</a> notifications</li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#matrix-ldap-registration-proxy-support">matrix-ldap-registration-proxy</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#matrix_encryption_disabler-support">matrix_encryption_disabler support</a></li>
<li><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#synapse-s3-storage-provider-support">synapse-s3-storage-provider</a> to stop the Synapse media store from being a scalability problem. This brought along <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#synapse-container-image-customization-support">another feature</a> - an easier way to customize the Synapse container image without having to fork and self-build all of it from scratch</li>
</ul>
<p>Besides these major user-visible changes, a lot of work also happened <strong>under the hood</strong>:</p>
<ul>
<li>
<p>we made <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#potential-backward-compatibility-break-major-improvements-to-synapse-workers">major improvements to Synapse workers</a> - adding support for stream writers and for running multiple workers of various kinds (federation senders, pushers, background task processing workers, etc.)</p>
</li>
<li>
<p>we <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#backward-compatibility-break-changing-how-reverse-proxying-to-synapse-works---now-via-a-matrix-synapse-reverse-proxy-companion-service">improved the compatibility of (Synapse + workers) with the rest of the playbook</a> by introducing a new <code>matrix-synapse-reverse-proxy-companion-service</code> service</p>
</li>
<li>
<p>we started <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#the-playbook-now-uses-external-roles-for-some-things">splitting various Ansible roles out of the Matrix playbook and into independent roles</a> (e.g. <code>matrix-postgres</code> -&gt; <a href="https://github.com/devture/com.devture.ansible.role.postgres">com.devture.ansible.role.postgres</a>), which could be included in other Ansible playbooks. In fact, these roles already power a few <strong>interesting other sibling playbooks</strong>:</p>
<ul>
<li><a href="https://github.com/spantaleev/gitea-docker-ansible-deploy">gitea-docker-ansible-deploy</a>, for deploying a <a href="https://gitea.io/">Gitea</a> (self-hosted <a href="https://git-scm.com/">Git</a> service) server</li>
<li><a href="https://github.com/spantaleev/nextcloud-docker-ansible-deploy">nextcloud-docker-ansible-deploy</a>, for deploying a <a href="https://nextcloud.com/">Nextcloud</a> groupware server</li>
<li><a href="https://github.com/spantaleev/vaultwarden-docker-ansible-deploy">vaultwarden-docker-ansible-deploy</a>, for deploying a <a href="https://github.com/dani-garcia/vaultwarden">Vaultwarden</a> password manager server (unofficial <a href="https://bitwarden.com/">Bitwarden</a> compatible server)</li>
</ul>
</li>
</ul>
<p>These sibling playbooks co-exist nicely with one another due to using <a href="https://traefik.io/">Traefik</a> for reverse-proxying, instead of trying to overtake the whole server by running their own <a href="https://nginx.org/">nginx</a> reverse-proxy. Hopefully soon, the Matrix playbook will follow suit and be powered by Traefik by default.</p>
<p>Last, but not least, to optimize our <a href="https://etke.cc/">etke.cc managed Matrix server hosting service</a>'s performance (but also individual Ansible playbook runs for people self-hosting by themselves using the playbook), we've <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md#2x-5x-performance-improvements-in-playbook-runtime">improved playbook runtime 2-5x</a> by employing various Ansible tricks.</p>
</blockquote>
<h2>MTRNord's Journey of Matrix 2022</h2>
<p>MTRNord is known for starting way too many interesting projects. Definitely worth checking out!</p>

<p>MTRNord tells us</p><blockquote>

<p>Since I worked on so many projects this year, I am trying to group these here.</p>
<h3><a href="https://github.com/MTRNord/matrix-art/pull/121">Matrix-Art</a></h3>
<p>Matrix Art was meant to be a Deviantart or Art Station style image gallery using Matrix. This project, as many others of mine, is currently on ice.</p>
<p>It offered profiles, uploading images and comments using Spaces as FS.</p>
<p>You can see the latest version of it at <a href="https://github.com/MTRNord/matrix-art/pull/121">https://github.com/MTRNord/matrix-art/pull/121</a></p>
<h3><a href="https://github.com/MTRNord/matrix-moderation-widget">Matrix Moderation Widget for Mjolnir</a></h3>
<p>A widget made to be a companion to <a href="https://github.com/matrix-org/mjolnir">Mjolnir</a>. It offers a form input and lists to view the policy lists.</p>
<p>For 2023 this effort is going into the Moderation bot I am currently developing as part of the Matrix Spam ML project. While not being a widget, similar UX decisions are used.</p>
<h3><a href="https://github.com/MTRNord/matrix-fuzz">Matrix Fuzz</a></h3>
<p>A simple fuzzer written in rust to fuzz some endpoints of Synapse.<br/>A Fuzzer is essentially a bruteforce approach to finding bugs. Usually by sending pseudo random characters.</p>
<p>As part of running this, I found a few minor verification issues at Synapse:</p>
<ul>
<li>https://github.com/matrix-org/synapse/issues/13510</li>
<li>https://github.com/matrix-org/synapse/issues/13511</li>
<li>https://github.com/matrix-org/synapse/issues/13512</li>
<li>https://github.com/matrix-org/synapse/issues/13664</li>
</ul>
<p>For 2023 the goal is to fuzz more endpoints, especially within the rooms using fuzzed events.</p>
<h3><a href="https://github.com/MTRNord/mrsbfh">MRSBFH - Matrix-Rust-SDK-Bot-Framework-Helper</a></h3>
<p>In 2022, I also worked on further updating <a href="https://github.com/MTRNord/mrsbfh">https://github.com/MTRNord/mrsbfh</a> which is a command bot framework for the matrix-rust-sdk.</p>
<p>Since then, the SDK massively improved how you interact with the API. Due to this, there are no plans to further develop it as by now the SDK has a sufficient API interface.</p>
<h3><a href="https://github.com/MTRNord/generic-conference-bot/tree/MTRNord/Pretalx">Generic Conference Bot</a></h3>
<p>People likely know the Conference bot from FOSDEM. Back in February, I did work on making it possible to be used more generic without the hard-coded penta integration.</p>
<p>As a result, this branch was created: <a href="https://github.com/MTRNord/generic-conference-bot/tree/MTRNord/Pretalx">https://github.com/MTRNord/generic-conference-bot/tree/MTRNord/Pretalx</a> It offers a way to easily add new backends and adds a pretalx backend. Due to the changes it has, there is currently no way this is possible to upstream, but maybe it will help someone from the community.</p>
<h3><a href="https://github.com/MTRNord/matrix-spam-ml">Matrix Spam ML</a></h3>
<p>This project is mainly a project to experiment with using Machine Learning for Moderation as a warning system.</p>
<p>As part of this effort, there is currently an RNN model and a BERT model available. The trainingset is public.</p>
<p>For users, there is both an API endpoint for this available and a Matrix Mod Bot in progress.</p>
<p>You can find more about it at https://github.com/MTRNord/matrix-spam-ml or join the chat at <a href="https://matrix.to/#/#matrix-spam-ml:midnightthoughts.space">#matrix-spam-ml:midnightthoughts.space</a></p>
<h3><a href="https://gitlab.nordgedanken.dev/MTRNord/matrix-faq-rasa">Matrix Faq Rasa</a></h3>
<p>This is a RasaX based FAQ Bot project. The goal is to have a NLP based FAQ bot. It currently is very simple and not finished. The goal for 2023 is to continue working on this and getting it to a stable level where people can contribute to.</p>
<h3><a href="https://matrix.turbo.fish">Matrix.org Zola</a></h3>
<p>Last but not least, I did kick off the Zola rewrite of Matrix.org together with Thib and jplatte, and a small team of element devs and designers. Please note that this was initiated by the community and still is a community project.</p>
<p>The goal of this rewrite is to move away from Gatsby and rewrite and redesign matrix.org using the zola static page generator.<br/>We made great progress this year, but sadly it will take a bit longer before it can be deployed. :) If you want to watch progress, I suggest looking at things labeled with &quot;zola&quot; in <a href="https://github.com/matrix-org/matrix.org/">https://github.com/matrix-org/matrix.org/</a></p>
<h3><a href="https://miki.community">Miki - A Matrix Wiki</a></h3>
<p>Miki is a MediaWiki meant for Matrix. It isn't a bridge, but instead the goal is to document projects and history around Matrix. This project aims for 2023 to extend the data, while in 2022 the work was focused around infrastructure.</p>
</blockquote>

<p>That's all I know about so far. I hope you had a great year and that the next one will be even better. As you can see, the Matrix community is a riot of colors and seems to grow every year. I absolutely love it!</p>
