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

    const hasCategory = category =>
        projects.filter(project => project.frontmatter.categories.indexOf(category) !== -1);

    const clients = hasCategory("client");
    const servers = hasCategory("server");
    const sdks = hasCategory("sdk");
    const bots = hasCategory("bot");
    const bridges = hasCategory("bridge");
    const others = hasCategory("other");

    const languages = Array.from(new Set( projects.map(project => project.frontmatter.language) ))
        .sort()
        .filter(l => l !== null)

    const licenses = Array.from(new Set( projects.map(project => project.frontmatter.license) ))
        .sort()
        .filter(l => l !== null)
    
    return (<Layout navmode="discover">
        <MXContentMain>
            <Helmet title={`Try Matrix Now | ${config.siteTitle}`}>
                <script src="/js/jquery-3.4.1.min.js" type="text/javascript"></script>
                <script type="text/javascript" src="/js/tmn-control.js"></script>
            </Helmet>
            <h1>Try Matrix Now</h1>
            <p>To get started using Matrix, pick a client and join <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a>. You can also check the <a href="/docs/projects/clients-matrix">Matrix Clients Matrix</a> to see more detail.</p>
        <div className="mxblock">
          <div className="mxgrid mxgrid--discover">
            <div className="mxgrid_item33">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 className="mxgrid__item__bg__hx">
                    <a href="/docs/projects/client/element">Element</a>
                </h4>
                <p className="mxgrid__item__bg__p">If you like glossy and feature-rich web clients, try Element. Available <a href="https://app.element.io/">on the web</a> and as a <a href="https://element.io/get-started">desktop client</a>.</p>
                <div className="mxgrid__item__bg__vert">
                    <img src="/docs/projects/images/riot-web-featured.png" alt="" className="mxgrid__item__bg__img" />
                </div>
              </div>
            </div>
            <div className="mxgrid_item33">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 className="mxgrid__item__bg__hx">Element for Android and iOS</h4>
                <p className="mxgrid__item__bg__p">Element is available on <a href="/docs/projects/client/element-android">Android</a> and <a href="/docs/projects/client/element-ios">iOS</a></p>
                <div className="mxgrid__item__bg__vert">
                    <img src="/docs/projects/images/element-android-featured.png" alt="" className="mxgrid__item__bg__img"/>
                </div>
              </div>
            </div>
            <div className="mxgrid_item33">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 className="mxgrid__item__bg__hx">
                    <a href="/docs/projects/client/weechat-matrix">Weechat/Matrix</a></h4>
                <p className="mxgrid__item__bg__p"> If you like command line clients, try this Weechat Matrix protocol script written in python </p>
                <div className="mxgrid__item__bg__vert"><img src="https://raw.githubusercontent.com/benparsons/matrix-notes/master/twim/weechat-matrix.png" alt="" className="mxgrid__item__bg__img"/></div>
              </div>
            </div>
            <div className="mxgrid_item33">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 className="mxgrid__item__bg__hx">
                <a href="/docs/projects/client/quaternion">Quaternion</a></h4>
                <p className="mxgrid__item__bg__p">A cross-platform desktop client based on Qt5/QML.</p>
                <div className="mxgrid__item__bg__vert"><img src="https://raw.githubusercontent.com/quotient-im/Quaternion/master/quaternion.png" alt="" className="mxgrid__item__bg__img"/></div>
              </div>
            </div>
            <div className="mxgrid_item33">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 className="mxgrid__item__bg__hx">
                <a href="/docs/projects/client/nheko-reborn">Nheko</a></h4>
                <p className="mxgrid__item__bg__p">Nheko is a glossy native desktop app for Matrix, based on Qt5.</p>
                <div className="mxgrid__item__bg__vert"><img src="/docs/projects/images/nheko_thumb.png" alt="" className="mxgrid__item__bg__img"/></div>
              </div>
            </div>
            <div className="mxgrid_item33">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                <h4 className="mxgrid__item__bg__hx">
                <a href="/docs/projects/client/fractal">Fractal</a></h4>
                <p className="mxgrid__item__bg__p"> If you're looking for a client for GNOME, try Fractal.</p>
                <div className="mxgrid__item__bg__vert"><img src="/docs/projects/images/fractal-featured.png" alt="" className="mxgrid__item__bg__img"/></div>
              </div>
            </div>
          </div>
        </div>
            <h2>Let's go deeper</h2>
            <p>Matrix is a whole ecosystem of Matrix-enabled clients, servers, gateways, bots, etc. If you’d like to learn more, this page aims to collect all known Matrix projects. To add a new one (or update an existing one), you can submit a PR to the <a href="https://github.com/matrix-org/matrix.org">matrix.org</a> project on github - the existing projects can be found <a href="https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects">here</a> - or just let us know in the <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a> room.<br /></p>
            <div className="mxblock">
            <div className="mxgrid mxgrid--discover">
                <div className="mxgrid__item20">
                    <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                        <h4 className="mxgrid__item__bg__hx">Project type</h4>
                        <div className="mxgrid">
                            <div className="mxgrid__item50"><button id="types-all">All</button></div>
                            <div className="mxgrid__item50"><button id="types-none">None</button></div>
                        </div>
                        <p className="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-client" />
                            <label htmlFor="chk-type-client"> Clients</label>
                        </p>
                        <p className="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-server" />
                            <label htmlFor="chk-type-server"> Servers</label>
                        </p>
                            <p className="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-sdk" />
                            <label htmlFor="chk-type-sdk"> Client SDKs</label>
                        </p>
                        <p className="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-bot" />
                            <label htmlFor="chk-type-bot"> Bots</label>
                        </p>
                        <p className="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-bridge" />
                            <label htmlFor="chk-type-bridge"> Bridges</label>
                        </p>
                        <p className="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-other" />
                            <label htmlFor="chk-type-other"> Other</label>
                        </p>
                    </div>
                </div>
                <div className="mxgrid__item20">
                    <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                        <h4 className="mxgrid__item__bg__hx">Maturity</h4>
                        <div className="mxgrid">
                            <div className="mxgrid__item50"><button id="maturities-all">All</button></div>
                            <div className="mxgrid__item50"><button id="maturities-none">None</button></div>
                        </div>
                        {
                            ["Released","Stable","Late Beta","Beta","Early Beta",
                            "Late Alpha","Alpha","Early Alpha","Not actively maintained"].map(function(maturity) {
                                const id = "chk-maturity-" + maturity.replace(/ /g, '')
                                return (
                                    <p key={id} className="mxgrid__item__bg__p">
                                        <input type="checkbox" id={id} name={id} />
                                        <label htmlFor={id}> {maturity}</label>
                                    </p>)
                            })
                        }
                    </div>
                </div>
                <div className="mxgrid__item40">
                    <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                        <h4 className="mxgrid__item__bg__hx">Language</h4>
                        <div className="mxgrid">
                            <div className="mxgrid__item50"><button id="languages-all">All</button></div>
                            <div className="mxgrid__item50"><button id="languages-none">None</button></div>
                        </div>
                        <div className="tmn-two-column">
                        {
                            languages.map(function(language) {
                                const id = "chk-language-" + language
                                    .replace(/ /g, '')
                                    .replace(/\+/g, '-')
                                    .replace(/\//g, '-')
                                    .replace(/#/g, '-')
                                return (
                                    <p key={id} className="mxgrid__item__bg__p">
                                        <input type="checkbox" id={id} name={id} />
                                        <label htmlFor={id}> {language}</label>
                                    </p>)
                            })
                        }
                        </div>
                    </div>
                </div>
                    <div className="mxgrid__item20">
                        <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                            <h4 className="mxgrid__item__bg__hx">License</h4>
                            <div className="mxgrid">
                                <div className="mxgrid__item50"><button id="licenses-all">All</button></div>
                                <div className="mxgrid__item50"><button id="licenses-none">None</button></div>
                            </div>
                            <div className="tmn-two-column">
                                {
                                    licenses.map(function (maturity) {
                                        const id = "chk-license-" + maturity.replace(/ /g, '').replace(/\//g, '-').replace(/\./g, '')
                                        return (
                                            <p key={id} className="mxgrid__item__bg__p">
                                                <input type="checkbox" id={id} name={id} />
                                                <label style={{ "whiteSpace": "nowrap" }} htmlFor={id}> {maturity}</label>
                                            </p>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            <h2>Clients</h2>
            <MXTryMatrixNowSection items={clients} />
            <h2>Servers</h2>
            <MXTryMatrixNowSection items={servers} />
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
                    fields {
                        slug
                    }
                }
                absolutePath
            }
        }
    }
}
`
export default TryMatrixNow
