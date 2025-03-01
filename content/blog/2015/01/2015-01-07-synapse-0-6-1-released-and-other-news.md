+++
title = "Synapse 0.6.1 released and other news!"
path = "/blog/2015/01/07/synapse-0-6-1-released-and-other-news"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Happy 2015 from everyone at Matrix.org!

We're excited to kick off the new year with a major performance upgrade for Synapse: having had a chance to do some profiling over the Christmas break, Synapse 0.6.1 improves performance by up to an order of magnitude thanks to optimising the way events are constructed and manipulated, DB optimisations, etc.  Suddenly things are feeling *much* more snappy and less of a PoC and more of a real system, which hopefully bodes well for 2015!  Please upgrade if you're running a homeserver, or install one if you're not - grab the code from <a href="http://github.com/matrix-org/synapse">http://github.com/matrix-org/synapse</a>.

The iOS SDK and demo app has also been improving lots in the last few weeks - grab the latest code from <a href="http://github.com/matrix-org/matrix-ios-sdk">http://github.com/matrix-org/matrix-ios-sdk</a>.  We have zoomable image support; full support for the new media repository in Synapse 0.6.0; file transfer status UI; offline support; snappy message synchronisation and more...

We also released a new simple Python SDK client library for Python called <a href="https://pypi.python.org/pypi/matrix-client">matrix-client</a>, which is now being used by <a href="https://github.com/Kegsay/Matrix-NEB">NEB</a> (our general-purpose Matrix helper bot).

Meanwhile, our (constantly evolving) plan for the beginning of 2015 is:
<ul>
 <li>Finish v2 of the client-server API based on all the lessons learnt since launch: <a href="https://github.com/matrix-org/matrix-doc/pull/4">draft in progress here</a></li>  
        <li>Finish the Application Services API to allow proper gateways and services in and out of Matrix at last:<a href="https://github.com/matrix-org/matrix-doc/pull/5">draft in progress here</a></li>
        <li>Re-release the spec based on the above</li>
        <li>Build robust gateways (IRC, XMPP, SIP and more) on top of the AS API</li>
        <li>Polish and release the iOS, Android demo clients - including push notification and VoIP support!</li>
        <li>Overhaul the identity server architecture and add end-to-end crypto</li>
</ul>

Given the rate at which Matrix is maturing, the next few months should be really exciting - please come join us on <a href="http://matrix.org/beta">#matrix:matrix.org</a> and get involved!

<code>
Changes in synapse 0.6.1 (2015-01-07)
=====================================

* Major optimizations to improve performance of initial sync and event sending
   in large rooms (by up to 10x)
* Media repository now includes a Content-Length header on media downloads.
* Improve quality of thumbnails by changing resizing algorithm.

</code>
