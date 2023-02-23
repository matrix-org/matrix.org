/* eslint jsx-a11y/label-has-for:0 */

import React from "react";
import Helmet from "react-helmet";
import { Layout, MXContentMain } from "../components";

import config from "../../config";

import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { graphql } from "gatsby";

const Faq = ({ data }) => {
  function getSection(section) {
    const sections = data.allMdx.edges;
    return sections.find(element => {
      return element.node.frontmatter.faq_section === section;
    });
  }

  return (
    <Layout hasNavPadding="true">
      <Helmet title={`FAQ | ${config.siteTitle}`} />
      <MXContentMain>
        <div className="mxcontent__main__doc">
          <div id="questions-wrapper">
            <h1>Frequently Asked Questions</h1>
            <h2 id="intro">
              <a className="permalink" href="#intro" aria-hidden="true">
                &#128279;
              </a>{" "}
              Intro
            </h2>
            <h3 id="basics">
              <a className="permalink" href="#basics" aria-hidden="true">
                &#128279;
              </a>{" "}
              Basics
            </h3>
            <div className="question">
              <h4 id="what-is-matrix%3F">
                <a
                  className="permalink"
                  href="#what-is-matrix%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is Matrix?
              </h4>
              <p>
                Matrix is an open standard for interoperable, decentralised,
                real-time communication over IP. It can be used to power Instant
                Messaging, VoIP/WebRTC signalling, Internet of Things
                communication - or anywhere you need a standard HTTP API for
                publishing and subscribing to data whilst tracking the
                conversation history.
              </p>
              <p>
                Matrix defines the standard, and provides open source reference
                implementations of Matrix-compatible Servers,{" "}
                <a href="https://matrix.org/sdks/">Client SDKs</a> and
                Application Services to help you create new communication
                solutions or extend the capabilities and reach of existing ones.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-item definition-clientsdk">
                  <p>
                    <strong>client SDK</strong>
                  </p>
                  <p>
                    A client SDK makes it easier to develop client applications
                    using matrix. See:{" "}
                    <a href="#how-do-i-matrix-enable-my-existing-app%3F">
                      How do I Matrix-enable my existing app?
                    </a>
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-matrix's-mission%3F">
                <a
                  className="permalink"
                  href="#what-is-matrix's-mission%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is Matrix's Mission?
              </h4>
              <p>
                Matrix’s initial goal is to fix the problem of fragmented IP
                communications: letting users message and call each other
                without having to care what app the other user is on - making it
                as easy as sending an email.
              </p>
              <p>
                The longer term goal is for Matrix to act as a generic HTTP
                messaging and data synchronisation system for the whole web -
                allowing people, services and devices to easily communicate with
                each other, empowering users to own and control their data and
                select the services and vendors they want to use.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-does-this-mean-for-users%3F">
                <a
                  className="permalink"
                  href="#what-does-this-mean-for-users%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What does this mean for users?
              </h4>
              <p>
                The aim is to provide an analogous ecosystem to email - one
                where you can communicate with pretty much anyone, without
                caring what app or server they are using, using whichever{" "}
                <a href="https://matrix.org/docs/projects/clients-matrix">
                  client
                </a>{" "}
                app &amp; server you chose, and use a neutral identity system
                like an e-mail address or phone number to discover people to
                talk to.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-are-you-called-matrix%3F">
                <a
                  className="permalink"
                  href="#why-are-you-called-matrix%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why are you called Matrix?
              </h4>
              <p>
                We are called Matrix because we provide a structure in which all
                communication can be{" "}
                <a href="#definitions">matrixed together</a>.
              </p>
              <p>
                No, it’s nothing to do with the film (although you could go and
                build virtual worlds on top of Matrix if you wanted 😎).
              </p>
              <div className="definition-list">
                <div className="definition-item definition-matrixedtogether">
                  <p>
                    <strong>matrixed together</strong>
                  </p>
                  <p>
                    In mathematics, a matrix is a lattice-like arrangement, in
                    which expressions can be combined and treated as a single
                    entity
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-does-matrix-provide%3F">
                <a
                  className="permalink"
                  href="#what-does-matrix-provide%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What does Matrix provide?
              </h4>
              <ul>
                <li>
                  <a href="/docs/spec">Open Standard</a> HTTP APIs for
                  transferring JSON messages (e.g. instant messages, WebRTC
                  signalling), including:
                  <ul>
                    <li>
                      <a href="/docs/spec#client-server-api-v1">
                        Client&lt;-&gt;Server API
                      </a>{" "}
                      - defines how Matrix compatible clients communicate with
                      Matrix homeservers.
                    </li>
                    <li>
                      <a href="/docs/spec#federation-api">
                        Server&lt;-&gt;Server API
                      </a>{" "}
                      - defines how Matrix homeservers exchange messages and
                      synchronise history with each other.
                    </li>
                    <li>
                      <a href="/docs/spec/#application-service-api">
                        Application Service API
                      </a>{" "}
                      - defines how to extend the functionality of Matrix with
                      'integrations' and bridge to other networks.
                    </li>
                    <li>
                      <a href="/docs/spec/#modules">Modules</a> - specifies
                      features that must be implemented by particular classes of
                      clients.
                    </li>
                  </ul>
                </li>
                <li>
                  Open source reference implementations of:
                  <ul>
                    <li>Clients (Web (React), iOS, Android)</li>
                    <li>
                      <a href="/sdks/">Client SDKs</a> (Javascript, Web (React),
                      iOS, Android)
                    </li>
                    <li>Homeservers (Synapse)</li>
                    <li>
                      Application Services (bridges to IRC, Slack, Skype, Lync
                      and more...)
                    </li>
                  </ul>
                </li>
                <li>
                  The actual ecosystem and community of everyone running Matrix
                  servers and services
                </li>
                <li>
                  Loads of 3rd party contributions of clients, SDKs, servers and
                  services.
                </li>
              </ul>
              <p>
                You can find the full list of Matrix enabled projects at{" "}
                <a href="/blog/try-matrix-now">
                  https://matrix.org/blog/try-matrix-now
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-item definition-clientsdk">
                  <p>
                    <strong>client SDK</strong>
                  </p>
                  <p>
                    A client SDK makes it easier to develop client applications
                    using matrix. See:{" "}
                    <a href="#how-do-i-matrix-enable-my-existing-app%3F">
                      How do I Matrix-enable my existing app?
                    </a>
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="who-and-how">
              <a className="permalink" href="#who-and-how" aria-hidden="true">
                &#128279;
              </a>{" "}
              Who and How
            </h3>
            <MDXRenderer>{getSection("who-and-how").node.body}</MDXRenderer>
            <h3 id="concept">
              <a className="permalink" href="#concept" aria-hidden="true">
                &#128279;
              </a>{" "}
              Concept
            </h3>
            <div className="question">
              <h4 id="why-have-you-released-this-as-open-source%3F">
                <a
                  className="permalink"
                  href="#why-have-you-released-this-as-open-source%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why have you released this as open source?
              </h4>
              <p>
                We believe that any open standard defining interoperable
                communication needs to be justified, demonstrated and validated
                with transparent open source implementations. For Matrix to
                achieve its mission of making all communications services{" "}
                <a href="#definitions">interoperable</a> we believe it needs to
                be truly open, giving people access to take all the code we
                produce and to use and build on top of it.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-interoperable">
                  <p>
                    <strong>interoperable</strong>
                  </p>
                  <p>
                    A more general definition of interoperability is for systems
                    to be able to freely exchange data with another by a known
                    mechanism. In the case of matrix, we have openly documented
                    how to communicate with our HTTP APIs.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-do-you-mean-by-open%3F">
                <a
                  className="permalink"
                  href="#what-do-you-mean-by-open%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What do you mean by open?
              </h4>
              <p>
                Matrix is an open standard, meaning that we have freely
                published the details for how to communicate{" "}
                <a href="#definitions">interoperably</a> using the Matrix set of
                HTTP APIs. We encourage anyone and everyone to use the APIs and
                build their own projects which implement them and so benefit
                from interoperability with the rest of the Matrix ecosystem. We
                also ensure the standard is not encumbered by any known patent
                licensing requirements.
              </p>
              <p>
                Matrix is also open source, meaning that we have released the
                source code of the reference servers, clients and services to
                the public domain under the{" "}
                <a href="http://www.apache.org/licenses/LICENSE-2.0.html">
                  Apache Licence v2
                </a>
                , to encourage anyone and everyone to run their own servers and
                clients, and enhance them and contribute their enhancements as
                they see fit.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-interoperable">
                  <p>
                    <strong>interoperable</strong>
                  </p>
                  <p>
                    A more general definition of interoperability is for systems
                    to be able to freely exchange data with another by a known
                    mechanism. In the case of matrix, we have openly documented
                    how to communicate with our HTTP APIs.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-does-federated-mean%3F">
                <a
                  className="permalink"
                  href="#what-does-federated-mean%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What does federated mean?
              </h4>
              <p>
                Federation allows separate deployments of a communication
                service to communicate with each other - for instance a mail
                server run by Google federates with a mail server run by
                Microsoft when you send email from @gmail.com to @hotmail.com.
              </p>
              <p>
                <a href="#definitions">interoperable</a> clients may simply be
                running on the same deployment - whereas in federation the
                deployments themselves are exchanging data in a compatible
                manner.
              </p>
              <p>
                Matrix provides open federation - meaning that anyone on the
                internet can join into the Matrix ecosystem by deploying their
                own server.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-item definition-interoperable">
                  <p>
                    <strong>interoperable</strong>
                  </p>
                  <p>
                    A more general definition of interoperability is for systems
                    to be able to freely exchange data with another by a known
                    mechanism. In the case of matrix, we have openly documented
                    how to communicate with our HTTP APIs.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-is-this-like-e-mail%3F">
                <a
                  className="permalink"
                  href="#how-is-this-like-e-mail%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How is this like e-mail?
              </h4>
              <p>
                The{" "}
                <a href="https://en.wikipedia.org/wiki/History_of_email">
                  History of email
                </a>{" "}
                is instructive when thinking about the importance of{" "}
                <a href="#definitions">interoperability</a>.
              </p>
              <p>
                Early email systems behaved as isolated communities which only
                allowed you to exchange mail with users on the same system. If
                you got your email from one service and your friend from
                another, then you couldn't message each other. This is basically
                the situation we're in today with VoIP and IM.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-interoperable">
                  <p>
                    <strong>interoperable</strong>
                  </p>
                  <p>
                    A more general definition of interoperability is for systems
                    to be able to freely exchange data with another by a known
                    mechanism. In the case of matrix, we have openly documented
                    how to communicate with our HTTP APIs.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-has-no-one-done-this-before%3F">
                <a
                  className="permalink"
                  href="#why-has-no-one-done-this-before%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why has no one done this before?
              </h4>
              <p>
                There have been several attempts before including{" "}
                <a href="#definitions">RCS</a>.
              </p>
              <p>
                All of these have had some level of success, but many different
                technological/usability/economic factors have ended up limiting
                their success. Unfortunately, we've not ended up in a world
                where everyone has a SIP URI or Jabber ID on their business
                card, or a phone that actually uses RCS.
              </p>
              <p>
                Take a look at the <a href="#comparisons">Comparisons</a>{" "}
                section for a more detailed look at how Matrix compares to other
                projects.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-sip">
                  <p>
                    <strong>SIP</strong>
                  </p>
                  <p>
                    <a href="https://en.wikipedia.org/wiki/Session_Initiation_Protocol">
                      Session Initiation Protocol
                    </a>{" "}
                    is a communications protocol for signaling and controlling
                    multimedia communication sessions in applications of
                    Internet telephony for voice and video calls.
                  </p>
                </div>
                <div className="definition-item definition-xmpp">
                  <p>
                    <strong>XMPP</strong>
                  </p>
                  <p>
                    <a href="https://en.wikipedia.org/wiki/XMPP">XMPP</a> is a
                    communication protocol for message-oriented middleware based
                    on XML. We think of Matrix and XMPP as being quite
                    different; at its core Matrix can be thought of as an
                    eventually consistent global JSON database, whilst XMPP can
                    be thought of as a message passing protocol.
                  </p>
                </div>
                <div className="definition-item definition-rcs">
                  <p>
                    <strong>RCS</strong>
                  </p>
                  <p>
                    <a href="https://en.wikipedia.org/wiki/Rich_Communication_Services">
                      Rich Communication Services
                    </a>{" "}
                    is a communication protocol between mobile-telephone
                    carriers and between phone and carrier, aiming at replacing
                    SMS messages with a text-message system that is richer,
                    provides phonebook polling (for service discovery), and
                    transmit in-call multimedia.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="practical">
              <a className="permalink" href="#practical" aria-hidden="true">
                &#128279;
              </a>{" "}
              Practical
            </h3>
            <div className="question">
              <h4 id="what-can-i-actually-do-with-this%3F">
                <a
                  className="permalink"
                  href="#what-can-i-actually-do-with-this%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What can I actually do with this?
              </h4>
              <p>
                A typical <a href="/docs/projects/clients-matrix">client</a>{" "}
                provides a simple chatroom interface to Matrix - letting the
                user interact with users and rooms anywhere within the Matrix{" "}
                <a href="#definitions">federation</a>. Text and image messages
                are supported, as well as voice and video calling via WebRTC in
                one-to-one rooms and via Jitsi elsewhere.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-can-i-get-involved%3F">
                <a
                  className="permalink"
                  href="#how-can-i-get-involved%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How can I get involved?
              </h4>
              <p>
                There are plenty of ways to get involved. First,{" "}
                <a href="#how-do-i-get-an-account-and-get-started%3F">
                  create a user account
                </a>{" "}
                and come say hi on{" "}
                <a href="https://matrix.to/#/#matrix:matrix.org">
                  #matrix:matrix.org
                </a>
                !
              </p>
              <p>Then...</p>
              <ul>
                <li>
                  <a href="/docs/guides/installing-synapse">Install synapse</a>{" "}
                  and tell us how you get on.
                </li>
                <li>
                  Critique{" "}
                  <a href="/docs/spec/proposals">what has been proposed</a>.
                </li>
                <li>
                  Write <a href="/clients-matrix/">clients</a>.
                </li>
                <li>
                  Write <a href="/bridges/">bridges</a>! Run bridges!
                </li>
                <li>
                  Nose around in the repositories in our{" "}
                  <a href="https://github.com/matrix-org">
                    GitHub organization
                  </a>{" "}
                  and send us some pull requests to fix some bugs or add some
                  features!
                </li>
                <li>
                  You could even try to write a homeserver (but be warned,
                  Matrix's architecture makes homeservers orders of magnitude
                  harder than clients or bridges.)
                </li>
              </ul>
              <p>
                See{" "}
                <a href="http://github.com/matrix-org/synapse/tree/master/CONTRIBUTING.md">
                  CONTRIBUTING.md
                </a>{" "}
                for full details on how to contribute to the project. All are
                welcome!
              </p>
              <div className="definition-list">
                <div className="definition-item definition-synapse">
                  <p>
                    <strong>Synapse</strong>
                  </p>
                  <p>
                    Synapse is a homeserver implemented in Python by the
                    matrix.org core team. It is currently by far the most
                    installed homeserver available.
                  </p>
                </div>
                <div className="definition-item definition-thespec">
                  <p>
                    <strong>the spec</strong>
                  </p>
                  <p>
                    The Matrix Specification describes the interactions between
                    actors in the Matrix ecosystem, including Server-Server and
                    Client-Server.{" "}
                    <a href="/docs/spec/">You can see the spec here.</a>
                  </p>
                </div>
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-item definition-bridging">
                  <p>
                    <strong>bridging</strong>
                  </p>
                  <p>
                    Bridging to Matrix means that it's possible to read and
                    write to channels hosted outside matrix. For example, it's
                    possible to speak in IRC and slack rooms.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="where-can-i-get-support%3F">
                <a
                  className="permalink"
                  href="#where-can-i-get-support%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Where can I get support?
              </h4>
              <p>
                The point of entry for everything matrix is{" "}
                <a href="https://matrix.to/#/#matrix:matrix.org">
                  #matrix:matrix.org
                </a>{" "}
                aka #matrix on irc.libera.chat.
              </p>
              <p>
                If you're a developer and are looking to get involved with
                building something on Matrix, try{" "}
                <a href="https://matrix.to/#/#matrix-dev:matrix.org">
                  #matrix-dev:matrix.org
                </a>
                .
              </p>
              <p>
                If you host a Synapse homeserver, you can get support in the{" "}
                <a href="https://matrix.to/#/#synapse:matrix.org">
                  #synapse:matrix.org
                </a>{" "}
                room.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-room">
                  <p>
                    <strong>room</strong>
                  </p>
                  <p>
                    A room is a fundamental building bock of the matrix
                    architecture: events are typically sent in the context of a
                    room. A room is a conceptual place where users can send and
                    receive events. Events are sent to a room, and all
                    participants in that room with sufficient access will
                    receive the event.{" "}
                    <a href="/docs/spec#room-structure">See more detail.</a>
                  </p>
                </div>
                <div className="definition-item definition-synapse">
                  <p>
                    <strong>Synapse</strong>
                  </p>
                  <p>
                    Synapse is a homeserver implemented in Python by the
                    matrix.org core team. It is currently by far the most
                    installed homeserver available.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-do-i-create-a-link-to-a-matrix-room-or-user%3F">
                <a
                  className="permalink"
                  href="#how-do-i-create-a-link-to-a-matrix-room-or-user%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I create a link to a Matrix room or user?
              </h4>
              <p>
                You can link to a Matrix room or user by going to{" "}
                <a href="https://matrix.to">matrix.to</a>, and typing in the
                room alias or ID for linking to rooms, or a user's Matrix ID for
                linking to users. In the future, there will be a URL scheme for
                Matrix rooms and users, similar to email's <code>mailto</code>{" "}
                scheme, or XMPP's <code>xmpp</code> scheme.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <h2 id="usage">
              <a className="permalink" href="#usage" aria-hidden="true">
                &#128279;
              </a>{" "}
              Usage
            </h2>
            <h3 id="as-a-user">
              <a className="permalink" href="#as-a-user" aria-hidden="true">
                &#128279;
              </a>{" "}
              As a user
            </h3>
            <div className="question">
              <h4 id="what-clients-are-available%3F">
                <a
                  className="permalink"
                  href="#what-clients-are-available%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What clients are available?
              </h4>
              <p>
                See also the following lists:{" "}
                <a href="/clients">
                  Clients
                </a>
                ,{" "}
                <a href="/clients-matrix">
                  Clients Matrix
                </a>
                , and{" "}
                <a href="#which-matrix-clients-support-e2e">
                  Which matrix clients support E2E?
                </a>
              </p>
              <p>
                There are many clients available, ranging from the glossy
                mass-market to the geeky command-line. There's even an emacs
                macro.
              </p>
              <p>
                The most popular and established client is{" "}
                <a href="https://element.io">Element</a>
                , available on web, desktop, Android and iOS.
              </p>
              <p>Alternatively you can find a client suitable for you:</p>
              <ul>
                <li>
                  if you're using GNOME, try{" "}
                  <a href="https://wiki.gnome.org/Apps/Fractal">Fractal</a>
                </li>
                <li>
                  <a href="https://github.com/Nheko-Reborn/nheko">Nheko</a> is a
                  glossy native desktop app for Matrix, based on Qt5.
                </li>
                <li>
                  <a href="https://github.com/quotient-im/Quaternion">
                    Quaternion
                  </a>{" "}
                  is a cross-platform desktop client based on Qt5/QML
                </li>
                <li>
                  if you prefer a command line client, there is a{" "}
                  <a href="/docs/projects/client/weechat.html">
                    Matrix plugin for Weechat
                  </a>
                </li>
                <li>
                  <a href="https://github.com/f0x52/neo">neo</a> is a Matrix
                  React.js webclient
                </li>
                <li>
                  <a href="https://github.com/neilalexander/seaglass">
                    Seaglass
                  </a>{" "}
                  is a recently announced (as of July 2018) client written as a
                  native macOS app
                </li>
              </ul>
              <p>
                A thorough list of clients can be found on the{" "}
                <a href="/blog/try-matrix-now">try-matrix-now</a> page.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-bridges-to-other-networks-are-available%3F">
                <a
                  className="permalink"
                  href="#what-bridges-to-other-networks-are-available%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What bridges to other networks are available?
              </h4>
              <p>
                There are a large number of '<a href="/bridges/">bridges</a>'
                which integrate existing communication networks into Matrix.
                This list is growing rapidly, and you can find bridges both
                written by the Matrix core team and contributed by the wider
                community. The full list can be seen at{" "}
                <a href="/bridges/">https://matrix.org/bridges/</a>
              </p>
              <p>As of July 2018, active bridges include:</p>
              <ul>
                <li>
                  <a href="https://github.com/matrix-org/matrix-appservice-irc">
                    matrix-appservice-irc
                  </a>{" "}
                  - a comprehensive Matrix&lt;-&gt;IRC bridge
                </li>
                <li>
                  <a href="https://github.com/tulir/mautrix-telegram">
                    mautrix-telegram
                  </a>{" "}
                  - allows bridging to Telegram
                </li>
                <li>
                  <a href="https://github.com/Half-Shot/matrix-appservice-discord">
                    matrix-appservice-discord
                  </a>{" "}
                  - for bridging to Discord
                </li>
                <li>
                  <a href="https://github.com/matrix-org/matrix-appservice-slack">
                    matrix-appservice-slack
                  </a>{" "}
                  - a basic bridge to Slack
                </li>
                <li>
                  <a href="https://github.com/matrix-org/node-purple">
                    node-purple
                  </a>{" "}
                  - lets you access any of the 20+ protocols supported by{" "}
                  <a href="https://developer.pidgin.im/wiki/WhatIsLibpurple">
                    libpurple
                  </a>
                  , including Skype, Lync, XMPP, etc.
                </li>
                <li>
                  <a href="https://github.com/matrix-org/matrix-appservice-bridge">
                    matrix-appservice-bridge
                  </a>{" "}
                  - a general NodeJS framework for writing bridges
                </li>
              </ul>
              <p>
                Writing new bridges is incredibly fun and easy - see the{" "}
                <a href="https://github.com/matrix-org/matrix-appservice-bridge/blob/master/HOWTO.md">
                  matrix-appservice-bridge HOWTO
                </a>
                for an example of how to write a fully functional Slack bridge
                in less than 100 lines of code!
              </p>
              <div className="definition-list">
                <div className="definition-item definition-bridging">
                  <p>
                    <strong>bridging</strong>
                  </p>
                  <p>
                    Bridging to Matrix means that it's possible to read and
                    write to channels hosted outside matrix. For example, it's
                    possible to speak in IRC and slack rooms.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-do-i-get-an-account-and-get-started%3F">
                <a
                  className="permalink"
                  href="#how-do-i-get-an-account-and-get-started%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I get an account and get started?
              </h4>
              <p>
                The quickest way is to{" "}
                <a href="/blog/try-matrix-now">pick a client</a> and sign up.
              </p>
              <p>
                Clients can access any <a href="#definitions">homeserver</a>—you
                don't have to use matrix.org, though historically it is the
                largest public homeserver. joinmatrix.org provides a list of{" "}
                <a href="https://joinmatrix.org/servers/">
                  free public homeservers
                </a>
                , as well as a guide for getting started.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="where-can-i-find-a-mobile-app%3F">
                <a
                  className="permalink"
                  href="#where-can-i-find-a-mobile-app%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Where can I find a mobile app?
              </h4>
              <p>
                <a href="https://element.io">Element</a> is available for Android and
                iOS.
              </p>
              <p>
                The iOS version can be downloaded from the{" "}
                <a href="https://itunes.apple.com/us/app/vector.im/id1083446067">
                  Apple store
                </a>
                .
              </p>
              <p>
                The Android version can be downloaded from the{" "}
                <a href="https://play.google.com/store/apps/details?id=im.vector.app">
                  Google Play store
                </a>{" "}
                or{" "}
                <a href="https://f-droid.org/repository/browse/?fdid=im.vector.alpha">
                  F-Droid
                </a>
                . If you are not sure which one to choose, install Element from the{" "}
                <a href="https://play.google.com/store/apps/details?id=im.vector.app">
                  Google Play store
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-item definition-element">
                  <p>
                    <strong>Element</strong>
                  </p>
                  <p>
                    Element is a popular matrix client developed by the core
                    matrix.org team.{" "}
                    <a href="/docs/projects/try-matrix-now.html">
                      It's available as a web app, on Android and on iOS
                    </a>
                    .
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="i-installed-element-via-f-droid%2C-why-is-it-draining-my-battery%3F">
                <a
                  className="permalink"
                  href="#i-installed-element-via-f-droid%2C-why-is-it-draining-my-battery%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                I installed Element via F-Droid, why is it draining my battery?
              </h4>
              <p>
                The{" "}
                <a href="https://f-droid.org/repository/browse/?fdid=im.vector.alpha">
                  F-Droid
                </a>{" "}
                release of Element does not use{" "}
                <a href="https://developers.google.com/cloud-messaging/">
                  Google Cloud Messaging
                </a>
                . This allows users that do not have or want Google Services
                installed to use Element.
              </p>
              <p>
                The drawback is that Element has to pull for new messages, which
                can drain your battery. To counter this, you can change the
                delay between polls in the settings. Higher delay means better
                battery life (but may delay receiving messages). You can also
                disable the background sync entirely (which means that you won't
                get any notifications at all).
              </p>
              <p>
                If you don't mind using Google Services, you might be better off
                installing the{" "}
                <a href="https://play.google.com/store/apps/details?id=im.vector.app">
                  Google Play store
                </a>{" "}
                version.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="where-can-i-find-a-web-app%3F">
                <a
                  className="permalink"
                  href="#where-can-i-find-a-web-app%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Where can I find a web app?
              </h4>
              <p>
                See also:{" "}
                <a href="#what-clients-are-available%3F">
                  What clients are available?
                </a>
              </p>
              <h5 id="element">
                <a className="permalink" href="#element" aria-hidden="true">
                  &#128279;
                </a>{" "}
                Element
              </h5>
              <p>
                You can use <a href="https://app.element.io/">Element Web</a> - a
                glossy web client written on top of{" "}
                <a href="https://github.com/matrix-org/matrix-react-sdk">
                  matrix-react-sdk
                </a>
                .
              </p>
              <p>
                You can also host Element on your own server. It's a static web
                application, just download the{" "}
                <a href="https://github.com/vector-im/element-web/">
                  last release
                </a>{" "}
                and unpack it.
              </p>
              <h5 id="neo">
                <a className="permalink" href="#neo" aria-hidden="true">
                  &#128279;
                </a>{" "}
                neo
              </h5>
              <p>
                <a href="https://github.com/f0x52/neo">neo</a> is a Matrix
                React.js webclient which aims to be lighter than Element while
                still feature complete.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="where-can-i-find-a-desktop-client%3F">
                <a
                  className="permalink"
                  href="#where-can-i-find-a-desktop-client%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Where can I find a desktop client?
              </h4>
              <p>
                See also:{" "}
                <a href="#what-clients-are-available%3F">
                  What clients are available?
                </a>
              </p>
              <p>
                You can use the desktop build of{" "}
                <a href="https://element.io/get-started">Element Web</a>.
              </p>
              <ul>
                <li>
                  if you're using GNOME, try{" "}
                  <a href="https://wiki.gnome.org/Apps/Fractal">Fractal</a>
                </li>
                <li>
                  <a href="https://github.com/Nheko-Reborn/nheko">Nheko</a> is a
                  glossy native desktop app for Matrix, based on Qt5.
                </li>
                <li>
                  <a href="https://github.com/quotient-im/Quaternion">
                    Quaternion
                  </a>{" "}
                  is a cross-platform desktop client based on Qt5/QML
                </li>
                <li>
                  <a href="https://github.com/neilalexander/seaglass">
                    Seaglass
                  </a>{" "}
                  is a recently announced (as of July 2018) client written as a
                  native macOS app
                </li>
              </ul>
              <p>
                There are also other desktop clients - check the list of clients
                on{" "}
                <a href="/docs/projects/try-matrix-now.html#clients">
                  matrix.org
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <MDXRenderer>{getSection("as-a-user").node.body}</MDXRenderer>
            <h3 id="tech">
              <a className="permalink" href="#tech" aria-hidden="true">
                &#128279;
              </a>{" "}
              Tech
            </h3>
            <div className="question">
              <h4 id="how-do-i-matrix-enable-my-existing-app%3F">
                <a
                  className="permalink"
                  href="#how-do-i-matrix-enable-my-existing-app%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I Matrix-enable my existing app?
              </h4>
              <p>
                If your app doesn't have any communication capability already,
                you'll want to use one of the Matrix{" "}
                <a href="/sdks/">client SDK</a>s to add it in. These come in
                different levels of sophistication - ranging from a simple HTTP
                API wrapper through to reusable UI components.
              </p>
              <ul>
                <li>
                  <a href="https://github.com/matrix-org/matrix-android-sdk">
                    matrix-android-sdk
                  </a>
                </li>
                <li>
                  <a href="https://github.com/matrix-org/matrix-react-sdk">
                    matrix-react-sdk
                  </a>
                </li>
                <li>
                  <a href="https://github.com/poljar/matrix-nio">
                    matrix-nio (Python)
                  </a>
                </li>
                <li>
                  <a href="https://github.com/matrix-org/matrix-ios-sdk">
                    matrix-ios-sdk
                  </a>
                </li>
              </ul>
              <p>
                There are even{" "}
                <a href="/docs/projects/try-matrix-now.html#client-sdks">
                  more client SDKs available
                </a>
                .
              </p>
              <p>
                Pick the one for your platform, or a 3rd party one if none of
                the above work for you, and get plugging it in. You'll probably
                also want to read the{" "}
                <a href="/docs/guides/client-server-api">
                  Client-Server API HOWTO
                </a>{" "}
                too.
              </p>
              <p>
                If you already have communication infrastructure set up (XMPP,
                custom HTTP, or whatever), then you'll want to run a bridge to
                expose it to the wider Matrix ecosystem. See{" "}
                <a href="https://github.com/matrix-org/matrix-appservice-bridge/blob/master/HOWTO.md">
                  matrix-appservice-bridge HOWTO
                </a>{" "}
                for a guide of how to write bridges using the
                matrix-appservice-bridge framework, or co-opt one from the list
                at{" "}
                <a href="/blog/try-matrix-now">
                  https://matrix.org/blog/try-matrix-now
                </a>
                .
                <a href="/docs/spec/#application-service-api">
                  Application Service API
                </a>{" "}
                gives the details of the API that bridges have to implement.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-clientsdk">
                  <p>
                    <strong>client SDK</strong>
                  </p>
                  <p>
                    A client SDK makes it easier to develop client applications
                    using matrix. See:{" "}
                    <a href="#how-do-i-matrix-enable-my-existing-app%3F">
                      How do I Matrix-enable my existing app?
                    </a>
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-can-i-write-a-client-on-matrix%3F">
                <a
                  className="permalink"
                  href="#how-can-i-write-a-client-on-matrix%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How can I write a client on Matrix?
              </h4>
              <p>
                See the{" "}
                <a href="/docs/guides/client-server-api">
                  Client-Server API HOWTO
                </a>{" "}
                and the <a href="/docs/api">API docs</a> and{" "}
                <a href="/docs/spec">the Spec</a> for all the details you need
                to write a client.
              </p>
              <p>
                &quot;
                <a href="https://brendan.abolivier.bzh/enter-the-matrix/">
                  Enter the Matrix
                </a>
                &quot; from Brendan Abolivier is a great introductory article
                which also covers the CS API.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-do-i-register-custom-matrix-event-types%3F">
                <a
                  className="permalink"
                  href="#how-do-i-register-custom-matrix-event-types%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I register custom matrix event types?
              </h4>
              <p>
                We're not yet managing a registry of custom matrix event types.
                If you have any particularly good ones you want to tell the
                world about, please let us know on{" "}
                <a href="https://matrix.to/#/#matrix-dev:matrix.org">
                  #matrix-dev:matrix.org
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="can-i-write-a-matrix-homeserver%3F">
                <a
                  className="permalink"
                  href="#can-i-write-a-matrix-homeserver%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Can I write a Matrix homeserver?
              </h4>
              <p>
                Yes. Matrix is just a spec, and implementations of{" "}
                <a href="/docs/spec">the spec</a> are very welcome!
              </p>
              <p>
                <a href="https://github.com/matrix-org/synapse/">Synapse</a> is
                the most well-distributed homeserver, but other projects aiming to
                implement the server component include:
              </p>
              <ul>
                <li>
                  <a href="https://github.com/matrix-org/dendrite">Dendrite</a>
                </li>
                <li>
                  <a href="https://gitlab.com/famedly/conduit">Conduit</a>
                </li>
                <li>
                  <a href="https://github.com/jevolk/charybdis">
                    The Construct
                  </a>
                </li>
                <li>
                  <a href="https://gitlab.com/beerfactory.org/plasma/">
                    Plasma
                  </a>
                </li>
                <li>
                  <a href="https://gitlab.com/ma1uta/jeon">jeon</a>
                </li>
              </ul>
              <div className="definition-list">
                <div className="definition-item definition-thespec">
                  <p>
                    <strong>the spec</strong>
                  </p>
                  <p>
                    The Matrix Specification describes the interactions between
                    actors in the Matrix ecosystem, including Server-Server and
                    Client-Server.{" "}
                    <a href="/docs/spec/">You can see the spec here.</a>
                  </p>
                </div>
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-item definition-synapse">
                  <p>
                    <strong>Synapse</strong>
                  </p>
                  <p>
                    Synapse is a homeserver implemented in Python by the
                    matrix.org core team. It is currently by far the most
                    installed homeserver available.
                  </p>
                </div>
                <div className="definition-item definition-bot">
                  <p>
                    <strong>bot</strong>
                  </p>
                  <p>
                    A bot is an autonomous agent. In the context of matrix, it
                    means software which is able to make automated posts in
                    rooms.
                  </p>
                </div>
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-http%3F-doesn't-http-suck%3F-why-don't-you-use-websockets%2Fcoap%2Fhttp2%2Fetc%3F">
                <a
                  className="permalink"
                  href="#why-http%3F-doesn't-http-suck%3F-why-don't-you-use-websockets%2Fcoap%2Fhttp2%2Fetc%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why HTTP? Doesn't HTTP suck? Why don't you use
                websockets/CoAP/HTTP2/etc?
              </h4>
              <p>
                HTTP may not be the most efficient transport, but it is
                ubiquitous, very well understood and has numerous
                implementations on almost every platform and language. It also
                has a simple upgrade path to HTTP/2, which is relatively
                bandwidth and round-trip efficient.
              </p>
              <p>
                For these reasons it has been chosen as the mandatory baseline
                of the exchange, but it is still entirely possible to use other
                protocols for communication between clients and server (see for
                example this{" "}
                <a href="https://github.com/matrix-org/matrix-doc/issues/1148">
                  websocket transport spec proposal
                </a>
                ), and it's also possible in the future that negotiation of more
                efficient protocols will be added for the{" "}
                <a href="#definitions">federation</a> between servers, with
                HTTP+JSON remaining as the compatibility baseline.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="self-hosting">
              <a className="permalink" href="#self-hosting" aria-hidden="true">
                &#128279;
              </a>{" "}
              Self-hosting
            </h3>
            <div className="question">
              <h4 id="how-do-i-join-the-global-matrix-federation%3F">
                <a
                  className="permalink"
                  href="#how-do-i-join-the-global-matrix-federation%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I join the global Matrix federation?
              </h4>
              <p>
                You can{" "}
                <a href="https://matrix.org/docs/projects/clients-matrix">
                  choose a client
                </a>{" "}
                and create a user account on an existing homeserver.
              </p>
              <p>
                To host your own, start by looking at{" "}
                <a href="https://matrix.org/docs/guides/installing-synapse">
                  recommended guides for installing Synapse.
                </a>
              </p>
              <div className="definition-list">
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-item definition-synapse">
                  <p>
                    <strong>Synapse</strong>
                  </p>
                  <p>
                    Synapse is a homeserver implemented in Python by the
                    matrix.org core team. It is currently by far the most
                    installed homeserver available.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-do-i-run-my-own-homeserver%3F">
                <a
                  className="permalink"
                  href="#how-do-i-run-my-own-homeserver%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I run my own homeserver?
              </h4>
              <p>
                Follow{" "}
                <a href="https://matrix.org/docs/guides/installing-synapse">
                  these instructions
                </a>{" "}
                to install Synapse.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-item definition-synapse">
                  <p>
                    <strong>Synapse</strong>
                  </p>
                  <p>
                    Synapse is a homeserver implemented in Python by the
                    matrix.org core team. It is currently by far the most
                    installed homeserver available.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-ports-do-i-have-to-open-up-to-join-the-global-matrix-federation%3F">
                <a
                  className="permalink"
                  href="#what-ports-do-i-have-to-open-up-to-join-the-global-matrix-federation%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What ports do I have to open up to join the global Matrix
                federation?
              </h4>
              <p>
                We recommend servers use port 8448 for server&lt;-&gt;server
                HTTPS traffic. Look at{" "}
                <a href="https://github.com/matrix-org/synapse/blob/develop/docs/federate.md">
                  &quot;Setting up Federation&quot;
                </a>{" "}
                in the Synapse docs for details.
              </p>
              <p>
                Client&lt;-&gt;Server traffic can talk directly to Synapse via
                port 8448, but as by default Synapse creates a self-signed TLS
                certificate this can cause problems for clients which can't
                easily trust self-signed certificates (e.g. most web browsers).
                Instead, you can proxy access to Synapse's HTTP listener on port
                8008 via an existing HTTPS proxy with a valid certificate (e.g.
                an nginx listening on port 443), or you can point Synapse at a
                valid X.509 signed TLS certificate. In future, Synapse will
                probably use letsencrypt to autogenerate valid certificates
                rather than self-signed ones during installation, simplifying
                this process enormously.
              </p>
              <p>
                You can also put Synapse entirely behind an existing TLS load
                balancer and not expose port 8448 at all. In this situation,
                Synapse will need to be configured to share the same{" "}
                <em>public</em> TLS certificate as the load balancer (as Synapse
                uses the public certificate for identity in other areas too, and
                it has to match the certificate that other servers see when they
                connect).
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-do-i-connect-my-homeserver-to-the-public-matrix-network%3F">
                <a
                  className="permalink"
                  href="#how-do-i-connect-my-homeserver-to-the-public-matrix-network%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I connect my homeserver to the public Matrix network?
              </h4>
              <p>
                If you have a successfully running Synapse instance and want to{" "}
                <a href="#definitions">federate</a> with the rest of the public
                network, take a look at the{" "}
                <a href="https://github.com/matrix-org/synapse/blob/master/docs/federate.md">
                  federation documentation
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="can-i-run-my-own-identity-server%3F">
                <a
                  className="permalink"
                  href="#can-i-run-my-own-identity-server%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Can I run my own identity server?
              </h4>
              <p>
                See also:{" "}
                <a href="#what-is-an-identity-server%3F">
                  What is an identity server?
                </a>
              </p>
              <p>
                Yes - the reference implementation is{" "}
                <a href="https://github.com/matrix-org/sydent">sydent</a> and
                you can run your own ID server cluster that tracks 3rd party to
                Matrix ID mappings. This won't be very useful right now, though,
                and we don't recommend it.
              </p>
              <p>
                If you want your server to participate in the global replicated
                Matrix ID service then please get in touch with us. Meanwhile,
                we are looking at ways of decentralising the 'official' Matrix
                identity service so that identity servers are 100% decentralised
                and can openly federate with each other.{" "}
                <strong>
                  N.B. that you can use Matrix without ever using the identity
                  service - it exists only to map 3rd party IDs (e.g. email
                  addresses) to matrix IDs to aid user discovery
                </strong>
                .
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-can't-i-rename-my-homeserver%3F">
                <a
                  className="permalink"
                  href="#why-can't-i-rename-my-homeserver%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why can't I rename my homeserver?
              </h4>
              <p>
                Currently, the <a href="#definitions">homeserver</a> name is
                assumed never to change. This means that if you rename your
                server, other servers will think it's a different server.
              </p>
              <p>
                Perhaps in the future we will add an API for changing the
                homeserver name, but for now this is not supported.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="bots">
              <a className="permalink" href="#bots" aria-hidden="true">
                &#128279;
              </a>{" "}
              Bots
            </h3>
            <MDXRenderer>{getSection("bots").node.body}</MDXRenderer>
            <h2 id="detail">
              <a className="permalink" href="#detail" aria-hidden="true">
                &#128279;
              </a>{" "}
              Detail
            </h2>
            <h3 id="position-in-the-world">
              <a
                className="permalink"
                href="#position-in-the-world"
                aria-hidden="true"
              >
                &#128279;
              </a>{" "}
              Position in the World
            </h3>
            <div className="question">
              <h4 id="why-do-you-think-existing-apps-will-ever-join-this-officially%3F">
                <a
                  className="permalink"
                  href="#why-do-you-think-existing-apps-will-ever-join-this-officially%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why do you think existing apps will ever join this officially?
              </h4>
              <p>
                We firmly believe it is what is right for the consumer. As
                people begin to use <a href="#definitions">interoperable</a>{" "}
                communications tools, service providers will see the benefit and
                compete on quality of service, security and features rather than
                relying on locking people into their walled garden. We believe
                as soon as users see the availability and benefits of
                interoperable services they will demand it.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-interoperable">
                  <p>
                    <strong>interoperable</strong>
                  </p>
                  <p>
                    A more general definition of interoperability is for systems
                    to be able to freely exchange data with another by a known
                    mechanism. In the case of matrix, we have openly documented
                    how to communicate with our HTTP APIs.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-aren't-you-doing-this-through-the-ietf%3F-or-w3c%3F-or-3gpp%3F">
                <a
                  className="permalink"
                  href="#why-aren't-you-doing-this-through-the-ietf%3F-or-w3c%3F-or-3gpp%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why aren't you doing this through the IETF? or W3C? or 3GPP?
              </h4>
              <p>
                We do recognise the advantages of working with existing
                standards bodies. We have been focused on writing code and
                getting it out, and the standard has been evolving rapidly since
                initial release in September 2014. Once the standard has matured
                sufficiently it may well be appropriate to work with an official
                standard body to maintain it going forwards.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <MDXRenderer>
              {getSection("position-in-the-world").node.body}
            </MDXRenderer>
            <div className="question">
              <h4 id="why-apache-licence%3F">
                <a
                  className="permalink"
                  href="#why-apache-licence%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why Apache Licence?
              </h4>
              <p>
                See also:{" "}
                <a href="#what-do-you-mean-by-open%3F">
                  What do you mean by open?
                </a>
              </p>
              <p>
                The Apache Licence is a permissive licence. We want the Matrix
                protocol itself to be free and open, but people are free to
                create both free and commercial apps and services that uses the
                protocol. In our opinion, any Matrix-service only enhances the
                Matrix ecosystem.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="comparisons">
              <a className="permalink" href="#comparisons" aria-hidden="true">
                &#128279;
              </a>{" "}
              Comparisons
            </h3>
            <div className="question">
              <h4 id="what-is-the-difference-between-matrix-and-irc%3F">
                <a
                  className="permalink"
                  href="#what-is-the-difference-between-matrix-and-irc%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is the difference between Matrix and IRC?
              </h4>
              <p>
                We love IRC. In fact, prior to the point where{" "}
                <a href="https://element.io/">Element</a> was stable enough for daily
                use IRC was our primary communication tool. Between us we've
                written IRCds, IRC bots and admined dreamforge, UnrealIRCd,
                epona, ircservices and several others. That said, it has some
                limitations that Matrix seeks to improve on:
              </p>
              <ul>
                <li>Text only</li>
                <li>No history</li>
                <li>No multiple-device support</li>
                <li>No presence support</li>
                <li>Fragmented identity model</li>
                <li>
                  No open <a href="#definitions">federation</a>
                </li>
                <li>
                  No standard APIs, just a rather limited TCP line protocol
                </li>
                <li>Non-standardised federation protocol</li>
                <li>No built-in end-to-end encryption</li>
                <li>Disruptive net-splits</li>
                <li>Non-extensible</li>
              </ul>
              <p>
                <a href="http://ircv3.net">IRCv3</a> exists and is addressing
                some of these issues; this is great news and we wish them well.
                It's almost a contradiction in terms to get competitive between
                openly interoperable communication projects - in fact there
                there already exist mature Matrix&lt;-&gt;IRC bridges.{" "}
                <a href="https://github.com/matrix-org/matrix-appservice-irc/">
                  matrix-appservice-irc
                </a>{" "}
                is currently used to bridge with{" "}
                <a href="https://libera.chat/">
                  Libera.Chat
                </a>{" "}
                and many other IRC networks.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-element">
                  <p>
                    <strong>Element</strong>
                  </p>
                  <p>
                    Element is a popular matrix client developed by the core
                    matrix.org team.{" "}
                    <a href="/docs/projects/try-matrix-now.html">
                      It's available as a web app, on Android and on iOS
                    </a>
                    .
                  </p>
                </div>
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-the-difference-between-matrix-and-xmpp%3F">
                <a
                  className="permalink"
                  href="#what-is-the-difference-between-matrix-and-xmpp%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is the difference between Matrix and XMPP?
              </h4>
              <p>
                We think of Matrix and <a href="#definitions">XMPP</a> as being
                quite different; at its core Matrix can be thought of as an
                eventually consistent global JSON database with an HTTP API
                and <a href="#definitions">pubsub</a> semantics - whilst XMPP
                can be thought of as a message passing protocol. You can use
                them both to build chat systems; you can use them both to build
                pubsub systems; each comes with different tradeoffs. Matrix has
                a deliberately extensive 'kitchen sink' baseline of
                functionality; XMPP has a deliberately minimal baseline set of
                functionality. If XMPP does what you need it to do, then we're
                genuinely happy for you! Meanwhile, rather than competing, an
                XMPP Bridge like <a href="https://github.com/SkaveRat/xmpptrix">
                  Skaverat's xmpptrix beta
                </a>{" "}
                or{" "}
                <a href="https://github.com/jfrederickson/matrix-xmpp-bridge">
                  jfred's matrix-xmpp-bridge
                </a>{" "}
                or Matrix.org's own{" "}
                <a href="https://github.com/matrix-org/purple-matrix/">
                  purple-matrix
                </a>{" "}
                has potential to let both environments coexist and make the most
                of each other's benefits.
              </p>
              <p>
                The whole area of XMPP vs Matrix is quite subjective. Rather
                than fighting over which open interoperable communication
                standard works the best, we should just collaborate and bridge
                everything together. The more federation and interoperability
                the better.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-xmpp">
                  <p>
                    <strong>XMPP</strong>
                  </p>
                  <p>
                    <a href="https://en.wikipedia.org/wiki/XMPP">XMPP</a> is a
                    communication protocol for message-oriented middleware based
                    on XML. We think of Matrix and XMPP as being quite
                    different; at its core Matrix can be thought of as an
                    eventually consistent global JSON db, whilst XMPP can be
                    thought of as a message passing protocol.
                  </p>
                </div>
                <div className="definition-item definition-pubsub">
                  <p>
                    <strong>pubsub</strong>
                  </p>
                  <p>
                    The publish-subscribe pattern describes an architecture in
                    which message senders push messages to a location, without
                    needing to know who the subscribers will be. For Matrix,
                    this means a client can send a message to a room without
                    knowing the members, and the members can read that message.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-does-matrix-compare-with-something-like-trillian-or-pidgin%3F">
                <a
                  className="permalink"
                  href="#how-does-matrix-compare-with-something-like-trillian-or-pidgin%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How does Matrix compare with something like Trillian or Pidgin?
              </h4>
              <p>
                Trillian and Pidgin and similar aggregating IM clients merge all
                your IM activity into a single app. However, your history and
                identity is still fragmented across the networks. People can't
                find you easily, and your history is fragmented (other than on
                the device where the client runs). And rather than being able to
                chose the right app for the job when communicating with people,
                you are pushed towards relying on a specific aggregation app.
              </p>
              <p>
                Matrix lets you get the best of both worlds by linking to all
                the different networks (XMPP, AIM, ICQ, Lync, Skype etc) on the
                serverside, using bridges which can be run by anyone. Matrix
                then provides a simple standard HTTP API to access any of these
                networks, and lets you choose whichever client you prefer
                (either as a 'native' Matrix client or using a non-Matrix client
                from one of the networks which has been bridged in).
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="more-detail">
              <a className="permalink" href="#more-detail" aria-hidden="true">
                &#128279;
              </a>{" "}
              More Detail
            </h3>
            <div className="question">
              <h4 id="what-is-a-client%3F">
                <a
                  className="permalink"
                  href="#what-is-a-client%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is a client?
              </h4>
              <p>
                Users in Matrix use one or more clients to communicate. This
                could be any combination of a web client, a command line client,
                a mobile client - or embedded clients built into existing apps.
                It could even be a piece of hardware (e.g. a drone) that is
                Matrix enabled.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="can-i-use-matrix-without-installing-a-matrix-client%3F">
                <a
                  className="permalink"
                  href="#can-i-use-matrix-without-installing-a-matrix-client%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Can I use Matrix without installing a Matrix client?
              </h4>
              <p>
                Yes! An ever increasing number of protocols are being{" "}
                <a href="#definitions">bridged</a> into Matrix, so if you use
                something like IRC on Libera.Chat you may well be indirectly
                benefiting from Matrix, as others may be connected into the IRC
                channel via Matrix.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-bridging">
                  <p>
                    <strong>bridging</strong>
                  </p>
                  <p>
                    Bridging to Matrix means that it's possible to read and
                    write to channels hosted outside matrix. For example, it's
                    possible to speak in IRC and slack rooms.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-a-homeserver%3F">
                <a
                  className="permalink"
                  href="#what-is-a-homeserver%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is a homeserver?
              </h4>
              <p>
                A user's <a href="#definitions">client</a> connects to a single
                homeserver, which stores the communication history and account
                information for that user, and shares data with the wider Matrix
                ecosystem by synchronising communication history with other
                homeservers.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-a-mxid%3F">
                <a
                  className="permalink"
                  href="#what-is-a-mxid%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is a MXID?
              </h4>
              <p>
                Matrix user IDs (MXID) are unique user IDs. They are in the
                format <code>@username:homeserver.tld</code> (this format is
                used to avoid confusing them with email addresses.) They are
                intended to be fairly hidden (although right now they are not) -
                instead you will find and identify other users via{" "}
                <a href="#definitions">3PID</a>s.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-3pid">
                  <p>
                    <strong>3PID</strong>
                  </p>
                  <p>
                    Third-party IDs (3PIDs) are IDs from other systems or
                    contexts, such as email addresses, social network accounts
                    and phone numbers.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-a-3pid%3F">
                <a
                  className="permalink"
                  href="#what-is-a-3pid%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is a 3PID?
              </h4>
              <p>
                Third-party IDs (3PIDs) are IDs from other systems or contexts,
                such as email addresses, social network accounts and phone
                numbers.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-an-identity-server%3F">
                <a
                  className="permalink"
                  href="#what-is-an-identity-server%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is an identity server?
              </h4>
              <p>
                Users in Matrix are identified internally via their{" "}
                <a href="#definitions">3PID</a> namespaces such as email
                addresses or phone numbers should be used publicly to identify
                Matrix users, at least for invitation purposes. A Matrix
                &quot;Identity&quot; describes both the user ID and any other
                existing IDs from third party namespaces linked to their
                account.
              </p>
              <p>
                Matrix users can link third-party IDs (3PIDs) to their user ID.
                Linking 3PIDs creates a mapping from a 3PID to a user ID. This
                mapping can then be used by Matrix users in order to discover
                the MXIDs of their contacts.
              </p>
              <p>
                In order to ensure that the mapping from 3PID to user ID is
                genuine, the intention is for a globally federated cluster of
                trusted &quot;Identity Servers&quot; (IS) be used to verify the
                3PID and persist and replicate the mappings. Usage of an IS is
                not required in order for a client application to be part of the
                Matrix ecosystem. However, without one clients will not be able
                to look up user IDs using 3PIDs.
              </p>
              <p>
                The precise architecture of identity servers is currently in
                flux and subject to change as we work to fully decentralise
                them.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-mxid">
                  <p>
                    <strong>MXID</strong>
                  </p>
                  <p>
                    Matrix user IDs (MXID) are unique user IDs. They are in the
                    format <code>@username:homeserver.tld</code>.
                  </p>
                </div>
                <div className="definition-item definition-3pid">
                  <p>
                    <strong>3PID</strong>
                  </p>
                  <p>
                    Third-party IDs (3PIDs) are IDs from other systems or
                    contexts, such as email addresses, social network accounts
                    and phone numbers.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="where-do-my-conversations-get-stored%3F">
                <a
                  className="permalink"
                  href="#where-do-my-conversations-get-stored%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Where do my conversations get stored?
              </h4>
              <p>
                Each <a href="#definitions">replicated</a> across all of the
                homeservers{" "}
                <em>whose users are participating in a given room</em>.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-are-redactions%3F">
                <a
                  className="permalink"
                  href="#what-are-redactions%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What are redactions?
              </h4>
              <p>
                Since events are extensible it is possible for malicious users
                and/or servers to add keys that are, for example offensive or
                illegal. Since some events cannot be simply deleted (e.g.
                membership events) we instead 'redact' events, essentially
                stripping the event of all keys that are not required by the
                protocol. Redacting an event cannot be undone, allowing server
                owners to also delete the offending content from the databases.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="can-i-log-into-other-homeservers-with-my-username-and-password%3F">
                <a
                  className="permalink"
                  href="#can-i-log-into-other-homeservers-with-my-username-and-password%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Can I log into other homeservers with my username and password?
              </h4>
              <p>
                Currently, no. We are looking at options for decentralising or
                migrating user accounts between multiple servers, and might add
                this feature at a later stage.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-are-communities%3F">
                <a
                  className="permalink"
                  href="#what-are-communities%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What are spaces?
              </h4>
              <p>
                Spaces are a collections of rooms.{" "}
                <a href="https://matrix.to/#/#community:matrix.org">
                  #community:matrix.org
                </a>{" "}
                is the official matrix community space containing rooms managed{" "}
                by the core Matrix team.
              </p>
              <p>
                Spaces are the replacements for the deprecated communities which{" "}
                were also known as groups. Other than groups a{" "}
                <a href="#definitions">space</a> itself is a Room.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-community">
                  <p>
                    <strong>community</strong>
                  </p>
                  <p>
                    Communities are collections of rooms. They have been
                    replaced by spaces.
                  </p>
                </div>
                <div className="definition-item definition-group">
                  <p>
                    <strong>group</strong>
                  </p>
                  <p>
                    Groups are now known as communities, they are collections of
                    rooms. They have been replaced by spaces.
                  </p>
                </div>
                <div className="definition-item definition-space">
                  <p>
                    <strong>space</strong>
                  </p>
                  <p>
                    Spaces are collections of rooms as rooms. They replace
                    communites and groups.
                  </p>
                </div>
                <div className="definition-item definition-sigil">
                  <p>
                    <strong>sigil</strong>
                  </p>
                  <p>
                    Sigils refer the symbols uses at the beginning of many
                    matrix identifiers. For example '@' is used for users, '#'
                    for rooms, and '+' for communities.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="architecture">
              <a className="permalink" href="#architecture" aria-hidden="true">
                &#128279;
              </a>{" "}
              Architecture
            </h3>
            <div className="question">
              <h4 id="how-does-matrix-actually-work-architecturally%3F">
                <a
                  className="permalink"
                  href="#how-does-matrix-actually-work-architecturally%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How does Matrix actually work architecturally?
              </h4>
              <p>
                For an introduction to the Matrix architecture, see{" "}
                <a href="/docs/spec#architecture">
                  https://matrix.org/docs/spec#architecture
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-a-room%3F">
                <a
                  className="permalink"
                  href="#what-is-a-room%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is a room?
              </h4>
              <p>
                For a more thorough introduction see:{" "}
                <a href="/docs/spec#room-structure">
                  https://matrix.org/docs/spec#room-structure
                </a>
                .
              </p>
              <p>
                A room is a conceptual place where users can send and receive
                events. Events are sent to a room, and all participants in that
                room with sufficient access will receive the event.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="bridging">
              <a className="permalink" href="#bridging" aria-hidden="true">
                &#128279;
              </a>{" "}
              Bridging
            </h3>
            <MDXRenderer>{getSection("bridging").node.body}</MDXRenderer>
            <h3 id="encryption">
              <a className="permalink" href="#encryption" aria-hidden="true">
                &#128279;
              </a>{" "}
              Encryption
            </h3>
            <MDXRenderer>{getSection("encryption").node.body}</MDXRenderer>
            <h3 id="the-spec">
              <a className="permalink" href="#the-spec" aria-hidden="true">
                &#128279;
              </a>{" "}
              The Spec
            </h3>
            <div className="question">
              <h4 id="what-is-the-spec%3F">
                <a
                  className="permalink"
                  href="#what-is-the-spec%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is The Spec?
              </h4>
              <p>
                The Matrix Specification describes and prescribes the
                interaction between{" "}
                <a href="#definitions">Application Services</a> and more.
              </p>
              <p>
                The spec is{" "}
                <a href="/docs/spec/">available to read on matrix.org</a>.
              </p>
              <p>
                To contribute to the development of the Matrix Specification,
                see{" "}
                <a href="/docs/spec/proposals">
                  https://matrix.org/docs/spec/proposals
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-item definition-client">
                  <p>
                    <strong>Client</strong>
                  </p>
                  <p>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </p>
                </div>
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="where-is-the-spec%3F">
                <a
                  className="permalink"
                  href="#where-is-the-spec%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Where is The Spec?
              </h4>
              <p>
                You can view the spec at{" "}
                <a href="/docs/spec/.">https://matrix.org/docs/spec/.</a>
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-can-i-contribute-to-the-spec%3F">
                <a
                  className="permalink"
                  href="#how-can-i-contribute-to-the-spec%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How can I contribute to The Spec?
              </h4>
              <p>
                To contribute to the Matrix Specification, first take a look at
                the{" "}
                <a href="/docs/spec">
                  documentation as it is currently written
                </a>
                , then review the{" "}
                <a href="/docs/spec/proposals">process for new proposals</a>.
                You should start by writing a publicly-accessible proposal
                describing your change.
              </p>
              <p>
                To see the proposals currently under discussion,join us in{" "}
                <a href="https://matrix.to/#/#matrix-spec:matrix.org">
                  #matrix-spec:matrix.org
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what-is-the-process-for-adding-spec-proposals%3F">
                <a
                  className="permalink"
                  href="#what-is-the-process-for-adding-spec-proposals%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is the process for adding Spec proposals?
              </h4>
              <p>
                See the documentation at{" "}
                <a href="/docs/spec/proposals">
                  https://matrix.org/docs/spec/proposals
                </a>
                . In summary:
              </p>
              <ul>
                <li>
                  Produce a publicly-accessible proposal describing your change
                </li>
                <li>
                  Make a new issue at{" "}
                  <a href="https://github.com/matrix-org/matrix-doc/issues">
                    https://github.com/matrix-org/matrix-doc/issues
                  </a>
                  , and include the metadata as described
                </li>
                <li>
                  Gather feedback as widely as possible from the community and
                  core team on the proposal
                </li>
                <li>
                  Show an implementation to prove that it works well in
                  practice, iterate where needed.
                </li>
                <li>
                  Make a new spec PR which includes the changes as implemented
                  against{" "}
                  <a href="https://github.com/matrix-org/matrix-doc/tree/master/specification">
                    https://github.com/matrix-org/matrix-doc/tree/master/specification
                  </a>
                  .
                </li>
              </ul>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="what's-an-msc%3F">
                <a
                  className="permalink"
                  href="#what's-an-msc%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What's an MSC?
              </h4>
              <p>
                &quot;MSC&quot; refers to <strong>M</strong>atrix{" "}
                <strong>S</strong>pec <strong>C</strong>hange, each proposal is
                assigned an MSC number to make referencing them easier.
              </p>
              <p>
                MSC numbers are taken from GitHub issues on the{" "}
                <a href="https://github.com/matrix-org/matrix-doc/issues">
                  matrix-doc repo
                </a>
                . To see a list of all active MSCs, and to understand how to
                contribute your own, see{" "}
                <a href="/docs/spec/proposals">
                  https://matrix.org/docs/spec/proposals
                </a>
                .
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="voip">
              <a className="permalink" href="#voip" aria-hidden="true">
                &#128279;
              </a>{" "}
              Voip
            </h3>
            <div className="question">
              <h4 id="how-do-you-do-voip-calls-on-matrix%3F">
                <a
                  className="permalink"
                  href="#how-do-you-do-voip-calls-on-matrix%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do you do VoIP calls on Matrix?
              </h4>
              <p>
                Voice (and video) over Matrix uses the WebRTC 1.0 standard to
                transfer call media (i.e. the actual voice and video traffic).
                Matrix is used to signal the establishment and termination of
                the call by sending call events, like any other event.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="are-voip-calls-encrypted%3F">
                <a
                  className="permalink"
                  href="#are-voip-calls-encrypted%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Are VoIP calls encrypted?
              </h4>
              <p>
                WebRTC encrypts the media that's being sent. The signalling
                events that set up (and end) the call are encrypted if the room
                they were sent in has enabled encryption.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="do-i-need-a-turn-server%3F">
                <a
                  className="permalink"
                  href="#do-i-need-a-turn-server%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Do I need a TURN server?
              </h4>
              <p>
                VoIP calls should work if both parties are on public networks.
                However, in practice one (or both) devices are often behind NAT,
                and so having a{" "}
                <a href="https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT">
                  TURN
                </a>{" "}
                server is important to help set up the call.
              </p>
              <p>
                See{" "}
                <a href="https://github.com/matrix-org/synapse/blob/master/docs/turn-howto.md">
                  this guide
                </a>{" "}
                for setting up a TURN server with Synapse.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <h3 id="synapse">
              <a className="permalink" href="#synapse" aria-hidden="true">
                &#128279;
              </a>{" "}
              Synapse
            </h3>
            <div className="question">
              <h4 id="what-is-synapse%3F">
                <a
                  className="permalink"
                  href="#what-is-synapse%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                What is Synapse?
              </h4>
              <p>
                Synapse is a Matrix &quot;
                <a href="#definitions">homeserver</a>&quot; implementation 
                developed by the matrix.org core team, written in
                Python 3/Twisted. It is intended to showcase the concept of
                Matrix and let folks see the spec in the context of a codebase
                and let you run your own homeserver and generally help bootstrap
                the ecosystem.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="how-do-i-install-synapse%3F">
                <a
                  className="permalink"
                  href="#how-do-i-install-synapse%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                How do I install Synapse?
              </h4>
              <p>
                Take a look at the{" "}
                <a href="/docs/guides/installing-synapse">
                  Synapse Installation Guide
                </a>
                . There are options for installing using docker and/or ansible,
                plus manual installation instructions.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-is-synapse-in-python%2Ftwisted%3F">
                <a
                  className="permalink"
                  href="#why-is-synapse-in-python%2Ftwisted%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why is Synapse in Python/Twisted?
              </h4>
              <p>
                This is because both provide a mature and well known
                event-driven async IO framework for writing serverside code.
                Whilst this has been okay for our initial experimentation and
                proof of concept, it's future{" "}
                <a href="#definitions">homeserver</a> work will be written in a
                more strongly typed language (e.g. Go).
              </p>
              <p>
                As of July 2018 work is progressing on{" "}
                <a href="https://github.com/matrix-org/dendrite">Dendrite</a>, a
                homeserver from the matrix.org core team written in Go.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-homeserver">
                  <p>
                    <strong>homeserver</strong>
                  </p>
                  <p>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-aren't-you-using-an-orm-layer-like-sqlalchemy-in-synapse%3F">
                <a
                  className="permalink"
                  href="#why-aren't-you-using-an-orm-layer-like-sqlalchemy-in-synapse%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why aren't you using an ORM layer like SqlAlchemy in Synapse?
              </h4>
              <p>
                Synapse is <em>very</em> database dependent (as of Oct 2015;
                this is improving in the near future however), and we like
                having the flexibility to sculpt our own queries.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="will-synapse-share-my-chat-data-with-other-servers-in-the-federation%3F">
                <a
                  className="permalink"
                  href="#will-synapse-share-my-chat-data-with-other-servers-in-the-federation%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Will Synapse share my chat data with other servers in the
                federation?
              </h4>
              <p>
                <a href="#definitions">Federation</a> in Matrix means that data
                is only shared between servers of participating users of a room.
                If all users in a room are on your server, no data is shared
                with other servers.
              </p>
              <div className="definition-list">
                <div className="definition-item definition-federation">
                  <p>
                    <strong>federation</strong>
                  </p>
                  <p>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </p>
                </div>
                <div className="definition-close">close</div>
              </div>
            </div>
            <div className="question">
              <h4 id="why-is-the-state_groups_state-table-so-large%3F-what-is-it-storing%3F">
                <a
                  className="permalink"
                  href="#why-is-the-state_groups_state-table-so-large%3F-what-is-it-storing%3F"
                  aria-hidden="true"
                >
                  &#128279;
                </a>{" "}
                Why is the state_groups_state table so large? What is it
                storing?
              </h4>
              <p>
                Room state takes up a lot of space! To be specific, regular
                snapshots are taken of room states, so you can rapidly find out
                the state for historical events.
              </p>
              <p>
                Why is it so important to record this, and to know the past room
                state including full member list?
              </p>
              <p>
                It's needed to enable access control and state resolution, for
                example the homeserver needs to be able to decide:
              </p>
              <ul>
                <li>
                  &quot;who can see this message at that point in time?&quot;
                </li>
                <li>
                  &quot;what was the state of the room was when this message was
                  received, and so is it <em>allowed</em> to be received?&quot;
                </li>
              </ul>
              <p>
                Synapse stores these snapshots approximately every 100 messages,
                with deltas in between.
              </p>
              <div className="definition-list">
                <div className="definition-close">close</div>
              </div>
            </div>
            <h2 id="definitions">
              <a className="permalink" href="#definitions" aria-hidden="true">
                &#128279;
              </a>{" "}
              Definitions
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Definition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Client</td>
                  <td>
                    Users in Matrix use one or more clients to communicate. This
                    could be any combination of a web client, a command line
                    client, a mobile client - or embedded clients built into
                    existing apps. It could even be a piece of hardware (e.g. a
                    drone) that is Matrix enabled.
                  </td>
                </tr>
                <tr>
                  <td>matrixed together</td>
                  <td>
                    In mathematics, a matrix is a lattice-like arrangement, in
                    which expressions can be combined and treated as a single
                    entity
                  </td>
                </tr>
                <tr>
                  <td>homeserver</td>
                  <td>
                    Each account in the Matrix federation is associated with a
                    single homeserver. The software running at this server
                    stores the history and account information for that user.
                    Homeservers synchronise message history with other
                    homeservers.
                  </td>
                </tr>
                <tr>
                  <td>Synapse</td>
                  <td>
                    Synapse is a homeserver implemented in Python by the
                    matrix.org core team. It is currently by far the most
                    installed homeserver available.
                  </td>
                </tr>
                <tr>
                  <td>interoperable</td>
                  <td>
                    A more general definition of interoperability is for systems
                    to be able to freely exchange data with another by a known
                    mechanism. In the case of matrix, we have openly documented
                    how to communicate with our HTTP APIs.
                  </td>
                </tr>
                <tr>
                  <td>New Vector</td>
                  <td>
                    New Vector is a company formed to build Matrix.org. It is a
                    continuation of the original project team, and is focused on
                    development and maintenance of matrix.org.
                  </td>
                </tr>
                <tr>
                  <td>federation</td>
                  <td>
                    Federation means that separate instances of a service
                    communicate - the best example of this is email servers, in
                    which it's possible to send mail between difference service
                    providers. For Matrix, this means that data about rooms and
                    message history is shared between servers of participating
                    users.
                  </td>
                </tr>
                <tr>
                  <td>SIP</td>
                  <td>
                    <a href="https://en.wikipedia.org/wiki/Session_Initiation_Protocol">
                      Session Initiation Protocol
                    </a>{" "}
                    is a communications protocol for signaling and controlling
                    multimedia communication sessions in applications of
                    Internet telephony for voice and video calls.
                  </td>
                </tr>
                <tr>
                  <td>XMPP</td>
                  <td>
                    <a href="https://en.wikipedia.org/wiki/XMPP">XMPP</a> is a
                    communication protocol for message-oriented middleware based
                    on XML. We think of Matrix and XMPP as being quite
                    different; at its core Matrix can be thought of as an
                    eventually consistent global JSON database, whilst XMPP can
                    be thought of as a message passing protocol.
                  </td>
                </tr>
                <tr>
                  <td>RCS</td>
                  <td>
                    <a href="https://en.wikipedia.org/wiki/Rich_Communication_Services">
                      Rich Communication Services
                    </a>{" "}
                    is a communication protocol between mobile-telephone
                    carriers and between phone and carrier, aiming at replacing
                    SMS messages with a text-message system that is richer,
                    provides phonebook polling (for service discovery), and
                    transmit in-call multimedia.
                  </td>
                </tr>
                <tr>
                  <td>bridging</td>
                  <td>
                    Bridging to Matrix means that it's possible to read and
                    write to channels hosted outside matrix. For example, it's
                    possible to speak in IRC and slack rooms.
                  </td>
                </tr>
                <tr>
                  <td>Element</td>
                  <td>
                    Element is a popular matrix client developed by the core
                    matrix.org team.{" "}
                    <a href="/docs/projects/try-matrix-now.html">
                      It's available as a web app, on Android and on iOS
                    </a>
                    .
                  </td>
                </tr>
                <tr>
                  <td>client SDK</td>
                  <td>
                    A client SDK makes it easier to develop client applications
                    using matrix. See:{" "}
                    <a href="#how-do-i-matrix-enable-my-existing-app%3F">
                      How do I Matrix-enable my existing app?
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>MXID</td>
                  <td>
                    Matrix user IDs (MXID) are unique user IDs. They are in the
                    format <code>@username:homeserver.tld</code>.
                  </td>
                </tr>
                <tr>
                  <td>3PID</td>
                  <td>
                    Third-party IDs (3PIDs) are IDs from other systems or
                    contexts, such as email addresses, social network accounts
                    and phone numbers.
                  </td>
                </tr>
                <tr>
                  <td>the spec</td>
                  <td>
                    The Matrix Specification describes the interactions between
                    actors in the Matrix ecosystem, including Server-Server and
                    Client-Server.{" "}
                    <a href="/docs/spec/">You can see the spec here.</a>
                  </td>
                </tr>
                <tr>
                  <td>sigil</td>
                  <td>
                    Sigils refer the symbols uses at the beginning of many
                    matrix identifiers. For example '@' is used for users, '#'
                    for rooms, and '+' for communities.
                  </td>
                </tr>
                <tr>
                  <td>community</td>
                  <td>
                    Communities are collections of rooms. They have been
                    replaced by spaces.
                  </td>
                </tr>
                <tr>
                  <td>group</td>
                  <td>
                    Groups are now known as communities, they are collections of
                    rooms. They have been replaced by spaces.
                  </td>
                </tr>
                <tr>
                  <td>space</td>
                  <td>
                    Spaces are collections of rooms as rooms. They replace
                    communites and groups.
                  </td>
                </tr>
                <tr>
                  <td>room</td>
                  <td>
                    A room is a fundamental building bock of the matrix
                    architecture: events are typically sent in the context of a
                    room. A room is a conceptual place where users can send and
                    receive events. Events are sent to a room, and all
                    participants in that room with sufficient access will
                    receive the event.{" "}
                    <a href="/docs/spec#room-structure">See more detail.</a>
                  </td>
                </tr>
                <tr>
                  <td>bot</td>
                  <td>
                    A bot is an autonomous agent. In the context of matrix, it
                    means software which is able to make automated posts in
                    rooms.
                  </td>
                </tr>
                <tr>
                  <td>pubsub</td>
                  <td>
                    The publish-subscribe pattern describes an architecture in
                    which message senders push messages to a location, without
                    needing to know who the subscribers will be. For Matrix,
                    this means a client can send a message to a room without
                    knowing the members, and the members can read that message.
                  </td>
                </tr>
                <tr>
                  <td>Postgres</td>
                  <td>
                    While Synapse can be installed using Sqlite, Postgres is
                    preferred for any significant use.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MXContentMain>
      <div className="mxcontent__nav mxcontent__nav--left">
        <div className="mxcontent__nav__section">
          <div className="mxcontent__nav__link title">
            <a href="#intro">Intro</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#basics">Basics</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#who-and-how">Who and How</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#concept">Concept</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#practical">Practical</a>
          </div>
        </div>
        <div className="mxcontent__nav__section">
          <div className="mxcontent__nav__link title">
            <a href="#usage">Usage</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#as-a-user">As a user</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#tech">Tech</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#self-hosting">Self-hosting</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#bots">Bots</a>
          </div>
        </div>
        <div className="mxcontent__nav__section">
          <div className="mxcontent__nav__link title">
            <a href="#detail">Detail</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#position-in-the-world">Position in the World</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#comparisons">Comparisons</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#more-detail">More Detail</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#architecture">Architecture</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#bridging">Bridging</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#encryption">Encryption</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#the-spec">The Spec</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#voip">Voip</a>
          </div>
          <div className="mxcontent__nav__link">
            <a href="#synapse">Synapse</a>
          </div>
        </div>
        <div className="mxcontent__nav__section">
          <div className="mxcontent__nav__link title">
            <a href="#definitions">Definitions</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMdx(filter: { frontmatter: { section: { in: ["faq"] } } }) {
      edges {
        node {
          frontmatter {
            faq_section
          }
          body
        }
      }
    }
  }
`;

export default Faq;
