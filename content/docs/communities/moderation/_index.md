+++
title = "Community Moderation"
template = "docs/community.html"
weight = 100
[extra]
emoji = "🛡️"
tile = "I want to deploy moderation tools"
updated = "2022-10-27T08:00:00Z"
+++

## Power levels

Matrix has a basic system of roles, sometimes also called Power Levels. It is a
number usually going from 0 to 100. Advanced users can decide to use a different
range, but we will not cover it here for the sake of simplicity.

By default, there are three roles in Matrix:

| Power Level | Role          |
|-------------|---------------|
| 0           | User          |
| 50          | Moderator     |
| 100         | Administrator |

With the recommended default:

- **Users** can send messages, media, reactions and redact their own messages in
  a room.
- **Moderators** can also change the room name, address, topic, remove users
  from the room (temporarily or permanently), redact other's messages and send a
  notification to everyone in the room at once using `@room`.
- **Administrators** can also change the history visibility (whether people can
  see messages from before they joined or not), enable encryption in the room,
  remove entire servers from the room, and promote others to Moderator or
  Administrator.

Most people in your community are just going to be regular users. Usually
Moderators are appointed to handle the ad-hoc moderation issues. Note that this
can be an issue if you want to preserve the anonymity of your Trust & Safety
team for their own security. The moderation bot mjolnir brings a good answer to
this.

If you're taking over the community of someone who was very technically versed
into Matrix and strongly opinionated on power levels, the roles may not be the
same. In that case, we recommend you to email
[support@matrix.org](mailto:support@matrix.org) for help.

## Your community's security guard

The tools built into Matrix are good for small group moderation, but they are
limited for now: removing a user (temporarily or permanently) is only possible
at the room level, and banning an entire server from a room is not exposed in
the UI.

Fortunately, a tool exists to step up your moderation game: a security guard
robot you add to all of your public rooms that can enforce your moderation
decisions on all the rooms at once.

And that's really what mjolnir is: a security guard for your rooms. Because of
the decentralised nature of Matrix, you need to add the robot to guard the door
of each of your rooms, and you need to grant it the Administrator role so it can
do its job properly.

### Getting mjolnir

At the moment, to get mjolnir for your community you need either to pay someone
to run mjolnir for you, or to [run it yourself on your own infrastructure](https://github.com/matrix-org/mjolnir/tree/main/docs)
if you have the technical knowledge to do it. We're aware this situation is
suboptimal and are working on a service so people get can mjolnir bots much more
easily.

### Setting it up in your rooms

Once you have performed the technical set-up of mjolnir, you need to:
1. Make sure your moderation staff is in the control room of your community
1. Invite mjolnir the security guard bot in all your rooms
1. Make the mjolnir bot Administrator in all your rooms (so it can enforce
   moderation decisions).

To do so you need to invite the moderation bot in each room. You can do so
either by opening the right panel, opening the members list and clicking on
Invite, or you can type the following message in the message bar at the bottom:

```
/invite @yourMjolnirBot:example.com
```

TODO screenshot of the invite

The bot will join, and you can then promote it Administrator by finding it in
the list of members and changing its role, or you can type the following message
in the message bar at the bottom:

```
/op @yourMjolnirBot:example.com 100
```

TODO screenshot of oping mjolnir

## Getting moderation reports

- You need your own instance while Aristotle isn't merged in the spec and
  deployed in the wild?

## Removing users from your community

- Permanently or not
- Redacting messages en masse
- Banning users, banning servers
- A word on shadow banning

## Working together

- Subscribing to ban lists
- Publishing yours
