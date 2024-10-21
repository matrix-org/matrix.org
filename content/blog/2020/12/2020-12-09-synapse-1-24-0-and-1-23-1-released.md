+++
title = "Synapse 1.24.0 and 1.23.1 released"
date = "2020-12-09T23:51:05Z"
path = "/blog/2020/12/09/synapse-1-24-0-and-1-23-1-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases", "Security"]
+++

  [Synapse 1.24.0](https://github.com/matrix-org/synapse/releases/tag/v1.24.0) is now available!

  This release fixes a denial of service vulnerability ([GHSA-hxmp-pqch-c8mm](https://github.com/matrix-org/synapse/security/advisories/GHSA-hxmp-pqch-c8mm) / [CVE-2020-26257](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26257)) in which a malicious homeserver could send malformed events into a room which would then break federation of that room.

  This follows the disclosure of a denial of service vulnerability in OpenSSL ([CVE-2020-1971](https://www.openssl.org/news/secadv/20201208.txt)). If you have installed Synapse from source, please ensure your host is up to date and then execute `pip install 'cryptography>=3.3'` inside your Synapse virtualenv.

  We've also released [Synapse 1.23.1](https://github.com/matrix-org/synapse/releases/tag/v1.23.1) which includes that security fix and a small patch to maintain Python 3.5 compatibility. It is otherwise [identical to 1.23.0](https://github.com/matrix-org/synapse/compare/v1.23.0...v1.23.1). Note that Synapse 1.24.0 includes backwards incompatible changes which may affect a small number of users. See the [notes on upgrading](https://github.com/matrix-org/synapse/blob/develop/UPGRADE.rst#upgrading-to-v1240) for more information.

  Synapse 1.24.0 brings a pair of new Admin APIs, including a way to [log in as users](https://github.com/matrix-org/synapse/blob/v1.24.0/docs/admin_api/user_admin_api.rst#login-as-a-user) and to [forcibly purge](https://github.com/matrix-org/synapse/blob/v1.24.0/docs/admin_api/rooms.md#delete-room-api) rooms when deleting them. We've also made numerous bug fixes and improvements to SSO support, especially around OpenID Connect and SAML providers.

  This release includes an optional change to push notification badges: currently, the number in the badge is based on the count of _rooms_ with unread messages. However, in some specialized cases you may want the badge to show the count of _all_ unread messages, even if there are multiple unread messages in the same room. This behavior can now be toggled with a [new configuration setting](https://github.com/matrix-org/synapse/pull/8820).

  Additionally, for server admins, the deprecated `/_matrix/client/*/admin` Admin API endpoints [have been removed](https://github.com/matrix-org/synapse/issues/8785). If you have tools which target these endpoints, please update them to use the `/_synapse/admin` URL prefix instead.

  See the [full changelog](https://github.com/matrix-org/synapse/blob/v1.24.0/CHANGES.md) for more.

  Installation instructions are available [on GitHub](https://github.com/matrix-org/synapse/blob/master/INSTALL.md), as is the `v1.24.0` [release tag](https://github.com/matrix-org/synapse/releases/tag/v1.24.0).

  Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [@angdraug](https://github.com/angdraug), [@chagai95](https://github.com/chagai95), [@daenney](https://github.com/daenney), [@dklimpel](https://github.com/dklimpel), [@jordanbancino](https://github.com/jordanbancino), [@localguru](https://github.com/localguru), [@nchamo](https://github.com/nchamo), [@ShadowJonathan](https://github.com/ShadowJonathan), [@TeFiLeDo](https://github.com/TeFiLeDo), [@tulir](https://github.com/tulir), and [@waylon531](https://github.com/waylon531).
