+++
title = "Welcome to the 2019 GSoC Participants!"
path = "/blog/2019/05/07/welcome-to-the-2019-g-so-c-participants"

[taxonomies]
author = ["Andrew Morgan"]
category = ["GSOC"]

[extra]
image = "https://matrix.org/blog/wp-content/uploads/2015/01/logo1.png"
+++

It’s that time of year again! Matrix.org is once again participating in the [Google Summer of Code](https://summerofcode.withgoogle.com/) program. We have been allocated four student slots by Google this year, and narrowing the 18 proposals we received down to just four was a very difficult task.

In the end, we have decided on the following four students and their proposed projects:

Alexey Andreyev’s proposal involves adding end-to-end encryption to [libQMatrixClient](https://github.com/QMatrixClient/libqmatrixclient) for future support in Qt/libQMatrixClient-based clients such as [Quaternion](https://github.com/QMatrixClient/Quaternion) and [Spectral](https://gitlab.com/spectral-im/spectral/). They will be mentored by [kitsune](https://matrix.to/#/@kitsune:matrix.org), lead developer of libQMatrixClient, and our own end-to-end encryption expert, [uhoreg](https://matrix.to/#/@uhoreg:matrix.org).

Kai Hiller’s proposal for more reliable third-party protocol [bridges](https://matrix.org/docs/projects/bridges) includes adding the ability to notify the user when a message fails to reach its final destination despite being accepted by the bridge. [Half-Shot](https://matrix.to/#/@half-shot:half-shot.uk).

Eisha Chen-yen-su’s proposal for Matrix Visualisations aims to “develop a tool which will visualise the event Directed Acyclic Graph data structure which describes the conversation history in a room. It will be a real-time visualisation of the DAG of a given Matrix room, as seen from the perspective of one or more HomeServers (HSes).” They state that “this tool will be useful for debugging or administration of Matrix HSes by making people able to easily see how the federation process works”. They have already posted prototypes of their tool in [#gsoc:matrix.org](https://matrix.to/#/#gsoc:matrix.org), and it’s all written in Rust! Which makes their mentor, [erikj](https://matrix.to/#/@erikj:jki.re), very happy.

And finally, Cnly’s proposal for working towards completion of [Dendrite](https://github.com/matrix-org/dendrite)’s Client-Server API. The proposal also touches on general improvements to the codebase and increasing test coverage. Cnly will be mentored by [babolivier](https://matrix.to/#/@brendan:abolivier.bzh) and [anoa](https://matrix.to/#/@andrewm:amorgan.xyz).

Congratulations to the selected students. We look forward to participating with you on completing your project over the course of the summer holidays.

If your proposal was not selected, do not give up hope! Being an active member of the Matrix community and having a deep understanding of the ecosystem and its projects is a big part of what we look for when choosing candidates. If you stick around, you have a strong chance of being chosen in a subsequent year.

We will not be sharing individual’s proposal documents, but students are free to share them as they please.
