+++
title = "Synapse 0.33.6 released!"
path = "/blog/2018/10/04/synapse-0-33-6-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Right folks, time for Synapse 0.33.6.

These past few weeks we've been focusing on fixing a whole host of federation bugs to improve reliability and latency. Additionally we've squashed some py3 bugs, improved lazy loading and been working hard in the background to improve our CI infrastructure. Finally, we cleaned up the Docker file, the image is now half the size of 0.33.5.1's standing at 58 MB.

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.6">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>.

### Synapse 0.33.6

#### Features

<ul>
  <li>Adding the ability to change MAX_UPLOAD_SIZE for the docker container variables. (<a href="https://github.com/matrix-org/synapse/issues/3883">#3883</a>)</li>
  <li>Report "python_version" in the phone home stats (<a href="https://github.com/matrix-org/synapse/issues/3894">#3894</a>)</li>
  <li>Always LL ourselves if we're in a room (<a href="https://github.com/matrix-org/synapse/issues/3916">#3916</a>)</li>
  <li>Include eventid in log lines when processing incoming federation transactions (<a href="https://github.com/matrix-org/synapse/issues/3959">#3959</a>)</li>
  <li>Remove spurious check which made 'localhost' servers not work (<a href="https://github.com/matrix-org/synapse/issues/3964">#3964</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix problem when playing media from Chrome using direct URL (thanks <a class="user-mention" href="https://github.com/remjey" data-hovercard-type="user" data-hovercard-url="/hovercards?user_id=13684203" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" aria-describedby="hovercard-aria-description">@remjey</a>!) (<a href="https://github.com/matrix-org/synapse/issues/3578">#3578</a>)</li>
  <li>support registering regular users non-interactively with register_new_matrix_user script (<a href="https://github.com/matrix-org/synapse/issues/3836">#3836</a>)</li>
  <li>Fix broken invite email links for self hosted riots (<a href="https://github.com/matrix-org/synapse/issues/3868">#3868</a>)</li>
  <li>Don't ratelimit autojoins (<a href="https://github.com/matrix-org/synapse/issues/3879">#3879</a>)</li>
  <li>Fix 500 error when deleting unknown room alias (<a href="https://github.com/matrix-org/synapse/issues/3889">#3889</a>)</li>
  <li>Fix some b'abcd' noise in logs and metrics (<a href="https://github.com/matrix-org/synapse/issues/3892">#3892</a>, <a href="https://github.com/matrix-org/synapse/issues/3895">#3895</a>)</li>
  <li>When we join a room, always try the server we used for the alias lookup first, to avoid unresponsive and out-of-date servers. (<a href="https://github.com/matrix-org/synapse/issues/3899">#3899</a>)</li>
  <li>Fix incorrect server-name indication for outgoing federation requests (<a href="https://github.com/matrix-org/synapse/issues/3907">#3907</a>)</li>
  <li>Fix adding client IPs to the database failing on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3908">#3908</a>)</li>
  <li>Fix bug where things occasionally were not being timed out correctly. (<a href="https://github.com/matrix-org/synapse/issues/3910">#3910</a>)</li>
  <li>Fix bug where outbound federation would stop talking to some servers when using workers (<a href="https://github.com/matrix-org/synapse/issues/3914">#3914</a>)</li>
  <li>Fix some instances of ExpiringCache not expiring cache items (<a href="https://github.com/matrix-org/synapse/issues/3932">#3932</a>, <a href="https://github.com/matrix-org/synapse/issues/3980">#3980</a>)</li>
  <li>Fix out-of-bounds error when LLing yourself (<a href="https://github.com/matrix-org/synapse/issues/3936">#3936</a>)</li>
  <li>Sending server notices regarding user consent now works on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3938">#3938</a>)</li>
  <li>Fix exceptions from metrics handler (<a href="https://github.com/matrix-org/synapse/issues/3956">#3956</a>)</li>
  <li>Fix error message for events with m.room.create missing from auth_events (<a href="https://github.com/matrix-org/synapse/issues/3960">#3960</a>)</li>
  <li>Fix errors due to concurrent monthly_active_user upserts (<a href="https://github.com/matrix-org/synapse/issues/3961">#3961</a>)</li>
  <li>Fix exceptions when processing incoming events over federation (<a href="https://github.com/matrix-org/synapse/issues/3968">#3968</a>)</li>
  <li>Replaced all occurrences of e.message with str(e). Contributed by Schnuffle (<a href="https://github.com/matrix-org/synapse/issues/3970">#3970</a>)</li>
  <li>Fix lazy loaded sync in the presence of rejected state events (<a href="https://github.com/matrix-org/synapse/issues/3986">#3986</a>)</li>
  <li>Fix error when logging incomplete HTTP requests (<a href="https://github.com/matrix-org/synapse/issues/3990">#3990</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Unit tests can now be run under PostgreSQL in Docker using <code>test_postgresql.sh</code>. (<a href="https://github.com/matrix-org/synapse/issues/3699">#3699</a>)</li>
  <li>Speed up calculation of typing updates for replication (<a href="https://github.com/matrix-org/synapse/issues/3794">#3794</a>)</li>
  <li>Remove documentation regarding installation on Cygwin, the use of WSL is recommended instead. (<a href="https://github.com/matrix-org/synapse/issues/3873">#3873</a>)</li>
  <li>Fix typo in README, synaspse -&gt; synapse (<a href="https://github.com/matrix-org/synapse/issues/3897">#3897</a>)</li>
  <li>Increase the timeout when filling missing events in federation requests (<a href="https://github.com/matrix-org/synapse/issues/3903">#3903</a>)</li>
  <li>Improve the logging when handling a federation transaction (<a href="https://github.com/matrix-org/synapse/issues/3904">#3904</a>, <a href="https://github.com/matrix-org/synapse/issues/3966">#3966</a>)</li>
  <li>Improve logging of outbound federation requests (<a href="https://github.com/matrix-org/synapse/issues/3906">#3906</a>, <a href="https://github.com/matrix-org/synapse/issues/3909">#3909</a>)</li>
  <li>Fix the docker image building on python 3 (<a href="https://github.com/matrix-org/synapse/issues/3911">#3911</a>)</li>
  <li>Add a regression test for logging failed HTTP requests on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/3912">#3912</a>)</li>
  <li>Comments and interface cleanup for on_receive_pdu (<a href="https://github.com/matrix-org/synapse/issues/3924">#3924</a>)</li>
  <li>Fix spurious exceptions when remote http client closes connection (<a href="https://github.com/matrix-org/synapse/issues/3925">#3925</a>)</li>
  <li>Log exceptions thrown by background tasks (<a href="https://github.com/matrix-org/synapse/issues/3927">#3927</a>)</li>
  <li>Add a cache to get_destination_retry_timings (<a href="https://github.com/matrix-org/synapse/issues/3933">#3933</a>, <a href="https://github.com/matrix-org/synapse/issues/3991">#3991</a>)</li>
  <li>Automate pushes to docker hub (<a href="https://github.com/matrix-org/synapse/issues/3946">#3946</a>)</li>
  <li>Require attrs 16.0.0 or later (<a href="https://github.com/matrix-org/synapse/issues/3947">#3947</a>)</li>
  <li>Fix incompatibility with python3 on alpine (<a href="https://github.com/matrix-org/synapse/issues/3948">#3948</a>)</li>
  <li>Run the test suite on the oldest supported versions of our dependencies in CI. (<a href="https://github.com/matrix-org/synapse/issues/3952">#3952</a>)</li>
  <li>CircleCI now only runs merged jobs on PRs, and commit jobs on develop, master, and release branches. (<a href="https://github.com/matrix-org/synapse/issues/3957">#3957</a>)</li>
  <li>Fix docstrings and add tests for state store methods (<a href="https://github.com/matrix-org/synapse/issues/3958">#3958</a>)</li>
  <li>fix docstring for FederationClient.get_state_for_room (<a href="https://github.com/matrix-org/synapse/issues/3963">#3963</a>)</li>
  <li>Run notify_app_services as a bg process (<a href="https://github.com/matrix-org/synapse/issues/3965">#3965</a>)</li>
  <li>Clarifications in FederationHandler (<a href="https://github.com/matrix-org/synapse/issues/3967">#3967</a>)</li>
  <li>Further reduce the docker image size (<a href="https://github.com/matrix-org/synapse/issues/3972">#3972</a>)</li>
  <li>Build py3 docker images for docker hub too (<a href="https://github.com/matrix-org/synapse/issues/3976">#3976</a>)</li>
  <li>Updated the installation instructions to point to the matrix-synapse package on PyPI. (<a href="https://github.com/matrix-org/synapse/issues/3985">#3985</a>)</li>
  <li>Disable USE_FROZEN_DICTS for unittests by default. (<a href="https://github.com/matrix-org/synapse/issues/3987">#3987</a>)</li>
  <li>Remove unused Jenkins and development related files from the repo. (<a href="https://github.com/matrix-org/synapse/issues/3988">#3988</a>)</li>
  <li>Improve stacktraces in certain exceptions in the logs (<a href="https://github.com/matrix-org/synapse/issues/3989">#3989</a>)</li>
  <li>Pin to prometheus_client&lt;0.4 to avoid renaming all of our metrics (<a href="https://github.com/matrix-org/synapse/issues/4002">#4002</a>)</li>
</ul>
