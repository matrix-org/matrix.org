/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, HallOfFameEntry} from '../components'

import config from '../../config'


const HallOfFame = () => {
    const hallOfFameEntries = [
        {
            date: '2021-05-21',
            who: 'Aaron Raimist and an anonymous security researcher',
            profile: 'https://github.com/aaronraimist/',
            description: 'Discovered that Element Android was disclosing the filename of end-to-end encrypted attachments to the homeserver. Fixed in Element Android 1.1.8.',
            service: 'Element Android'
        },
        {
            date: '2021-03-01',
            who: 'Graham Leach-Krouse',
            profile: 'http://grahamlk.com/',
            description: 'Authentication bypass in SQLite deployments. Fixed in <a href="https://github.com/matrix-org/dendrite/releases/tag/v0.3.11">Dendrite v0.3.11</a>.',
            service: 'Dendrite'
        },
        {
            date: '2021-02-16',
            who: 'Guilherme Keerok',
            profile: 'https://github.com/keerok',
            description: 'User content sandbox could be tricked into opening arbitrary documents (<a href="https://github.com/matrix-org/matrix-react-sdk/security/advisories/GHSA-52mq-6jcv-j79x">CVE-2021-21320</a>). Fixed in <a href="https://github.com/matrix-org/matrix-react-sdk/releases/tag/v3.15.0">matrix-react-sdk 3.15.0</a>.',
            service: 'Matrix React SDK'
        },
        {
            date:'2021-01-18',
            who: 'Michaël Scherer',
            profile: 'https://github.com/mscherer/',
            description: 'IP blacklist bypass via transitional IPv6 addresses on dual-stack networks (<a href="https://github.com/matrix-org/synapse/security/advisories/GHSA-5wrh-4jwv-5w78">CVE-2021-21392</a>). Fixed in Synapse 1.28.0.',
            service: "Synapse"
        },
        {
            date: '2021-01-07',
            who: 'Andrea Spacca',
            profile: 'https://github.com/aspacca',
            description: 'Element iOS crash via an invalid content payload. Fixed in Element iOS 1.1.4.',
            service: 'Element iOS'
        },
        {
            date:'2020-11-17',
            who: 'Michaël Scherer',
            profile: 'https://github.com/mscherer/',
            description: 'Denial of service attack via .well-known lookups (<a href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-21274">CVE-2021-21274</a>). Fixed in Synapse 1.25.0.',
            service: "Synapse"
        },
        {
            date:'2020-11-17',
            who: 'Michaël Scherer',
            profile: 'https://github.com/mscherer/',
            description: 'IP blacklist bypass via redirects on some federation and push requests (<a href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-21273">CVE-2021-21273</a>). Fixed in Synapse 1.25.0.',
            service: "Synapse"
        },
        {
            date:'2020-09-20',
            who: 'Denis Kasak',
            profile: 'https://github.com/dkasak',
            description: 'HTML injection in login fallback endpoints could be used for a Cross-site-scripting attack (<a href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26891">CVE-2020-26891</a>). Fixed in Synapse 1.21.0.',
            service: "Synapse"
        },
        {
            date:'2020-09-09',
            who: 'Pritam Mukherjee',
            profile: 'https://www.linkedin.com/in/pritam-mukherjee-urvil-b75ab9b9/',
            description: 'Misconfigured X-Frame in New Vector internal infrastructure could lead to Clickjacking',
            service: "New Vector Infrastructure"
        },
        {
            date:'2020-08-14',
            who: 'awesome-michael',
            profile: 'https://github.com/awesome-michael',
            company: 'Awesome Technologies',
            companyUrl: 'https://github.com/Awesome-Technologies',
            description: 'An issue where encrypted state events could break incoming call handling. Fixed in <a href="https://github.com/vector-im/element-web/releases/tag/v1.7.5">Element 1.7.5</a>',
            service: "Element"
        },
        {
            date:'2020-07-29',
            who: '0x1a8510f2',
            profile: 'https://github.com/0x1a8510f2/',
            description: 'An issue where Element Android was leaking PII. Fixed in <a href="https://github.com/vector-im/element-android/releases/tag/v1.0.5">Element Android 1.0.5</a>',
            service: "Element"
        },
        {
            date:'2020-07-20',
            who: 'SakiiR',
            profile: 'https://twitter.com/sakiirsecurity',
            description: 'An issue where an unexpected language ID in a code block could cause Element to crash. Fixed in <a href="https://github.com/vector-im/element-web/releases/tag/v1.7.3">Element 1.7.3</a>',
            service: "Element"
        },
        {
            date:'2020-07-14',
            who: 'Denis Kasak',
            profile: 'https://github.com/dkasak',
            description: 'Invalid JSON could become part of the room state, acting as a denial of service vector (<a href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26890">CVE-2020-26890</a>). Fixed in Synapse 1.20.0. Disclosed 2020-11-23.',
            service: "Synapse"
        },
        {
            date: '2020-07-02',
            who: 'Quentin Gliech',
            profile: 'https://sandhose.fr',
            description: 'A clickjacking vulnerability in the single-sign-on flow in Synapse. Fixed in <a href="https://github.com/matrix-org/synapse/releases/tag/v1.15.2">Synapse 1.15.2</a>.',
            service: 'Synapse'
        },
        {
            date:'2020-06-18',
            who: 'Sorunome',
            profile: 'placeholder',
            description: 'An issue where replying to a specially formatted message would make it seem like the replier said something they did not. Fixed in <a href="https://github.com/vector-im/element-web/releases/tag/v1.7.3">Element 1.7.3</a>',
            service: "Element"
        },
        {
            date: '2020-05-10',
            who: 'Quentin Gliech',
            profile: 'https://sandhose.fr',
            description: 'A CSRF attack leading to potential unauthorised access to accounts on servers using single-sign-on flows. Fixed as part of <a href="https://github.com/matrix-org/matrix-react-sdk/pull/4685">matrix-react-sdk#4685</a>, released in Riot/Web 1.6.3.',
            service: 'Matrix React SDK'
        },
        {
            date: '2020-05-03',
            who: 'David Wong',
            profile: 'https://twitter.com/cryptodavidw',
            description: 'A vulnerability in the SAS verification protocol failing to bind the ephemeral public keys. Fixed in <a href="https://github.com/matrix-org/matrix-doc/pull/2630">MSC2630</a>, which lists the fixed client versions.',
            service: 'e2e spec'
        },
        {
            date:'2020-03-03',
            who: 'Rhys Davies',
            profile: 'https://twitter.com/rhysmdnz',
            description: "An open redirect vulnerability affecting single sign-on flows. Fixed in Synapse 1.11.1",
            service: "Synapse"
        },
        {
            date:'2019-05-02',
            who: 'Enguerran Gillier',
            profile: 'https://twitter.com/opnsec',
            description: "HTML injection in email invites. A malicious 3rd party invite could inject unescaped HTML into the email template.  Fixed in Sydent 1.0.3",
            service: "sydent"
        },
        {
            date:'2019-05-02',
            who: 'Enguerran Gillier',
            profile: 'https://twitter.com/opnsec',
            description: "SSRF in the URL preview API, which did not blacklist access to 0.0.0.0/32 or ::/128 by default.  Fixed in Synapse 0.99.3.1",
            service: "synapse"
        },
        {
            date:'2019-05-02',
            who: 'Enguerran Gillier',
            profile: 'https://twitter.com/opnsec',
            description: "Insecure pseudo-random number generator in synapse meant that an attacker might be able to predict random values.  Fixed in Synapse 0.99.3.1",
            service: "synapse"
        },
        {
            date:'2019-05-02',
            who: 'Enguerran Gillier',
            profile: 'https://twitter.com/opnsec',
            description: "Insecure pseudo-random number generator in sydent meant that an attacker could predict authentication tokens.  Fixed in Sydent 1.0.3",
            service: "sydent"
        },
        {
            date:'2019-04-22',
            who: 'Julien Thomas',
            profile: 'https://twitter.com/julien_thomas',
            company: 'Protektoid Project',
            companyUrl: 'https://protektoid.com',
            description: "Obsolete and buggy ContentProvider in Riot/Android meant that a malicious local app could compromise account data. Mitigated <a href='https://github.com/vector-im/riot-android/commit/096dfbef39bf0ce53ea2e80225a85e74d75aefa0'>here</a>.",
            service:"Riot/Android"
        },
        {
            date:'2019-04-20',
            who: 'fs0c131y',
            profile: 'https://fs0c131y.com/',
            description:"Sydent sesssion ids were predictable, meaning it was possible to infer the total number of validations and also check if an address had been validated. Mitigated <a href=https://github.com/matrix-org/sydent/pull/143> here.</a>",
            service:"Sydent"
        },
        {
            date:'2019-04-18',
            who: 'fs0c131y',
            profile: 'https://fs0c131y.com/',
            description:"An email validation exploit in Sydent. For more details see <a href='https://matrix.org/blog/2019/04/18/security-update-sydent-1-0-2/'>here</a> and <a href='https://www.cvedetails.com/cve/CVE-2019-11340/'>CVE-2019-11340</a>.",
            service:"Sydent",
        },
        {
            date:'2019-04-09',
            who: 'Jaikey Sarraf',
            profile: 'https://twitter.com/jaikeysarraf/',
            description:"Identified a unpatched RCE vulnerability in Matrix.org's public-facing Jenkins.  It transpired the vulnerability had been <a href='https://matrix.org/blog/2019/04/11/security-incident/'>exploited by an attacker</a>.",
            service:"Infrastructure",
        },
        {
            date:'2018-12-06',
            who: 'Brian Hyde',
            profile: 'https://hyde.solutions/',
            description:"XSS exploit allowing a malicious SWF uploaded to Riot via Firefox to run arbitrary code in the domain of the content repository. Mitigated <a href='https://github.com/matrix-org/synapse/pull/4284'> here.</a>",
            service:"Synapse",
        },
        {
            date:'2018-02-19',
            who: 'rugk',
            profile: 'https://github.com/rugk',
            description:"Origin check of ScalarMessaging postmessage API was insufficient. Mitigated <a href='https://github.com/matrix-org/matrix-react-sdk/pull/1760'> here.</a>",
            service:"Matrix React SDK",
        },
    ];

    return (<Layout hasNavPadding="true">
            <Helmet title={`Security Disclosure Policy | ${config.siteTitle}`} />
        <div>
            <h1>Security Disclosure Policy</h1>
            <p>Matrix.org greatly appreciates investigative work into security vulnerabilities carried out by well-intentioned, ethical security researchers. We follow the practice of <a href='https://en.wikipedia.org/wiki/Responsible_disclosure'>responsible disclosure</a> in order to best protect Matrix’s user-base from the impact of security issues.  On our side, this means:</p>
            <ul>
                <li>We will respond to security incidents as a priority.</li>
                <li>We will fix the issue as soon as is practical, keeping in mind that not all risks are created equal.</li>
                <li>We will always transparently let the community know about any incident that affects them.</li>
            </ul>
            <p>If you have found a security vulnerability in Matrix, we ask that you disclose it responsibly by emailing <a href='mailto:security@matrix.org'>security@matrix.org</a>. Please do not discuss potential vulnerabilities in public without validating with us first.</p>
            <p>On receipt the security team will:</p>
            <ul>
                <li>Review the report, verify the vulnerability and respond with confirmation and/or further information requests; we typically reply within 24 hours. </li>
                <li>Once the reported security bug has been addressed we will notify the Researcher, who is then welcome to optionally disclose publicly.</li>
            </ul>
            <p>The Matrix.org Foundation does not ordinarily provide bug bounties, though organisations building on top of Matrix may do so in future.</p>
            <p>We maintain a Hall of Fame to recognise those who have responsibly disclosed security issues to us in the past.</p>

            <h3>Hall of Fame</h3>
            <ul>
                {hallOfFameEntries.map(entry => {
                    return <HallOfFameEntry
                                date={entry.date}
                                who={entry.who}
                                profile={entry.profile}
                                company={entry.company}
                                companyUrl={entry.companyUrl}
                                description={entry.description}
                                service={entry.service}
                            />
                })}

            </ul>
            <p>If you think you should be on the list, apologies if we missed you, please mail us at <a href='mailto:security@matrix.org'> security@matrix.org</a></p>
        </div>
    </Layout>)
}

export default HallOfFame
