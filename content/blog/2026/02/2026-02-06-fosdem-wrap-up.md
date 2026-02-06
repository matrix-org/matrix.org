+++
date = "2026-02-06T12:30:00+00:00"
title = "FOSDEM 2026 Wrap Up"

[taxonomies]
author = ["Thib", "Website & Content Working Group", "Events Working Group"]
category = ["FOSDEM", "Events"]

[extra]
image = "https://matrix.org/blog/img/2026-02-06-opengraph.png"
+++

What a year again at FOSDEM! The community met at our Hackathon on Friday and worked on fancy ideas. We talked to thousands of people at our booth, and hosted the Decentralised Communication Devroom on Sunday. But Matrix was truly everywhere at FOSDEM.

<!-- more -->

## Hackathon

We started right before FOSDEM with a Hackathon on Friday, 30th of January. About a hundred people joined us with ideas of projects to hack on, or problems to discuss. After spending the first hour listing the topics or projects people were interested in, we formed groups.

![A picture of people gathered around a whiteboard](/blog/img/2026-02-06-fosdem-decision-making.webp)

We spent the day hacking and talking, took a short pizza break for lunch thanks to Famedly’s sponsorship, and went back to work. At the end of the day people presented the result of what they had been working on. Among others, people worked on:

- [Nexus](https://github.com/Henry-Hiles/nexus), a brand new flutter client from the community  
- An IKEA-style assembly instructions to join a MatrixRTC call  
- Encrypted Search in Element X Android (still in progress)  
- Contributions to the [sticker and emoji MSC](https://github.com/matrix-org/matrix-spec-proposals/pull/2545)  
- A bot that takes images posted in a specific room and prints them on a [receipt printer](https://wiki.chrpaul.de/web_of_things:fosdem_2026)  
- The [Matrix Conference 2026 website](https://2026.matrix.org/) and [Call for Proposals](https://cfp.2026.matrix.org/matrix-conference-2026/cfp) launch  
- But also discussions about [MSC4256](https://github.com/matrix-org/matrix-spec-proposals/pull/4256), the MLS mode for Matrix. 

You can watch [the recording of our live stream](https://www.youtube.com/watch?v=U_YdrcrWw8M) to catch up with all the ideas people had! Some projects succeeded, some projects didn’t, but we’re happy about the outcome: in all cases people *tried* to create something new or to contribute to an existing project. In all cases people have learnt along the way, and that was the main point of the hackathon.

Additionally, an attendee raised an important point. They said: “I came with questions, I expected to meet factions who want to solve the problem differently, but we could talk the problem through and make progress”. This is a real testament to the utility of such events, and we can only encourage more organizations to join the Foundation so we can make even more of these.

After the presentations, we had a chill out evening with dinner sponsored by Element, with Spezi and other drinks still sponsored by Famedly. Everyone had earned their one-time edition Matrix Cap!

![A picture of about a thousand people in a room, looking at the camera and smiling. All of them are wearing Matrix hats.](/blog/img/2026-02-06-fosdem-hackathon-group.webp)

We want to thank [Element](https://element.io) and [Famedly](https://www.famedly.com/) again for sponsoring the event and giving us the opportunity to meet in person, and the local hackerspace [HSBXL](https://hsbxl.be/) for hosting us once again.

## Booth

The next morning, on Saturday, 31st January, [FOSDEM](https://fosdem.org/2026/) itself started. Our booth team was quickly ready to welcome visitors… and we had several *thousands* of them over the weekend!

![A team of people making goofy faces and laughing, behind a Matrix.org Foundation branded booth.](/blog/img/2026-02-06-fosdem-booth-team.webp)

This could be because we gave away more than 100 T-shirts and a handful of caps, or this could be because people wanted to try the famous Swedish liquorice sweets that our community member Magnus brought, like every year!

We also had cool demos on the stand. Dominik and Kim have set up an air-gapped deployment of Matrix to showcase the various clients and administration tools. Christian and Florian used the hackathon time to set up a demo with a receipt ticket printer that would print whatever you send in a specific room, and one with an e-ink screen that would display whatever you send in the same room.

Overall, the discussions with attendees were overwhelmingly positive. Most of them were about how Matrix is useful to people, expressing that our work matters and that the software has come a long way. We're moved by all this gratitude and pleased to see that people believe that the ecosystem is going in a good direction.

![A picture of t-shirts stacked on a booth. There seems to be a lot of activity around the booth.](/blog/img/2026-02-06-fosdem-cyberdeck.webp)

Our gratitude goes to Dominik Rimpf who set up the infrastructure for volunteers to take shifts, and who helped us set up the demo at the booth, but also to Kim for setting up the demo on the laptops we had with us, as well as the rest of the [Events Working Group](https://matrix.org/foundation/working-groups/events/) for helping with the organisation of the event. We also want to thank Element who donated the three laptops we used to the Foundation, so that we can have a “Booth Box” ready to follow us everywhere we go.

Finally, a big shout out to all the volunteers who helped us staffing the booth and answering the attendance's questions: Mikhail, Oleg, kitsune, Bruno, weeman, anoa, Nico, td, Mithgarthsormr, stereo, Dave, Denise, Pierre, Jade, Guillaume, Milton, Tom, Hans, Sergey, QuadRadical, and Kai.

## Devroom

On Sunday, 1st February, we still had our booth, but we also coordinated the [Decentralised Communication devroom](https://fosdem.org/2026/schedule/track/decentralised-communication/) next door. It was a full day devroom between 9am and 5pm. Traditionally Sunday morning is the slowest moment of FOSDEM, but the devroom filled up very quickly. By 10am every seat was taken and we had to start refusing people.

![A picture of a lecture room that is full, while two speakers give a talk.](/blog/img/2026-02-06-fosdem-devroom.webp)

We received representatives from [ROOST](https://fosdem.org/2026/schedule/event/U7ABHE-roost-osprey/), [Draupnir](https://fosdem.org/2026/schedule/event/SHYBQ7-draupnir_a_field_report_on_building_community_focussed_t_s_tooling_within_an_ope/) and [our own Trust & Safety team](https://fosdem.org/2026/schedule/event/JKWGWG-community_moderation_in_matrix/) to discuss how to keep people safe in decentralised environments.

![A portrait of Cassidy and Anne, two speakers giving a talk in front of their slides](/blog/img/2026-02-06-fosdem-roost.webp)

On the Matrix side, we gave our famous [State of the Union](https://fosdem.org/2026/schedule/event/URX89L-matrix-state-of-the-union/). Element explained how [making Element Web more modular](https://fosdem.org/2026/schedule/event/DZJVTS-an-element-web-client-for-the-future/) would help make it snappier. Neil also talked about the problem of [becoming sustainable when you give away software for free](https://fosdem.org/2026/schedule/event/BRRQYU-sustainable-matrix-at-element/). Finally, their VoIP team showed a [fun demo of a Godot game using MatrixRTC](https://fosdem.org/2026/schedule/event/UW9GKA-matrixrtc-godot-battle-royale/) behind the scenes for the multiplayer mode.

![A portrait of Robin, a woman giving a talk in front of their slides. In the background we can read the word "Godot" on her slides.](/blog/img/2026-02-06-fosdem-robin.JPG)

The devroom also welcomed our friends from the XMPP, DASL, ATProto and ActivityPub / Bonfire communities.

## FOSDEM Online

Not only did we have a Hackathon, a booth, and contributions to a devroom: Matrix was also *everywhere* at FOSDEM. Indeed, FOSDEM has an online side. Element hosted the infrastructure and configured and monitored the rooms, widgets, and bots that run the online side of FOSDEM.

In terms of numbers:

- [attendees.fosdem.org](#) has 57,332 users, including 796 new users since last year  
- There were 929 members in the FOSDEM 2026 space.  
- People exchanged ~538 messages/hr at the peak on Saturday at ~10:30  
- People exchanged 17,000 messages total

We’re incredibly proud that the FOSDEM team renewed their trust in us, and that Matrix was a satisfying experience for the largest open source experience in Europe.

## Elsewhere at FOSDEM

Finally, Matrix was also on the lips of many, regularly cited as an example of what to do. For example, in [The Hidden Layer: Bringing Protocol Governance into Digital Policy](https://fosdem.org/2026/schedule/event/NCRJWM-protocol-governance-in-digital-policy/), Matrix was presented as an example of good governance.

![A picture where Tchap appears on slides](/blog/img/2026-02-06-fosdem-tchap.webp)

The Foundation’s legal Data Protection Officer (DPO) monitors the evolution of the legal landscape, and shared her insights in her talk [Digital Omnibus: is the EU's tech simplification a Risk or Opportunity for Open Source?](https://fosdem.org/2026/schedule/event/GM7FZW-digital_omnibus_is_the_eus_tech_simplification_a_risk_or_opportunity_for_open_so/).

![A picture of Denise, a speaker giving a talk, in front of her slides. Her slides mention risks from the upcoming Digital Omnibus regulation.](/blog/img/2026-02-06-fosdem-denise-omnibus.webp)

In the talk [From Policy To Practice; Open Source in The Dutch Government](https://fosdem.org/2026/schedule/event/BNPJ7P-from-policy-to-practice-open-source-in-gov/), the Dutch government explained why they used OpenDesk, which includes Element, and why it makes sense for them to fund their upstreams more.

Both ZenDis and DINUM are using Matrix. They also both sent representatives in the [Open Source & EU Policy Track](https://fosdem.org/2026/schedule/track/open-source-eu-policy/), for example in this panel: [Public Procurement for Digital Sovereignty](https://fosdem.org/2026/schedule/event/WKCBGM-procurement-sovereignty/).

In [Linux on the Desktop – Why Digital Sovereignty Starts Here](https://fosdem.org/2026/schedule/event/EZVWLC-linux_desktop/), the speaker highlights Matrix as the solution of choice for sovereign chat.

![A slide presenting OpenDesk, which contains Element, a Matrix-based solution.](/blog/img/2026-02-06-fosdem-opendesk.webp)

In his talk [In Defense Of GnuPG](https://fosdem.org/2026/schedule/event/WHHWGT-in-defence-of-gnupg/), Özcan Oğuz pointed out that Matrix was the simple solution that *Just Works™* to get secure conversations online.

![A picture in front of their slides saying "Just Use Matrix"](/blog/img/2026-02-06-fosdem-just-use-matrix.webp)

Finally, Matrix community member Jade also gave a talk about the Continuwuity homeserver software in [Signed, Sealed, Stolen: How We Patched Critical Vulnerabilities Under Fire](https://fosdem.org/2026/schedule/event/ETMLM8-signed_sealed_stolen_how_we_patched_critical_vulnerabilities_under_fire/).

## Where to Find Us Next

FOSDEM is an important milestone for the Matrix ecosystem, and we’re proud of how successful it has been for us this year again. But FOSDEM is not the only conference we attend. Our next major milestone is The Matrix Conference 2026, and this year we will meet in Malmö, in Sweden, in October!

We’re thrilled to launch our [Call for Proposals](https://cfp.2026.matrix.org/matrix-conference-2026/cfp) and encourage you to submit yours early on. We want to strike a good balance in talks between organisational and community talks - the Conference is for the whole ecosystem! Attendees should get a good idea of where Matrix is today, but we are always excited to go wild about what Matrix could be in the future.

We’re grateful to the prospective sponsors who have already reached out to us to manifest their interest in supporting the Conference! You are the ones who enable such events. With your help, the Matrix ecosystem can gather, exchange ideas, show prototypes, and converge on solutions that benefit all. If you’re interested in sponsoring too, please reach out to [conference@foundation.matrix.org](mailto:conference@foundation.matrix.org) while we put the final touches on our sponsorship brochure.

In the meantime, our community is organising or attending other events. You can catch up with what they're about on [their website](https://matrix-community.events/).
