+++
date = "2024-06-06T07:00:00Z"
title = "Policy and regulation update 2024: Matrix and the GDPR"

[taxonomies]
author = ["Denise Almeida"]
category = ["Foundation", "Compliance"]
+++

If you have been following the matrix.org blog for some time, you will know that we’ve never been ones to shy away from complex topics like public policy and its impacts on Matrix. With this blog post series, our aim is to introduce a more regular cadence to our regulatory updates and to be more transparent about where we are focusing our efforts in this area.

Each blog post in the series will focus on a given theme or piece of law, as well as its relevant jurisdiction. We will start this series by taking a deep dive into EU regulation, starting with the General Data Protection Regulation (GDPR). Future blog posts in the series will cover the digital services package (DMA and DSA), the incoming CRA and the highly controversial CSAM regulation. These will be followed by a series dedicated to the UK, particularly UK applications of European law such as the GDPR and ePrivacy directive, as well as the Online Safety Act and the IPA amendment bill. Finally, we will conclude the series by looking across the pond and diving into the Cloud Act, as well as KOSA and other existing proposals.

<!-- more -->

## The big one

Over the last decade the most impactful - in terms of grassroots led change, not necessarily enforcement - piece of legislation was probably the GDPR. Although its initial enforcement date (May 2018) was a couple of years before I joined Element and the Matrix.org Foundation, I know that preparing for GDPR was a huge effort that led to a lot of deep thinking about the ins and outs of Matrix.

These have been certainly years of learning, iterating and evolving our approach to this fascinating piece of law, and [just like 6 years ago](https://www.matrix.org/blog/2018/05/08/gdpr-compliance-in-matrix), we keep receiving questions and feedback about how the GDPR applies to the Matrix protocol and how server administrators can remain compliant.

We maintain the view that the GDPR was not built for a decentralised digital world, after all we are (for now!) the exception, not the rule. This does not mean, however, that we don’t make every effort possible to comply with the spirit and the letter of the law. Most organisations using the Matrix protocol will be running strictly closed federations or single servers in closed federation, which they fully control (or appoint others to support them with that control). Compliance is a lot more straightforward in this sense, so for now we will focus on those using Matrix to interact with open federation.

The most difficult part of GDPR compliance for Matrix has always been article 17, right to erasure, or ‘right to be forgotten’ as it is usually known. Our view has always been that this is a relative right, which needs to take into account available technology and other applicable laws in order to be enacted. For example, if an employee leaves a company and asks for all of their data to be erased, in practice not all of that data will actually be erased, due to constraints put in place by other legal instruments (i.e. tax and fraud prevention regulations, employment law, etc.).

Considering this relativity, we looked at what other ubiquitous product offerings already exist in the decentralised space, and how they address erasure. Using email as an analogy was a no-brainer in this regard: one understands that deleting an email account will delete everything from their inbox and sent folders, whilst also understanding that is impossible and not expectable to have the same data deleted from the recipients’ inbox (or the inboxes of those that might have had the same message forwarded to them).

Use of technology is always associated with constant give and take and risk based decisions. Whilst we make every effort to minimise risks for the people using the Matrix protocol, the reality is that one of the main purposes of the protocol is integrity of communications and decentralisation of communications data. This is directly at odds with absolute deletion of communications.

So how do we come to terms with this conflict? Following the email analogy, we address right to erasure from two different standpoints: account data and communications data. As part of the protocol, everyone is able to automatically delete their accounts and select an option to delete all of their data. First, this deletes all ‘external’ data associated with the account, such as e-mail addresses, phone numbers, IP addresses and device identifiers - effectively pseudonymising this data, aside from Matrix IDs which we will address later on. This measure follows recital 28 of the GDPR, which mentions pseudonymisation as a risk reducing measure for data subjects, which helps controllers and processors meet their data protection obligations.

Now, the thornier issue of communications data. How can we apply erasure whilst maintaining the integrity of the service for remaining users? Keeping on with the email analogy, if someone deletes their sent email from their own account, you would still expect an existing thread with multiple users to work and be visible. You just would not expect the same message to leave the original account to new individuals.

That is precisely how the issue is addressed in Matrix - upon deletion of an account, and request for deletion of messages, a flag is applied to the original messages which prevents it from ever being displayed to any new people. This, of course, requires cooperation from the other server administrators who might also have copies of the same message in their server instance. We make this decision by referring to recital 66 of the GDPR, which requires controllers take reasonable steps, taking into account available technology, to inform other controllers of the data subject’s request to have their data erased.

One issue still remains unresolved - Matrix IDs (MXIDs) are always associated with state events (data sent by a user to modify the attributes of a given room - eg its name, its members, its avatar), which means those IDs could still leak over federation. That is a particular concern when one uses their legal name as their MXID. The solution for this is to replace the MXID with a pseudonym, maintaining the integrity of communications and fully removing any last remains of identifiable information in the system.

The Synapse team has also made a lot of progress on message retention policies and media retention, both huge strides to continuously improve the privacy of Matrix users, whilst also helping server administrators comply with their legal obligations.

Things have definitely progressed in the portability space, and chat export is now implemented in multiple Matrix clients, having been first implemented on Element Web in October 2021, in version 1.9.2. We look forward to seeing what the next year brings us in terms of privacy improvements.

For the next post in this series we will continue discussing the EU policy landscape, although from a different perspective. We will be going through the digital services package (which includes the DSA and DMA) and what does it all mean for Matrix now that we have reached implementation stage.

As always, we remain open to your feedback and thoughts. If there is anything you would like to hear more about or have a suggestion for a future blog in this series please feel free to reach out to [dpo@matrix.org](mailto:dpo@matrix.org) via email, DM to [@gpdr:matrix.org](https://matrix.to/#/@gpdr:matrix.org) or chat to us in the [Office of the Matrix.org Foundation room](https://matrix.to/#/#foundation-office:matrix.org).
