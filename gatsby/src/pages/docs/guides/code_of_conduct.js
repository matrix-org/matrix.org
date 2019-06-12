import React from 'react'
import { graphql } from 'gatsby'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../../../components'
import config from '../../../../config'


const Redirect = ({data}) => {

    return (<Layout navmode="develop">
        <Helmet>
          <script>window.location = "/legal/code-of-conduct";</script>   
        </Helmet>
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
export default Redirect
