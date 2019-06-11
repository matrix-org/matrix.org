import React from 'react'

const Footer = () => (
  <div className="mxfooter">
  <div className="mxfooter__container">
    <div className="mxfooter__column">
        <a href="/docs/projects/try-matrix-now" className="mxfooter__link mxfooter__link--primary">Discover</a>
        <a href="/docs/projects/try-matrix-now" className="mxfooter__link">Try Matrix</a>
        <a href="/docs/projects/clients-matrix" className="mxfooter__link">Clients</a>
        <a href="/docs/projects/bots" className="mxfooter__link">Bots</a>
        <a href="/docs/projects/sdks" className="mxfooter__link">SDKs</a>
        <a href="/docs/projects/hosting" className="mxfooter__link">Hosting</a>
      </div>
      <div className="mxfooter__column">
        <a href="/docs/guides" className="mxfooter__link mxfooter__link--primary">Guides</a>
        <a href="/docs/guides/getting-involved" className="mxfooter__link">Getting Started</a>
        <a href="/docs/guides" className="mxfooter__link">Client-Server API</a>
        <a href="/docs/guides/installing-synapse" className="mxfooter__link">Install Synapse</a>
        <a href="/docs/guides/types-of-bridging" className="mxfooter__link">Bridges</a>
        <a href="/docs/guides" className="mxfooter__link">All guides</a>
      </div>
      <div className="mxfooter__column">
        <a href="/docs/guides" className="mxfooter__link mxfooter__link--primary">Develop</a>
        <a href="/docs/" className="mxfooter__link">Docs</a>
        <a href="/docs/spec" className="mxfooter__link">Spec</a>
        <a href="https://matrix.org/docs/api/client-server/" className="mxfooter__link">API Playground</a>
        <a href="https://matrix.org/code" className="mxfooter__link">Code</a>
      </div>
      <div className="mxfooter__column">
        <a href="/blog" className="mxfooter__link mxfooter__link--primary">Blog</a>
        <a href="/blog/archive" className="mxfooter__link">All posts</a>
        <a href="/blog/category/this-week-in-matrix" className="mxfooter__link">This week in Matrix</a>
        <a href="/blog/category/security" className="mxfooter__link">Security</a>
        <a href="/blog/feed" className="mxfooter__link">RSS</a>
      </div>
      <div className="mxfooter__column">
        <a href="/" className="mxfooter__link mxfooter__link--primary">More</a>
        <a href="/faq" className="mxfooter__link">FAQs</a>
        <a href="/security-disclosure-policy/" className="mxfooter__link">Security</a>
        <a href="/legal" className="mxfooter__link">Legal</a>
      </div>
    </div>
    <div className="mxfooter__container mxfooter__container--heel">
      <div className="mxfooter__iconwrapper">
        <a href="https://matrix.org/code" className="w-inline-block">
          <img src="/images/github.svg" alt="" className="mxfooter__icon" />
        </a>
        <a href="https://gitlab.com/" className="w-inline-block">
          <img src="/images/gitlab.svg" alt="" className="mxfooter__icon" />
        </a>
        <a href="https://youtube.com/" className="w-inline-block">
          <img src="/images/youtube.svg" alt="" className="mxfooter__icon" />
        </a>
        <a href="https://twitter.com/matrixdotorg" className="w-inline-block">
          <img src="/images/twitter.svg" alt="" className="mxfooter__icon" />
        </a>
      </div>
      <p className="mxfooter__text">© 2019 The Matrix.org Foundation C.I.C.</p>
    </div>
  </div>

)

export default Footer
