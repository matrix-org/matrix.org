+++
title = "So long Half-Shot, thanks for all the bridges"
path = "/blog/2018/08/31/so-long-half-shot-thanks-for-all-the-bridges"

[taxonomies]
author = ["Ben Parsons"]
category = ["Thoughts"]
+++

Thank you to Half-Shot for all your work on Bridges over the last months and beyond. Today is your last day, but I'm sure we'll see you again before long. Text below is from Half-Shot.

<hr />

Today marks my last day of my 3 month internship at New Vector (the startup which hires many of the core Matrix team). For those of you who haven't been reading Ben's fabulous blog posts, I've been working exclusively on bridges; in particular the IRC bridge.

Tasked with the goal of making it crash less and run faster, I hope that the evidence is visible and people are generally having a better experience on it!

Some stats pulled from the matrix-appservice-irc repo:
<ul>
  <li>39 PRs closed (4 remain open)</li>
  <li>27 issues closed, 27 issues opened.</li>
  <li>334 commits, averaging 7.6 commits a PR.</li>
</ul>
Commits this year:

<img class="alignnone size-full wp-image-3506" src="/blog/wp-content/uploads/2018/08/commits_year.png" alt="Commits this year" width="751" height="179" />

<hr />

But aside from showing off some stats, I wanted to mention all the new features:
<ul>
  <li>Replies on Matrix translate well to IRC, or as well as IRC allows.</li>
  <li>People mentioning your IRC nick now ping your matrix user, finally!</li>
  <li>So. Many. Metrics. Everything you wanted to know about the internals of the bridge, but were too afraid to <code>--inspect</code>.</li>
  <li>Not spamming homeservers with join requests on startup (it makes for a happy ops team).</li>
  <li>No longer are IRC users shackled to a "(IRC)" extension on their displayname, you can be who you want
with group flairs!</li>
  <li>Support for node 4 has been dropped, and support for 6,8 and 10 has been assured.</li>
</ul>
On the <a href="https://github.com/matrix-org/matrix-appservice-bridge">matrix-appservice-bridge</a> side, I optimised some calls to cache locally and avoid hitting the homeserver too often, and disabling presence for homeservers that don't support it.

There are future plans to make bridging more visible to Matrix Clients as a first class citizen. Ideas like <a href="https://github.com/matrix-org/matrix-doc/issues/1410">speccing a state event (MSC1410)</a> so that bridges can interact with each other properly and clients can create full bridge management views which are still decentralised from an integration manager.

I'd like to give a shoutout to Travis who has reviewed nearly all my changes that have made their way into the bridge, on top of all the other tasks he has on his plate. And of course a thank you to all of the Matrix team who have been very supportive during my time here.
