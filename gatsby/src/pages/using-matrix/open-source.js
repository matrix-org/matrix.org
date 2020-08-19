import React from "react";
import { graphql } from "gatsby";

import Helmet from "react-helmet";
import { Layout, MXContentMain } from "../../components";
import config from "../../../config";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

const title = "Open Source Users";

const OpenSource = ({ data }) => {
  const users = data.allMdx.edges;
  return (
    <Layout navmode="discover">
      <MXContentMain>
        <Helmet title={`${title} | ${config.siteTitle}`} />
        <div className="mxblock mxblock--project">
          <h1 className="mxblock--project__hx">{title}</h1>
          {users.map(function(user, i) {
            const fm = user.node.frontmatter;
            const left = i % 2 === 0;
            const image = (
              <div
                className="mxgrid__item25"
                style={{ textAlign: left ? "right" : "left" }}
              >
                {fm.thumbnail && <img src={fm.thumbnail} alt={fm.title} />}
              </div>
            );
            const body = (
              <div
                className="mxgrid__item75"
                style={{ textAlign: left ? "left" : "right" }}
              >
                <h2>{fm.title}</h2>
                {fm.homeserver && (
                  <p>
                    {fm.title} have their own homeserver at {fm.homeserver}.
                  </p>
                )}
                <MDXRenderer>{user.node.body}</MDXRenderer>
                <h3>Rooms</h3>
                <p>
                  Join their main room:{" "}
                  <a href={"https://matrix.to/#/" + fm.main_room}>
                    {fm.main_room}
                  </a>
                </p>
                {fm.rooms && <h4>Other rooms</h4>}
                {fm.rooms &&
                  fm.rooms.map(room => {
                    return (
                      <div key={fm.title + room}>
                        <a href={"https://matrix.to/#/" + room}>{room}</a>
                      </div>
                    );
                  })}
              </div>
            );
            return (
              <div className="mxgrid" key={fm.title}>
                {left && image}
                {left && body}
                {!left && body}
                {!left && image}
              </div>
            );
          })}
        </div>
      </MXContentMain>
    </Layout>
  );
};

export const query = graphql`
  {
    allMdx(
      filter: {
        frontmatter: { section: { eq: "User" }, featured: { eq: true } }
      }
      sort: { fields: frontmatter___sort_order, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            section
            homeserver
            main_room
            rooms
            thumbnail
          }
          body
        }
      }
    }
  }
`;
export default OpenSource;
