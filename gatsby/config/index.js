module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Matrix.org', // Navigation and Site Title
  siteTitleAlt: 'Matrix.org', // Alternative Site title for SEO
  siteTitleManifest: 'MatrixBlog',
  siteUrl: 'https://matrix.org', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteHeadline: 'Writing and publishing content', // Headline for schema.org JSONLD
  siteBanner: '/blog/wp-content/uploads/2015/01/logo1.png', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Matrix is an open standard for interoperable, decentralised, real-time communication', // Your site description
  author: 'Matrix.org', // Author for schemaORGJSONLD
  siteLogo: '/social/logo.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@matrixdotorg', // Twitter Username - Optional
  ogSiteName: 'Matrix.org', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',
}
