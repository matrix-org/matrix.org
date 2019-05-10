import React from 'react'
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

//const fs = require('fs');

const PostList = ({ pageContext: { limit, skip, currentPage }, data: { allMdx } }) => {
  const { edges, totalCount } = allMdx

  var feedOut = (
    <rss>
      {edges.map(post => (
        <item>
          <title>{post.node.frontmatter.title}</title>
          <description>
            <MDXRenderer>{post.node.code.body}</MDXRenderer>
          </description>
          <pubDate>{post.node.frontmatter.date}</pubDate>
          <linkelement>https://matrix.org{post.node.fields.slug}</linkelement>
        </item>
        // <Article
        //   slug={post.node.fields.slug}
        //   categories={post.node.frontmatter.categories}
        //   key={post.node.fields.slug}
        //   body={post.node.code.body}
        //   author={post.node.frontmatter.author}
        // />
      ))}
    </rss>
  );
  
  var feedOutput = ReactDOMServer.renderToString(feedOut);
  feedOutput = feedOutput.replace(/<description>/g, "<description><![CDATA[");
  feedOutput = feedOutput.replace(/<\/description>/g, "]]></description>");
  feedOutput = feedOutput.replace(/linkelement/g, "link");
  feedOutput = feedOutput.replace(/<!-- -->/g, "");
  console.log(feedOutput);
  console.log(__dirname);
  return feedOut;
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
  query FeedPage($skip: Int!, $limit: Int!) {
    allMdx(sort: { fields: [frontmatter___date, fileAbsolutePath], order: DESC }, limit: $limit, skip: $skip) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
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
