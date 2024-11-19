+++
title = "Elements of Matrix"
weight = 100
template = "docs/with_menu.html"
aliases = ["/docs/matrix-concepts", "/docs/technical/"]
[extra]
updated = "2023-02-08T08:00:00Z"
meta_description = """
Matrix relies on homeservers to connect clients together. Appservices are
pieces of software that can bridge Matrix and third-party platforms together.
The Matrix Specification defines the interactions between all those.
"""
+++

{{ howitworks() }}

Matrix works like email, but for instant messaging. People need to use a client
to be able to write and receive messages, and they need providers to provide
them an account on their homeserver.

{{ figure(
    img="./federation.svg",
    caption="Schema of clients connected to homeservers. The servers are federated together")
}}

Let's explore what those are.

## Homeserver

A homeserver is a piece of software hosting accounts of Matrix users. It is
bound to a single domain that cannot change over time. The accounts on a server
have an identifier made of a local part (the username), and a server part, which
is the (vanity) domain of the homeserver. A typical identifier would be

```txt
@username:example.com
```

The Matrix ID of the users on the schema above look like below.

{{ figure(
    img="./federation_matrix_ids.svg",
    caption="Schema of clients connected to federated homeservers. All users have a Matrix ID")
}}

You can find a list of existing homeserver implementations in the
[Ecosystem > Servers](/ecosystem/servers) section of this website. Most of them
are open source, so you can explore how they work. Please also refer to their
documentation if you want to deploy them either for testing or in production.

{{ page_card(
    path="/ecosystem/servers",
    title="Servers",
    summary="Discover all the homeserver implementations.")
}}

## Client

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

{{ page_card(
    path="/ecosystem/clients",
    title="Clients",
    summary="Discover all the Matrix clients.")
}}

If you're more interested in writing your own client to bring a new experience
to users, you may want to rely on an existing SDK (see
[Ecosystem > SDKs](/ecosystem/sdks)). Those will do significant part of the
Matrix heavy-lifting and allow you to focus on the UX you want to build.
Finally, if you're interested in learning more about the interactions between
clients and servers, please head to
[the Client-Server section of the Matrix Specification](https://spec.matrix.org/latest/client-server-api/).

{{ page_card(
    path="/ecosystem/sdks",
    title="SDKs",
    summary="Browse SDKs to write your own client.")
}}

## AppService (bridges and some bots)

Many Matrix bots are non-human clients. They can be built with the same SDKs as
regular clients, and instead of showing a UI to display what is happening they
will listen to events, parse them, and for example send automatic replies.

### Simple and advanced bots

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

### Bridges

Sometimes you need to do even more than being an all-seeing eye: you need to be
able to create users and rooms automatically. A typical use case for this is
[bridges](/ecosystem/bridges). Bridges allow you to connect a Matrix community
to a third-party platform such as IRC, Discord or Slack. Users on these
communities appear as native users on Matrix, and ideally the other way around
on the third-party platform as well.

- The users created on the Matrix side by the bridge to mimic users on the
  third-party platform are called `ghosts`.
- The users created on the third-party platform by the bridge to mimic Matrix
  users are called `puppets`.

{{ figure(
    img="./bridge.svg",
    caption="A schema of a room bridged between matrix.org and slack.com")
}}

To do so, the bridge needs to be able to create and impersonate users on Matrix,
and to control rooms as well. In order to limit the risks of abuse, bridges can
be limited to controlling a namespace.

To get a high level view of bridges concepts and see which platforms Matrix can
be bridged to, please head to [Ecosystem > Bridges](/ecosystem/bridges) on this
website. If you're interested in writing your own bridge, you will very likely
want to rely on an existing SDK, in which case you check the existing ones in
[Ecosystem > SDKs](/ecosystem/sdks) and have a look at the
[Application Service section of the specification](https://spec.matrix.org/latest/application-service-api/).

{{ page_card(
    path="/ecosystem/bridges",
    title="Bridges",
    summary="Discover the platforms you can bridge to and how.")
}}

## The Specification

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
