import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Layout, MXContentMain, Header } from '../../../components'
import config from '../../../../config'

const ClientsMatrix = ({data}) => {

 
    return (<Layout>
        <MXContentMain>
            <Helmet title={`Try Matrix Now | ${config.siteTitle}`} />
            <h1>Clients Matrix</h1>
            <p>To connect to the Matrix federation, you will use a client. These are some of the most popular Matrix clients available today, and more are available at  <a href="try-matrix-now">try-matrix-now</a>. To get started using Matrix, pick a client and join <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a></p>

<h2 id="platform-availability">Platform Availability</h2>

<table>
  <thead>
    <tr>
      <th> </th>
      <th>Riot Web</th>
      <th>Riot Android</th>
      <th>Riot iOS</th>
      <th>Nheko</th>
      <th>weechat-matrix</th>
      <th>Gomuks</th>
      <th>Quaternion</th>
      <th>Fractal</th>
      <th>Seaglass</th>
      <th>Spectral</th>
      <th>uMatriks</th>
      <th>FluffyChat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Linux</td>
      <td>✓<br /><small>Electron</small></td>
      <td> </td>
      <td> </td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td> </td>
      <td>✓</td>
      <td> </td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Mac</td>
      <td>✓<br /><small>Electron</small></td>
      <td> </td>
      <td> </td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>WIP</td>
      <td>✓</td>
      <td>✓</td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Windows</td>
      <td>✓<br /><small>Electron</small></td>
      <td> </td>
      <td> </td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td> </td>
      <td> </td>
      <td>✓</td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Android</td>
      <td> </td>
      <td>✓</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>iOS</td>
      <td> </td>
      <td> </td>
      <td>✓</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Ubuntu Touch</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td>✓</td>
      <td>✓</td>
    </tr>
  </tbody>
</table>

<h2 id="details">Details</h2>

<table>
  <thead>
    <tr>
      <th> </th>
      <th>Riot Web</th>
      <th>Riot Android</th>
      <th>Riot iOS</th>
      <th>Nheko</th>
      <th>weechat-matrix</th>
      <th>Gomuks</th>
      <th>Quaternion</th>
      <th>Fractal</th>
      <th>Seaglass</th>
      <th>Spectral</th>
      <th>uMatriks</th>
      <th>FluffyChat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Repo</td>
      <td><a href="https://github.com/vector-im/riot-web/">riot-web</a></td>
      <td><a href="https://github.com/vector-im/riot-android/">riot-android</a></td>
      <td><a href="https://github.com/vector-im/riot-ios/">riot-ios</a></td>
      <td><a href="https://github.com/Nheko-Reborn/nheko">nheko</a></td>
      <td><a href="https://github.com/poljar/weechat-matrix">weechat-matrix</a></td>
      <td><a href="https://github.com/tulir/gomuks">gomuks</a></td>
      <td><a href="https://github.com/QMatrixClient/Quaternion/">Quaternion</a></td>
      <td><a href="https://gitlab.gnome.org/GNOME/fractal">Fractal</a></td>
      <td><a href="https://github.com/neilalexander/seaglass">Seaglass</a></td>
      <td><a href="https://gitlab.com/b0/spectral">Spectral</a></td>
      <td><a href="https://github.com/uMatriks/uMatriks">uMatriks</a></td>
      <td><a href="https://github.com/ChristianPauly/fluffychat">FluffyChat</a></td>
    </tr>
    <tr>
      <td>Matrix Room</td>
      <td><small><a href="https://matrix.to/#/#riot:matrix.org">#riot:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#riot-android:matrix.org">#riot-android:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#riot-ios:matrix.org">#riot-ios:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#nheko-reborn:matrix.org">#nheko-reborn:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#weechat-matrix:termina.org.uk">#weechat-matrix:<br />termina.org.uk</a></small></td>
      <td><small><a href="https://matrix.to/#/#gomuks:maunium.net">#gomuks:<br />maunium.net</a></small></td>
      <td><small><a href="https://matrix.to/#/#qmatrixclient:matrix.org">#qmatrixclient:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#fractal-gtk:matrix.org">#fractal-gtk:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#seaglass:matrix.org">#seaglass:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#spectral:encom.eu.org">#spectral:<br />encom.eu.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#uMatriks:matrix.org">#uMatriks:<br />matrix.org</a></small></td>
      <td><small><a href="https://matrix.to/#/#fluffychat:matrix.org">#fluffychat:<br />matrix.org</a></small></td>
    </tr>
    <tr>
      <td>Platform</td>
      <td>Web (React)</td>
      <td>Android</td>
      <td>iOS</td>
      <td>Qt</td>
      <td>Weechat<br />Terminal</td>
      <td>Go<br />Terminal</td>
      <td>Qt</td>
      <td>GTK+</td>
      <td>macOS<br />Cocoa</td>
      <td>Qt</td>
      <td>Qt<br />Ubuntu Touch</td>
      <td>Qt<br />Ubuntu Touch</td>
    </tr>
    <tr>
      <td>Language</td>
      <td>JavaScript (React)</td>
      <td>Java</td>
      <td>Objective-C</td>
      <td>C++</td>
      <td>C &amp; Python plugin</td>
      <td>Go</td>
      <td>C++</td>
      <td>Rust</td>
      <td>Swift</td>
      <td>QML, C++</td>
      <td>C++</td>
      <td>QML</td>
    </tr>
    <tr>
      <td>SDK</td>
      <td>matrix-js-sdk, matrix-react-sdk</td>
      <td>matrix-android-sdk</td>
      <td>matrix-ios-sdk</td>
      <td> </td>
      <td><a href="https://github.com/poljar/matrix-nio">matrix-nio</a></td>
      <td>gomatrix (fork)</td>
      <td>libqmatrixclient</td>
      <td> </td>
      <td>matrix-ios-sdk</td>
      <td>libqmatrixclient</td>
      <td>libqmatrixclient</td>
      <td> </td>
    </tr>
    <tr>
      <td>Target Spec Version</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
      <td>r0.4.0</td>
    </tr>
  </tbody>
</table>

<h2 id="features">Features</h2>

<table>
  <thead>
    <tr>
      <th> </th>
      <th>Riot Web</th>
      <th>Riot Android</th>
      <th>Riot iOS</th>
      <th>Nheko</th>
      <th>weechat-matrix</th>
      <th>Gomuks</th>
      <th>Quaternion</th>
      <th>Fractal</th>
      <th>Seaglass</th>
      <th>Spectral</th>
      <th>uMatriks</th>
      <th>FluffyChat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><br /><em>Room Management</em></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Room directory</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Room tag showing</td>
      <td>✓</td>
      <td>Predefined</td>
      <td>Predefined</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>Predefined</td>
      <td>✗</td>
      <td>Predefined</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Room tag editing</td>
      <td>Predefined</td>
      <td>Predefined</td>
      <td>Predefined</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
      <td>Predefined</td>
      <td>✗</td>
      <td>Predefined</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Search joined rooms</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>Partial</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>Partial</td>
    </tr>
    <tr>
      <td><br /><em>Room Features</em></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Room user list</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Display Room Description</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Edit Room Description</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Highlights</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Pushrules</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Send read markers</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Display read markers</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>Only own</td>
      <td>✗</td>
      <td>✗</td>
      <td>Only own</td>
      <td>✗</td>
      <td>Partial</td>
    </tr>
    <tr>
      <td>Sending Invites</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Accepting Invites</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Typing Notification</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td><br /><em>Message Features</em></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>E2E</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>Text only</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
    <tr>
      <td>Replies</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Attachment uploading</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Attachment downloading</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>Images</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Send stickers</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Send formatted messages (markdown)</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
    <tr>
      <td>Rich Text Editor for formatted messages</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
    <tr>
      <td>Display formatted messages</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
    <tr>
      <td>Redacting</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td><br /><em>Other Features</em></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Multiple Matrix Accounts</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
    <tr>
      <td>New user registration</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>voip</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
  </tbody>
</table>

<h2 id="future-specification-features">Future-specification Features</h2>

<table>
  <thead>
    <tr>
      <th> </th>
      <th>Riot Web</th>
      <th>Riot Android</th>
      <th>Riot iOS</th>
      <th>Nheko</th>
      <th>weechat-matrix</th>
      <th>Gomuks</th>
      <th>Quaternion</th>
      <th>Fractal</th>
      <th>Seaglass</th>
      <th>Spectral</th>
      <th>uMatriks</th>
      <th>FluffyChat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Communities Display</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
    <tr>
      <td>Communities Creation</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>
  </tbody>
</table>

<p><em>These features are in common usage in the Matrix ecosystem and could be added to a future version of the spec.</em></p>

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
                    }
                }
                absolutePath
            }
        }
    }
}
`
export default ClientsMatrix
