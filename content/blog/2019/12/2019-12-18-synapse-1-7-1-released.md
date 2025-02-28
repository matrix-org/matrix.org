+++
title = "Synapse 1.7.1 released"
path = "/blog/2019/12/18/synapse-1-7-1-released"

[taxonomies]
author = ["Richard van der Hoff"]
category = ["Releases"]
+++

Hi folks; today we are releasing Synapse 1.7.1.

This is a security release which fixes some problems which affected all previous versions of Synapse. We advise all admins whose servers are open to public federation to upgrade as soon as possible.

Full details follow, but the most important change improves event authorization, thereby preventing the ability to add certain events to a given room erroneously.

You can get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.7.1) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

The changelog since 1.7.0 follows:

Security updates
----------------

- Fix a bug which could cause room events to be incorrectly authorized using events from a different room. ([\#6501](https://github.com/matrix-org/synapse/issues/6501), [\#6503](https://github.com/matrix-org/synapse/issues/6503), [\#6521](https://github.com/matrix-org/synapse/issues/6521), [\#6524](https://github.com/matrix-org/synapse/issues/6524), [\#6530](https://github.com/matrix-org/synapse/issues/6530), [\#6531](https://github.com/matrix-org/synapse/issues/6531))
- Fix a bug causing responses to the `/context` client endpoint to not use the pruned version of the event. ([\#6553](https://github.com/matrix-org/synapse/issues/6553))
- Fix a cause of state resets in room versions 2 onwards. ([\#6556](https://github.com/matrix-org/synapse/issues/6556), [\#6560](https://github.com/matrix-org/synapse/issues/6560))

Bugfixes
--------

- Fix a bug which could cause the federation server to incorrectly return errors when handling certain obscure event graphs. ([\#6526](https://github.com/matrix-org/synapse/issues/6526), [\#6527](https://github.com/matrix-org/synapse/issues/6527))
