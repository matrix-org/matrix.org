/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain  } from '../../components'

import config from '../../../config'

const title = "Open Tech Will Save Us #2";

const OTWSU = () => (
  <Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
  titleOverride={title} imageOverride="https://matrix.org/images/otwsu2-card.png">
  <MXContentMain>
      <Helmet title={title + config.siteTitle} />
        <h1>{title}</h1>
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/O3YP1TU-L_8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <ul>
          <li>3:00 Mike Hoye From Mozilla</li>
          <li>34:32 Eugen from Mastodon</li>
          <li>1:23:59 Dendrite presentation and demo</li>
        </ul>
        </MXContentMain>
  </Layout>
)

export default OTWSU
