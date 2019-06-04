import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Layout, MXContentMain, Header } from '../../../components'
import config from '../../../../config'

const Bridges = ({data}) => {

 
    return (<Layout>
        <MXContentMain>
            <Helmet title={`Bridges | ${config.siteTitle}`} />
            <h1 id="bridges">Bridges</h1>

<table>
  <thead>
    <tr>
      <th> </th>
      <th> </th>
      <th> </th>
      <th> </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#telegram">Telegram</a></td>
      <td><a href="#slack">Slack</a></td>
      <td><a href="#irc">IRC</a></td>
      <td><a href="#discord">Discord</a></td>
    </tr>
    <tr>
      <td><a href="#telegram"><img src="images/telegram-logo.svg" alt="Telegram" /></a></td>
      <td><a href="#slack"><img src="images/slack-logo.svg" alt="Slack" /></a></td>
      <td><a href="#irc"><code class="highlighter-rouge">IRC</code></a></td>
      <td><a href="#discord"><img src="images/discord-logo.svg" alt="Discord" /></a></td>
    </tr>
    <tr>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td><a href="#whatsapp">WhatsApp</a></td>
      <td><a href="#gitter">Gitter</a></td>
      <td><a href="#email">Email</a></td>
      <td><a href="#sms">SMS</a></td>
    </tr>
    <tr>
      <td><a href="#whatsapp"><img src="images/whatsapp-logo.png" alt="WhatsApp" /></a></td>
      <td><a href="#gitter"><img src="images/gitter-logo.svg" alt="Gitter" /></a></td>
      <td><a href="#email"><img src="images/email-icon.svg" alt="Email" /></a></td>
      <td><a href="#sms"><img src="images/sms-icon.svg" alt="SMS" /></a></td>
    </tr>
    <tr>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td><a href="#imessage">iMessage</a></td>
      <td><a href="#hangouts">Hangouts</a></td>
      <td><a href="#facebook-messenger">Facebook Messenger</a></td>
      <td><a href="#groupme">GroupMe</a></td>
    </tr>
    <tr>
      <td><a href="#imessage"><img src="images/imessage-logo.jpg" alt="iMessage" /></a></td>
      <td><a href="#hangouts"><img src="images/hangouts-icon.svg" alt="Hangouts" /></a></td>
      <td><a href="#facebook-messenger"><img src="images/messenger-logo.svg" alt="Facebook Messenger" /></a></td>
      <td><a href="#groupme"><img src="images/groupme-icon.png" alt="GroupMe" /></a></td>
    </tr>
    <tr>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td><a href="#skype">Skype</a></td>
      <td><a href="#mastodon">Mastodon</a></td>
      <td><a href="#rocket-chat">Rocket Chat</a></td>
      <td> </td>
    </tr>
    <tr>
      <td><a href="#skype"><img src="images/skype-icon.svg" alt="Skype" /></a></td>
      <td><a href="#mastodon"><img src="images/mastodon-logo.svg" alt="Mastodon" /></a></td>
      <td><a href="#rocket-chat"><img src="images/rocketchat-logo.png" alt="Rocket Chat" /></a></td>
      <td> </td>
    </tr>
  </tbody>
</table>

<p><br clear="all" /></p>

<h2 id="telegram">Telegram</h2>

<p><img src="images/telegram-logo.svg" alt="Telegram" /></p>

<h3 id="mautrix-telegram">mautrix-telegram</h3>

<table>
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
      <td>tulir</td>
      <td><a href="https://github.com/tulir/mautrix-telegram">mautrix-telegram</a></td>
      <td>Python</td>
      <td><a href="https://matrix.to/#/#telegram:maunium.net">#telegram:maunium.net</a></td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>✓ Send message content (text, formatting, files, etc..)<br />
✓ Redact/delete messages<br />
✓ Provide typing notifications and read receipts<br />
✓ Read receipts (where applicable - Telegram does not support this in group chats)<br />
✓ Images/Audio/Video/files</p>

<p>and much more. Read the current feature list at <a href="https://github.com/tulir/mautrix-telegram">https://github.com/tulir/mautrix-telegram</a>.</p>

<p><a href="https://github.com/tulir/mautrix-telegram">mautrix-telegram</a> can be self hosted, and is also available at <a href="https://t2bot.io">t2bot.io</a>: <a href="https://t2bot.io/telegram">https://t2bot.io/telegram</a></p>

<h2 id="slack">Slack</h2>

<p><img src="images/slack-logo.svg" alt="Slack" /></p>

<p>There are two projects available to bridge Slack, <a href="https://github.com/matrix-org/matrix-appservice-slack">matrix-appservice-slack</a>
from matrix.org and <a href="https://github.com/matrix-hacks/matrix-puppet-slack">matrix-puppet-slack</a>.</p>

<h3 id="matrix-appservice-slack">matrix-appservice-slack</h3>

<table>
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
      <td>matrix.org</td>
      <td><a href="https://github.com/matrix-org/matrix-appservice-slack">matrix-appservice-slack</a></td>
      <td>JavaScript</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>✓ Direct (1:1) Chats<br />
✓ Group (‘Channel’) Chats<br />
✗ History<br />
✗ Typing notifications and read receipts<br />
✓ Text Messages<br />
✗ Formatted Text Content<br />
✗ Image Content</p>

<p>When using <a href="https://riot.im/app/">Riot on riot.im</a>, you can enable Slack integration per-room. Click
the “Manage Integrations” (four squares) button at the top of the page.</p>

<h3 id="matrix-puppet-slack">matrix-puppet-slack</h3>

<table>
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
      <td><a href="https://github.com/matrix-hacks">matrix-hacks</a></td>
      <td><a href="https://github.com/matrix-hacks/matrix-puppet-slack">matrix-puppet-slack</a></td>
      <td>JavaScript</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>✓ Direct (1:1) Chats<br />
✓ Group (‘Channel’) Chats<br />
✗ History<br />
✓ Typing notifications (Slack → Matrix Only)<br />
✗ Read receipts<br />
✓ Text Messages<br />
✓ Formatted Text Content<br />
✓ Image Content<br />
✓ Multi-team</p>

<p><a href="https://github.com/matrix-hacks/matrix-puppet-slack">matrix-puppet-slack</a> is part of the <a href="https://github.com/matrix-hacks/matrix-puppet-bridge">matrix-puppet-bridge</a> suite of puppetting
bridges. It can be used for existing chats, rather than initiating new ones.</p>

<h2 id="irc">IRC</h2>

<p><code class="highlighter-rouge">IRC</code></p>

<h3 id="matrix-appservice-irc">matrix-appservice-irc</h3>

<table>
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
      <td>matrix-org</td>
      <td><a href="https://github.com/matrix-org/matrix-appservice-irc">matrix-appservice-irc</a></td>
      <td>JavaScript</td>
      <td><a href="https://matrix.to/#/#irc:matrix.org">#irc:matrix.org</a></td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>✓ 1:1 Chats<br />
✓ Group Chats</p>

<p>IRC bridging is very frequently used with Matrix. On matrix.org, many popular
IRC networks (including freenode, Moznet and GIMPNet) are bridged already.
find a <a href="https://github.com/matrix-org/matrix-appservice-irc/wiki/Bridged-IRC-networks">full list of these networks here</a>.</p>

<h2 id="discord">Discord</h2>

<p><img src="images/discord-logo.svg" alt="Discord" /></p>

<h3 id="matrix-appservice-discord">matrix-appservice-discord</h3>

<table>
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
      <td><a href="https://github.com/Half-Shot/">Half-Shot</a></td>
      <td><a href="https://github.com/Half-Shot/matrix-appservice-discord">matrix-appservice-discord</a></td>
      <td>TypeScript</td>
      <td><a href="https://matrix.to/#/#discord:half-shot.uk">#discord:half-shot.uk</a></td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>This project bridges <a href="https://discordapp.com">Discord</a> to Matrix via the Application API.</p>

<p>✓ Plain Text<br />
✓ Formatted Messages<br />
✓ Media/files<br />
✓ Redactions/Deletions<br />
✓ Presence  (Discord → Matrix only)<br />
✓ Typing notifications (Discord → Matrix only)<br />
✓ Replies<br />
✓ Stickers<br />
✓ Puppeting ( Can configure to puppet via a script)<br />
✗ Group/1:1 Chats<br />
✗ Calls</p>

<p>You can self host <a href="https://github.com/Half-Shot/matrix-appservice-discord">matrix-appservice-discord</a> in order to bridge your rooms
from Discord, it is also available from t2bot.io at <a href="https://t2bot.io/discord">https://t2bot.io/discord</a>.</p>

<h2 id="whatsapp">WhatsApp</h2>

<h3 id="mautrix-whatsapp">mautrix-whatsapp</h3>

<table>
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
      <td>tulir</td>
      <td><a href="https://github.com/tulir/mautrix-whatsapp">mautrix-whatsapp</a></td>
      <td>Go</td>
      <td><a href="https://matrix.to/#/#whatsapp:maunium.net">#whatsapp:maunium.net</a></td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>✓ 1:1 Chats<br />
✓ Group Chats<br />
✗ Redactions/Deletions<br />
✓ Presence (WhatsApp → Matrix only)<br />
✓ Read Receipts (WhatsApp → Matrix only)<br />
✓ Typing notifications (WhatsApp → Matrix only)<br />
✓ Plain text<br />
✓ Formatted messages<br />
✓ Media/files<br />
✓ Replies</p>

<h2 id="gitter">Gitter</h2>

<p><img src="images/gitter-logo.svg" alt="Gitter" /></p>

<h3 id="matrix-appservice-gitter">matrix-appservice-gitter</h3>

<table>
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
      <td>matrix-org</td>
      <td><a href="https://github.com/matrix-org/matrix-appservice-gitter">matrix-appservice-gitter</a></td>
      <td>JavaScript</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>✗ 1:1 Chats<br />
✓ Group Chats<br />
✗ Files<br />
✗ Formatted Messages<br />
✗ History<br />
✗ Read Receipts<br />
✗ Typing notifications</p>

<p>When using <a href="https://riot.im/app/">Riot on riot.im</a>, you can enable Gitter integration per-room. Click
the “Manage Integrations” (four squares) button at the top of the page.</p>

<h2 id="email">Email</h2>

<p><img src="images/email-icon.svg" alt="Email" /></p>

<h3 id="matrix-appservice-email">matrix-appservice-email</h3>

<table>
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
      <td>kamax</td>
      <td><a href="https://github.com/kamax-matrix/matrix-appservice-email">matrix-appservice-email</a></td>
      <td>Java</td>
      <td><a href="https://matrix.to/#/#mxasd-email:kamax.io">#mxasd-email:kamax.io</a></td>
      <td>Alpha</td>
    </tr>
  </tbody>
</table>

<p>The Email bridge allows a two ways conversation to be conducted between
Matrix and a specified Email address.</p>

<table>
  <thead>
    <tr>
      <th> </th>
      <th>Forwarding</th>
      <th>Configurable template</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Matrix → Email</strong></td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td><strong>Email → Matrix</strong></td>
      <td>✓</td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

<p>It can be self hosted, and it is also available from <a href="https://t2bot.io">t2bot.io</a> at
<a href="https://t2bot.io/email">https://t2bot.io/email</a>.</p>

<h2 id="sms">SMS</h2>

<p><img src="images/sms-icon.svg" alt="SMS" /></p>

<h3 id="smsmatrix">SmsMatrix</h3>

<table>
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
      <td>tijder</td>
      <td><a href="https://github.com/tijder/SmsMatrix">SmsMatrix</a></td>
      <td>Java</td>
      <td>#smsmatrix:matrix.org</td>
      <td>Alpha</td>
    </tr>
  </tbody>
</table>

<p>SmsMatrix runs on your phone, it can forward messages bi-directionally
between Matrix and SMS.</p>

<h2 id="imessage">iMessage</h2>

<h3 id="matrix-puppet-imessage">matrix-puppet-imessage</h3>

<table>
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
      <td><a href="https://github.com/matrix-hacks">matrix-hacks</a></td>
      <td><a href="https://github.com/matrix-hacks/matrix-puppet-imessage">matrix-puppet-imessage</a></td>
      <td>JavaScript</td>
      <td> </td>
      <td>Alpha</td>
    </tr>
  </tbody>
</table>

<p>This is a Matrix bridge for Apple iMessage. Requires a Mac with a functional
Messages.app, already authenticated. Full setup instructions are provided at
<a href="https://github.com/matrix-hacks/matrix-puppet-imessage">matrix-puppet-imessage</a>.</p>

<h2 id="hangouts">Hangouts</h2>

<h3 id="matrix-puppet-hangouts">matrix-puppet-hangouts</h3>

<table>
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
      <td><a href="https://github.com/matrix-hacks">matrix-hacks</a></td>
      <td><a href="https://github.com/matrix-hacks/matrix-puppet-hangouts">matrix-puppet-hangouts</a></td>
      <td>Python/JavaScript</td>
      <td> </td>
      <td>Alpha</td>
    </tr>
  </tbody>
</table>

<p><a href="https://github.com/matrix-hacks/matrix-puppet-hangouts">matrix-puppet-hangouts</a> can be self-hosted, full setup instructions are
available on the repo.</p>

<h3 id="matrix-appservice-hangouts">matrix-appservice-hangouts</h3>

<table>
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
      <td><a href="https://github.com/Cadair">Cadair</a></td>
      <td><a href="https://github.com/Cadair/matrix-appservice-hangouts">matrix-appservice-hangouts</a></td>
      <td>Python</td>
      <td> </td>
      <td>Alpha</td>
    </tr>
  </tbody>
</table>

<p>This is a matrix appservice with the objective of being a fully featured
puppeting multi-user hangouts bridge.</p>

<p>This bridge is implemented in Python 3.6+ using asyncio and the <a href="https://github.com/tdryer/hangups">hangups
library</a>. This library contains an asyncio
implementation of parts of the matrix client-server API and the application
service API.</p>

<h2 id="facebook-messenger">Facebook Messenger</h2>

<h3 id="matrix-puppet-facebook">matrix-puppet-facebook</h3>

<table>
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
      <td><a href="https://github.com/matrix-hacks">matrix-hacks</a></td>
      <td><a href="https://github.com/matrix-hacks/matrix-puppet-facebook">matrix-puppet-facebook</a></td>
      <td>JavaScript</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p><a href="https://github.com/matrix-hacks/matrix-puppet-facebook">matrix-puppet-facebook</a> must be hosted on your own homeserver, full
setup instructions are available on the repo.</p>

<h2 id="groupme">GroupMe</h2>

<h3 id="matrix-puppet-groupme">matrix-puppet-groupme</h3>

<table>
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
      <td><a href="https://github.com/matrix-hacks">matrix-hacks</a></td>
      <td><a href="https://github.com/matrix-hacks/matrix-puppet-groupme">matrix-puppet-groupme</a></td>
      <td>JavaScript</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p><a href="https://github.com/matrix-hacks/matrix-puppet-groupme">matrix-puppet-groupme</a> must be hosted on your own homeserver, full
setup instructions are available on the repo.</p>

<h2 id="skype">Skype</h2>

<h3 id="matrix-puppet-skype">matrix-puppet-skype</h3>

<table>
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
      <td><a href="https://github.com/matrix-hacks">matrix-hacks</a></td>
      <td><a href="https://github.com/matrix-hacks/matrix-puppet-skype">matrix-puppet-skype</a></td>
      <td>JavaScript</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>✓ Skype to Matrix direct text message<br />
✓ Matrix to Skype direct text message<br />
✓ Skype to Matrix direct image attachment message<br />
✓ Matrix to Skype direct image attachment message<br />
✓ group messaging<br />
✗ read receipts<br />
✗ contact list syncing</p>

<p><a href="https://github.com/matrix-hacks/matrix-puppet-skype">matrix-puppet-skype</a> must be hosted on your own homeserver, full
setup instructions are available on the repo. It uses
<a href="https://github.com/ocilo/skype-http">skype-http</a> under the hood.</p>

<h2 id="mastodon">Mastodon</h2>

<h3 id="mxtoot">MXToot</h3>

<table>
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
      <td><a href="https://github.com/ma1uta/">ma1uta</a></td>
      <td><a href="https://github.com/ma1uta/mxtoot">mxtoot</a></td>
      <td>Java</td>
      <td><a href="https://matrix.to/#/#mxtoot:matrix.org">#mxtoot:matrix.org</a></td>
      <td>Alpha</td>
    </tr>
  </tbody>
</table>

<p>A Matrix&lt;-&gt;Mastodon bot written in Java.</p>

<h2 id="rocket-chat">Rocket Chat</h2>

<h3 id="matrix-rocketchat">matrix-rocketchat</h3>

<table>
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
      <td><a href="https://github.com/exul/">exul</a></td>
      <td><a href="https://github.com/exul/matrix-rocketchat">matrix-rocketchat</a></td>
      <td>Rust</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>This is an application service that bridges Matrix to Rocket.Chat, written in Rust.</p>

<p>Find it on <a href="https://github.com/exul/matrix-rocketchat">GitHub</a>.</p>

<h2 id="rss">RSS</h2>

<h3 id="feedbot">feedbot</h3>

<table>
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
      <td><a href="http://rix.si/">Ryan Rix</a></td>
      <td><a href="https://code.rix.si/rrix/matrix-feedbot">feedbot</a></td>
      <td>Python</td>
      <td> </td>
      <td>Beta</td>
    </tr>
  </tbody>
</table>

<p>Connect to RSS and Twitter feeds via Ryan Rix’s feedbot!</p>

<p>Check it out from <a href="https://code.rix.si/rrix/matrix-feedbot">Ryan’s git repo</a></p>



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
export default Bridges
