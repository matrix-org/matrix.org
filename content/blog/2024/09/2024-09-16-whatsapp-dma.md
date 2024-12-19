+++
title = "Update on Native Matrix interoperability with WhatsApp"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Foundation", "DMA"]
+++


Hi all,

Back at [FOSDEM](https://fosdem.org/2024/schedule/event/fosdem-2024-3345-opening-up-communication-silos-with-matrix-2-0-and-the-eu-digital-markets-act/) in February we showed off how Matrix could be used for E2EE-preserving messaging interoperability as required by the [Digital Markets Act messaging interoperability](https://element.io/blog/the-eu-digital-markets-act-is-here/) - and we announced that Element had been working with Meta on integrating with its DMA APIs in order to connect WhatsApp to Matrix. You can [see the video here](https://youtu.be/s5BrVVf0B1I?t=1488), and we also demoed interop working at the technical level to the European Commission a few days beforehand.

Subsequently WhatsApp [launched](https://engineering.fb.com/2024/03/06/security/whatsapp-messenger-messaging-interoperability-eu/) its [DMA portal](https://developers.facebook.com/m/messaging-interoperability/) on March 8th, and the proposed Reference Offer (i.e. the terms you have to accept as a Requesting Party in order to interoperate) was revealed. The Reference Offer for Facebook Messenger was launched on September 6th.  At the time of the WhatsApp launch we flagged up some significant unresolved questions - the main points being that:

1. WhatsApp would require their users to manually enable DMA in settings before they can receive any traffic from interconnecting service providers (e.g. Element) - meaning that WhatsApp users would not be reachable by default.

2. WhatsApp would require the client IP of any interconnecting users, in order to apply ‘platform integrity’ anti-abuse / trust & safety controls.

3. WhatsApp would not allow an interconnecting service to buffer messages serverside.

4. WhatsApp would require each Matrix server provider to sign a separate agreement in order to interconnect - i.e. you can’t bridge other server’s users unless those servers have signed a contract with Meta.

<!-- more -->

Now, the good news is that we’ve subsequently been talking with WhatsApp to see if we could progress these points - and we’re happy to say that they’ve listened to us and we’ve made progress on the first 3 items:

1. Meta recently [shared an update](https://about.fb.com/news/2024/09/an-update-on-how-were-building-safe-and-secure-third-party-chats-for-users-in-europe/) on the messaging interoperability user experience and will allow all EU users to be reachable by interoperable services by default. It’ll also give people the option of how they want to manage their inbox as well as a range of features like read receipts, typing indicators and reactions.

2. We’ve come up with a plan with WhatsApp to reduce the amount of matrix user data we share with WhatsApp. WhatsApp’s interop solution however, doesn’t yet support multi-device conversations or shared conversation history like normal Matrix, which means that normal Matrix server-side synchronised history won’t work for these conversations.

3. In terms of not allowing open federation: this looks unlikely to change, given Meta needs to know who is responsible for the servers who connect to them, and ensure they agree to the terms of use as required by DMA.

During discussions, another point came up which we’d previously overlooked: section 7.5.1 of the current reference offer states: _“<span style="text-decoration:underline;">Partner User Location.</span> Any Partner Users that Partner Enlists or provides access to the Interoperable Messaging Services must be located and remain in the EEA”_.   In other words, interop would only be available to Matrix users physically in the EEA, which is obviously against the Matrix Foundation’s [manifesto](https://matrix.org/about) to provide secure communication to _everyone_.  Moreover, to demonstrate compliance the Matrix side would have to geolocate the client’s IP.

It turns out that this limitation to EU users ended up being the biggest obstacle for productising the native Matrix&lt;>WhatsApp bridge, as it is unclear whether it’s financially viable for anyone (e.g. Element) to launch such a bridge if it only works for Matrix users physically within the EEA (not to mention the costs and privacy issues of geolocating Matrix users).

Now, on one hand, deploying Matrix as a mature standards-based protocol for WhatsApp interop with native E2EE feels like a worthy goal: indeed, it effectively gives DMA interoperators a stable standardised API with pre-existing SDKs to implement against, rather than having to implement against proprietary and potentially shifting vendor APIs. So overall it moves the needle towards the end goal of Matrix’ mission.

On the other hand, this all may be moot if the return on investment of building DMA interop with WhatsApp via Matrix is too far away for any company in the Matrix ecosystem to be able to afford the investment, and if there isn’t an appetite for anyone to fund it. [Funding constraints](https://matrix.org/blog/2023/12/25/the-matrix-holiday-update-2023/#in-other-news) on both the Foundation and the ecosystem today are such that this work will only happen if explicitly sponsored by an organisation who is willing to commit to fund it.

**So:** **if you are an organisation with users in the EU who would like them to interoperate with EU WhatsApp users via Matrix, and have the funds to sponsor development of building out an official production-grade Matrix&lt;->WhatsApp bridge, [please get in touch with me](https://matrix.to/#/@matthew:matrix.org).**

**Alternatively, if the geographic constraints are a showstopper for you, please let us know.**

We’re assuming that there may be smaller messaging providers, or domain-specific messaging services who want to connect their end-users through to WA end-users, and may be happy to be constrained to EU geography.  However, bridge developers need evidence and financial support to progress this. Meanwhile, if you are interested in the strategic importance of the Digital Markets Act, this is an opportunity to put your money where your mouth is.

Looking forward to hearing feedback!

thanks,

Matthew
