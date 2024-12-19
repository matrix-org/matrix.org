+++
title = "Privacy improvements in Synapse 1.4 and Riot 1.4"
path = "/blog/2019/09/27/privacy-improvements-in-synapse-1-4-and-riot-1-4"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Privacy", "Tech"]
+++

Hi all,

Back in June we wrote about our [plans to tighten up data
privacy](https://matrix.org/blog/2019/06/30/tightening-up-privacy-in-matrix)
in Matrix after some areas for improvement were brought to our attention.  To
quickly recap: the primary concern was that the default config for Riot
specifies identity servers and integration managers run by New Vector (the
company which the original Matrix team set up to build Riot and fund Matrix
dev) - and so folks using a standalone homeserver may end up using external
services without realising it.  There were some other legitimate issues raised
too (e.g. contact information should be obfuscated when checking if your
contacts are on Matrix; Riot defaulted to using Google for STUN (firewall
detection) if no TURN server had been set up on their server; Synapse defaults
to using matrix.org as a key notary server).

We’ve been working away at this fairly solidly over the last few months.  Some
of the simpler items shipped quickly (e.g. Riot/Web had a [stupid
bug](https://github.com/matrix-org/matrix-react-sdk/pull/3115) where it kept
incorrectly loading the integration manager; Riot/Android [wasn’t clear
enough](https://news.ycombinator.com/item?id=20181515) about when contact
discovery was happening; Riot/Web [wasn’t clear
enough](https://github.com/vector-im/riot-web/issues/10216) about the fact
device names are publicly visible; etc) - but other bits have turned out to be
incredibly time-consuming to get right.

However, we’re in the process today of releasing Synapse 1.4.0 and Riot/Web
1.4.0 (it’s coincidence the version numbers have lined up!) which resolve the
majority of the remaining issues.  The main changes are as follows:

1. **Riot no longer automatically uses identity servers by default**.
Identity servers are only useful when inviting users by email address, or when
discovering whether your contacts are on Matrix.  Therefore, we now wait until
the user tries to perform one of these operations before explaining that they
need an identity server to do so, and we prompt them to select one if they
want to proceed. This makes it abundantly clear that the user is connecting to
an independent service, and why.

2. **Integration Managers and identity servers now have the ability to force
users to accept terms of use before using them**.  This means they can
explicitly spell out the data privacy & usage policy of the server as required
by GDPR, and it should now be impossible for a user to use these services
without realising it.  This was particularly fun in the case of identity
servers, which previously had no concept of users and so couldn’t track
whether users had agreed to their terms & conditions or not… and because
homeservers sometimes talk to the identity server on behalf of users rather
than the user talking direct, the privacy policy flow gets even hairier.  But
it’s solved now, and a nice side-effect of this is that users can now
explicitly select their Integration Manager in Riot, in case they want to use
[Dimension](https://dimension.t2bot.io) or similar rather than the default
provided by [Modular](https://modular.im).

3. **Synapse no longer uses identity servers for verifying registrations or
verifying password reset.** Originally, Synapse made use of the fact that the
Identity Service contains email/msisdn verification logic to handle identity
verification in general on behalf of the homeserver. However, in retrospect
this was a mistake: why should the entity running your identity server have
the right to verify password resets or registration details on your
homeserver?  So, we have moved this logic into Synapse.  **This means Synapse
1.4.0 requires new configuration for email/msisdn verification to work -
please see the upgrade notes for full details.**

4. **Sydent now supports discovering contacts based on hashed identifiers.**
[MSC2134](https://github.com/matrix-org/matrix-doc/blob/hs/hash-identity/proposals/2134-identity-hash-lookup.md)
specifies entirely new IS APIs for discovering contacts using a hash of their
identifier rather than directly exposing the raw identifiers being searched
for.  This is implemented in
[Riot/iOS](https://github.com/vector-im/riot-ios/issues/2652) and
[Riot/Android](https://github.com/vector-im/riot-android/issues/3257) and
should be in the next major release;
[Riot/Web](https://github.com/vector-im/riot-web/issues/10556) 1.4.0 has it
already.

5. Synapse now [warns in its
logs](https://github.com/matrix-org/synapse/pull/6090/files) if you are using
matrix.org as a default trusted key server, in case you wish to use a
different server to help discover other servers’ keys.

6. Synapse now [garbage collects redacted
messages](https://github.com/matrix-org/synapse/issues/1287) after N days (7
days by default).  (It doesn’t yet garbage collect attachments referenced from
redacted messages; we’re still working on that).

7. Synapse now [deletes account access
data](https://github.com/matrix-org/synapse/pull/6098/files) (IP addresses and
User Agent) after N days (28 days by default) of a device being deleted.

8. Riot warns before falling back to using STUN (and defaults to
turn.matrix.org rather than stun.google.com) for firewall discovery (STUN)
when placing VoIP calls, and makes it clear that this is an emergency fallback
for misconfigured servers which are missing TURN support.  (We originally
deleted the fallback entirely, but this broke things for too many people, so
we’ve kept it but warn instead).

All of this is implemented in Riot/Web 1.4.0 and Synapse 1.4.0.  Riot/Web
1.4.0 shipped today (Fri Sept 27th) and we have a release candidate
for Synapse 1.4 (1.4.0rc1) today which fully ship on Monday.

For full details please go check out the [Riot 1.4.0](https://medium.com/@RiotChat/new-privacy-controls-for-riot-dc3661888563)
and [Synapse 1.4.0](https://matrix.org/blog/2019/10/03/synapse-1-4-0-released) blog posts.

Riot/Mobile is following fast behind - most of the above has been implemented
and everything should land in the next release.  RiotX/Android doesn’t really
have any changes to make given it hadn’t yet implemented Identity Service or
Integration Manager APIs.

This has involved a surprisingly large amount of spec work; no fewer than 9
new Matrix Spec Changes (MSC) have been required as part of the project.  In
particular, this results in a massive update to the Identity Service API,
which will be released very shortly with the new MSCs.  You can see the
upcoming changes on the [unstable
branch](https://matrix.org/docs/spec/identity_service/unstable) and compare
with the [previous 0.2.1 stable
release](https://matrix.org/docs/spec/identity_service/r0.2.1), as well as
checking the detailed MSCs as follows:

* [MSC1961: Integration manager authentication APIs](https://github.com/matrix-org/matrix-doc/pull/1961)
* [MSC2078: Sending Third-Party Request Tokens via the Homeserver](https://github.com/matrix-org/matrix-doc/pull/2078)
* [MSC2134: Identity Hash Lookups](https://github.com/matrix-org/matrix-doc/pull/2134)
* [MSC2140: Terms of Service for ISes and IMs](https://github.com/matrix-org/matrix-doc/pull/2140)
* [MSC2229: Allowing 3PID Owners to Rebind](https://github.com/matrix-org/matrix-doc/pull/2229)
* [MSC2230: Store Identity Server in Account Data](https://github.com/matrix-org/matrix-doc/pull/2230)
* [MSC2263: Give homeservers the ability to handle their own 3PID registrations/password resets](https://github.com/matrix-org/matrix-doc/pull/2263)
* [MSC2264: Add an unstable feature flag to MSC2140 for clients to detect support](https://github.com/matrix-org/matrix-doc/pull/2264)
* [MSC2290: Separate Endpoints for Threepid Binding](https://github.com/matrix-org/matrix-doc/pull/2290)

This said, there is still some work remaining for us to do here.  The main
things which haven’t made it into this release are:

* Preferring to get server keys from the source server rather than the notary server by default ([https://github.com/matrix-org/synapse/pull/6110](https://github.com/matrix-org/synapse/pull/6110)). This almost made it in, but we need to test it more first - until then, your specified notary server will see roughly what servers your servers are trying to talk to.  In future this will be mitigated properly by [MSC1228 (removing mxids from events)](https://github.com/matrix-org/matrix-doc/issues/1228).
* Configurable data retention periods for rooms.  We are tantalisingly close with this - [https://github.com/matrix-org/synapse/pull/5815](https://github.com/matrix-org/synapse/pull/5815) is an implementation that the French Govt deployment is using; we need to port it into mainline Synapse.
* Authenticating access to the media repository - for now, we still rely on media IDs being almost impossible to guess to protect the data rather than authenticating the user.
* Deleting items from the media repository - we still need to hook up deletion APIs.
* Garbage collecting forgotten rooms.  If everyone leaves & forgets a room, we should delete it from the DB.
* [Communicating erasure requests over federation](https://github.com/matrix-org/matrix-doc/issues/1280)

We’ll continue to work on these as part of our ongoing maintenance backlog.

Separately to the data privacy concerns, we’ve had a [separate wave of
feedback](https://news.ycombinator.com/item?id=20515069) regarding how we
handle GDPR Data Subject Access Requests (DSARs). Particularly: whether DSAR
responses should contain solely the info your have directly keyed by the
requesting Matrix ID - or if we should provide all the data “visible” to that
ID (i.e. the history of the conversations they’ve been part of).  We went and
got professional legal advice on this one, and the conclusion is that we
should keep our responses to DSARs as tightly scoped as possible. We [updated
Matrix.org’s privacy
policy](https://github.com/vector-im/policies/pull/7/files?short_path=09dc019#diff-09dc019b94b6efb90fa9f6e5c836f310)
and DSAR tools to reflect the new legal input.

Finally, it’s really worth calling out the amount of effort that went into
this project. Huge huge thanks to everyone involved (given it’s cut across
pretty much every project & subteam we have working on the core of Matrix) who
have soldiered through the backlog.  We’ve been tracking progress using our
[feature-dashboard](https://github.com/vector-im/feature-dashboard) tool which
summarises Github issues based on labels & issue lifecycle, and for better or
worse it’s ended up being the biggest project board we’ve ever had.  You can
see the live data
[here](https://vector-im.github.io/feature-dashboard/#/plan?label=privacy-sprint&repo=vector-im/riot-web&repo=vector-im/riot-ios&repo=vector-im/riot-android&repo=vector-im/riotX-android&repo=matrix-org/matrix-doc&repo=matrix-org/sydent&repo=matrix-org/synapse)
(warning, it takes tens of seconds to spider Github to gather the data) - or,
for posterity and ease of reference, I’ve included the current issue list
below.  The issues which are completed have “done” after them; the ones still
in progress say “in progress”, and ones which haven’t started yet have
nothing. We split the project into 3 phases - phases 1 and 2 represent the
items needed to fully solve the privacy concerns, phase 3 is right now a mix
of "nice to have" polish and some more speculative items.  At this point we’ve
effectively finished phase 1 on Synapse & Riot/Web, and Riot/Mobile is
following close behind.  We're continuing to work on phase 2, and we’ll work
through phase 3 (where appropriate) as part of our general maintenance
backlog.

I hope this gives suitable visibility on how we’re considering privacy; after
all, Matrix is useless as an open communication protocol if the openness comes
at the expense of user privacy.  We’ll give another update once the remaining
straggling issues are closed out; and meanwhile, now the bulk of the privacy
work is out of the way on Riot/Web, we can **finally** get back to
implementing the UI E2E cross-signing verification and improving first time
user experience.

Thanks for your patience and understanding while we’ve sorted this stuff out;
and thanks once again for flying Matrix :)

_In the absence of comments on the current blog, please feel free to discuss
over at [HN](https://news.ycombinator.com/item?id=21091908), or alternatively come ask stuff in
our AMA over at
[/r/privacy](https://www.reddit.com/r/privacy/comments/da219t/im_project_lead_for_matrixorg_the_open_protocol/)
(starting ~5pm GMT+1 (UK) on Friday Sept 27th)._

### The Privacy Project Dashboard Of Doom

* phase:1
    * vector-im/riot-web
        * [5846 Riot duplicates calls to Scalar](https://github.com/vector-im/riot-web/issues/5846) (done)
        * [5921 Ability to disable all identity server functionality via the config file](https://github.com/vector-im/riot-web/issues/5921) (done)
        * [6802 riot shouldn't try to load integrations from an integration manager unless the user has accepted that manager's privacy policies](https://github.com/vector-im/riot-web/issues/6802) (done)
        * [10088 Prompt to accept integration manager polices on use](https://github.com/vector-im/riot-web/issues/10088) (done)
        * [10090 Make sure there are no ugly edge cases running Riot without an integrations manager](https://github.com/vector-im/riot-web/issues/10090) (done)
        * [10091 Decouple setting an email for password reset from publishing your threepid to the identity server and support choice of identity server (on registration)](https://github.com/vector-im/riot-web/issues/10091) (done)
        * [10092 Prompt to accept Identity Server policies on registration](https://github.com/vector-im/riot-web/issues/10092) (done)
        * [10093 Prompt to accept identity server policies before inviting them to a room](https://github.com/vector-im/riot-web/issues/10093) (done)
        * [10094 Store identity server in Account Data and support choosing identity server integration in User Settings](https://github.com/vector-im/riot-web/issues/10094) (done)
        * [10159 Enable toggling a threepid's association with the current IS in User Settings](https://github.com/vector-im/riot-web/issues/10159) (done)
        * [10173 VoIP: Stop falling back to Google for STUN](https://github.com/vector-im/riot-web/issues/10173) (done)
        * [10216 We should make it clear in the UI that device names are publicly readable](https://github.com/vector-im/riot-web/issues/10216) (done)
        * [10386 Terms modal prompt should appear without a flash of the integration manager portal first](https://github.com/vector-im/riot-web/issues/10386) (done)
        * [10408 Identity server v2 API authentication](https://github.com/vector-im/riot-web/issues/10408) (done)
        * [10423 Deploy a develop environment for t's and c's flows for IM and IS](https://github.com/vector-im/riot-web/issues/10423) (done)
        * [10424 Remove the bind true flag from 3PID calls on registration](https://github.com/vector-im/riot-web/issues/10424) (done)
        * [10425 Ability to disconnect from the identity server by pressing buttons in user settings.](https://github.com/vector-im/riot-web/issues/10425) (done)
        * [10452 Test IS v2 access tokens for validity](https://github.com/vector-im/riot-web/issues/10452) (done)
        * [10497 Integration manager terms hides terms that need signing](https://github.com/vector-im/riot-web/issues/10497) (done)
        * [10510 Remove the bind true flag from 3PID adds in settings](https://github.com/vector-im/riot-web/issues/10510) (done)
        * [10519 Update discovery and account 3PID sections when either changes](https://github.com/vector-im/riot-web/issues/10519) (done)
        * [10522 Handle terms agreement in the Discovery section of settings](https://github.com/vector-im/riot-web/issues/10522) (done)
        * [10525 IS interactions proxied through the HS also need terms agreement](https://github.com/vector-im/riot-web/issues/10525) (done)
        * [10528 don't try & show threepids in discovery section if we don't have an ID server](https://github.com/vector-im/riot-web/issues/10528) (done)
        * [10539 Inline terms agreement on change IS and IM](https://github.com/vector-im/riot-web/issues/10539) (done)
        * [10540 When using Riot without an IS, identity requests are sent to server hosting Riot](https://github.com/vector-im/riot-web/issues/10540) (done)
        * [10546 Prompt for fallback VOIP should only happen when the user tries to make a call](https://github.com/vector-im/riot-web/issues/10546) (done)
        * [10550 warn when disconnecting ID server if there are any current bindings](https://github.com/vector-im/riot-web/issues/10550) (done)
        * [10552 Allow email registration, password reset & adding 3pids when no IS](https://github.com/vector-im/riot-web/issues/10552) (done)
        * [10553 Remove the ability to set an IS at login/registration](https://github.com/vector-im/riot-web/issues/10553) (done)
        * [10556 Use the hashed v2 lookup API for 3PIDs](https://github.com/vector-im/riot-web/issues/10556) (done)
        * [10561 Scalar should serve a .well-known file](https://github.com/vector-im/riot-web/issues/10561) (done)
        * [10566 Use nicer APIs for toggling a 3PID's shared status](https://github.com/vector-im/riot-web/issues/10566) (done)
        * [10571 Allow email registration when no IS](https://github.com/vector-im/riot-web/issues/10571) (done)
        * [10572 Allow password reset when no IS](https://github.com/vector-im/riot-web/issues/10572) (done)
        * [10573 Allow adding 3pids when no IS](https://github.com/vector-im/riot-web/issues/10573) (done)
        * [10574 Placeholder issue for MSCs that should land prior to the privacy release](https://github.com/vector-im/riot-web/issues/10574) (done)
        * [10593 Placeholder issue for privacy migration path](https://github.com/vector-im/riot-web/issues/10593) (done)
        * [10597 Ensure IS in account data is read / written as specced](https://github.com/vector-im/riot-web/issues/10597) (done)
        * [10599 Send IS for adding MSISDNs only when required by HS](https://github.com/vector-im/riot-web/issues/10599) (done)
        * [10603 Getting a terms prompt when inviting an email address clears the address picker](https://github.com/vector-im/riot-web/issues/10603) (done)
        * [10619 Handle the case of no IS in features that require IS to lookup](https://github.com/vector-im/riot-web/issues/10619) (done)
        * [10620 Change auth flows so that you default to no IS](https://github.com/vector-im/riot-web/issues/10620) (done)
        * [10634 Changing to vector.im IS in Settings fails because /terms 404s](https://github.com/vector-im/riot-web/issues/10634) (done)
        * [10635 Inline terms agreement in Discovery should still show change and do not use](https://github.com/vector-im/riot-web/issues/10635) (done)
        * [10636 The UX is a little confusing if you haven't accepted the terms of the default identity server.](https://github.com/vector-im/riot-web/issues/10636) (done)
        * [10637 Unable to add email address to HS account without IS set](https://github.com/vector-im/riot-web/issues/10637) (done)
        * [10660 Sydent implementation: Unauthed v1, clone all endpoints, auth v2](https://github.com/vector-im/riot-web/issues/10660) (done)
        * [10666 In login/register, riot freezes if you go to Advanced, remove the IS url and click next](https://github.com/vector-im/riot-web/issues/10666) (done)
        * [10669 Checking email invite account is unclear when no IS set](https://github.com/vector-im/riot-web/issues/10669) (done)
        * [10674 Email help text on registration should be updated without binding](https://github.com/vector-im/riot-web/issues/10674) (done)
        * [10677 Change text about other users being able to invite you by email on registration page](https://github.com/vector-im/riot-web/issues/10677) (done)
        * [10744 Only set terms URLs in the account when they change](https://github.com/vector-im/riot-web/issues/10744) (done)
        * [10749 Changing from one IS to another does not trigger bound 3PID warning](https://github.com/vector-im/riot-web/issues/10749) (done)
        * [10750 Bound 3PIDs warning should better explain what's being left behind](https://github.com/vector-im/riot-web/issues/10750) (done)
        * [10754 Lowercase emails during IS lookup calls](https://github.com/vector-im/riot-web/issues/10754) (done)
        * [10755 Terms account data is meant to be additive, but currently sets only new URLs](https://github.com/vector-im/riot-web/issues/10755) (done)
        * [10756 After changing IS to termstest.matrix.org the text field isn't cleared and the button remains active](https://github.com/vector-im/riot-web/issues/10756) (done)
        * [10757 After changing IS back to vector.im the text field isn't cleared and the button remains active](https://github.com/vector-im/riot-web/issues/10757) (done)
        * [10758 Revoke may be too vague for unbinding a 3PID](https://github.com/vector-im/riot-web/issues/10758) (done)
        * [10779 When publishing a threepid to an IS, if you click 'continue' before clicking the link in your email, we delete your threepid from the HS.](https://github.com/vector-im/riot-web/issues/10779) (done)
        * [10800 Community invite should not talk about ISes at all.](https://github.com/vector-im/riot-web/issues/10800) (done)
        * [10823 IS with unagreed terms will block you from adding even unshared 3PIDs to your HS](https://github.com/vector-im/riot-web/issues/10823) (done)
        * [10839 Use the new backend APIs for adding-3pid-to-homeserver and binding-3pid-on-identity-server when they exist.](https://github.com/vector-im/riot-web/issues/10839) (done)
        * [10878 UX regression when trying to invite by email if no IS is configured](https://github.com/vector-im/riot-web/issues/10878) (done)
        * [10883 Riot should check for r0.6.0 server support alongside feature flags](https://github.com/vector-im/riot-web/issues/10883) (done)
        * [10923 Send validation tokens to submit_url from HS](https://github.com/vector-im/riot-web/issues/10923) (done)
        * [10933 Do not include ID server or access token when HS supports MSC2290](https://github.com/vector-im/riot-web/issues/10933) (done)
        * [10939 Registration with MSISDN needs to use submit_url](https://github.com/vector-im/riot-web/issues/10939) (done)
        * [10941 threepid_creds for registration and password reset still include id_server](https://github.com/vector-im/riot-web/issues/10941) (done)
        * [10959 Remove id_server from email threepid_creds](https://github.com/vector-im/riot-web/issues/10959) (done)
        * [10604 QA: Re-test ALL of the identity server interactions](https://github.com/vector-im/riot-web/issues/10604) (in progress)
        * [10958 Terms of Service nitpicks](https://github.com/vector-im/riot-web/issues/10958) (in progress)
        * [10704 We treat an empty string identity server as not having one](https://github.com/vector-im/riot-web/issues/10704)
    * vector-im/riot-ios
        * [2518 Make sure there are no ugly edge cases running Riot without an integrations manager](https://github.com/vector-im/riot-ios/issues/2518) (done)
        * [2521 Privacy: Improve wording on contact upload UI](https://github.com/vector-im/riot-ios/issues/2521) (done)
        * [2532 VoIP: Stop falling back to Google for STUN](https://github.com/vector-im/riot-ios/issues/2532) (done)
        * [2600 Prompt to accept integration manager polices on use](https://github.com/vector-im/riot-ios/issues/2600) (done)
        * [2601 Decouple setting an email for password reset from publishing your threepid to the identity server and support choice of identity server (on registration)](https://github.com/vector-im/riot-ios/issues/2601) (done)
        * [2602 Prompt to accept identity server policies before inviting them to a room](https://github.com/vector-im/riot-ios/issues/2602) (done)
        * [2603 Identity server v2 API authentication](https://github.com/vector-im/riot-ios/issues/2603) (done)
        * [2606 Settings: Add a Discovery section](https://github.com/vector-im/riot-ios/issues/2606) (done)
        * [2608 Registration: Update consents flow](https://github.com/vector-im/riot-ios/issues/2608) (done)
        * [2643 Ability to disable all identity server functionality via the config file](https://github.com/vector-im/riot-ios/issues/2643) (done)
        * [2646 VoIP: Fallback to matrix.org STUN server with a confirmation dialog](https://github.com/vector-im/riot-ios/issues/2646) (done)
        * [2647 MXRestClient: Move IS API to its own](https://github.com/vector-im/riot-ios/issues/2647) (done)
        * [2648 Remove the bind true flag from 3PID calls on registration](https://github.com/vector-im/riot-ios/issues/2648) (done)
        * [2650 Remove the bind true flag from 3PID adds in settings](https://github.com/vector-im/riot-ios/issues/2650) (done)
        * [2651 Store identity server in Account Data and support choosing identity server integration in User Settings](https://github.com/vector-im/riot-ios/issues/2651) (done)
        * [2652 Use the hashed v2 lookup API for 3PIDs](https://github.com/vector-im/riot-ios/issues/2652) (done)
        * [2653 Allow email registration, password reset & adding 3pids when no IS](https://github.com/vector-im/riot-ios/issues/2653) (done)
        * [2654 Use nicer APIs for toggling a 3PID's shared status](https://github.com/vector-im/riot-ios/issues/2654) (done)
        * [2657 Allow email registration when no IS](https://github.com/vector-im/riot-ios/issues/2657) (done)
        * [2658 Allow password reset when no IS](https://github.com/vector-im/riot-ios/issues/2658) (done)
        * [2659 Allow adding 3pids when no IS](https://github.com/vector-im/riot-ios/issues/2659) (done)
        * [2660 Handle terms agreement in the Discovery section of settings](https://github.com/vector-im/riot-ios/issues/2660) (done)
        * [2661 Remove the ability to set an IS at login/registration](https://github.com/vector-im/riot-ios/issues/2661) (done)
        * [2662 We should make it clear in the UI that device names are publicly readable](https://github.com/vector-im/riot-ios/issues/2662) (done)
        * [2664 Placeholder issue for privacy migration path](https://github.com/vector-im/riot-ios/issues/2664) (done)
        * [2665 Ensure IS in account data is read / written as specced](https://github.com/vector-im/riot-ios/issues/2665) (done)
        * [2672 Handle the case of no IS in features that require IS to lookup](https://github.com/vector-im/riot-ios/issues/2672) (done)
        * [2675 Email help text on registration should be updated without binding](https://github.com/vector-im/riot-ios/issues/2675) (done)
        * [2682 Send IS for adding MSISDNs only when required by HS](https://github.com/vector-im/riot-ios/issues/2682) (done)
        * [2686 Use wellknown to discover the IS of a custom HS](https://github.com/vector-im/riot-ios/issues/2686) (done)
        * [2696 Lowercase emails during IS lookup calls](https://github.com/vector-im/riot-ios/issues/2696) (done)
        * [2704 Use `id_access_token` in CS API when required](https://github.com/vector-im/riot-ios/issues/2704) (done)
        * [2604 Settings: Ability to change the identity server](https://github.com/vector-im/riot-ios/issues/2604) (in progress)
        * [2649 Ability to disconnect from the identity server by pressing buttons in user settings](https://github.com/vector-im/riot-ios/issues/2649) (in progress)
        * [2713 Use the new backend APIs for adding-3pid-to-homeserver and binding-3pid-on-identity-server when they exist.](https://github.com/vector-im/riot-ios/issues/2713) (in progress)
        * [2718 Riot should check for r0.6.0 server support alongside feature flags](https://github.com/vector-im/riot-ios/issues/2718) (in progress)
        * [2683 Checking email invite account is unclear when no IS set](https://github.com/vector-im/riot-ios/issues/2683)
        * [2731 Send validation tokens to submit_url from HS](https://github.com/vector-im/riot-ios/issues/2731)
        * [2732 Do not include ID server or access token when HS supports MSC2290](https://github.com/vector-im/riot-ios/issues/2732)
        * [2736 IS terms cannot be accepted anymore](https://github.com/vector-im/riot-ios/issues/2736)
    * vector-im/riot-android
        * [3223 VoIP: Stop falling back to Google for STUN](https://github.com/vector-im/riot-android/issues/3223) (done)
        * [3224 Make sure there are no ugly edge cases running Riot without an integrations manager](https://github.com/vector-im/riot-android/issues/3224) (done)
        * [3225 Prompt to accept integration manager polices on use](https://github.com/vector-im/riot-android/issues/3225)(done)
        * [3226 Decouple setting an email for password reset from publishing your threepid to the identity server and support choice of identity server (on registration)](https://github.com/vector-im/riot-android/issues/3226) (done)
        * [3227 Prompt to accept identity server policies before inviting them to a room](https://github.com/vector-im/riot-android/issues/3227) (done)
        * [3228 Identity server v2 API authentication](https://github.com/vector-im/riot-android/issues/3228) (done)
        * [3229 Settings: Ability to change the identity server](https://github.com/vector-im/riot-android/issues/3229) (done)
        * [3230 Settings: Add a Discovery section](https://github.com/vector-im/riot-android/issues/3230) (done)
        * [3231 Registration: Update consents flow](https://github.com/vector-im/riot-android/issues/3231) (done)
        * [3252 Remove the bind true flag from 3PID calls on registration](https://github.com/vector-im/riot-android/issues/3252) (done)
        * [3253 Ability to disconnect from the identity server by pressing buttons in user settings](https://github.com/vector-im/riot-android/issues/3253) (done)
        * [3254 Remove the bind true flag from 3PID adds in settings](https://github.com/vector-im/riot-android/issues/3254) (done)
        * [3256 Store identity server in Account Data and support choosing identity server integration in User Settings](https://github.com/vector-im/riot-android/issues/3256) (done)
        * [3257 Use the hashed v2 lookup API for 3PIDs](https://github.com/vector-im/riot-android/issues/3257) (done)
        * [3258 Allow email registration, password reset & adding 3pids when no IS](https://github.com/vector-im/riot-android/issues/3258) (done)
        * [3260 Allow email registration when no IS](https://github.com/vector-im/riot-android/issues/3260) (done)
        * [3261 Allow password reset when no IS](https://github.com/vector-im/riot-android/issues/3261) (done)
        * [3262 Allow adding 3pids when no IS](https://github.com/vector-im/riot-android/issues/3262) (done)
        * [3263 Handle terms agreement in the Discovery section of settings](https://github.com/vector-im/riot-android/issues/3263) (done)
        * [3264 Remove the ability to set an IS at login/registration](https://github.com/vector-im/riot-android/issues/3264) (done)
        * [3265 We should make it clear in the UI that device names are publicly readable](https://github.com/vector-im/riot-android/issues/3265) (done)
        * [3268 Placeholder issue for privacy migration path](https://github.com/vector-im/riot-android/issues/3268) (done)
        * [3269 Ensure IS in account data is read / written as specced](https://github.com/vector-im/riot-android/issues/3269) (done)
        * [3277 Handle the case of no IS in features that require IS to lookup](https://github.com/vector-im/riot-android/issues/3277) (done)
        * [3278 Email help text on registration should be updated without binding](https://github.com/vector-im/riot-android/issues/3278) (done)
        * [3281 Send IS for adding MSISDNs only when required by HS](https://github.com/vector-im/riot-android/issues/3281) (done)
        * [3283 Use wellknown to discover the IS of a custom HS](https://github.com/vector-im/riot-android/issues/3283) (done)
        * [3289 Lowercase emails during IS lookup calls](https://github.com/vector-im/riot-android/issues/3289) (done)
        * [3295 Use `id_access_token` in CS API when required](https://github.com/vector-im/riot-android/issues/3295) (done)
        * [3300 Use the new backend APIs for adding-3pid-to-homeserver and binding-3pid-on-identity-server when they exist.](https://github.com/vector-im/riot-android/issues/3300)(done)
        * [3312 Riot should check for r0.6.0 server support alongside feature flags](https://github.com/vector-im/riot-android/issues/3312) (done)
        * [3316 Implement MSC2290](https://github.com/vector-im/riot-android/issues/3316) (done)
        * [3324 id_server param sent when registering an email on server that does not requires one](https://github.com/vector-im/riot-android/issues/3324) (done)
        * [3326 Discovery Settings / infinite loading if terms not signed on existing IS](https://github.com/vector-im/riot-android/issues/3326) (done)
        * [3327 vector.im is seen as having no terms, but it does](https://github.com/vector-im/riot-android/issues/3327) (done)
        * [3251 VoIP: Fallback to matrix.org STUN server with a confirmation dialog](https://github.com/vector-im/riot-android/issues/3251) (in progress)
        * [3248 Ability to disable all identity server functionality via the config file](https://github.com/vector-im/riot-android/issues/3248)
        * [3318 Send validation tokens to submit_url from HS](https://github.com/vector-im/riot-android/issues/3318)
        * [3322 Do not include ID server or access token when HS supports MSC2290](https://github.com/vector-im/riot-android/issues/3322)
    * vector-im/riotX-android
        * [490 Allow email registration, password reset & adding 3pids when no IS](https://github.com/vector-im/riotX-android/issues/490) (done)
        * [432 Prompt to accept integration manager polices on use](https://github.com/vector-im/riotX-android/issues/432) (in progress)
        * [431 Make sure there are no ugly edge cases running Riot without an integrations manager](https://github.com/vector-im/riotX-android/issues/431)
        * [433 Decouple setting an email for password reset from publishing your threepid to the identity server and support choice of identity server (on registration)](https://github.com/vector-im/riotX-android/issues/433)
        * [434 Prompt to accept identity server policies before inviting them to a room](https://github.com/vector-im/riotX-android/issues/434)
        * [435 Identity server v2 API authentication](https://github.com/vector-im/riotX-android/issues/435)
        * [436 Settings: Ability to change the identity server](https://github.com/vector-im/riotX-android/issues/436)
        * [438 Settings: Add a Discovery section](https://github.com/vector-im/riotX-android/issues/438)
        * [439 Registration: Update consents flow](https://github.com/vector-im/riotX-android/issues/439)
        * [489 Use the hashed v2 lookup API for 3PIDs](https://github.com/vector-im/riotX-android/issues/489)
    * matrix-org/matrix-doc
        * [1961 MSC1961: Integration manager authentication APIs](https://github.com/matrix-org/matrix-doc/pull/1961) (done)
        * [2078 MSC2078: Sending Third-Party Request Tokens via the Homeserver](https://github.com/matrix-org/matrix-doc/pull/2078) (done)
        * [2130 Identity service should do lookups based on hashed 3PIDs, not plaintext ones.](https://github.com/matrix-org/matrix-doc/issues/2130) (done)
        * [2134 MSC2134: Identity Hash Lookups](https://github.com/matrix-org/matrix-doc/pull/2134) (done)
        * [2139 Method for ISes and Integration managers to provide terms of service](https://github.com/matrix-org/matrix-doc/issues/2139) (done)
        * [2140 MSC2140: Terms of Service for ISes and IMs](https://github.com/matrix-org/matrix-doc/pull/2140) (done)
        * [2229 MSC2229: Allowing 3PID Owners to Rebind](https://github.com/matrix-org/matrix-doc/pull/2229) (done)
        * [2230 MSC2230: Store Identity Server in Account Data](https://github.com/matrix-org/matrix-doc/pull/2230) (done)
        * [2263 MSC2263: Give homeservers the ability to handle their own 3PID registrations/password resets](https://github.com/matrix-org/matrix-doc/pull/2263) (done)
        * [2264 MSC2264: Add an unstable feature flag to MSC2140 for clients to detect support](https://github.com/matrix-org/matrix-doc/pull/2264) (done)
        * [2290 MSC2290: Separate Endpoints for Threepid Binding](https://github.com/matrix-org/matrix-doc/pull/2290) (in progress)
    * matrix-org/sydent
        * [178 Support for MSC2140](https://github.com/matrix-org/sydent/issues/178) (done)
        * [179 Support testing with matrix-is-tester](https://github.com/matrix-org/sydent/pull/179) (done)
        * [180 Support for MSC2140](https://github.com/matrix-org/sydent/pull/180) (done)
        * [181 Deny bindings to anything other than the mxid you're authed as](https://github.com/matrix-org/sydent/pull/181) (done)
        * [184 Hash 3PID lookups](https://github.com/matrix-org/sydent/pull/184) (done)
        * [186 Don't fail the unbind request if the binding doesn't exist](https://github.com/matrix-org/sydent/pull/186) (done)
        * [187 Add more tweaks to terms branch](https://github.com/matrix-org/sydent/pull/187) (done)
        * [189 Redact looked-up threepids from the application logs.](https://github.com/matrix-org/sydent/issues/189) (done)
        * [191 Add OpenID auth to 3PID hash lookup](https://github.com/matrix-org/sydent/issues/191) (done)
        * [197 Have 'mappings' contain medium as well as address](https://github.com/matrix-org/sydent/pull/197) (done)
        * [198 Throw exception on bad args & catch in wrapper](https://github.com/matrix-org/sydent/pull/198) (done)
        * [199 Return algorithm, lookup_pepper in M_INVALID_PEPPER response](https://github.com/matrix-org/sydent/pull/199) (done)
        * [200 Support MSC2140 register/terms endpoints](https://github.com/matrix-org/sydent/pull/200) (done)
        * [201 Port v1 endpoints to v2](https://github.com/matrix-org/sydent/pull/201) (done)
        * [202 Deny bindings to anything other than the mxid you're authed as](https://github.com/matrix-org/sydent/pull/202) (done)
        * [204 Fix the signing servlet](https://github.com/matrix-org/sydent/pull/204) (done)
        * [205 Correct API v1 path check in get_args](https://github.com/matrix-org/sydent/pull/205) (done)
        * [206 Fix terms POST](https://github.com/matrix-org/sydent/pull/206) (done)
        * [207 Deploy policy file](https://github.com/matrix-org/sydent/issues/207) (done)
        * [208 Remove PII logging from log-level INFO](https://github.com/matrix-org/sydent/pull/208) (done)
        * [213 Delete threepid assocs on unbind and remove existing with migration](https://github.com/matrix-org/sydent/pull/213) (done)
        * [217 Allow non-matrix.org MXIDs via v2 only once terms are enabled](https://github.com/matrix-org/sydent/issues/217) (done)
        * [218 Unbind fails to remove the binding on matrix.org IS](https://github.com/matrix-org/sydent/issues/218) (done)
        * [220 Unbind fails to work for bindings where it was attempted with #213](https://github.com/matrix-org/sydent/issues/220) (done)
        * [192 Sydent doesn't delete 3PIDs from DB on unbind](https://github.com/matrix-org/sydent/issues/192) (in progress)
    * matrix-org/synapse
        * [1287 We need to actually censor redactions from the DB (SYN-284)](https://github.com/matrix-org/synapse/issues/1287) (done)
        * [5751 Make homeservers able to handle registration-with-email without depending on an Identity Server](https://github.com/matrix-org/synapse/issues/5751) (done)
        * [5786 Support IS v2 API with authentication for requests proxied to the IS](https://github.com/matrix-org/synapse/issues/5786) (done)
        * [5827 Add 3PID unbind API for MSC2140](https://github.com/matrix-org/synapse/issues/5827) (done)
        * [5835 [1/2] Allow homeservers to send registration emails | Sending the email](https://github.com/matrix-org/synapse/pull/5835) (done)
        * [5861 Use the v2 lookup API for 3PID invites](https://github.com/matrix-org/synapse/issues/5861) (done)
        * [5862 Allow account owners to rebind 3PIDs as in MSC2229](https://github.com/matrix-org/synapse/issues/5862) (done)
        * [5868 Add flag in /versions for whether clients should send id_server params](https://github.com/matrix-org/synapse/pull/5868) (done)
        * [5874 Placeholder issue for privacy migration path](https://github.com/matrix-org/synapse/issues/5874) (done)
        * [5875 Remove trusted_third_party_id_servers functionality](https://github.com/matrix-org/synapse/pull/5875) (done)
        * [5876 Replace trust_identity_server_for_password_resets with account_threepid_delegate](https://github.com/matrix-org/synapse/pull/5876) (done)
        * [5892 Switch to using v2 Identity Service APIs other than lookup (MSC 2140)](https://github.com/matrix-org/synapse/pull/5892) (done)
        * [5897 Use the v2 lookup API for 3PID invites](https://github.com/matrix-org/synapse/pull/5897) (done)
        * [5927 Add a m.id_access_token flag to unstable_features](https://github.com/matrix-org/synapse/issues/5927) (done)
        * [5928 Split account_threepid_handler into a msisdn and email versions](https://github.com/matrix-org/synapse/issues/5928) (done)
        * [5929 Use account_threepid_delegate for sending SMS](https://github.com/matrix-org/synapse/issues/5929) (done)
        * [5930 Add m.id_access_token flag](https://github.com/matrix-org/synapse/pull/5930) (done)
        * [5934 Censor redactions in DB after a month](https://github.com/matrix-org/synapse/pull/5934) (done)
        * [5935 Use federation blacklist for requests to identity servers](https://github.com/matrix-org/synapse/issues/5935) (done)
        * [5937 Revert "Use the v2 lookup API for 3PID invites"](https://github.com/matrix-org/synapse/pull/5937) (done)
        * [5940 [2/2] Allow homeservers to send registration emails | Accepting the verification](https://github.com/matrix-org/synapse/pull/5940) (done)
        * [5945 Revert "Add m.id_access_token flag"](https://github.com/matrix-org/synapse/pull/5945) (done)
        * [5948 Support v2 Identity Server APIs](https://github.com/matrix-org/synapse/pull/5948) (done)
        * [5964 Remove bind_email and bind_msisdn](https://github.com/matrix-org/synapse/pull/5964) (done)
        * [5968 Set m.require_identity_server to always be False](https://github.com/matrix-org/synapse/pull/5968) (done)
        * [5969 Change account_threepid_delegate to a dictionary](https://github.com/matrix-org/synapse/pull/5969) (done)
        * [5972 Add m.require_identity_server to /versions unstable_flags](https://github.com/matrix-org/synapse/pull/5972) (done)
        * [5974 Add m.id_access_token to /versions unstable_features (MSC2264)](https://github.com/matrix-org/synapse/pull/5974) (done)
        * [5976 Use the v2 Identity Service API for lookups (MSC2134 + MSC2140)](https://github.com/matrix-org/synapse/pull/5976) (done)
        * [5979 v2 3PID Invites (part of MSC2140)](https://github.com/matrix-org/synapse/pull/5979) (done)
        * [5980 Add POST /_matrix/client/r0/account/3pid/unbind (MSC2140)](https://github.com/matrix-org/synapse/pull/5980) (done)
        * [5987 Allow Synapse to send registration emails + choose Synapse or an external server to handle 3pid validation](https://github.com/matrix-org/synapse/pull/5987) (done)
        * [5996 Allow users to rebind 3pids they own (MSC2229)](https://github.com/matrix-org/synapse/pull/5996) (done)
        * [6000 Use the federation blacklist for requests to untrusted Identity Servers](https://github.com/matrix-org/synapse/pull/6000) (done)
        * [6011 Use account_threepid_delegate for 3pid validation](https://github.com/matrix-org/synapse/pull/6011) (done)
        * [6013 Fix existing v2 identity server calls (MSC2140)](https://github.com/matrix-org/synapse/pull/6013) (done)
        * [6042 Allow HS to send emails when adding an email to the HS](https://github.com/matrix-org/synapse/pull/6042) (done)
        * [6043 Implement MSC2290](https://github.com/matrix-org/synapse/pull/6043) (done)
        * [6044 Add an unstable feature flag for separate add/bind 3pid APIs](https://github.com/matrix-org/synapse/pull/6044) (done)
        * [6062 Use unstable prefix for 3PID unbind API](https://github.com/matrix-org/synapse/pull/6062) (done)
        * [6067 Drop support for bind param on POST /account/3pid (MSC2290)](https://github.com/matrix-org/synapse/pull/6067) (done)
        * [6076 Synapse doesn't give clients a submit_url on requestToken breaking msisdn adding](https://github.com/matrix-org/synapse/issues/6076) (done)
        * [6078 Add POST submit_token endpoint for MSISDN](https://github.com/matrix-org/synapse/pull/6078) (done)
        * [6079 Add submit_url response parameter to msisdn /requestToken](https://github.com/matrix-org/synapse/pull/6079) (done)
        * [6087 Remove hardcoded defaults of matrix.org and vector.im in configuration](https://github.com/matrix-org/synapse/issues/6087) (done)
        * [6090 Explicitly log when a homeserver does not have a trusted key server configured](https://github.com/matrix-org/synapse/pull/6090)(done)
        * [6096 Riot Web expects the email validation next_link to have the sid appended](https://github.com/matrix-org/synapse/issues/6096) (done)
        * [6100 Remove email from registration flows if it’s unsupported](https://github.com/matrix-org/synapse/issues/6100) (done)
        * [6103 _check_threepid in auth.py incorrect for MSISDN](https://github.com/matrix-org/synapse/issues/6103) (done)
        * [6045 Support Client-Server API r0.6.0](https://github.com/matrix-org/synapse/issues/6045) (in progress)
        * [1263 When we redact events, any mxc content they refer to should be redacted too (SYN-216)](https://github.com/matrix-org/synapse/issues/1263)
        * [4565 Metadata resistance.](https://github.com/matrix-org/synapse/issues/4565)
        * [6086 Fetch signing-keys directly from servers before falling back to the trusted_key_servers](https://github.com/matrix-org/synapse/issues/6086)
* phase:2
    * vector-im/riot-web
        * [4913 Option for homeservers to set a default integration manager](https://github.com/vector-im/riot-web/issues/4913) (done)
        * [10161 Store Integration Manager preferences in account data and allow user to change them somewhere sensible](https://github.com/vector-im/riot-web/issues/10161) (done)
        * [10967 Disconnect from identity server fails](https://github.com/vector-im/riot-web/issues/10967) (done)
        * [10443 Remove v1 IS API fallbacks once servers are updated](https://github.com/vector-im/riot-web/issues/10443)
        * [10557 Prompt users each time before sending data to an Identity Server that doesn't have a terms of service (unless you have actively set that IS in your account data).](https://github.com/vector-im/riot-web/issues/10557)
        * [10696 Allow users to disconnect from an integration manager entirely in the same way that we support doing this for identity servers](https://github.com/vector-im/riot-web/issues/10696)
        * [10909 Unable to disconnect from IS if the server is unavailable](https://github.com/vector-im/riot-web/issues/10909)
        * [10936 Refine submit_url handling to only activate with separate add and bind](https://github.com/vector-im/riot-web/issues/10936)
    * vector-im/riot-ios
        * [2711 Provide a better UX for users considering sharing their contact list with an IS to discover people they know already using Matrix](https://github.com/vector-im/riot-ios/issues/2711)
    * vector-im/riot-android
        * [3282 Checking email invite account is unclear when no IS set](https://github.com/vector-im/riot-android/issues/3282)
        * [3323 Post MSC2290 bug / Clicking on the validation mail link fails registration](https://github.com/vector-im/riot-android/issues/3323)
    * matrix-org/matrix-doc
        * [1957 MSC1957: Integration manager discovery](https://github.com/matrix-org/matrix-doc/pull/1957) (done)
    * matrix-org/sydent
        * [196 Remove the lookup_hash field from local_threepid_associations](https://github.com/matrix-org/sydent/issues/196) (in progress)
    * matrix-org/synapse
        * [5881 Remove trust_identity_server_for_password_resets and account_threepid_delegate options](https://github.com/matrix-org/synapse/issues/5881)
* phase:3
    * vector-im/riot-web
        * [10563 Add better domain for turn.matrix.org use as STUN server](https://github.com/vector-im/riot-web/issues/10563) (done)
        * [10087 Prompt to accept integration manager policies on registration](https://github.com/vector-im/riot-web/issues/10087)
        * [10167 Present an aggregated terms of service dialogue at registration if possible](https://github.com/vector-im/riot-web/issues/10167)
        * [10168 If a user has disabled the identity server integration on their account, we should make invite user handle this nicely](https://github.com/vector-im/riot-web/issues/10168)
        * [10401 Invite new users to publish their threepids to the identity server](https://github.com/vector-im/riot-web/issues/10401)
        * [10422 Use more contextual prompt for integration manager polices on use](https://github.com/vector-im/riot-web/issues/10422)
        * [10453 Log out from IM on Riot log out and IM removal](https://github.com/vector-im/riot-web/issues/10453)
        * [10455 Log out from IS on Riot log out and IS removal](https://github.com/vector-im/riot-web/issues/10455)
        * [10487 Store the date of users having read and accepted the IM policies in the IM db](https://github.com/vector-im/riot-web/issues/10487)
        * [10488 Store the date of users having read and accepted the IS policies in the IS db](https://github.com/vector-im/riot-web/issues/10488)
        * [10498 Terms test scalar requires the legacy ?v query param on the new account route](https://github.com/vector-im/riot-web/issues/10498)
        * [10575 We should show the 'must configure TURN' warning when a call fails, even after using the fallback turn.matrix.org](https://github.com/vector-im/riot-web/issues/10575)
        * [10615 Change all IS access token APIs to use getIdentityAccessToken only](https://github.com/vector-im/riot-web/issues/10615)
        * [10671 riot submits sign-ed25519 requests as POST requests with params in query string and empty body](https://github.com/vector-im/riot-web/issues/10671)
        * [10746 /invite doesn't force terms with older homeservers](https://github.com/vector-im/riot-web/issues/10746)
        * [10830 Show IS policy links in user settings somewhere.](https://github.com/vector-im/riot-web/issues/10830)
        * [10950 Unhelpful 400 error when adding MSISDN and server doesn’t delegate](https://github.com/vector-im/riot-web/issues/10950)
    * vector-im/riot-ios
        * [2710 Show IS policy links in user settings somewhere.](https://github.com/vector-im/riot-ios/issues/2710)
    * matrix-org/matrix-doc
        * [447 We need a way to be able to expire data from a HS. (SPEC-141)](https://github.com/matrix-org/matrix-doc/issues/447)
    * matrix-org/synapse
        * [5830 `pushers` table contains user device names, which may include user real names](https://github.com/matrix-org/synapse/issues/5830)
