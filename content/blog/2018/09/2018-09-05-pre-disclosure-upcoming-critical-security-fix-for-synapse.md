+++
title = "Pre-disclosure: Upcoming critical security fix for Synapse"
path = "/blog/2018/09/05/pre-disclosure-upcoming-critical-security-fix-for-synapse"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Security"]
+++

Hi all,

During the ongoing work to finalise a stable release of Matrix's Server-Server federation API, we've been doing a full audit of Synapse's implementation and have identified a serious vulnerability which we are going to release a security update to address (Synapse 0.33.3.1) on
<b>Thursday Sept 6th 2018 at 12:00 UTC</b>.

We are coordinating with package maintainers to ensure that patched versions of packages will be available at that time - meanwhile, if you run your own Synapse, <strong>please be prepared to upgrade as soon as the patched versions are released</strong>.  All previous versions of Synapse are affected, so everyone will want to upgrade.

Thank you for your time, patience and understanding while we resolve the issue,

<a href="/blog/wp-content/uploads/2018/09/signed_disclosure.txt">signed_predisclosure.txt</a>
