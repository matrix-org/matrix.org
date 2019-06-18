const fs = require('fs');

const redirects = [
    {from: "/docs/projects/as/matrix-appservice-email", to: "/docs/projects/as/matrix-email-bridge/"}
];

const template = `import React from 'react'

import Helmet from 'react-helmet'
import { Layout } from '%%componentsDir%%components'

const Redirect = () => {

    return (<Layout>
        <Helmet>
            <meta http-equiv="refresh" content="0; url=%%redirect.to%%" />
        </Helmet>
    </Layout>)
}

export default Redirect
`;

redirects.forEach(redirect => {
    if (redirect.from[0] !== '/' || redirect.to[0] !== '/') {
        console.log(`ERROR! All urls must start with '.':`);
        console.log(redirect.from);
        console.log(redirect.to);
        process.exit(1);
    }

    const depth = redirect.from.split("/").length - 1;
    const componentsDir = "../".repeat(depth);
    const output = template
                    .replace("%%componentsDir%%", componentsDir)
                    .replace("%%redirect.to%%", redirect.to);

    fs.writeFileSync(`../gatsby/src/pages${redirect.from}.js`, output);
});