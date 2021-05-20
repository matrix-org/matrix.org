import React from 'react'

const navTypes = []
navTypes["blog"] = (
<div className="mxnavsection">
  <a href="/blog/archive" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_world.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">All Posts</div>
  </a>
  <a href="/blog/category/this-week-in-matrix" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_elaboration_calendar_star.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">This Week In Matrix</div>
  </a>
  <a href="/blog/category/security" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_lock.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Security</div>
  </a>
  <a href="/blog/categories" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_spread_text.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Categories</div>
  </a>
  <a target="_blank" href="/blog/feed" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_rss.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">RSS Feed</div>
  </a>
</div>
)
navTypes["develop"] = (
<div className="mxnavsection">
  <a href="/docs/develop" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_spread_text.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Docs</div>
  </a>
  <a href="https://matrix.org/docs/spec" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_pencil_ruler.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Spec</div>
  </a>
  <a href="https://matrix.org/docs/api/client-server/" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_cards_hearts.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">API Playground</div>
  </a>
  <a href="https://matrix.org/code" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_settings.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Code</div>
  </a>
</div>)
navTypes["discover"] = (
<div className="mxnavsection">
  <a href="/discover/" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_world.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Discover</div>
  </a>
  <a href="/docs/guides" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_spread_text.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Guides</div>
  </a>
  <a href="/docs/projects/try-matrix-now" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_elaboration_message_happy.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Try Matrix</div>
  </a>
  <a href="/clients/" className="mxnavsection__item w-inline-block">
    <img src="/images/software_layout_header_sideleft.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Clients</div>
  </a>
  <a href="/bots/" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_calculator.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Bots</div>
  </a>
  <a href="/sdks/" className="mxnavsection__item w-inline-block">
    <img src="/images/software_layers2.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">SDKs</div>
  </a>
  <a href="/bridges/" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_share.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Bridges</div>
  </a>
  <a href="/hosting/" className="mxnavsection__item w-inline-block">
    <img src="/images/basic_cloud.svg" alt="" className="mxnavsection__icon" />
    <div className="mxnavsection__text">Hosting</div>
  </a>
</div>)

const Navigation = (navmode) => (
  <nav>
    <div data-collapse="medium" data-animation="default" data-duration="400" className="mxnavbar w-nav">
      <div className="mxnavbar__container w-container">
        <a href="/" className="mxnavbar__brand w-nav-brand">
<img src="/images/matrix-logo.svg" alt="" className="mxnavbar__logo" />
</a>
        <nav role="navigation" className="mxnavbar__navmenu w-nav-menu">
          <a href="/discover/" className={"mxnavbar__navlink w-nav-link " + (navmode.navmode === "discover" ? "w--current":"")}>Discover</a>
          <a href="/docs/develop" className={"mxnavbar__navlink w-nav-link " + (navmode.navmode === "develop" ? "w--current":"")}>Develop</a>
          <a href="/foundation/" className="mxnavbar__navlink w-nav-link ">Foundation</a>
          <a href="/blog/posts" className={"mxnavbar__navlink w-nav-link " + (navmode.navmode === "blog" ? "w--current":"")}>Blog</a>
          <a href="/faq/" className="mxnavbar__navlink w-nav-link">FAQs</a>
          <a href="/matrixlive/" className="mxnavbar__navlink w-nav-link">Matrix Live</a>
          <a href="https://shop.matrix.org" className={"mxnavbar__navlink w-nav-link "}>Shop</a>
          <a href="https://element.io/get-started" className="mxnavbar__navlink mxnavbar__navlink--try w-nav-link">Try Now</a>
          <a href="https://element.io/get-started" className="mxnavbar__navlink mxnavbar__navlink--primary w-nav-link">Try Now</a>
        </nav>
        <div className="mxnavbar__menubutton w-nav-button">
          <div className="mxnavbar__icon w-icon-nav-menu">
</div>
        </div>
      </div>
    </div>
    {navTypes[navmode.navmode]}
    
  </nav>

)

export default Navigation
