+++
date = "2022-09-13T14:56:43Z"
title = "Security release of matrix-appservice-irc 0.35.0 (High severity)"
path = "/blog/2022/09/13/security-release-of-matrix-appservice-irc-0-35-0-high-severity"
template = "post.html"
[taxonomies]
category = ["Security", "Releases"]
author = ["Denis Kasak (dkasak)"]
+++

We've released a new version of matrix.org's node-irc 1.3.0 and
matrix-appservice-irc 0.35.0, to patch several security issues:

- IRC mode operator confusion (Low, [GHSA-cq7q-5c67-w39w](https://github.com/matrix-org/matrix-appservice-irc/security/advisories/GHSA-cq7q-5c67-w39w))
- Parsing issue leading to room takeovers (High, [GHSA-xvqg-mv25-rwvw](https://github.com/matrix-org/matrix-appservice-irc/security/advisories/GHSA-xvqg-mv25-rwvw))
- Undisclosed issue (Moderate, [GHSA-r3p6-cg2c-c4qw](https://github.com/matrix-org/matrix-appservice-irc/security/advisories/GHSA-r3p6-cg2c-c4qw))

The details of the final vulnerability will be released at a later date,
pending an audit of the codebase to ensure it's not affected by other similar
vulnerabilities.

The vulnerabilities have been patched in node-irc version 1.3.0 and
matrix-appservice-irc 0.35.0. You can get the release on
[Github](https://github.com/matrix-org/matrix-appservice-irc/releases).

The bridges running on the Libera Chat, OFTC and other networks bridged by the
Matrix.org Foundation have been patched.

**Please upgrade your IRC bridge as soon as possible.**

The above vulnerabilities were reported by [Val
Lorentz](https://valentin-lorentz.fr/). Thank you!
