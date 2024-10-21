+++
date = "2024-04-04T16:30:00Z"
title = "Open Source Infrastructure must be a publicly funded service."

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Foundation"]
+++


Hi folks,

The events of the last week have been utterly terrifying as we’ve seen a highly sophisticated targeted attack on open source infrastructure play out in public, in the form of the [liblzma backdoor](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/). Matrix is not impacted by the attack (none of our code or infrastructure is using liblzma or xz 5.6), but it has been a massive wakeup call in terms of understanding the risks posed by overstretched open source maintainership.

<!-- more -->

The attack particularly resonates as Matrix’s maintainership is distinctly overstretched currently - despite Matrix ending up at the heart of huge amounts of critical infrastructure, ranging from the [Ukrainian MOD](https://en.wikipedia.org/wiki/Delta_(situational_awareness_system)) to [NATO](https://innovationhub-act.org/case-studies/ni2ce-messenger/) and at least 15 other countries and major international organisations that we know of.

Historically, Matrix development has been largely been funded by Element, the company set up by the team who created Matrix in order to fund their work on it. As unpopular as VC funding is in some circles, the Matrix community owes a _huge_ debt of thanks to Element’s investors (Status, Notion, firstminute, Dawn, Automattic, Protocol Labs and Metaplanet) and Amdocs for funding over $50M of work on both Matrix and Element since 2017.  Having a large professional team paid as their day job to maintain Matrix has helped enormously against xz-style attacks.

However, this model is simply not sustainable: these days, Element is focused on being able to pay its own costs rather than being dependent on further VC investment. This leaves a massive hole in funding for Matrix, and we’ve [already seen the impact of this](/blog/2023/12/25/the-matrix-holiday-update-2023/#in-other-news) with projects like Dendrite, Low Bandwidth Matrix, Account Portability, P2P Matrix and Third Room no longer able to be funded by Element (for now).  Meanwhile, the remaining core team is stretched.

This feels particularly unfortunate given the number of governments and public sector organisations who rely on Matrix, but in practice it turns out that finding a way for them to fund open source maintenance can be surprisingly challenging - despite the potential impact of Matrix not being able to invest in security (or cryptography, or trust & safety, or performance improvements) being catastrophic, especially as Matrix becomes more and more of a high value target for large scale adversaries.

There seems to be two types of problems: firstly, those who don’t understand why it might be beneficial for a government to pay for open source at all.  A particularly amazing real-life example of this came from a certain Ministry of Defence last week, whose procurement department (on being asked to help fund core Matrix development, given their operational dependency on Matrix) said: “You have to understand, we’re responsible for taxpayer money here. We can’t just make a donation to your open source project.” Apparently if we had built the same tech as a proprietary product, paying for it would apparently have been an infinitely better use of taxpayer money.  Now, thankfully, organisations like [FSFE](https://fsfe.org/) and [EDRi](https://edri.org/) and [OSBA](https://osb-alliance.de/) have made major strides in educating governments to understand that funnelling taxpayer money into proprietary software licences does not benefit the public in the way that using open source software does - but old views die hard.

Then, perversely, the second problem emerges: FSFE’s well-intentioned “[Public Money, Public Code](https://publiccode.eu/)” campaign is often given to us as a reason to insist on funding features rather than maintenance.  This seems to be because procurement departments want to have something concrete to procure as a one-off, rather than making an ongoing commitment to keep the project secure, existing and healthy - and so focus on funding new features (or hiring their own staff to build their features) and ignore maintenance.  If you ever wondered why Element has so many weird and wonderful features (which are not always maintained as well as they might), this is part of the problem.  The problem is captured beautifully in [Tobie Langel’s excellent (and highly topical) talk](https://www.youtube.com/watch?v=oB-v2_YnrHk) from this year’s State of Open Con:

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/20240404-slide.png)

However: we think there might (just might!) be a long-term solution in sight.

Particularly in the wake of the xz/liblzma attack, it seems that governments may be more aware that they and their societies depend enormously on FOSS infrastructure to operate.  Free and open source software has literally become shared digital public infrastructure.  **And much like shared physical public infrastructure - bridges, roads, sea defences, etc - FOSS maintenance should be funded by governments on behalf of the taxpayer.**

This funding should **NOT** be tied to specific feature development, but simply funding the core maintenance of the infrastructure - paying for the maintainers (and/or letting them or their umbrella org hire trusted ones!) to ensure the core project remains healthy and secure.  Otherwise, the pressure just rises on the core project to chase feature development at the expense of maintenance (making maintenance harder) - or, worse, to be pushed away from open source into building proprietary solutions or crippling the open source by moving valuable features into side proprietary products.

Now, the good news is that some organisations are already trying to solve this problem:

* [NLnet](https://nlnet.nl/) & [NGI](https://www.ngi.eu/about) are excellent in directing EU funding to smaller FOSS projects (e.g. funding [loads of Matrix community projects](https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fnlnet.nl%2Fproject+matrix)),
* Similarly the [Prototype Fund](https://prototypefund.de/) is very helpful for smaller projects (e.g. funding bits of [Conduit](https://prototypefund.de/project/conduit/), [ThreeMatrix](https://prototypefund.de/project/threematrix-eine-bruecke-zwischen-threema-und-dem-matrix-protokoll/) and [alertrix](https://prototypefund.de/project/alertrix/))
* [OpenSSF](https://openssf.org/about/charter/) is a Linux Foundation project focused on helping solve the problem
* [Sovereign Tech Fund](https://www.sovereigntechfund.de/) similarly supports smaller projects to act as a digital public good
* [Copie Publique](https://copiepublique.fr/) takes a different approach to encourage private companies to contribute back directly to FOSS projects
* [European Digital Infrastructure Consortium (EDIC)](https://digital-strategy.ec.europa.eu/en/policies/edic) is a new strategy from the EU to enable multi-country funding of digital infrastructure projects (but so far seems to be aiming at funding governments themselves, rather than underlying FOSS projects).

However, most of these are not yet operating at the scale of a project like Matrix, and the irony is that the bigger projects need even more financial support than smaller projects to keep alive and sustainable.  High level funding does exist in the form of the EU’s [Horizon](https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en) programme for R&D and Innovation (which provides the upstream for NLnet and NGI), with a total budget of €95.5B. However, it’s currently set up to only fund consortiums rather than independent projects - and the last thing a typical open source project needs is to orchestrate and administer an international consortium of vendors and universities in order to get itself funded.

The perfect solution in the EU would probably be a NLnet-style organisation with the remit to route funds in the range of low-millions a year to larger projects like Matrix which have become widespread critical infrastructure - to allow them to thrive in their mission without trying to coerce typical public sector procurement into picking up the bill. Or maybe a tax should be instantiated to force large scale open source projects users to route recurring funding to the project maintainers. So, **Governments: please route taxpayer money to support the maintenance (not just features!) of open source projects that your country depends upon, before it’s too late.** This also means educating procurement to the topic and updating procurement frameworks to be able to support this.

Meanwhile, we are in the middle of running a [fundraising drive](/blog/2024/01/2024-roadmap-and-fundraiser/) to help address the funding gap, which is currently making cautiously positive progress towards its £900K target, having raised £415K since last year, entirely thanks to [Individual, Silver and Gold members joining](/support/). Our new membership model is working - giving the wider Matrix community a way to join the Foundation in order to participate in the upcoming Governing Board, and help steer the direction of the project, while contributing funding! So while we hope that governments will read this blog post and point out ways to sustainably fund more of the maintenance they depend on - today, you can help too by persuading your organisation (or yourself!) to  **[become a member today](/membership/)** and help keep Matrix funded and pointed in the right direction.

thanks,

Matthew
