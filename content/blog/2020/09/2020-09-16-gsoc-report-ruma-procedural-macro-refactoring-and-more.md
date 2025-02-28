+++
title = "GSOC report: \tRuma procedural macro refactoring and more"
date = "2020-09-16T16:35:54Z"
path = "/blog/2020/09/16/gsoc-report-ruma-procedural-macro-refactoring-and-more"

[taxonomies]
author = ["Devin Ragotzy"]
category = ["GSOC"]
+++

This is part of a series of reports on the [*six* projects](https://summerofcode.withgoogle.com/organizations/6060943798173696) assigned to Matrix for Google Summer of Code 2020.

[View project:  Ruma procedural macro refactoring and more](https://summerofcode.withgoogle.com/organizations/6060943798173696/#4756651216732160)

----

Wow the summer has flown by, it feels like just yesterday I was learning how to rebase and what exactly it is Ruma does. I exaggerate slightly, but it is a big library with lots of public API surface. I have learned more in the last few months than in two years of school. I have been able to observe and participate in a project with a community growing around it, been a part of discussions about design and best practices, given and received numerous code reviews as well as learned the process of addressing the feedback, and working from a specification. In short, this has been an amazing opportunity to gain experience in all the things that are hard to obtain in a classroom.

My project goal was to improve the existing macros in ruma-events-macros and ruma-api-macros. It became clear early on that this would include some major API changes and that improving the macros as they were was pointless without also moving to a new public API. While improving the durability and readability of the macro code I also rewrote entire sections to accommodate the new design.

A quick overview of the Matrix protocol for reference: a client sends content that is interpreted by the server as events. The server distributes those events out to other clients and other servers (the server case is known as federation). Ruma groups these events by kind Message, State, Ephemeral, ToDevice and Basic which are represented as generic structs (`StateEvent<C>`). Each event kind needs to be able to hold many different content types, for state events there is room creation, room name, and membership events to name a
few. Using the macros, enums are generated to represent all state event possibilities, so a variant for membership, room name, etc. These types exist to support the core API request and response types for each endpoint that is defined by the Matrix specification.

## GSoC Starts and I start with ruma-events

- [remove old ruma-events macros](https://github.com/ruma/ruma-events/pull/85)
- [start work for event content derive, move to generic Event structs](https://github.com/ruma/ruma-events/pull/86)
- [collect all content types into enum](https://github.com/ruma/ruma-events/pull/101)
- [add more types, making sure the macro works](https://github.com/ruma/ruma-events/pull/107)
- [work on Event custom macro derive](https://github.com/ruma/ruma-events/pull/108)
- [remove raw modules and FromRaw trait](https://github.com/ruma/ruma-events/pull/111)
- [add each events enum](https://github.com/ruma/ruma-events/pull/119)
- [add trybuild tests for ruma-events](https://github.com/ruma/ruma-events/pull/122)

## More work on ruma-events, now a part of the new mono-repo

- [deserialization optimization for Any*Event, and benchmarking to verify](https://github.com/ruma/ruma/pull/52)
- [reverting the removal of enum_enum macro, learning a lot of git along the way](https://github.com/ruma/ruma/pull/68)
- [it took me awhile but I got the hang of it, only one review issue!](https://github.com/ruma/ruma/pull/69)
- [add accessor methods to the enums, making them much nicer to use](https://github.com/ruma/ruma/pull/97)

## Work on ruma-client-api

- [refactoring the Api::to_tokens code helped me get my head around this crate](https://github.com/ruma/ruma/pull/104)
- [notice my commit messages are starting to looking better](https://github.com/ruma/ruma/pull/105)
- [not everything works out...](https://github.com/ruma/ruma/pull/108)
- [but you get it eventually](https://github.com/ruma/ruma/pull/109)
- [deep dive into rust features, I learned a lot about them](https://github.com/ruma/ruma/pull/111)

## Back to ruma-events

- [a ruma events and client-api rename](https://github.com/ruma/ruma/pull/130)
- [add code to generate redact method in event_enum!](https://github.com/ruma/ruma/pull/138)
- [adding to existing code without breaking everything is hard](https://github.com/ruma/ruma/pull/139)
- [converting to and from the rusty way](https://github.com/ruma/ruma/pull/155)
- [I love writing proc_macros, this was a fun one! Adding lifetimes in the req/resp macro](https://github.com/ruma/ruma/pull/179)

## Continuing maintenance

- [quality of life stuff, the day to day work of a maintainer](https://github.com/ruma/ruma/pull/190)
- [allow the internal macros to be used outside of the ruma crate more easily](https://github.com/ruma/ruma/pull/201)
- [adding small needed features to the macros](https://github.com/ruma/ruma/pull/213)
- [good ol' fashioned closing issues!](https://github.com/ruma/ruma/pull/234)

One of my personal goals was to become more familiar with git. With the help of my mentor I now feel more confident using this tool that is so essential to developers. I became fairly adept at merging, rebasing, and navigating all the headaches that come with that. I learned plenty of new commands. A few highlights: `cherry-pick` and specific uses of `reset` to avoid copy-pasting fixes and adding more commits. I used the `reset` command to craft good commits, splitting work into appropriate chunks. I am glad that I had the opportunity to hone my git skills. I feel like I have accomplished my goal and then some!

I am proud of the work that I have done: Being part of moving ruma-events much closer to the `0.22` release and creating macros to generate types specific to the Matrix specification. Working with the community that has grown around Ruma has been rewarding and I plan on sticking around.
