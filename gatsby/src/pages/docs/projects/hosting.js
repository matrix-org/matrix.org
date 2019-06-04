import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Layout, MXContentMain, Header } from '../../../components'
import config from '../../../../config'


const Hosting = ({data}) => {
 
    return (<Layout navmode="discover">
        <MXContentMain>
          <Helmet title={`SDKs | ${config.siteTitle}`} />
          <h1 id="matrix-hosting">Matrix Hosting</h1>

            <div class="hosting-provider">

            <h2 id="modularim">Modular.im</h2>

            <p><img src="/docs/projects/images/modularlogo.png" alt="" /></p>
            <p><a href="https://www.modular.im/">www.modular.im</a></p>

            <p>
            <span class="hhs-green">✓ Hosted Homeservers</span><br />
            <span><em>&nbsp;&nbsp;&nbsp;&nbsp;Hosted Integrations coming soon</em></span>
            </p>

            <p>Hosted Homeservers for those that don’t want to manage their own.</p>

            <p>Brought to you by the creators of Matrix, who have been running the biggest homeserver in the network since 2014. Every homeserver comes with a custom instance of Riot.</p>
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
                        categories
                        language
                        author
                        repo
                        room
                        e2e
                    }
                    code {
                      body
                    }
                }
                absolutePath
            }
        }
    }
}
`
export default Hosting
