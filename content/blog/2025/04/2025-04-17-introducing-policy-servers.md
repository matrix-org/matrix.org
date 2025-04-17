+++
date = "2025-04-17T17:00:00Z"
title = "Introducing Policy Servers"

[taxonomies]
author = ["Jim Mackenzie, VP Trust & Safety — The Matrix.org Foundation"]
category = ["General", "Trust & Safety", "Policy"]
+++

Last week, we shared details about [ongoing attacks on Matrix](https://matrix.org/blog/2025/04/11/this-week-in-matrix-2025-04-11/#dept-of-trust-safety-ok-woman). Over the past week or so, we’ve tested some new tooling to help combat abuse on matrix.org.

If you run your own Synapse server and your users are present in the Foundation’s community rooms, you can benefit from this tooling by installing an experimental Synapse module. You can find the code and installation instructions [here](https://github.com/element-hq/policyserv_spam_checker). We’re deliberately taking the bold step of announcing a tool and also announcing its deprecation in the same post. This is experimental work, and we are iterating quickly. We expect to have an implementation in Synapse shortly, so the module will be discontinued around May 21.

## What are policy servers?

Policy servers are an overlapping layer of protection with existing community moderation tools such as [Draupnir](https://github.com/the-draupnir-project/Draupnir), [Mjolnir](https://github.com/matrix-org/mjolnir) and [Meowlnir](https://github.com/maunium/meowlnir). Rooms can opt-in to this new layer of protection, recommending that servers participating in the room check events with a given policy server *before* they are sent to their clients. The policy server will pass an opinion on each event, recommending servers in the room to accept the event, or to reject it. For people in the room, this should be effectively invisible. Events which pass the check will be shown as normal, while ones which don’t will never make it through to their clients.

The Foundation intends to offer a policy server to room admins, but we hope that in time other providers will offer alternative policy servers. The Foundation is already running an experimental implementation for some of its public rooms, which we will release once we have confidence in the approach. We also expect that for many rooms, a policy server isn’t necessary, or spends most of the time in a low-power or disabled state. Element and the Foundation are exploring these ideas over the coming weeks.

## Get involved


[MSC4284](https://github.com/matrix-org/matrix-spec-proposals/pull/4284) is now open to support this work. Please get involved in the MSC, and help us to improve this addition to safety tooling for the network. We’d especially like to see implementations for non-Synapse servers.

Folks who run communities on Matrix who would like to test our policy server, reach out to us at abuse@matrix.org, using the subject `policy-server-alpha`.
