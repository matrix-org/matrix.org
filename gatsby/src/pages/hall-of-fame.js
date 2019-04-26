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
            date:'2019-04-20',
            who: 'Matrix McMatrix',
            profile: 'https://twitter.com/matrixdotorg',
            description:"Some nasty vuln",
            service:"Synapse"
        },
        {
            date:'2019-04-18',
            who: 'Rioter',
            profile: 'https://twitter.com/riotchat',
            description:"Some other nasty vuln",
            service:"Riot Web"
        }
    ];
    return (<Layout>
        <Wrapper>
            <Helmet title={`Security Hall Of Fame | ${config.siteTitle}`} />
            <Header />
            <Content>
                <h1>Security Hall of Fame</h1>
                <p>If you have a security vulnerability you would like to report to us,
                   please do so via an email to <a href='mailto:security@matrix.org'>
                   security@matrix.org</a>.
                   We will respond promptly and ask any follow on questions
                   necessary to validate the vulnerability before agreeing a
                   timeline for public disclosure.
                </p>
                <p><a href='https://github.com/matrix-org/matrix-doc/blob/matthew/msc1779/proposals/1779-open-governance.md'>
                    The Matrix.org Foundation</a> does not currently provide a bug bounty,
                    though organisations building on top of Matrix are likely
                    to do so in future. However, we do maintain a hall-of-fame
                    to recognise those who have responsibly disclosed security
                    issues to us. :)</p>

                <h3>Credits-</h3>
                <ul>
                    {hallOfFameEntries.map(entry => {
                        return <HallOfFameEntry
                                    date={entry.date}
                                    who={entry.who}
                                    profile={entry.profile}
                                    description={entry.description}
                                    service={entry.service}
                                />
                    })}

                </ul>
            </Content>
        </Wrapper>
    </Layout>)
}

export default HallOfFame
