/* eslint jsx-a11y/label-has-for:0 */

import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components";

import config from "../../config";
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import moment from "moment";


const title = `Open Tech Will Save Us | ${config.siteTitle}`;

const SHOW_LIVE_STREAM = false;
const NEXT_EVENT = 8;

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
  liveStream = <img src="/images/otwsu7.png" alt="Open Tech Will Save Us" />;
}

const OTWSU = ({ data }) => {
  const events = data.allMdx.edges;
  const nextEvent = events.find(e => e.node.frontmatter.edition === NEXT_EVENT);
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
          content="https://matrix.org/images/otwsu7-social.png"
        />
      </Helmet>
      <div>
        {liveStream}
        <br />
        <strong><a href="https://stream.matrix.org">Watch on stream.matrix.org</a></strong><br />
        <strong><a href="https://www.youtube.com/watch?v=xJ2Tjc1Aj0A">Find the stream at https://www.youtube.com/watch?v=xJ2Tjc1Aj0A</a></strong>
        <h1>Open Tech Will Save Us</h1>
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
        <h3>{moment.utc(nextEvent.node.frontmatter.eventdate).format('Do MMMM YYYY')}</h3>
        <MDXRenderer>{nextEvent.node.body}</MDXRenderer>
        <h2>Previous Events</h2>
        {events.filter(event => event.node.frontmatter.edition < NEXT_EVENT).map(event => {
          const fm = event.node.frontmatter;
          return (

            <div className="mxgrid">

              <div className="mxgrid__item25">
                <br />
                {fm.image &&
                  <a href={fm.edition}><img src={fm.image} /></a>
                }
              </div>
              <div className="mxgrid__item75">
                <h3>Edition {fm.edition}: {moment.utc(fm.eventdate).format('Do MMMM YYYY')}</h3>
                {fm.youtube && 
                <p>
                  Event #{fm.edition} was held on <strong>{moment.utc(fm.eventdate).format('Do MMMM YYYY')}</strong>. <a href={fm.edition}>Watch the recording here.</a>
                </p>
                }
                <MDXRenderer>{event.node.body}</MDXRenderer>
              </div>
            </div>
          )
        })}

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

export const query = graphql`{
  allMdx(
    filter: {
      frontmatter: { section: { eq: "otwsu" } }
    }
    sort: { fields: frontmatter___edition, order: DESC }
  ) {
    edges {
      node {
        frontmatter {
          section
          edition
          youtube
          eventdate
          image
        }
        fields {
          slug
        }
        body
      }
    }
  }
}`

export default OTWSU;
