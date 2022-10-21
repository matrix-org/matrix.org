+++
title = "Synapse 1.59 released"
path = "/blog/2022/05/18/synapse-1-59-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

[Synapse 1.59](https://github.com/matrix-org/synapse/releases/tag/v1.59.0) is
out! Let's see what's new in this version.

## Generic worker types

When Synapse instances are subject to high load, it can be useful to use workers
to balance the load more effectively. Workers are separate processes that can
take some of the load off the main Synapse process, and allow the homeserver to
scale more effectively.

In the past, Synapse only provided a specific set of types of workers, each
capable of handling a specific set of operations. For some time now we have been
working on allowing more flexibility around worker configuration, which started
all the way back in [Synapse
1.12.0](https://matrix.org/blog/2020/03/23/synapse-1-12-0-released) with the
introduction of a generic worker application type.

Synapse 1.59 furthers this work by deprecating the `synapse.app.appservice` and
`synapse.app.user_dir` worker application types. Homeserver administrators
should change the configuration of instances using these types to the generic
`synapse.app.generic_worker` application type, and use the
`notify_appservices_from_worker` and `update_user_directory_from_worker` to
delegate application service and user directory work (respectively) to a worker.

See the [upgrade
notes](https://matrix-org.github.io/synapse/v1.59/upgrade.html#deprecation-of-the-synapseappappservice-and-synapseappuser_dir-worker-application-types)
for more information on this change.

## Push rules

Push rules allow Matrix clients to define notification rules on a homeserver.
One often reported issue with notification in Matrix is the fact that
notifications are sent out when server ACLs, which define which server(s) can
and cannot interact in a room, change. This is especially annoying during big
waves of abuse, as there might be multiple servers that need to be banned from
rooms, thus causing a lot of unneeded notifications.

Synapse 1.59 now supports silencing server ACL updates, by implementing the new
push rule documented in
[MSC3786](https://github.com/matrix-org/matrix-spec-proposals/pull/3786).
However, since this MSC hasn't been incorporated into the spec yet, this
behaviour is disabled by default in Synapse: see [the implementation pull
request](https://github.com/matrix-org/synapse/pull/12601) for more information
on turning it on.

Synapse 1.59 also allows third-party modules to validate and change the actions
associated with an existing push rule via the [Module
API](https://github.com/matrix-org/synapse/blob/d24a1486e5c5d69a8798a9d159fd9e06dfc8c3e3/synapse/module_api/__init__.py#L1360-L1420).
This is helpful for modules wishing to, for example, configuring specific
notification settings when new users register.

## Everything else

As of Synapse 1.59, Synapse will not communicate the name of devices over
federation (unless configured otherwise), in order to better preserve user
privacy. See the [upgrade
notes](https://matrix-org.github.io/synapse/v1.59/upgrade.html#device-name-lookup-over-federation-has-been-disabled-by-default)
for more information.

Also note that we have issued a patch release for 1.59 (1.59.1) which fixes a
long-standing bug that started to bite a good amount of server administrators.
Server admins that are looking into upgrading their instance to Synapse 1.59 are
recommended to upgrade to 1.59.1 rather than 1.59.0.

See the [full
changelog](https://github.com/matrix-org/synapse/releases/tag/v1.59.0) for a
complete list of changes in this release. Also please have a look at the
[upgrade
notes](https://matrix-org.github.io/synapse/v1.59/upgrade#upgrading-to-v1590)
for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order) [Beeper](https://www.beeper.com/), [Dirk
Klimpel](https://github.com/dklimpel), [Šimon
Brandner](https://github.com/SimonBrandner),
[henryclw](https://github.com/henryclw) and [Andrew
Do](https://github.com/andrewdoh).
