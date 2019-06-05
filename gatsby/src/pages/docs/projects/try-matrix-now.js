/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Layout, MXContentMain, MXTryMatrixNowSection } from '../../../components'
import config from '../../../../config'

const TryMatrixNow = ({data}) => {
    const clients = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories && project.frontmatter.categories[0] === "client")

    const servers = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories && project.frontmatter.categories[0] === "server")

    const applicationServers = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories && project.frontmatter.categories[0] === "as")

    const sdks = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories && project.frontmatter.categories[0] === "sdk")

    const bots = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories && project.frontmatter.categories[0] === "bot")

    const bridges = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories && project.frontmatter.categories[0] === "bridge")

    const others = data.allFile.edges.map(function(edge) {
        return edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
    }).filter(project => project.frontmatter.categories && project.frontmatter.categories[0] === "other")
    
    return (<Layout navmode="discover">
        <MXContentMain>
            <Helmet title={`Try Matrix Now | ${config.siteTitle}`} />
            <h1>Try Matrix Now</h1>
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
                    }
                }
                absolutePath
            }
        }
    }
}
`
export default TryMatrixNow
