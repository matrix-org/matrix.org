+++
title = "Privacy Changes to New Vector Identity Servers"
date = "2019-07-19T16:35:44Z"
path = "/blog/2019/07/19/privacy-changes-to-new-vector-identity-servers"

[taxonomies]
author = ["Thomas Lant"]
category = ["Privacy"]
+++

As a step towards implementing Terms of Service for Sydent Identity Servers ([MSC2140](https://github.com/matrix-org/matrix-doc/pull/2140)), we're rolling out a couple of changes to the two Identity Servers run by New Vector (running at vector.im and matrix.org):

1. We have erased all of the data where there is any chance that the data subject didn't understand how, why or with whom their data was being shared.
1. We've made a change to Sydent so that it no longer persists new associations relating to users on homeservers not run by New Vector.

The impact of these changes is that users on homeservers not run by New Vector will no longer be discoverable by their email or telephone number via the Identity Servers running at vector.im and matrix.org. As we roll out the rest of the changes for Terms of Service for Identity Servers, this functionality will again be made available for users who make an informed choice to opt in.

## Registration with Email and Password Reset

In the short term, the New Vector Identity Servers will continue to support registration with email (signing up with an email address as well as a matrix username) and password reset. However, as we continue to improve Identity Server data hygiene practices, we will phase out their use in registration with email and password reset entirely. We have already made the change to Synapse to support password reset without relying on an Identity Server (though this can optionally be re-enabled).

Once Synapse can support registration with email without relying on an Identity Server **we will announce a schedule for disabling registration with email and password reset in our Identity Servers entirely**. After this point, homeserver administrators will have to make sure their homeservers are configured to send email to keep registration with email and password reset working. More details on this to follow - please watch this space.
