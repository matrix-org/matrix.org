const fs = require('fs');

const redirects = [
    {from: "/docs/projects/as/matrix-appservice-email", to: "/docs/projects/as/matrix-email-bridge/"},
    {from: "/docs/guides/client-server-migrating-from-v1", to: "/docs/guides/migrating-from-client-server-api-v-1"},
    {from: "/docs/projects/client/nheko", to: "/docs/projects/client/nheko-reborn"},
    {from: "/docs/guides/made-for-matrix-badge", to: "/docs/guides/made-for-matrix-badge-guidelines"},
    {from: "/docs/guides/terms_and_conditions", to: "/legal/terms-and-conditions"},
    {from: "/docs/guides/client-server", to: "/docs/guides/client-server-api"},
    {from: "/docs/projects/as/mautrix-whatsapp", to: "/docs/projects/bridge/mautrix-whatsapp"},
    {from: "/docs/projects/as/matrix-appservice-slack", to: "/docs/projects/bridge/matrix-appservice-slack"},
    {from: "/docs/guides/getting_involved", to: "/docs/guides/getting-involved"},
    {from: "/docs/guides/copyright_notice", to: "/legal/copyright-notice"},
    {from: "/docs/projects/as/matrix-appservice-imessage", to: "/docs/projects/bridge/matrix-appservice-imessage"},
    {from: "/docs/projects/as/matrix-appservice-gitter", to: "/docs/projects/bridge/matrix-appservice-gitter"},
    {from: "/docs/projects/as/matrix-appservice-facebook", to: "/docs/projects/bridge/matrix-appservice-facebook"},
    {from: "/docs/projects/clients-matrix/try-matrix-now", to: "/docs/projects/try-matrix-now"},
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