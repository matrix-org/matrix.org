+++
title = "Security update: Synapse 1.37.1 released"
path = "/blog/2021/06/30/security-update-synapse-1-37-1-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases", "Security"]
+++

Hi all,

Over the last few days we've seen a distributed spam attack across the public Matrix network, where large numbers of spambots have been registered across servers with open registration and then used to flood abusive traffic into rooms such as Matrix HQ.

The spam itself has been handled by [temporarily banning the abused servers](https://matrix.org/docs/guides/moderation#banning-servers). However, on Monday and Tuesday the volume of traffic triggered performance problems for the homeservers participating in targeted rooms (e.g. memory explosions, or very delayed federation).  This was due to a combination of factors, but one of the most important ones was Synapse issue [#9490](https://github.com/matrix-org/synapse/issues/9490): that one busy room could cause head-of-line blocking, starving your server from processing events in other rooms, causing all traffic to fall behind.

We're happy to say that Synapse 1.37.1 [fixes this](https://github.com/matrix-org/synapse/pull/10272) and we now process inbound federation traffic asynchronously, ensuring that one busy room won't impact others.  First impressions are that this has significantly improved federation performance and end-to-end encryption stability — for instance, new E2EE keys from remote users for a given conversation should arrive immediately rather than being blocked behind other traffic.

**Please upgrade to Synapse 1.37.1 as soon as possible, in order to increase resilience to any other traffic spikes.**

**Also, we highly recommend that you disable open registration or, if you keep it enabled, use SSO or require email validation to avoid abusive signups. Empirically adding a CAPTCHA is not enough. Otherwise you may find your server blocked all over the place if it is hosting spambots.**

**Finally, if your server has open registration, PLEASE check whether spambots have been registered on your server, and deactivate them.  Once deactivated, you will need to contact <abuse@matrix.org> to request that blocks on your server are removed**.

Your best bet for spotting and neutralising dormant spambots is to review signups on your homeserver over the past 3-5 days and deactivate suspicious users. We do not recommend relying solely on lists of suspicious IP addresses for this task, as the distributed nature of the attack means any such list is likely to be incomplete or include shared proxies which may also catch legitimate users.

To ease review, we're working on an auditing script in [#10290](https://github.com/matrix-org/synapse/pull/10290); feedback on whether this is useful would be appreciated. Problematic accounts can then be dealt with using the [Deactivate Account Admin API](https://matrix-org.github.io/synapse/v1.37/admin_api/user_admin_api.html#deactivate-account).

Meanwhile, over to Dan for the Synapse 1.37 release notes.

## Synapse 1.37 Release Announcement

Synapse 1.37 is now available!

> **Note:** The legacy APIs for Spam Checker extension modules are now considered deprecated and targeted for removal in August. Please see [the module docs](https://matrix-org.github.io/synapse/v1.37/modules.html#porting-an-existing-module-that-uses-the-old-interface) for information on updating.
>
> This release also removes Synapse's built-in support for the obsolete ACMEv1 protocol for automatically obtaining TLS certificates. Server administrators should place Synapse behind a [reverse proxy](https://matrix-org.github.io/synapse/v1.37/reverse_proxy.html) for TLS termination, or switch to a standalone ACMEv2 client like [certbot](https://certbot.eff.org/).

### Knock, knock?

After nearly 18 months and 129 commits, Synapse now includes support for [MSC2403: Add "knock" feature](https://github.com/matrix-org/matrix-doc/pull/2403) and [Room Version 7](https://spec.matrix.org/unstable/rooms/v7/)! This feature allows users to directly request admittance to private rooms, without having to track down an invitation out-of-band. One caveat: Though the server-side foundation is there, knocking is not _yet_ implemented in clients.

### A Unified Interface for Extension Modules

Third party modules can customize Synapse's behavior, implementing things like bespoke media storage providers or user event filters. However, Synapse previously lacked a unified means of enumerating and configuring third-party modules. That changes with Synapse 1.37, which introduces a new, [generic interface for extensions](https://matrix-org.github.io/synapse/v1.37/modules.html).

This new interface consolidates configuration into one place, allowing for more flexibility and granularity by explicitly registering callbacks with specific hooks. You can learn more about the new module API in the docs linked above, or in [Matrix Live](https://www.youtube.com/playlist?list=PLl5dnxRMP1hULbP8MYk2noPKFCFyg-SHK) S6E29, due out this Friday, July 2nd.

### Safer Reauthentication

User-interactive authentication ("UIA") is required for potentially dangerous actions like removing devices or uploading cross-signing keys. However, Synapse can optionally be configured to provide a brief grace period such that users are not prompted to re-authenticate on actions taken shortly after logging in or otherwise authenticating.

This improves user experience, but also creates risks for clients which rely on UIA as a guard against actions like account deactivation. Synapse 1.37 protects users by exempting especially risky actions from the grace period. See [#10184](https://github.com/matrix-org/synapse/pull/10184) for details.

### Smaller Improvements

We've landed a number of smaller improvements which, together, make Synapse more responsive and reliable. We now:

- More efficiently respond to key requests, preventing excessive load ([#10221](https://github.com/matrix-org/synapse/pull/10221), [#10144](https://github.com/matrix-org/synapse/pull/10144))
- Render docs for each `vX.Y` Synapse release, starting with v1.37 ([#10198](https://github.com/matrix-org/synapse/pull/10198))
- Ensure that log entries from failures during early startup are not lost ([#10191](https://github.com/matrix-org/synapse/pull/10191))
- Have a notion of database schema "compatibility versions", allowing for more graceful upgrades and downgrades of Synapse ([docs](https://matrix-org.github.io/synapse/v1.37/development/database_schema.html#synapse-schema-versions))

We've also resolved two bugs which could cause sync requests to immediately return with empty payloads ([#8518](https://github.com/matrix-org/synapse/issues/8518)), producing a tight loop of repeated network requests.

### Everything Else

Lastly, we've merged an experimental implementation of [MSC2716: Incrementally importing history into existing rooms](https://github.com/matrix-org/matrix-doc/pull/2716) ([#9247](https://github.com/matrix-org/synapse/pull/9247)) as part of Element's work to fully [integrate Gitter into Matrix](https://matrix.org/blog/2020/09/30/welcoming-gitter-to-matrix).

These are just the highlights; please see the [Upgrade Information](https://github.com/matrix-org/synapse/blob/v1.37.1/UPGRADE.rst#upgrading-to-v1370) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.37.1/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [aaronraimist](https://github.com/aaronraimist), [Bubu](https://github.com/Bubu), [dklimpel](https://github.com/dklimpel), [jkanefendt](https://github.com/jkanefendt), [lukaslihotzki](https://github.com/lukaslihotzki), [mikure](https://github.com/mikure), and [Sorunome](https://github.com/Sorunome),
