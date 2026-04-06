+++
title = "Account Migration"
template = "docs/with_menu.html"
weight = 100
[extra]
updated = "2026-02-11T17:55:00Z"
authors = ["Website & Content WG", "Matrix Stammtisch Aachen"]
+++

It is possible that it becomes necessary to migrate from one account to another.
For example you might be looking into [switching providers](@/docs/communities/switching-providers/_index.md) because you tried Matrix out by joining matrix.org and
have decided to start your own homeserver, or perhaps the homeserver currently
hosting your account is shutting down.
Maybe you are just looking to change your Matrix user ID but staying on the
same server.

Unfortunately there is no first class support for this in the Matrix protocol yet.
The following guide hopes to support you to make the transition as smooth as possible.

## What to expect

The goal of migrating to a new account is create a new account and then transfer
all the conversations you are participating in to it, optionally removing the old account.
It is useful to know that despite often different presentation in clients,
direct messages and group conversations both use use the technical concept of a
"room" in the background.
The process for both is hence largely the same.

There are two major types each room you are migrating can fall into:

1. The room can be joined autonomously
   (e.g. [Public Rooms](@/docs/chat_basics/public-rooms/_index.md))
   or your old account has a sufficient
   [Power Level](@/docs/communities/moderation/_index.md#power-levels)
   to invite your new account to it.
   This will for example include rooms you created as well as your direct messages.
2. You have no means to join your new account without help from someone else.
   This is rare, but in this case you will have to reach out to the room's moderators
   individually to let them know to invite your new account.

Additionally, each room can configure a [history visibility](@/docs/communities/getting-started/_index.md#history-visibility).

- If the room's existing history is visible to new joiners, your new account
  will be able to access old messages that your old account can already see.
- If the room's existing history is *not* visible to new joiners prior to joining,
  then your new account will not be able to show you old messages despite having
  an old account that can.
  If that history is relevant to you, consider exporting the room history from
  your old account.

Finally, there are also rare exceptions:

- Rooms can be configured not to federate, so if the new account is on another server
it will never be able to join that room.
- Some homeservers might also implement other measures to block other servers,
  e.g. [ACL-bans](https://spec.matrix.org/v1.18/client-server-api/#server-access-control-lists-acls-for-rooms)
  or via [custom policies](https://spec.matrix.org/v1.18/client-server-api/#policy-servers).

Of course you can always decide to only migrate a subset of rooms from your old
account for a little spring cleaning.

## Speeding things up

You will be sending a lot of invites with the old account and join a lot of
rooms with the new account.
Matrix by default limits how often an account can run different types of actions
to prevent abuse, including inviting and joining.

We suggest asking the admins of both your old and new homeserver to disable or
raise your rate limits temporarily to speed up the process significantly, if
possible.
Otherwise you might be looking at hours of waiting, depending on the amount of
conversations you participate in.

## Tools

The process of inviting and joining can be very tedious if you are migrating more
than just a handful of rooms.
Resourceful community members have created multiple tools over the years to
meet each of their individual requirements.

One of the most comprehensive tools at the time of writing is Dominik's fork of
[matrix-migrate](https://gitlab.com/domrim/matrix-migrate),
merging the features from multiple earlier forks of the same tool.
You will need to use a command line to run it.
It is built on the state of the art matrix-rust-sdk and has features including dry run
(simulation without executing), rate limit handling, and more.

TODO: can it produce a log of rooms it is unable to migrate?

You can find more tools (and guides) about account migration 
via community maintained lists.
For example, check out the "migration" tag filter of
[Tune Your Chat](https://tune-your-chat.github.io/ecosystem/tune/)

## Finishing up

Exploring your new account with the freshly migrated rooms, you might notice
that in End-to-End Encrypted rooms, our new account does not yet have the keys
to decrypt the historical messages.
Clients with support for End-to-End Encryption usually also allow to export and
import encryption keys.
Simply export your old account's keys and import them to your new account, and
messages should become legible!

Depending on the approach you took to migrate, the direct messages might not
appear as such in your new account.
Some clients offer a command to fix this.
For example, simply send `/converttodm` via the regular message input box of
Element Web to a room you know is supposed to be a direct message to convert
it.

You should now have migrated your account! 🎉

This process should be largely invisible for for the conversations you migrated.
However, don't forget to let everyone else know to reach you under your new ID
as needed!
A common way to do this is to change your old account's display name to include
a hint at your new Matrix ID.
