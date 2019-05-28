import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import SEO from './SEO'
import theme from '../../config/theme'
import useBuildTime from '../hooks/useBuildTime'

import Navigation from './Navigation'

const Footer = styled.footer`
  text-align: center;
  padding: 0;
  font-size: 0.9rem;
  .footer__text {
    margin: 2rem;
  }
  .footer-highlight {
    background-color: #ebebeb;
    padding: 1rem 0.5rem;
    text-align: left;
    max-width: 100%;
    margin: 0 auto;
  }
  .footer-highlight__link {
    margin: 1rem;
  }
  .footer-highlight__right {
    position: absolute;
    margin-right: 1rem;
    right: 0;
  }
  .footer-highlight__hidden {
    display: none;
    position: absolute;
    margin-right: 1rem;
    right: 0;
    font-size: 0.6rem;
  }
`

const Layout = ({ children, customSEO }) => {
  const buildTime = useBuildTime()

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navigation />
        {!customSEO && <SEO buildTime={buildTime} />}
        
        {children}
        <Footer>
          <div className="footer__text">&copy; 2019 Matrix.org. All rights reserved.</div>
          <div className="footer-highlight">
            <a className="footer-highlight__link" href="https://matrix.org/docs/api">
              Client-Server APIs
            </a>
            <a className="footer-highlight__link" href="/security-disclosure-policy">
              Security
            </a>
            <a className="footer-highlight__right" href="https://matrix.org/docs/guides/matrix_org_legal.html">
              Legal
            </a>
            <span className="footer-highlight__hidden">Last build: {buildTime}</span>
          </div>
        </Footer>
      </>
    </ThemeProvider>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  customSEO: PropTypes.bool,
}

Layout.defaultProps = {
  customSEO: false,
}
