+++
title = "The Librem 5 from Purism: A Matrix Native Smartphone."
path = "/blog/2017/08/24/the-librem-5-from-purism-a-matrix-native-smartphone"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi folks,

This is a big news week in Matrixland: hot on the heels of releasing <a href="/blog/2017/08/23/introducing-matrix-widgets/">Matrix Widgets and Riot 0.12</a>, we have another massive announcement to make!

We've been approached by <a href="https://puri.sm">Purism</a> to partner up to provide the communications subsystem for their upcoming Librem 5 smartphone - for which they are <a href="https://puri.sm/shop/librem-5/">launching a crowdfunding campaign</a> starting today! The whole idea of the phone is to provide unprecedented privacy, security and autonomy by running an entirely FOSS Debian-based GNU/Linux stack (even including CPU & GPU drivers!), and we are incredibly proud and overexcited that the folks at <strong>Purism have asked the Matrix core team to provide the native dialler and messaging app for the phone</strong>.  Yes, this means that the phone will literally boot by default into Matrix for all its primary communications (although, being FOSS, you could of course use a different dialler if you wanted).  The intention is to be a very usable and flexible phone for folks who value freedom, privacy and simplicity over the (relative) quagmire of iOS or Android - and of course jumping way ahead of where Apple or Google are in terms of integrating next-generation communications into the very heart of the device.

<a href="https://puri.sm/shop/librem-5/"><img class="aligncenter size-full wp-image-2756" src="/blog/wp-content/uploads/2017/08/purism5.png" alt="" width="1100" height="720" /></a>

This is unbelievably exciting, as Matrix's vision from the outset has been to provide an open, decentralised and encrypted alternative to the Public Telephone Network - and the idea of devices emerging which are native to Matrix is a dream come true. It also gives us the excuse that we've been looking for to produce a truly excellent lightweight native Matrix client, built to run on both handset and desktop devices, complete with end-to-end encryption.  We're not sure whether this is going to end up being Qt or GTK based yet, but expect to see the Matrix team getting a lot more involved in the current native Matrix client projects (nheko, Quaternion, ruma-gtk, matrix-glib-sdk, qmatrixclient etc) in future!

Depending on the success of the crowdfunding campaign, it may also give us scope to finally build out proper carrier-grade Matrix&lt;-&gt;PSTN bridges: letting Matrix clients terminate and originate VoIP calls on the public phone network.  It's long been an embarrassment that Matrix hasn't had this given that pre-Matrix we spent our lives building commercial SIP gateways and softphones for telcos, and the ability to use Matrix as a proper VoIP softphone on dedicated hardware is incredibly appealing.  Obviously the phone will also support GSM calling, but the intention is to default to WebRTC calling using Matrix whenever the phone has good IP connectivity - making it truly an IP-first smartphone.

Now, this is obviously a very ambitious project, but we believe that Purism is able to deliver based on the work they've done already with crowdfunding and shipping Librem 15 and 13 laptops, shipping with as open a FOSS stack as is possible on contemporary hardware, complete with unique privacy features such as hardware kill-switches for Camera, Wifi, Bluetooth etc.  We met with them at GUADEC 2017 and subsequently heard trusted reports from DebConf 2017 of the quality of the hardware.  It seems that as the company has gathered experience their ambitious goals have become more and more attainable - and it's also interesting that their dev team is significantly made up of core Debian developers (including Chris Lamb, the Debian Project Leader for 2017).  We're particularly excited from a philosophical perspective that the Librem 5 is targeting the NXP (Freescale) i.MX6 or i.MX8 ARM-based processor and Vivante GPU - both of which can be run without any proprietary microcode or proprietary drivers.  From everything we've heard, this is going to be a spectacularly FOSS-friendly device.

So, if you're interested in being first to own the world's first ever Matrix-native phone, or if you want to support the creation of a kick-ass native Matrix desktop/handset client, or perhaps if you want carrier-grade VoIP in Matrix... then please head over to <a href="https://puri.sm">Puri.sm</a> and join the campaign!  Needless to say, if the campaign is successful it will also significantly help Matrix's current funding situation.

Finally, for more context, here's a special mid-week episode of Matrix "Live", featuring Matthew and Todd Weaver, the CEO of Purism, discussing the Librem 5 and what it means for both Purism and Matrix!

<iframe src="https://www.youtube.com/embed/hwFjWDAyG38" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>

As always, feedback on this project is very welcome - come tell us in <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a> what you think!  And thank you, if you choose to support this campaign :)

Matthew, Amandine & the team.
