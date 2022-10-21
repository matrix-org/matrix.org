+++
title = "Synapse 1.35.0 released"
path = "/blog/2021/06/01/synapse-1-35-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.35.0 is out! This release focused on improving internals as we drive toward better memory performance during room joins, but more on that below.

> __Update:__ [Synapse 1.35.1](https://github.com/matrix-org/synapse/releases/tag/v1.35.1) was published on Thursday, June 3rd. It resolves a bug ([#10109](https://github.com/matrix-org/synapse/issues/10109)) which mistakenly listed invite-only rooms in the Spaces summary.
>
> We'd also like to call the attention of client developers to a deprecation: The unstable prefixes used during development of [MSC2858: Multiple SSO Identity Providers](https://github.com/matrix-org/matrix-doc/blob/master/proposals/2858-Multiple-SSO-Identity-Providers.md#unstable-prefix) will be removed from Synapse 1.38, due out in August. Please ensure your client supports the stable identifiers for this feature.

## Spaces: On by Default

Following the successful release of [Synapse 1.34](/blog/2021/05/17/synapse-1-34-0-released), the experimental Spaces flag is now enabled by default. If you had manually enabled the `experimental_features: { spaces_enabled: true }` flag in your homeserver configuration, you may now remove it.

## Bug Squashing

This release of Synapse fixes an issue which could cause federated room joins to fail when the join response exceeded a size limit which was too low ([#10082](https://github.com/matrix-org/synapse/pull/10082)). We've also improved what Synapse logs when it drops a connection in similar circumstances ([#10091](https://github.com/matrix-org/synapse/pull/10091)), which should aid diagnosis if a similar issue were to arise in the future.

GitHub user thermaq contributed a fix ([#10014](https://github.com/matrix-org/synapse/pull/10014)) for a bug  which could cause user presence state to become stale.

Lastly our OpenTracing support now allows for profiling end-to-end performance on a per-user basis ([#9978](https://github.com/matrix-org/synapse/pull/9978)).

## An Update on Room Joins

We've been hammering away at shrinking Synapse's memory footprint when joining large / complex rooms, and while we're not there yet, the end is in sight! In particular, this release includes many internal refactorings, including using [ijson](https://pypi.org/project/ijson/) to parse the JSON response to `/send_join` ([#9958](https://github.com/matrix-org/synapse/pull/9958)), clearing the way for substantial improvements.

Memory usage still spikes because we're effectively doing the same work with a different library, but ijson's design allows for iterative parsing. This will pay dividends once we modify the code downstream of `/send_join` to take advantage of it.

Concretely, Erik Johnston has an experimental branch of Synapse which completely eliminates the memory spike:

![Memory usage graph for Synapse 1.33, 1.35, and an experimental branch](/blog/img/2021-06-01-synapse-1.35-join-memory.png)

The remaining work is centered on splitting that branch into self-contained, reviewable pull requests, like a rewrite of the Synapse Keyring class ([#10035](https://github.com/matrix-org/synapse/pull/10035)). After that's merged, we'll need to make one further change to properly batch up work, at which point we should attain the efficiency gains from Erik's experiment.

## Everything Else

GitHub user savyajha contributed a security hardened systemd unit file which effectively sandboxes Synapse ([#9803](https://github.com/matrix-org/synapse/pull/9803)). While not enabled by default, we'd encourage security conscious users to review the [example file](https://github.com/matrix-org/synapse/blob/v1.35.0/contrib/systemd/override-hardened.conf) and associated [documentation](https://github.com/matrix-org/synapse/blob/v1.35.0/docs/systemd-with-workers/README.md#hardening).

Please see the [Release Notes](https://github.com/matrix-org/synapse/blob/v1.35.0/CHANGES.md) for a complete list of changes in this release.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [dklimpel](https://github.com/dklimpel), [jerinjtitus](https://github.com/jerinjtitus), [junquera](https://github.com/junquera), [lonyeon](https://github.com/lonyeon), [savyajha](https://github.com/savyajha), and [thermaq](https://github.com/thermaq).
