+++
title = "Switching Providers"
template = "docs/with_menu.html"
weight = 150
[extra]
emoji = "🏡"
tile = "I want to get my own homeserver"
updated = "2023-01-30T14:00:00Z"
+++

## Why switching providers?

Many users start by creating a Matrix account on Matrix.org, operated by the 
Matrix.org Foundation. It is a reliable and free provider, but as they grow
communities may want to host their own instance to have more control over their
data and image.

### Branding

One of the most noticeable changes when a community moves to its own homeserver
is the domain-based branding. Indeed, instead of having user identifiers
following the format `@username:matrix.org` and room addresses following the
format `#roomname:matrix.org`, communities can start creating user accounts and
room names with their domain name (e.g. `@username:example.com` and
`#roomname:example.com`).

|                | Using matrix.org        | Using example.com        |
|----------------|-------------------------|--------------------------|
| User Matrix ID | @alice:matrix.org       | @alice:example.com       |
| Room Address   | #goodfriends:matrix.org | #goodfriends:example.com |

### Rooms and accounts sovereignty

When someone creates a room, they automatically have the highest Power Level for
that room. This Power Level is usually 100, but custom setup can allow that
number to be higher. The highest Power Level of a room is de-facto its owner and
can appoint co-owners, moderators, redact messages, exclude people fom the
conversation, and much more.

This is a significant power, but fortunately homeserver administrators can
impersonate their homeserver users to get back in control of a room if the user
was in fact malicious. Note that this doesn't mean homeserver administrators can
read messages of the user they impersonate: the messages are End-to-End
Encrypted and the homeserver administrator doesn't have access to the decryption
keys, since they live on the user's devices.

Homeserver administrators can use Synapse's non-standard [Admin API](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/index.html)
and more particularly the [Make Room Admin API](https://matrix-org.github.io/synapse/latest/admin_api/rooms.html#make-room-admin-api)
to promote other users as administrators of the room. This API will only work if
one of their users is in the room. It will grant the highest power level
available among their users to their target.

A community managed by people who have `@xxx:matrix.org` accounts depends on the
support team of matrix.org to escalate issues and try to get back in control of
a room. The Matrix.org Foundation has limited means, and its support team works
in best effort mode. Proving the room belonged to you and you shared it by
accident can be a tedious process since the Matrix.org Foundation takes
particular care about social engineering issues.

For a more advanced explanation of how room ownership works, please head to the
rooms section of the technical documentation. FIXME FIXME FIXME PROVIDE ACTUAL
LINK.

{{ page_card(
    title="Rooms",
    path="/docs/technical#rooms",
    summary="Understand how rooms work over federation, and who can really
             control them.")
}}

### Bridging to your systems

The Matrix.org Foundation and [t2bot.io](https://t2bot.io/) are hosting some
public bridges for the convenience of users. They are of course bridging public
services with the Matrix.org homeserver.

If you want to bridge a private service such as your company's Slack Workspace,
you will need to deploy a bridge by yourself since the Matrix.org homeserver
doesn't accept bridges to new private systems.

Finally, relying on bridges hosted by the Matrix.org Foundation creates
unnecessary centralisation around it: if either the Matrix.org homeserver or the
bridge hosted by the Matrix.org Foundation are down, you temporarily lose access
to this system. To understand why, please check the [How It Works section of
the bridges page](#).

You can find a list of the systems that can be bridged to Matrix on the
[bridges section](/ecosystem/bridges) of this website.

{{ page_card(
    title="Bridges",
    path="/ecosystem/bridges",
    summary="Understand how bridges work, find out which platforms Matrix can
             bridge against, and how to deploy your own.")
}}

## Picking a new provider

The Matrix.org Foundation happily provides the matrix.org homeserver as a
convenience, but strongly encourages organisations to get their own homeserver. 

### Paid hosting

The simplest route to get your own homeserver is to pay a provider to host a
Matrix instance for you. You can find such a provider among the [list of hosting
providers the Matrix.org Foundation is aware of](/ecosystem/hosting).

{{ page_card(
    title="Hosting",
    path="/ecosystem/hosting",
    summary="Discover hosting providers the Matrix.org Foundation knows, and
             find the best suited for you.")
}}

### Rolling your own

People who either want or need to have on-premises can either pick a [server
implementation](/ecosystem/servers) they are comfortable with and install it
themselves, or get an on-premises support plan from [one of the providers the
Foundation knows](/ecosystem/hosting).

{{ page_card(
    title="Servers",
    path="/ecosystem/servers",
    summary="Browse all the server implementations, find the best suited for
             your needs and how to install it yourself.")
}}

## Transferring ownership

