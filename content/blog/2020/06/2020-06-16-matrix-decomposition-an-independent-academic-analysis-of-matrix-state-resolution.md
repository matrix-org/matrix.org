+++
title = "Matrix Decomposition: an independent academic analysis of Matrix State Resolution"
date = "2020-06-16T20:15:30Z"
updated = "2020-06-16T19:09:24Z"
path = "/blog/2020/06/16/matrix-decomposition-an-independent-academic-analysis-of-matrix-state-resolution"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/decomposition.avif"
+++

Hi all,

Regular readers of [TWIM](https://matrix.org/blog/category/this-week-in-matrix/) may be familiar with the [Decentralized Systems and Network Services Research Group](https://dsn.tm.kit.edu/english/index.php) at Karlsruhe Institute of Technology, who have been busy over the last few years analysing Matrix from an independent academic point of view.  The work started in 2018 with Florian Jacob’s [DSN Traveler](https://dsn.tm.kit.edu/matrix/traveller/explained.html) spidering project, resulting in the [Glimpse of the Matrix](https://publikationen.bibliothek.kit.edu/1000100364) paper analysing Matrix’s scale and room/server distribution (at least as it was back then).

Last week, they released an entirely new paper: [Matrix Decomposition: Analysis of an Access Control Approach on Transaction-based DAGs without Finality](https://dl.acm.org/doi/10.1145/3381991.3395399) by Florian Jacob, Luca Becker, Jan Grashöfer and Hannes Hartenstein, presented at [ACM SACMAT ‘20](https://www.sacmat.org/2020/index.php).  

Now, the new paper is an absolutely fascinating deep dive analysis into [State Resolution v2](https://github.com/matrix-org/matrix-doc/blob/master/proposals/1442-state-resolution.md) - the algorithm at the heart of Matrix which defines how servers merge together their potentially conflicting copies of a given room, such that everyone ends up eventually with a consistent view… even in the face of bad actors. This means that Matrix effectively implements a decentralised access control system - ensuring that users stay banned, and only users with permission can ban, etc.  You can see the [slides](https://matrix.org/blog/img/SACMAT_2020_Talk_Matrix_Decomposition.pdf) below, and read the [full paper](https://dl.acm.org/doi/pdf/10.1145/3381991.3395399) here. The video of Florian’s talk from SACMAT should be published shortly.

<br/>

<object data="https://matrix.org/blog/img/SACMAT_2020_Talk_Matrix_Decomposition.pdf" type="application/pdf" width="1024" height="768"></object>

<br/>

To give some context from the Matrix side: designing and implementing State Resolution v2 back in 2018 was a bit of a mission. Our original v1 implementation had some bugs which meant that the result of the merge could unexpectedly favour historical state over the current state (so called ‘state resets’) - thus giving an attacker a way to maliciously revert the state of the room.  In v2 we thought much more carefully about the algorithm, considering state present in one version of the room but not the other as a conflict, separating and applying access control events from regular events, and adding additional ordering of the state in the room by considering events in the context of their authorisation chain (the ‘auth DAG’).  The end result is that we feel confident in v2 State Res, and we haven’t seen any problems with it in the wild since we shipped it in July 2018.

However: state resolution is not intuitive at first - for instance, when you merge two versions of a room together, you treat the state events as unordered sets… even though they are ordered in the context of the room DAG.  The reason is that state res needs to work even if you don’t have a copy of the whole room DAG (otherwise you’d have to download way too much data to participate in a large room).  Another example is the sequence in which orderings are then applied to the state events - and how that interacts with re-authorising those events, to stop malicious ones creeping in.  In the core team, we’ve end up describing it several different ways to try to help folks understand: first Erik’s original [MSC1442](https://github.com/matrix-org/matrix-doc/blob/erikj/state_res_msc/proposals/1442-state-resolution.md), then uhoreg’s [literary Haskell implementation](https://matrix.uhoreg.ca/stateres/reloaded.html), then the terse reference version in [the Spec](https://matrix.org/docs/spec/rooms/v2) itself, and most recently Neil Alexander’s [State Resolution v2 for the Hopelessly Unmathematical](https://matrix.org/docs/guides/implementing-stateres).

As a result we are **very** excited and happy that Florian and the DSN team have now published the first ever independent in-depth analysis of the algorithm, particularly in the context of decentralised access control (i.e. enforcing bans, power levels, etc).  We’re pleasantly surprised that apparently “To the best of our knowledge, Matrix is the only system that implements access control based on an eventually consistent partial order without finality and without a consensus algorithm”.

Even better, the DSN team found some remaining thinkos in Synapse’s implementation and the Matrix specification, which could have caused resolution results to diverge from other implementations, specifically:

1. we weren’t enforcing integers in JSON to be within range [-2<sup>53</sup>+1, 2<sup>53</sup>-1], fixed in [https://github.com/matrix-org/synapse/pull/7381](https://github.com/matrix-org/synapse/pull/7381) and [MSC2540](https://github.com/matrix-org/matrix-doc/blob/clokep/json-validation-room-ver/proposals/2540-stricter-event-validation.md)
2. we forgot to include the notification field when authing power level events, fixed in  [https://github.com/matrix-org/synapse/issues/7501](https://github.com/matrix-org/synapse/issues/7501) and [MSC2209](https://github.com/lucavb/matrix-doc/blob/master/proposals/2209-auth-rules-other-keys-in-m.room.power.levels.md) (thanks to Luca from DSN for the MSC!)
3. we forgot to spec the limit that one should apply to the number of parents of an event in the DAG (fixed in [https://github.com/matrix-org/matrix-doc/pull/2538](https://github.com/matrix-org/matrix-doc/pull/2538))
4. we missed that moderators could set server ACLs which could let them undermine room admins (fixed in [https://github.com/matrix-org/synapse/pull/6834](https://github.com/matrix-org/synapse/pull/6834)).

All of these have now been fixed in Synapse and the latest versions of the spec (room v6), and we’d like to sincerely thank Florian and Luca for rapidly and responsibly disclosing the issues to us.  In other words: this research is directly improving Matrix, and it’s even more exciting that the stated future work for the DSN team is to work on a [formal verification](https://en.wikipedia.org/wiki/Formal_verification) for the security of Matrix’s authorisation rules and state resolution.  This stuff is tough, as anyone who’s played with [TLA<sup>+</sup>](https://en.wikipedia.org/wiki/TLA%2B) will know, and we are incredibly glad that the research community is helping out to formalise and hopefully prove that State Res v2 is as good as we think it is.

We should stress that DSN’s work is completely independent of The Matrix.org Foundation or anyone else building on the protocol; we’re just writing about it here because we think it’s incredibly cool and deserves the attention of the whole Matrix ecosystem.

Thanks again to Florian and the team - we look forward to seeing what comes next!
