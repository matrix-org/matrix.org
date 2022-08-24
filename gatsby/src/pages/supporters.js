/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import { Layout } from '../components'

import config from '../../config'

export function Head() {
  return <title id="title">Supporters | {config.siteTitle}</title>;
}

const Supporters = () => {
    return (<Layout hasNavPadding="true">
        <div>
            <h1>Supporters</h1>
            <h2>Thanks to our Patreon supporters!</h2>
            <div><strong>
                Alex Gusarev, Alexander Olofsson, asdf, Ivan Shapovalov, Jeroen Bots, Joel Lehtonen,<br />
                jump_spider, Lance Gaines, lub, Mark Diaz, Paul Lindner, Paul Tötterman,<br />
                Ross Schulman, Stuart Mumford, Ted Logan, TimeWalker, Timothy Suggs,<br />
                Travis Ralston, Trung Le, Xiaoyi Chen, Yedige Davletgaliyev, the0, Nicola Fabiano, Michael Downey</strong></div>
            <h2 className="mxblock__hx">Support Matrix</h2>
            <p className="mxp">If you share our vision, or are building on top of Matrix, please consider donating...</p>
            <p className="mxp">Support us on Patreon for great rewards including access to the supporters-only podcast, and even a voice at our weekly meetings.<br /><a href="https://www.patreon.com/matrixdotorg">Find out more at our Patreon page</a>.</p>
            <a href="https://www.patreon.com/matrixdotorg">
                <img alt="Patreon" src="/images/patreon.png" />
            </a>
        </div>
    </Layout>)
}

export default Supporters
