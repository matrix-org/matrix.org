import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import { Layout, Header, Subline, SEO, MXContentMain, MXContentNav } from '../components'

const Title = styled.h1`
`

const PostContent = styled.div`
`

const Page = ({ pageContext: { slug, pages }, data: { mdx: postNode } }) => {
  const post = postNode.frontmatter

  return (
    <Layout customSEO>
        <SEO postPath={slug} postNode={postNode} article />
        <MXContentNav title="Docs" content={pages} currentSlug={slug}></MXContentNav>
        <MXContentMain>
          <Title>{post.title}</Title>
          <PostContent>
            <MDXRenderer>{postNode.code.body}</MDXRenderer>
          </PostContent>
        </MXContentMain>
    </Layout>
  )
}

export default Page

Page.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

Page.defaultProps = {
  pageContext: PropTypes.shape({  }),
}

export const pageQuery = graphql`
  query pageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        author,
        image
      }
      timeToRead
      rawBody
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
    }
  }
`
