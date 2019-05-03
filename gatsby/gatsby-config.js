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
            serialize: ({ query: { site, allMdx } }) => {              return allMdx.edges.map(edge => {                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(   limit: 10,               sort: { order: DESC, fields: [frontmatter___date] },
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
            title: "matrix.org RSS Feed",
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
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: 'gatsby-mdx',
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
          // TODO: Replace with "mdx-component-autolink-headers"
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: false,
              icon: false,
            },
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
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
