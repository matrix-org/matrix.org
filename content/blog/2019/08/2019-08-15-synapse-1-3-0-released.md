+++
title = "Synapse 1.3.0 released"
path = "/blog/2019/08/15/synapse-1-3-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]

[extra]
image = "https://matrix.org/blog/img/2019-08-15-message-send.png"
+++

Well now, Synapse 1.3.0 is here.

The main thing to know about 1.3.0 is that is contains performance improvements to reduce disk I/O and reduce RAM usage. We’ve been running it on matrix.org for a week or so and are really pleased with the results.

Check out our message send heat map.

![Message Send](/blog/img/2019-08-15-message-send.png)

Other than that there are a bunch of bug fixes and tweaks to generally make things run more smoothly.

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.3.0) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 1.2.1 follows:

## Synapse 1.3.0 (2019-08-15)

### Bugfixes

- Fix 500 Internal Server Error on `publicRooms` when the public room list was
  cached. ([\#5851](https://github.com/matrix-org/synapse/issues/5851))

## Synapse 1.3.0rc1 (2019-08-13)

### Features

- Use `M_USER_DEACTIVATED` instead of `M_UNKNOWN` for errcode when a deactivated user attempts to login. ([\#5686](https://github.com/matrix-org/synapse/issues/5686))
- Add sd_notify hooks to ease systemd integration and allows usage of Type=Notify. ([\#5732](https://github.com/matrix-org/synapse/issues/5732))
- Synapse will no longer serve any media repo admin endpoints when `enable_media_repo` is set to False in the configuration. If a media repo worker is used, the admin APIs relating to the media repo will be served from it instead. ([\#5754](https://github.com/matrix-org/synapse/issues/5754), [\#5848](https://github.com/matrix-org/synapse/issues/5848))
- Synapse can now be configured to not join remote rooms of a given "complexity" (currently, state events) over federation. This option can be used to prevent adverse performance on resource-constrained homeservers. ([\#5783](https://github.com/matrix-org/synapse/issues/5783))
- Allow defining HTML templates to serve the user on account renewal attempt when using the account validity feature. ([\#5807](https://github.com/matrix-org/synapse/issues/5807))

### Bugfixes

- Fix UISIs during homeserver outage. ([\#5693](https://github.com/matrix-org/synapse/issues/5693), [\#5789](https://github.com/matrix-org/synapse/issues/5789))
- Fix stack overflow in server key lookup code. ([\#5724](https://github.com/matrix-org/synapse/issues/5724))
- start.sh no longer uses deprecated cli option. ([\#5725](https://github.com/matrix-org/synapse/issues/5725))
- Log when we receive an event receipt from an unexpected origin. ([\#5743](https://github.com/matrix-org/synapse/issues/5743))
- Fix debian packaging scripts to correctly build sid packages. ([\#5775](https://github.com/matrix-org/synapse/issues/5775))
- Correctly handle redactions of redactions. ([\#5788](https://github.com/matrix-org/synapse/issues/5788))
- Return 404 instead of 403 when accessing /rooms/{roomId}/event/{eventId} for an event without the appropriate permissions. ([\#5798](https://github.com/matrix-org/synapse/issues/5798))
- Fix check that tombstone is a state event in push rules. ([\#5804](https://github.com/matrix-org/synapse/issues/5804))
- Fix error when trying to login as a deactivated user when using a worker to handle login. ([\#5806](https://github.com/matrix-org/synapse/issues/5806))
- Fix bug where user `/sync` stream could get wedged in rare circumstances. ([\#5825](https://github.com/matrix-org/synapse/issues/5825))
- The purge_remote_media.sh script was fixed. ([\#5839](https://github.com/matrix-org/synapse/issues/5839))

### Deprecations and Removals

- Synapse now no longer accepts the `-v`/`--verbose`, `-f`/`--log-file`, or `--log-config` command line flags, and removes the deprecated `verbose` and `log_file` configuration file options. Users of these options should migrate their options into the dedicated log configuration. ([\#5678](https://github.com/matrix-org/synapse/issues/5678), [\#5729](https://github.com/matrix-org/synapse/issues/5729))
- Remove non-functional 'expire_access_token' setting. ([\#5782](https://github.com/matrix-org/synapse/issues/5782))

### Internal Changes

- Make Jaeger fully configurable. ([\#5694](https://github.com/matrix-org/synapse/issues/5694))
- Add precautionary measures to prevent future abuse of `window.opener` in default welcome page. ([\#5695](https://github.com/matrix-org/synapse/issues/5695))
- Reduce database IO usage by optimising queries for current membership. ([\#5706](https://github.com/matrix-org/synapse/issues/5706), [\#5738](https://github.com/matrix-org/synapse/issues/5738), [\#5746](https://github.com/matrix-org/synapse/issues/5746), [\#5752](https://github.com/matrix-org/synapse/issues/5752), [\#5770](https://github.com/matrix-org/synapse/issues/5770), [\#5774](https://github.com/matrix-org/synapse/issues/5774), [\#5792](https://github.com/matrix-org/synapse/issues/5792), [\#5793](https://github.com/matrix-org/synapse/issues/5793))
- Improve caching when fetching `get_filtered_current_state_ids`. ([\#5713](https://github.com/matrix-org/synapse/issues/5713))
- Don't accept opentracing data from clients. ([\#5715](https://github.com/matrix-org/synapse/issues/5715))
- Speed up PostgreSQL unit tests in CI. ([\#5717](https://github.com/matrix-org/synapse/issues/5717))
- Update the coding style document. ([\#5719](https://github.com/matrix-org/synapse/issues/5719))
- Improve database query performance when recording retry intervals for remote hosts. ([\#5720](https://github.com/matrix-org/synapse/issues/5720))
- Add a set of opentracing utils. ([\#5722](https://github.com/matrix-org/synapse/issues/5722))
- Cache result of get_version_string to reduce overhead of `/version` federation requests. ([\#5730](https://github.com/matrix-org/synapse/issues/5730))
- Return 'user_type' in admin API user endpoints results. ([\#5731](https://github.com/matrix-org/synapse/issues/5731))
- Don't package the sytest test blacklist file. ([\#5733](https://github.com/matrix-org/synapse/issues/5733))
- Replace uses of returnValue with plain return, as returnValue is not needed on Python 3. ([\#5736](https://github.com/matrix-org/synapse/issues/5736))
- Blacklist some flakey tests in worker mode. ([\#5740](https://github.com/matrix-org/synapse/issues/5740))
- Fix some error cases in the caching layer. ([\#5749](https://github.com/matrix-org/synapse/issues/5749))
- Add a prometheus metric for pending cache lookups. ([\#5750](https://github.com/matrix-org/synapse/issues/5750))
- Stop trying to fetch events with event_id=None. ([\#5753](https://github.com/matrix-org/synapse/issues/5753))
- Convert RedactionTestCase to modern test style. ([\#5768](https://github.com/matrix-org/synapse/issues/5768))
- Allow looping calls to be given arguments. ([\#5780](https://github.com/matrix-org/synapse/issues/5780))
- Set the logs emitted when checking typing and presence timeouts to DEBUG level, not INFO. ([\#5785](https://github.com/matrix-org/synapse/issues/5785))
- Remove DelayedCall debugging from the test suite, as it is no longer required in the vast majority of Synapse's tests. ([\#5787](https://github.com/matrix-org/synapse/issues/5787))
- Remove some spurious exceptions from the logs where we failed to talk to a remote server. ([\#5790](https://github.com/matrix-org/synapse/issues/5790))
- Improve performance when making `.well-known` requests by sharing the SSL options between requests. ([\#5794](https://github.com/matrix-org/synapse/issues/5794))
- Disable codecov GitHub comments on PRs. ([\#5796](https://github.com/matrix-org/synapse/issues/5796))
- Don't allow clients to send tombstone events that reference the room it's sent in. ([\#5801](https://github.com/matrix-org/synapse/issues/5801))
- Deny redactions of events sent in a different room. ([\#5802](https://github.com/matrix-org/synapse/issues/5802))
- Deny sending well known state types as non-state events. ([\#5805](https://github.com/matrix-org/synapse/issues/5805))
- Handle incorrectly encoded query params correctly by returning a 400. ([\#5808](https://github.com/matrix-org/synapse/issues/5808))
- Handle pusher being deleted during processing rather than logging an exception. ([\#5809](https://github.com/matrix-org/synapse/issues/5809))
- Return 502 not 500 when failing to reach any remote server. ([\#5810](https://github.com/matrix-org/synapse/issues/5810))
- Reduce global pauses in the events stream caused by expensive state resolution during persistence. ([\#5826](https://github.com/matrix-org/synapse/issues/5826))
- Add a lower bound to well-known lookup cache time to avoid repeated lookups. ([\#5836](https://github.com/matrix-org/synapse/issues/5836))
- Whitelist history visibility sytests in worker mode tests. ([\#5843](https://github.com/matrix-org/synapse/issues/5843))
