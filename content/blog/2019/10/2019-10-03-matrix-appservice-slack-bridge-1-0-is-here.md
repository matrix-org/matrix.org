+++
title = "matrix-appservice-slack bridge 1.0 is here!"
path = "/blog/2019/10/03/matrix-appservice-slack-bridge-1-0-is-here"

[taxonomies]
author = ["Half-Shot"]
category = ["General", "Bridges", "Releases"]
+++

Hello Matrix enthusiasts! Yesterday we released [matrix-appservice-slack 1.0](https://github.com/matrix-org/matrix-appservice-slack/releases/tag/1.0.0). This marks a major milestone
in bridge development for the Matrix.org team, being our first bridge to ever reach 1.0. The decision to
release this version came after we decided that the bridge had gained enough features and reached a point
of stability where it could be deployed in the wild with minimal risk.

For those not in the know, the Slack bridge is Node.JS based, and bridges slack channels & users into Matrix
seamlessly. And for those wondering, yes it works with Mattermost too (since their API is compatible with Slack)!
In previous versions only a limited subset of features were supported, making heavy usage of Slack’s
webhook API. As of 1.0, the bridge now makes use of the newer Slack Events/RTM API which gives us all we need for
a richer bridging experience. Everything from edits and reactions to typing notifications is supported in the 1.0 release.

Finally for those who are self hosting, we are pleased to offer the ability to "puppet" your Slack account using the
bridge. Puppeting is the process in which the bridge will send messages as if you were sending them from the Slack client
directly, when you talk using your Matrix account. This opens the door to seamless bridging and direct messaging support.

For those wishing to bridge their whole workspace across, [picard](https://github.com/SolarDrew/skill-picard) exists
as a tool to manage large scale Slack bridge deployments. This tool is provided by [Cadair](https://matrix.to/#/@Cadair:matrix.org) and [SolarDrew](https://matrix.to/#/@SolarDrew:matrix.org)

![Slack Screenshot](/blog/img/2019-10-03-slack1.0-threading.png)
Threading & Reactions!

The bridge has undergone some pretty serious code surgery as well. The whole codebase has been rewritten in
TypeScript to take advantage of type checking and generic types. The bridge is currently based upon the
[matrix-appservice-bridge](https://github.com/matrix-org/matrix-appservice-bridge/) library. The datastore interface now supports PostgreSQL, which allows for administrators to inspect and edit the database while the bridge is running, as well as offering  helpful performance boost over the NeDB datastore format that was used previously. Finally, the codebase has proper Unit and Integration Tests to ensure new changes will not cause any regressions in behaviour. In short, **now is an excellent time to get involved and hack on the bridge**. There is already a [crafted list of easy issues](https://github.com/matrix-org/matrix-appservice-slack/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) for new and experienced bridge devs.

![Grafana memory usage graph](/blog/img/2019-10-03-slack1.0-perfmem.png)
Memory usage of the bridge comparison

![Grafana CPU usage graph](/blog/img/2019-10-03-slack1.0-perfcpu.png)
CPU usage of the bridge comparison

In terms of how many users matrix.org is currently serving at the moment, we present to you some figures:

- 2562 bridged rooms
- 764 teams connected to the bridge
- 103711 events have passed through the bridge since the launch of 0.3.2

Of course, our work doesn’t stop at 1.0. The plan for the immediate future of the bridge
is to continue adding support for other event types coming from Matrix and Slack to create
an ever richer experience. Obvious features are things like topic changes, and syncing membership
across the bridge. In the long term future we would also like to add community support to the bridge,
so whole Slack workspaces can be bridged across with a single click.

That’s all from me, and I would like to say a massive thank you to [Cadair](https://matrix.to/#/@Cadair:matrix.org)
and [Ben](https://matrix.to/#/@benpa:matrix.org) for both their code and review work on the project and as always,
thank you to the community for using the bridge and reporting issues. 🙂

Useful links:

- [Matrix Room](https://matrix.to/#/#matrix_appservice_slack:matrix.org)
- [Project Home](https://github.com/matrix-org/matrix-appservice-slack)
- [Docs](https://matrix-appservice-slack.readthedocs.io/en/stable/)
