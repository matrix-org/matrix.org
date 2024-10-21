+++
title = "Gitter now speaks Matrix!"
path = "/blog/2020/12/07/gitter-now-speaks-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/2020-09-30-gitter.png"
+++

Hi all,

It’s been just over 2 months since we revealed that [Gitter was going to join Matrix](https://matrix.org/blog/2020/09/30/welcoming-gitter-to-matrix) - and
we are incredibly proud to announce that Gitter has officially turned on true native Matrix connectivity:
**all public Gitter rooms are now available natively via Matrix, and all Gitter users now natively exist on Matrix.**
So, if you wanted to join the official Node.js language support room at [https://gitter.im/nodejs/node](https://gitter.im/nodejs/node)
from Matrix, just head over to [#nodejs_node:gitter.im](https://matrix.to/#/#nodejs_node:gitter.im) and \*boom\*, you’re in!

This means Gitter is now running a Matrix homeserver at gitter.im which exposes all the active public rooms - so if you go to the the room directory in Element (for instance) and select gitter.im as a homeserver, you can jump straight in:

![Gitter room directory](https://matrix.org/blog/img/2020-12-07-gitter-roomdir.png)

Once you’re in, you can chat back and forth transparently between users on the Gitter side and the Matrix side, and you no longer have the ugly “Matrixbot” user faking the messages back and forth - these are ‘real’ users talking directly to one another, and every public msg in every public room is now automatically exposed into Matrix.

![Gitter and Matrix going native!](https://matrix.org/blog/img/2020-12-07-gitter-matrix.gif)

So, suddenly all the developer communities previously living only in Gitter ([Scala](https://gitter.im/scala), [Node](https://gitter.im/nodejs/home), [Webpack](https://gitter.im/webpack), [Angular](https://gitter.im/angular), [Rails](https://gitter.im/rails) and thousands of others) are now available to anyone anywhere on Matrix - alongside communities bridged from Freenode and Slack; the native Matrix communities for Mozilla, KDE, GNOME communities etc. We’re hopeful that glueing everything together via Matrix will usher in a new age of open and defragmented dev collaboration, a bit like we used to have on IRC, back in the day.

This is also great news for mobile Gitter users - as the original mobile Gitter clients have been in a [holding pattern for over a year](https://gitlab.com/gitlab-org/gitter/webapp/-/issues/2281), and native Matrix support for Gitter means they are now officially deprecated in favour of Element (or indeed any other mobile Matrix client).

## What features are ready?

Now, this is the first cut of native Matrix support in Gitter: much of the time since Gitter joined Element has been spent migrating stuff over from Gitlab to Element, and it’s only really been a month of work so far in hooking up Matrix. As a result: all the important features work, but there’s also stuff that’s yet to land:

Features ready today:

- Ability to join rooms from Matrix via #org_repo:gitter.im
- Bridging Edits, Replies (mapped to Threads on Gitter), Deletes, File transfer
- Bridging Markdown & Emoji

What remains:

- Ability to send/receive Direct Messages
- Ability to plumb existing Matrix rooms into Gitter natively
- Ability to view past Gitter history from Matrix. This is planned thanks to [https://github.com/matrix-org/matrix-doc/pull/2716](https://github.com/matrix-org/matrix-doc/pull/2716)
- Synchronising the full Gitter membership list to Matrix. Currently the membership syncs incrementally as people speak
- Turning off the old Gitter bridge
- Bridging emotes (/me support) (almost landed!)
- Bridging read receipts
- Synchronising room avatars
- Bridge LaTeX

Stuff we’re not planning to support:

- Ability to join arbitrary rooms on Matrix from Gitter. This could consume huge resources on Gitter, and we’re not in a rush to mirror all of Matrix into Gitter. This will get addressed when Gitter merges with Element into a pure Matrix client.
- Bridging Reactions. Gitter doesn’t have these natively today, and rather than adding them to Gitter, we’d rather work on merging Gitter & Element together.

For more details, we strongly recommend checking out the [native Matrix epic on Gitlab](https://gitlab.com/groups/gitterHQ/-/epics/10) for the unvarnished truth straight from the coal-face!

## How do you make an existing chat system talk Matrix?

In terms of the work which has gone into this - Gitter has been an excellent case study of how you can easily plug an existing large established chat system into Matrix.

At high level, the core work needed was as simple as:

- Add ‘virtual users’, so remote Matrix users can be modelled and represented in Gitter correctly: [https://gitlab.com/gitterHQ/webapp/-/merge_requests/2027/diffs](https://gitlab.com/gitterHQ/webapp/-/merge_requests/2027/diffs).
    - This can be accomplished by simply adding a `virtualUser` property to your chat message/post/tweet schema which holds the mxid, displayName, and avatar as an alternative to your `author` field. Then display the `virtualUser` whenever available over the `author`.
- Add an application service to Gitter to bridge traffic in & out of Matrix: [https://gitlab.com/gitterHQ/webapp/-/merge_requests/2041/diffs](https://gitlab.com/gitterHQ/webapp/-/merge_requests/2041/diffs)
    - This "application service" comes pre-packaged for you in many cases, so for example you can simply drop in a library like [matrix-appservice-bridge](https://github.com/matrix-org/matrix-appservice-bridge) in a Node.js application, and all of the Matrix talking complexity is handled for you.
- Polish it!

In practice, Eric (lead Gitter dev) laid out the waypoints of the full journey:

1. First big step was to add the concept of virtual users to Gitter. We could also have created a new Gitter user for every new matrix ID that appears, but tagging them as virtual users is a bit cleaner.
2. Figuring out how to balance the Matrix traffic coming into/out of Gitter.
   1. Spreading the inbound load comes for free via our existing load-balancer setup (ELB) where we already have 8 webapp servers running the various services of gitter.im. We just run the Matrix bridge on those servers alongside each web and api process, and then the load-balancer’s `matrix.gitter.im` spreads out to the servers.
   1. Events from Matrix then hit the load balancer and reach one of the servers (no duplication when processing events).
   1. If something on Gitter happens, the action occurs on one server and we just propagate it over to Matrix (no duplication or locking needed).
3. We have realtime websockets and Faye subscriptions already in the app which are backed by Mongoose database hooks whenever something changes. We just tapped into the same thing to be able to bridge across new information to Matrix as we receive it on Gitter.
4. Hooking up the official Matrix bridging [matrix-appservice-bridge](https://github.com/matrix-org/matrix-appservice-bridge) library to use Gitter’s existing MongoDB for storage instead of nedb.
5. Figuring out how to namespace the mxids of the gitter users:
   1. It’s nice to have the mxid as human readable as possible instead of just the numerical userId in your service.
   1. But if people can change their username in your service, you can’t change your mxid on Matrix. In the future, we’ll have portable accounts in Matrix to support this ([MSC2787](https://github.com/matrix-org/matrix-doc/pull/2787)) but sadly these are still vapourware at this point.
   1. If you naively just switch the user’s mxid when they rename their username, then you could end up leaking conversation history between mxids(!)
   1. So we went with `@username-userid:gitter.im` for the Matrix ID to make it a bit more human readable but also unique so any renames can happen without affecting anything.
6. For room aliases, we decided to change our `community/room` URI syntax to underscores for the room aliases, `#community_room:gitter.im`
7. Figuring out how to bridge features correctly;
   1. Emoji - mapping between `:shortcode:` and unicode emojis
   1. Mapping between Gitter threaded conversations &lt;-> Matrix replies
   1. Mapping between Matrix mentions and Gitter mentions
8. Keeping users and room data in sync
   1. We haven’t gotten there yet, but the data comes through the same Mongoose hook and we can update the bridged data as they change on the Gitter end.

Meanwhile, the Matrix side of gitter.im is hosted by [Element Matrix Services](https://element.io/matrix-services) and is a plain old Synapse, talking through to Gitter via the Application Service API. An alternative architecture would be to have got Gitter directly federating with Matrix by embedding a “homeserver library” into it (e.g. embedding [Dendrite](https://github.com/matrix-org/dendrite)). However, given Dendrite is still beta and assumes it is storing its data itself (rather than persisting in an existing backend such as Gitter’s mongodb), we went for the simpler option to start with.

It’s been really interesting to see how this has played out week by week in the Gitter updates in This Week in Matrix: you can literally track the progress and see how the integration came to life between [Oct 9](https://matrix.org/blog/2020/10/09/this-week-in-matrix-2020-10-09#gitter), [Oct 23](https://matrix.org/blog/2020/10/23/this-week-in-matrix-2020-10-23#gitter), [Nov 6](https://matrix.org/blog/2020/11/06/this-week-in-matrix-2020-11-06#gitter), [Nov 27](https://matrix.org/blog/2020/11/27/this-week-in-matrix-2020-11-27#gitter) and finally [Dec 4](https://matrix.org/blog/2020/12/04/this-week-in-matrix-2020-12-04#gitter).

Huge thanks go to Eric Eastwood, the lead dev of Gitter and mastermind behind the project - and also to Half-Shot and Christian who’ve been providing all the support and review from the Matrix bridging team.

## What’s next?

First and foremost we’re going to be working through the “What remains” section of the list above: killing off the old bridge, sorting out plumbed rooms, hooking up DMs, importing old Gitter history into Matrix, etc. This should then give us an exceptionally low impedance link between Gitter & Matrix.

Then, [as per our original announcement](https://matrix.org/blog/2020/09/30/welcoming-gitter-to-matrix), the plan is:

_In the medium/long term, it’s simply not going to be efficient for the combined Element/Gitter team to split our efforts maintaining two high-profile Matrix clients. Our plan is instead to merge Gitter’s features into Element (or next generations of Element) itself and then - if and only if Element has achieved parity with Gitter - we expect to upgrade the deployment on gitter.im to a Gitter-customised version of Element. The inevitable side-effect is that we’ll be adding new features to Element rather than Gitter going forwards._

Now, that means implementing some features in Matrix/Element to match...

- Instant live room peeking (less than a second to load the webapp into a live-view of a massive room with 20K users!!)
- Seamless onboarding thanks to using GitLab & GitHub for accounts
- Curated hierarchical room directory
- Magical creation of rooms on demand for every GitLab and GitHub project ever
- GitLab/GitHub activity as a first-class citizen in a room’s side-panel
- Excellent search-engine-friendly static content and archives
- KaTeX support for Maths communities
- Threads!

...and this work is in full swing:

- We have a proposal for fast peeking (via lazy-loading state over federation) at [MSC2775](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2775/proposals/2775-lazy-loading-over-federation.md) and the new peek APIs at [MSC2753](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2753/proposals/2753-peeking-via-sync-v2.md) and [MSC2444](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2444/proposals/2444-peeking-over-federation-peek-api.md) (and even implemented by Dendrite)
- Social Login for seamless onboarding via GitLab, GitHub & friends is almost landed in Element: [https://github.com/matrix-org/matrix-react-sdk/pull/5426](https://github.com/matrix-org/matrix-react-sdk/pull/5426)
- Spaces gives a curated hierarchical room directory: [https://github.com/vector-im/roadmap/issues/2](https://github.com/vector-im/roadmap/issues/2)
- KaTeX support landed in Element Web a few weeks ago thanks to [akissinger](https://github.com/akissinger) and [thosgood](https://github.com/thosgood)
- Threads are on the horizon, thanks to [MSC2836](https://github.com/matrix-org/matrix-doc/pull/2836).

The only bits which aren’t already progressing yet are tighter GL/GH integration, and better search engine optimised static archives.

So, the plan is to get cracking on the rest of the feature parity, then merge Gitter & Element together - and meanwhile continue getting the rest of the world into Matrix :)

We live in exciting times: open standards-based interoperable communication is on the rise again, and we hope Gitter’s new life in Matrix is the beginning of a new age of cross-project developer collaboration, at last escaping the fragmentation we’ve suffered over the last few years.

Finally, please do give feedback via [Gitter](https://gitter.im/matrix-org/gitter) or [Matrix](https://matrix.to/#/#matrix-org_gitter:gitter.im) (or [mail](mailto:matrix@matrix.org)!) on the integration and where you’d like to see it go next!

Thanks for flying Matrix and Gitter,

\-- The Matrix Team
