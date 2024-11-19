+++
title = "Security update: Synapse 0.33.1"
path = "/blog/2018/08/02/security-update-synapse-0-33-1"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases", "Security"]
+++

Hi All,

We have patched two securities vulnerabilities (details follow), we do not believe either have been exploited in the wild, but recommend upgrading asap.

As always you can get the new update from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.1">https://github.com/matrix-org/synapse/releases/tag/v0.33.1</a> or from any of the sources mentioned at <a href="https://github.com/matrix-org/synapse/">https://github.com/matrix-org/synapse/</a>

Thanks

### Changes in Synapse v0.33.1 (2018-08-2)

<ul>
  <li>Fix a potential issue where servers could request events for rooms they have not joined. (<a href="https://github.com/matrix-org/synapse/issues/3641">#3641</a>)</li>
  <li>Fix a potential issue where users could see events in private rooms before they joined. (<a href="https://github.com/matrix-org/synapse/issues/3642">#3642</a>)</li>
</ul>
