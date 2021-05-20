import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../components'
import config from '../../../config'


const GuidesDevelop = ({ data }) => {

  var groupsUnsorted = data.allMdx.group;
  let groups = [];
  groupsUnsorted.forEach(group => {
    var min = Math.min(...group.edges.map(e => e.node.frontmatter.sort_order).filter(el => el));
    group.sort_order = min;
  });
  groups = groupsUnsorted.sort(function (a, b) {
    return (a.sort_order > b.sort_order);
  });

  function addArticleToGroup(group, title, author, slug) {
    group = groups.find(g => g.edges[0].node.frontmatter.section === group);
    if (group.edges.find(e => e.node.fields.slug === slug)) { return; }
    group.edges.push({
      "node": {
        "frontmatter": {
          title: title,
          author: author
        },
        "fields": {
          "slug": slug
        }
      }
    });

  }
  addArticleToGroup("Introduction", "Enter the Matrix", "Brendan Abolivier", "https://brendan.abolivier.bzh/enter-the-matrix/");
  addArticleToGroup("Introduction", "Obtain Access Tokens from Element", "TravisR", "https://t2bot.io/docs/access_tokens/");
  addArticleToGroup("Introduction", "Testing the matrix.org client-server API using cURL", "Rick Cogley", "https://gist.github.com/RickCogley/69f430d4418ae5498e8febab44d241c9");
  addArticleToGroup("Encryption", "An introduction to end-to-end encryption in Matrix and Riot", "Hubert Chathi", "https://www.uhoreg.ca/blog/20170910-2110");
  return (<Layout navmode="develop">
    <MXContentMain>
      <Helmet title={`Guides | ${config.siteTitle}`} />
      <h1>Guides for Developers</h1>
      {groups && groups.map(group => {
        return (
          <div key={group.edges[0].node.frontmatter.section}>
            <h2>{group.edges[0].node.frontmatter.section}</h2>
            <div className="width-100">
              <table className="legacy-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Author</th>
                    <th>Language</th>
                  </tr>
                </thead>
                <tbody>
                  {group.edges && group.edges.map(guide => {
                    return (
                      <tr key={guide.node.fields.slug}>
                        <td>
                          <a href={guide.node.fields.slug}>{guide.node.frontmatter.title}</a>
                        </td>
                        <td>{guide.node.frontmatter.author ?? "Matrix.org"}</td>
                        <td>{guide.node.frontmatter.language ?? "English"}</td>
                      </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}




    </MXContentMain>
  </Layout>)
}


export const query = graphql`{
  allMdx(sort: {fields: [frontmatter___sort_order], order: ASC}, 
    filter: {frontmatter: {date: {eq: null}, 
      layout: {nin: ["project", "projectimage"], in: ["post"]},
      section: {nin: ["legal"]}}}) {
    group(field: frontmatter___section) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
            sort_order
            section
          }
        }
      }
    }
  }
}`
export default GuidesDevelop
