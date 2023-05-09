/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

import { ThemeProvider } from 'styled-components'
import theme from '../../config/theme'

import { graphql } from 'gatsby'
import { Link } from "gatsby"
import SEO from '../components/SEO'
import useBuildTime from '../hooks/useBuildTime'

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

const Index = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const buildTime = useBuildTime()
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Helmet title={`Matrix.org`}>
          <link rel="stylesheet" type="text/css" href="/css/how-it-works.css" />
          <script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
          <script type="text/javascript" src="/js/d3.v3.min.js"></script>
          <script type="text/javascript" src="/js/how-it-works.js"></script>
          <script async="" src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
          <script async="" defer="" src="https://buttons.github.io/buttons.js" />
        </Helmet>
        <Navigation />
        <SEO buildTime={buildTime} />
        <div className="mxherobackground">
          <div className="mxherobackground__img">
          </div>
          <div className="mxcontent mxcontent--home_hero">
            <div className="mxcontent__main delete">
              <div className="mxblock mxblock--hero">
                <img src="images/matrix-logo-white.svg" alt="" className="mxblock--hero__logo" />
                <h1 className="mxblock--hero__hx delete">An open network for secure, decentralized communication</h1>
                <a href="/docs/guides/introduction" className="mxblock__btn mxblock--hero__btn mxblock--hero__btn--mctesto w-button">Learn More</a>
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
                <a href="#about" className="mxblock__btn mxblock--hero__btn w-button">Get started</a>
              </div>
              <div className="mxblock">
                <div className="mxgrid mxgrid--imagine">
                  <div className="mxgrid__item50">
                    <div className="mxgrid__item__bg mxgrid__item__bg--imagine">
                      <ul className="mximagine">
                        <li>Imagine a world...</li>
                        <li>...where it is as simple to message or call anyone as it is to send them an email.</li>
                        <li>...where you can communicate without being forced to install the same app.</li>
                        <li>...where you can choose who hosts your communication.</li>
                        <li>...where your conversations are secured by E2E encryption.</li>
                        <li>...where there’s a simple standard HTTP API for sharing real-time data on the web.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mxgrid__item50">
                    <div className="mxgrid__item__bg mxgrid__item__bg--imagine">
                      <p className="mxp mxthisismatrix">
                        This is Matrix.
                      </p>
                      <p className="mxp mxmatrixdescription">
                        Matrix is an open source project
                        that publishes the <br /><a href="/docs/spec" onClick={() => { window.location = 'https://matrix.org//docs/spec'; return false; }}>Matrix open standard</a> for
                        secure, decentralised, real-time communication,
                        and its Apache licensed <br /><a href="https://github.com/matrix-org">reference implementations</a>.
                      </p>
                      <p className="mxp mxmatrixdescription">  Maintained by the non-profit <a href="/foundation/">Matrix.org Foundation</a>, we aim <br />
                        to create an open platform which is as
                        independent, vibrant and evolving
                        as the Web itself... but for communication.
                      </p>
                      <p className="mxp mxmatrixdescription">
                        As of June 2019, Matrix is <Link to="/blog/2019/06/11/introducing-matrix-1-0-and-the-matrix-org-foundation">out of beta</Link>, and the protocol is fully suitable for production usage.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mxblock mxblock--sponsors">
                  <div className="mxgrid">
                    <div className="mxgrid__item100">
                      <div className="mxgrid__item__bg">
                        <h2 className="mxblock__hx">Support Matrix</h2>
                        <p className="mxp">If you share our vision, or are building on top of Matrix, please consider donating.</p>
                        <p className="mxp">Donorbox is currently the best way to support us as individuals. Learn more on our <a href="/supporters">supporters page</a>.</p>
                        <div className="mxgrid__support">
                          <div className="mxgrid__support__item">
                            <div className="mxgrid__item__bg__vert">
                              <h4>Liberapay</h4>
                              <div className="mxgrid__item__bg__vert smaller">
                                <a href="https://liberapay.com/matrixdotorg">
                                  <img alt="Liberapay" src="/images/fund-via-liberapay.png" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="mxgrid__support__item">
                            <div className="mxgrid__item__bg__vert">
                              <h4>Donorbox</h4>
                              <div className="mxgrid__item__bg__vert">
                                <a href="https://donorbox.org/keep-matrix-exciting">
                                  <img alt="Donorbox" src="/images/donorbox.png" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="mxgrid__support__item">
                            <div className="mxgrid__item__bg__vert smaller">
                              <h4>Patreon</h4>
                              <div className="mxgrid__item__bg__vert">
                                <a href="https://www.patreon.com/matrixdotorg">
                                  <img alt="Patreon" src="/images/patreon.png" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4>Cryptocurrency</h4>
                            <p className="mxgrid__support__item__p">You can also send us cryptocurrency:<br /><small>BTC 1LxowEgsquZ3UPZ68wHf8v2MDZw82dVmAE<br />ETH 0xA5f9a4f9E024F6D727f7afdA9257e22329A97485</small><br /><small>DOT 12JDhAt3Y1NPpcLMxunH2f8DASZemC6nWPC9nkXdT3ui4zJG</small></p>
                          </div>
                        </div>
                        <a href="/supporters" class="cta">Donate</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mxgrid">
                  <div className="mxgrid__item50">
                    <div className="mxgrid__item__bg">
                      <img src="images/basic_elaboration_message_happy.svg" alt="" className="mxgrid__item__bg__img" />
                      <h4 className="mxgrid__item__bg__hx">Messaging</h4>
                      <div className="mxgrid__item__bg__vert">
                        <p className="mxgrid__item__bg__p">
                          Matrix gives you simple <a href="/docs/spec/" onClick={() => { window.location = 'https://matrix.org//docs/spec'; return false; }}>HTTP APIs</a> and <a
                            href="/sdks/">SDKs</a> (iOS, Android, Web) to create chatrooms,
                          direct chats and chat bots, complete with end-to-end encryption, file transfer, synchronised
                          conversation history, formatted messages, read receipts and more.
                        </p>
                        <p className="mxgrid__item__bg__p">
                          Conversations are replicated over all the servers participating in them, meaning there are no single
                          point of control or failure.  You can reach any other user in the global Matrix ecosystem of over 40M
                          users, even including those on other networks via <a
                            href="/bridges/">bridges</a>.
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
                      <a href="/docs/guides/end-to-end-encryption-implementation-guide" className="mxgrid__item__bg__btn w-button">Learn more</a>
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
                          Matrix community provides bridges for Telegram, Discord, WhatsApp, Facebook, Signal and many more.
                        </p>
                      </div>
                      <a href="/bridges/" className="mxgrid__item__bg__btn w-button">Learn more</a>
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
                  By default, Matrix uses simple <a href="/docs/spec/client_server/latest.html#api-standards" onClick={() => { window.location = 'https://matrix.org//docs/spec/client_server/latest.html#api-standards'; return false; }}>HTTPS+JSON APIs
                  </a> as its baseline transport, but also embraces more
                  sophisticated transports such as <a href="https://github.com/matrix-org/matrix-doc/blob/master/attic/drafts/websockets.rst">WebSockets
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
                      <br /><br />
                      The clients are all participating in the same Matrix room, which
                      is synchronised across the three participating servers.
                    </div>
                    <div className="legend" id="legend2">
                      Alice sends a JSON message to a room on her homeserver.
                      <pre>{example1}</pre>
                    </div>
                    <div className="legend" id="legend3">
                      Alice's homeserver adds the JSON to its graph of history, linking
                      it to the most recent unlinked object(s) in the graph.
                      <br /><br />
                      The server then signs the JSON <b>including the signatures of the
                        parent objects</b> to calculate a tamper-resistent signature for
                      the history.
                    </div>
                    <div className="legend" id="legend4">
                      The server then sends the signed JSON over HTTPS to any other
                      servers which are participating in the room.
                      <pre>{example2}</pre>
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
                      <pre>{example3}</pre>
                    </div>
                    <div className="legend" id="legend7">
                      Bob sends a response to Alice's message, and his server adds his
                      message into his copy of the room's history, linking it to the most
                      recent unlinked object in the graph - Alice's last message.
                    </div>
                    <div className="legend" id="legend8">
                      Meanwhile, Charlie also responds to Alice's message - racing with
                      Bob's message.
                      <br /><br />
                      Alice, Bob and Charlie's homeservers all have different views of
                      the message history at this point - but Matrix is designed to
                      handle this inconsistency.
                    </div>
                    <div className="legend" id="legend9">
                      Bob's homeserver relays his message through to Alice and Charlie's
                      servers, who accept it.
                      <br /><br />
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
                      <br /><br />
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
            <div className="mxgrid__item33 mxgrid__item33--bullet">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <img src="images/basic_signs.svg" alt="" className="mxgrid__item__bg__img" />
                <div className="mxgrid__item__bg__vert">
                  <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Simple pragmatic<a href="/docs/api" onClick={() => { window.location = 'https://matrix.org//docs/api'; return false; }}> RESTful HTTP/JSON APIs</a> by default
                  </h4>
                </div>
              </div>
            </div>
            <div className="mxgrid__item33 mxgrid__item33--bullet">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <img src="images/basic_spread_text.svg" alt="" className="mxgrid__item__bg__img" />
                <div className="mxgrid__item__bg__vert">
                  <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard"><a href="/docs/spec" onClick={() => { window.location = 'https://matrix.org//docs/spec'; return false; }}>Open specification</a> of the Matrix standard<br /><br /></h4>
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
                  <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Maintained by the non-profit <a href="/foundation/">Matrix.org Foundation</a></h4>
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
                  {edges.map(edge => (
                    <div key={edge.node.fields.slug} className="mxgrid__item50 mxgrid__item50--news">
                      <div className="mxgrid__item__bg mxgrid__item__bg--news">
                        <h3 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">{edge.node.frontmatter.title}</h3>
                        <div className="mxgrid__item__bg__vert">
                          <p className="mxgrid__item__bg__p mxgrid__item__bg__p--byline">{edge.node.frontmatter.date} by {edge.node.frontmatter.author}<br /></p>
                          <p className="mxgrid__item__bg__p">{edge.node.excerpt}<br /></p>
                        </div>
                        <a href={edge.node.fields.slug} className="mxgrid__item__bg__btn w-button">Read more</a>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/blog/posts" className="mxgrid__item__bg__btn w-button">View all posts</a>
              </div>
              <div className="mxblock">
                <h2 className="mxblock__hx">Explore Matrix</h2>
                <div className="mxblock__explore">
                  <a href="/docs/projects/try-matrix-now" className="mxblock__explore__item w-inline-block">
                    <img src="images/basic_elaboration_message_happy.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">Try Matrix</div>
                  </a>
                  <a href="/clients-matrix/" className="mxblock__explore__item w-inline-block">
                    <img src="images/software_layout_header_sideleft.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">Clients</div>
                  </a>
                  <a href="/docs/projects/bots" className="mxblock__explore__item w-inline-block">
                    <img src="images/basic_calculator.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">Bots</div>
                  </a>
                  <a href="/sdks/" className="mxblock__explore__item w-inline-block">
                    <img src="images/software_layers2.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">SDKs</div>
                  </a>
                  <a href="/hosting/" className="mxblock__explore__item w-inline-block">
                    <img src="images/basic_cloud.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">Hosting</div>
                  </a>
                </div>
              </div>
              <div className="mxblock">
                <h2 className="mxblock__hx">SDKs</h2>
                <p>Native SDKs for multiple platforms, including:</p>
                <div className="mxblock__explore">
                  <a href="https://github.com/poljar/matrix-nio" className="mxblock__explore__item w-inline-block">
                    <img src="images/python.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">Python</div>
                  </a>
                  <a href="https://github.com/matrix-org/matrix-js-sdk" className="mxblock__explore__item w-inline-block">
                    <img src="images/js.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">JavaScript</div>
                  </a>
                  <a href="https://github.com/matrix-org/matrix-android-sdk" className="mxblock__explore__item w-inline-block">
                    <img src="images/android.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">Android</div>
                  </a>
                  <a href="https://github.com/matrix-org/matrix-ios-sdk" className="mxblock__explore__item w-inline-block">
                    <img src="images/iOS.svg" alt="" className="mxblock__explore__item__img" />
                    <div className="mxblock__explore__item__p">iOS</div>
                  </a>
                </div>
                <a href="/sdks/" className="mxgrid__item__bg__btn w-button">View all SDKs</a>
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
                              <iframe title="gh-synapse" src="https://ghbtns.com/github-btn.html?user=matrix-org&repo=synapse&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
                            </div>
                          </div>
                          <div className="mxblock__github">
                            <div className="mxblock__github__left">
                              <p className="paragraph">JavaScript SDK</p>
                            </div>
                            <div className="mxblock__github__right">
                              <div className="w-embed">
                                <iframe title="gh-jssdk" src="https://ghbtns.com/github-btn.html?user=matrix-org&repo=matrix-js-sdk&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
                              </div>
                            </div>
                          </div>
                          <div className="mxblock__github">
                            <div className="mxblock__github__left">
                              <p className="paragraph">Android SDK</p>
                            </div>
                            <div className="mxblock__github__right">
                              <div className="w-embed">
                                <iframe title="gh-androidsdk" src="https://ghbtns.com/github-btn.html?user=matrix-org&repo=matrix-android-sdk&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
                              </div>
                            </div>
                          </div>
                          <div className="mxblock__github">
                            <div className="mxblock__github__left">
                              <p className="paragraph">iOS SDK</p>
                            </div>
                            <div className="mxblock__github__right">
                              <div className="w-embed">
                                <iframe title="gh-iossdk" src="https://ghbtns.com/github-btn.html?user=matrix-org&repo=matrix-ios-sdk&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a href="https://github.com/matrix-org/" className="mxgrid__item__bg__btn w-button">View all on GitHub</a>
                      </div>
                    </div>
                  </div>
                  <div className="mxgrid__item50">
                    <div className="mxgrid__item__bg">
                      <h2 className="mxblock__hx">The Matrix Foundation</h2>
                      <div className="mxgrid__item__bg__vert">
                        <p className="mxp">Matrix is managed through an open governance process, looked after by <a href="/foundation/">The Matrix.org Foundation</a> - a non-profit UK Community Interest Company.<br /></p>
                        <p className="mxp">It acts as a neutral guardian of the Matrix spec, nurturing and growing Matrix for the benefit of the whole ecosystem.<br /></p>
                        <p className="mxp">The Guardians are the legal directors of the <a href="/foundation/">Foundation</a>, responsible for ensuring that it keeps on mission and neutrally protects the development of Matrix.<br /></p>
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

        <div className="mxblock">
          <div className="mxgrid">
            <div className="mxgrid__item50">
              <div style={{ "float": "right" }}>
                <blockquote className="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I have seen the future of distributed collaboration and it is Matrix.   The .NET binding looks old, incomplete and I maintained.   If we get GSoC students this year, I’ll be happy to mentor, in the meantime I should probably contribute to it: <a href="https://t.co/nJY4iNHaLQ">https://t.co/nJY4iNHaLQ</a></p>&mdash; Miguel de Icaza (@migueldeicaza) <a href="https://twitter.com/migueldeicaza/status/1093148021980889088?ref_src=twsrc%5Etfw">February 6, 2019</a></blockquote>
              </div>
            </div>
            <div className="mxgrid__item50">
              <blockquote className="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I finally started a spreadsheet to compare relative security, privacy, compatibility, and features of various messenger systems. TL;DR <a href="https://twitter.com/RiotChat?ref_src=twsrc%5Etfw">@RiotChat</a> / <a href="https://twitter.com/matrixdotorg?ref_src=twsrc%5Etfw">@matrixdotorg</a> is winning on all fronts. <a href="https://t.co/7zxczdjwwJ">https://t.co/7zxczdjwwJ</a></p>&mdash; Lance R. Vick (@lrvick) <a href="https://twitter.com/lrvick/status/1051260991479013376?ref_src=twsrc%5Etfw">October 13, 2018</a></blockquote>
            </div>
            <div className="mxgrid__item50">
              <div style={{ "float": "right" }}>
                <blockquote className="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">We are spending more and more time in <a href="https://twitter.com/matrixdotorg?ref_src=twsrc%5Etfw">@matrixdotorg</a>. <a href="https://twitter.com/RiotChat?ref_src=twsrc%5Etfw">@RiotChat</a> works like a charm, better than <a href="https://twitter.com/SlackHQ?ref_src=twsrc%5Etfw">@SlackHQ</a> for many things and of course way better than IRC. It&#39;s awesome to have so many open communities forming and being able to jump from one channel to the other. Give it a try! 📢 <a href="https://t.co/5uL1D4ryQo">pic.twitter.com/5uL1D4ryQo</a></p>&mdash; poliastro (@poliastro_py) <a href="https://twitter.com/poliastro_py/status/1102912894260469760?ref_src=twsrc%5Etfw">March 5, 2019</a></blockquote>
              </div>
            </div>
          </div>
        </div>
        <div className="mxcontentwrapper">
          <div className="mxcontent">
            <div className="mxcontent__main">

              <div className="mxblock">
                <div className="mxgrid">
                  <div className="mxgrid__item100">
                    <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                      <h2 className="mxblock__hx">Thank you to our incredible sponsors</h2>
                      <div className="mxgrid__sponsors">
                        <div className="mxgrid__sponsors__item">
                          <div className="mxgrid__sponsors__logo">
                            <img src="images/upcloud.svg" alt="" className="mxgrid__sponsors__item__logo__img" />
                          </div>
                          <div className="mxgrid__item__bg__vert">
                            <h4>UpCloud</h4>
                            <p className="mxgrid__sponsors__item__p">Matrix.org is generously hosted by UpCloud! Host your homeserver via UpCloud and get a $25 credit.</p>
                            <a href="https://upcloud.com/">Learn more</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

      </div>
    </ThemeProvider>)
}

export const postQuery = graphql`
  query IndexBlogPage {
    allMdx(sort: { fields: [frontmatter___date, fileAbsolutePath], order: DESC },
      limit:4,
      filter: {frontmatter: {date: {ne: null}}}) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            date
            author
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Index
