This is the previous set of notes on XMPP

### What is the difference between Matrix and XMPP?

We think of Matrix and XMPP as being quite different; at its core
Matrix can be thought of as an eventually consistent global JSON db with
an HTTP API and pubsub semantics - whilst XMPP can be thought of as a
message passing protocol. You can use them both to build chat systems;
you can use them both to build pubsub systems; each comes with different
tradeoffs. Matrix has a deliberately extensive 'kitchen sink' baseline
of functionality; XMPP has a deliberately minimal baseline set of
functionality. If XMPP does what you need it to do, then we're genuinely
happy for you :) Meanwhile, rather than competing, an XMPP Bridge like
[Skaverat's xmpptrix beta](https://github.com/SkaveRat/xmpptrix) or
[jfred's matrix-xmpp-bridge](https://github.com/jfrederickson/matrix-xmpp-bridge)
or Matrix.org's own [purple-matrix](https://github.com/matrix-org/purple-matrix/)
has potential to let both environments coexist and make the most of each
other's benefits.

TODO-M: above is good, the below is in a strange voice, assertive but then has equivocations in italics. Need opinions

The Matrix team used XMPP (Openfire, ejabberd, spectrum, asmack,
XMPPFramework) for IM before starting to experiment with open HTTP APIs
as an alternative in around 2012.  The main issues with XMPP that
drove us in this direction **as of 2012** were:

- Not particularly web-friendly - you can't easily speak XMPP from a
  web browser. *N.B. Nowadays you have options like XMPP-FTW and
  Stanza.io that help loads with letting browsers talk XMPP*
- Single logical server per MUC is a single point of control and
  availability. *MUCs can be distributed over multiple physical
  servers, but they still sit behind a single logical JID and domain.
  FMUC improves this with a similar approach to Matrix, but as of Oct
  2015 there are no open source implementations. The MIX XMPP extension
  also aims to address this limitation*.
- History synchronisation is very much a second class citizen feature
- Bridging to other protocols and defragmenting existing communication
  apps and networks is very much a second class citizen feature
- Stanzas aren't framed or reliably delivered without extensions. *See
  [wiki.xmpp.org](http://wiki.xmpp.org/web/Myths#Myth_Four:_XMPP_is_unreliable_without_a_bunch_of_extensions.)
  for an XMPP take on this*
- Multiple device support is limited. *Carbons and MAM aim to resolve this*
- Baseline feature set is so minimal that fragmentation of features
  between clients and servers is common, especially as interoperability
  profiles for features have fallen behind (as of July 2015)
- No strong identity system (i.e. no standard E2E PKI, unless you
  count X.509 certs, which [are
  questionable](http://www.thoughtcrime.org/blog/ssl-and-the-future-of-authenticity/))
- Not particularly well designed for mobile use cases: push;
  bandwidth-efficient transports. *Since the time of writing a [Push
  XEP has appeared](http://xmpp.org/extensions/xep-0357.html), and
  [wiki.xmpp.org](http://wiki.xmpp.org/web/Myths#Myth_Three:_It.27s_too_bandwidth-inefficient_for_mobile.)
  states that XMPP is usable over a 9600bps + 30s latency link.*

This said, the whole area of XMPP vs Matrix is quite subjective.
Rather than fighting over which open interoperable communication
standard works the best, we should just collaborate and bridge everything
together.  The more federation and interoperability the better.
