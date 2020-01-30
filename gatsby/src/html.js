import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self';
        style-src 'self' blob: https://buttons.github.io https://platform.twitter.com https://*.twimg.com 'unsafe-inline';
        script-src 'self' https://matomo.riot.im https://*.twitter.com https://buttons.github.io https://*.twimg.com 'sha256-pD1fF0DQAQie/Y2UCqHA6ZxffBH0UgYt5VkIHHTeojs=' 'sha256-vMES1RKljsMoFhP4fx0IgeCz4ZnbvftW+rgS4DJW0vc=' 'sha256-s1FhdRLpNJaajwf2drK24ROJ0uDYE+sjwi7Q8D1A2Xs=' 'sha256-5SEaGSFepkf1TwA0bhpr9p92fFBN0ZcfPfMIABa+t5k=' 'sha256-zplmJr4ngdxTEonhdviCctJsWzQLKWEj/wSDKiR77G0=' 'sha256-4aJVtlBZpB5y7zgBZ6Z0jsmThEHFSNFMoFAmeCEz4p0=' 'sha256-G0BevqBSwqKmD75etL2uHC9MiA6jx75z/3xDXPCKz+o=' 'sha256-uORJlpRSD7wK5T8fLa/s3Ak1o01gliiknSKXn+0WDJk=' 'sha256-QEPnF1H9IEPIkDKe2omFxNLWAnZGfpk0hNyYciZo7Mo=' 'sha256-P77FEGSM0bUv+cFtC8qexx5Ji3zw47zQ9ilH78MmHNo=' 'sha256-mxqYt8yte37o9eDq6Kqw1IpQ3JPLahW+up7ypFZiFas=' 'sha256-W5yCUlmenEoqyPwUCWugz7B/gm/APVrBWGGZ2LTIfqw='
        'sha256-W1gd/ZaCKXwaXp7SsQcPEs5+JxVtPjRdwdtbVoXdomg=';
        img-src 'self' data: https://matomo.riot.im https://*.twitter.com https://*.twimg.com https://github.com https://*.githubusercontent.com https://*.gitlab.io;
        connect-src 'self' https://api.github.com; font-src 'self' data:; media-src 'self';
        worker-src 'self' https://platform.twitter.com https://syndication.twitter.com https://www.youtube.com;
        frame-src 'self' https://platform.twitter.com https://syndication.twitter.com https://www.youtube.com https://ghbtns.com https://duckduckgo.com;
        form-action 'self' https://*.twitter.com;
        object-src 'self'" />
        <meta name="twitter:widgets:csp" content="on" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <meta name="twitter:site" content="@matrixdotorg" />
        <meta name="twitter:creator" content="@matrixdotorg" />
        <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="/css/webflow.css" />
        <link rel="stylesheet" type="text/css" href="/css/matrix-org.webflow.css" />
        <link rel="stylesheet" type="text/css" href="/css/webflow-overrides.css" />
        <link rel="stylesheet" type="text/css" href="/css/prism.css" />

        <script src="/js/jquery-3.4.1.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="/js/matomo.js"></script>
        <noscript><p><img src="//matomo.riot.im/matomo.php?idsite=3&amp;rec=1" style={{"border": 0}} alt="" /></p></noscript>
      </head>
      <body className="body" {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script src="/js/webflow-loader.js" type="text/javascript"></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
