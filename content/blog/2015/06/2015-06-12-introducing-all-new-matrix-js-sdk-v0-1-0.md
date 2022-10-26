+++
title = "Introducing all new matrix-js-sdk v0.1.0"
path = "/blog/2015/06/12/introducing-all-new-matrix-js-sdk-v0-1-0"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

If things seem a bit quiet here at the moment it's because most of the Matrix team is in the 'build' phase across the board on a bunch of major new projects - including the long-awaited reusable UI component library for the Web, end-to-end encryption support, stable VoIP on mobile and a few other surprises.  The first wave of all this new work landed today in the form of a new major version release (0.1.0) of <a href="https://github.com/matrix-org/matrix-js-sdk">matrix-js-sdk</a>: our javascript SDK library.

The history of JS client support on Matrix is that in the original rush to get a PoC webclient out the door back in September, we jumped straight to talking to the Matrix HTTP API from Angular controllers in 'syweb'.  This then got split into an Angular SDK (<a href="https://github.com/matrix-org/matrix-angular-sdk">matrix-angular-sdk</a>) containing a bunch of services for handling the Matrix client state with the actual webapp sitting alongside as an example of the SDK.  This then in turn got split into a basic matrix-js-sdk (wrapping the Matrix client-server HTTP API) and matrix-angular-sdk (handling the clientside state and exposing it as Angular services) - and this is how the current demo Angular webapp works at <a href="http://matrix.org/beta">http://matrix.org/beta</a>.

However, this poses a major problem if you want a richer client SDK but don't want to use Angular - e.g. if you prefer another framework (or no framework at all), or are using the SDK in an Application Service or similar.  So, this has prompted a major upgrade to the matrix-js-sdk in order to extend it to act both as a simple wrapper of the Matrix Client-Server HTTP API, but also expose a full object and event model to describe the state of a Matrix client together with all the higher level functions to drive it.  To quote from the <a href="https://github.com/matrix-org/matrix-js-sdk/blob/master/README.md">README</a>:

> This SDK provides a full object model around the Matrix Client-Server API and emits events for incoming data and state changes. Aside from wrapping the HTTP API, it:
>
> <ul>
> <li>Handles syncing (via /initialSync and /events)</li>
> <li>Handles the generation of "friendly" room and member names.</li>
> <li>Handles historical RoomMember information (e.g. display names).</li>
> <li>Manages room member state across multiple events (e.g. it handles typing, power levels and membership changes).</li>
> <li>Exposes high-level objects like Rooms, RoomState, RoomMembers and Users which can be listened to for things like name changes, new messages, membership changes, presence changes, and more.</li>
> </ul>
>
> Later versions of the SDK will:
>
> <ul>
> <li>Automatically retry requests to send messages due to network errors.</li>
> <li>Automatically retry requests to send messages due to rate limiting errors.</li>
> <li>Mark events' sent status (e.g. 'not sent').</li>
> <li>Handle "local echo" of messages sent.</li>
> <li>Handle queueing of messages.</li>
> <li>Handle pagination.</li>
> <li>Expose a RoomSummary which would be suitable for a recents page.</li>
> <li>Provide different pluggable storage layers (e.g. local storage, database-backed)</li>
> </ul>

It also is designed to provide an API that abstracts both version 1 of the client-server API and the upcoming version 2 (which fixes various thinkos we've discovered along the way in v1).

This is incredibly exciting stuff as it now gives a really robust yet lightweight API for client-side and application-service development in JavaScript.  Predictably enough we're using it to develop our new reusable web UI components, and I suspect we'll see new Node-based application services making use of in the near future.  Meanwhile, it's more than topical as it should run straight on top of the <a href="http://tessel.io">Tessel</a> JavaScript hardware modules we're giving away this weekend as our prize for the best hack built on Matrix at <a href="/blog/2015/06/05/global-tadhack-hackathon/">TADHack</a> - letting the little Tessel ARM system-on-a-chip speak a very rich and native Matrix dialect!

The new matrix-js-sdk comes with comprehensive jsdoc detailing the new API which you can find at <a href="http://matrix-org.github.io/matrix-js-sdk/global.html">http://matrix-org.github.io/matrix-js-sdk/global.html</a>.  There are also some <a href="https://github.com/matrix-org/matrix-js-sdk/tree/master/examples">basic examples</a> available, including a new simple node-powered command-line client designed for testing the SDK.  Finally, if you're interested in reading the design process by which we've converged on the current API, all the details may be found in JIRA on <a href="/jira/browse/SYJS-5">SYJS-5</a>.

So: if you've been itching to get your hands on a much more powerful pure-JS Matrix SDK, now's your chance!  It's very early days for the new API so we expect to see a few incompatible changes on the horizon, but we encourage you to have a play and <a href="http://matrix.org/beta/#/room/#matrix:matrix.org">tell us what you think!</a>.

To find out more, go check out the project at <a href="http://github.com/matrix-org/matrix-js-sdk">http://github.com/matrix-org/matrix-js-sdk</a>, or if you're feeling daring just grab the library with <code>npm install matrix-js-sdk</code> and get hacking!
