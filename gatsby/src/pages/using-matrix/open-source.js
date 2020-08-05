import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../components'
import config from '../../../config'

const title = "Open Source Users";

const OpenSource = ({ data }) => {
  const users = data.allMdx.edges;
  return (<Layout navmode="discover">
    <MXContentMain>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <div className="mxblock mxblock--project">
        <h1 className="mxblock--project__hx">{title}</h1>
        {users
          .map(function (user, i) {
            const fm = user.node.frontmatter;
            const left = i % 2 === 0;
            const image = <div className="mxgrid__item25"><img src={fm.thumbnail} alt={fm.title} /></div>;
            const body = <div className="mxgrid__item75">
                  <h2>{fm.title}</h2>
                  {fm.homeserver &&
                    <p>Homeserver: {fm.homeserver}</p>
                  }
                  <p>Main room: {fm.main_room}</p>
                  {fm.rooms &&
                    <ul>
                      {fm.rooms.map(room => {
                        return (<li>{room}</li>)
                      })}
                    </ul>
                  }
                </div>;
            return (
              <div className="mxgrid">
                {left &&
                (image &&
                body)}
              </div>
            )
          })}
      </div>
    </MXContentMain>
  </Layout>)
}


export const query = graphql`{
    allMdx(filter: {frontmatter: {section: {eq: "User"}}},
      sort: {fields: frontmatter___sort_order, order: ASC}) {
      edges {
        node {
          frontmatter {
            title
            section
            homeserver
            main_room
            rooms
            thumbnail
          }
        }
      }
    }
  }
  `
export default OpenSource
