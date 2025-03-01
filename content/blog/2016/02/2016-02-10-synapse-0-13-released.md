+++
title = "Synapse 0.13 released!"
path = "/blog/2016/02/10/synapse-0-13-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

Synapse 0.13 was released this afternoon, bringing a new wave of features, bug fixes and performance fixes.  The main headlines include: huge performance increases (big catchup /syncs that were taking 20s now take 0.3s!), support for server-side per-room unread message and notification badge counts, ability for guest accounts to upgrade into fully-fledged accounts, change default push rules back to notifying for group chats, and loads of bug fixes.  This release incorporates what-was 0.12.1-rc1.

<b>Please note that on first launch after upgrading a pre-0.13 server to 0.13 or later, synapse will add a large database index which may take several minutes to complete.  Whilst the index is added the service will be unresponsive.</b>

Please get the new release from <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a> and have fun!

Matthew

Full release notes:

## Changes in synapse v0.13.1 (2016-02-10)

* Bump matrix-angular-sdk (matrix web console) dependency to 0.6.8 to
  pull in the fix for SYWEB-361 so that the default client can display
  HTML messages again(!)

## Changes in synapse v0.13.0 (2016-02-10)

This version includes an upgrade of the schema, specifically adding an index to
the ``events`` table. This may cause synapse to pause for several minutes the
first time it is started after the upgrade.

Changes:

* Improve general performance (PR #540, #543. #544, #54, #549, #567)
* Change guest user ids to be incrementing integers (PR #550)
* Improve performance of public room list API (PR #552)
* Change profile API to omit keys rather than return null (PR #557)
* Add ``/media/r0`` endpoint prefix, which is equivalent to ``/media/v1/``
  (PR #595)

Bug fixes:

* Fix bug with upgrading guest accounts where it would fail if you opened the
  registration email on a different device (PR #547)
* Fix bug where unread count could be wrong (PR #568)

## Changes in synapse v0.12.1-rc1 (2016-01-29)

Features:

* Add unread notification counts in ``/sync`` (PR #456)
* Add support for inviting 3pids in ``/createRoom`` (PR #460)
* Add ability for guest accounts to upgrade (PR #462)
* Add ``/versions`` API (PR #468)
* Add ``event`` to ``/context`` API (PR #492)
* Add specific error code for invalid user names in ``/register`` (PR #499)
* Add support for push badge counts (PR #507)
* Add support for non-guest users to peek in rooms using ``/events`` (PR #510)

Changes:

* Change ``/sync`` so that guest users only get rooms they've joined (PR #469)
* Change to require unbanning before other membership changes (PR #501)
* Change default push rules to notify for all messages (PR #486)
* Change default push rules to not notify on membership changes (PR #514)
* Change default push rules in one to one rooms to only notify for events that
  are messages (PR #529)
* Change ``/sync`` to reject requests with a ``from`` query param (PR #512)
* Change server manhole to use SSH rather than telnet (PR #473)
* Change server to require AS users to be registered before use (PR #487)
* Change server not to start when ASes are invalidly configured (PR #494)
* Change server to require ID and ``as_token`` to be unique for AS's (PR #496)
* Change maximum pagination limit to 1000 (PR #497)

Bug fixes:

* Fix bug where ``/sync`` didn't return when something under the leave key
  changed (PR #461)
* Fix bug where we returned smaller rather than larger than requested
  thumbnails when ``method=crop`` (PR #464)
* Fix thumbnails API to only return cropped thumbnails when asking for a
  cropped thumbnail (PR #475)
* Fix bug where we occasionally still logged access tokens (PR #477)
* Fix bug where ``/events`` would always return immediately for guest users
  (PR #480)
* Fix bug where ``/sync`` unexpectedly returned old left rooms (PR #481)
* Fix enabling and disabling push rules (PR #498)
* Fix bug where ``/register`` returned 500 when given unicode username
  (PR #513)
