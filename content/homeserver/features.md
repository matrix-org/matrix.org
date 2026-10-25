+++
title = "Experimental Features"
weight = 40
+++

## Background

The matrix.org homeserver is a public Matrix online service that can be used by anyone to interact with the public Matrix federation.
It is provided by [Element Creations Ltd](https://element.io) on behalf of The Matrix.org Foundation and consists of multiple software components.

[Synapse](https://github.com/element-hq/synapse)/[Synapse Pro](https://element.io/server-suite/synapse-pro), [Sydent](https://github.com/element-hq/sydent) and [MAS](https://github.com/element-hq/matrix-authentication-service) implement the APIs described by the [Matrix Specification](https://spec.matrix.org).
Changes to the spec can be proposed by using the [MSC process](https://github.com/matrix-org/matrix-spec-proposals#summary-of-the-process).
(There are also implementation-specific APIs not in the spec, mostly [admin APIs](https://matrix-org.github.io/synapse/develop/usage/administration/admin_api/index.html), which are *not* subject to this policy.)

Often there is a need to [evaluate changes before an MSC is accepted](https://spec.matrix.org/proposals/#early-release-of-an-mscidea), to ensure that they will work in practice with a good user experience. We refer to such changes as *experimental features*.
This page discusses the policy for enabling experimental features on the matrix.org homeserver.

## Feature Flags

One way to evaluate experimental features is via a feature branch, but long-lived branches are difficult to manage, so a preferable solution is often to merge it to the project's development mainline, but leave it **disabled by default**.

Element's Backend team is normally happy to accept pull requests for experimental features behind a configuration flag, so long as the changes meet the code quality standards and the feature is in active development.
(Though note that the team may have to remove experimental features at short notice if they are causing problems.)

Once the feature is available in mainline, it can be enabled on individual servers for testing and evaluation.

Depending on the feature, it may also be possible to enable it for *specific users* on `matrix.org` (e.g., the development team, or other known power-users who are happy to take the risk of broken clients).

## Widening the Net

If we're not getting enough traction on development servers, we may want to consider rolling it out further.

It's worth remembering at this point that, whatever happens to an experimental feature, further changes *will* be needed.
Hopefully the feature will be a great success, in which case we'll need to standardise the API and replace the `/unstable` endpoints with stable ones.
Alternatively, we'll need to iterate on the feature, or, in the worst case, remove it altogether.

Experience shows that once we've enabled an experimental feature on a server as widely-used as `matrix.org`, clients and users come to rely on the changes (even when care is taken to avoid doing so).
This then makes it very hard to make further changes to the feature — *including replacing the experimental version with a stable one once development is completed* — due to the risk of breaking clients.

In general therefore, it's much preferred to do the bulk of testing on non–`matrix.org` servers.
Both `beta.matrix.org` (for public testing) and internal servers are good candidates for doing so.
This helps avoid many of the above issues.
(TODO See [more on beta.matrix](https://handbook.element.io/new-vector/internal/-/wikis/Beta.matrix.org).)

If, having considered the risks, we still want to roll out the feature further, the next step might be to roll it out to a larger subset of users on `matrix.org`, e.g. as part of a community testing initiative.

Enabling the feature for *all* users on `matrix.org` is a last resort.
When doing this we'll need to make sure we consider up-front things like:

- how we make sure that clients don't end up relying on it by accident (for example, guarding it by a 'labs' flag which users have to enable explicitly).
- how we will safely evolve the feature if it turns out more changes are needed to the API.
- how we will safely remove the `/unstable` prefixes once the feature is stabilised.

We'll generally want to have a written document addressing these concerns, to make sure that everyone is working on the same understanding.

## Turning It On Everywhere

The final step in rolling out a feature is to turn it on everywhere — in other words, to enable it by default in Synapse mainline.

The potential costs of rolling out an experimental feature to the ecosystem as a whole are obviously even higher than turning it on on `matrix.org`.
In general, once a feature gets to this stage, we're essentially saying it needs to become part of the standardised Matrix Spec.

In other words: enabling experimental features by default isn't something we would normally do.
Instead, the feature should complete the MSC process, thus transforming it into a stable feature.

## Summary

Experimental features should first be tested using a server other than `matrix.org` (e.g. a development or internal server, or `beta.matrix.org`).
If further testing is required then it can be enabled for specific users on `matrix.org` (this may not be feasible for all features).
Finally, if there is a strong need to test against a large corpus of users then it can be enabled for all `matrix.org` users (for a limited period), subject to certain conditions.

Normally experimental features will not be enabled by default within Synapse.
To roll out a feature widely, it should go through the MSC process.
