+++
title = "Pre-disclosure: upcoming security release of libolm and matrix-js-sdk"
path = "/blog/2021/12/03/pre-disclosure-upcoming-security-release-of-libolm-and-matrix-js-sdk"

[taxonomies]
author = ["Matrix Security"]
category = ["Security"]
+++

On **Monday, 13th December** we plan to publish a security release of libolm at 15:00 UTC to address a single high severity issue. To the best of our knowledge, only matrix-js-sdk and clients relying on it for E2EE are affected by this issue. This includes Element Web/Desktop and their forks (like SchildiChat). The release of libolm will be immediately followed by a security release of matrix-js-sdk and the affected clients. Users of these clients are encouraged to **upgrade as soon as the patched versions are released**.

We will be reaching out to downstream packagers to ensure they can prepare patched versions of the affected packages at the time of the release. The details of the vulnerability will be disclosed in a blog post on the day of the release. There is so far no evidence of the vulnerability being exploited in the wild.

The patched version numbers will be as follows:

- libolm 3.2.8
- matrix-js-sdk 15.2.1
- Element Web/Desktop 1.9.7

Thank you for your patience while we work to resolve this issue.

*Edit, 2021-12-13: Added patched release numbers.*
