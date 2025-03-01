+++
title = "Introducing Cerulean"
path = "/blog/2020/12/18/introducing-cerulean"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/2020-12-18-cerulean.png"
+++

Hi all,

We have a bit of an unexpected early Christmas present for you today…

Alongside all the normal business-as-usual Matrix stuff, we’ve found some time to do a mad science experiment over the last few weeks - to test the question: “Is it possible to build a serious Twitter-style decentralised microblogging app using Matrix?”

It turns out the answer is a firm “yes” - and as a result we’d like to present a **very** early sneak preview of [Cerulean](https://cerulean.matrix.org): a highly experimental new microblogging app for Matrix, complete with first-class support for arbitrarily nested threading, with both Twitter-style (“vertical”) and HN/Reddit-style (“horizontal”) layout… and mobile web support!

[![Cerulean screenie](https://matrix.org/blog/img/2020-12-18-cerulean-screenshot.jpg)](https://cerulean.matrix.org/@kegan:dendrite.matrix.org/!bHe21S4P3axekSRD:dendrite.matrix.org/$0QE6vqMZiS9169Y-3C84dkQui-1G5uG2eGFsYzPrhx8)

Cerulean is unusual in many ways:

* It’s (currently) [a very minimal javascript app](https://github.com/matrix-org/cerulean) - only 2,500 lines of code.
* It has zero dependencies (other than React).
    * This is to show just how simple a fairly sophisticated Matrix client can be...
    * ...and so the code can be easily understood by folks unfamiliar with Matrix...
    * ...and so we can iterate fast while figuring out threading...
    * ...and because none of the SDKs support threading yet :D
* It relies on [MSC2836: Threading](https://github.com/matrix-org/matrix-doc/pull/2836) - our highly experimental Matrix Spec Change to extend relationships (as used by reaction & edit aggregations) to support free-form arbitrary depth threading.
* As such, **it only works on Dendrite**, as that’s where we’ve been experimenting with implementing MSC2836.  (We’re now running an [official public Dendrite server instance](https://matrix.org/blog/2020/12/15/dendrite-2020-progress-update) at dendrite.matrix.org though, which makes it easy to test - and our test Cerulean instance [https://cerulean.matrix.org](https://cerulean.matrix.org) points at it by default).

This is **very much a proof of concept.**We’re releasing it today as a sneak preview so that intrepid Matrix experimenters can play with it, and to open up the project for contributions! (PRs welcome - it should be dead easy to hack on!).  Also, we give no guarantees about data durability: both Cerulean and dendrite.matrix.org are highly experimental; do not trust them yet with important data; we reserve the right to delete it all while we iterate on the design.

### What can it do?

So for the first cut, we’ve implemented the minimal features to make this something you can just about use and play with for real :)

* Home view (showing recent posts from folks you follow)
* Timeline view (showing the recent posts or replies from a given user)
* Thread view (showing a post and its replies as a thread)
* Live updating (It’s Matrix, after all! We’ve disabled it for guests though.)
* Posting plain text and images
* Fully decentralised thanks to Matrix (assuming you’re on Dendrite)
* Twitter-style “Vertical” threading (replies form a column; you indent when someone forks the conversation)
* HN/Reddit/Email-style “Horizontal” threading (each reply is indented; forks have the same indentation)
* Basic Registration & Login
* Guest support (slightly faked with non-guest users, as Dendrite’s guest support isn’t finished yet)
* Super-experimental proof-of-concept support for [decentralised reputation filtering](https://matrix.org/blog/2020/10/19/combating-abuse-in-matrix-without-backdoors)(!)

Obviously, there’s a huge amount of stuff needed for parity with a proper Twitter-style system:

* Configurable follows.  Currently the act of viewing someone’s timeline automatically follows them.  This is because Dendrite doesn’t peek over federation yet (but [it’s close](https://github.com/matrix-org/dendrite/pull/1391)), so you have to join a room to view its contents - and the act of viewing someone’s timeline room is how you follow them in Cerulean.
* Likes (i.e. plain old Matrix reactions, although we might need to finally sort out federating them as aggregations rather than individually, if people use them like they use them on Twitter!)
* Retweets (dead easy)
* Pagination / infinite scrolling (just need to hook it up)
* Protect your posts (dead easy; you just switch your timeline room to invite-only!)
* Show (some) replies to messages in the Home view
* Show parent and sibling context as well as child context in the Thread view
* Mentions (we need to decide how to notify folks when they’re mentioned - perhaps Matrix’s push notifications should be extended to let you subscribe to keywords for public rooms you’re not actually in?)
* Notifications (although this is just because Dendrite doesn’t do notifs yet)
* Search (again, just needs to be implemented in Dendrite - although how do you search beyond the data in your current homeserver? Folks are used to global search)
* Hashtags (it’s just search, basically)
* Symlinks (see below)
* Figure out how to handle lost unthreaded messages (see below)
* Offline support? (if we were using a proper Matrix SDK, we’d hopefully get this for free, but currently Cerulean doesn’t store any state locally at all).

### How does it work?

Every message you send using Cerulean goes into two Matrix rooms, dubbed the "timeline" room and the "thread" room. The "timeline" room (with an alias of [#@matthew:dendrite.matrix.org](https://matrix.to/#/#@matthew:dendrite.matrix.org) or whatever your matrix id is) is a room with all of your posts and no one else's. The "thread" room is a normal Matrix room which represents the message thread itself. Creating a new "Post" will create a new "thread" room. Replying to a post will join the existing "thread" room and send a message into that room. MSC2836 is used to handle threading of messages in the "thread” room - the replies refer to their parent via an m.relationship field in the event.

These semantics play nicely with existing Matrix clients, who will see one room per thread and a flattened chronological view of the thread itself (unless the client natively supports MSC2836, but none do yet apart from Cerulean). However, as Cerulean only navigates threaded messages with an m.reference relationship (eg it only ever uses the new /event_relationships API rather than /messages to pull in history), **normal messages sent by Matrix into a thread or timeline room will not yet show up in Cerulean.**

In this initial version, Cerulean literally posts the message twice into both rooms - but we’re also experimenting with the idea of adding “symlinks” to Matrix, letting the canonical version of the event be in the timeline room, and then the instance of the event in the thread room be a ‘symlink’ to the one in the timeline.  This means that the threading metadata could be structured in the thread room, and let the user do things like turn their timeline private (or vice versa) without impacting the threading metadata.  We could also add an API to both post to timeline and symlink into a thread in one fell swoop, rather than manually sending two events.  It’d look something like this:

![Cerulean diagram](https://matrix.org/blog/img/2020-12-18-cerulean-diagram.png)

We also experimented with cross-room threading (letting Bob’s timeline messages directly respond to Alice’s timeline messages and vice versa), but it posed some nasty problems - for instance, to find out what cross-room replies a message has, you’d need to store forward references somehow which the replier would need permission to create.  Also, if you didn’t have access to view the remote room, the thread would break. So we’ve punted cross-room threading to a later MSC for now.

Needless to say, once we’re happy with how threading works at the protocol level, we’ll be looking at getting it into the UX of Element and mainstream Matrix chat clients too!

### What’s with the decentralised reputation button?

Cerulean is very much a test jig for new ideas (e.g. threading, timeline rooms, peeking), and we’re taking the opportunity to also use it as an experiment for our first forays into publishing and subscribing to reputation greylists; giving users the option to filter out content by default they might not want to see… but doing so on their own terms by subscribing to whatever reputation feed they prefer, while clearly visualising the filtering being applied.  In other words, this is the first concrete experimental implementation of the work proposed in the second half of [Combating Abuse in Matrix without Backdoors]( https://matrix.org/blog/2020/10/19/combating-abuse-in-matrix-without-backdoors).  This is super early days, and we haven’t even published a proto-MSC for the event format being used, but if you’re particularly interested in this domain it’s easy enough to figure out - just head over to [#nsfw:dendrite.matrix.org](https://matrix.to/#/#nsfw:dendrite.matrix.org) (warning: not actually NSFW, yet) and look in /devtools to see what’s going on.

So, there you have it - further evidence that Matrix is not just for Chat, and a hopefully intriguing taste of the shape of things to come! Please check out the demo at [https://cerulean.matrix.org](https://cerulean.matrix.org) or try playing with your own from [https://github.com/matrix-org/cerulean](https://github.com/matrix-org/cerulean), and then head over to [#cerulean:matrix.org](https://matrix.to/#/#cerulean:matrix.org) and let us know what you think! :)
