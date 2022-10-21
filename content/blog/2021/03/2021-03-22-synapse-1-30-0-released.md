+++
title = "Synapse 1.30.0 released"
date = "2021-03-22T16:56:46Z"
path = "/blog/2021/03/22/synapse-1-30-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

We've released [Synapse 1.30.0](https://github.com/matrix-org/synapse/releases/tag/v1.30.0)!

A key theme of this release was stability and resilience around federation. We've landed changes to be [less eager about entering catch up mode](https://github.com/matrix-org/synapse/pull/9561) and to [retry on HTTP 500 errors](https://github.com/matrix-org/synapse/pull/9567), while also [rejecting transactions](https://github.com/matrix-org/synapse/pull/9597) which arrive before we've completed processing earlier transactions from that same server. We've significantly [optimized how we handle missing events](https://github.com/matrix-org/synapse/pull/9601) when receiving incoming federation traffic, and we've found a way to [re-use the chain cover index](https://github.com/matrix-org/synapse/pull/9576) (from [Synapse 1.26](https://matrix.org/blog/2021/01/28/synapse-1-26-0-released)) when responding to the `state_ids` endpoint.

That last one turns out to be a pretty big deal: we've seen an order of magnitude improvement in both the CPU and DB cost of the `state_ids` endpoint. For example, the average CPU usage by that endpoint on matrix.org dropped from few seconds to well under 100ms:

![CPU usage graph](/blog/img/2021-03-22-synapse-1.30rc1-state_ids-cpu.png)

Enjoy. 🙂

This release also includes further improves to our SSO support, including allowing spam checkers to [distinguish between new registrations and first-time SSO users](https://github.com/matrix-org/synapse/pull/9626) and [fixing account reactivation when local passwords are disabled](https://github.com/matrix-org/synapse/pull/9587). Now that _[MSC2858: Multiple SSO Identity Providers](https://github.com/matrix-org/matrix-doc/pull/2858)_ has passed its Final Comment Period, we've also updated Synapse to respond to the stable versions of endpoints introduced by that MSC.

See the  [Release Notes](https://github.com/matrix-org/synapse/releases/tag/v1.30.0) for further information.

### Python / Platform Deprecations

As a reminder, the next release of Synapse (1.31, scheduled for April 5th) will be the last to support Python 3.5 or PostgreSQL 9.5, both of which have reached their upstream end of life.

We will also cease building packages for Ubuntu 16.04 (Xenial) and Debian 9 (Stretch) at the same time.

### Application Service Registration Changes

Note that Application Services _must_ provide a `type` parameter with the value `"m.login.application_service"` when calling `POST /_matrix/client/r0/register`. Synapse currently allows registration without an explicit `type`, but this [divergence from the spec](https://github.com/matrix-org/synapse/pull/9548) will be resolved in a future release.

### Thanks

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [dklimpel](https://github.com/dklimpel), [ShadowJonathan](https://github.com/ShadowJonathan), and [tlvb](https://github.com/tlvb).
