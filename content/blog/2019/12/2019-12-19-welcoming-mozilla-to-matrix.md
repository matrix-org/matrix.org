+++
title = "Welcoming Mozilla to Matrix!"
path = "/blog/2019/12/19/welcoming-mozilla-to-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News"]

[extra]
image = "https://matrix.org/blog/img/2019-12-19-mozilla.png"
+++

Hi all,

We’re incredibly excited that [Mozilla just announced](https://discourse.mozilla.org/t/synchronous-messaging-at-mozilla-the-decision/50620) that they’ve selected Matrix as the successor to IRC as the communication platform for the public Mozilla community!!  This comes off the back of a [formal 1-month trial](https://discourse.mozilla.org/t/synchronous-messaging-at-mozilla-trial-servers-feedback/44871) in September to evaluate various options side by side, and now New Vector will be helping Mozilla get their homeserver up and running on the [Modular.im](https://modular.im) hosting platform over the coming weeks - and federating openly with the rest of the open global Matrix network! :)

We have always been massive fans of Mozilla: they have been an excellent role model as champions of the open web, open standards, not to mention open source - and it’s fair to say that Mozilla has been a major inspiration to how Matrix has evolved (Riot aspires to be to Matrix what Firefox is to the Web: a flagship open source app which provides an accessible friendly interface into an open standard network).  It’s very reassuring to see that Mozillians from the trial recognise the alignment and have converged on Matrix as the way forward - it’s a massive win for the open web and standards-based communication in general.

It’s worth noting that we’ve also always been massive fans of IRC, and Matrix is unashamedly derivative of IRC in capabilities and culture, while broadening the scope to decentralised synchronisation and relaying of any kind of data.  For context, the genesis of the team which eventually spawned Matrix was on a student IRC server ~20 years ago - and subsequently everything we’ve worked on (up to Matrix) was coordinated exclusively through IRC.  We even used to give conference talks on how to run your project/company off IRC.  I can’t really overstate how fundamental IRC is to our history - and we still keep our private IRC network online for old time’s sake (albeit bridged to Matrix). The very first protocol bridge we built for Matrix back in 2015 was for IRC - and Moznet and Freenode were the first public bridges we turned on. As of right now, `/stats u` on Moznet says that there are 4950 connected users, of which 1724 (so 35%) are actually Matrix users connected via the Moznet bridge - effectively using Matrix as a big decentralised IRC bouncer in the sky.

All of this is to say is that we deeply understand how dependent Mozilla has been on IRC over the years, and that we built Matrix to be a worthy successor which tries to capture all the best bits of IRC while providing much richer primitives (E2E encryption, openly federated decentralised chatrooms, arbitrary data sync, HTTP API, VoIP, etc).  It’s also worth noting that even though Moznet is being turned off, [matrix-ircd](https://github.com/matrix-org/matrix-ircd) exists as a very promising project that exposes _any_ Matrix homeserver as an ircd - so for all you IRC die-hards, Moznet can absolutely live on in the afterlife!  (matrix-ircd is still alpha right now, but it’s a relatively modest amount of Rust and PRs are _very_ welcome - if you grok IRC it should be a really really fun project to contribute to).

In other news, the trial in September was an amazing opportunity to gather feedback first-hand from a wide range of Mozillians as they gave Riot and Matrix a spin, often for the first time - and it was a lot of fun to take that feedback and rapidly act on it to improve the app.  For instance, having direct expert feedback on our screenreader support meant that we were able to [radically improve our accessibility](https://blog.riot.im/riot-web-1-5/), and we’ve kept up the momentum on this since the trial (regardless of the outcome) with Mozilla & Riot devs hacking together with the aim of making Riot the most accessible communication app out there without exception.  Huge thanks to Marco Zehe for all his guidance (and PRs), as well as the rest of [#a11y:matrix.org](https://matrix.to/#/#a11y:matrix.org)!

Meanwhile, Riot’s UX continues to mature in general. One of our two primary projects right now is to improve First Time User Experience ([FTUE](https://github.com/vector-im/riot-web/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Aproject%3AFtue+)) - i.e. making our UX as smooth and polished and predictable as possible, especially as seen by new users.  This project had just kicked off in September as the Mozilla trial began, and some of the major improvements to the Room Directory and Room Creation flow which subsequently landed in Riot/Web 1.5 were prioritised directly based on Mozillian feedback.  Since the trial we’ve been focusing more on our other primary project (getting E2E Encryption enabled by default), but we will be back on FTUE asap - particularly to incorporate all the feedback we anticipate as Mozilla goes live!  We are absolutely determined for Riot to have as good if not better UX than the likes of Slack or Discord.  New Vector is also [actively hiring more designers](https://apply.workable.com/new-vector/j/6CB817C79E/) to come work fulltime on Riot’s UI and UX as we shift Riot’s focus from being developer-led to design-led - if this sounds interesting, please get in touch!  And finally, everything is of course open source and PRs are genuinely appreciated to keep Riot heading in the right direction (please just check first if they change the UI/UX).

Finally, in case you’re dreading having to use a graphical chat client like Riot, the Mozilla instance will of course be accessible to any [Matrix client](https://matrix.org/clients/) that floats your boat - for instance, [weechat-matrix](https://github.com/poljar/weechat-matrix) also got a spurt of development to support Mozilla IAM single-sign-on so that commandline junkies can get their fix too. (It’s worth noting that weechat-matrix really is an incredibly fully featured and usable client - complete with full end-to-end encryption support.  If you haven’t tried it, you’re missing out).

So, to conclude: it has been indescribably valuable to have the expertise and enthusiasm of the Mozilla community in contributing feedback and fixes to Riot (and even [building new Matrix bots](https://github.com/bnjbvr/botzilla)!).  Huge thanks to everyone who invested their time and energy participating in the trial and for their trust in concluding that Matrix was the way forward.  We see this as a massive responsibility and honour to help power the wider Mozilla community, and we will do everything we can to make it as successful as conceivably possible :)

To the future of an open web, with even more open communications!

Matthew, Amandine & the whole Matrix & Riot team :)

P.S. we’ve come a long way since [Matrix was first proposed](https://discourse.mozilla.org/t/matrix-and-irc-mozillians-custom-client/2911/7) for Mozilla :D

<!-- Docs to Markdown version 1.0β17 -->
