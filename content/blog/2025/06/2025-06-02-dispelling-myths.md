+++
date = "2025-06-20"
title = "Dispelling myths and misinformation"

[taxonomies]
author = ["Robin Riley"]
category = ["General"]
+++

We’ve seen several articles published in the last week that are, at best, misinformed, and at worst, attempts to protect a single communication company’s bottom line by attacking Matrix.

We thought we should take the time to set the record straight, lest anyone be taken by this naked attempt to sow fear, uncertainty, and doubt (FUD).

But before we do, let’s be clear: this is not the first time a single vendor open source project – which may be under an open source license but is unilaterally controlled by a single for-profit company – has resorted to desperate measures to attack their community-driven competitors, and it won’t be the last time.

Matrix is not just an open standard for secure communication, it’s an openly governed and collaboratively developed ecosystem of projects powered by a growing community of volunteers and vendors. In this way, Matrix exemplifies the open source ethos, encourages greater innovation, and defies those who would try to build businesses based on extractive behavior and vendor lock-in.


## Governance & legal allegations


### Neutral and independent stewardship

The claim has been made that Matrix is effectively controlled by one company. It’s a bold claim, especially when it comes from a for-profit that exerts unilateral control over their eponymous open source project – and it’s patently false.

Open source is one of those terms that has become overloaded with meaning. Something can be accurately described as “open source” when it’s placed under a license that’s been approved by the Open Source Initiative. However, colloquial use of “open source” tends to imply that something is open source licensed, has an open collaboration model, is guided through open governance, and housed within a neutral nonprofit entity.

Matrix is open source in the fullest sense of the word.

The Matrix protocol is open source, and it evolves through the [Matrix Spec Change process](https://spec.matrix.org/proposals/). Anyone can submit a proposal, and anyone can help vet those proposals. The [Spec Core Team](https://matrix.org/foundation/about/#the-spec-core-team), a volunteer body made up of people with a range of expertise and several different employers, facilitates this process, merges in successful proposals, and manages new releases of the specification.

And the Spec Core Team is just one of the multi-member volunteer bodies that govern Matrix under the auspices of an explicitly not-for-profit legal entity. The other body is the [Governing Board](https://matrix.org/foundation/governing-board/), the most recent evolution in our open governance.

The Governing Board is an elected body of representatives from multiple constituencies: those who build projects with Matrix, those who use Matrix, and those who fund Matrix.

The Governing Board provides input to the Spec Core Team, has a role in approving budgets, major expenses, and any new revenue sources the Matrix.org Foundation may seek to pursue. It also has leeway to venture into all manner of subject matter, and it does so through its committees and working groups, which span Trust & Safety, Governance, Events, Finance, and more.

Speaking of the Matrix.org Foundation, it’s a not-for-profit corporate entity that is legally bound to the community benefit described in its mission statement. It holds community assets, such as software projects that are foundational to the ecosystem and the Matrix trademark, so that participants and downstream users can be confident those will not be withdrawn or leveraged against them for the benefit of a single company. It is also required to submit [annual reports](https://find-and-update.company-information.service.gov.uk/company/11648710/filing-history) with an overview of its financial accounts and activities.

Further, the Foundation has a dedicated staff that I, Robin Riley, currently lead as an [independent Managing Director](https://matrix.org/foundation/about/#the-staff-of-the-foundation), and I have a track record of fighting moneyed interests to protect the open source commons – and, critically, I have no financial stake in any Matrix vendor.

I have not only done the work of operationalizing open governance, I have also been hard at work behind the scenes separating out the Foundation’s infrastructure – which was previously completely subsidized by Element – and fundraising so that it is increasingly independent and self-sustaining.

Some may point to Element’s relicensing of Synapse as proof positive that the Foundation is not independent, but there’s nothing stopping anyone from doing the same with permissively licensed software from other open source foundations – something that happens frequently – and no one is claiming those foundations are not independent.

Some may point to the Foundation’s move to monetize the matrix.org homeserver, which is indeed operated under contract by Element, as evidence that the Foundation is in trouble. But seen in the cool light of the day and in context of the facts, this is simply a move to help close a budget gap that has been openly discussed for several years. It may also contribute to de-centering the homeserver and give rise to more community operated alternatives. We’d rather try to defray the cost of operating the homeserver than let it impact our ability to continue facilitating ever more open governance and collaboration.

It is true to say that Matrix has further to go in its open governance journey and on the path to full independence and sustainability. 

However, if one surveys the landscape of open source foundations, it becomes clear that these are journeys that are measured not just in years, but in decades. And whereas some projects get further enclosed and less democratic over time, there’s a fact pattern here that shows Matrix is getting ever more open, independent, and collaborative.


### Legal allegations

It has been suggested that because the Matrix.org Foundation is incorporated in the UK, Matrix is incompatible with EU Data Protection laws, like the GDPR, and subject to the Investigatory Powers Act (IPA) in the UK.

Well, the GDPR is a regulation governing the use of personal data which predates Brexit and is fully incorpoorated and implemented in UK law as part of the Data Protection Act 2018. Whilst it recommends things like Privacy by Design and other requirements which influence software development, it does not directly govern it. Any code written in the UK and hosted (or used by people) in the EU will have to be compliant with EU legislation – this is the beauty of an open standard which supports digital sovereignty. 

Second, jurisdictional exposure related to cases like Schrems II is associated with data transfers to third-countries. The UK is not a third-country, it currently has an adequacy decision which has just been extended. Yes, there is a risk that this adequacy decision might be revoked and we even agree with some of the concerns raised in the linked article about some of the recent decisions in the UK – again, we have been incredibly vocal about most of the concerns raised and continue to work on these topics, including the risk of TCNs. 

And finally, the Investigatory Powers Act (IPA) is a piece of legislation in the UK focused on governing investigatory powers and law enforcement which has been in place since 1998. The UK government can apply IPA globally to individuals based in the UK, as per [the Technical Capability Notice (TCN) it has served Apple](https://www.bbc.com/news/articles/c20g288yldko), so whether you are using Matrix (governed by a UK-based Foundation) or not is irrelevant.

In the end, of all the technologies, Matrix is one of those that are the best positioned to give the users their digital sovereignty and data protection, thanks to its open source and decentralised nature.


## Technical allegations


### On the relevance of Matrix’s open federation for private deployments

With the open Matrix network including 180 million addressable users and hosting a wide variety of players, not all with good intentions, [we are facing a clear challenge of ensuring this open network is kept safe for our users](https://matrix.org/blog/2025/02/building-a-safer-matrix/), and it is a primary focus for the Foundation. 

On the other hand, Matrix is also widely used by governments and public sector organisations, which have all deployed their own private federations, potentially connecting them to one another via appropriate Secure Border Gateways (SBG) and enforcing strict access control, in order to maintain the security of their deployments and to prevent access from unauthorised users. Several organisations develop SBGs, some being commercial and proprietary (like Element’s) and other freely available open-source (like DINUM’s). Gematik also specifies a TI-proxy (SBG) for TI-Messenger, although it doesn't develop an implementation. SBGs are policy controllers rather than privacy enforcers. 

All these deployments are integrated to appropriate single-sign one setups and the public Matrix.org homeserver also mandates either email or a social log-in to validate the account. 

It is also worth noting that the fact the federation is open or closed is orthogonal to whether the deployment is scalable or not. The scalability is determined by the server implementation which is used, and there is no limit to how many servers can federate with one another. Meanwhile the French government’s Tchap Matrix installation is a private federation of around 350K active users. Bundeswehr’s Matrix-based BwMessenger private federation supports 100K+ users. Gematik’s (Matrix-based) TI-Messenger private federation will support literally millions of German citizens. 

Being a decentralised network, Matrix was designed to be Byzantine Fault Tolerant, resilient to malicious instances by design. In an open federation, malicious actors can spin up rogue homeservers and interact with legitimate ones but they can’t harm the legitimate ones, beyond spam attacks, which (again) is a failure mode with [a lot of focus](https://matrix.org/blog/2025/02/building-a-safer-matrix/) from the Foundation’s Trust and Safety team today. Meanwhile there are also plenty of options around content scanning and anti-virus to protect private federations, whether that’s from various Matrix vendors, FOSS or in-house development. 


### On end-to-end encryption

Matrix is encryption agnostic and today uses Olm, its own implementation of the Signal protocol, with Megolm for group scalability. Whilst Olm is now mature and well-understood  end-to-end encryption (developed and used by Signal, and used by WhatsApp, Facebook Messenger and others) it does have some scalability limitations for very big group chats (tens of thousands of users). Meanwhile, IETF’s MLS standard ([RFC9420](https://datatracker.ietf.org/doc/rfc9420/)) provides better scalability in exchange for some tradeoffs around centralisation - work continues apace on how to best integrate MLS with Matrix (e.g. [MSC4256](https://github.com/matrix-org/matrix-spec-proposals/pull/4256) and [MSC4244](https://github.com/matrix-org/matrix-spec-proposals/pull/4244), and all our existing work at [https://arewemlsyet.com](https://arewemlsyet.com)).

We’ve seen claims that Matrix lacks forward secrecy today, which is plain false: Olm provides perfect forward secrecy by nature of being an implementation of the Signal Protocol - if an attacker captures the current keys they can’t decrypt previous messages.  

Similarly, if an attacker captures the current keys they also can’t decrypt future messages - this provides post-compromise security.  Olm is used to share the “Megolm” keys used to encrypt messages, and similarly, if you capture a Megolm key you cannot decrypt any previous messages.  By default a given Megolm key is used to generate keys for up to 100 consecutive messages, but this is configurable, and is reset whenever the group membership changes or after a week. Nothing stops an admin from rotating on every message if they like: https://spec.matrix.org/v1.14/client-server-api/#mroomencryption

Practically speaking almost all Matrix clients keep all the Megolm keys (to read back history), because users of a chat application (especially in a collaboration context) expect history to be accessible. Though there is nothing inherent in Matrix that would prevent throwing the keys away on ratchet. 


### On metadata availability

Matrix currently exposes the metadata of who’s talking in which rooms to the admins of the servers whose users are in a given conversation. It is **transport encrypted** and random (non-participating) network observers most certainly cannot access it nor “easily” track users across conversations.

We are in the process of minimising metadata by default (e.g. [MSC4014](https://github.com/matrix-org/matrix-spec-proposals/pull/4014) exists and was implemented in Dendrite) but it’s worth noting that sometimes metadata is a requirement: in practice a lot of professional Matrix users (i.e. large government installations) often actually want to know who’s talking to who on their servers for compliance and access control reasons. Meanwhile other approaches are in flight right now, e.g. BWI’s [MSC4256](https://github.com/matrix-org/matrix-spec-proposals/pull/4256).

It is worth noting that other collaboration apps who claim to be more secure than Matrix are hitting the same problem of having to be compliant when selling to the public sector. For example, [Wire's privacy whitepaper](https://wire-docs.wire.com/download/Wire+Privacy+Whitepaper.pdf) directly states their servers have access to the group participant lists and leaks the conversation’s name to the server. Besides the [MLS RFC](https://www.rfc-editor.org/rfc/rfc9420.html#name-confidentiality-of-group-me) (RFC9420, section 16.4, used by Wire) clearly states MLS itself does not intrinsically provide confidentiality to a large subset of messages and that a party observing these (i.e. the delivery service = Wire's backend servers) can infer group membership. 


## Why?

All in all, it sounds like the German public sector appearing to be [converging on Matrix](https://www.heise.de/en/news/Matrix-replacing-MJP-ZBP-Co-Will-state-mailbox-chaos-belong-to-the-past-10449857.html) as an open standard for secure communications has triggered some defensive reaction with other European players in the market. It is a shame that small European players feel the need to fight one another rather than collaborate via open source software against the bigger non-European and proprietary players.
