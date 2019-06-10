import React from 'react'

const navTypes = []
navTypes["blog"] = (
<div class="mxnavsection">
  <a href="/blog/archive" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_world.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">All posts</div>
  </a>
  <a href="/blog/category/this-week-in-matrix" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_elaboration_calendar_star.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">This week in Matrix</div>
  </a>
  <a href="/blog/category/security" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_lock.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Security</div>
  </a>
  <a href="/blog/feed" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_rss.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">RSS Feed</div>
  </a>
</div>
)
navTypes["develop"] = (
<div class="mxnavsection">
  <a href="/docs/guides" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_spread_text.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Docs</div>
  </a>
  <a href="/docs/spec" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_pencil_ruler.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Spec</div>
  </a>
  <a href="https://matrix.org/docs/api/client-server/" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_cards_hearts.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">API Playground</div>
  </a>
  <a href="https://matrix.org/code" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_settings.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Code</div>
  </a>
</div>)
navTypes["discover"] = (
<div class="mxnavsection">
  <a href="/docs/projects/try-matrix-now" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_elaboration_message_happy.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Try Matrix</div>
  </a>
  <a href="/docs/projects/clients-matrix" class="mxnavsection__item w-inline-block">
    <img src="/images/software_layout_header_sideleft.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Cients</div>
  </a>
  <a href="/docs/projects/bots" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_calculator.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Bots</div>
  </a>
  <a href="/docs/projects/sdks" class="mxnavsection__item w-inline-block">
    <img src="/images/software_layers2.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">SDKs</div>
  </a>
  <a href="/docs/projects/servers" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_server.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Servers</div>
  </a>
  <a href="/docs/projects/hosting" class="mxnavsection__item w-inline-block">
    <img src="/images/basic_cloud.svg" alt="" class="mxnavsection__icon" />
    <div class="mxnavsection__text">Hosting</div>
  </a>
</div>)

const Navigation = (navmode) => (
  <nav>
    <div data-collapse="medium" data-animation="default" data-duration="400" class="mxnavbar w-nav">
      <div class="mxnavbar__container w-container">
        <a href="index.html" class="mxnavbar__brand w-nav-brand">
<img src="/images/matrix-logo.svg" alt="" className="mxnavbar__logo" />
</a>
        <nav role="navigation" class="mxnavbar__navmenu w-nav-menu">
          <a href="/docs/projects/try-matrix-now" class={"mxnavbar__navlink w-nav-link " + (navmode.navmode === "discover" ? "w--current":"")}>Discover</a>
          <a href="/docs/guides" class={"mxnavbar__navlink w-nav-link " + (navmode.navmode === "develop" ? "w--current":"")}>Develop</a>
          <a href="/blog/posts" class={"mxnavbar__navlink w-nav-link " + (navmode.navmode === "blog" ? "w--current":"")}>Blog</a>
          <a href="/docs/guides/faq" class="mxnavbar__navlink w-nav-link">FAQs</a>
          <a href="/try-now" class="mxnavbar__navlink mxnavbar__navlink--try w-nav-link">Try Now</a>
          <a href="/try-now" class="mxnavbar__navlink mxnavbar__navlink--primary w-nav-link">Try Now</a>
        </nav>
        <div class="mxnavbar__menubutton w-nav-button">
          <div class="mxnavbar__icon w-icon-nav-menu">
</div>
        </div>
      </div>
    </div>
    {navTypes[navmode.navmode]}
    
  </nav>

)

export default Navigation
