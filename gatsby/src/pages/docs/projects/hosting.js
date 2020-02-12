import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../../components'
import config from '../../../../config'


const Hosting = ({ data }) => {

    return (<Layout navmode="discover">
        <MXContentMain>
            <Helmet title={`Hosting | ${config.siteTitle}`} />
            <h1 id="matrix-hosting">Matrix Hosting</h1>
            <div className="mxgrid">

                <div className="mxgrid__item50">
                    <h2 id="modularim">Modular.im</h2>
                    <p><img width="75%" src="/images/modularlogo.png" alt="" /></p>
                    <p><a href="https://www.modular.im/">www.modular.im</a></p>
                    <ul>
                        <li>Hosted Homeservers</li>
                        <li><a href="https://www.modular.im/services/matrix-integrations">Hosted Integrations including Slack, IRC, Github bridging</a></li>
                    </ul>
                    <p>Brought to you by the creators of Matrix, who have been running the biggest homeserver
                        in the network since 2014. Every homeserver comes with a custom instance of Riot.</p>
                </div>

                <div className="mxgrid__item50">
                    <h2 id="ungleich">ungleich.ch</h2>
                    <p><span style={{"backgroundColor": "black", "height": "120px", "width":"75%", "display": "inline-block"}}><br /><img width="75%" src="https://ungleich.ch/static/ungleich_page/img/logo_white.svg" alt="" /></span></p>
                    <p><a href="https://ungleich.ch/u/products/hosted-matrix-chat/">https://ungleich.ch/u/products/hosted-matrix-chat/</a></p>
                    <ul>
                        <li>Hosted in Switzerland</li>
                    </ul>
                    <p>Service provided by <a href="https://ungleich.ch">ungleich.ch</a>.</p>
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
                        categories
                        language
                        author
                        repo
                        room
                        e2e
                    }
                    body
                }
                absolutePath
            }
        }
    }
}
`
export default Hosting
