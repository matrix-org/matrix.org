import React from 'react'
import { graphql } from 'gatsby'

import { Layout, MXContentMain, MXProjectCard, SEO } from '../components'
import config from '../../config'

const title = `Clients | ${config.siteTitle}`

export function Head() {
  return (
    <>
      <SEO excerptOverride="Clients for Matrix, decentralised communications"/>
      <title id="title">{title}</title>
      <script src="/js/jquery-3.4.1.min.js" type="text/javascript"></script>
      <script type="text/javascript" src="/js/clients-control.js"></script>
    </>
  );
}

const ClientsMatrix = ({ data }) => {
  const clients = data.allMdx.edges.map((edge => {
    var result = edge.node.frontmatter;
    result.slug = edge.node.fields.slug;
    return result;
  }));
  clients.sort(function (a, b) {
    if (a.sort_order && !b.sort_order) return -1;
    if (!a.sort_order && b.sort_order) return 1;
    if (!a.sort_order && !b.sort_order) return 0;
    return a.sort_order - b.sort_order;
  });
  clients.forEach((client, i) => {
    clients[i].platforms = clients[i].platforms ? clients[i].platforms : []
    clients[i].platformString = clients[i].platforms.join(',').replace(' ', '');
  });

  return (<Layout titleOverride={title} navmode="discover">
    <MXContentMain>
      <h1>Clients</h1>
      <p>To connect to the Matrix federation, you will use a client. These are some of the most popular Matrix clients available today, and more are available at  <a href="/docs/projects/try-matrix-now/">try-matrix-now</a>.
          To get started using Matrix, pick a client and join <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a>.
          To see more clients in a features matrix, see the <a href="/clients-matrix">Clients Matrix</a>.</p>
      <h2>Mobile</h2>
      <div className="mxgrid">
        {clients
          .filter(c =>
            c.featured && (
              c.platforms.indexOf("iOS") !== -1 ||
              c.platforms.indexOf("Android") !== -1 ||
              c.platforms.indexOf("Ubuntu Touch") !== -1))
          .map(function (client, i) {
            return (
              <div key={client.slug} className="mxgrid_item33">
                <MXProjectCard project={client} />
              </div>
            )
          })}
      </div>
      <h2>Desktop</h2>
      <div className="mxgrid">
        {clients
          .filter(c =>
            c.featured && c.client_type !== "terminal" && (
            c.platforms.indexOf("Linux") !== -1 ||
            c.platforms.indexOf("Mac") !== -1 ||
            c.platforms.indexOf("Windows") !== -1))
          .map(function (client, i) {
            return (
              <div key={client.slug} className="mxgrid_item33">
                <MXProjectCard project={client} />
              </div>
            )
          })}
      </div>
      <h2>Terminal-based / Command Line</h2>
      <div className="mxgrid">
        {clients
          .filter(c =>
            c.client_type === "terminal")
          .map(function (client, i) {
            return (
              <div key={client.slug} className="mxgrid_item33">
                <MXProjectCard project={client} />
              </div>
            )
          })}
      </div>
      <h2>Web</h2>
      <div className="mxgrid">
        {clients
          .filter(c =>
            c.featured &&
            c.platforms.indexOf("Web") !== -1)
          .map(function (client, i) {
            return (
              <div key={client.slug} className="mxgrid_item33">
                <MXProjectCard project={client} />
              </div>
            )
          })}
      </div>
      <h2>Nintendo 3DS</h2>
      <div className="mxgrid">
        {clients
          .filter(c =>
            c.platforms.indexOf("Nintendo 3DS") !== -1)
          .map(function (client, i) {
            return (
              <div key={client.slug} className="mxgrid_item33">
                <MXProjectCard project={client} />
              </div>
            )
          })}
      </div>

    </MXContentMain>
  </Layout>)
}


export const query = graphql`{
 allMdx(filter: {
   frontmatter: {
     categories: {in: ["client"]},
     platforms: {ne: null}
   }
 }) {
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
         platforms
         SDK
         featured
         sort_order
         client_type
         features {
           Room_directory
           Room_tag_showing
           Room_tag_editing
           Search_joined_rooms
           Room_user_list
           Display_Room_Description
           Edit_Room_Description
           Highlights
           Pushrules
           Send_read_markers
           Display_read_markers
           Sending_Invites
           Accepting_Invites
           Typing_Notification
           E2E
           Replies
           Attachment_uploading
           Attachment_downloading
           Send_stickers
           Send_formatted_messages__markdown_
           Rich_Text_Editor_for_formatted_messages
           Display_formatted_messages
           Redacting
           Multiple_Matrix_Accounts
           New_user_registration
           voip
         }
       }
       fields {
         slug
       }
     }
   }
 }
}`
export default ClientsMatrix
