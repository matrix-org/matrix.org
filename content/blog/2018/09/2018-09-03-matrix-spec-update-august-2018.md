+++
title = "Matrix Spec Update August 2018"
path = "/blog/2018/09/03/matrix-spec-update-august-2018"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

## Introducing Client Server API 0.4, and the first ever stable IS, AS and Push APIs spec releases

Hi folks,

As many know, we've been on a massive sprint to improve the spec - both fixing omissions where features have been implemented in the reference servers but were never formalised in the spec, and fixing bugs where the spec has thinkos which stop us from being able to ratify it as stable and thus fit for purpose .

In practice, our target has been to cut stable releases of all the primary Matrix APIs by the end of August - effectively declaring Matrix out of beta, at least at the specification level.  For context: historically only one API has ever been released as stable - the Client Server API, which was the result of a similar sprint back in Jan 2016. This means that the Server Server (SS) API, Identity Service (IS) API, Application Service (AS) API and Push Gateway API have never had an official stable release - which has obviously been problematic for those implementing them.

However, as of the end of Friday Aug 31, we're proud to announce the first ever stable releases of the <a href="/docs/spec">IS, AS and Push APIs</a>!

<!-- markdownlint-disable-next-line no-alt-text -->
<a href="/docs/spec"><img src="/_matrix/media/v1/download/t2l.io/587a1a86905b1e0e8f9342d76e57ffbe" /></a>
To the best of our knowledge, these API specs are now complete and accurately describe all the current behaviour implemented in the reference implementations (sydent, synapse and sygnal) and are fit for purpose. Any deviation from the spec in the reference implementations should probably be considered a bug in the impl. All changes take the form of filling in spec omissions and adding clarifications to the existing behaviour in order to get things to the point that an independent party can implement these APIs without having to refer to anything other than the spec.

This is the result of a lot of work which spans the whole Spec Core Team, but has been particularly driven by TravisR, who has taken the lead on this whole mission to improve the spec.  Huge thanks are due to Travis for his work here, and also massive thanks to everyone who has ~~suffered~~ ~~endured~~ reviewed his PRs and contributed to the releases.  The spec is looking unrecognisably better for it - and Matrix 1.0 is feeling closer than ever!

Alongside the work on the IS/AS/Push APIs, there has also been a massive attempt to plug all the spec omissions in the Client Server API.  Historically the CS API releases have missed some of the newer APIs (and of course always miss the ones which postdate a given release), but we've released the APIs which /have/ been specified as stable in order to declare them stable.  However, in this release we've tried to go through and fill in as many remaining gaps as possible.

The result is the release of <a href="/docs/spec/client_server/r0.4.0.html">Client Server API version 0.4</a>. This is a huge update - increasing the size of the CS API by ~40%. The biggest new stuff includes fully formalising support for end-to-end encryption (thanks to Zil0!), versioning for rooms (so we can upgrade rooms to new versions of the protocol), synchronised read markers, user directories, server ACLs, MSISDN 3rd party ids, and .well-known server discovery (not that it's widely used yet), but for the full picture, best bet is to look at <a href="/docs/spec/client_server/r0.4.0.html#changelog">the changelog</a> (now managed by <a href="https://pypi.org/project/towncrier/">towncrier</a>!).  It's probably fair to say that the CS API is growing alarmingly large at this point - Chrome says that it'd be 223 A4 pages if printed. Our solution to this will be to refactor it somehow (and perhaps switch to a more compact representation of the contents).

Some things got deliberately missed from the CS 0.4 release: particularly membership Lazy Loading (because we're still testing it out and haven't released it properly in the wild yet), the various GDPR-specific APIs (because they may evolve a bit as we refine them since the original launch), finalising ID grammars in the overall spec (because this is surprisingly hard and subtle and we don't want to rush it) and finally Communities (aka Groups), as they are still somewhat in flux.

Meanwhile, on the Server to Server API, there has also been a massive amount of work.  Since the beginning of July it's
<b>tripled</b> in size as we've filled in the gaps, over the course of &gt;200 commits (&gt;150 of which from Travis).  If you take a look at the <a href="/docs/spec/server_server/unstable.html">current snapshot</a> it's pretty unrecognisable from the historical draft; with the main changes being:

<ul>
  <li style="font-weight: 400;">Adding the new State Resolution algorithm to address flaws in the original one.  This has been where much of our time has gone - see <a href="https://github.com/matrix-org/matrix-doc/pull/1441">MSC1442</a> for full details.  Adopting the new algorithm requires rooms to be recreated; we'll write more about this in the near future when we actually roll it out.
</li>
  <li style="font-weight: 400;">Adding room versioning so we can upgrade to the new State Resolution algorithm.
</li>
  <li style="font-weight: 400;">Everything is now properly expressed as Swagger (OpenAPI), just like the CS API
</li>
  <li style="font-weight: 400;">Adding all the details for E2E encryption (including dependencies like to-device messaging and device-list synchronisation)
</li>
  <li style="font-weight: 400;">Improvements in specifying how to authorize inbound events over federation
</li>
  <li style="font-weight: 400;">Document federation APIs such as /event_auth and /query_auth and /get_missing_events
</li>
  <li style="font-weight: 400;">Document 3rd party invites over federation
</li>
  <li style="font-weight: 400;">Document the /user/* federation endpoints
</li>
  <li style="font-weight: 400;">Document Server ACLs
</li>
  <li style="font-weight: 400;">Document read receipts over federation
</li>
  <li style="font-weight: 400;">Document presence over federation
</li>
  <li style="font-weight: 400;">Document typing notifications over federation
</li>
  <li style="font-weight: 400;">Document content repository over federation
</li>
  <li style="font-weight: 400;">Document room directory over federation
</li>
  <li style="font-weight: 400;">...and many many other minor bug fixes, omission fixes, and restructuring for coherency - see <a href="https://github.com/matrix-org/matrix-doc/issues/1464">https://github.com/matrix-org/matrix-doc/issues/1464</a> for an even longer list :)
</li>
</ul>
However, we haven't finished it all: despite our best efforts we're running slightly past the original target of Aug 31.  The current state of play for the r0 release overall (in terms of pending issues) is:
<a href="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-16.56.18.png"><img class="aligncenter size-full wp-image-3525" src="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-16.56.18.png" alt="" width="576" height="214" /></a>...and you can see the full breakdown over at the <a href="https://github.com/matrix-org/matrix-doc/projects/1">public Github project dashboard</a>.

The main stuff we still have remaining on the Server/Server API at this point is:

<ul>
  <li style="font-weight: 400;">Better specifying how we validate inbound events. See <a href="https://github.com/matrix-org/matrix-doc/issues/1646">MSC1646</a> for details & progress.
</li>
  <li style="font-weight: 400;">Switching event IDs to be hashes. See <a href="https://github.com/matrix-org/matrix-doc/issues/1640">MSC1640</a> for details and progress.
</li>
  <li style="font-weight: 400;">Various other remaining security considerations (e.g. how to handle malicious auth events in the DAG; how to better handle DoS situations).
</li>
  <li style="font-weight: 400;">Merging in the changes to authoring m.room.power_levels (as per <a href="https://github.com/matrix-org/matrix-doc/issues/1304">MSC1304</a>)
</li>
  <li style="font-weight: 400;">Formally specifying the remaining identifiers which lack a formal grammar - <a href="https://github.com/matrix-org/matrix-doc/pull/1598">MSC1597</a> and particularly room aliases (
<a href="https://github.com/matrix-org/matrix-doc/pull/1607">MSC1608</a>)
</li>
</ul>
The plan here is to continue speccing and implementing these at top priority (with Travis continuing to work fulltime on spec work), and we'll obviously keep you up-to-date on progress.  Some of the changes here (e.g. event IDs) are quite major and we definitely want to implement them before speccing them, so we're just going to have to keep going as fast as we can. Needless to say we want to cut an r0 of the S2S API alongside the others asap and declare Matrix out of beta (at least at the spec level :)

In terms of visualising progress on this spec mission it's interesting to look at the rate at which we've been closing PRs: this graph shows the total number of PRs which are in state ‘open' or ‘closed' on any given day:

<a href="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-00.56.38.png"><img class="aligncenter size-large wp-image-3526" src="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-00.56.38-1024x722.png" alt="" width="1024" height="722" /></a>

...which clearly shows the original sprint to get the r0 of the CS API out the door at the end 2015, and then a more leisurely pace until the beginning of July 2018 since which the pace has picked up massively.  Other ways of looking at include the number of open issues...

<a href="/blog/wp-content/uploads/2018/09/image-1.png"><img class="aligncenter size-large wp-image-3527" src="/blog/wp-content/uploads/2018/09/image-1-1024x691.png" alt="" width="1024" height="691" /></a>
...or indeed the number of commits per week…

<a href="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-01.02.27.png"><img class="aligncenter wp-image-3528" src="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-01.02.27-1024x195.png" alt="" width="710" height="135" /></a>
...or the overall Github Project activity for August.  (It's impressive to see Zil0 sneaking in there on second place on the commit count, thanks to all his GSoC work documenting E2E encryption in the spec as part of implementing it in matrix-python-sdk!)

<a href="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-01.03.57.png"><img class="aligncenter wp-image-3529" src="/blog/wp-content/uploads/2018/09/Screen-Shot-2018-09-03-at-01.03.57-1024x925.png" alt="" width="744" height="672" /></a>
Anyway, enough numerology.  It's worth noting that all of the dev for r0 has generally followed the proposed <a href="/blog/2018/06/20/towards-open-governance-for-matrix-org/">Open Governance Model for Matrix</a>, with the core spec team made up of both historical core team folk (erik, richvdh, dave & matthew), new core team folk (uhoreg & travis) and community folk (kitsune, anoa & mujx) working together to review and approve the changes - and we've been doing MSCs (albeit with an accelerated pace) for anything which we feel requires input from the wider community.  Once the Server/Server r0 release is out the door we'll be finalising the open governance model and switching to a slightly more measured (but productive!) model of spec development as outlined there.

Meanwhile, Matrix 1.0 gets ever closer.  With (almost) all this spec mission done, our plan is to focus more on improving the reference implementations - particularly performance in Synapse,
UX in matrix-{'{'}react,ios,android{'}'}-sdk as used by Riot (especially for E2E encryption), and then declare a 1.0 and get back to implementing new features (particularly Editable Messages and Reactions) at last.

We'd like to thank everyone for your patience whilst we've been playing catch up on the spec, and hope you agree it's been worth the effort :)

Matthew & the core spec team.
