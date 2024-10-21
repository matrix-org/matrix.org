+++
title = "Dendrite 0.2.0 released"
date = "2020-10-20T19:35:01Z"
path = "/blog/2020/10/20/dendrite-0-2-0-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]
+++

Hi all,

It's been over a week since our next-generation homeserver [Dendrite entered
beta](https://matrix.org/blog/2020/10/08/dendrite-is-entering-beta), and it's
been a wild rollercoaster ride as the team has been frantically zapping all
the initial teething issues that came up - mostly around room federation
getting 'stuck' due to needing to fix bugs in how room state is managed.  Huge
huge thanks to everyone who has spun up a Dendrite to experiment and report
bugs!

We're now in an impressively better place, and it's feeling way more stable now
(but please don't trust it with your data yet).  So we've skipped 0.1.x and jumped
straight to 0.2.0.

Now would be a great time for more intrepid explorers to try spinning up a
server from <https://github.com/matrix-org/dendrite> and see how it feels - the
more feedback the better.  And if you got scared off by weird bugs in 0.1.0,
now's the right time to try it again!

Full changelog follows:

## Dendrite 0.2.0 (2020-10-20)

### Important

* This release makes breaking changes for polylith deployments, since they now use the multi-personality binary rather than separate binary files
    * Users of polylith deployments should revise their setups to use the new binary - see the Features section below
* This release also makes breaking changes for Docker deployments, as are now publishing images to Docker Hub in separate repositories for monolith and polylith
    * New repositories are as follows: [matrixdotorg/dendrite-monolith](https://hub.docker.com/repository/docker/matrixdotorg/dendrite-monolith) and [matrixdotorg/dendrite-polylith](https://hub.docker.com/repository/docker/matrixdotorg/dendrite-polylith)
    * The new `latest` tag will be updated with the latest release, and new versioned tags, e.g. `v0.2.0`, will preserve specific release versions
    * [Sample Compose configs](https://github.com/matrix-org/dendrite/tree/master/build/docker) have been updated - if you are running a Docker deployment, please review the changes
    * Images for the client API proxy and federation API proxy are no longer provided as they are unsupported - please use [nginx](docs/nginx/) (or another reverse proxy) instead

### Features

* Dendrite polylith deployments now use a special multi-personality binary, rather than separate binaries
    * This is cleaner, builds faster and simplifies deployment
    * The first command line argument states the component to run, e.g. `./dendrite-polylith-multi roomserver`
* Database migrations are now run at startup
* Invalid UTF-8 in requests is now rejected (contributed by [Pestdoktor](https://github.com/Pestdoktor))
* Fully read markers are now implemented in the client API (contributed by [Lesterpig](https://github.com/Lesterpig))
* Missing auth events are now retrieved from other servers in the room, rather than just the event origin
* `m.room.create` events are now validated properly when processing a `/send_join` response
* The roomserver now implements `KindOld` for handling historic events without them becoming forward extremity candidates, i.e. for backfilled or missing events

### Fixes

* State resolution v2 performance has been improved dramatically when dealing with large state sets
* The roomserver no longer processes outlier events if they are already known
* A SQLite locking issue in the previous events updater has been fixed
* The client API `/state` endpoint now correctly returns state after the leave event, if the user has left the room
* The client API `/createRoom` endpoint now sends cumulative state to the roomserver for the initial room events
* The federation API `/send` endpoint now correctly requests the entire room state from the roomserver when needed
* Some internal HTTP API paths have been fixed in the user API (contributed by [S7evinK](https://github.com/S7evinK))
* A race condition in the rate limiting code resulting in concurrent map writes has been fixed
* Each component now correctly starts a consumer/producer connection in monolith mode (when using Kafka)
* State resolution is no longer run for single trusted state snapshots that have been verified before
* A crash when rolling back the transaction in the latest events updater has been fixed
* Typing events are now ignored when the sender domain does not match the origin server
* Duplicate redaction entries no longer result in database errors
* Recursion has been removed from the code path for retrieving missing events
* `QueryMissingAuthPrevEvents` now returns events that have no associated state as if they are missing
* Signing key fetchers no longer ignore keys for the local domain, if retrieving a key that is not known in the local config
* Federation timeouts have been adjusted so we don't give up on remote requests so quickly
* `create-account` no longer relies on the device database (contributed by [ThatNerdyPikachu](https://github.com/ThatNerdyPikachu))

### Known issues

* Old events can incorrectly appear in `/sync` as if they are new when retrieving missing events from federated servers, causing them to appear at the bottom of the timeline in clients
* Memory can explode when catching up after a federation outage.
