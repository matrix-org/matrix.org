/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain} from '../components'

import config from '../../config'



const Foundation = () => {
    return (<Layout hasNavPadding="true">
            <Helmet title={`Legal | ${config.siteTitle}`} />
            <MXContentMain>
            <div class="mxblock mxblock--foundation">
          <h1 class="mxblock--foundation__hx">The Matrix.org Foundation</h1>
          <p class="mxblock--foundation__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
          <p class="mxblock--foundation__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
        </div>
        <div class="mxblock mxblock--foundation">
          <h1 class="mxblock--foundation__hx">The Guardians</h1>
          <div class="mxgrid mxgrid--guardians">
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian">
                <div class="mxgrid__item--guardian__bg__img"></div>
                <div class="mxgrid__item--guardian__content">
                  <h2 class="mxgrid__item--guardian__content__hx">Amandine Le Pape</h2>
                  <p class="mxgrid__item--guardian__content__p">Brooklyn coloring book af authentic banh mi cliche pop-up. Mustache chicharrones bespoke shoreditch tacos, woke marfa chartreuse yr. </p>
                  <p class="mxgrid__item--guardian__content__p">Chia everyday carry beard, fixie tilde mlkshk tumblr actually master cleanse kickstarter yuccie helvetica etsy. Chillwave everyday carry schlitz taiyaki readymade, shabby chic tumeric.</p>
                </div>
              </div>
            </div>
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian mxgrid__item__bg--guardian--invert">
                <div class="mxgrid__item--guardian__bg__img"></div>
                <div class="mxgrid__item--guardian__content mxgrid__item--guardian__content--invert">
                  <h2 class="mxgrid__item--guardian__content__hx">Matthew Hodgson</h2>
                  <p class="mxgrid__item--guardian__content__p">Artisan skateboard banjo portland af shaman chicharrones locavore put a bird on it pork belly. Scenester iPhone hashtag tumblr selvage.</p>
                  <p class="mxgrid__item--guardian__content__p">Fashion axe iceland copper mug master cleanse slow-carb sartorial, tofu gentrify. Plaid af fanny pack, vinyl single-origin coffee photo booth occupy chambray mixtape whatever taiyaki tilde coloring book gastropub.</p>
                </div>
              </div>
            </div>
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian">
                <div class="mxgrid__item--guardian__bg__img"></div>
                <div class="mxgrid__item--guardian__content">
                  <h2 class="mxgrid__item--guardian__content__hx">Amandine Le Pape</h2>
                  <p class="mxgrid__item--guardian__content__p">Brooklyn coloring book af authentic banh mi cliche pop-up. Mustache chicharrones bespoke shoreditch tacos, woke marfa chartreuse yr. </p>
                  <p class="mxgrid__item--guardian__content__p">Chia everyday carry beard, fixie tilde mlkshk tumblr actually master cleanse kickstarter yuccie helvetica etsy. Chillwave everyday carry schlitz taiyaki readymade, shabby chic tumeric.</p>
                </div>
              </div>
            </div>
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian mxgrid__item__bg--guardian--invert">
                <div class="mxgrid__item--guardian__bg__img"></div>
                <div class="mxgrid__item--guardian__content mxgrid__item--guardian__content--invert">
                  <h2 class="mxgrid__item--guardian__content__hx">Matthew Hodgson</h2>
                  <p class="mxgrid__item--guardian__content__p">Artisan skateboard banjo portland af shaman chicharrones locavore put a bird on it pork belly. Scenester iPhone hashtag tumblr selvage.</p>
                  <p class="mxgrid__item--guardian__content__p">Fashion axe iceland copper mug master cleanse slow-carb sartorial, tofu gentrify. Plaid af fanny pack, vinyl single-origin coffee photo booth occupy chambray mixtape whatever taiyaki tilde coloring book gastropub.</p>
                </div>
              </div>
            </div>
            <div class="mxgrid__item100">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian">
                <div class="mxgrid__item--guardian__bg__img"></div>
                <div class="mxgrid__item--guardian__content">
                  <h2 class="mxgrid__item--guardian__content__hx">Amandine Le Pape</h2>
                  <p class="mxgrid__item--guardian__content__p">Brooklyn coloring book af authentic banh mi cliche pop-up. Mustache chicharrones bespoke shoreditch tacos, woke marfa chartreuse yr. </p>
                  <p class="mxgrid__item--guardian__content__p">Chia everyday carry beard, fixie tilde mlkshk tumblr actually master cleanse kickstarter yuccie helvetica etsy. Chillwave everyday carry schlitz taiyaki readymade, shabby chic tumeric.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
            </MXContentMain>
    </Layout>)
}

export default Foundation
