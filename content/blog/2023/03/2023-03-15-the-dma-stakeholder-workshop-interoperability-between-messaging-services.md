+++
title = "The DMA Stakeholder Workshop: Interoperability between messaging services"
path = "/blog/2023/03/15/the-dma-stakeholder-workshop-interoperability-between-messaging-services"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/2022-03-29-chat-bubbles.jpg"
+++

A few weeks ago we found ourselves in Brussels to participate in the second [stakeholder workshop for the Digital Markets Act (DMA)](https://competition-policy.ec.europa.eu/dma/dma-workshops_en).

The [DMA](https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/digital-markets-act-ensuring-fair-and-open-digital-markets_en) is new antitrust/competition regulation from Europe which came into force in November, whose objective is to make digital markets more competitive by forcing gatekeepers (i.e. large tech companies) to reconsider some of their anti-competitive or self-preferencing practices. Gatekeepers are defined as companies which have a clear position of influence in a given market (based on revenue / market cap / number of users thresholds), and “an entrenched and durable position”. The process for designating which companies count as gatekeepers will start in May 2023.

The DMA touches upon different key topics, from self-preferencing behaviour to app store management practices - but most importantly includes interoperability for “number-independent interpersonal communication services” (NIICS), otherwise known as chat and voice/video calling and conferencing services (social media was left out for now).

[This particular workshop](https://competition-policy.ec.europa.eu/dma/dma-workshops/interoperability-workshop_en) was focused on the latter: interoperability between messaging services, with the aim of getting the different stakeholders of the industry in the same place to discuss how the legislation could be implemented.  The whole idea is to figure out a practical way in which WhatsApp could interoperate with iMessage, Google Messages and others, creating an interoperable communication network where users are no longer locked into communication silos and pick their preferred service provider without compromising on who they can talk to. \

About 900 people participated online, and around 80 people were present in person: the maximum the room could hold. It was particularly fun to see representatives from the whole industry turning up in person, including folks from XMPP, MIMI (the new IETF working group on messaging interoperability), MLS, us from Matrix obviously (alongside Matrix ecosystem representatives from Beeper and NeoChat!) - all together with the Body of European Regulators for Electronic Communications ([BEREC](https://www.berec.europa.eu/en/berec/what-is-berec)), civil society representatives (like the Federation of German Consumer Organisations ([VZBV](https://VZBV.de)) and European Digital Rights ([EDRi](https://edri.org))), mobile network operators, local network agencies, and obviously some of those who are likely to be designated as gatekeepers, such as Meta, Apple and Google.

<!-- more -->

## So what was discussed?

All of the workshop proceeds were livestreamed and archived by European Commission’s [webcasting service](https://webcast.ec.europa.eu/dma-workshop-2023-02-27) and [released](https://commission.europa.eu/legal-notice_en#copyright-notice) under the terms of the Creative Commons Attribution 4.0 International (CC BY 4.0) licence, so we’ve taken the liberty of republishing them split up into chapters so that folks can quickly refer to the discussion.

### Panel 1: Introduction to horizontal interoperability between messaging services: goals, challenges and potential solutions

The first panel focused on setting up the scene and highlighting the challenges expected during the implementation phase, featuring [Simonetta Vezzoso](https://www.soi.unitn.it/staff/simonetta-vezzoso/) (Professor of Economics at The University of Trento), [Chiara Caccinelli](https://www.linkedin.com/in/chiaracaccinelli) (Co-chair - Digital Markets WG at [BEREC](https://www.berec.europa.eu/)), [Suzanne Blohm](https://www.vzbv.de/en/policy-work/experts) (Policy officer at [Verbraucherzentrale Bundesverbands (VZBV)](https://www.vzbv.de/)) and [Jan Penfrat](https://www.linkedin.com/in/jan-penfrat) (Senior Policy Advisor at [EDRi](https://edri.org/)). There was a lot of emphasis around the risks of gatekeepers dragging their feet, or choosing the solution which makes it harder for SMEs or self-hosters to interoperate, as well as the challenge of introducing the new paradigm of interoperability for messaging without losing the usability aspect - see below for the full scope:

{{ youtube_player(video_id="yoKjXN3G8a8") }}

<br/>

* [00:00](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=0s) Welcome to the second DMA stakeholder workshop about interoperability between messaging services
* [08:03](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=483s) Introduction of the panelists
* [09:26](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=566s) What is the Article 7 of the Digital Markets Act (Simonetta Vezzoso)
* [26:35](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=1595s) Interoperability already exists in the EU, what can we learn from it (Chiara Caccinelli)
* [40:43](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=2443s) End user perspective and behaviour, benefits of the DMA Article 7, Challenges (Suzanne Blohm)
* [49:30](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=2970s) Benefits for end users, and an existing technical stack to build from (Jan Penfrat)
* [59:21](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=3561s) What the UI could look like (Jan Penfrat)
* [01:03:07](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=3787s) Question - Do users need an account on each network, or is it a true federation? (XMPP Foundation)
* [01:05:19](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=3919s) Question - What rule do you see for Telcos and for messaging services they provide?
* [01:10:07](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=4207s) Question - Does the term "user" include people running their own server/service? (Open Source Initiative)
* [01:14:50](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=4490s) Question - How to check the gatekeeper is not giving a suboptimal solution? (online question)
* [01:18:04](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=4684s) Question - Does user consent limit the power of Article 7? (Viber)
* [01:22:36](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=4956s) Question - Gatekeepers don't have an incentive to make appealing UIs for interoperability and might try to scare users away. Will it be addressed? (NLNet)
* [01:24:08](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5048s) Question - People usually dislike popups, how to strike the balance between warning and upsetting them? (online)
* [01:27:51](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5271s) Question - Have you been thinking about reputation models?
* [01:29:53](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5393s) Question - Different apps use different E2EE protocols to differentiate. Could article 7 kill that differentiation? (online)
* [01:38:48](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5928s) Question - What will be the paradigm of non discrimination?
* [01:33:10](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5590s) Question - What about interoperability of RCS and Apple iMessage? (Orange)
* [01:34:44](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5684s) Question - Do you take into account that there are not only company-run services, but also Open Source components? (Process One)
* [01:35:55](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5755s) Question - What are the implications for non European users? (Beeper)
* [01:39:25](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=5965s) Question - Does the DMA only mandate interoperability for European users, even on a same platform? (XMPP)
* [01:40:36](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6036s) Question - Will the interoperability be opt-in or opt-out? (Matrix)
* [01:41:50](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6110s) Question - How avoid the standardisation to be taken over by commercial interests? (online)
* [01:43:43](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6223s) Question - What will the timing look like for the DMA? (Cisco)
* [01:48:13](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6493s) Question - What could be reasonable requirements for smaller services? (online)
* [01:49:00](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6540s) Question - Where should gatekeeper gather to start discussion how interoperability will look like in practice? (OpenXchange)
* [01:51:11](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6671s) Question - What about account portability, for users switching from one platform to another? (University of Rome)
* [01:54:53](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6893s) Question - Is contact information part of the data gatekeepers need to share? (XMPP)
* [01:56:12](https://www.youtube.com/watch?v=yoKjXN3G8a8&t=6972s) Closing

### Panel 2: Exploring the technical aspects of interoperability (Part 1): end-to-end encryption, security of the service

Then, after a quick lunch, the second panel went into the nitty gritty of how end-to-end encrypted interoperable messaging (1:1 messaging is the first milestone to be delivered, hence the focus) could actually be implemented by the gatekeepers. The panel starred [Paul Rösler](https://www.roeslpa.de/) from [FAU Erlangen-Nürnberg](https://fau.de/), who gave a great overview of end-to-end encryption in general, [Alissa Cooper](https://alissacooper.com/) from Cisco who explained the merits of open interoperable protocols, [Eric Rescorla](https://educatedguesswork.org/about/) from Mozilla explaining the merits of standardisation, yours truly from Matrix explaining and demonstrating how one can actually use a standardised open protocol to interoperate without sacrificing privacy (effectively fleshing out our [blog](https://matrix.org/blog/2022/03/29/how-do-you-implement-interoperability-in-a-dma-world) [posts](https://matrix.org/blog/2022/03/25/interoperability-without-sacrificing-privacy-matrix-and-the-dma) from last year) and then finally [Stephen Hurley](https://www.linkedin.com/in/stephen-hurley-24424231) from Meta to explain how they are thinking about DMA obligations.

The panel ended up being a relatively exciting tour through the landscape of DMA practicalities, and it was a lot of fun to actually [demonstrate a minimum viable prototype of client-side bridging](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3715s) thanks to Travis’s work packaging up standalone client-side bridges for [WhatsApp](https://github.com/matrix-org/dma-demo-app-bridge-whatsapp) and [Google Chat](https://github.com/matrix-org/dma-demo-app-bridge-googlechat) (strictly for demonstration illustrative purposes only). The slides (and demo) were sadly a bit fuzzy on the recording, but you can see our slides below and grab everyone’s presentations from the [European Commission website](https://competition-policy.ec.europa.eu/document/download/c59e04bc-f96c-49d9-b161-ad9c24d82367_en?filename=20230227_dma_stakeholders_workshop_panelists_material_0.zip):

<iframe width="1280" height="720" src="/blog/img/matrix-dma-slides.pdf"></iframe>

<br/>

When DMA first became headline news last year, there was a lot of [very vocal concern](https://www.theverge.com/2022/3/28/23000148/eu-dma-damage-whatsapp-encryption-privacy) that it would somehow end up undermining end-to-end encryption (despite the legislation explicitly requiring that E2EE must be preserved when interoperating). Hopefully this session demonstrated that both the European Commission and the various panellists are dead serious about achieving interoperability without sacrificing privacy - whether that’s via the brute-force approach of client-side bridges, or the more sophisticated approach of client-side bridges which bridge to client-side APIs, or by incrementally or entirely adopting a true open standard protocol like Matrix, XMPP, or whatever MIMI comes up with.

You can see the whole panel split into the various sections below:

{{ youtube_player(video_id="FDnUJXzVn3s") }}

<br/>

* [00:00](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=0s) Opening
* [01:23](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=83s) Introduction of the panellists
* **Interoperable Messaging - Paul Rösler (FAU)**
* [03:10](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=190s) Interoperable end-to-end (E2EE) encryption options (Paul Rösler)
* [05:24](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=324s) Requirements for interoperable E2EE (Paul Rösler)
* [09:22](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=562s) Options for interoperable E2EE (Paul Rösler)
* [13:54](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=834s) Confidentiality, Privacy & Abuse prevention (Paul Rösler)
* [19:07](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1147s) Group Messaging (Paul Rösler)
* **DMA Stakeholder Workshop: Interoperability - Eric Rescorla (Mozilla)**
* [22:44](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1364s) Learning from QUIC (Mozilla)
* [24:14](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1454s) E2EE and interoperability (Mozilla)
* [25:50](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1550s) Key Establishment in a E2EE interoperable system (Mozilla)
* [27:16](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1636s) Message and media formats in a E2EE interoperable system (Mozilla)
* [28:30](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1710s) Identity in a E2EE interoperable system (Mozilla)
* [30:49](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1849s) Multiple gatekeeper scenarios (Mozilla)
* [31:41](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1901s) Suggested framework for interoperability (Mozilla)
* **DMA Stakeholder Workshop: Interoperability - Alissa Cooper (Cisco)**
* [35:20](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=2120s) Discussing how the UX of a DMA compliant product can look like (Cisco)
* [36:38](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=2198s) The use case for enterprise interoperability (Cisco)
* [30:47](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=1847s) Approaches to DMA Compliance (Cisco)
* [43:57](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=2637s) Limits of the per-gatekeeper, in-house solution approach (Cisco)
* [48:19](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=2899s) Strengths of the consolidated (standardised) solution (Cisco)
* [50:00](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3000s) Implications & requirements of the consolidated solution (Cisco)
* **Implementing Interoperability for the DMA - Matthew Hodgson (Matrix)**
* [52:03](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3123s) Implementing Interoperability in practice for the DMA (Matrix)
* [53:00](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3180s) A practical path to full interoperability (Matrix)
* [54:35](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3275s) Defining the problem we're solving (Matrix)
* [55:15](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3315s) Approach 1 Client-side bridging using server-side APIs (Matrix)
* [57:21](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3441s) Approach 2 Client-side bridging using client-side APIs (Matrix)
* [58:48](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3528s) Approach 3 Polyglot app, using a 3rd party protocol à la iMessage (Matrix)
* [01:00:06](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3606s) Approach 4 Using an open protocol (Matrix)
* [01:00:42](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3642s) Pros & Cons of each approach (Matrix)
* [01:01:55](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=3715s) DEMO of client-side bridging (Matrix)
* **Meta's view on the DMA as seen from WhatsApp - Stephen Hurley (Meta)**
* [01:06:45](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=4005s) Meta's view on the DMA as seen from WhatsApp (Meta)
* **Questions**
* [01:17:12](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=4632s) Matthew (Matrix) remind that not only the demo showed client-side bridging was possible, but iMessage has been doing it for years via SMS & iMessage
* [01:17:54](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=4674s) Meta has two IM platforms (Instagram and Facebook) that are not E2EE. What is Meta going to do about those platforms? (Beeper)
* [01:18:45](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=4725s) How to balance discoverability and privacy?
* [01:21:04](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=4864s) How to solve the problem of different E2EE protocols? (online)
* [01:24:48](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=5088s) Do some of the panellists think the best option is not a single standardised protocol? (OpenXchange)
* [01:33:46](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=5626s) Which measures by gatekeepers to preserve security integrity and privacy can be considered proportionate?
* [01:36:38](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=5798s) How many people have worked on the client-side demo?
* [01:38:56](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=5936s) Does it really matter that MLS is not "done"?
* [01:47:30](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=6450s) How will article 7 ensure private keys will never transit over the network? (online)
* [01:53:00](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=6780s) What about interoperability of features like custom emojis, removing messages, etc? (online)
* [01:57:42](https://www.youtube.com/watch?v=FDnUJXzVn3s&t=7062s) What does the rest of the panel thinks about the guarantees they can provide when a message leaves a system? (XMPP)

### Panel 3: Exploring the technical aspects of interoperability (II): data collection, identification of users, quality of interoperable services, system management, integrity of the service/prevention of misuse

Finally, we launched into the third and final session of the day - a second technical panel to dig into questions of identity, usability, data privacy, consent and anti-abuse in a DMA world.  Relative to the second panel, there were more questions than answers here, as the panellists discussed whether users would need to consent or opt-in/opt-out of interoperability, and debated the various data privacy implications of DMA.  The panel starred Stephen Hurley from Meta again, [Lucas Verney](https://www.linkedin.com/in/lucas-verney) from [PEReN](https://www.peren.gouv.fr), Markus Klein from [Bundesnetzagentur](https://www.bundesnetzagentur.de/) and [Rohan Mahy](https://rohan.com/) from [Wire](https://wire.com) introducing the [MIMI working group](https://datatracker.ietf.org/group/mimi) at IETF.

{{ youtube_player(video_id="ZtRmAaHUxWw") }}

<br/>

* [00:00](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=0s) Opening and panellists introduction
* **Meta / WhatsApp**
* [02:21](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=141s) User Safety on WhatsApp
* [06:51](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=411s) Consenting to interoperability
* [07:56](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=476s) Objective criteria to assess whether a request is reasonable or not
* **PEReN**
* [09:00](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=540s) PEReN is a French government digital expertise hub
* [10:12](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=612s) Efficient design for effective interoperability
* [11:25](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=685s) Reconciliation identity between services
* [13:40](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=820s) Discoverability between platforms of different scales
* [16:27](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=987s) Should fancy features (e.g. emoji reactions) be interoperable?
* [17:22](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1042s) Quality of Service
* [19:02](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1142s) Security goes beyond E2EE
* **Bundesnetzagentur**
* [20:26](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1226s) Bundesnetzagentur views on the DMA
* **Wire**
* [26:39](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1599s) Federation and Interoperability issues are similar
* [28:10](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1690s) Standards-based interoperability and the MIMI working group
* [29:18](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1758s) Identifiers, devices, handles
* [30:50](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1850s) User introduction & discovery
* [31:30](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=1890s) Messaging content
* [34:06](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=2046s) Why MIMI picked MLS for E2EE?
* [35:54](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=2154s) Server to server transport mechanism
* [36:38](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=2198s) E2EE Cryptographic identity
* [39:00](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=2340s) MIMI's standardisation work provides a strong foundation for other features
* [40:25](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=2425s) Why is standardized interoperability beneficial?
* **Questions**
* [44:30](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=2670s) What about terms of service, minimum usage age enforcement etc?
* [48:03](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=2883s) How can identity be maintained separately from networks? How will differing policies of services be respected?
* [52:26](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=3146s) Does WhatsApp rely on the phone number as a primary identifier?
* [53:29](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=3209s) Some systems like Telegram have pseudonymous IDs. How would that work with platforms relying on e.g. phone numbers?
* [55:42](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=3342s) Should the service name be part of the identifier?
* [57:33](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=3453s) Can the DMA improve how authentication is handled?
* [59:51](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=3591s) What made the GDPR successful is the potential fines. What about the DMA?
* [01:03:48](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=3828s) How can interoperability be designed to stop leaking contact lists?
* [01:09:15](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=4155s) Are we doing cookie banners again?
* [01:15:57](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=4557s) Should we think about some integration with eIDAS for more trustworthy identities?
* [01:19:48](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=4788s) Are all the protocols like Matrix or MIMI free to use, or do they have a fee?
* [01:22:32](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=4952s) Are there really concerns about the DMA and security?
* [01:27:40](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=5260s) Does Meta expect to provide a EU-only and a global version of their messengers?
* [01:29:55](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=5395s) The views expressed here regarding consent are concerning when it comes to self-hosting
* [01:36:20](https://www.youtube.com/watch?v=ZtRmAaHUxWw&t=5780s) Closing

## Conclusion

This was a fascinating opportunity to have a front-row seat at history being made, as the various key players finally got down to business on the practical implications of DMA interoperability.

We saw the full spectrum of options on the table, from Meta’s implications that they would simply open their existing API complete with the existing Double Ratchet Encryption, to the pragmatic approach of Matrix (“at first we’ll bridge, and then the players should gradually converge on an open standard”) to the more idealistic approach of MIMI (“everyone should natively adopt an entirely new open standard built on MLS”).  The next step is to establish a reference implementation and approach, and in the end it seems likely that the approach that works will be the one which the gatekeepers can actually practically adopt within the punchy timeframes built into the legislation:

![DMA timeline](/blog/img/dma.jpg)

You can also check out [Carl Schwan’s writeup](https://carlschwan.eu/2023/03/02/digital-market-act-workshop-in-brussels/) (from NeoChat), as well as Eric Rescorla’s braindump on [DMA interoperability](https://educatedguesswork.org/posts/dma-interop/) that accompanies his talk.

We live in interesting times, and it’s fascinating to see Matrix’s vision of interoperable communication being cemented into regulation by the EU.  Our view is that as long as the gatekeepers open their APIs and add support to model remote users in their systems, then at least the wider world can implement client-side bridges to crack the door of the gatekeepers open - and then as gatekeepers refresh their stacks and new players emerge, they’ll likely implement the common protocol (if it’s fit for purpose) rather than burn time reinventing the wheel on proprietary solutions.  Meanwhile, the DMA provides welcome encouragement to ensure that open protocols like Matrix can rise to the challenge and fill the gap - whether that’s [independently](https://spec.matrix.org) or as [part of IETF’s MIMI](https://datatracker.ietf.org/doc/draft-ralston-mimi-matrix-framework/) initiative. May the best solution win!
