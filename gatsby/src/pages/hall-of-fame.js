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
  margin-top: -3rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 3rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
  form {
    p {
      label,
      input {
        display: block;
      }
      input {
        min-width: 275px;
        margin-top: 0.5rem;
      }
      textarea {
        resize: vertical;
        min-height: 150px;
        width: 100%;
        margin-top: 0.5rem;
      }
    }
  }
`


const HallOfFame = () => (
    <Layout>
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
                <p>At the current time we do not provide a bounty programme
                   ourselves as we are a <a href='https://github.com/matrix-org/matrix-doc/blob/matthew/msc1779/proposals/1779-open-governance.md'>
                   non-profit open source project. </a>
                   However, we do maintain a hall-of-fame to recognise those
                   who have responsibly disclosed security issues to us :)
                </p>
                <p>Our enduring thanks to:-</p>
                <ul>
                    <HallOfFameEntry date="2019-04-23" description="thanks to bob for ...."></HallOfFameEntry>
                </ul>
            </Content>
        </Wrapper>
    </Layout>
)

export default HallOfFame