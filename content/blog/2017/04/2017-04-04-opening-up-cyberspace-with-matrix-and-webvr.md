+++
title = "Opening up cyberspace with Matrix and WebVR!"
path = "/blog/2017/04/04/opening-up-cyberspace-with-matrix-and-webvr"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

TL;DR: <a href="/vrdemo">here's the demo</a>!

Hi everyone,

Today is a special day, the sort of day where you take a big step towards an ultimate dream. Starting Matrix and seeing it gaining momentum is already huge for us, a once in a lifetime opportunity. But one of the crazier things which drove us to create Matrix is the dream of creating cyberspace; the legendary promised land of the internet.

Whether it's the Matrix of <a href="https://en.wikipedia.org/wiki/Neuromancer">Neuromancer</a>, the <a href="https://en.wikipedia.org/wiki/Metaverse">Metaverse</a> of <a href="https://en.wikipedia.org/wiki/Snow_Crash">Snow Crash</a> or the Other Plane of <a href="https://en.wikipedia.org/wiki/True_Names">True Names</a>, an immersive 3D environment where people can meet from around the world to communicate, create and share is the ultimate expression of the Internet's potential as a way to connect: the idea of an open, neutral, decentralised virtual reality within the 'net<b>.</b>

This is essentially the software developer equivalent of lying on your back at night, looking up at the stars, and wondering if you'll ever fly among them... and Matrix is not alone in dreaming of this!  There have been many walled-garden virtual worlds over the years - <a href="http://secondlife.com/">Second Life</a>, <a href="http://habbo.com">Habbo Hotel</a>, all of the <a href="http://www.mmorpg.com/games-list">MMORPGs</a>, <a href="https://www.sansar.com/">Project Sansar</a> etc.  And there have been decentralised worlds which lack the graphics but share the vision - whether it's <a href="https://en.wikipedia.org/wiki/FidoNet">FidoNet</a>, <a href="https://en.wikipedia.org/wiki/Usenet">Usenet</a>, <a href="https://en.wikipedia.org/wiki/Internet_Relay_Chat">IRC</a> servers, <a href="http://xmpp.org/">XMPP</a>, the <a href="https://en.wikipedia.org/wiki/Blogosphere">blogosphere</a> or Matrix as it's used today.  And there are a few ambitious projects like <a href="https://en.wikipedia.org/wiki/Croquet_Project">Croquet</a>/<a href="http://www.opencobalt.net/">OpenCobalt</a>, <a href="http://opensimulator.org/">Open Simulator</a>, <a href="http://www.janusvr.com">JanusVR</a> or <a href="http://highfidelity.com">High Fidelity</a> which aim for a decentralised cyberspace, albeit without defining an open standard.

But despite all this activity, where is the open cyberspace? Where is the universal fabric which could weave these worlds together?  Where is the VR equivalent of The Web itself?  Where is the neutral communication layer that could connect the galaxies of different apps and users into a coherent reality?  How do you bridge between today's traditional web apps and their VR equivalents?

Aside from cultural ones, we believe there are three missing ingredients which have been technically holding back the development of an open cyberspace so far:
<ol>
  <li> The hardware</li>
  <li> Client software support (i.e. apps)</li>
  <li> A universal real-time data layer to store the space</li>
</ol>
Nowadays the hardware problem is effectively solved: the <a href="https://www.vive.com">HTC Vive</a>, <a href="https://www.oculus.com/">Oculus Rift</a> and even <a href="https://vr.google.com/cardboard/">Google Cardboard</a> have brought VR displays to the general public.  Meanwhile, accelerometers and head-tracking turn normal screens into displays for immersive content without even needing goggles, giving <i>everyone</i> a window into a virtual world.

Client software is a more interesting story:  If there are many custom and proprietary VR apps that already exist out there, almost none of them can connect to other servers than the ones ran by their own vendors, or even other services and apps.   An open neutral cyberspace is just like the web: it needs the equivalent of web browsers, i.e. ubiquitous client apps which can connect to any servers and services written by any vendors and hosted by any providers, communicating together via an open common language.   And while web browsers of course exist, until very recently there was no way to link them into VR hardware.

This has changed with the creation of <a href="https://en.wikipedia.org/wiki/WebVR">WebVR</a> by Mozilla - defining an API to let browsers render VR content, gracefully degrading across hardware and platforms such that you get the best possible experience all the way from a top-end gaming PC + Vive, down to tapping on a link on a simple smartphone.  WebVR is a genuine revolution: suddenly every webapp on the planet can create a virtual world! And frameworks like <a href="https://aframe.io/">A-Frame</a>, <a href="https://github.com/ngokevin/aframe-react">aframe-react</a> and <a href="https://facebookincubator.github.io/react-vr/">React VR</a> make it incredibly easy and fun to do.

So looking back at our list, the final missing piece is nothing less than a backbone: some kind of data layer to link these apps together.  Right now, <b>all</b> the WebVR apps out there are little islands - each its own isolated walled garden and there is no standard way to provide shared experiences.  There is no standard way for users to communicate between these worlds (or between the VR and non-VR web) - be that by messaging, VoIP, Video or even VR interactions.  There is no standard way to define an avatar, its location and movement within a world, or how it might travel between worlds.  And finally, there is no standard way to describe the world's state in general: each webapp is free to manage its scene and its content any way it likes; there is nowhere to expose the realtime scene-graph of the world such that other avatars, bots, apps, services etc. can interact with it. The same way there is no standard way to exchange messages or reuse a user profile between messaging apps today: if the cyberspace is taking shape as we speak, it is definitely not taking the path of openness. At least not yet.

Predictably enough, it's this last point of the 'missing data layer for cyberspace' which we've been thinking about with Matrix: an open, neutral, decentralised meta-network powering or connecting these worlds.  To start with, we've made Matrix available as a generic communications layer for VR, taking WebVR (via A-Frame) and combining it with <a href="https://github.com/matrix-org/matrix-js-sdk">matrix-js-sdk, </a>as an open, secure and decentralised way to place voip calls, video calls and instant messaging both within and between WebVR apps and the rest of the existing Matrix ecosystem (e.g. apps like Riot).

In fact, the best way is to test it live: we've put together a quick demo at <a href="/vrdemo">https://matrix.org/vrdemo</a> to show it off, so please <a href="/vrdemo">give it a go!</a>

<a href="/vrdemo"><img class="aligncenter size-large wp-image-2424" src="/blog/wp-content/uploads/2017/04/table-1024x333.jpg" alt="" width="1024" height="333" /></a>

<a href="/vrdemo">In the demo</a> you get:
<ol>
  <li> a virtual lobby, providing a 1:1 WebRTC video call via Matrix through to a ‘guide' user of your choice anywhere else in Matrix (VR or not).  From the lobby you can jump into two other apps:</li>
  <li> a video conference, calling between all the participants of a given Matrix room in VR (no interop yet with other Matrix apps)</li>
  <li> a 'virtual tourism' example, featuring a 1:1 WebRTC video call with a guide, superimposed over the top of the user going skiing through 360 degree video footage.</li>
</ol>
Video calling requires a WebRTC-capable browser (Chrome or Firefox). Unfortunately no iOS browsers support it yet. If you have dedicated VR hardware (Vive or Rift), you'll have to configure your browser appropriately to use the demo - see <a href="https://webvr.rocks">https://webvr.rocks</a> for the latest details.

Needless to say, the demo's open sourced under the Apache License like all things Matrix - you can check out the code from <a href="https://github.com/matrix-org/matrix-vr-demo">https://github.com/matrix-org/matrix-vr-demo</a>.  Huge kudos to Richard Lewis, Rob Swain and Ben Lewis for building this out - and to Aidan Taub and Tom Elliott for providing the 360 degree video footage!

The demo is quite high-bandwidth and hardware intensive, so here's a video of it in action, just in case:

{{ youtube_player(video_id="nk0nMlVXkbk") }}

Now, it's important to understand that here we're using Matrix as a standard communications API for VR, but we're not using Matrix to store any VR world data (yet).  The demo uses plain A-Frame via aframe-react to render its world: we are not providing an API which exposes the world itself onto the network for folks to interact with and extend.  This is because Matrix is currently optimised for storing and synchronising two types of data structure: decentralised timelines of conversation data, and arbitrary decentralised key-value data (e.g. room names, membership, topics).

However, the job of storing arbitrary world data requires storing and flexibly querying it as an object graph of some kind - e.g. as a scene graph hierarchy.  Doing this efficiently whilst supporting Matrix's decentralised eventual consistency model is tantamount to evolving Matrix into being a generic decentralised object-graph database (whilst upholding the constraints of that virtual world).  This is tractable, but it's a bunch more work than just supporting the eventually-consistent timeline & key-value store we have today.  It's something we're thinking about though. :)

Also, Matrix is currently not super low-latency - on a typical busy Synapse deployment event transmission between clients has a latency of 50-200ms (ignoring network).  This is fine for instant messaging and setting up VoIP calls etc, but useless for publishing the realtime state of a virtual world: having to wait 200ms to be told that something happened in an interactive virtual world would be a terrible experience.  However, there are various fixes we can do here: Matrix itself is getting faster; Dendrite is expected to be one or two orders of magnitude faster than Synapse.  We could also use Matrix simply as a signalling layer in order to negotiate a lower latency realtime protocol to describe world data updates (much as we use Matrix as a signalling layer for setting up RTP streams for VoIP calls or MIDI sessions).

Finally, you need somewhere to store the world assets themselves (textures, sounds, Collada or GLTF assets, etc).  This is no different to using attachments in Matrix today - this could be as plain HTTP, or via the Matrix decentralised content store (mxc:// URLs), or via something like IPFS.

This said, it's only a matter of time before someone starts storing world data itself in Matrix.  We have more work to do before it's a tight fit, but this has always been one of the long-term goals of the project and we're going to do everything we can to support it well.

So: this is the future we're thinking of.  Obviously work on today's Matrix servers, clients, spec & bridges is our focus and priority right now and we lots of work left there - but the longer term plan is critical too.  Communication in VR is pretty much a blank canvas right now, and Matrix can be <em>the</em> connecting fabric for it - which is unbelievably exciting.  Right now our demo is just a PoC - we'd encourage all devs reading this to have a think about how to extend it, and how we all can build together the new frontier of cyberspace!

Finally, if you're interested in chatting more about VR on Matrix, come hang out over at <a href="https://matrix.to/#/#vr:matrix.org">#vr:matrix.org</a>!

- Matthew, Amandine & the Matrix team

> <p lang="en" dir="ltr">Amandine grins at the future in the newest skunkworks zone of the London <a href="https://t.co/y2YCHNIbgU">https://t.co/y2YCHNIbgU</a> HQ... :&gt; :D 😈 <a href="https://t.co/K5xBz7U9o2">pic.twitter.com/K5xBz7U9o2</a></p>&mdash; Matrix (@matrixdotorg) <a href="https://twitter.com/matrixdotorg/status/843181984448991232?ref_src=twsrc%5Etfw">March 18, 2017</a>
