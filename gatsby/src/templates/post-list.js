import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import { Layout, Header, Article, PrevNext } from '../components'
import config from '../../config'

const Content = styled.div`
`

const PostList = ({ pageContext: { limit, skip, currentPage }, data: { allMdx } }) => {
  const { edges, totalCount } = allMdx

  const prevTitle = `Page ${currentPage - 1}`
  const prevSlug = currentPage === 2 ? `blog/posts/` : `blog/posts/${currentPage - 1}`
  const prev = currentPage === 1 ? null : { frontmatter: { title: prevTitle }, fields: { slug: prevSlug } }
  const nextTitle = `Page ${currentPage + 1}`
  const nextSlug = `blog/posts/${currentPage + 1}`

  return (
    <Layout>
        <Helmet />
        <Header />
        <Content>
          {edges.map(post => (
            <Article
              title={post.node.frontmatter.title}
              date={post.node.frontmatter.date}
              excerpt={post.node.excerpt}
              timeToRead={post.node.timeToRead}
              slug={post.node.fields.slug}
              categories={post.node.frontmatter.categories}
              key={post.node.fields.slug}
              body={post.node.code.body}
              author={post.node.frontmatter.author}
            />
          ))}
          <PrevNext
            prev={prev}
            next={{
              frontmatter: { title: nextTitle },
              fields: { slug: nextSlug },
            }}
          />
        </Content>
    </Layout>
  )
}

export default PostList

PostList.propTypes = {
  pageContext: PropTypes.shape({
    limit: PropTypes.string.isRequired,
    skip: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query PostListPage($skip: Int!, $limit: Int!) {
    allMdx(sort: { fields: [frontmatter___date, fileAbsolutePath], order: DESC }, limit: $limit, skip: $skip) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            categories
            author
          }
          fields {
            slug
          }
          excerpt(pruneLength: 200)
          timeToRead
          code {
            body
          }
        }
      }
    }
  }
`
