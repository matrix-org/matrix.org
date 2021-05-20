import React from 'react'

import Helmet from 'react-helmet'
import { Layout } from '../../components'

const Redirect = () => {

    return (<Layout>
        <Helmet>
            <meta http-equiv="refresh" content="0; url=/legal/privacy-notice" />
        </Helmet>
    </Layout>)
}

export default Redirect
