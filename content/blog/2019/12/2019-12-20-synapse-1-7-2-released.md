+++
title = "Synapse 1.7.2 released"
path = "/blog/2019/12/20/synapse-1-7-2-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]
+++

Hi all,

We've just released Synapse 1.7.2 - a minor point release to address two regressions which snuck into 1.7.0 and 1.7.1.  Sorry for the upgrade faff; hopefully we will be back to a saner release cadence shortly.  Reminder that if you are on 1.7.0 or earlier you should upgrade asap as 1.7.1 contained security fixes.

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.7.2) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

The changelog since 1.7.1 is:

## Synapse 1.7.2 (2019-12-20)

This release fixes some regressions introduced in Synapse 1.7.0 and 1.7.1.

### Bugfixes

- Fix a regression introduced in Synapse 1.7.1 which caused errors when attempting to backfill rooms over federation. ([\#6576](https://github.com/matrix-org/synapse/issues/6576))
- Fix a bug introduced in Synapse 1.7.0 which caused an error on startup when upgrading from versions before 1.3.0. ([\#6578](https://github.com/matrix-org/synapse/issues/6578))
