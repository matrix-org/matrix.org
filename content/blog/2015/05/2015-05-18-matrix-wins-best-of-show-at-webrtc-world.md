+++
title = "Matrix wins Best of Show at WebRTC World!"
path = "/blog/2015/05/18/matrix-wins-best-of-show-at-webrtc-world"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News"]
+++

<a href="http://www.webrtcworld.com/topics/newsfeed/articles/403642-webrtc-conference-expo-announces-demo-winners.htm"><img src="/blog/wp-content/uploads/2015/05/WebRTC-Best-in-ShowLogo-Only.jpg" alt="WebRTC Best in Show" width="282" height="214" class="alignright size-full wp-image-1022" /></a>

Amandine and I just got back from WebRTC World 2015 in Miami - the conference was a great success: a fantastic opportunity to meet up with many of the companies who are supporting Matrix and give everyone an update on what Matrix is up to with our Keynote: <a href="/blog/wp-content/uploads/2015/05/2015-05-13.2-Matrix-Keynote.pdf">Defragmenting the Internet for fun and non-profit!</a>.

We also had a little too much fun in the demo shoot-out - hooking up a <a href="http://www.parrot.com/uk/products/bebop-drone/">Parrot Bebop quadrocopter</a> into Matrix using a Matrix-enabled <a href="https://janus.conf.meetecho.com/">Janus WebRTC Gateway</a>.  The problem here is that the Parrot firmware and C SDK provides H.264 video, but doesn't package it up at all for use with WebRTC - let alone using interoperable signalling like Matrix.  So this is a classic use of Matrix to expose a simple open consistent interface to a system which is otherwise is stuck with a proprietary non-web-friendly API.  The code hasn't been tidied up yet, but our hacked Matrixified fork of Janus is up at <a href="https://github.com/matrix-org/janus-gateway/tree/ardrone3">https://github.com/matrix-org/janus-gateway/tree/ardrone3</a> if anyone has a drone and is crazy enough to want to experiment with it :)

Meanwhile, we also showed <a href="http://openwebrtc.io">OpenWebRTC</a>-powered VoIP on the latest develop iOS Matrix Console app talking hardware-accelerated H.264 through to Firefox on the desktop.  My ancient 2010 MacBook Pro did its best to sabotage the demo (turns out that 1080P AirPlay + Firefox WebRTC is a bridge too far), but it gave a good idea of what's to come.  Many thanks to the OpenWebRTC team for lots of help in getting the demo together in time!

It turns out that all the demo excitement was worth it in the end, as the jury seemed to like what Matrix is up to and was kind enough to award us more points than any of the other 13 demos... meaning that <b>we won <a href="https://twitter.com/webrtcexpo/status/598901296100462592">Best In Show!!</a></b>.  Huge thanks to the judges for believing in the Matrix vision, and congratulations to all the other demoists too :)

<a href="http://matrix.org/blog/wp-content/uploads/2015/05/prize-e1431964418791.jpg"><img src="/blog/wp-content/uploads/2015/05/prize-e1431964418791-300x225.jpg" alt="Best in Show at WebRTC World!" width="300" height="225" class="aligncenter size-medium wp-image-1017" /></a>

Meanwhile, the slides from the demo presentation can be found here: <a href="/blog/wp-content/uploads/2015/05/2015-05-12-Matrix-Demo-Miami.pdf">Building bridges between islands of communication</a>, and you can see the full video of our Demo here:

{{ youtube_player(video_id="OMzDklvDS3c") }}

...and the actual video stream that the drone transmitted before I crashed it (recorded on Janus) is at...

{{ youtube_player(video_id="NpBStIIq6fM") }}

Finally, our grand finale was meant to be combining the two demos, and showing OpenWebRTC decoding the H.264 from the Drone in hardware on an iPhone - using Matrix of course to set up the call and control the drone.  Alas a TURN-related bug got in the way of this working, but we just fixed it up in the office this morning, and I'm proud to show the first ever Parrot Bebop -> Janus -> Matrix -> OpenWebRTC video stream!! (and very exciting it is too...)

{{ youtube_player(video_id="KsJOqLcpzNM") }}

Huge thanks again to Dave for doing the Matrix integration with Janus, Stefan and Rob from OpenWebRTC for all the help on the OWR side, and Manu & Giom for porting the OpenWebRTC pull request to MatrixKit and landing it in iOS Console Develop for the demo!
