+++
title = "Synapse 1.11.1 released"
path = "/blog/2020/03/03/synapse-1-11-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.11.1 is a security release which contains a fix impacting installations using Single Sign-On (i.e. SAML2 or CAS) for authentication. Administrators of such installations are encouraged to upgrade as soon as possible.

Admins not using Single Sign-On to authenticate users are not affected though may wish to upgrade anyway to pull in some unrelated bug fixes.

Thanks to [Rhys Davies](https://twitter.com/rhysmdnz) for the responsible disclosure.

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.11.1) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since Synapse 1.11.0

## Synapse 1.11.1 (2020-03-03)

This release includes a security fix impacting installations using Single Sign-On (i.e. SAML2 or CAS) for authentication. Administrators of such installations are encouraged to upgrade as soon as possible.

The release also includes fixes for a couple of other bugs.

### Bugfixes

- Add a confirmation step to the SSO login flow before redirecting users to the redirect URL. ([b2bd54a2](https://github.com/matrix-org/synapse/commit/b2bd54a2e31d9a248f73fadb184ae9b4cbdb49f9), [65c73cdf](https://github.com/matrix-org/synapse/commit/65c73cdfec1876a9fec2fd2c3a74923cd146fe0b), [a0178df1](https://github.com/matrix-org/synapse/commit/a0178df10422a76fd403b82d2b2a4ed28a9a9d1e))
- Fixed set a user as an admin with the admin API `PUT /_synapse/admin/v2/users/<user_id>`. Contributed by @dklimpel. ([\#6910](https://github.com/matrix-org/synapse/issues/6910))
- Fix bug introduced in Synapse 1.11.0 which sometimes caused errors when joining rooms over federation, with `'coroutine' object has no attribute 'event_id'`. ([\#6996](https://github.com/matrix-org/synapse/issues/6996))
