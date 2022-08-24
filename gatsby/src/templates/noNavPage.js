import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";

import { Layout, SEO, MXContentMain } from "../components";

const Title = styled.h1``;

export function Head({ pageContext: { slug }, data: { mdx: postNode } }) {
  return <SEO postPath={slug} postNode={postNode} article />;
}

const PostContent = styled.div``;

const Page = ({ data: { mdx: postNode }, children }) => {
  const post = postNode.frontmatter;

  return (
    <Layout hasNavPadding="true" customSEO>
      <MXContentMain>
        <div class="mxcontent__main__doc">
          <Title>{post.title}</Title>
          <PostContent>{children}</PostContent>
        </div>
      </MXContentMain>
    </Layout>
  );
};

export default Page;

Page.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
};

Page.defaultProps = {
  pageContext: PropTypes.shape({})
};

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        author
        image
      }
      tableOfContents
      parent {
        ... on File {
          mtime
          birthTime
        }
      }
    }
  }
`;
