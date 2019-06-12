import React from 'react'

import Helmet from 'react-helmet'
import { Layout } from '../../../components'


const Redirect = () => {

    return (<Layout navmode="develop">
        <Helmet>
          <script>window.location = "/docs/guides/end-to-end-encryption-implementation-guide";</script>   
        </Helmet>
    </Layout>)
}

export default Redirect
