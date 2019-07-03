const _ = require('lodash')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  let slug

  if (node.internal.type === 'Mdx') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    }

    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')
    ) {
      slug = `/blog/${node.frontmatter.date.replace(/-/g, '/')}${slug}`
    }
    else if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      ! Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')
    ) {
      if(node.frontmatter.layout && 
        (node.frontmatter.layout === "project" || node.frontmatter.layout === "projectimage")) {
          if (node.frontmatter.categories && node.frontmatter.categories[0]) {
            slug = `/docs/projects/${node.frontmatter.categories[0]}${slug}`
          } else {
            console.log("===ERROR===")
            console.log(node)
            slug = `/docs/projects/error${slug}`
          }
      } else {
        slug = `/docs/guides${slug}`
      }
    }
    createNodeField({ node, name: 'slug', value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = require.resolve('./src/templates/post.js')
  const guideTemplate = require.resolve('./src/templates/guide.js')
  const categoryTemplate = require.resolve('./src/templates/category.js')
  const postListTemplate = require.resolve('./src/templates/post-list.js')
  const projectTemplate = require.resolve('./src/templates/project.js')
  const noNavTemplate = require.resolve('./src/templates/noNavPage.js')

  const resultPosts = await wrapper(
    graphql(`
      {
        allMdx(sort: { fields: [frontmatter___date], order: DESC },
          filter: {frontmatter: {date: {ne: null}}}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                categories
                author
                slug
              }
            }
          }
        }
      }
    `)
  )

  const posts = resultPosts.data.allMdx.edges
  const postsForArchiveList = posts.map(p => {return {
    slug: p.node.fields.slug, title: p.node.frontmatter.title
   }}).slice(0, 20)
  posts.forEach((edge, index) => {
    const next = index === 0 ? null : posts[index - 1].node
    const prev = index === posts.length - 1 ? null : posts[index + 1].node

    createPage({
      path: edge.node.fields.slug,
      component: postTemplate,
      context: {
        slug: edge.node.fields.slug,
        prev,
        next,
        posts: postsForArchiveList,
      },
    })
  })

  const categorySet = new Set()

  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.categories')) {
      edge.node.frontmatter.categories.forEach(cat => {
        categorySet.add(cat)
      })
    }
  })

  const categories = Array.from(categorySet)

  categories.forEach(category => {
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((x, i) => {
      createPage({
        path: i === 0 ? `/blog/category/${_.kebabCase(category)}` : `/blog/category/${_.kebabCase(category)}/${i + 1}`,
        component: categoryTemplate,
        context: {
          category,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((x, i) => {
    createPage({
      path: i === 0 ? `/blog/posts` : `/blog/posts/${i + 1}`,
      component: postListTemplate,
      context: { 
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        posts: postsForArchiveList,
      },
    })
  })

  

const resultLegal = await wrapper(
  graphql(`
{
    allFile(filter: { sourceInstanceName: { eq: "legal" } }) {
        
        edges {
            node {
                childMdx {
                    frontmatter {
                        title
                    }
                    fields {
                      slug
                    }
                }
                absolutePath
            }
        }
    }
}`))

  resultLegal.data.allFile.edges.forEach((edge, index) => {
    createPage({
      path: "/legal/" + _.kebabCase(edge.node.childMdx.frontmatter.title),
      component: noNavTemplate,
      context: {
        slug: edge.node.childMdx.fields.slug
      },
    })
  })

  const resultPages = await wrapper(
    graphql(`{
    allMdx(sort: { fields: [frontmatter___date], order: DESC },
      filter: {
        frontmatter: {
          date: {eq: null},
          layout: {nin:["project", "projectimage"], in: ["post"]},
          section: {nin:["legal"]}
        }
      }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            categories
            author
            slug
            sort_order
          }
        }
      }
    }
  }
    `)
  )

  const pages = resultPages.data.allMdx.edges
  const pagesForGuidesList = pages.map(p => {return {
    slug: p.node.fields.slug, title: p.node.frontmatter.title, sort_order: p.node.frontmatter.sort_order
   }})
  pagesForGuidesList.sort(function(a, b) {
    if (a.sort_order && ! b.sort_order) return -1;
    if (! a.sort_order && b.sort_order) return 1;
    if (! a.sort_order && ! b.sort_order) return 0;
    return a.sort_order - b.sort_order;
    });
  pages.forEach((edge, index) => {

    createPage({
      path: edge.node.fields.slug,
      component: guideTemplate,
      context: {
        slug: edge.node.fields.slug,
        pages: pagesForGuidesList
      },
    })
  })


const resultProjects = await wrapper(
  graphql(`
{
    allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
        
        edges {
            node {
                childMdx {
                    frontmatter {
                        title
                        maturity
                        description
                        thumbnail
                        featured
                        layout
                    }
                    fields {
                      slug
                    }
                }
                absolutePath
            }
        }
    }
}`))

  const projects = resultProjects.data.allFile.edges

  projects.forEach((edge, index) => {
    createPage({
      path: edge.node.childMdx.fields.slug,
      component: projectTemplate,
      context: {
        slug: edge.node.childMdx.fields.slug
      },
    })
  })
}