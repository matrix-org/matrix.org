+++
title = "Matrix.org homeserver outage (25th Jan 2017)"
path = "/blog/2017/01/25/matrix-org-homeserver-outage-25th-jan-2017"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi folks,

As many will have noticed there was a major outage on the Matrix homeserver for matrix.org last night (UK-time).  This impacted anyone with an account on the matrix.org server, as well as anyone using matrix.org-hosted bots & bridges.  As Matrix rooms are shared over all participants, rooms with participants on other servers were unaffected (for users on those servers). Here's a quick explanation of what went wrong (times are UTC):

<ul>
<li>2017-01-24 16:00 - We notice that we're badly running out of diskspace on the matrix.org backup postgres replica.  (Turns out the backup box, whilst identical hardware to the master, had been built out as RAID-10 rather than RAID-5 and so has less disk space).
</li><li>2017-01-24 17:00 - We decide to drop a large DB index: <code>event_push_actions(room_id, event_id, user_id, profile_tag)</code>, which was taking up a disproportionate amount of disk space, on the basis that it didn't appear to be being used according to the postgres stats.  All seems good.
</li><li>2017-01-24 ~23:00 - The core matrix.org team go to bed.
</li><li>2017-01-24 23:33 - Someone redacts an event in a very active room (probably #matrix:matrix.org) which necessitates redacting the associated push notification from the event_push_actions table.  This takes out a lock within persist_event, which is then blocked on deleting the push notification.  It turns out that this deletion requires the missing DB constraint, causing the query to run for hours whilst holding the transaction lock.  The symptoms are that anything reading events from the DB was blocked on the transaction, causing messages not to be relayed to other clients or servers despite appearing to send correctly.  Meanwhile, the fact that events are being received by the server fine (including over federation) makes the monitoring graphs look largely healthy.
</li><li>2017-01-24 23:35 - End-to-end monitoring detects problems, and sends alerts into pagerduty and various Matrix rooms.  Unfortunately we'd failed to upgrade the pageduty trial into a paid account a few months ago, however, so the alerts are lost.
</li><li>2017-01-25 08:00 - Matrix team starts to wake up and spot problems, but confusion over the right escalation process (especially with Matthew on holiday) means folks assume that other members of the team must already be investigating.
</li><li>2017-01-25 09:00 - Server gets restarted, service starts to resume, although box suffers from load problems as traffic tries to catch up.
</li><li>2017-01-25 09:45 - Normal service on the homeserver itself is largely resumed (other than bridges; see below)
</li><li>2017-01-25 10:41 - Root cause established and the redaction path is patched on matrix.org to stop a recurrence.
</li><li>2017-01-25 11:15 - Bridges are seen to be lagging and taking much longer to recover than expected.   Decision made to let them continue to catch up normally rather than risk further disruption (e.g. IRC join/part spam) by restarting them.
</li><li>2017-01-25 13:00 - All hosted bridges returned to normal.</li>
</ul>

Obviously this is rather embarrassing, and a huge pain for everyone using the matrix.org homeserver - many apologies indeed for the outage. On the plus side, all the other Matrix homeservers out there carried on without noticing any problems (which actually complicated spotting that things had broken, given many of the core team primarily use their personal homeservers).

In some ways the root cause here is that the core team has been focusing all its energy recently on improving the overall Matrix codebase rather than operational issues on matrix.org itself, and as a result our ops practices have fallen behind (especially as the health of the Matrix ecosystem as a whole is arguably more important than the health of a single homeserver deployment).  However, we clearly need to improve things here given the number of people (>750K at the last count) dependent on the Matrix.org homeserver and its bridges & bots.

Lessons learnt on our side are:
<ul>
<li>Make sure that even though we had monitoring graphs & thresholds set up on all the right things... monitoring alerts actually have to be routed somewhere useful - i.e. phone calls to the team's phones.  Pagerduty is now set up and running properly to this end.</li>
<li>Make sure that people know to wake up the right people anyway if the monitoring alerting system fails.</li>
<li>To be even more paranoid about hotfixes to production at 5pm, especially if they can wait 'til the next day (as this one could have).</li>
<li>To investigate ways to rapidly recover bridges without causing unnecessary disruption.</li>
</ul>

Apologies again to everyone who was bitten by this - we're doing everything we can to ensure it doesn't happen again.

Matthew & the team.
