import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import kebabCase from "lodash/kebabCase";

import { Layout, MXContentMain, SectionTitle } from "../../components";
import config from "../../../config";

const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;

const Category = ({
  data: {
    categories: { group },
    archive: { edges }
  }
}) => (
  <Layout navmode="blog">
    <Helmet title={`Categories | ${config.siteTitle}`} />
    <MXContentMain>
      <SectionTitle>Categories</SectionTitle>

      <div className="mxgrid">
        {group.map(category => (
          <div className="mxgrid_item33">
            <Title key={category.fieldValue}>
              <Link to={`/blog/category/${kebabCase(category.fieldValue)}`}>
                {category.fieldValue}
              </Link>{" "}
              ({category.totalCount})
            </Title>
            <ul style={{ fontSize: "smaller" }}>
              {edges
                .filter(post =>
                  post.node.frontmatter.categories.includes(category.fieldValue)
                )
                .slice(0, 5)
                .map(post => (
                  <li>
                    <a href={post.node.fields.slug}>
                      {post.node.frontmatter.title}
                    </a>
                  </li>
                ))}
              <li>
                <Link to={`/blog/category/${kebabCase(category.fieldValue)}`}>
                  ... more "{category.fieldValue}" posts
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
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
  query CategoriesPage {
    categories: allMdx (
      filter: {frontmatter: {date: {ne: null}, author: {ne: null} } }
    ){
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
    archive: allMdx(
      sort: { fields: [frontmatter___date, internal.contentFilePath], order: DESC },
        filter: {frontmatter: {date: {ne: null}, author: {ne: null}}}) {
        totalCount
        edges {
          node {
            frontmatter {
              title
              date
              categories
            }
            fields {
              slug
            }
          }
        }
      }
    }
`;
