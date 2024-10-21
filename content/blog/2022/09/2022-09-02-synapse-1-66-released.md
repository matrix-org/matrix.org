+++
title = "Synapse 1.66 released"
path = "/blog/2022/09/02/synapse-1-66-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

Hey all, we've just released [Synapse 1.66](https://github.com/matrix-org/synapse/releases/tag/v1.66.0)! Let's have a
look at what's inside this release.

<!-- more -->

## Removal of email verification delegation

Before Synapse 1.66, homeserver administrators had the possibility to
configure Synapse to delegate verifying email addresses to an identity
server (using the `account_threepid_delegates.email` configuration setting).
This feature relied on old APIs from the Matrix specification that have since
been [removed](https://spec.matrix.org/v1.3/changelog/#identity-service-api-1-1) from it.

[Synapse 1.64](https://matrix.org/blog/2022/08/03/synapse-1-64-released) announced the
deprecation of this feature, and the addition of a warning at startup when
the configuration setting is in use.

As of Synapse 1.66, support for this feature has been fully removed, and
Synapse will refuse to start if the configuration setting for it is in use.

If this has not already been done, administrators of servers that were
previously using this feature are encouraged to configure an SMTP server that
Synapse can use to verify email addresses on its own. See the
[configuration guide](https://matrix-org.github.io/synapse/v1.66/usage/configuration/config_documentation.html#email)
for more information.

Also see the [upgrade notes](https://matrix-org.github.io/synapse/v1.66/upgrade.html#delegation-of-email-validation-no-longer-supported)
for more information.

## Planned removal of support for TCP replication

Most server administrators already know that Synapse can be made to scale
horizontally by deploying [workers](https://matrix-org.github.io/synapse/latest/workers.html). Workers are
processes running alongside Synapse's main process to allow offloading some
of the work it would otherwise be doing, load balancing some of the traffic,
etc.

In a deployment of Synapse that uses workers, these processes use replication
to share information between themselves. One of the earliest protocols
Synapse used for replication was built on top of TCP.

[Synapse 1.18](https://github.com/matrix-org/synapse/releases/tag/v1.18.0) introduced a new
Redis-based replication protocol for workers to use and deprecated the
TCP-based protocol, without specifying a removal date.

This week we're announcing that support for TCP replication will be removed
from Synapse in version 1.67, which is expected to come out around Sep 13th.
See the [release notes](https://github.com/matrix-org/synapse/releases/tag/v1.66.0) for more
details.

## Everything else

Synapse 1.66 also includes some improvements to validation on endpoints using
[User-Interactive Authentication](https://spec.matrix.org/latest/client-server-api/#user-interactive-authentication-api).

This version of Synapse also adds compression support for federation traffic.
See [the configuration guide](https://matrix-org.github.io/synapse/v1.66/usage/configuration/config_documentation.html#listeners)
for more information on how to compress HTTP traffic.

Furthermore, Synapse 1.66 improves the [Room Details admin API](https://matrix-org.github.io/synapse/v1.66/admin_api/rooms.html#room-details-api)
and allows administrators to see if all local users have marked a given room
as "forgotten".

See the [full
changelog](https://github.com/matrix-org/synapse/releases/tag/v1.66.0) for a
complete list of changes in this release. Also please have a look at the
[upgrade
notes](https://matrix-org.github.io/synapse/v1.66/upgrade#upgrading-to-v1660)
for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend
our thanks to everyone who contributed to this release, including (in no
particular order) [Dirk Klimpel](https://github.com/dklimpel) and
[Antonin Loubiere](https://github.com/AntoninLoubiere), as well as anyone
helping us make Synapse better by sharing their feedback and reporting
issues.
