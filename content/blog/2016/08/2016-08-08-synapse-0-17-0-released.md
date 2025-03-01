+++
title = "Synapse 0.17.0 released!"
path = "/blog/2016/08/08/synapse-0-17-0-released"

[taxonomies]
author = ["Erik Johnston"]
category = ["General"]
+++

Synapse <a href="https://github.com/matrix-org/synapse/releases/tag/v0.17.0">v0.17.0</a> is finally here, which includes a couple of security fixes so <strong>please upgrade</strong>. Other notable new things are:
<ul>
  <li>A bunch of new admin APIs, including purging locally cached data (which has been long requested to help free up disk space). See the <a href="https://github.com/matrix-org/synapse/tree/master/docs/admin_api">docs folder</a> for more details.</li>
  <li>Device management APIs in preparation for end to end encryption.</li>
  <li>Better support for LDAP authentication, thanks to Martin Weinelt! (This may break existing LDAP configuration, see <a href="https://github.com/matrix-org/synapse/pull/843">PR #843</a> for more details.)</li>
  <li>Lots and lots of bug fixes and various bits of performance work.</li>
</ul>
For a full list of everything that has changed see below or the <a href="https://github.com/matrix-org/synapse/releases/tag/v0.17.0">release page</a>.

I'd also like to thank Will Hunt, Martin Weinelt and Kent Shikama for their contributions!

### Changes in synapse v0.17.0 (2016-08-08)

This release contains significant security bug fixes regarding authenticating
events received over federation. PLEASE UPGRADE.

This release changes the LDAP configuration format in a backwards incompatible
way, see PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/843" data-url="https://github.com/matrix-org/synapse/issues/843" data-id="158692541" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#843</a> for details.

Changes:
<ul>
  <li>Add federation /version API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/990" data-url="https://github.com/matrix-org/synapse/issues/990" data-id="169636556" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#990</a>)</li>
  <li>Make psutil dependency optional (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/992" data-url="https://github.com/matrix-org/synapse/issues/992" data-id="169888303" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#992</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix URL preview API to exclude HTML comments in description (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/988" data-url="https://github.com/matrix-org/synapse/issues/988" data-id="169610681" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#988</a>)</li>
  <li>Fix error handling of remote joins (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/991" data-url="https://github.com/matrix-org/synapse/issues/991" data-id="169653250" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#991</a>)</li>
</ul>

### Changes in synapse v0.17.0-rc4 (2016-08-05)

Changes:
<ul>
  <li>Change the way we summarize URLs when previewing (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/973" data-url="https://github.com/matrix-org/synapse/issues/973" data-id="168942221" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#973</a>)</li>
  <li>Add new <code>/state_ids/</code> federation API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/979" data-url="https://github.com/matrix-org/synapse/issues/979" data-id="169136186" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#979</a>)</li>
  <li>Speed up processing of <code>/state/</code> response (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/986" data-url="https://github.com/matrix-org/synapse/issues/986" data-id="169570759" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#986</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix event persistence when event has already been partially persisted (PR <a class="issue-link js-issue-link" title="Ensure we only persist an event once at a time" href="https://github.com/matrix-org/synapse/pull/975" data-id="169098276" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#975</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/983" data-url="https://github.com/matrix-org/synapse/issues/983" data-id="169382701" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#983</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/985" data-url="https://github.com/matrix-org/synapse/issues/985" data-id="169570281" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#985</a>)</li>
  <li>Fix port script to also copy across backfilled events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/982" data-url="https://github.com/matrix-org/synapse/issues/982" data-id="169344602" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#982</a>)</li>
</ul>

### Changes in synapse v0.17.0-rc3 (2016-08-02)

Changes:
<ul>
  <li>Forbid non-ASes from registering users whose names begin with '_' (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/958" data-url="https://github.com/matrix-org/synapse/issues/958" data-id="167904457" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#958</a>)</li>
  <li>Add some basic admin API docs (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/963" data-url="https://github.com/matrix-org/synapse/issues/963" data-id="168102004" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#963</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Send the correct host header when fetching keys (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/941" data-url="https://github.com/matrix-org/synapse/issues/941" data-id="166784788" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#941</a>)</li>
  <li>Fix joining a room that has missing auth events (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/964" data-url="https://github.com/matrix-org/synapse/issues/964" data-id="168120112" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#964</a>)</li>
  <li>Fix various push bugs (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/966" data-url="https://github.com/matrix-org/synapse/issues/966" data-id="168177154" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#966</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/970" data-url="https://github.com/matrix-org/synapse/issues/970" data-id="168521716" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#970</a>)</li>
  <li>Fix adding emails on registration (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/968" data-url="https://github.com/matrix-org/synapse/issues/968" data-id="168337247" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#968</a>)</li>
</ul>

### Changes in synapse v0.17.0-rc1 (2016-07-28)

This release changes the LDAP configuration format in a backwards incompatible
way, see PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/843" data-url="https://github.com/matrix-org/synapse/issues/843" data-id="158692541" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#843</a> for details.

Features:
<ul>
  <li>Add purge_media_cache admin API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/902" data-url="https://github.com/matrix-org/synapse/issues/902" data-id="162932471" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#902</a>)</li>
  <li>Add deactivate account admin API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/903" data-url="https://github.com/matrix-org/synapse/issues/903" data-id="163182922" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#903</a>)</li>
  <li>Add optional pepper to password hashing (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/907" data-url="https://github.com/matrix-org/synapse/issues/907" data-id="163714838" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#907</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/910" data-url="https://github.com/matrix-org/synapse/issues/910" data-id="164027482" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#910</a> by <a class="user-mention" href="https://github.com/KentShikama">@KentShikama</a>)</li>
  <li>Add an admin option to shared secret registration (breaks backwards compat) (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/909" data-url="https://github.com/matrix-org/synapse/issues/909" data-id="163892610" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#909</a>)</li>
  <li>Add purge local room history API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/911" data-url="https://github.com/matrix-org/synapse/issues/911" data-id="164096726" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#911</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/923" data-url="https://github.com/matrix-org/synapse/issues/923" data-id="165745465" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#923</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/924" data-url="https://github.com/matrix-org/synapse/issues/924" data-id="165785903" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#924</a>)</li>
  <li>Add requestToken endpoints (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/915" data-url="https://github.com/matrix-org/synapse/issues/915" data-id="164571236" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#915</a>)</li>
  <li>Add an /account/deactivate endpoint (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/921" data-url="https://github.com/matrix-org/synapse/issues/921" data-id="165511431" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#921</a>)</li>
  <li>Add filter param to /messages. Add 'contains_url' to filter. (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/922" data-url="https://github.com/matrix-org/synapse/issues/922" data-id="165585706" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#922</a>)</li>
  <li>Add device_id support to /login (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/929" data-url="https://github.com/matrix-org/synapse/issues/929" data-id="166118756" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#929</a>)</li>
  <li>Add device_id support to /v2/register flow. (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/937" data-url="https://github.com/matrix-org/synapse/issues/937" data-id="166613208" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#937</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/942" data-url="https://github.com/matrix-org/synapse/issues/942" data-id="166788540" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#942</a>)</li>
  <li>Add GET /devices endpoint (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/939" data-url="https://github.com/matrix-org/synapse/issues/939" data-id="166614282" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#939</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/944" data-url="https://github.com/matrix-org/synapse/issues/944" data-id="166840622" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#944</a>)</li>
  <li>Add GET /device/{'{'}deviceId{'{'} (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/943" data-url="https://github.com/matrix-org/synapse/issues/943" data-id="166792610" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#943</a>)</li>
  <li>Add update and delete APIs for devices (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/949" data-url="https://github.com/matrix-org/synapse/issues/949" data-id="167421787" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#949</a>)</li>
</ul>
Changes:
<ul>
  <li>Rewrite LDAP Authentication against ldap3 (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/843" data-url="https://github.com/matrix-org/synapse/issues/843" data-id="158692541" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#843</a> by <a class="user-mention" href="https://github.com/mweinelt">@mweinelt</a>)</li>
  <li>Linearize some federation endpoints based on (origin, room_id) (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/879" data-url="https://github.com/matrix-org/synapse/issues/879" data-id="160917868" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#879</a>)</li>
  <li>Remove the legacy v0 content upload API. (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/888" data-url="https://github.com/matrix-org/synapse/issues/888" data-id="161405539" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#888</a>)</li>
  <li>Use similar naming we use in email notifs for push (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/894" data-url="https://github.com/matrix-org/synapse/issues/894" data-id="162121552" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#894</a>)</li>
  <li>Optionally include password hash in createUser endpoint (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/905" data-url="https://github.com/matrix-org/synapse/issues/905" data-id="163548694" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#905</a> by <a class="user-mention" href="https://github.com/KentShikama">@KentShikama</a>)</li>
  <li>Use a query that postgresql optimises better for get_events_around (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/906" data-url="https://github.com/matrix-org/synapse/issues/906" data-id="163691925" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#906</a>)</li>
  <li>Fall back to 'username' if 'user' is not given for appservice registration. (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/927" data-url="https://github.com/matrix-org/synapse/issues/927" data-id="165932125" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#927</a> by <a class="user-mention" href="https://github.com/Half-Shot">@Half-Shot</a>)</li>
  <li>Add metrics for psutil derived memory usage (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/936" data-url="https://github.com/matrix-org/synapse/issues/936" data-id="166605269" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#936</a>)</li>
  <li>Record device_id in client_ips (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/938" data-url="https://github.com/matrix-org/synapse/issues/938" data-id="166613664" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#938</a>)</li>
  <li>Send the correct host header when fetching keys (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/941" data-url="https://github.com/matrix-org/synapse/issues/941" data-id="166784788" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#941</a>)</li>
  <li>Log the hostname the reCAPTCHA was completed on (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/946" data-url="https://github.com/matrix-org/synapse/issues/946" data-id="167078376" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#946</a>)</li>
  <li>Make the device id on e2e key upload optional (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/956" data-url="https://github.com/matrix-org/synapse/issues/956" data-id="167831954" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#956</a>)</li>
  <li>Add r0.2.0 to the "supported versions" list (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/960" data-url="https://github.com/matrix-org/synapse/issues/960" data-id="168038168" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#960</a>)</li>
  <li>Don't include name of room for invites in push (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/961" data-url="https://github.com/matrix-org/synapse/issues/961" data-id="168050327" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#961</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix substitution failure in mail template (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/887" data-url="https://github.com/matrix-org/synapse/issues/887" data-id="161403101" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#887</a>)</li>
  <li>Put most recent 20 messages in email notif (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/892" data-url="https://github.com/matrix-org/synapse/issues/892" data-id="161732391" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#892</a>)</li>
  <li>Ensure that the guest user is in the database when upgrading accounts (PR <a class="issue-link js-issue-link" title="Ensure that the guest user is in the database when upgrading accounts" href="https://github.com/matrix-org/synapse/pull/914" data-id="164541872" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#914</a>)</li>
  <li>Fix various edge cases in auth handling (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/919" data-url="https://github.com/matrix-org/synapse/issues/919" data-id="165306219" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#919</a>)</li>
  <li>Fix 500 ISE when sending alias event without a state_key (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/925" data-url="https://github.com/matrix-org/synapse/issues/925" data-id="165844030" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#925</a>)</li>
  <li>Fix bug where we stored rejections in the state_group, persist all rejections (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/948" data-url="https://github.com/matrix-org/synapse/issues/948" data-id="167391758" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#948</a>)</li>
  <li>Fix lack of check of if the user is banned when handling 3pid invites (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/952" data-url="https://github.com/matrix-org/synapse/issues/952" data-id="167640958" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#952</a>)</li>
  <li>Fix a couple of bugs in the transaction and keyring code (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/954" data-url="https://github.com/matrix-org/synapse/issues/954" data-id="167675906" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#954</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/955" data-url="https://github.com/matrix-org/synapse/issues/955" data-id="167810557" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#955</a>)</li>
</ul>
