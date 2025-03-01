+++
title = "Security update: Synapse 0.32.0"
path = "/blog/2018/07/06/security-update-synapse-0-32-0"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases", "Security"]
+++

Folks, Synapse 0.32.0 is an important security update: please upgrade as soon as you can.

The release focuses on security; fixing several federation bugs and adding new features for countering abuse. Notably it includes the ability to blacklist & whitelist servers allowed to send events to a room on a per-room basis via the new
m.room.server_acl
 state event: see <a href="https://docs.google.com/document/d/1aiuROf1__7ZFkJvDdAZQfBNxyzjYd-ijiRAcHJYqJCM/edit">MSC1383</a> for details.  This also closes out <a href="https://github.com/matrix-org/matrix-doc/issues/709">https://github.com/matrix-org/matrix-doc/issues/709</a> - one of our oldest feature requests from users who wish to be able to limit the servers allowed to participate in a given room.

It's important to understand that server ACLs only work if all the servers participating in the room honour them.  In future this will be handled better (as part of ongoing work in making it easier to incrementally version and upgrade the federation protocol).  This means that for the ACLs to work, any servers which don't yet implement ACLs (e.g. older Synapses) have to be ACL'd from the room for the access control to work.  
<b>Therefore please upgrade as soon as possible to avoid this problem.</b>

This ongoing flurry of security work is in general all part of moving towards the long-awaited stable release of the Server-Server API. In parallel we've been working on the other main outstanding point: State Resets (i.e. scenarios where you get unexpected results when resolving conflicts between different servers' copies of a room).  There will be a few more major changes and upgrades on the horizon as we fix these, but then we'll finally be able to cut an r0 release of the Server-Server API and Matrix will be one massive step closer to being out of beta!

As always, you can get the new update from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.32.1">https://github.com/matrix-org/synapse/releases/tag/v0.32.1</a>
 or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>.

## Changes in synapse v0.32.0 (2018-07-06)

No changes since 0.32.0rc1

## Synapse 0.32.0rc1 (2018-07-05)

### Features

<ul>
  <li>Add blacklist & whitelist of servers allowed to send events to a
room via <code>m.room.server_acl</code> event. (<a href="https://github.com/matrix-org/synapse/commit/feef8461d19c51f3766471e17e2a2f8a2b36c785">merge</a>)</li>
  <li>Cache factor override system for specific caches (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3334" data-error-text="Failed to load issue title" data-id="329021103" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3334">#3334</a>)</li>
  <li>Add metrics to track appservice transactions (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3344" data-error-text="Failed to load issue title" data-id="329432100" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3344">#3344</a>)</li>
  <li>Try to log more helpful info when a sig verification fails
(<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3372" data-error-text="Failed to load issue title" data-id="330617906" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3372">#3372</a>)</li>
  <li>Synapse now uses the best performing JSON encoder/decoder according
to your runtime (simplejson on CPython, stdlib json on PyPy).
(<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3462" data-error-text="Failed to load issue title" data-id="336619861" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3462">#3462</a>)</li>
  <li>Add optional ip_range_whitelist param to AS registration files to
lock AS IP access (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3465" data-error-text="Failed to load issue title" data-id="336751400" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3465">#3465</a>)</li>
  <li>Reject invalid server names in federation requests (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3480" data-error-text="Failed to load issue title" data-id="337874054" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3480">#3480</a>)</li>
  <li>Reject invalid server names in homeserver.yaml (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3483" data-error-text="Failed to load issue title" data-id="338348899" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3483">#3483</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Strip access_token from outgoing requests (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3327" data-error-text="Failed to load issue title" data-id="328782473" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3327">#3327</a>)</li>
  <li>Redact AS tokens in logs (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3349" data-error-text="Failed to load issue title" data-id="329791545" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3349">#3349</a>)</li>
  <li>Fix federation backfill from SQLite servers (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3355" data-error-text="Failed to load issue title" data-id="329865615" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3355">#3355</a>)</li>
  <li>Fix event-purge-by-ts admin API (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3363" data-error-text="Failed to load issue title" data-id="330065602" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3363">#3363</a>)</li>
  <li>Fix event filtering in get_missing_events handler (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3371" data-error-text="Failed to load issue title" data-id="330608172" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3371">#3371</a>)</li>
  <li>Synapse is now stricter regarding accepting events which it cannot
retrieve the prev_events for. (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3456" data-error-text="Failed to load issue title" data-id="336184658" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3456">#3456</a>)</li>
  <li>Fix bug where synapse would explode when receiving unicode in HTTP
User-Agent header (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3470" data-error-text="Failed to load issue title" data-id="337261723" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3470">#3470</a>)</li>
  <li>Invalidate cache on correct thread to avoid race (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3473" data-error-text="Failed to load issue title" data-id="337463703" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3473">#3473</a>)</li>
</ul>

#### Improved Documentation

<ul>
  <li><code>doc/postgres.rst</code>: fix display of the last command block. Thanks to
<a class="user-mention" href="https://github.com/ArchangeGabriel" data-hovercard-user-id="490531" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" aria-describedby="hovercard-aria-description">@ArchangeGabriel</a>! (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3340" data-error-text="Failed to load issue title" data-id="329241972" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3340">#3340</a>)</li>
</ul>

#### Deprecations and Removals

<ul>
  <li>Remove was_forgotten_at (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3324" data-error-text="Failed to load issue title" data-id="328600145" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3324">#3324</a>)</li>
</ul>

#### Misc

<ul>
  <li><a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3332" data-error-text="Failed to load issue title" data-id="328922729" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3332">#3332</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3341" data-error-text="Failed to load issue title" data-id="329315777" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3341">#3341</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3347" data-error-text="Failed to load issue title" data-id="329626817" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3347">#3347</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3348" data-error-text="Failed to load issue title" data-id="329660142" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3348">#3348</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3356" data-error-text="Failed to load issue title" data-id="329938222" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3356">#3356</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3385" data-error-text="Failed to load issue title" data-id="331533857" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3385">#3385</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3446" data-error-text="Failed to load issue title" data-id="335720791" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3446">#3446</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/issues/3447" data-error-text="Failed to load issue title" data-id="335727844" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3447">#3447</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3467" data-error-text="Failed to load issue title" data-id="336993276" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3467">#3467</a> <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3474" data-error-text="Failed to load issue title" data-id="337465451" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3474">#3474</a></li>
</ul>
