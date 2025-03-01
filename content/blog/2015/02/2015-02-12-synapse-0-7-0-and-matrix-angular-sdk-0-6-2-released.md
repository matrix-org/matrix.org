+++
title = "Synapse 0.7.0 and matrix-angular-sdk 0.6.2 released!"
path = "/blog/2015/02/12/synapse-0-7-0-and-matrix-angular-sdk-0-6-2-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

We just pushed out a major new release of <a href="http://github.com/matrix-org/synapse">Synapse 0.7.0</a>, the python reference server for Matrix, and a minor maintenance update for <a href="http://github.com/matrix-org/matrix-angular-sdk">matrix-angular-sdk 0.6.2</a>, the reference web client implementation.

The emphasis here has been on federation performance and stability - with all the recent interest from <a href="https://fosdem.org/2015/schedule/event/matrix/">FOSDEM</a> and <a href="http://lwn.net/Articles/632572">LWN</a> and <a href="https://news.ycombinator.com/item?id=8997844">HackerNews</a> we've been getting a lot of traffic on matrix.org and new servers federating up, so we've been busy profiling and fixing performance on some of the hot paths by adding in-memory caches and similar.

<b>This release is *highly* recommended if you are running a federated server, as it fixes many denial-of-service failure modes in the federation implementation, as well as many performance improvements</b>

Behind the scenes, there's also lots of work going on for v2 of the Client-Server API (which lets you filter the events your client subscribes to in a room, and combines the 'initial sync' and 'eventstream' APIs into a single simplified '/sync' API) - the alpha of this has landed in 0.7.0, but we don't recommend trying to use it yet. Meanwhile the Application Service API is effectively finished, but hasn't landed on the master branch yet. Synapse also finally has initial support for push notifications for the iOS client now via the <a href="http://github.com/matrix-org/sygnal">sygnal</a> APNS gateway, although we need to actually document how to set this up to be usable in general.

Finally, we have switched to recommending that synapse is installed in a virtualenv rather than into ~/.local, due to various problems with how setup.py's dependency management works. Instructions on setting up a virtualenv can be found in the <a href="http://github.com/matrix-org/synapse/README.rst">README</a>.

On the clientside: we've improved performance, enabled identicons for unknown users, and now fully support OpenWebRTC for VoIP calling from Safari, Bowser, and other OpenWebRTC-capable browsers!

Thanks to everyone running servers - please upgrade, tell your friends, and help us grow Matrix!

<pre>
Changes in synapse v0.7.0 (2015-02-12)
======================================

* Add initial implementation of the query auth federation API, allowing
  servers to agree on whether an event should be allowed or rejected.
* Persist events we have rejected from federation, fixing the bug where
  servers would keep requesting the same events.
* Various federation performance improvements, including:
  - Add in memory caches on queries such as:
     * Computing the state of a room at a point in time, used for
       authorization on federation requests.
     * Fetching events from the database.
     * User's room membership, used for authorizing presence updates.
  - Upgraded JSON library to improve parsing and serialisation speeds.
* Add default avatars to new user accounts using pydenticon library.
* Correctly time out federation requests.
* Retry federation requests against different servers.
* Add support for push notifications and push rules.
* Add alpha versions of proposed new CSv2 APIs, including ``/sync`` API.

</pre>
<pre>
Changes in Matrix Angular SDK 0.6.2 (2015-02-12)
================================================
Bug fixes:
 - Fixed a bug which caused OpenWebRTC to occasionally fail.
 - Fixed a bug which caused multiple room initial syncs to occur in rapid
   succession.

Features:
 - Display a "Joining Room" dialog when joining rooms.
 - Display identicons for users with no avatar.
 - Display m.notice events with full formatting.
 - Add push notification rules to settings.

Improvements:
 - Modified the red/blue notification colours to be more noticeable on a wider
   range of displays.
 - Highlight room invitations in blue.
 - Calculate room names for rooms of 3+ members.
 - Improved page load performance.

</pre>
