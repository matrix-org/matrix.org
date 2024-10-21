+++
title = "Introducing Matrix 1.0 and the Matrix.org Foundation"
path = "/blog/2019/06/11/introducing-matrix-1-0-and-the-matrix-org-foundation"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/splash.jpg"
+++

## Matrix 1.0

Hi all,

We are very excited to announce the first fully stable release of the Matrix protocol and specification across **all** APIs - as well as the Synapse 1.0 reference implementation which implements the full Matrix 1.0 API surface.

This means that after just over 5 years since the initial work on Matrix began, we are proud to have finally **exited beta**!!  This is the conclusion of the work which we announced at [FOSDEM 2019](https://matrix.org/blog/2019/02/04/matrix-at-fosdem-2019) when we cut the first stable release of the Server-Server API and began the Synapse 0.99 release series in anticipation of releasing a 1.0.

Now, before you get too excited, it’s critical to understand that Matrix 1.0 is all about providing a **stable, self-consistent, self-contained and secure version of the standard** which anyone should be able to use to independently implement production-grade Matrix clients, servers, bots and bridges etc.  It does **not** mean that all planned or possible features in Matrix are now specified and implemented, but that the most important core of the protocol is a well-defined stable platform for everyone to build on.

On the Synapse side, our focus has been exclusively on ensuring that Synapse correctly implements Matrix 1.0, to provide a stable and secure basis for participating in Matrix without risk of room corruption or other nastinesses.  However, we have deliberately **not** focused on performance or features in the 1.0 release - so I’m afraid that synapse’s RAM footprint will not have got significantly better, and your favourite long-awaited features (automatically defragmenting rooms with lots of forward extremities, configurable message retention, admin management web-interface etc) have not yet landed.  In other words, this is the opposite of the [Riot 1.0 release](https://medium.com/@RiotChat/the-big-1-0-68fa7c6050be) (where the entire app was redesigned and radically improved its performance and UX) - instead, we have adopted the mantra to [make it work, make it work right, and then (finally) make it fast](http://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast).  You can read the [full release notes](/blog/2019/06/11/synapse-1-0-0-released) here.  It’s also worth looking at the [full changelog](https://github.com/matrix-org/synapse/blob/release-v1.0.0/CHANGES.md) through the Synapse 0.99 release series to see the massive amount of polishing that’s been going on here.

All this means that the main headline features which land in Matrix 1.0 are vitally important but relatively dry:

* Using X.509 certificates to trust servers rather than perspective notaries, to simplify and improve server-side trust.  This is a **breaking change** across Matrix, and we’ve given the community several months now to ensure their homeservers run a valid TLS certificate.  See [MSC1711](https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md) for full details, and the [2 week warning](https://matrix.org/blog/2019/05/24/final-countdown-to-1-0) we gave.  As of ~9am UTC today, the matrix.org homeserver is running Synapse 1.0 and enforcing valid TLS certificates - the transition has begun (and so far we haven’t spotted any major breakage :).  Thank you to everyone who [got ready](https://arewereadyyet.com) in advance!
* Using .well-known URIs to discover servers, in case you can’t get a valid TLS certificate for your server’s domain.
* Switching to **[room version 4](https://matrix.org/docs/spec/rooms/v4.html) by default** for creating new rooms.  This fixes the most important defects that the core room algorithm has historically encountered, particularly:
    * The new State Resolution algorithm to fix the [Hotel California bug](https://github.com/matrix-org/synapse/issues/2432) and many others: [State Resolution Reloaded](https://github.com/matrix-org/matrix-doc/issues/1442)
    * [Collision resistant event IDs](https://github.com/matrix-org/matrix-doc/pull/1659)
* Specifying the ability to upgrade between room versions
* Full specification of lazy loading room members
* [Short Authentication String](https://github.com/matrix-org/matrix-doc/issues/1267) (Emoji!) interactive verification of E2EE devices
* ...and lots and lots and lots of bugfixes and spec omission fixes.

That said, there is a *lot* of really exciting stuff in flight right now which sadly didn’t stabilise in time for Matrix 1.0, but will be landing as fast as we can finalise it now that 1.0 is at last out the door.  This includes:

* Editable messages!  (These are in Synapse 1.0 and Riot already, but still stabilising so not enabled by default)
* Reactions! (Similarly these are in develop)
* Threading!! (We’ve planted the seeds for this in the new ‘aggregations’ support which powers edits & reactions - but full thread support is still a bit further out).
* [Cross-signed verification for end-to-end encryption](https://github.com/uhoreg/matrix-doc/blob/cross-signing2/proposals/1756-cross-signing.md) (This is on a branch, but due to land any day now).  We’ve also held off merging E2E backups into the Matrix 1.0 spec until cross-signing lands, given it may change the backup behaviour a bit.  Once this is done, we can seriously talk about turning on E2E by default everywhere.
* Live-tracking of room statistics and state in Synapse!  (This is in Synapse 1.0 already if you check out the new room_stats and room_state tables, but we need to provide a nice admin interface for it).
* Support for smaller footprint homeservers by reducing memory usage and stopping them from joining overly complex rooms.

Then stuff which we haven’t yet started, but is now unlocked by the 1.0 release:

* Fixing extremities build-up (and so massively improving performance)
* Rewriting Communities.  Groups/Communities deliberately didn’t land in Matrix 1.0 as the current implementation has issues we want to fix first.  [MSC1772](https://github.com/matrix-org/matrix-doc/pull/1772) has the details.
* Rewritten room directory using the new room stats/state tables to be super-speedy.
* Super-speedy [incremental state resolution](https://github.com/matrix-org/synapse/pull/3122)
* Removing MXIDs from events ([MSC1228](https://github.com/matrix-org/matrix-doc/issues/1228))

Just to give a quick taster of the shape of things to come, here’s RiotX/Android, the all-new Riot client for Android, showing off Edits & Reactions in the wild…

<div style="text-align: center">
<!-- markdownlint-disable-next-line no-alt-text -->
<img src="/blog/img/edits.jpg" style="height: 640px;"/>
</div>

...and here’s a screenshot of the final test jig for cross-signing devices in end-to-end encryption, so you will never have to manually verify new devices for a trusted user ever again!  We demoed a *very* early version of this at FOSDEM, but this here is the testing harness for real deal, after several iterations of the spec and implementation to nail down the model. + means the device/user's cross-signing key is trusted, T means it's TOFU:

<div style="text-align: center">
<!-- markdownlint-disable-next-line no-alt-text -->
<img src="/blog/img/cross-signing.png" style="height: 480px; margin: auto"/>
</div>

So, there you have it - welcome to Matrix 1.0, and we look forward to our backlog of feature work now landing!

Massive massive thanks to everyone who has stuck with the project over the years and helped support and grow Matrix - little did we think back in May 2014 that it’d take us this long to exit beta, but hopefully you’ll agree that it’s been worth it :)

Talking of which, we were looking through the photos we took from the first ever session hacking on Matrix back in May 2014…

![Whiteboard 1](/blog/img/nightmare.jpg)

...suffice it to say that of the architectural options, we went with #3 in the end...

![Whiteboard 2](/blog/img/pl.jpg)

...and that nowadays we actually know how power levels work, in excruciating and (hopefully) well-specified detail :)

There has been an absolutely enormous amount of work to pull Matrix 1.0 together - both on the spec side (thanks to the Spec Core Team for corralling proposals, and everyone who's contributed proposals, and particularly to Travis for editing it all) and the implementation side (thanks to the whole Synapse team for the tedious task of cleaning up everything that was needed for 1.0).  And of course, huge thanks go to everyone who has been helping test and debug the Synapse 1.0 release candidates, or just supporting the project to get to this point :)

## The Matrix.org Foundation

Finally, as promised, alongside Matrix 1.0, we are very happy to announce the official launch of the finalised Matrix.org Foundation!

This has been a long-running project to ensure that Matrix’s future is governed by a neutral non-profit custodian for the benefit of everyone in the Matrix ecosystem.  We started the process nearly a year ago back with the initial proposal [Towards Open Governance of Matrix.org](https://matrix.org/blog/2018/06/20/towards-open-governance-for-matrix-org), and then legally [incorporated the Foundation](https://matrix.org/blog/2018/10/29/introducing-the-matrix-org-foundation-part-1-of-2) in October, and published the [final governance proposal](https://github.com/matrix-org/matrix-doc/blob/matthew/msc1779/proposals/1779-open-governance.md) in January.

As of today the Foundation is finalised and operational, and all the assets for Matrix.org have been transferred from [New Vector](https://vector.im) (the startup we formed in 2017 to hire the core Matrix team).  In fact you may already have seen Matrix.org Foundation notices popping up all over the Matrix codebase (as all of New Vector’s work on the public Matrix codebase for the foreseeable is being assigned to the Matrix.org Foundation).

Most importantly, we’re excited to introduce the **Guardians of the Matrix.org Foundation**.  The Guardians are the legal directors of the non-profit Foundation, and are responsible for ensuring that the Foundation (and by extension the Spec Core Team) keeps on mission and neutrally protects the development of Matrix. Guardians are typically independent of the commercial Matrix ecosystem and may even not be members of today’s Matrix community, but are deeply aligned with the mission of the project. Guardians are selected to be respected and trusted by the wider community to uphold the guiding principles of the Foundation and keep the other Guardians honest.

We have started the Foundation with five Guardians - two being the original founders of the Matrix project (Matthew and Amandine) and three being entirely independent, thus ensuring the original Matrix team forms a minority which can be kept in check by the rest of the Guardians. The new Guardians are:

* Prof. Jon Crowcroft - Marconi Professor of Communications Systems in the Computer Lab at the University of Cambridge and the Turing Institute. Jon is a pioneer in the field of decentralised communication, and a fellow of the Royal Society, the ACM, the British Computer Society, the Institution of Engineering and Technology, the Royal Academy of Engineering and the Institute of Electrical and Electronics Engineers.

  Jon is a global expert in decentralisation and data privacy, and is excellently placed to help ensure Matrix stays true to its ideals.

* Ross Schulman - Ross is a senior counsel and senior policy technologist at New America’s Open Technology Institute, where he focuses on internet measurement, emerging technologies, surveillance, and decentralization. Prior to joining OTI, Ross worked for Google.

  Ross brings a unique perspective as a tech- and decentralisation-savvy lawyer to the Foundation, as well as being one of the first non-developers in the Matrix community to run his own homeserver. Ross has been known to walk around Mozfest clutching a battery-powered Synapse in a box, promoting decentralised communication for all.

* Dr. Jutta Steiner - As co-founder and CEO of Parity Technologies, Jutta is dedicated to building a better internet - Web 3.0 - where users’ privacy & control come first. Parity Technologies is a leader in the blockchain space – known to many as the creator of one of the most popular Ethereum clients, it is also the creator of two ambitious new blockchain technlogies, Polkadot and Substrate, that make it easier to experiment and innovate on scalability, encryption and governance.

  Parity has been pioneering Matrix enterprise use since the moment they decided to rely on Matrix for their internal and external communication back in 2016, and now run their own high-volume deployment, with end-to-end encryption enabled by default. Jutta represents organisations who are professionally dependent on Matrix day-to-day, as well as bringing her unique experiences around decentralisation and ensuring that Web 3.0 will be a fair web for all.

We’d like to offer a very warm welcome to the new Guardians, and thank them profusely for giving up their time to join the Foundation and help ensure Matrix stays on course for the years to come.

For the full update on the Foundation, please check out the new website content at [https://matrix.org/foundation](https://matrix.org/foundation) which should tell you everything you could possibly want to know about the Foundation, the Guardians, the Foundation’s legal Articles of Association, and the day-to-day Rules which define the Open Governance process.

## And finally…

Matrix 1.0 has been a bit of an epic to release, but puts us on a much stronger footing for the future.

However, it’s very unlikely that we’d have made it this far if most of the core dev team wasn’t able to work on Matrix as their day job.  Right now we are actively looking for large-scale donations to the Matrix.org Foundation (and/or investment in [New Vector](https://vector.im)) to ensure that the team can maintain as tight a focus on core Matrix work as possible, and to ensure the project realises its full potential.  While Matrix is growing faster than ever, this perversely means we have more and more distractions - whether that’s keeping the Matrix.org server safe and operational, or handling support requests from the community, or helping new members of the ecosystem get up and running.  If you would like Matrix to succeed, please [get in touch](mailto:funding@matrix.org) if you’d like to sponsor work, prioritise features, get support contracts, or otherwise support the project.  We’re particularly interested in sponsorship around decentralised reputation work (e.g. publishing a global room directory which users can filter based on their preferences).

Finally, huge thanks to everyone who has continued to support us through thick and thin on [Patreon](https://patreon.com/matrixdotorg), [Liberapay](https://liberapay.com/matrixdotorg) or other platforms.  Every little helps here, both in terms of practically keeping the lights on, and also inspiring larger donations & financial support.

So: thank you once again for flying Matrix.  We hope you enjoy 1.0, and we look forward to everything else landing on the horizon!

\- Matthew, Amandine & the whole Matrix.org Team.
