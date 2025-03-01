+++
title = "Synapse 0.27.3 released!"
path = "/blog/2018/04/11/synapse-0-27-3-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Today we release Synapse 0.27.3!

Hot on the heels of 0.27.2, notable changes include API support for joining groups/communities as well as a major bug fix (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3082" data-error-text="Failed to load issue title" data-id="312859684" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3082">#3082</a>), that is particularly important for those upgrading for the first time in a while. Also new metrics and phone home stats. Phone home stats include better visibility of system usage so we can have a better idea of how synapse's RAM and CPU is behaving in the wild. Also, recording the number of users on the server who have been using it for at least 30 days.

Phone home stats are entirely optional and can be enabled/disabled by setting "<span class="s1">report_</span>
<span class="s2">stat</span>
<span class="s1">s" in homeserver.yaml. </span>
Please consider enabling phone home stats if you currently have not done so - this data is really important to us in improving Matrix as a whole (and justifying future funding for <a class="linkified" href="http://matrix.org/" target="_blank" rel="noopener">Matrix.org</a>).

As always, you can get it from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.27.3">https://github.com/matrix-org/synapse/releases/tag/v0.27.3</a> and thanks to everyone who tested the release candidates.

### Changes in synapse v0.27.3 (2018-04-11)

Bug fixes:
<ul>
  <li>URL quote path segments over federation (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3082" data-error-text="Failed to load issue title" data-id="312859684" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3082">#3082</a>)</li>
</ul>

### Changes in synapse v0.27.3-rc2 (2018-04-09)

v0.27.3-rc1 used a stale version of the develop branch so the changelog overstates
the functionality. v0.27.3-rc2 is up to date, rc1 should be ignored.

### Changes in synapse v0.27.3-rc1 (2018-04-09)

Notable changes include API support for joinability of groups. Also new metrics
and phone home stats. Phone home stats include better visibility of system usage
so we can tweak synpase to work better for all users rather than our own experience
with matrix.org. Also, recording 'r30' stat which is the measure we use to track
overall growth of the Matrix ecosystem. It is defined as:-

Counts the number of native 30 day retained users, defined as:-

* Users who have created their accounts more than 30 days
* Where last seen at most 30 days ago
* Where account creation and last_seen are &gt; 30 days"

Features:
<ul>
  <li>Add joinability for groups (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3045" data-error-text="Failed to load issue title" data-id="309358488" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3045">#3045</a>)</li>
  <li>Implement group join API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3046" data-error-text="Failed to load issue title" data-id="309437433" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3046">#3046</a>)</li>
  <li>Add counter metrics for calculating state delta (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3033" data-error-text="Failed to load issue title" data-id="308901076" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3033">#3033</a>)</li>
  <li>R30 stats (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3041" data-error-text="Failed to load issue title" data-id="309293623" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3041">#3041</a>)</li>
  <li>Measure time it takes to calculate state group ID (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3043" data-error-text="Failed to load issue title" data-id="309312509" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3043">#3043</a>)</li>
  <li>Add basic performance statistics to phone home (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3044" data-error-text="Failed to load issue title" data-id="309323226" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3044">#3044</a>)</li>
  <li>Add response size metrics (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3071" data-error-text="Failed to load issue title" data-id="311954815" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3071">#3071</a>)</li>
  <li>phone home cache size configurations (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3063" data-error-text="Failed to load issue title" data-id="311248683" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3063">#3063</a>)</li>
</ul>
Changes:
<ul>
  <li>Add a blurb explaining the main synapse worker (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2886" data-error-text="Failed to load issue title" data-id="298059141" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2886">#2886</a>) Thanks to <a class="user-mention" href="https://github.com/turt2live" data-hovercard-user-id="1190097">@turt2live</a>!</li>
  <li>Replace old style error catching with 'as' keyword (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3000" data-error-text="Failed to load issue title" data-id="305290730" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3000">#3000</a>) Thanks to <a class="user-mention" href="https://github.com/NotAFile" data-hovercard-user-id="5447747">@NotAFile</a>!</li>
  <li>Use .iter* to avoid copies in StateHandler (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3006" data-error-text="Failed to load issue title" data-id="305656885" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3006">#3006</a>)</li>
  <li>Linearize calls to _generate_user_id (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3029" data-error-text="Failed to load issue title" data-id="308526745" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3029">#3029</a>)</li>
  <li>Remove last usage of ujson (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3030" data-error-text="Failed to load issue title" data-id="308552644" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3030">#3030</a>)</li>
  <li>Use simplejson throughout (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3048" data-error-text="Failed to load issue title" data-id="309920407" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3048">#3048</a>)</li>
  <li>Use static JSONEncoders (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3049" data-error-text="Failed to load issue title" data-id="309920728" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3049">#3049</a>)</li>
  <li>Remove uses of events.content (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3060" data-error-text="Failed to load issue title" data-id="311128650" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3060">#3060</a>)</li>
  <li>Improve database cache performance (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3068" data-error-text="Failed to load issue title" data-id="311658915" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3068">#3068</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Add room_id to the response of <code>rooms/{'{'}roomId{'}'}/join</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2986" data-error-text="Failed to load issue title" data-id="304772714" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2986">#2986</a>) Thanks to <a class="user-mention" href="https://github.com/jplatte" data-hovercard-user-id="951129">@jplatte</a>!</li>
  <li>Fix replication after switch to simplejson (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3015" data-error-text="Failed to load issue title" data-id="306553712" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3015">#3015</a>)</li>
  <li>Fix replication after switch to simplejson (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3015" data-error-text="Failed to load issue title" data-id="306553712" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3015">#3015</a>)</li>
  <li>404 correctly on missing paths via NoResource (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3022" data-error-text="Failed to load issue title" data-id="307976332" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3022">#3022</a>)</li>
  <li>Fix error when claiming e2e keys from offline servers (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3034" data-error-text="Failed to load issue title" data-id="309039857" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3034">#3034</a>)</li>
  <li>fix tests/storage/test_user_directory.py (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3042" data-error-text="Failed to load issue title" data-id="309299280" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3042">#3042</a>)</li>
  <li>use PUT instead of POST for federating groups/m.join_policy (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3070" data-error-text="Failed to load issue title" data-id="311932835" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3070">#3070</a>) Thanks to <a class="user-mention" href="https://github.com/krombel" data-hovercard-user-id="11167142">@krombel</a>!</li>
  <li>postgres port script: fix state_groups_pkey error (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3072" data-error-text="Failed to load issue title" data-id="311965025" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3072">#3072</a>)</li>
</ul>
