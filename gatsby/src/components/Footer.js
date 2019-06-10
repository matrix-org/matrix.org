import React from 'react'

const Footer = () => (
  <div class="mxfooter">
  <div class="mxfooter__container">
    <div class="mxfooter__column">
        <a href="/docs/projects/try-matrix-now" class="mxfooter__link mxfooter__link--primary">Discover</a>
        <a href="/docs/projects/try-matrix-now" class="mxfooter__link">Try Matrix</a>
        <a href="/docs/projects/clients-matrix" class="mxfooter__link">Clients</a>
        <a href="/docs/projects/bots" class="mxfooter__link">Bots</a>
        <a href="/docs/projects/sdks" class="mxfooter__link">SDKs</a>
        <a href="/docs/projects/servers" class="mxfooter__link">Servers</a>
        <a href="/docs/projects/hosting" class="mxfooter__link">Hosting</a>
      </div>
      <div class="mxfooter__column">
        <a href="/docs/guides" class="mxfooter__link mxfooter__link--primary">Guides</a>
        <a href="/docs/guides/getting-started" class="mxfooter__link">Getting Started</a>
        <a href="/docs/guides" class="mxfooter__link">Client-Server API</a>
        <a href="/docs/guides/installing-synapse" class="mxfooter__link">Install Synapse</a>
        <a href="/docs/guides" class="mxfooter__link">Bridges</a>
        <a href="/docs/guides" class="mxfooter__link">All guides</a>
      </div>
      <div class="mxfooter__column">
        <a href="/docs/guides" class="mxfooter__link mxfooter__link--primary">Develop</a>
        <a href="docs-example.html" class="mxfooter__link">Docs</a>
        <a href="/docs/spec" class="mxfooter__link">Spec</a>
        <a href="/docs/" class="mxfooter__link">API Playground</a>
        <a href="/code" class="mxfooter__link">Code</a>
      </div>
      <div class="mxfooter__column">
        <a href="/blog" class="mxfooter__link mxfooter__link--primary">Blog</a>
        <a href="/blog/archive" class="mxfooter__link">All posts</a>
        <a href="/blog/categories/this-week-in-matrix" class="mxfooter__link">This week in Matrix</a>
        <a href="/blog/categories/security" class="mxfooter__link">Security</a>
        <a href="/blog/feed" class="mxfooter__link">RSS</a>
      </div>
      <div class="mxfooter__column">
        <a href="/" class="mxfooter__link mxfooter__link--primary">More</a>
        <a href="/docs/guides/faq" class="mxfooter__link">FAQs</a>
        <a href="/security" class="mxfooter__link">Security</a>
        <a href="/legal" class="mxfooter__link">Legal</a>
      </div>
    </div>
    <div class="mxfooter__container mxfooter__container--heel">
      <div class="mxfooter__iconwrapper">
        <a href="/code" class="w-inline-block">
          <img src="images/github.svg" alt="" class="mxfooter__icon" />
        </a>
        <a href="https://gitlab.com/" class="w-inline-block">
          <img src="images/gitlab.svg" alt="" class="mxfooter__icon" />
        </a>
        <a href="https://youtube.com/" class="w-inline-block">
          <img src="images/youtube.svg" alt="" class="mxfooter__icon" />
        </a>
        <a href="https://twitter.com/matrixdotorg" class="w-inline-block">
          <img src="images/twitter.svg" alt="" class="mxfooter__icon" />
        </a>
      </div>
      <p class="mxfooter__text">© 2019 The Matrix.org Foundation C.I.C.</p>
    </div>
  </div>

)

export default Footer
