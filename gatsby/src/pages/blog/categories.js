import React from "react";
import PropTypes from "prop-types";
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

export function Head() {
  return (
    <title>Categories | {config.siteTitle}</title>
  )
}

const Category = ({
  data: {
    categories: { group },
    archive: { nodes }
  }
}) => (
  <Layout navmode="blog">
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
              {nodes
                .filter(post =>
                  post.frontmatter.categories.includes(category.fieldValue)
                )
                .slice(0, 5)
                .map(post => (
                  <li>
                    <a href={post.fields.slug}>{post.frontmatter.title}</a>
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
  query {
    categories: allMdx(
      filter: {
        frontmatter: { date: { ne: null }, author: { ne: null } }
      }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
    archive: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { date: { ne: null }, author: { ne: null } }
      }
    ) {
      totalCount
      nodes {
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
`;
