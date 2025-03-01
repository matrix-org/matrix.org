+++
title = "The All New Matrix-IRC Application Service"
path = "/blog/2015/04/22/matrix-irc-application-service"

[taxonomies]
author = ["Kegan Dougal"]
category = ["Tech"]
+++

<strong>This post has now been edited into a guide - you can find <a href="https://github.com/matrix-org/matrix-doc/blob/master/supporting-docs/guides/2015-08-21-application_services.md">the source in github</a>, and the <a href="http://matrix.org/docs/guides/application_services.html">formatted guide on the matrix.org website</a>!</strong>

<hr />

Like a lot of open source projects, we use IRC a lot. Naturally, we also use Matrix to communicate with each other. For some time now we've had an IRC bot sitting on specific channels to "bridge" together IRC and Matrix. This bot simply sent IRC messages when it received Matrix messages and vice versa. As we started to rely on it more and more though, we realised that there were things that were impossible for simple client-side bots to do by themselves. This spurred the development of Application Services which <a href="/blog/2015/03/02/introduction-to-application-services/">I introduced in my previous post</a>. In this blog post, I want to outline some of the features and techniques of the IRC application service which we've been working on over the past few weeks.

Features:
<ul>
 <li><strong>Specific channel-to-matrix room bridging</strong> : This is what the original IRC bot did. You can specify specific channels and specific room IDs, and messages will be bridged.</li>
 <li><strong>Dynamic channel-to-matrix room bridging</strong> : This allows Matrix users to join any channel on an IRC network, rather than being forced to use one of the specific channels configured.</li>
 <li><strong>Two-way PM support</strong> : IRC users can PM the virtual "M-" users and private Matrix rooms will be created. Likewise, Matrix users can invite the virtual "@irc_Nick:domain" user IDs to a room and a PM to the IRC nick will be made.</li>
 <li><strong>IRC nick changing support </strong>: Matrix users are no longer forced to use "M-" nicks and can change them by sending "!nick" messages directly to the bridge.</li>
 <li><strong>Ident support</strong> : This allows usernames to be authenticated for virtual IRC clients, which means IRC bans can be targeted at the Matrix user rather than the entire application service.</li>
</ul>
The use of the Application Services API means:
<ul>
 <li>The bot can reserve user IDs. This prevents humans from registering for @irc_... user IDs which would then clash with the operation of the bot.</li>
 <li>The bot can reserve room aliases. This prevents humans from register for #irc_... aliases which would then clash with the operation of the bot.</li>
 <li>The bot can trivially manage hundreds of users. Events are pushed to the application service directly. If you tried to do this as a client-side bot, you would need one event stream connection per virtual user.</li>
 <li>The bot can lazily create rooms on demand. This means Matrix users can join non-existent room aliases and have the application service quickly track an IRC channel and create a room with that alias, allowing the join request to succeed.</li>
</ul>
Implementation details:
<ul>
 <li>Written in Node.js, designed to be run using <code>forever</code>.</li>
        <li>Built on the generic <a href="http://github.com/matrix-org/matrix-appservice-node">matrix-appservice-node</a> framework.</li>
 <li>Supports sending metrics in statsd format.</li>
 <li>Uses matrix-appservice-node to provide a standardised interface when writing application services, rather than an explicit web framework (though under the hood matrix-appservice-node is using Express).</li>
</ul>
At present, the IRC application service is in beta, and is being run on #matrix and #matrix-dev. If you want to give it a go, <a title="Matrix-IRC Application Service" href="https://github.com/matrix-org/matrix-appservice-irc">check it out on Github</a> - it is not currently released on npm. <b>N.B. it requires features from the develop branch of synapse; either run your own synapse off the develop branch or wait a few days for us to release Synapse 0.9.0</b>.

Needless to say, we look forward to this being the first of many full network<->network bridges into Matrix - come chat on <a href="/beta/#/room/#matrix:matrix.org">#matrix:matrix.org</a> if you'd like to write or run your own!  Next up is Lync and XMPP...
