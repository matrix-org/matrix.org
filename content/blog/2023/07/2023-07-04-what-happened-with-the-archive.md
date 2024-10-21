+++
date = "2023-07-04T14:24:00Z"
title = "What happened with archive.matrix.org"

[taxonomies]
author = ["Matthew Hodgson", "Thib"]
category = ["General"]
+++

We launched the Matrix Public Archive [publicly on June 2nd, 2023](https://www.youtube.com/watch?v=ULbvBIwiGEI).
We decided to take it down on Sunday, June 25th out of precaution after a
member of OFTC staff warned us that the archive made the content of two OFTC IRC
channels bridged to Matrix available on the Internet.

After investigating the issue, we determined that the Matrix Public Archive's
behaviour was expected for these channels, given an IRC chanop had
**explicitly** configured the Matrix side of the rooms to be world-readable.

Let's talk about how room visibility works in vanilla Matrix, how it works with
bridges, and what are the next steps.

<!-- more -->

## TL;DR

- archive.matrix.org does **not** expose history for Matrix rooms (or channels
  bridged from IRC) unless a room admin (aka IRC chanop) has explicitly
  configured that room to be world-readable.
- There was confusion over this because the UI failed to explain _why_ a given
  room is viewable (or not), and folks didn't realise that some rooms had
  explicitly been configured as world-readable in the dim and distant past.
- archive.matrix.org is **not** an indexer or an archive - it's just a read-only
  matrix client. It doesn't store any messages. We're going to find a better
  name for it.
- The only reason the @archive:matrix.org bot joins rooms when someone views
  them via archive.matrix.org is because the Peek API is deprecated - and rather
  than implementing a deprecated API to view the room without joining, the
  service explicitly joins the room instead. Once peeking (e.g. [MSC2753](https://github.com/matrix-org/matrix-spec-proposals/pull/2753))
  lands, then the bot won't be needed any more.

## Room Visibility in Matrix

Matrix rooms have some flexibility regarding whether new members can see the
history of a room or not. People interested in technical details can check the
[Room History Visibility in the specification](https://spec.matrix.org/v1.2/client-server-api/#room-history-visibility).
The history visibility possibilities are the following, by increasing order of
openness (least open first):

- `joined`: people need to join the room to see the history, and will only see
  the messages sent after they joined. This behaviour is similar to the
  experience of IRC on a bouncer, and is how all IRC channels are bridged to
  Matrix by default
- `invited`: people need to join the room to see the history, and will only see
  the messages after they were invited.
- `shared`: people need to join the room to see the history, but will then see
  the history up to when this visibility setting was set (the change is not
  retroactive).
- `world_readable`: _everyone can see the room history_ without even joining the
  room.

Element is [far from being the only Matrix client](https://matrix.org/ecosystem/clients/)
out there but is commonly used in the Matrix community. The visibility settings
described above are translated as follows in Element, by decreasing order of
openness:

![A screenshot of Element history visibility settings](/blog/img/element-visibility-settings.png)

An example of a world-readable room (with history visibility set to "Anyone" in
Element) is [Matrix HQ](https://matrix.to/#/#matrix:matrix.org). When trying to
reach it via [matrix.to](https://matrix.to), you can pick Element in a browser,
and it will show you a preview of the conversation.

![A screenshot of matrix.to asking which client to use](/blog/img/2-continue-in-browser.png)

![A screenshot of matrix.to showing a preview of Matrix HQ](/blog/img/3-room-history.png)

What is not necessarily obvious here is that Element Web creates a guest user
_who never joins the room_ in order to peek into it. Indeed, the guest is only
created to be able to use Element, and then the guest is looking at a preview of
the room (as defined in the [Room Previews section of the spec](https://spec.matrix.org/v1.7/client-server-api/#room-previews)):
they're able to read the history without ever joining. All of this is defined
for each room, and is vanilla Matrix without any involvement of the Matrix
Public Archive.

## Room Visibility and IRC Bridging

It is important to note that the Libera Chat and OFTC bridges hosted by the
Matrix.org Foundation (and any other bridged powered by a vanilla [matrix-appservice-irc](https://github.com/matrix-org/matrix-appservice-irc)),
mimic the IRC behaviour by default when creating the rooms: their visibility is
set to `joined`, a.k.a. "People need to join the room to see history and will
only see new messages since they joined". In other words, by default, **IRC
channel history is only ever visible to users currently in the channel - it is
never shared with other users.**

For the sake of completeness, let's cover the two types of rooms that exist when
bridging a room to IRC, and the implications on history visibility control.

### Portalled rooms

When someone tries to join #example:libera.chat, the bridge is going to create
this room and automatically bridge it to the #example channel on Libera Chat.
The Bridge Bot user (@appservice:libera.chat) is the owner of the room and has
the maximum power level (PL100).

Nobody on the Matrix side has privileges when the room is created. No Matrix
user can change the visibility of this room. If someone from the IRC side
promotes the IRC representation of a Matrix user as op in the channel, the
bridge bot will promote said user to the power level 50 on the Matrix side. This
Matrix user will be able to change the visibility of the room on the Matrix
side, and opt-in for a world-readable visibility.

### Plumbed rooms

When someone takes an existing Matrix room and tries to manually plug it (or
plumb it) to an IRC channel, they can do so using a widget for interactive
configuration. The Matrix user needs to specify which is the IRC network and
channel they want to bridge to, and the nick of the IRC op who can approve that
request.

!["A screenshot of a widget offering to plumb a Matrix room to IRC"](/blog/img/4-irc-link-widget.png)

Plumbing a room in this fashion requires someone with sufficient privileges in
the IRC channel to approve the request. In plumbed rooms, the Matrix user who
made the plumbing request has the maximum power level in this room (usually
PL100). They are in total control of the history visibility, which can be
world-readable from the start. It's worth reiterating that such rooms can only
be linked to IRC when an IRC chanop approves the plumbing request.

## The Matrix Public Archive is not an archive

In retrospect, the Matrix Public Archive is a terrible name for this project -
all the webapp does is to act as a read-only Matrix client for world-readable
content. It doesn't archive anything; it doesn't store anything; it just pulls
data from world-readable rooms on the Matrix homeserver, and exposes it to the
web.

The Matrix Public Archive also depends on a bot joining the room to assess
whether the room is world-readable or not, purely because the original peeking
APIs in Matrix are deprecated, and the new ones ([MSC2753](https://github.com/matrix-org/matrix-spec-proposals/pull/2753))
haven't landed yet. In the case of the Matrix Public Archive hosted by the
Matrix.org Foundation, that bot is `@archive:matrix.org`.  However, the bot user
is not reading any information which wasn't already publicly visible without
joining the room - but we can see why having a random bot join is scary,
especially when it's called ‘archive', and it's not actually archiving anything.

### Wait, my room's world readable?

The most obvious issue is that some people were surprised that their room was
world readable in the first place. Some rooms have a long history themselves,
and it's entirely possible for some admins to have inherited a room someone else
created, made public, and never revisited the settings. It then came as a
surprise for them that their room history was in the Matrix Public Archive at
all.

When matrix.to was introduced, some room administrators also set up their rooms
to `world_readable` so potential joiners could peek at what was happening in the
room. Earlier in Matrix history, guest accounts were popular in some communities
and people also made their room `world_readable` to onboard guests more easily.
All of this leads us to the same two issues today.

First, it should be made clearer in the UI of archive.matrix.org on _why_ a room
is world-readable (i.e. "A room admin (chanop) called Bob set the room to be
world-readable on Jan 2, 2018"). And moreover, Matrix clients in general could
do a better job of calling out when a room's history can be read by everyone,
including people who didn't join. Second, the room settings may not make it
obvious enough that sharing the history with "anyone" literally means "anyone"
and not "anyone who has joined".

### A note on shared history visibility

Having a public room doesn't necessarily mean you want everyone to be able to
read the whole history. Initially, the Matrix Public Archive also made rooms
with `shared` history visibility readable via the archive.matrix.org interface
(acting as a read-only client, effectively) but disallowed search engines to
index that content. A `shared` room is a room where, having joined, you can see
the whole history of the room.

In retrospect, this was a thinko - `shared` history doesn't mean you expect
anonymous users to be able to read history (otherwise you'd have set it
`world_readable`), and we've subsequently [merged a fix](https://github.com/matrix-org/matrix-public-archive/pull/239)
kindly provided by tulir to address this.

## Next up

By default, portalled IRC rooms were already set with `joined` history
visibility which prevented them from being in the archive at all. We have
additionally prevented the Matrix.org hosted public archive from exposing the
content of portalled rooms that are bridged to Libera Chat since June 7, and
rooms bridged to OFTC since June 27, regardless of their history visibility
setting.

Looking at [Libera Chat's Public logging policy](https://libera.chat/policies/#public-logging)
there might be a way to make the bridge change the topic to be explicit about
the channel being publicly logged when the Matrix room is `world_readable`. This
feature doesn't exist yet, so we would rather prevent the archive from logging
any room bridged to their network.

We're investigating:

- Making it clear in the archive.matrix.org UI why a given room is world
  readable (and thus showing up in the interface)
- Renaming the archive (as Matrix Viewer?)
- Avoiding bots ever joining rooms on behalf of the system; `world_readable`
  privileges should mean by definition that nothing needs to join the room.
- MSC2291 to act like [web's Robots Exclusion Protocol](https://en.wikipedia.org/wiki/Robots.txt),
  at the room level

## A word on GDPR

We understand that there have been some concerns around the GDPR compliance of
the Matrix Public Archive. As always, we hear you and welcome your feedback.

The first step we will take is actually rename the project, to clarify what its
technical purpose is. ‘Archiving' has very specific connotations within the
GDPR, mainly governed by art. 89. No further data is collected and archived
outside of your normal use of a Matrix homeserver, but there is indeed some
additional processing by further disseminating the data. We are making this
clearer in the matrix.org homeserver Privacy Notice.

This article requires measures around data minimisation to be taken when
archiving data in the public interest. We would argue that processing this data
only in a cache state, would meet this principle of minimisation. In fact,
removing data from the ‘archive' is as simple as [deleting it from the room](https://github.com/matrix-org/matrix-public-archive/blob/main/docs/faq.md).

If you have feedback on the legal aspects of this project, please send it over
to [dpo@matrix.org](mailto:dpo@matrix.org).

## Next steps

Once we've renamed the project and clarified the visibility settings, we'll be
turning archive.matrix.org back on. If you have any further feedback, please
talk to us at [#matrix-public-archive:matrix.org](https://matrix.to/#/#matrix-public-archive:matrix.org).
