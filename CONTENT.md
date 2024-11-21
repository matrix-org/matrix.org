# How Content works on matrix.org

The matrix.org website is powered by [Zola](https://www.getzola.org/), a [static site generator](https://en.wikipedia.org/wiki/Static_site_generator). It ingests content in rather human-friendly formats, and turns it into the beautiful matrix.org website we all love. The format you need to use depends on the type of content you want to add.

This documentation is about helping you create new content that the static site generator will accept. To get your content actually deploy on matrix.org, you need to be familiar with git, GitHub and Pull Requests. If that's not the case, we suggest either finding someone who is and can help, or dropping us a line in the [Matrix.org Website chat room](https://matrix.to/#/#matrix.org-website:matrix.org).

## Publishing to the blog

Articles on the blog are written in the markdown format. Markdown should generally be the same everywhere, but there are small variations around what you can or can't do with it. Zola supports the [CommonMark variant](https://commonmark.org/help/) of Markdown. Note that Zola's Markdown parser is pedantic about links and requires to use `<>` around a link without title.

All the blog posts are sorted in directories. They live in `/content/blog/YEAR/MONTH/`, with `YEAR` and `MONTH` being the year and month in digit format, e.g. [`/content/blog/2024/01/`](https://github.com/matrix-org/matrix.org/tree/main/content/blog/2024/01).

One surprising bit about Zola is that both the `YEAR` (e.g. `2024`) and `MONTH` (e.g. `01`) need to have a `_index.md` with the following content to be rendered by the generator:

```markdown
+++
transparent = true
render = false
+++

```

Once this structure is in place, you need to write the actual blog post. It is a single text file ending with the `.md` extension. There are two sections in the file: a _frontmatter_ containing all the metadata (e.g. title of the post, date of publication, author, section), and the content itself.

In the frontmatter, make sure to format the date as `year-month-day` (e.g. `2024-01-22`) then append `T` to specify the time as `hour:minute:seconds` (e.g. `12:30:00`) and add a final `Z` to specify that the time is on the UTC time zone. We use UTC to make it easier for humans to figure out which blog post is going to be published first if two blog posts are issued on the same day.

You can use the following template to create a new blog post:

```markdown
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

It is possible to add pictures to your posts in markdown. First you need to drop the pictures in [`/static/blog/img`](https://github.com/matrix-org/matrix.org/tree/main/static/blog/img). Then, in the markdown file itself add the following lines

```jinja
{{ figure(
    img="/blog/img/your-picture-name.avif"
    caption="A description of the picture")
}}
```

This so called shortcode ensures that images have a consistent look across posts.

We prefer using avif or webp files when possible. However if this is not an option we also accept PNG files provided they are reasonable sized and the file size is appropriate for web usage.

### Embedding a YouTube player

Embedding the YouTube Player loads cookies from youtube.com. This is fairly invasive in terms of privacy, and breaches the GDPR since we don't have a cookie banner to get visitor's consent to do so.

Whenever you want to add a YouTube video to a blog post, go to YouTube to view the video. The URL should look like `https://www.youtube.com/watch?v=S1nBXjWWHoU` at the minimum, and can look a bit more complex like `https://www.youtube.com/watch?v=S1nBXjWWHoU&list=PLl5dnxRMP1hWycy97GpncT3G3KaFn1MI6&index=2`.

Copy the series of characters after the `v=` and before the first `&` that you meet in the URL. In our example, that is `S1nBXjWWHoU`. This is the id of the video on YouTube.

In your markdown file, add this line to embed the YouTube player in a way that respects the user consent.

```jinja
{{ youtube_player(video_id="S1nBXjWWHoU") }}
```
### Adding a picture for the socials

You know the cool previews that are generated on socials (Mastodon, LinkedIn, and others) when you paste a link? Matrix.org supports them! By default if you don't specify any, it is going to use [this placeholder](https://github.com/matrix-org/matrix.org/blob/main/static/blog/img/matrix-logo.png) image.

If you want to add your own, drop it in the PNG format in [`/static/blog/img`](https://github.com/matrix-org/matrix.org/tree/main/static/blog/img), and add the following lines to your frontmatter (between the two rows of `+++`):

```toml
[extra]
image = "https://matrix.org/blog/img/YOUR-IMAGE.png"
```

_Due to restrictions on the third-party consumers it is mandatory that we use PNG files here_

## Adding new projects to the ecosystem

All of the ecosystem projects information are in subdirectories of [`/content/ecosystem`](https://github.com/matrix-org/matrix.org/tree/main/content/ecosystem/).

### Clients

Matrix clients are listed in [`/content/ecosystem/clients`](https://github.com/matrix-org/matrix.org/tree/main/content/ecosystem/clients). Every client has its individual page, so every client is represented by a markdown file. Most of the information is living in the _frontmatter_, between the two `+++` rows in a `.md` file.

To add a client, add your client's logo (ideally in SVG format) as `your-client-name.svg` and a markdown file as `your-client-name.md` file (no space allowed in the file name) under [`/content/ecosystem/clients`](https://github.com/matrix-org/matrix.org/tree/main/content/ecosystem/clients) and fill it with the following template:

```markdown
+++
title = "My client name"
template = "ecosystem/client.html"
[extra]
thumbnail = "your-client-name.svg"
maintainer = "Your name or organisation"
maturity = "PICK ONE Stable OR Beta OR Alpha OR Obsolete"
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
	- In case your option is not available please let us know by opening an issue.

### Bridges

The Matrix Bridges are listed in [`/content/ecosystem/bridges`](https://github.com/matrix-org/matrix.org/tree/main/content/ecosystem/bridges). Inside of the folder you will find a folder for each third-party network. Within each network you can find a `bridges.toml` file which contains the information about individual bridges for the third-party network.

To add a bridge, add the following template to the `bridges.toml` for the respective third-party network:

```toml
[[bridges]]
name = "My bridge name"
maintainer = "Your name or organisation"
summary = """
A short description about your bridge
"""

maturity = "PICK ONE Stable OR Beta OR Alpha OR Obsolete"
language = "PICK ONE (please check for existing languages to avoid using different names)"
license = "PICK ONE"
docs = "https://docs.mybridge.example.com"
repo = "https://github.com/example-org/example-repo"
room = "#your-matrix-room:example.com"
featured = false # Keep this as false. This will be handled by the repo maintainers
privilege.platform = "User" # Who can use/add the bridge on the third-party platform
privilege.matrix = "Homeserver Admin" # Any of Homeserver Admin, Room Admin, None

# This can vary based on the network. Use Matrix terms here. When in doubt stick to this list.
[bridges.supports]
dm = true
groups = true
message_media = true
mentions = true
redactions = true
reactions = true
typing_notifications = true
read_receipts = true
```

### Servers

Matrix Servers are listed in [`/content/ecosystem/servers/servers.toml`](https://github.com/matrix-org/matrix.org/blob/main/content/ecosystem/servers/servers.toml). Each entry is a new section in this toml file.

To add a server, add the following template to the end of the `servers.toml` and edit it according to your server

```toml
[[servers]]
name = "My Matrix Server"
description = "A Matrix server which can only reply status code 418"
author = "Your name or organisation"
maturity = "PICK ONE Stable OR Beta OR Alpha OR Obsolete"
language = "The programminglanguage of your server. For example 'Python'"
licence = "An spdx license code"
repository = "https://github.com/example-org/example-repo"
room = "#your-matrix-room:example.com"
```

### Integrations

Matrix integrations are listed in [`/content/ecosystem/integrations/integrations.toml`](https://github.com/matrix-org/matrix.org/blob/main/content/ecosystem/integrations/integrations.toml). A Matrix Integration can be for example a utility TUI but also Matrix Bots. Please see the description on the website itself to get a better feeling on the definition of Matrix Integrations.

To add an integration, add the following template to the end of the `integrations.toml` and edit the fields according to your integration

```toml
[[integrations]]
name = "My Matrix Integration"
description = "A brief description on which things it is able to do."
author = "Your name or organisation"
language = "The programminglanguage of your server. For example 'Python'"
licence = "An spdx license code"
repository = "https://github.com/example-org/example-repo"
room = "#your-matrix-room:example.com"
```

_Note that this section is due to further figuring out. See also <https://github.com/matrix-org/matrix.org/issues/1858>_

### SDKs

SDKs for Matrix can be found inside [`/content/ecosystem/sdks/sdks.toml`](https://github.com/matrix-org/matrix.org/blob/main/content/ecosystem/sdks/sdks.toml).

To add an sdk please use this template and append it to the `sdks.toml`:

```toml
[[sdks]]
name = "My Matrix SDK"
maintainer = "Your name or organisation"
maturity = "PICK ONE Stable OR Beta OR Alpha OR Obsolete"
language = "The programminglanguage of your server. For example 'Python'"
licence = "An spdx license code"
repository = "github.com/example-org/example-repo"
# In which type of application this SDK is meant to get used. This should be an array.
# Possible values are "bridge", "bot", "client"
purpose = ["bot", "bridge"]
description = """
A short description about the SDK.
"""
```

### Hosting providers

Hosting provders are listed in [`/content/ecosystem/hosting/providers.toml`](https://github.com/matrix-org/matrix.org/blob/main/content/ecosystem/hosting/providers.toml). It lists providers which provide Matrix components like servers or bots to customers. We require this section to only contain providers that do the actual hosting. Providers which either provide a setup script or only provide selfhosting should go into the in the future existing Distributions section instead.

To add a hosting provider entry, add the following template to the `providers.toml`. Logos should be placed next to the the toml file. A logo should be in the SVG format. However if this is not available a PNG is acceptable provided it has sufficient resolution while also having reasonable filesize.

```toml
[[providers]]
name = "The provider's name"
image = "logo.svg"
website = "https://example.com"
operating_since = "2018"
description = """
What the service provides and any noteworthy limitations or features.
It should NOT contain blatent marketing text. We hold the right to ask for rewording it or reject it.
"""
``` 

## Adding documentation

Matrix.org provides a place to have documentation. Documentation is required to be on topic of the Matrix Protocol itself or how to get started using the protocol.

We currently split the Documentation into these types:

- Onboarding Documentation - Documentation for first time users
- Community Documenation - Documentation which we consider is helpful to run a good community using Matrix tools. This can include guideance on things like moderation or how Matrix features benefit Communities.
- Technical Documentation - Documentation that help people understanding to Matrix Protocol. This can range from a rough outline on how Matrix functions to guides on things like state resolution.

Additionally to creating a documenation there comes a responsibility to the author. We require authors of a documentation page to be reachable or delegate a new contact point if they cant maintain it any further. We will tr at least once per year to reach out to an author to verify a documenation is still accurate. This may happen more often when we notice ourself that the documentation is likely stale. If there hasn't been a reply in a reasonable timeframe we hold the right to archive a documenation page without further warning as we cannot verify all documentation on a technical level. Therefor we rather list up to date maintained documentation rather than possibly stale documentation. These archived documentations can then be found at the [Older Documentation Section](https://matrix.org/docs/older/#all-past-documentation).

## Adding sponsors

