+++
title = "Synapse 0.9.1 released"
path = "/blog/2015/06/01/synapse-0-9-1-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

In the excitement of KamailioWorld last week we completely forgot to mention that we released Synapse 0.9.1.

This is a pretty important performance and stability update of all the new stuff that landed in 0.9.0, as well as landing a major new feature in the form of 'backfill': we finally have the ability to correctly sync in historical conversation history over federation for newly federated rooms.  In other words, if you join a remote room you should be able to navigate its history as intended.

We highly recommend upgrading to 0.9.1 for all the performance improvements and backfill support - get it now from <a href="http://github.com/matrix-org/synapse">http://github.com/matrix-org/synapse</a>.

<code>
Changes in synapse v0.9.1 (2015-05-26)
======================================

General:

* Add support for backfilling when a client paginates. This allows servers to
  request history for a room from remote servers when a client tries to
  paginate history the server does not have - SYN-36
* Fix bug where you couldn't disable non-default pushrules - SYN-378
* Fix ``register_new_user`` script - SYN-359
* Improve performance of fetching events from the database, this improves both
  initialSync and sending of events.
* Improve performance of event streams, allowing synapse to handle more
  simultaneous connected clients.

Federation:

* Fix bug with existing backfill implementation where it returned the wrong
  selection of events in some circumstances.
* Improve performance of joining remote rooms.

Configuration:

* Add support for changing the bind host of the metrics listener via the `metrics_bind_host` option.

</code>
