import React from "react";
import { graphql } from "gatsby";

import { Layout, MXContentMain } from "../components";
import config from "../../config";
import { MDXRenderer } from 'gatsby-plugin-mdx';

const title = "Using Matrix";

export function Head() {
  return (
    <title id="title">{title} | {config.siteTitle}</title>
  )
}

const UsingMatrix = ({ data }) => {
  const nodes = data.allMdx.edges;
  return (
    <Layout navmode="discover">
      <MXContentMain>
        <h1>{title}</h1>
        <p>Matrix is used by everyone from Universities, Governments, Small
            Businesses and Open Source communities.<br />
            Let's collect some
            examples and case studies of how it's used today.</p>
        <h2>Case Studies</h2>
        <div className="mxgrid">
          {nodes
            .filter(n => n.node.frontmatter.section === "Case Studies")
            .map(function(user, i) {
              const fm = user.node.frontmatter;
              return (
                <div className="mxgrid__item50" key={fm.title}>
                  <a href={user.node.fields.slug}>
                    <h3>{fm.title}</h3>
                    {fm.thumbnail && (
                      <img
                        src={fm.thumbnail}
                        alt={fm.title}
                        style={{ width: "100%" }}
                      />
                    )}
                  </a>
                </div>
              );
            })}
        </div>

        <h2>Open Source Users</h2>
        {nodes
            .filter(n => n.node.frontmatter.section === "User").map(function(user, i) {
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
      </MXContentMain>
    </Layout>
  );
};
//{{"height": "100%", "position": "relative"}}
//{{"width": "100%", "top": 0, "bottom": 0, "position": "absolute", "margin": "auto"}}

export const query = graphql`
  {
    allMdx(
      filter: {
        frontmatter: {
          section: { in: ["User", "Case Studies"] }
          featured: { eq: true }
        }
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
          fields {
            slug
          }
          body
        }
      }
    }
  }
`;
export default UsingMatrix;
