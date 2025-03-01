+++
title = "Micropub support as an Application Service!"
path = "/blog/2015/07/29/micropub-support-as-an-application-service"

[taxonomies]
author = ["Kegan Dougal"]
category = ["Tech"]
+++

I was at <a href="http://indiewebcamp.com/2015/Edinburgh">IndieWebCamp Edinburgh</a> last week and during the hack day I <a href="https://github.com/Kegsay/matrix-as-micropub">created a Matrix Application Service</a> (AS) which could act as an IndieWeb <a href="http://indiewebcamp.com/Micropub">Micropub</a> client. Any Matrix message sent to the AS (<code>@micropub:domain</code>) would be converted to a request to a Micropub endpoint.

This required the AS to support <a href="http://indiewebcamp.com/IndieAuth">IndieAuth</a> - which it does by sending <code>!indieauth http://yourdomain.dom</code> to <code>@micropub:domain</code> which then returns an OAuth2 URL to login via. Currently, the AS just supports a 1:1 mapping from <code>m.text</code> to <code>h:entry</code> but in the future, it can be expanded to include categories and potentially the reverse mapping (where Micropub clients can act as Matrix users!).

Overall, it was a <a href="http://rhiaro.co.uk/2015/07/indiewebcamp-edinburgh-closes">great weekend</a> and I look forward to adding more support for IndieWeb protocols in the future.
