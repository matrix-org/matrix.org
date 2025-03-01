+++
title = "Synapse 0.99.3 released!"
path = "/blog/2019/04/01/synapse-0-99-3-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Hey hey, a Synapse release for you today.

The big news in 0.99.3 is that the user directory has been completely re-written and should now be much more performant - this will benefit all installations, but especially those housing larger servers.

Aside from that we continue our 1.0 preparations and relatedly we've improved our docs, in particular to explain how .well-known works. On the perf side we've added rate limiting to login and register endpoints as well as now batching up read receipts to send over federation.

I've said it before, and I'll say it again:-

> The most important thing that admins should know is that prior to 1.0 landing later this month, <strong>it is essential that the federation API has a valid TLS certificate - self signed certificates will no longer be accepted.</strong> For more details see our <a href="https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md">handy guide</a>. Failure to do this will result in being unable to federate with other 1.0 servers.

As ever, you can get the new update <a href="https://github.com/matrix-org/synapse/releases/tag/v0.99.3">here</a> or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>. Also, check out our new <a href="/docs/guides/installing-synapse">Synapse installation guide page.</a>

## Synapse 0.99.3 changelog

### Features

<ul>
  <li>The user directory has been rewritten to make it faster, with less chance of falling behind on a large server. (<a href="https://github.com/matrix-org/synapse/issues/4537">#4537</a>, <a href="https://github.com/matrix-org/synapse/issues/4846">#4846</a>, <a href="https://github.com/matrix-org/synapse/issues/4864">#4864</a>, <a href="https://github.com/matrix-org/synapse/issues/4887">#4887</a>, <a href="https://github.com/matrix-org/synapse/issues/4900">#4900</a>, <a href="https://github.com/matrix-org/synapse/issues/4944">#4944</a>)</li>
  <li>Add configurable rate limiting to the /register endpoint. (<a href="https://github.com/matrix-org/synapse/issues/4735">#4735</a>, <a href="https://github.com/matrix-org/synapse/issues/4804">#4804</a>)</li>
  <li>Move server key queries to federation reader. (<a href="https://github.com/matrix-org/synapse/issues/4757">#4757</a>)</li>
  <li>Add support for /account/3pid REST endpoint to client_reader worker. (<a href="https://github.com/matrix-org/synapse/issues/4759">#4759</a>)</li>
  <li>Add an endpoint to the admin API for querying the server version. Contributed by Joseph Weston. (<a href="https://github.com/matrix-org/synapse/issues/4772">#4772</a>)</li>
  <li>Include a default configuration file in the 'docs' directory. (<a href="https://github.com/matrix-org/synapse/issues/4791">#4791</a>, <a href="https://github.com/matrix-org/synapse/issues/4801">#4801</a>)</li>
  <li>Synapse is now permissive about trailing slashes on some of its federation endpoints, allowing zero or more to be present. (<a href="https://github.com/matrix-org/synapse/issues/4793">#4793</a>)</li>
  <li>Add support for /keys/query and /keys/changes REST endpoints to client_reader worker. (<a href="https://github.com/matrix-org/synapse/issues/4796">#4796</a>)</li>
  <li>Add checks to incoming events over federation for events evading auth (aka "soft fail"). (<a href="https://github.com/matrix-org/synapse/issues/4814">#4814</a>)</li>
  <li>Add configurable rate limiting to the /login endpoint. (<a href="https://github.com/matrix-org/synapse/issues/4821">#4821</a>, <a href="https://github.com/matrix-org/synapse/issues/4865">#4865</a>)</li>
  <li>Remove trailing slashes from certain outbound federation requests. Retry if receiving a 404. Context: #3622. (<a href="https://github.com/matrix-org/synapse/issues/4840">#4840</a>)</li>
  <li>Allow passing --daemonize flags to workers in the same way as with master. (<a href="https://github.com/matrix-org/synapse/issues/4853">#4853</a>)</li>
  <li>Batch up outgoing read-receipts to reduce federation traffic. (<a href="https://github.com/matrix-org/synapse/issues/4890">#4890</a>, <a href="https://github.com/matrix-org/synapse/issues/4927">#4927</a>)</li>
  <li>Add option to disable searching the user directory. (<a href="https://github.com/matrix-org/synapse/issues/4895">#4895</a>)</li>
  <li>Add option to disable searching of local and remote public room lists. (<a href="https://github.com/matrix-org/synapse/issues/4896">#4896</a>)</li>
  <li>Add ability for password providers to login/register a user via 3PID (email, phone). (<a href="https://github.com/matrix-org/synapse/issues/4931">#4931</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix a bug where media with spaces in the name would get a corrupted name. (<a href="https://github.com/matrix-org/synapse/issues/2090">#2090</a>)</li>
  <li>Fix attempting to paginate in rooms where server cannot see any events, to avoid unnecessarily pulling in lots of redacted events. (<a href="https://github.com/matrix-org/synapse/issues/4699">#4699</a>)</li>
  <li>'event_id' is now a required parameter in federated state requests, as per the matrix spec. (<a href="https://github.com/matrix-org/synapse/issues/4740">#4740</a>)</li>
  <li>Fix tightloop over connecting to replication server. (<a href="https://github.com/matrix-org/synapse/issues/4749">#4749</a>)</li>
  <li>Fix parsing of Content-Disposition headers on remote media requests and URL previews. (<a href="https://github.com/matrix-org/synapse/issues/4763">#4763</a>)</li>
  <li>Fix incorrect log about not persisting duplicate state event. (<a href="https://github.com/matrix-org/synapse/issues/4776">#4776</a>)</li>
  <li>Fix v4v6 option in HAProxy example config. Contributed by Flakebi. (<a href="https://github.com/matrix-org/synapse/issues/4790">#4790</a>)</li>
  <li>Handle batch updates in worker replication protocol. (<a href="https://github.com/matrix-org/synapse/issues/4792">#4792</a>)</li>
  <li>Fix bug where we didn't correctly throttle sending of USER_IP commands over replication. (<a href="https://github.com/matrix-org/synapse/issues/4818">#4818</a>)</li>
  <li>Fix potential race in handling missing updates in device list updates. (<a href="https://github.com/matrix-org/synapse/issues/4829">#4829</a>)</li>
  <li>Fix bug where synapse expected an un-specced <code>prev_state</code> field on state events. (<a href="https://github.com/matrix-org/synapse/issues/4837">#4837</a>)</li>
  <li>Transfer a user's notification settings (push rules) on room upgrade. (<a href="https://github.com/matrix-org/synapse/issues/4838">#4838</a>)</li>
  <li>fix test_auto_create_auto_join_where_no_consent. (<a href="https://github.com/matrix-org/synapse/issues/4886">#4886</a>)</li>
  <li>Fix a bug where hs_disabled_message was sometimes not correctly enforced. (<a href="https://github.com/matrix-org/synapse/issues/4888">#4888</a>)</li>
  <li>Fix bug in shutdown room admin API where it would fail if a user in the room hadn't consented to the privacy policy. (<a href="https://github.com/matrix-org/synapse/issues/4904">#4904</a>)</li>
  <li>Fix bug where blocked world-readable rooms were still peekable. (<a href="https://github.com/matrix-org/synapse/issues/4908">#4908</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Add a systemd setup that supports synapse workers. Contributed by Luca Corbatto. (<a href="https://github.com/matrix-org/synapse/issues/4662">#4662</a>)</li>
  <li>Change from TravisCI to Buildkite for CI. (<a href="https://github.com/matrix-org/synapse/issues/4752">#4752</a>)</li>
  <li>When presence is disabled don't send over replication. (<a href="https://github.com/matrix-org/synapse/issues/4757">#4757</a>)</li>
  <li>Minor docstring fixes for MatrixFederationAgent. (<a href="https://github.com/matrix-org/synapse/issues/4765">#4765</a>)</li>
  <li>Optimise EDU transmission for the federation_sender worker. (<a href="https://github.com/matrix-org/synapse/issues/4770">#4770</a>)</li>
  <li>Update test_typing to use HomeserverTestCase. (<a href="https://github.com/matrix-org/synapse/issues/4771">#4771</a>)</li>
  <li>Update URLs for riot.im icons and logos in the default notification templates. (<a href="https://github.com/matrix-org/synapse/issues/4779">#4779</a>)</li>
  <li>Removed unnecessary $ from some federation endpoint path regexes. (<a href="https://github.com/matrix-org/synapse/issues/4794">#4794</a>)</li>
  <li>Remove link to deleted title in README. (<a href="https://github.com/matrix-org/synapse/issues/4795">#4795</a>)</li>
  <li>Clean up read-receipt handling. (<a href="https://github.com/matrix-org/synapse/issues/4797">#4797</a>)</li>
  <li>Add some debug about processing read receipts. (<a href="https://github.com/matrix-org/synapse/issues/4798">#4798</a>)</li>
  <li>Clean up some replication code. (<a href="https://github.com/matrix-org/synapse/issues/4799">#4799</a>)</li>
  <li>Add some docstrings. (<a href="https://github.com/matrix-org/synapse/issues/4815">#4815</a>)</li>
  <li>Add debug logger to try and track down #4422. (<a href="https://github.com/matrix-org/synapse/issues/4816">#4816</a>)</li>
  <li>Make shutdown API send explanation message to room after users have been forced joined. (<a href="https://github.com/matrix-org/synapse/issues/4817">#4817</a>)</li>
  <li>Update example_log_config.yaml. (<a href="https://github.com/matrix-org/synapse/issues/4820">#4820</a>)</li>
  <li>Document the <code>generate</code> option for the docker image. (<a href="https://github.com/matrix-org/synapse/issues/4824">#4824</a>)</li>
  <li>Fix check-newsfragment for debian-only changes. (<a href="https://github.com/matrix-org/synapse/issues/4825">#4825</a>)</li>
  <li>Add some debug logging for device list updates to help with #4828. (<a href="https://github.com/matrix-org/synapse/issues/4828">#4828</a>)</li>
  <li>Improve federation documentation, specifically .well-known support. Many thanks to @vaab. (<a href="https://github.com/matrix-org/synapse/issues/4832">#4832</a>)</li>
  <li>Disable captcha registration by default in unit tests. (<a href="https://github.com/matrix-org/synapse/issues/4839">#4839</a>)</li>
  <li>Add stuff back to the .gitignore. (<a href="https://github.com/matrix-org/synapse/issues/4843">#4843</a>)</li>
  <li>Clarify what registration_shared_secret allows for. (<a href="https://github.com/matrix-org/synapse/issues/4844">#4844</a>)</li>
  <li>Correctly log expected errors when fetching server keys. (<a href="https://github.com/matrix-org/synapse/issues/4847">#4847</a>)</li>
  <li>Update install docs to explicitly state a full-chain (not just the top-level) TLS certificate must be provided to Synapse. This caused some people's Synapse ports to appear correct in a browser but still (rightfully so) upset the federation tester. (<a href="https://github.com/matrix-org/synapse/issues/4849">#4849</a>)</li>
  <li>Move client read-receipt processing to federation sender worker. (<a href="https://github.com/matrix-org/synapse/issues/4852">#4852</a>)</li>
  <li>Refactor federation TransactionQueue. (<a href="https://github.com/matrix-org/synapse/issues/4855">#4855</a>)</li>
  <li>Comment out most options in the generated config. (<a href="https://github.com/matrix-org/synapse/issues/4863">#4863</a>)</li>
  <li>Fix yaml library warnings by using safe_load. (<a href="https://github.com/matrix-org/synapse/issues/4869">#4869</a>)</li>
  <li>Update Apache setup to remove location syntax. Thanks to @cwmke! (<a href="https://github.com/matrix-org/synapse/issues/4870">#4870</a>)</li>
  <li>Reinstate test case that runs unit tests against oldest supported dependencies. (<a href="https://github.com/matrix-org/synapse/issues/4879">#4879</a>)</li>
  <li>Update link to federation docs. (<a href="https://github.com/matrix-org/synapse/issues/4881">#4881</a>)</li>
  <li>fix test_auto_create_auto_join_where_no_consent. (<a href="https://github.com/matrix-org/synapse/issues/4886">#4886</a>)</li>
  <li>Use a regular HomeServerConfig object for unit tests rater than a Mock. (<a href="https://github.com/matrix-org/synapse/issues/4889">#4889</a>)</li>
  <li>Add some notes about tuning postgres for larger deployments. (<a href="https://github.com/matrix-org/synapse/issues/4895">#4895</a>)</li>
  <li>Add a config option for torture-testing worker replication. (<a href="https://github.com/matrix-org/synapse/issues/4902">#4902</a>)</li>
  <li>Log requests which are simulated by the unit tests. (<a href="https://github.com/matrix-org/synapse/issues/4905">#4905</a>)</li>
  <li>Allow newsfragments to end with exclamation marks. Exciting! (<a href="https://github.com/matrix-org/synapse/issues/4912">#4912</a>)</li>
  <li>Refactor some more tests to use HomeserverTestCase. (<a href="https://github.com/matrix-org/synapse/issues/4913">#4913</a>)</li>
  <li>Refactor out the state deltas portion of the user directory store and handler. (<a href="https://github.com/matrix-org/synapse/issues/4917">#4917</a>)</li>
  <li>Fix nginx example in ACME doc. (<a href="https://github.com/matrix-org/synapse/issues/4923">#4923</a>)</li>
  <li>Use an explicit dbname for postgres connections in the tests. (<a href="https://github.com/matrix-org/synapse/issues/4928">#4928</a>)</li>
  <li>Fix <code>ClientReplicationStreamProtocol.__str__()</code>. (<a href="https://github.com/matrix-org/synapse/issues/4929">#4929</a>)</li>
</ul>
