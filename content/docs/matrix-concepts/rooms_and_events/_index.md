+++
title = "Rooms & Events"
weight = 200
template = "docs/with_menu.html"
[extra]
updated = "2023-02-23T08:00:00Z"
meta_description = """
Matrix relies on rooms to distribute events across servers and clients. Rooms
have a hierarchy based on power levels. Each homeserver has its own copy of all
the rooms all their users belong to.
"""
+++

Users on a server can send *events* into *rooms*. An event is a particular json
object, describing what a user is trying to do (join a room, send a message,
update a specific value…). An event will look like the following:

```json
{
  "content": {
    "body": "This is an example text message",
    "format": "org.matrix.custom.html",
    "formatted_body": "<b>This is an example text message</b>",
    "msgtype": "m.text"
  },
  "event_id": "$143273582443PhrSn:example.org",
  "origin_server_ts": 1432735824653,
  "room_id": "!jEsUZKDJdhlrceRyVU:example.org",
  "sender": "@example:example.org",
  "type": "m.room.message",
  "unsigned": {
    "age": 1234
  }
}
```

In the case of instant messaging, clients display rooms very similarly to Slack,
Discord or IRC channels. Most of the events in such rooms are messages. Rooms
have a unique technical identifier, and zero or more human-readable aliases.
Aliases are made of a room name, and a server part, and are sometimes referred
to as "addresses". A typical room alias would be:

```txt
#goodfriends:example.com
```

From a technical perspective, a room is a series of json objects. The schema
below represents a room with dumbed down events. It is up to the clients to
read, parse, and display the events properly.

{{ figure(
    img="./events.svg",
    caption="The room #goodfriends:example.com with simplified events")
}}

## Local copies

Homeservers are federated: the Matrix specification defines a [Sever-Server API](https://spec.matrix.org/latest/server-server-api/)
(also known as Federation API) to describe interactions between servers.
Whenever a user is in a room, their homeserver needs to have a local copy of
that room.

For example, if `@alice:example.com` is the first user from `example.com` to try
to join `#goodfriends:matrix.org`, then her homeserver is going to reach out to
`matrix.org` to get a copy of the room. `example.com` and `matrix.org` then stay
in touch to synchronise their copy of the room.

{{ figure(
    img="./room_federated.svg",
    caption="Three homeservers keeping their local copy of the room in sync")
}}

## Administration & privileges

Whenever the homeserver receives new events, it's in charge of parsing them,
perform checks on the event, and take action accordingly (e.g. sending messages
from users on the homeserver to other participating homeservers, or distributing
messages from other participating homeservers to users). The expected behaviour
of homeservers is described fully in the [Matrix Specification](https://spec.matrix.org).

It could seem dangerous to think that everyone has their own local copy of the
room. Doesn't that mean anyone can become administrator of the room and do nasty
things? Fortunately, no. The privileges of people in the room are defined by
Power Levels.

Power levels define a hierarchy in the room. All of the actions in a room
require a minimum power level. Posting a message in a room requires having the
power level 0, redacting someone else's message usually requires having power
level 50, changing the room address usually requires having power level 100.

For more details on power levels, please check the relevant section of the
community management documentation.

{{ page_card(path="/docs/communities/moderation/#power-levels",
    title="Power Levels",
    summary="Discover how power levels are used in practice.")
}}

### At room creation

A power level is an integer usually between 0 and 100 bound to an account in a
room. According to the spec recommendations, when someone creates a room, their
account gets power level 100 in that room. So if Alice creates the room
`#goodfriends` on example.com, her account `@alice:example.com` will get the
power level 100 in all the local copies of `#goodfriends:example.com`, whether
the copy is on example.com, matrix.org or ergaster.org.

{{ figure(
    img="./room_creation.svg",
    caption="Alice creates the room and automatically gets Power Level 100")
}}

### At room join

When someone else joins the room, whether they are on the same homeserver as the
creator or another homeserver, by default they are assigned the power level 0.
If Bob on `matrix.org` joins `#goodfriends:example.com`, his server is going to
ask Alice's `example.com` a local copy of the room, and stay in sync with it.

{{ figure(
    img="./room_join.svg",
    caption="Bob joins the room and automatically gets Power Level 0")
}}

If Carol joins from her homeserver `ergaster.org`, she will also get the power level
0.

{{ figure(
    img="./room_federated.svg",
    caption="Carol joins the room and automatically gets Power Level 0 as well.
    The power levels are the same on every local copy of the room.")
}}

### Altering a local copy of the room

Let's now consider Walter. Walter is the homeserver administrator of
`example.com`, the homeserver Alice used to create the `#goodfriends:example.com`
room.

When he joins the room, Walter gets the power level 0 by default, as everyone
else.

{{ figure(
    img="./walter_joins.svg",
    caption="Walter joins the room and gets Power Level 0: he is a regular user")
}}

If Walter fiddled with its homeserver database to alter its local copy of the
room, his change would not propagate: nobody has granted him power level 0: when
the other homeservers would want to update their local copy of the room, they
would reject the change making Walter administrator of the room.

### Impersonating others

Some homeserver implementations like Synapse have a non-standard [Admin API](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/index.html)
and more particularly an [API to make someone the room admin](https://matrix-org.github.io/synapse/latest/admin_api/rooms.html#make-room-admin-api).
This doesn't mean homeserver administrators can't take over rooms as they
please.

When Walter calls the Make Room Admin API, Synapse is going to control Alice's
account to grant Walter the same Power Level as her. Alice is Power Level 100,
she is allowed to promote Walter to the same Power Level. This is valid
according to the Matrix Spec, so when the other homeservers will update their
local copy of the room they will accept the change.

{{ figure(
    img="./walter_escalate_ok.svg",
    caption="Alice's account is used by Synapse to give Walter the same power level")
}}

What if Walter was the homeserver administrator of `ergaster.org` instead? Every
user of `ergaster.org` in this room have the Power Level 0. If Walter called this API,
his homeserver would only be able to control a user with Power Level 0,
and would not be able to promote him.

{{ figure(
    img="./walter_escalate_ko.svg",
    caption="Walter cannot control any account to escalate his power level")
}}
