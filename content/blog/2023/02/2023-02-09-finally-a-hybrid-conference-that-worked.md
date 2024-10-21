+++
title = "FOSDEM 2023: Matrix’s first physical devroom"
date = "2023-02-09T21:12:10Z"
updated = "2023-02-09T17:02:40Z"
path = "/blog/2023/02/09/finally-a-hybrid-conference-that-worked"

[taxonomies]
author = ["Thib"]
category = ["conferences", "fosdem"]

[extra]
image = "https://matrix.org/blog/img/fosdem2023_stand_blurred.jpg"
+++

For the past two years, FOSDEM couldn’t happen in-person. Fortunately we could
help, and Matrix hosted the world's largest free & open source software
conference online! This year we were finally back in-person… but not only.

[The set-up we have arranged in 2021](https://matrix.org/blog/2021/02/15/how-we-hosted-fosdem-2021-on-matrix)
and [polished in 2022](https://matrix.org/blog/2022/02/07/hosting-fosdem-2022-on-matrix)
has proved to be robust and served us well during the pandemic. Returning to an
in-person conference didn’t mean we had to throw it all away… quite the
opposite!

<!-- more -->

This year the OSS community could gather in-person, go see each other’s stands,
and attend all too few of all the fascinating talks the speakers had prepared
for us… but the conference was yet more.. Some of us couldn’t make it in person
but could attend FOSDEM online from its Matrix Space. Devrooms were broadcasted
live into the Matrix rooms where devroom managers and speakers could interact
with the online audience.

In total, thousands of users joined us online, both locally and remotely as
seen from the FOSDEM homeserver: an amazing audience given the possibility to be
on site.

For us, it was also an opportunity to announce Matrix 2.0 to a live audience!
Matrix 2.0 doesn’t mean we’re making breaking changes in the spec. It’s more of
a nickname we gave to the milestone [we had promised in summer to deliver by the
end of the year](https://matrix.org/blog/2022/08/15/the-matrix-summer-special-2022#matrix-20)
and had far too much giving the mother of all demos to a packed room of nearly
1500 people.

{{ youtube_player(video_id="eUPJ9zFV5IE") }}

## The first ever in-person Matrix devroom

This year was also the first ever in-person devroom for the Matrix Foundation
and Community. We had many proposals and could have used the whole day, but we
had to share with many other deserving communities. We’re extremely grateful to
FOSDEM organisers for the devroom… and it was a huge success! At many points the
room was completely packed, with no seats left at all.

We could [shoehorn 8 talks](https://fosdem.org/2023/schedule/track/matrix/) in
the in-person devroom. Picking them was really difficult! When one of the
speakers unfortunately called in sick, the devroom healed the wound and filled
the gap very quickly.

The devroom started with a quick intro to Matrix from Matthew & Amandine.

{{ youtube_player(video_id="dPgYy-Y4f7w") }}

Florian followed with a talk about MatrixRTC to explore what Matrix can do
beyond instant messaging

{{ youtube_player(video_id="P--LwIB3deA") }}

Then Matthew did an awesome demo of Third Room and “3D widgets” (user generated
content) that can be embedded into its worlds. Of course with a nice “The Matrix
in Matrix” scene.

{{ youtube_player(video_id="nG8qJ4on00Y") }}

Stunning 3D worlds are great, but the most popular use case for Matrix today is
instant messaging. And we did a lot as the Matrix Foundation to significantly
improve the performance with Sliding Sync, using matrix-rust-sdk as the showcase
implementation. Kegan and Ben covered Sliding Sync and matrix-rust-sdk
respectively, while Mauro showed us how Element X, the first client to use it,
doesn’t stop here and goes way beyond to provide a snappy, sturdy, polished
client.

{{ youtube_player(video_id="5iIs1zWuVOU") }}

Kim and Oliver from Nordeck made an interesting presentation about how widgets
can make Matrix a rich app creation environment.

{{ youtube_player(video_id="hhEUe414scU") }}

The Trixnity project then introduced their fast, multi-purpose, well-tested SDK.
A talk you don’t want to miss, particularly if you’re into Kotlin.

{{ youtube_player(video_id="zDftIZm-DZ0") }}

Pierre from Technostructures introduced us to [Kazarma](https://technostructures.org/projects/kazarma/)
a bridge between Matrix and ActivityPub. In Pierre’s own words: “we talked a lot
about interoperability, and we found it sad that we talked about
interoperability for proprietary platforms, not with alternative decentralised
networks, so we tried doing that”. And they did. Bravo Pierre and the team!

{{ youtube_player(video_id="D3olH1aUCkQ") }}

Finally Yan concluded the in-person devroom with a speedrun of all the Matrix
projects he could find around. The video is not out yet, so we’ll add it to the
second follow-up blog post: the one with the online devroom conferences!

## Matrix for more than remote attendance

FOSDEM staff used the Matrix rooms for on-site support. Whether the camera was
blurry, microphones didn’t work, or there was a missing power plug: staff could
be notified and answer very quickly before sending someone to actually solve the
issue. But it also allowed staff to notify devroom managers for small
adjustments, if speakers ever disappeared from the scene.

Staff also told us Matrix worked much more reliably than anything other than
walkie talkies from a coordination perspective and was more versatile. They
consider narrowing down their use of walkies next year in favour of a deeper
integration with Matrix. We’re excited to see that Matrix was yet again a great
solution in the stressful, high paced context of a conference that gathered
several thousand people in-person and several thousand more online.

## Attending in-person

Finally, a large part of the joy of attending FOSDEM comes from the people you
meet there. The least we can say is that our stand was busy. We ran out of
stickers and medium size t-shirts early on Sunday morning, but above all we had
plenty of interesting discussions.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/fosdem2023_stand_blurred.jpg)

A few people discovered Matrix during FOSDEM and were blown away by messages
making it from Slack to Discord before their eyes, all thanks to Matrix and
bridges. The overwhelming majority of people who came to us were already happy
users willing to discuss architecture, our plans for the future, or even to
verify each other with QR Codes or emoji.

We want to thank the FOSDEM staff for organising this edition and using Matrix
again: a successful return to the in-person format that builds on the online
experience of the past two years. See you next year folks!
