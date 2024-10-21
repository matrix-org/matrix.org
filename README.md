# Matrix.org Website

If you want to contribute to the website, make sure the problem you're trying to
fix or the feature you want to implement has been discussed in our issue tracker
and that we are interested in reviewing and merging such a contribution.

To discuss maintenance of this site, please come talk to the team in
[#matrix.org-website:matrix.org](https://matrix.to/#/#matrix.org-website:matrix.org).

## Building the website

Install the latest version of [Zola](https://www.getzola.org), clone the repo, and from the root of the
repo type

```bash
zola serve
```

Zola will build the website and start a web server, usually at
<http://127.0.0.1:1111>

## Running the markdown linter

We are running the <https://github.com/DavidAnson/markdownlint-cli2>2> markdown linter on the website.
To run it locally, you can use the following command:

```bash
npx markdownlint-cli2 --fix "**/*.md"
```

This is based on <https://github.com/DavidAnson/markdownlint> and can also be used as a [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
