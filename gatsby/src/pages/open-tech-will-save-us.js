/* eslint jsx-a11y/label-has-for:0 */

import React from "react";
import { Layout } from "../components";

import config from "../../config";
import { MDXRenderer } from 'gatsby-plugin-mdx';
import moment from "moment";
import { graphql } from "gatsby";

const title = `Open Tech Will Save Us | ${config.siteTitle}`;

const SHOW_LIVE_STREAM = true;
const NEXT_EVENT = 18;

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
      <br />
      <strong>
        <a href="https://stream.matrix.org">Watch on stream.matrix.org</a>
      </strong>
      <br />
      <strong>
        <a href="https://youtube.com/watch?v=pGE2KEasjbc">
          Find the stream at https://youtube.com/watch?v=pGE2KEasjbc
        </a>
      </strong>
      <script src="/js/hls.light.min.js"></script>
      <script src="/js/livestream.js"></script>
    </div>
  );
} else {
  liveStream = <img src="/images/otwsu18.png" alt="Open Tech Will Save Us" />;
}

export function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:image"
        content="https://matrix.org/images/otwsu18.png"
      />
    </>
  );
}

const OTWSU = ({ data }, children) => {
  const events = data.allMdx.nodes;
  const nextEvent = events.find(e => e.frontmatter.edition === NEXT_EVENT);
  return (
    <Layout
      hasNavPadding="true"
      excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the last Wednesday of every month at 6pm Paris time."
      titleOverride={title}
    >
      <div>
        {liveStream}
        <br />
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
          monthly live video stream broadcasting on the last Wednesday of every
          month at 6pm Paris time.
        </p>
        <p>
          We discuss issues relating to technology, especially the importance of
          Open, Interoperable standards, and how they can enable decentralised
          tech to keep our data private while still enabling communication.
        </p>
        {nextEvent && (
          <div>
            <h2>Next Event</h2>
            <h3>
              {moment
                .utc(nextEvent.frontmatter.eventdate)
                .format("Do MMMM YYYY")}
            </h3>
            <p>
              Return to this page at the specified time to watch the stream. You
              can also{" "}
              <a href="https://www.google.com/url?q=https://calendar.google.com/calendar/ical/c_6ns9uddvmgqpop6l7qfna32dcc%2540group.calendar.google.com/public/basic.ics&source=gmail-imap&ust=1659090704000000&usg=AOvVaw2DVHjn4SycYX9yjODwcZu7">
                add us to your calendar
              </a>
              .
            </p>
            <MDXRenderer>{nextEvent.node.body}</MDXRenderer>
          </div>
        )}
        <h2>Previous Events</h2>
        {events
          .filter(event => event.frontmatter.edition < NEXT_EVENT)
          .map(event => {
            const fm = event.frontmatter;
            return (
              <div className="mxgrid">
                <div className="mxgrid__item25">
                  <br />
                  {fm.image && (
                    <a href={fm.edition}>
                      <img src={fm.image} />
                    </a>
                  )}
                </div>
                <div className="mxgrid__item75">
                  <h3>
                    Edition {fm.edition}:{" "}
                    {moment.utc(fm.eventdate).format("Do MMMM YYYY")}
                  </h3>
                  {fm.youtube && (
                    <p>
                      Event #{fm.edition} was held on{" "}
                      <strong>
                        {moment.utc(fm.eventdate).format("Do MMMM YYYY")}
                      </strong>
                      . <a href={fm.edition}>Watch the recording here.</a>
                    </p>
                  )}
                  <MDXRenderer>{event.node.body}</MDXRenderer>
                </div>
              </div>
            );
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
        Paris time is CET in winter and CEST in summer.
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMdx(
      filter: { frontmatter: { section: { eq: "otwsu" } } }
      sort: { fields: frontmatter___edition, order: DESC }
    ) {
      nodes {
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
      }
    }
  }
`;

export default OTWSU;
