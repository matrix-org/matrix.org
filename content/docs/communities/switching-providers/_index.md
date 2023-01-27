+++
title = "Switching Providers"
template = "docs/community.html"
weight = 150
[extra]
emoji = "🏡"
tile = "I want to get my own homeserver"
updated = "2023-01-27T12:09:00Z"
+++

## Why switching providers?

Many users start by creating a Matrix account on Matrix.org, operated by the 
Matrix.org Foundation. The Matrix.org Foundation is a reliable and free
provider, but as they grow communities may want to host their own instance to
have more control over their data and image.

### Branding

One of the most noticeable changes when a community moves to its own homeserver
is the domain-based branding. Indeed, instead of having user identifiers
following the format `@username:matrix.org` and room addresses following the
format `#roomname:matrix.org`, communities can start having user accounts and
room names with their name (e.g. `@username:example.com` and
`#roomname:example.com`).

### Rooms and accounts sovereignty

When someone creates a room, they automatically have the highest Power Level for
that room. This Power Level is usually 100, but custom setup cann allow that
number to be higher. The highest Power Level of a room is de-facto its owner and
can appoint co-owners, moderators, redact messages, exclude people fom the
conversation, and much more.

This is a signficant power, but fortunately homeserver administrators can
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

### Bridging to your systems

TODO

## Picking a new provider

The Matrix.org Foundation happily provides the matrix.org homeserver, but
strongly encourages organisations to get their own homeserver. 
### Paid hosting

The simplest route to get your own homeserver is to pay a provider to host a
Matrix instance for you.

### Rolling your own

People who either want or need to have on-premises can either pick a [server
implementation](/ecosystem/servers) they are comfortable with and install it
themselves, or get an on-premises support plan from [one of the providers the
Foundation knows](/ecosystem/hosting).

