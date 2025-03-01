+++
title = "Synapse 0.99.2 released!"
path = "/blog/2019/03/04/synapse-0-99-2-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Well now, what have we here? Synapse 0.99.2 is the latest in the 0.99.x series as we step ever closer to 1.0.

0.99.2 is an incremental release including a bunch of performance improvements, enhancements to room upgrades and generally a plethora of bug fixes.

The most important thing that admins should know is that prior to 1.0 landing later this month, <strong>it is essential that the federation API has a valid TLS certificate - self signed certificates will no longer be accepted.</strong> For more details see our <a href="https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md">handy guide</a>. Failure to do this will result in being unable to federate with other 1.0 servers.

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.99.2">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>. Also, check out our new <a href="/docs/guides/installing-synapse">Synapse installation guide page.</a>

## Synapse 0.99.2 changelog

### Features

<ul>
  <li>Added an HAProxy example in the reverse proxy documentation. Contributed by Benoît S. (“Benpro”). (<a href="https://github.com/matrix-org/synapse/issues/4541" data-hovercard-type="issue" data-hovercard-url="/matrix-org/synapse/issues/4541/hovercard">#4541</a>)</li>
  <li>Add basic optional sentry integration. (<a href="https://github.com/matrix-org/synapse/issues/4632" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4632/hovercard">#4632</a>, <a href="https://github.com/matrix-org/synapse/issues/4694" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4694/hovercard">#4694</a>)</li>
  <li>Transfer bans on room upgrade. (<a href="https://github.com/matrix-org/synapse/issues/4642" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4642/hovercard">#4642</a>)</li>
  <li>Add configurable room list publishing rules. (<a href="https://github.com/matrix-org/synapse/issues/4647" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4647/hovercard">#4647</a>)</li>
  <li>Support .well-known delegation when issuing certificates through ACME. (<a href="https://github.com/matrix-org/synapse/issues/4652" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4652/hovercard">#4652</a>)</li>
  <li>Allow registration and login to be handled by a worker instance. (<a href="https://github.com/matrix-org/synapse/issues/4666" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4666/hovercard">#4666</a>, <a href="https://github.com/matrix-org/synapse/issues/4670" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4670/hovercard">#4670</a>, <a href="https://github.com/matrix-org/synapse/issues/4682" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4682/hovercard">#4682</a>)</li>
  <li>Reduce the overhead of creating outbound federation connections over TLS by caching the TLS client options. (<a href="https://github.com/matrix-org/synapse/issues/4674" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4674/hovercard">#4674</a>)</li>
  <li>Add prometheus metrics for number of outgoing EDUs, by type. (<a href="https://github.com/matrix-org/synapse/issues/4695" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4695/hovercard">#4695</a>)</li>
  <li>Return correct error code when inviting a remote user to a room whose homeserver does not support the room version. (<a href="https://github.com/matrix-org/synapse/issues/4721" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4721/hovercard">#4721</a>)</li>
  <li>Prevent showing rooms to other servers that were set to not federate. (<a href="https://github.com/matrix-org/synapse/issues/4746" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4746/hovercard">#4746</a>)</li>
</ul>

### Bugfixes

<ul>
  <li>Fix possible exception when paginating. (<a href="https://github.com/matrix-org/synapse/issues/4263" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4263/hovercard">#4263</a>)</li>
  <li>The dependency checker now correctly reports a version mismatch for optional
dependencies, instead of reporting the dependency missing. (<a href="https://github.com/matrix-org/synapse/issues/4450" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4450/hovercard">#4450</a>)</li>
  <li>Set CORS headers on .well-known requests. (<a href="https://github.com/matrix-org/synapse/issues/4651" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4651/hovercard">#4651</a>)</li>
  <li>Fix kicking guest users on guest access revocation in worker mode. (<a href="https://github.com/matrix-org/synapse/issues/4667" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4667/hovercard">#4667</a>)</li>
  <li>Fix an issue in the database migration script where the
<code>e2e_room_keys.is_verified</code> column wasn't considered as
a boolean. (<a href="https://github.com/matrix-org/synapse/issues/4680" data-hovercard-type="issue" data-hovercard-url="/matrix-org/synapse/issues/4680/hovercard">#4680</a>)</li>
  <li>Fix TaskStopped exceptions in logs when outbound requests time out. (<a href="https://github.com/matrix-org/synapse/issues/4690" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4690/hovercard">#4690</a>)</li>
  <li>Fix ACME config for python 2. (<a href="https://github.com/matrix-org/synapse/issues/4717" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4717/hovercard">#4717</a>)</li>
  <li>Fix paginating over federation persisting incorrect state. (<a href="https://github.com/matrix-org/synapse/issues/4718" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4718/hovercard">#4718</a>)</li>
</ul>

### Internal Changes

<ul>
  <li>Run <code>black</code> to reformat user directory code. (<a href="https://github.com/matrix-org/synapse/issues/4635" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4635/hovercard">#4635</a>)</li>
  <li>Reduce number of exceptions we log. (<a href="https://github.com/matrix-org/synapse/issues/4643" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4643/hovercard">#4643</a>, <a href="https://github.com/matrix-org/synapse/issues/4668" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4668/hovercard">#4668</a>)</li>
  <li>Introduce upsert batching functionality in the database layer. (<a href="https://github.com/matrix-org/synapse/issues/4644" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4644/hovercard">#4644</a>)</li>
  <li>Fix various spelling mistakes. (<a href="https://github.com/matrix-org/synapse/issues/4657" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4657/hovercard">#4657</a>)</li>
  <li>Cleanup request exception logging. (<a href="https://github.com/matrix-org/synapse/issues/4669" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4669/hovercard">#4669</a>, <a href="https://github.com/matrix-org/synapse/issues/4737" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4737/hovercard">#4737</a>, <a href="https://github.com/matrix-org/synapse/issues/4738" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4738/hovercard">#4738</a>)</li>
  <li>Improve replication performance by reducing cache invalidation traffic. (<a href="https://github.com/matrix-org/synapse/issues/4671" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4671/hovercard">#4671</a>, <a href="https://github.com/matrix-org/synapse/issues/4715" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4715/hovercard">#4715</a>, <a href="https://github.com/matrix-org/synapse/issues/4748" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4748/hovercard">#4748</a>)</li>
  <li>Test against Postgres 9.5 as well as 9.4. (<a href="https://github.com/matrix-org/synapse/issues/4676" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4676/hovercard">#4676</a>)</li>
  <li>Run unit tests against python 3.7. (<a href="https://github.com/matrix-org/synapse/issues/4677" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4677/hovercard">#4677</a>)</li>
  <li>Attempt to clarify installation instructions/config. (<a href="https://github.com/matrix-org/synapse/issues/4681" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4681/hovercard">#4681</a>)</li>
  <li>Clean up gitignores. (<a href="https://github.com/matrix-org/synapse/issues/4688" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4688/hovercard">#4688</a>)</li>
  <li>Minor tweaks to acme docs. (<a href="https://github.com/matrix-org/synapse/issues/4689" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4689/hovercard">#4689</a>)</li>
  <li>Improve the logging in the pusher process. (<a href="https://github.com/matrix-org/synapse/issues/4691" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4691/hovercard">#4691</a>)</li>
  <li>Better checks on newsfragments. (<a href="https://github.com/matrix-org/synapse/issues/4698" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4698/hovercard">#4698</a>, <a href="https://github.com/matrix-org/synapse/issues/4750" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4750/hovercard">#4750</a>)</li>
  <li>Avoid some redundant work when processing read receipts. (<a href="https://github.com/matrix-org/synapse/issues/4706" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4706/hovercard">#4706</a>)</li>
  <li>Run <code>push_receipts_to_remotes</code> as background job. (<a href="https://github.com/matrix-org/synapse/issues/4707" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4707/hovercard">#4707</a>)</li>
  <li>Add prometheus metrics for number of badge update pushes. (<a href="https://github.com/matrix-org/synapse/issues/4709" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4709/hovercard">#4709</a>)</li>
  <li>Reduce pusher logging on startup (<a href="https://github.com/matrix-org/synapse/issues/4716" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4716/hovercard">#4716</a>)</li>
  <li>Don't log exceptions when failing to fetch remote server keys. (<a href="https://github.com/matrix-org/synapse/issues/4722" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4722/hovercard">#4722</a>)</li>
  <li>Correctly proxy exception in frontend_proxy worker. (<a href="https://github.com/matrix-org/synapse/issues/4723" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4723/hovercard">#4723</a>)</li>
  <li>Add database version to phonehome stats. (<a href="https://github.com/matrix-org/synapse/issues/4753" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4753/hovercard">#4753</a>)</li>
</ul>
