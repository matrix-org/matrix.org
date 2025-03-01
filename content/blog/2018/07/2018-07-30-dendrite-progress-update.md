+++
title = "Dendrite Progress Update"
path = "/blog/2018/07/30/dendrite-progress-update"

[taxonomies]
author = ["Ben Parsons"]
category = ["Tech"]
+++

As you may know, for the last few months anoa (Andrew) and APWhiteHat have been working on Dendrite, the next generation Matrix homeserver, written in Go. We asked for an update on their progress, and Andrew provided the blog post below. Serious progress has been made on Dendrite this summer!

<hr />

Hey everyone, my name is Andrew Morgan and I've been working full-time over the summer on Dendrite, our next-generation Matrix homeserver. Over the last two months, I've seen the project transform from a somewhat functioning toy server to a near-production-ready homeserver that is working towards complete feature support. I've appreciated the thought put into the project since day one, and enjoy the elegance of the multi-component design. Documentation is fairly decent at the moment, but comments are plentiful throughout the codebase, while the code itself tends towards simple and maintainable rather than complex and unmanageable.

## Application Service Integration

The main focus of my time here has been on the implementation of application service support for Dendrite. Application services are external programs that act as privileged extensions to a homeserver, allowing such functionality as bots in rooms and bridges to third-party networks. Supporting application services requires a few different bits and pieces to be set up. Currently all planned features have a PR for them, with the bold items already merged:

<ul>
  <li><strong>Sending events to application services</strong></li>
  <li><strong>Support user masquerading for events</strong></li>
  <li><strong>Support editing event timestamps</strong></li>
  <li>Support room alias querying</li>
  <li>Support user ID querying
</li>
  <li>Support third party lookup proxying
</li>
</ul>
As you can see a decent portion of the functionality is already in master! The rest will hopefully follow after some further back and forth.

## Google Summer of Code

I certainly haven't been going at this all on my own. Alongside extensive help from Erik, who's been mentoring me, our resident Google Summer of Code student, APWhiteHat, has been tackling feature after feature in Dendrite wherever he can find them. Application services received a good deal of help on client-server endpoint authentication side, however, APWhiteHat has mostly been focusing on federation and some other very useful pieces. While his GSoC period still has a week or so before its conclusion, he has so far implemented:

<ul>
  <li style="font-weight: 400;">Idempotency to roomserver event processing to prevent duplication
</li>
  <li style="font-weight: 400;">Username auto generation
</li>
  <li style="font-weight: 400;">Tokens library based on macaroons
</li>
  <li style="font-weight: 400;">Lots of left-over federation stuff: state API & get missing events being the major ones
</li>
  <li style="font-weight: 400;">AS support to clientapi auth
</li>
  <li style="font-weight: 400;">Typing server: handling of PUT /typing by clientapi
</li>
  <li style="font-weight: 400;">More typing server stuff on its way
</li>
</ul>
From my perspective, APWhiteHat was an excellent developer to work with. He asked good questions and was quick to answer any myself or the community had as well. His code reviews were also very comprehensive. I learned a lot from working with him and everyone else :)

## OpenTracing and Prometheus Monitoring

Placing any large server into a production environment requires extensive monitoring capabilities in order to ensure operations are running smoothly. To that effect, Dendrite has been both the addition of OpenTracing and Prometheus support. Prometheus, also used heavily in Synapse, allows a homeserver operator to track a wide range of data including endpoint usage, resource management as well as user statistics over any given range of time.

In Dendrite, we are taking this one step further by introducing <a href="https://opentracing.io/">OpenTracing</a>, a language and platform-agnostic framework for tracking the journey of an endpoint call from incoming request to outgoing response, with every method, hierarchy change and database call in between. It will be immensely useful in tracking down performance issues, as well as providing insight into the most critical paths throughout the codebase and where we should focus most of our optimization efforts on. It also comes with a lovely dashboard courtesy of <a href="https://www.jaegertracing.io/">Jaeger</a>:

<a href="/blog/wp-content/uploads/2018/07/image1.png"><img class="alignnone size-large wp-image-3432" src="/blog/wp-content/uploads/2018/07/image1-1024x527.png" alt="" width="1024" height="527" /></a>

## Community

We've also seen some encouraging interest and development work from the community in the past couple months. While PR review from our own side is admittedly slow due to our focus on getting the foundational work in place, that hasn't stopped both old and new developers from sending in PRs and performing code reviews. A huge thank you to everyone involved! From this we've gotten API implementations and application service fixes from @turt2live, <a href="https://twitter.com/matrixdotorg/status/1022887733931520001">an end-to-end encryption implementation from @fadeAce</a>, filtering support from @CromFr, and some PRs and numerous helpful review comments from @krombel.

We've also started to see some people running Dendrite in live environments, which is incredibly exciting for us to see! While Dendrite is not considered production-ready yet (though it moves closer every day), if you are interested in giving it a go please consult the quickstart <a href="https://github.com/matrix-org/dendrite/blob/master/INSTALL.md">installation guide</a>. We look forward to any feedback you may have!
