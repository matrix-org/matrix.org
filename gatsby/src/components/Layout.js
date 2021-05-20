import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import SEO from './SEO'
import theme from '../../config/theme'
import useBuildTime from '../hooks/useBuildTime'

import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children, customSEO, navmode,  hasSideNavigation, hasNavPadding, excerptOverride, titleOverride, imageOverride }) => {
  const buildTime = useBuildTime()
  const mxContentWrapperClass = "mxcontentwrapper" + (hasNavPadding === "true" ? " mxcontentwrapper--navpadding" : "")
  const mxContentClass = "mxcontent" + (hasSideNavigation === "true" ?  " mxcontent--docs" : "")
  return (
    <ThemeProvider theme={theme}>
      <>
        <Navigation navmode={navmode} />
        {!customSEO && 
        <SEO buildTime={buildTime} excerptOverride={excerptOverride} titleOverride={titleOverride} imageOverride={imageOverride} />}
        <div className={mxContentWrapperClass}>
          <div className={mxContentClass}>
            {children}
          </div>
        </div>
        <Footer>
          <div className="footer__text">&copy; 2019 Matrix.org. All rights reserved.</div>
          <div className="footer-highlight">
            <a className="footer-highlight__link" href="/docs/api">
              Client-Server APIs
            </a>
            <a className="footer-highlight__link" href="/security-disclosure-policy">
              Security
            </a>
            <a className="footer-highlight__right" href="/legal">
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
  navmode: PropTypes.string,
  hasSideNavigation: PropTypes.string,
  hasNavPadding: PropTypes.string,
  excerptOverride: PropTypes.string
}

Layout.defaultProps = {
  customSEO: false,
}
