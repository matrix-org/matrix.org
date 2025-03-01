+++
title = "Synapse 0.14 is released!"
path = "/blog/2016/03/30/synapse-0-14-is-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

We just released Synapse 0.14.0 - a major update which incorporates lots of work on making Synapse more RAM efficient. There's still a lot of room for further improvements, but the main headlines are reducing the resident memory footprint dramatically by interning strings and deduplicating events across the many different caches. It also adds a much-needed <code>SYNAPSE_CACHE_FACTOR</code> environment variable that can be used to globally decrease or increase the sizing of all of Synapse's various caches (with an associated slow-down or speed-up in performance). Quite how improved the new memory footprint seems to very much depend on your own use case, but it's certainly a step in the right direction.

For more details on recent Synapse performance work (and a general state of the union for the whole Matrix ecosystem), check out <a href="/blog/2016/03/26/the-matrix-spring-special/">our Spring update</a>.

Get all new synapse from <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a> - we recommend upgrading (or installing!) asap :)

Full changelog follows:

## Changes in synapse v0.14.0 (2016-03-30)

No changes from v0.14.0-rc2

## Changes in synapse v0.14.0-rc2 (2016-03-23)

Features:
<ul>
 <li>Add published room list API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/657" data-url="https://github.com/matrix-org/synapse/issues/657" data-id="142376806" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#657</a>)</li>
</ul>
Changes:
<ul>
 <li>Change various caches to consume less memory (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/656" data-url="https://github.com/matrix-org/synapse/issues/656" data-id="141883503" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#656</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/658" data-url="https://github.com/matrix-org/synapse/issues/658" data-id="142428334" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#658</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/660" data-url="https://github.com/matrix-org/synapse/issues/660" data-id="142630190" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#660</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/662" data-url="https://github.com/matrix-org/synapse/issues/662" data-id="142908266" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#662</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/663" data-url="https://github.com/matrix-org/synapse/issues/663" data-id="142922725" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#663</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/665" data-url="https://github.com/matrix-org/synapse/issues/665" data-id="142938097" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#665</a>)</li>
 <li>Allow rooms to be published without requiring an alias (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/664" data-url="https://github.com/matrix-org/synapse/issues/664" data-id="142929970" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#664</a>)</li>
 <li>Intern common strings in caches to reduce memory footprint (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/666" data-url="https://github.com/matrix-org/synapse/issues/666" data-id="143009852" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#666</a>)</li>
</ul>
Bug fixes:
<ul>
 <li>Fix reject invites over federation (PR <a class="issue-link js-issue-link" title="Persist rejection of invites over federation" href="https://github.com/matrix-org/synapse/pull/646" data-id="140973458" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#646</a>)</li>
 <li>Fix bug where registration was not idempotent (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/649" data-url="https://github.com/matrix-org/synapse/issues/649" data-id="141252178" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#649</a>)</li>
 <li>Update aliases event after deleting aliases (PR <a class="issue-link js-issue-link" title="Update aliases event after deletion" href="https://github.com/matrix-org/synapse/pull/652" data-id="141592232" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#652</a>)</li>
 <li>Fix unread notification count, which was sometimes wrong (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/661" data-url="https://github.com/matrix-org/synapse/issues/661" data-id="142657556" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#661</a>)</li>
</ul>

## Changes in synapse v0.14.0-rc1 (2016-03-14)

Features:
<ul>
 <li>Add event_id to response to state event PUT (PR <a class="issue-link js-issue-link" title="client/v1/room: include event_id in response to state event PUT" href="https://github.com/matrix-org/synapse/pull/581" data-id="134248706" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#581</a>)</li>
 <li>Allow guest users access to messages in rooms they have joined (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/587" data-url="https://github.com/matrix-org/synapse/issues/587" data-id="134846121" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#587</a>)</li>
 <li>Add config for what state is included in a room invite (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/598" data-url="https://github.com/matrix-org/synapse/issues/598" data-id="135736142" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#598</a>)</li>
 <li>Send the inviter's member event in room invite state (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/607" data-url="https://github.com/matrix-org/synapse/issues/607" data-id="136466943" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#607</a>)</li>
 <li>Add error codes for malformed/bad JSON in /login (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/608" data-url="https://github.com/matrix-org/synapse/issues/608" data-id="136642285" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#608</a>)</li>
 <li>Add support for changing the actions for default rules (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/609" data-url="https://github.com/matrix-org/synapse/issues/609" data-id="136680904" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#609</a>)</li>
 <li>Add environment variable SYNAPSE_CACHE_FACTOR, default it to 0.1 (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/612" data-url="https://github.com/matrix-org/synapse/issues/612" data-id="137568719" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#612</a>)</li>
 <li>Add ability for alias creators to delete aliases (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/614" data-url="https://github.com/matrix-org/synapse/issues/614" data-id="137594003" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#614</a>)</li>
 <li>Add profile information to invites (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/624" data-url="https://github.com/matrix-org/synapse/issues/624" data-id="138490446" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#624</a>)</li>
</ul>
Changes:
<ul>
 <li>Enforce user_id exclusivity for AS registrations (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/572" data-url="https://github.com/matrix-org/synapse/issues/572" data-id="133037977" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#572</a>)</li>
 <li>Make adding push rules idempotent (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/587" data-url="https://github.com/matrix-org/synapse/issues/587" data-id="134846121" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#587</a>)</li>
 <li>Improve presence performance (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/582" data-url="https://github.com/matrix-org/synapse/issues/582" data-id="134315572" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#582</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/586" data-url="https://github.com/matrix-org/synapse/issues/586" data-id="134829627" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#586</a>)</li>
 <li>Change presence semantics for <code>last_active_ago</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/582" data-url="https://github.com/matrix-org/synapse/issues/582" data-id="134315572" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#582</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/586" data-url="https://github.com/matrix-org/synapse/issues/586" data-id="134829627" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#586</a>)</li>
 <li>Don't allow <code>m.room.create</code> to be changed (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/596" data-url="https://github.com/matrix-org/synapse/issues/596" data-id="135558604" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#596</a>)</li>
 <li>Add 800x600 to default list of valid thumbnail sizes (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/616" data-url="https://github.com/matrix-org/synapse/issues/616" data-id="137914530" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#616</a>)</li>
 <li>Always include kicks and bans in full /sync (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/625" data-url="https://github.com/matrix-org/synapse/issues/625" data-id="138502688" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#625</a>)</li>
 <li>Send history visibility on boundary changes (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/626" data-url="https://github.com/matrix-org/synapse/issues/626" data-id="138524888" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#626</a>)</li>
 <li>Register endpoint now returns a refresh_token (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/637" data-url="https://github.com/matrix-org/synapse/issues/637" data-id="139811456" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#637</a>)</li>
</ul>
Bug fixes:
<ul>
 <li>Fix bug where we returned incorrect state in /sync (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/573" data-url="https://github.com/matrix-org/synapse/issues/573" data-id="133215098" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#573</a>)</li>
 <li>Always return a JSON object from push rule API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/606" data-url="https://github.com/matrix-org/synapse/issues/606" data-id="136392145" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#606</a>)</li>
 <li>Fix bug where registering without a user id sometimes failed (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/610" data-url="https://github.com/matrix-org/synapse/issues/610" data-id="137394765" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#610</a>)</li>
 <li>Report size of ExpiringCache in cache size metrics (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/611" data-url="https://github.com/matrix-org/synapse/issues/611" data-id="137537841" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#611</a>)</li>
 <li>Fix rejection of invites to empty rooms (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/615" data-url="https://github.com/matrix-org/synapse/issues/615" data-id="137638777" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#615</a>)</li>
 <li>Fix usage of <code>bcrypt</code> to not use <code>checkpw</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/619" data-url="https://github.com/matrix-org/synapse/issues/619" data-id="137949188" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#619</a>)</li>
 <li>Pin <code>pysaml2</code> dependency (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/634" data-url="https://github.com/matrix-org/synapse/issues/634" data-id="139556355" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#634</a>)</li>
 <li>Fix bug in <code>/sync</code> where timeline order was incorrect for backfilled events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/635" data-url="https://github.com/matrix-org/synapse/issues/635" data-id="139635294" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#635</a>)</li>
</ul>
