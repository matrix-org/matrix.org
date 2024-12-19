+++
title = "Synapse 1.4.1 released"
path = "/blog/2019/10/18/synapse-1-4-1-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]
+++

Hi all,

We've released Synapse 1.4.1 as a small but important bugfix to 1.4.0.

This fixes a regression which crept in with our newly implemented "erase redacted data after N days" feature where some APIs
would fail when hitting erased redactions - anyone on Synapse 1.4.0 will want to upgrade asap.

As always, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.4.1) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 1.4.0 follows:

## Synapse 1.4.1 (2019-10-18)

No changes since 1.4.1rc1.

## Synapse 1.4.1rc1 (2019-10-17)

### Bugfixes

- Fix bug where redacted events were sometimes incorrectly censored in the database, breaking APIs that attempted to fetch such events. ([\#6185](https://github.com/matrix-org/synapse/issues/6185), [5b0e9948](https://github.com/matrix-org/synapse/commit/5b0e9948eaae801643e594b5abc8ee4b10bd194e))
