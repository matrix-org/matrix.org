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

### Adding pictures in your post

It is possible to add pictures to your posts in markdown. First you need to drop the pictures in [`/static/blog/img`](https://github.com/matrix-org/matrix.org/tree/main/static/blog/img). Then, in the markdown file itself add the following line

```
![A description of the picture](/blog/img/your-picture-name.png)
```

### Embedding a YouTube player

Embedding the YouTube Player loads cookies from youtube.com. This is fairly invasive in terms of privacy, and breaches the GDPR since we don't have a cookie banner to get visitor's consent to do so.

Whenever you want to add a YouTube video to a blog post, go to YouTube to view the video. The URL should look like `https://www.youtube.com/watch?v=S1nBXjWWHoU` at the minimum, and can look a bit more complex like `https://www.youtube.com/watch?v=S1nBXjWWHoU&list=PLl5dnxRMP1hWycy97GpncT3G3KaFn1MI6&index=2`.

Copy the series of characters after the `v=` and before the first `&` that you meet in the URL. In our example, that is `S1nBXjWWHoU`. This is the id of the video on YouTube.

In your markdown file, add this line to embed the YouTube player in a way that respects the user consent.

```
{{ youtube_player(video_id="S1nBXjWWHoU") }}
```
### Adding a picture for the socials

You know the cool previews that are generated on socials (Mastodon, LinkedIn, and others) when you paste a link? Matrix.org supports them! By default if you don't specify any, it is going to use [this placeholder](https://github.com/matrix-org/matrix.org/blob/main/static/blog/img/matrix-logo.png) image.

If you want to add your own, drop it in the PNG format in [`/static/blog/img`](https://github.com/matrix-org/matrix.org/tree/main/static/blog/img), and add the following lines to your frontmatter (between the two rows of `+++`):

```
[extra]
image = "https://matrix.org/blog/img/YOUR-IMAGE.png"
```

## Adding new projects to the ecosystem

All of the ecosystem projects information are in subdirectories of [`/content/ecosystem`](https://github.com/matrix-org/matrix.org/tree/main/content/ecosystem/).

### Clients

Matrix clients are listed in [`/content/ecosystem/clients`](https://github.com/matrix-org/matrix.org/tree/main/content/ecosystem/clients). Every client has its individual page, so every client is represented by a markdown file. Most of the information is living in the _frontmatter_, between the two `+++` rows in a `.md` file.

To add a client, add your client's logo (ideally in SVG format) as `your-client-name.svg` and a markdown file as `your-client-name.md` file (no space allowed in the file name) under [`/content/ecosystem/clients`](https://github.com/matrix-org/matrix.org/tree/main/content/ecosystem/clients) and fill it with the following template:

```
+++
title = "My client name"
template = "ecosystem/client.html"
[extra]
thumbnail = "your-client-name.svg"
maintainer = "Your name or organisation"
maturity = "PICK ONE" Stable OR Beta OR Alpha OR Obsolete"
repo = "https://github.com/example-org/example-repo"
matrix_room = "#your-matrix-room:example.com"
licence = "PICK ONE"
latest_release = "2022-11-02"
featured = false

[extra.features]
e2ee = false
spaces = false
voip_1to1 = false
voip_jitsi = false
threads = false
sso = false
multi_account = false
multi_language = false

[extra.packages]
windows_installer = "https://example.com/download"
macos_installer = "https://example.com/download"
google_play_store.app_id = "com.example.app"
f_droid.app_id = "com.example.app"
apple_app_store = { app_id = "id1234567890", org = "example" }
flathub.app_id = "com.example.app"
webapp = "https://chat.example.com"
+++

Supercharge your communications with Example Client.
```

- For the `maturity`, please pick one of
	- `Stable` if your software has been running in production for a little while and if you are confident in the sustainability of the project
	- `Beta` if there are rough edges but people won't lose any data
	- `Alpha` if your software is still experimental
	- `Obsolete` if your software is no longer maintained
- `featured` should be left to false. We are working on [processes to formalise which project should be featured or not](https://github.com/matrix-org/matrix.org/issues/1584).
- For the `licence`, please use [one of the identifiers listed by the SPDX](https://spdx.org/licenses/)
- All of the properties under `extra.packages` are optional: only add the installation methods your project supports!
### Bridges

### Servers

### Integrations

### SDKs

### Hosting providers

## Adding documentation

## Adding sponsors

