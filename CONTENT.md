The matrix.org website is powered by [Zola](https://www.getzola.org/), a [static site generator](https://en.wikipedia.org/wiki/Static_site_generator). It ingests content in rather human-friendly formats, and turns it into the beautiful matrix.org website we all love. The format you need to use depends on the type of content you want to add.

This documentation is about helping you create new content that the static site generator will accept. To get your content actually deploy on matrix.org, you need to be familiar with git, GitHub and Pull Requests. If that's not the case, we suggest either finding someone who is and can help, or dropping us a line in the [Matrix.org Website chat room](https://matrix.to/#/#matrix.org-website:matrix.org).

## Publishing to the blog

Articles on the blog are written in the markdown format. Markdown should generally be the same everywhere, but there are small variations around what you can or can't do with it. Zola supports the [CommonMark variant](https://commonmark.org/help/) of Markdown.

All the blog posts are sorted in directories. They live in `/content/blog/YEAR/MONTH/`, with `YEAR` and `MONTH` being the year and month in digit format, e.g. [`/content/blog/2024/01/`](https://github.com/matrix-org/matrix.org/tree/main/content/blog/2024/01).

One surprising bit about Zola is that both the `YEAR` (e.g. `2024`) and `MONTH` (e.g. `01`) need to have a `_index.md` with the following content to be rendered by the generator:

```
+++
transparent = true
render = false
+++

```

Once this structure is in place, you need to write the actual blog post. It is a single text file ending with the `.md` extension. There are two sections in the file: a _frontmatter_ containing all the metadata (e.g. title of the post, date of publication, author, section), and the content itself.

In the frontmatter, make sure to format the date as `year-month-day` (e.g. `2024-01-22`) then append `T` to specify the time as `hour:minute:seconds` (e.g. `12:30:00`) and add a final `Z` to specify that the time is on the UTC time zone. We use UTC to make it easier for humans to figure out which blog post is going to be published first if two blog posts are issued on the same day.

You can use the following template to create a new blog post:

```
+++
date = "2024-01-22T12:30:00Z"
title = "Exciting news from the Foundation!"

[taxonomies]
author = ["Jane Smith", "John Doe"]
category = ["Foundation"]
+++

## Matrix is taking over the world

We're excited to announce that our plan to conquer the world worked. We are everywhere, and people seem to be happy about it!

## Our positive impact

We are privacy-centric and don't want to track people individually, but we want to make sure we still have a positive impact. In our apps, we allow people to express their frustration whenever something doesn't work.
```

### Adding a picture for the socials

You know the cool previews that are generated on socials (Mastodon, LinkedIn, and others) when you paste a link? Matrix.org supports them! By default if you don't specify any, it is going to use [this placeholder](https://github.com/matrix-org/matrix.org/blob/main/static/blog/img/matrix-logo.png) image.

If you want to add your own, drop it in the PNG format in [`/static/blog/img`](https://github.com/matrix-org/matrix.org/tree/main/static/blog/img), and add the following lines to your frontmatter (between the two rows of `+++`):

```
[extra]
image = "https://matrix.org/blog/img/YOUR-IMAGE.png"
```
