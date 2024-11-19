+++
title = "Tightening up privacy in Matrix"
path = "/blog/2019/06/30/tightening-up-privacy-in-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "Privacy"]
+++

Hi all,

A few weeks ago there was [some
discussion](https://news.ycombinator.com/item?id=20178267) around the privacy
of typical Matrix configurations, particularly how Riot's default config uses
vector.im as an Identity Server (for discovering users on Matrix by their email
address or phone number) and scalar.vector.im as an Integration Manager (i.e.
the mechanism for adding hosted bots/bridges/widgets into rooms). This means
that Riot, even if using a custom homeserver and running from a custom Riot
deployment, will try to talk to *.vector.im (run  by New Vector; the company formed by the core
Matrix team in 2017) for some operations unless an alternative IS or IM has
been specified in the config.

We haven't done as good a job at explaining this as we could have, and this
blog post is a progress update on how we're fixing that and improving other
privacy considerations in general.

Firstly, the reason Riot is configured like this is for the user's convenience:
in general, we believe most users just want to discover other people on Matrix
as easily as possible, and a logically-centralised server for looking up user
matrix IDs by email/phone number (called third party IDs, or 3PIDs) is the only
comprehensive way of doing so.  Decentralising this data while protecting the
privacy of the 3PIDs and their matrix IDs is a Hard Problem which we're unaware
of anyone having solved yet.  Alternatively, you could run a local identity
server, but it will end up having to delegate to a centralised identity server
anyway for IDs it has no other way to know about. Similarly, providing a
default integration server that just works out of the box (rather than
mandating the user configures their own) is a matter of trying to keep Riot's
UX simple, especially when onboarding users, and especially given Riot's
reputation for complexity at the best of times.

That said, the discussion highlighted some areas for improvement.
Specifically:

1. When doing work on making Matrix [GDPR
   compliant](https://matrix.org/blog/2018/05/08/gdpr-compliance-in-matrix)
   back in May 2018, we set up a single [privacy
   policy](https://github.com/vector-im/policies/blob/master/docs/matrix-org/privacy_notice.md)
   for the services we run, and got users to agree to it by locking them out of
   the matrix.org homeserver until they did.  However, we missed that users not
   on the matrix.org homeserver might still be using our Identity Service (IS)
   & Integration Manager (IM) without accepting the privacy policy.  Over the
   last few weeks we've been working on addressing this - it turns out that
   it's a pain to fix, given the Identity Service doesn't have the concept of
   users, so tracking which users have agreed to the policy policy or not means
   some fairly major changes. The current proposal is to change the Identity
   Service to use a form of OpenID to authenticate users against their
   homeserver in order to check they've accepted the IS's terms of use - see
   [MSC2140](https://github.com/matrix-org/matrix-doc/pull/2140) for the gory
   details.

   Meanwhile, Riot is being updated to prompt the user to accept the IS & IM terms
   of use (if different to the HS's), and thus make it crystal clear to the user
   that they are using an IS & IM and that they have the option not to if desired - see <https://github.com/vector-im/riot-web/issues/10167> and associated
   [issues](https://github.com/vector-im/riot-web/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Ap1+label%3Aprivacy+label%3Aphase%3A1+identity).
   This includes also explicitly prompting the user as to whether they want
   3PIDs they provide at registration to be discoverable, as per
   <https://github.com/vector-im/riot-web/issues/10091>.

2. Riot on iOS & Android gives the option of scanning your local addressbook to
   discover which of your contacts are on Matrix.  The wording explaining this
   wasn't clear enough on Android - which we [promptly
   fixed](https://news.ycombinator.com/item?id=20181515).  Separately, the
   contact details sent to the server are currently not obfuscated.  This is
   partially because we hadn't got to it, and partially because obfuscating
   them doesn't actually help much with privacy, given an attacker can just
   scan through possible obfuscated phone numbers and email addresses to
   deobfuscate them.  However, we've been working through obfuscating the
   contact details anyway by hashing as per
   [MSC2134](https://github.com/matrix-org/matrix-doc/pull/2134), which has all
   the details.  We're also adding an explicit lookup warning in Riot/Web, as
   per <https://github.com/vector-im/riot-web/issues/10093>.

3. There was a bug where Riot/Web was querying the Integration Manager every
   time you opened a room, even if that room had no integrations (actually, it
   did it 3 times in a row).  This got [fixed and
   released](https://github.com/matrix-org/matrix-react-sdk/pull/3115) in
   Riot/Web 1.2.2 back on June 19th.

4. Matrix needs to authenticate whether events were actually sent by the server
   that claimed to send them.  We do this by having servers sign their events
   when they create them, and publishing the public half of their signing keys
   for anyone to query.  However, this poses problems if you receive an event
   which is signed by a server which isn't currently online.  To solve this, we
   have the concept of `trusted_key_servers` (aka notary servers), which your
   server can query to see if they know about the missing server's keys.  By
   default, matrix.org is configured as Synapse's trusted notary, but you can
   of course change this. If you choose an unreliable server as the notary
   (e.g. by not setting one at all) then there's a risk that you won't be able
   to look up signing keys, and a splitbrain will result where your server
   can't receive certain events, but other servers in the room can.  This can
   then result in your server being unable to participate in the room entirely,
   if it's missing key events in the room's lifetime.

   Our plan here is to get rid of notaries entirely by changing how event
   signing works as per
   [MSC1228](https://github.com/matrix-org/matrix-doc/issues/1228), but this is
   going to take a while.  Meanwhile we're going to check Synapse's code to
   ensure it doesn't talk to the notary server unnecessarily.  (E.g. it should
   be caching the signing keys locally, and it should only use the notary
   server if the remote server is down.)

5. When doing VoIP in Matrix, clients need to use a TURN server to discover
   their network conditions and perform firewall traversal.  The TURN server
   should be specified by your homeserver (and each homeserver deployment
   should ideally include a TURN server).  However, for users who have not
   configured a TURN server, Riot (on all 3 platforms) defaulted to use
   Google's public STUN service (`stun.l.google.com`).  STUN is a subset of
   TURN which provides firewall discovery, but not traffic relaying.  This
   slightly increased the chances of calls working for users without a proper
   TURN server, but not by much - and rather than fall back to Google, we've
   decided to simply remove it from Riot (e.g.
   <https://github.com/matrix-org/matrix-ios-sdk/commit/24832a2b14fb72ae6f051d5aba40262d11eef65d>).
   This means that VoIP might get less reliable for users who were relying on
   this fallback, but you really should be running your own TURN server anyway
   if you want VoIP to work reliably on your homeserver.

6. We should make it clearer in Riot that device names are world-readable, and
   not just for the user's own personal reference. This is
   <https://github.com/vector-im/riot-web/issues/10216>

As you can see, much of the work on improving these issues is still in full
swing, although some has already shipped.  As should also be obvious, these
issues are categorically not malicious: Matrix (and Riot) literally exists to give users full control and autonomy over their communication, and privacy is a key part of that. These are avoidable issues which can and will be solved.  It's worth noting that we have to prioritise privacy issues alongside all the other development in Matrix however: there's no point in having excellent privacy if there are other bugs stopping the platform from being usable.

We'll do another blog post to confirm once most of the fixes here have landed -
meanwhile, hopefully this post provides some useful visibility on how we're
going about improving things.
