+++
date = "2023-11-06"
title = "The future of Synapse and Dendrite"
path = "/blog/2023/11/06/future-of-synapse-dendrite"

[taxonomies]
author = ["Josh Simmons"]
category = ["General"]

+++

Last week, Element informed the Foundation that it will be forking [Synapse](https://github.com/matrix-org/synapse/) and [Dendrite](https://github.com/matrix-org/dendrite/). We’re sharing this news with you, along with some background, and our thoughts about this development.

We’ll do our best to answer your questions, address concerns, and find a path forward together.

<!-- more -->

## Background

Long time community members may know that Synapse and Dendrite predate the Foundation. Indeed, they even predate Element, dating back to 2014 and 2017. The creators of Matrix founded Element, and invested in the development of the projects. When the Foundation formed, Element transferred the projects and copyrights to the Foundation. While individual contributors retained their copyright, Element continued to assign to the Foundation. Both projects are under the permissive [ALv2](https://opensource.org/license/apache-2-0/) license, and assigned to the Foundation since 2019 by Element. Future contributions to Element’s forks will use the reciprocal [AGPLv3](https://opensource.org/license/agpl-v3/) license, with a [Contributor License Agreement](https://en.wikipedia.org/wiki/Contributor_License_Agreement) (CLA).

Synapse and Dendrite have been under the auspices of the Foundation since 2019. Our role has been to hold the assets and provide some infrastructure. We’ve seen Matrix adoption and use of Synapse and Dendrite skyrocket over the past few years. Sadly, the same isn’t true of the contributor ecosystem for those projects. The vast majority of maintenance and development on these projects comes from folks working at Element.

This context doesn’t make the changes easier, but it does illuminate how we got here. For more background and information on the projects, we recommend you [read Element’s announcement](https://element.io/blog/element-to-adopt-agplv3/).

## What's next?

That was our first question too! This is a transition we want to navigate with care — how we proceed hinges on both what the Foundation can do and what it should do, grounded in [our mission](https://matrix.org/about/#mission).

As it stands, the Foundation does not plan to begin funding active development of the current Synapse and Dendrite projects. Even if it made sense for us to do so, we don't have the resources.

With that said, the Foundation has a role in funding research and development of open source software for the Matrix ecosystem. We figure that the most effective way to fulfill that role is to address gaps. With that principle in mind, we guide our scarce resources to things like Trust & Safety, and offering community infrastructure. We'd decline to compete with an actively maintained open source project.

We expect these forks of Synapse and Dendrite will be widely adopted, and we wish them well!

Beyond that, we don’t have all the answers yet. This is new territory we will need to navigate as a community. Matrix is bigger than any one or two open source projects – it’s an [open protocol](https://spec.matrix.org/latest/) and [a whole ecosystem](https://matrix.org/ecosystem/servers/).

## What does this mean for you?

For most people, including the 115 million plus Matrix users on the open federation, there will be no material changes.

People who run a Synapse or Dendrite server shouldn’t notice a big change. They’ll need to get their upstream releases from Element’s repositories going forward.

You are welcome to fork Synapse and Dendrite yourself. Indeed, you’ll also be able to fork Element’s versions, as they remain open source under the new license. Note that if you fork the Foundation versions under the ALv2 license, they won’t receive security updates.

Of course, folks building on any of these open source projects will have the rights and responsibilities that come with their licenses.

We’ll share more info as we have it here on the blog, on our social channels, and in the relevant rooms. We are listening, and hope you’ll join us in conversation in the coming months as we work through this.
