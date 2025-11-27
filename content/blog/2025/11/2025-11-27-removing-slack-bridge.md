+++
date = "2025-11-27"
title = "Retiring the Slack Bridge on matrix.org"

[taxonomies]
author = ["Amandine Le Pape"]
category = ["Cryptography", "Encryption", "Spec"]
+++

Bridges are one of the reasons Matrix is called Matrix: let’s matrix all the networks together! They are key to onboard new users into the network. However, maintaining and operating bridges, in particular to closed, proprietary platforms, is expensive: they need to be kept up to date with any change made by the platform on a regular basis and they’re fiddly to keep up and running.

<!-- more -->

The Matrix.org Foundation has been hosting a free of charge Slack bridge for users of the matrix.org server for several years. The code of the bridge [belongs to the Foundation](https://github.com/matrix-org/matrix-appservice-slack), hosted under its GitHub workspace, but the bulk of the maintenance was done by Element. Maintaining and operating bridges to closed, proprietary platforms such as Slack comes at a high cost, both financially and in terms of reliability as they are subject to change without notice. The bridge has been unmaintained for some time now, and this has led to degraded functionality and inconsistent performance for users. While we understand that some people still find it useful in certain cases, it is not right to continue providing a service that we know does not meet the standards expected of matrix.org.

This is why, without enough customers paying for it and despite the efforts of the community trying to help, Element will not continue to maintain this bridge. As a result, the Foundation will no longer provide this service to matrix.org users. We want to thank Element for all these years of graciously maintaining a bridge for us.

## What this means for users

The Slack bridge will be removed from **matrix.org** on **December 10**. After this date, rooms connected to Slack will stop receiving new messages, and no new connections will be accepted. Existing messages and room history in Matrix will remain available, but the link to Slack will be closed.

Users who rely on Slack bridging are encouraged to take over its maintenance, find a supplier who can maintain it for them, or [explore alternatives](@/ecosystem/bridges/slack/_index.md). If you operate your own Matrix homeserver, you are able to host your own instance of the Slack bridge or develop one that suits your needs. However, please note that ongoing maintenance will be required to keep such a bridge functioning as Slack evolves its APIs.

The following bridges will remain online.

| Instance | Platform | Project                                                                       |
|----------|----------|-------------------------------------------------------------------------------|
| OFTC     | IRC      | [matrix-appservice-irc](https://github.com/matrix-org/matrix-appservice-irc/) |
| Snoonet  | IRC      | [matrix-appservice-irc](https://github.com/matrix-org/matrix-appservice-irc/) |
| Bifrost  | XMPP     | [matrix-bifrost](https://github.com/matrix-org/matrix-bifrost)                |

## Looking ahead

Bridges are an important part of the Matrix ecosystem. They connect Matrix rooms to conversations on other platforms, helping users communicate without needing to maintain multiple accounts or abandon existing communities. They also help onboard users in the Matrix network. This bridging capability allows Matrix to act as a unifying layer across fragmented chat systems.

Many of these bridges — including those for IRC, WhatsApp, and others — are developed and maintained by community contributors, and we want to acknowledge and thank everyone who has contributed to this ecosystem.

Deprovisioning Slack bridge for matrix.org users does not signal a retreat from the goal of Matrix bridging to other platforms. Bridges remain a valuable part of the Matrix ecosystem, and the Foundation continues to support their development — especially those that connect to open protocols and standards.
