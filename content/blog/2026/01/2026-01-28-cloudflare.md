+++
date = "2026-01-28T01:00:00+00:00"
title = "Matrix on Cloudflare Workers"
path = "/blog/2026/01/28/matrix-on-cloudflare-workers"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

+++

There’s been a lot of attention over Cloudflare publishing a well-intentioned but rather flawed [blog post](https://blog.cloudflare.com/serverless-matrix-homeserver-workers/) demonstrating how one might go about running a Matrix server in TypeScript on Cloudflare Workers as a serverless architecture.

On one hand, we’re deeply flattered that a company with the size and reputation of Cloudflare is paying attention to Matrix and publishing implementations \- and the post is a very cool demo, and does demonstrate effectively how you might go about implementing a Matrix server on Workers.  On the other hand, it’s unfortunate that the post severely overclaimed the scope of the project: to be clear, the code doesn’t yet implement any of Matrix’s core features which allow you to federate safely, and so doesn’t yet constitute a functional Matrix server, let alone a production-grade one which you should consider deploying.  It doesn’t model rooms as a replicated graph of events; it doesn’t check permissions or uphold power levels: it’s the equivalent of a filesystem which ignores permissions, or a blockchain which doesn’t implement a consensus mechanism.

Honestly, we feel a bit bad for the author: if you’re using an LLM to prototype an implementation of an unfamiliar protocol, you might not know where to check where the agent is overstating the truth \- and you might not be aware how sensitive folks are to problems caused by overenthusiastic use of LLMs, especially if they have invested lots of time and effort into understanding and building functional Matrix implementations themselves.  And while some criticism is justified here, we’re not at all fans of the pile-on which has happened, and we sincerely hope the author can bounce back stronger from the situation.

On the Matrix side, we’d like to welcome Cloudflare to the ecosystem anyway \- we just wish it had been a smoother entrance\! Thank you for building on Matrix. The good news is that the demo successfully serves its purpose to illustrate how Cloudflare Workers operate, and the code could certainly be used as the basis for a working server in future.  Meanwhile, there’s a whole host of other places where Matrix and Cloudflare could play nice together \- e.g. [td’s proof of concept](https://matrix.org/blog/2024/04/12/this-week-in-matrix-2024-04-12/#matrix-dart-sdk-website) for using Cloudflare Calls as a MatrixRTC backend, and meanwhile Cloudflare’s CDN has been invaluable in protecting [matrix.org](http://matrix.org)’s web traffic over the years.

It’s worth noting that The Matrix Foundation depends entirely on membership fees to fund our work to build out the missing communication layer of the open Web \- a mission which is more important today than ever before.  And while the number of organisational members has doubled in the last year, the Foundation is not yet financially sustainable \- seriously undermining our ability to fund work on improving the spec, improving our trust & safety tooling, or supporting and growing a healthy and broad Matrix ecosystem.  All it takes is for a few large organisations like Cloudflare who benefit from Matrix to [join the Foundation as members](https://matrix.org/membership/) and we will be able to accelerate once more \- to the direct benefit of everyone in the ecosystem.  So, we sincerely hope that folks like Cloudflare who see the value in using Matrix to promote and power their products will consider joining up, and so help accelerate Matrix to the point that it can truly provide a mainstream alternative to the centralised incumbents.