+++
title = "Synapse 0.22.0 released!"
path = "/blog/2017/07/06/synapse-0-22-0-released"

[taxonomies]
author = ["Thomas Lant"]
category = ["Tech"]
+++

Hi Synapsefans,

Synapse 0.22.0 has just been released! This release lands a few interesting features:
<ul>
 	<li>The new User directory API which supports Matrix clients' providing a much more intuitive and effective user search capability by exposing a list of:
<ul>
 	<li>Everybody your user shares a room with, and</li>
 	<li>Everybody in a public room your homeserver knows about</li>
</ul>
</li>
 	<li>New support for server admins, including a Shutdown Room API (to remove a room from a local server) and a Media Quarrantine API (to render a media item inaccessible without its actually being deleted)</li>
</ul>
As always there are lots of bug fixes and performance improvements, including increasing the default cache factor size from 0.1 to 0.5 (should improve performance for those running their own homeservers).

You can get Synapse 0.22.0 from <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a> or <a href="https://github.com/matrix-org/synapse/releases/tag/v0.22.0">https://github.com/matrix-org/synapse/releases/tag/v0.22.0</a> as normal.

## Changes in synapse v0.22.0 (2017-07-06)

No changes since v0.22.0-rc2

## Changes in synapse v0.22.0-rc2 (2017-07-04)

Changes:
<ul>
 	<li>Improve performance of storing user IPs (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2307" data-url="https://github.com/matrix-org/synapse/issues/2307" data-id="238837177" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2307</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2308" data-url="https://github.com/matrix-org/synapse/issues/2308" data-id="238864014" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2308</a>)</li>
 	<li>Slightly improve performance of verifying access tokens (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2320" data-url="https://github.com/matrix-org/synapse/issues/2320" data-id="239486219" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2320</a>)</li>
 	<li>Slightly improve performance of event persistence (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2321" data-url="https://github.com/matrix-org/synapse/issues/2321" data-id="239502265" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2321</a>)</li>
 	<li>Increase default cache factor size from 0.1 to 0.5 (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2330" data-url="https://github.com/matrix-org/synapse/issues/2330" data-id="240356521" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2330</a>)</li>
</ul>
Bug fixes:
<ul>
 	<li>Fix bug with storing registration sessions that caused frequent CPU churn
(PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2319" data-url="https://github.com/matrix-org/synapse/issues/2319" data-id="239472982" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2319</a>)</li>
</ul>

## Changes in synapse v0.22.0-rc1 (2017-06-26)

Features:
<ul>
 	<li>Add a user directory API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2252" data-url="https://github.com/matrix-org/synapse/issues/2252" data-id="232602331" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2252</a>, and many more)</li>
 	<li>Add shutdown room API to remove room from local server (PR <a class="issue-link js-issue-link" title="Add shutdown room API" href="https://github.com/matrix-org/synapse/pull/2291" data-id="236863021" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2291</a>)</li>
 	<li>Add API to quarantine media (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2292" data-url="https://github.com/matrix-org/synapse/issues/2292" data-id="236951215" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2292</a>)</li>
 	<li>Add new config option to not send event contents to push servers (PR <a class="issue-link js-issue-link" title="Add configuration parameter to allow redaction of content from push m…" href="https://github.com/matrix-org/synapse/pull/2301" data-id="238111730" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2301</a>)
Thanks to <a class="user-mention" href="https://github.com/cjdelisle">@cjdelisle</a>!</li>
</ul>
Changes:
<ul>
 	<li>Various performance fixes (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2177" data-url="https://github.com/matrix-org/synapse/issues/2177" data-id="225644418" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2177</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2233" data-url="https://github.com/matrix-org/synapse/issues/2233" data-id="229717425" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2233</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2230" data-url="https://github.com/matrix-org/synapse/issues/2230" data-id="229354438" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2230</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2238" data-url="https://github.com/matrix-org/synapse/issues/2238" data-id="230015890" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2238</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2248" data-url="https://github.com/matrix-org/synapse/issues/2248" data-id="231384660" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2248</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2256" data-url="https://github.com/matrix-org/synapse/issues/2256" data-id="234157222" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2256</a>,
<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2274" data-url="https://github.com/matrix-org/synapse/issues/2274" data-id="235482780" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2274</a>)</li>
 	<li>Deduplicate sync filters (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2219" data-url="https://github.com/matrix-org/synapse/issues/2219" data-id="228004726" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2219</a>) Thanks to <a class="user-mention" href="https://github.com/krombel">@krombel</a>!</li>
 	<li>Correct a typo in UPGRADE.rst (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2231" data-url="https://github.com/matrix-org/synapse/issues/2231" data-id="229539435" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2231</a>) Thanks to <a class="user-mention" href="https://github.com/aaronraimist">@aaronraimist</a>!</li>
 	<li>Add count of one time keys to sync stream (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2237" data-url="https://github.com/matrix-org/synapse/issues/2237" data-id="229999204" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2237</a>)</li>
 	<li>Only store event_auth for state events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2247" data-url="https://github.com/matrix-org/synapse/issues/2247" data-id="231038843" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2247</a>)</li>
 	<li>Store URL cache preview downloads separately (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2299" data-url="https://github.com/matrix-org/synapse/issues/2299" data-id="238100783" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2299</a>)</li>
</ul>
Bug fixes:
<ul>
 	<li>Fix users not getting notifications when AS listened to that user_id (PR
<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2216" data-url="https://github.com/matrix-org/synapse/issues/2216" data-id="227919645" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2216</a>) Thanks to <a class="user-mention" href="https://github.com/slipeer">@slipeer</a>!</li>
 	<li>Fix users without push set up not getting notifications after joining rooms
(PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2236" data-url="https://github.com/matrix-org/synapse/issues/2236" data-id="229977772" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2236</a>)</li>
 	<li>Fix preview url API to trim long descriptions (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2243" data-url="https://github.com/matrix-org/synapse/issues/2243" data-id="230506502" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2243</a>)</li>
 	<li>Fix bug where we used cached but unpersisted state group as prev group,
resulting in broken state of restart (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2263" data-url="https://github.com/matrix-org/synapse/issues/2263" data-id="234489302" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2263</a>)</li>
 	<li>Fix removing of pushers when using workers (PR <a class="issue-link js-issue-link" title="Fix removing of pushers when using workers" href="https://github.com/matrix-org/synapse/pull/2267" data-id="234785628" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2267</a>)</li>
 	<li>Fix CORS headers to allow Authorization header (PR <a class="issue-link js-issue-link" title="allow Authorization header" href="https://github.com/matrix-org/synapse/pull/2285" data-id="236427727" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#2285</a>) Thanks to <a class="user-mention" href="https://github.com/krombel">@krombel</a>!</li>
</ul>
