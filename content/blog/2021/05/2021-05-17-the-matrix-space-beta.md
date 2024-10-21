+++
title = "The Matrix Space Beta!"
date = "2021-05-17T17:50:17Z"
updated = "2021-05-17T17:35:09Z"
path = "/blog/2021/05/17/the-matrix-space-beta"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech", "General"]

[extra]
image = "https://matrix.org/blog/img/2021-05-17-space.jpg"
+++

Hi all,

As many know, over the years we've experimented with how to let users locate
and curate sets of users and rooms in Matrix. [Back in Nov
2017](https://medium.com/@RiotChat/communities-aka-groups-are-here-announcing-riot-web-0-13-riot-ios-0-6-and-riot-android-0-7-4-933cb193a28e)
we added 'groups' (aka 'communities') as a custom mechanism for this -
introducing identifiers beginning with a + symbol to represent sets of rooms
and users, like [+matrix:matrix.org](https://matrix.to/#/+matrix:matrix.org).

However, it rapidly became obvious that Communities had some major
shortcomings.  They ended up being an extensive and entirely new API surface
(designed around letting you dynamically bridge the membership of a group
through to a single source of truth like LDAP) - while in practice groups
have enormous overlap with rooms: managing membership, inviting by email,
access control, power levels, names, topics, avatars, etc.  Meanwhile the
custom groups API re-invented the wheel for things like pushing updates
to the client (causing a whole suite of
[problems](https://github.com/vector-im/element-web/issues/5235)).  So clients
and servers alike ended up reimplementing large chunks of similar
functionality for both rooms and groups.

And so almost before Communities were born, we started thinking about whether
it would make more sense to model them as a special type of room, rather than
being their own custom primitive.
[MSC1215](https://github.com/matrix-org/matrix-doc/issues/1215) had the first
thoughts on this in 2017, and then a formal proposal emerged at
[MSC1772](https://github.com/matrix-org/matrix-doc/pull/1772) in Jan 2019. We
started working on this in earnest at the end of 2020, and christened the new
way of handling groups of rooms and users as... Spaces!

Spaces work as follows:

* You can designate specific rooms as 'spaces', which contain other rooms.
* You can have a nested hierarchy of spaces.
* You can rapidly navigate around that hierarchy using the new 'space summary'
   (aka space-nav) API - [MSC2946](https://github.com/matrix-org/matrix-doc/blob/kegan/spaces-summary/proposals/2946-spaces-summary.md).
* Spaces can be shared with other people publicly, or invite-only, or private
   for your own curation purposes.
* Rooms can appear in multiple places in the hierarchy.
* You can have 'secret' spaces where you group your own personal rooms and
   spaces into an existing hierarchy.

Today, we're ridiculously excited to be launching Space support as a beta in
matrix-react-sdk and matrix-android-sdk2 (and thus Element Web/Desktop and
Element Android) and Synapse
[1.34.0](https://matrix.org/blog/2021/05/17/synapse-1-34-0-released) - so head
over to your nearest Element, make sure it's connected to the latest Synapse
(and that Synapse has Spaces enabled in its config) and find some Space to
explore! [#community:matrix.org](https://matrix.to/#/#community:matrix.org)
might be a good start :)

The beta today gives us the bare essentials: and we haven't yet finished
space-based access controls such as setting powerlevels in rooms based on
space membership
([MSC2962](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2962/proposals/2962-spaces-access-control.md))
or limiting who can join a room based on their space membership
([MSC3083](https://github.com/matrix-org/matrix-doc/blob/clokep/restricted-rooms/proposals/3083-restricted-rooms.md)) -
but these will be coming asap.  We also need to figure out how to implement
Flair on top of Spaces rather than Communities.

This is also a bit of a turning point in Matrix's architecture: we are now
using rooms more and more as a generic way of modelling new features in
Matrix.  For instance, rooms could be used as a structured way of storing
files ([MSC3089](https://github.com/matrix-org/matrix-doc/pull/3089));
Reputation data
([MSC2313](https://github.com/matrix-org/matrix-doc/pull/2313)) is stored in
rooms; Threads can be stored in rooms
([MSC2836](https://github.com/matrix-org/matrix-doc/pull/2836)); Extensible
Profiles are proposed as rooms too
([MSC1769](https://github.com/matrix-org/matrix-doc/pull/1769)).  As such,
this pushes us towards ensuring rooms are as lightweight as possible in Matrix -
and that things like sync and changing profile scale independently of the
number of rooms you're in.  Spaces effectively gives us a way of creating a
global decentralised filesystem hierarchy on top of Matrix - grouping the
existing rooms of all flavours into an epic multiplayer tree of realtime data.
It's like USENET had a baby with the Web!

For lots more info from the Element perspective, head over to the [Element
blog](https://element.io/blog/p/4ff44807-fe9a-4363-8521-9eab7efd4365/).
Finally, the point of the beta is to gather feedback and fix bugs - so please
go wild in Element reporting your first impressions and help us make Spaces as
awesome as they deserve to be!

Thanks for flying Matrix into Space;

Matthew & the whole Spaces (and Matrix) team.
