+++
title = "Data Portability Tooling Bug"
path = "/blog/2019/07/24/data-portability-tooling-bug"

[taxonomies]
author = ["Thomas Lant"]
category = ["Privacy"]
+++

It was drawn to our attention this afternoon that there is a bug in our GDPR data portability tooling that resulted in the data dump including some events that should not have been included.

This tooling has recently been updated ([here is the new code](https://github.com/matrix-org/synapse/blob/baf081cd3b040926e2d14dfd1c555307bba59245/synapse/handlers/admin.py#L98)), and the bug only affects reports generated with the updated tool. So far we have generated one report using the updated tooling.

The bug affects events which:

- were sent in rooms in which, at the point at which the message was sent, the message visibility was set to 'shared' or 'world readable', and
- were pulled in over federation from another server after the data subject left the room

As a reminder, 'shared' message visibility means _anyone in the room can view the message, from the point in time at which visibility was set to 'shared'_ and 'world readable' means _anyone can read the messages without joining the room, from the point in time at which visibility was set to 'world readable'_.

Events are pulled onto a homeserver over federation when a user on that homeserver tries to access events which, for whatever reason, their homeserver does not already have a local copy. This most often happens when their homeserver is offline for any period of time, but can also happen when a user is the first user from their homeserver to join a room with active participants on other homeservers.

We're still analysing the data but so far it looks like the bug resulted in only a small number of events that were not publicly-accessible being shared (there were also publicly-accessible events mistakenly included). At this stage we have identified 19 events from 4 users across 2 rooms (the dump contained ~3.5 million events). This is not to diminish the severity of the bug - just to reassure that the scale of its impact appears to be extremely limited.

It is also worth noting that any encrypted events erroneously included in the dump will not have been decryptable (since the data subject would not have had access to the keys).

### Update (2019-08-06)
>
> In our original analysis we stated that 19 events were shared erroneously. On closer analysis we missed 5 other timeline events - the correct figure is 24 timeline events originating from 4 users over 2 rooms. However, this figure focused on timeline data and does not take into account all state events (such as user joins, parts, topic changes etc). When considering these too, a further 56 state events were erroneously shared, referencing 64 users across these 2 rooms (mainly detailing when users had joined/left the room after the requesting user themselves had left). These membership events contained avatar & display name details which may not have been public (but in practice, the vast majority appear to be public data).
>
> Aside from the events referenced above, the full dump contained ~20,000 events that also ought not to have been included; however **these events were already publicly accessible due to being part of publicly accessible rooms** (eg Matrix HQ) and so we do not consider them a breach of data.

## What caused the bug?

Events that are pulled in over federation are assigned a negative 'stream ordering' ID. This is designed to avoid their being sent down the sync (where they would likely be out of sequence). In normal operation (accessing your homeserver via a Matrix client) these events would be appropriately filtered, but a bug in the data dump tooling caused them to be included.

The bug was introduced as a result of two factors:

- The event filtering code assumes that the user is currently in the room - this was not intuitive, and was not called out in the documentation
- When we fetched the events from the database, we tried to limit to events sent before the user left the room. On reflection, we used the wrong ordering mechanism (stream ordering instead of topological ordering), resulting in the inclusion of events that were fetched from a remote server after the data subject had left

We are working to fix the bug, and we'll update here when it is resolved. As a reminder, please do report security bugs responsibly as per the [Security Disclosure Policy](https://matrix.org/security-disclosure-policy/) so we can validate the issue and mitigate abuse.

As is standard practice for any data breach, we have notified the ICO.
