+++
title = "Synapse 1.52 released"
path = "/blog/2022/02/08/synapse-1-52-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

[Synapse 1.52](https://github.com/matrix-org/synapse/releases/tag/v1.52.0) is out! Here's what's new with this week's release.

## Twisted security release

The team behind [Twisted](https://twistedmatrix.com/), which is the main framework Synapse uses under the hood, recently released [Twisted 22.1](https://github.com/twisted/twisted/releases/tag/twisted-22.1.0). This version fixes a [security vulnerability](https://github.com/twisted/twisted/security/advisories/GHSA-92x2-jw7w-xvvx) within the Twisted library.

While preparing the release of Synapse 1.52, we have investigated the impact of this vulnerability on Synapse. We came to the conclusion that it does not affect Synapse. We however advise server administrators to ensure they use an up-to-date version of the library as a matter of good practice.

For instances installed with `pip`, the library can be updated with `pip install --upgrade Twisted treq`. For instances installed with the `matrixdotorg/synapse` Docker image or Debian packages from `packages.matrix.org`, updating to Synapse 1.52.0 is sufficient, as these images and packages include up-to-date versions of all dependencies.

It is also worth noting that a release candidate for [Twisted 22.2](https://github.com/twisted/twisted/releases/tag/twisted-22.2.0rc1) has been published, with a fix for a potential denial of service vulnerability with SSH. Administrators of Synapse homeservers that have the [manhole](https://matrix-org.github.io/synapse/v1.52/manhole.html) feature enabled (which is the only feature of Synapse using SSH) are encouraged to ensure access to the manhole is correctly restricted (e.g. by preventing access from external locations).


## Federation admin APIs

This release of Synapse introduces a few admin APIs to help server administrators monitor and handle how their Synapse homeserver interacts with other federated homeservers. [One of these APIs](https://matrix-org.github.io/synapse/v1.52/usage/administration/admin_api/federation.html#destination-rooms) offers server administrators a way to visualise which rooms are shared between the local homeserver and a given remote one.

Another API allows server administrators to [reset federation timeouts](https://matrix-org.github.io/synapse/v1.52/usage/administration/admin_api/federation.html#reset-connection-timeout). If Synapse fails to connect to a remote homeserver, it will make note of the failure and will not retry the connection after a certain amount of time. This can happen if the remote homeserver goes offline or experiences connectivity issues. Synapse has a few ways of figuring out whether a remote homeserver has come back online, but this new admin API adds a way for administrators to manually tell Synapse a destination should be available.


## Everything else

This release also improves Synapse's deactivation behaviour by deleting account data when deactivating a user. "Account data" refers to private arbitrary data that is specific to an account. It is used among other things for secure server-side storage (SSSS) which allows securely backing up end-to-end encryption keys.

Please see the Synapse [release notes](https://github.com/matrix-org/synapse/blob/v1.52.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including (in no particular order) [Dirk Klimpel](https://github.com/dklimpel), [Vaishnav Nair](https://github.com/totallynotvaishnav), [SequentialRead Software](https://github.com/sequentialread) and [Nick Barrett from Beeper](https://github.com/Fizzadar).
