/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain  } from '../../components'

import config from '../../../config'

const title = "Open Tech Will Save Us #1";

const OTWSU = () => (
  <Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
  titleOverride={title} imageOverride="https://matrix.org/images/otwsu1-card.png">
  <MXContentMain>
      <Helmet title={title + config.siteTitle} />
        <h1>{title}</h1>
        <iframe title="APVp-20ATLk" width="1120" height="630" src="https://www.youtube.com/embed/APVp-20ATLk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <ul>
            <li>5:01 Welcome from Matthew</li>
            <li>14:10 Saúl Ibarra Corretgé from Jitsi on the rapid growth they've experienced since the start of the 2020 crisis</li>
            <li>1:00:10 David Dias from IPFS IPFS introducing gossipsub in libp2p, including the security hardening work that they've been putting into v1.1!</li>
            <li>1:42:00 Valère, from Matrix and Riot, who will present the importance of UX and cross-signing keys in end-to-end encrypted communications.</li>
        </ul>
        </MXContentMain>
  </Layout>
)

export default OTWSU
