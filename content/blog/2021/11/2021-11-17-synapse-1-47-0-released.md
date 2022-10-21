+++
title = "Synapse 1.47.0 released"
path = "/blog/2021/11/17/synapse-1-47-0-released"

[taxonomies]
author = ["David Robertson"]
category = ["Releases"]
+++

[Synapse 1.47.0](https://github.com/matrix-org/synapse/releases/tag/v1.47.0) is out now!

> **NOTE:** We anticipate publishing a **security release**, Synapse 1.47.1, on the coming Tuesday, the 23rd of November.
>
> Synapse 1.47.1 will contain a fix for a high severity issue.

Synapse 1.47.0 features additions to the admin and module APIs, a plethora of fixes for long-standing bugs, and a raft of internal improvements. Server administrators should note that this release removes a deprecated API for deleting a room and deprecates a module callback. Consult the [upgrade notes](https://matrix-org.github.io/synapse/develop/upgrade#upgrading-to-v1470) for more details.

## New [admin](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/index.html) and [module](https://matrix-org.github.io/synapse/latest/modules/index.html) APIs

Administrators can now [search for rooms by their ID or alias](https://github.com/matrix-org/synapse/issues/11099). We hope this will be particularly useful for projects like [synapse-admin](https://github.com/Awesome-Technologies/synapse-admin)! We've also exposed an API to allow admins to [control Synapse's background updates](https://github.com/matrix-org/synapse/pull/11263).  And while it's not strictly an API change, there's a small [patch](https://github.com/matrix-org/synapse/pull/11211/files) which makes it easier for homeservers to redirect matrix traffic to port 443.

Authors of pluggable modules have some new toys to play with. There's [a way to listen for new events](https://github.com/matrix-org/synapse/pull/11126); a means to [retrieve room state](https://github.com/matrix-org/synapse/pull/11204) and the ability to edit a [user's membership of a room](https://github.com/matrix-org/synapse/pull/11147).


## Bug Fixes and Refactors

We fixed a variety of different bugs in this release, many of which were long-standing. It's good to see them dealt with! Worth mentioning in particular:

- Improvements to [the](https://github.com/matrix-org/synapse/pull/10097) [handling](https://github.com/matrix-org/synapse/pull/11199) of the `device_inbox` table, which trim redundant data to reduce database bloat.
- Fixes related to [restarting](https://github.com/matrix-org/synapse/pull/11255) [workers](https://github.com/matrix-org/synapse/pull/11262), to ensure a more reliable upgrade process.
- Fix being [unable to join certain v1 rooms](https://github.com/matrix-org/synapse/issues/11135), e.g. `#NextCloud:matrix.org`, whose state contained floating point numbers.
- [Fix serialisation and duplication errors](https://github.com/matrix-org/synapse/pull/11207) when sending ephemeral events to application services.

Additionally, work continues on improving type-checking coverage, both [in](https://github.com/matrix-org/synapse/pull/11205) [Synapse](https://github.com/matrix-org/synapse/pull/11164) and [in](https://github.com/matrix-org/sygnal/pull/264) [Sygnal](https://github.com/matrix-org/sygnal/pull/271).

## Sydent 2.5.1

This week also saw the release of [Sydent 2.5.1](https://github.com/matrix-org/sydent/releases/tag/v2.5.1), the reference implementation of a Matrix Identity Server. This is a minor release which mainly tidies up error handling to reduce the amount of noise in logs. It should also make it easier for us to diagnose some outstanding bugs which remain to be squashed.

## Everything Else

In the background, we're still working away at implementing [MSC3440](https://github.com/matrix-org/matrix-doc/pull/3440) to facilitate threading. Early tests are promising. We're also exploring [MSC2775](https://github.com/matrix-org/matrix-doc/pull/2775) as a means to speed up room joins. Both will be long term projects that should hopefully reap major rewards for the Matrix ecosystem. Lastly, there's support for [MSC3228](https://github.com/matrix-org/matrix-doc/pull/3288) to allow identity servers to provide bespoke invites to spaces. We mentioned this [last time](https://matrix.org/blog/2021/11/02/synapse-1-46-0-released#sydent-250) in Sydent release notes; now we've got support for it on the Synapse side.

Please see the Synapse [Release Notes](https://github.com/matrix-org/synapse/blob/v1.47.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [Dirk Klimpel](https://github.com/dklimpel), [JohannesKleine](https://github.com/JohannesKleine), [l00ptr](https://github.com/l00ptr), [Nick Barrett](https://github.com/Fizzadar), [rogersheu](https://github.com/rogersheu),
[Samuel Philipp](https://github.com/samuel-p), [Skyler Mäntysaari](https://github.com/samip5) and [Sumner Evans](https://github.com/sumnerevans).
