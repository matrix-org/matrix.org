+++
title = "Synapse 1.7.3 released"
path = "/blog/2019/12/31/synapse-1-7-3-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Releases"]
+++

Hi all,

We've just released Synapse 1.7.3 - an important bug fix to address a class of failures due to malformed events.  We've seen this in the wild over the last few days, so we'd recommend updating as soon as possible, especially if you are having problems federating.

Get the new release from [github](https://github.com/matrix-org/synapse/releases/tag/v1.7.3) or any of the sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>.

The changelog since 1.7.2 is:

## Synapse 1.7.3 (2019-12-31)

This release fixes a long-standing bug in the state resolution algorithm.

### Bugfixes

- Fix exceptions caused by state resolution choking on malformed events. ([\#6608](https://github.com/matrix-org/synapse/issues/6608))
