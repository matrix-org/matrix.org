## Development

This website is built on top of Zola 0.16.1. To test the website, go to the root
of the project and use `zola serve` to build the website and serve it on
`127.0.0.1:1111`.

## Migration

### Blog posts

The blog posts can be migrated from the gatsby format to Zola by using the
utility at https://github.com/jplatte/matrix-blog-migrate

This binary only migrates _one_ article at a time.

### Projects migrations

TODO how to migrate data

- [ ] From [`gatsby/content/projects/bots`](https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects/bots)
        to [`content/ecosystem/bots`](https://github.com/matrix-org/matrix.org/tree/zola/content/ecosystem/bots)
- [ ] From [`gatsby/content/projects/bridges`](https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects/bridges)
        to [`content/ecosystem/bridges`](https://github.com/matrix-org/matrix.org/tree/zola/content/ecosystem/bridges)
- [ ] From [`gatsby/content/projects/clients`](https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects/clients)
        to [`content/ecosystem/clients`](https://github.com/matrix-org/matrix.org/tree/zola/content/ecosystem/clients)
- [ ] From [`gatsby/content/projects/sdks`](https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects/sdks)
        to [`content/ecosystem/sdks`](https://github.com/matrix-org/matrix.org/tree/zola/content/ecosystem/sdks)
- [x] From [`gatsby/content/projects/servers`](https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects/servers)
        to [`content/ecosystem/servers`](https://github.com/matrix-org/matrix.org/tree/zola/content/ecosystem/servers)

Probably drop entirely:

- [`gatsby/content/projects/iot`](https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects/iot)
- [`gatsby/content/projects/other`](https://github.com/matrix-org/matrix.org/tree/master/gatsby/content/projects/other)
