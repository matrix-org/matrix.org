+++
title = "Synapse 1.27.0 released"
date = "2021-02-18T23:25:00Z"
path = "/blog/2021/02/18/synapse-1-27-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

[Synapse 1.27.0](https://github.com/matrix-org/synapse/releases/tag/v1.27.0) is now available!

We're especially proud of this release, as this is the version of Synapse that powered [FOSDEM 2021 on Matrix](/blog/2021/02/15/how-we-hosted-fosdem-2021-on-matrix). As such, our main focus was on stability, performance, and long-awaited support for social login.

### What's New

To our surprise, nearly *half* of all people who created accounts on the FOSDEM homeserver did so via a social login method. Full support for those methods is included in Synapse 1.27.0, and already available for all users on the matrix.org homeserver.

We've also changed how we use Redis in larger deployments, making Synapse more resilient to lost connections and eliminating delays when restarting with multiple federation senders.

Our Server Admin APIs saw a few tweaks, including new APIs to [query and delete forward extremities](https://github.com/matrix-org/synapse/blob/v1.27.0/docs/admin_api/rooms.md#forward-extremities-admin-api) or [list the current state of a room](https://github.com/matrix-org/synapse/blob/v1.27.0/docs/admin_api/rooms.md#room-state-api).

See the [full changelog](https://github.com/matrix-org/synapse/blob/release-v1.27.0/CHANGES.md) for more.

### Breaking Changes for SSO

If you use Single Sign-On (SSO) via SAML, OAuth2, or OpenID Connect you __must__ adjust your provider's configuration before upgrading to Synapse 1.27.0, as some endpoint URLs have changed. See the [upgrading notes](https://github.com/matrix-org/synapse/blob/release-v1.27.0/UPGRADE.rst#upgrading-to-v1270) for more information.

### Dropping ARMv7 Docker Images

We were unable to produce ARM-based Docker images for this release due to problems with cross-compilation. As a result, we have made the difficult decision to cease building 32-bit ARMv7 Docker images as part of our release process. We will resume publishing ARM64 images with the next Synapse release.

Users on ARMv7 platforms (most notably Raspberry Pis) should consider building images locally using Synapse's Dockerfile or switching to installing Synapse directly as a Python module. Users with Raspberry Pi 3's or newer also have the option of installing a 64-bit Linux distribution and using an ARM64 Docker image.

### Thank you to our contributors

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [dklimpel](https://github.com/dklimpel), [intelfx](https://github.com/intelfx), [jcgruenhage](https://github.com/jcgruenhage), [Oliver-Hanikel](https://github.com/Oliver-Hanikel), [rht](https://github.com/rht), and [y-pankaj](https://github.com/y-pankaj).
