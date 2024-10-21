+++
title = "Security updates: Sydent 1.0.3, Synapse 0.99.3.1 and Riot/Android 0.9.0 / 0.8.99 / 0.8.28a"
path = "/blog/2019/05/03/security-updates-sydent-1-0-3-synapse-0-99-3-1-and-riot-android-0-9-0-0-8-99-0-8-28a"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "Security"]
+++

Hi all,

Over the last few weeks we’ve ended up getting a lot of attention from the security research community, which has been incredibly useful and massively appreciated in terms of contributions to improve the security of the reference Matrix implementations.

We’ve also set up an official [Security Disclosure Policy](https://matrix.org/security-disclosure-policy/) to explain the process of reporting security issues to us safely via responsible disclosure - including a Hall of Fame to credit those who have done so.  (Please mail [security@matrix.org](mailto:security@matrix.org) to remind us if we’ve forgotten you!).

Since we published the Hall of Fame yesterday, we’ve already been getting new entries and so we’re doing a set of security releases today to ensure they are mitigated asap.  Unfortunately the work around this means that we’re running late in publishing the post mortem of the [Apr 11 security incident](https://matrix.org/blog/2019/04/11/security-incident) - we are trying to get that out as soon as we can.

## Sydent 1.0.3

Sydent 1.0.3 has three security fixes:

* Ensure that authentication tokens are generated using a secure random number generator, ensuring they cannot be predicted by an attacker.  This is an important fix - please update.  Thanks to Enguerran Gillier ([@opnsec](https://twitter.com/@opnsec)) for identifying and responsibly disclosing the issue!
* Mitigate an HTML injection bug where an invalid room_id could result in malicious HTML being injected into validation emails.  **The fix for this is in the email template itself; you will need to update any customised email templates to be protected.**  Thanks to Enguerran Gillier ([@opnsec](https://twitter.com/@opnsec)) for identifying and responsibly disclosing this issue too!
* Randomise session_ids to avoid leaking info about the total number of identity validations, and whether a given ID has been validated.  Thanks to [@fs0c131y](https://fs0c131y.com) for identifying and responsibly disclosing this one.

If you are running Sydent as an identity server, you should update as soon as possible from [https://github.com/matrix-org/sydent/releases/v1.0.3](https://github.com/matrix-org/sydent/releases/v1.0.3).  We are not aware of any of these issues having been exploited maliciously in the wild.

## Synapse 0.99.3.1

Synapse 0.99.3.1 is a security update for two fixes:

* Ensure that random IDs in Synapse are generated using a secure random number generator, ensuring they cannot be predicted by an attacker. Thanks to Enguerran Gillier ([@opnsec](https://twitter.com/@opnsec)) for identifying and responsibly disclosing this issue!
* Add 0.0.0.0/32 and ::/128 to the URL preview blacklist configuration, ensuring that an attacker cannot make connections to localhost. Thanks to Enguerran Gillier ([@opnsec](https://twitter.com/@opnsec)) for identifying and responsibly disclosing this issue too!

You can update from [https://github.com/matrix-org/synapse/releases](https://github.com/matrix-org/synapse/releases) or similar as normal. We are not aware of any of these issues having been exploited maliciously in the wild.

(Synapse 0.99.3.2 was released shortly afterwards to fix a non-security issue with the Debian packaging)

## Riot/Android 0.9.x/0.8.99 (Google Play) and 0.8.28a (F-Droid)

Riot/Android has an important security fix which shipped over the course of the last week in various versions of the app:

* Remove obsolete and buggy ContentProvider which could allow a malicious local app to compromise account data. Many thanks to Julien Thomas ([@julien_thomas](https://twitter.com/@julien_thomas)) from [Protektoid Project](https://protektoid.com) for identifying this and responsibly disclosing it!

The fix for this shipped on F-Droid since 0.8.28a, and on the Play Store, the fix is present in both v0.9.0 (the first version of the re-published Riot app) and v0.8.99 (the last version of the old Riot app, which told everyone to reinstall).  Other forks of Riot which we’re aware of have also been informed and should be updated.

If you haven’t already updated, please do so now.
