+++
title = "Old Gitter bridge end of life (2021-04-21) - to be replaced with native bridge"
path = "/blog/2021/04/15/old-gitter-bridge-end-of-life-2021-04-21-to-be-replaced-with-native-bridge"

[taxonomies]
author = ["Bridge Team"]
category = ["Bridges"]
+++

Next week on Wednesday (2021-04-21), the old Gitter bridge (identified as `@gitterbot:matrix.org`) will be shut down and any plumbed rooms (bridged connections) remaining will no longer bridge. To replace this, we've already migrated all of the portal rooms and many of the plumbed rooms in preparation so most users will not need to take any further actions. The remaining rooms with the old Gitter bridge are unfortunately not possible to migrate and for those communities a clean break will be needed. The new native Gitter bridge is here to replace this!

[Gitter is bridged natively to Matrix](https://matrix.org/blog/2020/12/07/gitter-now-speaks-matrix) on the `gitter.im` homeserver and all of the public rooms are available there. The new native Gitter bridge has many advantages over the old bridge and is being actively developed to ensure parity and delivers:

- Ability to join public Gitter rooms from Matrix via `#<community>_<room>:gitter.im`
- Native feeling virtual users on both sides of the bridge so messages appear from the author itself
- Bridging edits, replies (mapped to threads on Gitter), deletes, file transfers
- Full support for markdown, emoji and mentions
- Soon to be [direct message (DM) support](https://gitlab.com/gitterHQ/webapp/-/issues/2671)!

If you still need your **existing** Matrix room for a public community plumbed to Gitter, we’re happy to help community admins with the setup of a manual plumb. Send an email to [support@gitter.im](mailto:support@gitter.im) with the details! Self-service plumbing will be coming in future (meanwhile, please keep it to public community rooms only, if you must!)

We hope that this notice helps make the transition a little smoother and avoid any disruptions 🙇

If you have any questions about the migration path or the new bridge, you can always chat with us in [#gitter:matrix.org](https://matrix.to/#/#gitter:matrix.org).

Happy chatting everyone!
