+++
title = "Synapse 1.69 released"
date = "2022-10-17T18:52:11Z"
updated = "2022-10-17T18:07:15Z"
path = "/blog/2022/10/17/synapse-1-69-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

Hey everyone, it's time for a new Synapse release! [Synapse
1.69](https://github.com/matrix-org/synapse/releases/tag/v1.69.0) is out, fresh
out of the oven. But before we take a look at it, here's a quick announcement:

> We have recently disclosed a moderate severity security vulnerability, which
> was fixed in [Synapse
> 1.62](https://matrix.org/blog/2022/07/06/synapse-1-62-released/) (released on
> July 5th 2022). This issue affects all homeservers running a version of
> Synapse older than 1.62 with open federation. If this is the case for your
> deployment, please update to a more recent version of Synapse at your earliest
> convenience.
>
> See advisory
> [GHSA-jhjh-776m-4765](https://github.com/matrix-org/synapse/security/advisories/GHSA-jhjh-776m-4765)
> and [CVE-2022-31152](https://www.cve.org/CVERecord?id=CVE-2022-31152) for more
> information.

Now let's see what's new in Synapse 1.69!

<!-- more -->

## Caching in modules

Synapse modules allow third-party developers to extend Synapse's feature range
to include very custom features.

Synapse 1.69 includes tools modules can use to interact with Synapse's caching
system, which includes features such as synchronising caches across multiple
Synapse workers.

Starting with this version, modules can import the `@cache()` decorator from
`synapse.module_api`, to decorate functions which results must be cached. Cached
functions need to be registered with
[`ModuleApi.register_cached_function`](https://github.com/matrix-org/synapse/blob/v1.69.0/synapse/module_api/__init__.py#L839-L853)
at the module's initialisation. Invalidating a cached function's result for a
given set of arguments can be done using [`ModuleApi.invalidate_cache`](https://github.com/matrix-org/synapse/blob/v1.69.0rc1/synapse/module_api/__init__.py#L855-L872).

## Upcoming removal of deprecated Prometheus metric names

Back in [Synapse
1.2](https://matrix.org/blog/2019/07/25/synapse-1-2-0-released), we deprecated a
number of Prometheus metrics, to replace them with more aptly named equivalents
that fit existing naming conventions better.

With Synapse 1.69, we're announcing the plan for the removal for these
deprecated metrics. Synapse 1.71 (due to be released on November 8) will turn
these metrics off by default (though it will still be possible to enable them
back). Synapse 1.73 (due to be released on November 22) will remove them
altogether.

Server administrators using metrics dashboards that rely on the deprecated
metrics are encouraged to update their dashboards with the new metric names. See
the [upgrade
notes](https://matrix-org.github.io/synapse/v1.69/upgrade.html#deprecation-of-legacy-prometheus-metric-names) for more information.

## Everything else

Synapse 1.69 also deprecates the `generate_short_term_login_token` module API
method in favour of the asynchronous `create_login_token` one. The deprecated
method will be removed in Synapse 1.71. See the [upgrade
notes](https://matrix-org.github.io/synapse/v1.69/upgrade.html#deprecation-of-the-generate_short_term_login_token-module-api-method)
for more information.

Additionally, Synapse 1.69 introduces a forwards- and backwards-incompatible
change to the replication of read receipts. This means that read receipts
replicated by workers running Synapse 1.68 will not be able to be processed by
workers running Synapse 1.69 and vice-versa. Once all workers are made to run
Synapse 1.69 (or 1.68), replication of read receipts will resume as normal. See
the [upgrade
notes](https://matrix-org.github.io/synapse/v1.69/upgrade.html#changes-to-the-receipts-replication-streams) for more information.

See the [full
changelog](https://github.com/matrix-org/synapse/releases/tag/v1.69.0) for a
complete list of changes in this release. Also please have a look at the
[upgrade
notes](https://matrix-org.github.io/synapse/v1.69/upgrade#upgrading-to-v1690)
for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to this release, including (in no particular
order) [lukasdenk](https://github.com/lukasdenk), [Dirk
Klimpel](https://github.com/dklimpel), [Ashish
Kumar](https://github.com/ashfame), [Famedly](https://www.famedly.com/) and
[Beeper](https://www.beeper.com/), as well as anyone helping us make Synapse
better by sharing their feedback and reporting issues.
