+++
title = "Welcoming the OpenMarket Matrix Gateway!"
path = "/blog/2015/02/26/welcoming-the-openmarket-matrix-gateway"

[taxonomies]
author = ["Oddvar Lovaas"]
category = ["General"]
+++

Last week, we mentioned that we released part of a first implementation of the long awaited <a title="Application Service (AS) API" href="http://matrix.org/docs/spec/#application-service-api">Application Service (AS) API</a> as part of the <a title="Synapse 0.7.1 released – with Application Service API" href="http://matrix.org/blog/2015/02/19/synapse-0-7-1-released-with-application-service-api/">0.7.1 release</a>. The AS API makes it dead simple to connect your service into the Matrix ecosystem using an existing standard Matrix server.

And today we're very excited that the first implementation using this API has gone live! <a title="OpenMarket" href="http://openmarket.com">OpenMarket</a> just announced the <a title="OpenMarket Matrix Gateway" href="http://www.openmarket.com/matrix/">OpenMarket Matrix Gateway</a> which lets you chat with non-Matrix users via their phone number: as you send and receive instant messages from your Matrix chat room, they'll receive and send SMSes back to you, which will appear in your Matrix room as IM, extending your reach to any non-Matrix user.

To use the new OpenMarket service just login to the matrix.org <a title="webclient" href="/beta/">webclient</a> and start a chat with your target mobile phone user by identifying him/her with a Matrix ID in the format <em>@+&lt;msisdn&gt;:matrix.openmarket.com</em> (msisdn being the internationally formatted phone number of your contact) - any messages to them will be sent via OpenMarket's SMS service. The SMSes will be sent from dynamically assigned numbers so that the recipient is able to respond to your message(s) - and the user will first receive an "opt-in" message from the OpenMarket Matrix Gateway to invite them to the conversation (just as they would if you invited them to a conversation in Matrix). Note that there are a finite set of these dynamically assigned numbers: OpenMarket reserves the right to recycle contact numbers if they have not been used to send or receive traffic for more than 2 months.

Sending SMS through the OpenMarket Matrix Gateway will be free during the introductory beta testing period, and users will be warned when that changes - although usage is subject to a per-user fair-usage policy. Despite the free service today, you'll have to associate a valid PayPal account to your account in order to send messages for security purposes. OpenMarket will not (and cannot) charge this account without your consent. You can associate your PayPal account via the settings page of any reference Matrix web client which has been configured to be aware of the OpenMarket Matrix Gateway - for example, the matrix.org <a title="webclient" href="/beta/#/settings">webclient</a>.

You'll also have to accept the OpenMarket Matrix API End User License Agreement to use the service.

The OpenMarket Matrix Gateway is a great example of how the Application Service API can be used to extend Matrix, we're really happy to see it live and hope it's going to give our community lots of ideas! There are a lot of services that could mutually benefit from being integrated with Matrix, and the AS API makes this much easier to accomplish!

Thus, we strongly urge you to have a look at the <a title="AS API" href="http://matrix.org/docs/spec/#application-service-api">AS API</a> - and as always we are happy to answer any questions at <a title="#matrix:matrix.org" href="/beta/#/room/#matrix:matrix.org">#matrix:matrix.org</a>!
