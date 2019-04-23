import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@matrixdotorg" />
        <meta name="twitter:creator" content="@matrixdotorg" />
        <meta name="twitter:title" content="Matrix.org blog" />
        <meta name="twitter:description" content="Matrix.org blog" />
        <meta name="twitter:image" content="https://matrix.org/blog/wp-content/uploads/2015/01/logo1.png" />
        <meta name="twitter:image:alt" content="Matrix.org blog" />
        <meta property="og:image" content="https://matrix.org/blog/wp-content/uploads/2015/01/logo1.png" />
      </head>
      <body {...props.bodyAttributes}>
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
