+++
title = "Synapse 1.78 released"
path = "/blog/2023/02/28/synapse-1-78-released"

[taxonomies]
author = ["H. Shay"]
category = ["Releases"]
+++

Greetings Matrix fans! We've published Synapse [version 1.78](https://github.com/matrix-org/synapse/releases/tag/v1.78.0)
as the new stable release this week. Synapse admins are encouraged to upgrade
to it at their convenience. Please take a look at the [upgrade notes](https://matrix-org.github.io/synapse/v1.78/upgrade.html#upgrading-to-v1780)
for any important information about upgrading.

<!-- more -->

## Announcements

Please note that Synapse 1.78.0 replaces the `/_synapse/admin/v1/media/<server_name>/delete` admin API with an identical
endpoint at `/_synapse/admin/v1/media/delete`. Please update your tooling to use the new endpoint. The deprecated version
will be removed in a future release.

## The new stuff

In case you were unaware, Synapse has a command line export data command which allows administrators to export data for
a specific user (you can read more about this command [here](https://matrix-org.github.io/synapse/latest/usage/administration/admin_faq.html#how-can-i-export-user-data)).
Synapse 1.78.0 updates this command adding account data to the user information that is returned by the export data command.

This version of Synapse also features a few changes to push rules, with implementations for [MSC3758](https://github.com/matrix-org/matrix-spec-proposals/pull/3758):
Add `event_property_is push` rule condition kind,
[MSC3966](https://github.com/matrix-org/matrix-spec-proposals/pull/3966): `event_property_contains` push rule condition, and the removal of the spurious `dont_notify`
action from the defaults for the `.m.rule.reaction` pushrule. These changes empower end users to more fully customise their
notification rules - MSC3758 allows users to ask to be notified when a field in an event contains any type of value, rather
than only matching on strings, and MSC3966 provides crucial scaffolding for [MSC3952](https://github.com/matrix-org/matrix-spec-proposals/pull/3952): Intentional Mentions,
which aims to eliminate unintentional mentions and improve the experience of mentions in general.

Synapse v1.78.0 includes some fixes for faster-joins related bugs as we work out the kinks. Some of these include a fix
for a bug introduced in Synapse 1.76.0 where partially-joined rooms could not be deleted using the
[purge room API](https://matrix-org.github.io/synapse/latest/admin_api/rooms.html#delete-room-api), and
a fix for a bug introduced in Synapse 1.75 where the [portdb script](https://matrix-org.github.io/synapse/latest/postgres.html#porting-from-sqlite)
would fail to run after a room had been faster-joined. We continue to work to polish faster joins, and thank everyone who
filed an issue.

Finally, for those deployments using workers, v1.78.0 fixed a bug introduced in Synapse 1.76 where 5s delays would
occasionally occur.

## Everything else

See the full [changelog](https://github.com/matrix-org/synapse/releases/tag/v1.78.0) for a
complete list of changes in the release. Also please have a look at the [upgrade
notes](https://matrix-org.github.io/synapse/v1.78/upgrade.html#upgrading-to-v1780).

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order): jahway603, williamkray, 999lakhisidhu, hari01584, saddfox, dklimpel, realtyem
V02460, and thezaidbintariq.

We are also grateful to anyone helping us make Synapse better by sharing their
feedback and reporting issues, or helping with community support questions.
