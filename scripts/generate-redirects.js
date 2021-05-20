const fs = require('fs');

const redirects = [
    {from: "/docs/projects/as/matrix-appservice-email", to: "/docs/projects/bridge/matrix-email-bridge/"},
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
    {from: "/docs/guides/application_services", to: "/docs/guides/application-services"},
    {from: "/docs/projects/client/weechat", to: "/docs/projects/client/weechat-matrix"},
    {from: "/docs/projects/other/go-neb", to: "/docs/projects/bot/go-neb"},
    {from: "/docs/projects/as/irc-bridge", to: "/docs/projects/bridge/matrix-org-irc-bridge"},
    {from: "/docs/projects/as/mautrix-telegram", to: "/docs/projects/bridge/mautrix-telegram"},
    {from: "/docs/projects/as/matrix-rocketchat", to: "/docs/projects/bridge/matrix-rocketchat"},
    {from: "/docs/projects/servers", to: "/docs/projects/try-matrix-now"},
    {from: "/docs/projects/bridges", to: "/bridges/"},
    {from: "/docs/projects/other/synapse_scripts", to: "/docs/projects/other/synapse-scripts"},
    {from: "/docs/projects/as/matrix-appservice-discord", to: "/docs/projects/bridge/matrix-appservice-discord"},
    {from: "/docs/guides/end-to-end-encryption-implementation-guide/starting-a-megolm-session", to: "/docs/guides/end-to-end-encryption-implementation-guide"},
    {from: "/docs/projects/client/thunderbird", to: "/docs/projects/client/mozilla-thunderbird"},
    {from: "/docs/projects/as/matrix-puppet-slack", to: "/docs/projects/bridge/matrix-puppet-slack"},
    {from: "/docs/guides/faq-ru", to: "/faq-ru"},
    {from: "/develop", to: "/docs/guides"},
    {from: "/spec", to: "/docs/spec"},
    {from: "/docs/guides/riot_im_cookie_policy", to: "/legal/riot-im-cookie-policy"},
    {from: "/docs/projects/client/mini-vector", to: "/docs/projects/client/minivector"},
    {from: "/docs/projects/client/mini-vector-android", to: "/docs/projects/client/minivector"},
    {from: "/docs/projects/client/vector", to: "/docs/projects/client/riot"},
    {from: "/docs/projects/client/Scylla", to: "/docs/projects/client/scylla"},
    {from: "/docs/projects/as/mautrix-facebook", to: "/docs/projects/bridge/mautrix-facebook"},
    {from: "/docs/projects/clients-matrix", to: "/clients/"},
    {from: "/docs/spec-redirect", to: "/docs/spec"},
    {from: "/code", to: "/code"},
    {from: "/docs/spec-api-playground-redirect", to: "/docs/api/client-server/"},
    {from: "/blog/feed-redirect", to: "/blog/feed"},
    {from: "/docs/projects/sdks", to: "/sdks/"},
    {from: "/docs/projects/bots", to: "/bots"},
    {from: "/matrix-live", to: "/matrixlive"},
    {from: "/legal/exceptional-erasure-policy", to: "/legal/privacy-notice"},
    {from: "/legal/matrix-org-shop-privacy-notice", to: "/legal/privacy-notice"},
    {from: "/using-matrix/open-source", to: "/using-matrix"},
    {from: "/using-matrix/case-studies", to: "/using-matrix"},
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