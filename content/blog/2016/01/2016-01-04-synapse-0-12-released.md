+++
title = "Synapse 0.12 released!"
path = "/blog/2016/01/04/synapse-0-12-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Happy 2016 everyone!

To greet the new year, we bring you all new Synapse 0.12. The focus here has been a wide range of polishing, bugfixes, performance improvements and feature tweaks. The biggest news are that the 'v2' sync APIs are now production ready; the search APIs now work much better; 3rd party ID invites now work; and we now mount the whole client-server API under the <code>/_matrix/client/r0</code> URI prefix, as per the <a href="/docs/spec/r0.0.0/client_server.html">r0.0.0 release of the Client Server API</a> from a few weeks ago. The <code>r0</code> release unifies what were previously the somewhat confusing mix of 'v1' and 'v2' APIs as a single set of endpoints which play nice together.

We highly recommend all homeservers upgrading to v0.12.0 as soon as possible. Get it now from <a href="https://github.com/matrix-org/synapse/">https://github.com/matrix-org/synapse/</a> or via our shiny new Debian packages at <a href="/packages/debian/">https://matrix.org/packages/debian/</a>.

&nbsp;

Full changelog follows:
<h3>Changes in synapse v0.12.0 (2016-01-04)</h3>
<ul>
    <li>Expose <code>/login</code> under <code>r0</code> (PR #459)</li>
</ul>
<a name="user-content-changes-in-synapse-v0-12-0-rc3-2015-12-23"></a>
<h3><a id="user-content-changes-in-synapse-v0120-rc3-2015-12-23" class="anchor" href="https://github.com/matrix-org/synapse/blob/master/CHANGES.rst#changes-in-synapse-v0120-rc3-2015-12-23"></a>Changes in synapse v0.12.0-rc3 (2015-12-23)</h3>
<ul>
    <li>Allow guest accounts access to <code>/sync</code> (PR #455)</li>
    <li>Allow filters to include/exclude rooms at the room level rather than just from the components of the sync for each room. (PR #454)</li>
    <li>Include urls for room avatars in the response to <code>/publicRooms</code> (PR #453)</li>
    <li>Don't set a identicon as the avatar for a user when they register (PR #450)</li>
    <li>Add a <code>display_name</code> to third-party invites (PR #449)</li>
    <li>Send more information to the identity server for third-party invites so that it can send richer messages to the invitee (PR #446)</li>
    <li>Cache the responses to <code>/initialSync</code> for 5 minutes. If a client retries a request to <code>/initialSync</code> before the a response was computed to the first request then the same response is used for both requests (PR #457)</li>
    <li>Fix a bug where synapse would always request the signing keys of remote servers even when the key was cached locally (PR #452)</li>
    <li>Fix 500 when pagination search results (PR #447)</li>
    <li>Fix a bug where synapse was leaking raw email address in third-party invites (PR #448)</li>
</ul>
<a name="user-content-changes-in-synapse-v0-12-0-rc2-2015-12-14"></a>
<h3><a id="user-content-changes-in-synapse-v0120-rc2-2015-12-14" class="anchor" href="https://github.com/matrix-org/synapse/blob/master/CHANGES.rst#changes-in-synapse-v0120-rc2-2015-12-14"></a>Changes in synapse v0.12.0-rc2 (2015-12-14)</h3>
<ul>
    <li>Add caches for whether rooms have been forgotten by a user (PR #434)</li>
    <li>Remove instructions to use <code>--process-dependency-link</code> since all of the dependencies of synapse are on PyPI (PR #436)</li>
    <li>Parallelise the processing of <code>/sync</code> requests (PR #437)</li>
    <li>Fix race updating presence in <code>/events</code> (PR #444)</li>
    <li>Fix bug back-populating search results (PR #441)</li>
    <li>Fix bug calculating state in <code>/sync</code> requests (PR #442)</li>
</ul>
<a name="user-content-changes-in-synapse-v0-12-0-rc1-2015-12-10"></a>
<h3><a id="user-content-changes-in-synapse-v0120-rc1-2015-12-10" class="anchor" href="https://github.com/matrix-org/synapse/blob/master/CHANGES.rst#changes-in-synapse-v0120-rc1-2015-12-10"></a>Changes in synapse v0.12.0-rc1 (2015-12-10)</h3>
<ul>
    <li>Host the client APIs released as r0 by <a href="/docs/spec/r0.0.0/client_server.html">https://matrix.org/docs/spec/r0.0.0/client_server.html</a> on paths prefixed by<code>/_matrix/client/r0</code>. (PR #430, PR #415, PR #400)</li>
    <li>Updates the client APIs to match r0 of the matrix specification.
<ul>
    <li>All APIs return events in the new event format, old APIs also include the fields needed to parse the event using the old format for compatibility. (PR #402)</li>
    <li>Search results are now given as a JSON array rather than a JSON object (PR #405)</li>
    <li>Miscellaneous changes to search (PR #403, PR #406, PR #412)</li>
    <li>Filter JSON objects may now be passed as query parameters to <code>/sync</code> (PR #431)</li>
    <li>Fix implementation of <code>/admin/whois</code> (PR #418)</li>
    <li>Only include the rooms that user has left in <code>/sync</code> if the client requests them in the filter (PR #423)</li>
    <li>Don't push for <code>m.room.message</code> by default (PR #411)</li>
    <li>Add API for setting per account user data (PR #392)</li>
    <li>Allow users to forget rooms (PR #385)</li>
</ul>
</li>
    <li>Performance improvements and monitoring:
<ul>
    <li>Add per-request counters for CPU time spent on the main python thread. (PR #421, PR #420)</li>
    <li>Add per-request counters for time spent in the database (PR #429)</li>
    <li>Make state updates in the C+S API idempotent (PR #416)</li>
    <li>Only fire <code>user_joined_room</code> if the user has actually joined. (PR #410)</li>
    <li>Reuse a single http client, rather than creating new ones (PR #413)</li>
</ul>
</li>
    <li>Fixed a bug upgrading from older versions of synapse on postgresql (PR #417)</li>
</ul>
