/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, Footer} from '../components'

import Navigation from '../components/Navigation'

import config from '../../config'

import { ThemeProvider } from 'styled-components'
import theme from '../../config/theme'

const example1 = `curl -XPOST
 -d '{"msgtype":"m.text", "body":"hello"}'
 "https://matrix.alice.com/_matrix/client
 /v2/rooms/ROOM_ID/send/m.room.message
 ?access_token=ACCESS_TOKEN"

{
  "event_id": "$YUwRidLecu:alice.com"
}
`;

const example2 = `curl –XPOST –H 'Authorization: X-Matrix origin=alice.com,...' –d '{
  "ts": 1413414391521,
  "origin": "alice.com",
  "destination": "bob.com",
  "pdus": [{
      "event_id": "$YUwRidLecu:alice.com",
      "content": {
      "body": "hello world",
      "msgtype": "m.text"
    },
    ...
    "pdu_type": "m.room.message",
    "signatures": {
      "matrix.org": {
        "ed25519:auto": "jZXTwAH/7EZ..."
      }
    },
    "sender": "@alice:alice.com"
  }]
}' https://matrix.bob.com:8448/_matrix/federation/v1/send/916d...
`;

const example3 = `curl "https://matrix.bob.com/_matrix/client
 /v2/sync?access_token=ACCESS_TOKEN"
{
  "next_batch": "s72595_4483_1934",
  "rooms": [{
    "room_id": "!KrLWMLDnZAyTapqLWW:alice.com",
    "events": {
      "batch": [{
        "event_id": "$YUwRidLecu:alice.com",
        "type": "m.room.message",
        "content": {
          "body": "I am a fish",
          "msgtype": "m.text",
        },
        "origin_server_ts": 1417731086797,
        "sender": "@alice:alice.com"
      }],
    },
  }]
}
`;

const Index = () => {
    return (
         <ThemeProvider theme={theme}>
            <div>
            <Helmet>
              <link rel="stylesheet" type="text/css" href="/css/how-it-works.css"/>
              <script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
              <script type="text/javascript" src="/js/d3.v3.min.js"></script>
              <script type="text/javascript" src="/js/how-it-works.js"></script>
              <script async="" src="https://platform.twitter.com/widgets.js" charSet="utf-8"/>
              <script async="" src="https://c6.patreon.com/becomePatronButton.bundle.js"/>
              <script async="" defer="" src="https://buttons.github.io/buttons.js"/>
            </Helmet>

            <div data-collapse="medium" data-animation="default" data-duration="400" className="mxnavbar w-nav">
    <div className="mxnavbar__container w-container">
<a href="index.html" className="mxnavbar__brand w-nav-brand w--current">
<img src="images/matrix-logo.svg" alt="" className="mxnavbar__logo" />
</a>
      <nav role="navigation" className="mxnavbar__navmenu w-nav-menu">
<a href="discover.html" className="mxnavbar__navlink w-nav-link">Discover</a>
<a href="develop.html" className="mxnavbar__navlink w-nav-link">Docs</a>
<a href="blog.html" className="mxnavbar__navlink w-nav-link">Blog</a>
<a href="faqs.html" className="mxnavbar__navlink w-nav-link">FAQs</a>
<a href="try-now.html" className="mxnavbar__navlink mxnavbar__navlink--try w-nav-link">Try Now</a>
<a href="try-now.html" className="mxnavbar__navlink mxnavbar__navlink--primary w-nav-link">Try Now</a>
</nav>
      <div className="mxnavbar__menubutton w-nav-button">
        <div className="mxnavbar__icon w-icon-nav-menu">
</div>
      </div>
    </div>
  </div>
  <div className="mxherobackground">
    <div className="mxherobackground__img">
</div>
    <div className="mxcontent mxcontent--home_hero">
      <div className="mxcontent__main delete">
        <div className="mxblock mxblock--hero">
<img src="images/matrix-logo-white.svg" alt="" className="mxblock--hero__logo" />
          <h1 className="mxblock--hero__hx delete">An open network for secure, decentralized communication</h1>
<a href="#" className="mxblock__btn mxblock--hero__btn mxblock--hero__btn--mctesto w-button">Get started</a>
</div>
      </div>
    </div>
  </div>
  <div className="mxcontentwrapper mxcontentwrapper--navpadding">
    <div className="mxcontent">
      <div className="mxcontent__main">
        <div className="mxblock mxblock--hero mxblock--hidden">
<img src="images/matrix-logo.svg" alt="" className="mxblock--hero__logo" />
          <h1 className="mxblock--hero__hx">An open network for secure, decentralized communication</h1>
<a href="#" className="mxblock__btn mxblock--hero__btn w-button">Get started</a>
</div>
        <div className="mxblock">
          <ul className="mximagine">
            <li>Imagine a world where it is as simple to message or call <i>anyone</i> as it is to send them an email.</li>
            <li>...where you can communicate without being forced to install the same app.</li>
            <li>...where you can choose who hosts your communication.</li>
            <li>...where your conversations are secured by end-to-end encryption.</li>
            <li>...where there’s a simple standard HTTP API for sharing real-time data on the web.</li>
          </ul>
          <p className="mxp mxthisismatrix">
            This is Matrix.
          </p>
          <p className="mxp mxmatrixdescription">
            Matrix is an open source project that publishes the <a href="#">Matrix open standard</a> for secure,
            decentralised, real-time communication, and its Apache licensed <a
            href="https://github.com/matrix-org">reference implementations</a>. Maintained by the non-profit <a
            href="/foundation">Matrix.org Foundation</a>, we aim to create an open platform which is as independent,
            vibrant and evolving as the Web itself... but for communication.
          </p>
          <p className="mxp mxmatrixdescription">
            As of June 2019, Matrix is <a href="">out of beta</a>, and the protocol is fully suitable for production usage.
          </p>
          <div className="mxgrid">
            <div className="mxgrid__item50">
              <div className="mxgrid__item__bg">
                <img src="images/basic_elaboration_message_happy.svg" alt="" className="mxgrid__item__bg__img" />
                <h4 className="mxgrid__item__bg__hx">Messaging</h4>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p">
                    Matrix gives you simple <a href="/docs/spec/">HTTP APIs</a> and <a
                    href="/docs/projects/sdks">SDKs</a> (iOS, Android, Web) to create chatrooms,
                    direct chats and chat bots, complete with end-to-end encryption, file transfer, synchronised
                    conversation history, formatted messages, read receipts and more.
                  </p>
                  <p className="mxgrid__item__bg__p">
                    Conversations are replicated over all the servers participating in them, meaning there are no single
                    point of control or failure.  You can reach any other user in the global Matrix ecosystem of over 9M
                    users, even including those on other networks via <a
                    href="/docs/projects/bridges">bridges</a>.
                  </p>
                </div>
                <a href="/docs/guides/" className="mxgrid__item__bg__btn w-button">Learn more</a>
              </div>
            </div>
            <div className="mxgrid__item50">
              <div className="mxgrid__item__bg">
                <img src="images/basic_lock.svg" alt="" className="mxgrid__item__bg__img" />
                <h4 className="mxgrid__item__bg__hx">End-to-End Encryption</h4>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p">
                    Matrix provides state-of-the-art end-to-end-encryption via the <a
                    href="https://gitlab.matrix.org/matrix-org/olm/blob/master/docs/olm.md">Olm</a> and <a
                    href="https://gitlab.matrix.org/matrix-org/olm/blob/master/docs/megolm.md">Megolm</a> cryptographic
                    ratchets. This ensures that only the intended recipients can ever decrypt your messages, while
                    warning if any unexpected devices are added to the conversation.
                  </p>
                  <p className="mxgrid__item__bg__p">
                    Matrix’s encryption is based on the <a
                    href="https://signal.org/docs/specifications/doubleratchet/">Double Ratchet Algorithm</a> popularised
                    by Signal, but extended to support encryption to rooms containing thousands of devices.
                    Olm and Megolm are specified as an <a href="https://gitlab.matrix.org/matrix-org/olm/blob/master/docs/">open standard</a> and <a
                    href="https://gitlab.matrix.org/matrix-org/olm/">implementations</a> are released under the Apache
                    license, <a href="/blog/2016/11/21/matrixs-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last">independently
                    audited by NCC Group</a>.
                  </p>
                </div>
                <a href="/docs/guides/e2e_implementation.html" className="mxgrid__item__bg__btn w-button">Learn more</a>
              </div>
            </div>
            <div className="mxgrid__item50">
              <div className="mxgrid__item__bg">
                <img src="images/music_microphone_old.svg" alt="" className="mxgrid__item__bg__img" />
                <h4 className="mxgrid__item__bg__hx">VoIP</h4>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p">
                    With the advent of WebRTC, developers gained the ability to exchange high quality voice and video
                    calls – but no standard way to actually route the calls.
                  </p>
                  <p className="mxgrid__item__bg__p">
                    Matrix is the missing signalling layer for WebRTC. If you are building VoIP into your app, or want
                    to expose your existing VoIP app to a wider audience, building on Matrix’s SDKs and bridges should
                    be a no-brainer.
                  </p>
                </div>
              <a href="/blog/2018/02/05/3-d-video-calling-with-matrix-webrtc-and-webvr-at-fosdem-2018/" className="mxgrid__item__bg__btn w-button">Learn more</a>
              </div>
            </div>
            <div className="mxgrid__item50">
              <div className="mxgrid__item__bg">
                <img src="images/music_repeat_button.svg" alt="" className="mxgrid__item__bg__img" />
                <h4 className="mxgrid__item__bg__hx">Bridging</h4>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p">
                    Matrix owes its name to its ability to bridge existing platforms into a global open matrix of
                    communication. Bridges are core to Matrix and designed to be as <a
                    href="https://github.com/matrix-org/matrix-appservice-bridge/blob/master/HOWTO.md">easy to write as
                    possible</a>, with
                    Matrix providing the highest common denominator language to link the networks together.
                  </p>
                  <p className="mxgrid__item__bg__p">
                    The core Matrix team maintains bridges to Slack, IRC, XMPP and Gitter, and meanwhile the wider
                    Matrix community provides bridges for Telegram, Discord, WhatsApp, Facebook, Hangouts, Signal and
                    many more.
                  </p>
                </div>
              <a href="/docs/projects/bridges" className="mxgrid__item__bg__btn w-button">Learn more</a>
              </div>
            </div>
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg">
                <h4 className="mxgrid__item__bg__hx">IOT, VR and more...</h4>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p">
                    Matrix can handle any type of real-time data, not only messaging and VoIP.
                  </p>
                  <p className="mxgrid__item__bg__p">
                    By building bridges to as many IoT silos as possible, data can be securely published on the Matrix
                    network. IoT solutions built on Matrix are unified, rather than locked to specific vendors, and can
                    even publish or consume Matrix data directly from devices
                    via <a href="/blog/2019/03/12/breaking-the-100-bps-barrier-with-matrix-meshsim-coap-proxy">ultra-low
                    bandwidth transports</a> (100bps or less)
                  </p>
                  <p className="mxgrid__item__bg__p">
                    Meanwhile AR and VR vendors are recreating the silos we’ve seen in instant messaging rather than
                    working together towards an open ecosystem. Matrix can be the unifying layer for both communication
                    and world data in <a href="/blog/2017/04/04/opening-up-cyberspace-with-matrix-and-webvr">AR and VR</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mxblock">
          <h2 className="mxblock__hx">How does it work?</h2>

          <p className="mxp mxhow">
            Matrix is really a <b>decentralised conversation store</b> rather than a messaging protocol.  When you send a
            message in Matrix, it is replicated over all the servers whose users are participating in a given
            conversation - similarly to how commits are replicated between Git repositories.  There is no single point
            of control or failure in a Matrix conversation which spans multiple servers: the act of communication with
            someone elsewhere in Matrix shares ownership of the conversation equally with them.  Even if your server
            goes offline, the conversation can continue uninterrupted elsewhere until it returns.
          </p>
          <p className="mxp mxhow">
            This means that every server has total self-sovereignty over its users data - and anyone can choose or run
            their own server and participate in the wider Matrix network.  This is how Matrix democratises control over
            communication.
          </p>
          <p className="mxp mxhow">
            By default, Matrix uses simple <a href="/docs/spec/client_server/latest.html#api-standards">HTTPS+JSON APIs
            </a> as its baseline transport, but also embraces more
            sophisticated transports such as <a href="https://github.com/matrix-org/matrix-doc/blob/master/drafts/websockets.rst">WebSockets
            </a> or <a href="/blog/2019/03/12/breaking-the-100-bps-barrier-with-matrix-meshsim-coap-proxy">ultra-low-bandwidth Matrix</a> via CoAP+Noise.
          </p>

          <div className="mxblock__how">

            <svg id="diagram"></svg>
 <div id="legendBox">
 <div className="legendNav mxblock__btn w-button">
 Next
 </div>
 <div className="legend" id="legend1">
 Here are three Matrix homeservers, each with one client connected.
 <br/><br/>
 The clients are all participating in the same Matrix room, which
 is synchronised across the three participating servers.
 </div>
 <div className="legend" id="legend2">
 Alice sends a JSON message to a room on her homeserver.
<pre>{ example1 }</pre>
 </div>
 <div className="legend" id="legend3">
 Alice's homeserver adds the JSON to its graph of history, linking
 it to the most recent unlinked object(s) in the graph.
 <br/><br/>
 The server then signs the JSON <b>including the signatures of the
 parent objects</b> to calculate a tamper-resistent signature for
 the history.
 </div>
 <div className="legend" id="legend4">
 The server then sends the signed JSON over HTTPS to any other
 servers which are participating in the room.
 <pre>{ example2 }</pre>
 </div>
 <div className="legend" id="legend5">
 The destination servers perform a series of checks on the message:
 <ul>
 <li>Validate the message signature to protect against tampering with history</li>
 <li>Validate the HTTP request's auth signature to protect against identity spoofing</li>
 <li>Validate whether Alice's historical permissions allow her to send this particular message</li>
 </ul>
 If these checks pass, the JSON is added to the destination servers' graphs.
 </div>
 <div className="legend" id="legend6">
 Destination clients receive Alice's message with a long-lived GET request.
 (Clients are free to implement more efficient transports than polling as desired).
 <pre>{ example3 }</pre>
 </div>
 <div className="legend" id="legend7">
 Bob sends a response to Alice's message, and his server adds his
 message into his copy of the room's history, linking it to the most
 recent unlinked object in the graph - Alice's last message.
 </div>
 <div className="legend" id="legend8">
 Meanwhile, Charlie also responds to Alice's message - racing with
 Bob's message.
 <br/><br/>
 Alice, Bob and Charlie's homeservers all have different views of
 the message history at this point - but Matrix is designed to
 handle this inconsistency.
 </div>
 <div className="legend" id="legend9">
 Bob's homeserver relays his message through to Alice and Charlie's
 servers, who accept it.
 <br/><br/>
 At this point Alice and Bob are in sync, but Charlie's room
 history has split - both messages 2 and 3 follow on from message 1.
 This is not a problem; Charlie's client will be told about Bob's
 message and can handle it however it chooses.
 </div>
 <div className="legend" id="legend10">
 Charlie's homeserver relays his message through as well, at which
 point all 3 servers have a consistent view of history again
 (including the race between Bob and Charlie). All three clients
 have seen all three messages, and the room history is now back in
 sync across the participating servers.
 </div>
 <div className="legend" id="legend11">
 Later on, Alice sends another message - her homeserver adds it to
 her history, and links it to the most recent unlinked objects in
 the graph: Bob and Charlie's messages.
 <br/><br/>
 This effectively merges the
 split in history and asserts the integrity of the room (or at
 least her view of it).
 </div>
 <div className="legend" id="legend12">
 Alice's message is then relayed to the other participating
 servers, which accept it and update their own history with the
 same rules, ensuring eventual consistency and integrity of the
 distributed room history.
 </div>
 </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="mxblock mxblock--open_standard">
    <h2 className="mxblock__hx mxblock__hx--open_standard">An Open Standard</h2>
    <div className="mxgrid mxgrid--open_standard">
      <div className="mxgrid__item33">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_signs.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Simple pragmatic<a href="/docs/api"> RESTful HTTP/JSON APIs</a> by default
</h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_spread_text.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard"><a href="/docs/spec">Open specification</a> of the Matrix standard<br/><br/></h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_share.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Fully decentralised conversations with no single points of control or failure</h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_lock.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">End-to-end encryption via Olm and Megolm</h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/music_microphone_old.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">WebRTC VoIP/Video calling using Matrix signalling</h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/arrows_rotate.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Real-time synchronised history and state across all clients</h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_mail_open_text.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Integrates with existing 3rd party IDs to authenticate and discover users</h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_heart.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Maintained by the non-profit <a href="/foundation">Matrix.org Foundation</a></h4>
          </div>
        </div>
      </div>
      <div className="mxgrid__item33 mxgrid__item33--bullet">
        <div className="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_elaboration_message_happy.svg" alt="" className="mxgrid__item__bg__img" />
          <div className="mxgrid__item__bg__vert">
            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Group conversations, read receipts, typing notifications, presence...</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="mxcontentwrapper mxcontentwrapper--navpadding">
    <div className="mxcontent">
      <div className="mxcontent__main">
        <div className="mxblock">
          <h2 className="mxblock__hx">Latest News</h2>
          <div className="mxgrid mxgrid--news">
            <div className="mxgrid__item50 mxgrid__item50--news">
              <div className="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p className="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" className="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
            <div className="mxgrid__item50 mxgrid__item50--news">
              <div className="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p className="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" className="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
            <div className="mxgrid__item50 mxgrid__item50--news">
              <div className="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p className="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" className="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
            <div className="mxgrid__item50 mxgrid__item50--news">
              <div className="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p className="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" className="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
          </div>
<a href="#" className="mxgrid__item__bg__btn w-button">View all posts</a>
</div>
        <div className="mxblock">
          <h2 className="mxblock__hx">Explore Matrix</h2>
          <div className="mxblock__explore">
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/basic_elaboration_message_happy.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">Try Matrix</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/software_layout_header_sideleft.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">Cients</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/basic_calculator.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">Bots</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/software_layers2.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">SDKs</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/basic_server.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">Servers</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/basic_cloud.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">Hosting</div>
</a>
</div>
        </div>
        <div className="mxblock">
          <h2 className="mxblock__hx">SDKs</h2>
          <p>Native SDKs for multiple platforms, including:</p>
          <div className="mxblock__explore">
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/python.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">Python</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/js.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">JavaScript</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/android.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">Android</div>
</a>
<a href="http://www.google.com" className="mxblock__explore__item w-inline-block">
<img src="images/iOS.svg" alt="" className="mxblock__explore__item__img" />
<div className="mxblock__explore__item__p">iOS</div>
</a>
</div>
<a href="#" className="mxgrid__item__bg__btn w-button">View all SDKs</a>
</div>
        <div className="mxblock">
          <div className="mxgrid">
            <div className="mxgrid__item50">
              <div className="mxgrid__item__bg">
                <h2 className="mxblock__hx">Open Source</h2>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxgrid__item__bg__p">Join thousands of other developers in our open source repositories, including:<br />
</p>
                  <div className="mxblock__gh">
                    <div className="mxblock__github mxblock__github--first">
                      <div className="mxblock__github__left">
                        <p className="paragraph">Synapse</p>
                      </div>
                      <div className="mxblock__github__right">
                        <div className="w-embed">
<a className="github-button" href="https://github.com/matrix-org/synapse" data-show-count="true" aria-label="Star matrix-org/synapse on GitHub">Star</a>
</div>
                      </div>
                    </div>
                    <div className="mxblock__github">
                      <div className="mxblock__github__left">
                        <p className="paragraph">JavaScript SDK</p>
                      </div>
                      <div className="mxblock__github__right">
                        <div className="w-embed">
<a className="github-button" href="https://github.com/matrix-org/matrix-js-sdk" data-show-count="true" aria-label="Star matrix-org/matrix-js-sdk on GitHub">Star</a>
</div>
                      </div>
                    </div>
                    <div className="mxblock__github">
                      <div className="mxblock__github__left">
                        <p className="paragraph">Android SDK</p>
                      </div>
                      <div className="mxblock__github__right">
                        <div className="w-embed">
<a className="github-button" href="https://github.com/matrix-org/matrix-android-sdk" data-show-count="true" aria-label="Star matrix-org/matrix-android-sdk on GitHub">Star</a>
</div>
                      </div>
                    </div>
                    <div className="mxblock__github">
                      <div className="mxblock__github__left">
                        <p className="paragraph">iOS SDK</p>
                      </div>
                      <div className="mxblock__github__right">
                        <div className="w-embed">
<a className="github-button" href="https://github.com/matrix-org/matrix-ios-sdk" data-show-count="true" aria-label="Star matrix-org/matrix-ios-sdk on GitHub">Star</a>
</div>
                      </div>
                    </div>
                  </div>
<a href="#" className="mxgrid__item__bg__btn w-button">View all on GitHub</a>
</div>
              </div>
            </div>
            <div className="mxgrid__item50">
              <div className="mxgrid__item__bg">
                <h2 className="mxblock__hx">The Matrix Foundation</h2>
                <div className="mxgrid__item__bg__vert">
                  <p className="mxp">Matrix.org is a non-profit initiative, currently being incorporated as a dedicated non-profit Matrix.org Foundation in the UK.<br />
</p>
                  <p className="mxp">It acts as a neutral guardian of the Matrix spec, nurturing and growing Matrix for the benefit of the whole ecosystem.<br />
</p>
                  <p>The board of Matrix.org Foundation will be made up of key participants in the Matrix community as well as independent advisors from the wider internet and telco industries.<br />
</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="mxblock mxblock--tweetstitle">
    <h2 className="mxblock__hx">What people are saying</h2>
  </div>
  <div className="mxblock mxblock--tweets">
    <div className="mxgrid mxgrid--tweets">
      <div className="mxgrid__tweet w-embed w-script">
        <blockquote className="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">If you&#39;ve been looking for an OSS end-to-end encrypted alternative to Slack, <a href="https://twitter.com/RiotChat?ref_src=twsrc%5Etfw">@RiotChat</a> is probably your best bet: <a href="https://t.co/U5My74tLvn">https://t.co/U5My74tLvn</a>
</p>&mdash; Tony Arcieri (@bascule) <a href="https://twitter.com/bascule/status/803680470386884608?ref_src=twsrc%5Etfw">November 29, 2016</a>
</blockquote>
      </div>
      <div className="mxgrid__tweet w-embed w-script">
        <blockquote className="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">
<a href="https://t.co/T4Qd3riZF6">https://t.co/T4Qd3riZF6</a> + riot.im have released some awesome updates, and are now officially the perfect internet messaging service.</p>&mdash; Stuart Mumford (@StuartMumford) <a href="https://twitter.com/StuartMumford/status/782239349660352513?ref_src=twsrc%5Etfw">October 1, 2016</a>
</blockquote>
      </div>
      <div className="mxgrid__tweet w-embed w-script">
        <blockquote className="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">Slack no more. Why you should use Riot.im and <a href="https://t.co/kbin25KiP5">https://t.co/kbin25KiP5</a>: <a href="https://t.co/0mGuSIERPK">https://t.co/0mGuSIERPK</a>
</p>&mdash; Paul Lindner (@lindner) <a href="https://twitter.com/lindner/status/778007907660996609?ref_src=twsrc%5Etfw">September 19, 2016</a>
</blockquote>
      </div>
      <div className="mxgrid__tweet w-embed w-script">
        <blockquote className="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">For years now people have been lamenting the walled garden trend, Twitter, Github, Slack, etc. That&#39;s not what this great web was built for.</p>&mdash; Arne Brasseur (@plexus) <a href="https://twitter.com/plexus/status/778234326446137344?ref_src=twsrc%5Etfw">September 20, 2016</a>
</blockquote>
      </div>
    </div>
  </div>
  <div className="mxcontentwrapper">
    <div className="mxcontent">
      <div className="mxcontent__main">
        <div className="mxblock mxblock--sponsors">
          <div className="mxgrid">
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg">
                <h2 className="mxblock__hx">Support Matrix</h2>
                <p className="mxp">If you share our vision, or are building on top of Matrix, please consider donating...</p>
                <div className="mxgrid__support">
                  <div className="mxgrid__support__item">
                    <div className="mxgrid__item__bg__vert">
                      <h4>Patreon</h4>
                      <p className="mxgrid__support__item__p">Support us on Patreon. Support us on Patreon. Support us on Patreon. Support us on Patreon. </p>
                      <div className="mxgrid__item__bg__vert">
                        <div className="mxgrid__item__bg__vert__embed w-embed w-script">
<a href="https://www.patreon.com/bePatron?u=6269205" data-patreon-widget-type="become-patron-button">Become a Patron!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxgrid__support__item">
                    <div className="mxgrid__item__bg__vert">
                      <h4>Liberapay</h4>
                      <p className="mxgrid__support__item__p">Support us on Liberapay. Support us on Liberapay. Support us on Liberapay. Support us on Liberapay.</p>
                      <div className="mxgrid__item__bg__vert">
                        <div className="mxgrid__item__bg__vert__embed w-embed w-script">
                          <script src="https://liberapay.com/matrixdotorg/widgets/receiving.js"></script>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxgrid__support__item">
                    <div className="mxgrid__item__bg__vert">
                      <h4>Cryptocurrency</h4>
                      <p className="mxgrid__support__item__p">Donate via Crypto. Donate via Crypto. Donate via Crypto. Donate via Crypto. Donate via Crypto. </p>
                      <div className="mxgrid__item__bg__vert">
                        <div className="mxgrid__item__bg__vert__embed w-embed w-script">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mxp">If you share our vision, or are building on top of Matrix, please consider donating...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mxblock">
          <div className="mxgrid">
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h2 className="mxblock__hx">Thank you to our incredible sponsors</h2>
                <div className="mxgrid__sponsors">
                  <div className="mxgrid__sponsors__item">
                    <div className="mxgrid__sponsors__logo">
<img src="images/status.svg" alt="" className="mxgrid__sponsors__item__logo__img" />
</div>
                    <div className="mxgrid__item__bg__vert">
                      <h4>Status</h4>
                      <p className="mxgrid__sponsors__item__p">A Mobile OS, Built for Ethereum.</p>
<a href="#">Learn more</a>
</div>
                  </div>
                  <div className="mxgrid__sponsors__item">
                    <div className="mxgrid__sponsors__logo">
<img src="images/upcloud.svg" alt="" className="mxgrid__sponsors__item__logo__img" />
</div>
                    <div className="mxgrid__item__bg__vert">
                      <h4>UpCloud</h4>
                      <p className="mxgrid__sponsors__item__p">Matrix.org is generously hosted by UpCloud! Host your homeserver via UpCloud and &amp; get a $25 credit.</p>
<a href="#">Learn more</a>
</div>
                  </div>
                  <div className="mxgrid__sponsors__item">
                    <div className="mxgrid__sponsors__logo">
<img src="images/pia.svg" alt="" className="mxgrid__sponsors__item__logo__img mxgrid__sponsors__item__logo__img--pia" />
</div>
                    <div className="mxgrid__item__bg__vert">
                      <h4>Private Internet Access</h4>
                      <p className="mxgrid__sponsors__item__p">Private Internet Access™ VPN Service encrypts your connection and provides you with an anonymous IP to protect your privacy. <br />
</p>
<a href="#">Learn more</a>
</div>
                  </div>
                  <div className="mxgrid__sponsors__item">
                    <div className="mxgrid__sponsors__logo">
<img src="images/inblockchain.png" alt="" className="mxgrid__sponsors__item__logo__img" />
</div>
                    <h4>InBlockchain</h4>
                    <p className="mxgrid__sponsors__item__p">INBlockchain is a full-service firm focusing on consulting, incubating and facilitating crowdsales for promising blockchain startups.<strong>
<br />
</strong>
</p>
<a href="#">Learn more</a>
</div>
                  <div className="mxgrid__sponsors__item">
                    <div className="mxgrid__sponsors__logo">
<img src="images/omisego.svg" alt="" className="mxgrid__sponsors__item__logo__img" />
</div>
                    <h4>Omisego</h4>
                    <p className="mxgrid__sponsors__item__p">OmiseGO is a public Ethereum-based financial technology for use in mainstream digital wallets.<strong>
<br />
</strong>
</p>
<a href="#">Learn more</a>
</div>
                  <div className="mxgrid__sponsors__item">
                    <div className="mxgrid__sponsors__logo">
<img src="images/tendermint.png" alt="" className="mxgrid__sponsors__item__logo__img" />
</div>
                    <h4>Tendermint</h4>
                    <p className="mxgrid__sponsors__item__p">Byzantine fault-tolerant replicated state machines in any programming language. <strong>
<br />
</strong>
</p>
<a href="#">Learn more</a>
</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="mxfooter">
    <div className="mxfooter__container">
      <div className="mxfooter__column">
<a href="#" className="mxfooter__link mxfooter__link--primary">Discover</a>
<a href="#" className="mxfooter__link">Try Matrix</a>
<a href="#" className="mxfooter__link">Clients</a>
<a href="#" className="mxfooter__link">Bots</a>
<a href="#" className="mxfooter__link">SDKs</a>
<a href="#" className="mxfooter__link">Servers</a>
<a href="#" className="mxfooter__link">Hosting</a>
</div>
      <div className="mxfooter__column">
<a href="#" className="mxfooter__link mxfooter__link--primary">Guides</a>
<a href="#" className="mxfooter__link">Getting Started</a>
<a href="#" className="mxfooter__link">Client-Server API</a>
<a href="#" className="mxfooter__link">Install Synapse</a>
<a href="#" className="mxfooter__link">Bridges</a>
<a href="#" className="mxfooter__link">All guides</a>
</div>
      <div className="mxfooter__column">
<a href="#" className="mxfooter__link mxfooter__link--primary">Develop</a>
<a href="docs-nav.html" className="mxfooter__link">Docs</a>
<a href="#" className="mxfooter__link">Spec</a>
<a href="#" className="mxfooter__link">API Playground</a>
<a href="#" className="mxfooter__link">Code</a>
</div>
      <div className="mxfooter__column">
<a href="#" className="mxfooter__link mxfooter__link--primary">Blog</a>
<a href="#" className="mxfooter__link">All posts</a>
<a href="#" className="mxfooter__link">This week in Matrix</a>
<a href="#" className="mxfooter__link">Security</a>
<a href="#" className="mxfooter__link">RSS</a>
</div>
      <div className="mxfooter__column">
<a href="#" className="mxfooter__link mxfooter__link--primary">More</a>
<a href="#" className="mxfooter__link">FAQs</a>
<a href="#" className="mxfooter__link">Security</a>
<a href="#" className="mxfooter__link">Legal</a>
</div>
    </div>
    <div className="mxfooter__container mxfooter__container--heel">
      <div className="mxfooter__iconwrapper">
<a href="#" className="w-inline-block">
<img src="images/github.svg" alt="" className="mxfooter__icon" />
</a>
<a href="#" className="w-inline-block">
<img src="images/gitlab.svg" alt="" className="mxfooter__icon" />
</a>
<a href="#" className="w-inline-block">
<img src="images/youtube.svg" alt="" className="mxfooter__icon" />
</a>
<a href="#" className="w-inline-block">
<img src="images/twitter.svg" alt="" className="mxfooter__icon" />
</a>
</div>
      <p className="mxfooter__text">© 2019 The Matrix.org Foundation C.I.C.</p>
    </div>
  </div>
  </div>
    </ThemeProvider>)
}

export default Index
