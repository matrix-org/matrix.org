+++
title = "Dendrite 0.3.0 released"
date = "2020-11-16T17:44:46Z"
path = "/blog/2020/11/16/dendrite-0-3-0-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]
+++

Hi all,

Heads up that we just cut another beta release of Dendrite - now at 0.3.0!

This is a really fun release given almost all the changes are contributed from
the wider community - so huge thanks to [S7evinK](https://github.com/S7evinK),
[MayeulC](https://github.com/MayeulC) and [felix](https://github.com/felix)!

The main new feature is full Read Receipt support thanks to S7evinK, which
makes an enormous perceptual improvement when using Dendrite - so especial
thanks are due there :)

So, if you're interested in helping us test, please spin up a copy from
<https://github.com/matrix-org/dendrite> and let us know how it goes - and if you're
already running one, now is an excellent time to upgrade!

Full changelog (including 0.2.1, which we forgot to blog about) follows:

## Dendrite 0.3.0 (2020-11-16)

### Features

* Read receipts (both inbound and outbound) are now supported (contributed by [S7evinK](https://github.com/S7evinK))
* Forgetting rooms is now supported (contributed by [S7evinK](https://github.com/S7evinK))
* The `-version` command line flag has been added (contributed by [S7evinK](https://github.com/S7evinK))

### Fixes

* User accounts that contain the `=` character can now be registered
* Backfilling should now work properly on rooms with world-readable history visibility (contributed by [MayeulC](https://github.com/MayeulC))
* The `gjson` dependency has been updated for correct JSON integer ranges
* Some more client event fields have been marked as omit-when-empty (contributed by [S7evinK](https://github.com/S7evinK))
* The `build.sh` script has been updated to work properly on all POSIX platforms (contributed by [felix](https://github.com/felix))

## Dendrite 0.2.1 (2020-10-22)

### Fixes

* Forward extremities are now calculated using only references from other extremities, rather than including outliers, which should fix cases where state can become corrupted ([#1556](https://github.com/matrix-org/dendrite/pull/1556))
* Old state events will no longer be processed by the sync API as new, which should fix some cases where clients incorrectly believe they have joined or left rooms ([#1548](https://github.com/matrix-org/dendrite/pull/1548))
* More SQLite database locking issues have been resolved in the latest events updater ([#1554](https://github.com/matrix-org/dendrite/pull/1554))
* Internal HTTP API calls are now made using H2C (HTTP/2) in polylith mode, mitigating some potential head-of-line blocking issues ([#1541](https://github.com/matrix-org/dendrite/pull/1541))
* Roomserver output events no longer incorrectly flag state rewrites ([#1557](https://github.com/matrix-org/dendrite/pull/1557))
* Notification levels are now parsed correctly in power level events ([gomatrixserverlib#228](https://github.com/matrix-org/gomatrixserverlib/pull/228), contributed by [Pestdoktor](https://github.com/Pestdoktor))
* Invalid UTF-8 is now correctly rejected when making federation requests ([gomatrixserverlib#229](https://github.com/matrix-org/gomatrixserverlib/pull/229), contributed by [Pestdoktor](https://github.com/Pestdoktor))
