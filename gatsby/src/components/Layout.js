import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import SEO from './SEO'
import theme from '../../config/theme'
import useBuildTime from '../hooks/useBuildTime'

import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children, customSEO }) => {
  const buildTime = useBuildTime()

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navigation />
        {!customSEO && <SEO buildTime={buildTime} />}
        <div class="mxcontentwrapper">
          <div class="mxcontent">
            {children}
          </div>
        </div>
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
