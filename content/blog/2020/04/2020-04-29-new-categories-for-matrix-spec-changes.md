+++
title = "New Categories for Matrix Spec Changes"
date = "2020-04-29T22:37:45Z"
updated = "2020-04-29T20:50:24Z"
path = "/blog/2020/04/29/new-categories-for-matrix-spec-changes"

[taxonomies]
author = ["Andrew Morgan"]
category = ["General"]

[extra]
image = "/blog/img/2020-04-28-msc-banner.avif"
+++

On April 14th, the Spec Core Team conducted a long-overdue retrospective
about the things that were working in the
[Matrix Spec Proposal process](https://matrix.org/docs/spec/proposals),
and those that were not.

The most glaring item on the list was the sluggish pace that many Matrix
Spec Changes (MSCs) take throughout the proposal process, as well as the
general lack of activity from the Spec Core Team members on proposals that
have not yet started a Final Comment Period.

We deeply apologize for the frustration this has likely caused many MSC
authors, and want to shed some light on the reasoning behind it, and what we
plan to do to prevent leaving authors in the dark about why there may be no
Spec Core Team activity on their proposal.

## Proposal Triaging

There are currently 136 open MSCs that have yet to undergo Final Comment
Period (FCP), 75 of which are marked as proposal-in-review, and 20 that have
a FCP proposed. Relative to the 65 MSCs that have ever been closed, this is a
lot of outstanding ideas, features and maintenance changes.

The Spec Core Team itself is made up of 8 members, each of which have
separate full-time jobs. All team members are well-placed to be on the team
given their wide breadth of knowledge across the Matrix ecosystem,
however the majority are some of the most busy pushing forward Matrix's
reference implementations - without which, Matrix will unquestionably fail.
This limits the amount of MSCs that the team can effectively work on at a
given time.

The team understands that there are MSCs that provide incredibly useful
features, such as
[support for LaTeX in messages](https://github.com/matrix-org/matrix-doc/pull/2191)
or
[the ability to "knock" on rooms](https://github.com/matrix-org/matrix-doc/pull/2403),
and would undoubtedly like to see them land at some point.

But there is also a large backlog of MSCs that provide even more fundamental
fixes and additions to the protocol that the team needs to prioritise. These
include things like
[cross-signing devices](https://github.com/matrix-org/matrix-doc/pull/2472),
[the communities rewrite](https://github.com/matrix-org/matrix-doc/pull/1772) and
finally merging
[reactions and edits](https://github.com/matrix-org/matrix-doc/pull/1849) into the spec.

While we announce what MSCs we're focusing on during a given week during
[TWIM](https://matrix.org/twim), it's not as clear which items we're looking
to pull from the backlog next. To help tackle this, and to help keep us
honest, we've begun putting each MSC into either "feature", "maintenance", or
"core" buckets. This materialises in the form of github tags, which can be
used to filter the list of MSCs like so:
[feature](https://github.com/matrix-org/matrix-doc/issues?q=is%3Aopen+label%3Akind%3Afeature),
[maintenance](https://github.com/matrix-org/matrix-doc/issues?q=is%3Aopen+label%3Akind%3Amaintenance),
[core](https://github.com/matrix-org/matrix-doc/issues?q=is%3Aopen+label%3Akind%3Acore).
For a given timespan, we’ll pick a track and pull MSCs out of that category
when possible. More information about MSC categories are now detailed on
[the proposals page](https://matrix.org/docs/spec/proposals#categories).

As for the next 6 to 12 months, we plan to work on items from the “core”
category. We need to get Matrix to a point where it can compete with other,
proprietary chat protocols and items in "core" are decidedly the proposals
that will take us the furthest in that direction. This doesn't mean we won't
occasionally look at an MSC in a different category, but it will heavily
influence our prioritisation.

## Future

We'll try this approach out over the next few months and see how it goes. The
next Spec Core Team retro will occur in the middle of May, where we will
review the process once again.

For now, if you have any feedback please come and chat with us in
[#matrix-spec:matrix.org](https://matrix.to/#/#matrix-spec:matrix.org) :)
