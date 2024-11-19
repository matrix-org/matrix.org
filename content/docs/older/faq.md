+++
title = "FAQ"
aliases = ["/faq", "/faq-ru/"]
+++

<!-- markdownlint-disable-next-line single-h1 -->
# Frequently Asked Questions

## Intro

### Basics

#### What is Matrix?

Matrix is an open standard for interoperable, decentralised, real-time
communication over IP. It can be used to power Instant Messaging, VoIP/WebRTC
signalling, Internet of Things communication - or anywhere you need a standard
HTTP API for publishing and subscribing to data whilst tracking the
conversation history.

The Matrix.org Foundation defines the standard, and provides open source
implementations of [Matrix-compatible Servers](/ecosystem/servers), [Client
SDKs](/ecosystem/sdks) and [Application Services](/ecosystem/bridges) to help
you create new communication solutions or extend the capabilities and reach of
existing ones.

#### What is Matrix's mission?

Matrix’s initial goal is to fix the problem of fragmented IP communications:
letting users message and call each other without having to care what app the
other user is on - making it as easy as sending an email.

The longer term goal is for Matrix to act as a generic HTTP messaging and data
synchronisation system for the whole web - allowing people, services and
devices to easily communicate with each other, empowering users to own and
control their data and select the services and vendors they want to use.

#### What does this mean for users?

The aim is to provide an analogous ecosystem to email - one where you can
communicate with pretty much anyone, without caring what app or server they are
using,
using whichever [client app](/ecosystem/clients) & [server](/ecosystem/servers) you chose,
and use a neutral identity system like an
e-mail address or phone number to discover people to talk to.

#### Why are you called Matrix?

We are called Matrix because we provide a structure in which all communication
can be matrixed together.

No, it’s nothing to do with the film (although
[Third Room](https://thirdroom.io) builds virtual worlds on top of Matrix 😎).

#### What does Matrix provide?

* [Open Standard HTTP APIs](https://spec.matrix.org) for transferring JSON
  messages (e.g. instant messages, WebRTC signalling), including:
    * [Client-Server API](https://spec.matrix.org/latest/#client-server-api-v1) - defines how Matrix
    compatible clients communicate with Matrix homeservers.
    * [Server-Server API](https://spec.matrix.org/latest/server-server-api/) - defines how Matrix
    homeservers exchange messages and synchronise history with each other.
    * [Application Service API](https://spec.matrix.org/latest/application-service-api/) - defines how to
    extend the functionality of Matrix with 'integrations' and bridge to other
    networks.
    * [Modules](https://spec.matrix.org/v1.4/client-server-api/#modules) - specifies
    features that must be implemented by particular classes of clients.
* Open source implementations of:
    * Client SDKs (Javascript, Web (React), iOS, Android, Rust)
    * Homeservers (Synapse)
    * Application Services (bridges to IRC, Slack, Skype, Lync and more...)
* The actual ecosystem and community of everyone running Matrix servers and
  services
* Loads of 3rd party contributions of clients, SDKs, servers and services.
* You can find the full list of Matrix enabled projects at
  <https://matrix.org/try-matrix>

### Who and how?

#### What kind of company is Matrix.org?

[The Matrix.org Foundation](/about) is a non-profit UK Community Interest
Company, incorporated to act as the neutral guardian of the standard on behalf
of the whole Matrix community. It is an open initiative which acts as a neutral
and independent custodian of the Matrix standard.

The Foundation defines the manifesto, mission and values of the project, the
open governance process that determines how the specification develops, and
provides a safety-net to ensure the project stays independent and true to its
goals.

#### How is Matrix.org funded?

Matrix.org is currently funded by the community, through a combination of
community support (via [Patreon](https://patreon.com/matrixdotorg), [Liberapay]
(<https://liberapay.com/matrixdotorg>), Bitcoin and Ethereum), corporate
sponsorship, and grant funding.

Current Elliptic-level supporters on Patreon and corporate sponsors can be found
on our [supporters page](/supporters).

If you would like to support the core Matrix team as a member of the community,
you can do so via:

* [Patreon](https://patreon.com/matrixdotorg)
* [Liberapay](https://liberapay.com/matrixdotorg)
* Bitcoin (address: 1LxowEgsquZ3UPZ68wHf8v2MDZw82dVmAE)
* Ethereum (address: 0xA5f9a4f9E024F6D727f7afdA9257e22329A97485)

If you would like to sponsor the team as a corporation, or are interested in
paying for prioritised or custom development, please [get in touch](https://matrix.org/contact).

For the first three years of Matrix's development (2014-2017), most of the core
contributors worked for [Amdocs](https://www.amdocs.com), who paid for them to
work fulltime on Matrix. In July 2017, Amdocs considered the project to be
sufficiently successful that it could now self-support and so stopped funding.
The majority of the core team is now employed by [Element](https://element.io),
an independent company set up to hire the team and
support Matrix's development. Other contributors are funded by their own
employers or donate their own time to the project.

#### Who is building Matrix?

The core team is \~12 people with extensive experience in building custom VoIP
and Messaging apps for mobile network operators. Most of us work for Element,
but there are an increasing number of contributors from other companies and
folks all over the internet.

### Concept

#### Why have you released this as open source?

We believe that any open standard defining interoperable communication needs to
be justified, demonstrated and validated with transparent open source
implementations. For Matrix to achieve its mission of making all communications
services interoperable we believe it needs to be truly open, giving people
access to take all the code we produce and to use and build on top of it.

#### What do you mean by open?

Matrix is an open standard, meaning that we have freely published the details
for how to communicate interoperably using the Matrix set of HTTP APIs. We
encourage anyone and everyone to use the APIs and build their own projects
which implement them and so benefit from interoperability with the rest of the
Matrix ecosystem. We also ensure the standard is not encumbered by any known
patent licensing requirements.

Matrix is also open source, meaning that we have released the source code of the
reference servers, clients and services to the public domain under the [Apache
Licence v2](https://www.apache.org/licenses/LICENSE-2.0.html),
to encourage anyone and everyone to run their own servers and clients, and enhance them and
contribute their enhancements as they see fit.

#### What does federated mean?

Federation allows separate deployments of a communication service to communicate
with each other - for instance a mail server run by Google federates with a
mail server run by Microsoft when you send email from `@gmail.com` to
`@hotmail.com`.

interoperable clients may simply be running on the same deployment - whereas in
federation the deployments themselves are exchanging data in a compatible
manner.

Matrix provides open federation - meaning that anyone on the internet can join
into the Matrix ecosystem by deploying their own server.

#### How is this like e-mail?

The [history of email](https://en.wikipedia.org/wiki/History_of_email) is
instructive when thinking about the importance of interoperability.

Early email systems behaved as isolated communities which only allowed you to
exchange mail with users on the same system. If you got your email from one
service and your friend from another, then you couldn't message each other.
This is basically the situation we're in today with VoIP and IM.

#### Why has no one done this before?

There have been several attempts before including RCS.

All of these have had some level of success, but many different
technological/usability/economic factors have ended up limiting their success.
Unfortunately, we've not ended up in a world where everyone has a SIP URI or
Jabber ID on their business card, or a phone that actually uses RCS.

Take a look at the Comparisons section for a more detailed look at how Matrix
compares to other projects.

### Practical

#### What can I actually do with this?

A typical [client](/ecosystem/clients) provides a simple chatroom interface to
Matrix - letting the user interact with users and rooms anywhere within the
Matrix federation. Text and image messages are supported, as well as voice and
video calling via WebRTC in one-to-one rooms and via Jitsi elsewhere.

#### How can I get involved?

There are plenty of ways to get involved. First, create a user account and come say hi on [#matrix:matrix.org](https://matrix.to/#/#matrix:matrix.org)!

Then...

* Install synapse and tell us how you get on.
* [Critique what has been proposed](https://spec.matrix.org/proposals/).
* Write [clients](/ecosystem/clients).
* Write [bridges](/ecosystem/bridges)! Run bridges!
* Nose around in [the repositories in our GitHub organizatio
  n](https://github.com/matrix-org) and send us some pull requests to fix some
  bugs or add some features!
* You could even try to write a homeserver (but be warned, Matrix's architecture
  makes homeservers orders of magnitude harder than clients or bridges.)

See [our contributor guide](https://matrix-org.github.io/synapse/latest/development/contributing_guide.html) for full
details on how to contribute to the project. All are welcome!

#### Where can I get support?

The point of entry for everything matrix is [#matrix:matrix.org](https://matrix.to/#/#matrix:matrix.org) aka #matrix on irc.libera.chat.

If you're a developer and are looking to get involved with building something on
Matrix, try [#matrix-dev:matrix.org](https://matrix.to/#/#matrix-dev:matrix.org).

If you host a Synapse homeserver,
you can get support in the [#synapse:matrix.org](https://matrix.to/#/#synapse:matrix.org) room

#### How do I create a link to a Matrix room or user?

You can link to a Matrix room or user by going to [matrix.to](https://matrix.to)
, and typing in the room alias or ID for linking to rooms, or a user's Matrix
ID for linking to users. There is also a `matrix:` URL scheme for Matrix rooms
and users, similar to email's `mailto:` scheme, or XMPP's `xmpp:` scheme.

## Usage

### As a user

#### What clients are available?

There are many clients available, ranging from the glossy mass-market to the geeky command-line. There's even an emacs macro.

The most popular and established client is Element, available on web, desktop, Android and iOS.

To get a list of all the clients we're aware of, head to [the clients page](/ecosystem/clients)

#### What bridges to other networks are available?

There are a large number of 'bridges' which integrate existing communication
networks into Matrix. This list is growing rapidly, and you can find bridges
both written by the Matrix core team and contributed by the wider community.
We maintain [a list of all the bridges we heard about](/ecosystem/bridges).

#### How do I get an account and get started?

The quickest way is to pick a client and sign up.

Clients can access any homeserver—you don't have to use matrix.org, though
historically it is the largest public homeserver. anchel.nl lists [free public
homeservers](https://joinmatrix.org/servers/), and a few other resources for
getting started.

#### How can I get a rooms list from matrix.org?

If you're using Element, you can use the "Explore" screen, which you open from a
button next to the search box on the right.

It you're working on a client, you can use the Client-Server API to get a list
of public rooms.

### Tech

#### How do I Matrix-enable my existing app?

If your app doesn't have any communication capability already, you'll want to
use one of the [Matrix client SDKs](/ecosystem/sdks) to add it in. These come
in different levels of sophistication - ranging from a simple HTTP API wrapper
through to reusable UI components.

#### Can I write a Matrix homeserver?

Yes. Matrix is just a spec, and implementations of the spec are very welcome!
Synapse is the most well-distributed homeserver, but Dendrite and Conduit are
other projects aiming to implement the server component.

#### Why HTTP? Isn't it bad? Why don't you use websockets/CoAP/HTTP2/etc?

HTTP may not be the most efficient transport, but it is ubiquitous, very well
understood and has numerous implementations on almost every platform and
language. It also has a simple upgrade path to HTTP/2, which is relatively
bandwidth and round-trip efficient.

For these reasons it has been chosen as the mandatory baseline of the exchange,
but it is still entirely possible to use other protocols for communication
between clients and server (see for example this websocket transport spec
proposal), and it's also possible in the future that negotiation of more
efficient protocols will be added for the federation between servers, with
HTTP+JSON remaining as the compatibility baseline.

### Self-hosting

#### How do I join the global Matrix federation?

You can choose a client and create a user account on an existing homeserver.

To host your own, start by looking at recommended guides for installing
Synapse.

#### Can I run my own identity server?

See also: What is an identity server?

Yes - the reference implementation is sydent and you can run your own ID server
cluster that tracks 3rd party to Matrix ID mappings. This won't be very useful
right now, though, and we don't recommend it.

If you want your server to participate in the global replicated Matrix ID
service then please get in touch with us. Meanwhile, we are looking at ways of
decentralising the 'official' Matrix identity service so that identity servers
are 100% decentralised and can openly federate with each other. N.B. that you
can use Matrix without ever using the identity service - it exists only to map
3rd party IDs (e.g. email addresses) to matrix IDs to aid user discovery.

#### Why can't I rename my homeserver?

Currently, the homeserver name is assumed never to change. This means that if
you rename your server, other servers will think it's a different server.

Perhaps in the future we will add an API for changing the homeserver name, but
for now this is not supported.

## Detail

### Position in the world

#### Why do you think existing apps will ever join this officially?

We firmly believe it is what is right for the consumer. As people begin to use
interoperable communications tools, service providers will see the benefit and
compete on quality of service, security and features rather than relying on
locking people into their walled garden. We believe as soon as users see the
availability and benefits of interoperable services they will demand it.

#### Why aren't you doing this through the IETF? or W3C? or 3GPP?

We do recognise the advantages of working with existing standards bodies. We
have been focused on writing code and getting it out, and the standard has been
evolving rapidly since initial release in September 2014. Once the standard has
matured sufficiently it may well be appropriate to work with an official
standard body to maintain it going forwards.

#### What is the current project status?

A very quick recap by-the-numbers (updated May 2020):

* Started out in Sept 2014
* Released Matrix 1.0 in June 2019
* \~17M global visible accounts
* \~4.6M messages per day
* \~7.2M unbridged accounts
* \~500K unbridged messages per day
* \~5.1M rooms that Matrix.org participates in
* \~20,000 federated servers
* \~3000 msgs/s out, \~30 msgs/s in on Matrix.org
* \~400 projects building on Matrix
* \~70 companies building on Matrix

As of September 2019, the Matrix ecosystem has dozens of independent homeserver
hosts, many bridges and is under active development.

#### Why Apache Licence?

See also: What do you mean by open?

The Apache Licence is a permissive licence. We want the Matrix protocol itself
to be free and open, but people are free to create both free and commercial
apps and services that uses the protocol. In our opinion, any Matrix-service
only enhances the Matrix ecosystem.

### Comparisons

#### What is the difference between Matrix and IRC?

We love IRC. In fact, prior to the point where Element was stable enough for
daily use IRC was our primary communication tool. Between us we've written
IRCds, IRC bots and admined dreamforge, UnrealIRCd, epona, ircservices and
several others. That said, it has some limitations that Matrix seeks to improve
on:

* Text only
* No history
* No multiple-device support
* No presence support
* Fragmented identity model
* No open federation
* No standard APIs, just a rather limited TCP line protocol
* Non-standardised federation protocol
* No built-in end-to-end encryption
* Disruptive net-splits
* Non-extensible

[IRCv3](https://ircv3.net) exists and is addressing some of these issues; this
is great news and we wish them well. It's almost a contradiction in terms to
get competitive between openly interoperable communication projects - in fact
there there already exist mature Matrix-IRC bridges.
[matrix-appservice-irc](https://github.com/matrix-org/matrix-appservice-irc/) is currently used to
bridge with [Libera.Chat](https://libera.chat) and many other IRC networks.

#### What is the difference between Matrix and XMPP?

We think of Matrix and XMPP as being quite different; at its core Matrix can be
thought of as an eventually consistent global JSON database with an HTTP API
and pubsub semantics - whilst XMPP can be thought of as a message passing
protocol. You can use them both to build chat systems; you can use them both to
build pubsub systems; each comes with different tradeoffs. Matrix has a
deliberately extensive 'kitchen sink' baseline of functionality; XMPP has a
deliberately minimal baseline set of functionality. If XMPP does what you need
it to do, then we're genuinely happy for you! Meanwhile, rather than competing,
an XMPP Bridge like Matrix.org's own purple-matrix has potential to let both
environments coexist and make the most of each other's benefits.

The whole area of XMPP vs Matrix is quite subjective. Rather than fighting over
which open interoperable communication standard works the best, we should just
collaborate and bridge everything together. The more federation and
interoperability the better.

#### How does Matrix compare with something like Trillian or Pidgin?

Trillian and Pidgin and similar aggregating IM clients merge all your IM
activity into a single app. However, your history and identity is still
fragmented across the networks. People can't find you easily, and your history
is fragmented (other than on the device where the client runs). And rather than
being able to chose the right app for the job when communicating with people,
you are pushed towards relying on a specific aggregation app.

Matrix lets you get the best of both worlds by linking to all the different
networks (XMPP, AIM, ICQ, Lync, Skype etc) on the serverside, using bridges
which can be run by anyone. Matrix then provides a simple standard HTTP API to
access any of these networks, and lets you choose whichever client you prefer
(either as a 'native' Matrix client or using a non-Matrix client from one of
the networks which has been bridged in).

### More Detail

#### What is a client?

Users in Matrix use one or more clients to communicate. This could be any
combination of a web client, a command line client, a mobile client - or
embedded clients built into existing apps. It could even be a piece of
hardware (e.g. a drone) that is Matrix enabled.

#### Can I use Matrix without installing a Matrix client?

Yes! An ever increasing number of protocols are being bridged into Matrix, so if
you use something like IRC on Libera.Chat you may well be indirectly benefiting
from Matrix, as others may be connected into the IRC channel via Matrix.

#### What is a homeserver?

A user's client connects to a single homeserver, which stores the communication
history and account information for that user, and shares data with the wider
Matrix ecosystem by synchronising communication history with other
homeservers.

#### What is a MXID?

Matrix user IDs (MXID) are unique user IDs. They are in the format
`@username:homeserver.tld` (this format is used to avoid confusing them with
email addresses.) They are intended to be fairly hidden (although right now
they are not) - instead you will find and identify other users via 3PIDs.

#### What is a 3PID?

Third-party IDs (3PIDs) are IDs from other systems or contexts, such as email
addresses, social network accounts and phone numbers.

#### What is an identity server?

Users in Matrix are identified internally via their 3PID namespaces such as
email addresses or phone numbers should be used publicly to identify Matrix
users, at least for invitation purposes. A Matrix "Identity" describes both the
user ID and any other existing IDs from third party namespaces linked to their
account.

Matrix users can link third-party IDs (3PIDs) to their user ID. Linking 3PIDs
creates a mapping from a 3PID to a user ID. This mapping can then be used by
Matrix users in order to discover the MXIDs of their contacts.

In order to ensure that the mapping from 3PID to user ID is genuine, the
intention is for a globally federated cluster of trusted "Identity Servers"
(IS) be used to verify the 3PID and persist and replicate the mappings. Usage
of an IS is not required in order for a client application to be part of the
Matrix ecosystem. However, without one clients will not be able to look up user
IDs using 3PIDs.

The precise architecture of identity servers is currently in flux and subject to
change as we work to fully decentralise them.

#### Where do my conversations get stored?

Each replicated across all of the homeservers whose users are participating in a
given room.

#### What are redactions?

Since events are extensible it is possible for malicious users and/or servers to
add keys that are, for example offensive or illegal. Since some events cannot
be simply deleted (e.g. membership events) we instead 'redact' events,
essentially stripping the event of all keys that are not required by the
protocol. Redacting an event cannot be undone, allowing server owners to also
delete the offending content from the databases.

#### Can I log into other homeservers with my username and password?

Currently, no. We are looking at options for decentralising or migrating user
accounts between multiple servers, and might add this feature at a later
stage.

#### What are spaces?

Spaces are a collections of rooms. [#community:matrix.org](https://matrix.to/#/community:matrix.org)
is the official matrix community
space containing rooms managed by the core Matrix team.

Spaces are the replacements for the deprecated communities which were also known
as groups. Other than groups a space itself is a Room

### Architecture

#### How does Matrix actually work architecturally?

For an introduction to the Matrix architecture, see
<https://spec.matrix.org/latest/#architecture>.

#### What is a room?

For a more thorough introduction see:
<https://spec.matrix.org/latest/#room-structure>.

A room is a conceptual place where users can send and receive events. Events are
sent to a room, and all participants in that room with sufficient access will
receive the event.

### Bridging

#### Why don't you use separate homeserver instances to improve bridging performance?

For example:

> Is there any merit in a proposal that the current matrix.org Freenode bridge
  could be taken off matrix.org and put on a new HS (at a new server-name
  domain such as freenode.matrix.org) so as to not be bogged down in
  performance?

The Matrix.org Foundation currently runs one homeserver: matrix.org. This
homeserver is operationally intensive and can sometimes suffer from slow
response times. However running two homeservers would not improve performance,
because the work done to maintain one homeserver would need to be duplicated.
Also, the traffic on the bridge instance would be intensive just by itself.
Running two intensive homeservers, where optimisations such as caching and
federation traffic batching would need to be duplicated would have a marked
decrease in overall performance.

Running the bridge on another homeserver means the same traffic will be hitting
matrix.org, except it now has to be handled by the federation inbound workers
too. Now you have two hosts handling the same amount of traffic. You might see
a benefit to federated homeservers, but the new homeserver will struggle just
as much with inbound/outbound federation slowness as it does now with
bridging.

Further, it may turn out that the ongoing work on Synapse to introduce shared
master processes actually makes it so much more efficient that whole benefit of
creating two homeservers is now moot.

### Encryption

#### What does End-to-End (E2E) encryption mean?

End-to-End encryption describes a scenario where a message is encrypted at the
device or client of the sender, and is only decrypted by the device or client
of the receiver, with no decryption or reading performed on the server.

#### What is the status of E2E?

End-to-End Encryption is fully supported in Matrix. New rooms have encryption
enabled by default, and all existing rooms can optionally have End-to-End
Encryption turned on.

#### Which matrix clients support E2E?

Head to the [clients](/ecosystem/clients) section to get an up to date overview
of what features they support (including E2EE).

#### Why are large public rooms like #matrix:matrix.org not encrypted?

There is no value in encrypting public rooms. If anyone can join the room then
encryption does not protect the contents, and may offer inconvenience for some
users.

### The Spec

#### What is The Spec?

The Matrix Specification describes and prescribes the interaction between
Application Services and more.

The spec is available to read on matrix.org.

To contribute to the development of the Matrix Specification, see
<https://spec.matrix.org/proposals/>.

#### Where is The Spec?

You can view the spec at <https://spec.matrix.org>.

#### How can I contribute to The Spec?

To contribute to the Matrix Specification, first [take a look at the
documentation as it is currently written](https://spec.matrix.org), then review
[the process for new proposals](https://spec.matrix.org/proposals/). You should
start by writing a publicly-accessible proposal describing your change.

To see the proposals currently under discussion,join us in [#matrix-spec:matrix.org](https://matrix.to/#/#matrix-spec:matrix.org)

#### What is the process for adding Spec proposals?

See the documentation at <https://spec.matrix.org/proposals>. In summary:

* Produce a publicly-accessible proposal describing your change
* Make a new issue at <https://github.com/matrix-org/matrix-spec-proposals/issues>
, and include the metadata as described
* Gather feedback as widely as possible from the community and core team on the
  proposal
* Show an implementation to prove that it works well in practice, iterate where
  needed.
* Make a new spec PR which includes the changes as implemented against the
  `main` branch of this repository

#### What's an MSC?

"MSC" refers to Matrix Spec Change, each proposal is assigned an MSC number to
make referencing them easier.

MSC numbers are taken from GitHub issues on the matrix-doc repo. To see a list
of all active MSCs, and to understand how to contribute your own, see
<https://spec.matrix.org/proposals>.

### VoIP

#### How do you do VoIP calls on Matrix?

Voice (and video) over Matrix uses the WebRTC 1.0 standard to transfer call
media (i.e. the actual voice and video traffic). Matrix is used to signal the
establishment and termination of the call by sending call events, like any
other event.

#### Are VoIP calls encrypted?

WebRTC encrypts the media that's being sent. The signalling events that set up
(and end) the call are encrypted if the room they were sent in has enabled
encryption.

#### Do I need a TURN server?

VoIP calls should work if both parties are on public networks. However, in
practice one (or both) devices are often behind NAT, and so having a TURN
server is important to help set up the call.

See this guide for setting up a TURN server with Synapse.

### Synapse

#### What is Synapse?

Synapse is a Matrix "homeserver" implementation developed by the matrix.org core
team, written in Python 3/Twisted. It is intended to showcase the concept of
Matrix and let folks see the spec in the context of a codebase and let you run
your own homeserver and generally help bootstrap the ecosystem.

#### How do I install Synapse?

Take a look at the Synapse Installation Guide. There are options for installing
using docker and/or ansible, plus manual installation instructions.

#### Will Synapse share my chat data with other servers in the federation?

Federation in Matrix means that data is only shared between servers of
participating users of a room. If all users in a room are on your server, no
data is shared with other servers.

#### Why is the state_groups_state table so large? What is it storing?

Room state takes up a lot of space! To be specific, regular snapshots are taken
of room states, so you can rapidly find out the state for historical events.

Why is it so important to record this, and to know the past room state including
full member list?

It's needed to enable access control and state resolution, for example the
homeserver needs to be able to decide:

* "who can see this message at that point in time?"
* "what was the state of the room was when this message was received, and so is
   it allowed to be received?" Synapse stores these snapshots approximately
   every 100 messages, with deltas in between.

## Definitions

<!-- markdownlint-disable line-length -->
| Term              | Definition                                               |
|-------------------|----------------------------------------------------------|
| Client            | Users in Matrix use one or more clients to communicate. This could be any combination of a web client, a command line client, a mobile client - or embedded clients built into existing apps. It could even be a piece of hardware (e.g. a drone) that is Matrix enabled. |
| matrixed together | In mathematics, a matrix is a lattice-like arrangement, in which expressions can be combined and treated as a single entity |
| homeserver        | Each account in the Matrix federation is associated with a single homeserver. The software running at this server stores the history and account information for that user. Homeservers synchronise message history with other homeservers. |
| Synapse           | Synapse is a homeserver implemented in Python by the matrix.org core team. It is currently by far the most installed homeserver available. |
| interoperable     | A more general definition of interoperability is for systems to be able to freely exchange data with another by a known mechanism. In the case of matrix, we have openly documented how to communicate with our HTTP APIs. |
| New Vector        | New Vector is a company formed to build Matrix.org. It is a continuation of the original project team, and is focused on development and maintenance of matrix.org. |
| federation        | Federation means that separate instances of a service communicate - the best example of this is email servers, in which it's possible to send mail between difference service providers. For Matrix, this means that data about rooms and message history is shared between servers of participating users. |
| SIP               | Session Initiation Protocol is a communications protocol for signaling and controlling multimedia communication sessions in applications of Internet telephony for voice and video calls. |
| XMPP              | XMPP is a communication protocol for message-oriented middleware based on XML. We think of Matrix and XMPP as being quite different; at its core Matrix can be thought of as an eventually consistent global JSON database, whilst XMPP can be thought of as a message passing protocol. |
| RCS               | Rich Communication Services is a communication protocol between mobile-telephone carriers and between phone and carrier, aiming at replacing SMS messages with a text-message system that is richer, provides phonebook polling (for service discovery), and transmit in-call multimedia. |
| bridging          | Bridging to Matrix means that it's possible to read and write to channels hosted outside matrix. For example, it's possible to speak in IRC and slack rooms. |
| Element           | Element is a popular matrix client developed by the core matrix.org team. It's available as a web app, on Android and on iOS. |
| client SDK        | A client SDK makes it easier to develop client applications using matrix. See: How do I Matrix-enable my existing app? |
| MXID              | Matrix user IDs (MXID) are unique user IDs. They are in the format @username:homeserver.tld. |
| 3PID              | Third-party IDs (3PIDs) are IDs from other systems or contexts, such as email addresses, social network accounts and phone numbers. |
| the spec          | The Matrix Specification describes the interactions between actors in the Matrix ecosystem, including Server-Server and Client-Server. You can see the spec here. |
| sigil             | Sigils refer the symbols uses at the beginning of many matrix identifiers. For example '@' is used for users, '#' for rooms, and '+' for communities. |
| community         | Communities are collections of rooms. They have been replaced by spaces. |
| group             | Groups are now known as communities, they are collections of rooms. They have been replaced by spaces. |
| space             | Spaces are collections of rooms as rooms. They replace communities and groups. |
| room              | A room is a fundamental building bock of the matrix architecture: events are typically sent in the context of a room. A room is a conceptual place where users can send and receive events. Events are sent to a room, and all participants in that room with sufficient access will receive the event. See more detail. |
| bot               | A bot is an autonomous agent. In the context of matrix, it means software which is able to make automated posts in rooms. |
| pubsub            | The publish-subscribe pattern describes an architecture in which message senders push messages to a location, without needing to know who the subscribers will be. For Matrix, this means a client can send a message to a room without knowing the members, and the members can read that message. |
| Postgres          | While Synapse can be installed using Sqlite, Postgres is preferred for any significant use. |
<!-- markdownlint-enable line-length -->
