+++
title = "Synapse 1.21.2 released, and security advisory."
date = "2020-10-15T17:25:42Z"
updated = "2020-10-15T17:16:42Z"
path = "/blog/2020/10/15/synapse-1-21-2-released-and-security-advisory"

[taxonomies]
author = ["Richard van der Hoff"]
category = ["Releases", "Security"]
+++

Hi folks,

Today we have released Synapse 1.21.2, which fixes a couple of minor bugs that crept into the previous release. Full details are below.

Separately, we are advising any administrators who have not yet upgraded to Synapse 1.21.0 or later to do so as soon as possible. Previous versions of Synapse were vulnerable to a cross-site-scripting (XSS) attack; the bug was fixed in Synapse 1.21.0 with [PR \#8444](https://github.com/matrix-org/synapse/pull/8444).

The changelog for 1.21.2 is as follows:

## Synapse 1.21.2 (2020-10-15)

Debian packages and Docker images have been rebuilt using the latest versions of dependency libraries, including authlib 0.15.1. Please see bugfixes below.

### Bugfixes

- Fix rare bug where sending an event would fail due to a racey assertion. ([\#8530](https://github.com/matrix-org/synapse/issues/8530))
- An updated version of the authlib dependency is included in the Docker and Debian images to fix an issue using OpenID Connect. See [\#8534](https://github.com/matrix-org/synapse/issues/8534) for details.
