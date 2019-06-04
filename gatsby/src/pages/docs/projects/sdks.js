import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Layout, MXContentMain, Header } from '../../../components'
import config from '../../../../config'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

const _ = require('lodash')

const Bridges = ({data}) => {
    const sdks = data.allFile.edges.filter(s =>
      s.node.childMdx.frontmatter.categories &&
      s.node.childMdx.frontmatter.categories[0] === 'sdk' &&
      s.node.childMdx.frontmatter.featured);
 
    return (<Layout>
        <MXContentMain>
          <Helmet title={`SDKs | ${config.siteTitle}`} />
          <h1 id="SDKs">SDKs</h1>
          <table>
            <tr>
              <th></th>
              <th>Language/Platform</th>
              <th>Maintainer</th>
              <th>Repo</th>
              <th>Matrix Room</th>
              <th>Supports E2E</th>
            </tr>
            {sdks.map(function(edge) {
              const s = edge.node.childMdx.frontmatter
              const slugLink = "#" + _.kebabCase(s.title)
              return (<tr>
                <td><a href={slugLink}>{s.title}</a></td>
                <td>{s.language}</td>
                <td>{s.author}</td>
                <td><a href={s.repo}>{s.repo}</a></td>
                <td>{s.room}</td>
                <td>{s.e2e}</td>
              </tr>)
          })}
          </table>

          {sdks.map(function(edge) {
            const s = edge.node.childMdx.frontmatter
            return (
              <div>
              <h2 id={_.kebabCase(s.title)}>{s.title}</h2>
                <MDXRenderer>{edge.node.childMdx.code.body}</MDXRenderer>
              </div>
              )
          })}
          
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
                    }
                    code {
                      body
                    }
                }
                absolutePath
            }
        }
    }
}
`
export default Bridges
