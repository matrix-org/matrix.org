+++
date = "2025-12-17"
title = "Sharing a safety tool: announcing policyserv"

[taxonomies]
author = ["Jim Mackenzie, VP Trust & Safety — The Matrix.org Foundation"]
category = ["Foundation", "General", "Trust & Safety"]
+++

In April, we [introduced policy servers](@blog/2025/04/2025-04-17-introducing-policy-servers.md) to help tackle the spread of harmful content on Matrix. Today, we’re announcing that our implementation is available as open source. Say hello to [policyserv](https://github.com/matrix-org/policyserv) v1\!

<!-- more -->

## What do policy servers do?

Policy servers are an extra layer of protection for communities on Matrix. They’re a proactive tool that aims to prevent unwelcome content from ever reaching a room. To do that, a policy server takes Matrix events and checks them against a set of policies. It then returns an opinion for Matrix homeservers to accept or reject the events. Those policies can be simple, such as `you may not send dozens of mentions in a single message`, or more complex. So, a community can pick a policy server to protect them, and then rooms opt-in to use the policy server. From then on, servers participating in the room will send events to the policy server for evaluation *before* showing them to their users. For users in the room, this process should be mostly invisible, and any harmful content rejected before it reaches their clients. 

Policy servers also layer well with existing safety tooling such as [Draupnir](https://github.com/the-draupnir-project/Draupnir), [Meowlnir](https://github.com/maunium/meowlnir) or [Mjolnir](https://github.com/matrix-org/mjolnir). We recommend that communities use one of these —or similar tools— alongside a policy server in case something makes it through the filters. We’ve been running a policy server in the rooms we protect since April, evaluating over 5 million events. As a result, we’ve seen a marked reduction in harmful content in those rooms, reducing the pressure on our frontline safety team.    

## Announcing policyserv v1

We’re now making our [MSC4284](https://github.com/matrix-org/matrix-spec-proposals/pull/4284) implementation available to everyone. This is v1.0.0, so feel free to poke around the code, deploy your own, [sign up to use ours](https://github.com/matrix-org/policyserv-setup-bot?tab=readme-ov-file#usage), or throw code at us\! We’ll also take bug reports, feature/filter requests, and questions about how it all works. Drop by our new [policyserv room](https://matrix.to/#/#policyserv:matrix.org) to send us feedback, or the [issue tracker](https://github.com/matrix-org/policyserv/issues) to let us know what features/bugs we should look at. We’ve already copied our previously-internal issue backlog to help inspire some ideas.

For communities: our implementation of policy servers gives you a base set of filters and default settings, but you can control what you want to use, adjusting them to suit your community norms and needs. You aren’t stuck with our choices\! Please swing by the room and let us know what you learn, and help us to build safer defaults.

For the developers: please feel free to reimplement policyserv in your own (possibly net-new) projects and share the links with us. We’d love to see more policy server implementations in the wild so we can build a safer Matrix network together.

## The future

We’d love to spend some time celebrating the release, but we’ve got some work in front of us now that 1.0.0 is out the door\! We’re expecting to spend time fixing bugs, improving performance, tuning filters and preparing the MSC to join the spec. We’ve also got some ideas for new filters and new features, including [gpt-oss-safeguard](https://roost.tools/blog/a-new-milestone-for-open-source-safety-infrastructure-and-transparency/) support and `http-antispam` support. Finally, we want to [improve the experience](https://github.com/matrix-org/matrix-spec-proposals/pull/4387) when safety tooling rejects your message.
