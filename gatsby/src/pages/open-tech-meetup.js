/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from '../components'

import config from '../../config'



const Legal = () => {
    return (<Layout hasNavPadding="true">
            <Helmet title={`Legal | ${config.siteTitle}`} />
        <div>
            <h1>Open Tech Will Save Us</h1>
            
            <p>Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC.</p>
            
            <p>We discuss issues relating to technology, especially the importance of Open, Interoperable standards, and how they can enable decentralised tech to keep our data private while still enabling communication.</p>

            <h2>Next Event</h2>
            
            <p>The first event will be held on <b>Wednesday 8th April 2020</b> at <b>5PM UTC</b> (6PM UK time).</p>

            <p><b>Agenda TBA</b></p>

            <p>Check back here for more information, including links to the live stream and chat room.</p>

        </div>
    </Layout>)
}

export default Legal
