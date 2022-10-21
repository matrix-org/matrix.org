+++
title = "Synapse 1.39.0 released"
path = "/blog/2021/07/29/synapse-1-39-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.39.0 is now available!

We've done quite a bit of work this release on Synapse's new interface for extension modules:

- Synapse's `account_validity` option has been extracted into a built-in [extension module](https://matrix-org.github.io/synapse/v1.39/modules.html#account-validity-callbacks). If your configuration previously enabled `account_validity`, it will continue working as before, but it is now easier to override and customize.
- The third party event rules callbacks have also been [experimentally ported](https://matrix-org.github.io/synapse/v1.39/modules.html#third-party-rules-callbacks) to the new module interface.

We've also improved the Space Summary API to list all rooms which a user could join ([#10298](https://github.com/matrix-org/synapse/pull/10298)). This is especially important with the pending standardization of Room Version 8, which includes _[MSC3083](https://github.com/matrix-org/matrix-doc/pull/3083): Restricting room membership based on membership in other rooms._

MadLittleMods landed several pull requests on the path to implementing _[MSC2716](https://github.com/matrix-org/matrix-doc/pull/2716): Incrementally importing history into existing rooms_ ([#10250](https://github.com/matrix-org/synapse/pull/10250), [#10276](https://github.com/matrix-org/synapse/pull/10276)).

More than anything else, this release contains an absolutely enormous load of internal cleanup. For example:

- ShadowJonathan ran `pyupgrade` on the entire codebase, bringing it up to modern Py3.6+ conventions, then separately used `com2ann` to move us from legacy `# type: foo` type hints to more modern inline annotations.
- We finished converting several integer columns in our database to bigint as a precautionary measure.
- We've made innumerable improvements to our CI configuration; including moving completely to GitHub Actions.
- Countless small improvements to performance, reliability, and error logging.

But that's not all! Synapse 1.39 also allows for setting credentials for HTTP proxy connections thanks to work by dklimpel; previously, Synapse was only able to provide authentication for HTTPS proxies.

Please see the [Upgrade Notes](https://matrix-org.github.io/synapse/v1.39/upgrade.html#upgrading-to-v1390) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.39.0/CHANGES.md) for a complete list of changes in this rele ase.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [andir](https://github.com/andir), [dklimpel](https://github.com/dklimpel), [ilmari](https://github.com/ilmari), [LukeWalsh](https://github.com/LukeWalsh), [moritzdietz](https://github.com/moritzdietz), [ShadowJonathan](https://github.com/ShadowJonathan), and [xmunoz](https://github.com/xmunoz).
