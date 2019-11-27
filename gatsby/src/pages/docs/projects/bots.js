import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../../components'
import config from '../../../../config'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

const _ = require('lodash')

const Bots = ({data}) => {
    const bots = data.allFile.edges.filter(s =>
      s.node.childMdx.frontmatter.categories &&
      s.node.childMdx.frontmatter.categories[0] === 'bot' &&
      s.node.childMdx.frontmatter.featured);
 
    return (<Layout navmode="discover">
        <MXContentMain>
          <Helmet title={`Bots | ${config.siteTitle}`} />
          <div className="mxblock mxblock--project">
          <h1 className="mxblock--project__hx">Bots</h1>
          <div className="mxgrid">
            
            {bots.map(function(edge) {
            const s = edge.node.childMdx.frontmatter
            return (
                <div key={_.kebabCase(s.title) + s.repo} className="mxgrid__item50">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h2 id={_.kebabCase(s.title)} className="mxgrid__item--project__bg__hx">{s.title}</h2>
                <img src={s.screenshot} alt="" className="mxgrid__item--project__bg__img" />
                <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--project">
                    <p><span hidden={!s.example_mxid}>Example mxid: <a href={"https://matrix.to/#/"+s.example_mxid}>{s.example_mxid}</a></span><br />
                    Repo: <a href={s.repo}>{s.repo}</a></p>
                    <MDXRenderer>{edge.node.childMdx.body}</MDXRenderer>
                </div>
              </div>
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
