+++
title = "SDKs"
weight = 3
+++

SDKs are pieces of software meant for developers, that take care of the
technical Matrix protocol calls behind the scenes. They allow them to focus on
where they can add the most value.

There are two types of SDKs: clients (including bots) and appservices (used for
bots and sdks). If you are a developer and are not sure what the difference
between clients and appservices, please head to [the Developers documation](/docs/developers/).

## Client SDKs

Client SDKs are used to develop clients humans will interact with. They handle
all the Matrix heavy lifting and leave it up to the developer to implement a UI.

These are recommended SDKs if you want to write a client.

{{ sdk_table(type="client", featured=true) }}

If you're not happy with the recommended SDKs, you can try one of the the
following ones as well.

{{ sdk_table(type="client", featured=false) }}

## Bot SDKs

Bot SDKs are used to develop simple or advanced bots.

{{ sdk_table(type="bot", featured=true) }}

Or all bots frameworks

{{ sdk_table(type="bot", featured=false) }}

## Bridges SDKs

Bridges SDKs are used to create bridges, thus integrating third party platforms
in Matrix. For more information about bridges, please head to [Ecosystem > Bridges](/ecosystem/bridges)
and to the [Developers documentation](/docs/developers).
