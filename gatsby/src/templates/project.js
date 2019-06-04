import React from 'react'
import PropTypes from 'prop-types'
import {  graphql } from 'gatsby'
import styled from 'styled-components'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import { Layout, SEO, MXContentMain } from '../components'

const Title = styled.h1`
`

const ProjectContent = styled.div`
`

const Project = ({ pageContext: { slug }, data: { mdx: postNode } }) => {
  const post = postNode.frontmatter

  return (
    <Layout navmode="discover" customSEO>
        <SEO postPath={slug} postNode={postNode} article />
        <MXContentMain>
          <Title>{post.title}</Title>
          <ProjectContent>
            <MDXRenderer>{postNode.code.body}</MDXRenderer>
          </ProjectContent>
        </MXContentMain>
    </Layout>
  )
}

export default Project

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

Project.defaultProps = {
  pageContext: PropTypes.shape({  }),
}

export const projectQuery = graphql`
  query projectBySlug($slug: String!) {
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
