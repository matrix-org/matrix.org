+++
title = "Synapse 0.33.5.1 released!"
path = "/blog/2018/09/24/synapse-0-33-5-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Folks, Synapse 0.33.5.1 is here.

0.33.5.1 is an interesting release. On the one hand it contains the usual bug fixes and performance improvements of a point release, but it also our first versioned release where monolith installs can be run under Python 3.5 and 3.6! Python 3 support is very much in beta, so please be cautious but if you would like to try running under a py3 environment we'd love to get your feedback.

We've been running it ourselves for the past few weeks, and feel pretty good about it, not least the 2-3x improvement in RAM usage.

Currently the only way to run under python 3 is to download via github, there is no deb support as yet, though this will come as soon as we are confident to recommend python 3 as the default version.

We'll be blogging about our porting project in more detail in the future, so watch this space - exciting times!

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.5.1">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, for the first time, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>.

## Synapse 0.33.5.1

### Internal Changes

<ul>
  <li>Fix incompatibility with older Twisted version in tests. Thanks <a class="user-mention" href="https://github.com/OlegGirko" data-hovercard-user-id="6013515" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" aria-describedby="hovercard-aria-description">@OlegGirko</a>! (<a href="https://github.com/matrix-org/synapse/issues/3940">#3940</a>)</li>
</ul>

## Synapse 0.33.5

### Features

<ul>
  <li>Python 3.5 and 3.6 support is now in beta. (<a href="https://github.com/matrix-org/synapse/issues/3576">#3576</a>)</li>
  <li>Implement <code>event_format</code> filter param in <code>/sync</code> (<a href="https://github.com/matrix-org/synapse/issues/3790">#3790</a>)</li>
  <li>Add synapse_admin_mau:registered_reserved_users metric to expose number of real reaserved users (<a href="https://github.com/matrix-org/synapse/issues/3846">#3846</a>)</li>
</ul>

### Bugfixes

<ul>
  <li>Remove connection ID for replication prometheus metrics, as it creates a large number of new series. (<a href="https://github.com/matrix-org/synapse/issues/3788">#3788</a>)</li>
  <li>guest users should not be part of mau total (<a href="https://github.com/matrix-org/synapse/issues/3800">#3800</a>)</li>
  <li>Bump dependency on pyopenssl 16.x, to avoid incompatibility with recent Twisted. (<a href="https://github.com/matrix-org/synapse/issues/3804">#3804</a>)</li>
  <li>Fix existing room tags not coming down sync when joining a room (<a href="https://github.com/matrix-org/synapse/issues/3810">#3810</a>)</li>
  <li>Fix jwt import check (<a href="https://github.com/matrix-org/synapse/issues/3824">#3824</a>)</li>
  <li>fix VOIP crashes under Python 3 (<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/issues/3821" data-error-text="Failed to load issue title" data-id="358016305" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3821">#3821</a>) (<a href="https://github.com/matrix-org/synapse/issues/3835">#3835</a>)</li>
  <li>Fix manhole so that it works with latest openssh clients (<a href="https://github.com/matrix-org/synapse/issues/3841">#3841</a>)</li>
  <li>Fix outbound requests occasionally wedging, which can result in federation breaking between servers. (<a href="https://github.com/matrix-org/synapse/issues/3845">#3845</a>)</li>
  <li>Show heroes if room name/canonical alias has been deleted (<a href="https://github.com/matrix-org/synapse/issues/3851">#3851</a>)</li>
  <li>Fix handling of redacted events from federation (<a href="https://github.com/matrix-org/synapse/issues/3859">#3859</a>)</li>
  <li>(<a href="https://github.com/matrix-org/synapse/issues/3874">#3874</a>)</li>
  <li>Mitigate outbound federation randomly becoming wedged (<a href="https://github.com/matrix-org/synapse/issues/3875">#3875</a>)</li>
</ul>

### Internal Changes

<ul>
  <li>CircleCI tests now run on the potential merge of a PR. (<a href="https://github.com/matrix-org/synapse/issues/3704">#3704</a>)</li>
  <li>http/ is now ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3771">#3771</a>)</li>
  <li>Improve human readable error messages for threepid registration/account update (<a href="https://github.com/matrix-org/synapse/issues/3789">#3789</a>)</li>
  <li>Make /sync slightly faster by avoiding needless copies (<a href="https://github.com/matrix-org/synapse/issues/3795">#3795</a>)</li>
  <li>handlers/ is now ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3803">#3803</a>)</li>
  <li>Limit the number of PDUs/EDUs per federation transaction (<a href="https://github.com/matrix-org/synapse/issues/3805">#3805</a>)</li>
  <li>Only start postgres instance for postgres tests on Travis CI (<a href="https://github.com/matrix-org/synapse/issues/3806">#3806</a>)</li>
  <li>tests/ is now ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3808">#3808</a>)</li>
  <li>crypto/ is now ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3822">#3822</a>)</li>
  <li>rest/ is now ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3823">#3823</a>)</li>
  <li>add some logging for the keyring queue (<a href="https://github.com/matrix-org/synapse/issues/3826">#3826</a>)</li>
  <li>speed up lazy loading by 2-3x (<a href="https://github.com/matrix-org/synapse/issues/3827">#3827</a>)</li>
  <li>Improved Dockerfile to remove build requirements after building reducing the image size. (<a href="https://github.com/matrix-org/synapse/issues/3834">#3834</a>)</li>
  <li>Disable lazy loading for incremental syncs for now (<a href="https://github.com/matrix-org/synapse/issues/3840">#3840</a>)</li>
  <li>federation/ is now ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3847">#3847</a>)</li>
  <li>Log when we retry outbound requests (<a href="https://github.com/matrix-org/synapse/issues/3853">#3853</a>)</li>
  <li>Removed some excess logging messages. (<a href="https://github.com/matrix-org/synapse/issues/3855">#3855</a>)</li>
  <li>Speed up purge history for rooms that have been previously purged (<a href="https://github.com/matrix-org/synapse/issues/3856">#3856</a>)</li>
  <li>Refactor some HTTP timeout code. (<a href="https://github.com/matrix-org/synapse/issues/3857">#3857</a>)</li>
  <li>Fix running merged builds on CircleCI (<a href="https://github.com/matrix-org/synapse/issues/3858">#3858</a>)</li>
  <li>Fix typo in replication stream exception. (<a href="https://github.com/matrix-org/synapse/issues/3860">#3860</a>)</li>
  <li>Add in flight real time metrics for Measure blocks (<a href="https://github.com/matrix-org/synapse/issues/3871">#3871</a>)</li>
  <li>Disable buffering and automatic retrying in treq requests to prevent timeouts. (<a href="https://github.com/matrix-org/synapse/issues/3872">#3872</a>)</li>
  <li>mention jemalloc in the README (<a href="https://github.com/matrix-org/synapse/issues/3877">#3877</a>)</li>
  <li>Remove unmaintained "nuke-room-from-db.sh" script (<a href="https://github.com/matrix-org/synapse/issues/3888">#3888</a>)</li>
</ul>
