+++
title = "GSOC report: Enabling E2EE in Opsdroid Matrix Connector"
date = "2020-09-10T14:50:50Z"
path = "/blog/2020/09/10/gsoc-report-enabling-e2ee-in-opsdroid-matrix-connector"

[taxonomies]
author = ["Tyagraj Desigar"]
category = ["GSOC"]
+++

This is part of a series of reports on the [*six* projects](https://summerofcode.withgoogle.com/organizations/6060943798173696) assigned to Matrix for Google Summer of Code 2020.

[View project: Enabling E2EE in Opsdroid Matrix Connector](https://summerofcode.withgoogle.com/organizations/6060943798173696/#6107552447725568)

----

I'm [Tyagraj Desigar](https://github.com/Tyagdit) and I worked on [Opsdroid](https://github.com/opsdroid/opsdroid) with [Stuart Mumford](https://github.com/Cadair) and [Drew Leonard](https://github.com/SolarDrew). Opsdroid is a python framework for creating platform agnostic bots usable with multiple chat services including matrix.

## The Plan

The project's focus was on the interaction layer (called a connector) between opsdroid and matrix. As it stood, the connector used the deprecated [matrix-python-sdk](https://github.com/matrix-org/matrix-python-sdk) and had no support for encryption. The aim was to change this by moving over to [matrix-nio](https://github.com/poljar/matrix-nio).

I had planned to work on some other features as well:

- A database module for opsdroid using matrix state events
- Support for unused matrix events
- Homeserver lookup using `.well-known` API requests
- Device verification process for the bot

Porting to nio and adding encryption support was the bulk of the project, and the **minimum** I wanted to accomplish by the end of the project. I wanted to have a connector that worked as it did already with support for encrypted rooms which needed minimal extra configuration.

## The Process

The process began with [This PR](https://github.com/opsdroid/opsdroid/pull/1418) which gave us a head start with the migration to matrix-nio. Through helping to review the PR I got to understand how matrix-nio and opsdroid work.

The implementation of encryption support was a little tricky in that it was tough to figure out the process required to do that in the context of the connector. One problem we faced was the installation of dependencies. Installing `libolm`, a C library which nio uses for encryption was a less than smooth process. This spawned a couple side projects that dealt with the CI, testing and installation of opsdroid. In the end we found a solution and had a working connector on our hands.

Next we shifted focus to the database module. It was based on [this project](https://github.com/SolarDrew/database-matrix). I rewrote it with nio and added a few features. The idea was straightforward but the implementation had many catches since we were working under some constraints for the interfacing with opsdroid. It went through several iterations before we settled on the final product.

The encryption and database took longer than I had initially expected which meant we didn't get to work on adding support for more events and homeserver lookups. I had a go at adding device verification steps while working on the encryption support but that turned out to be quite complicated and would introduce some breaking changes, besides cross-signing had just been introduced so we decided to drop that till nio implemented some way to leverage cross-signing.

Along the way some issues cropped up with the testing frameworks and CI that were hard to pinpoint and caused further delays but were solved eventually.

## The Conclusion

I am extremely happy with what I've accomplished and hope that I have been able to achieve the standards set by the matrix community. It was a challenging and exhilarating experience. I have learned more in this project than I could've imagined and gained a ton of invaluable experience with software development thanks to my mentors who pushed me forward and guided me throughout. This journey was beyond amazing and I will be sure to contribute to matrix moving forward.

You can find complete details of everything I worked on during GSoC [here](https://gist.github.com/Tyagdit/0e6feb332fc33c540db728092cc7ae7f).
