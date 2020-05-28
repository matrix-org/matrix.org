import React from 'react'

import Helmet from 'react-helmet'
import { Layout, MXContentMain, MXTryMatrixNowSection } from '../components'
import config from '../../config'

const Discover = ({data}) => {
    const projects = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories);

    const clients = projects.filter(project => project.frontmatter.categories[0] === "client")
    const servers = projects.filter(project => project.frontmatter.categories[0] === "server")
    const applicationServices = projects.filter(project => project.frontmatter.categories[0] === "as")
    const sdks = projects.filter(project => project.frontmatter.categories.indexOf("sdk") !== -1)
    const bots = projects.filter(project => project.frontmatter.categories.indexOf("bot") !== -1)
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
            <Helmet title={`Discover Matrix | ${config.siteTitle}`}>
              <script src="/js/jquery-3.4.1.min.js" type="text/javascript"></script>
              <script type="text/javascript" src="/js/tmn-control.js"></script>
            </Helmet>
            <h2 className="mxblock__hx">Discover Matrix</h2>
            <div className="mxgrid">
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/music_play_button.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides/introduction">Introduction</a></h4>
                            <p className="mxgrid__item__bg__p">Understand the Matrix Ecosystem<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_spread_text.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides">Guides</a></h4>
                            <p className="mxgrid__item__bg__p">Guides for Matrix Users<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_server_upload.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides/installing-synapse">Host your own homeserver</a></h4>
                            <p className="mxgrid__item__bg__p">Install Synapse, a homeserver implementation written in Python<br /></p>
                        </div>
                    </div>
                </div>

                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_signs.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/faq">Matrix FAQ</a></h4>
                            <p className="mxgrid__item__bg__p">Frequently Asked Questions<br /></p>
                        </div>
                    </div>
                </div>


                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_elaboration_message_happy.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides/moderation">Moderation</a></h4>
                            <p className="mxgrid__item__bg__p">How to manage and moderate Matrix rooms<br /></p>
                        </div>
                    </div>
                </div>

            </div>

            <h2>Find a project</h2>
            <p>
              The community has built tons of Matrix-enabled projects: Clients, servers, bridges to other platforms outside Matrix, application services, bots, etc.
              This page aims to showcase all known Matrix projects, including experimental and discontinued ones.
              Use the filters below to find projects you want to use or contribute to!
              <br/>
              To add a new one (or update an existing one), you can submit a PR to the <a href="https://github.com/matrix-org/matrix.org">matrix.org</a> project on github
              - the existing projects can be found <a href="https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects">here</a> -
              or just let us know in the <a href="https://matrix.to/#/#matrix:matrix.org">#matrix:matrix.org</a> room.
            </p>
            <div className="mxblock">
            <div className="mxgrid mxgrid--discover">
                <div className="mxgrid__item25">
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
                            <input type="checkbox" id="chk-type-as" />
                            <label htmlFor="chk-type-as"> Application Services</label>
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
                <div className="mxgrid__item25">
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
                <div className="mxgrid__item25">
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
                    <div className="mxgrid__item25">
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

export default Discover
