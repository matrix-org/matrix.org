import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { graphql } from "gatsby";

import { Layout, Subline, SEO, PrevNext, MXContentMain, MXContentNav } from '../components'

const Title = styled.h1`
`

const PostContent = styled.div`
`

export function Head({ data: { mdx }}) {
  return <SEO postPath={mdx.fields.slug} postNode={mdx} article />;
}

export default function Post({data: {mdx}, pageContext: { prev, next, posts },children}) {
  const post = mdx.frontmatter

  let toc
  
  if (mdx.tableOfContents && mdx.tableOfContents.items) {
    toc = mdx.tableOfContents.items
      .map(item => {return ({slug: item.url, title: item.title})})
  }
  
  return (
    <Layout hasSideNavigation="true" navmode="blog" customSEO>
        <MXContentMain hasSideNavigation="true">
          <Title>{post.title}</Title>
          <Subline>
            {post.date} &mdash;&nbsp;
            {post.categories.map((cat, i) => (
              <React.Fragment key={cat}>
                {!!i && ', '}
                <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
              </React.Fragment>
            ))} &mdash;&nbsp;
            {post.author}
          </Subline>
          <PostContent>
            {children}
          </PostContent>
          <PrevNext prev={prev} next={next} />
        </MXContentMain>
        <div>
        <iframe title="DDGSearch" src="https://duckduckgo.com/search.html?width=250&site=matrix.org&prefill=Search Matrix.org with DDG"
      style={{overflow:"hidden",margin:0,padding:0,width:"308px",height:"40px"}} 
      frameBorder="0"></iframe>
          {
          toc &&
        <MXContentNav title="Post Contents" content={toc} currentSlug={mdx.fields.slug}></MXContentNav>}
        <MXContentNav title="All posts" content={posts} currentSlug={mdx.fields.slug}></MXContentNav>
        </div>
    </Layout>
  )
}

Post.propTypes = {
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    prev: PropTypes.object,
  })
}

Post.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        categories
        author
        image
        showTableOfContents
      }
      fields {
        slug
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