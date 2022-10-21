+++
title = "Synapse 1.33.2 released"
date = "2021-05-11T23:53:39Z"
path = "/blog/2021/05/11/synapse-1-33-2-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases", "Security"]
+++

[Synapse 1.33.2](https://github.com/matrix-org/synapse/releases/tag/v1.33.2) is now available.

This release fixes a denial of service issue ([CVE-2021-29471](https://github.com/matrix-org/synapse/security/advisories/GHSA-x345-32rc-8h85)) where evaluating specially crafted push rules could lead to excessive CPU load. Server administrators are encouraged to upgrade.

To learn more about Synapse 1.33, see last week's [release announcement](/blog/2021/05/05/synapse-1-33-0-released).
