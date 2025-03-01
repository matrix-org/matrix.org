+++
title = "Synapse 0.18.5 released!"
path = "/blog/2016/12/19/synapse-0-18-5-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi folks,

We released synapse 0.18.5 on Friday.  This is mainly about fixing performance problems with the unread room counts and the public room directory; polishing the E2E endpoints based on beta feedback; and general minor bits and bobs.

Get it whilst it's (almost) hot from <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>!  Changelog follows:

### Changes in synapse v0.18.5 (2016-12-16)

Bug fixes:
<ul>
  <li>Fix federation /backfill returning events it shouldn't (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1700" data-url="https://github.com/matrix-org/synapse/issues/1700" data-id="195535459" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1700</a>)</li>
  <li>Fix crash in url preview (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1701" data-url="https://github.com/matrix-org/synapse/issues/1701" data-id="195654621" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1701</a>)</li>
</ul>

### Changes in synapse v0.18.5-rc3 (2016-12-13)

Features:
<ul>
  <li>Add support for E2E for guests (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1653" data-url="https://github.com/matrix-org/synapse/issues/1653" data-id="191729740" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1653</a>)</li>
  <li>Add new API appservice specific public room list (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1676" data-url="https://github.com/matrix-org/synapse/issues/1676" data-id="193810881" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1676</a>)</li>
  <li>Add new room membership APIs (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1680" data-url="https://github.com/matrix-org/synapse/issues/1680" data-id="194337450" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1680</a>)</li>
</ul>
Changes:
<ul>
  <li>Enable guest access for private rooms by default (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/653" data-url="https://github.com/matrix-org/synapse/issues/653" data-id="141629328" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#653</a>)</li>
  <li>Limit the number of events that can be created on a given room concurrently (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1620" data-url="https://github.com/matrix-org/synapse/issues/1620" data-id="188559220" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1620</a>)</li>
  <li>Log the args that we have on UI auth completion (PR <a class="issue-link js-issue-link" title="Log the args that we have on UI auth completion" href="https://github.com/matrix-org/synapse/pull/1649" data-id="191480434" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1649</a>)</li>
  <li>Stop generating refresh_tokens (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1654" data-url="https://github.com/matrix-org/synapse/issues/1654" data-id="191730725" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1654</a>)</li>
  <li>Stop putting a time caveat on access tokens (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1656" data-url="https://github.com/matrix-org/synapse/issues/1656" data-id="191962876" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1656</a>)</li>
  <li>Remove unspecced GET endpoints for e2e keys (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1694" data-url="https://github.com/matrix-org/synapse/issues/1694" data-id="194929277" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1694</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix handling of 500 and 429's over federation (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1650" data-url="https://github.com/matrix-org/synapse/issues/1650" data-id="191542366" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1650</a>)</li>
  <li>Fix Content-Type header parsing (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1660" data-url="https://github.com/matrix-org/synapse/issues/1660" data-id="192589052" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1660</a>)</li>
  <li>Fix error when previewing sites that include unicode, thanks to <a class="user-mention" href="https://github.com/kyrias">@kyrias</a> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1664" data-url="https://github.com/matrix-org/synapse/issues/1664" data-id="192830301" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1664</a>)</li>
  <li>Fix some cases where we drop read receipts (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1678" data-url="https://github.com/matrix-org/synapse/issues/1678" data-id="194321090" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1678</a>)</li>
  <li>Fix bug where calls to <code>/sync</code> didn't correctly timeout (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1683" data-url="https://github.com/matrix-org/synapse/issues/1683" data-id="194627488" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1683</a>)</li>
  <li>Fix bug where E2E key query would fail if a single remote host failed (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1686" data-url="https://github.com/matrix-org/synapse/issues/1686" data-id="194665373" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1686</a>)</li>
</ul>

### Changes in synapse v0.18.5-rc2 (2016-11-24)

Bug fixes:
<ul>
  <li>Don't send old events over federation, fixes bug in -rc1.</li>
</ul>

### Changes in synapse v0.18.5-rc1 (2016-11-24)

Features:
<ul>
  <li>Implement "event_fields" in filters (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1638" data-url="https://github.com/matrix-org/synapse/issues/1638" data-id="190978482" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1638</a>)</li>
</ul>
Changes:
<ul>
  <li>Use external ldap auth package (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1628" data-url="https://github.com/matrix-org/synapse/issues/1628" data-id="189389095" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1628</a>)</li>
  <li>Split out federation transaction sending to a worker (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1635" data-url="https://github.com/matrix-org/synapse/issues/1635" data-id="190696205" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1635</a>)</li>
  <li>Fail with a coherent error message if <code>/sync?filter=</code> is invalid (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1636" data-url="https://github.com/matrix-org/synapse/issues/1636" data-id="190714631" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1636</a>)</li>
  <li>More efficient notif count queries (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1644" data-url="https://github.com/matrix-org/synapse/issues/1644" data-id="191311986" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1644</a>)</li>
</ul>
