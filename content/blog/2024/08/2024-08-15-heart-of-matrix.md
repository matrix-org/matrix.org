+++
date = "2024-08-15T19:00:00Z"
title = "Protecting the projects at the heart of the Matrix ecosystem"

[taxonomies]
author = ["Josh Simmons", "Matthew Hodgson"]
category = ["Foundation"]
+++

There have been many changes at the Foundation in the last couple of years. We’ve added independent leadership, attracted members, continued working towards sustainability, and expanded our open governance to establish a Governing Board to become better and more capable stewards of the protocol and ecosystem. We’re still in a period of organisational transition, getting into the groove with the Governing Board, focusing on the Spec Core Team, and building the technical and financial foundation for independence.

We’ve also been asking ourselves what it means for a project to be “core” to the Foundation, and how the Foundation should relate to and work with the people who maintain those projects. These are fundamental questions for any open source foundation, and they’ve become even more pressing for us since Element switched developing Synapse and several other projects to AGPLv3, rather than contributing under the Foundation as Apache v2.

This blog post explores our context and sets out to start a discussion on how we should move forward. Already, we’ve been having these discussions in Foundation rooms and on the Governing Board, and we look forward to bringing more people into this discussion so that we can ship a framework that delivers on our mission and meets the needs of the Matrix ecosystem.

<!-- more -->

## Where we are and where we’re going

The Foundation’s primary responsibility is to the Matrix specification itself, but the ecosystem has a lot to gain when we provide a neutral home and stewardship for other relevant projects as well.

[We currently host an array of projects](https://github.com/matrix-org/) and even proactively fund maintenance and development on a small number of them. Most of those projects were created by the same set of people who first created Matrix, and the folks they trusted with commit access – providing a consistent set of expectations around trust, security, code quality, maintenance, advocacy, and support – almost all of whom still work on the projects today. This group is referred to as the “Core Team” – which is [formally defined](https://matrix.org/media/2019-06-10%20-%20Matrix.org%20Foundation%20CIC%20Rules.pdf) as those who have direct commit privileges on any of our repositories. But the structure and expectations for this team are due for an update, and the mix of projects under our banner has grown sprawling and a bit chaotic.

The time has come for us to design a coherent, modern framework, with the benefit of hindsight and a Governing Board that can channel important perspectives from across the ecosystem. And once we’ve established that framework, then we can get to designing the processes by which projects join or leave the Foundation, and how decisions are made about resourcing.

If you’d like to get involved, we encourage you to jump into conversations in the Foundation’s rooms and make your voice heard through [your representatives on the Governing Board](https://matrix.org/foundation/governing-board-elections/#elected-representatives).

## Answering the immediate questions

But three questions remain that we think are worth offering provisional answers to now: what will the Foundation do to protect projects at the heart of Matrix? How do we determine what those “core” projects are? And are there any projects that don’t belong at the Foundation?

**The first question is easy to answer:**

_The Foundation will seek to fund and coordinate maintenance and development of core projects even if faced with a competing fork. We believe some projects, like the spec, test suites, SDKs, and shared cryptographic libraries, are so important that they require ongoing stewardship, under a permissive open source licence, by an organisation that is accountable to the ecosystem._

The Foundation may host a variety of other projects for the benefit of the ecosystem, and may also fund and coordinate maintenance and development of some of those projects where we see a meaningful gap in the ecosystem. This broader set of projects is more subject to change over time, and is less likely to receive direct investment from the Foundation.

**But that second question – what is “core?”** It’s not as easy to pin down exactly, and we look forward to formalising a definition and designation process in collaboration with the Governing Board, Spec Core Team, and Guardians.

A non-exhaustive list of projects we think are core includes:

* The Spec, Spec Proposals, the matrix.org website and homeserver, and matrix.to link redirection service
* Integration test suites, to confirm that implementations conform to the spec:
    * sytest
    * complement
    * complement-crypto
* SDKs and libraries which are used extensively by the wider community:
    * matrix-rust-sdk
    * matrix-js-sdk
    * vodozemac

**As to the third question – are there any projects that don’t belong at the Foundation?** Probably, yes. It’s debatable whether it makes sense to host experimental or speculative projects, and we don’t think it’s appropriate to host projects that don’t have anything to do with Matrix specifically.

## Taking the next steps

We hope this helps answer some of the questions that folks have been raising, illuminates where we are on our journey in defining these things, and provides some assurance that the Matrix.org Foundation is ever evolving in partnership with the community and will draw a line to protect and maintain projects that are truly at the heart of Matrix.

Next, we’ll be deliberating on these things with the Governing Board, Spec Core Team, Guardians, and the broader ecosystem including you, the reader. We encourage you to reach out to [your representatives on the Governing Board](https://matrix.org/foundation/governing-board-elections/#elected-representatives) along the way.

Ultimately, we’ll define a framework and begin aligning our operations with it – including defining a legal and governance framework and setting up the infrastructure to facilitate it.

As always, we can’t do this without your support. Some organisations have stepped forward to support our work, but we still don’t have enough to sustain our operations. The more people that come together to fund the Foundation’s work, the more capable we are of investing in core projects, operationalizing more open governance, and nurturing the broader ecosystem.

[Please join the Foundation today](https://matrix.org/support), especially if you depend on Matrix, to ensure the Matrix ecosystem is here for you today and tomorrow.

Thanks,

Josh Simmons and Matthew Hodgson
