import React from 'react'
import { graphql } from 'gatsby'

import { Layout, MXContentMain, MXProjectCard, SEO } from '../components'
import config from '../../config'

export function Head() {
  return (
    <>
      <SEO />
      <title id="title">Bots | {config.siteTitle}</title>
    </>
  );
}

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
    return (<Layout navmode="discover">
        <MXContentMain>
          <div className="mxblock mxblock--project">
          <h1 className="mxblock--project__hx">Bots</h1>
          <div className="mxgrid">
          {
          bots
            .filter(s => s.featured)
            .map(function (bot, i) {

            return (
              <div key={bot.slug} className="mxgrid_item33">
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
    allFile(
      sort: {fields:childMdx___frontmatter___sort_order, order: ASC}
      filter: { sourceInstanceName: { eq: "projects" } }) {        
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
