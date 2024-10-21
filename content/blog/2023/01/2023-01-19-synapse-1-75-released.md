+++
title = "Synapse 1.75 released"
date = "2023-01-19T15:38:49Z"
path = "/blog/2023/01/19/synapse-1-75-released"

[taxonomies]
author = ["Mathieu Velten"]
category = ["Releases"]
+++

We published Synapse [version 1.75](https://github.com/matrix-org/synapse/releases/tag/v1.75.0)
as the new stable release this week. Synapse admins are encouraged to upgrade
to it at their convenience. It seems like the blog post for [version 1.74](https://github.com/matrix-org/synapse/releases/tag/v1.74.0)
 was eaten by Santa's reindeer, so this post will also cover changes from it.

<!-- more -->

## Announcements

There were no special announcements for the 1.75 release.

### Synapse 1.74: ICU dependency for improved user search

Synapse's search functionality has long been poor when searching for non-English
terms. Synapse 1.74 [introduced](https://github.com/matrix-org/synapse/pull/14464)
support for an optional improved user search experience which has a better
awareness of Unicode. To do so, we use the [ICU library](https://icu.unicode.org/)
when Synapse is installed alongside the binding library [PyICU](https://pypi.org/project/PyICU/).

Synapse installations using Matrix.org docker images or debian packages will
automatically have the new search mode enabled.

From-source installations will need to include the `user-search` extra when
`pip install` Synapse, e.g. `pip install matrix-synapse[user-search]`.
**NB:** because PyICU is not distributed as source-only on PyPI, you will need
to ensure the ICU development headers are available on your system. See the
[upgrade notes](https://matrix-org.github.io/synapse/v1.75/upgrade.html#unicode-support-in-user-search)
for more info.

Please try out the new search mode and let us know how you find it in practice.

## The new stuff

### Support [RFC7636](https://datatracker.ietf.org/doc/html/rfc7636) Proof Key for Code Exchange for OAuth single sign-on

Synapse 1.75 adds support for RFC7636 code challenges in the OAuth 2.0 flow.

This is required by Twitter SSO and enabling it can protect against the
"authorization code interception attack".

### Experimental support for removing account data ([MSC3391](https://github.com/matrix-org/matrix-spec-proposals/pull/3391))

Experimental support for removing account data has landed in Synapse.
It was previously possible to create or update account data but not remove them, this is now possible.

The support is experimental and needs to be enabled with a configuration flag since the MSC hasn't landed yet.

### More faster remote room joins fixes and improvements

In case you missed it we are working on dramatically improve performance of remote room joins, you can refer
to [this blog post](https://matrix.org/blog/2022/10/18/testing-faster-remote-room-joins) for more details.

The last two Synapse releases brings that a lot closer to a proper release; in
particular they contain a lot of work to support faster joins in deployments
with multiple workers. The project continues in earnest; we hope to have more to
show off in the coming weeks.

## Everything else

See the full [changelog](https://github.com/matrix-org/synapse/releases/tag/v1.75.0), for a
complete list of changes in the release. Also please have a look at the [upgrade
notes](https://matrix-org.github.io/synapse/v1.75/upgrade.html#upgrading-to-v1740) for 1.74 version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to these releases, including (in no particular
order): Ashish Kumar, Dirk Klimpel, Jeremy Kescher, Jeyachandran Rathnam,
Nick Mills-Barrett, Jason Little, Villepeh and Vertux.
We are also grateful to anyone helping us make Synapse better by sharing their
feedback and reporting issues, or helping with community support questions.
