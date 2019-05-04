/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, Wrapper, Header, HallOfFameEntry} from '../components'

import config from '../../config'

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 3rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
`


const HallOfFame = () => {
    const hallOfFameEntries = [
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
            service:"Synapse"
        },
        {
            date:'2019-04-18',
            who: 'fs0c131y',
            profile: 'https://fs0c131y.com/',
            description:"An email validation exploit in Sydent. For more details see <a href='https://matrix.org/blog/2019/04/18/security-update-sydent-1-0-2/'>here</a> and <a href='https://www.cvedetails.com/cve/CVE-2019-11340/'>CVE-2019-11340</a>.",
            service:"Sydent",
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


    return (<Layout>
        <Wrapper>
            <Helmet title={`Security Disclosure Policy | ${config.siteTitle}`} />
            <Header />
            <Content>
                <h1>Security Disclosure Policy</h1>
                <p>Matrix.org greatly appreciates investigative work into security vulnerabilities carried out by well-intentioned, ethical security researchers. We follow the practice of <a href='https://en.wikipedia.org/wiki/Responsible_disclosure'>responsible disclosure</a> in order to best protect Matrix’s user-base from the impact of security issues.  On our side, this means:</p>
                <ul>
                    <li>We will respond to security incidents as a priority.</li>
                    <li>We will fix the issue as soon as is practical, keeping in mind that not all risks are created equal.</li>
                    <li>We will always transparently let the community know about any incident that affects them.</li>
                </ul>
                <p>If you have found a security vulnerability in Matrix, we ask that you disclose it responsibly by emailing <a href='mailto:security@matrix.org'> security@matrix.org</a>. Please do not discuss potential vulnerabilities in public without validating with us first.</p>
                <p>On receipt the security team will:</p>
                <ul>
                    <li>Review the report, verify the vulnerability and respond with confirmation and/or further information requests; we typically reply within 24 hours. </li>
                    <li>Once the reported security bug has been addressed we will notify the Researcher, who is then welcome to optionally disclose publicly.</li>
                </ul>
                <p>The Matrix.org Foundation does not currently provide a bug bounty, though organisations building on top of Matrix may do so in future. We do, however, maintain a Hall of Fame to recognise those who have responsibly disclosed security issues to us in the past.</p>

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
            </Content>
        </Wrapper>
    </Layout>)
}

export default HallOfFame
