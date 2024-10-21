+++
title = "Dendrite 2020 Progress Update"
path = "/blog/2020/12/15/dendrite-2020-progress-update"

[taxonomies]
author = ["Neil Alexander"]
category = ["General"]
+++

It's been a year since Dendrite development picked up again and it's certainly
been a busy one at that! We started off 2020 by sprinting to complete the FOSDEM P2P
demo and, since then, we have continued to develop Dendrite into a more featureful
and stable homeserver.

In October, we [moved Dendrite into beta](https://matrix.org/blog/2020/10/08/dendrite-is-entering-beta),
and have since released a number of releases. We've also seen quite a lot of interest
from the community, so I'm here today to write about some of the fun things that have
been going on in Dendrite-land.

## Announcing dendrite.matrix.org

I'm happy to announce that we've finally deployed our own public Dendrite instance at
**dendrite.matrix.org**! It's running the latest Dendrite code and is open for
registration, so if you have been looking for an opportunity to play with Dendrite
without hosting your own deployment, here's your chance!

There are still bugs and missing features, but overall the server is quite usable, so
please feel free to register and try it and [let us know how you get on](https://matrix.to/#/#dendrite:matrix.org).

This is the first deployment that we've built for any kind of scale, so we are cautious
of the fact that there may be performance bottlenecks still. That said, over the last
few weeks, a number of performance-improving changes have been merged, including:

* Around 20x performance improvement on the State Resolution v2 algorithm, which is used
  in room versions 2 and above
* Significantly reducing the amount of time spent recalculating event reference hashes
  and event IDs in the roomserver and sync API, reducing CPU usage
* Optimised memory usage and reduced database hits in the federation sender, which helps
  particularly in large rooms with lots of resident servers

We're optimistic that running this deployment will help us to identify scaling pain
points and to make Dendrite leaner in the long run. Feel free to sign up and give it
a spin! :-)

## Features

Since the beginning of the year, we've added a number of new features, including but
not limited to:

* Room versions support for all currently specced versions (v1-v6), including support
  for State Resolution v2
* SQLite storage support in addition to PostgreSQL, largely useful for the P2P demos
* Support for database schema upgrades, making updating Dendrite significantly easier
* Early end-to-end encryption support, including device list syncing and send-to-device
  messages, although with key backup and cross-signing still to come
* A number of federation features, including invites, retries and backing off unreachable
  homeservers
* User-interactive authentication (UIA), which is used in password changes and deleting
  devices from your device list
* Support for local pagination, backfilling over federation and fetching missing events
* Redaction of events both locally and over federation
* Entirely new microservices for managing server signing keys, E2E keys, user and device
  management
* Lots of great contributions from the community - including all of Read Receipts (thanks to [S7evinK](https://github.com/S7evinK)) and Read Markers (thanks to [Lesterpig](https://github.com/Lesterpig))!

...and of course [entered Beta](https://matrix.org/blog/2020/10/08/dendrite-is-entering-beta) in October!

## Spec compliance

Of course, Dendrite also needs to be able to fulfill the promise of being a usable
next-generation Matrix homeserver at the same time as being a sci-fi development
platform. We have spent much of the last year working specifically on this. Today,
Dendrite's [Sytest](https://github.com/matrix-org/sytest) compliance sits at:

* **59%** compliance for Client-Server APIs, up from 33% in May 2020
* **83%** compliance for Server-Server APIs, up from 26% in May 2020

As you can see, these are significant leaps in the numbers of tests passing against
Dendrite.

## Experimental MSCs

We have been increasingly trying to use Dendrite for the development and testing of
some new Matrix feature proposals. Recently we've seen early support added for
[Peeking (MSC2753)](https://github.com/matrix-org/matrix-doc/pull/2753) and there
is work in progress on [Peeking over Federation (MSC2444)](https://github.com/matrix-org/matrix-doc/pull/2444).

Peeking enables temporarily subscribing to a room for real-time events without joining
the room. This will only be possible with rooms that are world-readable, but it reduces
the overhead of looking into a room significantly as there is no need to update the room
state for each peeking user/device.

In addition to that, we've also been working on [Threading (MSC2836)](https://github.com/matrix-org/matrix-doc/pull/2836)
support, which is the gateway to building some pretty new and interesting Matrix
experiences. Twitter-like or Reddit-like social prototypes like this have traditionally
been difficult to build on top of Matrix as the `m.reference` relation type from [MSC1849](https://github.com/matrix-org/matrix-doc/pull/1849)
had never really been fleshed out.

Threading adds `m.relationship` fields for embedding these relationships, and also
specifies an additional `/event_relationships` API endpoint for finding other events
related to a given event in either direction. This makes it possible to build threads.

## P2P Matrix

Dendrite has also been our primary development platform for P2P Matrix. This year we
have released multiple P2P Matrix demos, including:

* [p2p.riot.im](https://p2p.riot.im), which uses libp2p rendezvous and embeds a full
  Dendrite homeserver into an in-browser Service Worker
* [Element iOS P2P](http://testflight.apple.com/join/Tgh2MEk6), available on TestFlight,
  which embeds a full Dendrite homeserver into the Element iOS app, initially using
  QUIC over [Yggdrasil](https://yggdrasil-network.github.io) as a transport for federation
  traffic, but with more recent versions using QUIC over the experimental Pinecone protocol
* [dendrite-demo-libp2p](https://github.com/matrix-org/dendrite/tree/master/cmd/dendrite-demo-libp2p),
  a standalone binary which formed the basis of the FOSDEM 2020 P2P demo, using libp2p and
  local multicast discovery as a transport for federation traffic
* [dendrite-demo-yggdrasil](https://github.com/matrix-org/dendrite/tree/master/cmd/dendrite-demo-yggdrasil),
  another standalone binary like above, but using QUIC over Yggdrasil connectivity instead
  of libp2p as the transport for federation traffic

Each experiment teaches us more about potential issues that need to be resolved in order
to bring P2P Matrix closer to being reality, and we are continuing to use Dendrite for
this work. We'll be announcing more information in the New Year about our latest efforts
and the Pinecone routing scheme that we are developing.

It's also worth highlighting that all of the other experimental work taking place right
now, including Threading and Peeking, also work over P2P!

## What's next

We'll be taking a short break for Christmas, but will then be continuing work on
Dendrite in 2021, with the main aims being to add new features, improve spec compliance
further, fix bugs and eventually exit beta. We'll also be continuing further experimental work in the
P2P and Threading areas, as well as supporting the development of new MSCs such as
[Portable Identities (MSC2787)](https://github.com/matrix-org/matrix-doc/pull/2787).

We'd like to say thank you for the community support and interest, and also to send
out a special thanks to our community contributors who have contributed a number of
fixes and features in recent months! We always welcome code contributions via
[GitHub](https://github.com/matrix-org/dendrite) if you are an interested developer.

As always, stay tuned for more Dendrite updates either by joining us in
[#dendrite:matrix.org](https://matrix.to/#/#dendrite:matrix.org) or by getting your
regular dose of [This Week in Matrix](https://matrix.org/blog/category/this-week-in-matrix)!

— Neil Alexander and Kegan
