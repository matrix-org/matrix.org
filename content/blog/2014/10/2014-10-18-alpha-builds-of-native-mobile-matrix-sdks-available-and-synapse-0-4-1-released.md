+++
title = "Alpha builds of native mobile Matrix SDKs available... and Synapse 0.4.1 released!!"
path = "/blog/2014/10/18/alpha-builds-of-native-mobile-matrix-sdks-available-and-synapse-0-4-1-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

It's been an incredibly busy few weeks in Matrixland - we've had our heads down rushing to get new stuff ready for today's <a href="http://disrupteuhackathon.challengepost.com">TechCrunch Disrupt London hackathon</a>.

The big news is that we have our first alpha releases of native Mobile SDKs available today for Matrix for iOS & Android! These are entirely new projects - you can check out the SDKs and demo apps (which implement a basic Matrix chatroom client similar to the <a href="http://matrix.org/alpha">webclient demo</a> at:
<ul>
 <li><a href="http://github.com/matrix-org/matrix-ios-sdk">http://github.com/matrix-org/matrix-ios-sdk</a></li>
 <li><a href="http://github.com/matrix-org/matrix-android-sdk">http://github.com/matrix-org/matrix-android-sdk</a></li>
</ul>
We still have a lot of polishing and lipstick to apply to these, but it should be a good starting point for folks who'd like to hack on mobile apps for Matrix! We haven't had a chance to generate appledoc/javadoc for these yet, but we'll post them on matrix.org shortly.

There's also been some work going into restructuring our documentation and finalising the spec - all Matrix generic documentation now lives in a new git project at <a href="http://github.com/matrix-org/matrix-doc">http://github.com/matrix-org/matrix-doc</a>. We're still working on wrapping all the details of the spec into a single canonical document, but it's getting there and should be locked down shortly.

Meanwhile, we're also pleased to announce the new Synapse 0.4 release series of the reference Matrix homeserver. Our focus on Synapse over the last few weeks has been on implementing the remaining pieces of the Matrix security model and getting the server to the point where folks can deploy it properly in production environments.

<b>Synapse 0.4 deliberately breaks backwards compatibility on the server-server federation protocol</b>, as we now cryptographically sign all federation traffic at the HTTP layer (using Authorization headers) in order to have a strong assertion to the identity of the servers which exchange traffic. We can't really use SSL client/server certificates for this as it's incompatible with Synapse deployments which are hosted behind generic SSL loadbalancers.

Meanwhile we have two other major development branches on Synapse which will land shortly - one of which <a href="https://github.com/matrix-org/synapse/tree/event_signing">cryptographically signs all events</a>, thus preventing tampering with room history, and the other of which performs <a href="https://github.com/matrix-org/synapse/tree/federation_authorization">strict authorization</a> on all traffic received through federation to avoid malicious events being injected and breaking the consistency of the distributed room. These should be landing shortly - at which point the full security model of Matrix will be implemented in Synapse and we can finally remove the "don't use this in production!" warnings!

API developers: be aware that this release also fixes the confusion over timestamps in the client-server (and server-server) API. Events now have only one well-defined timestamp - event.origin_server_ts; the localtime on the homeserver which first receives a message. This replaces the previous confusing event.ts and event.content.hsob_ts timestamps. This should be a trivial change to implement.

Finally, we've also had a detour into <a href="http://trossenrobotics.com/phantomx-ax-hexapod.aspx">robotics</a> to build our new mascot (Sentinel)... pictures forthcoming shortly!

Thanks for supporting Matrix - please let us know how you get on with the new releases at <a href="http://matrix.org/alpha">#matrix:matrix.org!</a>

## Changes in synapse 0.4.1 (2014-10-17)

Webclient:

* Fix bug with display of timestamps.

## Changes in synpase 0.4.0 (2014-10-17)

This release includes changes to the federation protocol and client-server API
that is not backwards compatible.

The Matrix specification has been moved to a separate git repository:
<http://github.com/matrix-org/matrix-doc>

You will also need an updated syutil and config. See UPGRADES.rst.

Homeserver:

* Sign federation transactions to assert strong identity over federation.
* Rename timestamp keys in PDUs and events from 'ts' and 'hsob_ts' to 'origin_server_ts'.
