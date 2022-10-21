+++
title = "Synapse 0.9.2 released"
path = "/blog/2015/06/12/synapse-0-9-2-released"

[taxonomies]
author = ["Erik Johnston"]
category = ["General"]
+++

Happy Friday everyone!

Over the past two weeks, we have been hunting down some more performance issues in Synapse, as well as fixing a few potential bugs in the new backfill feature that we introduced in 0.9.1. For those that were having issues, this release should really help speed up when your server joins larger remote rooms.

We have also been busy hacking on end-to-end encryption, which is very exciting. Hopefully we will have more details to share about that soon!

Get v0.9.2 now from <a href="http://github.com/matrix-org/synapse">http://github.com/matrix-org/synapse</a>.

<code>
Changes in synapse v0.9.2 (2015-06-12)
======================================

General:

* Use ultrajson for json (de)serialisation when a canonical encoding is not required. Ultrajson is significantly faster than simplejson in certain circumstances.
* Use connection pools for outgoing HTTP connections.
* Process thumbnails on separate threads.

Configuration:

* Add option, ``gzip_responses``, to disable HTTP response compression.

Federation:

* Improve resilience of backfill by ensuring we fetch any missing auth events.
* Improve performance of backfill and joining remote rooms by removing unnecessary computations. This included handling events we had previously handled as well as attempting to compute the current state for outliers.

</code>
