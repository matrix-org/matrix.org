+++
title = "Introducing P2P Matrix"
path = "/blog/2020/06/02/introducing-p2p-matrix"
aliases = ["/blog/2020/06/02/introducing-p-2-p-matrix/"]
[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

TL;DR: we shipped a major update (v0.1.1) to [https://p2p.riot.im](https://p2p.riot.im) - fire up a desktop Chrome or Firefox in not-private-browsing mode and give it a go!

Hi folks,

As many know by now, a few of us have been working away since mid-December on experimenting with running Matrix in a peer-to-peer architecture - one where every user has absolute total autonomy and ownership of their conversations, because the only place their conversations exist is on the devices they own.

In some ways this is the logical end goal of Matrix: our aim has always been to empower users to have full control over their communication rather than being beholden to any given service provider, and in a P2P world we completely return power over secure communication to the people.

### Why P2P?

P2P Matrix is about more than just letting users store their own conversations: it can also avoid dependencies on the Internet itself by working over local networks, mesh networks, or situations where the Internet has been cut off.  Even more interestingly, without homeservers, there is nowhere for metadata to accumulate about who is talking to who, and when - which is a legitimate complaint about today’s Matrix network, given the homeservers of all users in a given conversation necessarily have to store that conversation’s metadata.  P2P also lets us radically simplify signup for new users if they don’t have to pick a server to get going - and we avoid the unintentional centralisation of users piling onto public servers.

P2P also forces us to solve many of the hardest remaining problems in Matrix: e.g multi-homed accounts, given multi-device P2P requires your account to exist in multiple places. This in turn unlocks high availability and geo-redundancy for accounts on today’s Matrix network (imagine having a primary and backup homeserver that magically did the right thing!), as well as account portability, and thus also vhosting and load-balancing accounts between servers, and even improved GDPR compliance (for if your user IDs are ephemeral they are no longer personally identifying information baked into your Matrix rooms).  We’ll also need better safety mechanisms to avoid folks exploiting the anonymous nature of the network for abuse, accelerating the work we’re already doing for today’s Matrix network.

The way we’ve been approaching P2P is the “[hamfisted but genius](https://twitter.com/Lucid00/status/1263974339294175232)” approach of taking homeservers and running them on the client, alongside or within your Matrix client - meaning that there are literally **no** changes required for any Matrix client to talk P2P Matrix, and so P2P Matrix can instantly benefit from all the work which has gone into Riot and other apps.  As a result, P2P is also a huge motivator towards developing much smaller homeservers which can run efficiently clientside (e.g. Dendrite!) - which is of course great news for Matrix as a whole.  It also forces us to develop more scalable routing algorithms (as you don’t want your client to have to talk to every other device in a room every time it sends a message!) and also spurs development of low bandwidth Matrix transports (as you don’t want the additional chatter of talking to multiple peers to consume all your bandwidth).  Finally, it forces us to really ruggedize federation, given nodes are constantly appearing and disappearing, giving the federation much more of a stress test than we see with today’s relatively static homeservers.

### P2P in Practice

So, P2P has been acting as fuel for a lot of our longer term Matrix work over the last few months.  There have been three main experiments so far: at [FOSDEM](https://fosdem.org/2020/schedule/event/dip_p2p_matrix/) we showed off running our next-gen Dendrite homeserver running clientside using HTTP over [libp2p](https://libp2p.io/) as the transport.  We also highlighted Timothée Floure’s [project at EPFL](https://www.epfl.ch/labs/dedis/wp-content/uploads/2020/01/presentation-2019-2-Timothee-Floure-Experimenting-with-Matrix-federation-over-Yggdrasil.pdf) experimenting with Synapse talking P2P CoAP over yggdrasil as the transport via a proxy.

Most recently, however, we’ve been experimenting with compiling Dendrite down to Web Assembly and running it embedded in Riot Web as a Service Worker, using HTTP over libp2p’s websocket transport (coordinated via a websocket rendezvous server).  Architecturally, it looks like this:

![P2P Architecture Diagram](/blog/img/p2p-diag.png)

Today, we’re shipping a major new alpha (v0.1.1) of this P2P demo up at [https://p2p.riot.im](https://p2p.riot.im) (requires desktop Chrome or Firefox in non-private-browsing mode) - which hopefully should give a really usable and concrete taste of the shape of things to come.

The main features are:

* Your conversations are now persisted in your browser storage (via IndexedDB), meaning that as long as all the browsers participating in a given conversation don’t clear their local storage, rooms on the P2P network are here to stay!
* Your room directory lists all the aliases for all the rooms published by active nodes on the network.  Moreover, we now automatically publish a local room alias whenever you join a public room, so that others will be able to discover that room via you, even if the server who originally created the alias has disappeared.
* Lots and lots of federation improvements between the nodes - for instance, when a node comes online, others should now automatically detect and send scrollback to it.  Invites should work, and there should no longer be any unexpectedly redacted messages.

Needless to say, all the code for this is open source under the Apache license, and if you’re feeling particularly adventurous you can embed your very own P2P Dendrite into Riot Web by using the Dockerfile at [https://github.com/matrix-org/dendrite/blob/master/build/docker/DendriteJS.Dockerfile](https://github.com/matrix-org/dendrite/blob/master/build/docker/DendriteJS.Dockerfile) or following the instructions at  [https://github.com/matrix-org/dendrite/blob/master/docs/p2p.md](https://github.com/matrix-org/dendrite/blob/master/docs/p2p.md).

Please report bugs to [https://github.com/matrix-org/dendrite/issues](https://github.com/matrix-org/dendrite/issues)!

Finally, please understand that the demo is very likely **not** what the final version of P2P Matrix will look like - this is just one step in a series of experiments as we investigate the best paths forward :)

### What’s next?

For the current demo, there’s still lots of stuff remaining, including:

* More federation debugging (and hooking in [tardis](https://github.com/matrix-org/tardis) and writing up everything we’ve learned about implementing federation in Dendrite!)
* Making the content repository work in-browser (gotta fill up those IndexedDBs with some GIFs!)
* Hooking up E2E Encryption APIs in Dendrite (not that it buys us much in a pure P2P world)
* WebRTC transports.  Turns out that service workers aren’t allowed to speak WebRTC, so we’ll have to shim through to Riot to speak true peer-to-peer WebRTC data channels rather than relaying all the traffic through the websocket rendezvous server.
* Decentralised accounts for multidevice support - reviewing [MSC1228](https://github.com/matrix-org/matrix-doc/blob/rav/proposal/remove_mxids_from_events/proposals/1228-removing-mxids-from-events.md) and getting Dendrite supporting multihoming accounts!
* Finishing all of Dendrite’s other remaining APIs.

Beyond this, there are some bigger picture questions left to be answered in future experiments.

Firstly: we do not yet have a solution for “store and forward” nodes which can relay messages on behalf of a room if all the participating devices are offline.  A first cut will be to run a P2P-capable homeserver server-side for this, but then metadata will start to accumulate server-side for the conversations it hosts.  A more interesting approach would be to use a store and forward system which obfuscates who is talking to who, such as a mixnet, and could even provide resistance to network traffic pattern analysis.  This is very much an open area of research, but one we are getting into :D

Secondly: we want to experiment more with other transports, and find out which works best for Matrix.  Libp2p has some really exciting new stuff in the form of [Gossipsub v1.1](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1) - a much smarter routing algorithm for pubsub traffic in libp2p, which David Dias gave us a [VIP tour](https://youtu.be/APVp-20ATLk?t=3598) of at the first Open Tech Will Save Us meetup.  So we’ll need to restructure our libp2p transport as pubsub to see how it works in practice.  Separately, we also want to play with hooking up [Yggdrasil](https://yggdrasil-network.github.io/) (the encrypted overlay network) as a transport as a totally different approach - Yggdrasil will easily let us span different underlying network transports, but comes with different tradeoffs (e.g. no browser support yet).  We also want to take a look at the [DAT](https://dat.foundation/) / [hypercore](https://github.com/hypercore-protocol/hypercore) / [hyperswarm](https://github.com/hyperswarm/hyperswarm) / [Cabal](https://cabal.chat/) ecosystem to see if there’s a match :)

Thirdly and finally: we obviously want to unify the new P2P Matrix network with today’s federated one.  The ideal outcome here would be to have a hybrid model, where teams who want their users to have a dedicated homeserver (for availability, IT policies, etc) can continue to have one as they do today - but newbies who have just installed Riot would float around on P2P unless they decided to consciously put down roots on a server or two.  Best of all, it would let us turn off the matrix.org homeserver: the best public homeserver is one you run yourself on your own phone ;)  The approach we take for linking P2P and today’s Matrix will depend very much on the transport we select for P2P in the long run, but the likelihood is that today’s homeservers will sprout P2P gateways to link the networks.

## Conclusion

So, there you have it.  P2P Matrix exists, and is developing at an alarming speed - and pushing Dendrite development along with it.  Most excitingly, there have been no changes yet to the Matrix spec for P2P at all; we’ve just swapped https for http-over-libp2p as the transport.  So **all** of the work we’ve been doing making Dendrite work in a P2P world has directly translated into making Dendrite work on today’s Matrix too  You can now stand up a Dendrite and have it federate pretty reliably with the wider Matrix network, although we’re still rushing through implementing APIs (we’re up to 35% passing [sytest](https://github.com/matrix-org/sytest) coverage - although that 35% does contain most of the important tests :)

Finally, in case you’re worried about why the Matrix core team is off chasing P2P dreams rather than improving Riot’s UX, or implementing Communities, or Extensible Profiles, or working through the MSC backlog etc... in practice only two people (ignoring Matthew) have been working on P2P - Neil Alexander (author of the original FOSDEM demo, Dendrite wrangler and Yggdrasil co-maintainer) and Kegan Dougal (of the original Matrix dev team, one of the original authors of Dendrite, and now wrangling the WASM P2P work too).  Huge thanks to Kegan & Neil for pushing P2P forwards - and huge thanks to everyone else on the core team and the wider community for keeping today’s Matrix advancing too!

Hope this has given a tempting glimpse of the shape of things to come.  Honestly we never thought we’d get as far as P2P when we started Matrix back in 2014, but it’s really fun to be finally catching up with the future :D

-- Matthew

P.S. You can read more about this from Neil Alexander’s point of view [over at his blog](https://neilalexander.dev/2020/06/02/thoughts-p2p-matrix.html) (including more thoughts on the potential Yggdrasil demo!)

P.P.S You can read the gory details of the P2P and WASM implementation from Kegan's point of view [over at the Dendrite wiki](https://github.com/matrix-org/dendrite/wiki/How-p2p.riot.im-works).

P.P.P.S Comments over at [HN](https://news.ycombinator.com/item?id=23393935)
