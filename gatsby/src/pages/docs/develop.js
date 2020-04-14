import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../components'
import config from '../../../config'


const GuidesDevelop = ({data}) => {

    return (<Layout navmode="develop">
<MXContentMain>
  <Helmet title={`Guides | ${config.siteTitle}`} />
  <h1>Guides for Developers</h1>
          
<h2 id="introduction-for-developers">Introduction for Developers</h2>


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
      <tr>
        <td><a href="https://brendan.abolivier.bzh/enter-the-matrix/">Enter the Matrix</a></td>
        <td>Brendan</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="https://t2bot.io/docs/access_tokens/">Obtain Access Tokens from Riot</a></td>
        <td>TravisR</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="https://gist.github.com/RickCogley/69f430d4418ae5498e8febab44d241c9">Testing the matrix.org client-server API</a> using cURL</td>
        <td><a href="https://github.com/RickCogley">Rick Cogley</a></td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="/docs/guides/made-for-matrix-badge">Made for Matrix Badge Guidelines</a> (add this to your project page)</td>
        <td>matrix.org</td>
        <td>English</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="understanding-end-to-end-encryption">Understanding End-to-End Encryption</h2>

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
      <tr>
        <td><a href="https://www.uhoreg.ca/blog/20170910-2110">An introduction to end-to-end encryption in Matrix and Riot</a></td>
        <td>Hubert Chathi</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="/docs/guides/end-to-end-encryption-implementation-guide">Implementing End-to-End Encryption in Matrix clients</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="client-server-api">Client-Server API and related SDKs</h2>

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
      <tr>
        <td><a href="/docs/guides/client-server-api">How to use the client-server API</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="/docs/guides/usage-of-the-matrix-js-sdk">Usage of the matrix-js-sdk</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="/docs/guides/usage-of-matrix-js-bot-sdk">Usage of matrix-js-bot-sdk</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="/docs/guides/matrix-js-bot-sdk-room-admin-features">matrix-js-bot-sdk Room Admin Features</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="/docs/guides/usage-of-matrix-nio">Usage of matrix-nio (Python Sans IO)</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="application-services">Homeserver Development</h2>

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
      <tr>
        <td><a href="/docs/guides/implementing-stateresv2">State Resolution v2 for the Hopelessly Unmathematical</a></td>
        <td>Neil Alexander Twigg</td>
        <td>English</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="application-services">Application Services</h2>

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
      <tr>
        <td><a href="/docs/guides/application-services">Application Services</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="bridging">Bridging</h2>

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
      <tr>
        <td><a href="/docs/guides/types-of-bridging">Types of Bridging</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
      <tr>
        <td><a href="/docs/guides/whatsapp-bridging-mautrix-whatsapp">Bridging Matrix with WhatsApp running on a VM</a></td>
        <td>Matrix.org</td>
        <td>English</td>
      </tr>
    </tbody>
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
                    }
                    body
                }
                absolutePath
            }
        }
    }
}
`
export default GuidesDevelop
