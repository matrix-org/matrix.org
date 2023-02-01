import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta name="twitter:widgets:csp" content="on" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <meta name="twitter:site" content="@matrixdotorg" />
        <meta name="twitter:creator" content="@matrixdotorg" />
        <meta name="description" content="html.js" />
        <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="/css/webflow.css" />
        <link rel="stylesheet" type="text/css" href="/css/matrix-org.webflow.css" />
        <link rel="stylesheet" type="text/css" href="/css/webflow-overrides.css?2020-08-19" />
        <link rel="stylesheet" type="text/css" href="/css/prism.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"></link>

        <script src="/js/jquery-3.4.1.min.js" type="text/javascript"></script>
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
        <script src="/js/rating.js?no-cache" type="text/javascript"></script>
        <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
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
