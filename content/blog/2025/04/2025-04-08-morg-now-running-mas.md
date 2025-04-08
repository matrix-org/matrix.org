+++
date = "2025-04-08T15:30:00Z"
title = "Matrix.org is now running MAS!"

[taxonomies]
author = ["Quentin"]
category = ["matrix.org homeserver"]
+++

We're thrilled to announce that the migration of matrix.org to the Matrix Authentication Service (MAS) is complete and went according to plan - having been running for over 24h in our brave new world, we’re declaring the migration a success! As of Monday April 7th 07:30 UTC, matrix.org is running on Matrix’s [next-generation auth system](https://github.com/matrix-org/matrix-spec-proposals/blob/hughns/delegated-oidc-architecture/proposals/3861-next-generation-auth.md) based on OAuth 2.0/OpenID Connect.

This is no mean feat - the migration shifted all 45M access tokens and 110M users from Synapse to MAS in under 30 minutes (thanks in part to MAS’s cheeky use of the x86-64-v2 architecture; who knew that database migrations can be SIMD-accelerated?) - and represents the culmination of over 4 years of work to move Matrix to a modern authentication standard. Many thanks go to Element for funding, Hugh, Olivier and many other contributors who helped me make Next Gen Auth happen!

<!-- more -->

## What does this mean for you?

Check back to our [previous announcement](https://matrix.org/blog/2025/04/matrix-auth-service/) for the full details of migration, but your existing sessions remain active - no logging out and back in required.

The move to MAS provides enormous improvements to security and usability:

* Access tokens rotate regularly, a leaked token has a limited lifespan  
* A single home for your account credentials which password managers can manage for you  
* Consistent auth and account management experience across apps  
* All Matrix.org users can finally fully enjoy next generation clients like Element X  
* A solid basis for all our upcoming authentication features, which we’ll enable on matrix.org as they get approved for merge in the Matrix spec:  
  * Login via QR code, complete with E2EE identity!  
  * Support for 2FA, MFA, Passkeys etc  
  * OAuth 2.0 scopes let users control what features an app can access.

## Your account has a new home

[**account.matrix.org**](https://account.matrix.org/) is now the dedicated home for managing your matrix.org account, which you can access through your browser or supported clients. Here you can:

- View and manage your connected devices  
- Update your email address and contact information  
- Change your password  
- Manage account settings and security options

(Eagle-eyed users may notice that client URLs for web logins aren’t shown in account.matrix.org - this only affects migrated devices; new logins will show up correctly. One workaround is to use the native device manager in Element Web to see the URLs of your old sessions).

## See it in action

If you’re wondering what the new world of Next Gen Auth looks like, but don’t want to mess around logging in to a new client - fear not, for we have videos!

Here’s an example of native Next Gen Auth in Element X iOS logging into the shiny new matrix.org system:

{{ youtube_player(video_id="K5dxgNN1Vmc") }}

…and here’s Fractal showing off its native Next Gen Auth support too!

{{ youtube_player(video_id="uvP24r7ul04") }}

# Moving forward

The MSCs that power this new authentication system have now all completed their Final Comment Period and will be merged into the next spec release!

* [MSC3861: Next-generation auth for Matrix, based on OAuth 2.0/OIDC](https://github.com/matrix-org/matrix-spec-proposals/pull/3861)  
* [MSC2964: Usage of OAuth 2.0 authorization code grant and refresh token grant](https://github.com/matrix-org/matrix-spec-proposals/pull/2964)  
* [MSC2965: OAuth 2.0 Authorization Server Metadata](https://github.com/matrix-org/matrix-spec-proposals/pull/2965)  
* [MSC2966: Usage of OAuth 2.0 Dynamic Client Registration in Matrix](https://github.com/matrix-org/matrix-spec-proposals/pull/2966)  
* [MSC2967: API scopes](https://github.com/matrix-org/matrix-spec-proposals/pull/2967)  
* [MSC4254: Usage of RFC7009 Token Revocation for Matrix client logout](https://github.com/matrix-org/matrix-spec-proposals/pull/4254)


Next up is landing all the non-core MSCs and then getting them enabled on matrix.org too:

* [MSC3824: OIDC aware clients #3824](https://github.com/matrix-org/matrix-spec-proposals/pull/3824)  
* [MSC4108: Mechanism to allow OIDC sign in and E2EE set up via QR code #4108](https://github.com/matrix-org/matrix-spec-proposals/pull/4108)  
* [MSC4190: Device management for application services #4190](https://github.com/matrix-org/matrix-spec-proposals/pull/4190)  
* [MSC4191: Account management deep-linking #4191](https://github.com/matrix-org/matrix-spec-proposals/pull/4191)  
* [MSC4198: Usage of OIDC login_hint #4198](https://github.com/matrix-org/matrix-spec-proposals/pull/4198)

## Questions or issues?

If you encounter any problems or have questions about the new authentication system, please join us in [Matrix Auth & Identity](https://matrix.to/#/#matrix-auth:matrix.org) where the team resides.  
