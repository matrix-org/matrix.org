+++
title = "Breaking the 100bps barrier with Matrix, meshsim & coap-proxy"
path = "/blog/2019/03/12/breaking-the-100bps-barrier-with-matrix-meshsim-coap-proxy"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News"]
+++

Hi all,

Last month at FOSDEM 2019 we gave a <a href="https://fosdem.org/2019/schedule/event/matrix/">talk</a> about a new experimental ultra-low-bandwidth transport for Matrix which swaps our baseline HTTPS+JSON transport for a custom one built on <a href="https://tools.ietf.org/html/rfc7252">CoAP</a>+<a href="https://tools.ietf.org/html/rfc7049">CBOR</a>+<a href="https://noiseprotocol.org">Noise</a>+<a href="https://golang.org/pkg/compress/flate/">Flate</a>+<a href="https://tools.ietf.org/rfc/rfc768.txt">UDP</a>.  (CoAP is the RPC protocol; CBOR is the encoding; Noise powers the transport layer encryption; Flate compresses everything uses predefined compression maps).

The challenge here was to see if we could demonstrate Matrix working usably over networks running at around 100 bits per second of throughput (where it'd take 2 minutes to send a typical 1500 byte ethernet packet!!) and very high latencies.  You can see the original FOSDEM talk below, or <a href="/blog/wp-content/uploads/2019/02/2019-02-03-FOSDEM-Low-Bandwidth.pdf">check out the slides here.</a>

<iframe src="https://www.youtube.com/embed/DZBvy4abB1o"frameBorder="0" allowFullScreen="allowfullscreen"></iframe>

Now, it's taken us a little while to find time to tidy up the stuff we demo'd in the talk to be (relatively) suitable for public consumption, but we're happy to finally release the four projects which powered the demo:
<ul>
 	<li><a href="https://github.com/matrix-org/meshsim">https://github.com/matrix-org/meshsim</a> - meshsim is the network simulator which provides an interactive web interface to draw a network topology and let you spin up dockerized homeservers on a simulated network with whatever preferred latency, jitter, packet loss etc.</li>
 	<li><a href="https://github.com/matrix-org/meshsim-docker">https://github.com/matrix-org/meshsim-docker</a> - meshsim-docker is the custom synapse + coap-proxy Dockerfile used to define the containers which meshsim instantiates</li>
 	<li><a href="https://github.com/matrix-org/coap-proxy">https://github.com/matrix-org/coap-proxy</a> - coap-proxy is the golang proxy which converts HTTPS+JSON into CoAP+CBOR+Noise+Flate and vice versa, letting you squish Matrix CS API and SS API traffic in & out of CoAP.</li>
 	<li><a href="https://github.com/matrix-org/go-coap">https://github.com/matrix-org/go-coap</a> - go-coap is a fork of the <a href="https://github.com/Kistler-Group">Kistler-Group</a>'s <a href="https://github.com/go-ocf/go-coap">go-ocf/go-coap</a> (in turn originally a fork of <a href="https://github.com/dustin/go-coap">dustin/go-coap</a>) which adds encryption using <a href="https://noiseprotocol.org">Noise</a>, retries, and hooks for compression.</li>
</ul>
In order to get up and running, the <a href="https://github.com/matrix-org/meshsim/blob/master/README.md">meshsim README</a> has all the details.

It's important to understand that this is very much a proof of concept, and shouldn't be used in production yet, and almost certainly has some glaring bugs.  In fact, it currently assumes you are running on a trusted private network rather than the public Matrix network in order to get away with some of the bandwidth optimisations performed - see <a href="https://github.com/matrix-org/coap-proxy#limitations">coap-proxy's Limitations section</a> for details.  Particularly, please note that the encryption is homemade and not audited or fully reviewed or tested yet.  Also, we've released the code for the low-bandwidth transport, but we haven't released the "fan-out routing" implementation for Synapse as it needs a <a href="https://yggdrasil-network.github.io/">rethink</a> to be applicable to the public Matrix network.  You'll also want to run Riot/Web in <a href="https://github.com/matrix-org/matrix-react-sdk/pull/2598">low-bandwidth mode</a> if you really wind down the bandwidth (suppressing avatars, read receipts, typing notifs and presence to avoid wasting precious bandwidth).

We also don't have an MSC for the CoAP-based transport yet, mainly due to lack of time whilst wanting to ensure the limitations are addressed first before we propose it as a formal alternative Matrix transport.  (We also first need to define negotiation mechanisms for entirely alternative CS & SS transports!).  However, the quick overview is:
<ul>
 	<li>JSON is converted directly into CBOR (with a few substitutions made to shrink common patterns down)</li>
 	<li>HTTP is converted directly into CoAP (mapping the verbose API endpoints down to single-byte endpoints)</li>
 	<li>TLS is swapped out for <a href="https://noiseprotocol.org/noise.html#noise-pipes">Noise Pipes</a> (XX + IK noise handshakes).  This gives us 1RTT setup (XX) for the first connection to a host, and 0RTT (IK) for all subsequent connections, and provides trust-on-first-use semantics when connecting to a server.  You can see the Noise state machine we maintain in go-coap's <a href="https://github.com/matrix-org/go-coap/blob/master/noise.go">noise.go</a>.</li>
 	<li>The CoAP headers are hoisted up above the Noise payload, letting us use them for framing the noise pipes without having duplicated framing headers at the CoAP & Noise layers.  We also <a href="https://github.com/matrix-org/go-coap/blob/e156f6bb5d3c728040ceffd09685610128d3c63c/conn.go#L340-L371">frame the Noise handshake packets as CoAP</a> with custom message types (250, 251 and 252).  We might be better off using <a href="https://github.com/core-wg/oscoap">OSCORE</a> for this, however, rather than hand-wrapping a custom encrypted transport...</li>
 	<li>The CoAP payload is compressed via <a href="https://golang.org/pkg/compress/flate/">Flate</a> using preshared compression tables derived from compressing large chunks of representative Matrix traffic. This could be significantly improved in future with streaming compression and dynamic tables (albeit seeded from a common set of tables).</li>
</ul>
The end result is that you end up taking about 90 bytes (including ethernet headers!) to send a typical Matrix message (and about 70 bytes to receive the acknowledgement).  This breaks down as as:
<ul>
 	<li>14 bytes of Ethernet headers</li>
 	<li>20 bytes of IP headers</li>
 	<li>8 bytes of UDP headers</li>
 	<li>16 bytes of Noise AEAD</li>
 	<li>6 bytes of CoAP headers</li>
 	<li>~26 bytes of compressed and encrypted CBOR</li>
</ul>
The Noise handshake on connection setup would take an additional 128 bytes (4x 32 byte Curve25519 DH values), either spread over 1RTT for initial setup or 0RTT for subsequent setups.

At 100bps, 90 bytes takes 90*8/100 = 7.2s to send... which is just about usable in an extreme life and death situation where you can only get 100bps of connectivity (e.g. someone at the bottom of a ravine trying to trickle data over one bar of GPRS to the emergency services).  In practice, on a custom network, you could ditch the Ethernet and UDP/IP headers if on a point-to-point link for CS API, and ditch the encryption if the network physical layer was trusted - at which point we're talking ~32 bytes per request (2.5s to send at 100bps).  Then, there's still a whole wave of additional work that could be investigated, including...
<ul>
 	<li>Smarter streaming compression (so that if a user says 'Hello?' three times in a row, the 2nd and 3rd messages are just references to the first pattern)</li>
 	<li>Hoisting Matrix transaction IDs up to the CoAP layer (reusing the CoAP msgId+token rather than passing around new Matrix transaction IDs, at the expense of requiring one Matrix txn per request)</li>
 	<li>Switching to CoAP OBSERVE for receiving data from the server (currently we long-poll /sync to receive data)</li>
 	<li>Switching access_tokens for PSKs or similar</li>
</ul>
...all of which could shrink the payload down even further.  That said, even in its current state, it's a massive improvement - roughly ~65x better than the equivalent HTTPS+JSON traffic.

In practice, <strong>further work on low-bandwidth Matrix is dependent on finding a sponsor who's willing to fund the team to focus on this</strong>, as otherwise it's hard to justify spending time here in addition to all the less exotic business-as-usual Matrix work that we need to keep the core of Matrix evolving (finishing 1.0, finishing E2E encryption, speeding up Synapse, finishing Dendrite, rewriting Riot/Android etc).  However, the benefits here should be pretty obvious: massively reduced bandwidth and battery-life; resilience to catastrophic network conditions; faster sync times; and even a protocol suitable for push notifications (Matrix as e2e encrypted, decentralised, push!).  If you're interested in supporting this work, please contact <code>support at matrix.org</code>.
