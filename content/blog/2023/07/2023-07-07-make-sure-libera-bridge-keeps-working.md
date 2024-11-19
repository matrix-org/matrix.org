+++
date = "2023-07-07T18:45:00Z"
title = "Making Sure The Libera.Chat Bridge Keeps Working"

[taxonomies]
author = ["Thib"]
category = ["Bridges"]
+++


Libera Chat recently [announced their decision to opt-out of portalled rooms](https://libera.chat/news/matrix-deportalling)
from the Libera.Chat bridge instance hosted by the Matrix.org Foundation
([a decision we regret but respect](https://matrix.org/blog/2023/07/deportalling-libera-chat/)).
**This means that for the bridge to keep working, all of your portalled rooms
need to be turned into plumbed rooms before July 31st**. All of this might be a
bit obscure, so let’s walk together through these concepts and give you the
tools to make sure the bridge keeps working for you.

<!-- more -->

## Am I concerned?

If your community is primarily on Matrix and your rooms are not bridged to
Libera.Chat channels, then you’re not concerned!

If your community is spread across Matrix and Libera Chat, you need to make sure
your room is “plumbed” into a Libera Chat channel, and not “portalled” to it.
But what are those, and how to find out?

## Plumbed and portalled?

The simplest approach to it is to say that:

* Portalled rooms are primarily owned by the bridge and “obey” the IRC side.
Everyone can join a portalled room.
* Plumbed rooms are primarily owned by an individual, and try to obey the IRC
side as much as possible. Plumbed rooms require an IRC chanop to approve a
plumbing request to establish the link between the Matrix room and the IRC
channel.

If you created the room yourself and you remember manually plumbing it into IRC,
then it's a plumbed room. In all other cases, chances are very high that you are
using a portalled room. There is no simple way for the general public to know
whether the room is plumbed or portalled because it’s a technicality that
shouldn’t matter for most people, and the bridge was not designed to work with
only plumbed rooms.

Widgets are not part of the Matrix specification, but given the short time you
have to migrate your channels, they’re the most straightforward way to figure
out whether your room is portalled or plumbed and do the necessary to keep the
bridge working.

In this guide, we’ll be using Element. Open your room, then click on the top
right `i` to open the right panel. Click on “Add widgets bridges & bots”.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/right-panel-add-widgets-bridges.png)

Click on “IRC Bridge (Libera.Chat)” and see if you have results in the “Linked
channels” section.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/libera-widget-linked-section.png)

If you see results in that section, the room is plumbed, and it will keep
working. If you don’t see any result in that section, the room is portalled and
the bridge will stop working by July 31st.

## What to do if my room is portalled

Unfortunately, portalled rooms cannot be easily turned into plumbed rooms. You
need to:

1. Create a brand new Matrix room
2. Plumb it to the IRC channel it was bridged to
3. Redirect the users of the portalled room to the new plumbed room.

The third step can will be done automatically by the bridge in portalled rooms.
On July 31st, it will make the room read only and list the public rooms which
are plumbed to the same IRC channel.

### Create a brand new room

At first this room is not connected to IRC at all. We recommend you to set the
room history visibility to “Members only (since they joined)”, which corresponds
to `m.room.history_visibility = joined` technically. This setting matches IRC’s
behaviour.

### Plumb it to IRC

In Element, make sure you’re in the room you have just created, and click on the
top right `i` icon to open the right panel. Then at the bottom click on “Add
widgets, bridges & bots” like you did in the portalled room.

In the “Bridges” section, click on “IRC Bridge (Libera.chat)” and “Add”. Scroll
down to “Link a new channel”. You will be asked to fill information so you can
plumb the room to IRC. You can’t edit the server field, which is correctly set
to Libera Chat. Enter the channel you want to plumb to, and the nick of a chanop
of this channel.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/request-plumbing.png)

We ask you to please be considerate of Libera Chat chanops and staff, and to
only send plumb requests to channels:

* you control;
* or you have talked to the chanop prior to the plumb request

The chanop will receive this request on their end:

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/plumbing-op-request.png)

If they accept, the room will be plumbed into the IRC channel. Again, please be
mindful of the remote side of the bridge and don’t send plumbing requests out of
the blue: IRC chanops will very likely turn them down if they don’t know who is
sending them or who is controlling the room.

### A note on aliases

Portalled rooms used to have room addresses in the form`#myroom:libera.chat`.
Since the `libera.chat` instance only has Matrix ghosts and no real human users,
you can’t move the alias from the portalled room to your new plumbed room. This
is by design.

We hope to be able to turn portalling back on in the future, when we have more
resources reserved for the bridge and can make stronger commitments. As such we
want to keep addresses ending in `:libera.chat` for portalled rooms.

This is not too much of a problem for your room and users though. Let’s consider
your portalled room was `#myroom:libera.chat`, and that you have created
`#myroom:example.com` to plumb it into the same `#myroom` channel on
Libera.Chat. People who try to join `#myroom:libera.chat` will be greeted with a
message telling them that the room has been archived, and redirect them to your
plumbed room.
