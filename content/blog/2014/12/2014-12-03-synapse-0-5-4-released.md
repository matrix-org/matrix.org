+++
title = "Synapse 0.5.4 released"
path = "/blog/2014/12/03/synapse-0-5-4-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

We just pushed a bugfix update to Synapse 0.5, mainly to fix a memory leak where federated events could get leaked whilst retrying to send them to a remote server which is unavailable.  Please upgrade, especially if you've noticed synapse hogging RAM!

<code>
Changes in synapse 0.5.4 (2014-12-03)
=====================================

* Fix presence bug where some rooms did not display presence updates for
   remote users.
* Do not log SQL timing log lines when started with "-v"
* Fix potential memory leak.

</code>
