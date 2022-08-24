import React from 'react'

import { Layout } from '../../../../components'

export function Head() {
  return (
    <meta
      http-equiv="refresh"
      content="0; url=/docs/projects/other/synapse-scripts"
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
