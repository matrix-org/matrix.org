+++
title = "The matrix.org IRC bridge now bridges all of Freenode!"
path = "/blog/2015/06/22/the-matrix-org-irc-bridge-now-bridges-all-of-freenode"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

We've been running an IRC gateway from Matrix to Freenode almost since day 1 - originally it was a <a href="/blog/project/perl-matrix-ircbridge/">simple perl bot</a> written by tm604 using Net::Async::Matrix; later it was rewritten by LeoNerd to be a bit more modular, and nowadays it's a full <a href="https://github.com/matrix-org/matrix-appservice-irc">IRC/Matrix Application Service</a> written in Node.js by Kegan.

Up until the end of last week the bridge was limited to synchronising a fixed number of channels between Freenode and Matrix (#matrix, #matrix-dev, #openwebrtc, #vuc and #hypothes.is, to be precise), as well as any PMs.  But as of Friday, with huge thanks to the admins over at Freenode, we can now bridge *any* channel in Freenode through to Matrix.

Doing this is trivial - you just `/join #freenode_#channelname:matrix.org` from a typical Matrix client - e.g. `/join #freenode_#Node.js:matrix.org` will give you access to all of #Node.js via Matrix, effectively using Matrix as a great big distributed IRC bouncer in the sky ;)

There are a few limitations in the current setup:

* We only incrementally synchronise the membership lists when folks speak in either IRC or Matrix.  This is to avoid flooding either IRC or Matrix with lurkers when the bridge initially joins a channel.  We have some plans to improve this in future - see <a href="/jira/browse/BOTS-53">BOTS-53</a> for some of the sordid details.
* We don't synchronise joins/parts currently to avoid flooding Matrix with lots of IRC join/part spam.  Again, this will improve in future.
* You can't join +k channels.
* Kicks/bans/invites and other ACLs currently don't propagate between IRC & Matrix.  (I.e. a Matrix user can be kicked from IRC, but it'll continue to sit in Matrix unless also kicked for there).  +i chanmode supported however.
* Bridged public IRC rooms are not yet advertised in the public room list on matrix.org.
* It should be possible to change the nickname of your IRC user by messaging <code>!nick irc.freenode.net MrFlibble</code> to @appservice-irc:matrix.org.  (This isn't actually turned on right now, but should be fixed shortly.  See <a href="https://github.com/matrix-org/matrix-appservice-irc/blob/master/HOWTO.md#changing-nicks">https://github.com/matrix-org/matrix-appservice-irc/blob/master/HOWTO.md#changing-nicks</a> for details.

We'll keep chipping away at making the IRC<->Matrix mapping perfect, but in its current state it's still really usable.  It's obviously beta still, but please give it a go and let us know in #matrix:matrix.org how you get on with it!
