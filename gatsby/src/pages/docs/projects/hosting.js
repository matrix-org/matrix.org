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
                    <p><img style={{"height": "130px"}} src="/images/modularlogo.png" alt="" /></p>
                    <p><a href="https://www.modular.im/">www.modular.im</a></p>
                    <ul>
                        <li>Hosted Homeservers</li>
                        <li><a href="https://www.modular.im/services/matrix-integrations">Hosted Integrations including Slack, IRC, Github bridging</a></li>
                    </ul>
                    <p>Brought to you by the creators of Matrix, who have been running the biggest homeserver
                        in the network since 2014. Every homeserver comes with a custom instance of Riot.</p>
                </div>

                <div className="mxgrid__item50">
                    <h2 id="ungleich">Ungleich.ch</h2>
                    <p><img style={{"border-radius": "9px", "height": "130px"}} src="/images/ungleich_zerocarbonmatrix.jpg" alt="" /></p>
                    <p><a href="https://matrix.zerocarbon.shop/">matrix.zerocarbon.shop</a></p>
                    <ul>
                        <li>Hosted Homeservers</li>
                    </ul>
                    <p>Service provided by <a href="https://ungleich.ch">ungleich.ch</a> in their own datacenter
                    in Linthal, Switzerland. They use an old building, second-hand servers, passive cooling and
                    are directly plugged into an on-site hydroelectric power plant!</p>
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
