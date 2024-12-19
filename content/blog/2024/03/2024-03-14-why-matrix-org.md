+++
date = "2024-03-14T15:30:00Z"
title = "Why the Matrix.org Homeserver Exists?"

[taxonomies]
author = ["Thib"]
category = ["Foundation"]
+++

Matrix self-defines as the go-to protocol for "open, secure, decentralised communications". The Matrix.org Foundation defines "maximising […] the number of online servers in the open federation" as [a key objective in its mission](/about/#mission). So why is the Matrix.org homeserver, probably the largest homeserver in the whole federation, still in open registration mode?

Let's dive into the technical, and user experience choices behind it.

<!-- more -->

## A point of centralisation

The Matrix protocol is heavily decentralised. It goes beyond just federation: every single server in a room maintains a local copy of that room in sync with all the other servers participating in the conversation.

Matrix is often compared to email but for instant messaging. The first thing that comes to mind is that email might be federated, but it's no longer _that_ decentralised. According to [this article on sellcell.com](https://www.sellcell.com/blog/most-popular-email-provider-by-number-of-users/), Gmail.com provides nearly 50% of the active email accounts in 2023, iCloud follows with 27.8%, and Outlook.com owns 13.1% of them.

The Matrix.org Foundation doesn't want to become the Gmail.com or Outlook.com of Matrix. It doesn't generate any revenue from its users and runs on [donations](/support). The costs of hosting, maintenance and support of the Matrix.org homeserver grow with the number of people using it.

A steep and steady growth comes with three significant issues:

1. The technical maintenance costs do not grow linearly with the number of users. The infrastructure itself costs more, but more time needs to be spent on research and development to make the backend scale.

2. Moderation becomes more difficult. The more reports the Trust & Safety team has to handle, the less time it can spend on tools to improve the moderation experience.

3. Support can't be automated and is very costly to scale. The more users on Matrix.org, the less responsive the support team can be (unless we find resources to hire more support team members) and the more frustrating it is for everyone involved.

In short: everyone stands to benefit from Matrix.org not being a supermassive homeserver that is difficult to leave.

## Mindfulness of others

One of the goals of the Matrix.org Foundation is to maximise the number of Matrix users in the open federation. Another goal is to make sure Matrix remains decentralised by increasing the number of servers in that same open federation.

One of the fundamental aspects that makes Matrix appealing is decentralisation and (open) federation. Those concepts are not as difficult for the general public to understand as some claim. But we must acknowledge the general public is not regularly confronted with them and their implications when trying new apps.

For Matrix to gain traction outside of technical circles, it needs to be mindful of the time and habits of the general public. Whether we like it or not, people are used to trying apps, not protocols or providers. It is not reasonable to ask a user to pick a homeserver before they even know what a homeserver is, nor what this decision entails. People need to be able to download an app, try it right away, and get some (potential) value from it before making more advanced decisions.

We have made Matrix.org one of the most prominent entry points for people discovering Matrix because we believe inclusivity is one of the fundamental premises of Matrix's global success.

So then, how do we reconcile the need for ease of adoption with the goal of decentralisation?

## A way in and a way out

Creating an account on Matrix.org is a typical first step in the Matrix user journey. Since agglomeration around a single instance is against the goals of Matrix and its Foundation, users need to have a way out and incentives to move.

To move to another homeserver, a user needs to be able to pick a homeserver and move there.

### Picking a homeserver

Matrix community member Austin Huang created [servers.joinmatrix.org](https://servers.joinmatrix.org) to list all the servers with open registrations where people could find a new home. I am working on creating an official and curated version. We need the instance picker to work on Matrix.org's website, and provide data that the client apps can reuse and present to users who want to move away from Matrix.org.

### Moving to the new homeserver

The Foundation will implement an account migration tool to allow people to migrate to another server. A proper portable identity mechanism would be better - however, the Foundation had to pause its development due to a lack of funding. Such a mechanism would also rely on a new room version. It would only allow migrating conversations that happened after a room upgrade to that hypothetical new version, which results in data loss.

## The most reasonable solution

There are alternatives to a prominent onboarding homeserver like the Matrix.org homeserver. We don't find any of them satisfactory:

* Picking a server randomly when a user wants to sign up in the app is confusing and has a lot of security implications. This is not acceptable.
* Forcing the user to choose a server when they sign up is a highly cumbersome process that does not respect the user's time and resources.
* Portable identities are very desirable but will take time to materialise.
* P2P Matrix depends on a portable identity mechanism and is further away in the future.

As you can see, we at the Foundation need to strike a balance as we pursue goals that are occasionally in tension with one another, and the Matrix.org homeserver is a prime example. We are committed both to making Matrix more accessible, and to doing the work to decenter the Matrix.org homeserver.

You can help us achieve both: the Foundation needs your support! If you can afford to, please consider [supporting us financially](/support/). If you want to contribute to the Foundation’s governance, consider [becoming a member](/membership/).
