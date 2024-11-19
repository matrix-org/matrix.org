+++
title = "Synapse 1.68 released"
date = "2022-09-27T16:34:55Z"
path = "/blog/2022/09/27/synapse-1-68-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

Hey everyone, it's time for a new Synapse release! [Synapse
1.68](https://github.com/matrix-org/synapse/releases/tag/v1.68.0) just dropped,
let's have a look at what's inside.

<!-- more -->

## Dependency changes

As announced in the [Synapse 1.67 release
announcement](https://matrix.org/blog/2022/09/14/synapse-1-67-released), Synapse
1.68 raises the minimum supported version of SQLite to version v3.27.0. This
means that, if your installation of Synapse is using SQLite to manage its
database, and the SQLite version used is lower than 3.27, you will need to
upgrade to a more recent version before updating to Synapse 1.68. This change does not impact deployments using the `matrixdotorg/synapse` Docker image.

Synapse 1.68 also introduces the requirement of a Rust compiler for source
checkouts. The minimum required version of Rust is 1.58.1. Installations that
use `pip install matrix-synapse`, Debian packages from `packages.matrix.org` or
the `matrixdotorg/synapse` Docker image to manage and run Synapse, are not
impacted by this change.

See the [upgrade
notes](https://matrix-org.github.io/synapse/v1.68/upgrade#upgrading-to-v1680) for more information.

## Admin API improvements

Synapse 1.68 introduces a new admin API which allows server administrators to
query events in a given room that have been sent within a specific time window.
This API mirrors [the specification's `/messages`
endpoint](https://spec.matrix.org/v1.3/client-server-api/#get_matrixclientv3roomsroomidmessages),
and allows, among other things, paginating through a room's history. See [the
documentation](https://matrix-org.github.io/synapse/v1.68/admin_api/rooms.html#room-messages-api) for more information.

This version of Synapse also introduces a new admin API to help administrator of
homeservers using an external authentication provider. This endpoint allows
looking up a specific identifier on the authentication provider and resolving it
into the identifier of the local user it's associated with, if any. See [the
documentation](https://matrix-org.github.io/synapse/v1.68/admin_api/user_admin_api.html#find-a-user-based-on-their-id-in-an-auth-provider) for more information.

The [user admin
API](https://matrix-org.github.io/synapse/v1.68/admin_api/user_admin_api.html#user-admin-api)
has also been updated to allow administrator of homeservers [requiring agreement
to the server's terms and
conditions](https://matrix-org.github.io/synapse/latest/consent_tracking.html)
to view and edit the timestamp at which each user has provided their agreement.

## Everything else

Synapse 1.68 greatly improves the validation of user input on most of the
account management API endpoints.

This version of Synapse also adds a new `request_id_header` option to the
configuration of HTTP listeners, which allows tracking the identifier Synapse
generates for each request in that request's response. This can be helpful for
correlating Synapse logs with reverse proxy logs. See [the
documentation](https://matrix-org.github.io/synapse/v1.68/usage/configuration/config_documentation.html#listeners) for more information.

See the [full
changelog](https://github.com/matrix-org/synapse/releases/tag/v1.68.0) for a
complete list of changes in this release. Also please have a look at the
[upgrade
notes](https://matrix-org.github.io/synapse/v1.68/upgrade#upgrading-to-v1680)
for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order) [Denis Kariakin](https://github.com/dakariakin), [Dirk
Klimpel](https://github.com/dklimpel) and [Beeper](https://www.beeper.com/), as
well as anyone helping us make Synapse better by sharing their feedback and
reporting issues.
