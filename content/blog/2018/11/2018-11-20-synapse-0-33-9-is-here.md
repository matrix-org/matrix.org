+++
title = "Synapse 0.33.9 is here!"
path = "/blog/2018/11/20/synapse-0-33-9-is-here"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Well here you are then, the 9th episode in the Synapse 0.33.x series.

Features wise, 0.33.9 contains a change to the way that GDPR consent works under the hood. It is now plumbed in to the login flow (rather than following immediately afterwards) such that it does not inadvertently break on-boarding. This is part of a broader set of changes that span Synapse and Riot to improve initial first impressions of using matrix.

Separately we now have support for room version upgrades which is pre-requisite for rolling out the new state resolution algorithm, come and join us in #teststateresv2:jki.re if you would like to help us test.

Finally we've spent a bunch of time further improving perf especially in and around reducing device ids federation traffic.

I know I say it every time, but full python 3 support is really really close now, matrix.org is now running entirely on py3 and seeing some amazing perf improvements - the remaining blocker is getting py3 deb packages ready and then we'll ship an official python 3 release. There will also be a blog post to explain what we've been up to and what to expect perf wise.

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.9">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>. Also, check out our new <a href="/docs/guides/installing-synapse">Synapse installation guide page.</a>

### Synapse 0.33.9 changelog

#### Features

<ul>
  <li>Include flags to optionally add <code>m.login.terms</code> to the registration flow when consent tracking is enabled. (<a href="https://github.com/matrix-org/synapse/issues/4004" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4004/hovercard" aria-describedby="hovercard-aria-description">#4004</a>, <a href="https://github.com/matrix-org/synapse/issues/4133" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4133/hovercard" aria-describedby="hovercard-aria-description">#4133</a>, <a href="https://github.com/matrix-org/synapse/issues/4142" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4142/hovercard" aria-describedby="hovercard-aria-description">#4142</a>, <a href="https://github.com/matrix-org/synapse/issues/4184" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4184/hovercard" aria-describedby="hovercard-aria-description">#4184</a>)</li>
  <li>Support for replacing rooms with new ones (<a href="https://github.com/matrix-org/synapse/issues/4091" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4091/hovercard" aria-describedby="hovercard-aria-description">#4091</a>, <a href="https://github.com/matrix-org/synapse/issues/4099" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4099/hovercard" aria-describedby="hovercard-aria-description">#4099</a>, <a href="https://github.com/matrix-org/synapse/issues/4100" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4100/hovercard" aria-describedby="hovercard-aria-description">#4100</a>, <a href="https://github.com/matrix-org/synapse/issues/4101" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4101/hovercard" aria-describedby="hovercard-aria-description">#4101</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix exceptions when using the email mailer on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4095" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4095/hovercard" aria-describedby="hovercard-aria-description">#4095</a>)</li>
  <li>Fix e2e key backup with more than 9 backup versions (<a href="https://github.com/matrix-org/synapse/issues/4113" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4113/hovercard" aria-describedby="hovercard-aria-description">#4113</a>)</li>
  <li>Searches that request profile info now no longer fail with a 500. (<a href="https://github.com/matrix-org/synapse/issues/4122" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4122/hovercard" aria-describedby="hovercard-aria-description">#4122</a>)</li>
  <li>fix return code of empty key backups (<a href="https://github.com/matrix-org/synapse/issues/4123" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4123/hovercard" aria-describedby="hovercard-aria-description">#4123</a>)</li>
  <li>If the typing stream ID goes backwards (as on a worker when the master restarts), the worker's typing handler will no longer erroneously report rooms containing new typing events. (<a href="https://github.com/matrix-org/synapse/issues/4127" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4127/hovercard" aria-describedby="hovercard-aria-description">#4127</a>)</li>
  <li>Fix table lock of device_lists_remote_cache which could freeze the application (<a href="https://github.com/matrix-org/synapse/issues/4132" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4132/hovercard" aria-describedby="hovercard-aria-description">#4132</a>)</li>
  <li>Fix exception when using state res v2 algorithm (<a href="https://github.com/matrix-org/synapse/issues/4135" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4135/hovercard" aria-describedby="hovercard-aria-description">#4135</a>)</li>
  <li>Generating the user consent URI no longer fails on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4140" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4140/hovercard" aria-describedby="hovercard-aria-description">#4140</a>, <a href="https://github.com/matrix-org/synapse/issues/4163" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4163/hovercard" aria-describedby="hovercard-aria-description">#4163</a>)</li>
  <li>Loading URL previews from the DB cache on Postgres will no longer cause Unicode type errors when responding to the request, and URL previews will no longer fail if the remote server returns a Content-Type header with the chartype in quotes. (<a href="https://github.com/matrix-org/synapse/issues/4157" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4157/hovercard" aria-describedby="hovercard-aria-description">#4157</a>)</li>
  <li>The hash_password script now works on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4161" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4161/hovercard" aria-describedby="hovercard-aria-description">#4161</a>)</li>
  <li>Fix noop checks when updating device keys, reducing spurious device list update notifications. (<a href="https://github.com/matrix-org/synapse/issues/4164" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4164/hovercard" aria-describedby="hovercard-aria-description">#4164</a>)</li>
</ul>

#### Deprecations and Removals

<ul>
  <li>The disused and un-specced identicon generator has been removed. (<a href="https://github.com/matrix-org/synapse/issues/4106" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4106/hovercard" aria-describedby="hovercard-aria-description">#4106</a>)</li>
  <li>The obsolete and non-functional /pull federation endpoint has been removed. (<a href="https://github.com/matrix-org/synapse/issues/4118" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4118/hovercard" aria-describedby="hovercard-aria-description">#4118</a>)</li>
  <li>The deprecated v1 key exchange endpoints have been removed. (<a href="https://github.com/matrix-org/synapse/issues/4119" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4119/hovercard" aria-describedby="hovercard-aria-description">#4119</a>)</li>
  <li>Synapse will no longer fetch keys using the fallback deprecated v1 key exchange method and will now always use v2. (<a href="https://github.com/matrix-org/synapse/issues/4120" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4120/hovercard" aria-describedby="hovercard-aria-description">#4120</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Fix build of Docker image with docker-compose (<a href="https://github.com/matrix-org/synapse/issues/3778" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3778/hovercard" aria-describedby="hovercard-aria-description">#3778</a>)</li>
  <li>Delete unreferenced state groups during history purge (<a href="https://github.com/matrix-org/synapse/issues/4006" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4006/hovercard" aria-describedby="hovercard-aria-description">#4006</a>)</li>
  <li>The "Received rdata" log messages on workers is now logged at DEBUG, not INFO. (<a href="https://github.com/matrix-org/synapse/issues/4108" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4108/hovercard" aria-describedby="hovercard-aria-description">#4108</a>)</li>
  <li>Reduce replication traffic for device lists (<a href="https://github.com/matrix-org/synapse/issues/4109" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4109/hovercard" aria-describedby="hovercard-aria-description">#4109</a>)</li>
  <li>Fix <code>synapse_replication_tcp_protocol_*_commands</code> metric label to be full command name, rather than just the first character (<a href="https://github.com/matrix-org/synapse/issues/4110" data-hovercard-type="issue" data-hovercard-url="/matrix-org/synapse/issues/4110/hovercard" aria-describedby="hovercard-aria-description">#4110</a>)</li>
  <li>Log some bits about room creation (<a href="https://github.com/matrix-org/synapse/issues/4121" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4121/hovercard" aria-describedby="hovercard-aria-description">#4121</a>)</li>
  <li>Fix <code>tox</code> failure on old systems (<a href="https://github.com/matrix-org/synapse/issues/4124" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4124/hovercard" aria-describedby="hovercard-aria-description">#4124</a>)</li>
  <li>Add STATE_V2_TEST room version (<a href="https://github.com/matrix-org/synapse/issues/4128" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4128/hovercard" aria-describedby="hovercard-aria-description">#4128</a>)</li>
  <li>Clean up event accesses and tests (<a href="https://github.com/matrix-org/synapse/issues/4137" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4137/hovercard" aria-describedby="hovercard-aria-description">#4137</a>)</li>
  <li>The default logging config will now set an explicit log file encoding of UTF-8. (<a href="https://github.com/matrix-org/synapse/issues/4138" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4138/hovercard" aria-describedby="hovercard-aria-description">#4138</a>)</li>
  <li>Add helpers functions for getting prev and auth events of an event (<a href="https://github.com/matrix-org/synapse/issues/4139" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4139/hovercard" aria-describedby="hovercard-aria-description">#4139</a>)</li>
  <li>Add some tests for the HTTP pusher. (<a href="https://github.com/matrix-org/synapse/issues/4149" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4149/hovercard" aria-describedby="hovercard-aria-description">#4149</a>)</li>
  <li>add purge_history.sh and purge_remote_media.sh scripts to contrib/ (<a href="https://github.com/matrix-org/synapse/issues/4155" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4155/hovercard" aria-describedby="hovercard-aria-description">#4155</a>)</li>
  <li>HTTP tests have been refactored to contain less boilerplate. (<a href="https://github.com/matrix-org/synapse/issues/4156" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4156/hovercard" aria-describedby="hovercard-aria-description">#4156</a>)</li>
  <li>Drop incoming events from federation for unknown rooms (<a href="https://github.com/matrix-org/synapse/issues/4165" data-hovercard-type="issue" data-hovercard-url="/matrix-org/synapse/issues/4165/hovercard" aria-describedby="hovercard-aria-description">#4165</a>)</li>
</ul>
