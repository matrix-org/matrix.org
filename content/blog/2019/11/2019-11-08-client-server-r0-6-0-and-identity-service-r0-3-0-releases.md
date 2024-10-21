+++
title = "Client-server r0.6.0 and Identity Service r0.3.0 releases"
path = "/blog/2019/11/08/client-server-r0-6-0-and-identity-service-r0-3-0-releases"

[taxonomies]
author = ["Travis Ralston"]
category = ["Releases", "Spec"]
+++

Hey all,

For the last several months the team has been working on [tightening up privacy in Matrix](https://matrix.org/blog/2019/06/30/tightening-up-privacy-in-matrix), and with the [1.4 release of Synapse and Riot](https://matrix.org/blog/2019/09/27/privacy-improvements-in-synapse-1-4-and-riot-1-4) quite a lot has been done in the area. One of the remaining pieces was to release all the specification changes to help other client/server implementations achieve the same goals, and now we've done that.

The [Client-Server r0.6.0](https://matrix.org/docs/spec/client_server/r0.6.0) and [Identity Service r0.3.0](https://matrix.org/docs/spec/identity_service/r0.3.0) spec releases both cover the privacy improvements added through a number of MSCs in the last few months. Of particular note is that identity servers are now expected to support terms of service endpoints, which requires authentication that clients might need to worry about - check the spec changelogs for details.

The full changelog for the Client-Server r0.6.0 release is:

* Breaking Changes

    * Add `id_access_token` as a required request parameter to a few
    endpoints which require an `id_server` parameter as part of
    [MSC2140](https://github.com/matrix-org/matrix-doc/pull/2140).
    ([\#2255](https://github.com/matrix-org/matrix-doc/issues/2255))

* New Endpoints

    * Add `POST /account/3pid/unbind` for removing a 3PID from an identity
    server.
    ([\#2282](https://github.com/matrix-org/matrix-doc/issues/2282))

* Backwards Compatible Changes

    * Add `M_USER_DEACTIVATED` error code.
    ([\#2234](https://github.com/matrix-org/matrix-doc/issues/2234))
    * Remove `bind_msisdn` and `bind_email` from `/register` now that the
    identity server's bind endpoint requires authentication.
    ([\#2279](https://github.com/matrix-org/matrix-doc/issues/2279))
    * Add `m.identity_server` account data for tracking the user's
    preferred identity server.
    ([\#2281](https://github.com/matrix-org/matrix-doc/issues/2281))
    * Deprecate `id_server` and make it optional in several places.
    ([\#2310](https://github.com/matrix-org/matrix-doc/issues/2310))

* Spec Clarifications

    * Add missing format fields to `m.room.message$m.notice` schema.
    ([\#2125](https://github.com/matrix-org/matrix-doc/issues/2125))
    * Remove "required" designation from the `url` field of certain
    `m.room.message` msgtypes.
    ([\#2129](https://github.com/matrix-org/matrix-doc/issues/2129))
    * Fix various typos throughout the specification.
    ([\#2131](https://github.com/matrix-org/matrix-doc/issues/2131),
    [\#2136](https://github.com/matrix-org/matrix-doc/issues/2136),
    [\#2148](https://github.com/matrix-org/matrix-doc/issues/2148),
    [\#2215](https://github.com/matrix-org/matrix-doc/issues/2215))
    * Clarify the distinction between `m.key.verification.start` and its
    `m.sas.v1` variant.
    ([\#2132](https://github.com/matrix-org/matrix-doc/issues/2132))
    * Fix link to Olm signing specification.
    ([\#2133](https://github.com/matrix-org/matrix-doc/issues/2133))
    * Clarify the conditions for the `.m.rule.room_one_to_one` push rule.
    ([\#2152](https://github.com/matrix-org/matrix-doc/issues/2152))
    * Clarify the encryption algorithms supported by the device of the
    device keys example.
    ([\#2157](https://github.com/matrix-org/matrix-doc/issues/2157))
    * Clarify that `/rooms/:roomId/event/:eventId` returns a Matrix error.
    ([\#2204](https://github.com/matrix-org/matrix-doc/issues/2204))
    * Add a missing `state_key` check on `.m.rule.tombstone`.
    ([\#2223](https://github.com/matrix-org/matrix-doc/issues/2223))
    * Fix the `m.room_key_request` `action` value, setting it from
    `cancel_request` to `request_cancellation`.
    ([\#2247](https://github.com/matrix-org/matrix-doc/issues/2247))
    * Clarify that the `submit_url` field is without authentication.
    ([\#2341](https://github.com/matrix-org/matrix-doc/issues/2341))
    * Clarify the expected phone number format.
    ([\#2342](https://github.com/matrix-org/matrix-doc/issues/2342))
    * Clarify that clients should consider not requesting URL previews in
    encrypted rooms.
    ([\#2343](https://github.com/matrix-org/matrix-doc/issues/2343))
    * Add missing information on how filters are meant to work with
    `/context`.
    ([\#2344](https://github.com/matrix-org/matrix-doc/issues/2344))
    * Clarify what the keys are for rooms in `/sync`.
    ([\#2345](https://github.com/matrix-org/matrix-doc/issues/2345))

The full changelog for the Identity Service r0.3.0 release is:

* New Endpoints

    * Add `/account`, `/account/register`, and `/account/logout` to
    authenticate with the identity server.
    ([\#2255](https://github.com/matrix-org/matrix-doc/issues/2255))
    * Add endpoints for accepting and handling terms of service.
    ([\#2258](https://github.com/matrix-org/matrix-doc/issues/2258))
    * Add `/hash_details` and a new `/lookup` endpoint for performing
    hashed association lookups.
    ([\#2287](https://github.com/matrix-org/matrix-doc/issues/2287))

* Backwards Compatible Changes

    * Deprecate the v1 API in favour of an authenticated v2 API.
    ([\#2254](https://github.com/matrix-org/matrix-doc/issues/2254))
