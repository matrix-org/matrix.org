+++
title = "Matrix.to: Reloaded"
date = "2020-12-17T15:08:45Z"
updated = "2020-12-17T14:11:52Z"
path = "/blog/2020/12/17/matrix-to-reloaded"

[taxonomies]
author = ["Nad Chishtie"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/2020-12-17-matrix_to.png"
+++

One of the goals on the core team is to reduce friction for new users joining Matrix. A challenge we regularly face is all the factors which make Matrix flexible and powerful as an open, secure decentralised protocol also increase the difficulty of getting started.

As one example— to create a healthy, vibrant ecosystem and put power back into the hands of end users, it’s critical multiple clients exist, and that users ultimately have control over which one to use. However, needing to choose a client before getting going is counter-intuitive, and adds cognitive load which proprietary services simply don’t have.

Striking this balance is tricky, and one we’re aiming to improve with the latest version of [Matrix.to](https://www.matrix.to).

## What's Matrix.to?

Matrix.to is a simple URL redirection service which lets users share links to rooms, users and communities. It isn’t tied to any client, and for end users it serves as a landing page for many as their first touch to Matrix. And until the matrix:// URI scheme is deployed commonplace (we finally [registered it with IANA](https://www.iana.org/assignments/uri-schemes/prov/matrix) a few months ago!) it is the only client-agnostic way to link to content in Matrix.

It’s privacy preserving, with no information stored server side, with all calculation done in client-side JavaScript. It started life years ago as a temporary minimum viable hack by Matthew which then hung around untouched for years being… minimally viable. But we’ve recently given it a huge upgrade in usability and functionality at last!

## What's new?

![The matrix.to room, on the new matrix.to!](https://matrix.org/blog/img/2020-12-17-matrix_to.png)

We’ve re-written matrix.to from scratch, giving it a visual upgrade and refocused the experience around:

1. **Helping new users find the best client for them to easily get going.** By default, links will prioritise showing clients which are compatible with the platform the link is being viewed from, including mobile platforms.

2. **Optionally, remembering your preferred client for future visits.** This also includes deeplinking into native apps for Element Desktop & Element Mobile (and in future, other clients too, of course).

3. **Fetching useful previews.** One of our main observations when testing with new users is a lack of confidence trying out a new service without personalised, contextual information on the rooms or people they’re heading to. Matrix.to now displays room metadata like avatars, names and topics directly (fetched via matrix.org by default, asking for permission).

## What's next?

We’ve baked in the ability to specify clients and deployments within links, allowing sharing to give the option of a specific destination to guarantee a predictable experience. For instance, Mozilla might share matrix.to links which recommend using chat.mozilla.org, if you don’t already have a preferred Matrix client configured. We’ve yet to implement this feature in Element, but we’ll be researching and experimenting with different implementations soon and will recommend best practises when we have them.

We plan to evolve matrix.to over time, including eventually evolving it to better support the [Matrix URI scheme](https://github.com/matrix-org/matrix-doc/pull/2312). As before, you can find the source code [on GitHub](https://github.com/matrix-org/matrix.to) and please go ahead and submit pull requests to get your Matrix client listed.

Let us know what you think over in the matrix.to room, [linked to via matrix.to](https://matrix.to/#/#matrix.to:matrix.org)!
