# Matrix.org Website

If you want to contribute to the website, make sure the problem you're trying to
fix or the feature you want to implement has been discussed in our issue tracker
and that we are interested in reviewing and merging such a contribution.

To discuss maintenance of this site, please come talk to the team in
[#matrix.org-website:matrix.org](https://matrix.to/#/#matrix.org-website:matrix.org).

## Cloning the Repository

Due to historic growth and media the repository is quite large. Therefor we suggest the usage of `--filter=blob:none` when doing a fresh clone:

```
git clone --filter=blob:none git@github.com:matrix-org/matrix.org.git
```

This allows to only fetch the actually needed things from the git repository instead of all of the (at the time of writing) 1.18GiB of data.
With this command at the time of writing this reduces the downloaded data to just 612MiB.

For more information on this please check out these 2 articles which also explain why `--depth=1` is not ideal and which implications this has:

- https://github.blog/open-source/git/get-up-to-speed-with-partial-clone-and-shallow-clone/
- https://nayak.io/posts/git-clone-optimizations/

## Building the website

Install the latest version of [Zola](https://www.getzola.org), clone the repo, and from the root of the
repo type

```
zola serve
```

Zola will build the website and start a web server, usually at
http://127.0.0.1:1111

