+++
title = "Synapse 0.9.3 is out! (as of a few weeks ago)"
path = "/blog/2015/07/10/synapse-0-9-3-is-out-as-of-a-few-weeks-ago"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

We seem to have done that thing again where we were too busy writing new stuff (E2E crypto, all-new React-based Web SDK, long-awaited iOS Console update) to remember that we'd released a new version of Synapse - sorry!  

Synapse 0.9.3 was released on July 1st (actually on June 23rd as 0.9.3-rc1, but was released without changes).  It's a fairly minor release but does provide some performance improvements and bug fixes - see below for details.  Get it from <a href="http://github.com/matrix-org/synapse">http://github.com/matrix-org/synapse</a> if you haven't already.

<code>
Changes in synapse v0.9.3 (2015-07-01)
======================================

General:

* Fix a memory leak in the notifier. (SYN-412)
* Improve performance of room initial sync. (SYN-418)
* General improvements to logging.
* Remove ``access_token`` query params from ``INFO`` level logging.

Configuration:

* Add support for specifying and configuring multiple listeners. (SYN-389)

Application services:

* Fix bug where synapse failed to send user queries to application services.

</code>
