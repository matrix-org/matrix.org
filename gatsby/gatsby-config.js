const config = require('./config')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: `Matrix.org`,
    description: `Blog for the Matrix project`,
    siteUrl: config.siteUrl + pathPrefix,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false, // 
        mergeScriptHashes: true, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          "script-src": "'self' 'unsafe-eval' https://matomo.riot.im https://*.twitter.com https://buttons.github.io https://*.twimg.com https://cdn.jsdelivr.net 'sha256-s1FhdRLpNJaajwf2drK24ROJ0uDYE+sjwi7Q8D1A2Xs='",
          "style-src": " 'self' blob: https://buttons.github.io https://platform.twitter.com https://*.twimg.com https://cdn.jsdelivr.net 'unsafe-inline'",
          "img-src": "'self' data: https://matomo.riot.im https://*.twitter.com https://*.twimg.com https://github.com https://*.githubusercontent.com https://*.gitlab.io https://fluffychat.im",
          "connect-src": "'self' https://api.github.com https://stream.matrix.org",
          "worker-src": "'self' blob: https://platform.twitter.com https://syndication.twitter.com https://www.youtube.com",
          "frame-src": "'self' https://platform.twitter.com https://syndication.twitter.com https://www.youtube.com https://ghbtns.com https://duckduckgo.com",
          "form-action": "'self' https://*.twitter.com",
          "object-src": "'self'",
          "font-src": "'self' data:",
          "media-src": "'self' blob: https://stream.matrix.org"
        }
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                }
              })
            },
            query: `
              {
                allMdx(
                  limit: 10,
                  sort: {
                    order: DESC,
                    fields: [frontmatter___date]
                  },
                  filter: {
                    frontmatter: {
                      date: {
                        ne: null
                      }
                    }
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/blog/feed",
            title: "matrix.org",
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/content/docs`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'legal',
        path: `${__dirname}/content/legal`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'faq',
        path: `${__dirname}/content/faq`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'using-matrix',
        path: `${__dirname}/content/using-matrix`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'otwsu',
        path: `${__dirname}/content/otwsu`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 830,
              quality: 90,
              withWebp: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {}
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {}
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitleAlt,
        short_name: config.siteTitleManifest,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '3',
        matomoUrl: 'https://matomo.riot.im',
        siteUrl: 'https://matrix.org'
      }
    }
  ],
}
