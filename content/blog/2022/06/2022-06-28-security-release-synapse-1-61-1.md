+++
title = "Security release: Synapse 1.61.1"
date = "2022-06-28T16:19:45Z"
path = "/blog/2022/06/28/security-release-synapse-1-61-1"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases", "Security"]
+++

Hey everyone!

Today we're exceptionally releasing [Synapse
1.61.1](https://github.com/matrix-org/synapse/releases/tag/v1.61.1), which comes
as a security release. **Server administrators are encouraged to update as soon as
possible.**

This release fixes a vulnerability with Synapse's URL preview feature. URL
previews of some web pages can lead to unbounded recursion, causing the request
to either fail, or in some cases crash the running Synapse process.

Homeservers with the `url_preview_enabled` configuration option set to `false`
(the default value) are unaffected. Instances with the `enable_media_repo`
configuration option set to `false` are also unaffected, as this also disables
the URL preview functionality.

Server administrators who are unable to update Synapse should disable URL
previews by setting `url_preview_enabled: false` in their configuration file.
They can also delegate URL preview to a separate, dedicated worker to ensure the
process crashing does not impact other functionality of Synapse.

Please see [this security
advisory](https://github.com/matrix-org/synapse/security/advisories/GHSA-22p3-qrh9-cx32)
for more information.
