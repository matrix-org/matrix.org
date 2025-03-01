+++
title = "Synapse 0.11.0 is here!"
path = "/blog/2015/11/17/synapse-0-11-0-is-here"

[taxonomies]
author = ["Oddvar Lovaas"]
category = ["General"]
+++

Today, we are releasing Synapse version 0.11.0. In the last week, we have had two release candidates, and this release also includes changes in v0.10.1-rc1 from October.

New features include a new Search API and better options for logging in (CAS and login fallback support) - thanks to Steven for contributing CAS support. We also introduce room tagging and as usual, there are plenty of improvements and fixes. For the full info, see the changelog below.

To upgrade, go read <a href="https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst">https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst</a> - to install for the first time, go to <a href="https://github.com/matrix-org/synapse/blob/master/README.rst">https://github.com/matrix-org/synapse/blob/master/README.rst</a>.

## Changes in synapse v0.11.0 (2015-11-17)

* Change CAS login API (PR #349)

## Changes in synapse v0.11.0-rc2 (2015-11-13)

* Various changes to /sync API response format (PR #373)
* Fix regression when setting display name in newly joined room over federation (PR #368)
* Fix problem where /search was slow when using SQLite (PR #366)

## Changes in synapse v0.11.0-rc1 (2015-11-11)

* Add Search API (PR #307, #324, #327, #336, #350, #359)
* Add 'archived' state to v2 /sync API (PR #316)
* Add ability to reject invites (PR #317)
* Add config option to disable password login (PR #322)
* Add the login fallback API (PR #330)
* Add room context API (PR #334)
* Add room tagging support (PR #335)
* Update v2 /sync API to match spec (PR #305, #316, #321, #332, #337, #341)
* Change retry schedule for application services (PR #320)
* Change retry schedule for remote servers (PR #340)
* Fix bug where we hosted static content in the incorrect place (PR #329)
* Fix bug where we didn't increment retry interval for remote servers (PR #343)

## Changes in synapse v0.10.1-rc1 (2015-10-15)

* Add support for CAS, thanks to Steven Hammerton (PR #295, #296)
* Add support for using macaroons for access_token (PR #256, #229)
* Add support for m.room.canonical_alias (PR #287)
* Add support for viewing the history of rooms that they have left. (PR #276, #294)
* Add support for refresh tokens (PR #240)
* Add flag on creation which disables federation of the room (PR #279)
* Add some room state to invites. (PR #275)
* Atomically persist events when joining a room over federation (PR #283)
* Change default history visibility for private rooms (PR #271)
* Allow users to redact their own sent events (PR #262)
* Use tox for tests (PR #247)
* Split up syutil into separate libraries (PR #243)
