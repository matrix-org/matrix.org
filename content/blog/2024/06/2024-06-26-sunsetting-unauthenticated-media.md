+++
title = "Sunsetting unauthenticated media"
date = "2024-06-26T14:31:27Z"
path = "/blog/2024/06/26/sunsetting-unauthenticated-media"

[taxonomies]
author = ["Travis Ralston"]
category = ["Trust & Safety", "matrix.org homeserver"]
+++


Hello everyone,

The Trust & Safety team has been working hard to get [MSC3916](https://github.com/matrix-org/matrix-spec-proposals/pull/3916) in the hands of users, and we’re nearly there with [Matrix 1.11 being released last week](https://matrix.org/blog/2024/06/20/matrix-v1.11-release/). This fixes a long-standing design flaw in Matrix where media (images, avatars, files, etc) can be accessed without authentication if the URL is known. Matrix 1.11 fixes this by requiring authentication on these URLs, removing the ability for users to treat homeservers as CDNs for hosting arbitrary Matrix content for arbitrary users.

Rolling this feature out to the entire public federation is a bit tricky, particularly when considering the user safety and privacy benefits which Matrix 1.11 brings. Developers are encouraged to support authenticated media quickly to give server admins the ability to freeze unauthenticated media access on their servers. Media uploaded or cached before the freeze will remain accessible on the unauthenticated endpoints, but any media uploaded or cached after the freeze will only be available through the authenticated endpoints.

This freeze reduces the amount of breakage users will see. We’re aware of links being shared outside the context of a room already, and breaking those would be pretty disappointing for those users. We also don’t want to encourage that capability going forwards due to the space it takes up and the anonymous nature of the requests. Users who keep their clients updated should see no impact when their servers implement their freeze, but may find themselves unable to copy/paste media URLs to their friends.

Matrix 1.11 recommends that all servers evaluate their local ecosystem to determine when would be best to implement the freeze, and that the freeze should happen before Matrix 1.12 is released in August 2024. For the matrix.org homeserver, we anticipate most of our users to have updated clients in July, putting our freeze date in August.

Developers, and those curious, are encouraged to review the [Matrix 1.11 blog post](https://matrix.org/blog/2024/06/20/matrix-v1.11-release/) for details on the changes they’ll need to make in July to have near-zero matrix.org user impact, and for information about the recommended freeze approach.

## Timeline for matrix.org homeserver

To assist developers and other server admins in testing their implementations, we will be updating the beta.matrix.org homeserver to enact the freeze as soon as code is available for that. We expect this to happen in July 2024. The matrix.org (non-beta) homeserver’s freeze will be started on ~~August 28th, 2024~~ **September 4th, 2024** during normal UK business hours.

*Update August 14, 2024: Most of the ecosystem has already updated to support authenticated media with only a few bug fixes pending release. To give a little bit more buffer for these bug fixes to roll out, we've moved our scheduled date to September 4th, 2024.*

All media uploaded and cached prior to the freeze will remain accessible on the unauthenticated endpoints and authenticated endpoints. Media uploaded and cached after the freeze will only be available through the authenticated endpoints, not the unauthenticated ones.

## Developer support

The team is making themselves available in the [#matrix-client-developers:matrix.org](https://matrix.to/#/#matrix-client-developers:matrix.org) and [#matrix-homeserver-developers:matrix.org](https://matrix.to/#/#matrix-homeserver-developers:matrix.org) rooms on Matrix to help support developers in implementing this feature. Client, server, and bridge authors are welcome to visit those rooms to get help in figuring out what needs to happen to support authenticated media. Further resources are also available in the [Matrix 1.11 blog post](https://matrix.org/blog/2024/06/20/matrix-v1.11-release/).

For questions about the rollout itself, the freeze date, or the (beta.)matrix.org homeserver, please visit [#foundation-office:matrix.org](https://matrix.to/#/#foundation-office:matrix.org) on Matrix.

We look forward to seeing the ecosystem working towards a safer, authenticated, experience for users.

Thank you,

Travis Ralston & the whole Matrix.org Foundation team
