+++
title = "Synapse 1.5.0 released"
path = "/blog/2019/10/29/synapse-1-5-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

That's right folks Synapse 1.5.0 is here and ready to make your life just a little bit better.

First things first, this release includes a security fix ([\#6262](https://github.com/matrix-org/synapse/issues/6262), below). Administrators are encouraged to upgrade as soon as possible.

Aside from that, the main thing you'll notice in 1.5.0 is a massive performance improvement to the room directory, which means that servers with large directories to scan will return much more quickly. This is especially true for matrix.org but all servers will benefit.

Another key win is finally fixing some bugs in the sqlite -> postgres migrator script. Sqlite mode is there strictly for testing purposes and should never be used in a production setting let alone a federating homeserver. So if you are currently using Sqlite now is the time to migrate. What's more the script is now in CI so it can't easily break in the future (with apologies to anyone bitten by the old script...).

A final final point, we have some preparatory work for e2ee cross signing, the overall feature is not ready for release just yet but we are getting really close. Watch this space.

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.5.0) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 1.4.1 follows:

## Synapse 1.5.0 (2019-10-29)

### Security updates

This release includes a security fix ([\#6262](https://github.com/matrix-org/synapse/issues/6262), below). Administrators are encouraged to upgrade as soon as possible.

### Bugfixes

- Fix bug where room directory search was case sensitive. ([\#6268](https://github.com/matrix-org/synapse/issues/6268))

## Synapse 1.5.0rc2 (2019-10-28)

### Bugfixes

- Update list of boolean columns in `synapse_port_db`. ([\#6247](https://github.com/matrix-org/synapse/issues/6247))
- Fix /keys/query API on workers. ([\#6256](https://github.com/matrix-org/synapse/issues/6256))
- Improve signature checking on some federation APIs. ([\#6262](https://github.com/matrix-org/synapse/issues/6262))

### Internal Changes

- Move schema delta files to the correct data store. ([\#6248](https://github.com/matrix-org/synapse/issues/6248))
- Small performance improvement by removing repeated config lookups in room stats calculation. ([\#6255](https://github.com/matrix-org/synapse/issues/6255))

## Synapse 1.5.0rc1 (2019-10-24)

### Features

- Improve quality of thumbnails for 1-bit/8-bit color palette images. ([\#2142](https://github.com/matrix-org/synapse/issues/2142))
- Add ability to upload cross-signing signatures. ([\#5726](https://github.com/matrix-org/synapse/issues/5726))
- Allow uploading of cross-signing keys. ([\#5769](https://github.com/matrix-org/synapse/issues/5769))
- CAS login now provides a default display name for users if a `displayname_attribute` is set in the configuration file. ([\#6114](https://github.com/matrix-org/synapse/issues/6114))
- Reject all pending invites for a user during deactivation. ([\#6125](https://github.com/matrix-org/synapse/issues/6125))
- Add config option to suppress client side resource limit alerting. ([\#6173](https://github.com/matrix-org/synapse/issues/6173))

### Bugfixes

- Return an HTTP 404 instead of 400 when requesting a filter by ID that is unknown to the server. Thanks to @krombel for contributing this! ([\#2380](https://github.com/matrix-org/synapse/issues/2380))
- Fix a bug where users could be invited twice to the same group. ([\#3436](https://github.com/matrix-org/synapse/issues/3436))
- Fix `/createRoom` failing with badly-formatted MXIDs in the invitee list. Thanks to @wener291! ([\#4088](https://github.com/matrix-org/synapse/issues/4088))
- Make the `synapse_port_db` script create the right indexes on a new PostgreSQL database. ([\#6102](https://github.com/matrix-org/synapse/issues/6102), [\#6178](https://github.com/matrix-org/synapse/issues/6178), [\#6243](https://github.com/matrix-org/synapse/issues/6243))
- Fix bug when uploading a large file: Synapse responds with `M_UNKNOWN` while it should be `M_TOO_LARGE` according to spec. Contributed by Anshul Angaria. ([\#6109](https://github.com/matrix-org/synapse/issues/6109))
- Fix user push rules being deleted from a room when it is upgraded. ([\#6144](https://github.com/matrix-org/synapse/issues/6144))
- Don't 500 when trying to exchange a revoked 3PID invite. ([\#6147](https://github.com/matrix-org/synapse/issues/6147))
- Fix transferring notifications and tags when joining an upgraded room that is new to your server. ([\#6155](https://github.com/matrix-org/synapse/issues/6155))
- Fix bug where guest account registration can wedge after restart. ([\#6161](https://github.com/matrix-org/synapse/issues/6161))
- Fix monthly active user reaping when reserved users are specified. ([\#6168](https://github.com/matrix-org/synapse/issues/6168))
- Fix `/federation/v1/state` endpoint not supporting newer room versions. ([\#6170](https://github.com/matrix-org/synapse/issues/6170))
- Fix bug where we were updating censored events as bytes rather than text, occasionally causing invalid JSON being inserted breaking APIs that attempted to fetch such events. ([\#6186](https://github.com/matrix-org/synapse/issues/6186))
- Fix occasional missed updates in the room and user directories. ([\#6187](https://github.com/matrix-org/synapse/issues/6187))
- Fix tracing of non-JSON APIs, `/media`, `/key` etc. ([\#6195](https://github.com/matrix-org/synapse/issues/6195))
- Fix bug where presence would not get timed out correctly if a synchrotron worker is used and restarted. ([\#6212](https://github.com/matrix-org/synapse/issues/6212))
- synapse_port_db: Add 2 additional BOOLEAN_COLUMNS to be able to convert from database schema v56. ([\#6216](https://github.com/matrix-org/synapse/issues/6216))
- Fix a bug where the Synapse demo script blacklisted `::1` (ipv6 localhost) from receiving federation traffic. ([\#6229](https://github.com/matrix-org/synapse/issues/6229))

### Updates to the Docker image

- Fix logging getting lost for the docker image. ([\#6197](https://github.com/matrix-org/synapse/issues/6197))

### Internal Changes

- Update `user_filters` table to have a unique index, and non-null columns. Thanks to @pik for contributing this. ([\#1172](https://github.com/matrix-org/synapse/issues/1172), [\#6175](https://github.com/matrix-org/synapse/issues/6175), [\#6184](https://github.com/matrix-org/synapse/issues/6184))
- Allow devices to be marked as hidden, for use by features such as cross-signing.
  This adds a new field with a default value to the devices field in the database,
  and so the database upgrade may take a long time depending on how many devices
  are in the database. ([\#5759](https://github.com/matrix-org/synapse/issues/5759))
- Move lookup-related functions from RoomMemberHandler to IdentityHandler. ([\#5978](https://github.com/matrix-org/synapse/issues/5978))
- Improve performance of the public room list directory. ([\#6019](https://github.com/matrix-org/synapse/issues/6019), [\#6152](https://github.com/matrix-org/synapse/issues/6152), [\#6153](https://github.com/matrix-org/synapse/issues/6153), [\#6154](https://github.com/matrix-org/synapse/issues/6154))
- Edit header dicts docstrings in `SimpleHttpClient` to note that `str` or `bytes` can be passed as header keys. ([\#6077](https://github.com/matrix-org/synapse/issues/6077))
- Add snapcraft packaging information. Contributed by @devec0. ([\#6084](https://github.com/matrix-org/synapse/issues/6084), [\#6191](https://github.com/matrix-org/synapse/issues/6191))
- Kill off half-implemented password-reset via sms. ([\#6101](https://github.com/matrix-org/synapse/issues/6101))
- Remove `get_user_by_req` opentracing span and add some tags. ([\#6108](https://github.com/matrix-org/synapse/issues/6108))
- Drop some unused database tables. ([\#6115](https://github.com/matrix-org/synapse/issues/6115))
- Add env var to turn on tracking of log context changes. ([\#6127](https://github.com/matrix-org/synapse/issues/6127))
- Refactor configuration loading to allow better typechecking. ([\#6137](https://github.com/matrix-org/synapse/issues/6137))
- Log responder when responding to media request. ([\#6139](https://github.com/matrix-org/synapse/issues/6139))
- Improve performance of `find_next_generated_user_id` DB query. ([\#6148](https://github.com/matrix-org/synapse/issues/6148))
- Expand type-checking on modules imported by `synapse.config`. ([\#6150](https://github.com/matrix-org/synapse/issues/6150))
- Use Postgres ANY for selecting many values. ([\#6156](https://github.com/matrix-org/synapse/issues/6156))
- Add more caching to `_get_joined_users_from_context` DB query. ([\#6159](https://github.com/matrix-org/synapse/issues/6159))
- Add some metrics on the federation sender. ([\#6160](https://github.com/matrix-org/synapse/issues/6160))
- Add some logging to the rooms stats updates, to try to track down a flaky test. ([\#6167](https://github.com/matrix-org/synapse/issues/6167))
- Remove unused `timeout` parameter from `_get_public_room_list`. ([\#6179](https://github.com/matrix-org/synapse/issues/6179))
- Reject (accidental) attempts to insert bytes into postgres tables. ([\#6186](https://github.com/matrix-org/synapse/issues/6186))
- Make `version` optional in body of `PUT /room_keys/version/{version}`, since it's redundant. ([\#6189](https://github.com/matrix-org/synapse/issues/6189))
- Make storage layer responsible for adding device names to key, rather than the handler. ([\#6193](https://github.com/matrix-org/synapse/issues/6193))
- Port `synapse.rest.admin` module to use async/await. ([\#6196](https://github.com/matrix-org/synapse/issues/6196))
- Enforce that all boolean configuration values are lowercase in CI. ([\#6203](https://github.com/matrix-org/synapse/issues/6203))
- Remove some unused event-auth code. ([\#6214](https://github.com/matrix-org/synapse/issues/6214))
- Remove `Auth.check` method. ([\#6217](https://github.com/matrix-org/synapse/issues/6217))
- Remove `format_tap.py` script in favour of a perl reimplementation in Sytest's repo. ([\#6219](https://github.com/matrix-org/synapse/issues/6219))
- Refactor storage layer in preparation to support having multiple databases. ([\#6231](https://github.com/matrix-org/synapse/issues/6231))
- Remove some extra quotation marks across the codebase. ([\#6236](https://github.com/matrix-org/synapse/issues/6236))
