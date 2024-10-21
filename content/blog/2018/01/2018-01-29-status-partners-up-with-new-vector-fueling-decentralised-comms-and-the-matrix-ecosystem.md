+++
title = "Status partners up with New Vector, fueling decentralised comms and the Matrix ecosystem!"
path = "/blog/2018/01/29/status-partners-up-with-new-vector-fueling-decentralised-comms-and-the-matrix-ecosystem"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

We're delighted to announce that our friends at <a href="https://status.im">Status</a> have made a major strategic investment ($5M) in New Vector: the company which currently employs most of the Matrix.org core team.  This means that we now have the financial backing to let us focus entirely on improving the Matrix ecosystem and getting the protocol out of beta… and beyond!!

<a href="https://status.im"><img class="size-medium wp-image-2941" style="position: relative; right: 25px;" src="/blog/wp-content/uploads/2018/01/LOGO_status_v5_1020x290-300x85.png" alt="" width="300" height="85" /></a><a href="https://matrix.org"><img class="size-medium wp-image-2944" style="position: relative; left: 25px; top: 7px;" src="/blog/wp-content/uploads/2018/01/matrix-logo-1-300x128.png" alt="" width="225" height="96" /></a>

First up - massive, massive thanks to everyone who has supported us over the last 6 months since our <a href="/blog/2017/07/07/a-call-to-arms-supporting-matrix/">funding situation changed</a>: as of the end of 2017 we had enough Patreon / Liberapay / IBAN / BTC / ETH donations and sponsorship (for Matrix.org) and enough paid consulting work (for New Vector) that we've been able to keep almost the whole core team working on Matrix as their day job.  Simply: the core Matrix team could not have continued in its current form without the support of the community - so we will be forever indebted to everyone who has supported us: especially all our donating supporters on Patreon/Liberapay/etc, our customers at New Vector, and our big $ sponsors, including <a href="https://www.upcloud.com/">UpCloud.com</a> (who provide *incredible* hosting for Matrix.org), <a href="https://www.privateinternetaccess.com/">PrivateInternetAccess.com</a>, <a href="http://inblockchain.com/">INBlockchain.com</a>, <a href="http://omg.omise.co">OmiseGO</a> and <a href="https://tendermint.com">Tendermint</a>.

The investment from <a href="https://status.im">Status</a> that we're announcing today is a massive step change as it gives us the resources to grow the team and to focus fully on Matrix's key problem areas without distractions (whilst still supporting paid New Vector work). Please note that donations are still <b>very</b> appreciated however: we are in the process of setting up the Matrix.org Foundation (at last!) as the non-profit target for all future donations, such that Matrix itself has a financial means to support pure Matrix work independently of any other companies (including New Vector).

Many folks will be familiar with Status already as one of the leading projects in the <a href="https://ethereum.org/">Ethereum</a> ecosystem: building a beautiful usability-focused browser for decentralised apps (DApps) which run on the Ethereum Virtual Machine - as well as providing cryptocurrency payments and chat functionality (via the <a href="https://github.com/ethereum/wiki/wiki/Whisper">Whisper</a> protocol).  It effectively lets users access Ethereum as a usable meaningful operating system - a bit like how Riot attempts to be a flagship ‘browser' for the Matrix ecosystem.  The reason Status is investing in Matrix is primarily to accelerate decentralisation technology and open protocols in general - and also because there are some pretty obvious advantages to the collaboration, potentially including:

* Bridging between Matrix and Whisper (Ethereum's own real-time communication protocol) - exposing all of the Matrix ecosystem into Ethereum and vice versa
* Bundling up Status DApps as Matrix Widgets
* Exposing Matrix Widgets into Status
* Supporting Olm/Megolm such that it could be used for E2E encryption in Status
* Collaboration on the decentralised reputation systems needed to combat abuse in both Matrix & Ethereum
* Utilize the <a href="https://status.im/whitepaper.pdf">Status Network token</a> within Riot.im by enabling crypto assets.
* ...and more!

We've spent a lot of time working with Status over the last few months whilst arranging this partnership, and we've been really impressed by Jarrad and Carl and the team (they even have their own golang <a href="https://github.com/status-im/doubleratchet">Double Ratchet Implementation</a>!).  It's fair to say that Status are very much aligned with Matrix's vision, and the projects and can help each other a lot.

It's also worth noting that Status and Matrix are really quite complementary: Whisper (as used by Status) is entirely p2p and focuses on protecting metadata and is tightly coupled to Ethereum, whereas Matrix is standalone and more feature rich but currently lacks metadata protection.  We both have fledgling app ecosystems; Matrix through Widgets and Status through Ethereum DApps. That said, Matrix and Status are going to continue on their own paths, and Matrix will of course remain controlled by Matrix.org - but we are looking forward to learning more about each other's tech and driving decentralisation forward in general!

Meanwhile, on the core Matrix side, the investment lets us focus immediately on the following priorities:

* <b>Improving Riot's usability. As of today we are urgently hiring for a Lead Designer to join the team fulltime to revamp and address Riot's usability issues, as this is one of the single biggest things getting in the way of Matrix uptake today.  Hit up <a href="mailto:jobs@riot.im">jobs@riot.im</a> if you're interested!</b>
* <b>At the same time, we're excited to ramp up our investment in Riot's performance and overall polish (as well as achieving feature parity with Slack/Discord and friends) - that means we're looking for React, Android & iOS folks to join the core team full-time asap to take the apps to the next level.  Again, <a href="mailto:jobs@riot.im">jobs@riot.im</a> if this sounds like you!</b>

<ul>
  <li><b>Getting End-to-end Encryption out of beta.</b> We know what we need to do to push E2E out of beta (incremental key backup; cross-signing devices; improved device verification) - Status' investment means we can build the team to get it done! Decentralised end-to-end encryption is not for the faint-hearted, but if you're up for the challenge please get in touch at <a href="mailto:jobs@matrix.org">jobs@matrix.org</a>.

</li>
</ul>
<ul>
  <li><b>Finishing Dendrite.</b> Dendrite (our next-gen golang homeserver implementation) is a hugely ambitious project and right now the only folks working on it are Rich and Erik… who also happen to be supporting Synapse too.  The good news is that the community has been helping considerably with Dendrite, but it would be even better if we had more people supported to work on it full time.  If you love Go, and you love massively scalable decentralised systems, please hit up <a href="mailto:jobs@matrix.org">jobs@matrix.org</a>!
</li>
</ul>
<ul>
  <li><b>Supporting Synapse.</b>There is massive scope for performance improvements to Synapse, and there are thousands of deployments out there today, so we really want to improve support for Synapse.  If you love Python and Twisted, and interesting performance/profiling and efficiency work, please hit up <a href="mailto:jobs@matrix.org">jobs@matrix.org</a> too!

</li>
</ul>
<ul>
  <li><b>Maintaining the Spec.</b> If Matrix is anything it is the spec, and maintenance of the spec is key to the project's success. In 2018 we intend to invest heavily in its maintenance and address outstanding API proposals, documenting APIs, not to mention updating the general technical documentation (guides, FAQ etc) on Matrix.org in general.  If you are a developer who loves spec work, we need you over at <a href="mailto:jobs@matrix.org">jobs@matrix.org</a> immediately! :)
</li>
</ul>
Beyond these immediate priorities, we have a long feature roadmap lined up too (highest priority first): Reactions, Message Editing, improved Widgets (e.g. Sticker Packs), Threading, Decentralised Accounts, Decentralised Identity, Decentralised Reputation, Peer-to-peer Matrix and more.  However, right now our focus has to be on improving the quality and stability of what we have today and getting it out of beta before we open yet more battlefronts.  In other words: we're not adding more features (modulo emergencies) until the current features are polished!

So: exciting times ahead!  Never before has Matrix had the resources to fully realise its potential, and we'd like to say enormous thanks to Carl, Jarrad, Yessin and Nabil at Status for their patience and support while sorting out the investment.  We'd also like to say thanks to everyone else who offered us investment: in the end we had several viable offers on the table - and we owe sincere thanks to those who invested the time and faith to make an offer which we've ended up turning down.

For now, however, it's back to work: making Riot slicker than Slack; making Synapse go faster and use less RAM; making Dendrite federate; making E2E encryption transparent and indestructible; making sure that it's possible to implement Matrix purely by referring to the Spec.

2018 is going to be an interesting year indeed :)  Thank you all for supporting Matrix - and thanks, once again, to Status for helping to take us to the next level.

Matthew, Amandine & the whole team.

<b>Update 1: VentureBeat is covering the news over at <a href="https://venturebeat.com/2018/01/29/status-invests-5-million-in-matrix-to-create-a-blockchain-messaging-superpower/">https://venturebeat.com/2018/01/29/status-invests-5-million-in-matrix-to-create-a-blockchain-messaging-superpower/</a></b>

<b>Update 2: IBTimes is also covering it at <a href="http://www.ibtimes.co.uk/matrix-status-ico-gains-support-non-blockchain-decentralisation-technology-1656183">http://www.ibtimes.co.uk/matrix-status-ico-gains-support-non-blockchain-decentralisation-technology-1656183</a>!</b>

<b>...and you can see Status's side of the story over at <a href="https://blog.status.im/status-invests-5m-in-riot-im-4e3026a8bd50">https://blog.status.im/status-invests-5m-in-riot-im-4e3026a8bd50</a>!</b>
