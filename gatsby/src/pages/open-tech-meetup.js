/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from '../components'

import config from '../../config'



const Legal = () => {
    return (<Layout hasNavPadding="true">
            <Helmet title={`Open Tech Will Save Us | ${config.siteTitle}`} />
        <div>
            <h1>Open Tech Will Save Us</h1>
            
            <p>Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC.</p>
            
            <p>We discuss issues relating to technology, especially the importance of Open, Interoperable standards, and how they can enable decentralised tech to keep our data private while still enabling communication.</p>

            <h2>Next Event</h2>
            
            <p>The first event will be held on <b>Wednesday 8th April 2020</b> at <b>5PM UTC</b> (6PM UK time).</p>

            <h3>Agenda</h3>
            <ul>
                <li>Matthew Hodgson to introduce and speak anout the importance of decentralisation and privacy</li>
                <li>Saúl Ibarra Corretgé from Jitsi on the rapid growth they've experienced since the start of the 2020 crisis</li>
                <li>David Dias from IPFS introducing libp2p Gossipsub v1.1, set of security hardening extensions</li>
                <li>Valere, from Matrix and Riot, who will present the importance of UX and cross-signing keys in end-to-end encrypted communications.</li>
            </ul>

            <h3>Important note on timezones</h3>

            5pm UTC is:
            <ul>
                <li>7pm in Berlin</li>
                <li>6pm in the UK</li>
                <li>1pm in New York</li>
                <li>10am in California</li>
            </ul>
            <h3>How to join</h3>
            <p>(Optional) Sign up to attend our event on <a href="https://www.meetup.com/Open-Tech-Will-Save-Us/events/269787804/">Meetup</a>, to give us an idea of numbers. Registration on Meetup.com is not required for participation.</p>
            <p>Check back here for more information, including links to the live stream and chat room.</p>

        </div>
    </Layout>)
}

export default Legal
