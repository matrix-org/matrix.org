/* eslint jsx-a11y/label-has-for:0 */

import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components";

import config from "../../config";

const title = `Open Tech Will Save Us | ${config.siteTitle}`;

const SHOW_LIVE_STREAM = true;

let liveStream;
if (SHOW_LIVE_STREAM) {
  liveStream = (
    <div>
      <video
        id="videoStream"
        style={{ width: "640px", height: "360px" }}
        src="https://stream.matrix.org/hls/live.m3u8"
        controls
      ></video>
      <script src="/js/hls.light.min.js"></script>
      <script src="/js/livestream.js"></script>
    </div>
  );
} else {
  liveStream = <img src="/images/otwsu6.png" alt="Open Tech Will Save Us" />;
}

const Legal = () => {
  return (
    <Layout
      hasNavPadding="true"
      excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
      titleOverride={title}
    >
      <Helmet title={title}>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="https://matrix.org/images/otwsu6-heads.png"
        />
      </Helmet>
      <div>
        {liveStream}
        <strong><a href="https://www.youtube.com/watch?v=AGs4ZC24Q1Y">Watch on YouTube</a></strong>
        <br />
        <strong><a href="https://stream.matrix.org">Watch on stream.matrix.org</a></strong>
        <h1>Open Tech Will Save Us</h1>
        <p>OTWSU #5 took place on 12th August 2020!</p>
        <p>
          <strong>
            <a href="https://www.youtube.com/watch?v=tJ8tthkVAOQ">
              Watch OTWSU #5 on YouTube
            </a>
          </strong>
        </p>
        <p>
          <strong>
            <a href="https://matrix.to/#/!AnacGSwlCZcUuAfcEU:matrix.org?via=matrix.org&via=bpulse.org&via=uhoreg.ca">
              Join the live chat now! #open-tech-meetup:matrix.org
            </a>
          </strong>
        </p>
        <p>
          Open Tech Will Save Us is a virtual meetup, taking the form of a
          monthly live video stream broadcasting on the second Wednesday of
          every month at 5pm UTC.
        </p>
        <p>
          We discuss issues relating to technology, especially the importance of
          Open, Interoperable standards, and how they can enable decentralised
          tech to keep our data private while still enabling communication.
        </p>
        <h2>Next Event</h2>
        <h3>9th September 2020</h3>
        <ul>
          <li>
            <strong>Ag3m</strong>, from <a href="https://www.laquadrature.net">La Quadrature du Net</a> will
            join us to present <em>
              "Some thoughts on moderation and censorship in a decentralised world"
              </em>.<br />
              As a member at LQDN for three years and a volunteer for more than that, Ag3m cofounded a queer 
              feminist hackerspace in Paris called <em>le Reset</em>.
          </li>
          <li>
            <strong>Sean DuBois</strong> (<a href="https://github.com/Sean-Der">Sean-Der</a>,&nbsp;
            <a href="https://matrix.to/#/@sean-der:matrix.org">@sean-der:matrix.org</a>), WebRTC-knower and author of&nbsp;
            <a href="https://webrtcforthecurious.com">WebRTC for the Curious</a> will discuss his recent work in the space.
          </li>
          <li>
            Element encryption team, represented by <strong>Damir Jelić</strong> (and channeling others), will 
            discuss the latest and greatest thoughts on encryption, including: <em>E2EE protocol changes 
              (touching on cross-signing, SSSS, dehydration) and future ideas for improving E2EE (e.g. 
              cryptographic logins, MLS)</em>!
          </li>
        </ul>
        <img src="/images/otwsu6-heads.png" alt="OTWSU6 Headshots" />
        <h2>Previous Events</h2>
        <h3>12th August 2020</h3>
        <img src="/images/otwsu5-heads.png" alt="OTWSU5 Headshots" />
        <h4>Agenda</h4>
        <ul>
          <li>
            <strong>Jonathan Beri, known Maker of Things</strong> (
            <a href="https://toot.cafe/@jberi">@jberi@toot.cafe</a>) will be
            presenting{" "}
            <em>
              Making it easier to make Things: WebAssembly and the Internet of
              Things
            </em>
            <br />
            WebAssembly is moving beyond the browser - but is it ready for IoT
            apps and tiny embedded devices? Yes...ish. In this talk, learn about
            the state of running Wasm on embedded devices and what's left to
            solve.
          </li>
          <li>
            <strong>Matthew Petry from Pine64</strong> (
            <a href="https://matrix.to/#/@fire219:matrix.org">
              @fire219:matrix.org
            </a>
            ) presents his experience with running Synapse on RockPro64 cluster,
            plus some thoughts on his time with Pine64!
          </li>
          <li>
            <strong>Nad from Element</strong> dives into the recent rebrand, in
            which he worked to combine three brands into one, all while working
            to maintain a strong identity - highly recommended for Design and
            Product <del>nerds</del> fans
          </li>
        </ul>
        <h3>8th July 2020</h3>
        <p>
          The fourth event was held on <b>Wednesday 8th July 2020</b> at{" "}
          <b>5PM UTC</b> (6PM UK time).{" "}
          <a href="/open-tech-will-save-us/4/">Watch the recording here.</a>
        </p>
        <img
          src="/images/otwsu4-heads.jpg"
          alt="OTWSU4 Headshots"
          id="otwsu4-heads"
        />
        <h4>Agenda</h4>
        <ul>
          <li>
            <strong>Jay Graber</strong> (
            <a href="https://twitter.com/arcalinea">@arcalinea</a>,{" "}
            <a href="https://matrix.to/#/@arcalinea:matrix.org">
              @arcalinea:matrix.org
            </a>
            ), creator of <a href="https://happening.net/">Happening</a> and{" "}
            <a href="https://medium.com/decentralized-web/decentralized-social-networks-e5a7a2603f53">
              all-around decentralisation fan
            </a>{" "}
            will summarize an overview of the decentralized social media
            ecosystem that they're working on.
          </li>
          <li>
            <strong>Ania M. Piotrowska</strong> (
            <a href="https://twitter.com/aniampiotrowska">@aniampiotrowska</a>),
            known for her work on <a href="https://nymtech.net/">Nym</a>,
            Loopix, and at UCL will present "Building private future for the
            internet with the Nym mixnet".
          </li>
          <li>
            <strong>Burak Nehbit</strong> (
            <a href="https://twitter.com/nehbit">@nehbit</a>,{" "}
            <a href="https://matrix.to/#/@burak:tomesh.net">
              @burak:tomesh.net
            </a>
            ) will give a deep dive into his work on{" "}
            <a href="https://getaether.net/">Aether P2P</a>.
          </li>
        </ul>
        <h3>10th June 2020</h3>
        <p>
          The third event was held on <b>Wednesday 10th June 2020</b> at{" "}
          <b>5PM UTC</b> (6PM UK time).{" "}
          <a href="/open-tech-will-save-us/3/">Watch the recording here.</a>
        </p>
        <img
          src="/images/otwsu3-heads.jpg"
          alt="OTWSU3 Headshots"
          id="otwsu3-heads"
        />
        <h4>Agenda</h4>
        <ul>
          <li>
            <strong>
              <a href="https://twitter.com/rabble">rabble</a>
            </strong>
            , who has worked on a whole lot of things, will be discussing{" "}
            <a href="https://planetary.social">Planetary</a>, his in-beta Secure
            Scuttlebutt (SSB) venture!
          </li>
          <li>
            <strong>
              <a href="https://annie.elequin.io/">Annie Elequin</a>
            </strong>
            , creator of <a href="https://dittochat.org/">Ditto Chat</a> will
            discuss her work to produce great UX in an Open Source messenger
            with React Native.
          </li>
          <li>
            Our very own <strong>Erik Johnson</strong> will give an overview of
            the recent sharding work being done to improve Synapse performance.
            Users of the Matrix.org homeserver may have already seen these
            benefits!
          </li>
        </ul>
        <h3>13th May 2020</h3>
        <p>
          The second event was held on <b>Wednesday 13th May 2020</b> at{" "}
          <b>5PM UTC</b> (6PM UK time).{" "}
          <a href="/open-tech-will-save-us/2">Watch the recording here.</a>
        </p>
        <h4>Agenda</h4>
        <ul>
          <li>
            <a
              href="http://exple.tive.org/blarg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mike Hoye
            </a>{" "}
            from Mozilla will be talking about "Verbs in the fediverse"
          </li>
          <li>
            Eugen (
            <a
              href="https://mastodon.social/@Gargron"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Gargron@mastodon.social
            </a>
            ) will talk about "how we keep mastodon.social running at scale" as
            a Q&A
          </li>
          <li>
            ... and a new VIP tour of Dendrite, the next-gen Matrix Homeserver!
          </li>
        </ul>
        <h3>8th April 2020</h3>
        <p>
          The first event was held on <b>Wednesday 8th April 2020</b> at{" "}
          <b>5PM UTC</b> (6PM UK time).{" "}
          <a href="/open-tech-will-save-us/1">Watch the recording here.</a>
        </p>
        <h4>Agenda</h4>
        <ul>
          <li>
            <a
              href="https://https://twitter.com/ara4n"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matthew Hodgson
            </a>{" "}
            technical co-founder of{" "}
            <a
              href="https://matrix.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matrix.org
            </a>{" "}
            to introduce and speak about the importance of decentralisation and
            privacy
          </li>
          <li>
            <a
              href="https://twitter.com/saghul"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saúl Ibarra Corretgé
            </a>{" "}
            from{" "}
            <a
              href="https://jitsi.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jitsi
            </a>{" "}
            on the rapid growth they've experienced since the start of the 2020
            crisis
          </li>
          <li>
            <a
              href="https://twitter.com/daviddias"
              target="_blank"
              rel="noopener noreferrer"
            >
              David Dias
            </a>{" "}
            from{" "}
            <a
              href="https://ipfs.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IPFS
            </a>{" "}
            IPFS introducing gossipsub in libp2p, including the security
            hardening work that they've been putting into v1.1!
          </li>
          <li>
            <a
              href="https://twitter.com/valereonmobile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Valère
            </a>
            , from{" "}
            <a
              href="https://matrix.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matrix
            </a>{" "}
            and{" "}
            <a href="https://riot.im" target="_blank" rel="noopener noreferrer">
              Riot
            </a>
            , who will present the importance of UX and cross-signing keys in
            end-to-end encrypted communications.
          </li>
        </ul>
        <h2>How to join</h2>
        <p>
          <strong>
            <a href="https://matrix.to/#/!AnacGSwlCZcUuAfcEU:matrix.org?via=matrix.org&via=bpulse.org&via=uhoreg.ca">
              Join the live chat now! #open-tech-meetup:matrix.org
            </a>
          </strong>
        </p>
        <p>
          From the live chat, you can ask questions to the presenters! We can
          invite you to join the broadcast, or if you prefer we'll read them out
          for you.
        </p>
        <p>
          Once we're live there will be a video stream available on this page.
          You can also{" "}
          <strong>
            <a href="https://www.youtube.com/watch?v=O3YP1TU-L_8">
              join the stream via YouTube
            </a>
          </strong>
          .
        </p>
        <p>
          Issues with this stream? Try{" "}
          <a href="https://stream.matrix.org/">https://stream.matrix.org/</a>
        </p>
        <h3>Important note on timezones</h3>
        5pm UTC is:
        <ul>
          <li>7pm in Berlin</li>
          <li>6pm in the UK</li>
          <li>1pm in New York</li>
          <li>10am in California</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Legal;
