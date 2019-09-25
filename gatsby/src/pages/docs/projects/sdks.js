import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../../components'
import config from '../../../../config'

const _ = require('lodash')

const Bridges = ({data}) => {
    const sdks = data.allFile.edges.filter(s =>
      s.node.childMdx.frontmatter.categories &&
      s.node.childMdx.frontmatter.categories[0] === 'sdk' &&
      s.node.childMdx.frontmatter.featured);

    return (<Layout navmode="discover">
        <MXContentMain>
          <Helmet title={`SDKs | ${config.siteTitle}`} />
          <h1 id="SDKs">SDKs</h1>
          <div class="overscroll">
              <table style={{"width": "100%"}}>
                <tr>
                  <th></th>
                  <th>Language / Platform</th>
                  <th>Maintainer</th>
                  <th class="repo">Repo</th>
                  <th>Matrix Room</th>
                  <th>Supports E2E</th>
                </tr>
                {sdks.map(function(edge, i) {
                  const s = edge.node.childMdx.frontmatter
                  const slugLink = "/docs/projects/sdk/" + (s.slug ? s.slug : _.kebabCase(s.title))
                  var e2eSupport =  "";
                  var e2eClass = "";
                  if (s.e2e === "Yes") {
                    e2eClass = "green";
                    e2eSupport = "✓";
                  }
                  return (
                  <tr style={i % 2 === 0 ? {"backgroundColor": "#eee"} : { }}>
                    <td style={{"textAlign": "left"}}>
                      <a href={slugLink}>{s.title}</a><br />
                      {s.description}
                      </td>
                    <td>{s.language}</td>
                    <td>{s.author}</td>
                    <td><a href={s.repo}>{s.repo.split('/')[2]}</a></td>
                    <td><a href={"https://matrix.to/#/" + s.room}>{s.room}</a></td>
                    <td className={e2eClass}>{e2eSupport}</td>
                  </tr>)
              })}
              </table>
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
                        slug
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
