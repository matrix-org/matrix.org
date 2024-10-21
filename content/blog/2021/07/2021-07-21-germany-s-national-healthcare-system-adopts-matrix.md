+++
title = "Germany’s national healthcare system adopts Matrix!"
date = "2021-07-21T15:30:48Z"
path = "/blog/2021/07/21/germany-s-national-healthcare-system-adopts-matrix"
aliases = ["/blog/2021/07/21/germanys-national-healthcare-system-adopts-matrix"]

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General", "News"]

[extra]
image = "https://matrix.org/blog/img/2021-07-21-gematik.jpg"
+++

Hi folks,

We’re incredibly excited to officially announce that the national agency for
the digitalisation of the healthcare system in Germany ([gematik](http://gematik.de))
has selected Matrix as the open standard on which to base all its
interoperable instant messaging standard - the TI-Messenger.

gematik has released a [concept paper](https://fachportal.gematik.de/anwendungen/ti-messenger)
that explains the initiative in full.

## TL;DR

With the TI-Messenger, gematik is creating a nationwide decentralised private
communication network - based on Matrix - to support potentially more than
**150,000** healthcare organisations within Germany’s national healthcare system.
It will provide end-to-end encrypted VoIP/Video and messaging for the whole
healthcare system, as well as the ability to share healthcare based data,
images and files.

Initially every healthcare provider (HCP) with an HBA (HPC ID card) will be
able to choose their own TI-Messenger provider. The homesever for HCP
accounts will be hosted by the provider’s datacentre. The homeserver for
institutions can be hosted by TI-Messenger providers, or on-premise.

Each organisation and individual will therefore retain complete ownership and
control of their communication data - while being able to share it securely
within the healthcare system with end-to-end encryption by default. All
servers in the Matrix-based private federation will be hosted within
Germany.

Needless to say, security is key when underpinning the entire nation’s
healthcare infrastructure and safeguarding sensitive patient data. As such,
the entire implementation will be [accredited by BSI](https://www.bsi.bund.de/EN/Home/home_node.html)
(Federal Office for Information Security) and [BfDI](https://www.bfdi.bund.de/DE/Home/home_node.html)
(Federal Commissioner for Data Protection and Freedom of Information).

## The full context

Germany’s digital care modernisation law (“Digitale Versorgung und Pflege
Modernisierungs Gesetz” or DVPMG), which came into force in June 2021, spells
out  the need for an instant messaging solution.

The urgency has increased by a significant rise in the use of instant
messaging and video conferencing within the healthcare system - for instance,
the amount of medical practices using messenger services doubled in 2020
compared to 2018 (much of this using insecure messaging solutions).

[gematik](https://www.gematik.de/), majority-owned by Germany’s
[Federal Ministry of Health](https://www.bundesgesundheitsministerium.de/english-version.html),
is responsible for the standardised digital transformation of Germany’s
healthcare sector. It focuses on improving efficiency and introducing new
ways of working by setting, testing and certifying healthcare technology
including electronic health cards, electronic patient records and
e-prescriptions.

[TI-Messenger](https://www.gematik.de/anwendungen/ti-messenger/) is gematik’s
technical specification for an interoperable secure instant messaging
standard. The healthcare industry will be able to build a wide range of apps
based on TI-Messenger specifications knowing that, being built on Matrix, all
those apps will interoperate.

More than 150,000 organisations - ranging from local doctors to clinics,
hospitals, and insurance companies - can potentially standardise on instant
messaging thanks to gematik’s TI-Messenger initiative.

## The road to interoperability

By 1 October 2021, TI-Messenger will initially specify how communication
should work in practice between healthcare professionals (HCPs). Physicians
will be able to find and communicate with each other via TI-Messenger
approved apps - specifications include secure authentication mechanisms with
electronic health professional cards (eHBAs), electronic institution cards
(SMC-B) and a central [FHIR](https://hl7.org/FHIR/) directory. The first
compliant apps for HCPs are expected to be licensed by Q2 2022.

Eric Grey (product manager for TI-Messenger at gematik), reckons there will
initially be around 10-15 TI-Messenger compliant Matrix-based apps for HCP
communications available from different vendors.

Healthcare professionals will be able to choose a TI-Messenger provider, who
will be hosting their personal accounts and provide the messenger-client.

Healthcare organisations will choose a TI-Messenger provider to build the
dedicated homeserver infrastructure (on prem or in a data center), provide
the client and ongoing support.

## What does this mean for the Matrix community?

Matrix is already integral to huge parts of the public sector; from the French
government’s Tchap platform, to Bundeswehr’s use of BwMessenger and adoption
by universities and schools across Europe.

Germany’s healthcare system standardising on Matrix takes this to entirely the
next level - and we can’t wait to see the rest of Europe (and the world!)
converge on Matrix for healthcare!

We'll have more info about TI-Messenger on this week's Matrix Live, out on
Friday - stay tuned!
