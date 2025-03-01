+++
title = "Synapse 0.99.1.1 Released!"
path = "/blog/2019/02/14/synapse-0-99-1-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Hey, everyone, today is the day we release Synapse 0.99.1.1

This release contains improved ACME support to make it even easier to get going with TLS certs on your federation end points, plus some tweaks to make the room version upgrade path easier.

Just as a reminder that the 0.99.x series is precursor for our 1.0 release (which will land in early March, exact date to be confirmed) - it is really important that all server admins are aware that self signed certificates on the Server to Server API will no longer be accepted by &gt;= Synapse 1.0. If you have not already done so, now is the time to configure your certificate. For more info see our <a href="https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md">FAQ</a> and if you get stuck come and join us in <a href="https://matrix.to/#/#synapse:matrix.org">#Synapse.</a>

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.99.1.1">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>. Also, check out our new <a href="/docs/guides/installing-synapse">Synapse installation guide page.</a>

## Synapse 0.99.1.1 Changelog

### Bugfixes

<ul>
  <li>Fix "TypeError: '&gt;' not supported" when starting without an existing certificate.
Fix a bug where an existing certificate would be reprovisoned every day. (<a href="https://github.com/matrix-org/synapse/issues/4648" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4648/hovercard" aria-describedby="hovercard-aria-description">#4648</a>)</li>
</ul>

## Synapse 0.99.1 Changelog

### Features

<ul>
  <li>Include m.room.encryption on invites by default (<a href="https://github.com/matrix-org/synapse/issues/3902" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/3902/hovercard" aria-describedby="hovercard-aria-description">#3902</a>)</li>
  <li>Federation OpenID listener resource can now be activated even if federation is disabled (<a href="https://github.com/matrix-org/synapse/issues/4420" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4420/hovercard" aria-describedby="hovercard-aria-description">#4420</a>)</li>
  <li>Synapse's ACME support will now correctly reprovision a certificate that approaches its expiry while Synapse is running. (<a href="https://github.com/matrix-org/synapse/issues/4522" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4522/hovercard" aria-describedby="hovercard-aria-description">#4522</a>)</li>
  <li>Add ability to update backup versions (<a href="https://github.com/matrix-org/synapse/issues/4580" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4580/hovercard" aria-describedby="hovercard-aria-description">#4580</a>)</li>
  <li>Allow the "unavailable" presence status for /sync.
This change makes Synapse compliant with r0.4.0 of the Client-Server specification. (<a href="https://github.com/matrix-org/synapse/issues/4592" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4592/hovercard" aria-describedby="hovercard-aria-description">#4592</a>)</li>
  <li>There is no longer any need to specify <code>no_tls</code>: it is inferred from the absence of TLS listeners (<a href="https://github.com/matrix-org/synapse/issues/4613" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4613/hovercard" aria-describedby="hovercard-aria-description">#4613</a>, <a href="https://github.com/matrix-org/synapse/issues/4615" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4615/hovercard" aria-describedby="hovercard-aria-description">#4615</a>, <a href="https://github.com/matrix-org/synapse/issues/4617" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4617/hovercard" aria-describedby="hovercard-aria-description">#4617</a>, <a href="https://github.com/matrix-org/synapse/issues/4636" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4636/hovercard" aria-describedby="hovercard-aria-description">#4636</a>)</li>
  <li>The default configuration no longer requires TLS certificates. (<a href="https://github.com/matrix-org/synapse/issues/4614" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4614/hovercard" aria-describedby="hovercard-aria-description">#4614</a>)</li>
</ul>

### Bugfixes

<ul>
  <li>Copy over room federation ability on room upgrade. (<a href="https://github.com/matrix-org/synapse/issues/4530" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4530/hovercard" aria-describedby="hovercard-aria-description">#4530</a>)</li>
  <li>Fix noisy "twisted.internet.task.TaskStopped" errors in logs (<a href="https://github.com/matrix-org/synapse/issues/4546" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4546/hovercard" aria-describedby="hovercard-aria-description">#4546</a>)</li>
  <li>Synapse is now tolerant of the <code>tls_fingerprints</code> option being None or not specified. (<a href="https://github.com/matrix-org/synapse/issues/4589" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4589/hovercard" aria-describedby="hovercard-aria-description">#4589</a>)</li>
  <li>Fix 'no unique or exclusion constraint' error (<a href="https://github.com/matrix-org/synapse/issues/4591" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4591/hovercard" aria-describedby="hovercard-aria-description">#4591</a>)</li>
  <li>Transfer Server ACLs on room upgrade. (<a href="https://github.com/matrix-org/synapse/issues/4608" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4608/hovercard" aria-describedby="hovercard-aria-description">#4608</a>)</li>
  <li>Fix failure to start when not TLS certificate was given even if TLS was disabled. (<a href="https://github.com/matrix-org/synapse/issues/4618" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4618/hovercard" aria-describedby="hovercard-aria-description">#4618</a>)</li>
  <li>Fix self-signed cert notice from generate-config. (<a href="https://github.com/matrix-org/synapse/issues/4625" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4625/hovercard" aria-describedby="hovercard-aria-description">#4625</a>)</li>
  <li>Fix performance of <code>user_ips</code> table deduplication background update (<a href="https://github.com/matrix-org/synapse/issues/4626" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4626/hovercard" aria-describedby="hovercard-aria-description">#4626</a>, <a href="https://github.com/matrix-org/synapse/issues/4627" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4627/hovercard" aria-describedby="hovercard-aria-description">#4627</a>)</li>
</ul>

### Internal Changes

<ul>
  <li>Change the user directory state query to use a filtered call to the db instead of a generic one. (<a href="https://github.com/matrix-org/synapse/issues/4462" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4462/hovercard" aria-describedby="hovercard-aria-description">#4462</a>)</li>
  <li>Reject federation transactions if they include more than 50 PDUs or 100 EDUs. (<a href="https://github.com/matrix-org/synapse/issues/4513" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4513/hovercard" aria-describedby="hovercard-aria-description">#4513</a>)</li>
  <li>Reduce duplication of <code>synapse.app</code> code. (<a href="https://github.com/matrix-org/synapse/issues/4567" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4567/hovercard" aria-describedby="hovercard-aria-description">#4567</a>)</li>
  <li>Fix docker upload job to push -py2 images. (<a href="https://github.com/matrix-org/synapse/issues/4576" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4576/hovercard" aria-describedby="hovercard-aria-description">#4576</a>)</li>
  <li>Add port configuration information to ACME instructions. (<a href="https://github.com/matrix-org/synapse/issues/4578" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4578/hovercard" aria-describedby="hovercard-aria-description">#4578</a>)</li>
  <li>Update MSC1711 FAQ to clarify .well-known usage (<a href="https://github.com/matrix-org/synapse/issues/4584" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4584/hovercard" aria-describedby="hovercard-aria-description">#4584</a>)</li>
  <li>Clean up default listener configuration (<a href="https://github.com/matrix-org/synapse/issues/4586" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4586/hovercard" aria-describedby="hovercard-aria-description">#4586</a>)</li>
  <li>Clarifications for reverse proxy docs (<a href="https://github.com/matrix-org/synapse/issues/4607" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4607/hovercard" aria-describedby="hovercard-aria-description">#4607</a>)</li>
  <li>Move ClientTLSOptionsFactory init out of <code>refresh_certificates</code> (<a href="https://github.com/matrix-org/synapse/issues/4611" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4611/hovercard" aria-describedby="hovercard-aria-description">#4611</a>)</li>
  <li>Fail cleanly if listener config lacks a 'port' (<a href="https://github.com/matrix-org/synapse/issues/4616" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4616/hovercard" aria-describedby="hovercard-aria-description">#4616</a>)</li>
  <li>Remove redundant entries from docker config (<a href="https://github.com/matrix-org/synapse/issues/4619" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4619/hovercard" aria-describedby="hovercard-aria-description">#4619</a>)</li>
  <li>README updates (<a href="https://github.com/matrix-org/synapse/issues/4621" data-hovercard-type="pull_request" data-hovercard-url="/matrix-org/synapse/pull/4621/hovercard" aria-describedby="hovercard-aria-description">#4621</a>)</li>
</ul>
