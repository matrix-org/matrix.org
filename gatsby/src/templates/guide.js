import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";

import {
  Layout,
  SEO,
  MXContentMain,
  MXGuidesNav,
  MXInPageTOC
} from "../components";

const Title = styled.h1``;

const PostContent = styled.div``;

const Page = ({
  pageContext: { slug, pages, pagesBySection, pagesListTitle, navMode },
  data: { mdx: postNode },
  children
}) => {
  const post = postNode.frontmatter;

  return (
    <Layout
      hasSideNavigation="true"
      navmode={navMode}
      hasNavPadding={navMode ? "false" : "true"}
      customSEO
    >
      <SEO postPath={slug} postNode={postNode} article />
      <MXContentMain hasSideNavigation="true">
        <div className="mxcontent__main__doc">
          <Title>{post.title}</Title>
          {post.showTableOfContents && (
            <MXInPageTOC tableOfContents={postNode.tableOfContents} />
          )}
          <PostContent>{children}</PostContent>
        </div>
      </MXContentMain>
      <MXGuidesNav
        title="Guides"
        content={pages}
        pagesBySection={pagesBySection}
        currentSlug={slug}
        tableOfContents={postNode.tableOfContents}
        pagesListTitle={pagesListTitle}
      ></MXGuidesNav>
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
        showTableOfContents
        section
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
