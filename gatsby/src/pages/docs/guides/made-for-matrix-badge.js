import React from 'react'

import { Layout } from '../../../components'

export function Head() {
  return (
    <meta
      http-equiv="refresh"
      content="0; url=/docs/guides/made-for-matrix-badge-guidelines"
    />
  );
}

const Redirect = () => {
  return (
    <Layout>
      <></>
    </Layout>
  );
};

export default Redirect
