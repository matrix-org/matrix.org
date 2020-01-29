import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain, MXProjectCard } from '../../../components'
import config from '../../../../config'

const _ = require('lodash')

const SDKs = ({ data }) => {
  const sdks = data.allFile.edges.filter(s =>
    s.node.childMdx &&
    s.node.childMdx.frontmatter.categories &&
    s.node.childMdx.frontmatter.categories[0] === 'sdk' &&
    s.node.childMdx.frontmatter.maturity !== "Not actively maintained"
    ).map((edge => {
      var result = edge.node.childMdx.frontmatter;
      result.slug = edge.node.childMdx.fields.slug;
      return result;
    }));
    sdks.sort(function (a, b) {
      if (a.sort_order && !b.sort_order) return -1;
      if (!a.sort_order && b.sort_order) return 1;
      if (!a.sort_order && !b.sort_order) return 0;
      return a.sort_order - b.sort_order;
    });

  return (<Layout navmode="discover">
    <MXContentMain>
      <Helmet title={`SDKs | ${config.siteTitle}`} />
      <h1 id="SDKs">SDKs</h1>
      <div className="mxgrid">
        {
          sdks
            .filter(s => s.featured)
            .map(function (client, i) {

            return (
              <div className="mxgrid_item33">
                <MXProjectCard project={client} imageSize={200} />
              </div>
            )
          })}
      </div>

      <hr />

      <div class="overscroll">
        <table style={{ "width": "100%" }}>
          <tr>
            <th></th>
            <th>Language / Platform</th>
            <th>Maintainer</th>
            <th class="repo">Repo</th>
            <th>Matrix Room</th>
            <th>Supports E2E</th>
          </tr>
          {sdks.map(function (s, i) {
            s.repo = s.repo ? s.repo : "";
            const slugLink = "/docs/projects/sdk/" + (s.slug ? s.slug : _.kebabCase(s.title))
            var e2eSupport = "";
            var e2eClass = "";
            if (s.e2e === "Yes") {
              e2eClass = "green";
              e2eSupport = "✓";
            }
            return (
              <tr style={i % 2 === 0 ? { "backgroundColor": "#eee" } : {}}>
                <td style={{ "textAlign": "left" }}>
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
                        sort_order
                    }
                    fields {
                      slug
                    }
                }
            }
        }
    }
}
`
export default SDKs
