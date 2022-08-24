import React from 'react'

import { Layout } from '../../../components'

export function Head() {
  return <script>window.location = "/legal/code-of-conduct";</script>;
}

const Redirect = () => {
  return (
    <Layout navmode="develop">
      <></>
    </Layout>
  );
}

export default Redirect
