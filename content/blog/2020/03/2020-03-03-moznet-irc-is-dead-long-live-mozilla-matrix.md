+++
title = "Moznet IRC is dead; long live Mozilla Matrix!"
date = "2020-03-03T21:49:00Z"
updated = "2020-03-03T18:09:39Z"
path = "/blog/2020/03/03/moznet-irc-is-dead-long-live-mozilla-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News"]

[extra]
image = "https://matrix.org/blog/img/2019-12-19-mozilla.png"
+++

Hi all,

Heads up that yesterday at 12:00 ET, the Mozilla IRC network was switched off
after over 22 years of valiant service, and the [mozilla.org Matrix instance is
now in full production](http://exple.tive.org/blarg/2020/02/20/synchronous-messaging-were-live/).
You can get at it via the Riot instance at
<https://chat.mozilla.org>, by pointing your client at
<https://mozilla.modular.im>, or by joining rooms on the mozilla.org server over
federation via its room directory.

We'd like to thank Mozilla again for putting their faith in Matrix, and are
determined to do everything we can to ensure we're a more than worthy
successor to IRC; we have big boots to fill :)

We've been gathering a huge amount of invaluable FTUE (first time user experience)
feedback from the commentary in [#synchronicity:mozilla.org](https://matrix.to/#/#synchronicity:mozilla.org) - and we're in the process
of implementing it over the coming weeks.  In particular, we've already implemented
alphabetic room ordering, custom theming support, and done a bunch more SSO work.

The immediate priorities include:

* Fixing a regression in jumps/jank when scrolling (fix PRed to develop today)
* Enabling Mozilla IAM SSO authentication on remaining "interactive user auth" flows (e.g. managing devices)
* Fixing the UX around selecting server when browsing the room directory.
* Fixing notification defaults, behaviour and settings UX
* Better educating users to connect to the mozilla.modular.im if using a random app.

Finally, it's worth noting that the [matrix-ircd](https://github.com/matrix-org/matrix-ircd) project is
seeing some commits again, many thanks to jplatte from the [Ruma](https://ruma.dev/) project - so if you are
currently despairing the demise of moznet, never fear: you may yet be able to connect to the Mozilla matrix
server [via IRC](https://xkcd.com/1782/) (authing via Mozilla IAM, of course) and pretend that none of this newfangled Matrix stuff
exists :D

Please keep the feedback coming in [#synchronicity:mozilla.org](https://matrix.to/#/#synchronicity:mozilla.org) - we're gathering it all up into Github (under the mozilla label) as well as a high level [Google Doc](https://docs.google.com/document/d/1yG3pqAWN4JLL_omC1E9W7Gc-jAOqFD0OAr5gig1Yilg/edit?usp=drive_web&ouid=106410341666574529833) to help collate everything.

thanks,

\- The Matrix Core Team.

(Comments over at [HN](https://news.ycombinator.com/item?id=22477757))
