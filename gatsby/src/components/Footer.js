import React from 'react'

const Footer = () => (
  <div className="mxfooter">
    <div className="mxfooter__container">
      <div className="mxfooter__column">
        <a href="/docs/projects/try-matrix-now" className="mxfooter__link mxfooter__link--primary">Discover</a>
        <a href="/docs/projects/try-matrix-now" className="mxfooter__link">Try Matrix</a>
        <a href="/clients/" className="mxfooter__link">Clients</a>
        <a href="/docs/projects/bots" className="mxfooter__link">Bots</a>
        <a href="/sdks/" className="mxfooter__link">SDKs</a>
        <a href="/hosting/" className="mxfooter__link">Hosting</a>
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
        <a href="/docs/develop" className="mxfooter__link mxfooter__link--primary">Develop Docs</a>
        <a href="/docs/spec" className="mxfooter__link">Spec</a>
        <a href="/docs/api/" className="mxfooter__link">API Playground</a>
        <a href="https://matrix.org/code" className="mxfooter__link">Code</a>
      </div>
      <div className="mxfooter__column">
        <a href="/blog" className="mxfooter__link mxfooter__link--primary">Blog</a>
        <a href="/blog/archive" className="mxfooter__link">All Posts</a>
        <a href="/blog/category/this-week-in-matrix" className="mxfooter__link">This Week In Matrix</a>
        <a href="/blog/category/security" className="mxfooter__link">Security</a>
        <a href="/blog/category/security/feed" className="mxfooter__link">Security RSS</a>
        <a href="/blog/feed" className="mxfooter__link">RSS</a>
      </div>
      <div className="mxfooter__column">
        <a href="/" className="mxfooter__link mxfooter__link--primary">More</a>
        <a href="/faq/" className="mxfooter__link">FAQs</a>
        <a href="/matrixlive/" className="mxfooter__link">Matrix Live</a>
        <a href="/security-disclosure-policy/" className="mxfooter__link">Security Disclosure Policy</a>
        <a href="/hall-of-fame/" className="mxfooter__link">Security Hall of Fame</a>
        <a href="/legal/code-of-conduct/" className="mxfooter__link">Code of Conduct for Matrix.org</a>
        <a href="/legal/" className="mxfooter__link">Legal</a>
        <a href="/contact/" className="mxfooter__link">Contact</a>
        <a href="https://github.com/matrix-org/matrix.org/" className="mxfooter__link">Site Source</a>

      </div>
    </div>
    <div className="mxfooter__container mxfooter__container--heel">
      <div className="mxfooter__iconwrapper">
        <a href="/code" className="w-inline-block">
          <img src="/images/github.svg" alt="" className="mxfooter__icon" />
        </a>
        <a href="https://gitlab.matrix.org/" className="w-inline-block">
          <img src="/images/gitlab.svg" alt="" className="mxfooter__icon" />
        </a>
        <a href="https://www.youtube.com/channel/UCVFkW-chclhuyYRbmmfwt6w" className="w-inline-block">
          <img src="/images/youtube.svg" alt="" className="mxfooter__icon" />
        </a>
        <a href="https://twitter.com/matrixdotorg" className="w-inline-block">
          <img src="/images/twitter.svg" alt="" className="mxfooter__icon" />
        </a>
        <a rel="me" href="https://mastodon.matrix.org/@matrix" className="w-inline-block">
          <img src="/images/mastodon.svg" alt="" className="mxfooter__icon" />
        </a>
      </div>
      <a href="/legal/copyright-notice" class="mxfooter__link">Copyright Notice</a>
    </div>
  </div>

)

export default Footer
