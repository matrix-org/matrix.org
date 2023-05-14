+++
title = "Synapse 0.5.3a released!"
path = "/blog/2014/11/29/synapse-0-5-3a-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Since we exited alpha and released Synapse 0.5.0 last week there's been a flurry of bug fix releases as we ran around firefighting some of the more exciting problems which popped up thanks to merging the federation-auth and event-signing branches.

We released 0.5.3a on Nov 27, which seems to now be pretty stable - if you were holding off on upgrading your homeserver and trying to federate with the new 0.5 release branch, now would be a great time to press the button!

Most excitingly, we believe we have <strong>finally fixed the PyNaCL dependency problems</strong> which have plagued pretty much anyone setting up a homeserver.  This was a problem in PyNaCL itself - huge thanks to Mark for hunting it down and sending the PyNaCL team <a href="http://git.io/1Rr5OA">pull</a> <a href="http://git.io/SUHmBA">requests</a> to get it fixed.  As a result, installing synapse as of 0.5.3a really should be a one-liner at last (please let us know if it isn't!):

<code>pip install --user --process-dependency-links https://github.com/matrix-org/synapse/tarball/master</code>

The full changelog of what's been going on since 0.5.0 is as follows:

<pre>
Changes in synapse 0.5.3a (2014-11-27)
=====================================

 * Depend on a fixed version of PyNaCL
 * Fix bug that caused joining a remote room to fail if a single event was not
   signed correctly.
 * Fix bug which caused servers to continuously try and fetch events from other
   servers.

Changes in synapse 0.5.2 (2014-11-26)
=====================================

 * Fix major bug that caused rooms to disappear from people's initial sync.

Changes in synapse 0.5.1 (2014-11-26)
=====================================
See UPGRADES.rst for specific instructions on how to upgrade.

 * Fix bug where we served up an Event that did not match its signatures.
 * Fix regression where we no longer correctly handled the case where a
   homeserver receives an event for a room it doesn't recognise (but is in.)
</pre>
