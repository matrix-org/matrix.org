/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain} from '../components'

import config from '../../config'



const Legal = () => {
    return (<Layout hasNavPadding="true">
            <Helmet title={`Legal | ${config.siteTitle}`} />
            <MXContentMain>
          <div class="mxcontent__main__doc">
                <h1>Legal</h1>
                Links to our legal documentation:
                <ul>
                    <li>
                        <a href="https://matrix.org/docs/guides/privacy_notice.html">Privacy Notice</a>
                    </li>
                    <li>
                        <a href="https://matrix.org/docs/guides/terms_and_conditions.html">Terms and Conditions</a>
                    </li>
                    <li>
                        <a href="https://matrix.org/docs/guides/code_of_conduct">Code of Conduct</a>
                    </li>
                    <li>
                        <a href="https://matrix.org/docs/guides/copyright_notice">Copyright Notice</a>
                    </li>
                    <li>
                        <a href="https://matrix.org/docs/guides/exceptional_erasure_policy">Exceptional Erasure Policy</a>
                    </li>
                </ul>
                </div>
            </MXContentMain>
    </Layout>)
}

export default Legal
