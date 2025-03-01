+++
title = "Introducing the Matrix.org Foundation (Part 1 of 2)"
path = "/blog/2018/10/29/introducing-the-matrix-org-foundation-part-1-of-2"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

Back in June we blogged about <a href="/blog/2018/06/20/towards-open-governance-for-matrix-org/">the plan of action to establish a formal open governance system</a> for the Matrix protocol: introducing both the idea of the Spec Core Team to act as the neutral technical custodian of the Matrix Spec, as well as confirming the plan to incorporate the Matrix.org Foundation to act as a neutral non-profit legal entity which can act as the legal Guardian for Matrix's intellectual property, gather donations to fund Matrix work, and be legally responsible for maintaining and evolving the spec in a manner which benefits the whole ecosystem without privileging any individual commercial concerns.  We published a draft proposal for the new governance model at <a href="https://github.com/matrix-org/matrix-doc/issues/1318">MSC1318: a proposal for open governance of the Matrix.org Spec</a> to gather feedback and to trial during the <a href="/docs/spec/proposals">day-to-day development of the spec</a>. Otherwise, we refocused on getting a 1.0 release of the Spec out the door, given there's not much point in having a fancy legal governance process to safeguard the evolution of the Spec when we don't even have a stable initial release!

We were originally aiming for end of August to publish a stable release of all Matrix APIs (and thus a so-called 1.0 of the overall standard) - and in the end we managed to <a href="/blog/2018/09/03/matrix-spec-update-august-2018/">publish stable releases of 4 of the 5 APIs</a> (Client-Server, Application Service, Identity Service and Push APIs) as well as a <a href="https://github.com/matrix-org/matrix-doc/commits/master/specification/server_server_api.rst">major overhaul</a> of the Server-Server (SS) API.  However, the SS API work has run on much longer than expected, as we've ended up both redesigning and needing to implement many major changes to to the protocol: the new State Resolution algorithm (<a href="https://github.com/matrix-org/matrix-doc/issues/1442">State Resolution Reloaded</a>) to fix state resets; versioned rooms (in order to upgrade to the new algorithm); changing event IDs to be hashes; and fixing a myriad federation bugs in Synapse.  Now, the remaining work is progressing steadily (you can see the progress over at <a href="https://github.com/orgs/matrix-org/projects/2">https://github.com/orgs/matrix-org/projects/2</a> - although some of the cards are redacted because they refer to non-spec consulting work) - and <strong>the end is in sight</strong>!

So, in preparation for the upcoming Matrix 1.0 release, we've been moving ahead with the rest of the open governance plan - and we're happy to announce that as of a few hours ago,<strong> the initial incarnation of The Matrix.org Foundation exists!</strong>

<a href="/blog/wp-content/uploads/2018/10/Certificate.png"><img class="aligncenter wp-image-3691" src="/blog/wp-content/uploads/2018/10/Certificate-723x1024.png" alt="" width="496" height="702" /></a>

Now, it's important to understand that <strong>this process is not finished </strong>- what we've done is to set up a solid initial basis for the Foundation in order to finish refining <a href="https://github.com/matrix-org/matrix-doc/issues/1318">MSC1318</a> and turning it into the full Articles of Association of the Foundation (i.e. the legal framework which governs the remit of the Foundation), which we'll be working on over the coming weeks.

In practice, what this means is that in the first phase, today's Foundation gives us:
<ul>
  <li>A UK <strong>non-profit company</strong> - technically incorporated as a <a href="https://en.wikipedia.org/wiki/Private_company_limited_by_guarantee">private company, limited by guarantee</a>.</li>
  <li><strong>Guardians</strong>, whose role is to be legally responsible for ensuring that the Foundation (and by extension the Spec Core Team) keeps on mission and neutrally protects the development of Matrix.  Matrix's Guardians form the Board of Directors of the Foundation, and will provide a 'checks and balances' mechanism between each other to ensure that all Guardians act in the best interests of the protocol and ecosystem.<br/ ><br />For the purposes of initially setting up the Foundation, the initial Guardians are Matthew & Amandine - but in the coming weeks we're expecting to appoint at least three independent Guardians in order to ensure that the current team form a minority on the board and ensure the neutrality of the Foundation relative to Matthew & Amandine's day jobs at New Vector.The profile we're looking for in Guardians are: folks who are independent of the commercial Matrix ecosystem (and especially independent from <a href="https://vector.im">New Vector</a>), and may even not be members of today's Matrix community, but who are deeply aligned with the mission of the project, and who are respected and trusted by the wider community to uphold the guiding principles of the Foundation and keep the other Guardians honest.</li>
  <li>An immutable <strong>asset lock</strong>, to protect the intellectual property of the Foundation and prevent it from ever being sold or transferred elsewhere.</li>
  <li>An immutable <strong>mission lock</strong>, which defines the Foundation's mission as a non-profit neutral guardian of the Matrix standard, with an initial formal goal of finalising the open governance process.  To quote article 4 from the initial Articles of Association:
<ul>
  <li>
<div class="page" title="Page 8">
<div class="layoutArea">
<div class="column">4. The objects of the Foundation are for the benefit of the community as a whole to:</div>
<div class="column">

4.1.1  empower users to control their communication data and have freedom over their communications infrastructure by creating, maintaining and promoting Matrix as an openly standardised secure decentralised communication protocol and network, open to all, and available to the public for no charge;

</div>
</div>
4.1.2  build and develop an appropriate governance model for Matrix through the Foundation, in order to drive the adoption of Matrix as a single global federation, an open standard unencumbered from any proprietary intellectual property and/or software patents, minimising fragmentation (whilst encouraging experimentation), maximising speed of development, and prioritising the long-term success and growth of the overall network over the commercial concerns of an individual person or persons.

</div></li>
</ul>
</li>
  <li>You can read the initial <a href="/blog/wp-content/uploads/2018/10/Constitution.pdf">Articles of Association</a> here (although all the rest of it is fairly generic legal boilerplate for a non-profit company at this point which hasn't yet been tuned; the Matrix-specific stuff is Article 4 as quoted above).  You can also see the initial details of the Foundation straight from the horse's mouth over at <a href="https://beta.companieshouse.gov.uk/company/11648710">https://beta.companieshouse.gov.uk/company/11648710</a>.</li>
</ul>
Then, in the <strong>next and final phase</strong>, what remains is to:
<ul>
  <li>Appoint 3+ more Guardians (see above).</li>
  <li>Finalise<a href="https://github.com/matrix-org/matrix-doc/issues/1318"> MSC1318</a> and incorporate the appropriate bits into the Articles of Associations (AoA).  (We might literally edit MSC1318 directly into the final AoA, to incorporate as much input as possible from the full community)</li>
  <li>Tune the boilerplate bits of the AoA to incorporate the conclusions of<a href="https://github.com/matrix-org/matrix-doc/issues/1318"> MSC1318</a>.</li>
  <li>Register the Foundation as a <a href="https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies">Community Interest Company</a>, to further anchor the Foundation as being for the benefit of the wider community.</li>
  <li>Perform an Asset Transfer of any and all Matrix.org property from New Vector to the Foundation (especially the Matrix.org domain and branding, and donations directed to Matrix.org).</li>
</ul>
So there you have it! It's been a long time in coming, and huge thanks to everyone for their patience and support in getting to this point, but finally The Matrix.org Foundation exists.  Watch this space over the coming weeks as we announce the Guardians and finish bootstrapping the Foundation into its final long-term form!  Meanwhile, any questions: come ask in <a href="https://matrix.to/#/#matrix-spec-process:matrix.org">#matrix-spec-process:matrix.org</a> or in the blog comments here.

thanks,

Matthew, Amandine, and the forthcoming Guardians of [the] Matrix!
