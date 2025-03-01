+++
title = "Final countdown to 1.0"
path = "/blog/2019/05/24/final-countdown-to-1-0"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/awry.2019-05-24.png"
+++

Hi all,

After lots of refinements, polishing and a few distractions we’re finally at the point of announcing the final timeline for both Matrix 1.0 and Synapse 1.0! We are targeting __Monday 10th June__ as our release date - please consider this your two week warning!

This is the end game of the process we began back in February when we released the [first stable release of the Server-Server API](https://matrix.org/blog/2019/02/04/matrix-at-fosdem-2019) at FOSDEM, and started the [Synapse 0.99](https://matrix.org/blog/2019/02/05/synapse-0-99-0) release series to prepare for 1.0.

Matrix 1.0 refers to the upcoming set of API releases which provides a matched set of stable and secure APIs across all of Matrix - at which point the project (at last) exits beta! In practice, this will be Client-Server API 0.5 (including final membership lazy loading, E2E backups and interactive verification and lots more), SS API 0.2 (including server key validity period fixes and associated v5 room protocol) and any other spec updates. The next 2 weeks will see a flurry of spec activity as we get everything together - you can see the full list and track the progress for the CS 0.5 spec release at <https://github.com/matrix-org/matrix-doc/projects/2>.

Meanwhile, Synapse 1.0 will be the reference implementation of Matrix 1.0, and so makes the changes required to implement Matrix 1.0 and close all currently known security and stability issues and thus exit beta. This means changing the default room protocol version used for new rooms to be [v4](https://github.com/matrix-org/matrix-doc/blob/37871106c6fc6013c17b5711fb93853fff140267/proposals/2002-rooms-v4.md), which includes the new [state resolution algorithm](https://github.com/matrix-org/matrix-doc/blob/f714aaadd011ac736d779f8460202a8d95799123/proposals/1442-state-resolution.md), as well as [collision-resistant event IDs](https://github.com/matrix-org/matrix-doc/blob/erikj/event_id_hashes/proposals/1659-event-id-as-hashes.md), which are now formatted to be [URL safe](https://github.com/matrix-org/matrix-doc/blob/rav/proposal/no_slash_in_event_id/proposals/1884-replace-slashes-in-event_ids.md). __Support for v4 rooms shipped in [Synapse 0.99.5.1](https://matrix.org/blog/2019/05/21/synapse-0-99-5-1-released), so please upgrade asap to 0.99.5.1 before 1.0 is released to ease the transition.__. Synapse 1.0 will also ship with support for the upcoming v5 room protocol (which enforces honouring server key validity periods), but this will not used as the default for new rooms until sufficient servers are speaking Matrix 1.0.

As part of the security work, Matrix 1.0 and Synapse 1.0 also contains a [breaking change](https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md#it-used-to-work-just-fine-why-are-you-breaking-everything) that requires a valid TLS certificate on the federation API endpoint. __Servers that do not configure their certificate will no longer be able to federate post 1.0__

You can check that your server has been correctly configured [here](https://federationtester.matrix.org/) and see [here](https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md) for more info on what you need to do. If in doubt head to [#synapse:matrix.org](https://matrix.to/#/#synapse:matrix.org).

We've been tracking readiness for the certificate change at <https://arewereadyyet.com>, at the time of writing 68% of active _servers_ on the federation have valid certificates. We obviously would want that number to be higher, however since the largest installations _have_ upgraded the total number of _users_ who are ready for 1.0 stands at 96%, which we consider to be high enough to release 1.0.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/awry.2019-05-24.png)

__This is not a drill__, from here until 10th June we need everyone to not only ensure that their own server is ready, but also to encourage their fellow admins to update as well. With your help we can get everyone over the line!

Thanks everyone for your help to date, especially those providing support in [#synapse:matrix.org](https://matrix.to/#/#synapse:matrix.org).

Onwards!
