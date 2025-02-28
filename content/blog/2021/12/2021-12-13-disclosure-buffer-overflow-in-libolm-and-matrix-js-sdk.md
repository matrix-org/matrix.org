+++
title = "Disclosure: buffer overflow in libolm and matrix-js-sdk"
date = "2021-12-13T18:35:18Z"
updated = "2021-12-13T16:11:07Z"
path = "/blog/2021/12/13/disclosure-buffer-overflow-in-libolm-and-matrix-js-sdk"

[taxonomies]
author = ["Matrix Security Team"]
category = ["Security"]
+++

Today we are releasing security updates to libolm, matrix-js-sdk, and several clients including Element Web / Desktop. Users are encouraged to upgrade as soon as possible. This resolves the [pre-disclosure](https://matrix.org/blog/2021/12/03/pre-disclosure-upcoming-security-release-of-libolm-and-matrix-js-sdk) issued on December 3rd.

Fixed library versions are:

- libolm: [3.2.8](https://gitlab.matrix.org/matrix-org/olm/-/tree/3.2.8)
- matrix-js-sdk: [15.2.1](https://github.com/matrix-org/matrix-js-sdk/releases/tag/v15.2.1)

Client versions incorporating the fixes are:

- Element Web / Desktop: [1.9.7](https://github.com/vector-im/element-web/releases/tag/v1.9.7)
- SchildiChat Web / Desktop: [1.9.7-sc.1](https://github.com/SchildiChat/schildichat-desktop/releases/tag/v1.9.7-sc.1)
- Cinny: [1.6.0](https://github.com/ajbura/cinny/releases/tag/v1.6.0)

These releases mitigate a buffer overflow in `olm_session_describe`, a libolm debugging function used by matrix-js-sdk in its end-to-end encryption (E2EE) implementation. If you rely on matrix-js-sdk for E2EE, you are affected. This vulnerability has been assigned [CVE-2021-44538](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44538).

Clients which do *not* use matrix-js-sdk for E2EE, like FluffyChat or Element Android / iOS, are *not* affected.

This issue has been present since the introduction of the `olm_session_describe` function in October 2019 (commits: [libolm](https://gitlab.matrix.org/matrix-org/olm/-/commit/39a1ee0b18f0fced6d7bc293cc9a46ea70ec9e96), [matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk/commit/e6699c5424a856a639baa6d6f78d44594baaf404)).

We do not believe it is practical to successfully exploit this issue. However, upgrading remains important as the overflow *can* be triggered remotely.

Separately from the above vulnerability, we noticed during an internal audit that the libolm bindings in matrix-js-sdk were not zeroing out certain arrays containing entropy for cryptographic operations. This causes the entropy to remain resident in memory longer than necessary. As a defense-in-depth measure, this release of libolm now proactively overwrites those arrays when it is safe to do so.

Lastly, we are also taking this opportunity to update the version of Electron bundled with Element Desktop, pulling in the latest backported security fixes there.

The buffer overflow was found and reported by GitHub user [@brevilo](https://github.com/brevilo) in the course of developing [jOlm](https://github.com/brevilo/jolm/), a library of Java bindings to libolm; thank you. If you believe you've discovered a security vulnerability in Matrix or its implementations, please see our [Security Disclosure Policy](https://matrix.org/security-disclosure-policy/) for how to get in touch.
