+++
date = "2025-11-19"
title = '"Exclude insecure devices" is coming'

[taxonomies]
author = ["Richard van der Hoff"]
category = ["Encryption", "Spec"]
+++

The Spec Core Team would like to remind everyone that, now that [MSC4153](https://github.com/matrix-org/matrix-spec-proposals/pull/4153) has been accepted, the Matrix spec recommends that “Encrypted to-device messages SHOULD NOT be sent to non-cross-signed devices”.

In short: if, as a user, you have client devices which haven’t been correctly cross-signed with your identity key, then you’re going to start finding yourself unable to read encrypted messages from other users on those devices.

If you missed [Andy’s talk](https://media.ccc.de/v/matrix-conf-2025-72625-invisible-crypto-can-matrix-be-both-secure-and-easy-to-use) on this at the Matrix Conference, we strongly recommend watching it as he explains the hows and whys of this change, but to summarise: this is an important improvement to the security of end-to-end encryption in Matrix.

As Andy also mentions in his talk, Element is planning to change the defaults in its clients to follow MSC4153’s recommendations to exclude non-cross-signed devices in **April 2026**. In preparation, the Element clients will very soon start to force users to verify their own devices so that those users are not shut out come April.

If you are a client developer, we encourage you to take a similar approach of encouraging users to verify their devices, so that they are not excluded from the conversation as the ecosystem moves towards MSC4153 compliance. And if you are a user, make sure your devices are verified!
