import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import { Layout, Subline, Article, SectionTitle, MXContentMain } from '../components'
import config from '../../config'

const Category = ({ pageContext: { category }, data: { allMdx } }) => {
  const { edges, totalCount } = allMdx
  const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${category}"`

  return (
    <Layout navmode="blog">
      <Helmet title={`Category: ${category} | ${config.siteTitle}`} />
      <MXContentMain>
        <SectionTitle>Category &ndash; {category}</SectionTitle>
        <Subline sectionTitle>
          {subline} (See <Link to="/blog/categories">all categories</Link>)
        </Subline>
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
          />
        ))}
      </MXContentMain>
    </Layout>
  )
}

export default Category

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query CategoryPage($category: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            categories
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
