+++
title = "Synapse 1.12.0 released"
path = "/blog/2020/03/23/synapse-1-12-0-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Synapse 1.12.0 is here.

The most important reason to upgrade to 1.12.0 is that it contains performance improvements to boost the efficiency of state resolution in room versions greater than v1 ([\#7095](https://github.com/matrix-org/synapse/issues/7095)).

It also contains an implementation of ([MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432)) designed to limit room alias abuse. The MSC contains the full details, but in short admins now have more control over aliases as they appear on their local server.

There is also plenty of ground work for our master process sharding project. Nothing that can be used today unfortunately, but expect big improvements for worker based deployments over the coming weeks.

Please pay special attention to the security advisory in the changelog, TL;DR make sure your installation is using Twisted 20.3.0.

Also, note that once Synapse 1.13.0 is released, the default branch will change to being `develop` rather than `master`. Again more details follow in the changelog.

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.12.0) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

Changelog since Synapse 1.11.1

## Synapse 1.12.0 (2020-03-23)

No significant changes since 1.12.0rc1.

Debian packages and Docker images are rebuilt using the latest versions of
dependency libraries, including Twisted 20.3.0. **Please see security advisory
below**.

### Security advisory

Synapse may be vulnerable to request-smuggling attacks when it is used with a
reverse-proxy. The vulnerabilities are fixed in Twisted 20.3.0, and are
described in
[CVE-2020-10108](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-10108)
and
[CVE-2020-10109](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-10109).
For a good introduction to this class of request-smuggling attacks, see
<https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn>.

We are not aware of these vulnerabilities being exploited in the wild, and
do not believe that they are exploitable with current versions of any reverse
proxies. Nevertheless, we recommend that all Synapse administrators ensure that
they have the latest versions of the Twisted library to ensure that their
installation remains secure.

* Administrators using the [`matrix.org` Docker
  image](https://hub.docker.com/r/matrixdotorg/synapse/) or the [Debian/Ubuntu
  packages from
  `matrix.org`](https://github.com/matrix-org/synapse/blob/master/INSTALL.md#matrixorg-packages)
  should ensure that they have version 1.12.0 installed: these images include
  Twisted 20.3.0.
* Administrators who have [installed Synapse from
  source](https://github.com/matrix-org/synapse/blob/master/INSTALL.md#installing-from-source)
  should upgrade Twisted within their virtualenv by running:

  ```sh
  <path_to_virtualenv>/bin/pip install 'Twisted>=20.3.0'
  ```

* Administrators who have installed Synapse from distribution packages should
  consult the information from their distributions.

The `matrix.org` Synapse instance was not vulnerable to these vulnerabilities.

### Advance notice of change to the default `git` branch for Synapse

Currently, the default `git` branch for Synapse is `master`, which tracks the
latest release.

After the release of Synapse 1.13.0, we intend to change this default to
`develop`, which is the development tip. This is more consistent with common
practice and modern `git` usage.

Although we try to keep `develop` in a stable state, there may be occasions
where regressions creep in. Developers and distributors who have scripts which
run builds using the default branch of `Synapse` should therefore consider
pinning their scripts to `master`.

## Synapse 1.12.0rc1 (2020-03-19)

### Features

* Changes related to room alias management ([MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432)):
    * Publishing/removing a room from the room directory now requires the user to have a power level capable of modifying the canonical alias, instead of the room aliases. ([\#6965](https://github.com/matrix-org/synapse/issues/6965))
    * Validate the `alt_aliases` property of canonical alias events. ([\#6971](https://github.com/matrix-org/synapse/issues/6971))
    * Users with a power level sufficient to modify the canonical alias of a room can now delete room aliases. ([\#6986](https://github.com/matrix-org/synapse/issues/6986))
    * Implement updated authorization rules and redaction rules for aliases events, from [MSC2261](https://github.com/matrix-org/matrix-doc/pull/2261) and [MSC2432](https://github.com/matrix-org/matrix-doc/pull/2432). ([\#7037](https://github.com/matrix-org/synapse/issues/7037))
    * Stop sending m.room.aliases events during room creation and upgrade. ([\#6941](https://github.com/matrix-org/synapse/issues/6941))
    * Synapse no longer uses room alias events to calculate room names for push notifications. ([\#6966](https://github.com/matrix-org/synapse/issues/6966))
    * The room list endpoint no longer returns a list of aliases. ([\#6970](https://github.com/matrix-org/synapse/issues/6970))
    * Remove special handling of aliases events from [MSC2260](https://github.com/matrix-org/matrix-doc/pull/2260) added in v1.10.0rc1. ([\#7034](https://github.com/matrix-org/synapse/issues/7034))
* Expose the `synctl`, `hash_password` and `generate_config` commands in the snapcraft package. Contributed by @devec0. ([\#6315](https://github.com/matrix-org/synapse/issues/6315))
* Check that server_name is correctly set before running database updates. ([\#6982](https://github.com/matrix-org/synapse/issues/6982))
* Break down monthly active users by `appservice_id` and emit via Prometheus. ([\#7030](https://github.com/matrix-org/synapse/issues/7030))
* Render a configurable and comprehensible error page if something goes wrong during the SAML2 authentication process. ([\#7058](https://github.com/matrix-org/synapse/issues/7058), [\#7067](https://github.com/matrix-org/synapse/issues/7067))
* Add an optional parameter to control whether other sessions are logged out when a user's password is modified. ([\#7085](https://github.com/matrix-org/synapse/issues/7085))
* Add prometheus metrics for the number of active pushers. ([\#7103](https://github.com/matrix-org/synapse/issues/7103), [\#7106](https://github.com/matrix-org/synapse/issues/7106))
* Improve performance when making HTTPS requests to sygnal, sydent, etc, by sharing the SSL context object between connections. ([\#7094](https://github.com/matrix-org/synapse/issues/7094))

### Bugfixes

* When a user's profile is updated via the admin API, also generate a displayname/avatar update for that user in each room. ([\#6572](https://github.com/matrix-org/synapse/issues/6572))
* Fix a couple of bugs in email configuration handling. ([\#6962](https://github.com/matrix-org/synapse/issues/6962))
* Fix an issue affecting worker-based deployments where replication would stop working, necessitating a full restart, after joining a large room. ([\#6967](https://github.com/matrix-org/synapse/issues/6967))
* Fix `duplicate key` error which was logged when rejoining a room over federation. ([\#6968](https://github.com/matrix-org/synapse/issues/6968))
* Prevent user from setting 'deactivated' to anything other than a bool on the v2 PUT /users Admin API. ([\#6990](https://github.com/matrix-org/synapse/issues/6990))
* Fix py35-old CI by using native tox package. ([\#7018](https://github.com/matrix-org/synapse/issues/7018))
* Fix a bug causing `org.matrix.dummy_event` to be included in responses from `/sync`. ([\#7035](https://github.com/matrix-org/synapse/issues/7035))
* Fix a bug that renders UTF-8 text files incorrectly when loaded from media. Contributed by @TheStranjer. ([\#7044](https://github.com/matrix-org/synapse/issues/7044))
* Fix a bug that would cause Synapse to respond with an error about event visibility if a client tried to request the state of a room at a given token. ([\#7066](https://github.com/matrix-org/synapse/issues/7066))
* Repair a data-corruption issue which was introduced in Synapse 1.10, and fixed in Synapse 1.11, and which could cause `/sync` to return with 404 errors about missing events and unknown rooms. ([\#7070](https://github.com/matrix-org/synapse/issues/7070))
* Fix a bug causing account validity renewal emails to be sent even if the feature is turned off in some cases. ([\#7074](https://github.com/matrix-org/synapse/issues/7074))

### Improved Documentation

* Updated CentOS8 install instructions. Contributed by Richard Kellner. ([\#6925](https://github.com/matrix-org/synapse/issues/6925))
* Fix `POSTGRES_INITDB_ARGS` in the `contrib/docker/docker-compose.yml` example docker-compose configuration. ([\#6984](https://github.com/matrix-org/synapse/issues/6984))
* Change date in [https://github.com/matrix-org/synapse/blob/master/INSTALL.md](./INSTALL.md#tls-certificates) for last date of getting TLS certificates to November 2019. ([\#7015](https://github.com/matrix-org/synapse/issues/7015))
* Document that the fallback auth endpoints must be routed to the same worker node as the register endpoints. ([\#7048](https://github.com/matrix-org/synapse/issues/7048))

### Deprecations and Removals

* Remove the unused query_auth federation endpoint per [MSC2451](https://github.com/matrix-org/matrix-doc/pull/2451). ([\#7026](https://github.com/matrix-org/synapse/issues/7026))

### Internal Changes

* Add type hints to `logging/context.py`. ([\#6309](https://github.com/matrix-org/synapse/issues/6309))
* Add some clarifications to `README.md` in the database schema directory. ([\#6615](https://github.com/matrix-org/synapse/issues/6615))
* Refactoring work in preparation for changing the event redaction algorithm. ([\#6874](https://github.com/matrix-org/synapse/issues/6874), [\#6875](https://github.com/matrix-org/synapse/issues/6875), [\#6983](https://github.com/matrix-org/synapse/issues/6983), [\#7003](https://github.com/matrix-org/synapse/issues/7003))
* Improve performance of v2 state resolution for large rooms. ([\#6952](https://github.com/matrix-org/synapse/issues/6952), [\#7095](https://github.com/matrix-org/synapse/issues/7095))
* Reduce time spent doing GC, by freezing objects on startup. ([\#6953](https://github.com/matrix-org/synapse/issues/6953))
* Minor performance fixes to `get_auth_chain_ids`. ([\#6954](https://github.com/matrix-org/synapse/issues/6954))
* Don't record remote cross-signing keys in the `devices` table. ([\#6956](https://github.com/matrix-org/synapse/issues/6956))
* Use flake8-comprehensions to enforce good hygiene of list/set/dict comprehensions. ([\#6957](https://github.com/matrix-org/synapse/issues/6957))
* Merge worker apps together. ([\#6964](https://github.com/matrix-org/synapse/issues/6964), [\#7002](https://github.com/matrix-org/synapse/issues/7002), [\#7055](https://github.com/matrix-org/synapse/issues/7055), [\#7104](https://github.com/matrix-org/synapse/issues/7104))
* Remove redundant `store_room` call from `FederationHandler._process_received_pdu`. ([\#6979](https://github.com/matrix-org/synapse/issues/6979))
* Update warning for incorrect database collation/ctype to include link to documentation. ([\#6985](https://github.com/matrix-org/synapse/issues/6985))
* Add some type annotations to the database storage classes. ([\#6987](https://github.com/matrix-org/synapse/issues/6987))
* Port `synapse.handlers.presence` to async/await. ([\#6991](https://github.com/matrix-org/synapse/issues/6991), [\#7019](https://github.com/matrix-org/synapse/issues/7019))
* Add some type annotations to the federation base & client classes. ([\#6995](https://github.com/matrix-org/synapse/issues/6995))
* Port `synapse.rest.keys` to async/await. ([\#7020](https://github.com/matrix-org/synapse/issues/7020))
* Add a type check to `is_verified` when processing room keys. ([\#7045](https://github.com/matrix-org/synapse/issues/7045))
* Add type annotations and comments to the auth handler. ([\#7063](https://github.com/matrix-org/synapse/issues/7063))
