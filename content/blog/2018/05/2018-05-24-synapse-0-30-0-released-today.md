+++
title = "Synapse v0.30.0 released today!"
path = "/blog/2018/05/24/synapse-0-30-0-released-today"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

It's release o'clock - GDPR time!!!!

v0.30.0 sees the introduction of <a href="https://github.com/matrix-org/synapse/blob/master/docs/server_notices.md">Server Notices</a>, which provides a channel whereby server administrators can send messages to users on the server, as well as <a href="https://github.com/matrix-org/synapse/blob/master/docs/consent_tracking.md">Consent Management</a> for tracking whether users have agreed to the terms and conditions set by the administrator of a server - and blocking access to the server until they have.

In conjunction these features support GDPR compliance in the form of providing a client agnostic means to contact users and ask for consent/agreement to a Privacy Notice.

For more information about our approach to GDPR compliance take a look <a href="/blog/2018/05/08/gdpr-compliance-in-matrix/">here</a> (although be aware that our position has evolved a bit; see the upcoming new privacy policy for the Matrix.org homeserver for details).

Additionally there are a host of bug fixes and refactors as well as an enhancement to our Dockerfile.

Get it now from <a href="https://github.com/matrix-org/synapse/releases/tag/v0.30.0">https://github.com/matrix-org/synapse/releases/tag/v0.30.0</a>

## Changes in synapse v0.30.0 (2018-05-24)

'Server Notices' are a new feature introduced in Synapse 0.30. They provide a
channel whereby server administrators can send messages to users on the server.

They are used as part of communication of the server policies (see <a href="https://github.com/matrix-org/synapse/blob/master/docs/consent_tracking.md">Consent Tracking</a>),
however the intention is that they may also find a use for features such
as "Message of the day".

This feature is specific to Synapse, but uses standard Matrix communication mechanisms,
so should work with any Matrix client. For more details see <a href="https://github.com/matrix-org/synapse/blob/master/docs/server_notices.md">here</a>. <a href="https://github.com/matrix-org/synapse/blob/master/docs/server_notices.md"><code></code></a>

Further Server Notices/Consent Tracking Support:
<ul>
  <li>Allow overriding the server_notices user's avatar (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3273" data-error-text="Failed to load issue title" data-id="325788990" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3273">#3273</a>)</li>
  <li>Use the localpart in the consent uri (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3272" data-error-text="Failed to load issue title" data-id="325732749" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3272">#3272</a>)</li>
  <li>Support for putting %(consent_uri)s in messages (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3271" data-error-text="Failed to load issue title" data-id="325731335" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3271">#3271</a>)</li>
  <li>Block attempts to send server notices to remote users (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3270" data-error-text="Failed to load issue title" data-id="325706652" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3270">#3270</a>)</li>
  <li>Docs on consent bits (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3268" data-error-text="Failed to load issue title" data-id="325692950" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3268">#3268</a>)</li>
</ul>

### Changes in synapse v0.30.0-rc1 (2018-05-23)

GDPR Support:
<ul>
  <li>ConsentResource to gather policy consent from users (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3213" data-error-text="Failed to load issue title" data-id="322329950" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3213">#3213</a>)</li>
  <li>Move RoomCreationHandler out of synapse.handlers.Handlers (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3225" data-error-text="Failed to load issue title" data-id="323966891" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3225">#3225</a>)</li>
  <li>Infrastructure for a server notices room (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3232" data-error-text="Failed to load issue title" data-id="324110323" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3232">#3232</a>)</li>
  <li>Send users a server notice about consent (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3236" data-error-text="Failed to load issue title" data-id="324363121" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3236">#3236</a>)</li>
  <li>Reject attempts to send event before privacy consent is given (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3257" data-error-text="Failed to load issue title" data-id="325182001" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3257">#3257</a>)</li>
  <li>Add a 'has_consented' template var to consent forms (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3262" data-error-text="Failed to load issue title" data-id="325308498" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3262">#3262</a>)</li>
  <li>Fix dependency on jinja2 (PR <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/3263" data-error-text="Failed to load issue title" data-id="325308826" data-permission-text="Issue title is private" aria-label="#3263, Fix dependency on jinja2">#3263</a>)</li>
</ul>
Features:
<ul>
  <li>Cohort analytics (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3163" data-error-text="Failed to load issue title" data-id="319174463" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3163">#3163</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3241" data-error-text="Failed to load issue title" data-id="324442563" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3241">#3241</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3251" data-error-text="Failed to load issue title" data-id="324872139" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3251">#3251</a>)</li>
  <li>Add lxml to docker image for web previews (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3239" data-error-text="Failed to load issue title" data-id="324408394" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3239">#3239</a>) Thanks to <a class="user-mention" href="https://github.com/ptman" data-hovercard-user-id="24669" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" aria-describedby="hovercard-aria-description">@ptman</a>!</li>
  <li>Add in flight request metrics (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3252" data-error-text="Failed to load issue title" data-id="324955805" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3252">#3252</a>)</li>
</ul>
Changes:
<ul>
  <li>Remove unused <code>update_external_syncs</code> (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3233" data-error-text="Failed to load issue title" data-id="324114741" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3233">#3233</a>)</li>
  <li>Use stream rather depth ordering for push actions (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3212" data-error-text="Failed to load issue title" data-id="322319018" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3212">#3212</a>)</li>
  <li>Make purge_history operate on tokens (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3221" data-error-text="Failed to load issue title" data-id="323268684" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3221">#3221</a>)</li>
  <li>Don't support limitless pagination (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3265" data-error-text="Failed to load issue title" data-id="325389253" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3265">#3265</a>)</li>
</ul>
Bug Fixes:
<ul>
  <li>Fix logcontext resource usage tracking (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3258" data-error-text="Failed to load issue title" data-id="325229997" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3258">#3258</a>)</li>
  <li>Fix error in handling receipts (PR <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/3235" data-error-text="Failed to load issue title" data-id="324313546" data-permission-text="Issue title is private" aria-label="#3235, Fix error in handling receipts">#3235</a>)</li>
  <li>Stop the transaction cache caching failures (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/3255" data-error-text="Failed to load issue title" data-id="324972872" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/3255">#3255</a>)</li>
</ul>
