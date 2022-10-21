+++
title = "Synapse 1.31.0 released"
date = "2021-04-07T00:00:18Z"
path = "/blog/2021/04/06/synapse-1-31-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

We've released [Synapse 1.31.0](https://github.com/matrix-org/synapse/releases/tag/v1.31.0)!

Mainly internal changes this time (type hints, code lints, etc.) but we've also landed [some](https://github.com/matrix-org/synapse/pull/9643) [initial](https://github.com/matrix-org/synapse/pull/9652) [work](https://github.com/matrix-org/synapse/pull/9653) on [MSC2946: Spaces Summary](https://github.com/matrix-org/matrix-doc/pull/2946). And speaking of MSCs, Synapse 1.31 has an experimental flag which can enable support for the draft [MSC3026: "busy" presence state](https://github.com/matrix-org/matrix-doc/pull/3026).

Synapse 1.31 can now restrict OpenID Connect logins based on [userinfo attributes](https://github.com/matrix-org/synapse/pull/9609) (Thanks, HubbeKing!).

This release [fixes a rare infinite loop](https://github.com/matrix-org/synapse/pull/9634) when fetching cross-signing keys or handling device list updates, and [further](https://github.com/matrix-org/synapse/pull/9640) [improves](https://github.com/matrix-org/synapse/pull/9639) the speed of federation catchup. It also makes Admin APIs around user reactivation [behave correctly](https://github.com/matrix-org/synapse/pull/9636) when account passwords are disabled.

See the  [Release Notes](https://github.com/matrix-org/synapse/releases/tag/v1.31.0) for further information.

### The Final Python 3.5 Release

This is the last release of Synapse to support Python 3.5 or PostgreSQL 9.5, and the last release of official packages for Debian 9 (Stretch) and Ubuntu 16.04 LTS (Xenial).

Future releases of Synapse will follow upstream end-of-life dates for [Python](https://endoflife.date/python) and [Postgres](https://endoflife.date/postgresql).

Accordingly, we anticipate ending support for Python 3.6 and PostgreSQL 9.6 in December of this year. We will also cease producing packages for Ubuntu 18.04 LTS (Bionic) at that time.

### Thank You

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [ankitdobhal](http://github.com/ankitdobhal), [blakehawkins](http://github.com/blakehawkins), [dklimpel](http://github.com/dklimpel), [fuzzmz](http://github.com/fuzzmz), [HubbeKing](http://github.com/HubbeKing), [languitar](http://github.com/languitar), [sandhose](http://github.com/sandhose), and [ShadowJonathan](http://github.com/ShadowJonathan).
