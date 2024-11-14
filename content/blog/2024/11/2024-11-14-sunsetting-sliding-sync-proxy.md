+++
date = "2024-11-14T16:00:00Z"
title = "Sunsetting the Sliding Sync Proxy: Moving to Native Support"
path = "/blog/2024/11/14/moving-to-native-sliding-sync"

[taxonomies]
author = ["Will Lewis"]
category = ["Tech", "matrix.org homeserver"]
+++

_We will be decommissioning the [sliding sync proxy](https://github.com/matrix-org/matrix-spec-proposals/pull/3575) next week (21/11/2024) and Element are removing client support in mid-January (17/01/2025)._

Sliding Sync is designed to provide a significantly faster and more scalable sync experience in our clients. The initial implementation was first prototyped in Element Web backed by an entirely experimental server proxy. The implementation had half an eye on low bandwidth use cases, and the prototype led to [MSC3575](https://github.com/matrix-org/matrix-spec-proposals/pull/3575). We then realised that a simpler approach would be beneficial, and reused the same (experimental) proxy concept to facilitate beta testing with Element X, this time making it available on matrix.org. In doing so, we learned valuable lessons, leading to a refined and simplified API design in [MSC4186](https://github.com/matrix-org/matrix-spec-proposals/pull/4186). The proxy itself was only ever considered as a temporary arrangement to aid speed of development, rather than being a long term solution.

Simplified Sliding Sync [MSC4186](https://github.com/matrix-org/matrix-spec-proposals/blob/erikj/sss/proposals/4186-simplified-sliding-sync.md) (also known as native sliding sync), has since been implemented in Synapse, with encouraging results. Now that we don’t expect the API shape to change significantly, we recommend homeserver developers to implement MSC4186 natively.

The Matrix.org Foundation does not have the resources to keep up maintenance of the proxy service or its codebase, and plans to decommission the proxy from Mid-October and archive the sliding-sync repo.

Recognising that the community needs time to adopt sliding sync natively, Element will keep client support for the old API (MSC3575) until the 17th of January, 2025. 

<!-- more -->

## The Timeline

1. **Now: EX Apps support migrating from the proxy server to native Sliding Sync.** The apps automatically detect when the homeserver supports native Sliding Sync and offers the option to migrate. If users choose to migrate, they will be prompted to log in again. This migration is optional, as the apps continue to support both native Sliding Sync and the proxy.
2. **November 21st: Service decommissioning.** We plan to decommission the proxy service on Matrix.org and archive its codebase.
3. **January 17th: Element X stops supporting MSC3575.** EX apps (and matrix-rust-sdk) will remove proxy support, fully shifting to native SS. The migration on EX apps will be forced. Users will get logged out so that they can log in again using native Sliding Sync. We encourage server developers to implement Sliding Sync natively by this point.

## What This Means for Users

To continue enjoying the speed of Sliding Sync your homeserver and client must support the native Sliding Sync implementation (MSC4186). 

At the time of writing, the latest versions of Synapse support native Sliding Sync, as do the Element X clients. There may be other server / client implementations that also have or are in the process of adding support.
If you do use Element X apps, native Sliding Sync is used for every new login. For those currently using Element X through the proxy service, the app will prompt you to log out to switch to native Sliding Sync. While this migration is optional for now, it will become mandatory on the 21st of November for those on Matrix.org, when the proxy will be decommissioned. 
Element X will discontinue support for the previous Sliding Sync implementation (MSC3575) entirely by January 17th.

## Guidance for Server & Client Developers

Server & Client developers are encouraged to implement MSC4186 for native sliding sync. Server developers should be aware that by the 17th of January Element clients will drop support for MSC3575, marking a transition to the native system.

We appreciate your understanding as we take this step forward for the Matrix ecosystem.
