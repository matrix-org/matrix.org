+++
title = "Synapse 1.49.0 released"
path = "/blog/2021/12/14/synapse-1-49-0-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

[Synapse 1.49.0](https://github.com/matrix-org/synapse/releases/tag/v1.49.0) is out now!

## Platform deprecations

Synapse 1.49.0 is the last version of Synapse to officially support Python 3.6 and PostgreSQL 9.6. This follows our [platform dependency deprecation policy](https://matrix-org.github.io/synapse/v1.49/deprecation_policy.html).

As a consequence of this, Synapse 1.49.0 is the last version of Synapse to support Ubuntu 18.04 LTS (Bionic Beaver), as it ships with Python 3.6.

On the topic of supported Ubuntu releases, please note that Ubuntu 21.04 (Hirsute Hippo) reaches its own end of life [on January 20, 2022](https://lists.ubuntu.com/archives/ubuntu-announce/2021-December/000275.html). Past this date we will stop producing new packages for Ubuntu 21.04.

## Improved documentation

Up until now, a lot of very useful information was stored on the [Synapse repo's wiki](https://github.com/matrix-org/synapse/wiki), which wasn't well advertised nor well reviewed.

With this release, we have migrated most of this information to Synapse's [documentation website](https://matrix-org.github.io/synapse/latest), so all the information you need to set up, maintain and troubleshoot a Synapse instance lives at the same place. Included in these new pages are the [server admin FAQ](https://matrix-org.github.io/synapse/v1.49/usage/administration/admin_faq.html) and a [guide to Synapse's Grafana dashboard](https://matrix-org.github.io/synapse/v1.49/usage/administration/understanding_synapse_through_grafana_graphs.html).

The [media repository](https://matrix-org.github.io/synapse/v1.49/media_repository.html) documentation has also been updated with a lot of details about how Synapse stores media files.

## Refresh tokens

When a Matrix client needs to authenticate a request to a homeserver, it uses what is called an access token. Sometimes server administrators might not want a user's access token to live forever (e.g. for security reasons). To address this concern, [MSC2918](https://github.com/matrix-org/matrix-doc/pull/2918) introduces the concept of refresh tokens to Matrix.

Initial support for refresh tokens in Synapse was introduced in [version 1.38.0](https://github.com/matrix-org/synapse/releases/tag/v1.38.0). Synapse 1.49.0 finalises and stabilises this implementation, allowing any client that supports this feature to use it as it is currently described in the related MSC.

## Everything else

This release introduces the last changes needed to Synapse for basic threading support. It also introduces support for [MSC3030](https://github.com/matrix-org/matrix-doc/pull/3030), which allows clients to jump to a specific date in a room's history (expect a sneak peek of this in the next episode of Matrix Live!).

Another interesting point is the addition of a couple of [admin APIs for federation](https://matrix-org.github.io/synapse/v1.49/usage/administration/admin_api/federation.html). More specifically, they allow you to visualise all of the other homeservers your Synapse instance has been interacting with, as well as how successful the last attempts at communicating with them have been.

Please see the Synapse [release notes](https://github.com/matrix-org/synapse/blob/v1.49.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [Dirk Klimpel](https://github.com/dklimpel), [Maximilian Bosch](https://github.com/Ma27) and [Tulir Asokan](https://github.com/tulir).

## Till next year

This is the last release of Synapse of 2021! The Synapse team will take a break for the holidays, pushing the next release of Synapse (1.50.0) to January 11, 2022.

We'd like to thank everyone who has been using Synapse, contributing to it, and/or supporting us for the past year, and we hope to see you again in 2022! 🎆
