/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain  } from '../../components'

import config from '../../../config'

const title = "Open Tech Will Save Us #4";

const OTWSU = () => (
  <Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
  titleOverride={title} imageOverride="https://matrix.org/images/otwsu2-card.png">
  <MXContentMain>
      <Helmet title={title + " " + config.siteTitle} />
        <h1>{title}</h1>
        <iframe title="_2DQ_iYZi5U" width="1120" height="630" src="https://www.youtube.com/embed/_2DQ_iYZi5U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
        <ul>
                <li>
                    <strong>Jay Graber</strong> (<a href="https://twitter.com/arcalinea">@arcalinea</a>, <a href="https://matrix.to/#/@arcalinea:matrix.org">@arcalinea:matrix.org</a>), creator of <a href="https://happening.net/">Happening</a> and <a href="https://medium.com/decentralized-web/decentralized-social-networks-e5a7a2603f53">all-around decentralisation fan</a> will summarize an overview of the decentralized social media ecosystem that they're working on.
                </li>
                <li>
                    <strong>Ania M. Piotrowska</strong> (<a href="https://twitter.com/aniampiotrowska">@aniampiotrowska</a>), known for her work on <a href="https://nymtech.net/">Nym</a>, Loopix, and at UCL will present "Building private future for the internet with the Nym mixnet".
                </li>
                <li>
                    <strong>Burak Nehbit</strong> (<a href="https://twitter.com/nehbit">@nehbit</a>, <a href="https://matrix.to/#/@burak:tomesh.net">@burak:tomesh.net</a>) will give a deep dive into his work on <a href="https://getaether.net/">Aether P2P</a>.
                </li>
            </ul>

        <img
          src="/images/otwsu4-heads.jpg"
          alt="OTWSU4 Headshots"
          id="otwsu4-heads"
        />
        </MXContentMain>
  </Layout>
)

export default OTWSU
