/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import { Layout } from '../components'

import config from '../../config'

export function Head() {
  return <title>Security Disclosure Policy | {config.siteTitle}</title>;
}

const SecurityDisclosurePolicy = () => {
    return (<Layout hasNavPadding="true">
            <div style={{width: "75%"}}>
            <h1 style={{marginBottom: 0.5 + 'em'}}>Security Disclosure Policy</h1>
            <p>Matrix.org greatly appreciates investigative work into security vulnerabilities
            carried out by well-intentioned, ethical security researchers. We follow the practice of
            <a href='https://en.wikipedia.org/wiki/Responsible_disclosure'> responsible
            disclosure</a> in order to best protect Matrix’s user base from the impact of security
            issues.  On our side, this means:</p>
            <ul>
                <li>We will respond to security incidents as a priority.</li>
                <li>We will work with you to establish a disclosure time frame for the reported
                vulnerability. During this time frame, we will either work on a fix or decide to accept
                the risk, after which we will disclose the vulnerability.</li>
                <li>We will always transparently let the community know about any incident that
                affects them.</li>
            </ul>
            <p>In general, we will aim for a fix within 90 days of processing your report, but we
            may propose a longer time frame (usually 120 days) for especially complex
            vulnerabilities. In some cases, when a vulnerability is particularly disruptive and/or
            easy to exploit, we may delay publishing technical details for an additional period
            after the fix is publicly available (usually no longer than 30 days).</p>
            <p>If you have found a security vulnerability in Matrix, we ask that you disclose it
            responsibly by emailing <a href='mailto:security@matrix.org'>security@matrix.org</a>.
            Optionally, if you want to encrypt your email, you can use our <a
            href="/.well-known/pgp-key.txt">PGP key</a>. Please do not discuss potential
            vulnerabilities in public without validating with us first.</p>
            <p>On receipt, the security team will:</p>
            <ul>
                <li>Review the report, verify the vulnerability and respond with confirmation and/or
            further information requests; we typically reply within 24 hours. </li>
                <li>Once the reported security bug has been addressed we will notify the Researcher,
            who is then welcome to optionally disclose publicly.</li>
            </ul>
            <p>The following is a list of known issues and/or things we do not consider to be an
            issue. Please <em>do not</em> send reports regarding the following:</p>
            <ul>
                <li>Issues relating to SPF or DMARC.</li>
            </ul>
            <p>The Matrix.org Foundation does not ordinarily provide bug bounties, though
            organisations building on top of Matrix may do so in future. We maintain a <a
            href="../hall-of-fame">Hall of Fame</a> to recognise those who have responsibly
            disclosed security issues to us in the past.</p>
        </div>
    </Layout>)
}

export default SecurityDisclosurePolicy
