import React from 'react'

import Helmet from 'react-helmet'
import { Layout } from '../../../components'

const Redirect = () => {

    return (<Layout>
        <Helmet>
            <meta http-equiv="refresh" content="0; url=/docs/guides/migrating-from-client-server-api-v-1" />
        </Helmet>
    </Layout>)
}

export default Redirect
