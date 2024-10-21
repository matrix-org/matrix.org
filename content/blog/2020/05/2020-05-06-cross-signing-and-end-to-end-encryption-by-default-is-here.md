+++
title = "Cross-signing and End-to-end Encryption by Default is HERE!!!"
path = "/blog/2020/05/06/cross-signing-and-end-to-end-encryption-by-default-is-here"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://blog.riot.im/content/images/2020/05/Frame-29-1.png"
+++

Hi all,

As of today, Matrix is end-to-end encrypted **by default** for private conversations.

Three years have passed since we [first announced End-to-end Encryption in
Matrix](https://matrix.org/blog/2016/11/21/matrixs-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last)
and started to beta test it in Riot - and after an enormous amount of
polishing and refinement on its user experience, we are finally declaring it
out of beta and enabling it by default for all new private conversations in
Riot.  As Riot is currently the most common Matrix client, this means that
Matrix as a whole should now be considered end-to-end encrypted by default for
DMs and invite-only rooms.

Work on E2EE in Matrix has progressed in waves since we first shipped it - including:

* adding keysharing (letting you share encryption keys between your devices to improve reliability)
* making Riot Web's encryption resilient to running concurrently in multiple tabs
* adding online key backup (so you don't lose all your history if you lose all your devices)
* making encryption resilient to restoring the app from a backup
* adding interactive key verification via emoji to make the verification process easier.

However, our goal was always to enable E2EE by default for all private rooms,
which means having feature parity between unencrypted and E2EE Matrix so that
we can enable encryption without *any* negative impact on usability.  The
high-level remaining items were significant:

* Cross-signing: verifying your own logins so others don’t have to.
* Adding QR codes for even better verification UX, to make cross-signing as painless as possible.
* Replacing the old prototype UI for E2EE with final polished UI/UX.
* Ability to support non-E2EE clients.
* Ability to search encrypted rooms.
* Ability to view file indexes in encrypted rooms.
* Fixing the remaining “Unable to decrypt” errors.

Over the last few months the Riot team has been almost entirely focused on
implementing solutions to these items - and we're finally at the point where
the switch can be flipped and as of Riot Web/Desktop 1.6, Riot iOS 0.11.1 and
RiotX Android 0.19, all new private rooms will be encrypted by default;
completing the transition we began at [FOSDEM
2020](https://fosdem.org/2020/schedule/event/matrix/) when we landed
cross-signing E2E-by-default in the development branches of Riot.

**For full details, please go check out the [massive deep dive over at the Riot
blog](https://blog.riot.im/e2e-encryption-by-default-cross-signing-is-here/)** - also featuring all the other recent progress in Riot!

Heads up that encrypted traffic is slightly heavier on the server than
unencrypted (due to exchanging keys, verification traffic, and keybackup
traffic), and so there is a risk that the already-over-popular Matrix.org
server instance may feel a little hugged to death.  However, unprecedented
Synapse performance breakthroughs are on the horizon in the coming weeks which
will fix this - and, of course, you can (and should!) be using your own
instance anyway.

Thanks everyone for helping us test encryption over the years and getting us
to this point: cross-signing provides a more secure way of tracking device
trust than almost any other comms system out there, and we hope that you'll
agree the improved UX has been worth the wait.

Next stop: Synapse performance, and rebuilding Riot's first time user experience!

thanks,

Matthew, Amandine & the Matrix Team.

(Comments over at [HN](https://news.ycombinator.com/item?id=23107564))
