+++
title = "Dendrite is entering Beta!"
path = "/blog/2020/10/08/dendrite-is-entering-beta"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]

[extra]
image = "https://matrix.org/blog/img/2020-10-08-dendrite-arch.png"
+++

Hi all,

We’re very excited to announce that Dendrite, the next-generation Matrix homeserver from the core Matrix team, is at last exiting alpha development and entering beta testing!

The path we’ve taken to get here has been quite a curious one, and it’s worth recapping to give context on why it’s taken reality a little while to catch up with the dream. :)

The Dendrite project has its roots in 2016 as [Dendron](https://github.com/matrix-org/dendron): an attempt to write a next-generation homeserver in Golang rather than Python, in order to benefit from Go’s stronger typing, ease of profiling (no twisted stack-shredding via deferredInlineCallbacks), multithreading and faster GC performance.  The idea for Dendron was to do a [strangler pattern](https://martinfowler.com/bliki/StranglerFigApplication.html) rewrite of Synapse - where we’d insert Dendron in front of Synapse as a load balancer, and incrementally replace Synapse’s API endpoints with ones implemented by Dendron.

However, as the project started to progress, it became clear that this was going to end up with many of Synapse’s architectural choices being baked into the project - particularly the DB schema and data flow architecture, such that the new endpoints could interoperate with the existing Python ones.  We got as far as putting Dendron live on matrix.org and moving some of the login/registration APIs over to it… but then work fizzled out due to Synapse demanding more urgent attention as traffic grew on Matrix.org, combined with concerns about whether Dendron was the right approach in general.

So, towards the end of 2016 (after the rush to launch ~~Vector~~ ~~Riot~~ Element that summer), we went back to the drawing board to devise Dendrite—“Dendron done right!”—as opposed to Dendron, which in retrospect was Dendrite done wrong. ;) The new vision was:

* Build a massively horizontally scalable architecture, such that large Matrix deployments like matrix.org and big government deployments could run smoothly without the constant scalability headaches we were seeing at the time with Synapse
* Do so by splitting the server into well-defined microservice components, each of which could independently horizontally scale, each with its own DB (if desired)
* Connect the components together with a set of append-only logs via [Kafka](https://kafka.apache.org/) or similar, easily letting components shard and maintain their databases from the logs, allowing rolling upgrades, possibly schema upgrades, and all sorts of other niceties.  The logs effectively become a primary source of truth rather than putting all the onus on a massive monolithic ever-growing database

Rather than Dendron’s top-down approach, instead Dendrite started bottom-up with the very hardest bit: [gomatrixserverlib](https://github.com/matrix-org/gomatrixserverlib), a standalone Go library implementing the state resolution algorithms and performing federation requests (such that it might also someday be used as a general purpose way to add Matrix federation support to an existing Go codebase).

Then we started building out the various components to implement the various services, starting with the roomserver (the service which models the history and state of one or more rooms in the server), then the syncserver (the service which implements the /sync API to let clients receive messages), etc. We even implemented a simplified in-memory version of Kafka named [naffka](https://github.com/matrix-org/naffka)—useful for glueing together the microservice components when running them all within a single binary.

Things were looking pretty positive by the summer of 2017: we had the server sending/receiving messages, federating with Synapse, and looking tantalisingly close:

> <p lang="en" dir="ltr">We just sent the first ever synapse-&gt;dendrite federated traffic, including full dendrite media API (thumbnailing, fed, etc)!!! :D :D :D <a href="https://t.co/sBcM2jMAr6">pic.twitter.com/sBcM2jMAr6</a></p>&mdash; Matrix (@matrixdotorg) <a href="https://twitter.com/matrixdotorg/status/872861579141947392?ref_src=twsrc%5Etfw">June 8, 2017</a>

However, we then hit three fairly major obstacles:

* [Matrix lost its funding](https://matrix.org/blog/2017/07/07/a-call-to-arms-supporting-matrix)
* In the ensuing uncertainty, the two lead developers (Mjark & Kegan) went to work elsewhere
* Meanwhile, Matrix uptake was starting to explode and Synapse was failing to scale to handle the traffic on matrix.org (and elsewhere)

At first, having formed what would become New Vector (now Element) to keep the rest of the core team hired, we pushed to see if we could get Dendrite finished fast enough to replace Synapse, with Erik & richvdh jumping over from Synapse to pick up the remaining work.  However, it became clear that we urgently needed a quicker solution to address all the overloaded Synapses out there, and so they swung back to focus on improving Synapse (taking inspiration from some of the design of Dendrite - e.g. offloading endpoints onto worker processes connected via replication streams, and using [OpenTracing](https://opentracing.io/) to debug traffic as it flows over the various services).

At this point, Dendrite maintenance was in effect valiantly taken over by the community, with Brendan and later Anoa keeping the ball going in 2017, joined by APWhitehat in GSoC 2018 and cnly in GSoC 2019.  The fact that Dendrite is now here today is thanks in no small part to their work to keep the project alive in its “wilderness years” between Sept 2017 and Dec 2019.

Meanwhile, it became clear that we were overdue getting Matrix itself out of beta - and the last thing we wanted to do was to split and dilute the implementation work of Matrix 1.0 over both Synapse and Dendrite - so we consciously made the decision to focus all our effort on Synapse for solving the remaining bugs and challenges.

Then, in July 2019, [Matrix and Synapse exited beta](https://matrix.org/blog/2019/06/11/introducing-matrix-1-0-and-the-matrix-org-foundation), and we finally started to see light at the end of the tunnel.  In October we started dusting off Dendrite again - looking to use it as a relatively simple and flexible codebase for [experimenting with Peer-to-Peer Matrix](https://youtu.be/eA0KnTt4O7E?t=1423), not least because being Go it can compile to WebAssembly and run clientside, and because even though Dendrite was originally built with massive deployments in mind, it turns out the elastic scaling means it can also scale down pretty small too—as a part of the [iOS P2P demo](http://testflight.apple.com/join/Tgh2MEk6), we’ve even ran full Dendrite homeservers on iPhones embedded into Element iOS! :)

In Dec 2019, we finally got to the point where Element could fund full-time dedicated development on Dendrite once again, with Neil Alexander joining the project and focusing fulltime on getting Dendrite out of alpha and getting it working for P2P and embedded usage (adding libp2p as a federation transport, and adding SQLite support) - and in Jan 2020 we got Dendrite [successfully running clientside in a WASM service worker](https://archive.fosdem.org/2020/schedule/event/dip_p2p_matrix/) (just in time for FOSDEM!). Then, in Feb 2020, Kegan returned to the project to work fulltime on Dendrite - and the race began in earnest to get Dendrite ready for beta!

Here’s a pretty picture courtesy of GitHub to visualise the progress:

![020-10-08-dendrite-contributors.png](/blog/img/2020-10-08-dendrite-contributors.png)

Throughout 2020 there’s been a huge amount of stabilisation work and polish:

* Refactoring much of Dendrite’s foundation to make the codebase more maintainable
* Created all-new user server, key server, signing key server microservices
* Moving some work from existing microservices (ultimately superseding the former currentstateserver, publicroomsapi and typingserver microservices altogether)
* Developing new testing infrastructure:
    * [Complement](https://github.com/matrix-org/complement) - our brand new Golang Matrix integration test harness
    * [Are We Synapse Yet](https://github.com/matrix-org/dendrite/blob/master/are-we-synapse-yet.py) - an aggregator which parses sytest/complement output to compare how close Dendrite is to passing
* All the Matrix 1.0 work - particularly state res v2 & room version support
* Making it work with more P2P transports for [all the exciting P2P experiments](https://matrix.org/blog/2020/06/02/introducing-p-2-p-matrix/)
* Supporting backfill and fetching missing events
* Fixing up SQLite support to make it work as a first class citizen (with shared storage code where we can!)
* Supporting both sending and rejecting invites (even over federation)
* E2E encryption support (one-time keys, device lists, send-to-device support)
* Improved federation sender logic (resend retries, backoffs, blacklisting, metrics, resetting backoffs when receiving transactions)
* Handling both inbound and outbound redactions
* User interactive authentication (and implemented on various ‘sudo’ endpoints e.g. deleting devices and changing passwords)
* Respecting server ACLs
* Rejecting / soft-failing events properly
* Support for database schema upgrades

... which brings us at last to the present day (Oct 2020), as we declare Dendrite sufficiently stable that we consider it ready for beta testing!

In practice, this means **Dendrite is now ready for experimentation by adventurous Matrix sysadmins. It is *NOT* ready for production usage yet, but we need folks to test it and help us iron out the remaining bugs!**Please do not trust it with sensitive data yet, and we don’t recommend trying to run it at scale yet as we haven’t done any serious optimisation work yet.

That said, we do provide the following guarantees:

* We’re providing versioned releases from here on in, beginning with [0.1.0](https://github.com/matrix-org/dendrite/releases/tag/v0.1.0)
* We don’t expect any major breaking changes to the config or architecture before 1.0
* Ready for early adopters to try running Dendrite without experiencing ~daily breaking churn
* The database schema is now stable and will upgrade itself going forwards - your database should now be here to stay! (assuming we don’t hit any nasty data loss bugs during beta)

In terms of comparison with Synapse, the main things you should get excited about are:

* Dendrite aims to provide an **efficient**, **reliable** and **scalable** alternative to Synapse:
    * Efficient: A small memory footprint with better baseline performance than an out-of-the-box Synapse
    * Reliable: Implements the Matrix specification as written, using the [same test suite](https://github.com/matrix-org/sytest) as Synapse as well as a [brand new Go test suite](https://github.com/matrix-org/complement)
    * Scalable: can run on multiple machines and eventually scale to massive homeserver deployments
* This means significantly less memory usage than Synapse (depends on joined rooms, often between 50MB - 400MB resident memory) - although we haven’t tuned this at all yet!
* All-new database model, where every microservice instance has its own database tables, letting them scale arbitrarily wide
* The ability to efficiently use all your available CPU cores without needing to split into separate processes, thanks to Go and our extensive use of goroutines.  No more Python global interpreter lock! :)
* Future experimental MSCs are likely to land in Dendrite before Synapse (e.g [MSC2753 Peeking via /sync](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2753/proposals/2753-peeking-via-sync-v2.md) and [MSC2444 Peeking over Federation](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2444/proposals/2444-peeking-over-federation-peek-api.md) are already being prototyped ([#1370](https://github.com/matrix-org/dendrite/pull/1370) and [#1391](https://github.com/matrix-org/dendrite/pull/1391)) in Dendrite rather than Synapse!)

The provisos you should know about however are:

* We’re not feature complete yet: sytest reports 56% CS API coverage and 77% Federation coverage. **NB: these are always going to be underestimates of how much Dendrite actually performs due to how the tests are spread out, in actuality it’s likely more 70% CS, 95% Fed.**
* No read receipts, membership lazy-loading, presence, push notifications, search, event context, key backups, cross-signing. See changelog for full limitations.
* Not battle-tested in the wild by many people (there are probably only ~10 dendrites on the open network today!) - so there’s likely to be a broad spectrum of bugs at first.
* Clients that require more exotic features, like lazy loading, may not behave properly yet
* Please **use Postgres rather than SQLite wherever possible**—it’s faster and has fewer issues regarding concurrency (some requests on SQLite Dendrites may 500 with ‘database is locked’ - though we’ve worked hard to eliminate most of these)
* Dendrite can run in either “monolith” or “polylith” mode. In monolith, all the microservices are linked into a single binary - and **we recommend running in this configuration wherever possible** for now. Monolith mode is *extremely* capable as it is and has fewer moving parts for things to go wrong and will be the right choice for the majority of beta deployments!
* Whilst Dendrite is nearly 100% federation compatible, there may still be situations where it will split-brain and disagree with the current room state that Synapse has calculated. We expect these issues to resolve as we get more user feedback.

Architecture-wise, this is what Dendrite looks like under the hood today:

![2020-10-08-dendrite-arch.svg](/blog/img/2020-10-08-dendrite-arch.svg)

To get up and running, please install Go and head on over to the Get Started guide at [https://github.com/matrix-org/dendrite#get-started](https://github.com/matrix-org/dendrite#get-started) to join the fun :)

In terms of where we’re going next:

* Read receipts. It’s a major missing feature and impacts UX significantly.
* 100% Federation coverage (according to sytest). It’s crucial that Dendrite instances play nicely with other servers. This will be the best metric we have for asserting that we are just as capable as Synapse at the fed level.
* Optimisation—**Dendrite has not been optimised yet for speed or resource utilisation!**
    * We plan to add benchmarks which will stress test different microservices in the presence of many different scaling factors (number of users, number of rooms, size of room, number of devices per user, number of sync requests, etc). This will hopefully allow us to identify early on bottlenecks and slow algorithms
    * Good old fashioned pprof with known slow scenarios to see what’s consuming CPU/memory and fixing issues ad-hoc (which we’ve already done a bit of pre-beta). This may involve adding additional in-memory caches, with a healthy respect for the complexities it may introduce (which Synapse has been bitten by)
* We plan to add first class feature flag support for experimental MSCs—experimentation is one thing which makes Dendrite notably different from Synapse, and supporting it more thoroughly going forwards will be important. This may mean adding additional hooks; potentially a dedicated microservice to cleanly separate experiments, we don’t know yet
* P2P work will continue with vigour now we have a working, featureful, and relatively stable HS to embed and play with

Longer term, it’s pretty hard to say right now when we expect to exit beta (it took Synapse 5 years to exit beta, after all ;) - but obviously we’ll need Dendrite to have parity with Synapse and have no known serious bugs.

Finally: you’re probably wondering what this means for Synapse.  Synapse is here to stay - with tens of thousands of deployments around the world serving tens of millions of users.  The majority of the core team is still focused on improving and optimising Synapse, and we’ll be keeping improving it for the foreseeable.

However, we’ll certainly be experimenting with new stuff on Dendrite first - whether that’s P2P, portable accounts, new-style communities, peeking etc.  We expect Synapse to be the stable long-term-supported solution, while Dendrite (particularly while in beta) will be the more unstable and experimental platform. In the longer term we’ll provide ways of migrating from Synapse to Dendrite however (probably via portable accounts), and perhaps in future new deployments may choose to use Dendrite - a bit like you might choose to use nginx rather than Apache for a new web server these days. But this will be a long transition—meanwhile we expect to see more and more next-generation homeservers like [Conduit](http://conduit.rs/), [Mascarene](https://gitlab.com/mascarene/mascarene) or [Construct](https://github.com/matrix-construct/construct) coming of age too.

So, there you have it. If you’re an intrepid sysadmin please spin up a Dendrite and start filing bugs! :)

— Matthew, Neil Alexander, Kegan and the whole Matrix team.

Here’s the official changelog:

### Client-Server API Features

#### Account registration and management

* Registration: By password only.
* Login: By password only. No fallback.
* Logout: Yes.
* Change password: Yes.
* Link email/msisdn to account: No.
* Deactivate account: Yes.
* Check if username is available: Yes.
* Account data: Yes.
* OpenID: No.

#### Rooms

* Room creation: Yes, including presets.
* Joining rooms: Yes, including by alias or `?server_name=`.
* Event sending: Yes, including transaction IDs.
* Aliases: Yes.
* Published room directory: Yes.
* Kicking users: Yes.
* Banning users: Yes.
* Inviting users: Yes, but not third-party invites.
* Forgetting rooms: No.
* Room versions: All (v1 - v6)
* Tagging: Yes.

#### User management

* User directory: Basic support.
* Ignoring users: No.
* Groups/Communities: No.

#### Device management

* Creating devices: Yes.
* Deleting devices: Yes.
* Send-to-device messaging: Yes.

#### Sync

* Filters: Timeline limit only. Rest unimplemented.
* Deprecated `/events` and `/initialSync`: No.

#### Room events

* Typing: Yes.
* Receipts: No.
* Read Markers: No.
* Presence: No.
* Content repository (attachments): Yes.
* History visibility: No, defaults to `joined`.
* Push notifications: No.
* Event context: No.
* Reporting content: No.

#### End-to-End Encryption

* Uploading device keys: Yes.
* Downloading device keys: Yes.
* Claiming one-time keys: Yes.
* Querying key changes: Yes.
* Cross-Signing: No.

#### Misc

* Server-side search: No.
* Guest access: Partial.
* Room previews: No, partial support for Peeking via MSC2753.
* Third-Party networks: No.
* Server notices: No.
* Policy lists: No.

### Federation Features

* Querying keys (incl. notary): Yes.
* Server ACLs: Yes.
* Sending transactions: Yes.
* Joining rooms: Yes.
* Inviting to rooms: Yes, but not third-party invites.
* Leaving rooms: Yes.
* Content repository: Yes.
* Backfilling / get_missing_events: Yes.
* Retrieving state of the room (`/state` and `/state_ids`): Yes.
* Public rooms: Yes.
* Querying profile data: Yes.
* Device management: Yes.
* Send-to-Device messaging: Yes.
* Querying/Claiming E2E Keys: Yes.
* Typing: Yes.
* Presence: No.
* Receipts: No.
* OpenID: No.
