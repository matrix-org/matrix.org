+++
title = "Towards open governance for Matrix.org"
path = "/blog/2018/06/20/towards-open-governance-for-matrix-org"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

Since we created Matrix.org back in 2014, the majority of the Matrix core team has worked for the same company - originally subsidiaries of Amdocs, and then since August 2017 for New Vector; the startup we incorporated to rehire the core team and support Matrix after we parted ways from Amdocs.

Despite working for a for-profit company, our prime directive has <b>always</b> been the long term mission to successfully run Matrix as a non-profit initiative for the benefit of the whole internet: to create a ubiquitous secure open network which gives users control back over their communication and avoids them ever being locked into silos again.  And even though Matrix.org hasn't been a formal non-profit foundation, we've treated it as such in all respects (e.g. gathering donations to support development on Matrix)

Running Matrix.org as a non-profit means prioritising to neutrally support all players in the whole ecosystem without ever giving unfair advantage to any individual participant (particularly New Vector) - where that ecosystem includes end-users, client devs, testers, spec devs, server admins, companies building products on Matrix, bridge devs, bot devs, widget devs, server devs, distro maintainers, moderators, even end-users who are using Matrix indirectly via bridges.

That being said, having the core team work for the same startup is still a somewhat unorthodox model for an open source project building an open standard, so we'd like to explain the main reasons for doing it up to this point:
<ul>
  <li style="font-weight: 400;">To ensure that Matrix is fit for real-world usage and to force us to dogfood it. To ensure that it is a protocol that works well enough that you can build a commercial startup around it if you so wanted, and to motivate us to build Matrix as something more than an academic or nerdy exercise in protocol design - rather one which can be commercially viable.</li>
  <li style="font-weight: 400;">To help ensure the core team is aligned and pulling towards the same goal, especially during the process of actually designing and “giving birth” to the initial protocol and getting it to an ‘r0' release across all APIs.  We strongly believe that when a project is in the design phase you get faster and better design from a bunch of people who are collaborating together towards the same goal, rather than independent factions who might pursue their own agendas at the expense of the overall project.</li>
  <li style="font-weight: 400;">Because we believe the value of Matrix lies in the size of the ecosystem, and if Matrix realises its full potential (i.e. it grows as big as the web), it only makes it more useful and valuable for *everyone*. We realise that it might be a leap of faith to believe that we don't have any incentive to sabotage Matrix by privileging specific players (after all, there are so many companies out there in it just for the cash), but the fact is that this is where we stand, and we're doing our best to prove it. To spell it out: it is in New Vector's interest (and also in the interests of other Matrix-focused companies) to grow Matrix to be as big, open, unfragmented and as neutral as possible.  Matrix should be big enough for a multitude of wildly successful companies and projects to benefit from it, and everyone wins - just like the web.</li>
</ul>
<b>However</b>, this approach is not perfect and comes with some major problems:
<ul>
  <li style="font-weight: 400;">Without clear separation of responsibilities and incentives, we have to ask the community to take it on faith that our efforts are never intended to privilege New Vector ahead of the wider ecosystem. This leaves room for doubt, especially when our reasoning is unclear or our conclusions controversial.<br />A good example of a controversial decision is the lack of investment by the core team in the Server-Server API.  For the last ~2 years (since Mar 2016) we made the judgement call to prioritise user-facing features and experience.  The rationale was that to grow Matrix we need to provide a viable alternative to Slack/Discord/WhatsApp etc, and doing that means providing a Client-Server API which lets clients do just that, and server implementations capable of running at scale. This is why the CS API has had a stable release since Dec 2015 (currently at r0.3.0) and why we've put so much effort into server scaling/perf... but the SS API itself still has bugs and has still not yet made it to a stable release.<br />This is obviously incredibly frustrating to server devs who tried to implement the SS API despite it being unstable and unreleased. In retrospect it might have been a mistake and we could probably have turned off signup on matrix.org and diverted the resources to the SS API work instead.  However, this is a case of making the judgement call to prioritising the overall ecosystem over one class of stakeholders (server devs) by focusing on providing users usable and featureful decentralised communication apps. Indeed we strongly believe that users are the main means to grow the ecosystem (others have failed without them): no one joins a network with no friends, however popular it is among devs.  Nonetheless, we are finally in a position to <a href="/blog/2018/06/15/this-week-in-matrix-2018-06-15/">hire spec maintainers and get to a stable S2S</a> as fast as we possibly can, and frankly feel relieved to be able to unblock this situation.<br />Another good example is the recent <a href="/blog/2018/06/14/security-update-synapse-0-31-2/">0.31.2 security update</a><span style="font-weight: 400;"> of Synapse: this was a defensive patch to the protocol that we added to ensure that even if bugs occur when authing events over federation, it should be impossible for a random user to ever hijack a room again.  We specced this out as a formal proposal and are gathering feedback, but expedited implementation in Synapse to protect the overall ecosystem. However, it turns out that the change breaks a small number of highly custom rooms, and so we find ourselves accused of privileging NV.  The reality is that we made a judgement call to protect the vast majority of today's ecosystem (and hope to provide a longer-term fix in the relatively near future which /will/ be compatible with more custom room use cases).
</span>
</li>
  <li style="font-weight: 400;"><span style="font-weight: 400;">Another problem is some companies find it a turn-off to participate in Matrix unless they have a well-defined process for influencing the direction of the protocol.  Now, sometimes this could be seen as a feature rather than a bug; the last thing the ecosystem needs is a greedy corp trying to subvert the protocol to its own competitive advantage, and we don't want to be locked in that kind of battle either.  However, there are also lots of well-meaning and constructive companies who want to participate too, and there's an argument that they want a well-defined process for doing so.
</span>
</li>
  <li style="font-weight: 400;">The other main problem is simply one of checks & balances.  Even though NV may be a good guardian today, what if something changed in future? e.g. if NV got bought by Microsoft, or if someone on the team had some crisis and changed priorities?  Whilst one could always fork, such things are incredibly disruptive and fragmenting and it'd be good to engineer Matrix.org's governance to be resilient to such eventualities as much as is possible.
</li>
</ul>
To address these problems, in March of this year we started work on a long term proposal to establish an open governance model for Matrix which ensures the neutrality of the protocol, lets the community contribute as widely as possible, and incorporates a dedicated neutral non-profit Matrix.org Foundation separate to New Vector.

As work progressed on the proposal, it became clear that actually transitioning to a new governance model would seriously slow down the sprint towards a stable r0 release. We therefore decided to put completing the governance model on hold until after the r0 release (scheduled for the end of August).

With the end of r0 now in sight, completing work on the governance model is back on the agenda. We obviously want to ensure that the proposed governance model is going to work for everyone, so we'd like to introduce the first draft of <a href="https://docs.google.com/document/d/1vASIt2v0UwKnUKHNEjA_P3SFCM0kcIUl1LQyM--ax04/edit#">Matrix Spec Change 1318: a proposal for open governance of the Matrix.org Spec</a>. This is quite an early draft; the idea is to gather feedback over the next few months and we'll then incorporate the Foundation and deploy the new governance model to coincide with the long-awaited stable release of all APIs of the Matrix Spec (assuming the release doesn't slip).

The main points in the proposal are:

<ul>
  <li style="font-weight: 400;">To adopt the new governance model once all APIs have had a stable r0 release.  For S2S API, this means fixing the remaining flaws in the federation protocol and closing the spec omissions such that compliant independent implementations can be written purely based on the spec.  For the AS and IS and Push API it means just closing spec omissions (if any) and doing a final review.
</li>
  <li style="font-weight: 400;">To define the mission of Matrix: to return control of communication to users by building a standards-based open secure decentralised communication network.
</li>
  <li style="font-weight: 400;">To define the mandate of the core team to act as a neutral custodian of the Matrix Spec, prioritising the long-term success and growth of the overall network over individual commercial concerns.
</li>
  <li style="font-weight: 400;">To define the guiding principles of the core team, e.g. collaboration rather than competition and contrarianism.
</li>
  <li style="font-weight: 400;">To restructure the core team to incorporate members of the community as well as the founding core team.
</li>
  <li style="font-weight: 400;">To propose succession logistics for the core team
</li>
  <li style="font-weight: 400;">To propose the role and governance structure of the Matrix.org Foundation legal entity.
</li>
</ul>
Feedback would be much appreciated on the <a href="https://docs.google.com/document/d/1vASIt2v0UwKnUKHNEjA_P3SFCM0kcIUl1LQyM--ax04/edit#">MSC1318 Google Doc</a> - or come talk about it on
<a href="https://matrix.to/#/#matrix-spec-process:matrix.org">#matrix-spec-process:matrix.org</a> (which we might as well use for governance too).

It's exciting times as we finally move towards an initial stable release of Matrix across all APIs - we are firmly on the road to a 1.0, and improving our governance model is a massive part of that process.

thanks,

Matthew, Amandine & the core team.
