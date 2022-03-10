/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from '../components'

import config from '../../config'

const title = `Open Tech Will Save Us | ${config.siteTitle}`;

const OpenTech = () => {
    return (<Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the last Wednesday of every month at 6pm Paris Time"
    titleOverride={title}>
            <Helmet title={title}>
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content="https://matrix.org/images/Open-Tech-2-Dark@2x.png" />
                <meta http-equiv="refresh" content="0; url=/open-tech-will-save-us" />
            </Helmet>
    </Layout>)
}

export default OpenTech
