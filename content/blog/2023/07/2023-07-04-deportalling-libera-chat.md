+++
date = "2023-07-04T16:00:00Z"
title = "Deportalling from Libera Chat"

[taxonomies]
author = ["Neil Johnson"]
category = ["Bridges"]
+++

On Monday 3rd July, the Libera.Chat IRC network shared that [they would no longer accept portalled rooms over the Matrix.org &lt;> Libera.Chat bridge](https://libera.chat/news/matrix-deportalling).
This change will come into effect between 25th July and 31st July.

We respect the decision but also recognise that this will be disruptive for
matrix.org users accessing IRC over the bridge.

Practically speaking, if you currently use matrix.org as a bouncer into Libera.Chat this will no longer be possible unless the admin of every room you inhabit is willing
to reconfigure the room for plumbing.

This post explains the situation as seen from the matrix.org side, what it means for matrix.org users and what to do next.

<!-- more -->

## What is a portalled room, what is a plumbed room?

Portalled rooms are rooms that already pre-exist on the IRC side of the bridge -
e.g. #example:libera.chat in Matrix is, for now, #example on Libera. It is
possible to join from matrix.org without any configuration needed whatsoever.
Effectively using matrix.org as a ‘bouncer’ for the remote network.

Plumbed rooms are existing Matrix rooms bridged to existing IRC channels. They
require specific configuration and action by the IRC chanop. They can be useful
in cases where multiple protocols bridge into the same room on the Matrix side
though are harder to manage than their portalled counterparts, and have limits
to avoid large (100+ user) preexisting rooms being plumbed together.

## What happened?

Bridging two incompatible protocols together is hard and requires constant
attention. It is at once a technical and social challenge.

Over the last 9 years, the IRC bridge has had its share of problems, and we have
worked through fixing them. Though in fairness, not always as rapidly as we
would like. For many years it was essentially just one person leading the
effort, and then in recent times, we added two more people (though the team
covers all bridges and integrations).

We are in constant dialogue with the Libera.Chat team, and we know they have
been frustrated with the experience of working with the bridge.

Recent examples include

- Latency due to federation delays
- Spam from Matrix - open signup spam not being blocked on the bridge, and
  Libera having to write their own scanner
- Dropped messages following an ambitious refactor of the bridge

We have tried to address these problems as they arise, this [changelog for the 1.0 release](https://github.com/matrix-org/matrix-appservice-irc/releases/tag/1.0.0)
gives an idea of some recent changes.

More concretely:

- Persisting connections over a restart
- Continually monitoring and scaling the libera.chat homeserver (hosted on EMS)
- Automatically disconnecting users banned by matrix.org moderators, by reading
  the [ban list](https://matrix-org.github.io/matrix-appservice-irc/latest/administrators_guide.html#subscribing-to-moderation-policies).
- Improving test coverage with a new suite of [E2E tests](https://github.com/matrix-org/matrix-appservice-irc/tree/develop/spec/e2e)
  for the bridge.

Fundamentally, progress has been slow due to bandwidth, and we cannot stress
enough that these hurdles are not due to a lack of care or interest, but much
more due to trying to support the bridge on limited resources.

All in all, it adds up to a lot of work on both sides of the bridge, which
places pressure both on the matrix.org side and the Libera Chat side. After
consideration, the folks at Libera decided that it would be better to block
portalled rooms and instead move to an opt-in model where the specific admins
would need to agree to have their room be ‘plumbed’ into Matrix.

As a separate point, we know there have been some concerns about the
archive.matrix.org service. This is unfortunate, not least because we see some
fundamental misunderstandings on what the service is doing and why.
[Here is a more detailed post to explain](https://matrix.org/blog/2023/07/what-happened-with-the-archive/).

## So what does this mean?

From August 2023, only plumbed rooms will be possible.  This means that unless
the chanop on the Libera Chat side is open to plumbing the room, then it will not be
possible to talk in the room from Matrix. This will affect the majority of the
~11,000 Matrix users currently using the bridge to communicate on IRC (and the
remaining ~31,000 users left on the IRC side of the bridge).

As a consequence, it will no longer be possible to use matrix.org as a bouncer into
Libera and in order to reach a given room, chanop _must_ specifically configure the
plumbed room. Additionally, some features will stop functioning, like topic
synchronisation or kick propagation from Libera.

## What to do next?

If you are a matrix.org user and want to continue to participate in an Libera IRC
community, then you will need to persuade the room IRC chanop to do the
necessary plumbing. Hopefully, they will do that for you, but if not, there
will be no way to reach across the bridge.

We will put together a guide to make the process of converting to a plumbed
room easier.

Further down the line, Libera have floated an idea to implement a channel mode
to let chanops opt-in to portalled bridging. This approach could reduce the
overall burden on the chanop and reduce friction to interoperability.

## A word on the bigger picture

For the most part, this post attempts to lay out the situation practically.
However, we should not ignore the bigger picture. At Matrix, we consider this
situation to be a great sadness. We respect the decision from Libera Chat, but
see this as a lose-lose for the open-source community overall.

This move will partition the two networks. It will stop users from being able to
use matrix.org as an IRC bouncer into Libera. It will make life more irritating for Libera chanops
who will now be hassled by users to enable Matrix bridging for their rooms,
rather than it happening automatically.

It will fragment communities still further between their Matrix room and their
separate IRC room (as well as their Discord and Telegram and Slack etc), unless
the chanop chooses to plumb the two together.

It will represent a blow to the open-source community at large and make it even
harder for contributors to participate in discussions for their projects. Also,
since it means creating new rooms, there will be a discontinuity in room history
with valuable discussion effectively lost.

Perhaps most importantly, it will encourage plumbing, which can cause more
problems than portal bridging. Specifically, the social implications of plumbing
(merging) together two existing communities will always be more more
controversial and awkward than simply joining a Libera IRC channel using matrix.org as a
bouncer. In practice, plumbing gives fewer privileges to the bridge bot, which
makes support for bridged rooms more difficult on both sides.

Fundamentally, we do not want to be bad IRC citizens and acknowledge that the
matrix.org bridge generates more work on the Libera Chat side than native IRC
bouncers. We do consider that extra effort to come with a significant upside:
it’s transparent for users, who can pick the technology they love to join the
conversation.

Likewise, the folks at Libera are keen to stress that this is not necessarily a
permanent change, and that in future, they would be open to reconsidering the
move should the support burden of the bridge reduce.

So that’s it, we’ll be working with the community over the coming month to help with the transition.
