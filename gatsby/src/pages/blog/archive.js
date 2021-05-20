import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import { Layout, MXContentMain } from '../../components'
import config from '../../../config'

const Category = ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout navmode="blog">
      <Helmet title={`Blog Archive ${config.siteTitle}`} />
      <MXContentMain>
        <h1>Blog Archive</h1>
        {edges.map(edge => (
          <p>
            {edge.node.frontmatter.date} <a href={edge.node.fields.slug}>{edge.node.frontmatter.title}</a>
          </p>
          
        ))}
      </MXContentMain>
  </Layout>
)

export default Category

Category.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query ArchivePage {
    allMdx(sort: { fields: [frontmatter___date, fileAbsolutePath], order: DESC },
      filter: {frontmatter: {date: {ne: null}, author: {ne: null}}}) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
