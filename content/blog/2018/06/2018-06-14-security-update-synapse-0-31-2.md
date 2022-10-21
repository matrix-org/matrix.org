+++
title = "Security update: Synapse 0.31.2"
path = "/blog/2018/06/14/security-update-synapse-0-31-2"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

On Monday (2018-06-11) we had an incident where #matrix:matrix.org was hijacked by a malicious user pretending to join the room immediately after its creation in 2014 and then setting an m.room.power_levels event ‘before' the correct initial power_level for the room.

Under normal circumstances this should be impossible because the initial m.room.power_levels for a room should be set before its m.room.join_rules event, meaning users who join the room are subject to its power levels. However, back before we'd even released Synapse, the first two rooms ever created in Matrix (#test:matrix.org and #matrix:matrix.org) were manually created and set the join_rules before the power_levels event, letting users join before the room's power_levels were defined, and so were vulnerable to this attack. We've since re-created #matrix:matrix.org - please re-/join the room if you haven't already!

As a defensive measure, we are releasing a security update of Synapse (0.31.2) today which changes the rules used to authenticate power_level events, such that we fail-safe rather than fail-deadly if the existing auth mechanisms fail. In practice this means changing the default power level required to set state to be 50 rather than 0 if there is no power_levels event present, thus meaning that only the room creator can set the initial power_levels event.

We are not aware of anyone abusing this (other than the old #matrix:matrix.org room) but we'd rather be safe than sorry, so would recommend that everyone upgrade as soon as possible.

This of course constitutes a change to the spec, so full technical details and ongoing discussion around the Matrix Spec Change proposal can be followed over at <a href="https://github.com/matrix-org/matrix-doc/issues/1304">MSC1304</a>.

<strong>EDIT</strong>: if you are aware of your server participating in rooms whose first power_levels event is deliberately set by a different user to their creator, please let us know asap (and don't upgrade!)

This work is all part of a general push to finalise and harden and fully specify the Server-Server API as we push towards a long-awaited stable release of Matrix!

As always, you can get the new update from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.31.2">https://github.com/matrix-org/synapse/releases/tag/v0.31.2</a> or from any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>.

thanks, and apologies for the inconvenience.
<h3>Changes in synapse v0.31.2 (2018-06-14)</h3>
SECURITY UPDATE: Prevent unauthorised users from setting state events in a room when there is no <code>m.room.power_levels</code> event in force in the room. (PR <a href="https://github.com/matrix-org/synapse/pull/3397">#3397</a>)

Discussion around the Matrix Spec change proposal for this change can be followed at <a href="https://github.com/matrix-org/matrix-doc/issues/1304">https://github.com/matrix-org/matrix-doc/issues/1304</a>.
