+++
title = "Matrix at FOSDEM 2019"
path = "/blog/2019/02/04/matrix-at-fosdem-2019"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News"]

[extra]
image = "https://matrix.org/blog/wp-content/uploads/2019/02/DyaWzqGW0AAk9pd.jpg"
+++

Hi all,

We just got back from braving the snow in Brussels at <a href="https://fosdem.org/2019/">FOSDEM 2019</a> - Europe's biggest Open Source conference. I think it's fair to say we had an amazing time, with more people than ever before wanting to hang out and talk Matrix and discuss their favourite features (and bugs)!

The big news is that <strong>we released <a href="/docs/spec/server_server/r0.1.0.html">r0.1 of Matrix's Server-Server API</a> </strong>late on Friday night - our first ever formal stable release of Matrix's Federation API, having addressed the core of the issues which have kept Federation in beta thus far. We'll go into more detail on this in a dedicated blog post, but this marks the first ever time that <strong>all</strong> of Matrix's APIs have had an official stable release.  All that remains before we declare Matrix out of beta is to release updates of the CS API (0.5) and possibly the IS API (0.2) and then we can formally declare the overall combination as Matrix 1.0 :D

We spoke about SS API r0.1 at length in <a href="https://fosdem.org/2019/schedule/event/matrix_french_state/">our main stage FOSDEM talk </a>on Saturday - as well as showing off the Riot Redesign, the E2E Encryption Endgame and giving an update on the French Government deployment of Matrix and the focus it's given us on finally shipping Matrix 1.0! For those who weren't there or missed the livestream, here's the talk!  <a href="/blog/wp-content/uploads/2019/02/2019-02-01-FOSDEM-Matrix-1.0.pdf">Slides are available here</a>.

<iframe src="https://www.youtube.com/embed/C2eE7rCUKlE" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>

> <p lang="en" dir="ltr">Full house for <a href="https://twitter.com/ara4n?ref_src=twsrc%5Etfw">@ara4n</a> talking about <a href="https://twitter.com/matrixdotorg?ref_src=twsrc%5Etfw">@matrixdotorg</a> and the French State <a href="https://twitter.com/fosdem?ref_src=twsrc%5Etfw">@fosdem</a> It was a packed presentation full of lots exciting progress demos. So sorry for practically yanking you offstage in the end! <a href="https://t.co/idshDcSRhv">pic.twitter.com/idshDcSRhv</a></p>&mdash; Rob Pickering (@RobinJPickering) <a href="https://twitter.com/RobinJPickering/status/1091725803715481607?ref_src=twsrc%5Etfw">February 2, 2019</a>

Then, on Sunday we had the opportunity to have a quick <a href="https://fosdem.org/2019/schedule/event/matrix/">20 minute talk in the Real Time Comms dev room</a>, where we gave a tour of some of the work we've been doing recently to scale Matrix down to working on incredibly low bandwidth networks (100bps or less).  It's literally the opposite of the Matrix 1.0 / France talk in that it's a quick deep dive into a very specific problem area in Matrix - so, if you've been looking forward to Matrix finally having a better transport than HTTPS+JSON, here goes!  <a href="/blog/wp-content/uploads/2019/02/2019-02-03-FOSDEM-Low-Bandwidth.pdf">Slides are available here.</a>

<iframe src="https://www.youtube.com/embed/DZBvy4abB1o" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>

> <p lang="en" dir="ltr">Full house for <a href="https://twitter.com/matrixdotorg?ref_src=twsrc%5Etfw">@matrixdotorg</a> ? <a href="https://twitter.com/hashtag/FOSDEM?src=hash&ref_src=twsrc%5Etfw">#FOSDEM</a> <a href="https://twitter.com/hashtag/RTCsevroom?src=hash&ref_src=twsrc%5Etfw">#RTCsevroom</a> <a href="https://t.co/dDQnD3mzmc">pic.twitter.com/dDQnD3mzmc</a></p>&mdash; Saúl Ibarra Corretgé (@saghul) <a href="https://twitter.com/saghul/status/1091995116649267201?ref_src=twsrc%5Etfw">February 3, 2019</a>

Huge thanks to everyone who came to the talks, and everyone who came to the stand or grabbed us for a chat! FOSDEM is an amazing way to be reminded in person that folks care about Matrix, and we've come away feeling more determined than ever to make Matrix as great as possible and provide a protocol+network which will replace the increasingly threatened proprietary communication silos. :)

Next up: Matrix 1.0...
