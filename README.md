# Matrix Projects

To discuss maintenance of this site, please come talk to the team in [#matrix.org-website:matrix.org](https://matrix.to/#/#matrix.org-website:matrix.org).

We are using [jekyll](https://jekyllrb.com/) to generate the [try matrix now](https://matrix.org/docs/projects/try-matrix-now.html) page and the project pages.

The sources for these pages are in the
[jekyll/_posts/projects](./jekyll/_posts/projects) directory. Feel free to send
us a PR to add or update a project entry. You can start with the
[template](./jekyll/_posts/projects/template.md), and you can upload a thumbnail and/or a main picture
to the [images](./jekyll/_posts/projects/images/) subfolder - these will be accessible from
https://matrix.org/docs/projects/images/

Jekyll requires a date in the project filename; we use the date to sort the various project lists (oldest projects first). Please submit new entries with the starting date of the project.

### How to build

```
cd jekyll
bundle install
bundle exec jekyll serve
```

Now you can visit the page you want to work on in the browser. For example: http://127.0.0.1:4000/docs/projects/try-matrix-now.html or http://127.0.0.1:4000/docs/guides/
