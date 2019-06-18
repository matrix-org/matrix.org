import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../../components'
import config from '../../../../config'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import kebabCase from 'lodash/kebabCase'

const Bridges = ({data}) => {
  const bridges = data.allMdx.edges;
  var toc = {};
  bridges.forEach(bridge => {
    toc[bridge.node.frontmatter.bridges] = bridge.node.frontmatter
  })
  toc = Object.values(toc)
 
  return (<Layout navmode="discover">
      <MXContentMain>
          <Helmet title={`Bridges | ${config.siteTitle}`} />
          <h1 id="bridges">Bridges</h1>
          <div className="mxblock">
      <div className="mxgrid mxgrid--discover">
      {toc.map(function(project, i) {            
          return (
      <div key={Math.random().toString()} className="mxgrid__item20">
          <div className="mxgrid__item__bg mxgrid__item__bg--clear">
              <a href={'#' + kebabCase(project.bridges)}><h4 className="mxgrid__item__bg__hx">{project.bridges}</h4></a>
              <div className="mxgrid__item__bg__vert" style={{"width": "100px"}}>
              <a href={'#' + kebabCase(project.bridges)}><img src={project.thumbnail} alt="" className="mxgrid__item__bg__img" /></a>
              </div>
          </div>
      </div>)
      })}
      </div>
  </div>

<br clear="all" />

{toc.map(function(tocitem, i) {
  var projects = bridges.filter(x => x.node.frontmatter.bridges === tocitem.bridges);
  return (
  <div>
    <h2 id={kebabCase(tocitem.bridges)}>{tocitem.bridges}</h2>
    {projects.map(function(project, i) {
      const fm = project.node.frontmatter;
      return (
        <div>
          <h3 id={kebabCase(fm.title)}>{fm.title}</h3>
          <div className="mxblock">
            <table style={{"width": "100%"}}>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Repo</th>
                  <th>Language</th>
                  <th>Matrix Room</th>
                  <th>Maturity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{fm.author}</td>
                  <td><a href={fm.repo}>{fm.repo}</a></td>
                  <td>{fm.language}</td>
                  <td><a href={"https://matrix.to/#/" + fm.room}>{fm.room}</a></td>
                  <td>{fm.maturity}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <MDXRenderer>{project.node.code.body}</MDXRenderer>
        </div>
      )
    })}
  </div>
      )
      })}
        </MXContentMain>
    </Layout>)
}


export const query = graphql`{
  allMdx(filter: {frontmatter: {categories: {in: ["bridge"]}, featured: {eq: "TRUE"}}}) {
    edges {
      node {
        frontmatter {
          title
          author
          maturity
          description
          thumbnail
          bridges
          repo
          language
          room
        }
        code {
          body
        }
      }
    }
  }
}`
export default Bridges
