+++
date = "2025-06-26"
title = "Demystifying SBGs"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

We’ve noticed a fair bit of confusion (aka misinformation) around Secure Border Gateways (SBGs) recently, which this blog post aims to clarify.

First off, Secure Border Gateways are not defined in the Matrix specification. The term is actually a product name from Element, rather than anything intrinsic to Matrix.

However the concept of a border gateway is well established. In a Matrix world, it means any kind of [**application-layer firewall**](https://en.wikipedia.org/wiki/Application-level_gateway) which intercepts APIs between Matrix components in order to provide defence-in-depth or apply additional policy rules, to bring an extra \- **but optional \-** layer of control within a federation. It is, in short, an optional way to provide more control over federated traffic.

So conceptually it’s the Matrix equivalent to application layer gateways for email. Without them, email works absolutely fine, and always has. However, it’s still a desirable optional extra for some enterprise deployments. For instance, it can help protect both server misconfigurations or buggy servers: literally providing defence-in-depth in traditional ‘castle and keep’ style.

That there is an ecosystem of 3rd party software vendors building additional components such as Secure Border Gateways reflects the strength and maturity of Matrix as an open standard. It’s clear evidence that a genuine open source initiative, based on an open standard, not only ensures digital sovereignty but also **drives competitive innovation**. Meanwhile it’s excellent to see other chat vendors like [Mattermost](https://github.com/mattermost/mattermost-plugin-matrix-bridge) working on first-party Matrix support again (and so in turn will benefit from capabilities like Secure Border Gateways or Cross Domain Gateways).

## Examples of Border Gateways

Let’s take a look at ‘SBGs’ in the wild. Probably the most widespread example right now is in [TI-Messenger](https://www.gematik.de/anwendungen/ti-messenger), Germany’s healthcare messaging system based on Matrix (targeting 150,000 organisations and almost all German citizens, due to go live in mid-July). Here, gematik chose to require SBGs (called “TI-Messenger Proxies” in its parlance) for each deployment in order to integrate Matrix with TI-Messenger’s FHIR-standard and address book system.

As a result, a whole ecosystem of SBG implementations has emerged: starting with the [entirely open source TI-Messenger Proxy reference implementation](https://github.com/tim-ref/messenger-proxy) from gematik \- but also additional implementations from certified TI-Messenger vendors including Akquinet, Awesome Technologies, CompuGroup Medical, Element, Famedly, Gedisa, samedi and Xtension.

As an example, Element’s TI-Messenger Proxy implementation is built on [Element’s generic SBG](https://element.io/server-suite/secure-border-gateways) implementation, which provides a configurable pipeline for functionality like:

* Proxying (terminating and re-originating) Matrix traffic  
* Apply rules based on HTTP headers  
* Apply rules based on room membership  
* Enforcing classification labels  
* Enforce closed federation based on a domain allow list.  
* Enforce usage of specific clients.  
* Enforce certain parameters when creating a room.

## TL;DR

Whether you call them Secure Border Gateways, TI-Messenger Proxies or something else: it is possible to add an application layer firewall that brings an additional layer of control to a Matrix federation. But let’s not forget:

* Matrix servers already let you lock down your federation \- e.g. all of Synapse’s [federation configuration](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html#federation).  
* SBGs are not part of the Matrix specification, because Matrix works perfectly well without them  
* SBGs are an **optional** extra for organisations and federations that might require them, based on their use-case, external integration points (e.g. FHIR) and overall security posture  
* SBGs are not required for a private federation
* SBGs are not required for public federation either  
* SBGs do not make Matrix closed  
* **It’s a hugely positive sign of Matrix’s maturity that there’s an ecosystem of 3rd party software vendors building additional optional components like SBGs**
