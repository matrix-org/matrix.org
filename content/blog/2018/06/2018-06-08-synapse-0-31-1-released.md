+++
title = "Synapse 0.31.1 Released!"
path = "/blog/2018/06/08/synapse-0-31-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Folks,

v0.31.1 fixes a security bug in the ``get_missing_events`` federation API where event visibility rules were not applied correctly.

We are not aware of it being actively exploited but please upgrade asap.

Sorry for the inconvenience, Synapse and the Matrix spec are still in beta and we still ironing out gaps such as this one.

You can get the release <a href="https://github.com/matrix-org/synapse/releases/tag/v0.31.1">here</a>.

#### Changes in synapse v0.31.1 (2018-06-08)

v0.31.1 fixes a security bug in the <code>get_missing_events</code> federation API
where event visibility rules were not applied correctly.

We are not aware of it being actively exploited but please upgrade asap.

Bug Fixes:
<ul>
  <li>Fix event filtering in get_missing_events handler (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3371" data-error-text="Failed to load issue title" data-id="330608172" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3371">#3371</a>)</li>
</ul>
