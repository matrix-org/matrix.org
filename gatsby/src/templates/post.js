import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import { Layout, Header, Subline, SEO, PrevNext, MXContentMain, MXContentNav } from '../components'

const Title = styled.h1`
`

const PostContent = styled.div`
`

const Post = ({ pageContext: { slug, prev, next, posts }, data: { mdx: postNode } }) => {
  const post = postNode.frontmatter
  const rawBody = postNode.rawBody.replace(/---(\n.*)*---/, '')
  
  return (
    <Layout customSEO>
        <SEO postPath={slug} postNode={postNode} article />
        <MXContentMain>
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
            <MDXRenderer>{postNode.code.body}</MDXRenderer>
          </PostContent>
          <PrevNext prev={prev} next={next} />
        </MXContentMain>
        <MXContentNav title="All posts" content={posts} currentSlug={slug}></MXContentNav>
    </Layout>
  )
}

export default Post

Post.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

Post.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
}

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        categories,
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
