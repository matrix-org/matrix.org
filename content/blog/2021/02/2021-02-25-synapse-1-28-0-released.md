+++
title = "Synapse 1.28.0 released"
path = "/blog/2021/02/25/synapse-1-28-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

[Synapse 1.28.0](https://github.com/matrix-org/synapse/releases/tag/v1.28.0) is now available!

This release comes with several further improvements to the user experience of single sign-on and numerous bugfixes and stability improvements.

For admins, Synapse 1.28 adds a new Admin API for retrieving [event context](https://github.com/matrix-org/synapse/blob/v1.28.0/docs/admin_api/rooms.md#event-context-api) and implements new spam checker hooks which enable checking file uploads and remote downloads. We've also improved memory usage of media repository workers.

Lastly, we have marked an undocumented Admin API for deprecation. If any of your tools use `/_synapse/admin/v1/users/<user_id>` to get account information, please replace that with the [V2 List Accounts](https://github.com/matrix-org/synapse/blob/release-v1.28.0/docs/admin_api/user_admin_api.rst#list-accounts) API, which has been available since Synapse 1.7.0.

There are no special upgrade instructions for 1.28.0. See the [full changelog](https://github.com/matrix-org/synapse/blob/release-v1.28.0/CHANGES.md) for more details on what's in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [arya2331](https://github.com/arya2331), [auscompgeek](https://github.com/auscompgeek), [bubu](https://github.com/bubu), [compu42](https://github.com/compu42), [dklimpel](https://github.com/dklimpel), [dykstranet](https://github.com/dykstranet), and [shadowjonathan](https://github.com/shadowjonathan).

We'd also like to thank [yoric](https://github.com/Yoric) for thoroughly reviewing and re-organizing the Synapse [CONTRIBUTING.md](https://github.com/matrix-org/synapse/blob/v1.28.0/CONTRIBUTING.md) file.
