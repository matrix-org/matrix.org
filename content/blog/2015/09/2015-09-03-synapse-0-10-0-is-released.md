+++
title = "Synapse 0.10.0 is released!!"
path = "/blog/2015/09/03/synapse-0-10-0-is-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi folks,

Whilst the blog has been a bit quiet, we've actually had an incredibly busy summer refining Synapse, building the new matrix-react-sdk and example apps, building an entirely new matrix-appservice-bridge framework for rapidly creating Matrix<->other-protocol bridges, getting end-to-end encryption ready for primetime and lots more fun stuff as we keep chipping away to take Matrix out of beta.  We'll write about all of these once they're ready, but right now the big news is that after 6 release candidates we have a major new update for Synapse out today - version 0.10.0.  This also includes 0.9.4, which we never quite got around to releasing and ended up skipping from 0.9.4-rc1 straight to 0.10.0-rc1.

The release focuses mainly on performance, bugfixes, and infrastructure work to support forthcoming features like end-to-end encryption, read receipts, etc.  Some of the more exciting new features include preset ACLs for room creation; history visibility ACLs; SAML2 single-sign-on login (courtesy of Ericsson, thanks guys!), filename support when sending files, support for specifying a canonical alias for a room, support for intermediary SSL certificates, etc.

The full changelog is below.

To upgrade, go read <a href="https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst">https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst</a> - to install for the first time, go to <a href="https://github.com/matrix-org/synapse/blob/master/README.rst">https://github.com/matrix-org/synapse/blob/master/README.rst</a>.

## Changes in synapse v0.10.0 (2015-09-03)

No change from release candidate.

## Changes in synapse v0.10.0-rc6 (2015-09-02)

* Remove some of the old database upgrade scripts.
* Fix database port script to work with newly created sqlite databases.

## Changes in synapse v0.10.0-rc5 (2015-08-27)

* Fix bug that broke downloading files with ascii filenames across federation.

## Changes in synapse v0.10.0-rc4 (2015-08-27)

* Allow UTF-8 filenames for upload. (PR #259)

## Changes in synapse v0.10.0-rc3 (2015-08-25)

* Add ``--keys-directory`` config option to specify where files such as
  certs and signing keys should be stored in, when using ``--generate-config``
  or ``--generate-keys``. (PR #250)
* Allow ``--config-path`` to specify a directory, causing synapse to use all
  \\*.yaml files in the directory as config files. (PR #249)
* Add ``web_client_location`` config option to specify static files to be
  hosted by synapse under ``/_matrix/client``. (PR #245)
* Add helper utility to synapse to read and parse the config files and extract
  the value of a given key. For example::

  ```bash
    $ python -m synapse.config read server_name -c homeserver.yaml
    localhost
  ```

  (PR #246)

## Changes in synapse v0.10.0-rc2 (2015-08-24)

* Fix bug where we incorrectly populated the ``event_forward_extremities``
  table, resulting in problems joining large remote rooms (e.g.
  ``#matrix:matrix.org``)
* Reduce the number of times we wake up pushers by not listening for presence
  or typing events, reducing the CPU cost of each pusher.

## Changes in synapse v0.10.0-rc1 (2015-08-21)

Also see v0.9.4-rc1 changelog, which has been amalgamated into this release.

General:

* Upgrade to Twisted 15 (PR #173)
* Add support for serving and fetching encryption keys over federation.
  (PR #208)
* Add support for logging in with email address (PR #234)
* Add support for new ``m.room.canonical_alias`` event. (PR #233)
* Change synapse to treat user IDs case insensitively during registration and
  login. (If two users already exist with case insensitive matching user ids,
  synapse will continue to require them to specify their user ids exactly.)
* Error if a user tries to register with an email already in use. (PR #211)
* Add extra and improve existing caches  (PR #212, #219, #226, #228)
* Batch various storage request (PR #226, #228)
* Fix bug where we didn't correctly log the entity that triggered the request
  if the request came in via an application service (PR #230)
* Fix bug where we needlessly regenerated the full list of rooms an AS is
  interested in. (PR #232)
* Add support for AS's to use v2_alpha registration API (PR #210)

Configuration:

* Add ``--generate-keys`` that will generate any missing cert and key files in
  the configuration files. This is equivalent to running ``--generate-config``
  on an existing configuration file. (PR #220)
* ``--generate-config`` now no longer requires a ``--server-name`` parameter
  when used on existing configuration files. (PR #220)
* Add ``--print-pidfile`` flag that controls the printing of the pid to stdout
  of the demonised process. (PR #213)

Media Repository:

* Fix bug where we picked a lower resolution image than requested. (PR #205)
* Add support for specifying if a the media repository should dynamically
  thumbnail images or not. (PR #206)

Metrics:

* Add statistics from the reactor to the metrics API. (PR #224, #225)

Demo Homeservers:

* Fix starting the demo homeservers without rate-limiting enabled. (PR #182)
* Fix enabling registration on demo homeservers (PR #223)

## Changes in synapse v0.9.4-rc1 (2015-07-21)

General:

* Add basic implementation of receipts. (SPEC-99)
* Add support for configuration presets in room creation API. (PR  #203)
* Add auth event that limits the visibility of history for new users.
  (SPEC-134)
* Add SAML2 login/registration support. (PR  #201. Thanks Muthu Subramanian!)
* Add client side key management APIs for end to end encryption. (PR #198)
* Change power level semantics so that you cannot kick, ban or change power
  levels of users that have equal or greater power level than you. (SYN-192)
* Improve performance by bulk inserting events where possible. (PR #193)
* Improve performance by bulk verifying signatures where possible. (PR #194)

Configuration:

* Add support for including TLS certificate chains.

Media Repository:

* Add Content-Disposition headers to content repository responses. (SYN-150)
