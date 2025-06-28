+++
title = "Matrix wins Best Innovation Award at WebRTC Paris!"
path = "/blog/2014/12/24/matrix-wins-best-innovation-award-at-webrtc-paris"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Events", "News"]
+++

Last week we had a great time attending WebRTC Conference Expo Paris 2014 - chatting to lots of new folks about Matrix; speaking in the "To Build or Not To Build" panel discussion; giving a general presentation on Matrix, and participating in the Demo shoot-out.

And we're very proud to say that we won the <a href="http://blog.uppersideconferences.com/award-winners-webrtc-2014-conference-expo/">Best Innovation Award</a> for a slightly frantic demo, showing an iPad mounted on our pet Trossen Robotics PhantomX Hexapod being used for robot telepresence by streaming video and audio to an Oculus Rift VR headset.  This was using our proprietary in-house WebRTC stack, but once Matrix has fully taken off we hope to share our WebRTC stack with the world too :)  This was a very last minute demo - we wanted to show something different to normal browser-to-browser IM/Video calling via Matrix and had the idea to use the Rift at the last minute - and in fact it still wasn't working when we went on stage (turns out that iOS 8.1 introduces some quirks in the video capture API which were producing corrupt video).  By switching from an iPhone 5S running iOS 8.1 to an iPad running iOS 6 we were able to turn the demo around in the nick of time and get it working live on stage (modulo a RGB<->BGR colourspace bug) just in time to win the award.  Huge thanks to the jury for voting for us against the odds :D  For those interested in displaying raw video straight onto the Oculus Rift (without using any head-mounted tracking), there's an OpenGL code snippet up at <a href="https://gist.github.com/ara4n/875b5e8b66be3617efb7">https://gist.github.com/ara4n/875b5e8b66be3617efb7</a>.

<a href="http://matrix.org/blog/wp-content/uploads/2014/12/oculus.jpg"><img src="http://matrix.org/blog/wp-content/uploads/2014/12/oculus-1024x764.jpg" alt="iOS to Oculus Rift Telepresence" width="625" height="466" class="aligncenter size-large wp-image-262" /></a>

(Image credit to <a href="https://twitter.com/victorpascual/status/545247282212667393">Victor Pascual Avila</a> at Quobis)

Also, huge congratulations to <a href="https://twitter.com/VladimirTechMan/status/545550432542916608">Vladimir Beloborodov</a> who won the Best Data Channel Award for hacking his Romotive telepresence robot to rendezvous via Matrix with his iPad, stream video via Google's WebRTC stack and control the robot's motion via the WebRTC Data Channel:

<a href="http://matrix.org/blog/wp-content/uploads/2014/12/vladimir.jpg"><img src="http://matrix.org/blog/wp-content/uploads/2014/12/vladimir.jpg" alt="Vladimir Beloborodov" width="600" height="800" class="aligncenter size-full wp-image-263" /></a>

We're really excited to see other folks' Matrix projects out there winning prizes!
