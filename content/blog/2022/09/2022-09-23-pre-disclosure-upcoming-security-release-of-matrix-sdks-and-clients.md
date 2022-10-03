+++
date = "2022-09-23T12:53:12Z"
title = "Pre-disclosure: upcoming critical security release of Matrix SDKs and clients"
path = "/blog/2022/09/23/pre-disclosure-upcoming-critical-security-release-of-matrix-sd-ks-and-clients"
template = "post.html"
[taxonomies]
category = ["Security"]
author = ["Matrix Security"]
+++

We will be releasing a security update to matrix-js-sdk, matrix-ios-sdk and matrix-android-sdk2 and clients which implement end-to-end encryption with these libraries, to patch **critical** security issues, on **Wed, Sept 28th**. The releases will be published in the afternoon, followed by the disclosure blog post around 16:00 UTC. The affected clients include Element Web, Desktop, iOS and Android.  We will also be working with downstream packagers and forks over the coming days to ensure a synchronised release to address affected clients.

Clients using matrix-rust-sdk, hydrogen-sdk and matrix-nio are not affected by these critical issues.  We are also auditing third-party client SDKs and clients in advance of the release, and will work with the projects if action is needed. So far we've confirmed that other popular SDK/clients including mtxclient (nheko), Matrix Dart SDK (FluffyChat), Trixnity (Timmy), Syphon, mautrix-go (Gomuks) and mautrix-python are not affected by the issues in question.

If you maintain or package a (potentially) affected E2EE-capable Matrix client and need to coordinate on the release, please contact <security@matrix.org>.

**We advise to upgrade as soon as possible after the patched versions are released.**

Thank you for your patience while we work to resolve this issue.
