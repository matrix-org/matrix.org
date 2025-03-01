+++
title = "Synapse 0.19.3 released"
path = "/blog/2017/03/21/synapse-0-19-3-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

We've released Synapse 0.19.3-rc2 as 0.19.3 with no changes. This is a slightly unusual release, as 0.19.3-rc2 dates from March 13th and <a href="https://github.com/matrix-org/synapse/compare/672dcf5...d101488">a lot of stuff</a> has landed on the develop branch since then - however, we'll be releasing that as 0.20.0 once it's ready. Instead, 0.19.3 has a set of intermediary performance and bug fixes; the only new feature is a set of admin APIs kindly contributed by <a href="https://github.com/morteza-araby">@morteza-araby</a>.

The changelog follows - please upgrade from <https://github.com/matrix-org/synapse> or your OS packages as normal :)

### Changes in synapse v0.19.3 (2017-03-20)

No changes since v0.19.3-rc2

### Changes in synapse v0.19.3-rc2 (2017-03-13)

Bug fixes:
<ul>
  <li>Fix bug in handling of incoming device list updates over federation.</li>
</ul>

### Changes in synapse v0.19.3-rc1 (2017-03-08)

Features:
<ul>
  <li>Add some administration functionalities. Thanks to <a class="user-mention" href="https://github.com/morteza-araby"><span class="ghh-user-x tooltipstered" title="">@morteza-araby</span></a>! (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1784" data-url="https://github.com/matrix-org/synapse/issues/1784" data-id="199561652" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1784</a>)</li>
</ul>
Changes:
<ul>
  <li>Reduce database table sizes (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1873" data-url="https://github.com/matrix-org/synapse/issues/1873" data-id="204670414" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1873</a>, <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1916" data-url="https://github.com/matrix-org/synapse/issues/1916" data-id="207518205" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1916</a>, <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1923" data-url="https://github.com/matrix-org/synapse/issues/1923" data-id="208136725" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1923</a>, <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1963" data-url="https://github.com/matrix-org/synapse/issues/1963" data-id="211038447" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1963</a>)</li>
  <li>Update contrib/ to not use syutil. Thanks to <a class="user-mention" href="https://github.com/andrewshadura"><span class="ghh-user-x tooltipstered" title="">@andrewshadura</span></a>! (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1907" data-url="https://github.com/matrix-org/synapse/issues/1907" data-id="207038123" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1907</a>)</li>
  <li>Don't fetch current state when sending an event in common case (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1955" data-url="https://github.com/matrix-org/synapse/issues/1955" data-id="210568365" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1955</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix synapse_port_db failure. Thanks to <a class="user-mention" href="https://github.com/Pneumaticat"><span class="ghh-user-x tooltipstered" title="">@Pneumaticat</span></a>! (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1904" data-url="https://github.com/matrix-org/synapse/issues/1904" data-id="207022149" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1904</a>)</li>
  <li>Fix caching to not cache error responses (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1913" data-url="https://github.com/matrix-org/synapse/issues/1913" data-id="207216238" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1913</a>)</li>
  <li>Fix APIs to make kick & ban reasons work (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1917" data-url="https://github.com/matrix-org/synapse/issues/1917" data-id="207542829" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1917</a>)</li>
  <li>Fix bugs in the /keys/changes api (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1921" data-url="https://github.com/matrix-org/synapse/issues/1921" data-id="207764068" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1921</a>)</li>
  <li>Fix bug where users couldn't forget rooms they were banned from (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1922" data-url="https://github.com/matrix-org/synapse/issues/1922" data-id="207904548" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1922</a>)</li>
  <li>Fix issue with long language values in pushers API (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1925" data-url="https://github.com/matrix-org/synapse/issues/1925" data-id="208403542" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1925</a>)</li>
  <li>Fix a race in transaction queue (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1930" data-url="https://github.com/matrix-org/synapse/issues/1930" data-id="208932693" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1930</a>)</li>
  <li>Fix dynamic thumbnailing to preserve aspect ratio. Thanks to <a class="user-mention" href="https://github.com/jkolo"><span class="ghh-user-x tooltipstered" title="">@jkolo</span></a>! (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1945" data-url="https://github.com/matrix-org/synapse/issues/1945" data-id="210167714" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1945</a>)</li>
  <li>Fix device list update to not constantly resync (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1964" data-url="https://github.com/matrix-org/synapse/issues/1964" data-id="211092538" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1964</a>)</li>
  <li>Fix potential for huge memory usage when getting device that have changed (PR <a class="issue-link js-issue-link ghh-issue-x tooltipstered" title="" href="https://github.com/matrix-org/synapse/pull/1969" data-url="https://github.com/matrix-org/synapse/issues/1969" data-id="212091226" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1969</a>)</li>
</ul>
