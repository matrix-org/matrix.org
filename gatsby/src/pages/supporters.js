/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from '../components'

import config from '../../config'



const Supporters = () => {
    return (<Layout hasNavPadding="true">
            <Helmet title={`Supporters | ${config.siteTitle}`} />
        <div>
            <h1>Supporters</h1>
            <h2>Thanks to our community supporters!</h2>
            <div><strong>
                Alex Gusarev, Alexander Olofsson, asdf, Ivan Shapovalov, Jeroen Bots, Joel Lehtonen,<br />
                jump_spider, Lance Gaines, lub, Mark Diaz, Paul Lindner, Paul Tötterman,<br />
                Ross Schulman, Stuart Mumford, Ted Logan, TimeWalker, Timothy Suggs,<br />
                Travis Ralston, Trung Le, Xiaoyi Chen, Yedige Davletgaliyev, the0, Nicola Fabiano, Michael Downey</strong></div>
            <h2 className="mxblock__hx">Support Matrix</h2>
            <p className="mxp">If you share our vision, or are building on top of Matrix, please consider donating.</p>
            <p className="mxp">Support us on Donorbox to allow us to maintain the Matrix specification, maintain Synapse, and much more.</p>
            <p className="mxp">
              We keep Patreon for people used to it, but Donorbox allows us to
              collect donations with much less fees. If you are already using
              Patreon and don't want to move to Donorbox, it's perfectly fine
              and we're happy to have you as part of our supporters.
            </p>
            <p className="mxp">
              If you want to start donating, please consider using Donorbox as
              it's the most efficient way to send us money!
            </p>
            <a href="https://donorbox.org/keep-matrix-exciting">
                <img alt="Donorbox" src="/images/donorbox.png" />
            </a>
        </div>
    </Layout>)
}

export default Supporters
