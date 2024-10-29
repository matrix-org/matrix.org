+++
title = "Welcoming Rocket.Chat to Matrix!"
date = "2022-05-30T19:04:12Z"
updated = "2022-05-30T16:16:53Z"
path = "/blog/2022/05/30/welcoming-rocket-chat-to-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/rocketchat.avif"
+++

<div style="text-align: center">
<img src="/blog/img/rocketchat.avif" alt="Rocket.Chat ♥️ Matrix"/>
</div>

Hi folks,

We just wanted to take a moment to welcome [Rocket.Chat](https://rocket.chat) to Matrix, given the [recent announcement](https://rocket.chat/press-releases/rocket-chat-leverages-matrix-protocol-for-decentralized-and-interoperable-communications) that they are switching to using Matrix for standards-based interoperable federation!  This is incredible news: Rocket.Chat is one of the leading open source collaboration platforms with [over 12 million users](https://rocket.chat/company/about-us), and they will all shortly have the option to natively interoperate with the wider Matrix network: the feature has already landed (in alpha) in [Rocket.Chat 4.7.0](https://github.com/RocketChat/Rocket.Chat/releases/tag/4.7.0)!

We’d like to thank the whole Rocket.Chat team for putting their faith in Matrix and joining the network: the whole idea of Matrix is that by banding together, different independent organisations can build an open decentralised network which is far stronger and more vibrant than any closed communication platform.  The more organisations that join Matrix, the [more useful and valuable](https://en.wikipedia.org/wiki/Metcalfe%27s_law) the network becomes for everyone, and the more momentum there is to further refine and improve the protocol.  Our intention is that Matrix will grow into a massive open ecosystem and industry, akin to the open Web itself… and that every organisation participating, be that Rocket.Chat, Element, Gitter, Beeper, Famedly or anyone else will benefit from being part of it. We are stronger together!

Rocket.Chat’s implementation follows the “[How do you make an existing chat system talk Matrix?](https://matrix.org/blog/2020/12/07/gitter-now-speaks-matrix#how-do-you-make-an-existing-chat-system-talk-matrix)” approach we published based on our experiences of linking Gitter into Matrix. Looking at the initial [pull request](https://github.com/RocketChat/Rocket.Chat/pull/23688), the implementation lets Rocket.Chat act as a Matrix Application Service, effectively acting as a bridge to talk to an appropriate Matrix homeserver.  From chatting with the team, it sounds like next steps will involve adding in encryption via our upcoming [matrix-sdk-crypto node bindings](https://github.com/matrix-org/matrix-rust-sdk/issues/699) - and then looking at ways to transparently embed a homeserver like Dendrite, sharing data as much as possible between RC and Matrix, so Rocket.Chat deployments can transparently sprout Matrix interoperability without having to run a separate homeserver.  Super exciting!

You can see a quick preview of a Rocket.Chat user chatting away with an Element user on matrix.org via Matrix here:

<video style="width: 100%" src="/blog/img/164530391-e8b17ecd-a4d0-4ef8-a8b7-81230c1773d3.mp4" controls></video>

So, exciting times ahead - needless to say we’ll be doing everything we can to support Rocket.Chat and ensure their Matrix integration is a success.  And at this rate, they might be distinctly ahead of the curve if they start shipping Dendrite!  Meanwhile, we have to wonder who will be next? Nextcloud? Mattermost? Place your bets… ;)

--Matthew

### Update

Aaron from Rocket.Chat just published an [excellent guide & video tour](https://geekgonecrazy.com/2022/05/30/rocketchat-and-the-matrix-protocol/) for how to actually set up your Rocket.Chat instance with Dendrite to get talking Matrix!

{{ youtube_player(video_id="oQhIH8kql9I") }}
