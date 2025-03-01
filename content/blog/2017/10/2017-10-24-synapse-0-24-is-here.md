+++
title = "Synapse 0.24 is here!"
path = "/blog/2017/10/24/synapse-0-24-is-here"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]
+++

Hi folks,

Synapse 0.24 is out (currently at 0.24.1)! This is a pretty big release as it includes initial support for Groups, also known as Communities (UI for which is landing currently on Riot/Web and later Riot/Mobile). Groups let you associate together a set of users and rooms, letting you define a community - e.g. <a href="https://riot.im/develop/#/group/+matrix:matrix.org">+matrix:matrix.org</a> is the community of the core Matrix project itself (whose users are the core Matrix.org team, and whose public rooms are the rooms we officially manage/moderate as Matrix.org).  We'll yell more about Groups once the UI is ready for action in the near future, but the good news is that Synapse should be ready to go (although the API is still fairly experimental and very much evolving).

Other stuff worth calling out in this release includes: massive performance improvements on receiving federation traffic (we now process federation traffic for different rooms in parallel); fixing a major cause of performance issues (caused when processing spurious events for rooms you've actually left); modularising and improving the the spamchecker; @room notification support; backup media repository support; and finally the ability to autojoin new users to a set of rooms on the server!

You can get the latest release from <a href="https://github.com/matrix-org/synapse/releases">Github</a> as usual; have fun - and thanks for flying Matrix :)

## Changes in synapse v0.24.1 (2017-10-24)

Bug fixes:
<ul>
  <li>Fix updating group profiles over federation (PR <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/2567" data-error-text="Failed to load issue title" data-id="267687632" data-permission-text="Issue title is private">#2567</a>)</li>
</ul>

## Changes in synapse v0.24.0 (2017-10-23)

No changes since v0.24.0-rc1

## Changes in synapse v0.24.0-rc1 (2017-10-19)

Features:
<ul>
  <li>Add Group Server (PR <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/2352" data-error-text="Failed to load issue title" data-id="241719376" data-permission-text="Issue title is private">#2352</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2363" data-error-text="Failed to load issue title" data-id="242334015" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2363">#2363</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2374" data-error-text="Failed to load issue title" data-id="243375644" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2374">#2374</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2377" data-error-text="Failed to load issue title" data-id="244340948" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2377">#2377</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2378" data-error-text="Failed to load issue title" data-id="244341100" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2378">#2378</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2382" data-error-text="Failed to load issue title" data-id="245071091" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2382">#2382</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2410" data-error-text="Failed to load issue title" data-id="249656746" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2410">#2410</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2426" data-error-text="Failed to load issue title" data-id="251663325" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2426">#2426</a>,
<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2430" data-error-text="Failed to load issue title" data-id="252935837" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2430">#2430</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2454" data-error-text="Failed to load issue title" data-id="258756630" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2454">#2454</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2471" data-error-text="Failed to load issue title" data-id="260566156" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2471">#2471</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2472" data-error-text="Failed to load issue title" data-id="260655379" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2472">#2472</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2544" data-error-text="Failed to load issue title" data-id="265791503" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2544">#2544</a>)</li>
  <li>Add support for channel notifications (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2501" data-error-text="Failed to load issue title" data-id="263095049" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2501">#2501</a>)</li>
  <li>Add basic implementation of backup media store (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2538" data-error-text="Failed to load issue title" data-id="264965734" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2538">#2538</a>)</li>
  <li>Add config option to auto-join new users to rooms (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2545" data-error-text="Failed to load issue title" data-id="265842040" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2545">#2545</a>)</li>
</ul>
Changes:
<ul>
  <li>Make the spam checker a module (PR <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/2474" data-error-text="Failed to load issue title" data-id="260721359" data-permission-text="Issue title is private">#2474</a>)</li>
  <li>Delete expired url cache data (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2478" data-error-text="Failed to load issue title" data-id="261282574" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2478">#2478</a>)</li>
  <li>Ignore incoming events for rooms that we have left (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2490" data-error-text="Failed to load issue title" data-id="262374962" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2490">#2490</a>)</li>
  <li>Allow spam checker to reject invites too (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2492" data-error-text="Failed to load issue title" data-id="262416897" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2492">#2492</a>)</li>
  <li>Add room creation checks to spam checker (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2495" data-error-text="Failed to load issue title" data-id="262727329" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2495">#2495</a>)</li>
  <li>Spam checking: add the invitee to user_may_invite (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2502" data-error-text="Failed to load issue title" data-id="263117407" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2502">#2502</a>)</li>
  <li>Process events from federation for different rooms in parallel (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2520" data-error-text="Failed to load issue title" data-id="263967902" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2520">#2520</a>)</li>
  <li>Allow error strings from spam checker (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2531" data-error-text="Failed to load issue title" data-id="264590599" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2531">#2531</a>)</li>
  <li>Improve error handling for missing files in config (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2551" data-error-text="Failed to load issue title" data-id="266095819" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2551">#2551</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix handling SERVFAILs when doing AAAA lookups for federation (PR <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/2477" data-error-text="Failed to load issue title" data-id="261269109" data-permission-text="Issue title is private">#2477</a>)</li>
  <li>Fix incompatibility with newer versions of ujson (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2483" data-error-text="Failed to load issue title" data-id="261851143" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2483">#2483</a>) Thanks to
<a class="user-mention" href="https://github.com/jeremycline">@jeremycline</a>!</li>
  <li>Fix notification keywords that start/end with non-word chars (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2500" data-error-text="Failed to load issue title" data-id="263077422" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2500">#2500</a>)</li>
  <li>Fix stack overflow and logcontexts from linearizer (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2532" data-error-text="Failed to load issue title" data-id="264600894" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2532">#2532</a>)</li>
  <li>Fix 500 error when fields missing from power_levels event (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2552" data-error-text="Failed to load issue title" data-id="266187530" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2552">#2552</a>)</li>
  <li>Fix 500 error when we get an error handling a PDU (PR <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/2553" data-error-text="Failed to load issue title" data-id="266256222" data-permission-text="Issue title is private">#2553</a>)</li>
</ul>
