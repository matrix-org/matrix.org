+++
date = "2025-07-31"
title = "Matrix.org (Official Account) and Terms updates"

[taxonomies]
author = ["Amandine Le Pape"]
category = ["Legal"]
+++

Users of the Matrix.org homeserver have recently received – or will shortly receive as the notifications are rolled out progressively – an invite from a user called *Matrix.org (Official Account).* Those checking the room will have noticed that it announces upcoming changes to our the Matrix.org Homeserver Terms and Conditions.

Some of you have asked us questions about these two events so we would like to offer some clarification and (hopefully) some reassurance.

<!-- more -->

## Matrix.org (Official Account)

Firstly, the Matrix.org (Official Account): given not all the users having an account on the Matrix.org homeserver have an email or another way to reach out to them linked to their Matrix accounts we decided to use a room to send official communications to them.

This user is currently sending out messages about the upcoming changes to the Terms and Conditions updates (see next section), but we anticipate sending out other account related messages in future. For long time users of the homeserver if you scroll back you may also see some messages from several years ago.

You can verify that this user is legitimate by checking the [page on our website](/homeserver/official/) we have dedicated to it. In short, the user’s matrix identifier is **@server:matrix.org** and the room should look like the screenshot below from various clients. Any communications coming from a different identifier are not coming from us.

![A screenshot of a mouse hovering the avatar of an account. The tooltip display @server:matrix.org](/blog/img/official-account-1.png)
![A screenshot of the account view of an account. The identifier is @server:matrix.org](/blog/img/official-account-2.png)
![A screenshot of the account view of an account in Element web. The identifier is @server:matrix.org](/blog/img/official-account-3.png)

## Terms and Conditions updates

It is the first time we have introduced significant changes to our Terms and Conditions (also known as “[Homeserver Terms](/legal/terms-and-conditions)”) since their creation in 2018\. These changes have been material enough to warrant notifications going out to all matrix.org accounts. Some of these changes are associated with the incoming [premium accounts](/blog/2025/06/funding-homeserver-premium/) and others are directly related to our compliance with the Online Safety Act (OSA). But all in all, if you’re a typical matrix.org user there shouldn’t be any impacts to how you use Matrix on a day-to-day basis.

### Premium accounts and fair usage limits

When it comes to the premium accounts, the main changes we’ve introduced are directly related to payment and clarification of fair usage limits. As [announced a couple of weeks ago](/blog/2025/06/funding-homeserver-premium/), we will be progressively introducing premium accounts on the Matrix.org homeserver, first to new users, then slowly migrating existing accounts. This is due to the need for the Foundation to help both cover the costs of running the server and limit the abuse we are seeing from a few users.

The introduction of payment is why you might have noticed the terms becoming a bit heavier on the “legalese”: there are certain things we need to make sure we cover when payments are involved which can be quite dense. These are mainly clauses 5 and 6, around liability and payment, respectively. We will work to make these friendlier over time.

In terms of fair usage: so far there was no mention of fair usage in the terms, which of course led to some users pushing the limits of their usage, by storing a large amount of data on the server. We have now made it clear that this won’t be tolerated, but these fair usage limits should not impact normal users. We are introducing both a per 24h and per 4 weeks rolling cap, the values of which have been based on looking at the stats of usage and we may iterate on them if needed.

It is worth noting that whilst the terms will be effective on the 14th of August for existing users, they will be effective immediately for new users.

**With regards to the roll out of premium accounts, here are a few important notes:**

* **Pricing details and usage limits are published [here](/homeserver/pricing/) and may still evolve**  
* **Premium accounts will start being rolled out to some of the new users in a few days**  
* **Existing users will only be migrated from their legacy account to the new Free accounts in several weeks (we will communicate when we start the migration)**  
* **Existing users will be notified with enough advance warning before the migration of their account happens**  
* **For any question, please refer to the [announcement blog post](/blog/2025/06/funding-homeserver-premium) or  join [https://matrix.to/#/#foundation-office:matrix.org](https://matrix.to/#/#foundation-office:matrix.org).**

### Online Safety Act and Digital Services Act related changes

Outside of these, the most common questions we are seeing are associated with clause 3.2 “user content”. This explains the measures we take to comply with our OSA and DSA obligations around proactive monitoring for illegal content. To reiterate and be as clear as possible:

* **Your encrypted messages are not being looked at \- we have never introduced backdoors and never will;**  
* **Your private discussions remain private.**

What we are doing is using readily available tooling like [Cloudflare’s scanning tool](https://developers.cloudflare.com/cache/reference/csam-scanning/) to identify **unencrypted** media which might have a match with content identified in reputable Child Sexual Abuse Materials (CSAM) databases such as [NCMEC](https://www.missingkids.org/home). Like all proactive tooling described in this clause, this is all done in public and unencrypted rooms. We have no way of looking into encrypted rooms nor do we have plans to do so.

If you’ve been around for a while you will have seen that we have started [raising the alarm](/blog/2021/05/19/how-the-uk-s-online-safety-bill-threatens-matrix/) about the dangers and potential risks of the OSA back in 2021\. Whilst we have certain legal obligations as a UK based organisation, we will not falter and compromise on our principles and values.

We are planning to do a longer blog post on our regulatory compliance in the near future. If there is anything in particular you would like to see answered by that please feel free to drop us an email at [legal@matrix.org](mailto:legal@matrix.org).
