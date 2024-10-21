+++
title = "Synapse 1.19.1 released"
date = "2020-08-27T12:26:48Z"
path = "/blog/2020/08/27/synapse-1-19-1-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

Synapse 1.19.1 is a bug fix release to fix two bugs introduced in 1.19.0.

Those two bugs were related to the new rate-limiter on room joins, which was introduced in 1.19.0.

The first bug caused Synapse to ignore exceptions to rate-limiting for application services.

The second one prevented profile updates from being correctly propagated across rooms.

Sorry if you have been bitten!

Get 1.19.1 from [github](https://github.com/matrix-org/synapse/releases/tag/v1.19.1) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since v1.19.0

## Synapse 1.19.1 (2020-08-27)

No significant changes.

## Synapse 1.19.1rc1 (2020-08-25)

### Bugfixes

- Fix a bug introduced in v1.19.0 where appservices with ratelimiting disabled would still be ratelimited when joining rooms. ([\#8139](https://github.com/matrix-org/synapse/issues/8139))
- Fix a bug introduced in v1.19.0 that would cause e.g. profile updates to fail due to incorrect application of rate limits on join requests. ([\#8153](https://github.com/matrix-org/synapse/issues/8153))
