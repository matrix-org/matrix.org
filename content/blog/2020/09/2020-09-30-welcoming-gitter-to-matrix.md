+++
title = "Welcoming Gitter to Matrix!"
date = "2020-09-30T16:28:55Z"
updated = "2020-09-30T14:58:14Z"
path = "/blog/2020/09/30/welcoming-gitter-to-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/2020-09-30-gitter.png"
+++

![Gitter ♥️ Matrix](/blog/img/2020-09-30-gitter.png)

Hi all,

We are ridiculously excited to announce that [Gitter](https://gitter.im) is joining the Matrix ecosystem and will become the first major existing chat platform to switch to natively speaking Matrix!

If you’re reading this from the Gitter community and have no idea what Matrix is: we’re an open source project that provides an open protocol for secure, decentralised communication - effectively the missing real-time communication layer of the open Web.  The open Matrix network has more than 20M users on it and is growing fast (adding another 1.7M or so with the arrival of Gitter!)

Gitter is easily one of the best developer community chat systems out there, used by the communities of some massive projects ([Node](https://gitter.im/nodejs/home), [TypeScript](https://gitter.im/Microsoft/TypeScript), [Angular](https://gitter.im/angular/home), [Scala](https://gitter.im/scala/home) etc) and is a custodian of huge archives of knowledge via their chat logs. Gitter is unique in specifically focusing on developers: their tagline is literally “Where developers come to talk” (unlike Slack, which has barely any community features - or Discord, with its ban on unofficial clients, where developers are a bit of an afterthought relative to the gamers). With Gitter natively joining Matrix, we’re super excited to see the global developer community converging on the open Matrix network - and Gitter’s community rooms should see a huge new lease of life as they’re properly made natively available to the wider network as first class citizens :)

We’ve always had a bit of a crush on Gitter ever since we ended up opposite each other in the exhibition hall at TechCrunch Disrupt Europe 2014 - particularly when they demoed us not only their sexy webapp but also their official IRC server bridge at irc.gitter.im :D  Over the years we’ve been gently nudging them to consider fully embracing Matrix, but perhaps understandably they’ve been busy focusing on their own stuff. However, earlier this year, our friends at GitLab (who acquired Gitter in 2017) reached out to explore the opportunity of Gitter becoming a core part of Matrix rather than a non-core project at GitLab… and we’ve jumped on that opportunity to bring Gitter fully into Matrix.

In practice, the way this is happening is that Element (the company founded by the Matrix core team to fund Matrix development) is acquiring Gitter from GitLab, with a combined Gitter and Element dev team focusing on giving Gitter a new life in Matrix!  You can read about it from the Element angle over on [the Element blog](https://element.io/blog/gitter-is-joining-element/).

Practically speaking, we have a pretty interesting plan here, which we’d like to be very transparent about given it’s a little unusual:

At first, Gitter will keep running as it always has - needless to say, we will be doing everything we can to delight the Gitter community and keep the service in good shape.

Then we’re going to build out native Matrix connectivity - running a dedicated Matrix homeserver on gitter.im with a new bridge direct into the heart of Gitter; letting all Gitter rooms be available to Matrix directly as (say) #angular_angular:gitter.im, and bridging all the historical conversations into Matrix via [MSC2716](https://github.com/matrix-org/matrix-doc/blob/matthew/msc2716/proposals/2716-importing-history-into-existing-rooms.md) or similar. We will of course do this entirely as open source, just as Gitter itself is open source thanks to GitLab releasing it under the MIT license in 2017. The plan is to comprehensively document our progress as the flagship worked example case study of “how do you make an existing chat system talk Matrix.”

This will of course replace the old and creaky [matrix-appservice-gitter](https://github.com/matrix-org/matrix-appservice-gitter) bridge we’ve been running since 2016. Gitter users will also be able to talk to other users elsewhere in the open Matrix network - e.g. DMing them, and (possibly) joining arbitrary Matrix rooms. Effectively, **Gitter will have become a Matrix client**.

Now we come to the interesting bit. Gitter has some *really* nice features which are sorely lacking in Element today:

* Instant live room peeking (less than a second to load the webapp into a live-view of a massive room with 20K users!!)
* Seamless onboarding thanks to using GitLab & GitHub for accounts
* Curated hierarchical room directory
* Magical creation of rooms on demand for every GitLab and GitHub project ever
* GitLab/GitHub activity as a first-class citizen in a room’s side-panel
* Excellent search-engine-friendly static content and archives
* KaTeX support for Maths communities
* Threads!

...and we promise to do everything in our power to preserve and honour these features at all costs and continue to give the Gitter community the experience they’ve come to know and love.

**However**: in the medium/long term, it’s simply not going to be efficient for the combined Element/Gitter team to split our efforts maintaining two high-profile Matrix clients. Our plan is instead to merge Gitter’s features into Element (or next generations of Element) itself and then - if and only if Element has achieved parity with Gitter based on the above list - we expect to upgrade the deployment on gitter.im to a Gitter-customised version of Element. The inevitable side-effect is that we’ll be adding new features to Element rather than Gitter going forwards.

In practice, the main outcome in the end should be Element having benefited massively from levelling up with Gitter - and Gitter benefiting massively from all the goodies which Element and Matrix brings, including:

* E2E Encryption
* Reactions
* Constantly improving native iOS & Android clients (which should be a welcome alternative to Gitter’s natives ones, which are [already being deprecated](https://gitlab.com/gitlab-org/gitter/webapp/-/issues/2281))
* VoIP and conferencing
* All the alternative clients, bots, bridges and servers in Matrix
* The full open standard Matrix API
* Widgets (embedding webapps into rooms!)
* ...and of course participation in the wider decentralised Matrix network.

So, there you have it. It’s a new era for Gitter - and we look forward to reinvigorating Gitter’s communities over the coming months. We hope Gitter users will be blown away by the features arriving from Matrix… and we hope that Element users will be ecstatic with the performance and polish work that Gitter-parity will drive us towards. Imagine having guest access in Element that can launch and load a massive room in less than a second!

Finally, we would like to explicitly reassure the Gitter community again that we love and understand Gitter (it was one of the very first ever bridges we wrote for Matrix, for instance) - and we will be doing everything we can to not screw up our responsibility in looking after it. Please, please let us know if you have any concerns or if we ever fall short on this.

Any questions, come talk to us on [#gitter:matrix.org](https://matrix.to/#/#gitter:matrix.org) - which is bridged with [https://gitter.im/matrix-org/gitter](https://gitter.im/matrix-org/gitter).  Exciting times ahead!

\- Matthew, Amandine, and the whole Matrix, Element and Gitter teams.

<div style="text-align: center">
    <img src="/blog/img/2020-09-30-gitter-photo.jpg" width="480" alt="Matthew & Amandine being dorky"/>
    <br/>
    <i><small>Matthew and Amandine model 2014-vintage Matrix & Gitter swag in celebration :D</small></i>
</div>

## Bonus update - The Changelog Interview

Sid Sijbrandij (CEO at GitLab) and Matthew had a chance to sit down with [The Changelog](https://changelog.com) to talk about Gitter's Big Adventure - so tune in to hear the story first hand!  Warning: contains non-ironic use of the word "synergy" :D

<br/>
<div style="text-align: center">

<a rel="noopener" href="https://cdn.changelog.com/uploads/podcast/414/the-changelog-414.mp3">
    <img src="https://matrix.org/blog/img/2020-09-30-gitter-changelog.png" alt="Changelog podcast 414"/>
</a>

<a href="https://changelog.com/podcast/414">The Changelog 414: Gitter's Big Adventure</a> - Listen on <a href="https://changelog.com/">Changelog.com</a>

</div>
