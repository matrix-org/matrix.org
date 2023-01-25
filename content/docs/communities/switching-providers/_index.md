+++
title = "Switching Providers"
template = "docs/community.html"
weight = 150
[extra]
emoji = "🏡"
tile = "I want to get my own homeserver"
updated = "2023-01-25T12:09:00Z"
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

## Picking a new provider

* Why?
    * Branding
    * Recovering accounts and/or rooms
    * Staying in control of where your data is
    * Adding more, less crowded bridges
* How?
    * Relying on a [hosting provider](/ecosystem/hosting)
    * Hosting one of [the server implementations](/ecosystem/servers) yourself
