+++
title = "GSOC: Implementing End-to-End Encryption in the Matrix Python SDK"
path = "/blog/2018/08/01/gsoc-implementing-end-to-end-encryption-in-the-matrix-python-sdk"

[taxonomies]
author = ["Ben Parsons"]
category = ["Tech"]
+++

Following on from the previous post, we have an update from zil0 on his <a href="https://summerofcode.withgoogle.com/organizations/6091058287476736/#5468043765874688">GSoC project</a>, which entailed implementing E2E support in the Matrix Python SDK.

<hr />

The goal of my project is to implement Matrix's end-to-end encryption protocol in Python, as part of <a href="https://github.com/matrix-org/matrix-python-sdk">matrix-python-sdk</a>. My mentors are Richard van der Hoff (richvdh) and Hubert Chathi (uhoreg).

It was easy to get started on the project, since the simple parts came first (adding API calls), and then the whole process to follow is documented in an <a href="/docs/guides/e2e_implementation.html">implementation guide</a>, while there is also the reference implementation in JavaScript. And most importantly, the community is nice. :)

Some parts of the work consist in wrapping around the cryptographic primitives implemented in <a href="https://git.matrix.org/git/olm/">libolm</a> (via <a href="https://github.com/poljar/python-olm">Python bindings</a>), in order to handle encrypted events. Others are less straightforward, such as tracking device lists of users, or finding the right way to persist keys and related data between startups.

An interesting aspect of this project is that I am working on a new part of the Python SDK, while also having to integrate with existing code, which is a cool balance between freedom and guidelines.

As the encryption documentation is a bit outdated and incomplete, one (fun) difficulty is to look for information across old issues, Gdocs and source code (and asking my mentor when in doubt). For anyone trying to implement E2E, it should be better by the end of the project, as I am currently working on documenting the missing bits.

I have had a great experience so far. Working on an open source project differs from my previous coding experiences, as people are actually going to use what I write! I have learnt to think about the best design from a usability point of view, discuss different approaches, and I had to write tests and document my code, which sadly is not something I do on personal projects. I enjoyed reviews, and the discussions they led to. And of course I have learnt quite an interesting lot about the E2E voodoo, along with some new Python tricks.

Currently, the implementation is in a working state. Some of the <a href="https://github.com/matrix-org/matrix-python-sdk/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3AZil0">code</a> is merged, and some is awaiting review. It is possible to try it <a href="https://github.com/matrix-org/matrix-python-sdk/issues/100#issuecomment-402508438">here</a> before everything is merged.
The project will be finished in about one week, after some tidying up and when I release device verification and key sharing, which should be the last missing features compared to Riot.
