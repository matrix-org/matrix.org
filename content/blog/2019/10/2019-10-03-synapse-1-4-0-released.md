+++
title = "Synapse 1.4.0 released"
path = "/blog/2019/10/03/synapse-1-4-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Wheyhey as I live and breathe 1.4.0 is here!

1.4.0 should be considered ‘The Privacy Release’ and is the cumulation of a huge body of work spanning multiple projects to improve data privacy in the matrix ecosystem. You can read more about the [full project here](https://matrix.org/blog/2019/09/27/privacy-improvements-in-synapse-1-4-and-riot-1-4).

While we consider 1.4.0 to be a huge leap forward in terms of data privacy, it is really important to note that it contains breaking changes.

* If you currently rely on email or SMS delivery via an identity server you must modify your Synapse configuration.
* If you have configured custom templates, then eight new templates must be added to your templates directory.

If either apply to you failure to act will break your installation. Full details can be found in the [upgrade notes](https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst#upgrading-to-v140).

## So what has changed?

It is possible for a user to associate an email address or phone number with their account, for a number of reasons:

* For use when logging in, as an alternative to the user id.
* In the case of email, as an alternative contact to help with account recovery.
* In the case of email, to receive notifications of missed messages.

Before an email address or phone number can be added to a user's account, or before such an address is used to carry out a password-reset, Synapse must confirm the operation with the owner of the email address or phone number. It does this by sending an email or text giving the user a link or token to confirm receipt. This process is known as '3pid verification'. ('3pid', or 'threepid', stands for third-party identifier, and we use it to refer to external identifiers such as email addresses and phone numbers.)

Previous versions of Synapse delegated the task of 3pid verification to an identity server by default. In most cases this server is vector.im or matrix.org.

In Synapse 1.4.0, for security and privacy reasons, the homeserver will no longer delegate this task to an identity server by default. Instead, the server administrator will need to explicitly decide how they would like the verification messages to be sent.

In the medium term, the vector.im and matrix.org identity servers will disable support for delegated 3pid verification entirely. However, in order to ease the transition, they will retain the capability for a limited period. Delegated email verification will be disabled on Monday 2nd December 2019 (giving roughly 2 months notice). Disabling delegated SMS verification will follow some time after that once SMS verification support lands in Synapse.

Once delegated 3pid verification support has been disabled in the vector.im and matrix.org identity servers, all Synapse versions that depend on those instances will be unable to verify email and phone numbers through them. There are no imminent plans to remove delegated 3pid verification from Sydent generally. (Sydent is the identity server project that backs the vector.im and matrix.org instances).

## Why is this necessary?

Prior to 1.4.0, the identity server was providing two related-but-separate functions:

a directory for users to publish their contact details and to look up their contacts by their email addresses and phone numbers.
a "trusted third party communications network delegate", providing SMS- and email-sending functionality to all homeservers for registration and password reset.

The intention behind the identity server's providing 2. was one of convenience: to save homeserver admins the burden of configuring their homeservers to send email, as well as sparing us the effort of writing generic SMS-gateway integration that would allow any homeserver admin to configure their homeserver to send SMS via their chosen SMS aggregator.

By exposing this 'trusted email/sms delegate' functionality, however, and by including references to the New Vector identity servers in the default configuration for both Synapse and Riot, we created a situation in which users on non-New Vector run homeservers (who had never seen our privacy notice) could easily end up sharing their email addresses and phone numbers with a New Vector identity server.

Using identity servers for registration and password reset introduced yet further complexity - since password reset is a sensitive operation, it was important that the homeserver only use 'trusted' identity servers for this purpose (with the trust being configured by the homeserver admin in the homeserver config). But this created ambiguity over who was ultimately responsible for the choice of identity server and when they could make that choice - the client could present a default identity server at login/registration/password reset time, which the user could choose to override before logging in, but unless the identity server ultimately selected were on the homeserver admin's 'trusted identity servers' list, any identity server operations that were proxied via the homeserver would have been blocked by the homeserver. However, not all identity server operations initiated by the client were proxied via the homeserver - some were sent directly from the client to the identity server, and would not have been filtered.

The best way to solve this problem is to have individual homeservers take ownership for their own email and SMS needs. In the case of email this means configuring details of an appropriate SMTP server or continuing to delegate through an identity server that will allow it to do so. If a homeserver admin makes the active choice to use New Vector's identity servers for delegation (up until 1st December), they should make their own users aware through their privacy notice.

This delegation is entirely separate from the user's choice of identity server for user directory services. As of right now the user is free to choose and trust whichever identity server they wish, or to choose not to use an identity server at all.

## Are there any other data privacy features?

Yes, 1.4.0 now [automatically garbage collects redacted messages](https://github.com/matrix-org/synapse/issues/1287) (defaults to 7 days) and removes [unused IP and user agent information](https://github.com/matrix-org/synapse/pull/6098/files) stored in the user_ips table (defaults to 30 days). Finally, Synapse now [warns in its logs](https://github.com/matrix-org/synapse/pull/6090/files) if you are using matrix.org as a trusted key server, in case you wish to use a different server to help discover other servers’ keys.

## Anything else?

Aside from privacy, we’ve expanded our OpenTracing support and fixed a host of bugs. However the thing that is most exciting is switching on our solution for [mitigating forward extremities build up](https://github.com/matrix-org/synapse/issues/5319)’ by default.

In some cases rooms can accumulate ‘forward extremities’, which are simply an artefact of attempting to resolve the room state over multiple servers. Forward extremities are necessary to ensure that each server can independently arrive at the same view of the room eventually, however processing these extremities can be [computationally expensive and degrade server performance overall](https://github.com/matrix-org/synapse/issues/1760).

Originally it was an experimental config option but we now feel confident to turn it on by default for all instances - it should make a big difference for the CPU of servers in fragmented rooms.

So that’s it folks, thanks for making it this far. As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.4.0) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 1.3.1 follows:

## Synapse 1.4.0 (2019-10-03)

### Bugfixes

* Redact `client_secret` in server logs. ([\#6158](https://github.com/matrix-org/synapse/issues/6158))

## Synapse 1.4.0rc2 (2019-10-02)

### Bugfixes

* Fix bug in background update that adds last seen information to the `devices` table, and improve its performance on Postgres. ([\#6135](https://github.com/matrix-org/synapse/issues/6135))
* Fix bad performance of censoring redactions background task. ([\#6141](https://github.com/matrix-org/synapse/issues/6141))
* Fix fetching censored redactions from DB, which caused APIs like initial sync to fail if it tried to include the censored redaction. ([\#6145](https://github.com/matrix-org/synapse/issues/6145))
* Fix exceptions when storing large retry intervals for down remote servers. ([\#6146](https://github.com/matrix-org/synapse/issues/6146))

### Internal Changes

* Fix up sample config entry for `redaction_retention_period` option. ([\#6117](https://github.com/matrix-org/synapse/issues/6117))

## Synapse 1.4.0rc1 (2019-09-26)

Note that this release includes significant changes around 3pid verification. Administrators are reminded to review the [upgrade notes](UPGRADE.rst#upgrading-to-v140).

### Features

* Changes to 3pid verification:
    * Add the ability to send registration emails from the homeserver rather than delegating to an identity server. ([\#5835](https://github.com/matrix-org/synapse/issues/5835), [\#5940](https://github.com/matrix-org/synapse/issues/5940), [\#5993](https://github.com/matrix-org/synapse/issues/5993), [\#5994](https://github.com/matrix-org/synapse/issues/5994), [\#5868](https://github.com/matrix-org/synapse/issues/5868))
    * Replace `trust_identity_server_for_password_resets` config option with `account_threepid_delegates`, and make the `id_server` parameteter optional on `*/requestToken` endpoints, as per [MSC2263](https://github.com/matrix-org/matrix-doc/pull/2263). ([\#5876](https://github.com/matrix-org/synapse/issues/5876), [\#5969](https://github.com/matrix-org/synapse/issues/5969), [\#6028](https://github.com/matrix-org/synapse/issues/6028))
    * Switch to using the v2 Identity Service `/lookup` API where available, with fallback to v1. (Implements [MSC2134](https://github.com/matrix-org/matrix-doc/pull/2134) plus `id_access_token authentication` for v2 Identity Service APIs from [MSC2140](https://github.com/matrix-org/matrix-doc/pull/2140)). ([\#5897](https://github.com/matrix-org/synapse/issues/5897))
    * Remove `bind_email` and `bind_msisdn` parameters from `/register` ala [MSC2140](https://github.com/matrix-org/matrix-doc/pull/2140). ([\#5964](https://github.com/matrix-org/synapse/issues/5964))
    * Add `m.id_access_token` to `unstable_features` in `/versions` as per [MSC2264](https://github.com/matrix-org/matrix-doc/pull/2264). ([\#5974](https://github.com/matrix-org/synapse/issues/5974))
    * Use the v2 Identity Service API for 3PID invites. ([\#5979](https://github.com/matrix-org/synapse/issues/5979))
    * Add `POST /_matrix/client/unstable/account/3pid/unbind` endpoint from [MSC2140](https://github.com/matrix-org/matrix-doc/pull/2140) for unbinding a 3PID from an identity server without removing it from the homeserver user account. ([\#5980](https://github.com/matrix-org/synapse/issues/5980), [\#6062](https://github.com/matrix-org/synapse/issues/6062))
    * Use `account_threepid_delegate.email` and `account_threepid_delegate.msisdn` for validating threepid sessions. ([\#6011](https://github.com/matrix-org/synapse/issues/6011))
    * Allow homeserver to handle or delegate email validation when adding an email to a user's account. ([\#6042](https://github.com/matrix-org/synapse/issues/6042))
    * Implement new Client Server API endpoints `/account/3pid/add` and `/account/3pid/bind` as per [MSC2290](https://github.com/matrix-org/matrix-doc/pull/2290). ([\#6043](https://github.com/matrix-org/synapse/issues/6043))
    * Add an unstable feature flag for separate add/bind 3pid APIs. ([\#6044](https://github.com/matrix-org/synapse/issues/6044))
    * Remove `bind` parameter from Client Server POST `/account` endpoint as per [MSC2290](https://github.com/matrix-org/matrix-doc/pull/2290/). ([\#6067](https://github.com/matrix-org/synapse/issues/6067))
    * Add `POST /add_threepid/msisdn/submit_token` endpoint for proxying submitToken on an `account_threepid_handler`. ([\#6078](https://github.com/matrix-org/synapse/issues/6078))
    * Add `submit_url` response parameter to `*/msisdn/requestToken` endpoints. ([\#6079](https://github.com/matrix-org/synapse/issues/6079))
    * Add `m.require_identity_server` flag to /version's unstable_features. ([\#5972](https://github.com/matrix-org/synapse/issues/5972))
* Enhancements to OpenTracing support:
    * Make OpenTracing work in worker mode. ([\#5771](https://github.com/matrix-org/synapse/issues/5771))
    * Pass OpenTracing contexts between servers when transmitting EDUs. ([\#5852](https://github.com/matrix-org/synapse/issues/5852))
    * OpenTracing for device list updates. ([\#5853](https://github.com/matrix-org/synapse/issues/5853))
    * Add a tag recording a request's authenticated entity and corresponding servlet in OpenTracing. ([\#5856](https://github.com/matrix-org/synapse/issues/5856))
    * Add minimum OpenTracing for client servlets. ([\#5983](https://github.com/matrix-org/synapse/issues/5983))
    * Check at setup that OpenTracing is installed if it's enabled in the config. ([\#5985](https://github.com/matrix-org/synapse/issues/5985))
    * Trace replication send times. ([\#5986](https://github.com/matrix-org/synapse/issues/5986))
    * Include missing OpenTracing contexts in outbout replication requests. ([\#5982](https://github.com/matrix-org/synapse/issues/5982))
    * Fix sending of EDUs when OpenTracing is enabled with an empty whitelist. ([\#5984](https://github.com/matrix-org/synapse/issues/5984))
    * Fix invalid references to None while OpenTracing if the log context slips. ([\#5988](https://github.com/matrix-org/synapse/issues/5988), [\#5991](https://github.com/matrix-org/synapse/issues/5991))
    * OpenTracing for room and e2e keys. ([\#5855](https://github.com/matrix-org/synapse/issues/5855))
    * Add OpenTracing span over HTTP push processing. ([\#6003](https://github.com/matrix-org/synapse/issues/6003))
* Add an admin API to purge old rooms from the database. ([\#5845](https://github.com/matrix-org/synapse/issues/5845))
* Retry well-known lookups if we have recently seen a valid well-known record for the server. ([\#5850](https://github.com/matrix-org/synapse/issues/5850))
* Add support for filtered room-directory search requests over federation ([MSC2197](https://github.com/matrix-org/matrix-doc/pull/2197), in order to allow upcoming room directory query performance improvements. ([\#5859](https://github.com/matrix-org/synapse/issues/5859))
* Correctly retry all hosts returned from SRV when we fail to connect. ([\#5864](https://github.com/matrix-org/synapse/issues/5864))
* Add admin API endpoint for setting whether or not a user is a server administrator. ([\#5878](https://github.com/matrix-org/synapse/issues/5878))
* Enable cleaning up extremities with dummy events by default to prevent undue build up of forward extremities. ([\#5884](https://github.com/matrix-org/synapse/issues/5884))
* Add config option to sign remote key query responses with a separate key. ([\#5895](https://github.com/matrix-org/synapse/issues/5895))
* Add support for config templating. ([\#5900](https://github.com/matrix-org/synapse/issues/5900))
* Users with the type of "support" or "bot" are no longer required to consent. ([\#5902](https://github.com/matrix-org/synapse/issues/5902))
* Let synctl accept a directory of config files. ([\#5904](https://github.com/matrix-org/synapse/issues/5904))
* Increase max display name size to 256. ([\#5906](https://github.com/matrix-org/synapse/issues/5906))
* Add admin API endpoint for getting whether or not a user is a server administrator. ([\#5914](https://github.com/matrix-org/synapse/issues/5914))
* Redact events in the database that have been redacted for a week. ([\#5934](https://github.com/matrix-org/synapse/issues/5934))
* New prometheus metrics:
    * `synapse_federation_known_servers`: represents the total number of servers your server knows about (i.e. is in rooms with), including itself. Enable by setting `metrics_flags.known_servers` to True in the configuration.([\#5981](https://github.com/matrix-org/synapse/issues/5981))
    * `synapse_build_info`: exposes the Python version, OS version, and Synapse version of the running server. ([\#6005](https://github.com/matrix-org/synapse/issues/6005))
* Give appropriate exit codes when synctl fails. ([\#5992](https://github.com/matrix-org/synapse/issues/5992))
* Apply the federation blacklist to requests to identity servers. ([\#6000](https://github.com/matrix-org/synapse/issues/6000))
* Add `report_stats_endpoint` option to configure where stats are reported to, if enabled. Contributed by @Sorunome. ([\#6012](https://github.com/matrix-org/synapse/issues/6012))
* Add config option to increase ratelimits for room admins redacting messages. ([\#6015](https://github.com/matrix-org/synapse/issues/6015))
* Stop sending federation transactions to servers which have been down for a long time. ([\#6026](https://github.com/matrix-org/synapse/issues/6026))
* Make the process for mapping SAML2 users to matrix IDs more flexible. ([\#6037](https://github.com/matrix-org/synapse/issues/6037))
* Return a clearer error message when a timeout occurs when attempting to contact an identity server. ([\#6073](https://github.com/matrix-org/synapse/issues/6073))
* Prevent password reset's submit_token endpoint from accepting trailing slashes. ([\#6074](https://github.com/matrix-org/synapse/issues/6074))
* Return 403 on `/register/available` if registration has been disabled. ([\#6082](https://github.com/matrix-org/synapse/issues/6082))
* Explicitly log when a homeserver does not have the `trusted_key_servers` config field configured. ([\#6090](https://github.com/matrix-org/synapse/issues/6090))
* Add support for pruning old rows in `user_ips` table. ([\#6098](https://github.com/matrix-org/synapse/issues/6098))

### Bugfixes

* Don't create broken room when `power_level_content_override.users` does not contain `creator_id`. ([\#5633](https://github.com/matrix-org/synapse/issues/5633))
* Fix database index so that different backup versions can have the same sessions. ([\#5857](https://github.com/matrix-org/synapse/issues/5857))
* Fix Synapse looking for config options `password_reset_failure_template` and `password_reset_success_template`, when they are actually `password_reset_template_failure_html`, `password_reset_template_success_html`. ([\#5863](https://github.com/matrix-org/synapse/issues/5863))
* Fix stack overflow when recovering an appservice which had an outage. ([\#5885](https://github.com/matrix-org/synapse/issues/5885))
* Fix error message which referred to `public_base_url` instead of `public_baseurl`. Thanks to @aaronraimist for the fix! ([\#5909](https://github.com/matrix-org/synapse/issues/5909))
* Fix 404 for thumbnail download when `dynamic_thumbnails` is `false` and the thumbnail was dynamically generated. Fix reported by rkfg. ([\#5915](https://github.com/matrix-org/synapse/issues/5915))
* Fix a cache-invalidation bug for worker-based deployments. ([\#5920](https://github.com/matrix-org/synapse/issues/5920))
* Fix admin API for listing media in a room not being available with an external media repo. ([\#5966](https://github.com/matrix-org/synapse/issues/5966))
* Fix list media admin API always returning an error. ([\#5967](https://github.com/matrix-org/synapse/issues/5967))
* Fix room and user stats tracking. ([\#5971](https://github.com/matrix-org/synapse/issues/5971), [\#5998](https://github.com/matrix-org/synapse/issues/5998), [\#6029](https://github.com/matrix-org/synapse/issues/6029))
* Return a `M_MISSING_PARAM` if `sid` is not provided to `/account/3pid`. ([\#5995](https://github.com/matrix-org/synapse/issues/5995))
* `federation_certificate_verification_whitelist` now will not cause `TypeErrors` to be raised (a regression in 1.3). Additionally, it now supports internationalised domain names in their non-canonical representation. ([\#5996](https://github.com/matrix-org/synapse/issues/5996))
* Only count real users when checking for auto-creation of auto-join room. ([\#6004](https://github.com/matrix-org/synapse/issues/6004))
* Ensure support users can be registered even if MAU limit is reached. ([\#6020](https://github.com/matrix-org/synapse/issues/6020))
* Fix bug where login error was shown incorrectly on SSO fallback login. ([\#6024](https://github.com/matrix-org/synapse/issues/6024))
* Fix bug in calculating the federation retry backoff period. ([\#6025](https://github.com/matrix-org/synapse/issues/6025))
* Prevent exceptions being logged when extremity-cleanup events fail due to lack of user consent to the terms of service. ([\#6053](https://github.com/matrix-org/synapse/issues/6053))
* Remove POST method from password-reset `submit_token` endpoint until we implement `submit_url` functionality. ([\#6056](https://github.com/matrix-org/synapse/issues/6056))
* Fix logcontext spam on non-Linux platforms. ([\#6059](https://github.com/matrix-org/synapse/issues/6059))
* Ensure query parameters in email validation links are URL-encoded. ([\#6063](https://github.com/matrix-org/synapse/issues/6063))
* Fix a bug which caused SAML attribute maps to be overridden by defaults. ([\#6069](https://github.com/matrix-org/synapse/issues/6069))
* Fix the logged number of updated items for the `users_set_deactivated_flag` background update. ([\#6092](https://github.com/matrix-org/synapse/issues/6092))
* Add `sid` to `next_link` for email validation. ([\#6097](https://github.com/matrix-org/synapse/issues/6097))
* Threepid validity checks on msisdns should not be dependent on `threepid_behaviour_email`. ([\#6104](https://github.com/matrix-org/synapse/issues/6104))
* Ensure that servers which are not configured to support email address verification do not offer it in the registration flows. ([\#6107](https://github.com/matrix-org/synapse/issues/6107))

### Updates to the Docker image

* Avoid changing `UID/GID` if they are already correct. ([\#5970](https://github.com/matrix-org/synapse/issues/5970))
* Provide `SYNAPSE_WORKER` envvar to specify python module. ([\#6058](https://github.com/matrix-org/synapse/issues/6058))

### Improved Documentation

* Convert documentation to markdown (from rst) ([\#5849](https://github.com/matrix-org/synapse/issues/5849))
* Update `INSTALL.md` to say that Python 2 is no longer supported. ([\#5953](https://github.com/matrix-org/synapse/issues/5953))
* Add developer documentation for using SAML2. ([\#6032](https://github.com/matrix-org/synapse/issues/6032))
* Add some notes on rolling back to v1.3.1. ([\#6049](https://github.com/matrix-org/synapse/issues/6049))
* Update the upgrade notes. ([\#6050](https://github.com/matrix-org/synapse/issues/6050))

### Deprecations and Removals

* Remove shared-secret registration from `/_matrix/client/r0/register` endpoint. Contributed by Awesome Technologies Innovationslabor GmbH. ([\#5877](https://github.com/matrix-org/synapse/issues/5877))
* Deprecate the `trusted_third_party_id_servers` option. ([\#5875](https://github.com/matrix-org/synapse/issues/5875))

### Internal Changes

* Lay the groundwork for structured logging output. ([\#5680](https://github.com/matrix-org/synapse/issues/5680))
* Retry well-known lookup before the cache expires, giving a grace period where the remote well-known can be down but we still use the old result. ([\#5844](https://github.com/matrix-org/synapse/issues/5844))
* Remove log line for debugging issue #5407. ([\#5860](https://github.com/matrix-org/synapse/issues/5860))
* Refactor the Appservice scheduler code. ([\#5886](https://github.com/matrix-org/synapse/issues/5886))
* Compatibility with v2 Identity Service APIs other than /lookup. ([\#5892](https://github.com/matrix-org/synapse/issues/5892), [\#6013](https://github.com/matrix-org/synapse/issues/6013))
* Stop populating some unused tables. ([\#5893](https://github.com/matrix-org/synapse/issues/5893), [\#6047](https://github.com/matrix-org/synapse/issues/6047))
* Add missing index on `users_in_public_rooms` to improve the performance of directory queries. ([\#5894](https://github.com/matrix-org/synapse/issues/5894))
* Improve the logging when we have an error when fetching signing keys. ([\#5896](https://github.com/matrix-org/synapse/issues/5896))
* Add support for database engine-specific schema deltas, based on file extension. ([\#5911](https://github.com/matrix-org/synapse/issues/5911))
* Update Buildkite pipeline to use plugins instead of buildkite-agent commands. ([\#5922](https://github.com/matrix-org/synapse/issues/5922))
* Add link in sample config to the logging config schema. ([\#5926](https://github.com/matrix-org/synapse/issues/5926))
* Remove unnecessary parentheses in return statements. ([\#5931](https://github.com/matrix-org/synapse/issues/5931))
* Remove unused `jenkins/prepare_sytest.sh` file. ([\#5938](https://github.com/matrix-org/synapse/issues/5938))
* Move Buildkite pipeline config to the pipelines repo. ([\#5943](https://github.com/matrix-org/synapse/issues/5943))
* Remove unnecessary return statements in the codebase which were the result of a regex run. ([\#5962](https://github.com/matrix-org/synapse/issues/5962))
* Remove left-over methods from v1 registration API. ([\#5963](https://github.com/matrix-org/synapse/issues/5963))
* Cleanup event auth type initialisation. ([\#5975](https://github.com/matrix-org/synapse/issues/5975))
* Clean up dependency checking at setup. ([\#5989](https://github.com/matrix-org/synapse/issues/5989))
* Update OpenTracing docs to use the unified `trace` method. ([\#5776](https://github.com/matrix-org/synapse/issues/5776))
* Small refactor of function arguments and docstrings in`RoomMemberHandler`. ([\#6009](https://github.com/matrix-org/synapse/issues/6009))
* Remove unused `origin` argument on `FederationHandler.add_display_name_to_third_party_invite`. ([\#6010](https://github.com/matrix-org/synapse/issues/6010))
* Add a `failure_ts` column to the `destinations` database table. ([\#6016](https://github.com/matrix-org/synapse/issues/6016), [\#6072](https://github.com/matrix-org/synapse/issues/6072))
* Clean up some code in the retry logic. ([\#6017](https://github.com/matrix-org/synapse/issues/6017))
* Fix the structured logging tests stomping on the global log configuration for subsequent tests. ([\#6023](https://github.com/matrix-org/synapse/issues/6023))
* Clean up the sample config for SAML authentication. ([\#6064](https://github.com/matrix-org/synapse/issues/6064))
* Change mailer logging to reflect Synapse doesn't just do chat notifications by email now. ([\#6075](https://github.com/matrix-org/synapse/issues/6075))
* Move last-seen info into devices table. ([\#6089](https://github.com/matrix-org/synapse/issues/6089))
* Remove unused parameter to `get_user_id_by_threepid`. ([\#6099](https://github.com/matrix-org/synapse/issues/6099))
* Refactor the user-interactive auth handling. ([\#6105](https://github.com/matrix-org/synapse/issues/6105))
* Refactor code for calculating registration flows. ([\#6106](https://github.com/matrix-org/synapse/issues/6106))
