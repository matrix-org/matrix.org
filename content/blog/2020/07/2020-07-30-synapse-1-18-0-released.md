+++
title = "Synapse 1.18.0 released"
date = "2020-07-30T18:34:09Z"
path = "/blog/2020/07/30/synapse-1-18-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.18.0 has landed.

The most important thing to know about 1.18.0 is that it contains support for sharding multiple workers. Specifically this means being able to run multiple federation senders, multiple client readers to handle registration and multiple push workers. This will be important for anyone running a large scale install of Synapse. You can read more about how to benefit from these changes in [docs/workers.md](https://github.com/matrix-org/synapse/blob/develop/docs/workers.md). In the same spirit we also moved typing notifications from the main process.

Aside from that, we have new admin API support to list the users in a room, support for oEmbed for media previews (you can unfurl tweets again!) and a general slew of federation bug fixes.

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.18.0 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.18.0).

Changelog for 1.18.0 follows:

## Synapse 1.18.0 (2020-07-30)

### Improved Documentation

- Update worker docs with latest enhancements. ([\#7969](https://github.com/matrix-org/synapse/issues/7969))

## Synapse 1.18.0rc2 (2020-07-28)

### Bugfixes

- Fix an `AssertionError` exception introduced in v1.18.0rc1. ([\#7876](https://github.com/matrix-org/synapse/issues/7876))
- Fix experimental support for moving typing off master when worker is restarted, which is broken in v1.18.0rc1. ([\#7967](https://github.com/matrix-org/synapse/issues/7967))

### Internal Changes

- Further optimise queueing of inbound replication commands. ([\#7876](https://github.com/matrix-org/synapse/issues/7876))

## Synapse 1.18.0rc1 (2020-07-27)

### Features

- Include room states on invite events that are sent to application services. Contributed by @Sorunome. ([\#6455](https://github.com/matrix-org/synapse/issues/6455))
- Add delete room admin endpoint (`POST /_synapse/admin/v1/rooms/<room_id>/delete`). Contributed by @dklimpel. ([\#7613](https://github.com/matrix-org/synapse/issues/7613), [\#7953](https://github.com/matrix-org/synapse/issues/7953))
- Add experimental support for running multiple federation sender processes. ([\#7798](https://github.com/matrix-org/synapse/issues/7798))
- Add the option to validate the `iss` and `aud` claims for JWT logins. ([\#7827](https://github.com/matrix-org/synapse/issues/7827))
- Add support for handling registration requests across multiple client reader workers. ([\#7830](https://github.com/matrix-org/synapse/issues/7830))
- Add an admin API to list the users in a room. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#7842](https://github.com/matrix-org/synapse/issues/7842))
- Allow email subjects to be customised through Synapse's configuration. ([\#7846](https://github.com/matrix-org/synapse/issues/7846))
- Add the ability to re-activate an account from the admin API. ([\#7847](https://github.com/matrix-org/synapse/issues/7847), [\#7908](https://github.com/matrix-org/synapse/issues/7908))
- Add experimental support for running multiple pusher workers. ([\#7855](https://github.com/matrix-org/synapse/issues/7855))
- Add experimental support for moving typing off master. ([\#7869](https://github.com/matrix-org/synapse/issues/7869), [\#7959](https://github.com/matrix-org/synapse/issues/7959))
- Report CPU metrics to prometheus for time spent processing replication commands. ([\#7879](https://github.com/matrix-org/synapse/issues/7879))
- Support oEmbed for media previews. ([\#7920](https://github.com/matrix-org/synapse/issues/7920))
- Abort federation requests where the client disconnects before the ratelimiter expires. ([\#7930](https://github.com/matrix-org/synapse/issues/7930))
- Cache responses to `/_matrix/federation/v1/state_ids` to reduce duplicated work. ([\#7931](https://github.com/matrix-org/synapse/issues/7931))

### Bugfixes

- Fix detection of out of sync remote device lists when receiving events from remote users. ([\#7815](https://github.com/matrix-org/synapse/issues/7815))
- Fix bug where Synapse fails to process an incoming event over federation if the server is missing too much of the event's auth chain. ([\#7817](https://github.com/matrix-org/synapse/issues/7817))
- Fix a bug causing Synapse to misinterpret the value `off` for `encryption_enabled_by_default_for_room_type` in its configuration file(s) if that value isn't surrounded by quotes. This bug was introduced in v1.16.0. ([\#7822](https://github.com/matrix-org/synapse/issues/7822))
- Fix bug where we did not always pass in `app_name` or `server_name` to email templates, including e.g. for registration emails. ([\#7829](https://github.com/matrix-org/synapse/issues/7829))
- Errors which occur while using the non-standard JWT login now return the proper error: `403 Forbidden` with an error code of `M_FORBIDDEN`. ([\#7844](https://github.com/matrix-org/synapse/issues/7844))
- Fix "AttributeError: 'str' object has no attribute 'get'" error message when applying per-room message retention policies. The bug was introduced in Synapse 1.7.0. ([\#7850](https://github.com/matrix-org/synapse/issues/7850))
- Fix a bug introduced in Synapse 1.10.0 which could cause a "no create event in auth events" error during room creation. ([\#7854](https://github.com/matrix-org/synapse/issues/7854))
- Fix a bug which allowed empty rooms to be rejoined over federation. ([\#7859](https://github.com/matrix-org/synapse/issues/7859))
- Fix 'Unable to find a suitable guest user ID' error when using multiple client_reader workers. ([\#7866](https://github.com/matrix-org/synapse/issues/7866))
- Fix a long standing bug where the tracing of async functions with opentracing was broken. ([\#7872](https://github.com/matrix-org/synapse/issues/7872), [\#7961](https://github.com/matrix-org/synapse/issues/7961))
- Fix "TypeError in `synapse.notifier`" exceptions. ([\#7880](https://github.com/matrix-org/synapse/issues/7880))
- Fix deprecation warning due to invalid escape sequences. ([\#7895](https://github.com/matrix-org/synapse/issues/7895))

### Updates to the Docker image

- Base docker image on Debian Buster rather than Alpine Linux. Contributed by @maquis196. ([\#7839](https://github.com/matrix-org/synapse/issues/7839))

### Improved Documentation

- Provide instructions on using `register_new_matrix_user` via docker. ([\#7885](https://github.com/matrix-org/synapse/issues/7885))
- Change the sample config postgres user section to use `synapse_user` instead of `synapse` to align with the documentation. ([\#7889](https://github.com/matrix-org/synapse/issues/7889))
- Reorder database paragraphs to promote postgres over sqlite. ([\#7933](https://github.com/matrix-org/synapse/issues/7933))
- Update the dates of ACME v1's end of life in [`ACME.md`](https://github.com/matrix-org/synapse/blob/master/docs/ACME.md). ([\#7934](https://github.com/matrix-org/synapse/issues/7934))

### Deprecations and Removals

- Remove unused `synapse_replication_tcp_resource_invalidate_cache` prometheus metric. ([\#7878](https://github.com/matrix-org/synapse/issues/7878))
- Remove Ubuntu Eoan from the list of `.deb` packages that we build as it is now end-of-life. Contributed by @gary-kim. ([\#7888](https://github.com/matrix-org/synapse/issues/7888))

### Internal Changes

- Switch parts of the codebase from `simplejson` to the standard library `json`. ([\#7802](https://github.com/matrix-org/synapse/issues/7802))
- Add type hints to the http server code and remove an unused parameter. ([\#7813](https://github.com/matrix-org/synapse/issues/7813))
- Add type hints to synapse.api.errors module. ([\#7820](https://github.com/matrix-org/synapse/issues/7820))
- Ensure that calls to `json.dumps` are compatible with the standard library json. ([\#7836](https://github.com/matrix-org/synapse/issues/7836))
- Remove redundant `retry_on_integrity_error` wrapper for event persistence code. ([\#7848](https://github.com/matrix-org/synapse/issues/7848))
- Consistently use `db_to_json` to convert from database values to JSON objects. ([\#7849](https://github.com/matrix-org/synapse/issues/7849))
- Convert various parts of the codebase to async/await. ([\#7851](https://github.com/matrix-org/synapse/issues/7851), [\#7860](https://github.com/matrix-org/synapse/issues/7860), [\#7868](https://github.com/matrix-org/synapse/issues/7868), [\#7871](https://github.com/matrix-org/synapse/issues/7871), [\#7873](https://github.com/matrix-org/synapse/issues/7873), [\#7874](https://github.com/matrix-org/synapse/issues/7874), [\#7884](https://github.com/matrix-org/synapse/issues/7884), [\#7912](https://github.com/matrix-org/synapse/issues/7912), [\#7935](https://github.com/matrix-org/synapse/issues/7935), [\#7939](https://github.com/matrix-org/synapse/issues/7939), [\#7942](https://github.com/matrix-org/synapse/issues/7942), [\#7944](https://github.com/matrix-org/synapse/issues/7944))
- Add support for handling registration requests across multiple client reader workers. ([\#7853](https://github.com/matrix-org/synapse/issues/7853))
- Small performance improvement in typing processing. ([\#7856](https://github.com/matrix-org/synapse/issues/7856))
- The default value of `filter_timeline_limit` was changed from -1 (no limit) to 100. ([\#7858](https://github.com/matrix-org/synapse/issues/7858))
- Optimise queueing of inbound replication commands. ([\#7861](https://github.com/matrix-org/synapse/issues/7861))
- Add some type annotations to `HomeServer` and `BaseHandler`. ([\#7870](https://github.com/matrix-org/synapse/issues/7870))
- Clean up `PreserveLoggingContext`. ([\#7877](https://github.com/matrix-org/synapse/issues/7877))
- Change "unknown room version" logging from 'error' to 'warning'. ([\#7881](https://github.com/matrix-org/synapse/issues/7881))
- Stop using `device_max_stream_id` table and just use `device_inbox.stream_id`. ([\#7882](https://github.com/matrix-org/synapse/issues/7882))
- Return an empty body for OPTIONS requests. ([\#7886](https://github.com/matrix-org/synapse/issues/7886))
- Fix typo in generated config file. Contributed by @ThiefMaster. ([\#7890](https://github.com/matrix-org/synapse/issues/7890))
- Import ABC from `collections.abc` for Python 3.10 compatibility. ([\#7892](https://github.com/matrix-org/synapse/issues/7892))
- Remove unused functions `time_function`, `trace_function`, `get_previous_frames`
  and `get_previous_frame` from `synapse.logging.utils` module. ([\#7897](https://github.com/matrix-org/synapse/issues/7897))
- Lint the `contrib/` directory in CI and linting scripts, add `synctl` to the linting script for consistency with CI. ([\#7914](https://github.com/matrix-org/synapse/issues/7914))
- Use Element CSS and logo in notification emails when app name is Element. ([\#7919](https://github.com/matrix-org/synapse/issues/7919))
- Optimisation to /sync handling: skip serializing the response if the client has already disconnected. ([\#7927](https://github.com/matrix-org/synapse/issues/7927))
- When a client disconnects, don't log it as 'Error processing request'. ([\#7928](https://github.com/matrix-org/synapse/issues/7928))
- Add debugging to `/sync` response generation (disabled by default). ([\#7929](https://github.com/matrix-org/synapse/issues/7929))
- Update comments that refer to Deferreds for async functions. ([\#7945](https://github.com/matrix-org/synapse/issues/7945))
- Simplify error handling in federation handler. ([\#7950](https://github.com/matrix-org/synapse/issues/7950))
