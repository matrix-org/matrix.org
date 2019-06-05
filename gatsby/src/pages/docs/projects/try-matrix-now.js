/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Layout, MXContentMain, Header } from '../../../components'
import config from '../../../../config'

const TryMatrixNow = ({data}) => {

    
    return (<Layout navmode="discover">
        <MXContentMain>
            <Helmet title={`Try Matrix Now | ${config.siteTitle}`} />
            <h1>Try Matrix Now</h1>
            <h2>Clients</h2>
            <div class="mxblock">
            <div class="mxgrid mxgrid--discover">
            {data.allFile.edges.map(function(edge) {
                const project = edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
                if (!project.frontmatter.categories || project.frontmatter.categories[0] !== "client") {
                    return null;
                }
                return (
            <div class="mxgrid__item20 filterableProject"
                data-featured={project.frontmatter.featured}
                data-maturity={project.frontmatter.maturity}
                data-language={project.frontmatter.language}
                data-license={project.frontmatter.license}>
                <div class="mxgrid__item__bg mxgrid__item__bg--clear">
                    
                    <h4 class="mxgrid__item__bg__hx">{project.frontmatter.title}</h4>
                    <p class="mxgrid__item__bg__p">{project.frontmatter.description}</p>
                    <div class="mxgrid__item__bg__vert">
                        <img src={project.frontmatter.thumbnail} alt="" class="mxgrid__item__bg__img" />
                    </div>
                </div>
            </div>)
            })}
            </div>
        </div>
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
