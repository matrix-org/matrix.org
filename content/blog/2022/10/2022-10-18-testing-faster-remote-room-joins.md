+++
title = "Testing faster remote room joins"
date = "2022-10-18T13:35:00Z"
path = "/blog/2022/10/18/testing-faster-remote-room-joins"

[taxonomies]
author = ["Richard van der Hoff"]
category = ["General"]
+++

As of [Synapse 1.69](https://matrix.org/blog/2022/10/17/synapse-1-69-released), we consider "faster remote room joins" to be ready for testing by server admins.

There are a number of caveats, which I'll come to, but first: this is an important step in a project which we've been working on for 9 months. Most people who use Matrix will be familiar with the pain of joining a large room over federation: typically you are just faced with a spinner, which is eventually replaced by a cryptic error. If you're lucky, the room eventually pops up in your room list of its own accord. The whole experience is [one of the longest-standing open issues in Synapse](https://github.com/matrix-org/synapse/issues/1211).

<!-- more -->

The "faster joins" project set out to change all this. Briefly, the reason the experience is so poor today is that there is a *lot* of information required to join a large room, which is slow for the "resident" server to generate, and even slower for the "joining" server to validate and store. The key insight is that we don't really need the full membership list of a room to get started: rather, we can present the user with the basic information about the room (name, topic, space hierarchy, etc), and then populate the full details in the background. The upshot is that, whereas it used to take upwards of 12 minutes to join Matrix HQ (even assuming that your server didn't fall over in the meantime), this is now down to about 30 seconds (and we're confident that we can reduce this even further).

It sounds simple enough, but in reality this has meant a lot of work on Synapse. The main problem was that huge amounts of the Synapse codebase assumed that we either had all the state for a room, or none of it. That assumption no longer holds, which meant lots of changes to the code to handle "partial state". Along the way we've also had to make some other improvements: for example, we [found and fixed](https://github.com/matrix-org/synapse/security/advisories/GHSA-jhjh-776m-4765) some long-standing bugs in event authorisation, and implemented [cancellation](https://github.com/matrix-org/synapse/issues/3528) for requests where the client disconnects before we finish handling the request. For an idea of the things being changed at the Matrix protocol level, take a look at [MSC3902](https://github.com/matrix-org/matrix-spec-proposals/pull/3902).

The upshot of all that, is that instead of seeing a blank room with a spinner (or an error message), you can now see the basic information about the room, as well as receive incoming messages, within a few seconds of trying to join the room.

## Caveats

The devil, as they say, is in the detail, and unfortunately there remain a few rough edges to this work.

Firstly, and most importantly: **we do not yet recommend enabling faster joins on important production systems**. We've done quite a lot of testing, but there are some fundamental changes to Synapse, and by their nature they are hard to test rigorously. We're pretty confident it won't eat your entire database, but stuck rooms, stuck notifications, and stuck clients, are all entirely within the realms of possibility. We'd recommend only enabling faster joins on your server if you are comfortable looking at the logs, and using the Synapse Admin API or flushing client caches to clean things up if they go wrong.

Secondly: there's still some [outstanding work](https://github.com/matrix-org/synapse/issues/12994) required to support faster joins on Synapse deployments using worker processes. At present, if you try to enable them on a worker-based deployment, Synapse will refuse to start.

Next: the faster-joins process requires some support from the resident server, and, since [those changes](https://github.com/matrix-org/matrix-spec-proposals/pull/3706) are not yet in the stable matrix spec, it must be explicitly enabled. We have enabled this support on the `matrix.org` homeserver, but it generally won't work elsewhere. In other words: for now, you'll only see the benefit when you join a room via a `#<name>:matrix.org` alias (or via the `matrix.org` room directory).

Finally, there are still quite a few things that don't work properly yet. We're tracking the list of things we need to fix as a [milestone](https://github.com/matrix-org/synapse/milestone/10) on the Synapse project, but to name a few:

* You can't yet send messages during the "resynchronisation" phase ([synapse#12997](https://github.com/matrix-org/synapse/issues/12997)). Currently, you'll just get a spinner.
* Similarly, attempts to leave the room ([synapse#12802](https://github.com/matrix-org/synapse/issues/12802)) will block until the resync completes.
* Clients which don't support [lazy-loading room members](https://spec.matrix.org/v1.4/client-server-api/#lazy-loading-room-members) will *block* (ie, they won't receive any new events at all) during the resynchronisation process ([synapse#12989](https://github.com/matrix-org/synapse/issues/12989)). Most popular clients, including Element, Hydrogen, Fractal and FluffyChat *do* support lazy-loading, but a few (including Nheko) do not.

## Turning it on

With all that said: we are very excited for people to start trying it and give us feedback. If you administer a Synapse server and are as excited as we are, all you need to do to start testing faster joins is to add this to your `homeserver.yaml` (and then restart Synapse):

```yaml
experimental_features:
  faster_joins: True
```

With that, any future remote room joins (or at least those going via `matrix.org`) will use the new faster joins algorithm. Please let us know how you get on, and file GitHub issues for any problems you might have!
