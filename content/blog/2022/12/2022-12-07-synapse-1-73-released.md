+++
title = "Synapse 1.73 released"
path = "/blog/2022/12/07/synapse-1-73-released"

[taxonomies]
author = ["Mathieu Velten"]
category = ["Releases"]
+++

And here is another update to your beloved Matrix homeserver implementation, [Synapse
1.73](https://github.com/matrix-org/synapse/releases/tag/v1.73.0).

## Announcements

### Legacy Prometheus metric names removed

When releasing [Synapse 1.69](https://matrix.org/blog/2022/10/17/synapse-1-69-released#upcoming-removal-of-deprecated-prometheus-metric-names)
a couple of months ago, we also announced the removal of old Prometheus metrics that have been replaced by more aptly named ones.
he list of these metrics can be found [here](https://matrix-org.github.io/synapse/v1.73/metrics-howto.html#renaming-of-metrics--deprecation-of-old-names-in-12).

Synapse 1.73 implements the final phase of this plan and entirely removes support for those metrics. As a result,
the `enable_legacy_metrics` configuration option, which was introduced in
[Synapse 1.71](https://matrix.org/blog/2022/11/22/synapse-1-72-released#announcements), has also been removed.

Server administrators who are still relying on these legacy metric names are encouraged to update their dashboards at their earliest convenience.
For more information, please refer to the [upgrade notes](https://matrix-org.github.io/synapse/v1.73/upgrade#legacy-prometheus-metric-names-have-now-been-removed).

## The new stuff

### Performance

A bunch of performance improvements have been included in this release, specifically around
the [`/messages`](https://spec.matrix.org/v1.5/client-server-api/#get_matrixclientv3roomsroomidmessages) endpoint.

[Improvements to event filtering on the client-server API](https://github.com/matrix-org/synapse/pull/14527) gave the matrix.org homeserver a first nice bump as visible on this graph:

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/2022-12-07-apdex-filter-events-improvement.png)

Various optimizations around [fetching](https://github.com/matrix-org/synapse/pull/14491) [bundled](https://github.com/matrix-org/synapse/pull/14508)
[aggregations](https://github.com/matrix-org/synapse/pull/14510) resulted in yet another nice improvement:

<!-- markdownlint-disable-next-line no-alt-text -->
[![](/blog/img/2022-12-07-bundled-aggregations-improvement.png)](/blog/img/2022-12-07-bundled-aggregations-improvement.png)

Note that the graph from the first image, and the second graph from the second image are [apdexes](https://en.wikipedia.org/wiki/Apdex), which
is a measure that shows improvement when it goes up (as opposed to e.g. response times, which improve
when they go down).

### Extensible Events experimental support

Experimental support for Extensible Events has landed in Synapse.

This is exciting since this global rework of events presentation has been in talks
[for a while](https://github.com/matrix-org/matrix-spec-proposals/pull/1767), and
having an implementation to experiment with greatly helps bringing the feature
closer to completion.

Note that this support is still very much experimental as the related MSCs are still
under review and could change at any time, and therefore not recommended for use
in production.

## Everything else

See the full [changelog](https://github.com/matrix-org/synapse/releases/tag/v1.73.0), for a
complete list of changes in the release. Also please have a look at the [upgrade
notes](https://matrix-org.github.io/synapse/v1.73/upgrade#upgrading-to-v1730) for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order) [schmop](https://github.com/schmop), [Ashish Kumar](https://github.com/ashfame),
[realtyem](https://github.com/realtyem), and [Brennan Chapman](https://github.com/chapb)
as well as anyone helping us make Synapse better by sharing their feedback and reporting issues.
