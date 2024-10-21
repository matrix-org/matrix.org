+++
date = "2024-08-27T14:00:00Z"
title = "Libolm Deprecation"

[taxonomies]
author = ["Neil Johnson"]
category = ["Cryptography"]
+++

It’s been a few weeks since we announced the [deprecation of libolm](https://gitlab.matrix.org/matrix-org/olm/-/blob/master/README.md?ref\_type=heads\#important-libolm-is-now-deprecated). Since then, we’ve fielded some questions on the subject and thought it would be helpful to collect this context in a blog post.

First up, a recap. We first introduced the idea that [libolm would make way for vodozemac](https://matrix.org/blog/2022/05/16/independent-public-audit-of-vodozemac-a-native-rust-reference-implementation-of-matrix-end-to-end-encryption/) in 2022, following the [Gematik](https://www.gematik.de/) sponsored audit from [Least Authority](https://leastauthority.com/).

Since then, various client implementations have migrated to [vodozemac](https://github.com/matrix-org/vodozemac). Notably, all versions of Element, Element X, Fractal, iamb and other [matrix-rust-sdk](https://github.com/matrix-org/matrix-rust-sdk) based clients and their forks already use vodozemac, and platforms using matrix-js-sdk can also use vodozemac instead of libolm.

In [This Week in Matrix 2024-08-02](https://matrix.org/blog/2024/08/02/this-week-in-matrix-2024-08-02/\#vodozemac-website) [Matthew](https://matrix.to/#/@matthew:matrix.org) formally announced the deprecation of libolm in favour of vodozemac.

<!-- more -->

> Heads up that we have officially marked the original C/C++ libolm implementation as deprecated, as warned back in [May 2022](https://matrix.org/blog/2022/05/16/independent-public-audit-of-vodozemac-a-native-rust-reference-implementation-of-matrix-end-to-end-encryption/) when we announced the Rust vodozemac implementation as the successor to libolm. The rationale for doing so now is that all of the SDKs maintained by the core team at [github.com/matrix-org](https://github.com/matrix-org) now support vodozemac, and the majority of apps built on top of them have now successfully switched over to vodozemac. Meanwhile, we simply don't have bandwidth to maintain and support both vodozemac and libolm, so our maintenance will be focused on vodozemac going forwards. You can find the official deprecation notice [here](https://gitlab.matrix.org/matrix-org/olm/-/blob/master/README.md?ref\_type=heads\#important-libolm-is-now-deprecated).

Matthew then followed up in [This Week in Matrix 2024-08-16](https://matrix.org/blog/2024/08/16/this-week-in-matrix-2024-08-16/\#dept-of-encryption-closed-lock-with-key) in light of the coordinated disclosure by security researcher Soatok of [potential security weaknesses in libolm](https://soatok.blog/2024/08/14/security-issues-in-matrixs-olm-library/) underpinned by the primitives employed by the library.

Quoting selectively:

> We're not aware of any way to actually exploit these weaknesses over the network, but we continue to strongly recommend developers to migrate to [vodozemac](https://github.com/matrix-org/vodozemac) (or fork libolm to add better primitives). We should have done a better job of explicitly deprecating libolm sooner (and/or improving its primitives) – but all of our focus has been on ensuring that vodozemac is excellent, to the detriment of libolm. Apologies to those who are now finding themselves expediting libolm replacement.

**So what does this mean if you are building an app that has a dependency on libolm?**

* We have been public from the outset that that libolm's primitives are functionally correct, but not resilient to timing attacks
    * [Repository issue](https://github.com/matrix-org/olm/issues/3)
    * [Project README](https://gitlab.matrix.org/matrix-org/olm/-/blob/master/lib/crypto-algorithms/README.md)
    * [An audit from NCC Group](https://matrix.org/blog/2016/11/21/matrix-s-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last/)
* We do not believe this to be a high-severity issue for Matrix because an attack would require sending very large volumes of messages with very accurate timings targeting the same key material – while in practice Matrix implementations have short-lived AES key material (due to ratcheting), very noisy timings (due to traffic topology being client ↔ server ↔ server ↔ client, with persistence steps at each hop), as well as traffic rate-limiting. As a result, we do not believe that an attack over the network is feasible. It is possible that a local attack might work – but if the attacker has local access to your device, we consider you to already be compromised.
* Even though it is a theoretical rather than practical weakness, we still wanted to fix it. We chose to do so with the shift to vodozemac, which provides both first-class, audited cryptographic primitives provided by Rust, while also avoiding the possibility of an entire class of weaknesses, such as the [buffer overflows](https://matrix.org/blog/2021/12/13/disclosure-buffer-overflow-in-libolm-and-matrix-js-sdk/) previously found and mitigated in libolm.

We've deprecated libolm simply because we do not have the bandwidth to replace its primitives as well as maintain and [evolve](https://github.com/matrix-org/vodozemac/pull/171) vodozemac.

Given the above, in the context of Matrix, libolm is currently safe to use in a practical sense (with the above caveats). However, we strongly encourage all app developers to chart a path away from libolm in favour of vodozemac.

Additionally, we have registered three CVEs to track recently highlighted vulnerabilities.

* [CVE-2024-45191 \- AES implementation is vulnerable to cache-timing attacks](https://nvd.nist.gov/vuln/detail/CVE-2024-45191)
* [CVE-2024-45192 \- Base64 implementation used for decoding sensitive data has a timing side-channel](https://nvd.nist.gov/vuln/detail/CVE-2024-45192)
* [CVE-2024-45193 \- Ed25519 signatures are malleable](https://nvd.nist.gov/vuln/detail/CVE-2024-45193)

Note: The CVEs have since been edited post-submission to conflate libolm with the Olm protocol itself. A genuine protocol vulnerability would be much more serious so we are working with MITRE to clarify.

The good news is that if you are building on matrix-rust-sdk or matrix-js-sdk they are already vodozemac backed. However, libolm is still a dependency of both libraries, and it is worth explaining why.

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**matrix-rust-sdk**

* libolm is used only in testing and is not an operational dependency (it is used to check that `PkEncryption` in matrix-sdk-crypto is compatible with libolm's). [We have updated](https://github.com/matrix-org/matrix-rust-sdk/pull/3860/files) its dependency specification to make this clearer. We do not intend to remove this dependency in the short term.

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**matrix-js-sdk**

* libolm is referenced [here](https://github.com/matrix-org/matrix-js-sdk/blob/c408c0d1d517eeac98c7ee11d99a6a8a874ecda5/src/crypto/backup.ts\#L666), as a hangover from recent work to migrate from libolm to vodozemac. This file will be [removed](https://github.com/element-hq/element-web/issues/26922).

Additionally, the legacy mobile SDKs, [matrix-android-sdk2](https://github.com/matrix-org/matrix-android-sdk2) and [matrix-ios-sdk](https://github.com/matrix-org/matrix-ios-sdk), also have dependencies on libolm. It is used there for the following:

* To encrypt the bodies of the requests for the Element maintained [content scanner](https://github.com/element-hq/matrix-content-scanner-python) project. These references are unused in any publicly available application and will be removed.
* To support migration of users from legacy crypto to Rust crypto. Given the adoption of Rust crypto in March 2023 for iOS and July 2023 for Android we will remove this support in the near future, once we have confirmed that the vast majority of users have migrated.
* For unused legacy QR code log-in functionality in matrix-android-sdk2. This will be removed shortly.

To conclude, we see the deprecation as a natural step in a multi-year process. In retrospect, we could've been a lot more explicit in explaining the context of the libolm deprecation and offer our apologies. Hopefully, this post makes things clearer.

However, by formally deprecating libolm we make the direction of travel extremely clear and we recommend all projects adopt a vodozemac-backed solution promptly or alternatively fork libolm and upgrade the primitives.

If you have any questions or concerns, please reach out to [security@matrix.org](mailto:security@matrix.org).
