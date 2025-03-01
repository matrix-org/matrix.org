+++
title = "Synapse 0.33.7 released!"
path = "/blog/2018/10/18/synapse-0-33-7-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Hey ho, let's go. Synapse 0.33.7 has arrived.

Regular readers will know how close we are to a full python 3 release. We are not quite there yet but 0.33.7 has support for Synapse under worker mode and we've running it on matrix.org this week. We need more time to conclusively gauge performance improvements but the Synchrotron workers are running with 33% less RAM. Thanks to everyone who has been running their servers under py3, if you do spot anything unusual just let us know. Once we've been running it a bit longer on matrix.org, we'll cut a 0.34.0 release with a recommendation that one and all upgrade to python 3.

Aside from that this release contains support for server side end to end key backups, paving the way for client side support in Riot and Rich continues his long running federation bug squash-a-thon which should help with a whole host of federation snafus.

Up next on the horizon is returning in earnest to getting the server to server r0 spec out starting with shipping our brand new super shiny state resolution algorithm.

As a final point, for those of you that deploy from git checkout or a snapshot url and have email notifications enabled please take a look warning in the change log.

As a final final point #synapse:matrix.org is now an officially supported room, aimed at Synapse admins. If you've not done so already please do drop by and say Hi.

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.7">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>.

Onwards!

### Synapse 0.33.7 Change Log

<strong>Warning</strong>: This release removes the example email notification templates from <code>res/templates</code> (they are now internal to the python package). This should only affect you if you (a) deploy your Synapse instance from a git checkout or a github snapshot URL, and (b) have email notifications enabled.

If you have email notifications enabled, you should ensure that <code>email.template_dir</code> is either configured to point at a directory where you have installed customised templates, or leave it unset to use the default templates.

The configuration parser will try to detect the situation where <code>email.template_dir</code> is incorrectly set to <code>res/templates</code> and do the right thing, but will warn about this.

#### Features

<ul>
  <li>Ship the example email templates as part of the package (<a href="https://github.com/matrix-org/synapse/issues/4052" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4052/hovercard" aria-describedby="hovercard-aria-description">#4052</a>)</li>
  <li>Add support for end-to-end key backup (MSC1687) (<a href="https://github.com/matrix-org/synapse/issues/4019" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4019/hovercard" aria-describedby="hovercard-aria-description">#4019</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix bug which made get_missing_events return too few events (<a href="https://github.com/matrix-org/synapse/issues/4045" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4045/hovercard" aria-describedby="hovercard-aria-description">#4045</a>)</li>
  <li>Fix bug in event persistence logic which caused 'NoneType is not iterable' (<a href="https://github.com/matrix-org/synapse/issues/3995" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3995/hovercard" aria-describedby="hovercard-aria-description">#3995</a>)</li>
  <li>Fix exception in background metrics collection (<a href="https://github.com/matrix-org/synapse/issues/3996" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3996/hovercard" aria-describedby="hovercard-aria-description">#3996</a>)</li>
  <li>Fix exception handling in fetching remote profiles (<a href="https://github.com/matrix-org/synapse/issues/3997" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3997/hovercard" aria-describedby="hovercard-aria-description">#3997</a>)</li>
  <li>Fix handling of rejected threepid invites (<a href="https://github.com/matrix-org/synapse/issues/3999" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3999/hovercard" aria-describedby="hovercard-aria-description">#3999</a>)</li>
  <li>Workers now start on Python 3. (<a href="https://github.com/matrix-org/synapse/issues/4027" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4027/hovercard" aria-describedby="hovercard-aria-description">#4027</a>)</li>
  <li>Synapse now starts on Python 3.7. (<a href="https://github.com/matrix-org/synapse/issues/4033" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4033/hovercard" aria-describedby="hovercard-aria-description">#4033</a>)</li>
</ul>

### Internal Changes

<ul>
  <li>Log exceptions in looping calls (<a href="https://github.com/matrix-org/synapse/issues/4008" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4008/hovercard" aria-describedby="hovercard-aria-description">#4008</a>)</li>
  <li>Optimisation for serving federation requests (<a href="https://github.com/matrix-org/synapse/issues/4017" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4017/hovercard" aria-describedby="hovercard-aria-description">#4017</a>)</li>
  <li>Add metric to count number of non-empty sync responses (<a href="https://github.com/matrix-org/synapse/issues/4022" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4022/hovercard" aria-describedby="hovercard-aria-description">#4022</a>)</li>
</ul>
