+++
title = "Synapse 1.41.1 released"
path = "/blog/2021/08/31/synapse-1-41-1-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases", "Security"]
+++

Today we are releasing Synapse 1.41.1, a security update based on last week's release of [Synapse 1.41.0](https://matrix.org/blog/2021/08/24/synapse-1-41-0-released). This release patches two moderate severity issues which could reveal metadata about private rooms:

- **[GHSA-3x4c-pq33-4w3q](https://github.com/matrix-org/synapse/security/advisories/GHSA-3x4c-pq33-4w3q) / CVE-2021-39164: Enumerating a private room's list of members and their display names.**

  If an unauthorized user both knows the Room ID of a private room *and* that room's history visibility is set to `shared`, then they may be able to enumerate the room's members, including their display names.

  The unauthorized user must be on the same homeserver as a user who is a member of the target room.

- **[GHSA-jj53-8fmw-f2w2](https://github.com/matrix-org/synapse/security/advisories/GHSA-jj53-8fmw-f2w2) / CVE-2021-39163: Disclosing a private room's name, avatar, topic, and number of members.**

  If an unauthorized user knows the Room ID of a private room, then its name, avatar, topic, and number of members may be disclosed through Group / Community features.

  The unauthorized user must be on the same homeserver as a user who is a member of the target room, and their homeserver must allow non-administrators to create groups (`enable_group_creation` in the Synapse configuration; off by default).

Note that in both cases:

- The private room's Room ID must be known to the attacker.
- Another user on the attacker's homeserver must be a legitimate member of the target room.
- The information disclosed is *already* present in the database and thus legitimately known to the administrators of homeservers participating in the target room.

We'd like to credit [0xkasper](https://twitter.com/0xkasper) for discovering and responsibly disclosing these issues.

This release also fixes a small regression in 1.41.0 ([#10709](https://github.com/matrix-org/synapse/issues/10709)) which broke compatibility with older Twisted versions when Synapse was a configured to send email.

Please update at your earliest convenience.
