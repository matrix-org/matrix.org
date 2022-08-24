import React from 'react'

import { Layout } from '../../../components'


export function Head() {
  return <script>window.location = "/docs/guides/end-to-end-encryption-implementation-guide";</script>;
}

const Redirect = () => {
  return (
    <Layout>
      <></>
    </Layout>
  );
}

export default Redirect
