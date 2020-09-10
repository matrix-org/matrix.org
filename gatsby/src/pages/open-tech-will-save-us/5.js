/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain  } from '../../components'

import config from '../../../config'

const title = "Open Tech Will Save Us #5";

const OTWSU = () => (
  <Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
  titleOverride={title} imageOverride="https://matrix.org/images/otwsu2-card.png">
  <MXContentMain>
      <Helmet title={title + " " + config.siteTitle} />
        <h1>{title}</h1>
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/tJ8tthkVAOQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        
        <ul>
          <li>
            <strong>Jonathan Beri, known Maker of Things</strong> (
            <a href="https://toot.cafe/@jberi">@jberi@toot.cafe</a>) will be
            presenting{" "}
            <em>
              Making it easier to make Things: WebAssembly and the Internet of
              Things
            </em>
            <br />
            WebAssembly is moving beyond the browser - but is it ready for IoT
            apps and tiny embedded devices? Yes...ish. In this talk, learn about
            the state of running Wasm on embedded devices and what's left to
            solve.
          </li>
          <li>
            <strong>Matthew Petry from Pine64</strong> (
            <a href="https://matrix.to/#/@fire219:matrix.org">
              @fire219:matrix.org
            </a>
            ) presents his experience with running Synapse on RockPro64 cluster,
            plus some thoughts on his time with Pine64!
          </li>
          <li>
            <strong>Nad from Element</strong> dives into the recent rebrand, in
            which he worked to combine three brands into one, all while working
            to maintain a strong identity - highly recommended for Design and
            Product <del>nerds</del> fans
          </li>
        </ul>

        
        <img src="/images/otwsu5-heads.png" alt="OTWSU5 Headshots" />
        </MXContentMain>
  </Layout>
)

export default OTWSU
