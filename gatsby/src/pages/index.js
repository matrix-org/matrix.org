/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, Footer} from '../components'

import Navigation from '../components/Navigation'

import config from '../../config'

import { ThemeProvider } from 'styled-components'
import theme from '../../config/theme'


const Index = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
            <div data-collapse="medium" data-animation="default" data-duration="400" class="mxnavbar w-nav">
    <div class="mxnavbar__container w-container">
<a href="index.html" class="mxnavbar__brand w-nav-brand w--current">
<img src="images/matrix-logo.svg" alt="" class="mxnavbar__logo" />
</a>
      <nav role="navigation" class="mxnavbar__navmenu w-nav-menu">
<a href="discover.html" class="mxnavbar__navlink w-nav-link">Discover</a>
<a href="develop.html" class="mxnavbar__navlink w-nav-link">Docs</a>
<a href="blog.html" class="mxnavbar__navlink w-nav-link">Blog</a>
<a href="faqs.html" class="mxnavbar__navlink w-nav-link">FAQ&#x27;s</a>
<a href="try-now.html" class="mxnavbar__navlink mxnavbar__navlink--try w-nav-link">Try Now</a>
<a href="try-now.html" class="mxnavbar__navlink mxnavbar__navlink--primary w-nav-link">Try Now</a>
</nav>
      <div class="mxnavbar__menubutton w-nav-button">
        <div class="mxnavbar__icon w-icon-nav-menu">
</div>
      </div>
    </div>
  </div>
  <div class="mxherobackground">
    <div class="mxherobackground__img">
</div>
    <div class="mxcontent mxcontent--home_hero">
      <div class="mxcontent__main delete">
        <div class="mxblock mxblock--hero">
<img src="images/matrix-logo-white.svg" alt="" class="mxblock--hero__logo" />
          <h1 class="mxblock--hero__hx delete">An open network for secure, decentralized communication</h1>
<a href="#" class="mxblock__btn mxblock--hero__btn mxblock--hero__btn--mctesto w-button">Get started</a>
</div>
      </div>
    </div>
  </div>
  <div class="mxcontentwrapper mxcontentwrapper--navpadding">
    <div class="mxcontent">
      <div class="mxcontent__main">
        <div class="mxblock mxblock--hero mxblock--hidden">
<img src="images/matrix-logo.svg" alt="" class="mxblock--hero__logo" />
          <h1 class="mxblock--hero__hx">An open network for secure, decentralized communication</h1>
<a href="#" class="mxblock__btn mxblock--hero__btn w-button">Get started</a>
</div>
        <div class="mxblock">
          <h2 class="mxblock__hx">A common language for communication</h2>
          <p class="mxp">Imagine a world..</p>
          <div class="mxgrid">
            <div class="mxgrid__item50">
              <div class="mxgrid__item__bg">
<img src="images/basic_elaboration_message_happy.svg" alt="" class="mxgrid__item__bg__img" />
                <h4 class="mxgrid__item__bg__hx">Messaging</h4>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p">Matrix gives you simple HTTP APIs and SDKs (iOS, Android, Web) to add Matrix-enabled chatrooms and direct chats directly into existing apps, complete with end-to-end encryption, emoji, file transfer and more.<br />
<br />Optionally interoperate with other Matrix apps, letting your users reach every other user in the global Matrix ecosystem.<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Learn more</a>
</div>
            </div>
            <div class="mxgrid__item50">
              <div class="mxgrid__item__bg">
<img src="images/basic_lock.svg" alt="" class="mxgrid__item__bg__img" />
                <h4 class="mxgrid__item__bg__hx">Encryption</h4>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p">IoT fragmentation is extremely problematic.<br />
<br />By building bridges to as many IoT silos as possible, data can be securely published on the Matrix network. IoT solutions built on Matrix are unified, rather than integrating separately with vendors, and can even publish or consume Matrix data directly from devices.<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Learn more</a>
</div>
            </div>
            <div class="mxgrid__item50">
              <div class="mxgrid__item__bg">
<img src="images/music_microphone_old.svg" alt="" class="mxgrid__item__bg__img" />
                <h4 class="mxgrid__item__bg__hx">VoIP</h4>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p">With the advent of WebRTC, developers gained the ability to exchange high quality voice and video calls – but no way to actually route the calls.<br />
<br />Matrix is the missing signalling layer for WebRTC. If you are building VoIP into your app, or want to expose your existing VoIP app to a wider audience, building on Matrix’s SDKs and bridges should be a no-brainer.<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Learn more</a>
</div>
            </div>
            <div class="mxgrid__item50">
              <div class="mxgrid__item__bg">
<img src="images/music_repeat_button.svg" alt="" class="mxgrid__item__bg__img" />
                <h4 class="mxgrid__item__bg__hx">Bridging</h4>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p">Matrix’s simple HTTP APIs, SDKs, or existing bot frameworks (go-neb or py-neb) mean you can implement against a single open standard interface.<br />
<br />Bots built for Matrix also instantly expose the bot to every messaging platform (IRC, Slack, Gitter, XMPP etc.) bridged via Matrix, letting you concentrate on the important bit: the bot itself.<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Learn more</a>
</div>
            </div>
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg">
                <h4 class="mxgrid__item__bg__hx">More</h4>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p">Matrix’s simple HTTP APIs, SDKs, or existing bot frameworks (go-neb or py-neb) mean you can implement against a single open standard interface.<br />
<br />Bots built for Matrix also instantly expose the bot to every messaging platform (IRC, Slack, Gitter, XMPP etc.) bridged via Matrix, letting you concentrate on the important bit: the bot itself.<br />
</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mxblock">
          <h2 class="mxblock__hx">How does it work?</h2>
          <p class="mxp">This is decentralisation and data sovereignty and this is what it looks like...</p>
          <div class="mxblock__how">
            <div>
<img src="images/how.png" srcset="images/how-p-500.png 500w, images/how-p-800.png 800w, images/how-p-1080.png 1080w, images/how.png 1328w" sizes="(max-width: 479px) 96vw, (max-width: 767px) 97vw, (max-width: 991px) 96vw, 56vw" alt="" class="mxblock__how__img__temp" />
</div>
            <div class="mxblock__how__temp">
              <p>Here are three Matrix home servers, each with one client connected.</p>
              <p>The clients are all participating in the same Matrix room, which is synchronised across the three participating servers.</p>
<a href="#" class="mxblock__btn w-button">Next</a>
</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mxblock mxblock--open_standard">
    <h2 class="mxblock__hx mxblock__hx--open_standard">An Open Standard</h2>
    <div class="mxgrid mxgrid--open_standard">
      <div class="mxgrid__item33">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_signs.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Simple pragmatic<a href="http://matrix.org/docs/api"> RESTful HTTP/JSON APIs</a>
</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_spread_text.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">
<a href="http://matrix.org/docs/spec">Open specification</a> of the Matrix standard</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_share.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Fully distributed conversations with no single points of control or failure</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_lock.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Send and receive extensible messages with optional end-to-end encryption</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/music_microphone_old.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">WebRTC VoIP/Video calling using Matrix signalling</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/arrows_rotate.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Real-time synchronised history and state across all clients</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_mail_open_text.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Integrates with existing 3rd party ID&#x27;s to authenticate and discover users</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_server_cloud.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Trusted federation of identity servers, tracking public keys and 3rd party ID mappings</h4>
          </div>
        </div>
      </div>
      <div class="mxgrid__item33 mxgrid__item33--bullet">
        <div class="mxgrid__item__bg mxgrid__item__bg--clear">
<img src="images/basic_elaboration_message_happy.svg" alt="" class="mxgrid__item__bg__img" />
          <div class="mxgrid__item__bg__vert">
            <h4 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--open_standard">Group conversation &amp; TLS by default</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mxcontentwrapper mxcontentwrapper--navpadding">
    <div class="mxcontent">
      <div class="mxcontent__main">
        <div class="mxblock">
          <h2 class="mxblock__hx">Latest News</h2>
          <div class="mxgrid mxgrid--news">
            <div class="mxgrid__item50 mxgrid__item50--news">
              <div class="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p class="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
            <div class="mxgrid__item50 mxgrid__item50--news">
              <div class="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p class="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
            <div class="mxgrid__item50 mxgrid__item50--news">
              <div class="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p class="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
            <div class="mxgrid__item50 mxgrid__item50--news">
              <div class="mxgrid__item__bg mxgrid__item__bg--news">
                <h3 class="mxgrid__item__bg__hx mxgrid__item__bg__hx--news">Security Incident</h3>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p mxgrid__item__bg__p--byline">2019-05-10 by Matthew Hodgson<br />
</p>
                  <p class="mxgrid__item__bg__p">Excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post, excerpt of blog post<br />
</p>
                </div>
<a href="#" class="mxgrid__item__bg__btn w-button">Read more</a>
</div>
            </div>
          </div>
<a href="#" class="mxgrid__item__bg__btn w-button">View all posts</a>
</div>
        <div class="mxblock">
          <h2 class="mxblock__hx">Explore Matrix</h2>
          <div class="mxblock__explore">
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/basic_elaboration_message_happy.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">Try Matrix</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/software_layout_header_sideleft.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">Cients</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/basic_calculator.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">Bots</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/software_layers2.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">SDK&#x27;s</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/basic_server.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">Servers</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/basic_cloud.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">Hosting</div>
</a>
</div>
        </div>
        <div class="mxblock">
          <h2 class="mxblock__hx">SDK&#x27;s</h2>
          <p>Native SDK&#x27;s for multiple platforms, including:</p>
          <div class="mxblock__explore">
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/python.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">Python</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/js.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">JavaScript</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/android.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">Android</div>
</a>
<a href="http://www.google.com" class="mxblock__explore__item w-inline-block">
<img src="images/iOS.svg" alt="" class="mxblock__explore__item__img" />
<div class="mxblock__explore__item__p">iOS</div>
</a>
</div>
<a href="#" class="mxgrid__item__bg__btn w-button">View all SDK&#x27;s</a>
</div>
        <div class="mxblock">
          <div class="mxgrid">
            <div class="mxgrid__item50">
              <div class="mxgrid__item__bg">
                <h2 class="mxblock__hx">Open Source</h2>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxgrid__item__bg__p">Join thousands of other developers in our open source repositories, including:<br />
</p>
                  <div class="mxblock__gh">
                    <div class="mxblock__github mxblock__github--first">
                      <div class="mxblock__github__left">
                        <p class="paragraph">Synapse</p>
                      </div>
                      <div class="mxblock__github__right">
                        <div class="w-embed">
<a class="github-button" href="https://github.com/matrix-org/synapse" data-show-count="true" aria-label="Star matrix-org/synapse on GitHub">Star</a>
</div>
                      </div>
                    </div>
                    <div class="mxblock__github">
                      <div class="mxblock__github__left">
                        <p class="paragraph">JavaScript SDK</p>
                      </div>
                      <div class="mxblock__github__right">
                        <div class="w-embed">
<a class="github-button" href="https://github.com/matrix-org/matrix-js-sdk" data-show-count="true" aria-label="Star matrix-org/matrix-js-sdk on GitHub">Star</a>
</div>
                      </div>
                    </div>
                    <div class="mxblock__github">
                      <div class="mxblock__github__left">
                        <p class="paragraph">Android SDK</p>
                      </div>
                      <div class="mxblock__github__right">
                        <div class="w-embed">
<a class="github-button" href="https://github.com/matrix-org/matrix-android-sdk" data-show-count="true" aria-label="Star matrix-org/matrix-android-sdk on GitHub">Star</a>
</div>
                      </div>
                    </div>
                    <div class="mxblock__github">
                      <div class="mxblock__github__left">
                        <p class="paragraph">iOS SDK</p>
                      </div>
                      <div class="mxblock__github__right">
                        <div class="w-embed">
<a class="github-button" href="https://github.com/matrix-org/matrix-ios-sdk" data-show-count="true" aria-label="Star matrix-org/matrix-ios-sdk on GitHub">Star</a>
</div>
                      </div>
                    </div>
                  </div>
<a href="#" class="mxgrid__item__bg__btn w-button">View all on GitHub</a>
</div>
              </div>
            </div>
            <div class="mxgrid__item50">
              <div class="mxgrid__item__bg">
                <h2 class="mxblock__hx">The Matrix Foundation</h2>
                <div class="mxgrid__item__bg__vert">
                  <p class="mxp">Matrix.org is a non-profit initiative, currently being incorporated as a dedicated non-profit Matrix.org Foundation in the UK.<br />
</p>
                  <p class="mxp">It acts as a neutral guardian of the Matrix spec, nurturing and growing Matrix for the benefit of the whole ecosystem.<br />
</p>
                  <p>The board of Matrix.org Foundation will be made up of key participants in the Matrix community as well as independent advisors from the wider internet and telco industries.<br />
</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mxblock mxblock--tweetstitle">
    <h2 class="mxblock__hx">What people are saying</h2>
  </div>
  <div class="mxblock mxblock--tweets">
    <div class="mxgrid mxgrid--tweets">
      <div class="mxgrid__tweet w-embed w-script">
        <blockquote class="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">If you&#39;ve been looking for an OSS end-to-end encrypted alternative to Slack, <a href="https://twitter.com/RiotChat?ref_src=twsrc%5Etfw">@RiotChat</a> is probably your best bet: <a href="https://t.co/U5My74tLvn">https://t.co/U5My74tLvn</a>
</p>&mdash; Tony Arcieri (@bascule) <a href="https://twitter.com/bascule/status/803680470386884608?ref_src=twsrc%5Etfw">November 29, 2016</a>
</blockquote>
        <script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>
      </div>
      <div class="mxgrid__tweet w-embed w-script">
        <blockquote class="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">
<a href="https://t.co/T4Qd3riZF6">https://t.co/T4Qd3riZF6</a> + riot.im have released some awesome updates, and are now officially the perfect internet messaging service.</p>&mdash; Stuart Mumford (@StuartMumford) <a href="https://twitter.com/StuartMumford/status/782239349660352513?ref_src=twsrc%5Etfw">October 1, 2016</a>
</blockquote>
        <script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>
      </div>
      <div class="mxgrid__tweet w-embed w-script">
        <blockquote class="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">Slack no more. Why you should use Riot.im and <a href="https://t.co/kbin25KiP5">https://t.co/kbin25KiP5</a>: <a href="https://t.co/0mGuSIERPK">https://t.co/0mGuSIERPK</a>
</p>&mdash; Paul Lindner (@lindner) <a href="https://twitter.com/lindner/status/778007907660996609?ref_src=twsrc%5Etfw">September 19, 2016</a>
</blockquote>
        <script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>
      </div>
      <div class="mxgrid__tweet w-embed w-script">
        <blockquote class="twitter-tweet" data-lang="en">
          <p lang="en" dir="ltr">For years now people have been lamenting the walled garden trend, Twitter, Github, Slack, etc. That&#39;s not what this great web was built for.</p>&mdash; Arne Brasseur (@plexus) <a href="https://twitter.com/plexus/status/778234326446137344?ref_src=twsrc%5Etfw">September 20, 2016</a>
</blockquote>
        <script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8">
</script>
      </div>
    </div>
  </div>
  <div class="mxcontentwrapper">
    <div class="mxcontent">
      <div class="mxcontent__main">
        <div class="mxblock mxblock--sponsors">
          <div class="mxgrid">
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg">
                <h2 class="mxblock__hx">Support Matrix</h2>
                <p class="mxp">If you share our vision, or are building on top of Matrix, please consider donating...</p>
                <div class="mxgrid__support">
                  <div class="mxgrid__support__item">
                    <div class="mxgrid__item__bg__vert">
                      <h4>Patreon</h4>
                      <p class="mxgrid__support__item__p">Support us on Patreon. Support us on Patreon. Support us on Patreon. Support us on Patreon. </p>
                      <div class="mxgrid__item__bg__vert">
                        <div class="mxgrid__item__bg__vert__embed w-embed w-script">
<a href="https://www.patreon.com/bePatron?u=6269205" data-patreon-widget-type="become-patron-button">Become a Patron!</a>
                          <script async="" src="https://c6.patreon.com/becomePatronButton.bundle.js">
</script>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mxgrid__support__item">
                    <div class="mxgrid__item__bg__vert">
                      <h4>Liberapay</h4>
                      <p class="mxgrid__support__item__p">Support us on Liberapay. Support us on Liberapay. Support us on Liberapay. Support us on Liberapay.</p>
                      <div class="mxgrid__item__bg__vert">
                        <div class="mxgrid__item__bg__vert__embed w-embed w-script">
                          <script src="https://liberapay.com/matrixdotorg/widgets/receiving.js">
</script>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mxgrid__support__item">
                    <div class="mxgrid__item__bg__vert">
                      <h4>Cryptocurrency</h4>
                      <p class="mxgrid__support__item__p">Donate via Crypto. Donate via Crypto. Donate via Crypto. Donate via Crypto. Donate via Crypto. </p>
                      <div class="mxgrid__item__bg__vert">
                        <div class="mxgrid__item__bg__vert__embed w-embed w-script">
                          <script src="https://liberapay.com/matrixdotorg/widgets/receiving.js">
</script>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="mxp">If you share our vision, or are building on top of Matrix, please consider donating...</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mxblock">
          <div class="mxgrid">
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                <h2 class="mxblock__hx">Thank you to our incredible sponsors</h2>
                <div class="mxgrid__sponsors">
                  <div class="mxgrid__sponsors__item">
                    <div class="mxgrid__sponsors__logo">
<img src="images/status.svg" alt="" class="mxgrid__sponsors__item__logo__img" />
</div>
                    <div class="mxgrid__item__bg__vert">
                      <h4>Status</h4>
                      <p class="mxgrid__sponsors__item__p">A Mobile OS, Built for Ethereum.</p>
<a href="#">Learn more</a>
</div>
                  </div>
                  <div class="mxgrid__sponsors__item">
                    <div class="mxgrid__sponsors__logo">
<img src="images/upcloud.svg" alt="" class="mxgrid__sponsors__item__logo__img" />
</div>
                    <div class="mxgrid__item__bg__vert">
                      <h4>UpCloud</h4>
                      <p class="mxgrid__sponsors__item__p">Matrix.org is generously hosted by UpCloud! Host your homeserver via UpCloud and &amp; get a $25 credit.</p>
<a href="#">Learn more</a>
</div>
                  </div>
                  <div class="mxgrid__sponsors__item">
                    <div class="mxgrid__sponsors__logo">
<img src="images/pia.svg" alt="" class="mxgrid__sponsors__item__logo__img mxgrid__sponsors__item__logo__img--pia" />
</div>
                    <div class="mxgrid__item__bg__vert">
                      <h4>Private Internet Access</h4>
                      <p class="mxgrid__sponsors__item__p">Private Internet Access™ VPN Service encrypts your connection and provides you with an anonymous IP to protect your privacy. <br />
</p>
<a href="#">Learn more</a>
</div>
                  </div>
                  <div class="mxgrid__sponsors__item">
                    <div class="mxgrid__sponsors__logo">
<img src="images/inblockchain.png" alt="" class="mxgrid__sponsors__item__logo__img" />
</div>
                    <h4>InBlockchain</h4>
                    <p class="mxgrid__sponsors__item__p">INBlockchain is a full-service firm focusing on consulting, incubating and facilitating crowdsales for promising blockchain startups.<strong>
<br />
</strong>
</p>
<a href="#">Learn more</a>
</div>
                  <div class="mxgrid__sponsors__item">
                    <div class="mxgrid__sponsors__logo">
<img src="images/omisego.svg" alt="" class="mxgrid__sponsors__item__logo__img" />
</div>
                    <h4>Omisego</h4>
                    <p class="mxgrid__sponsors__item__p">OmiseGO is a public Ethereum-based financial technology for use in mainstream digital wallets.<strong>
<br />
</strong>
</p>
<a href="#">Learn more</a>
</div>
                  <div class="mxgrid__sponsors__item">
                    <div class="mxgrid__sponsors__logo">
<img src="images/tendermint.png" alt="" class="mxgrid__sponsors__item__logo__img" />
</div>
                    <h4>Tendermint</h4>
                    <p class="mxgrid__sponsors__item__p">Byzantine fault-tolerant replicated state machines in any programming language. <strong>
<br />
</strong>
</p>
<a href="#">Learn more</a>
</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mxfooter">
    <div class="mxfooter__container">
      <div class="mxfooter__column">
<a href="#" class="mxfooter__link mxfooter__link--primary">Discover</a>
<a href="#" class="mxfooter__link">Try Matrix</a>
<a href="#" class="mxfooter__link">Clients</a>
<a href="#" class="mxfooter__link">Bots</a>
<a href="#" class="mxfooter__link">SDK&#x27;s</a>
<a href="#" class="mxfooter__link">Servers</a>
<a href="#" class="mxfooter__link">Hosting</a>
</div>
      <div class="mxfooter__column">
<a href="#" class="mxfooter__link mxfooter__link--primary">Guides</a>
<a href="#" class="mxfooter__link">Getting Started</a>
<a href="#" class="mxfooter__link">Client-Server API</a>
<a href="#" class="mxfooter__link">Install Synapse</a>
<a href="#" class="mxfooter__link">Bridges</a>
<a href="#" class="mxfooter__link">All guides</a>
</div>
      <div class="mxfooter__column">
<a href="#" class="mxfooter__link mxfooter__link--primary">Develop</a>
<a href="docs-nav.html" class="mxfooter__link">Docs</a>
<a href="#" class="mxfooter__link">Spec</a>
<a href="#" class="mxfooter__link">API Playground</a>
<a href="#" class="mxfooter__link">Code</a>
</div>
      <div class="mxfooter__column">
<a href="#" class="mxfooter__link mxfooter__link--primary">Blog</a>
<a href="#" class="mxfooter__link">All posts</a>
<a href="#" class="mxfooter__link">This week in Matrix</a>
<a href="#" class="mxfooter__link">Security</a>
<a href="#" class="mxfooter__link">RSS</a>
</div>
      <div class="mxfooter__column">
<a href="#" class="mxfooter__link mxfooter__link--primary">More</a>
<a href="#" class="mxfooter__link">FAQ&#x27;s</a>
<a href="#" class="mxfooter__link">Security</a>
<a href="#" class="mxfooter__link">Legal</a>
</div>
    </div>
    <div class="mxfooter__container mxfooter__container--heel">
      <div class="mxfooter__iconwrapper">
<a href="#" class="w-inline-block">
<img src="images/github.svg" alt="" class="mxfooter__icon" />
</a>
<a href="#" class="w-inline-block">
<img src="images/gitlab.svg" alt="" class="mxfooter__icon" />
</a>
<a href="#" class="w-inline-block">
<img src="images/youtube.svg" alt="" class="mxfooter__icon" />
</a>
<a href="#" class="w-inline-block">
<img src="images/twitter.svg" alt="" class="mxfooter__icon" />
</a>
</div>
      <p class="mxfooter__text">© 2019 The Matrix.org Foundation</p>
    </div>
  </div> 
  </div>
    </ThemeProvider>)
}

export default Index
