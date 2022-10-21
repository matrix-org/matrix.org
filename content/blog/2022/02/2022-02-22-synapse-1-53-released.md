+++
title = "Synapse 1.53 released"
date = "2022-02-22T14:53:37Z"
path = "/blog/2022/02/22/synapse-1-53-released"

[taxonomies]
author = ["Brendan Abolivier"]
category = ["Releases"]
+++

Rejoice everyone, [Synapse 1.53](https://github.com/matrix-org/synapse/releases/tag/v1.53.0) is out! Let's have a look at what's new with this release.

## Stabilisation of registration tokens

Registration tokens is a feature introduced in [Synapse 1.42.0](https://github.com/matrix-org/synapse/releases/tag/v1.42.0), which allows homeserver administrators to force their users to use specific tokens when registering. This is similar to Synapse's [registration shared secret](https://github.com/matrix-org/synapse/blob/6f440fd859c411af8c32478b4353f7550619c3bd/docs/sample_config.yaml#L1291-L1294) support, but with added features, such as the possibility to limit how users can be registered with the same token, or to make a token expire. See [the admin API documentation](https://matrix-org.github.io/synapse/v1.53/usage/administration/admin_api/registration_tokens.html) for more information on how to manage registration tokens on your homeserver.

Registration tokens were initially proposed to the Matrix specification in [MSC3231](https://github.com/matrix-org/matrix-doc/pull/3231) by [Callum Brown](https://github.com/govynnus) during their Google Summer of Code internship last summer. The MSC has since been accepted, and released in the stable Matrix specification as of [Matrix v1.2](https://matrix.org/blog/2022/02/02/matrix-v-1-2-release). As a result, its Synapse implementation has been updated to remove support for unstable identifiers. Administrators of homeservers on which the reverse proxy rules explicitly allow the unstable route for this feature need to update their configuration. Same goes for developers of Matrix clients that support this feature. See the [upgrade notes](https://matrix-org.github.io/synapse/v1.53/upgrade#stablisation-of-msc3231) for more information.

## Time-based cache expiry now enabled by default

To avoid being overly intensive on resources by making too many queries to the database, Synapse maintains several in-memory caches to store data it needs to use frequently. However, this comes with the inconvenience that, if Synapse needs to store too much data, these caches can become fairly big and occupy too much space in the host's memory.

Historically, Synapse has dealt with this issue by having set sizes for each cache, either hardcoded or set in the configuration, and evicting the oldest items when exceeding this size. [Synapse 1.38](https://github.com/matrix-org/synapse/releases/tag/v1.38.0) introduced the possibility for homeserver administrators to configure Synapse to evict cache entries based on the time they were last accessed on. This mechanism acts on top of the aforementioned eviction policy, and allows automatically evicting entries that haven't been accessed for some time, leaving more room in the caches to store data that needs to be accessed more often.

Synapse 1.53 enables this behaviour by default. Without specific configuration, Synapse will automatically evict cache entries that haven't been accessed for more than 30 minutes. Server administrators that were already using this feature might need to update their configuration, as this change deprecates the `expiry_time` configuration setting, which will be removed in a future version of Synapse. See the [upgrade notes](https://matrix-org.github.io/synapse/v1.53/upgrade#time-based-cache-expiry-is-now-enabled-by-default) for more information.

## Everything else

You might have heard that we're working on improving the time it takes to join big Matrix rooms with Synapse. If not, then you definitely want to have a look at [the demos Matrix live](https://youtu.be/yxV73TQAodE?t=1095) that was published earlier this month and includes more details and a demo of the work we've been doing in this area.

This release of Synapse includes an implementation of [MSC3706](https://github.com/matrix-org/matrix-doc/pull/3706), which is part of this work. It's still very experimental and definitely not production-ready, but it's a huge stepping stone towards making room joins snappier than ever.

We've also been continuing our work towards enabling end-to-end encryption for application services (see the [Synapse 1.50 release blogpost](https://matrix.org/blog/2022/01/18/synapse-1-50-released) for more context on that). Synapse 1.53 includes support for sending to-device messages to application services. This is also still very experimental, watch this space for future updates.

See the [full changelog](https://github.com/matrix-org/synapse/releases/tag/v1.53.0) for a complete list of changes in this release. Also please have a look at the [upgrade notes](https://matrix-org.github.io/synapse/v1.53/upgrade#upgrading-to-v1530) for this version.

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including (in no particular order) [Dirk Klimpel](https://github.com/dklimpel), [Brad Jones](https://github.com/bradjones1), and [Alexander Mnich](https://github.com/a-mnich).
