+++
title = "SDKs"
weight = 3
+++

SDKs are pieces of software meant for developers, that take care of the
technical Matrix protocol calls behind the scenes. They allow them to focus on
where they can add the most value. If you're not a developer, this section of
the website is probably not for you.

There are two fundamental types of SDKs: clients and appservices. This
distinction is quite academical, and we went for a more pragmatic approach. You
will find below SDKs by type of product you may want to create (namely: clients,
bots, bridges). Don't be surprised if a same SDK appears in several sections!

If you are a developer and are not sure what the difference between clients and
appservices, please head to [the developers documentation](/docs/developers/).

## Client SDKs

Client SDKs are used to develop clients humans will interact with. They handle
all the Matrix heavy lifting and leave it up to the developer to implement a UI.

These are recommended SDKs if you want to write a client.

{{ sdk_table(type="client", featured=true) }}

If you're not happy with the recommended SDKs, you can try one of the following
ones as well.

{{ sdk_table(type="client", featured=false) }}

## Bot SDKs

Bot SDKs are used to develop simple or advanced bots. The following bots SDKs
are widely used in the Matrix ecosystem and are recommended by the Foundation:

{{ sdk_table(type="bot", featured=true) }}

If you're not happy with the recommended SDKs, you can try one of the following
ones as well.

{{ sdk_table(type="bot", featured=false) }}

## Bridge SDKs

Bridge SDKs are used to create bridges, thus integrating third party platforms
in Matrix. For more information about bridges, please head to [Ecosystem > Bridges](/ecosystem/bridges)
and to the [Developers documentation](/docs/developers).

The following bridges SDKs are widely used in the Matrix ecosystem and are
recommended by the Foundation:

{{ sdk_table(type="bridge", featured=true) }}

If you're not happy with the recommended SDKs, you can try one of the following
ones as well.

{{ sdk_table(type="bridge", featured=false) }}
