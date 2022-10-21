+++
title = "How do I bridge thee?  Let me count the ways..."
path = "/blog/2017/03/11/how-do-i-bridge-thee-let-me-count-the-ways"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

<a href="https://xkcd.com/1810"><img class="aligncenter wp-image-2297" src="/blog/wp-content/uploads/2017/03/xkcd1810-matrixified-v2-1024x842.png" width="753" height="619" /></a>
<p id="types-of-bridging">Bridges come in many flavours, and we need consistent terminology within the Matrix community to ensure everyone (users, developers, core team) is on the same page. This post is primarily intended for bridge developers to refer to when building bridges.</p>
<em>The most recent version of this document is <a href="/docs/guides/types-of-bridging.html">here</a> (<a href="https://github.com/matrix-org/matrix-doc/blob/master/supporting-docs/guides/2017-03-11-types-of-bridging.md">source</a>) but we're also posting it as a blog post for visibility.</em>
<h3 id="types-of-rooms">Types of rooms</h3>
<h4>Portal rooms</h4>
Bridges can register themselves as controlling chunks of room aliases namespace, letting Matrix users join remote rooms transparently if they `/join #freenode_#wherever:matrix.org` or similar. The resulting Matrix room is typically automatically bridged to the single target remote room. Access control for Matrix users is typically managed by the remote network's side of the room. This is called a portal room, and is useful for jumping into remote rooms without any configuration needed whatsoever - using Matrix as a ‘bouncer' for the remote network.
<h4 id="plumbed-rooms">Plumbed rooms</h4>
Alternatively, an existing Matrix room can be can plumbed into one or more specific remote rooms by configuring a bridge (which can be run by anyone). For instance, #matrix:matrix.org is plumbed into #matrix on Freenode, matrixdotorg/#matrix on Slack, etc. Access control for Matrix users is necessarily managed by the Matrix side of the room. This is useful for using Matrix to link together different communities.

Migrating rooms between a portal &amp; plumbed room is currently a bit of a mess, as there's not yet a way for users to remove portal rooms once they're created, so you can end up with a mix of portal &amp; plumbed users bridged into a room, which looks weird from both the Matrix and non-Matrix viewpoints. https://github.com/matrix-org/matrix-appservice-irc/issues/387 tracks this.
<h3 id="types-of-bridges-simplest-first">Types of bridges (simplest first):</h3>
<h4 id="bridgebot-based-bridges">Bridgebot-based bridges</h4>
The simplest way to exchange messages with a remote network is to have the bridge log into the network using one or more predefined users called bridge bots - typically called MatrixBridge or MatrixBridge[123] etc. These relay traffic on behalf of the users on the other side, but it's a terrible experience as all the metadata about the messages and senders is lost. This is how the <a href="https://github.com/SijmenSchoon/telematrix">telematrix</a> matrix&lt;-&gt;telegram bridge currently works.
<h4 id="bot-api-aka-virtual-user-based-bridges">Bot-API (aka Virtual user) based bridges</h4>
Some remote systems support the idea of injecting messages from ‘fake' or ‘virtual' users, which can be used to represent the Matrix-side users as unique entities in the remote network. For instance, Slack's inbound webhooks lets remote bots be created on demand, letting Matrix users be shown cosmetically correctly in the timeline as virtual users. However, the resulting virtual users aren't real users on the remote system, so don't have presence/profile and can't be tab-completed or direct-messaged etc. They also have no way to receive typing notifs or other richer info which may not be available via bot APIs. This is how the current <a href="https://github.com/matrix-org/matrix-appservice-slack">matrix-appservice-slack</a> bridge works.
<h4 id="one-way-puppeted-bridge">Simple puppeted bridge</h4>
This is a richer form of bridging, where the bridge logs into the remote service as if it were a real 3rd party client for that service. As a result, the Matrix user has to already have a valid account on the remote system. In exchange, the Matrix user ‘puppets' their remote user, such that other users on the remote system aren't even aware they are speaking to a user via Matrix. The full semantics of the remote system are available to the bridge to expose into Matrix. However, the bridge has to handle the authentication process to log the user into the remote bridge.

This is essentially how the current <a href="https://github.com/matrix-org/matrix-appservice-irc">matrix-appservice-irc</a> bridge works (if you configure it to log into the remote IRC network as your ‘real' IRC nickname). <a href="https://github.com/matrix-org/matrix-appservice-gitter">matrix-appservice-gitter</a> is being extended to support both puppeted and bridgebot-based operation. It's how the experimental <a href="https://github.com/matrix-org/matrix-appservice-tg">matrix-appservice-tg</a> bridge works.

Going forwards we're aiming for all bridges to be at least simple puppeted, if not double-puppeted.
<h4 id="two-way-puppeted-bridge">Double-puppeted bridge</h4>
A simple ‘puppeted bridge' allows the Matrix user to control their account on their remote network. However, ideally this puppeting should work in both directions, so if the user logs into (say) their native telegram client and starts conversations, sends messages etc, these should be reflected back into Matrix as if the user had done them there. This requires the bridge to be able to puppet the Matrix side of the bridge on behalf of the user.

This is the holy-grail of bridging; <a href="https://github.com/matrix-hacks/matrix-puppet-bridge">matrix-puppet-bridge</a> is a community project that tries to facilitate development of double puppeted bridges, having done so for <a href="https://github.com/matrix-hacks/matrix-puppet-bridge#examples">several networks</a>. The main obstacle is working out an elegant way of having the bridge auth with Matrix as the matrix user (which requires some kind of scoped access_token delegation).
<h4 id="server-to-server-bridging">Server-to-server bridging</h4>
Some remote protocols (IRC, XMPP, SIP, SMTP, NNTP, GnuSocial etc) support federation - either open or closed. The most elegant way of bridging to these protocols would be to have the bridge participate in the federation as a server, directly bridging the entire namespace into Matrix.

We're not aware of anyone who's done this yet.
<h4 id="sidecar-bridge">Sidecar bridge</h4>
Finally: the types of bridging described above assume that you are synchronising the conversation history of the remote system into Matrix, so it may be decentralised and exposed to multiple users within the wider Matrix network.

This can cause problems where the remote system may have arbitrarily complicated permissions (ACLs) controlling access to the history, which will then need to be correctly synchronised with Matrix's ACL model, without introducing security issues such as races. We already see some problems with this on the IRC bridge, where history visibility for +i and +k channels have to be carefully synchronised with the Matrix rooms.

You can also hit problems with other network-specific features not yet having equivalent representation in the Matrix protocol (e.g. ephemeral messages, or op-only messages - although arguably that's a type of ACL).

One solution could be to support an entirely different architecture of bridging, where the Matrix client-server API is mapped directly to the remote service, meaning that ACL decisions are delegated to the remote service, and conversations are not exposed into the wider Matrix. This is effectively using the bridge purely as a 3rd party client for the network (similar to Bitlbee). The bridge is only available to a single user, and conversations cannot be shared with other Matrix users as they aren't actually Matrix rooms. (Another solution could be to use Active Policy Servers at last as a way of centralising and delegating ACLs for a room)

This is essentially an entirely different product to the rest of Matrix, and whilst it could be a solution for some particularly painful ACL problems, we're focusing on non-sidecar bridges for now.
