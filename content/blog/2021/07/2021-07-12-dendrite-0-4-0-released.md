+++
title = "Dendrite 0.4.0 Released"
path = "/blog/2021/07/12/dendrite-0-4-0-released"

[taxonomies]
author = ["Neil Alexander"]
category = ["Releases"]
+++

After quite a significant gap between releases — version 0.3.11 was released at the beginning of March — we're happy to finally announce the release of Dendrite 0.4.0 today!

The full changelog for the release is [available on GitHub](https://github.com/matrix-org/dendrite/releases/tag/v0.4.0), but we wanted to take the opportunity to talk a little about some of the changes that have gone into this release.

Recently our release cadence for Dendrite has slowed as we have spent more time within the team working on [Pinecone](https://github.com/matrix-org/pinecone) and [Low Bandwidth Matrix](https://github.com/matrix-org/lb). These are major areas of research for us which we hope will unlock a number of new opportunities within the Matrix ecosystem, allowing us to [build on Matrix anywhere](https://matrix.org/blog/2021/05/06/introducing-the-pinecone-overlay-network) and to [reduce the protocol-level footprint](https://matrix.org/blog/2021/06/10/low-bandwidth-matrix-an-implementation-guide). However, Dendrite has not been forgotten amidst the excitement and we will be spending more time working on Dendrite again in the coming months.

### State storage

One of the major features in v0.4.0 is that we've introduced newly-refactored state storage in the roomserver database. The goal here is to make state storage significantly more efficient by ensuring that we deduplicate state  blocks and snapshots wherever we can. By ensuring that all state blocks and snapshots are ordered strictly, and by enforcing uniqueness constraints on the hashes of the blocks/snapshots, we've been able to achieve this.

This was largely spurred on by watching `dendrite.matrix.org` consuming a rather alarming amount of disk space on a daily basis. In this particular instance, moving to the new state storage resulted in a 15x improvement on disk utilisation for state blocks and a further 2x improvement for state snapshot references immediately after the migration, and the growth rate of the database has slowed substantially since.

Ensuring that we don't waste disk space is one of the most important factors in ensuring that Dendrite operates well at any scale — future datacentre deployments supporting many users will find storage overheads decreased and small/embedded single-user deployments (such as P2P, on mobile devices or in the browser) will fit much more effectively onto resource-constrained targets.

After upgrading to v0.4.0, Dendrite will run an automatic migration to update your homeserver to the new state storage format. This might take a while on larger databases so please expect some downtime.

### Optimisations

We've continued to squeeze further optimisations into the federation and state resolution code, aiming to reduce the amount of CPU burn and memory utilisation. Some of the feedback that we receive most often from those that have been experimenting with the Dendrite betas is around the sudden spikes in resource usage, especially when joined to large rooms.

The bulk of this resource usage comes either from attempting to reconcile missing events or running state resolution in rooms with lots of members, as potentially large state sets of events need to be brought into memory in order to do so. We've introduced some transaction-level caches for dealing with missing auth/prev events to reduce the memory pressure and we've also tweaked the caching around around `/get_missing_events` to ensure we don't duplicate any state events in memory.

Resource spikes aren't completely eliminated but this should smooth out CPU and memory utilisation significantly. In the case of `dendrite.matrix.org`,  which is joined to some 6500 rooms at present, memory utilisation of the Dendrite process typically sits around 1.5GB at present.

State Resolution v2 has also seen further optimisations in the power-level checking, which should reduce CPU usage even more.

### Bridges

Thanks to Half-Shot's perseverance and contributions, we've merged a couple PRs and worked on some further fixes for getting Application Services working correctly in Dendrite. Whilst not entirely feature-complete and with a number of features still to go, enough support is now present to support basic bridging functionality.

We've done quite a bit of preliminary testing with [matrix-appservice-irc](https://github.com/matrix-org/matrix-appservice-irc) and have also heard a number of success stories from the community with [mautrix-whatsapp](https://github.com/tulir/mautrix-whatsapp) and [mautrix-telegram](https://github.com/tulir/mautrix-telegram). Others may work too — let us know what you find!

### Bug-hunting

A number of bugs in various places (including the roomserver, federation API and media API) which could cause Dendrite to crash have also been fixed.  Some of these have been contributed by the community in pull requests, so we extend our thanks to anyone who has submitted a fix to the project.

A special mention also goes to Jakob Varmose Bentzen for reporting a security issue to us around the legacy `/v1/register` endpoint, where a flaw in the legacy shared secret registration allowed malicious users to create accounts. We've since removed this legacy endpoint and the vulnerability is now fixed.

### What's next

There are still a number of missing user-facing features which we will be working on over the coming months, as well as some architectural issues that we will look to address.

A notable area of work involves attempting to remove the dependency on Kafka for polylith deployments. Kafka is very resource-heavy in operation and somewhat limits us to the types of interactions that we can perform between components. It's also very difficult to manage retention correctly, in the interests of not endlessly consuming disk space here either.

As usual, Dendrite is still considered beta so you may not want to rely on it for production systems, although it should be stable enough to experiment with. If you find any bugs or anything that doesn't look right, please let us know:

* [#dendrite:matrix.org](https://matrix.to/#/#dendrite:matrix.org)
* [GitHub Issues](https://github.com/matrix-org/dendrite/issues)

We're also open to contributions, so don't be afraid to open pull requests. Finally, thanks for your continued support!

— Team Dendrite
