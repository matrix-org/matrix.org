+++
title = "Synapse 1.17.0 released"
date = "2020-07-13T16:38:01Z"
updated = "2020-07-13T16:21:49Z"
path = "/blog/2020/07/13/synapse-1-17-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.17.0 is here!

Hot on the heels of Synapse 1.16.1, 1.17.0 is a bug fix release most notably containing a fix for ['stuck invites'](https://github.com/matrix-org/synapse/issues/2181) which happen when we are unable to reject a room invite received over federation.

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.17.0 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.17.0).

Changelog for 1.17.0 follows:

## Synapse 1.17.0 (2020-07-13)

Synapse 1.17.0 is identical to 1.17.0rc1, with the addition of the fix that was included in [1.16.1](https://github.com/matrix-org/synapse/releases/v1.16.1).

## Synapse 1.17.0rc1 (2020-07-09)

### Bugfixes

- Fix inconsistent handling of upper and lower case in email addresses when used as identifiers for login, etc. Contributed by @dklimpel. ([\#7021](https://github.com/matrix-org/synapse/issues/7021))
- Fix "Tried to close a non-active scope!" error messages when opentracing is enabled. ([\#7732](https://github.com/matrix-org/synapse/issues/7732))
- Fix incorrect error message when database CTYPE was set incorrectly. ([\#7760](https://github.com/matrix-org/synapse/issues/7760))
- Fix to not ignore `set_tweak` actions in Push Rules that have no `value`, as permitted by the specification. ([\#7766](https://github.com/matrix-org/synapse/issues/7766))
- Fix synctl to handle empty config files correctly. Contributed by @kotovalexarian. ([\#7779](https://github.com/matrix-org/synapse/issues/7779))
- Fixes a long standing bug in worker mode where worker information was saved in the devices table instead of the original IP address and user agent. ([\#7797](https://github.com/matrix-org/synapse/issues/7797))
- Fix 'stuck invites' which happen when we are unable to reject a room invite received over federation. ([\#7804](https://github.com/matrix-org/synapse/issues/7804), [\#7809](https://github.com/matrix-org/synapse/issues/7809), [\#7810](https://github.com/matrix-org/synapse/issues/7810))

### Updates to the Docker image

- Include libwebp in the Docker file to properly handle webp image uploads. ([\#7791](https://github.com/matrix-org/synapse/issues/7791))

### Improved Documentation

- Improve the documentation of the non-standard JSON web token login type. ([\#7776](https://github.com/matrix-org/synapse/issues/7776))
- Update doc links for caddy. Contributed by Nicolai Søborg. ([\#7789](https://github.com/matrix-org/synapse/issues/7789))

### Internal Changes

- Refactor getting replication updates from database. ([\#7740](https://github.com/matrix-org/synapse/issues/7740))
- Send push notifications with a high or low priority depending upon whether they may generate user-observable effects. ([\#7765](https://github.com/matrix-org/synapse/issues/7765))
- Use symbolic names for replication stream names. ([\#7768](https://github.com/matrix-org/synapse/issues/7768))
- Add early returns to `_check_for_soft_fail`. ([\#7769](https://github.com/matrix-org/synapse/issues/7769))
- Fix up `synapse.handlers.federation` to pass mypy. ([\#7770](https://github.com/matrix-org/synapse/issues/7770))
- Convert the appserver handler to async/await. ([\#7775](https://github.com/matrix-org/synapse/issues/7775))
- Allow to use higher versions of prometheus_client <0.9.0 which are expected to introduce no breaking changes. Contributed by Oliver Kurz. ([\#7780](https://github.com/matrix-org/synapse/issues/7780))
- Update linting scripts and codebase to be compatible with `isort` v5. ([\#7786](https://github.com/matrix-org/synapse/issues/7786))
- Stop populating unused table `local_invites`. ([\#7793](https://github.com/matrix-org/synapse/issues/7793))
- Ensure that strings (not bytes) are passed into JSON serialization. ([\#7799](https://github.com/matrix-org/synapse/issues/7799))
- Switch from simplejson to the standard library json. ([\#7800](https://github.com/matrix-org/synapse/issues/7800))
- Add `signing_key` property to `HomeServer` to save code duplication. ([\#7805](https://github.com/matrix-org/synapse/issues/7805))
- Improve stacktraces from exceptions in background processes. ([\#7808](https://github.com/matrix-org/synapse/issues/7808))
- Fix various spelling errors in comments and log lines. ([\#7811](https://github.com/matrix-org/synapse/issues/7811))
