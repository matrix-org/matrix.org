+++
title = "Taking FOSDEM online via Matrix"
date = "2021-01-04T12:25:08Z"
path = "/blog/2021/01/04/taking-fosdem-online-via-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/2021-01-04-fosdem.jpg"
+++

<div style="text-align: center; padding-bottom: 1em">
<a href="https://fosdem.org">
    <img src="/blog/img/2021-01-04-fosdem.jpg" alt="FOSDEM" width="480"/>
</a>
</div>

Imagine you could physically step into your favourite FOSS projects’ chatrooms, mailing lists or forums and talk in person to other community members, contributors or committers?  Imagine you could see project leads show off their latest work in front of a packed audience, and then chat and brainstorm with them afterwards (and maybe grab a beer)?  Imagine, as a developer, you could suddenly meet a random subset of your users, to hear and understand their joys and woes in person?

This is [FOSDEM](https://fosdem.org), Europe’s largest Free and Open Source conference, where every year thousands of people (last year, ~8,500) take over the Solbosch campus of the Université Libre de Bruxelles in Belgium for a weekend and turn it into both a cathedral and bazaar for FOSS, with over 800+ talks organised over 50+ tracks, hundreds of exhibitor stands, and the whole campus generally exploding into a physical manifestation of the Internet.  The event is completely non-commercial and volunteer run, and is a truly unique and powerful (if slightly overwhelming!) experience to attend.  Ever since we began Matrix in 2014, FOSDEM has been [the](https://matrix.org/blog/2020/02/03/matrix-at-fosdem-2020) [focal](https://matrix.org/blog/2019/02/04/matrix-at-fosdem-2019) [point](https://matrix.org/blog/2018/02/05/3-d-video-calling-with-matrix-webrtc-and-webvr-at-fosdem-2018) [of](https://matrix.org/blog/2017/02/06/fosdem-2017-report) [our](https://matrix.org/blog/2016/02/03/fosdem-16-retrospective) [year](https://matrix.org/blog/2015/02/04/back-from-fosdem) as we’ve rushed to demonstrate our latest work and catch up with the wider community and sync with other projects.

This year, things are of course different.  Thankfully FOSDEM 2020 snuck in a few weeks before the COVID-19 pandemic went viral, but for FOSDEM 2021 on Feb 6/7th the conference will inevitably happen online.  When this was announced [a few months back](https://twitter.com/fosdem/status/1301167254705303554), we reached out to FOSDEM to see if we could help: we’d just had a lot of fun helping [HOPE go online](https://hackaday.com/2020/08/11/hope-2020-delivers-historic-marathon-of-hacking/), and meanwhile a lot of the work that’s gone into Matrix and Element in 2020 has been around large-scale community collaboration due to COVID - particularly thanks to all the development driven by Element’s [German Education](https://sifted.eu/articles/element-germany-deal/) work.  Meanwhile, we obviously love FOSDEM and want it to succeed as much as possible online - and we want to attempt to solve the impossible paradox of faithfully capturing the atmosphere and community of an event which is “online communities, but in person!”... but online.

And so, over the last few weeks we’ve been hard at work with the FOSDEM team to figure out how to make this happen, and we wanted to give an update on how things are shaping up (and to hopefully reassure folks that things are on track, and that devrooms don’t need to make their own plans!).

Firstly, FOSDEM will have its own dedicated Matrix server at fosdem.org (hosted by [EMS](https://element.io/matrix-services) along with a tonne of Jitsi’s) acting as the social backbone for the event.  Matrix is particularly well suited for this, because:

* We’re an [open standard](https://matrix.org/docs/spec) comms protocol with an open network run under a [non-profit foundation](https://matrix.org/foundation) with loads of [open source implementations](https://matrix.org/docs/projects/try-matrix-now/) (including the reference ones): folks can jump on board and participate via their own servers, clients, bridges, bots etc.
* We provide official bridges through to IRC and XMPP (and most other chat systems), giving as much openness and choice as possible - if folks want to participate via Freenode and XMPP they can!
* We’re built with large virtual communities in mind (e.g. Mozilla, KDE, Matrix itself) - for instance, we’ve worked a lot on [moderation](https://matrix.org/docs/guides/moderation) recently.
* We’ve spent a lot of time improving [widgets](https://youtu.be/Fk7YRiFIwZ4?t=251) recently: these give the ability to embed arbitrary webapps into chatrooms - letting you add livestreams, video conferences, schedules, Q&A dashboards etc, augmenting a plain old chatroom into a much richer virtual experience that can hopefully capture the semantics and requirements of an event like FOSDEM.

We’re currently in the middle of setting up the server with a dedicated [Element](https://element.io) as the default client, but what we’re aiming for is:

* Attendees can lurk as read-only guests in devrooms without needing to set up accounts (or they can of course use their existing Matrix/IRC/XMPP accounts)
* Every devroom and track will have its own chatroom, where the audience can hang out and view the livestream of that particular devroom (using the normal FOSDEM video livestream system).  There’ll also be a ‘backstage’ room per track for coordination between the devroom organisers and the speakers.
* The talks themselves will be prerecorded to minimise risk of disaster, but each talk will have a question & answer session at the end which will be a live Jitsi broadcast from the speaker and a host who will relay questions from the devroom.
* Each talk will have a dedicated room too, where after the official talk slot the audience can pop in and chat to the speaker more informally if they’re available (by text and/or by moderated jitsi).  During the talk, this room will act as the ‘stage’ for the speaker & host to watch the livestream and conduct the question & answer session.
* Every stand will also have its own chatroom and optional jitsi+livestream, as will BOFs or other adhoc events, so folks can get involved both by chat and video, to get as close to the real event as possible (although it’s unlikely we’ll capture the unique atmospheric conditions of K building, which may or may not be a bug ;)
* There’ll also be a set of official support, social etc rooms - and of course folks can always create their own!  Unfortunately folks will have to bring their own beer though :(
* All of this will be orchestrated by a Matrix bot (which is rapidly taking shape over at [https://github.com/matrix-org/conference-bot](https://github.com/matrix-org/conference-bot)), responsible for orchestrating the hundreds of required rooms, setting up the right widgets and permissions, setting up bridges to IRC & XMPP, and keeping everything in sync with the official live [FOSDEM schedule](https://fosdem.org/2021/schedule/xml).

**N.B. This is aspirational, and is all still subject to change**, but that said - so far it’s all coming together pretty well, and hopefully our next update will be opening up the rooms and the server so that folks can get comfortable in advance of the event.

Huge thanks go to the FOSDEM team for trusting us to sort out the social/chat layer of FOSDEM 2021 - we will do everything we can to make it as successful and as inclusive as we possibly can! :)

## P.S. We need help

FOSDEM is only a handful of weeks away, and we have our work cut out to bring this all together in time.  There are a few areas where we could really do with some help:

* Folks on XMPP often complain that the [Bifröst](https://github.com/matrix-org/matrix-bifrost) Matrix&lt;->XMPP bridge [doesn’t support MAMs](https://github.com/matrix-org/matrix-bifrost/issues/64) - meaning that if XMPP users lose connection, they lose scrollback.  We’re not going to have time to fix this ourselves in time, so this would be a great time for XMPP folks who grok xmpp.js to come get involved and help to ensure the best possible XMPP experience!  (Similarly on other bifrost shortcomings).
* It’d be really nice to be able to render nice schedule widgets for each devroom, and embed the overall schedule in the support rooms etc.  The current HTML schedules at [https://fosdem.org/2021/schedule/day/saturday/](https://fosdem.org/2021/schedule/day/saturday/) and (say) [https://fosdem.org/2021/schedule/room/vcollab/](https://fosdem.org/2021/schedule/room/vcollab/) don’t exactly fit - if someone could write a thing which renders them at (say) 2:5 aspect ratio so they can fit nicely down the side of a chatroom then that could be awesome!
* While we’ll bridge all the official rooms over to Freenode, it’d be even nicer if people could just hop straight into *any* room on the FOSDEM server (or beyond) via IRC - effectively exposing the whole thing as an IRC network for those who prefer IRC.  We have a project to do this: [matrix-ircd](https://github.com/matrix-org/matrix-ircd), but it almost certainly needs more love and polish before it could be used for something as big as this.  If you like Rust and know Matrix, please jump in and get involved!
* If you just want to follow along or help out, then we’ve created a general room for discussion over at [#fosdem-matrix:fosdem.org](https://matrix.to/#/#fosdem-matrix:fosdem.org).  It’d be awesome to have as many useful bots & widgets as possible to help things along.
