/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain  } from '../../components'

import config from '../../../config'

const title = "Open Tech Will Save Us #3";

const OTWSU = () => (
  <Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
  titleOverride={title} imageOverride="https://matrix.org/images/otwsu2-card.png">
  <MXContentMain>
      <Helmet title={title + config.siteTitle} />
        <h1>{title}</h1>
        <iframe title="_fTREjXQCto" width="1120" height="630" src="https://www.youtube.com/embed/_fTREjXQCto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <ul>
          <li>1:00 Rabble talking about Planetary and SSB</li>
          <li>31:19 Annie on Ditto</li>
          <li>1:10:20 Erik on Synapse Perf</li>
        </ul>
        <img
          src="/images/otwsu3-heads.jpg"
          alt="OTWSU3 Headshots"
          id="otwsu3-heads"
        />
        </MXContentMain>
  </Layout>
)

export default OTWSU
