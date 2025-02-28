+++
date = "2025-02-20T09:30:00Z"
title = "Switching to Curated Room Directories"

[taxonomies]
author = ["Jim Mackenzie, VP Trust & Safety — The Matrix.org Foundation"]
category = ["General", "Trust & Safety", "Policy"]
+++

As of yesterday, Matrix.org is using a curated room directory. We’re paring down the rooms that are visible to a collection of moderated spaces and rooms. This is an intervention against abuse on the network, and a continuation of work that we started in May 2024\.

In early 2024 we noticed an uptick in users creating rooms to share harmful content. After a few iterations to identify these rooms and shut them down, we realised we needed to change tack. We landed on first reducing the discoverability and reach of these rooms \- after all, no other encrypted messaging platform provides a room directory service, and unfortunately it can clearly serve as a mechanism to amplify abuse. So, in May 2024 we froze the room directory. Matrix.org users were no longer permitted to publish their rooms to the room directory. We also did some manual intervention to reduce the size of the directory as a whole, and remove harmful rooms ahead of blocking them.

This intervention aimed at three targets:

* Lowering the risk of users discovering harmful rooms  
* Stopping the amplification of abuse via an under-moderated room directory  
* Reducing the risk for Matrix client developers for app store reviews

In truth, the way room discovery works needs some care and attention. Room directories pre-date Spaces, and some of the assumptions don't hold up to real world use. From the freeze, and the months since, we've learned a few things. First, the criteria for appearing in a server's room directory in the first place is way too broad. Also, abuse doesn't happen in a vacuum. Some rooms that were fine at the time of the freeze, are not now. There are a few different causes for that, including room moderators losing interest. We looked for criteria to give us the confidence in removing the freeze, and we hit all the edge cases that make safety work so challenging.

Those lessons led to a realization. One of the values of the Foundation is pragmatism, rather than perfection. We weren't living up to that value, so we decided to change. The plan became simpler: move to a curated list of rooms, with a rough first pass of criteria for inclusion. In parallel, we asked the Governing Board to come up with a process for adding rooms in the future, and to refine the criteria. We've completed the first part of the plan today.

## What comes next

There's plenty of scope for refinement here, and we've identified a few places where we can get started:

* The Governing Board will publish criteria for inclusion in the Matrix.org room directory. They'll also tell you how you can suggest rooms and spaces for the directory.
* We're going to recommend safer defaults. Servers should not let users publish rooms unless there are appropriate filtering and moderation tools in place, and people to wield them. For instance, Element have made this change to Synapse in [PR18175](https://github.com/element-hq/synapse/pull/18175)  
* We're exploring discovery as a topic, including removing the room directory API. One promising idea is to use Spaces: servers could publish a default space, with rooms curated by the server admin. Our recent post includes some other projects we have in this area: [https://matrix.org/blog/2025/02/building-a-safer-matrix/](https://matrix.org/blog/2025/02/building-a-safer-matrix/)

## FAQs

**What criteria did you use for this first pass?**  
We used a rough rubric: Is the room already in the room directory, and does the Foundation already protect the room with the Matrix.org Mjolnir? From there, we extended to well-moderated rooms and spaces that fit one of the following:

* Matrix client and server implementations (e.g. FluffyChat, Dendrite)  
* Matrix community projects (e.g. t2bot.io)  
* Matrix homeserver spaces with a solid safety record (e.g. tchncs.de, envs.net)

**Why isn't the Office of the Foundation in the directory?**  
It didn't exist before May 2024, so the Office has never been in the directory. We're going to add it in the next few days, with a couple of other examples that fit our rough rubric.

**How do I add my room/space to the list?**  
At the moment, you can't. The Governing Board will publish the criteria and the flow for getting on the list.

**What do I do if I find a harmful room in the current directory?**  
You shouldn't, but if a room does have harmful content, check out [How you can help](https://matrix.org/blog/2025/02/building-a-safer-matrix/#how-you-can-help)
