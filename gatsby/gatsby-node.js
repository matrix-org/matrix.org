const _ = require("lodash");

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  let slug;

  if (node.internal.type === "Mdx") {
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }

    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "date")
    ) {
      slug = `/blog/${node.frontmatter.date.replace(/-/g, "/")}${slug}`;
    } else if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      !Object.prototype.hasOwnProperty.call(node.frontmatter, "date")
    ) {
      if (
        node.frontmatter.layout &&
        (node.frontmatter.layout === "project" ||
          node.frontmatter.layout === "projectimage")
      ) {
        if (node.frontmatter.categories && node.frontmatter.categories[0]) {
          slug = `/docs/projects/${node.frontmatter.categories[0]}${slug}`;
        } else {
          console.log("===ERROR===");
          console.log(node);
          slug = `/docs/projects/error${slug}`;
        }
      } else if (node.frontmatter.section === "legal") {
        slug = `/legal${slug}`;
      } else if (node.frontmatter.section === "Case Studies") {
        slug = `/using-matrix/case-studies${slug}`;
      } else {
        slug = `/docs/guides${slug}`;
      }
    } else {
      console.error("===ERROR===");
      console.error(node);
      console.error("Failed to generate slug");
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = require.resolve("./src/templates/post.js");
  const guideTemplate = require.resolve("./src/templates/guide.js");
  const categoryTemplate = require.resolve("./src/templates/category.js");
  const postListTemplate = require.resolve("./src/templates/post-list.js");
  const projectTemplate = require.resolve("./src/templates/project.js");
  const noNavTemplate = require.resolve("./src/templates/noNavPage.js");
  const otwsuTemplate = require.resolve("./src/templates/otwsuTemplate.js");

  const resultPosts = await wrapper(
    graphql(`
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { date: { ne: null }, author: { ne: null } } }
        ) {
          nodes {
            fields {
              slug
            }
            internal {
              contentFilePath
            }
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
                birthTime
              }
            }
          }
        }
      }
    `)
  );

  const posts = resultPosts.data.allMdx.nodes;
  const postsForArchiveList = posts
    .map(p => {
      return {
        slug: p.fields.slug,
        title: p.frontmatter.title
      };
    })
    .slice(0, 20);
  posts.forEach((node, index) => {
    const next = index === 0 ? null : posts[index - 1].node;
    const prev = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: node.fields.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        postNode: node,
        prev,
        next,
        posts: postsForArchiveList
      }
    });
  });

  const categorySet = new Set();

  _.each(posts, node => {
    if (_.get(node, "frontmatter.categories")) {
      node.frontmatter.categories.forEach(cat => {
        categorySet.add(cat);
      });
    }
  });

  const categories = Array.from(categorySet);

  categories.forEach(category => {
    const postsPerPage = 6;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((x, i) => {
      createPage({
        path:
          i === 0
            ? `/blog/category/${_.kebabCase(category)}`
            : `/blog/category/${_.kebabCase(category)}/${i + 1}`,
        component: `${categoryTemplate}?__contentFilePath=${posts[i].internal.contentFilePath}`,
        context: {
          category,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      });
    });
  });

  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((x, i) => {
    createPage({
      path: i === 0 ? `/blog/posts` : `/blog/posts/${i + 1}`,
      component: `${postListTemplate}?__contentFilePath=${posts[i].internal.contentFilePath}`,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        posts: postsForArchiveList
      }
    });
  });

  const resultLegal = await wrapper(
    graphql(`
      {
        allFile(filter: { sourceInstanceName: { eq: "legal" } }) {
          nodes {
            childMdx {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
            internal {
              contentFilePath
            }
            absolutePath
          }
        }
      }
    `)
  );

  resultLegal.data.allFile.nodes.forEach((node, index) => {
    createPage({
      path: node.childMdx.fields.slug,
      component: `${noNavTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.childMdx.fields.slug
      }
    });
  });

  const resultPages = await wrapper(
    graphql(`
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            frontmatter: {
              date: { eq: null }
              layout: { nin: ["project", "projectimage"], in: ["post"] }
              section: { nin: ["legal"] }
            }
          }
        ) {
          nodes {
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
            internal {
              contentFilePath
            }
          }
        }
      }
    `)
  );

  const pages = resultPages.data.allMdx.nodes;
  const pagesForGuidesList = pages.map(p => {
    return {
      slug: p.node.fields.slug,
      title: p.node.frontmatter.title,
      sort_order: p.node.frontmatter.sort_order,
      section: p.node.frontmatter.section
    };
  });
  pagesForGuidesList.sort(function(a, b) {
    if (a.sort_order && !b.sort_order) return -1;
    if (!a.sort_order && b.sort_order) return 1;
    if (!a.sort_order && !b.sort_order) return 0;
    return a.sort_order - b.sort_order;
  });
  const pagesForGuidesListBySection = {};
  pagesForGuidesList.forEach(page => {
    if (!pagesForGuidesListBySection[page.section]) {
      pagesForGuidesListBySection[page.section] = [];
    }
    pagesForGuidesListBySection[page.section].push(page);
  });
  pages.forEach((node, index) => {
    createPage({
      path: node.fields.slug,
      component: `${guideTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
        pages: pagesForGuidesList,
        pagesBySection: pagesForGuidesListBySection,
        pagesListTitle: "Other Guides",
        navMode: "develop"
      }
    });
  });
  const resultCaseStudies = await wrapper(
    graphql(`
      {
        allMdx(filter: { frontmatter: { section: { eq: "Case Studies" } } }) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              section
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `)
  );

  const caseStudies = resultCaseStudies.data.allMdx.nodes;

  caseStudies.forEach((node, index) => {
    createPage({
      path: node.fields.slug,
      component: `${guideTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
        pages: [],
        pagesBySection: {
          "Case Studies": caseStudies.map(node => {
            return {
              slug: node.fields.slug,
              title: node.frontmatter.title
            };
          })
        },
        pagesListTitle: "Using Matrix"
      }
    });
  });

  const resultProjects = await wrapper(
    graphql(`
      {
        allFile(filter: { sourceInstanceName: { eq: "projects" } }) {
          nodes {
            childMdx {
              frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                author
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
                  birthTime
                }
              }
            }
            internal {
              contentFilePath
            }
            absolutePath
          }
        }
      }
    `)
  );

  const projects = resultProjects.data.allFile.nodes;

  projects.forEach((node, index) => {
    createPage({
      path: node.childMdx.fields.slug,
      component: `${projectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        postNode: node.childMdx
      }
    });
  });

  const otwsuResults = await wrapper(
    graphql(`
      {
        allMdx(
          filter: { frontmatter: { section: { eq: "otwsu" } } }
          sort: { fields: frontmatter___sort_order, order: ASC }
        ) {
          nodes {
            frontmatter {
              section
              edition
              youtube
              eventdate
            }
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `)
  );
  const otwsu = otwsuResults.data.allMdx.nodes;
  otwsu.forEach((node, index) => {
    const slug = "/open-tech-will-save-us/" + node.frontmatter.edition;
    createPage({
      path: slug,
      component: `${otwsuTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        postNode: node
      }
    });
  });
};
