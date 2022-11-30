+++
title = "Developers"
weight = 300
[extra]
emoji = "⚒️"
tile = "I want to develop a client, bridge or bot"
last_updated = "2022-10-18T16:00:00Z"
+++

## Elements of Matrix

### Homeserver

A homeserver is a piece of software hosting accounts of Matrix users. It is
bound to a single domain that cannot change over time. The accounts on a server
have an identifier made of a local part (the username), and a server part, which
is the (vanity) domain of the homeserver. A typical identifier would be

```txt
@username:example.com
```

Users on a server can send *events* into *rooms*. An event is a particular json
object, describing what a user is trying to do (join a room, send a message,
update a specific value…). In the case of instant messaging, rooms are very
similar to Slack, Discord or IRC channels. Most of the events in such rooms are
messages. Rooms have a unique technical identifier, and zero or more
human-readable aliases. Aliases are made of a room name, and a server part, and
are sometimes referred to as "addresses". A typical room alias would be:

```
#mountain-bike:example.com
```

Homeservers are federated: the Matrix specification defines a [Sever-Server API](https://spec.matrix.org/latest/server-server-api/)
(also known as Federation API) to describe interactions between servers.
Whenever a user is in a room, their homeserver needs to have a local copy of
that room.

For example, if `@alice:outdoors.com` is the first user from `outdoors.com` to
try to join `#mountain-bike:example.com`, then her homeserver is going to reach
out to `example.com` to get a copy of the room. `outdoors.com` and `example.com`
then stay in touch to synchronise their copy of the room.

Whenever the homeserver receives new events, it's in charge of parsing them,
perform checks on the event, and take action accordingly (e.g. sending messages
from users on the homeserver to other participating homeservers, or distributing
messages from other participating homeservers to users). The expected behaviour
of homeservers is described fully in the [Matrix Specification](https://spec.matrix.org).

You can find a list of existing homeserver implementations in the
[Ecosystem > Servers](/ecosystem/servers) section of this website. Most of them
are open source, so you can explore how they work. Please also refer to their
documentation if you want to deploy them either for testing or in production.

### Client

Homeservers communicate between each other with the Server-Server / Federation
API, but they also communicate with clients in a standard way: the Client-Server
API.

Clients are pieces of software that can use a Matrix account to send and receive
events from a specific homeserver. The clients themselves only ever talk to the
homeserver of the account they're using. If a client uses the
`@alice:example.com` account, they will only talk to `example.com`.

The most common kinds of client are the user facing ones. In the case of instant
messaging, those clients show rooms as timeline of messages, with users joining,
leaving, redacting messages…

To get a better idea of what clients look like in practice, you can find a list
on [Ecosystem > Clients](/ecosystem/clients) and give them a go.

If you're more interested in writing your own client to bring a new experience
to users, you may want to rely on an existing SDK (see
[Ecosystem > SDKs](/ecosystem/sdks)). Those will do significant part of the
Matrix heavy-lifting and allow you to focus on the UX you want to build.
Finally, if you're interested in learning more about the interactions between
clients and servers, please head to
[the Client-Server section of the Matrix Specification](https://spec.matrix.org/latest/client-server-api/).

### AppService (bridges and some bots)

Many Matrix bots are non-human clients. They can be built with the same SDKs as
regular clients, and instead of showing a UI to display what is happening they
will listen to events, parse them, and for example send automatic replies.

#### Simple and advanced bots

A good example of simple bot would be a RSS bot: it subscribes to a RSS feed
completely outside of Matrix and whenever it sees a new item in the feed it
posts a message in a specific Matrix room, with the name of the item. Such a bot
is nothing more than a very limited and specialised client.

But sometimes you need to get a more global view of what is happening on your
homeserver to take action. If you want to write an anti-spam module for example,
you want to be able to read each and every message from public rooms to detect
patterns and ring the alarm or take action directly.

To do it with a bot, you would need to invite the bot in each and every room
where you want the monitoring to happen. An appservice is able to monitor all
the _unencrypted_ events (messages sent/edited/redacted, people joining or 
leaving rooms) within its namespace.

#### Bridges

Sometimes you need to do even more than being an all-seeing eye: you need to be
able to create users and rooms automatically. A typical use case for this is
[bridges](/ecosystem/bridges). Bridges allow you to connect a Matrix community
to a third-party platform such as IRC, Discord or Slack. Users on these
communities appear as native users on Matrix, and ideally the other way around
on the third-party platform as well.

To do so, the bridge needs to be able to create and impersonate users on Matrix,
and to control rooms as well. In order to limit the risks of abuse, bridges can
be limited to controlling a namespace.

To get a high level view of bridges concepts and see which platforms Matrix can
be bridged to, please head to [Ecosystem > Bridges](/ecosystem/bridges) on this
website. If you're interested in writing your own bridge, you will very likely
want to rely on an existing SDK, in which case you check the existing ones in
[Ecosystem > SDKs](/ecosystem/sdks) and have a look at the
[Application Service section of the specification](https://spec.matrix.org/latest/application-service-api/).

### The Spec defining interactions between all those

We have been mentioning the [Matrix Specification](https://spec.matrix.org)
several times already. The Matrix Specification is a document describing
interactions between the various components of the Matrix ecosystem
(homeservers, clients, appservices). For a given  feature, implementation
details may vary, but Matrix aims for a consistent behaviour and wants to avoid
the need for negotiation between parties.

The specification is open, versioned, and can be freely browsed at
[spec.matrix.org](https://spec.matrix.org). Its governance and decision process
are public, so anybody can make a proposal to extend it via Matrix Spec Change.

A Matrix Spec Change (MSC) is a document describing how the author would like to
amend the Matrix Specification, to introduce a change in the interactions
between the components of the ecosystem. Such documents are discussed publicly,
and when the author think they have addressed all of the important concerns they
can bring the [Spec Core Team](/about#the-spec-core-team)'s attention to it and
start the formal review process.

The [Matrix Spec Process](https://spec.matrix.org/proposals/) is detailed on
[spec.matrix.org](https://spec.matrix.org).
