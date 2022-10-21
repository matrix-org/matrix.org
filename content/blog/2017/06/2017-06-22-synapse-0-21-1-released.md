+++
title = "Synapse 0.21.1 released!"
path = "/blog/2017/06/22/synapse-0-21-1-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi folks - we forgot to mention that Synapse 0.21.1 was released last week.  This contains a important fix to the <code>report-stats</code> option, which was otherwise failing to report any usage stats for folks who had the option turned on.

This is a good opportunity to note that the <code>report-stats</code> option is <b>really really important</b> for the ongoing health of the Matrix ecosystem: when raising funding to continue working on Matrix we <b>have</b> to be able to demonstrate how the ecosystem is growing and why it's a good idea to support us to work on it.  In practice, the data we collect is: hostname, synapse version & uptime, total_users, total_nonbridged users, total_room_count, daily_active_users, daily_active_rooms, daily_messages and daily_sent_messages.

Folks: if you have turned off report-stats for whatever reason, <b>please</b> consider upgrading to 0.21.1 and turning it back on.

In return, the plan is that we'll start to publish an official Grafana of the anonymised aggregate stats, probably embedded into the frontpage of Matrix.org, and then you and everyone else can have a view of the state of the Matrix universe.  And critically, it'll really help us continue to justify $ to spend on growing the project!

You can get Synapse 0.21.1 from <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a> or <a href="https://github.com/matrix-org/synapse/releases/tag/v0.21.1">https://github.com/matrix-org/synapse/releases/tag/v0.21.1</a> as normal.
