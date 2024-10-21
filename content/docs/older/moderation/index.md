+++
title = "Moderation in Matrix"
aliases = ["/docs/guides/moderation"]
extra.updated = "2022-10-18T16:00:00Z"
extra.new_doc = "/docs/communities/moderation/"
+++

## Introduction

Matrix is an open protocol and network for decentralised communication, where
users can participate in public and private chat rooms through servers
(‘homeservers’) and clients of their choice, similar to email.  The goal is to
provide a free and open global network for interoperable e2e-encrypted
communication, without sacrificing usability, and so liberate users from being
trapped in the proprietary communication silos which have become commonplace
today.

A large open communication network (much like email or the web itself) comes
with an interesting set of challenges around moderation. For Matrix, this boils
down to:

* ensuring that moderators of chatrooms have the necessary tools to enforce
  whatever code of conduct they require
* ensuring that server administrators can enforce terms of service on how their
  servers are used
* ensuring that users themselves are empowered to filter out content they do not
  wish to see.

We consider effective content management to be the single biggest remaining risk
to the long-term success of Matrix as a project, and we’re investing as much
time as we can into building out and improving our moderation & reputation
tools.  We would like to focus on this even more, and are currently looking for
dedicated funding to achieve this - please email us at funding-at-matrix.org if
you have the interest and resources to sponsor this work.

## Moderating rooms

### Redactions (aka Removing messages)

The first line of defence when moderating a room is the ability to remove
undesirable content as a moderator.  Matrix implements the concept of
redactions (called ‘remove message’ in Element’s UI), which allows a moderator
to send a ‘redaction event’ to a room which requests all the participating
servers to remove the human-readable information about a given message.  Users
can also redact their own messages from a room.  Redactions may be applied both
to normal room messages as well as to remove the human-visible aspects of state
events (e.g. offensive display names, avatars, etc).

Redactions are a best-effort system - there is no way to force other servers or
clients to actually uphold them, and indeed if a room is bridged to a system
which doesn’t support them (e.g. IRC) then the messages will inevitably remain
visible.

It is common for servers not to immediately delete redacted messages from their
database - this is a deliberate moderation feature, letting server admins
handle redaction-abuse (e.g. users sending and then immediately redacting
obnoxious messages) by checking their databases if needed.

If you're using Element, clicking on a user to bring up more information about
them will show a 'remove recent messages' button (shown below) which allows you
to redact the user's events. It'll only get the events that Element has
downloaded and cached, but can help when a room is being spammed by a bad
actor.

![Element-remove-recent-btn](moderation7.png)

### Managing abusive display names, avatars etc

As well as being able to redact abusive content, moderators can also
override ‘state events’ such as room names, topics, etc.  This is generally
just a matter of using Room Settings to update the necessary data.  In future
we will also support the special case of overriding profile changes - however,
overriding another user’s profile is considered bad etiquette (even as a
moderator) - it is better to redact.

### Power levels

The next line of defence when moderating a room is the concept of ‘power
levels’. Every user in a room has a power level - a number generally between 0
and 100.  The higher the number the more power the user has that room.  By
default, the creator of the room gets the highest power level of 100
(typically called ‘Admin’), and newly joined users get a power level of 0.  You
can change the power level of less powerful users than yourself - for instance,
an Admin (with power 100) could promote a normal user to a power level of 50
(typically called ‘Moderator’).  You cannot give users a higher power level
than your own.  You can demote yourself, but be aware that this is irreversible
unless there are other users in the room with high enough power to subsequently
re-promote you.

In Element, Admins are shown in the membership list with a golden shield, and
Moderators are shown with a silver shield.  Other clients use similar
metaphors.

![moderation1](moderation1.png)
![moderation2](moderation2.png)

To change the power level of a given user in Element, you can use the dropdown
in their user info panel, having selected them from the membership list or
timeline.  Alternatively you can change their level directly from the message
composer by typing `/op @username:domain 50` or similar.

Power levels are used to define who has permission to do what actions in a room.
By default, the power levels for a public chatroom are as shown below:

![moderation3](moderation3.png)

Users with sufficient power to change settings (i.e. Moderator, by default) can
edit the power level configuration for a given room in Element via Room
Settings using this interface.

For instance, if you wanted to stop normal users from being able to talk in a
room, a moderator or admin could change the “Send messages” power level for
that room from 0 to 50.  This would mean that only moderators and higher can
speak.  Alternatively, if you wanted to mute a particular user in a room
without changing any of the settings, you might set them to a negative power
level, so they didn’t even meet the “Send messages” threshold of 0.

For the full spec of power levels, please see:
[https://matrix.org/docs/spec/client_server/latest.html#m-room-power-levels](https://matrix.org/docs/spec/client_server/latest.html#m-room-power-levels).
If you’re wondering where the term comes from, you should [watch more anime](https://knowyourmeme.com/memes/power-level)...

### Kicking and banning users

The next line of defence in policing your rooms is the ability to remove users.
By default, moderators with power level 50 or higher have permission to remove
users with lower power from rooms.  You can either kick or ban, specifying an
optional reason which should be visible in the room’s timeline:

![moderation4](moderation4.png)

This can be done via the Kick or Ban buttons from the user info panel, or by
typing `/kick @user:domain.com <reason goes here>` or `/ban @user:domain.com
<reason goes here>` in the message composer.

The act of kicking a user temporarily removes them from the room.  If the room
is publicly joinable, the user can immediately rejoin it.  If the room is
invite-only, the user will need to be re-invited to join.

The act of banning a user stops them from joining a room until the ban is
removed.  Banning automatically kicks the user from the room (unlike IRC).

Unlike other systems, bans are enforced purely on the basis of a user’s matrix
ID rather than by IP address or other parameters.  This is a deliberate choice,
for several reasons:

* We cannot reliably determine IP addresses of users on other servers, given
  other servers cannot be trusted to report such information accurately.
* We want to protect users’ privacy, and do not want to expose IP addresses to
  room admins/mods elsewhere in Matrix, even if we could do so reliably.
* Matrix IDs are permanent long-lived IDs, similar to an email address, and
  cannot be spoofed (unlike IRC nicks or similar).  If a user is banned, they
  have to register a whole new account to circumvent it, typically passing
  through a CAPTCHA, generally mitigating bot flooding attacks.
* Typical Matrix users have many clients on many different IPs, to the point
  that IP bans would be ineffectual at best.

We don’t currently support banning based on patterns of matrix IDs.  This is
because we want to keep the logic for enforcing bans to be as simple and
bug-free as possible (as it is on the critical path of the room state
resolution algorithm), and because in general matrix IDs do not follow any
specific pattern.  This may be reviewed in future.

There isn’t currently a way of bulk-banning or bulk-kicking users from within
Element, although one can use a simple script to do so. _[TODO: release our
bulk-banning script.]_

### Banning servers from rooms (Server ACLs)

The next line of defense in moderating a room is stopping unwanted servers from
participating.  This is done by setting a ‘server ACL’ (access control list) on
a room.  It’s important to understand that despite the name, server ACLs block
a server from participating in a **room** - rather than blocking them from
interacting in general with a server

The typical reason to exclude a server from a room is if it is a source of
malicious traffic - e.g. if it does not enforce a CAPTCHA on account
registration, thus easily allowing bots or users to register and circumvent
room bans or flood traffic, or if the server is behaving in a buggy or
malicious manner (e.g. being a source of bots or spam itself).  One might also
want to ban servers whose terms of service are incompatible with the code of
conduct of your rooms from participating in your rooms.  Finally, server ACLs
only work if all the servers in the room uphold the ACL, otherwise old or buggy
servers will leak traffic on behalf of the ACLed server into the room.
Therefore if you use server ACLs in a room, you have to also ban any servers
which empirically do not uphold the ACL.  _[TODO: release our server-ACL
enforcing scripts]_

Setting server ACLs on a room is a relative rare operation, and Element does not
currently provide a user interface for doing so.  Instead, these can be set
either by script or by manually creating a server ACL state event via
Element/Web’s developer tools UI.  You must be at least a moderator(by default)
to set server ACLs.  To set via devtools, type `/devtools` at the message
composer in the room in question, and create or edit the room’s
`m.room.server_acl` state event.  (Click on the red ‘message event’ button to
toggle to state event mode).  To ban servers named evil.com and \*.evil.com from
participating in the room, you would enter:

![moderation5](moderation5.png)

If enforcing server ACLs on a room, it is wise to prevent servers whose names
are numeric IP addresses from participating in the room, as well as preventing
all subdomains of the problematic server from participating.  This ensures that
a malicious admin cannot create a new server on a numeric IP or a subdomain in
order to circumvent the ban, and will instead have to source an alternative top
level domain.

Server ACLs can also be used to restrict the set of servers which are allowed to
participate in a room (e.g. if a sensitive conversation must be restricted from
ever leaving a given set of servers, as might happen if someone accidentally
invited a remote user to it).

For further detailed info about server ACLs, see
[https://matrix.org/docs/spec/client_server/latest.html#server-access-control-lists-acls-for-rooms](https://matrix.org/docs/spec/client_server/latest.html#server-access-control-lists-acls-for-rooms)

### A note on state resets

In room version 1, a bug existed which caused room state(e.g. membership, power
levels, bans/kick data) to intermittently be reset to a historical value due to
a bad merge conflict resolution - a so-called
'state reset', or the 'hotel california bug'. This was improved in room version
2 onwards and room state should no longer diverge. However, many old rooms
still use the original buggy v1 algorithm. It is possible to upgrade the room
version in Element via the undocumented `/upgraderoom 6` command - but please
note there are several[UX bugs](https://github.com/vector-im/element-web/labels/A-Room-Upgrades) which make
this process a bit rough sometimes.

### Bridged rooms

Moderating rooms which are bridged to other chat systems is a somewhat special
case, as it’s hard to accurately bridge all possible moderation semantics into
Matrix, and different bridges have different levels of sophistication.  As a
general rule, bans are generally best applied on the native platform where the
target exists.  For instance: when bridging a Matrix room with IRC, no effort
is made to synchronise bans between the two platforms, given the entirely
different banning criteria.

If an IRC user is kicked from the Matrix side of the bridge, then if the kicking
user is a chanop on the IRC side, they will be kicked there also - and vice
versa.  However, if the user is then banned on the Matrix side, it will just
stop users with that IRC username from participating in the Matrix view of the
room, and does not result in a change of chanmode +b on the IRC side. However,
if a Matrix user is banned from a room on the IRC side, then the bridge will
stop the user from being able to re-join the Matrix room.

### Policy servers

In the early days of Matrix we proposed the concept of ‘active application
servers’, aka ‘policy servers’, which could be used for imposing arbitrary
policy decisions on a given room beyond the semantics given by power levels.
This would allow a central point of control to apply whatever logic it liked to
what messages may be sent within a room.  In practice, this idea has not
progressed beyond the idea phase, especially as it undermines Matrix’s core
principles of decentralisation, and does not play well with E2E encryption.
However, such a system could be used in future if more exotic room moderation
semantics were required.

### Outstanding issues

* Support for bulk redactions (looping over individual redactions is a viable workaround however)
* Ability for room moderators to delete content from the media repository when redacting the event which refers to it.
  (this can be improved in future)
* UI for setting server ACLs ([https://github.com/vector-im/Element-web/issues/7084](https://github.com/vector-im/Element-web/issues/7084))

### Moderation tooling

Larger communities often have many rooms which need moderation, and generally
have a single set of rules or Code of Conduct for members to follow. This also
means that a ban in one room is usually applied in all of the community's
rooms. [Mjolnir](https://github.com/matrix-org/mjolnir) is a set of tools to
help make this process easier for community moderators by subscribing to
[ban lists (MSC2313)](https://github.com/matrix-org/matrix-doc/pull/2313) and
applying the rules across the resources it is protecting. Currently the project
is capable of protecting individual rooms through the Mjolnir bot and a whole
homeserver through its Synapse antispam module.

## Enforcing server terms of use

The previous sections cover off the tools a room admin has available to enforce
the code of conduct for a given room.  An entirely separate problem is
empowering server admins to control how users use their server - particularly
to comply with any legal or policy requirements their server might have.

### Consenting to Terms and Conditions

Firstly, as a server administrator, you need to ensure your users know the terms
of use they are bound by when using the server.  The server should provide
terms of use which users must click-through on registration.  This is
configured in Synapse via the `user_content` config options - see
<https://github.com/matrix-org/synapse/blob/master/docs/consent_tracking.md>
for details.

We publish the policy documents for use of the Matrix.org server at
<https://github.com/vector-im/policies/tree/master/docs/matrix-org> - please
feel free to use these as the basis for your own server’s terms of use if
needed.

### Removing users, rooms and content

Currently, administration of matrix servers is done by implementation-specific
API, although we are working on providing a web GUI for administration as well
as providing a standardised admin API as part of the Matrix spec.  The
documentation of the API exposed by Synapse is:
<https://github.com/matrix-org/synapse/tree/master/docs/admin_api>.

The most important admin features from a moderation perspective are deactivating
abusive users from your server, removing abusive rooms, and removing abusive
content.

Deactivating users is done by calling the /deactivate API - see
<https://github.com/matrix-org/synapse/blob/master/docs/admin_api/user_admin_api.rst#deactivate-account>
for details. An example is:

```bash
curl -X POST -H "Authorization: Bearer $token" "https://matrix.org/_synapse/admin/v1/deactivate/$user" --data '{}'
```

If you're using Element, when you go to view more information about a particular
user there will be a 'deactivate user' button (shown below) which does this for
you. Note that only users on your homeserver can be deactivated, provided you
have the admin permissions to do so.

![Element-deactivate-btn](moderation8.png)

Removing abusive rooms is done by calling the /shutdown_room API, e.g:

<!-- markdownlint-disable line-length -->
```bash
curl 'https://matrix.org/_synapse/admin/v1/shutdown_room/!roomid:matrix.org' \
-H "Authorization: Bearer $token" -XPOST \
-d'{"new_room_user_id": "@abuse:matrix.org", "message": "This room has been removed from the matrix.org homeserver due to violating the terms of use.", "room_name": "Room unavailable"}'
```
<!-- markdownlint-enable line-length -->

This removes all local users from the room, routing them into a new room
(called ‘Room unavailable’ in this example), repoints any local aliases to the
new room, and blacklists the server from participating in the original room
going forwards. This is particularly useful if the room in question is spamming
invites at your users: blocking the room will stop the invites from getting
through, and allow your users to reject the invite they had prior.

Removing abusive content en masse from a room is done by calling
the /admin/quarantine_media API, e.g.

```bash
curl 'https://matrix.org/_synapse/admin/v1/quarantine_media/!room_id:matrix.org' -H "Authorization: Bearer $token" -XPOST
```

This flags all content in the room as quarantined in the media repository and
stops it being served to other clients or servers until the server admin can
investigate and delete.

### Banning clients by IP

While we deliberately do not expose client IP addresses to room admins, it is of
course critical for server admins to be able to restrict access to their
servers based on IP to handle abuse.

Synapse exposes the history of a given user’s IP to the server admin via
the /admin/whois API, for instance:

<!-- markdownlint-disable line-length -->
```bash
curl 'https://matrix.org/_synapse/admin/v1/whois/@test:matrix.org' -H "Authorization: Bearer $token" | jq .
{
  "user_id": "@test:matrix.org",
  "devices": {
    "": {
      "sessions": [
        {
          "connections": [
            {
              "ip": "192.168.0.1",
              "last_seen": 1413627439458,
              "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/600.1.17 (KHTML, like Gecko) Version/7.1 Safari/537.85.10"
            },
            ...
          ]
        }
      ]
    }
  }
}
```
<!-- markdownlint-enable line-length -->

See
[https://github.com/matrix-org/synapse/blob/master/docs/admin_api/user_admin_api.rst#query-account](https://github.com/matrix-org/synapse/blob/master/docs/admin_api/user_admin_api.rst#query-account)
for full details of this API.

Synapse does not currently provide tools to block connections by IP - instead we
suggest this is done in the load balancer or firewall in order to drop the
connection as early as possible.

### Banning servers

Synapse supports a module-like system which can be used to block servers from
doing certain actions, such as sending invites to your users.
[t2bot/synapse-simple-antispam](https://github.com/t2bot/synapse-simple-antispam) is one example of how this
works - see the code for a bit more information on what is possible. Although
this won't prevent servers from interacting with your server, it can help with
reducing the amount of spam/malicious content.

“Defederating” your server from another server is currently done on a room by
room basis - either using server ACLs if you have control of the room in
question, or by using the /shutdown_room API if you do not.

In future, this may be refined to let servers automatically
implement /shutdown_room semantics on any room which matches a given pattern
(e.g. whose room admins are on a given server).

### Moderating the room directory

Each Matrix server maintains a publicly viewable directory of rooms.  By
default, any user can publish rooms to the directory, which can be an abuse
vector.

The server admin can limit which users are allowed to publish rooms to the
public room directory via the `room_list_publication_rules` config option in
Synapse.

The server admin can moderate the directory by delisting rooms by calling
the `/directory/list/room API` with `visibility: private` (
<https://matrix.org/docs/spec/client_server/r0.4.0.html#put-matrix-client-r0-directory-list-room-roomid>).

### Moderating room aliases

Rooms in Matrix are joined via an alias which resides on a given server -
e.g. #matrix:matrix.org.  It is common for a room to have multiple aliases,
which in turn may be spread across different servers.  For
instance, #matrix:matrix.org is also #matrixhq:tchncs.de and many others.

By default, any user can create room aliases, which can be an abuse vector -
particularly given the risk of alias squatting, or creating publishing abusive
aliases to point at existing rooms.

The server admin can limit which users are allowed to create room aliases via
the `alias_creation_rules` config option in Synapse.

The server admin can moderate the aliases that exist on their server by calling
the /directory/room API with DELETE: (
<https://matrix.org/docs/spec/client_server/r0.4.0.html#delete-matrix-client-r0-directory-room-roomalias>).

Element/Web also exposes the ability to delete a room alias from the Room
Directory view as an easter egg for server administrators - shift-clicking on
the entry in the Room Directory will call the above API to remove the alias and
the room from the directory.

<!-- markdownlint-disable-next-line no-duplicate-heading -->
### Outstanding issues

* In addition to the existing admin API, it would be good to have a server admin
  GUI for the various server admin functions above.
* Ability to block a server from federating to your server (as rooms are
  replicated over _all_ participating servers and do not have a single owner,
  the criteria you would use to block rooms “from a server” en masse is not
  well defined. One could be found if needed however.)

## Handling unwanted content as a user

No matter how great your room moderators and server admins happen to be, it is
inevitable that in a massive open network like Matrix there will be content
that you as a user do not wish to see - whether it’s yet to be moderated, or
because it’s irrelevant, or you personally find it objectionable, etc.
Moderators and server admins often depend on support from the wider community
to identify issues that need to be addressed.

### Reporting bad content

We provide two mechanisms today to let users report abusive content to their
server admin (i.e. content which is against the terms of use of their server).
In Element, this is the “Report Content” menu button, which calls the /report
API (
<https://matrix.org/docs/spec/client_server/latest.html#module-report-content>)
on the server to flag the message in question.

Alternatively, server admins should advertise an abuse email address for
gathering reports of abusive content (e.g. abuse-at-matrix.org is Matrix.org’s
abuse contact address).

### Blocking users

Another vital tool is the ability to block users from contacting you.  Matrix
supports this through the ‘ignore’ feature
(<https://matrix.org/docs/spec/client_server/latest.html#ignoring-users>),
which is available in the user info panel in Element/Web and equivalent on
Element/Mobile.

### Filtering the room directory

Currently the room directory for a large server can contain a massive number of
entirely unrelated rooms.  A common request is to provide tools to let the user
filter this list to only rooms they are interested in.  We are currently
looking into ways of doing this - options on the table include:

* Removing the per-server room directories in favour of per-community room
  directories, and leaving the problem of discovering communities as separate
  to Matrix
* Letting users tag rooms when publishing them in the community, providing a
  blunt filtering mechanism (e.g. to filter out rooms by default which have
  explicitly been tagged as NSFW)
* Using decentralised reputation data to let the user decide which view of the
  room directory to see (e.g. “show me rooms which folks +matrix:matrix.org
  have upvoted”)

### Using reactions to filter content

In the medium/long term, we are hoping to rely more extensively on reputation
data gathered from emoji reactions to help users curate their content filters.
It’s critical to understand that this is similar but different to Reddit or
HackerNews style upvoting/downvoting - in that in Matrix you would be
maintaining and curating your _own_ personal filtering criteria, rather than
being obligated to use a single official centralised filter calculated by
Reddit/HN/etc.

We are currently in the process of implementing emoji reactions in Matrix, and
the current UX proposal looks roughly like this:

![moderation6](moderation6.png)

Critically, this provides upvote/downvote semantics on a given message on the
axes both of whether you agree with the content, and whether you like it
(as well as supporting specifying freeform emoji).

We believe this will provide a way to gather contextual reputation data within a
given chat room - providing a basic web-of-trust of which users are aligned
with one another in a given room, letting reputation data be(optionally) shared
through the transitive web of trust.  Users could choose to publish their own
reputation data (i.e. what content they have upvoted/downvoted) to help others
seed their content filters, and then these published reputation could be used
to label communities which emerge based within the web-of-trust.

For instance, if Alice publishes her reputation data (which happens to be the
result of her curating useful content in Rust development rooms) and Bob
publishes his reputation data (which happens to be the result of him curating
his NSFW room collection), then Charlie as a new user might choose to bootstrap
his own filters by subscribing to +100% of Alice’s reputation and -100% of
Bob’s.  His room directory results (and possibly other content in future, if
this scheme works) would then be biased towards the preferences he’s specified.
Alice and Bob can end up being figureheads of their respective communities, and
Charlie can continue to refine his filtering choices by placing his own
upvotes/downvotes as well as changing the blend of reputation data he
subscribes from elsewhere, as his preferences evolve.  The Matrix client can
also help Charlie visualise the behaviour of his filters as he uses the app -
e.g. “90% of people have downvoted this room” or “Your filter is hiding 98% of
the room directory. Do you want to broaden your horizons?” etc.

This model should also be robust against voting rings and sybil attacks, as
sybils (be they human or bot) will naturally form a clique, which should then
be identifiable as a community which the user can filter out.  The user could
filter it by explicitly downvoting themselves, or by subscribing to a
reputation source which has already downvoted the sybils, or by learning their
reputation via their web-of-trust (i.e. if your friends and chosen reputation
sources have already downvoted sufficient sybils, then your filters would
reflect the downvotes automatically).

Similarly, moderators for a given room could choose to publish their official
reputation data in order to quantify the code-of-conduct for their room -
perhaps deriving it from an existing reputation source (e.g. the matrix core
team could publish one for the rooms they moderate), or simply by seeding it
based on the moderators’ upvotes/downvotes within that room or community.

Thus users could choose which content filters to adopt, and visualise how they
are applied, and curate whatever view of Matrix they desire.  Obviously this is
very much an area of active research, but we are hoping to find financial
support to experiment with implementing this.

After all, the challenge of filtering objectionable/misleading content on the
internet is not specific to Matrix, nor even to decentralised systems, and we
hope that this work will be directly applicable elsewhere.  It is also becoming
more of a legal concern, with certain governments mandating content filtering
rules to messaging providers - meaning that servers running in affected
territories may be legally obligated to provide their users with content
filtering tools of this nature.

See [#matrix-reputation:matrix.org](https://matrix.to/#/#matrix-reputation:matrix.org) and
[https://docs.google.com/document/d/1rijGLs9-RJ9Mz2Yk5wWycMbErrCDK1VJkACdUPMN0-M/](https://docs.google.com/document/d/1rijGLs9-RJ9Mz2Yk5wWycMbErrCDK1VJkACdUPMN0-M/)
for more details on this.

<!-- markdownlint-disable-next-line no-duplicate-heading -->
### Outstanding issues

* Ability for users to apply their own personal filters to content in Matrix
  does not yet exist, whether by curating their own preferences or subscribing
  to a blend of someone else’s.

## Conclusion

Matrix provides a comprehensive set of moderation tools today, with scope for
further refinements in future as detailed in the ‘outstanding issues’ sections
above (as of April 2019). As the Matrix.org team, In practice we use the
features above to relatively successfully admin one of the largest servers on
the network (matrix.org itself, with ~70K concurrent users), and to moderate
one of the larger communities on the network ([+matrix:matrix.org](https://matrix.to/#/+matrix:matrix.org);
~30 rooms with over 10K users present).
