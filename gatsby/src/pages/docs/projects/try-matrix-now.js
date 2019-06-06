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
            <h2>Let's go deeper</h2>
            <p>Matrix is a whole ecosystem of matrix-enabled clients, servers, gateways, application services, bots, etc. If you’d like to learn more, this page aims to collect all known Matrix projects. To add a new one (or update an existing one), you can submit a PR to the <a href="https://github.com/matrix-org/matrix.org">matrix.org</a> project on github - the existing projects can be found <a href="https://github.com/matrix-org/matrix.org/tree/master/jekyll/_posts/projects">here</a> - or just let us know in the #matrix:matrix.org room.<br /></p>
            <div class="mxblock">
            <div class="mxgrid mxgrid--discover">
                <div class="mxgrid__item20">
                    <div class="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--left_align">
                        <h4 class="mxgrid__item__bg__hx">Project type</h4>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-client" checked="checked" />
                            <label for="chk-type-client"> Clients</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-server" checked="checked" />
                            <label for="chk-type-client"> Servers</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-as" checked="checked" />
                            <label for="chk-type-client"> Application Services</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-sdk" checked="checked" />
                            <label for="chk-type-client"> Client SDKs</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-bot" checked="checked" />
                            <label for="chk-type-client"> Bots</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-bridge" checked="checked" />
                            <label for="chk-type-client"> Bridges</label>
                        </p>
                        <p class="mxgrid__item__bg__p">
                            <input type="checkbox" id="chk-type-other" checked="checked" />
                            <label for="chk-type-client"> Other</label>
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
                                    <p class="mxgrid__item__bg__p">
                                        <input type="checkbox" id={id} name={id} checked="checked" />
                                        <label for={id}> {maturity}</label>
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
                            languages.map(function(maturity) {
                                const id = "chk-language-" + maturity.replace(/ /g, '')
                                return (
                                    <p class="mxgrid__item__bg__p">
                                        <input type="checkbox" id={id} name={id} checked="checked" />
                                        <label for={id}> {maturity}</label>
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
                                <p class="mxgrid__item__bg__p">
                                    <input type="checkbox" id={id} name={id} checked="checked" />
                                    <label for={id}> {maturity}</label>
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
