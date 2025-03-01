+++
title = "An Adventure in IRC-Land"
path = "/blog/2017/03/14/an-adventure-in-irc-land"

[taxonomies]
author = ["Kegan Dougal"]
category = ["General"]
+++

Hi everyone. I'm Kegan, one of the core developers at matrix.org. This is the first in a series on the matrix.org IRC bridge. The aim of this series is to try to give a behind the scenes look at how the IRC bridge works, what kinds of problems we encountered, and how we plan to scale in the future. This post looks at how the IRC bridge actually works.

Firstly, what is "bridging"? The simple answer is that it is a program which maps between different messaging protocols so that users on different protocols can communicate with each other. Some protocols may have features which are not supported in the other (typing notifications in Matrix, DCC - <em>direct</em> file transfers - in IRC). This means that bridging will always be "inferior" to just using the respective protocol. That being said, where there is common ground a bridge can work well; all messaging protocols support sending and receiving text messages for example. As we'll see however, the devil is in the detail...

A lot of existing IRC bridges for different protocols share one thing in common: they use a single global bot to bridge traffic. This bot listens to all messages from IRC, and sends them to the other network. The bot also listens for messages from users on the other network, and sends messages on their behalf to IRC. This is a lot easier than having to maintain dedicated TCP connections for each user. However, it isn't a great experience for IRC users as they:
<ul>
  <li>Don't know who is reading messages on a channel as there is just 1 bot in the membership list.</li>
  <li>Cannot PM users on the other network.</li>
  <li>Cannot kick/ban users on the other network without affecting everyone else.</li>
  <li>Cannot bing/mention users on the other network easily (tab completion).</li>
</ul>
We made the decision very early on that we would keep dedicated TCP connections for each Matrix user. This means every Matrix user has their own tiny IRC client. This has its own problems:
<ul>
  <li>It involves multiple connections to the IRCd so you need special permission to set up an i:line.</li>
  <li>You need to be able to support identification of individual users (via ident or unique IPv6 addresses).</li>
  <li>With all these connections to the same IRC channels, you need to have some way to identify which incoming messages have already been handled and which have not.</li>
</ul>

### Mapping Rooms

So now that we have a way to send and receive messages, how do we map the rooms/channels between protocols? This isn't as easy as you may think. We can have a single static one-to-one mapping:
<ul>
  <li>All messages to <code>#channel</code> go to <code>!abcdef:matrix.org</code>.</li>
  <li>All messages from <code>!abcdef:matrix.org</code> go to <code>#channel</code>.</li>
  <li>All PMs between <code>@alice:matrix.org</code> and Bob go to <code>!wxyz:matrix.org</code> and the respective PM on IRC.</li>
</ul>
In order to make PMs secure, we need to limit who can access the room. This is done by making the Matrix PM room "invite-only". This can cause problems though if the Matrix user ever leaves that room: they won't be able to ever re-join! The IRC bridges get around this by allowing Matrix users to <em>replace</em> their dedicated PM room with a new room, and by checking to make sure that the Matrix user is inside the room before sending messages.

Then you have problem of "ownership" of rooms. Who should be able to kick users in a bridged room? There are two main scenarios to consider:
<ul>
  <li>The IRC channel has existed for a while and there are existing IRC channel operators.</li>
  <li>The IRC channel does not exist, but there are existing Matrix moderators.</li>
</ul>
In the first case, we want to defer ownership to the channel operators. This is what happens by default for all bridged IRC channels on matrix.org. The Matrix users have no power in the room, and are at the mercy of the IRC channel operators. The channel operators are represented by virtual Matrix users in the room. However, they do not have any power level: they are at the same level as real Matrix users. Why? The bridge does this because, unlike IRC, it's not possible in Matrix to bring a user to the same level as yourself (e.g <code>+o</code>), and then downgrade them back to a regular user (e.g. <code>-o</code>). Instead, the bridge bot itself acts as a custodian for the room, and performs privileged IRC operations (topic changing, kickbans, etc) on the IRC channel operator's behalf.

In the second case, we want to defer ownership to the Matrix moderators. This is what happens when you "provision a room" in Matrix. The bridge will PM a currently online channel operator and ask for their permission to bridge to Matrix. If they accept, the bridge is made and the power levels in the pre-existing Matrix room are left untouched, giving moderators in Matrix control over the room. However, this power doesn't extend completely to IRC. If a Matrix moderator grants moderator powers to another Matrix user, this will not be mapped to IRC. Why? It's not possible for the bridge to give chanops to any random user on any random IRC channel, so it cannot always honour the request. This relies on the humans on either side of the bridge to communicate and map power accordingly. This is done on purpose as there is no 100% perfect mapping between IRC powers and Matrix powers: it's always going to need to compromise which only a human can make.

Finally, there is the problem of one-to-many mappings. It is possible to have two Matrix rooms bridged to the same IRC channel. The problem occurs when a Matrix user in one room speaks. The bridge can easily map that to IRC, but unless it <em>also</em> maps it back to Matrix, the message will never make it to the 2nd Matrix room. The bridge cannot control/puppet the Matrix user who spoke, so instead it creates a virtual Matrix user to represent that <em>real</em> Matrix user and then sends the message into the 2nd Matrix room. Needless to say, this can be quite confusing and we strongly discourage one-to-many mappings for this reason.

### Mapping Messages

Mapping Matrix messages to IRC is rather easy for the most part. Messages are passed from the Homeserver to the bridge via the AS API, and the bridge sends a textual representation of the message to IRC using the IRC connection for that Matrix user. The <a href="https://github.com/matrix-org/matrix-appservice-irc/issues/258">exact form</a> of the text for images, videos and long text can be quite subjective, and there is inevitably some data loss along the way. For example, you can send big text headings, tables and lists in Matrix, but there is no equivalent on IRC. Thankfully, most Matrix users are sending the corresponding markdown and so the formatting can be reasonably preserved by just sending the plaintext (markdown) body.

Mapping IRC messages to Matrix is more difficult: not because it's hard to represent the message in Matrix, but because of the architecture of the bridge. The bridge maintains separate connections for each Matrix user. This means the bridge might have, for example, 5 users (and hence connections) on the <em>same channel</em>. When an IRC user sends a message, the bridge gets 5 copies of the message. How does the bridge know:
<ul>
  <li>If the message has already been sent?</li>
  <li>If the message is an intentional duplicate?</li>
</ul>
The IRC protocol does not have message IDs, so the bridge cannot de-duplicate messages as they arrive. Instead, it "nominates" a single user's connection to be responsible for delivering messages from that channel. This introduces another problem though. Long-lived TCP connections are fickle things, and can fail without any kind of visible warning until you try to send bytes down it. If a user's connection drops, another user needs to take over responsibility for delivering messages. This is what the "IRC Event Broker" class does. It allows users to "steal" messages if the bridge has any indication that the connection in charge has dropped. This technique has worked well for us, and gives us the ability to have more robust connections to the channel than with one TCP connection alone.

### Admin Rooms

Admin rooms are private Matrix rooms between a real Matrix user and the bridge bot. It allows the Matrix user to control their connection to IRC. It allows:
<ul>
  <li>The IRC nick to be changed.</li>
  <li>The ability to issue /whois commands.</li>
  <li>The ability to bypass the bridge and send raw IRC commands directly down the TCP connection (e.g. MODE commands).</li>
  <li>The ability to save a NickServ password for use when the bridge reconnects you.</li>
  <li>The ability to disconnect from the network entirely.</li>
</ul>
To perform these actions, Matrix users send a text message which starts with a command name, e.g <code>!whois $ARG</code>. Like all commands, you expect to get a reply once you've issued it. However, IRC makes this extremely difficult to do. There is no request/response pair like there is with HTTP requests. Instead, the IRC server may:
<ul>
  <li>Ignore the request entirely.</li>
  <li>Send an error you're aware of (in the RFC/most servers)</li>
  <li>Send some information which can be assumed to indicate success.</li>
  <li>Send an error you're unaware of.</li>
  <li>Send some information which <em>sometimes</em> indicates success.</li>
</ul>
This makes it very difficult to know if a request succeeded or failed, and I'll go into more detail in the next post which focuses on problems we've encountered when developing the IRC bridge. This room is also used to inform the Matrix user about general information about their IRC connection, such as when their connection has been lost, or if there are any errors (e.g. "requires chanops to do this action"). The bridge makes no effort to parse these errors, because it doesn't always know what caused the error to happen.

### Wrapup

Developing a comprehensive IRC bridge is a very difficult task. This post has outlined a few of the ways in which we've designed our bridge, and some of the general problems in this field. The bridge is constantly improving as we discover new edge cases with the plethora of IRCd implementations out there. The next post will look at some of these edge cases and look back at some previous outages and examine why they occurred.
