import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import { Layout, Subline, Article, PrevNext, SectionTitle, MXContentMain } from '../components'
import config from '../../config'

const _ = require('lodash')

const Category = ({ pageContext: { category, limit, skip, currentPage }, data: { allMdx } }) => {
  const { edges, totalCount } = allMdx
  const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${category}"`

  const prevTitle = `Page ${currentPage - 1}`
  const prevSlug = currentPage === 2 ? `/blog/category/${_.kebabCase(category)}/` : `/blog/category/${_.kebabCase(category)}/${currentPage - 1}`
  const prev = currentPage === 1 ? null : { frontmatter: { title: prevTitle }, fields: { slug: prevSlug } }
  const nextTitle = `Page ${currentPage + 1}`
  const nextSlug = `/blog/category/${_.kebabCase(category)}/${currentPage + 1}`

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
            author={post.node.frontmatter.author}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            categories={post.node.frontmatter.categories}
            key={post.node.fields.slug}
            body={post.node.body}
          />
        ))}
        <PrevNext
          prev={prev}
          next={{
            frontmatter: { title: nextTitle },
            fields: { slug: nextSlug },
          }}
        />
      </MXContentMain>
    </Layout>
  )
}

export default Category

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query CategoryPage($category: String!, $skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC },
      limit: $limit, skip: $skip,
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
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
          body
        }
      }
    }
  }
`
