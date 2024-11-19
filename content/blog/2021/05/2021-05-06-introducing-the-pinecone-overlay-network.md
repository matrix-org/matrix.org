+++
title = "Introducing the Pinecone overlay network"
path = "/blog/2021/05/06/introducing-the-pinecone-overlay-network"

[taxonomies]
author = ["Neil Alexander"]
category = ["Tech"]

[extra]
image = "https://matrix.org/blog/img/2021-05-06-pinecone.png"
+++

Since the end of 2019, we have spent quite a bit of time thinking about and exploring different technologies whilst building various demos for P2P Matrix.  Our mission for P2P Matrix is to evolve Matrix into a hybrid between today's server-oriented network and a pure P2P network - empowering users to have **total** autonomy and privacy over their data if they want (by storing it in P2P Matrix, by embedding their server into their Matrix client), while also letting users store their data in serverside nodes if they so desire.  

The goal is to protect metadata much better (as users no longer have to depend on a server run by someone else to communicate), as well as drive new features such as account portability, multi-homed accounts, low-bandwidth Matrix and smarter federation transports - and provide support for internet-less mesh communication via Matrix which can also interoperate with the wider network.  You can read more about it in our [Introducing P2P Matrix](https://matrix.org/blog/2020/06/02/introducing-p-2-p-matrix/) blog post from last summer, or watch our [FOSDEM 2021 talk](https://fosdem.org/2021/schedule/event/matrix_pinecones/) where we previewed Pinecone.  It's important to note that this has been a small but important long-term project for Matrix, and has been progressing entirely outside our business-as-usual work of improving the core protocol and reference implementations.

As the project has progressed, we've built a variety of prototypes using existing libraries ([go-libp2p](https://github.com/libp2p/go-libp2p), [js-libp2p](https://github.com/libp2p/js-libp2p) and [Yggdrasil](https://github.com/yggdrasil-network/yggdrasil-go)), demonstrating what an early P2P Matrix might feel like if it were running on a mobile device, in the web browser and so on using such an overlay network. Each of these demos has taught us something new, and so in October 2020 we decided to take this knowledge to build an experimental new overlay network of our own.

Pinecone is designed to provide end-to-end encrypted communications between devices, regardless of how they are connected to one another, in a lightweight and self-arranging fashion. The routing protocol is a hybrid, taking inspiration from [Yggdrasil](https://github.com/yggdrasil-network/yggdrasil-go) by building a global spanning tree, but rather than forwarding all traffic using the spanning tree topology, we use it as a bootstrap routing mechanism for a line/snake topology, ordered by their ed25519 public keys, which we have affectionately named SNEK (Sequentially Networked Edwards Key) routing.

Nodes seek out their closest keyspace neighbours on the network and paths are built between these pairs of nodes, similar to how a Chord DHT functions, populating the routing tables of intermediate nodes in the process. These paths are then used to forward traffic without having to perform up-front searches, allowing for very fast connection setups between overlay nodes. These paths are resilient to network topology changes and handle node mobility considerably better than any other name-independent routing scheme that we have seen — early results are very promising so far. We have also been experimenting with a combination of the μTP (Micro Transport Protocol) and TLS to provide stateful connection setup, congestion control and end-to-end encryption for all federation traffic carried over the Pinecone network.

![Pinecone simulator showing line/snake logical network topology](/blog/img/2021-05-06-pineconesim.png)

If Pinecone works out, our intention is to collaborate with the libp2p and IPFS team to incorporate Pinecone routing into libp2p (if they'll have us!) while incorporating their gossipsub routing to improve Matrix federation... and get the best of both worlds :)

Today we're releasing the source code for our current early implementation of Pinecone — you can [get it from GitHub](https://github.com/matrix-org/pinecone) right now! It's very experimental still and not very well optimised yet, but it is the foundation of our latest mobile P2P Matrix demos, which support P2P Matrix over both **Bluetooth Low Energy** mesh networks, **multicast DNS** discovery within a LAN, and/or by routing through **static Pinecone peers** on the Internet:

* Android: <https://appdistribution.firebase.dev/i/394600067ea8ba37>
* iOS: <https://testflight.apple.com/join/Tgh2MEk6>

Building a routing overlay is only the first step in the journey towards P2P Matrix. We will also be looking closely in the coming months at improving the Matrix federation protocol to work well in mixed-connectivity scenarios (rather than the full mesh approach used today) as well as decentralised identities, hybrid deployments with existing homeservers and getting Dendrite (the Matrix homeserver which is embedded into the current P2P demos) more stable and feature-complete.

The long-term plan could look something like this:

![Diagram showing possible P2P Matrix stack](/blog/img/2021-05-06-pinecone.png)

Most discussion around P2P Matrix takes place in [#p2p:matrix.org](http://matrix.to/#/#p2p:matrix.org), so if you are interested in what's going on, please join us there!
