+++
title = "Combating abuse in Matrix - without backdoors."
path = "/blog/2020/10/19/combating-abuse-in-matrix-without-backdoors"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/matrix-logo.png"
+++

### UPDATE: Nov 9th 2020

Not only are UK/US/AU/NZ/CA/IN/JP considering mandating
backdoors, but it turns out that the Council of the European Union is working on it too, having created an advanced
[Draft Council Resolution on Encryption](https://files.orf.at/vietnam2/files/fm4/202045/783284_fh_st12143-re01en20_783284.pdf)
as of Nov 6th, which could be approved by the Council as early as Nov 25th if it passes approval.  This doesn't directly
translate into EU legislation, but would set the direction for subsequent EU policy.

Even though the Draft Council Resolution does not explicitly call for backdoors, the language used...

> Competent authorities must be able to access data in a lawful and targeted manner

...makes it quite clear that they are seeking the ability to break encryption on demand: i.e. a backdoor.

Please help us spread the word that backdoors are fundamentally flawed - read on for the rationale, and an alternative
approach to combatting online abuse.

---

Hi all,

Last Sunday (Oct 11th 2020), the UK Government published an [international statement on end-to-end encryption and public safety](https://www.gov.uk/government/publications/international-statement-end-to-end-encryption-and-public-safety), co-signed by representatives from the US, Australia, New Zealand, Canada, India and Japan.  The statement is well written and well worth a read in full, but the central point is this:

> We call on technology companies to [...] enable law enforcement access to content in a readable and usable format where an authorisation is lawfully issued, is necessary and proportionate, and is subject to strong safeguards and oversight.

In other words, this is an explicit request from seven of the biggest governments in the world to mandate a backdoor in end-to-end encrypted (E2EE) communication services: a backdoor to which the authorities have a secret key, letting them view communication on demand.  This is big news, and is of direct relevance to Matrix as an end-to-end encrypted communication protocol whose core team is currently centred in the UK.

Now, we sympathise with the authorities’ predicament here: we utterly abhor child abuse, terrorism, fascism and similar - and we did not build Matrix to enable it.  However, trying to mitigate abuse with backdoors is, unfortunately, **fundamentally flawed**.

* Backdoors necessarily introduce a fatal weak point into encryption for _everyone_, which then becomes the ultimate high value target for attackers.  Anyone who can determine the secret needed to break the encryption will gain full access, and you can be absolutely sure **[the backdoor key will leak](https://techcrunch.com/2016/07/27/security-experts-have-cloned-all-seven-tsa-master-keys/)** - whether that’s via intrusion, social engineering, brute-force attacks, or accident.  And even if you unilaterally trust your current government to be responsible with the keys to the backdoor, is it wise to unilaterally trust their successors?  Computer security is only ever a matter of degree, and the only safe way to keep a secret like this safe is for it not to exist in the first place.

* End-to-end encryption is nowadays a completely ubiquitous technology; **an attempt to legislate against it is like trying to turn back the tide** or declare a branch of mathematics illegal.  Even if Matrix did compromise its encryption, users could easily use any number of other approaches to additionally secure their conversations - from PGP, to OTR, to using one-time pads, to sharing content in password-protected ZIP files.  Or they could just switch to a E2EE chat system operating from a jurisdiction without backdoors.

* Governments protect their own data using end-to-end encryption, precisely because they do not want other governments being able to snoop on them.  So not only is it hypocritical for governments to argue for backdoors,**it immediately puts their own governmental data at risk of being compromised**.  Moreover, creating infrastructure for backdoors sets an incredibly bad precedent to the rest of the world - where less salubrious governments will inevitably use the same technology to the massive detriment of their citizens’ human rights.

* Finally, in Matrix’s specific case: Matrix is an encrypted decentralised open network powered by open source software, where anyone can run a server.  Even if the Matrix core team were obligated to add a backdoor, this would be visible to the wider world - and **there would be no way to make the wider network adopt it**.  It would just damage the credibility of the core team, push encryption development to other countries,  and the wider network would move on irrespectively.

In short, we need to keep E2EE as it is so that it benefits the 99.9% of people who are good actors. If we enforce backdoors and undermine it, then the bad 0.1% percent simply will switch to non-backdoored systems while the 99.9% are left vulnerable.

We’re not alone in thinking this either: the GDPR (the world-leading regulation towards data protection and privacy) explicitly calls out robust encryption as a necessary information security measure. In fact, the risk of US governmental backdoors explicitly caused the [European Court of Justice to invalidate the Privacy Shield](http://curia.europa.eu/juris/document/document.jsf?docid=228677&doclang=EN) for EU->US data.  The position of the seven governments here (alongside [recent communications by the EU commissioner](https://ec.europa.eu/home-affairs/sites/homeaffairs/files/what-we-do/policies/european-agenda-security/20200724_com-2020-607-commission-communication_en.pdf) on the ‘problem’ of encryption) is a significant step back on the protection of the fundamental right of privacy.

So, how do we solve this predicament for Matrix?

Thankfully: **there is another way.**

This statement from the seven governments aims to protect the general public from bad actors, but it clearly undermines the good ones.  What we _really_ need is something that empowers users and administrators to identify and protect themselves from bad actors, without undermining privacy.

What if we had a standard way to let users themselves build up and share their own views of whether other users, messages, rooms, servers etc. are obnoxious or not?  What if you could visualise and choose which filters to apply to your view of Matrix?

Just like the Web, Email or the Internet as a whole, there is literally no way to unilaterally censor or block content in Matrix.  But what we _can_ do is provide first-class infrastructure to let users (and room/community moderators and server admins) make up their own mind about who to trust, and what content to allow.  This would also provide a means for authorities to publish reputation data about illegal content, providing a privacy-respecting mechanism that admins/mods/users can use to keep illegal content away from their servers/clients.

The model we currently have in mind is:

* Anyone can gather reputation data about Matrix rooms / users / servers / communities / content, and publish it to as wide or narrow an audience as they like - providing their subjective score on whether something in Matrix is positive or negative in a given context.
* This reputation data is published in a privacy preserving fashion - i.e. you can look up reputation data if you know the ID being queried, but the data is stored pseudonymised (e.g. indexed by a hashed ID).
* Anyone can subscribe to reputation feeds and blend them together in order to inform how they filter their content.  The feeds might be their own data, or from their friends, or from trusted sources (e.g. a fact-checking company).  Their blended feed can be republished as their own.
* To prevent users getting trapped in a factional filter bubble of their own devising, we’ll provide UI to visualise and warn about the extent of their filtering - and make it easy and fun to shift their viewpoint as needed.
* Admins running servers in particular jurisdictions then have the option to enforce whatever rules they need on their servers (e.g. they might want to subscribe to reputation feeds from a trusted source such as [the IWF](https://www.iwf.org.uk/), identifying child sexual abuse content, and use it to block it from their server).
* This isn’t just about combating abuse - but the same system can also be used to empower users to filter out spam, propaganda, unwanted NSFW content, etc on their own terms.

This forms a _relative_ reputation system.  As uncomfortable as it may be, one man’s terrorist is another man’s freedom fighter, and different jurisdictions have different laws - and it’s not up to the Matrix.org Foundation to play God and adjudicate.  Each user/moderator/admin should be free to make up their own mind and decide which reputation feeds to align themselves with.  That is not to say that this system would help users locate extreme content - the privacy-preserving nature of the reputation data means that it’s only useful to filter _out_ material which would otherwise already be visible to you - not to locate new content.

In terms of how this interacts with end-to-end-encryption and mitigating abuse: the reality is that the vast majority of abuse in public networks like Matrix, the Web or Email is visible from the public unencrypted domain. Abusive communities generally want to attract/recruit/groom users - and that means providing a public front door, which would be flagged by a reputation system such as the one proposed above.  Meanwhile, communities which are entirely private and entirely encrypted typically still have touch-points with the rest of the world - and even then, the chances are extremely high that they will avoid any hypothetical backdoored servers.  In short, investigating such communities requires traditional infiltration and surveillance by the authorities rather than an ineffective backdoor.

Now, this approach may sound completely sci-fi and implausibly overambitious (our speciality!) - but we’ve actually started successfully building this already, having been refining the idea over the last few years.  [MSC2313](https://github.com/matrix-org/matrix-doc/blob/msc2313/proposals/2313-moderation-policy-rooms.md) is a first cut at the idea of publishing and subscribing to reputation data - starting off with simple binary ban rules.  It’s been implemented and in production for over a year now, and is used to maintain shared banlists used by both matrix.org and mozilla.org communities.  The next step is to expand this to support a blendable continuum of reputation data (rather than just binary banlists), make it privacy preserving, and get working on the client UX for configuring and visualising them.

Finally: we are continuing to hire a dedicated Reputation Team to work full time on building this (kindly funded by Element).  This is a major investment in the future of Matrix, and frankly is spending money that we don’t really have - but it’s critical to the long-term success of the project, and perhaps the health of the Internet as a whole.  There’s nothing about a good relative reputation system which is particularly specific to Matrix, after all, and many other folks (decentralised and otherwise) are clearly in desperate need of one too. We are actively looking for funding to support this work, so if you’re feeling rich and philanthropic (or a government wanting to support a more enlightened approach) we would _love_ to hear from you at [funding@matrix.org](mailto:funding@matrix.org)!

Here’s to a world where users have excellent tools to protect themselves online - and a world where their safety is not compromised by encryption backdoors.

\-- The Matrix.org Core Team

*Comments at [HN](https://news.ycombinator.com/item?id=24826951), [lobste.rs](https://lobste.rs/s/ntyvtw/combating_abuse_matrix_without), and [r/linux](https://www.reddit.com/r/linux/comments/je8s7x/combating_abuse_in_matrix_without_backdoors/), [LWN](https://lwn.net/Articles/834710/)
