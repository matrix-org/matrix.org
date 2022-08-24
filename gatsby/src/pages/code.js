import React from 'react'

import { Layout, SEO } from '../components'

export function Head() {
  return (
    <>
      <SEO />
      <meta http-equiv="refresh" content="0; url=/code" />
    </>
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
