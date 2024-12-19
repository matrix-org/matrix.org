+++
title = "Avoiding unwelcome visitors on private Matrix servers"
path = "/blog/2019/11/09/avoiding-unwelcome-visitors-on-private-matrix-servers"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Privacy", "Security", "General"]
+++

Hi all,

Over the course of today we've been made aware of folks port-scanning the
general internet to discover private Matrix servers, looking for publicly
visible room directories, and then trying to join rooms listed in them.

If you are running a Matrix server that is intended to be private, you must correctly
configure your server to not expose its public room list to the general public -
and also ensure that any sensitive rooms are invite-only (especially if the
server is federated with the public Matrix network).

In Synapse, this means ensuring that the following options are set correctly in
your `homeserver.yaml`:

```yaml
# If set to 'false', requires authentication to access the server's public rooms
# directory through the client API. Defaults to 'true'.
#
#allow_public_rooms_without_auth: false

# If set to 'false', forbids any other homeserver to fetch the server's public
# rooms directory via federation. Defaults to 'true'.
#
#allow_public_rooms_over_federation: false
```

**For private servers, you will almost certainly want to explicitly set these to
`false`**, meaning that the server's "public" room directory is hidden from the
general internet and wider Matrix network.

You can test whether your room directory is visible to arbitrary Matrix clients
on the general internet by viewing a URL like
<https://sandbox.modular.im/_matrix/client/r0/publicRooms> (but for your server).
If it gives a "Missing access token" error, you are okay.

You can test whether your room directory is visible to arbitrary Matrix servers
on the general internet by loading Riot (or similar) on another server, and
entering the target server's domain name into the room directory's server
selection box.  If you can't see any rooms, then are okay.

Relatedly, **please ensure that any sensitive rooms are set to be "invite only"
and room history is not world visible** - particularly if your server is
federated, or if it has public registration enabled.  This stops random
members of the public peeking into them (let alone joining them).

Relying on security-by-obscurity is a very bad idea: all it takes is for someone
to scan the whole internet for Matrix servers, and then trying to join (say)

## finance on each discovered domain (either by signing up on that

server or by trying to join over federation) to cause problems.

Finally, if you don't want the general public reading your room directory,
please also remember to turn off public registration on your homeserver.
Otherwise even with the changes above, if randoms can sign up on your server
to view & join rooms then all bets are off.

We'll be rethinking the security model of room directories in future (e.g.
whether to default them to being only visible to registered users on the local
server, or whether to replace per-server directories with per-community
directories with finer grained access control, etc) - but until this is sorted,
please heed this advice.

If you have concerns about randoms having managed to discover or join rooms
which should have been private, please contact <security@matrix.org>.
