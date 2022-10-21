+++
title = "SSL Issues With Chromium"
path = "/blog/2016/11/14/ssl-issues-with-chromium"

[taxonomies]
author = ["David Baker"]
category = ["General"]
+++

It's been brought to our attention that some users are unable to connect to matrix.org and riot.im due to an SSL error, failing with, "NET::ERR_CERTIFICATE_TRANSPARENCY_REQUIRED". The cause of this is the Chromium bug detailed at <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=664177">https://bugs.chromium.org/p/chromium/issues/detail?id=664177</a>

In short, older versions of Chrome / Chromium (including Chromium v0.53 which is the default in ubuntu) will refuse to make SSL connections to matrix.org or riot.im because they are unable to verify that the certificates are in the certificate transparency log. This is because the build of Chromium is over 10 weeks old which means it now considers its certificate transparency log to be stale.

This issue is affecting all sites using certificates signed by Symantec and its subsidiaries (which includes amazon.com).

There's little we can do about this, short of completely changing our SSL certificate provider, but for users it should be fairly easy to work around by updating to a newer version of Chromium (which may be as simple as restarting the browser).

Update: see also <a href="https://sslmate.com/blog/post/ct_redaction_in_chrome_53">https://sslmate.com/blog/post/ct_redaction_in_chrome_53</a> and <a href="https://news.ycombinator.com/item?id=12953172">https://news.ycombinator.com/item?id=12953172</a> (top of HN right now)
