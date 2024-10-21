+++
title = "Synapse 0.99.5.2 released"
path = "/blog/2019/05/30/synapse-0-99-5-2-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++


0.99.5.2 contains a critical performance fix following a regression that was introduced in 0.99.5. Affected servers will have experienced increased CPU and RAM usage with a knock on effect of generally sluggish performance.

Separately, we are also looking into reports relating to further performance degradations that may have been introduced as part of 0.99.5, though consider the 0.99.5.2 fix to be a significant improvement on previous 0.99.5.x releases.

Please upgrade asap.

You can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v0.99.5.2) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Note, Synapse is now available from PyPI, pick it up [here](https://pypi.org/project/matrix-synapse/). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse).

## Synapse v0.99.5.2 Changelog

### Bugfixes

- Fix bug where we leaked extremities when we soft failed events, leading to performance degradation. ([\#5274](https://github.com/matrix-org/synapse/issues/5274), [\#5278](https://github.com/matrix-org/synapse/issues/5278), [\#5291](https://github.com/matrix-org/synapse/issues/5291))
