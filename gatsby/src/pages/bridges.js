import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../components'
import config from '../../config'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import kebabCase from 'lodash/kebabCase'


const Bridges = ({ data }) => {


  var [selected, setSelected] = useState("IRC");
  const clickHandler = (el) => {
    setSelected(el.target.dataset["bridge"]);
    document.getElementById("bridges-content").scrollIntoView();
  };

  const selectItemRender = (bridge) => {
    var selectableItemStyle = {
      cursor: "pointer"
    };
    if (selected && bridge === selected) {
      selectableItemStyle.background = "#f4f4f4";
      selectableItemStyle.fontWeight = "bold";
    }
    return (
      <h3 style={selectableItemStyle}
        data-bridge={bridge}
        key={"selector_" + bridge}
        onClick={clickHandler}>
        {bridge}
      </h3>
    )
  }




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
      <div className="mxgrid">
        <div className="mxgrid__item50">
          <div className="mxgrid mxgrid--discover">
            {toc.map(function (project, i) {
              return (
                <div key={Math.random().toString()} className="mxgrid__item20">
                  <div className="mxgrid__item__bg__vert" style={{ "width": "100px" }}>
                    <img src={project.thumbnail} alt="" className="mxgrid__item__bg__img"
                      style={{ minWidth: "100px", minHeight: "100px", cursor: "pointer" }}
                      data-bridge={project.bridges}
                      onClick={clickHandler} />
                  </div>
                </div>)
            })}
          </div>
        </div>
        <div className="mxgrid__item50">
          <p>An important idea in Matrix is <em>Interoperability</em>. This means that Matrix is open to exchanging data and messages with other platforms using an <a href="https://matrix.org/docs/spec">Open Standard</a>. We refer to the connection to other platforms as <em>bridging</em>.</p>
          <p>For a thorough examination of the different methods of bridging, and a discussion of the terminology involved, check out <em><a href="https://matrix.org/blog/2017/03/11/how-do-i-bridge-thee-let-me-count-the-ways">How do I bridge thee? Let me count the ways...</a></em></p>

          <p><strong>Portal rooms</strong>: these control chunks of room aliases namespace. For example, <code>#freenode_<i>#channelname</i>:matrix.org</code> corresponds to <i>#channelname</i> on Freenode. In this way, Matrix users can transparently join IRC channels on Freenode. Portal rooms are typically managed by the remote network's side of the room.</p>

          <p><strong>Plumbed rooms</strong>: these rooms are "plumbed" into one or more specific remote rooms by configuring a bridge (which can be run by anyone). For instance, #matrix:matrix.org is plumbed into #matrix on Freenode, matrixdotorg/#matrix on Slack, etc. Access control for Matrix users is necessarily managed by the Matrix side of the room. This is useful for using Matrix to link together different communities.</p>

          <p><strong>Bridgebot-style:</strong> in this case, messages in either direction are conveyed by a bot residing on the given platform. This is a sub-optimal experience because metadata is lost. For example, all messages might be sent by the same bot, but with the message text prefixed with the name of the original sender.</p>

          <p><strong>Puppeting</strong>: solves the problems of Bot-based bridging by "puppeting", meaning controlling, a user on the other side of the bridge. This means that to native users, they see messages as being sent from the correct sender. <strong>Double-puppeting</strong> means this is done in both directions of the bridge. This is the most preferred way of implementing a Matrix bridge.</p>
        </div>
      </div>

      <br clear="all" />


      <div className="mxgrid">
        <div className="mxgrid__item25">
          {toc.map(function (tocitem, i) {
            return selectItemRender(tocitem.bridges);
          })}
        </div>
        <div className="mxgrid__item50">
          {selected && <div id="bridges-content" style={{ "paddingTop": "75px", "marginTop": "-75px" }}>
            {bridges.filter(x => x.node.frontmatter.bridges === selected).map(function (project, i) {
              const fm = project.node.frontmatter;
              return (
                <div key={fm.title}>
                  <h3 id={kebabCase(fm.title)}>{fm.title}</h3>
                  <div className="mxblock">
                    <table style={{ "width": "100%" }}>
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
                  <MDXRenderer>{project.node.body}</MDXRenderer>
                </div>
              )
            })}</div>}
        </div>
      </div>
    </MXContentMain>
  </Layout>)
}


export const query = graphql`{
  allMdx(filter: {frontmatter: {categories: {in: ["bridge"]}, featured: {eq: true}}}) {
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
        body
      }
    }
  }
}`
export default Bridges
