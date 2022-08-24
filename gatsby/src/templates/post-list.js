import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import {
  Layout,
  Article,
  PrevNext,
  MXContentMain,
  MXContentNav
} from "../components";

const PostList = ({
  pageContext: { limit, skip, currentPage, posts },
  data: { allMdx }
}) => {
  const { nodes } = allMdx;

  const prevTitle = `Page ${currentPage - 1}`;
  const prevSlug =
    currentPage === 2 ? `/blog/posts/` : `/blog/posts/${currentPage - 1}`;
  const prev =
    currentPage === 1
      ? null
      : { frontmatter: { title: prevTitle }, fields: { slug: prevSlug } };
  const nextTitle = `Page ${currentPage + 1}`;
  const nextSlug = `/blog/posts/${currentPage + 1}`;

  return (
    <Layout hasSideNavigation="true" navmode="blog">
      <MXContentMain hasSideNavigation="true">
        {nodes.map(post => (
          <Article
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            excerpt={post.excerpt}
            timeToRead={post.timeToRead}
            slug={post.fields.slug}
            categories={post.frontmatter.categories}
            key={post.fields.slug}
            body={post.body}
            author={post.frontmatter.author}
          />
        ))}
        <PrevNext
          prev={prev}
          next={{
            frontmatter: { title: nextTitle },
            fields: { slug: nextSlug }
          }}
        />
      </MXContentMain>
      <div>
        <iframe
          title="DDGSearch"
          src="https://duckduckgo.com/search.html?width=250&site=matrix.org&prefill=Search Matrix.org with DDG"
          style={{
            overflow: "hidden",
            margin: 0,
            padding: 0,
            width: "308px",
            height: "40px"
          }}
          frameBorder="0"
        ></iframe>
        <MXContentNav
          title="All posts"
          content={posts}
          currentSlug="/blog"
        ></MXContentNav>
      </div>
    </Layout>
  );
};

export default PostList;

PostList.propTypes = {
  pageContext: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired
    })
  }).isRequired
};

export const postQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { date: { ne: null }, author: { ne: null } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          categories
          author
        }
        fields {
          slug
          timeToRead {
            time
          }
        }
        body
        excerpt(pruneLength: 200)
      }
    }
  }
`;
