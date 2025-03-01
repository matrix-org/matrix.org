+++
title = "Synapse 1.46.0 released"
path = "/blog/2021/11/02/synapse-1-46-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.46.0 is out now and includes support for Ubuntu 21.10: Impish Indri.

This release includes a fix for a [performance regression](https://github.com/matrix-org/synapse/issues/11049) that surfaced in Synapse 1.44.

## Progress on Threading

While still disabled by default, we're beginning to land code in Synapse to support threaded discussions in Matrix. In particular, the `m.thread` event relationship defined in [MSC3440](https://github.com/matrix-org/matrix-doc/pull/3440) is now implemented behind a configuration flag.

There are still many open questions here, and MSC3440 has not yet been approved to merge into the Matrix spec, but it's a start. Threading is essential to Matrix's continued growth and adoption, and we're excited to provide server-side support to this effort.

## Bug Fixes and Refactors

This release is mostly comprised of bug fixes and improvements to static typing. Of note:

- The `export-data` admin command now works and is tested in CI. This command helps server administrators respond to GDPR Subject Access Requests.
- A weeks-long effort to refactor how Synapse validates the `auth_events` field of incoming PDUs has concluded, resolving a few corner cases which could incorrectly allow events into the room state which should instead be rejected.
- Further static type hints have been added to Synapse, improving our precise type coverage to 85% of all lines. Currently, 13% of the Python files in `synapse/` are skipped during mypy runs. We'd like to cut this in half by the end of the year, as well as increasing overall precise coverage in the codebase.

## Sydent 2.5.0

This week also saw the release of [Sydent 2.5.0](https://github.com/matrix-org/sydent/releases/tag/v2.5.0), the reference implementation of a Matrix Identity Server. In addition to fixing bugs, Sydent 2.5.0 passes `mypy --strict`, uses Jinja2 for templates, and supports the `room_type` field from [MSC3288](https://github.com/matrix-org/matrix-doc/pull/3288) to better differentiate between invitations to rooms and invitations to Spaces.

## Everything Else

- The Admin API to [create or modify accounts](https://matrix-org.github.io/synapse/v1.46/admin_api/user_admin_api.html#create-or-modify-account) now accepts a `user_type` field, allowing for accounts to be set as belonging to bots or support staff.
- [Password auth providers](https://matrix-org.github.io/synapse/v1.46/modules/password_auth_provider_callbacks.html) can now be implemented using the new pluggable extension module APIs.

Please see the Synapse [Release Notes](https://github.com/matrix-org/synapse/blob/v1.46.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [aaronraimist](https://github.com/aaronraimist), [AndrewFerr](https://github.com/AndrewFerr), [dklimpel](https://github.com/dklimpel), and [Legogris](https://github.com/Legogris).
