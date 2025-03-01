+++
title = "Synapse 0.33.2 is here!"
path = "/blog/2018/08/09/synapse-0-33-2-is-here"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Folks, it's release time, Synapse 0.33.2 has landed.

The release focuses on performance, notable highlights include reducing CPU consumption through speeding up state delta calculations (<a href="https://github.com/matrix-org/synapse/issues/3592">#3592</a>) and reducing I/O through lazily loading state on the master process (<a href="https://github.com/matrix-org/synapse/issues/3579">#3579</a>, <a href="https://github.com/matrix-org/synapse/issues/3581">#3581</a>, <a href="https://github.com/matrix-org/synapse/issues/3582">#3582</a>, <a href="https://github.com/matrix-org/synapse/issues/3584">#3584</a>)

Separately work continues on our python 3 port and we hope to have something concrete to trial very soon - we're really excited about this and expect step change improvements in CPU and memory use.

Finally we have some ground work for upcoming room membership lazy loading, there is nothing to see here as yet, but rest assured we will make a lot of noise as soon as it is ready. Stay tuned.

 or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>.

### Synapse 0.33.2 (2018-08-09)

No significant changes.

### Synapse 0.33.2rc1 (2018-08-07)

#### Features

<ul>
  <li>add support for the lazy_loaded_members filter as per MSC1227 (<a href="https://github.com/matrix-org/synapse/issues/2970">#2970</a>)</li>
  <li>add support for the include_redundant_members filter param as per MSC1227 (<a href="https://github.com/matrix-org/synapse/issues/3331">#3331</a>)</li>
  <li>Add metrics to track resource usage by background processes (<a href="https://github.com/matrix-org/synapse/issues/3553">#3553</a>, <a href="https://github.com/matrix-org/synapse/issues/3556">#3556</a>, <a href="https://github.com/matrix-org/synapse/issues/3604">#3604</a>, <a href="https://github.com/matrix-org/synapse/issues/3610">#3610</a>)</li>
  <li>Add <code>code</code> label to <code>synapse_http_server_response_time_seconds</code> prometheus metric (<a href="https://github.com/matrix-org/synapse/issues/3554">#3554</a>)</li>
  <li>Add support for client_reader to handle more APIs (<a href="https://github.com/matrix-org/synapse/issues/3555">#3555</a>, <a href="https://github.com/matrix-org/synapse/issues/3597">#3597</a>)</li>
  <li>make the /context API filter & lazy-load aware as per MSC1227 (<a href="https://github.com/matrix-org/synapse/issues/3567">#3567</a>)</li>
  <li>Add ability to limit number of monthly active users on the server (<a href="https://github.com/matrix-org/synapse/issues/3630">#3630</a>)</li>
  <li>When we fail to join a room over federation, pass the error code back to the client. (<a href="https://github.com/matrix-org/synapse/issues/3639">#3639</a>)</li>
  <li>Add a new /admin/register API for non-interactively creating users. (<a href="https://github.com/matrix-org/synapse/issues/3415">#3415</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Make /directory/list API return 404 for room not found instead of 400 (<a href="https://github.com/matrix-org/synapse/issues/2952">#2952</a>)</li>
  <li>Default inviter_display_name to mxid for email invites (<a href="https://github.com/matrix-org/synapse/issues/3391">#3391</a>)</li>
  <li>Don't generate TURN credentials if no TURN config options are set (<a href="https://github.com/matrix-org/synapse/issues/3514">#3514</a>)</li>
  <li>Correctly announce deleted devices over federation (<a href="https://github.com/matrix-org/synapse/issues/3520">#3520</a>)</li>
  <li>Catch failures saving metrics captured by Measure, and instead log the faulty metrics information for further analysis. (<a href="https://github.com/matrix-org/synapse/issues/3548">#3548</a>)</li>
  <li>Unicode passwords are now normalised before hashing, preventing the instance where two different devices or browsers might send a different UTF-8 sequence for the password. (<a href="https://github.com/matrix-org/synapse/issues/3569">#3569</a>)</li>
  <li>Fix potential stack overflow and deadlock under heavy load (<a href="https://github.com/matrix-org/synapse/issues/3570">#3570</a>)</li>
  <li>Respond with M_NOT_FOUND when profiles are not found locally or over federation. Fixes #3585 (<a href="https://github.com/matrix-org/synapse/issues/3585">#3585</a>)</li>
  <li>Fix failure to persist events over federation under load (<a href="https://github.com/matrix-org/synapse/issues/3601">#3601</a>)</li>
  <li>Fix updating of cached remote profiles (<a href="https://github.com/matrix-org/synapse/issues/3605">#3605</a>)</li>
  <li>Fix 'tuple index out of range' error (<a href="https://github.com/matrix-org/synapse/issues/3607">#3607</a>)</li>
  <li>Only import secrets when available (fix for py &lt; 3.6) (<a href="https://github.com/matrix-org/synapse/issues/3626">#3626</a>)</li>
</ul>

#### Internal Changes

<ul>
  <li>Remove redundant checks on who_forgot_in_room (<a href="https://github.com/matrix-org/synapse/issues/3350">#3350</a>)</li>
  <li>Remove unnecessary event re-signing hacks (<a href="https://github.com/matrix-org/synapse/issues/3367">#3367</a>)</li>
  <li>Rewrite cache list decorator (<a href="https://github.com/matrix-org/synapse/issues/3384">#3384</a>)</li>
  <li>Move v1-only REST APIs into their own module. (<a href="https://github.com/matrix-org/synapse/issues/3460">#3460</a>)</li>
  <li>Replace more instances of Python 2-only iteritems and itervalues uses. (<a href="https://github.com/matrix-org/synapse/issues/3562">#3562</a>)</li>
  <li>Refactor EventContext to accept state during init (<a href="https://github.com/matrix-org/synapse/issues/3577">#3577</a>)</li>
  <li>Improve Dockerfile and docker-compose instructions (<a href="https://github.com/matrix-org/synapse/issues/3543">#3543</a>)</li>
  <li>Release notes are now in the Markdown format. (<a href="https://github.com/matrix-org/synapse/issues/3552">#3552</a>)</li>
  <li>add config for pep8 (<a href="https://github.com/matrix-org/synapse/issues/3559">#3559</a>)</li>
  <li>Merge Linearizer and Limiter (<a href="https://github.com/matrix-org/synapse/issues/3571">#3571</a>, <a href="https://github.com/matrix-org/synapse/issues/3572">#3572</a>)</li>
  <li>Lazily load state on master process when using workers to reduce DB consumption (<a href="https://github.com/matrix-org/synapse/issues/3579">#3579</a>, <a href="https://github.com/matrix-org/synapse/issues/3581">#3581</a>, <a href="https://github.com/matrix-org/synapse/issues/3582">#3582</a>, <a href="https://github.com/matrix-org/synapse/issues/3584">#3584</a>)</li>
  <li>Fixes and optimisations for resolve_state_groups (<a href="https://github.com/matrix-org/synapse/issues/3586">#3586</a>)</li>
  <li>Improve logging for exceptions when handling PDUs (<a href="https://github.com/matrix-org/synapse/issues/3587">#3587</a>)</li>
  <li>Add some measure blocks to persist_events (<a href="https://github.com/matrix-org/synapse/issues/3590">#3590</a>)</li>
  <li>Fix some random logcontext leaks. (<a href="https://github.com/matrix-org/synapse/issues/3591">#3591</a>, <a href="https://github.com/matrix-org/synapse/issues/3606">#3606</a>)</li>
  <li>Speed up calculating state deltas in persist_event loop (<a href="https://github.com/matrix-org/synapse/issues/3592">#3592</a>)</li>
  <li>Attempt to reduce amount of state pulled out of DB during persist_events (<a href="https://github.com/matrix-org/synapse/issues/3595">#3595</a>)</li>
  <li>Fix a documentation typo in on_make_leave_request (<a href="https://github.com/matrix-org/synapse/issues/3609">#3609</a>)</li>
  <li>Make EventStore inherit from EventFederationStore (<a href="https://github.com/matrix-org/synapse/issues/3612">#3612</a>)</li>
  <li>Remove some redundant joins on event_edges.room_id (<a href="https://github.com/matrix-org/synapse/issues/3613">#3613</a>)</li>
  <li>Stop populating events.content (<a href="https://github.com/matrix-org/synapse/issues/3614">#3614</a>)</li>
  <li>Update the /send_leave path registration to use event_id rather than a transaction ID. (<a href="https://github.com/matrix-org/synapse/issues/3616">#3616</a>)</li>
  <li>Refactor FederationHandler to move DB writes into separate functions (<a href="https://github.com/matrix-org/synapse/issues/3621">#3621</a>)</li>
  <li>Remove unused field "pdu_failures" from transactions. (<a href="https://github.com/matrix-org/synapse/issues/3628">#3628</a>)</li>
  <li>rename replication_layer to federation_client (<a href="https://github.com/matrix-org/synapse/issues/3634">#3634</a>)</li>
  <li>Factor out exception handling in federation_client (<a href="https://github.com/matrix-org/synapse/issues/3638">#3638</a>)</li>
  <li>Refactor location of docker build script. (<a href="https://github.com/matrix-org/synapse/issues/3644">#3644</a>)</li>
  <li>Update CONTRIBUTING to mention newsfragments. (<a href="https://github.com/matrix-org/synapse/issues/3645">#3645</a>)</li>
</ul>
