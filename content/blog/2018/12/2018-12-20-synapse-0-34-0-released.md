+++
title = "Synapse 0.34.0 released!"
path = "/blog/2018/12/20/synapse-0-34-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Folks this is a big day for us at Matrix Towers, because today we release 0.34.0.

The big news for 0.34.0 is that we now <strong>recommend Python 3 for production use</strong> and have been running matrix.org under Python 3 for the past month.

Performance improvements have been marked, in some contexts we have seen 50% reductions in RAM and CPU usage. Here are some illustrative graphs to get you going but look out for a dedicated post delving into much more detail on the port. You can also see a Matrix Live interview with the project lead Amber (hawkowl) <a href="https://www.youtube.com/watch?v=Ad3oqEo5leM">here</a>.

<a href="/blog/wp-content/uploads/2018/12/image2.png"><img class="alignnone wp-image-3822 size-large" src="/blog/wp-content/uploads/2018/12/image2-1024x296.png" alt="" width="1024" height="296" /></a>

Matrix.org federation reader workers, the big drops signify roll over to python 3

<a href="/blog/wp-content/uploads/2018/12/image1.png"><img class="alignnone size-large wp-image-3824" src="/blog/wp-content/uploads/2018/12/image1-1024x237.png" alt="" width="1024" height="237" /></a>

Synapse master on matrix.org, again the drop in RAM signifies the roll over to python 3

Many thanks to Amber for leading the effort, Rich and Erik for providing support as well as Notafile and Krombel from the community for pushing this effort right from the early days of the project.

If that wasn't enough, 0.34.0 also all the usual bug fixes and perf improvements. In particular the media repository now no longer fails to decode UTF-8 filenames when downloading remote media and auto joining rooms now work on servers with consent requirements enabled.

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.34.0">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>. Also, check out our new <a href="/docs/guides/installing-synapse">Synapse installation guide page.</a>

In particular, if you want to run Synapse 0.34.0 on Python 3 take a look at the <a href="https://github.com/matrix-org/synapse/blob/release-v0.34.0/UPGRADE.rst#upgrading-to-v0340">upgrade notes</a>.

### Synapse 0.34.0 changelog

Synapse 0.34.0 is the first release to fully support Python 3. Synapse will now run on Python versions 3.5 or 3.6 (as well as 2.7). Support for Python 3.7 remains experimental.

We recommend upgrading to Python 3, but make sure to read the <a href="https://github.com/matrix-org/synapse/blob/release-v0.34.0/UPGRADE.rst#upgrading-to-v0340">upgrade notes</a> when doing so.

#### Features

<ul>
  <li>Add 'sandbox' to CSP for media reprository (<a href="https://github.com/matrix-org/synapse/issues/4284" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4284/hovercard" aria-describedby="hovercard-aria-description">#4284</a>)</li>
  <li>Make the new landing page prettier. (<a href="https://github.com/matrix-org/synapse/issues/4294" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4294/hovercard" aria-describedby="hovercard-aria-description">#4294</a>)</li>
  <li>Fix deleting E2E room keys when using old SQLite versions. (<a href="https://github.com/matrix-org/synapse/issues/4295" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4295/hovercard" aria-describedby="hovercard-aria-description">#4295</a>)</li>
  <li>Add a welcome page for the client API port. Credit to <a class="user-mention" href="https://github.com/krombel" data-hovercard-type="user" data-hovercard-url="/hovercards?user_id=11167142" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" aria-describedby="hovercard-aria-description">@krombel</a>! (<a href="https://github.com/matrix-org/synapse/issues/4289" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4289/hovercard" aria-describedby="hovercard-aria-description">#4289</a>)</li>
  <li>Remove Matrix console from the default distribution (<a href="https://github.com/matrix-org/synapse/issues/4290" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4290/hovercard" aria-describedby="hovercard-aria-description">#4290</a>)</li>
  <li>Add option to track MAU stats (but not limit people) (<a href="https://github.com/matrix-org/synapse/issues/3830" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3830/hovercard" aria-describedby="hovercard-aria-description">#3830</a>)</li>
  <li>Add an option to enable recording IPs for appservice users (<a href="https://github.com/matrix-org/synapse/issues/3831" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3831/hovercard" aria-describedby="hovercard-aria-description">#3831</a>)</li>
  <li>Rename login type <code>m.login.cas</code> to <code>m.login.sso</code> (<a href="https://github.com/matrix-org/synapse/issues/4220" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4220/hovercard" aria-describedby="hovercard-aria-description">#4220</a>)</li>
  <li>Add an option to disable search for homeservers that may not be interested in it. (<a href="https://github.com/matrix-org/synapse/issues/4230" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4230/hovercard" aria-describedby="hovercard-aria-description">#4230</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Pushrules can now again be made with non-ASCII rule IDs. (<a href="https://github.com/matrix-org/synapse/issues/4165" data-hovercard-type="issue" data-hovercard-url="/matrix-org/synapse/issues/4165/hovercard" aria-describedby="hovercard-aria-description">#4165</a>)</li>
  <li>The media repository now no longer fails to decode UTF-8 filenames when downloading remote media. (<a href="https://github.com/matrix-org/synapse/issues/4176" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4176/hovercard" aria-describedby="hovercard-aria-description">#4176</a>)</li>
  <li>URL previews now correctly decode non-UTF-8 text if the header contains a <code>&lt;meta http-equiv="Content-Type"</code> header. (<a href="https://github.com/matrix-org/synapse/issues/4183" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4183/hovercard" aria-describedby="hovercard-aria-description">#4183</a>)</li>
  <li>Fix an issue where public consent URLs had two slashes. (<a href="https://github.com/matrix-org/synapse/issues/4192" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4192/hovercard" aria-describedby="hovercard-aria-description">#4192</a>)</li>
  <li>Fallback auth now accepts the session parameter on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4197" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4197/hovercard" aria-describedby="hovercard-aria-description">#4197</a>)</li>
  <li>Remove riot.im from the list of trusted Identity Servers in the default configuration (<a href="https://github.com/matrix-org/synapse/issues/4207" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4207/hovercard" aria-describedby="hovercard-aria-description">#4207</a>)</li>
  <li>fix start up failure when mau_limit_reserved_threepids set and db is postgres (<a href="https://github.com/matrix-org/synapse/issues/4211" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4211/hovercard" aria-describedby="hovercard-aria-description">#4211</a>)</li>
  <li>Fix auto join failures for servers that require user consent (<a href="https://github.com/matrix-org/synapse/issues/4223" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4223/hovercard" aria-describedby="hovercard-aria-description">#4223</a>)</li>
  <li>Fix exception caused by non-ascii event IDs (<a href="https://github.com/matrix-org/synapse/issues/4241" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4241/hovercard" aria-describedby="hovercard-aria-description">#4241</a>)</li>
  <li>Pushers can now be unsubscribed from on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4250" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4250/hovercard" aria-describedby="hovercard-aria-description">#4250</a>)</li>
  <li>Fix UnicodeDecodeError when postgres is configured to give non-English errors (<a href="https://github.com/matrix-org/synapse/issues/4253" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4253/hovercard" aria-describedby="hovercard-aria-description">#4253</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Debian packages utilising a virtualenv with bundled dependencies can now be built. (<a href="https://github.com/matrix-org/synapse/issues/4212" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4212/hovercard" aria-describedby="hovercard-aria-description">#4212</a>)</li>
  <li>Disable pager when running git-show in CI (<a href="https://github.com/matrix-org/synapse/issues/4291" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4291/hovercard" aria-describedby="hovercard-aria-description">#4291</a>)</li>
  <li>A coveragerc file has been added. (<a href="https://github.com/matrix-org/synapse/issues/4180" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4180/hovercard" aria-describedby="hovercard-aria-description">#4180</a>)</li>
  <li>Add a GitHub pull request template and add multiple issue templates (<a href="https://github.com/matrix-org/synapse/issues/4182" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4182/hovercard" aria-describedby="hovercard-aria-description">#4182</a>)</li>
  <li>Update README to reflect the fact that <a href="https://github.com/matrix-org/synapse/issues/1491" data-hovercard-type="issue" data-hovercard-url="/matrix-org/synapse/issues/1491/hovercard" aria-describedby="hovercard-aria-description">#1491</a> is fixed (<a href="https://github.com/matrix-org/synapse/issues/4188" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4188/hovercard" aria-describedby="hovercard-aria-description">#4188</a>)</li>
  <li>Run the AS senders as background processes to fix warnings (<a href="https://github.com/matrix-org/synapse/issues/4189" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4189/hovercard" aria-describedby="hovercard-aria-description">#4189</a>)</li>
  <li>Add some diagnostics to the tests to detect logcontext problems (<a href="https://github.com/matrix-org/synapse/issues/4190" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4190/hovercard" aria-describedby="hovercard-aria-description">#4190</a>)</li>
  <li>Add missing <code>jpeg</code> package prerequisite for OpenBSD in README. (<a href="https://github.com/matrix-org/synapse/issues/4193" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4193/hovercard" aria-describedby="hovercard-aria-description">#4193</a>)</li>
  <li>Add a note saying you need to manually reclaim disk space after using the Purge History API (<a href="https://github.com/matrix-org/synapse/issues/4200" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4200/hovercard" aria-describedby="hovercard-aria-description">#4200</a>)</li>
  <li>More logcontext checking in unittests (<a href="https://github.com/matrix-org/synapse/issues/4205" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4205/hovercard" aria-describedby="hovercard-aria-description">#4205</a>)</li>
  <li>Ignore <code>__pycache__</code> directories in the database schema folder (<a href="https://github.com/matrix-org/synapse/issues/4214" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4214/hovercard" aria-describedby="hovercard-aria-description">#4214</a>)</li>
  <li>Add note to UPGRADE.rst about removing riot.im from list of trusted identity servers (<a href="https://github.com/matrix-org/synapse/issues/4224" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4224/hovercard" aria-describedby="hovercard-aria-description">#4224</a>)</li>
  <li>Added automated coverage reporting to CI. (<a href="https://github.com/matrix-org/synapse/issues/4225" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4225/hovercard" aria-describedby="hovercard-aria-description">#4225</a>)</li>
  <li>Garbage-collect after each unit test to fix logcontext leaks (<a href="https://github.com/matrix-org/synapse/issues/4227" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4227/hovercard" aria-describedby="hovercard-aria-description">#4227</a>)</li>
  <li>add more detail to logging regarding "More than one row matched" error (<a href="https://github.com/matrix-org/synapse/issues/4234" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4234/hovercard" aria-describedby="hovercard-aria-description">#4234</a>)</li>
  <li>Drop sent_transactions table (<a href="https://github.com/matrix-org/synapse/issues/4244" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4244/hovercard" aria-describedby="hovercard-aria-description">#4244</a>)</li>
  <li>Add a basic .editorconfig (<a href="https://github.com/matrix-org/synapse/issues/4257" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4257/hovercard" aria-describedby="hovercard-aria-description">#4257</a>)</li>
  <li>Update README.rst and UPGRADE.rst for Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4260" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4260/hovercard" aria-describedby="hovercard-aria-description">#4260</a>)</li>
  <li>Remove obsolete <code>verbose</code> and <code>log_file</code> settings from <code>homeserver.yaml</code> for Docker image. (<a href="https://github.com/matrix-org/synapse/issues/4261" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4261/hovercard" aria-describedby="hovercard-aria-description">#4261</a>)</li>
</ul>
