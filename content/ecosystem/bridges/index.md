+++
title = "Bridges"
weight = 2
template = "ecosystem/bridges.html"
extra.summary = """
Bridges allow you to connect Matrix to a third-party platform, and interact
seamlessly.
"""
+++

An important idea in Matrix is *Interoperability*. This means that Matrix is open to exchanging data and messages with other platforms using an <a href="https://matrix.org/docs/spec">Open Standard</a>. We refer to the connection to other platforms as *bridging*.

For a thorough examination of the different methods of bridging, and a discussion of the terminology involved, check out *[How do I bridge thee? Let me count the ways...](https://matrix.org/blog/2017/03/11/how-do-i-bridge-thee-let-me-count-the-ways)*

**Portal rooms**: these control chunks of room aliases namespace. For example, <code>#freenode_*#channelname*:matrix.org</code> corresponds to *#channelname* on Freenode. In this way, Matrix users can transparently join IRC channels on Freenode. Portal rooms are typically managed by the remote network's side of the room.

**Plumbed rooms**: these rooms are "plumbed" into one or more specific remote rooms by configuring a bridge (which can be run by anyone). For instance, #matrix:matrix.org is plumbed into #matrix on Freenode, matrixdotorg/#matrix on Slack, etc. Access control for Matrix users is necessarily managed by the Matrix side of the room. This is useful for using Matrix to link together different communities.

**Bridgebot-style:** in this case, messages in either direction are conveyed by a bot residing on the given platform. This is a sub-optimal experience because metadata is lost. For example, all messages might be sent by the same bot, but with the message text prefixed with the name of the original sender.

**Puppeting**: solves the problems of Bot-based bridging by "puppeting", meaning controlling, a user on the other side of the bridge. This means that to native users, they see messages as being sent from the correct sender. **Double-puppeting** means this is done in both directions of the bridge. This is the most preferred way of implementing a Matrix bridge.
