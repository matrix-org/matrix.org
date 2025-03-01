+++
title = "Urgent Synapse 0.26.1 hotfix out"
path = "/blog/2018/03/16/urgent-synapse-0-26-1-hotfix-out"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

We just rushed out an urgent hotfix release for Synapse 0.26.1, addressing a nasty bug in the ujson library which causes it to misbehave badly in the presence of JSON containing very large &gt;64-bit integers.  Anyone whose synapses are currently filling up with "Value too big!" errors will want to upgrade immediately from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.26.1">https://github.com/matrix-org/synapse/releases/tag/v0.26.1</a>.

Sorry for the inconvenience.

### Changes in synapse v0.26.1 (2018-03-15)

Bug fixes:
<ul>
  <li>Fix bug where an invalid event caused server to stop functioning correctly, due to parsing and serializing bugs in ujson library.</li>
</ul>
