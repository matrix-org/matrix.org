/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Layout, Wrapper, Header } from '../../../components'
import config from '../../../../config'

const TryMatrixNow = ({data}) => {

    
    return (<Layout>
        <Wrapper>
            <Helmet title={`Try Matrix Now | ${config.siteTitle}`} />
            <h1>Try Matrix Now</h1>
            <p>dsfs</p>
            <p>test {JSON.stringify(data.allFile.edges[0])}</p>
            {data.allFile.edges.map(function(edge) {
                const project = edge.node.childMdx ? edge.node.childMdx : {frontmatter:{ description: "ERROR"}};
                return (
            <div class="col-md-4 col-12 mb-3 filterableProject"
                data-featured={project.frontmatter.featured}
                data-maturity={project.frontmatter.maturity}
                data-language={project.frontmatter.language}
                data-license="">
                <div class="theme-card">
                    
                    <div class="card-block">
                        <h4 class="card-title">{project.frontmatter.title}</h4>
                        <p class="card-text">{project.frontmatter.description}</p>
                    </div>
                    <a class="mask" href="projects/client/2018-04-24-matrix-java.html"><i class="icon fa fa-search-plus"></i></a>
                </div>
            </div>)
            })}
        </Wrapper>
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
                    }
                }
                absolutePath
            }
        }
    }
}
`
export default TryMatrixNow
