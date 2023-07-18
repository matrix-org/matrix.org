+++
title = "GDPR on matrix.org"
path = "/blog/2018/05/25/gdpr-on-matrix-org"

[taxonomies]
author = ["Thomas Lant"]
category = ["Privacy"]
+++

If you've connected to the matrix.org homeserver today, you'll have noticed some activity in support of GDPR compliance. The most obvious of these is an invite from <strong>System Alerts</strong> (aka @server:matrix.org):

<a href="/blog/wp-content/uploads/2018/05/system_alerts_invite.png"><img class="alignnone size-full wp-image-3247" src="/blog/wp-content/uploads/2018/05/system_alerts_invite.png" alt="" width="227" height="66" /></a>

We've rolled out the System Alerts feature to communicate important platform information to all of a homeserver's users. Today, we're using it to communicate the arrival of our new (and much-improved) <a href="/docs/guides/privacy_notice.html">Privacy Notice</a> and <a href="/docs/guides/terms_and_conditions.html">Terms and Conditions</a> to users on matrix.org.

The System Alerts service takes the form of an (unrejectable) invite to a room. We took this approach to support maximum compatibility with the myriad Matrix clients (since all Matrix clients can support conversations in a room ?).

When we first rolled out System Alerts, we didn't allow users leave the System Alerts room. Sorry! We got a bit overexcited - we've fixed that now (though please do provide your agreement before you leave).

## What do I need to do?

At some point today the System Alerts service will provide you with unique link, directing you to review the new terms and provide your agreement.

For us to process your personal data lawfully, it's <strong>really important</strong> that we know you understand and agree to our <a href="/docs/guides/privacy_notice.html">Privacy Notice</a> and <a href="/docs/guides/terms_and_conditions.html">Terms and Conditions</a>. For that reason, we will shortly be blocking any users who haven't indicated their acceptance, so please act quickly when you receive your link.

Once the block is enabled, users who haven't accepted the terms will see an error when they try and send a message, join a room, or send an invite. This message will also include the unique link to review and accept the terms, so users who haven't seen the message from System Alerts will know what to do.

Don't worry if you're reading this some time after May 25 - accepting the terms at any time will unblock message sending on your account, and you won't have missed any messages sent to you.

If you have any thoughts or suggestions on the legal documentation, you can provide comment <a href="https://github.com/matrix-org/matrix.org/tree/master/jekyll/_posts/guides">via github</a>.
