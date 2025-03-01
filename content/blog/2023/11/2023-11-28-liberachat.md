+++
date = "2023-11-28"
title = "Shutting down the Matrix bridge to Libera Chat"
path = "/blog/2023/11/28/shutting-down-bridge-to-libera-chat"

[taxonomies]
author = ["Josh Simmons"]
category = ["Bridges"]

+++

Today we are sorry to announce that we are not able to bring the Libera Chat bridge back online. We have already begun working through clean up tasks, such as clearing ghosts, and expect to be done by December 22. If you see any bridge artifacts left past that point, please let us know.

If you are one of those who have relied on the bridge in the past, you may be asking: what now? You do have options.

People who need a bridge for their community can [run their own](https://matrix.org/ecosystem/bridges/irc/): the matrix-appservice-irc software is still maintained. Only its Libera Chat instance, which was configured to persist connections across restarts, is being shut down. Please be mindful of the network, and read [Libera Chat’s recommendations](https://libera.chat/guides/faq#are-bridges-allowed) and [their Matrix FAQ](https://libera.chat/guides/matrix) when doing so.

<!-- more -->

## Background

We at the Matrix.org Foundation have been working behind the scenes for months with the team at Element who operated the bridge and our peers at Libera Chat. Our hope had been to address the issues that were raised about the bridge to the satisfaction of Libera and to quickly bring it back online, but ultimately the Foundation is only a facilitator in the process and does not have the resources to maintain and operate the bridge itself.

We know that many communities and individuals were relying on the bridge, and we regret the impact this situation has on them.

To date, development, maintenance, and operation of the Libera Chat bridge had been donated to the community by teams at Element. We are grateful for their work and ongoing support, and understand that limited staffing has impacted their ability to consistently prioritize work on this bridge.

Over the course of the last couple of years of operating the bridge, issues had been raised and work undertaken to address those issues to the extent possible with available resources.

Transparently, the complexity of the work meant that we didn’t get the desired results as quickly as any involved party would’ve liked. Given that, the teams came to mutual agreement to turn the bridge off until key improvements were made and verified.

It’s possible that the necessary work will be undertaken at some point, and Element has made it clear that they would like to make this happen. But with so many people wondering about the status and trying to make plans, we owe it to the impacted communities to provide more certainty than we’ve offered to date.

Long term, the Foundation’s hope is to have the resources to service its core programs as well as provide additional community services like bridge maintenance and operations. However, as an open source foundation that is still early in its journey, we must be realistic about our capacity and make hard choices about where we put our scarce resources.

We thank all of the involved parties for their commitment to doing right by the community and are sorry that we don’t have better news to offer at this time.
