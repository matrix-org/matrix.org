+++
title = "Synapse 0.26 released!"
path = "/blog/2018/01/05/synapse-0-26-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi folks,

Synapse 0.26 is here (with no changes since RC1 which we released just before Christmas).  It's a general maintenance release, albeit with a few new features but mainly lots of bugfixes and general refinements.  Enjoy!

As always, you can get it from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.26.0">https://github.com/matrix-org/synapse/releases/tag/v0.26.0</a>.

### Changes in synapse v0.26.0 (2018-01-05)

No changes since v0.26.0-rc1

### Changes in synapse v0.26.0-rc1 (2017-12-13)

Features:
<ul>
  <li>Add ability for ASes to publicise groups for their users (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2686" data-error-text="Failed to load issue title" data-id="274583719" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2686">#2686</a>)</li>
  <li>Add all local users to the user_directory and optionally search them (PR
<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2723" data-error-text="Failed to load issue title" data-id="277862997" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2723">#2723</a>)</li>
  <li>Add support for custom login types for validating users (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2729" data-error-text="Failed to load issue title" data-id="279071778" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2729">#2729</a>)</li>
</ul>
Changes:
<ul>
  <li>Update example Prometheus config to new format (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2648" data-error-text="Failed to load issue title" data-id="271817293" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2648">#2648</a>) Thanks to
<a class="user-mention" href="https://github.com/krombel">@krombel</a>!</li>
  <li>Rename redact_content option to include_content in Push API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2650" data-error-text="Failed to load issue title" data-id="272152108" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2650">#2650</a>)</li>
  <li>Declare support for r0.3.0 (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2677" data-error-text="Failed to load issue title" data-id="274218233" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2677">#2677</a>)</li>
  <li>Improve upserts (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2684" data-error-text="Failed to load issue title" data-id="274561033" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2684">#2684</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2688" data-error-text="Failed to load issue title" data-id="274610868" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2688">#2688</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2689" data-error-text="Failed to load issue title" data-id="274611631" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2689">#2689</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2713" data-error-text="Failed to load issue title" data-id="276994305" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2713">#2713</a>)</li>
  <li>Improve documentation of workers (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2700" data-error-text="Failed to load issue title" data-id="275710165" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2700">#2700</a>)</li>
  <li>Improve tracebacks on exceptions (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2705" data-error-text="Failed to load issue title" data-id="276410346" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2705">#2705</a>)</li>
  <li>Allow guest access to group APIs for reading (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2715" data-error-text="Failed to load issue title" data-id="277349107" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2715">#2715</a>)</li>
  <li>Support for posting content in federation_client script (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2716" data-error-text="Failed to load issue title" data-id="277381003" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2716">#2716</a>)</li>
  <li>Delete devices and pushers on logouts etc (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2722" data-error-text="Failed to load issue title" data-id="277826542" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2722">#2722</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix database port script (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2673" data-error-text="Failed to load issue title" data-id="273841564" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2673">#2673</a>)</li>
  <li>Fix internal server error on login with ldap_auth_provider (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/issues/2678" data-error-text="Failed to load issue title" data-id="274315963" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2678">#2678</a>) Thanks
to <a class="user-mention" href="https://github.com/jkolo">@jkolo</a>!</li>
  <li>Fix error on sqlite 3.7 (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2697" data-error-text="Failed to load issue title" data-id="275673530" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2697">#2697</a>)</li>
  <li>Fix OPTIONS on preview_url (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2707" data-error-text="Failed to load issue title" data-id="276447844" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2707">#2707</a>)</li>
  <li>Fix error handling on dns lookup (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2711" data-error-text="Failed to load issue title" data-id="276665577" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2711">#2711</a>)</li>
  <li>Fix wrong avatars when inviting multiple users when creating room (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2717" data-error-text="Failed to load issue title" data-id="277422674" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2717">#2717</a>)</li>
  <li>Fix 500 when joining matrix-dev (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2719" data-error-text="Failed to load issue title" data-id="277434890" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2719">#2719</a>)</li>
</ul>
