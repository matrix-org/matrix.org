/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from '../components'

import config from '../../config'



const Legal = () => {
    return (<Layout hasNavPadding="true">
            <Helmet title={`Legal | ${config.siteTitle}`} />
        <div>
            <h1>Legal</h1>
            Links to our legal documentation:
            <ul>
                <li>
                    <a href="/legal/privacy-notice">Privacy Notice</a>
                </li>
                <li>
                    <a href="/legal/terms-and-conditions">Terms and Conditions</a>
                </li>
                <li>
                    <a href="/legal/code-of-conduct">Code of Conduct</a>
                </li>
                <li>
                    <a href="/legal/copyright-notice">Copyright Notice</a>
                </li>
                <li>
                    <a href="/legal/law-enforcement-guidelines">Law Enforcement Guidelines</a>
                </li>
            </ul>
        </div>
    </Layout>)
}

export default Legal
