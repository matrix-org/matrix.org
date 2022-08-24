/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import { Layout, MXContentMain, SEO  } from '../components'

import config from '../../config'

export function Head() {
  return (
    <>
      <SEO />
      <title>Contact | {config.siteTitle}</title>
    </>
  );
}

const Contact = () => (
  <Layout hasNavPadding="true">
  <MXContentMain>
        <h1>Contact</h1>
        <p>The best place to get information and connect is on Matrix itself - starting in <a href="https://matrix.to/#/#matrix:matrix.org">Matrix HQ (#matrix:matrix.org)</a>.<br />
        However, if you prefer email, or have a need to be more direct:</p>
        <ul>
          <li>
            <a href="mailto:abuse@matrix.org">abuse@matrix.org</a> if you need to urgently report abuse on the platform
          </li>
          <li>
            <a href="mailto:support@matrix.org">support@matrix.org</a> for more general support and commercial queries
          </li>
          <li>
            <a href="mailto:security@matrix.org">security@matrix.org</a> to disclose security issues. Also see our <a href="https://matrix.org/security-disclosure-policy/">Security Disclosure Policy</a>
          </li>
        </ul>
        </MXContentMain>
  </Layout>
)

export default Contact
