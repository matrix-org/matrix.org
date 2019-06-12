import React from 'react'

import Helmet from 'react-helmet'
import { Layout } from '../../../components'


const Redirect = () => {

    return (<Layout navmode="develop">
        <Helmet>
          <script>window.location = "/legal/privacy-notice";</script>   
        </Helmet>
    </Layout>)
}

export default Redirect
