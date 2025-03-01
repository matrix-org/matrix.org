+++
title = "Critical Security Update - Synapse 1.2.1 released"
path = "/blog/2019/07/26/critical-security-update-synapse-1-2-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Today we release Synapse 1.2.1 as a critical security update. It contains patches relating to redactions and event federation. The patches address long standing bugs, and are not regressions specific to the previous version (1.2).  __All admins, regardless of current version, should upgrade asap__.

This release includes *four* security fixes:

- Prevent an attack where a federated server could send redactions for arbitrary events in v1 and v2 rooms. ([\#5767](https://github.com/matrix-org/synapse/issues/5767))
- Prevent a denial-of-service attack where cycles of redaction events would make Synapse spin infinitely. Thanks to `@lrizika:matrix.org` for identifying and responsibly disclosing this issue. ([0f2ecb961](https://github.com/matrix-org/synapse/commit/0f2ecb961))
- Prevent an attack where users could be joined or parted from public rooms without their consent. Thanks to [Dylanger](https://github.com/dylangerdaly) for identifying and responsibly disclosing this issue. ([\#5744](https://github.com/matrix-org/synapse/issues/5744))
- Fix a vulnerability where a federated server could spoof read-receipts from
  users on other servers. Thanks to [Dylanger](https://github.com/dylangerdaly) for identifying this issue too. ([\#5743](https://github.com/matrix-org/synapse/issues/5743))

Additionally, the following fix was in Synapse __1.2.0__, but was not correctly
identified during the original release:

- It was possible for a room moderator to send a redaction for an `m.room.create` event, which would downgrade the room to version 1. Thanks to `@/dev/ponies:ponies.im` for identifying and responsibly disclosing this issue! ([\#5701](https://github.com/matrix-org/synapse/issues/5701))

You can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.2.1) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Alternatively check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

Thanks for bearing with us.
