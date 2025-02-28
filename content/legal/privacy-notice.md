+++
title = "Matrix.org Foundation Privacy Policy"
version = "3.1.0"
+++

Please read this document carefully before accessing or using this service.

## 1. Introduction

### 1.1 English, not legalese

Most Privacy Policy documents are unreadable. They are written by lawyers and for lawyers,
and in our opinion are not very effective.
Data protection and privacy are important, and we want you to understand the issues involved.
For that reason we decided to use plain English instead as much as possible, to make our terms as clear as possible.

When you read 'the Matrix.org homeserver' or 'the Service' below,
it refers to the services made available at <https://matrix.org> which store your account and
personal conversation history, provide services such as bots and bridges,
and communicate via the open Matrix decentralised communication protocol with the public Matrix Network.

The public Matrix Network is a decentralised and openly federated communication network.
This means that user messages are replicated on each participant's server and
messages posted to a room are visible to all participants including in some cases any new joiners.
This is further explained at 2.3.

Where you read The Matrix.org Foundation C.I.C., The Matrix.org Foundation, or The Foundation,
it refers to the Community Interest Company incorporated on 29 October 2018 to be the
neutral custodian of the Matrix protocol: The Matrix.org Foundation C.I.C., and their agents.

The Matrix protocol is licensed by the Matrix.org Foundation which makes it available to
third parties who set up their own homeserver.
This privacy policy does not apply to such Matrix servers run by anyone
else - Matrix is an open network like the Web and this agreement only applies to the server (Matrix.org) provided by Element.

Matrix.org is the Data Controller for the Service and works with [Element](element.io)
as a Processor for data processing, hosting and management purposes. We can be contacted as per the details below:

Email: [dpo@matrix.org](mailto:dpo@matrix.org)

Postal address:

The Matrix.org Foundation
10 Queen Street Place
London
United Kingdom
EC4R 1AG

Should you have other questions or concerns about this document, please send us an email at [dpo@matrix.org](mailto:dpo@matrix.org).

### 1.2 This is a living document

This is a living document. With your help, we want to make it the best in the industry.

If you read something that rubs you the wrong way, or if you think of something that should be added,
please get in touch! We're all ears! Email <dpo@matrix.org> and we'll chat.
We don't amend this document for any specific users or use case,
but if your proposed changes apply to all of our users,
we'll be happy to update it for everyone. Scroll to the bottom to see the history so far.

We will likely improve this document over time and we will take steps to inform our users about any updates.
By continuing to use the Service, you will implicitly accept the changes we make.
If updates to this document are ever associated with significant changes to the way we collect our process your data,
we will promptly notify you.

Your access and use of the Service is always subject to the most current version of this document.

## 2. Access to your Data

<!-- markdownlint-disable-next-line line-length -->
### 2.1 What is the legal basis for processing my data and how does this affect my rights under GDPR (General Data Protection Regulation)?

#### 2.1.1 Legal basis for processing

Matrix.org processes your data under a Legitimate Interest basis of processing,
to provide our Service to you in an efficient and secure manner and to ensure the legal compliance and
proper administration of our business.
Essentially, this means that we process your data only as necessary to deliver the Service and
for internal administration purposes, and in a manner that you understand and expect.
We also carry out processing that is necessary to provide our Service to you under our Matrix.org Homeserver Terms and
Conditions and processing that is necessary to comply with our legal obligations.
Where consent is required by law in relation to certain processing, we will ask for your consent.

We process your information for the purposes of providing our decentralised,
openly-federated and end-to-end encrypted communication Service,
getting in touch with you, responding to your requests,
working with our suppliers to deliver the Service and enabling its features,
ensuring the security of our Service, developing, fixing and improving our Service,
administering our business and complying with the law.

The nature of the Service and its implementation results in some caveats concerning this processing,
particularly in terms of GDPR Article 17 Right to Erasure (Right to be Forgotten).
We believe these caveats (discussed in the section below in detail) are in line with the broader societal interests
served by providing the Service.
In situations where the interests of the individual appear to be in conflict with the broader societal interests,
we will seek to reconcile those differences guided by our policy.

#### 2.1.2 Your rights as Data Subject

You have rights in relation to the personal data we hold about you. Some of these only apply in certain circumstances.
Some of these rights are explored in more detail elsewhere in this document. For completeness, your rights under GDPR are:

1. The right to be informed
1. The right of access
1. The right to rectification
1. The right to erasure
1. The right to restrict processing
1. The right to data portability
1. The right to object
1. Rights in relation to automated decision making and profiling.

We may ask for proof of identity before responding to your request. For more details about these rights,
please see the guidance provided by the ICO. If you have any questions or are unsure how to exercise your rights,
please contact us at [dpo@matrix.org](mailto:dpo@matrix.org).

#### 2.1.3 Right to erasure

You can request that we forget your copy of messages and files by instructing us to deactivate your account
(using a Matrix client such as the Element chat app) and selecting the option instructing us to forget your messages.
What happens next depends on who else had access to the messages and files you had shared.

Any messages or files that were only accessible by your account will be deleted from our servers within 30 days.

Where you shared messages or files with another registered Matrix user,
that user will still have access to their copy of those messages or files.
Apart from state events (see 2.1.3.1 below), these messages and files will not be shared with any unregistered or
new users who view the room after we have processed your request to be forgotten.

State events are processed differently to non-state events. State events are used by the Service to record,
amongst other things, your membership in a room, the configuration of room settings,
your changing of another user's power level and your banning a user from a room.
Were we to erase these state events from a room entirely,
it would be very damaging to other users' experience of the room, causing banned users to become unbanned,
revoking legitimate administrator privileges, etc.
We therefore share state events sent by your account with all non-essential data removed ('redacted'),
even after we have processed your request to be forgotten.
This means that your username will continue to be publicly associated with rooms in which you have participated,
even after we have processed your request to be forgotten.
We are actively working on a solution to work around this restriction and allow you to be fully forgotten
while maintaining a high quality experience for other users. If this is not acceptable to you, please do not use the Service.

Because an account deactivation actions the removal of any data which could be used to
validate the ownership of an account,
it is our policy to not reactivate deactivated accounts.
This measure is in place to protect the privacy and integrity of all accounts.

#### 2.1.3.1 Exceptional erasure

As described above, erasing a state event may result in our needing to erase the entire conversation at the same time.
Deciding whether to take this drastic step will require a balancing exercise
to be carried out at the time of the request, and will depend on:

1. the nature of the Personal Data that the user is requesting to be erased;
1. how many other users would have their fundamental rights and freedoms put at risk if the Right to Erasure were to be exercised
1. to what degree these other users would have their fundamental rights and freedoms put at risk if the
   Right to Erasure were to be exercised

The Personal Data contained in a state event is usually limited to the username,
the timestamp and the conversation in which the state event was issued.
State events only represent that a user participated in a given conversation at a given time.
It is rare that this data is sensitive enough to warrant its erasure given the drastic impact this will have on other users.

Each case will be decided based on the factors listed above.
In most situations we will not erase state events. In extreme situations,
where not erasing state events will place people at material risk of harm,
we may choose to erase state events or remove the entire conversation.

#### 2.1.3 Data portability

Under GDPR you have a right to request a copy of your data in a commonly-accepted format.
If you would like a copy of your data,
please send a request over Matrix to <dpo@matrix.org>. In the future we will provide a better interface for this!

#### 2.2 What Information Do You Collect About Me and Why?

The information we collect is purely for the purpose of providing your communication service via Matrix.
We do **not** profile users or their data on the Service.

Be aware that while we do not profile users on the Service, third party Matrix clients may gather usage data.

#### 2.2.1 Information you provide to us

We collect information about you when you input it into the Service or otherwise provide it directly to us.

#### 2.2.1.1 Account and profile information

We collect information about you when you register for an account. This information is kept to a minimum on purpose,
and is restricted to:

* Username
* Password
* Display Name (if you choose to provide one)
* Your email address (if you choose to provide it)
* Your verified telephone number (if you choose to provide it)
* Your username and password is used to authenticate your access to the Service and to uniquely identify you within the Service.
* Your password is stored until you change it or your account is deactivated
  (see 2.5 for details on how passwords are handled securely). Your username is stored indefinitely to avoid account recycling.
* Your email address and/or telephone number,
  if you choose to provide them, are used so that other users can look up your Matrix ID from these identifiers.
  We will also use your email address to let you reset your password if you forget it,
  and to send you notifications about missed messages from users trying to
  contact you on Matrix if you enable the option. We may also send you infrequent urgent messages about platform updates.

#### 2.2.1.2 Content you provide through using the Service

We store and distribute the messages and files you share using the Service
(and across the wider Matrix ecosystem via federation) as described by the Matrix protocol and
according to the access rules configured within the system. Storing and sharing this content is the reason the Service exists.

This content includes any information about yourself that you choose to share.

#### 2.2.1.3 Information you provide through purchases in the Matrix.org Foundation shop

The Matrix.org Shop is an online store at which you can purchase Matrix.org-branded merchandise,
such as stickers or tee-shirts. All proceeds go to The Matrix.org Foundation.
Data you provide for this purpose is processed under Performance of Contract.
This means that we process your data for the purposes of fulfilling orders you make from us,
getting in touch with you, responding to your requests,
working with our suppliers to deliver the Service and enabling its features,
ensuring the security of our Service, developing, fixing and improving our Service,
administering our business and complying with the law.

The information we collect is purely for the purpose of taking payments for merchandise and
shipping your purchases to you. We do not profile users or their data on the Service.
We may need your personal information to establish, bring or defend legal claims.
For this purpose, we will retain your personal information for the statutory recommended 7 years after the date
it is no longer needed by us for any of the purposes listed under How we use your information above.

##### 2.2.1.3.1 Information you provide to us

We collect information about you when you input it into the Service or otherwise provide it directly to us.

* Name and contact details
* Delivery address
* Purchase information
* Payment details (handled by a third party provider, not visible to Matrix.org Foundation employees)

##### 2.2.1.3.2 Information we collect automatically as you use the service

Your IP address is logged when you access the Service.
This data is used in order to mitigate abuse and debug operational issues. Our logs are kept for not longer than 180 days.

##### 2.2.1.3.3 Third-parties

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Printful**

We have selected Printful to provide our shopfront. By purchasing from our shop,
the following details will be shared with Printful:

* Your purchase details
* Your name and contact details
* Your delivery address
* IP addressed and cookies

For further details, please refer directly to Printful's privacy policy: <https://www.printful.com/policies/privacy>

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Stripe and Paypal**

We use Stripe and Paypal to handle payment processing for the merchandise shop. By purchasing from our shop,
the following details will be shared with either Stripe or Paypal:

* Your payment details
* Your purchase value

Stripe and/or Paypal takes care of all payment processing, so The Matrix.org Foundation and
its employees will never see your payment details.

Here is Stripe's Privacy Policy: <https://stripe.com/privacy-shield-policy> and Paypal's: <https://www.paypal.com/webapps/mpp/ua/privacy-full>

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Donorbox**

We use Donorbox to collect donations from individuals and organisations. By donating to us you will be asked to share:

* Your name
* Your email address
* Your Matrix ID (optional)

Donorbox manages payment processing via Stripe. You can review their Privacy Policy here: <https://donorbox.org/privacy>

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**2.2.1.4 Information collected for Event Management**

For events held by the Foundation, we collect information through services such as Pretix and Pretalx. This information includes:

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Pretix**

We collect:

* Name
* Pronouns
* Email
* MatrixID

If you request an invoice, we also collect:

* Name
* Address
* Zip code
* City
* Country

For more information on Pretix, who support us with event ticketing, please see their Privacy Policy here: <https://pretix.eu/about/en/privacy>

**Pretalx** – specifically with regards to event speakers, we collect:

* Profile picture
* Name
* Email
* Biography
* Availability
* MatrixID
* Fediverse handle
* LinkedIn profile
* Twitter handle
* Other media (e.g., a text box where speakers can link to their website or any other relevant content)

For more information on Pretalx, who support us with event scheduling, please see their Privacy Policy here: <https://pretalx.com/p/privacy>

#### 2.2.2 Information we collect automatically as you use the Service

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Device and Connection Information**

Each device you use to access the Service is allocated a (user-configurable) identifier. When you access the Service,
we record the device identifier, the IP address it used to connect, user agent,
and the time at which it last connected to the service.

This information is gathered to help you to manage your devices - you can view and
manage the list of devices by connecting to the Service with a Matrix client such as the Element app.

Currently, we log the IP addresses of everyone who accesses the Service. This data is used in order to mitigate abuse,
debug operational issues, and monitor traffic patterns. Our logs are kept for not longer than 180 days.

<!-- markdownlint-disable-next-line no-emphasis-as-heading -->
**Analytics information**

We use the privacy-preserving website analytics solution Plausible.
Plausible allows us to understand how our website is used, without the use of cookies or other tracking technologies.
Your use of the matrix.org website is not associated with any persistent identifiers or
cross-site tracking and no personal data is collected about you.

For full details on how Plausible processes data please refer to their Privacy Policy: <https://plausible.io/data-policy>

### 2.3 What information is shared with third-parties and why?

#### 2.3.1 Sharing data with connected services

We may share your information when working with our suppliers in order to provide the Service.

In addition, the Matrix.org homeserver is a decentralised and open service. This means that,
to support communication between users on different homeservers or different messaging platforms,
your username, display name and messages and
files are sometimes shared with other services that are connected with the Matrix.org homeserver.

##### 2.3.1.1 Federation

Matrix homeservers share user data with the wider ecosystem over federation.

When you send messages or files in a room, a copy of the data is sent to all participants in the room,
including (depending on room settings) participants who join the room in future.
If these participants are on remote homeservers, your username, display name,
messages and files may be replicated across each participating homeserver.

We will forget your copy of your data upon your request.
We will also forward your request to be forgotten onto federated homeservers.
However - these homeservers are outside our span of control, so we cannot guarantee they will forget your data.

Federated homeservers can be located anywhere in the world, and are subject to local laws and regulations.

Access control settings are shared between homeservers, as well as any requests to remove messages by "redactions",
or remove personal data under GDPR Article 17 Right to Erasure (Right to be Forgotten).
Federated homeservers and Matrix clients which respect the Matrix protocol are expected to honour these controls and
redaction/erasure requests, but other federated homeservers are outside of the span of control of Element,
and we cannot guarantee how this data will be processed.
Federated homeservers can also be located in any territory, and will be subject to the local regulations of that territory.

##### 2.3.1.2 Bridging

Some Matrix rooms are bridged to third-party services, such as IRC networks, Twitter or email.
When a room has been bridged, your username, display name,
messages and file transfers may be duplicated on the bridged service where supported.

It may not be technically possible to support your management of your data once it has been copied onto a bridged service.
Bridged services can be located anywhere in the world, and are subject to local laws and regulations.

Access control settings, requests to remove messages by "redactions" or
remove personal data under GDPR Article 17 Right to Erasure (Right to be Forgotten) are shared to bridging services,
which are expected to honour them to the best of their ability.
Be aware that not all bridged networks or bridges support the necessary technical capabilities to limit,
remove or erase messages. If this is not acceptable to you, please do not use bridged rooms.

###### 2.3.1.3 Integration services (bots and widgets)

The Matrix.org homeserver provides a range of integrations in the form of Widgets (miniature web applications
accessed as part of a Matrix Client) and Bots (automated participants in rooms).

Bots and Widgets currently have access to all the messages and files in any room in which they participate,
although we are adding a more sophisticated access control system.

### 2.4 Transfers of your data

If you use our Service your data will be transferred outside of the EU to other homeservers and
services connected with matrix.org as this is necessary to provide the Service to you.
By the very nature of our Service,
such transfers will occur regularly and we have no control over the safeguards adopted by third party recipients.

Where we engage suppliers to process your data outside the EU we will ensure that appropriate safeguards such as
the Standard Contractual Clauses are in place.

### 2.5 Sharing data in compliance with enforcement requests and applicable laws

In exceptional circumstances, we may share information about you with a
third party if we believe that sharing is reasonably necessary to

* (a) comply with any applicable law, regulation, legal process or governmental request,
* (b) protect the security or integrity of our products and services (e.g. for a security audit),
* (c) protect Element and our users from harm or illegal activities, or
* (d) respond to an emergency which we believe in good faith requires us to disclose information to assist in
  preventing the serious bodily harm of any person.

Details on how we share data with Law Enforcement agencies can be found in our [Law Enforcement Guidelines](https://matrix.org/legal/law-enforcement-guidelines).

### 2.6 How do you handle passwords?

We never store password data in plain text; instead they are stored hashed (with at least 4096 rounds of bcrypt,
including both a salt and a server-side pepper secret). Passwords sent to the server are encrypted using SSL.

It is your sole responsibility to keep your user name, password and other sensitive information confidential.
Actions taken using your credentials shall be deemed to be actions taken by you,
with all consequences including service termination, civil and criminal penalties.

If you become aware of any unauthorised use of your account or any other breach of security,
you must notify Element immediately by sending an email to [security@matrix.org](mailto:security@matrix.org).
Suspicious devices can be deleted using the User Settings management tools in
a Matrix client such as <https://element.io/app>, and users should manage good password hygiene
(e.g. using a password manager) and change their password if they believe their account is compromised.

If you forget your password (and you have registered an email address) you can use the password reset facility to reset it.

You can manage your account by using a Matrix client such as Element, FluffyChat, Hydrogen and many others.
Click [here](matrix.org/ecosystem/clients) for a comprehensive list of Matrix clients.

It is our policy to not change passwords on your behalf.
This is ultimately to protect your privacy and the integrity of your account.

### 2.7 Our commitment to children's privacy

We never knowingly collect or maintain information in the Service from those we know are under 16,
and no part of the Service is structured to attract anyone under 16. If you are under 16, please do not use the Service.

### 2.8 How can I access or correct my information?

You can access all that we collect about you by using any compatible Matrix client (such as <https://element.io/app>)
and managing your User Settings. You can request a download of a copy of all your data as per section 2.1.3.

### 2.9 Who can see my messages and files?

In unencrypted and encrypted rooms,
users connecting to the matrix.org homeserver (directly or over federation) will be able to see messages and
files according to the access permissions configuration of the relevant room.
This data is stored in the format it was received on our servers,
and can be viewed by Element engineers (employees and contractors) under the conditions outlined below.

Rooms have different visibility settings which are determined by the room administrators.
The history visibility possibilities are the following, by increasing order of openness (least open first):

* `joined`: people need to join the room to see the history, and will only see the messages sent after they joined. +
* `invited`: people can only see messages sent after they were joined, no history is visible before that point.
* `shared`: people need to join the room to see the history,
  but will then see the history up to when this visibility setting was set (the change is not retroactive).
* `world_readable`: everyone can see the room history without even joining the room.

If you share information in a room set to world_readable this might be available to people outside the Matrix ecosystem
and indexed by search engines,
via projects such as [archive.matrix.org](archive.matrix.org).
Please ensure that you double check the settings of each room before you participate and always avoid sharing personal
and sensitive data in unencrypted rooms.

In encrypted rooms, the data is stored in our databases but the encryption keys are stored only
on your devices or by yourself.
Users can optionally backup an encrypted copy of their keys on the Service to aid recovery if they lose all their keys
and devices. This key backup is encrypted by a recovery key that only the user has access to.
Element (the company, employees, and contractors) are unable to read your message content in our database.
If you lose access to your encryption keys, you lose access to your messages forever.

We use HTTPS to transfer all data. End-to-end encrypted messaging data is stored encrypted using AES-256,
using message keys generated using the Olm and Megolm cryptographic ratchets.

### 2.10 What are the guidelines matrix.org follows when accessing my data?

As per 2.11, the Foundation contracts Element to manage the hosting and data management of the homeserver.
We restrict who at Element (employees and contractors) can access user data to roles which require access
in order to maintain the health of the Service;

We have technical procedures in place to prevent unauthorised access to user data;

We never share what we see with other users or the general public.

### 2.11 Who else has access to my data?

Element is a Processor of your data, managing the homeserver on behalf of the Matrix.org Foundation.
We host the majority of the Service in Mythic Beasts data centres.
Here’s Mythic Beast’s privacy policy: <https://www.mythic-beasts.com/terms/privacy>

We host some Services in in UpCloud data centres. Here's UpCloud's privacy policy:
<https://upcloud.com/privacy-policy/>. UpCloud controls physical access to their locations.

We store some files shared through the Service on Amazon Web Services (AWS).
Amazon employees have access to this data. Here's Amazon's privacy policy: <https://aws.amazon.com/privacy/>.
Amazon controls physical access to their locations.

We use Cloudflare to mitigate the risk of DDoS attacks. Here's CloudFlare's privacy policy: <https://www.cloudflare.com/privacypolicy/>

Physical access to our offices and locations use typical physical access restrictions.

We use secure private keys when accessing servers via SSH,
and protect our AWS console passwords locally with a password management tool. We also enforce 2FA for accessing AWS.

We log application data (username, user IP and user agent). We keep logs for no longer than 180 days.

### 2.12 What happens if Matrix.org is sold?

In the event that we sell or buy any business or assets,
we may disclose your personal data to the prospective seller or buyer of such business or assets.

If we or substantially all of our assets are acquired by a third party,
personal data held by us about our users will be one of the transferred assets.

### 2.12 How is my data protected from another user's data?

All of our users' data for the Service currently resides in the same database cluster
which is due to the nature of our Service.
We use software best practices to guarantee that only people who you designate as viewers of your data can access it.
In other words, we segment our user data via software.
We do our best and are very confident we're doing a good job at it,
but, like every other service that hosts their user data on the same database,
we cannot guarantee that it is immune to a sophisticated attack.

### 2.13 What should I do if I find a security vulnerability in the Service?

If you have discovered a security concern, please email us at <security@matrix.org>.
We'll work with you to make sure that we understand the scope of the issue, and that we fully address your concern.
We consider correspondence sent to <security@matrix.org> our highest priority,
and work to address any issues that arise as quickly as possible.

Please act in good faith towards our users' privacy and data during your disclosure.
White hat security researchers are always appreciated.

## Making a Complaint

We try to meet the highest standards when collecting and using personal information.
For this reason, we take any complaints we receive about this very seriously.
We encourage people to bring it to our attention at [dpo@matrix.org](dpo@matrix.org) if they think that our collection
or use of information is unfair, misleading or inappropriate. We would also welcome any suggestions for improving our procedures.

If you want to make a complaint about the way we have processed your personal information to the supervisory authority,
you can contact the ICO (the statutory body which oversees data protection law) at <https://www.ico.org.uk/concerns>.

## Document History

* 1.0.0 - document creation - August 2018
* 1.0.1 - small fix in password section - October 2018
* 1.1.0 - clarification update - August 2019
* 1.1.1 - minor updates - September 2019
* 1.2.0 - add metadata and remove slugs - September 2019
* 1.2.1 - minor update - October 2019
* 2.0.0 - document revision and branding changes - July 2020
* 2.0.1 - minor update - October 2020
* 2.0.2 - minor update - August 2022
* 2.1.0 - clarifications on processors - November 2022
* 3.0.0 - annual review and updates to processors - June 2023
* 3.0.1 - minor clarification of 2.12 - June 2023
* 3.1.0 - include references to archive.matrix.org and room visibility settings - July 2023
* 3.1.1 - include details on Plausible and Donorbox - February 2024
* 3.1.2 - include details on Pretix and Pretalx for event management - August 2024

**A note to other startups**: this document was heavily inspired by Balsamiq's plain English ToS document.
We were impressed by their championing of plain English,
and wanted to reproduce that as much as possible in our own legal documentation.
Feel free to draw similar inspiration from this document,
though be sure to get any documents you produce checked over by a lawyer. Good luck!
