/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain, MXTryMatrixNowSection } from '../../../components'
import config from '../../../../config'

const TryMatrixNow = ({data}) => {
    const projects = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories);

    const clients = projects.filter(project => project.frontmatter.categories[0] === "client")
    const servers = projects.filter(project => project.frontmatter.categories[0] === "server")
    const applicationServices = projects.filter(project => project.frontmatter.categories[0] === "as")
    const sdks = projects.filter(project => project.frontmatter.categories[0] === "sdk")
    const bots = projects.filter(project => project.frontmatter.categories[0] === "bot")
    const bridges = projects.filter(project => project.frontmatter.categories[0] === "bridge")
    const others = projects.filter(project => project.frontmatter.categories[0] === "other")

    const languages = Array.from(new Set( projects.map(project => project.frontmatter.language) ))
        .sort()
        .filter(l => l !== null)

    const licenses = Array.from(new Set( projects.map(project => project.frontmatter.license) ))
        .sort()
        .filter(l => l !== null)
    
    return (<Layout navmode="discover">
        <MXContentMain>
            <Helmet title={`Try Matrix Now | ${config.siteTitle}`} />
            <h1>Try Matrix Now</h1>
            <p>To get started using Matrix, pick a client and join <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a>. You can also check the <a href="https://matrix.org/docs/projects/clients-matrix">Matrix Clients Matrix</a> to see more detail.</p>
        <div class="mxblock">
          <div class="mxgrid mxgrid--discover">
            <div class="mxgrid_item33">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 class="mxgrid__item__bg__hx">
                    <a href="/docs/projects/client/riot">Riot</a>
                </h4>
                <p class="mxgrid__item__bg__p">If you like glossy and feature-rich web clients, try Riot. Available <a href="./client/riot.html">on the web</a> and as a <a href="https://riot.im/desktop.html">desktop client</a>.</p>
                <div class="mxgrid__item__bg__vert">
                    <img src="/docs/projects/images/riot-web-featured.png" alt="" class="mxgrid__item__bg__img" />
                </div>
              </div>
            </div>
            <div class="mxgrid_item33">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 class="mxgrid__item__bg__hx">Riot for Android and iOS</h4>
                <p class="mxgrid__item__bg__p"> Riot is available on <a href="/docs/projects/client/riot-android">Android</a> and <a href="/docs/projects/client/riot-ios">iOS</a></p>
                <div class="mxgrid__item__bg__vert">
                    <img src="/docs/projects/images/vector-android-featured.png" alt="" class="mxgrid__item__bg__img"/>
                </div>
              </div>
            </div>
            <div class="mxgrid_item33">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 class="mxgrid__item__bg__hx">
                    <a href="/docs/projects/client/weechat-matrix">Weechat/Matrix</a></h4>
                <p class="mxgrid__item__bg__p"> If you like command line clients, try this Weechat Matrix protocol script written in python </p>
                <div class="mxgrid__item__bg__vert"><img src="https://raw.githubusercontent.com/benparsons/matrix-notes/master/twim/weechat-matrix.png" alt="" class="mxgrid__item__bg__img"/></div>
              </div>
            </div>
            <div class="mxgrid_item33">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 class="mxgrid__item__bg__hx">
                <a href="/docs/projects/client/quaternion">Quaternion</a></h4>
                <p class="mxgrid__item__bg__p">A cross-platform desktop client based on Qt5/QML.</p>
                <div class="mxgrid__item__bg__vert"><img src="https://raw.githubusercontent.com/QMatrixClient/Quaternion/master/quaternion.png" alt="" class="mxgrid__item__bg__img"/></div>
              </div>
            </div>
            <div class="mxgrid_item33">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 class="mxgrid__item__bg__hx">
                <a href="/docs/projects/client/nheko-reborn">Nheko</a></h4>
                <p class="mxgrid__item__bg__p">Nheko is a glossy native desktop app for Matrix, based on Qt5.</p>
                <div class="mxgrid__item__bg__vert"><img src="/docs/projects/images/nheko_thumb.png" alt="" class="mxgrid__item__bg__img"/></div>
              </div>
            </div>
            <div class="mxgrid_item33">
              <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 class="mxgrid__item__bg__hx">
                <a href="/docs/projects/client/fractal">Fractal</a></h4>
                <p class="mxgrid__item__bg__p"> If you're looking for a client for GNOME, try Fractal.</p>
                <div class="mxgrid__item__bg__vert"><img src="/docs/projects/images/fractal-featured.png" alt="" class="mxgrid__item__bg__img"/></div>
              </div>
            </div>
          </div>
        </div>
            <h2>Let's go deeper</h2>
            <p>Matrix is a whole ecosystem of matrix-enabled clients, servers, gateways, application services, bots, etc. If you’d like to learn more, this page aims to collect all known Matrix projects. To add a new one (or update an existing one), you can submit a PR to the <a href="https://github.com/matrix-org/matrix.org">matrix.org</a> project on github - the existing projects can be found <a href="https://github.com/matrix-org/matrix.org/tree/master/jekyll/_posts/projects">here</a> - or just let us know in the #matrix:matrix.org room.<br /></p>
            <div class="mxblock">
            <div class="mxgrid mxgrid--discover">
                <div class="mxgrid__item20">
                    <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                        <h4 class="mxgrid__item__bg__hx">Project type</h4>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-client" />
                            <label htmlFor="chk-type-client"> Clients</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-server" />
                            <label htmlFor="chk-type-client"> Servers</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-as" />
                            <label htmlFor="chk-type-client"> Application Services</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-sdk" />
                            <label htmlFor="chk-type-client"> Client SDKs</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-bot" />
                            <label htmlFor="chk-type-client"> Bots</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-bridge" />
                            <label htmlFor="chk-type-client"> Bridges</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-other" />
                            <label htmlFor="chk-type-client"> Other</label>
                        </p>
                    </div>
                </div>
                <div class="mxgrid__item20">
                    <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                        <h4 class="mxgrid__item__bg__hx">Maturity</h4>
                        {
                            ["Released","Stable","Late Beta","Beta","Early Beta",
                            "Late Alpha","Alpha","Early Alpha","No longer maintained"].map(function(maturity) {
                                const id = "chk-maturity-" + maturity.replace(/ /g, '')
                                return (
                                    <p key={id} class="mxgrid__item__bg__p">
                                        <input type="checkbox" id={id} name={id} />
                                        <label htmlFor={id}> {maturity}</label>
                                    </p>)
                            })
                        }
                    </div>
                </div>
                <div class="mxgrid__item40">
                    <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                        <h4 class="mxgrid__item__bg__hx">Language</h4>
                        <div class="tmn-two-column">
                        {
                            languages.map(function(language) {
                                const id = "chk-language-" + language
                                    .replace(/ /g, '')
                                    .replace(/\+/g, '-')
                                    .replace(/\//g, '-')
                                    .replace(/#/g, '-')
                                return (
                                    <p key={id} class="mxgrid__item__bg__p">
                                        <input type="checkbox" id={id} name={id} />
                                        <label htmlFor={id}> {language}</label>
                                    </p>)
                            })
                        }
                        </div>
                    </div>
                </div>
                <div class="mxgrid__item20">
                <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                    <h4 class="mxgrid__item__bg__hx">License</h4>
                    {
                        licenses.map(function(maturity) {
                            const id = "chk-license-" + maturity.replace(/ /g, '')
                            return (
                                <p key={id} class="mxgrid__item__bg__p">
                                    <input type="checkbox" id={id} name={id} />
                                    <label htmlFor={id}> {maturity}</label>
                                </p>)
                        })
                    }
                </div>
                </div>
            </div>
            </div>
            <h2>Clients</h2>
            <MXTryMatrixNowSection items={clients} />
            <h2>Servers</h2>
            <MXTryMatrixNowSection items={servers} />
            <h2>Application Services</h2>
            <MXTryMatrixNowSection items={applicationServices} />
            <h2>SDKs</h2>
            <MXTryMatrixNowSection items={sdks} />
            <h2>Bots</h2>
            <MXTryMatrixNowSection items={bots} />
            <h2>Bridges</h2>
            <MXTryMatrixNowSection items={bridges} />
            <h2>Other</h2>
            <MXTryMatrixNowSection items={others} />
        </MXContentMain>
    </Layout>)
}


export const query = graphql`
{
    allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
        
        edges {
            node {
                childMdx {
                    frontmatter {
                        title
                        maturity
                        description
                        thumbnail
                        featured
                        license
                        categories
                        language
                    }
                }
                absolutePath
            }
        }
    }
}
`
export default TryMatrixNow
