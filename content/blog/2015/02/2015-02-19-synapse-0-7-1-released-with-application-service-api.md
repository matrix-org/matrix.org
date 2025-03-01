+++
title = "Synapse 0.7.1 released - with Application Service API"
path = "/blog/2015/02/19/synapse-0-7-1-released-with-application-service-api"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

We released Synapse 0.7.1 this morning - <strong>This release includes more critical federation stability and performance updates - please upgrade as soon as you can!</strong>.  You can get the code and installation instructions from <a href="http://github.com/matrix-org/synapse">http://github.com/matrix-org/synapse</a> as normal.

<b>Update:</b> You can also install and run Synapse now via <a href="http://docker.com">Docker</a>, thanks to a Dockerfile at <a href="https://registry.hub.docker.com/u/silviof/docker-matrix/">https://registry.hub.docker.com/u/silviof/docker-matrix/</a> contributed today by Silvio Fricke.  Thanks Silvio!!

Other than the federation improvements, the big new feature that lands here is the long-awaited Application Service API.  This is a set of simple extensions to the Client-Server API to make it much easier to build powerful gateways and other application logic on top of Matrix.  You can think of it being somewhere between IRC Services, IMS application services and XMPP components - but with the simplicity of an IRC bot.  The extensions let you register application services as privileged Matrix clients, and create virtual users and virtual rooms in bulk within Matrix (e.g. bridging an entire IRC network into Matrix).  The API also lets your application service receive inbound events as HTTP pushes rather than having to poll.  The end result is that it's suddenly become <strong>a lot</strong> easier to bridge existing communities with Matrix!

We'll post another blog post shortly to give a lot more information; in the interim you can read more about it in the newly updated spec at <a href="http://matrix.org/docs/spec/#application-service-api">http://matrix.org/docs/spec/#application-service-api</a>.

<br/>
<pre>
Changes in synapse v0.7.1 (2015-02-19)
======================================

* Initial alpha implementation of parts of the Application Services API.
  Including:

    * AS Registration / Unregistration
    * User Query API
    * Room Alias Query API
    * Push transport for receiving events.
    * User/Alias namespace admin control

* Add cache when fetching events from remote servers to stop repeatedly
  fetching events with bad signatures.
* Respect the per remote server retry scheme when fetching both events and
  server keys to reduce the number of times we send requests to dead servers.
* Inform remote servers when the local server fails to handle a received event.
* Turn off python bytecode generation due to problems experienced when
  upgrading from previous versions.
  
</pre>
