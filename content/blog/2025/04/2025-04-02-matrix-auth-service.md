+++
date = "2025-04-02T15:00:00Z"
title = "Matrix.org will migrate to MAS on Apr 7th 2025"

[taxonomies]
author = ["Quentin"]
category = ["General"]
+++

**On Monday 7th of April 2025 at 7am UTC, we will migrate the Matrix.org homeserver's authentication system over to MAS (Matrix Authentication Service) in order to benefit from Next-generation authentication.**

The migration will involve up to one hour of downtime.

[MSC3861](https://github.com/matrix-org/matrix-spec-proposals/pull/3861) (Next-generation auth for Matrix, based on OAuth 2.0/OpenID Connect (OIDC)) and its dependent MSCs have progressed sufficiently that the Foundation is confident in MAS and the new next-generation auth APIs. Specifically, all the MSCs are now in or have passed Final Comment Period (FCP) with disposition to merge! 🎉

We expect the MSCs to finish FCP and get merged into the next spec release. The full list of core Next-gen Auth MSCs is:

* [MSC3861: Next-generation auth for Matrix, based on OAuth 2.0/OIDC](https://github.com/matrix-org/matrix-spec-proposals/pull/3861)
* [MSC2964: Usage of OAuth 2.0 authorization code grant and refresh token grant](https://github.com/matrix-org/matrix-spec-proposals/pull/2964)
* [MSC2965: OAuth 2.0 Authorization Server Metadata](https://github.com/matrix-org/matrix-spec-proposals/pull/2965)
* [MSC2966: Usage of OAuth 2.0 Dynamic Client Registration in Matrix](https://github.com/matrix-org/matrix-spec-proposals/pull/2966)
* [MSC2967: API scopes](https://github.com/matrix-org/matrix-spec-proposals/pull/2967)
* [MSC4254: Usage of RFC7009 Token Revocation for Matrix client logout](https://github.com/matrix-org/matrix-spec-proposals/pull/4254)

This is incredibly exciting, reflecting 4 years of work on next-generation auth, and brings with it a new account management interface, additional security, and a better registration experience.

<!-- more -->

### The account management interface

You will be able to manage your account on a **dedicated interface at [account.matrix.org](https://account.matrix.org)** (accessible through your client or browser), where you can:

* See and delete your devices.
* Update your contact information, like your email address.
* Change your password and deactivate your account.

{{ figure(
    img="/blog/img/mas-devices.webp"
    caption="The new device overview in MAS")
}}

### Improved security

MAS comes with a significant refactoring of how authentication works on Matrix. Without breaking compatibility with the former authentication API, it brings several benefits

* Now, only your server will be able to see your account credentials! No more typing your password in every client you’d like to log in to.
* Restricted access to sensitive operations, like deactivating your account.
* Clearer view of which clients are using your account.

{{ figure(
    img="/blog/img/mas-grant-access.webp"
    caption="An example of the scope request view of MAS showing Element requesting permissions to see the profile, view existing messages and data and sending messages on your behalf.")
}}

### Improved registration experience

Regardless of the client you use, the new registration and login experience makes it clear where your account lives, and it supports next-generation clients like Element X.

{{ figure(
    img="/blog/img/mas-create-account.webp"
    caption="The new Registration Dialog for MAS showing an input field for a username and various social logins")
}}

## Impact

Your current sessions will remain active after the migration has taken effect. In other words, you will not be logged out of your clients.

We’re providing backwards compatibility for existing Matrix clients - this does not remove the stable pre-Matrix 2.0 APIs. You can read more about the impact on clients in our previously published blog article - [Authentication changes on Matrix.org](https://matrix.org/blog/2025/01/06/authentication-changes/).

## This is only the beginning!

Matrix Authentication Service is Matrix's next-generation authentication stack. Together with the next-generation authentication APIs, it is the base of a new exciting era for authentication in Matrix!

This has been one of the most ambitious projects within the Matrix project, the result of a multi-year investment by Element, funded in turn by Element’s customers, including BWI.

It will enable new forms of authentication flows, like QR-code login (coming soon to matrix.org with [MSC4108](https://github.com/matrix-org/matrix-spec-proposals/pull/4108)), and new categories of applications building on Matrix, thanks to fine-grained control over client access to the account.

You can find all the technical details in Quentin's Matrix Conference talk, [Harder Better Faster Stronger Authentication with OpenID Connect](https://www.youtube.com/watch?v=wOW8keNafdE).

**Finally, if you have any concerns, please come talk to us in [#matrix-auth:matrix.org](https://matrix.to/#/#matrix-auth:matrix.org)**
