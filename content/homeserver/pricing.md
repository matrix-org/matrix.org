+++
title = "Matrix.org Homeserver Pricing"
weight = 20
+++

One of the missions of the Matrix.org Foundation is to nurture and grow the ecosystem and the network. To support this mission, the Foundation provides the public matrix.org homeserver as an easy entry point for those wanting to create their first Matrix account and join the network. The matrix.org homeserver has played a key role in the growth of the ecosystem since the project started in 2014.

To help pay for the costs associated with providing a public homeserver, the Foundation is introducing premium accounts as announced in the blog post [here](/blog/2025/06/funding-homeserver-premium).

These new usage plans are being introduced in a phased manner and so not all new users will be placed on a plan automatically.

Where a user is not currently on a plan they may be changed to a free plan in the future, and will be notified in advance.

## Your Data, Your Choice

Matrix is a decentralised network by design, and the goal is to give the users the ability to choose where they would like to create their accounts, as it then gives them control over where their data is stored and who is looking after them.

This means that you don’t have to be using the matrix.org homeserver. You could choose to use another shared homeserver or you could have your own dedicated homeserver.

For those that want to have their own homeserver the Foundation maintains a list of [known hosting providers](/ecosystem/hosting/) that might be suitable for your needs.

## Pricing

Details of pricing have not yet been finalised, but will be published here once usage plans will be made available.

Pricing may change over time, as described in the [Homeserver Terms](/legal/terms-and-conditions#6-payment).

## Usage limits

Where a user account has been allocated to a plan the following usage limits apply:

|Usage|Free plan|Premium plan|
|-|-|-|
|Size of attachment that can be sent|10MB maximum per attachment|100MB maximum per attachment|
|Total size of attachments and [data usage](@/homeserver/pricing.md#faq-data-usage-limit)|100MB per 24 hours, up to 500MB per 28 days|1GB per 24 hours, up to 5GB per 28 days|
|Speed at which you can invite others to a room|Standard|10 times faster|

In accordance with [our terms](@/legal/terms-and-conditions.md#7-2-data-limits-and-fair-usage), where a user account is not on one of the above plans the following fair usage limits apply:

- Data usage limit of 500MB per 24 hour period, up to a limit of 2GB per 28 days apply

These limits may be reviewed and change over time as we refine our offering.

## FAQs

Please find the answers to some questions below. For anything else please refer to the [blog post](@/blog/2025/06/2025-06-11-funding-homeserver-premium.md) to answer your questions.

### What types of data count towards the usage limits? {#faq-data-usage-limit}

The following usage by matrix.org homeserver accounts currently contribute towards the limits:

- media/files that your Matrix clients send (includes thumbnails where applicable) via the [media upload API](https://spec.matrix.org/v1.15/client-server-api/#post_matrixmediav3upload)
- previews of links that your Matrix client requests via the [URL preview API](https://spec.matrix.org/v1.15/client-server-api/#get_matrixclientv1mediapreview_url)
- any other usage that stores data in the local [media/content repository](https://spec.matrix.org/v1.15/client-server-api/#content-repository) on your behalf

Some (non-exhaustive) examples of things that do not currently count towards the limits:

- media/files that you receive from other users in a room (whether on the matrix.org homeserver or another federated homeserver)
- the contents of messages/events that you send and receive (other than the media/file attachments above)
- the HTTPS data transfer to/from the matrix.org homeserver

### How can I see how much data I have used?

You can view your current data usage in the [Plan](https://account.matrix.org/account?action=org.matrix.plan_management) section of the My Account screens.

## Support

If you are on the premium plan then you can get support via email at [billing-support@matrix.org](mailto:billing-support@matrix.org).

## Legals

Usage of the public matrix.org homeserver and usage plans is subject to the [Matrix.org Foundation Privacy Policy](/legal/privacy-notice) and [Matrix.org Homeserver Terms](/legal/terms-and-conditions).
