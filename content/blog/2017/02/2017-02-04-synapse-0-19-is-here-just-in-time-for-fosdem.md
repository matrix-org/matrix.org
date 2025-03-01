+++
title = "Synapse 0.19 is here, just in time for FOSDEM!"
path = "/blog/2017/02/04/synapse-0-19-is-here-just-in-time-for-fosdem"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

We're happy to announce the release of Synapse 0.19.0 (same as 0.19.0-rc4) today, just in time for anyone discovering Matrix for the first time at FOSDEM 2017!  In fact, here's Erik doing the release right now (with moral support from Luke):

<img class="aligncenter size-large wp-image-1900" src="/blog/wp-content/uploads/2017/02/release-1024x768.jpg" alt="release" width="1024" height="768" />

This is a pretty big release, with a bunch of new features and lots and lots of debugging and optimisation work following on some of the dramas that we had with 0.18 over the Christmas break.  The biggest things are:
<ul>
  <li>IPv6 Support (unless you have an IPv6 only resolver), thanks to contributions from Glyph from Twisted and Kyrias!</li>
  <li>A new API for tracking the E2E devices present in a room (required for fixing many of the remaining E2E bugs...)</li>
  <li>Rewrite the 'state resolution' algorithm to be orders of magnitude more performant</li>
  <li>Lots of tuning to the caching logic.</li>
</ul>
If you're already running a server, please upgrade!  And if you're not, go grab yourself a <a href="https://github.com/matrix-org/synapse">brand new Synapse</a> from Github. Debian packages will follow shortly (as soon as Erik can figure out the necessary backporting required for Twisted 16.6.0)

And here's the full changelog...

## Changes in synapse v0.19.0 (2017-02-04)

No changes since RC 4.

## Changes in synapse v0.19.0-rc4 (2017-02-02)

<ul>
  <li>Bump cache sizes for common membership queries (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1879" data-url="https://github.com/matrix-org/synapse/issues/1879" data-id="204961298" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1879</a>)</li>
</ul>

## Changes in synapse v0.19.0-rc3 (2017-02-02)

<ul>
  <li>Fix email push in pusher worker (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1875" data-url="https://github.com/matrix-org/synapse/issues/1875" data-id="204840617" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1875</a>)</li>
  <li>Make presence.get_new_events a bit faster (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1876" data-url="https://github.com/matrix-org/synapse/issues/1876" data-id="204868725" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1876</a>)</li>
  <li>Make /keys/changes a bit more performant (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1877" data-url="https://github.com/matrix-org/synapse/issues/1877" data-id="204905372" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1877</a>)</li>
</ul>

## Changes in synapse v0.19.0-rc2 (2017-02-02)

<ul>
  <li>Include newly joined users in /keys/changes API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1872" data-url="https://github.com/matrix-org/synapse/issues/1872" data-id="204651600" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1872</a>)</li>
</ul>

## Changes in synapse v0.19.0-rc1 (2017-02-02)

Features:
<ul>
  <li>Add support for specifying multiple bind addresses (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1709" data-url="https://github.com/matrix-org/synapse/issues/1709" data-id="196299310" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1709</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1712" data-url="https://github.com/matrix-org/synapse/issues/1712" data-id="196557084" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1712</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1795" data-url="https://github.com/matrix-org/synapse/issues/1795" data-id="199882750" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1795</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1835" data-url="https://github.com/matrix-org/synapse/issues/1835" data-id="202121261" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1835</a>). Thanks to <a class="user-mention" href="https://github.com/kyrias">@kyrias</a>!</li>
  <li>Add /account/3pid/delete endpoint (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1714" data-url="https://github.com/matrix-org/synapse/issues/1714" data-id="196744832" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1714</a>)</li>
  <li>Add config option to configure the Riot URL used in notification emails (PR <a class="issue-link js-issue-link" title="Allow configuring the Riot URL used in notification emails" href="https://github.com/matrix-org/synapse/pull/1811" data-id="200657367" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1811</a>). Thanks to <a class="user-mention" href="https://github.com/aperezdc">@aperezdc</a>!</li>
  <li>Add username and password config options for turn server (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1832" data-url="https://github.com/matrix-org/synapse/issues/1832" data-id="201858252" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1832</a>). Thanks to <a class="user-mention" href="https://github.com/xsteadfastx">@xsteadfastx</a>!</li>
  <li>Implement device lists updates over federation (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1857" data-url="https://github.com/matrix-org/synapse/issues/1857" data-id="203413361" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1857</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1861" data-url="https://github.com/matrix-org/synapse/issues/1861" data-id="204067531" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1861</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1864" data-url="https://github.com/matrix-org/synapse/issues/1864" data-id="204251726" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1864</a>)</li>
  <li>Implement /keys/changes (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1869" data-url="https://github.com/matrix-org/synapse/issues/1869" data-id="204547521" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1869</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1872" data-url="https://github.com/matrix-org/synapse/issues/1872" data-id="204651600" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1872</a>)</li>
</ul>
Changes:
<ul>
  <li>Improve IPv6 support (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1696" data-url="https://github.com/matrix-org/synapse/issues/1696" data-id="195001361" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1696</a>). Thanks to <a class="user-mention" href="https://github.com/kyrias">@kyrias</a> and <a class="user-mention" href="https://github.com/glyph">@glyph</a>!</li>
  <li>Log which files we saved attachments to in the media_repository (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1791" data-url="https://github.com/matrix-org/synapse/issues/1791" data-id="199834508" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1791</a>)</li>
  <li>Linearize updates to membership via PUT /state/ to better handle multiple joins (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1787" data-url="https://github.com/matrix-org/synapse/issues/1787" data-id="199625078" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1787</a>)</li>
  <li>Limit number of entries to prefill from cache on startup (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1792" data-url="https://github.com/matrix-org/synapse/issues/1792" data-id="199837759" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1792</a>)</li>
  <li>Remove full_twisted_stacktraces option (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1802" data-url="https://github.com/matrix-org/synapse/issues/1802" data-id="200333064" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1802</a>)</li>
  <li>Measure size of some caches by sum of the size of cached values (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1815" data-url="https://github.com/matrix-org/synapse/issues/1815" data-id="201019660" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1815</a>)</li>
  <li>Measure metrics of string_cache (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1821" data-url="https://github.com/matrix-org/synapse/issues/1821" data-id="201347397" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1821</a>)</li>
  <li>Reduce logging verbosity (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1822" data-url="https://github.com/matrix-org/synapse/issues/1822" data-id="201347914" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1822</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1823" data-url="https://github.com/matrix-org/synapse/issues/1823" data-id="201350918" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1823</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1824" data-url="https://github.com/matrix-org/synapse/issues/1824" data-id="201351456" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1824</a>)</li>
  <li>Don't clobber a displayname or avatar_url if provided by an m.room.member event (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1852" data-url="https://github.com/matrix-org/synapse/issues/1852" data-id="202898869" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1852</a>)</li>
  <li>Better handle 401/404 response for federation /send/ (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1866" data-url="https://github.com/matrix-org/synapse/issues/1866" data-id="204298485" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1866</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1871" data-url="https://github.com/matrix-org/synapse/issues/1871" data-id="204619103" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1871</a>)</li>
</ul>
Fixes:
<ul>
  <li>Fix ability to change password to a non-ascii one (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1711" data-url="https://github.com/matrix-org/synapse/issues/1711" data-id="196303488" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1711</a>)</li>
  <li>Fix push getting stuck due to looking at the wrong view of state (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1820" data-url="https://github.com/matrix-org/synapse/issues/1820" data-id="201302378" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1820</a>)</li>
  <li>Fix email address comparison to be case insensitive (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1827" data-url="https://github.com/matrix-org/synapse/issues/1827" data-id="201573837" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1827</a>)</li>
  <li>Fix occasional inconsistencies of room membership (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1836" data-url="https://github.com/matrix-org/synapse/issues/1836" data-id="202122666" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1836</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1840" data-url="https://github.com/matrix-org/synapse/issues/1840" data-id="202175956" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1840</a>)</li>
</ul>
Performance:
<ul>
  <li>Don't block messages sending on bumping presence (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1789" data-url="https://github.com/matrix-org/synapse/issues/1789" data-id="199812171" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1789</a>)</li>
  <li>Change device_inbox stream index to include user (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1793" data-url="https://github.com/matrix-org/synapse/issues/1793" data-id="199845292" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1793</a>)</li>
  <li>Optimise state resolution (PR <a class="issue-link js-issue-link" title=" Optimise state resolution" href="https://github.com/matrix-org/synapse/pull/1818" data-id="201285644" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1818</a>)</li>
  <li>Use DB cache of joined users for presence (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1862" data-url="https://github.com/matrix-org/synapse/issues/1862" data-id="204068613" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1862</a>)</li>
  <li>Add an index to make membership queries faster (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1867" data-url="https://github.com/matrix-org/synapse/issues/1867" data-id="204327354" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1867</a>)</li>
</ul>
