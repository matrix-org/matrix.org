import React from "react";
import { graphql } from "gatsby";

import Helmet from "react-helmet";
import { Layout, MXContentMain } from "../components";
import config from "../../config";

const title = "Using Matrix";

const UsingMatrix = ({ data }) => {
    const nodes = data.allMdx.edges;
    return (
        <Layout navmode="discover">
            <MXContentMain>
                <Helmet title={`${title} | ${config.siteTitle}`} />
                    <h1 className="mxblock--project__hx">{title}</h1>

                <div className="mxblock mxblock--project">
                    <h2 className="mxblock--project__hx">Case Studies</h2>
                    <div className="mxgrid">
                        {nodes.filter(n => n.node.frontmatter.section === "Case Studies").map(function (user, i) {
                            const fm = user.node.frontmatter;
                            return (
                                <div className="mxgrid__item50" key={fm.title}>
                                    <a href={user.node.fields.slug}>
                                        <h3>{fm.title}</h3>
                                        {fm.thumbnail && <img src={fm.thumbnail} alt={fm.title} style={{"width": "100%"}} />}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className="mxblock mxblock--project">
                    <h2 className="mxblock--project__hx">Open Source Users</h2>
                    <p>See more details on our <a href="/using-matrix/open-source/">list of Open Source users</a>.</p>
                    <div className="mxgrid">
                        {nodes.filter(n => n.node.frontmatter.section === "User").map(function (user, i) {
                            const fm = user.node.frontmatter;
                            return (
                                <div className="mxgrid__item25" style={{"width": "25%"}} key={fm.title}>
                                    <div className="verticalHelper" >
                                        {fm.thumbnail &&
                                        <img className="verticalHelperImage" src={fm.thumbnail} alt={fm.title} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
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
        frontmatter: { section: { in: ["User", "Case Studies"] }, featured: { eq: true } }
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
