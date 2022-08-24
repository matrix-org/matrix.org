import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import { Layout, MXContentMain } from "../../components";
import config from "../../../config";

const Category = ({
  data: {
    allMdx: { nodes }
  }
}) => (
  <Layout navmode="blog">
    <Helmet title={`Blog Archive ${config.siteTitle}`} />
    <MXContentMain>
      <h1>Blog Archive</h1>
      {nodes.map(node => (
        <p>
          {node.frontmatter.date}{" "}
          <a href={node.fields.slug}>{node.frontmatter.title}</a>
        </p>
      ))}
    </MXContentMain>
  </Layout>
);

export default Category;

Category.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.array.isRequired
    })
  }).isRequired
};

export const postQuery = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { date: { ne: null }, author: { ne: null } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
    }
  }
`;
