# Implementation Guides

These guides are for developers who are creating new clients, servers, etc and
are meant to explain how best to use and implement the APIs from the spec, and
give advice on various approaches and pit falls.


## Building the books

The books are built using the [mdbook](https://rust-lang.github.io/mdBook/)
tool.

The source of the books are in `src/` with each page being a markdown file. To
create a new page edit `SUMMARY.md` pointing to the new markdown file (you can
also run `mdbook build` after adding new pages to `SUMMARY.md` and the files
will be created for you).

The folder `theme/` includes the templates and resources used to build the
books.
