import React from 'react'

import { Layout } from '../../../components'

export function Head() {
  return <script>window.location = "/legal/privacy-notice";</script>;
}

const Redirect = () => {
  return (
    <Layout>
      <></>
    </Layout>
  );
}

export default Redirect
