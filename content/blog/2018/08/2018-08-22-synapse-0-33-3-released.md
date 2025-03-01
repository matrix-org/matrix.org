+++
title = "Synapse 0.33.3 Released"
path = "/blog/2018/08/22/synapse-0-33-3-released"

[taxonomies]
author = ["Ben Parsons"]
category = ["Releases"]
+++

All the threes, Synapse 0.33.3!

This release brings together a lot of bugfixes, and also some preparation for support for Lazy Loading and Room Versioning.

We also have, as a great contribution from <a href="https://github.com/vojeroen">@vojeroen</a>, SNI extension support! With v0.33.3, Synapse now supports sending SNI over federation for vhosted servers, which resolves <a href="https://github.com/matrix-org/synapse/issues/1491">this long-standing request</a>.

As always, you can get the new update from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.3">https://github.com/matrix-org/synapse/releases/tag/v0.33.3</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>.

#### Features

<ul>
  <li>Add support for the SNI extension to federation TLS connections. Thanks to <a href="https://github.com/vojeroen">@vojeroen</a>! (<a href="https://github.com/matrix-org/synapse/issues/3439">#3439</a>)</li>
  <li>Add /_media/r0/config (<a href="https://github.com/matrix-org/synapse/issues/3184">#3184</a>)</li>
  <li>speed up /members API and add <code>at</code> and <code>membership</code> params as per MSC1227 (<a href="https://github.com/matrix-org/synapse/issues/3568">#3568</a>)</li>
  <li>implement <code>summary</code> block in /sync response as per MSC688 (<a href="https://github.com/matrix-org/synapse/issues/3574">#3574</a>)</li>
  <li>Add lazy-loading support to /messages as per MSC1227 (<a href="https://github.com/matrix-org/synapse/issues/3589">#3589</a>)</li>
  <li>Add ability to limit number of monthly active users on the server (<a href="https://github.com/matrix-org/synapse/issues/3633">#3633</a>)</li>
  <li>Support more federation endpoints on workers (<a href="https://github.com/matrix-org/synapse/issues/3653">#3653</a>)</li>
  <li>Basic support for room versioning (<a href="https://github.com/matrix-org/synapse/issues/3654">#3654</a>)</li>
  <li>Ability to disable client/server Synapse via conf toggle (<a href="https://github.com/matrix-org/synapse/issues/3655">#3655</a>)</li>
  <li>Ability to whitelist specific threepids against monthly active user limiting (<a href="https://github.com/matrix-org/synapse/issues/3662">#3662</a>)</li>
  <li>Add some metrics for the appservice and federation event sending loops (<a href="https://github.com/matrix-org/synapse/issues/3664">#3664</a>)</li>
  <li>Where server is disabled, block ability for locked out users to read new messages (<a href="https://github.com/matrix-org/synapse/issues/3670">#3670</a>)</li>
  <li>set admin uri via config, to be used in error messages where the user should contact the administrator (<a href="https://github.com/matrix-org/synapse/issues/3687">#3687</a>)</li>
  <li>Synapse's presence functionality can now be disabled with the "use_presence" configuration option. (<a href="https://github.com/matrix-org/synapse/issues/3694">#3694</a>)</li>
  <li>For resource limit blocked users, prevent writing into rooms (<a href="https://github.com/matrix-org/synapse/issues/3708">#3708</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix occasional glitches in the synapse_event_persisted_position metric (<a href="https://github.com/matrix-org/synapse/issues/3658">#3658</a>)</li>
  <li>Fix bug on deleting 3pid when using identity servers that don't support unbind API (<a href="https://github.com/matrix-org/synapse/issues/3661">#3661</a>)</li>
  <li>Make the tests pass on Twisted &lt; 18.7.0 (<a href="https://github.com/matrix-org/synapse/issues/3676">#3676</a>)</li>
  <li>Don't ship recaptcha_ajax.js, use it directly from Google (<a href="https://github.com/matrix-org/synapse/issues/3677">#3677</a>)</li>
  <li>Fixes test_reap_monthly_active_users so it passes under postgres (<a href="https://github.com/matrix-org/synapse/issues/3681">#3681</a>)</li>
  <li>Fix mau blocking calculation bug on login (<a href="https://github.com/matrix-org/synapse/issues/3689">#3689</a>)</li>
  <li>Fix missing yield in synapse.storage.monthly_active_users.initialise_reserved_users (<a href="https://github.com/matrix-org/synapse/issues/3692">#3692</a>)</li>
  <li>Improve HTTP request logging to include all requests (<a href="https://github.com/matrix-org/synapse/issues/3700">#3700</a>, <a href="https://github.com/matrix-org/synapse/issues/3723">#3723</a>)</li>
  <li>Avoid timing out requests while we are streaming back the response (<a href="https://github.com/matrix-org/synapse/issues/3701">#3701</a>)</li>
  <li>Support more federation endpoints on workers (<a href="https://github.com/matrix-org/synapse/issues/3705">#3705</a>, <a href="https://github.com/matrix-org/synapse/issues/3713">#3713</a>)</li>
  <li>Fix "Starting db txn 'get_all_updated_receipts' from sentinel context" warning (<a href="https://github.com/matrix-org/synapse/issues/3710">#3710</a>)</li>
  <li>Fix bug where <code>state_cache</code> cache factor ignored environment variables (<a href="https://github.com/matrix-org/synapse/issues/3719">#3719</a>)</li>
</ul>

#### Deprecations and Removals

<ul>
  <li>The Shared-Secret registration method of the legacy v1/register REST endpoint has been removed. For a replacement, please see <a href="https://github.com/matrix-org/synapse/blob/master/docs/admin_api/register_api.rst">the admin/register API documentation</a>. (<a href="https://github.com/matrix-org/synapse/issues/3703">#3703</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>The test suite now can run under PostgreSQL. (<a href="https://github.com/matrix-org/synapse/issues/3423">#3423</a>)</li>
  <li>Refactor HTTP replication endpoints to reduce code duplication (<a href="https://github.com/matrix-org/synapse/issues/3632">#3632</a>)</li>
  <li>Tests now correctly execute on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3647">#3647</a>)</li>
  <li>Sytests can now be run inside a Docker container. (<a href="https://github.com/matrix-org/synapse/issues/3660">#3660</a>)</li>
  <li>Port over enough to Python 3 to allow the sytests to start. (<a href="https://github.com/matrix-org/synapse/issues/3668">#3668</a>, <a href="https://github.com/matrix-org/synapse/issues/3732">#3732</a>)</li>
  <li>Update docker base image from alpine 3.7 to 3.8. (<a href="https://github.com/matrix-org/synapse/issues/3669">#3669</a>)</li>
  <li>Rename synapse.util.async to synapse.util.async_helpers to mitigate async becoming a keyword on Python 3.7. (<a href="https://github.com/matrix-org/synapse/issues/3678">#3678</a>)</li>
  <li>Synapse's tests are now formatted with the black autoformatter. (<a href="https://github.com/matrix-org/synapse/issues/3679">#3679</a>)</li>
  <li>Implemented a new testing base class to reduce test boilerplate. (<a href="https://github.com/matrix-org/synapse/issues/3684">#3684</a>)</li>
  <li>Rename MAU prometheus metrics (<a href="https://github.com/matrix-org/synapse/issues/3690">#3690</a>)</li>
  <li>add new error type ResourceLimit (<a href="https://github.com/matrix-org/synapse/issues/3707">#3707</a>)</li>
  <li>Logcontexts for replication command handlers (<a href="https://github.com/matrix-org/synapse/issues/3709">#3709</a>)</li>
  <li>Update admin register API documentation to reference a real user ID. (<a href="https://github.com/matrix-org/synapse/issues/3712">#3712</a>)</li>
</ul>
