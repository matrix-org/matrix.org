+++
title = "Synapse v0.33.8 is here!"
path = "/blog/2018/11/01/synapse-v0-33-8-is-here"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Wowzers - our 8th dot release for v0.33!

This time we have a bunch of bug fixes and db performance improvements as well as better support for auto-join rooms and the ability for admins to limit who can create rooms aliases.

v0.33.8 also contains more python 3 fixes: we are running most of matrix.org on python 3 as of right now and seeing some pretty impressive performance improvements. Look out for Hawkowl's write up coming soon.

For those interested in what we are working on right now, take a look at our <a href="https://github.com/orgs/matrix-org/projects/2">task board</a>.

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.8">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>.

### Synapse 0.33.8 changelog

#### Features

<ul>
  <li>Servers with auto-join rooms will now automatically create those rooms when the first user registers (<a href="https://github.com/matrix-org/synapse/issues/3975" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3975/hovercard" aria-describedby="hovercard-aria-description">#3975</a>)</li>
  <li>Add config option to control alias creation (<a href="https://github.com/matrix-org/synapse/issues/4051" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4051/hovercard" aria-describedby="hovercard-aria-description">#4051</a>)</li>
  <li>The register_new_matrix_user script is now ported to Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4085" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4085/hovercard" aria-describedby="hovercard-aria-description">#4085</a>)</li>
  <li>Configure Docker image to listen on both ipv4 and ipv6. (<a href="https://github.com/matrix-org/synapse/issues/4089" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4089/hovercard" aria-describedby="hovercard-aria-description">#4089</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix HTTP error response codes for federated group requests. (<a href="https://github.com/matrix-org/synapse/issues/3969" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3969/hovercard" aria-describedby="hovercard-aria-description">#3969</a>)</li>
  <li>Fix issue where Python 3 users couldn't paginate /publicRooms (<a href="https://github.com/matrix-org/synapse/issues/4046" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4046/hovercard" aria-describedby="hovercard-aria-description">#4046</a>)</li>
  <li>Fix URL previewing to work in Python 3.7 (<a href="https://github.com/matrix-org/synapse/issues/4050" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4050/hovercard" aria-describedby="hovercard-aria-description">#4050</a>)</li>
  <li>synctl will use the right python executable to run worker processes (<a href="https://github.com/matrix-org/synapse/issues/4057" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4057/hovercard" aria-describedby="hovercard-aria-description">#4057</a>)</li>
  <li>Manhole now works again on Python 3, instead of failing with a "couldn't match all kex parts" when connecting. (<a href="https://github.com/matrix-org/synapse/issues/4060" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4060/hovercard" aria-describedby="hovercard-aria-description">#4060</a>, <a href="https://github.com/matrix-org/synapse/issues/4067" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4067/hovercard" aria-describedby="hovercard-aria-description">#4067</a>)</li>
  <li>Fix some metrics being racy and causing exceptions when polled by Prometheus. (<a href="https://github.com/matrix-org/synapse/issues/4061" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4061/hovercard" aria-describedby="hovercard-aria-description">#4061</a>)</li>
  <li>Fix bug which prevented email notifications from being sent unless an absolute path was given for <code>email_templates</code>. (<a href="https://github.com/matrix-org/synapse/issues/4068" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4068/hovercard" aria-describedby="hovercard-aria-description">#4068</a>)</li>
  <li>Correctly account for cpu usage by background threads (<a href="https://github.com/matrix-org/synapse/issues/4074" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4074/hovercard" aria-describedby="hovercard-aria-description">#4074</a>)</li>
  <li>Fix race condition where config defined reserved users were not being added to
the monthly active user list prior to the homeserver reactor firing up (<a href="https://github.com/matrix-org/synapse/issues/4081" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4081/hovercard" aria-describedby="hovercard-aria-description">#4081</a>)</li>
  <li>Fix bug which prevented backslashes being used in event field filters (<a href="https://github.com/matrix-org/synapse/issues/4083" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4083/hovercard" aria-describedby="hovercard-aria-description">#4083</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Add information about the <a href="https://github.com/spantaleev/matrix-docker-ansible-deploy">matrix-docker-ansible-deploy</a> playbook (<a href="https://github.com/matrix-org/synapse/issues/3698" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3698/hovercard" aria-describedby="hovercard-aria-description">#3698</a>)</li>
  <li>Add initial implementation of new state resolution algorithm (<a href="https://github.com/matrix-org/synapse/issues/3786" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3786/hovercard" aria-describedby="hovercard-aria-description">#3786</a>)</li>
  <li>Reduce database load when fetching state groups (<a href="https://github.com/matrix-org/synapse/issues/4011" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4011/hovercard" aria-describedby="hovercard-aria-description">#4011</a>)</li>
  <li>Various cleanups in the federation client code (<a href="https://github.com/matrix-org/synapse/issues/4031" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4031/hovercard" aria-describedby="hovercard-aria-description">#4031</a>)</li>
  <li>Run the CircleCI builds in docker containers (<a href="https://github.com/matrix-org/synapse/issues/4041" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4041/hovercard" aria-describedby="hovercard-aria-description">#4041</a>)</li>
  <li>Only colourise synctl output when attached to tty (<a href="https://github.com/matrix-org/synapse/issues/4049" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4049/hovercard" aria-describedby="hovercard-aria-description">#4049</a>)</li>
  <li>Refactor room alias creation code (<a href="https://github.com/matrix-org/synapse/issues/4063" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4063/hovercard" aria-describedby="hovercard-aria-description">#4063</a>)</li>
  <li>Make the Python scripts in the top-level scripts folders meet pep8 and pass flake8. (<a href="https://github.com/matrix-org/synapse/issues/4068" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4068/hovercard" aria-describedby="hovercard-aria-description">#4068</a>)</li>
  <li>The README now contains example for the Caddy web server. Contributed by steamp0rt. (<a href="https://github.com/matrix-org/synapse/issues/4072" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4072/hovercard" aria-describedby="hovercard-aria-description">#4072</a>)</li>
  <li>Add psutil as an explicit dependency (<a href="https://github.com/matrix-org/synapse/issues/4073" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4073/hovercard" aria-describedby="hovercard-aria-description">#4073</a>)</li>
  <li>Clean up threading and logcontexts in pushers (<a href="https://github.com/matrix-org/synapse/issues/4075" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4075/hovercard" aria-describedby="hovercard-aria-description">#4075</a>)</li>
  <li>Correctly manage logcontexts during startup to fix some "Unexpected logging context" warnings (<a href="https://github.com/matrix-org/synapse/issues/4076" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4076/hovercard" aria-describedby="hovercard-aria-description">#4076</a>)</li>
  <li>Give some more things logcontexts (<a href="https://github.com/matrix-org/synapse/issues/4077" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4077/hovercard" aria-describedby="hovercard-aria-description">#4077</a>)</li>
  <li>Clean up some bits of code which were flagged by the linter (<a href="https://github.com/matrix-org/synapse/issues/4082" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4082/hovercard" aria-describedby="hovercard-aria-description">#4082</a>)</li>
</ul>
