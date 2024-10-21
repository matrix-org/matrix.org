+++
title = "Synapse 1.77 released"
path = "/blog/2023/02/16/synapse-1-77-released"

[taxonomies]
author = ["Mathieu Velten"]
category = ["Releases"]
+++

Greetings Matrix fans! We've published Synapse [version 1.77](https://github.com/matrix-org/synapse/releases/tag/v1.77.0)
as the new stable release this week. Synapse admins are encouraged to upgrade
to it at their convenience.

<!-- more -->

## The new stuff

### Experimental support for intentional mentions (MSC3952)

Mentioning other users on Matrix is difficult: it is not possible to know if mentioning a user
by display name or Matrix ID will count as a mention, but is also too easy to mistakenly mention a user.

[MSC3952](https://github.com/matrix-org/matrix-spec-proposals/pull/3952) proposes a solution. Its idea is to make the mentioning explicit in the protocol using a dedicated event property,
instead of relying on searching the body of the message as before.

Synapse now implements this as an experimental feature.

### Experimental support to suppress notifications from message edits (MSC3958)

Have you ever been annoyed by a noisy notification that keep coming back, but you can't pinpoint
where it's coming from?
This is usually because edits to a message where you are mentioned (or that mention `@room`) will
retrigger a noisy notification. That can be pretty annoying when the message is edited 10 times!

[MSC3958](https://github.com/matrix-org/matrix-spec-proposals/pull/3958)
is here to solve that, and Synapse now implements it as an experimental feature.

### The quest for speed continues

Some iterative optimizations have been implemented that should make [joining or leaving](https://github.com/matrix-org/synapse/pull/14971)
large rooms even faster, and should also [improve sending message](https://github.com/matrix-org/synapse/pull/14962).

## Everything else

See the full [changelog](https://github.com/matrix-org/synapse/releases/tag/v1.77.0), for a
complete list of changes in the release.

Synapse is a Free and Open Source Software project, and we'd like to extend our
thanks to everyone who contributed to these releases, including (in no particular
order) icp1994, dklimpel, Fizzadar and realtyem.

We are also grateful to anyone helping us make Synapse better by sharing their
feedback and reporting issues, or helping with community support questions.
