+++
title = "Synapse 1.76 released"
path = "/blog/2023/01/31/synapse-1-76-released"

[taxonomies]
author = ["H. Shay"]
category = ["Releases"]
+++

Greetings Matrix fans! We've published Synapse [version 1.76](https://github.com/matrix-org/synapse/releases/tag/v1.76.0)
as the new stable release this week. Synapse admins are encouraged to upgrade
to it at their convenience. Please take a look at the [upgrade notes](https://matrix-org.github.io/synapse/v1.76/upgrade.html#upgrading-to-v1760)
for any important information about upgrading.

<!-- more -->

## Announcements

The big news is that faster joins for all has arrived! When joining a room for the first time,
Synapse 1.76.0 will request a partial join from the other server by default. Previously, server admins
had to opt-in to this using an experimental config flag.

Server admins can opt out of this feature for the time being by setting

```yaml
experimental:
    faster_joins: false
```

in their server config.

For everyone else, after a faster join Synapse considers that room "partially joined". In this state, you should be able to

- read incoming messages (on clients which support lazy-loaded members in /sync);
- see incoming state changes, e.g. room topic changes; and
- send messages, if the room is unencrypted.

Synapse has to spend more effort to complete the join in the background. Once this finishes, you will be able to

- send messages, if the room is encrypted;
- retrieve room history from before your join, if permitted by the room settings; and
- access the full list of room members.

Practically, this means that the experience of joining a large room over federation should be greatly improved. In past
versions of Synapse, joining a large room such as Matrix HQ over federation could take up to 30 mins. This time has been
cut to ~20-30 seconds to partially join in the new release. Those of you who have been watching this know this has been
a huge undertaking, big shout out to the team for getting it over the line! We're excited the community to try it, as
always if you encounter any problems you are encouraged to file an [issue](https://github.com/matrix-org/synapse/issues/new?assignees=&labels=&template=BUG_REPORT.yml).

### Changes to the account data replication streams

Please note that Synapse has changed the format of the account data and devices replication streams (between workers).
This is a forwards- and backwards-incompatible change: v1.75 workers cannot process account data replicated by v1.76
workers, and vice versa.

Once all workers are upgraded to v1.76 (or downgraded to v1.75), account data and device replication will resume as normal.

## The new stuff

### The default room version has now been updated to [v10](https://spec.matrix.org/v1.5/rooms/v10/)

Room version 10 is now the default room version in Synapse 1.76.0. This room version builds on v9 to introduce a new
`knock_restricted` join rule, allowing prospective members to more easily join such a room. The `knock_restricted` join
rule allows for prospective members of a room to join either through knocking or through `join_restrictions`, which allows
prospective members to join a restricted room based on whether they are a joined member of another room. You can read more
about restricted rooms [here](https://spec.matrix.org/v1.5/client-server-api/#restricted-rooms).

### Synapse now implements experimental support for [MSC3930](https://github.com/matrix-org/matrix-spec-proposals/pull/3930) Push rules for Polls

Synapse has added some new, default push rules for [MSC3881](https://github.com/matrix-org/matrix-spec-proposals/pull/3381)-esque event types.

This allows for notifications from polls, ie when a poll starts or ends.

## Everything else

See the full [changelog](https://github.com/matrix-org/synapse/releases/tag/v1.76.0), for a
complete list of changes in the release.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to these releases, including: katlol, thezaidbintariq,
dklimpel, FSG-Cat, tjay27, emgrav, villepeh.

We are also grateful to anyone helping us make Synapse better by sharing their
feedback and reporting issues, or helping with community support questions.
