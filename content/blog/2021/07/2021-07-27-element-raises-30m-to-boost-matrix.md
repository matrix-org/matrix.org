+++
title = "Element raises $30M to boost Matrix"
path = "/blog/2021/07/27/element-raises-30m-to-boost-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "News"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

Hi folks,

Big news today: Element, the startup founded by the team who created Matrix,
just raised $30M of Series B funding in order to further accelerate Matrix
development and improve Element, the flagship Matrix app. The round is led by
our friends at [Protocol Labs](https://protocol.ai) and [Metaplanet](https://metaplanet.com),
the fund established by Jaan Tallinn (co-founder of
Skype and Kazaa).  Both Protocol Labs and Metaplanet are spectacularly on
board our decentralised communication quest, and you couldn't really ask for
a better source of funding to help take Matrix to the next level.  Thank you
for believing in Matrix and leading Element's latest funding!

You can read all about it from the Element perspective over at the
[Element Blog](https://element.io/blog/element-raises-30m-as-matrix-explodes),
but suffice it to say that this is enormous news for the Matrix ecosystem as a
whole.  In addition to transforming the Element app, on the Matrix side this
means that there is now concrete funding secured to:

* finish building out [P2P Matrix](https://matrix.org/blog/2021/05/06/introducing-the-pinecone-overlay-network)
   and get it live (including finishing Dendrite, given our P2P work builds on Dendrite!)

* implement [native decentralised E2EE voip/video conferencing](https://twitter.com/matrixdotorg/status/1419820122143961093) for Matrix

* fully build out our
   [relative decentralised reputation system](https://matrix.org/blog/2020/10/19/combating-abuse-in-matrix-without-backdoors)
   in order to combat abuse in Matrix.

Obviously this is in addition to all the normal business-as-usual work going
on in terms of:

* getting [Spaces](https://element.io/blog/spaces-the-next-frontier/) out of beta
* adding Threading to Element (yes, it's finally happening!)
* speeding up room joins over federation
* creating 'sync v3' to lazy-load all content and make the API super-snappy
* lots of little long-overdue fun bits and pieces (yes, custom emoji, we're looking at you).

If you're wondering whether Protocol Labs' investment means that we'll be
seeing more overlap between [IPFS](https://ipfs.io) and Matrix, then yes -
where it makes tech sense to do so, we're hoping to work more closely
together; for instance collaborating with the libp2p team on our P2P work
(we still need to experiment properly with gossipsub!), or perhaps giving
[MSC2706](https://github.com/matrix-org/matrix-doc/blob/travis/msc/ipfs/proposals/2706-IPFS.md)
some attention.  However, there are no plans to use cryptocurrency incentives
in Matrix or Element any time soon.

So, exciting times ahead!  We'd like to inordinately thank everyone who has
supported Matrix over the years - especially our Patreon supporters, whose
donations pay for all the matrix.org infrastructure while inspiring others to
open their cheque books; the existing investors at Element (especially [Notion](https://notion.vc)
and [Automattic](https://automattic.com), who have come in again on this round); all the large scale
Matrix deployments out there which are effectively turning Matrix into an
industry (hello [gematik!](https://matrix.org/blog/2021/07/21/germanys-national-healthcare-system-adopts-matrix)) -
and everyone who has ever run a Matrix server, contributed code, used the
spec to make their own Matrix-powered creation, or simply chatted on Matrix.

Needless to say, Matrix wouldn't exist without you: the protocol and network
would have fizzled out long ago were it not for all the people supporting it
(the matrix.org server can now see over 35.5M addressable users on the
network!) - and meanwhile the ever-increasing energy of the community and the
core team combines to keep the protocol advancing forwards faster than ever.

We will do everything we possibly can to succeed in creating the long-awaited
secure communication layer of the open Web, and we look forward to large
amounts of Element's new funding being directed directly into core Matrix
development :)

thanks for flying Matrix,

Matthew, Amandine & the whole Matrix core team.
