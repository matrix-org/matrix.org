# How does it work?

Matrix is really a **decentralised conversation store** rather than a messaging protocol.
When you send a message in Matrix, it is replicated over all the servers whose
users are participating in a given conversation - similarly to how commits are replicated between Git repositories.
There is no single point of control or failure in a Matrix conversation which spans multiple servers:
the act of communication with someone elsewhere in Matrix shares ownership of the conversation equally with them.
Even if your server goes offline, the conversation can continue uninterrupted elsewhere until it returns.

This means that every server has total self-sovereignty over its users data - and anyone can choose or run their own
server and participate in the wider Matrix network.
This is how Matrix democratises control over communication.

By default, Matrix uses simple [HTTPS+JSON APIs](https://spec.matrix.org/latest/client-server-api/#api-standards) as its
baseline transport, but also embraces more sophisticated transports such
as [WebSockets](https://github.com/matrix-org/matrix-doc/blob/master/attic/drafts/websockets.rst)
or [ultra-low-bandwidth Matrix](/blog/2019/03/12/breaking-the-100-bps-barrier-with-matrix-meshsim-coap-proxy) via CoAP+Noise.
