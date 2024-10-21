+++
title = "Synapse 1.72 released"
path = "/blog/2022/11/22/synapse-1-72-released"

[taxonomies]
author = ["Mathieu Velten"]
category = ["Releases"]
+++

It's not Christmas yet, but it's time for a new release! Say hello to [Synapse
1.72](https://github.com/matrix-org/synapse/releases/tag/v1.72.0).

It seems like this blog didn't self update through AI for the 2 preceding
updates so this post will cover 1.70 to 1.72, sorry if this is a bit long but
it's been a while :)

## Announcements

### Dropping support for PostgreSQL 10

PostgreSQL 10 has reached End Of Life: Synapse will no longer support it
beginning with version 1.72 so please upgrade your database if you have not
already done so.

### Legacy Prometheus metric names disabled and to be removed

In previous versions of Synapse, some Prometheus metrics were emitted under two
different names, an older name that was non-compliant with OpenMetrics and
Prometheus conventions and a new compliant name.

Synapse 1.71 and later have the old metric names switched off by default.

For now it's still possible to get them by using `enable_legacy_metrics: true`,
however server administrators still using legacy metric names are highly
encouraged to migrate, as they will be removed in 1.73.

You can find the full list of renamed metrics
[here](https://matrix-org.github.io/synapse/v1.72/metrics-howto.html#renaming-of-metrics--deprecation-of-old-names-in-12).

### Changes to the events received by application services (interest)

Following the implementation of
[MSC3905](https://github.com/matrix-org/matrix-spec-proposals/pull/3905),
Synapse now only considers local users to be interesting to application
services. In other words, the users namespace regex in an app service's
registration file is only applied against local users of the homeserver.

Please note, this probably doesn't affect the expected behavior of your
application service, since an interesting local user in a room still means all
messages in the room (from local or remote users) will still be considered
interesting.

You can find a bit more info in the MSC and in the [upgrade
notes](https://matrix-org.github.io/synapse/v1.71/upgrade.html#changes-to-the-events-received-by-application-services-interest).

## The new stuff

### Threads, threads, threads

Several MSCs related to threads got implemented:

- [MSC3856](https://github.com/matrix-org/matrix-spec-proposals/pull/3856)
  provide an API to fetch threads and related metadata.
- [MSC3771](https://github.com/matrix-org/matrix-spec-proposals/pull/3771) and
  [MSC3773](https://github.com/matrix-org/matrix-spec-proposals/pull/3773)
  implementing per thread read receipts and per thread notification counts.
- [MSC3874](https://github.com/matrix-org/matrix-spec-proposals/pull/3874)
  allows to filter out messages belonging to threads from the main timeline
  (still considered experimental). Along with MSC3856, this should noticeably
  improve performance of rooms that use threads heavily.

This should significantly improve user experience related to threads, being
through behavior or performance impact.

### Linking events together

Relationships are great, even more between events than humans!

[MSC3664](https://github.com/matrix-org/matrix-spec-proposals/pull/3664) allows
Matrix clients to be notified in real time of related events, so you can now be
made quickly aware of this cat emoji reaction that your cat photo clearly
deserved.

Additionally, Synapse 1.72 includes an implementation of
[MSC3912](https://github.com/matrix-org/matrix-spec-proposals/pull/3912),
allowing users to redact the relations of a message alongside the message
itself. This is particularly helpful in cases like edits, where users usually
want to see their edits redacted at the same time as the original message. Note
that this implementation is currently incomplete and still experimental, though,
so watch this space!

### Faster joins, continued

We continue our journey to get everything going as transparently as possible
when doing fast remote room joins.

If you missed it you can refer to this previous [blog
post](https://matrix.org/blog/2022/10/18/testing-faster-remote-room-joins) to
get a lot more infos, and feel free to grep Synapse changelog and the numerous
related issues/PRs for all the gory details.

## Everything else

See the full changelogs
([1.70](https://github.com/matrix-org/synapse/releases/tag/v1.70.0),
[1.71](https://github.com/matrix-org/synapse/releases/tag/v1.71.0),
[1.72](https://github.com/matrix-org/synapse/releases/tag/v1.72.0)) for a
complete list of changes in the releases. Also please have a look at the
[upgrade
notes](https://matrix-org.github.io/synapse/v1.72/upgrade#upgrading-to-v1720)
for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order) [Nico](https://github.com/deepbluev7),
[sando38](https://github.com/sando38), [realtyem](https://github.com/realtyem),
[aceArt GmbH](https://github.com/aceArt-GmbH), [Tuomas
Ojamies](https://github.com/tuojamie), [Ashish
Kumar](https://github.com/ashfame), [asymmetric](https://github.com/asymmetric),
[Beeper](https://www.beeper.com/), [Ryan
Miguel](https://github.com/renegaderyu), [Paul
Tötterman](https://github.com/ptman), [Abdullah
Osama](https://github.com/Abdullah0sama), [Finn](https://github.com/thefinn93),
[Ivan Shapovalov](https://github.com/intelfx), [Dirk
Klimpel](https://github.com/dklimpel), [Jonathan de
Jong](https://github.com/ShadowJonathan),
[MichaIng](https://github.com/MichaIng) and [Aaron
Raimist](https://github.com/aaronraimist) as well as anyone helping us make
Synapse better by sharing their feedback and reporting issues.
