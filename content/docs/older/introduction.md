+++
title = "Introduction"
aliases = ["/docs/guides/introduction"]
+++

## What is Matrix?

Matrix is an **open standard** for **interoperable**, **decentralised**,
**real-time** communication over IP.

* there exists an **open standard** in the form of the
  [Matrix Specification](https://matrix.org/docs/spec/)
* it's **interoperable**, meaning it is designed to *interoperate* with other
  communication systems, and being an Open Standard means it's easy to see how
  to interoperate with it
* Matrix is **decentralised**, which means there is *no central point* - anyone
  can host their own server and have control over their data
* it is designed to function in **real-time**, which means it is ideal for
  building systems that require immediate exchange of data, such as Instant
  Messaging

## How does it work?

Each  user connects to a single server, this is their *homeserver*. Users are
able to participate in *rooms* that were created on any Matrix server since
each server *federates* with other Matrix servers. This means you can talk to
anyone on any server. It also means you can host your own server, giving you
control over all of your data. Self hosting also gives you the ability to
customize your server to fit your needs including giving you the ability to
bridge to other chat networks (such as IRC, XMPP, Discord, Telegram, etc) or to
host bots.

Each message that is sent in a room is synchronized to all of the other servers
that participate in that room. If one server goes offline, everyone else in the
room can continue talking. Once that server comes back online it will be sent
all of the messages that it missed while it was down.

Did we mention it is secure? Your private conversations can be secured by end
to end encryption so the server has no idea what you are talking about.

> For a more detailed introduction to this topic see <https://hacks.mozilla.org/2018/10/dweb-decentralised-real-time-interoperable-communication-with-matrix/>

## How can I try it out?

To start chatting on Matrix you’ll need to sign up for a user account.

On Matrix a user account is associated with a single server, referred to as a
*homeserver*. You can find a [small list of some publicly-available homeservers
to choose from here](https://joinmatrix.org/servers/).

The simplest way to sign up and try Matrix out is to use Element, a web-based
client. Go to [app.element.io](https://app.element.io/) to get started - this will
allow you to sign up for a new account on Matrix.org, and get chatting right
away. There are also native Element apps for [Android](https://play.google.com/store/apps/details?id=im.vector.app) and [iOS](https://apps.apple.com/us/app/element-previously-riot-im/id1083446067).

Don’t like web based clients? Not a problem! Since Matrix is an open standard
there are dozens of clients to choose from, each built for a different type of
user. Check out our [list of a few popular Matrix clients](https://matrix.org/clients/)
and [Try Matrix Now](https://matrix.org/docs/projects/try-matrix-now/) for a list of everything that’s out there.

## How can I get my own server?

If you’d like to host your own server then the reference implementation,
[Synapse](https://github.com/matrix-org/synapse), is what you want to install.
The [Installing Synapse](https://matrix.org/docs/guides/installing-synapse)
page should be everything you need to get started. There are several other
servers implementations in progress but they aren’t quite ready for production
use yet.

## What is 'Bridging'? How can I bridge to other Services?

Bridging is our term for connecting Matrix to other services. You can connect
Matrix to chat systems such as IRC, Slack, Telegram and many more. Take a look
at [matrix.org/bridges/](https://matrix.org/bridges/) for a more complete list.
