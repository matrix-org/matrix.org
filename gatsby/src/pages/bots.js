import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain, MXProjectCard } from '../components'
import config from '../../config'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

const _ = require('lodash')

const Bots = ({data}) => {
    const bots = data.allFile.edges.filter(s =>
      s.node.childMdx &&
      s.node.childMdx.frontmatter.categories &&
      s.node.childMdx.frontmatter.categories[0] === 'bot' &&
      s.node.childMdx.frontmatter.featured)
      .map((edge => {
      var result = edge.node.childMdx.frontmatter;
      result.slug = edge.node.childMdx.fields.slug;
      return result;
    }));
    bots.sort(function (a, b) {
      if (a.sort_order && !b.sort_order) return -1;
      if (!a.sort_order && b.sort_order) return 1;
      if (!a.sort_order && !b.sort_order) return 0;
      return a.sort_order - b.sort_order;
    });
    return (<Layout navmode="discover">
        <MXContentMain>
          <Helmet title={`Bots | ${config.siteTitle}`} />
          <div className="mxblock mxblock--project">
          <h1 className="mxblock--project__hx">Bots</h1>
          <div className="mxgrid">
          {
          bots
            .filter(s => s.featured)
            .map(function (bot, i) {

            return (
              <div className="mxgrid_item33">
                <MXProjectCard project={bot} imageSize={200} />
              </div>
            )
          })}
          </div>
        </div>
        </MXContentMain>
    </Layout>)
}


export const query = graphql`
{
    allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
        
        edges {
            node {
                childMdx {
                    frontmatter {
                        title
                        maturity
                        description
                        thumbnail
                        featured
                        categories
                        language
                        author
                        repo
                        room
                        e2e
                        screenshot
                        example_mxid
                        sort_order
                    }
                    fields {
                      slug
                    }
                    body
                }
                absolutePath
            }
        }
    }
}
`
export default Bots
