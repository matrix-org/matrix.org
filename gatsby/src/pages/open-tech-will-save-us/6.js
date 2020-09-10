/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain  } from '../../components'

import config from '../../../config'

const title = "Open Tech Will Save Us #6";

const OTWSU = () => (
  <Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
  titleOverride={title} imageOverride="https://matrix.org/images/otwsu2-card.png">
  <MXContentMain>
      <Helmet title={title + " " + config.siteTitle} />
        <h1>{title}</h1>
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/AGs4ZC24Q1Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        
        <ul>
          <li>
            <strong>Ag3m</strong>, from <a href="https://www.laquadrature.net">La Quadrature du Net</a> will
            join us to present <em>
              "Some thoughts on moderation and censorship in a decentralised world"
              </em>.<br />
              As a member at LQDN for three years and a volunteer for more than that, Ag3m cofounded a queer 
              feminist hackerspace in Paris called <em>le Reset</em>.
          </li>
          <li>
            <strong>Sean DuBois</strong> (<a href="https://github.com/Sean-Der">Sean-Der</a>,&nbsp;
            <a href="https://matrix.to/#/@sean-der:matrix.org">@sean-der:matrix.org</a>), WebRTC-knower and author of&nbsp;
            <a href="https://webrtcforthecurious.com">WebRTC for the Curious</a> will discuss his recent work in the space.
          </li>
          <li>
            Element encryption team, represented by <strong>Damir Jelić</strong> (and channeling others), will 
            discuss the latest and greatest thoughts on encryption, including: <em>E2EE protocol changes 
              (touching on cross-signing, SSSS, dehydration) and future ideas for improving E2EE (e.g. 
              cryptographic logins, MLS)</em>!
          </li>
        </ul>

        
        <img src="/images/otwsu6-heads.png" alt="OTWSU5 Headshots" />
        </MXContentMain>
  </Layout>
)

export default OTWSU
