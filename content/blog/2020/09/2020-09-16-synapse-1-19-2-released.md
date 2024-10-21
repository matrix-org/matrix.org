+++
title = "Synapse 1.19.2 released"
path = "/blog/2020/09/16/synapse-1-19-2-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases", "Security"]
+++

__Synapse 1.19.2 is a security patch. All federating instances should upgrade immediately.__

Today we are releasing Synapse 1.19.2, which is a security patch release containing a fix to encountering invalid events over federation. We are also putting out a fourth release candidate for the upcoming Synapse 1.20.0 release with the same fix.

The bug prevents affected Synapse instances from joining rooms with invalid events. Server administrators running federating instances are strongly encouraged to update as soon as possible.

__Those on Synapse 1.19.1 or earlier should upgrade to Synapse 1.19.2, while those who are running a release candidate of Synapse 1.20.0 should upgrade to 1.20.0rc4.__

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.19.2 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.19.2), and 1.20.0rc4 is [here](https://github.com/matrix-org/synapse/releases/tag/v1.20.0rc4).

The changelog for 1.19.2 is as follows:

## Synapse 1.19.2 (2020-09-16)

Due to the issue below server admins are encouraged to upgrade as soon as possible.
Bugfixes

- Fix joining rooms over federation that include malformed events. (#8324)
