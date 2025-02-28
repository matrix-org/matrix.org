+++
title = "Dendrite development final report (GSoC 2019)"
date = "2019-09-10T18:21:51Z"
path = "/blog/2019/09/10/dendrite-development-final-report-g-so-c-2019"

[taxonomies]
author = ["Alex Chen"]
category = ["GSOC"]
+++

## Overview

During GSoC 2019, I participated in and pushed forward the development of
[Dendrite][dendrite], a high-performance, scalable [Matrix
homeserver](https://matrix.org/docs/guides/introduction) implementation written
in Go.

Like many others passionate about Dendrite, I've been eager to see the day when
it finally joins the decentralised, federated [Matrix
network](https://matrix.org/), so I worked on the project to see how much I
could do to bridge the gap between it and the current reference homeserver
implementation, [Synapse](https://github.com/matrix-org/synapse), in terms of
feature completeness.

Working on Dendrite in just one area would be insufficient to propel it, so my
work covers various
[components](https://github.com/matrix-org/dendrite/blob/master/WIRING.md)
in the project, including the Client/Server API, Sync Server, Room Server,
and Federation Component. I also spent time refining the project's
documentation, improving its testing/continuous integration process, as well as
reviewing pull requests from Matrix.org members and the community.

Below is the major portion of my work presented as pull requests, categorised by
the components they belong to; a list of links to all the pull requests I
created/reviewed is also available at the end of this report.

## Work in Component: Client/Server API

_This component is the main handler of HTTP requests from the clients, except for
`/sync` requests - see next part._

Work done:

- [Implement client single event retrieval (#693)](https://github.com/matrix-org/dendrite/pull/693)
- [Implement profile retrieval over federation (#726)](https://github.com/matrix-org/dendrite/pull/726)
- [Add missing servers field in /directory/room/:alias response (#732)](https://github.com/matrix-org/dendrite/pull/732)
- [Implement room creation content (#754)](https://github.com/matrix-org/dendrite/pull/754)
- ...and other fixes and improvements

Work left:

- [Implement guest access (#668)](https://github.com/matrix-org/dendrite/issues/668)
    - This was removed from the plan for GSoC so work with higher priorities
    according to the
    [milestone](https://github.com/matrix-org/dendrite/milestone/5) could be
    done first.

## Work in Component: Sync Server

_The Sync Server is responsible for handling the long polling notification
requests (`/sync` requests) and some other related requests from the clients._

Work done:

- [Add EDU support and typing notifications to /sync (#718)](https://github.com/matrix-org/dendrite/pull/718)
    - EDU stands for Ephemeral Data Units; they are events carrying short-term
    status in the room, for example typing notifications.
- [Implement "full\_state" query parameter for /sync (#751)](https://github.com/matrix-org/dendrite/pull/751)
- ...and other fixes and improvements

Work left:

- Support for other types of EDUs

## Work in Component: Room Server

_The Room Server is, as its name suggests, where room events, state, etc. are
handled._

Work done:

- [Implement event redaction (#768)](https://github.com/matrix-org/dendrite/pull/768)
    - This also includes a relatively large chunk of changes in the Sync Server.
- [Fix permission and 404 response for alias deletion (#706)](https://github.com/matrix-org/dendrite/pull/706)
- ...and other fixes and improvements

Work left:

- Support for alias deletion by admins
- Discussion on and implementation of event retention policies

## Work in Component: Federation

_The Federation Component sends requests to and receives requests from other
Matrix homeservers._

Work done:

- [Add joined hosts query APIs (#781)](https://github.com/matrix-org/dendrite/pull/781)
- (In [matrix-org/gomatrixserverlib][gomatrixserverlib]) Support for more query
  types in Federation Client: [Leave
  API](https://github.com/matrix-org/gomatrixserverlib/pull/130), [Public Rooms
  API](https://github.com/matrix-org/gomatrixserverlib/pull/129), [Profile Query
  API](https://github.com/matrix-org/gomatrixserverlib/pull/128)
- ...and other fixes and improvements

Work left:

- Implementation of a "Most Recent Transaction Sender" In-Memory Cache
    - There is a delay in this part of work because some dependency problems
    took longer than expected to resolve, but this has been planned and will
    be worked on after GSoC.
- Implementation of a component that handles backoff/retries for federation requests

## General Fixes, Improvements, Maintenance Work

- Data race fixes
    - [Fix data races reported by go test -race ./... (#748)](https://github.com/matrix-org/dendrite/pull/748)
    - [Fix data race in clientapi/routing/register.go (#787)](https://github.com/matrix-org/dendrite/pull/787)
- Fixes for incorrect transaction ID scopes
    - [Fix transaction IDs in transaction cache have global scope (#772)](https://github.com/matrix-org/dendrite/pull/772)
    - [Associate transactions with session IDs instead of device IDs (#789)](https://github.com/matrix-org/dendrite/pull/789)
- Improvements for building/testing process
    - [Refine config and docs for sytest (#714)](https://github.com/matrix-org/dendrite/pull/714)
    - [Fix build conflict between docker environment and host (#598)](https://github.com/matrix-org/dendrite/pull/598)

## Links to All Pull Requests

Here is a list of links to all the pull requests I have created/reviewed (by 26
Aug, 2019):

| Repository                                        | Pull Requests                                                                          |
|---------------------------------------------------|----------------------------------------------------------------------------------------|
| [matrix-org/dendrite][dendrite]                   | [Created (36)][dendrite-created] / [Reviewed (27)][dendrite-reviewed]                  |
| [matrix-org/gomatrixserverlib][gomatrixserverlib] | [Created (12)][gomatrixserverlib-created] / [Reviewed (1)][gomatrixserverlib-reviewed] |
| [matrix-org/sytest][sytest]                       | [Created (5)][sytest-created]                                                          |

[dendrite-created]: https://github.com/matrix-org/dendrite/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3ACnly+created%3A%3C2019-08-26
[dendrite-reviewed]: https://github.com/matrix-org/dendrite/pulls?utf8=%E2%9C%93&q=is%3Apr+reviewed-by%3ACnly+-author%3ACnly+created%3A%3C2019-08-26

[gomatrixserverlib-created]: https://github.com/matrix-org/gomatrixserverlib/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3ACnly+created%3A%3C2019-08-26
[gomatrixserverlib-reviewed]: https://github.com/matrix-org/gomatrixserverlib/pulls?utf8=%E2%9C%93&q=is%3Apr+reviewed-by%3ACnly+-author%3ACnly+created%3A%3C2019-08-26

[sytest-created]: https://github.com/matrix-org/sytest/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3ACnly+created%3A%3C2019-08-26

## Appendix: On Dendrite Being a GSoC Project

I believe that Dendrite is a pretty special project to work on in the GSoC
program.

At its current state, Dendrite isn't a complete homeserver yet. This has left a
large portion of work on Dendrite wide open: As I worked on Dendrite, more than
often I'd find myself in a place to answer questions related to topics like
design or project architecture which, if not thoroughly thought through, might
have consequences in the future development of the project. For this reason, I
think working on Dendrite involves a set of challenges quite different from what
attempting to improve an already functioning piece of software would have
presented.

For the same reason, I think what Dendrite has taught me during the
summer was less about how to become more fluent in Go or more familiar with
various tools, but more about developing the mindset that powers software
projects behind the scenes. But this mindset, to myself, seems more valuable
than the former, indeed.

And at the end of this report, I'd like to thank my mentors
[anoa](https://matrix.to/#/@andrewm:amorgan.xyz) and
[Brendan](https://matrix.to/#/@brendan:abolivier.bzh), as well as everyone else
at Matrix who has answered my questions, discussed with me, and helped me
understand the code, and at the same time being super responsive. Without your
help, my GSoC experience wouldn't have been this enjoyable! :)

[dendrite]: https://github.com/matrix-org/dendrite
[gomatrixserverlib]: https://github.com/matrix-org/gomatrixserverlib
[sytest]: https://github.com/matrix-org/sytest
