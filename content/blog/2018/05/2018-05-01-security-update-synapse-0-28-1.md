+++
title = "SECURITY UPDATE: Synapse 0.28.1"
path = "/blog/2018/05/01/security-update-synapse-0-28-1"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

Many people will have noticed disruption in #matrix:matrix.org and #matrix-dev:matrix.org on Sunday, when a validation bug in Synapse was exploited which allowed a malicious event to be inserted into the room with 'depth' value that made the rooms temporarily unusable. Whilst a transient workaround was found at the time (thanks to /dev/ponies, kythyria and Po Shamil for the workaround and to Half-Shot for working on a proposed fix), we're doing an urgent release of Synapse 0.28.1 to provide a temporary solution which will mitigate the attack across all rooms in upgraded servers and un-break affected ones.  Meanwhile we have a full long-term fix on the horizon (hopefully) later this week.

<strong>This vulnerability has already been exploited in the wild; please upgrade as soon as possible.</strong>

Synapse 0.28.1 is available from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.28.1">https://github.com/matrix-org/synapse/releases/tag/v0.28.1</a> as normal.

The 'depth' parameter is used primarily as a way for servers to signal the intended cosmetic order of their events within a room (particularly when the room's message graph has gaps in it due to the server being offline, or due to users backfilling old disconnected chunks of conversation). This means that affected rooms may experience message ordering problems until a full long-term fix is provided, which we're working on currently (and tentatively involves no longer trusting 'depth' information from servers).  For full details you can see the proposal documents for the <a href="https://docs.google.com/document/d/1I3fi2S-XnpO45qrpCsowZv8P8dHcNZ4fsBsbOW7KABI/edit#">temporary fix in 0.28.1</a> and the options for the<a href="https://docs.google.com/document/d/16ofbjluy8ZKYL6nt7WLHG4GqSodJUWLUxHhI6xPEjr4/edit#"> imminent long-term fix</a>.

We'd like to acknowledge jzk for identifying the vulnerability, and Max Dor for providing feedback on the fixes.

As a general reminder, Synapse is still beta (as is the Matrix spec) and the federation API particularly is still being debugged and refined and is pre-r0.0.0. For the benefit of the whole community, please disclose vulnerabilities and exploits responsibly by emailing security@ or DMing someone from +matrix:matrix.org. Thanks.

## Changes in synapse v0.28.1 (2018-05-01)

<strong>SECURITY UPDATE</strong>
<ul>
  <li>Clamp the allowed values of event depth received over federation to be [0, 2^63 - 1]. This mitigates an attack where malicious events injected with depth = 2^63 - 1 render rooms unusable. Depth is used to determine the cosmetic ordering of events within a room, and so the ordering of events in such a room will default to using stream_ordering rather than depth (topological_ordering). This is a temporary solution to mitigate abuse in the wild, whilst a long solution is being implemented to improve how the depth parameter is used.Full details at <a href="https://docs.google.com/document/d/1I3fi2S-XnpO45qrpCsowZv8P8dHcNZ4fsBsbOW7KABI" rel="nofollow">https://docs.google.com/document/d/1I3fi2S-XnpO45qrpCsowZv8P8dHcNZ4fsBsbOW7KABI</a></li>
  <li>Pin Twisted to &lt;18.4 until we stop using the private _OpenSSLECCurve API.</li>
</ul>
