+++
title = "Critical Security Update: Synapse 0.33.3.1"
path = "/blog/2018/09/06/critical-security-update-synapse-0-33-3-1"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases", "Security"]
+++

Hi All,

As referenced in yesterday's <a href="/blog/2018/09/05/pre-disclosure-upcoming-critical-security-fix-for-synapse/">pre-disclosure</a>, today we are releasing Synapse 0.33.3.1 as a critical security update.

We have patched two security vulnerabilities we identified whilst working on the upcoming r0 spec release for the Server-Server API (see details below). We do not believe either have been exploited in the wild, but strongly recommend everybody running a federated Synapse upgrades immediately.

As always you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.3.1">here</a> or from any of the sources mentioned at <a href="https://github.com/matrix-org/synapse/">https://github.com/matrix-org/synapse/</a>

Many thanks for your patience and understanding; with fixes like this we are moving ever closer to Synapse reaching a 1.0 Thanks also to the package maintainers who have coordinated with us to ensure distro packages are available for a speedy upgrade!

Note, for anyone running Debian Jessie, we have prepared a 0.33.2.1 deb (as 0.33.3 dropped support for Jessie).

### Synapse 0.33.3.1 (2018-09-06)

#### SECURITY FIXES

<ul>
  <li>Fix an issue where event signatures were not always correctly validated (<a href="https://github.com/matrix-org/synapse/issues/3796">#3796</a>)</li>
  <li>Fix an issue where server_acls could be circumvented for incoming events (<a href="https://github.com/matrix-org/synapse/issues/3796">#3796</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Unignore synctl in .dockerignore to fix docker builds (<a href="https://github.com/matrix-org/synapse/issues/3802">#3802</a>)</li>
</ul>
