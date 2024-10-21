+++
title = "Digital Markets Act and interoperability: Debunking the gatekeepers' myths"
path = "/blog/2022/02/03/digital-markets-act-and-interoperability-myth-debunking-of-the-gatekeepers-arguments"

[taxonomies]
author = ["Amandine Le Pape"]
category = ["General"]
+++

Today the European Parliament, the European Council and the European Commission will meet again for a discussion about the Digital Markets Act (DMA). This is the second of three of these meetings, appropriately called trilogues, where each party exposes their stance on a proposed law and the group tries to agree on the final version.

[The DMA](https://ec.europa.eu/info/strategy/priorities-2019-2024/europe-fit-digital-age/digital-markets-act-ensuring-fair-and-open-digital-markets_en) is a groundbreaking step forward in shaking the hold a few gatekeepers have on users and the market, in particular because it looks to (among others):

* Require gatekeepers to allow other services to interoperate with their services
* Prevent them to treat their own services and products more favourably (for example by ranking)
* Require them to allow users to uninstall any pre-installed software or app

The interoperability obligation is obviously the one on which we’ve kept a particularly close eye, as if it lands well it could take the success of Matrix to the next level completely overnight.

However, whilst in our mind interoperability automatically implies “open standard”, there are actually different ways of implementing it, depending on how far one wants to go. Typical debates here have been between whether to force gatekeepers to maintain open and well documented APIs, or whether to go full swing and mandate an open standard, and every shade in between.

We’ve been lucky to have had the opportunity to talk to policy advisors from different European member states, and it has been pretty fascinating to realise that it was always the same arguments which were being presented back at us, straight from the gatekeepers partyline.

We’ve ended up just listing them in a quick, high level, Myth Debunking exercise and thought it would be useful to actually publish them for everyone to access, so here they are!

* **MYTH #1 -** "It is impossible to have a standard that is open, decentralized and secure at the same time"  
⇒ **false**: HTTPS did it, Matrix did it.
* **MYTH #2 -** "It is difficult and expensive to make existing services compatible with a standard"  
⇒ **false**: [Gitter was integrated into Matrix in less than a month](https://matrix.org/blog/2020/12/07/gitter-now-speaks-matrix#how-do-you-make-an-existing-chat-system-talk-matrix), with a single developer
* **MYTH #3 -** "Interoperability is incompatible with end-to-end encryption"  
⇒ **false**: services just have to speak the same language, email has proved this with S/MIME and PGP - where different vendors can and do interoperate with E2EE. It’s even better when the protocol is E2EE by default.
* **MYTH #4 -** "It may work for messaging, but less so for social networks"  
⇒ **false**: it's still about managing content and users. Even though social networks have more varied content, it is already well modelled for their own APIs, ready to be expressed in a common language. The key is in the fallback option on unsupported features, as well as the ability to have moderation tools (more on that later).
* **MYTH #5 -** “Interoperability is not compatible with data privacy”  
⇒ **false**: Interoperability gives the ability to users to choose who is hosting their data and as such choose providers they trust. Besides, the DMA doesn’t live in a vacuum: it will exist alongside horizontal regulations like the GDPR and the Data Act, which give people sufficient control over their data to rectify their choices if they are not happy. Because the possibility of interoperability is there, it does not mean it will become mandatory for users to use it: they will still have their own threat models and will make decisions accordingly, just as they do today. But enshrining interoperability in law will at least ensure gatekeepers need to provide recourse for people to have further control over their data, which will be an improvement from the landscape today.
* **MYTH #6 -** "There is no user need"  
⇒ **false**: most haven't had a taste of interoperable chat/social media (but they know email), others are demanding bridges between services: [25% users of 2 communication apps lose contact with friends because they are using too many apps](https://www.dailymail.co.uk/sciencetech/article-10451559/One-four-people-struggle-friends-using-apps.html). And this figure doubles for people using more than 5 apps. There was no demand for cars when they were created: people only wanted faster horses.
* **MYTH #7 -** "There is no demand from European companies"  
⇒ **false**: The fact it is so hard for European companies to remain competitive enough to stay alive means there are few of them to complain about what is killing them! However these companies are gathering to push for interoperability (like the [Coalition for Competitive Digital Markets](https://competitivedigitalmarkets.eu/)). It will enable them to be more innovative in the product they develop by benefiting from an existing open network rather than being slowed down by having to build one from scratch. Companies will compete on the value they add rather than the size of their network. An open standard also gives an open field for innovation from a business model perspective. The Web is an excellent example of how much an open network fuels innovation and growth.
* **MYTH #8 -** "It is better to require providers to have open and stable APIs than define a single open standard"  
⇒ **false**: this is the best way to leave gatekeepers at the center of the ecosystem as it means that each player has to multiply its effort to interface with every single other player, but every player will only have the resources to interface with a few of its counterparts and will logically default to the bigger ones, effectively not solving the problem. In addition, if providers are not aligned on which encryption to use it will just break end-to-end encryption and create risk for the user in every bridge. In practice the DMA is about forcing the gatekeepers to interoperate only, but we strongly believe that *everyone* should be interoperating if we are about improving the user’s experience and control, and giving more space to companies to innovate. Limiting it to the gatekeepers is a first step, but only a defensive one.
* **MYTH #9 -** “An open standard limits innovation if it defines a lowest common denominator”  
⇒ **false**: the lowest common denominator should match what users consider as table stakes in a messaging or social media app. Providers can innovate on top by providing different features which go beyond table stakes, for example by targeting niche use cases, like messaging services focused on elderly and disabled users, or focused on healthcare, warehouse workers, or integrated in a CRM for call centers, or creatives…  Providers also can implement a profile of the standard which is a subset of its full scope, ensuring the standard remains a highest common denominator..
* **MYTH #10 -** “It will be impossible to moderate social networks built on an open standard”  
⇒ **false**: decentralised networks actually have driven the adoption of much more sophisticated moderation techniques than the coarse approaches of centralised silos. Appropriate moderation means have to be part of the open standard definition, and some are already used in Matrix. It would also empower victims who today have no choice but get in touch with providers one by one. Each provider will also have control over their own users, and users can select providers whose T&Cs are aligned with their ethics. The world is not black and white, unlike what Silicon Valley tries to make us believe.
* **MYTH #11 -** “It will take years before being able to define an open standard”  
⇒ **you don’t have to**: You could leverage existing technologies which are being used by the industry. Matrix, XMPP and ActivityPub exist today. For instance, Matrix has been managed by its own standard body (The Matrix Foundation) and could be ratified by a more established one like IETF, ETSI or W3C if needed.

Obviously the devil will be in the details of the way the final text is formulated, as well as the limits, obligations and controls put in place, but overall it should be an improvement for all European users and companies and we’re looking forward to seeing how today’s trilogue goes!
