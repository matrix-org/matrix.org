+++
title = "Technical FAQ on the Digital Markets Act"
date = "2022-03-30T14:13:00Z"
path = "/blog/2022/03/30/technical-faq-on-the-digital-markets-act"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

We've been flooded with questions about the [DMA](https://www.europarl.europa.eu/news/en/press-room/20220315IPR25504/)
since it was announced last week, and have spotted some of the
gatekeepers jumping to the wrong conclusions about what it might entail.
Just in case you don't want to wade through
yesterday's [sprawling blog post](https://matrix.org/blog/2022/03/29/how-do-you-implement-interoperability-in-a-dma-world/),
we've put together a quick FAQ to cover the most important points based on
our understanding.

### What does DMA mean for the gatekeepers?

The gatekeepers will have to open and document their existing APIs, so that
alternative clients and/or bridges can connect to their service. The DMA
requires that the APIs *must* expose the same level of privacy for remote
users as for local users. So, if their service is end-to-end-encrypted
(E2EE), the APIs must expose the same E2EE semantics (e.g. so that an
alternative client connecting would have to implement E2EE too). For
E2EE-capable APIs to work, the gatekeeper will likely have to model remote
users as if they were local in their system. In the short term (one year
horizon) this applies only to 1:1 chats and file transfers. In the long term
(three year horizon) this applies to group chats and voip calls/conferences
too.

### Who counts as a “gatekeeper”?

The DMA defines any tech company worth over €75B or with over €7.5B of
turnover as a gatekeeper, who must open their communication APIs. This means
only the tech giants are in scope (e.g. as of today that includes Meta,
Apple, Google, Microsoft, Salesforce/Slack - not Signal, Telegram, Discord,
Twitter).

### Does this mean the gatekeepers are being forced to implement an open standard such as Matrix or XMPP?

No. They can keep their existing implementations and APIs. For
interoperability with other service providers, they will need to use a
bridge (which could bridge via a common language such as Matrix or XMPP).

### Are bridges secure?

If the service lacks end-to-end-encryption (Slack, Teams, Google Chat,
non-secret chats on Facebook Messenger, Instagram, Google Messages etc) then
the bridge does not reduce security or privacy, beyond the fact that bridged
conversations by definition will be visible to the bridge and to the service
you are interoperating with.

If the service has E2EE (WhatsApp, iMessage, secret chats on Messenger) then
the bridge will necessarily have to decrypt (and reencrypt, where possible)
the data when passing it to the other service. This means the conversation is
no longer E2EE, and thus less secure (the bridge could be compromised and
inspect or reroute their messages) - and so gatekeepers must warn the user
that their conversation is leaving their platform and is no longer E2EE with
something like this:

<div style="text-align: center">
<!-- markdownlint-disable-next-line no-alt-text -->
<img src="/blog/img/2022-03-29-warning.jpg" width="430"/>
</div>
<br/>

### Why is the DMA good?

The upside is that the user has the freedom to use an infinite number of
services (bots, virtual assistants, CRMs, translation services, etc) as well
as speak to any other user in the world, regardless what platform they use.

It also puts much-needed pressure on the gatekeepers to innovate and
differentiate rather than rely on their network effects to attract new
users - creating a much more vibrant, open, competitive marketplace for
users.

See "[What's driven the DMA?](https://matrix.org/blog/2022/03/29/how-do-you-implement-interoperability-in-a-dma-world#whats-driven-the-dma)"
for more details.

### If the DMA requires that remote users have the same security as local users, how can bridges work?

The DMA requires that the *APIs* expose the same level of security as for
local users - ie E2EE must be exposed. If the users in a conversation choose
to use a bridge and thus reencrypt the messages, then it is their choice to
tradeoff encryption in favour of interoperability for a given conversation.

### Does this undermine the gatekeepers’ current encryption?

Absolutely not. Users talking to other users within the same E2EE-capable
gatekeeper will still be E2EE (assuming the gatekeeper doesn’t pull that rug
from under its users) - and in fact it gives the gatekeepers an excellent way
to advertise the selling point that E2EE is only guaranteed when you speak to
other users on the same platform.

### But why do we need bridges? If everyone spoke a common protocol, you wouldn’t ever have to decrypt messages to convert them between protocols

Practically speaking, we don’t expect the gatekeepers to throw away their
existing stacks (or implement multihead messengers that also speak open
protocols). It’s true that if they natively spoke Matrix or XMPP then the
reencryption problem would go away, but it’s more realistic to focus on
opening the existing APIs than interpret the legislation as a mandate to
speak Matrix. Perhaps in future players will adopt Matrix of their own
volition.

### Where do these bridges come from?

There is already a vibrant community of developers who build unofficial
bridges to the gatekeepers - eg Element, Beeper and hundreds of open source
developers in the Matrix and XMPP communities. Historically these bridges
have been hampered by having to use unofficial and private APIs, making them
a second class citizen - but with open documented APIs guaranteed by the DMA
we eagerly anticipate an explosion of high quality transparent bridges which
will be invisible to the end user.

### Can you run E2EE bridges clientside to make them safer?

Maybe. For instance, current iMessage bridges work by running iMessage on a
local iPhone or Mac and then reencrypting the messages there for
interoperability. Given the messages are already exposed on the client
anyway, this means that E2EE is not broken - and avoids decrypting them on a
server. There is lots of development in this space currently, and with open
APIs guaranteed by DMA the pace should speed up significantly.

### How can you tell what service you should use to talk to a given remote user?

For 1:1 chats this is easy: you can simply ask the user which service they
want to use to talk to a given user, if that user is not already on that
service.

For group chats it is harder, and this is why the deadline for group chats is
years away. The problem is that you need a way to verify the identity of
arbitrary numbers of remote users on  different platforms - effectively
looking up their identity in a secure manner which stops services from
maliciously spoofing identities.

One possible way to solve this would be for users to explicitly link their
identity on one service with that on the gatekeeper’s service - eg “Alice on
AliceChat is talking in the same room as Bob on BobChat; Bob will be asked to
prove to AliceChat that he is the real Bob” - and so if AliceChat has already
validated Bob’s identity, then this can be used to spot him popping up on
other services. It also gives Bob a way to block themselves from ever being
unwittingly bridged to AliceChat.

There are many other approaches too - and the onus is on the industry to
figure out the best solution for decentralised identity in the next 3-4 years
in order to realise the most exciting benefits of the DMA.

---

For a much deeper dive into the above, please check out our post at "[How do you implement interoperability in a DMA world?](https://matrix.org/blog/2022/03/29/how-do-you-implement-interoperability-in-a-dma-world)"
