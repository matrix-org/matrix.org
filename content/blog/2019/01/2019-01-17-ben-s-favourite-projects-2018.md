+++
title = "Ben's favourite projects 2018"
path = "/blog/2019/01/17/ben-s-favourite-projects-2018"
aliases = ["/blog/2019/01/17/bens-favourite-projects-2018"]

[taxonomies]
author = ["Ben Parsons"]
category = ["Thoughts"]
+++

Hi all, Ben here.

Since joining the core team as Developer Advocate last year it's been quite a ride. One of the best things about the job is getting the chance to talk to so many people about their projects and what they would like to see happen in the matrix ecosystem. With so much going on, I just want to say thanks to everyone who has been so welcoming to me and share some of my personal highlights, as I recall them, from 2018!

## Clients

<strong><a href="https://wiki.gnome.org/Apps/Fractal">Fractal</a></strong> was featured in the very first TWIM, announcing v1.26. Since then, the team have hosted two IRL hackfest events (Strasbourg and Seville - where to next, Stockholm? Salisbury?), engaged two GSOC students and continued to push out releases. At this point, Fractal is a full-featured Matrix client for GNOME.

Matrique became <strong><a href="https://gitlab.com/spectral-im/spectral">Spectral</a></strong>, and is generally awesome. Apparently the name "Matrique" was chosen because it sounds French, but those who speak the language well revealed that this name was not ideal! The project was re-named "Spectral", and is going strong. I really appreciate the multi-user facility! It's a great looking client, and runs great on macOS too (protip: get more attention from <code>/me</code> by providing a macOS build…)

On which subject, <strong><a href="https://github.com/neilalexander/seaglass">Seaglass</a></strong> is a native macOS client. First announced in June, this client supports E2EE rooms (via <a href="https://github.com/matrix-org/matrix-ios-sdk">matrix-ios-sdk</a>), and is also available on homebrew.

Ubuntu Touch has the most Matrix clients per-user of any platform. UT epitomises the resilience and collaborative spirit of Open Source. It's a true community maintenance effort, and is as friendly a community as you might meet. <a href="https://github.com/uMatriks/uMatriks">uMatriks</a> came first, but it's <strong><a href="https://github.com/ChristianPauly/fluffychat">FluffyChat</a></strong> that prompted me to install it on my battered old OnePlus One. FluffyChat is now extremely full-featured, with E2EE support being actively discussed.

In the command line, <strong><a href="https://github.com/tulir/gomuks">gomuks</a></strong> appeared and quickly became a competent client, but in terms of sheer enthusiasm and momentum, I must give commendation to <strong><a href="https://github.com/jgkamat/matrix-client-el">matrix-client.el</a></strong>, a newly revived mode for Emacs which turns your editor/OS into a great Matrix Client. I enjoyed using it enough that it began to change my mind about using emacs. Laptops have more than 8mb memory these days anyway.

## A culture of bots

There is a tendency in the community to build a bot for everything and anything. This has reached the point where there are multiple flairs available depending on what bots you like to make (silly vs serious.)

<a href="https://github.com/turt2live">TravisR</a> was perhaps the first person I saw to get the obsession, creating
<ul>
 	<li><a href="https://github.com/turt2live/matrix-monitor-bot">matrix-monitor-bot</a></li>
 	<li><a href="https://github.com/turt2live/matrix-trello-bot">matrix-trello-bot</a></li>
 	<li><a href="https://github.com/turt2live/matrix-alias-bot">matrix-alias-bot</a></li>
 	<li><a href="https://github.com/turt2live/matrix-hashtag-bot">hashtag bot</a> (perhaps the most absurd!)</li>
</ul>
and more…

Cadair even made <a href="https://github.com/Cadair/skill-twim">twimbot</a>, designed to make it easier to consume and produce <a href="/twim">This Week in Matrix</a> itself.

In June <a href="https://matrix.to/#/@tulir:maunium.net">tulir</a> started <a href="https://github.com/maubot/maubot">maubot</a>, a plugin-based bot system built in Python, which now also has a management UI.

## All bridges lead to Matrix

Or from Matrix, depending on which way you want to send the message.

Around May, I started to notice another obsession brewing in the community. Bridging is a core part of the Matrix mission, but it was around this time I started seeing it in the wild.

Summer 2018 <a href="https://matrix.to/#/@Half-Shot:half-shot.uk">Half-Shot</a> began working in the Matrix core team, and was <em>hugely</em> productive in maintaining and developing the bridge infrastructure for matrix.org. IRC bridging is far more stable and reliable now than it was a year ago. And yet there are still more bridges - too many to list, so I'm picking the ones I've used and enjoyed.

Discord is bridged by <a href="https://github.com/Half-Shot/matrix-appservice-discord">matrix-appservice-discord</a>, handled by <a href="https://matrix.to/#/@Half-Shot:half-shot.uk">Half-Shot</a>, aided and abetted by <a href="https://matrix.to/#/@andrewm:amorgan.xyz">anoa</a> but with a new maintainer this year, <a href="https://matrix.to/#/@sorunome:sorunome.de">Sorunome</a>. This bridge is now feature-rich and sits at v0.3.1.

<a href="https://matrix.to/#/@tulir:maunium.net">tulir</a>'s suite of bridges including <strong><a href="https://github.com/tulir/mautrix-telegram">mautrix-telegram</a></strong> and <strong><a href="https://github.com/tulir/mautrix-whatsapp">mautrix-whatsapp</a></strong> are extremely stable and useful - big thank you to <a href="https://github.com/turt2live">TravisR</a> for maintaining <a href="https://t2bot.io/">t2bot.io</a> and hosting the Telegram bridge too.

<strong><a href="https://github.com/tijder/SmsMatrix">SMSMatrix</a></strong>, a phone-hosted bridge is simple and works great for SMS bridging.

## Libraries, SDKs, Frameworks

I enjoyed using <strong><a href="https://github.com/turt2live/matrix-bot-sdk">matrix-bot-sdk</a></strong> for building <a href="https://github.com/benparsons/elizabot">elizabot</a> (more coverage needed for that!), and the SDK recently received support for application services.

In April, <a href="https://matrix.to/#/@kitsune:matrix.org">kitsune</a> announced v0.2 of <strong><a href="https://github.com/QMatrixClient/libqmatrixclient">libqmatrixclient</a></strong> describing it as “the first one more or less functional and stable" - confidence! This library now powers both Quaternion and Spectral. QMatrixClient has continued to get updates, plus features including lazy loading and VoIP signalling.

There are a few libs I want to pay more attention to this year, starting with <a href="https://matrix.to/#/@tulir:maunium.net">tulir</a>'s <strong><a href="https://github.com/maubot/maubot">maubot</a></strong> now that it has been rewritten in Python. I'm also excited to see <strong><a href="https://github.com/ma1uta/jmsdk">jmsdk</a></strong>, part of <a href="https://matrix.to/#/@ma1uta:matrix.org">ma1uta</a>'s broader ecosystem of Matrix tooling - a Java-based SDK.

## Ruma Resurrection

Until around June, <strong>Ruma</strong> was receiving regular updates. There was a pause as the team waited for Rust async/await to land, and also to get some stability in the Matrix Spec. Still waiting on Rust, but now that the Matrix Spec is stabilising, Ruma is showing signs of life too. I have also been watching other homeserver projects begin to restart, which makes for a great start to 2019.

## DSN Traveller by Florian

Matrix was featured as part of a Master's thesis by Florian Jacob.

> <a href="https://dsn-traveller.dsn.scc.kit.edu/">DSN Traveller</a> tries to get a rough overview of how the Matrix network is structured today. It records how many rooms it finds, how many users and servers take part in those rooms, and how they relate to each other, meaning how many users a server has and of how many rooms it is part of.

Florian's thesis was handed in last August. <a href="https://github.com/florianjacob/dsn-traveller">Source code is available</a>.

> All details at <a href="https://dsn-traveller.dsn.scc.kit.edu/">https://dsn-traveller.dsn.scc.kit.edu/</a>, room at <a href="https://matrix.to/#/#dsn-traveller:dsn-traveller.dsn.scc.kit.edu">#dsn-traveller:dsn-traveller.dsn.scc.kit.edu</a>.

## Still more

Synapse dominates the homeserver space right now, so if you want to host your own homeserver today it's the obvious choice. Too great a variety of installation guides was doing more harm than good, so <a href="https://matrix.to/#/@natrius:matrix.org">Stefan</a> took the initiative to create a <strong>definitive community-driven Synapse installation guide</strong>, including a room to discuss and improve the text. Find the <a href="/docs/guides/installing-synapse">guide linked from here</a>, and chat about the guide in <a href="https://matrix.to/#/synapseguide:matrix.org">#synapseguide:matrix.org</a>.

I want to use Matrix, and I want to host my own homeserver. As such, <strong><a href="https://github.com/spantaleev/matrix-docker-ansible-deploy">matrix-docker-ansible-deploy</a></strong> is a project I absolutely love. It uses Synapse docker images from the Matrix core team, and combines them with Ansible playbooks written and organised by <a href="https://matrix.to/#/@slavi:devture.com">Slavi</a>. It lets you quickly deploy everything needed for a Synapse homeserver, and it's simple enough that even I can use it.

<strong><a href="https://github.com/matrix-construct/construct">Construct</a></strong>, a homeserver implementation in C++ began successfully federating with Matrix, work progressed <a href="/blog/2018/05/18/this-week-in-matrix-2018-05-18/">from around April/May</a>.

Having a <strong><a href="https://shields.io/#/examples/chat">Matrix-native mode for shields.io</a></strong> (those counter/indicator images you often see at the top of repos) seems like something petty at first, but it's actually a great indicator of the importance of Matrix from the outside. Plus, I love seeing the images at the top of different repos. Thanks <a href="https://matrix.to/#/@brendan:abolivier.bzh">Brendan</a> for helping this along.

Two students worked on Matrix-related projects during <strong><a href="https://summerofcode.withgoogle.com/projects/?sp-search=matrix">GSOC 2018</a></strong>.
<ul>
 	<li><a href="https://matrix.to/#/@Zil0:matrix.org">Zil0</a> created E2EE bindings for <a href="https://github.com/matrix-org/matrix-python-sdk">matrix-python-sdk</a></li>
 	<li><a href="@apwhitehat:matrix.org">APwhitehat</a> worked on the federation APIs in Dendrite</li>
</ul>
Something which came in super-helpful for me when testing homeserver installations was <strong><a href="https://neo.lain.haus/fed-tester/">f0x's fed-tester</a></strong>. <a href="https://github.com/f0x52/fed-tester/">Source code available</a> (obv.)

## Thanks for all the projects

Thanks for a great 2018. There was so much to learn about, so much to write about, and so many great community members to meet and chat to! If I didn't mention your project, I'm sorry to have been either forgetful or to not be able to include everything.

If you think I've missed something, or if there's a project I should have included rather than another, or even if you just disagree with my choices, let's discuss it in <a href="https://matrix.to/#/#TWIM:matrix.org">#twim:matrix.org</a>. See you there, and let's all parade ahead to a productive, open, interoperable 2019!
