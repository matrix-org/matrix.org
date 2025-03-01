+++
title = "Synapse 1.3.1 released"
path = "/blog/2019/08/17/synapse-1-3-1-released"

[taxonomies]
author = ["Neil Johnson"]
category = ["Releases"]
+++

Some of you will have been bitten by a bug that [prevented Synapse 1.3.0 from starting up correctly](https://github.com/matrix-org/synapse/issues/5866). If this is you, please upgrade.

Additionally we have taken the opportunity to fix a [dependency bug](https://github.com/matrix-org/synapse/issues/5865) for our intrepid packagers.

Apologies for the inconvenience.

As ever, you can get the new update [here](https://github.com/matrix-org/synapse/releases/tag/v1.3.1) or any of the sources mentioned at [https://github.com/matrix-org/synapse](https://github.com/matrix-org/synapse). Also, check out our [Synapse installation guide page](https://matrix.org/docs/guides/installing-synapse)

The changelog since 1.3.0 follows:

## Synapse 1.3.1 (2019-08-17)

### Features

- Drop hard dependency on `sdnotify` python package. ([\#5871](https://github.com/matrix-org/synapse/issues/5871))

### Bugfixes

- Fix startup issue (hang on ACME provisioning) due to ordering of Twisted reactor startup. Thanks to @chrismoos for supplying the fix. ([\#5867](https://github.com/matrix-org/synapse/issues/5867))
