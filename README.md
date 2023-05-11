# Matrix.org Website

**IMPORTANT NOTE: matrix.org is currently undergoing a complete rewrite. Only new content is published on the master branch. New contributions must not target the master branch. Please come and talk with us about what you're trying to fix *before* opening a PR.**

If you want to contribute to the website, make sure the problem you're trying to fix or the feature you want to implement has been discussed in our issue tracker or in our Matrix room, and that we are interested in reviewing and merging such a contribution. The sole existence of an issue doesn't mean we are interested in those changes. It might be an untriaged or obsolete issue.

You can find the team in [#matrix.org-website:matrix.org](https://matrix.to/#/#matrix.org-website:matrix.org).

### How to build

0. Make sure you have the prerequisites:
   - Node.js and npm
   - `git clone https://github.com/matrix-org/matrix.org && cd matrix.org`
1. `cd gatsby`
2. Run `npm i` to install dependencies
3. `npm run develop` - It will take a while on your first build

Now you can visit the page you want to work on in the browser. For example: http://127.0.0.1:8000/docs/projects/try-matrix-now/

### How to add your project to Try Matrix Now

0. Prerequisites:
   - Text editor or web IDE ([MDX](https://mdxjs.com/) support is nice to have
     but not necessary)
   - `git clone https://github.com/matrix-org/matrix.org && cd matrix.org`
1. `cd gatsby`
1. `cp project-template.mdx content/projects/{bots|bridges|clients|iot|sdks|servers|other}/project-name.mdx`
1. Edit the file to include information about your project
1. To include images in your posting, add them to `gatsby/static/docs/projects/images/`. Avoid linking to images on other websites.
1. To check how the rendered result looks (strongly recommended), follow "How to build" steps.
1. Once it looks good, submit a pull request!

### Deploying the site

The source of this site is deployed each time the `master` branch is updated by compiling and packaging all site assets in a compressed
archive via [a GitHub Actions workflow](https://github.com/matrix-org/matrix.org/blob/master/.github/workflows/build-matrix.org.yml).
It then fires off a webhook, which an instance of https://github.com/matrix-org/gha-webhook-listener listens for. Upon receipt of the
webhook, `gha-webhook-listener` on matrix.org downloads and extracts the site assets from the GitHub Actions artefact into the appropriate
local directory, overwriting any old contents.
