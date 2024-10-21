+++
title = "Running online events with Open Source communication tools"
aliases = ["/docs/guides/running-online-events"]
+++

Starting in 2020, Team Matrix planned to start running regular meetup events,
with speakers, talks, Q+A, beer, pizza etc.

We hosted one, in London, in February. Around that time and immediately
afterward, much of the world shut down due to a global pandemic, and hosting
in-person meetups became infeasible.

Rather than drop the idea, we decided to make use of the technologies we
regularly promote to host a *virtual* meetup event. The idea being to try to
recreate the fun and atmosphere of a real meetup in a decentralised way.

The resulting event, when viewed in directly in Element, appears as below, or
[watch the full recording](https://www.youtube.com/watch?v=APVp-20ATLk).

![riot-jitsi-widget](/docs/legacy/riot-jitsi-widget.png)

## Use Jitsi for Video

It's important to us, wherever possible, to use open tools. Jitsi Meet is an
open-source, self-hostable video conferencing platform.
[Installing Jitsi is a much-documented experience](https://github.com/jitsi/jitsi-meet/blob/master/doc/quick-install.md)
that I won't delve into here, but for our purpose we used our
installation at <https://jitsi.modular.im>.

First, we want to get our speakers all connected. To do this, we created a new
room on Jitsi (the name doesn't matter), and made sure to add a password, since
this is not the default. All the speakers for the session will connect to this
room.

![add a password to a jitsi room](/docs/legacy/jitsi-add-password.png)

Next, we configured the Jitsi Meet server to stream to YouTube, and also made
the stream available directly via a video control on <https://stream.matrix.org>.

Note that we did not make the call itself available for the entire audience to
join - this would likely have been a impossible moderation task, and would not
have added to the experience.

## Configuring the Live stream

Jitsi itself comes with the ability to stream to YouTube, but only YouTube, through the
[Jibri](https://github.com/jitsi/jibri) component. An open-source
alternative is to capture the jitsi meet screen and broadcast it as a video stream using
[OBS](https://obsproject.com/) to capture the screen.

For the streaming server, one option is to use the
[nginx RTMP plugin](https://github.com/sergey-dryabzhinsky/nginx-rtmp-module) set up to receive a stream
via RTMP and then convert this into an HLS stream for viewing on the web. This can also relay
the stream to another RTMP server so you can make the stream available on another platform
like YouTube.

When you start streaming to your RTMP server, it will create a playlist file. Some players
and browsers support this natively, but to make it playable in any web browser, you'll need
to use a [Javascript player like Google's shaka player](https://github.com/google/shaka-player).

This gets your stream up and running, but if you are expecting a larger audience you can also
look at putting caching web servers in front of the nginx to cache the media (*.ts) files.

## Use Matrix for live chat

We created a dedicated "watching" matrix room, where users could join to talk
to each other about the streamed presentations. They can also talk to each
other more generally about the topics - or about anything else. We were pleased
to see conversations flowing, since these "unofficial" exchanges are a big part
of in-person meetups we wanted to recreate.

The other thing the viewers can do in the room is ask questions of the
speakers. To do this, the host pulls questions out of the room, and collects
them ready to ask the presenter. In our event, we waited until the end of the
presentations, but a host could choose to interrupt the speaker to ask.

With a dedicated room created, it's possible to add a widget to the room
containing only the video embed. To do this, make a page (like
<https://stream.matrix.org>) which contains ONLY the video, then create a
new custom widget in the matrix room in Element.

![click-widget-button](/docs/legacy/1-click-widget-button.png)

![click-custom-widget](/docs/legacy/2-click-custom-widget.png)

![add-the-url](/docs/legacy/3-add-the-url.png)
