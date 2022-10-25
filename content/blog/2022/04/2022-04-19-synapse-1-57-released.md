+++
title = "Synapse 1.57 released"
date = "2022-04-19T16:28:33Z"
path = "/blog/2022/04/19/synapse-1-57-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

Hey everyone! Guess what? [Synapse
1.57](https://github.com/matrix-org/synapse/releases/tag/v1.57.0) has just been
released! Let's see what's new in this version!

## Application services

Application services are piece of software that have privileged access to some
of the homeserver's features. For example, they can create and manage multiple
users at the same time, which is especially useful for bridges.

This release of Synapse changes the way Synapse manually manages transaction
identifiers when talking to application services (a transaction being a group of
events the application service should know about). While this doesn't have much
impact on the everyday life of a server administrator (besides fixing a
[bug](https://github.com/matrix-org/synapse/pull/12209) and paving the way for
future performance improvements), this change means server admins should take
extra care when updating Synapse.

More specifically, if you are running a dedicated Synapse worker for handling
traffic related to application services, this worker **must** be stopped when
upgrading the main Synapse process to ensure the update is performed safely. See
the [upgrade
notes](https://matrix-org.github.io/synapse/v1.57/upgrade#changes-to-database-schema-for-application-services)
for more information about this change, and instructions on recovering from an
incorrect upgrade.

This release of Synapse also continues work on bringing end-to-end capabilities
to application services, which I was already telling you about in the [Synapse
1.50 release blog
post](https://matrix.org/blog/2022/01/18/synapse-1-50-released). More
specifically, Synapse now supports sending device list updates to applications
services, as part of implementing
[MSC3202](https://github.com/matrix-org/matrix-spec-proposals/pull/3202). This
is still very experimental and definitely not production ready, but also very
exciting!

## Improvements to the module system

Modules allow third-party developers to expand Synapse with extra features that
wouldn't necessarily fit into the Matrix specification and/or ecosystem. In the
past release of Synapse, we have been improving this system to add more
functionality to it, and this one is no exception!

Synapse modules can now implement new callbacks to [react to account data
updates](https://matrix-org.github.io/synapse/v1.57/modules/account_data_callbacks.html#on_account_data_updated),
as well as to [react to new 3PID (email address, phone number)
associations](https://matrix-org.github.io/synapse/v1.57/modules/third_party_rules_callbacks.html#on_threepid_bind).
On the latter, note that this callback will only be called after a 3PID has been
validated on the homeserver, and does not trigger when the validation happens on
an identity server (e.g. when publishing a 3PID so that other users can look it
up).

The `ModuleApi` (which is the Python class enabling modules to interact with
Synapse) has also been updated to allow module to read and write global account
data. This can be done by using the new
[`AccountDataManager`](https://github.com/matrix-org/synapse/blob/e31d06f6f0923d001736f5e6e08616293bd4b120/synapse/module_api/__init__.py#L1401-L1464)
class, which can be accessed as `api.account_data_manager` (where `api` is an
instance of `ModuleApi`).

The module API has also been updated with a [new
method](https://github.com/matrix-org/synapse/blob/e31d06f6f0923d001736f5e6e08616293bd4b120/synapse/module_api/__init__.py#L543-L552),
to allow modules to promote an existing user to server administrator (or demote
a server administrator to a normal user). This follows up on an improvement
introduced in [Synapse
1.56](https://matrix.org/blog/2022/04/05/synapse-1-56-released) allowing modules
to promote users to server administrators when registering them.

## Everything else

This release also includes a performance improvement for workers handling
`/sync` requests. While this change makes starting this kind of workers slightly
more heavy performance-wise, it aims at improving the load associated with the
first `/sync` requests hitting it right after starting. See [this
comment](https://github.com/matrix-org/synapse/pull/12367#issuecomment-1088574192)
for more details.

Synapse 1.57 also now includes bundled aggregations in message search results by
default, as
[MSC3666](https://github.com/matrix-org/matrix-spec-proposals/pull/3666) has
been accepted and has finished its final comment period.

See the [full
changelog](https://github.com/matrix-org/synapse/releases/tag/v1.57.0) for a
complete list of changes in this release. Also please have a look at the
[upgrade
notes](https://matrix-org.github.io/synapse/v1.57/upgrade#upgrading-to-v1570)
for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order) [Beeper](https://www.beeper.com/), [Dirk
Klimpel](https://github.com/dklimpel), [Famedly](https://famedly.com/) and
[Jorge Florian](https://github.com/watson28).
