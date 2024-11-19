+++
title = "Introducing Third Room TP2: The Creator Update"
date = "2023-06-07T15:15:43Z"
path = "/blog/2023/06/07/introducing-third-room-tp-2-the-creator-update"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://thirdroom.io/landing/Community.jpg"
+++

Hi all,

Back in September 2022 we launched the very [first public technology preview](https://matrix.org/blog/2022/09/27/announcing-third-room-tech-preview-1) of [Third Room](https://thirdroom.io) - our entirely open source, open standards-based platform for creating decentralised multiparty spatial apps and virtual worlds on top of Matrix.

The mission of Third Room is to ensure that a truly open and equitable platform exists for powering shared 3D environments - providing an alternative to the closed walled gardens of the bigger vendors, and generally safeguard against a repeat of the fragmented dystopia that has plagued instant messaging and VoIP systems.  In short, just as Matrix aims to be the missing secure communication layer of the open Web, Third Room aims to be the spatial collaboration layer.

Today, we’re incredibly excited to announce **Third Room Technology Preview 2: The Creator Update**.  As more and more 3D hardware enters the market, the race is on to provide tools to developers and creators so they can build on an open, vendor-agnostic platform - and in this update we’ve focused on building out the **scripting**, **editing** and **authoring** capabilities of Third Room to provide a solid platform for building and running collaborative 3D apps of any kind. Check out the new release at [https://thirdroom.io](https://thirdroom.io).

<blockquote>
As a reminder: the Third Room team is a tiny band formed by Robert, Nate and Ajay and operates outside of all the rest of our work on Matrix: the other 97% of our effort goes into making the core of Matrix amazing (particularly the underpinnings for Element X and the next generation of Matrix clients). However, Matrix is about more than just chat and VoIP, and Third Room provides an excellent showcase of Matrix’s abilities as a general purpose communication fabric.
</blockquote>

<!-- more -->

### Introducing Web Scene Graph

<div style="text-align: center">
<a href="https://thirdroom.io/docs/guides/websg/"><img src="/blog/img/2023-06-07-websg.jpg" width="480" alt="WebSG"/></a>
</div>

At the heart of Third Room TP2 is [Web Scene Graph (WebSG)](https://thirdroom.io/docs/guides/websg/) - our new API to let developers create their own spatial multiparty apps and experiences in Third Room. WebSG does to glTF what JavaScript and the DOM did to HTML - it makes it come alive. With WebSG, we’re building the first implementation of an open standard for interoperable programming of virtual worlds, with the hope of submitting it to the W3C as a general purpose building block of the Web.

All content in Third Room is described using the [glTF 2.0](https://www.khronos.org/gltf/) open standard, and so to let developers write their own functionality within Third Room we needed to provide an API that lets you dive into the glTF and manipulate it - much as the DOM API lets web developers edit the HTML DOM.  For whatever reason, an open standard API doesn’t exist for manipulating glTF… so we created Web Scene Graph (WebSG) to fill the void. Just like the DOM, it provides an incredibly powerful generic toolkit for manipulating 3D assets irrespective of the engine being used to render them.

WebSG isn’t just for manipulating scene graphs though - it also provides a whole in-world UI framework for creating 3D user interfaces in glTF; it provides an Action Bar API to let apps modify the controls available in Third Room’s overlay UI; you also get the Collision Listener API to get callbacks from the physics engine; ECS API to interact directly with the Entity Component System that tracks the world state; and Networking APIs to send and receive messages directly between clients via Matrix-negotiated WebRTC DataChannels.

As a quick taster - a WebSG app to pulse a light in your scene can be as simple as this:

```js
world.onload = () => {
    const directionalLight = world.findLightByName("DirectionalLight"); 

    world.onupdate = (dt, time) => {
        directionalLight.color[0] = (Math.sin(time) + 1) / 2;
    };
};
```

Third Room takes the JS and compiles it down to WASM using [QuickJS](https://bellard.org/quickjs/), and then executes it within a WASM sandbox - isolating it entirely from your other conversations and the rest of the Third Room. (In future, we’ll look to provide quota limits to ensure scripts don’t get greedy with resources).

We also support a low-level C API for WebSG, letting you compile your own native code down to WASM - in C the same script looks like this:

```c
#include <math.h>
#include "websg.h"

Light *directionalLight;

export void websg_load() {
    directionalLight =
        websg_world_find_light_by_name("DirectionalLight");
}

export void websg_update(float_t dt, float_t time) {
    websg_light_set_color_element(
        directionalLight, 0, (sin(time) + 1.0) / 2.0
    );
}
```

But don’t worry - we’re not expecting folks to be writing C as a matter of course; the reason to provide the low-level C API is so that in future we can easily provide Rust and Zig (or more!) bindings so folks can use their favourite native language to compile optimised WASM rather than using interpreted JavaScript.  That said, [procgen](https://github.com/matrix-org/thirdroom/blob/main/examples/procgen/c/src/procgen.c) is a fun C example of a procedurally generated Perlin noise blob which pulsates in response to local audio, as an idea of what you can do today if you’re willing to write some C!  There’s also a [JS version](https://github.com/matrix-org/thirdroom/blob/main/examples/procgen/js) of it too.

We’ve also bundled basic Matrix widget API support alongside WebSG, so WASM scripts in Third Room can send and receive Matrix events in the underlying chatroom (as well as directly sending messages between clients over WebRTC datachannels).  For instance, one of the commercial WebSG apps which Element has written on top of Third Room is a real-time air traffic simulator, which consumes location-share beacons from the underlying Matrix room (bridged from ADS-B data sources) and procedurally renders them in 3D or AR over a map of the region in question:

![SFO](/blog/img/2023-06-07-sfo.jpg)

We’ve also added a native orbit viewer into Third Room, so from WebSG you can simply call `node.startOrbit()` on any node to temporarily switch into focusing on a given object (WASD to move; mousewheel to zoom; escape to exit).

Finally, to really show off WebSG at its best, we’ve gone and written a simple game of basketball in precisely [100 lines of code](https://github.com/matrix-org/thirdroom/blob/main/examples/basketball/js/basketball.js), and published a step-by-step tutorial ([Part 1](https://thirdroom.io/docs/guides/websg/basketball/part-1.html) covering Interactables, [Part 2](https://thirdroom.io/docs/guides/websg/basketball/part-2.html) covering Collisions and [Part 3](https://thirdroom.io/docs/guides/websg/basketball/part-3.html) covering Networking) so you can follow along at home.

<iframe width="1280" height="720" src="https://www.youtube.com/embed/VimOoGCPWWw" title="Third Room Basketball Tutorial End Result" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

Or if you’re impatient you can jump ahead and play with the game [here](https://thirdroom.io/world/#basketball-court:thirdroom.io).

WebSG has gone through quite a few major iterations since announcing it at [FOSDEM](https://www.youtube.com/watch?v=nG8qJ4on00Y), but we’re feeling happy with the current result and have formalised this initial public release with formal API docs as well as the various tutorials.  That said, we’d love to hear feedback via [#thirdroom-dev:matrix.org](https://matrix.to/#/#thirdroom-dev:matrix.org) - so please let us know if you’re missing anything or if there are any rough edges we haven’t spotted!

For more details on WebSG, see:

* the [API overview](https://thirdroom.io/docs/guides/websg/)
* the [Tutorial](https://thirdroom.io/docs/guides/websg/basketball/part-1.html)
* the [API reference docs](https://thirdroom.io/docs/websg-js/)
* …or the all various [examples](https://github.com/matrix-org/thirdroom/blob/main/examples) in the Third Room repository:
    * [basketball/js](https://github.com/matrix-org/thirdroom/tree/main/examples/basketball/js) - the basketball game tutorial
    * [ecs-basic/js](https://github.com/matrix-org/thirdroom/tree/main/examples/ecs-basic/js) - an ECS example which spins a given object
    * [interactable](https://github.com/matrix-org/thirdroom/tree/main/examples/interactable) - an example for switching lights on and off
    * [matrix](https://github.com/matrix-org/thirdroom/tree/main/examples/matrix) - turns the whole world into triplanar Matrix textures via an easter egg
    * [network/c](https://github.com/matrix-org/thirdroom/tree/main/examples/network/c) - synchronise light state via raw network messages
    * [physics/js](https://github.com/matrix-org/thirdroom/tree/main/examples/physics/js) - create boxes and bump them around
    * [platformer/js](https://github.com/matrix-org/thirdroom/tree/main/examples/platformer/js) - the beginnings of a 3D platformer game (needs better character controller)
    * [presentation/js](https://github.com/matrix-org/thirdroom/tree/main/examples/presentation/js) - script for previous/next buttons for swapping slides in a presentation
    * [procgen](https://github.com/matrix-org/thirdroom/tree/main/examples/procgen) - renders an animated blob of Perlin noise whose geometry reacts to local audio
    * [ui-basic/js](https://github.com/matrix-org/thirdroom/tree/main/examples/ui-basic/js) - renders text for in-world UI via the [Yoga](https://yogalayout.com/) CSS flexbox engine
    * [ui/js](https://github.com/matrix-org/thirdroom/tree/main/examples/ui/js) - renders nested text using Yoga
    * [websg-v1](https://github.com/matrix-org/thirdroom/tree/main/examples/websg-v1) - moves and spins some platforms
    * [widget-echo/js](https://github.com/matrix-org/thirdroom/tree/main/examples/widget-echo/js) - echos any Matrix message that starts `/echo` back into the room
    * [widget-hello-world/c](https://github.com/matrix-org/thirdroom/tree/main/examples/widget-hello-world/c) - sends “hello world” into the Matrix room.

### Introducing the Third Room Documentation site

Talking of docs, we’re proud to unveil a shiny new documentation website for Third Room at [https://thirdroom.io/docs](https://thirdroom.io/docs). This is the official resource for developers wishing to build on top of Third Room - currently covering:

* [Getting Started](https://thirdroom.io/docs/guides/) - a basic guide for users first coming to Third Room
* [The Creator Guide](https://thirdroom.io/docs/guides/creators.html) - explaining how 3D artists and developers can rapidly get up and running by exporting existing assets into glTF for Third Room.
* [The Unity Exporter Guide](https://thirdroom.io/docs/guides/unity/) - explaining how to use export existing Unity assets to glTF for use in Third Room
* [The Developer Guide](https://thirdroom.io/docs/guides/developers.html) - an overview of developing applications using the Web Scene Graph API and self-hosting your own Third Room instance
* Web Scene Graph (WebSG)
    * An [overview](https://thirdroom.io/docs/guides/websg/) of the WebSG API and its JS and C bindings
    * The official WebSG Tutorial - learn how to build a basketball game with WebSG!
        * [Part 1: Interactables](https://thirdroom.io/docs/guides/websg/basketball/part-1.html)
        * [Part 2: Collisions and UI](https://thirdroom.io/docs/guides/websg/basketball/part-2.html)
        * [Part 3: Networking](https://thirdroom.io/docs/guides/websg/basketball/part-3.html)(in progress)
    * [A guide to the Scene Graph itself](https://thirdroom.io/docs/guides/websg/scenegraph.html)
    * [A guide to manipulating meshes](https://thirdroom.io/docs/guides/websg/meshes.html) with WebSG
    * [A guide to materials](https://thirdroom.io/docs/guides/websg/materials.html) with WebSG
    * [A guide to lighting](https://thirdroom.io/docs/guides/websg/lighting.html) with WebSG
    * [A guide to physics](https://thirdroom.io/docs/guides/websg/physics.html) with WebSG
    * [A guide to the ECS API](https://thirdroom.io/docs/guides/websg/ecs.html) with WebSG
    * [A guide to the Action Bar API](https://thirdroom.io/docs/guides/websg/actionbar.html) with WebSG
    * [A guide to the in-world UI API](https://thirdroom.io/docs/guides/websg/ui.html) with WebSG
    * [A guide to interactables](https://thirdroom.io/docs/guides/websg/interactables.html) with WebSG
    * [A guide to low-latency networking](https://thirdroom.io/docs/guides/websg/networking.html) over MatrixRTC via WebSG
* Reference documentation:
    * The official [WebSG API](https://thirdroom.io/docs/websg-js/) reference documentation
    * The official reference for the various [glTF Extensions](https://thirdroom.io/docs/gltf/) used by Third Room (in progress).

![Docs](/blog/img/2023-06-07-docs.png)

### Introducing the In-World Editor

Aside from all the WebSG API excitement, another key area in this release is the ability to visualise and manipulate the glTF scene graph in real-time via the in-world editor.  At any time while using Third Room, you can now hit the backtick key ``` and bring up an overlay showing the current scene graph of the world - and go clicking through the nodes to inspect their current state, and experiment with editing them a bit.  Currently this requires you to be an admin in the room.  For instance, you can go in and mess around with the scene’s materials via the Resources tab of the scene graph panel and the Inspector panel on the right hand side:

![Editor 1](/blog/img/2023-06-07-editor-1.png)

…or you could go and move the geometry outright:

![Editor 2](/blog/img/2023-06-07-editor-2.png)

…or even bring up a [Monaco](https://microsoft.github.io/monaco-editor/) editor to directly edit the script controlling the world (if it’s JavaScript):

![Editor 3](/blog/img/2023-06-07-editor-3.png)

…and hit Save & Run and see your changes instantly take effect:

<iframe width="1280" height="751" src="https://www.youtube.com/embed/TWC6MpUh6KY" title="Third Room WebSG demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

If it wasn’t obvious, this is Third Room’s equivalent of your browser’s developer tools: letting you jump straight into the scene and see precisely what’s going on, and directly manipulate it in real-time.

Now, there’s a bit remaining on this: the inspector needs to expose more UI for manipulating the scene (e.g. gizmos for picking objects in-world and translating/rotating them, etc); we need better error feedback in the inspector (or even a debugger); we can’t yet create/copy/delete nodes in the scenegraph, etc.  However, it’s already super-useful for seeing what’s going on and helping debug your WebSG scripts.

### Networking

Another area which has seen a lot of work in this update is Third Room’s networking - i.e. how you synchronise world state between clients as efficiently and rapidly as possible, and (critically) how you make that work deterministically now that we have WebSG.

At the lower levels, all the networking in Third Room operates over WebRTC data channels negotiated via Matrix (aka MatrixRTC), which establish a full mesh between all the peers active in the room. (In future this will be scaled up using [Selective Forwarding Units](https://fosdem.org/2023/schedule/event/cascaded_selective_forwarding_units/), but this work is still in progress).

However, at the higher levels, things are in flux. In the first Tech Preview of Third Room, we synchronised worlds using so-called peer-to-peer networking. In practice, this means that every client runs its own physics simulation of the world, and each client owns the objects which it creates - and each client sends updates about the state of its objects (position, rotation, etc) to the other members in the room, which overrides with the local view of their objects, with some smoothing, thus keeping everyone roughly in sync.  This worked well for early Third Room before we sprouted WebSG, but it has the problem that there is no single point of control when executing scripts - the world is not deterministic, and if every client executes the world’s script in parallel, they’d race badly as soon the script needs to handle users interacting with one another.

So, we’ve written a new networking engine called Authoritative Networking - which picks a given client in the room to be the authoritative simulation for the room, and executes any WebSG scripts on that client in order to get consistent results across all participants in the room.  The authoritative client is picked based on the user with the highest power level - you can think of it almost as being a bot (hosted inside someone’s browser) which executes the simulation and scripts for that world.  If that user goes offline, then the baton would be picked up by another user in the scene.  (Obviously, in an ideal world we’d have a way to execute the scripts and simulations in a byzantine-fault tolerant manner, in parallel, with minimal latency, and without any centralisation… but we’re focusing on walking before we can run :)

The current Authoritative Networking engine has some problems: we decided to synchronise simulator inputs from the scene participants to the authoritative client, rather than synchronising the physics properties of their owned objects - and this has proved difficult to script and author content around.  Therefore we’re experimenting with an alternative implementation inspired by Godot’s networking, where we synchronise object properties rather than inputs instead.

This means that right now networking is still somewhat up in the air: WebSG can execute on both the original p2p networking engine (but will be racy if user interactions collide), or the new authoritative engine (but interpolation is jumpy).  This doesn’t stop you from experimenting with networking in WebSG however - and local behaviour isn’t affected at all.  You can turn on Authoritative Networking in user settings under View Profile if you want to try.

We’re working away on sorting this out one way or another - if it was working perfectly it wouldn’t be a Tech Preview, after all ;)

### Introducing the Discover page

In keeping with the focus on creators in this release, we’ve also added a new Discover view to Third Room, making it easier to find existing scenes and worlds.  A directory of curated content is published in a repository room ([MSC3948](https://github.com/ajbura/matrix-spec-proposals/blob/respository-room/proposals/3948-repository-room.md)) - by default #repository-room:thirdroom.io, and then hitting the compass icon in the side menu will let you create your own worlds based on existing scenes, or indeed discover and jump into existing worlds:

![Discover](/blog/img/2023-06-07-discover.png)

Meanwhile the Creator tab makes it even easier to get up and running creating new worlds. The Discover view now becomes the default view for new users, to help them onboard when they enter the app for the first time.

### WebXR support

Finally, just one more thing… Ready for your fancy new VR/AR headset, we’re happy to announce that this update of Third Room includes WebXR support - and while it’s pretty basic (no UI overlays in XR) it actually works incredibly well, at excellent frame rates even on complex scenes.  To use it, load Third Room in the browser in your headset; enable WebXR in your profile settings, and then click the WebXR button in the bottom right group of buttons to be teleported into XR mode.

Here’s me & Amandine playing with it using two Quest Pros - on the left you can see my view of her in XR taken as a screenshot from my Quest Pro, showing her interacting with the air traffic simulator (with her headset, controllers and lasers superimposed as well as the map & plane data).  On the right you can see the same scene in plain old 3D Third Room, showing disembodied headset/controllers (and my controller laser pointers) given we don’t have custom avatars yet.

WebXR *should* work out of the box on any good VR/AR headset, without having to install any additional software or being locked into any vendor’s app store. We even expect it to work with Apple’s Vision Pro headset, based on the [Safari 17 release notes](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/). This is the whole promise of the open Web, and we hope Third Room will provide an amazing open environment to create XR apps and experiences in future.

![WebXR](/blog/img/2023-06-07-webxr.jpg)

### What remains?

While we’ve made extraordinary progress since the last release, there’s still a bunch of things remaining which is keeping Third Room as a Technology Preview.  Most important first:

* Networking
    * As per the Networking section above, we need to rework Authoritative Networking so we have the final networking model in place, such that WebSG scripts execute deterministically in a single place with smooth but accurate interpolation on the participating clients. We also need to iterate a bit more on the final networking API so that anyone can build multi-user apps with ease.
* Persistence
    * While we can now edit and script scenes, the edits are only stored in the RAM of the connected clients: when all the clients from a world disconnect, the state is lost and the world resets back to its original state. Instead, we need to store the glTF changes back to the Matrix content repository on a regular basis.
* Firefox performance
    * We’ve seen a nasty regression in the last month or two on Firefox, where SpiderMonkey (Firefox’s JavaScript engine) starts frantically garbage-collecting, despite us allocating an extremely tiny amount of memory, killing your framerate. We haven’t figured out yet whether this is our fault or Firefox’s (if someone wants to bisect old Firefox releases over the last few months we’d be very grateful!), but for now FF performance is dire in TP2.
* Custom Avatars
    * Whilst there’s been some work on this in the community, it’s not landed yet.  There’s nothing especially hard here though (other than IK) - it’s just a matter of bandwidth.
* Shadows
    * We have some cascaded shadow map experiments already, but we need to get it stable and on by default for scenes which would benefit (e.g. the basketball tutorial!)
* Mobile web
    * Similarly, support for mobile web would be really nice for those dipping their toe in the water - and given the performance we’re seeing on Android-based XR headsets like the Quest, the performance on mobile web should be sensational.  Again, it’s just a matter of time to sort it out.
* Fully-fledged editor
    * The current editor is effectively just an inspector; it’s great for visualising the glTF scene, but you can’t really go and start changing the fabric of reality yet. An editor isn’t an editor without some fancy 3D gizmos to help you grab and manipulate the world - so for all our in-world direct manipulation Inception dreams to come true, the devtools need a bit more work.
* Content!
    * Finally, last but not least, we need to start populating these worlds with some fun, beautiful, amazing apps and games.  The whole point of this release is to give creators the tools they need to start properly playing around, building on top of Third Room, and we really hope you’ll give it a go and get involved (not least as our bandwidth to do so within the core team is sorely limited).

Hopefully the next release will be both the final tech preview and the first beta of the complete Third Room experience - but to get there, we need your feedback: please head over to [#thirdroom-dev:matrix.org](https://matrix.to/#/#thirdroom-dev:matrix.org) and tell us what you think!

### Funding Third Room

If you’ve read this far, you must surely be pretty interested in Third Room, and hopefully agree that having an open platform for building spatial apps and virtual worlds is absolutely critical for the health and future of the Internet - especially as the VR/AR/3D space slowly but surely gathers momentum as new players and hardware materialise.

However, funding the team to work full-time on Third Room is increasingly challenging - the macroeconomic environment does not lend itself to moonshot R&D projects, and Matrix as a whole continues to suffer from [insufficient financial support](https://matrix.org/blog/2022/12/25/the-matrix-holiday-update-2022) (quite aside from Third Room).  This is particularly frustrating given the massive range of obvious commercial applications for Third Room - whether that’s for building digital twins, situational awareness, telepresence, gaming, providing an open platform to glue together real-time 3D data from other existing data feeds, etc.

To try to spell out the opportunities and why it clearly makes sense for commercial players to invest in supporting Third Room development, we recently put together a quick enterprise demo reel (which also serves to demo everything mentioned above, albeit in a more businessy manner than normal). **If this resonates and your organisation is interested in funding Third Room - please contact [funding@matrix.org](mailto:funding@matrix.org) asap.**

<iframe width="1280" height="720" src="https://www.youtube.com/embed/cFKJ-IuGaKA" title="Third Room Enterprise Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

Otherwise, we hope you enjoy the new update - and please let us know how you get on with it!

Matthew, Robert, Nate & Ajay
