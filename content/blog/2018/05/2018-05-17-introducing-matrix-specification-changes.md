+++
title = "Introducing Matrix Specification Changes"
path = "/blog/2018/05/17/introducing-matrix-specification-changes"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

We've been able to start investing more time in advancing the Matrix Specification itself over the last month or so thanks to <a href="https://matrix.to/#/@benpa:matrix.org">Ben</a> joining the core team (and should be able to accelerate even more with <a href="https://www.uhoreg.ca/blog/20180507-1019">uhoreg joining in a few weeks</a>!)  The first step in the new wave of work has been to provide much better infrastructure for the process of actually evolving the spec - whether that's from changes proposed by the core team or the wider Matrix Community.

So, without further ado, we'd like to introduce <a href="/docs/spec/proposals">https://matrix.org/docs/spec/proposals</a> - a dashboard for all the spec change proposals we've accumulated so far (ignoring most of the ones which have already been merged), as well as a clearer workflow for how everyone can help improve the Matrix spec itself.  Part of this is introducing a formal numbering system - e.g. <a href="https://github.com/matrix-org/matrix-doc/issues/1228">MSC1228</a> stands for Matrix Spec Change 1228 (where 1228 is the ID of the Github issue on the <a href="http://github.com/matrix-org/matrix-doc/issues">github.com/matrix-org/matrix-doc/issues</a> repository that tracks the proposal).

Please note that these are *NOT* like XEPs or RFCs - i.e. optional proposals or add-ons to the protocol; instead they are literally proposals for changes to the Matrix Spec itself.  Once merged into the spec, they are only of historical interest.

We've also created a new room: <a href="https://matrix.to/#/#matrix-spec:matrix.org">#matrix-spec:matrix.org</a> to discuss specific spec proposal changes - please join if you want to track how proposals are evolving! (Conversation is likely to fork off into per-proposal rooms or overflow into <a href="https://matrix.to/#/#matrix-dev:matrix.org">#matrix-dev:matrix.org</a> or <a href="https://matrix.to/#/#matrix-architecture:matrix.org">#matrix-architecture:matrix.org</a> depending on traffic levels, however).

Feedback would be much appreciated on this - so please head over to <a href="https://matrix.to/#/#matrix-spec:matrix.org">#matrix-spec:matrix.org</a> and let us know how it feels and how it could do better.

This is also a major step towards properly formalising Matrix.org's governance model - hopefully the changes above are sufficient to improve the health of the evolution of the Spec as we work towards an initial stable release later this year, and then you should expect to see a spec proposal for formal governance once we've (at last!) exited beta :)

Huge thanks to Ben for putting this together, and thanks to everyone who's contributed so far to the spec - we're looking forward to working through the backlog of proposals and turning them all into merged spec PRs!!

Matthew
