+++
date = "2023-09-21T14:00:00Z"
title = "Better authentication, session management and permissions in Matrix"

[taxonomies]
author = ["Thib", "Matrix Auth Team"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-oidc.png"
+++

Before we explain all about our new authentication system - don't panic! This change is part of Matrix 2.0, the next step for Matrix that will be introduced in a blog post later today.

## Nothing breaks

Matrix 2.0 is a reference to Matthew’s FOSDEM talk [Matrix 2.0](https://archive.fosdem.org/2023/schedule/event/matrix20/), itself a reference to the name he coined in the [Matrix Summer Special 2022](https://matrix.org/blog/2022/08/15/the-matrix-summer-special-2022/#matrix-2-0): evolutions of the spec that are making the Matrix experience so much better it almost feels like a different protocol. One of the major changes in this bundle is the introduction of OpenID Connect-native Matrix and its implementation [matrix-authentication-service](https://github.com/matrix-org/matrix-authentication-service/) (MAS).

**Don’t panic: your current setup is not at risk, you don’t urgently need to deploy the [matrix-authentication-service](https://github.com/matrix-org/matrix-authentication-service/) to keep using Matrix.**

Let’s walk together through what OIDC-native Matrix, what changes as compared to the Matrix we know and love, and what’s the impact for your deployment.

## From OIDC-ish to OIDC

One of the most popular Matrix server implementations, Synapse, [supports authentication via OIDC](https://matrix-org.github.io/synapse/latest/usage/configuration/config_documentation.html#oidc_providers). This is the only mainstream server implementation to support authentication via an OpenID Connect Provider. OpenID Connect, SAML, and more generally Single Sign On (SSO) are a requirement for most companies past a certain size, as well as a security best practice.

As it is today, Synapse is more _OIDC-compatible_ than _OIDC-native_. This means that it’s possible to use SSO (typically OpenID Connect) to connect to Synapse, but that’s about where the OpenID Connect adventure stops. Once you’re authenticated, Synapse generates a Matrix Access Token for your client, but that is not an OAuth2/OIDC Access Token. From your client point of view, it is doing the “Matrix SSO dance” [defined by the spec](https://spec.matrix.org/v1.8/client-server-api/#client-login-via-sso), but the fact that Synapse does a login via OIDC, SAML or CAS is irrelevant to the client. Whenever your client asks Synapse for anything that requires being logged in, it sends that Matrix Access Token in the `Authorization` header of the http requests.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/20230921-classic-token.png)

While this approach has served Matrix well, the Matrix Access Token method is reimplementing some concepts of OpenID Connect without all the benefits of thousands of developers battle testing and fixing every edge case they meet.

[MSC3861](https://github.com/matrix-org/matrix-spec-proposals/pull/3861), which proposes the adoption of OIDC in Matrix, is all about embracing the best of OIDC to make Matrix even better. By adopting the standard OIDC flows we allow Matrix to stand on the shoulders of another battle-tested industry standard. Not only does it improve security overall, it also unlocks new use cases for Matrix.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/20230921-oidc-token.png)

## Unlocking use cases

The Matrix Access Tokens Matrix currently relies on are secure, but not very flexible. A unique token is granted to each and every client during user login. This Matrix Access Token is only revoked when the user manages their sessions and logs a device out. A Matrix Access Token gives full access to a Matrix Account. Session management based on Matrix Access Tokens is quite nuclear.

Using OpenID Connect for Matrix comes with three major areas of improvements:

* Standard authentication process on every client, including on devices without a keyboard
* Improved security with token rotation
* Better granularity of permissions (which improves security too!)

### Authenticate like you want

When relying on OIDC, the client delegates authentication to the OpenID Provider. This means that the client redirects the user to a web page on the OpenID Provider, where the user needs to authenticate. This authentication can happen through a username and password, WebAuthn (passwordless login), additional steps if you want to add MFA… and much more.

Since the authentication happens on the OpenID Provider, the client doesn’t need to support any authentication method other than “redirect the user to the OpenID Provider, and handle the result”. Once the user has authenticated against the OpenID Provider, it is going to be redirected back to its client, to allow it to retrieve an Access Token on their behalf.

During the whole process, no password was given to the client, and the client doesn’t even know how the user authenticated. All that matters to the client is that it now has an Access Token it can use to perform the regular Matrix API calls.

From the user perspective, the authentication is a very familiar process very well integrated in their password manager regardless of the client they use. They can use any client that supports OIDC, without having to worry about whether it supports every particular step of their authentication process. It’s also worth noting that matrix-authentication-service has a compatibility layer to support the `m.login.password` flow. This means compatibility with older clients will not break!

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/20230921-mas-ui.png)

From the administrator perspective, it’s possible to force authentication flows (e.g. MFA), making sure the login is secure and matches their organisation’s policies. It also makes it possible to have a central management of all users' devices, including the ability to enforce policies upon them as provided by the OpenID Provider. For example, it becomes possible to the re-authentication of the user if they leave a trusted network.

From the developer perspective, neither clients nor servers have to add support for every new authentication method, existing or to come.

Element has been spearheading the effort to implement [MSC3861](https://github.com/matrix-org/matrix-spec-proposals/pull/3861) and matrix-authentication-service, and Element X is the first client to support them. Here is how the authentication flow and account management look like as seen from Element X iOS.

{{ youtube_player(video_id="COCMi6sAghw") }}

### Token rotation

While current Matrix Access Token can expire thanks to [MSC2918](https://github.com/matrix-org/matrix-spec-proposals/pull/2918), this best practice didn’t make it to most of the clients of the ecosystem. If the access token of a user was leaked for one reason or another, they wouldn’t notice since this wouldn’t create a new session, and the leaked token would be valid forever. Please note that thanks to E2EE, attackers who gain access to a Matrix Access Token would not be able to read the encrypted content in encrypted rooms.

OpenID Connect relies on two tokens:

* an Access Token, that is used to perform the authenticated API calls, and that expires regularly,
* and a Refresh Token that is used in conjunction with the Access Token to rotate both.

This ensures that if the Access Token was leaked during an API call, its validity would be very limited in time. Leaking a Refresh Token will also have limited impact, since the server would notice that two different clients are trying to consume the same Refresh Token and would log the user out from devices using this token.

### Principle of least privilege

Matrix is not just about apps and servers. It’s also a vibrant ecosystem of widgets, bots and various CLI to toy with. One of the strengths of Matrix has been its hackability: log into a client, dump the matrix access token, and you can hand it to a CLI or a bot for it to do things on your behalf.

While this approach is particularly convenient for development, it comes with its own lot of issues. Most of the time you don’t want the CLI or bot to be able to do everything on your behalf.

Widgets are another case where OIDC can help. While [widgets are not yet part of the spec](https://github.com/matrix-org/matrix-spec-proposals/pull/2764), in practice they are already commonly used. In essence, a widget is a tiny app that has access to an (unspecified) widgets API that allows it to do a limited amount of things on behalf of the user, such as sending a message in the rooms it’s in. While this has served several clients well, this can be improved. Indeed, it’s up to the client to enforce the restrictions mandated by the widgets API. This means you can’t be assured that all the clients will consistently enforce them.

With OpenID Connect, widgets can eventually become tiny embedded Matrix clients on their own, and they can get their own Access Token with explicit and granular permissions of their own. Those restrictions will be enforced by the server, who will not even be aware it’s a widget calling the API, making the experience consistent across clients. This behaviour still needs to be added to the specification, but a more OIDC-native Matrix paves the way for it.

## Upgrading to use matrix-authentication-service

[MSC3861](https://github.com/matrix-org/matrix-spec-proposals/pull/3861) (and friends) define how the OIDC flows and concepts (e.g. token exchange, dynamic client registration) should be used in Matrix, as well as the requirements for things which need to be coordinated with the homeserver (e.g. session lifecycle management).

The [goals of matrix-authentication-service (MAS)](https://matrix-org.github.io/matrix-authentication-service/development/architecture.html#scope-and-goals) are two-fold: firstly, it provides an implementation of the MSCs to support the [Matrix Specification Change (MSC) process](https://github.com/matrix-org/matrix-spec-proposals); secondly, it provides capabilities to facilitate the transition of the Matrix ecosystem to OIDC.

Because MSC3861 is changing the technical mechanism by which your client gets access to your account it is not something that can be done by pushing a single, big button.Instead we need a transition period where both OIDC and the existing legacy Matrix authentication methods coexist so that different clients and homeservers can migrate at their own pace.

One way in which MAS facilitates this transition is by allowing deployments without an external Identity Provider (IdP) to use OIDC out-of-the-box. This means that MAS will support some of the current flows that Synapse supports, primarily in the form of password-based login. Please note those flows are not supported yet: MAS requires an external IdP for now.

Another way is that MAS allows for existing sessions and access tokens to be imported (just from Synapse so far) so that there is no need for clients to re-authenticate when a homeserver is migrated.

Because of these migration capabilities we expect MAS to be widely used, however, in keeping with the open philosophy of Matrix, we expect other implementations to exist either standalone or integrated with other OIDC providers like Keycloak or Dex.

MAS is not intended to be a fully fledged IdP solution: we suggest using a dedicated software for this if you want to do more than what is included.

Currently MAS is deployable as a sidecar service alongside the homeserver. While larger setups shouldn’t see this as a problem, it might be seen as cumbersome in smaller self-hosted setups. For the sake of convenience, the Synapse and MAS team are investigating how to bundle MAS along with Synapse natively using [PyO3](https://pyo3.rs/). We anticipate such a  bundle to exist by the end of Q2 2024.

You can browse [the matrix-authentication-service docs](https://matrix-org.github.io/matrix-authentication-service/setup/index.html) to get all the technical details and installation steps.
