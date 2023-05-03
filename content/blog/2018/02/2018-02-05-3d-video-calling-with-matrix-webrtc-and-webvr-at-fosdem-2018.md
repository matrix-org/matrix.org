+++
title = "3D Video Calling with Matrix, WebRTC and WebVR at FOSDEM 2018!"
path = "/blog/2018/02/05/3d-video-calling-with-matrix-webrtc-and-webvr-at-fosdem-2018"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

<strong>TL;DR: We built a proof-of-concept for <a href="https://fosdem.org/2018/schedule/event/matrix_webvr/">FOSDEM</a> of the world's first(?) 3D video calling using Matrix and the iPhone X... and it looks like this!!</strong>

<a href="/blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-04-at-16.18.09.jpg"><img class="aligncenter size-large wp-image-2990" src="/blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-04-at-16.18.09-1024x672.jpg" alt="" width="1024" height="672" /></a>
<a href="/blog/wp-content/uploads/2018/02/3dvc.jpeg"><img class="aligncenter size-large wp-image-2989" src="/blog/wp-content/uploads/2018/02/3dvc-1024x768.jpeg" alt="" width="1024" height="768" /></a>

Last year we spent a few weeks putting together a <a href="/blog/2017/04/04/opening-up-cyberspace-with-matrix-and-webvr/">proof of concept of using Matrix as an open, interoperable communication layer for VR/AR</a> - showing how you can use it as an open signalling protocol to connect users within (and between) virtual worlds, with full-mesh E2E encrypted video conferencing in VR; WebRTC calls overlaid on 360 degree video, and other fun stuff. The reasons for building the demo were quite eclectic:
<ol>
 	<li>Try to highlight that Matrix is about much more than just about instant messaging or team chat</li>
 	<li>Try to encourage the community to jump in and build out more interesting use cases</li>
 	<li>Learn where the state of the art in WebVR + WebGL is</li>
 	<li>Kick off the process of encouraging folks to think about storing world geometry and physics in Matrix</li>
 	<li>Have a fun visual demo we could show to excite potential investors in New Vector (which comically backfired when the investment community spontaneously decided that <a href="https://techcrunch.com/2017/08/26/this-vr-cycle-is-dead/">VR is still too early</a>).</li>
</ol>
In the end it succeeded on some points (highlighting exotic uses of Matrix; learning all about WebVR) and failed on others (a surge in Matrix-for-VR) - although we did have a lot of fun showing it off at the <a href="https://www.youtube.com/watch?v=y0-j4Q77KXM">ETHLDN meetup</a> back in October. (Eagle eyed viewers may be amused to spot team <a href="https://status.im">Status</a> & Matrix sitting together in the audience ;)

However, we still believe that Matrix is the missing link for decentralised communication within VR/AR, and we were lucky enough to get a <a href="https://fosdem.org/2018/schedule/event/matrix_webvr/">talk about Matrix+WebRTC+WebVR</a> accepted to the Real-Time Communications Devroom at FOSDEM 2018! So, given a new chance to show the world how cool Matrix-powered comms could be in VR/AR, myself and Dave Baker went on a (very) quick detour to update the demo a little...

One of the issues of the original demo is that the video calling bits were just putting plain old video planes into the scene - floating television screens of 2D video content, if you will. This is better than nothing, but it's sort of missing the whole point of VR/AR: surely you want to see who you're talking to in 3D? Ideally they should have the same presence as if they were physically in your virtual space. This could also be a big step towards fixing one of the oldest problems of video calling: gaze correction. We've been obsessed about gaze correction since our early days (pre-Matrix) building mobile video calling stacks: gaze correction tries to fix the fact that the break in eye contact caused by staring at the screen (rather than the camera) has a terrible impact on the emotional connection of a video call. *But* if the person you are talking to is 3D, you can always rotate them in 3D space (or reposition yourself) to correct their line of sight - to re-align their gaze so they're actually looking (in VR) at the thing they're looking at in real life!

Back in early 2017 it would have been wildly ambitious to build an off-the-shelf 3D video calling app - but this changed overnight in late 2017 with the introduction of the iPhone X and its TrueDepth infrared-dot-projector based depth camera; effectively a mini-Kinect. Suddenly we have a mainstream high quality depth+video camera perfectly optimised for 3D video calling, with <a href="https://developer.apple.com/videos/play/wwdc2017/507/">excellent API support</a> from Apple. So we decided to see if we could be first in the world (as far as we know) to do 3D video calling using the iPhone X, using Matrix to signal the WebRTC media and using our WebVR demo as the viewing environment!

<strong>Step 1:</strong> Hack on WebRTC to add support for the iPhone X depth camera as a capture device. This is pretty easy, at least if you're just swapping WebRTC's AVFoundationVideoCapturer to request the depth camera instead of the video camera: <a href="https://github.com/matrix-org/webrtc/commit/c3044670d87c305d8f8ee72751939e281bf5223f">https://github.com/matrix-org/webrtc/commit/c3044670d87c305d8f8ee72751939e281bf5223f</a> is the starting point.

<strong>Step 2</strong>: Build a custom Riot/iOS with the right WebRTC SDK.  This is relatively easy thanks to Riot/iOS using CocoaPods and Google shipping a pod for WebRTC these days - it was a matter of tweaking Google's pod so it could be referred to directly as a local project by Riot/iOS (and so that it provided debug symbols in the form CocoaPods expects). Brief notes are at <a href="https://github.com/matrix-org/webrtc/blob/matthew/depth/matrix/build_instructions.txt">https://github.com/matrix-org/webrtc/blob/matthew/depth/matrix/build_instructions.txt</a> - many thanks to Manu for helping on this :)

<strong>Step 3:</strong> Decide how to encode the depth buffer. Now, the official WebRTC working group quite correctly insists that depth data should be treated as a first class citizen which is modelled and compressed in its own right. However, it looks like nobody has added first-class depth support to official WebRTC yet - and if we want to be able to easily display 3D calls on generic browsers capable of running WebVR+WebRTC+Matrix, we have no choice but do the ugly thing and encode the depth into a video signal which can be compressed with VP8/VP8/H.264 etc.

A quick search showed that some folks had already proposed a method for encoding depth data into a video signal, back in the days of the Kinect: <a href="https://reality.cs.ucl.ac.uk/projects/depth-streaming/depth-streaming.pdf">https://reality.cs.ucl.ac.uk/projects/depth-streaming/depth-streaming.pdf</a>. The paper outlines a fairly simple approach: you encode the 16-bit depth data into the three 8-bit colour channels; putting the coarse depth data into Blue, and then finer-grained depth data into Red and Green, encoding it as a periodic triangle wave:

<a href="/blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-04-at-00.43.53.png"><img class="aligncenter size-large wp-image-2992" src="/blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-04-at-00.43.53-1024x484.png" alt="" width="1024" height="484" /></a>

In practice this means that as an object gets closer towards you, it gets gradually more blue - and meanwhile it pulses through a sequence of red and green so you can refine the precise depth more easily. So we went and implemented this, building a 16-bit lookup-table to encode the half-precision floating point 16-bit depth measurements the camera yields into video: <a href="https://github.com/matrix-org/webrtc/compare/c3044670d87c305d8f8ee72751939e281bf5223f...0258a4ef14c11a0161f078c970c64574629761c2.">https://github.com/matrix-org/webrtc/compare/c3044670d87c305d8f8ee72751939e281bf5223f...0258a4ef14c11a0161f078c970c64574629761c2.</a>

Placing a video call through to another Matrix client then coughed up a video stream that looks like this:

<a href="/blog/wp-content/uploads/2018/02/depth-encoded.jpg"><img class="aligncenter size-large wp-image-2982" src="/blog/wp-content/uploads/2018/02/depth-encoded-956x1024.jpg" alt="" width="956" height="1024" /></a>

As you can see, closer things (my head) are bluer than further things (the wall), and everything's covered with trippy red & green stripes to refine the fine detail.  For the record, the iPhone TrueDepth camera emits 640x480 depth frames at around 24Hz.

<strong>Step 4</strong>: extend matrix-vr-demo to view a dot cloud, displaced using a WebGL vertex shader based on the encoded depth info.  Dave kindly did the honours: <a href="https://github.com/matrix-org/matrix-vr-demo/commit/b14cdda605d3807080049e84181b46706cec553e">https://github.com/matrix-org/matrix-vr-demo/commit/b14cdda605d3807080049e84181b46706cec553e</a>

Unfortunately, it showed that the depth encoding really wasn't working very well... you can just about make out my head, but there are dots flying around all over the place, and when you view it in profile the 3D effect was almost entirely missing.

<a href="/blog/wp-content/uploads/2018/02/bad.jpg"><img class="aligncenter size-large wp-image-2983" src="/blog/wp-content/uploads/2018/02/bad-1024x744.jpg" alt="" width="1024" height="744" /></a>

The main problems seem to be:
<ul>
 	<li>Whenever there's a big jump in depth, the stripes get incredibly noisy and don't compress at all well, generating completely corrupt data at edges of objects (e.g. the sides of my head)</li>
 	<li>The complexity of the pattern as a whole isn't particularly compression-friendly</li>
 	<li>The contrast of the red/green stripes tends to dominate, causing the arguably more important blue to get overpowered during compression.</li>
 	<li>Converting from 4:4:4 RGB to 4:2:0 YUV (NV12) as required by WebRTC and then back to RGB inevitably entangles the colours - meaning that the extreme contrast of the red/green stripes is very visible on the blue channel after round-tripping due to sampling artefacts.</li>
 	<li>I probably made a mistake by bitwise casting the 16-bit half-precision floating point depth values directly onto the 16-bit unsigned int lookup index, rather than interpreting the float as a number and building a new index into the lookup table based on its numeric value.  As a result, depth values being encoded ended up having a much lower range than they should.</li>
 	<li>There are probably other bugs too.</li>
</ul>

<strong>Step 5: </strong>Give up on the fancy depth encoding (for now): <a href="https://github.com/matrix-org/webrtc/commit/2f5d29352ce5d80727639991b1480f610cbdd54c">https://github.com/matrix-org/webrtc/commit/2f5d29352ce5d80727639991b1480f610cbdd54c</a>.  In practice, simply picking a range of the 16-bit half-precision floats to fit in the integer range [0,255] turns out to be good enough for a quick demo (i.e. 8-bit depth buffer, but over a small subset of the 16-bit depth space) - the dot cloud suddenly looked a lot more 3D and recognisable:

<a href="/blog/wp-content/uploads/2018/02/fixed.jpg"><img class="aligncenter size-large wp-image-2984" src="/blog/wp-content/uploads/2018/02/fixed-1024x832.jpg" alt="" width="1024" height="832" /></a>

<strong>Step 6</strong>: Clearly this needs colour as well as depth.  This means asking WebRTC to add VideoTracks for both video and depth to your call's MediaStream.  Firstly, we added a simple 'matrixDepth' constraint to WebRTC to tell a video source whether to capture depth or not.  (Yes, I know there's a <a href="https://www.w3.org/TR/mediacapture-depth/">specced way to do this</a>, but given nothing else here is on spec, we went for the simplest approach).  However, it turns out that only one WebRTC's AVFoundationVideoCapturer can run at a time, because it manages its own AVCaptureSession and you can only have one of those at a time in a given app.  As a result, the two capturers (one per video track) collided, with the second session killing the first session.  As a quick fix, we modified RTCAVFoundationVideoSource to accept an existing AVCaptureSession (and AVCaptureDeviceInput) so that the application itself can handle the capture session and select the device, which can then be shared between multiple capturers: <a href="https://github.com/matrix-org/webrtc/commit/9c58465ada08018b1238fb8c5d784b5570f9246b">https://github.com/matrix-org/webrtc/commit/9c58465ada08018b1238fb8c5d784b5570f9246b</a>.  Finally, just needed a few lines to matrix-ios-sdk to set the constraint and send the depth as well as video... <a href="https://github.com/matrix-org/matrix-ios-sdk/compare/fa9a24a6914b207389bacdd9ad08d5386fd0644a...5947d634ae8d722133ecdbde94cccf60bb88f11d">https://github.com/matrix-org/matrix-ios-sdk/compare/fa9a24a6914b207389bacdd9ad08d5386fd0644a...5947d634ae8d722133ecdbde94cccf60bb88f11d</a>, and adding playback of both channels to the vrdemo (<a href="https://github.com/matrix-org/matrix-vr-demo/commit/4059ab671d13bb4d4eb19dd2f534d9a387e47b81">https://github.com/matrix-org/matrix-vr-demo/commit/4059ab671d13bb4d4eb19dd2f534d9a387e47b81</a> and <a href="https://github.com/matrix-org/matrix-js-sdk/commit/f3f1524fcd46d2e772fd5cd022364018c8889364">https://github.com/matrix-org/matrix-js-sdk/commit/f3f1524fcd46d2e772fd5cd022364018c8889364</a>) ...and it worked!

<a href="/blog/wp-content/uploads/2018/02/dots.jpg"><img class="aligncenter size-large wp-image-2985" src="/blog/wp-content/uploads/2018/02/dots-1024x967.jpg" alt="" width="1024" height="967" /></a>

However, the dot cloud obviously has some limitations - especially when you zoom in like this.

<strong>Step 7</strong>: Replace the dot cloud with a displacement-mapped mesh so that it's solid.  So as a final tweak for the demo, Dave switched out the dot cloud for a simple A-Frame plane with 640x480 vertices, keeping the same vertex shader.  Ironically this is where we hit some nasty problems, as for some reason the video texture started being applied to the depth texture (albeit flickering a bit) - eventually we realised that the flickering was the vertex shader inexplicably flapping between using the depth and the video texture for the displacement map.  At this point we compared it between laptops, and it turns out that for some reason the integrated Intel graphics on Dave's Macbook Pro was choking on the two video textures, whereas a AMD Radeon R9 M370X got it right.  It's unclear if this was actually a GPU bug or an A-Frame or Three.js or WebGL or Chrome bug.  Eitherway, on switching laptop to one with discrete graphics it started working perfectly!  Finally, we tweaked the shader to try to reduce smearing, by discarding vertices where there are big discontinuities in depth (through looking at the partial derivatives of the depth texture).  This isn't perfect yet but it's better than nothing.  <a href="https://github.com/matrix-org/matrix-vr-demo/compare/bbd460e81ff1336cd63468e707d858d47261ea42...06abe34957732ba8c728b99f198d987fe48d0420">https://github.com/matrix-org/matrix-vr-demo/compare/bbd460e81ff1336cd63468e707d858d47261ea42...06abe34957732ba8c728b99f198d987fe48d0420</a>

And here's the end result! (complete with trancey soundtrack as the audio we recorded at FOSDEM was unusable)

<iframe src="https://www.youtube.com/embed/XvdZ2orVnrk" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>

<strong>Conclusion:</strong>

Hopefully this gives a bit of a taste of what proper 3D video calling could be like in VR, and how (relatively) easy it was at the Matrix level to add it in.  If anyone wants to follow along at home, the various hacky branches are:
<ul>
 	<li>Playback:
<ul>
 	<li><a href="https://github.com/matrix-org/matrix-vr-demo/tree/dbkr/depthhack_plane">https://github.com/matrix-org/matrix-vr-demo/tree/dbkr/depthhack_plane</a></li>
 	<li><a href="https://github.com/matrix-org/webrtc/tree/matthew/depth">https://github.com/matrix-org/matrix-js-sdk/tree/matthew/depth</a></li>
</ul>
</li>
 	<li>Capture:
<ul>
 	<li><a href="https://github.com/matrix-org/webrtc/tree/matthew/depth">https://github.com/matrix-org/webrtc/tree/matthew/depth</a></li>
 	<li><a href="https://github.com/matrix-org/matrix-ios-sdk/tree/matthew/depth">https://github.com/matrix-org/matrix-ios-sdk/tree/matthew/depth</a></li>
</ul>
</li>
</ul>
If you'd like to get involved with hacking on Matrix in VR, please come hang out at <a href="https://matrix.to/#/#vr:matrix.org">#vr:matrix.org</a>.

Also, New Vector (where most of the core team work) is also hiring for VoIP/VR specialists right now, so if you'd like to work on this sort of thing fulltime, please contact us at <a href="mailto:jobs@matrix.org">jobs@matrix.org</a> asap!

Matthew

<strong>Update:</strong> Slides from the FOSDEM talk (adapted from this blog post by Amandine) are available at <a href="/~matthew/2018-02-04%20FOSDEM%20-%20VR.pdf">https://matrix.org/~matthew/2018-02-04%20FOSDEM%20-%20VR.pdf</a>

<strong>Update 2: </strong>The full FOSDEM talk recording is now up already at the RTC dev room at <a href="https://video.fosdem.org/2018/H.1309/">https://video.fosdem.org/2018/H.1309/</a>!
