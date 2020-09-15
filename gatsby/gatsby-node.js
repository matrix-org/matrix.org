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
      } else if (node.frontmatter.section === "legal") {
        slug = `/legal${slug}`
      } else if (node.frontmatter.section === "Case Studies") {
        slug = `/using-matrix/case-studies${slug}`
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
  const otwsuTemplate = require.resolve('./src/templates/otwsuTemplate.js')

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
              body
              frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                categories
                author
                image
                slug
                showTableOfContents
              }
              tableOfContents
              parent {
                ... on File {
                  mtime
                  birthtime
                }
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
        postNode: edge.node,
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
      path: edge.node.childMdx.fields.slug,
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
            section
          }
        }
      }
    }
  }
    `)
  )

  const pages = resultPages.data.allMdx.edges
  const pagesForGuidesList = pages.map(p => {return {
    slug: p.node.fields.slug,
    title: p.node.frontmatter.title,
    sort_order: p.node.frontmatter.sort_order,
    section: p.node.frontmatter.section
   }})
  pagesForGuidesList.sort(function(a, b) {
    if (a.sort_order && ! b.sort_order) return -1;
    if (! a.sort_order && b.sort_order) return 1;
    if (! a.sort_order && ! b.sort_order) return 0;
    return a.sort_order - b.sort_order;
    });
  const pagesForGuidesListBySection = {};
  pagesForGuidesList.forEach(page=>{
    if (!pagesForGuidesListBySection[page.section]) {
      pagesForGuidesListBySection[page.section] = [];
    }
    pagesForGuidesListBySection[page.section].push(page);
  })
  pages.forEach((edge, index) => {

    createPage({
      path: edge.node.fields.slug,
      component: guideTemplate,
      context: {
        slug: edge.node.fields.slug,
        pages: pagesForGuidesList,
        pagesBySection: pagesForGuidesListBySection,
        pagesListTitle: "Other Guides",
        navMode: "develop"
      },
    })
  })
  const resultCaseStudies = await wrapper(
    graphql(`{
    allMdx(filter: {frontmatter: {section: {eq: "Case Studies"}}}) {
      edges {
        node {
          fields {
            slug
          }
          body
          frontmatter {
            title
            section
          }
        }
      }
    }
  }`));
  
  const caseStudies = resultCaseStudies.data.allMdx.edges;

  caseStudies.forEach((edge, index) => {
    createPage({
      path: edge.node.fields.slug,
      component: guideTemplate,
      context: {
        slug: edge.node.fields.slug,
        pages: [],
        pagesBySection: { "Case Studies": caseStudies.map(c => 
          { return { slug: c.node.fields.slug, title: c.node.frontmatter.title } }) 
        },
        pagesListTitle: "Using Matrix"
      },
    })
  });





const resultProjects = await wrapper(
  graphql(`
{
    allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
        
        edges {
            node {
                childMdx {
                    frontmatter {
                      title
                      date(formatString: "YYYY-MM-DD")
                      author,
                      image
                      description
                      categories
                      maturity
                      language
                      license
                      repo
                      home
                      room
                      screenshot
                    }
                    fields {
                      slug
                    }
                    parent {
                      ... on File {
                        mtime
                        birthtime
                      }
                    }
                    body
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
        postNode: edge.node.childMdx
      },
    })
  })

  const otwsuResults = await wrapper(
    graphql(`{
      allMdx(
        filter: {
          frontmatter: { section: { eq: "otwsu" } }
        }
        sort: { fields: frontmatter___sort_order, order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              section
              edition
              youtube
              date
            }
            fields {
              slug
            }
            body
          }
        }
      }
    }`));
  const otwsu = otwsuResults.data.allMdx.edges;
  otwsu.forEach((edge, index) => {
    const slug = '/open-tech-will-save-us/' + edge.node.frontmatter.edition
    createPage({
      path: slug,
      component: otwsuTemplate,
      context: {
        postNode: edge.node
      },
    })
  })

}

