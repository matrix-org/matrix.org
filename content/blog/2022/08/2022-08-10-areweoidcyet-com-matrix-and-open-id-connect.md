+++
title = "areweoidcyet.com - Matrix and OpenID Connect"
date = "2022-08-10T16:23:17Z"
path = "/blog/2022/08/10/areweoidcyet-com-matrix-and-open-id-connect"

[taxonomies]
author = ["Hugh Nimmo-Smith"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

TL;DR: we’ve just launched [areweoidcyet.com](https://areweoidcyet.com) to track the project to adopt OpenID Connect (OIDC) as _the_ authentication method used by Matrix. It has a load of useful resources ([FAQs](https://areweoidcyet.com/#faqs), [status](https://areweoidcyet.com/#when) etc.) so do please check it out!

Hey folks,

As you may know, there is a [proposal](https://github.com/matrix-org/matrix-spec-proposals/pull/3861) and project afoot to change the way authentication is done in Matrix…

Currently Matrix uses a [custom authentication protocol](https://spec.matrix.org/v1.3/client-server-api/#client-authentication) baked into the Matrix spec. This poses a number of drawbacks. To overcome these drawbacks the project proposes migrating to use the industry standard authentication protocol OpenID Connect (OIDC) instead.

In terms of why this is a good idea: [MSC3861](https://github.com/matrix-org/matrix-spec-proposals/blob/hughns/delegated-oidc-architecture/proposals/3861-delegated-oidc-architecture.md) has all the details - please check it out!

The bottom line is that Matrix should focus on being a decentralised communication protocol - **not** an authentication protocol… and by adopting a dedicated authentication protocol we can benefit from all sorts of goodies such as easy 2FA and MFA, passwordless-auth via WebAuthn, Login via QR-code, alternative CAPTCHAs and so much more.

In support of this the proposal extends to the Matrix.org Foundation joining the OpenID Foundation as a non-profit member to support the work that the OpenID Foundation is doing to build a robust and audited ecosystem for open authentication.

Whilst this project proposes a significant change to the Matrix ecosystem that would take some time to migrate to, we believe that it will better support the continued growth and adoption of Matrix in the years to come.

Today we are launching the [areweoidcyet.com](https://areweoidcyet.com/) website which is packed with information and resources on the project:

* What? Why? When?
* MSC proposals
* Status of homeservers, clients, auth servers (OIDC Providers/OPs)
* A client implementation guide
* Links to the Matrix OIDC Playground environment where you can try out the latest progress

Please do take a look and come join us at [#matrix-auth:matrix.org](https://matrix.to/#/#matrix-auth:matrix.org)!

Best wishes,

Hugh & Quentin
