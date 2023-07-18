+++
date = "2023-07-18T14:00:00Z"
title = "A giant leap forwards for encryption with MLS"
path = "/blog/2023/07/a-giant-leap-with-mls"

[taxonomies]
author = ["Matthew", "Hubert"]
category = ["Encryption"]

[extra]
image = "https://matrix.org/blog/img/mls-matrix.png"
+++

Hi all,

Given our commitment to open standards and interoperability, we’re delighted to see MLS be ratified by the IETF as [RFC9420](https://www.rfc-editor.org/rfc/rfc9420).

MLS is a new encryption standard defined by the IETF, the standards body that maintains much of what makes the internet work. In the same way that Transport Layer Security (TLS, another IETF standard) defines the way to provide encryption between users and servers, or between two different servers, MLS provides a standard way for users of a messaging service to communicate securely without servers being able to eavesdrop on their conversations.

<!-- more -->

Since Matrix is a proponent of open standards and secure communication, MLS is a great fit for us, and we were pleased to participate in the standardization process along with many other organizations. By being produced in the open, MLS was able to benefit from the experience and knowledge of a huge cross-industry group of individuals.

Since the beta launch of end-to-end encryption in Matrix in 2016, we’ve been working on improving the end-to-end encryption experience for users while ensuring that conversations remain secure. End-to-end encryption is an important part in ensuring that people can communicate safely and securely with each other, whether it be about healthcare, financial, government, business, or personal information.

MLS provides more opportunities for improving the security of conversations in Matrix, and offers those building on Matrix more flexibility. MLS is particularly useful for conversations with large numbers of participating users, thanks to algorithmic improvements over the Double Ratchet most systems use today. It also introduces new security guarantees, such as the ability for group members to cryptographically verify the recipients of a message.

We have been working on integrating MLS into Matrix since 2020 to take advantage of its benefits; the biggest task has been developing approaches to enable MLS to operate in decentralised environments such as Matrix or the IETF’s [MIMI working group](https://datatracker.ietf.org/wg/mimi/about/) for interoperable instant messaging.

With other interested parties, we’re continuing to develop best practices for MLS that will work without modification in a decentralized environment which should be available for testing later this year.

We should also highlight that much of the work to create and use MLS in a decentralized environment comes from a commercial arrangement between BWI and Element to create ‘Matrix over MLS’ for use by the German Armed Forces, to further secure its own solution BwMessenger and to make it interoperable with other messaging products.

BWI’s funding of Element’s open source development of MLS has massively accelerated support for Matrix over MLS. It’s why commercial arrangements with vendors building on Matrix are so important for Element, who employs the majority of the Matrix core team. Matrix vendors can also now directly financially support The Matrix.org Foundation as paying members too.

You can keep track of our progress at [https://arewemlsyet.com](https://arewemlsyet.com)

\-- Matthew, Hubert & the Matrix cryptography team
