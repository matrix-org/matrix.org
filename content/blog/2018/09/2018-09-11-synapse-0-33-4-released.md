+++
title = "Synapse 0.33.4 released!"
path = "/blog/2018/09/11/synapse-0-33-4-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Roll up, roll up, get it while it's hot, Synapse 0.33.4 is here.

This release brings together a whole host of bug fixes, some enhancements to resource usage management and a bunch of internal changes in readiness for room member state lazy loading and our ongoing port to Python 3 (we are hoping to ship a py3 test candidate rsn!).

As ever, you can get the new update from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.4">https://github.com/matrix-org/synapse/releases/tag/v0.33.4</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>.

#### Features

<ul>
  <li>Support profile API endpoints on workers (<a href="https://github.com/matrix-org/synapse/issues/3659">#3659</a>)</li>
  <li>Server notices for resource limit blocking (<a href="https://github.com/matrix-org/synapse/issues/3680">#3680</a>)</li>
  <li>Allow guests to use /rooms/:roomId/event/:eventId (<a href="https://github.com/matrix-org/synapse/issues/3724">#3724</a>)</li>
  <li>Add mau_trial_days config param, so that users only get counted as MAU after N days. (<a href="https://github.com/matrix-org/synapse/issues/3749">#3749</a>)</li>
  <li>Require twisted 17.1 or later (fixes <a href="https://github.com/matrix-org/synapse/issues/3741">#3741</a>). (<a href="https://github.com/matrix-org/synapse/issues/3751">#3751</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix error collecting prometheus metrics when run on dedicated thread due to threading concurrency issues (<a href="https://github.com/matrix-org/synapse/issues/3722">#3722</a>)</li>
  <li>Fix bug where we resent "limit exceeded" server notices repeatedly (<a href="https://github.com/matrix-org/synapse/issues/3747">#3747</a>)</li>
  <li>Fix bug where we broke sync when using limit_usage_by_mau but hadn't configured server notices (<a href="https://github.com/matrix-org/synapse/issues/3753">#3753</a>)</li>
  <li>Fix 'federation_domain_whitelist' such that an empty list correctly blocks all outbound federation traffic (<a href="https://github.com/matrix-org/synapse/issues/3754">#3754</a>)</li>
  <li>Fix tagging of server notice rooms (<a href="https://github.com/matrix-org/synapse/issues/3755">#3755</a>, <a href="https://github.com/matrix-org/synapse/issues/3756">#3756</a>)</li>
  <li>Fix 'admin_uri' config variable and error parameter to be 'admin_contact' to match the spec. (<a href="https://github.com/matrix-org/synapse/issues/3758">#3758</a>)</li>
  <li>Don't return non-LL-member state in incremental sync state blocks (<a href="https://github.com/matrix-org/synapse/issues/3760">#3760</a>)</li>
  <li>Fix bug in sending presence over federation (<a href="https://github.com/matrix-org/synapse/issues/3768">#3768</a>)</li>
  <li>Fix bug where preserved threepid user comes to sign up and server is mau blocked (<a href="https://github.com/matrix-org/synapse/issues/3777">#3777</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Removed the link to the unmaintained matrix-synapse-auto-deploy project from the readme. (<a href="https://github.com/matrix-org/synapse/issues/3378">#3378</a>)</li>
  <li>Refactor state module to support multiple room versions (<a href="https://github.com/matrix-org/synapse/issues/3673">#3673</a>)</li>
  <li>The synapse.storage module has been ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3725">#3725</a>)</li>
  <li>Split the state_group_cache into member and non-member state events (and so speed up LL /sync) (<a href="https://github.com/matrix-org/synapse/issues/3726">#3726</a>)</li>
  <li>Log failure to authenticate remote servers as warnings (without stack traces) (<a href="https://github.com/matrix-org/synapse/issues/3727">#3727</a>)</li>
  <li>The CONTRIBUTING guidelines have been updated to mention our use of Markdown and that .misc files have content. (<a href="https://github.com/matrix-org/synapse/issues/3730">#3730</a>)</li>
  <li>Reference the need for an HTTP replication port when using the federation_reader worker (<a href="https://github.com/matrix-org/synapse/issues/3734">#3734</a>)</li>
  <li>Fix minor spelling error in federation client documentation. (<a href="https://github.com/matrix-org/synapse/issues/3735">#3735</a>)</li>
  <li>Remove redundant state resolution function (<a href="https://github.com/matrix-org/synapse/issues/3737">#3737</a>)</li>
  <li>The test suite now passes on PostgreSQL. (<a href="https://github.com/matrix-org/synapse/issues/3740">#3740</a>)</li>
  <li>Fix MAU cache invalidation due to missing yield (<a href="https://github.com/matrix-org/synapse/issues/3746">#3746</a>)</li>
  <li>Make sure that we close db connections opened during init (<a href="https://github.com/matrix-org/synapse/issues/3764">#3764</a>)</li>
  <li>Unignore synctl in .dockerignore to fix docker builds (<a href="https://github.com/matrix-org/synapse/issues/3802">#3802</a>)</li>
</ul>
