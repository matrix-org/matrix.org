import React from 'react'

import Helmet from 'react-helmet'
import { Layout } from '../../components'

const Redirect = () => {

    return (<Layout>
        <Helmet>
            <meta http-equiv="refresh" content="0; url=/legal/exceptional-erasure-policy-1" />
        </Helmet>
    </Layout>)
}

export default Redirect
