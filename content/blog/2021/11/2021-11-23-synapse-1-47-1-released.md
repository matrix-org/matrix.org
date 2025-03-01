+++
title = "Synapse 1.47.1 released"
date = "2021-11-23T12:46:48Z"
path = "/blog/2021/11/23/synapse-1-47-1-released"

[taxonomies]
author = ["David Robertson"]
category = ["Releases", "Security"]
+++

Today we are releasing Synapse 1.47.1, a security update based on last week's release of [Synapse 1.47.0](https://matrix.org/blog/2021/11/17/synapse-1-47-0-released). This [release](https://github.com/matrix-org/synapse/releases/tag/v1.47.1) patches one high severity issue affecting Synapse installations 1.47.0 and earlier using the media repository. An attacker could cause these Synapses to download a remote file and store it in a directory outside the media repository.

Note that:

- This only affects homeservers using Synapse's built-in media repository, as opposed to [synapse-s3-storage-provider](https://github.com/matrix-org/synapse-s3-storage-provider) or [matrix-media-repo](https://github.com/turt2live/matrix-media-repo).
- Attackers cannot control the exact name or destination of the stored file.

To quote from the advisory:

> ### [GHSA-3hfw-x7gx-437c](https://github.com/matrix-org/synapse/security/advisories/GHSA-3hfw-x7gx-437c) / CVE-2021-41281: Path traversal when downloading remote media
>
> #### Impact
>
> Synapse instances with the media repository enabled can be tricked into downloading a file from a remote server into an arbitrary directory, potentially outside the media store directory.
>
> The last two directories and file name of the path are chosen randomly by Synapse and cannot be controlled by an attacker, which limits the impact.
>
> Homeservers with the media repository disabled are unaffected. Homeservers configured with a federation whitelist are also unaffected.

The [advisory](https://github.com/matrix-org/synapse/security/advisories/GHSA-3hfw-x7gx-437c) has full details, including workarounds.

This issue was discovered and fixed by our internal security team.

Please update at your earliest convenience.
