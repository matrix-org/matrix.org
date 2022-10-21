+++
title = "Synapse 1.62 released"
date = "2022-07-06T16:37:01Z"
path = "/blog/2022/07/06/synapse-1-62-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

Hey all, [Synapse
1.62](https://github.com/matrix-org/synapse/releases/tag/v1.62.0) is out! Let's
have a look inside.

## Spam checker improvements

In the past few weeks, the Synapse team has been working with the Matrix.org
Trust & Safety team to help module developers build more efficient protections
against spam. As a consequence of this work, Synapse 1.62 introduces new ways
for modules to communicate the result of actions taken against a specific
message or operation through the [spam checker module
callbacks](https://matrix-org.github.io/synapse/v1.62/modules/spam_checker_callbacks.html).

Previously, most spam checker callbacks would be expected to return a boolean
indicating whether a specific operation should be qualified as spam. Starting
from Synapse 1.62, modules are now expected to return either
`synapse.module_api.NOT_SPAM` (to indicate an action is not spammy), or an error
code that is part of `synapse.module_api.errors.Codes`.

Note that the previous behaviour is still supported but is now deprecated, and
will be removed in a future version of Synapse.

See [the upgrade
notes](https://matrix-org.github.io/synapse/v1.62/upgrade.html#new-signatures-for-spam-checker-callbacks)
for a list of the affected callbacks and an example of this change. Note that on
top of the list described there, the `check_event_for_spam` callback was also
[updated with a similar
change](https://matrix-org.github.io/synapse/v1.62/upgrade.html#new-signature-for-the-spam-checker-callback-check_event_for_spam)
in Synapse 1.61.

## Everything else

This release of Synapse includes important performance improvements around
syncing, specifically around handling device lists and notifications.

Synapse 1.62 also introduce a changes of its optional dependency on the [LDAP3
authentication provider
module](https://github.com/matrix-org/matrix-synapse-ldap3) to
[v0.2.1](https://github.com/matrix-org/matrix-synapse-ldap3/releases/tag/v0.2.1)
in order to fix an issue with usernames that include uppercase characters.

See the [full
changelog](https://github.com/matrix-org/synapse/releases/tag/v1.62.0) for a
complete list of changes in this release. Also please have a look at the
[upgrade
notes](https://matrix-org.github.io/synapse/v1.62/upgrade#upgrading-to-v1620)
for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order) [Beeper](https://www.beeper.com/), [Sami
Olmari](https://github.com/olmari), [Daniel
Aloni](https://github.com/Danieloni1),
[Thumbscrew](https://github.com/Thumbscrew) and [Hannes
Lerchl](https://github.com/aytchell).
