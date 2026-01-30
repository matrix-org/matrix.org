+++
date = "2025-06-13T14:00:00Z"
title = "Introducing premium accounts to fund the matrix.org homeserver"

[taxonomies]
author = ["Amandine Le Pape"]
category = ["matrix.org homeserver", "Foundation", "General"]
+++

## TL;DR

As we need to take more concrete steps to improve the financial situation of the Foundation, we will be rolling out a freemium offer for the matrix.org homeserver users. The alternative is to turn off the server, which we want to avoid doing. The goal is for the most active users to support the cost of the service. Free users will have limits on how they can use the service (mostly around media). The change can be supported by any client with limited to no development. Premium plans will be rolled out over the summer, and we will be iterating on the exact scope in the first few weeks. The Homeserver Terms and Privacy Policy will be updated accordingly and deployed in the coming weeks.

<!-- more -->

## The full story

We have been communicating on the lack of funds in the Foundation for a while now, the latest being [here](/blog/2025/02/crossroads/). And whilst we’ve been working hard to gather new members and are happy to see the [number of logos increasing](/support/#supporters) (thank you all for seeing the need for Matrix to stay independent and safe, and the value in supporting it!), none of the big players in the ecosystem have actually committed to one of the higher membership tiers, so we need to find other ways towards sustainability.

The [Foundation’s mission](/foundation/about/#mission) can basically be summarised by 4 main goals:

1. Ensure the specification of the protocol stays canonical and unencumbered, to avoid fragmentation and being overridden by a single player.
2. Ensure that all players in the ecosystem are at a level playing field, helping them succeed by giving them visibility and listening to their needs.
3. Promote the Matrix standard, as the value of Matrix is directly proportional to the size of the public network and how much it is used and commercialised.
4. Ensure the public network is safe by building moderation tools that can be used by the server admins, for the sake of our users and making sure the network is attractive.

In practice, it means that we are currently spending money on:

- A small team of developers and moderators, to develop Trust & Safety tooling, moderate the matrix.org server, and redirect people who do not understand the decentralised nature of Matrix reporting abuse to us towards the appropriate server admins.
- The infrastructure of the matrix.org homeserver, including the SRE team, who are on call to keep it running, and the support team.
- Organise and sponsor events to promote and evangelise the protocol.
- A tiny team to run the Foundation itself, including the support of external contractors for the administrative side (finance, legal, tax). The staff works on governance (organising the governing board elections, running the meetings, liaising between the different teams), raises money and brings members in, manages social media and liaises with the community, keeps the website up and up to date, publishes TWIMs and blogs, organises the events, etc. This team whose day job is to keep the Foundation running is also supported by a lot of volunteer (and sometimes sponsored by employer) time from the Governing Board and its Working Groups, the Spec Core team, the Guardians, and other external staff.

We haven’t gotten to the point of publishing the public financial report (although it should be almost finalised now), because we are frantically trying to focus on closing the financial gap, but here is an overview of the split of expenditures in the last year:

![A pie chart showing the Foundation's expenses: 30% Trust & Safety, 20% Server Infrastructure, 14.2% Management, 12.5% Events, 20% Other staff, 2.5% Other expenses](/blog/img/foundation-expenses-graph.png)


As you can see, 20% of the Foundation’s expenditure goes towards hosting the matrix.org free and public homeserver. If we add in the cost of the moderation work done by the Trust and Safety team, the total share of the costs attributable to the matrix.org homeserver account for almost 50% of all expenditure. Meanwhile, today, only 50% of the spending of the Foundation is covered by its revenues (donations and memberships), and we are working hard towards reducing this gap.

We’ve kept the matrix.org homeserver around so far, despite its costs, as we consider it essential to seed the network in support of the nurturing part of the Foundation’s mission: despite Matrix being decentralised by design, users need a trusted place to create a free Matrix account to try it out in the first place.

However, we can’t continue to bear the cost of the server as is, and before we get to the extreme position of being forced to turn it off leaving its 370k monthly active users in the awkward position of finding a new home for their account, we’ve decided to try to alleviate some of these costs by setting-up a freemium offering and proposing premium plans in addition to the free ones. The goal is to get the server to an at least financially break-even position. If, by any chance, it was ending up profitable, the profit would directly be invested in [Trust and Safety](/blog/2025/02/building-a-safer-matrix/), or other new programmes which can support the ecosystem. As a reminder, the Foundation is a Community Interest Company, i.e. a limited company which operates to provide a benefit to the community it serves rather than private profit.


### What will the freemium offer look like?

The idea is to set some limits for users on the free plans, which would be lifted for users on the premium plans in exchange for an affordable membership. 

**We are still iterating (and will do for a while) on how it looks,** but users can expect limits around media sizes and/or volumes. The goal is to ensure that the most active users participate in covering the costs of the service, in return for the access to a fully encrypted and decentralised open network.

We are limited in scope and design by the fact we need to ship a minimum viable product as soon as possible (we need to reduce costs now) and by not wanting to impose too much development (if any) to Matrix client developers.

Obviously we would have preferred to keep everything free of charge. We will never sell our users’ data or cripple our services with ads, so we need to find ethical sources of revenue. 

### When will the new plans take effect?

The roll-out will happen progressively, starting in the coming weeks and hopefully completing in the summer of 2025. We will start by opening up premium plans to new users only, before progressively migrating all existing accounts to a free plan which will give them the option to upgrade to a premium plan. Users will of course be notified ahead of their account being migrated.

### Will this work with whatever Matrix client I use? 

Yes. The plan management will be handled via the [My Account](https://account.matrix.org/account/) screens provided by the Matrix Authentication Service (MAS), and notifications to users will be sent in a dedicated room using the [Server Notices](https://spec.matrix.org/v1.14/client-server-api/#server-notices) feature built into the Matrix protocol – already used by the homeserver to send automatic messages to the user – so should be seamless for every client. 

### I am a Matrix client developer, do I need to do anything?

There are two considerations from a Matrix client point of view:

- support for the [Server Notices](https://spec.matrix.org/v1.14/client-server-api/#server-notices) feature
- if the client is distributed via the Apple App Store, then support for [MSC4286](https://github.com/matrix-org/matrix-spec-proposals/pull/4286)

If the client doesn't show server notices at all then, whilst the client will remain usable with the matrix.org homeserver, your users will have a degraded UX as they won't receive notifications when encountering usage limits.

Apple places [restrictions](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase) on how payments are implemented by iOS (et al) apps that are distributed via the App Store.

We expect that most, if not all, apps that fall within scope would be classified as what Apple calls “[Free Stand-alone Apps](https://developer.apple.com/app-store/review/guidelines/#free-stand-alone-apps)”. Such apps do not need to use in-app purchases so long as “there is no purchasing inside the app, or calls to action for purchase outside of the app”.

In order to meet these requirements we have proposed [MSC4286](https://github.com/matrix-org/matrix-spec-proposals/pull/4286) which provides a way for a homeserver (such as the matrix.org homeserver) to flag parts of messages as containing a call to action and for affected clients to be able to hide that content. Example implementations are linked in the MSC.

### I am already supporting the Foundation by paying an individual membership, will I have to pay for a premium plan too?

No, [individual members](/membership) of the Foundation will get access to the premium features at no extra cost. This benefit will be implemented as part of the process of migrating existing accounts to the free plan. 

### What else will be changing?

In order to support these changes we will be releasing updates to the Homeserver Terms and the Privacy Policy in the coming weeks. Users of the matrix.org homeserver will be notified and will need to accept the new terms. The scope of change will be clearly highlighted in the release note, but essentially you can expect new terms around payment and additional information on the types of information we will collect about your account, as well as the processors we will use to enable payments.

We realise this is quite a big change, but our position is that a slightly limited service is better than no service at all, so we chose to ask for financial contribution rather than turn off the server. Paying a subscription for the matrix.org homeserver is basically a way to support Matrix, ensuring the Foundation can continue to play its role of neutral custodian, enabler and safeguardian of the protocol and the network. We will be publishing more details and a proper FAQ as the roll-out happens, so watch this space for more details.
