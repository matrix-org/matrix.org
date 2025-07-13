+++
title = "Writing a good \"This Week in Matrix\" entry"
+++

This Week in Matrix (TWIM) is a weekly digest on the blog in which
anyone can post small concise updates about their Matrix projects, events
and happenings.
Those updates are collected through the Matrix room
[#thisweekin:matrix.org](https://matrix.to/#/#thisweekin:matrix.org)
and published every Friday on the [matrix.org blog](/category/this-week-in-matrix/).
It aims to allow the community to show off their work in the Matrix ecosystem.

## Prerequisites

There are some guidelines you should be aware of before publishing your
update to TWIM:

Like all things on matrix.org, your post has to follow and comply with the
[Matrix.org Code of Conduct](/legal/code-of-conduct). Additionally, the editors
can decline entries related to dangerous or unethical software.

## Publishing

For publishing to TWIM all you need is a Matrix account and [participate](/docs/chat_basics/public-rooms/#joining-a-specific-room)
in the [#thisweekin:matrix.org](https://matrix.to/#/#thisweekin:matrix.org) Matrix room.

After joining you should start your post with a mention of the user "TWIM".
The easiest way to do this is to use your client's mention completion feature.
After that mention, everything contained in the message will be part of the entry.

Images and other media are supported as well. To add them you should react with
`⭕` on your media file. Please make sure to do this right after submitting your text so it gets added
to the correct entry and not to another project of yours.

## How to Write a Good Entry

Writing a good entry can be challenging. Below are some recommendations
to help the editors by lowering their workload when publishing the post.

### Submitting Multiple Entries

If you want to share news about more than one project, please submit individial entries, one for each project.
This allows us to sort and categorise your entries appropriately, since this is done on a
per-message basis.

### Editing an Entry

Matrix supports editing messages, and our TWIM bot also supports reading them.

If you need to change something in your entry, the simplest way is usually to edit it
through your Matrix client.
If for some reason that does not work for you, deleting the previous entry and submitting
a new one works just as well.

### Markdown

The bot expects markdown as part of the plaintext event body. Please use a client which
sends the markdown formatted text in the "plaintext" body. While we currently accept other formats as well,
it will add manual work for a human to format the post.

### Do Not Treat TWIM as a Changelog

Copying a changelog is easy but not what TWIM is about. Ideally, we prefer posts
which are a few paragraphs long outlining some highlights
over a long detailed list. This makes your announcement more readable to humans.
You may of course still link to the changelog.

### Add Images or Videos

A picture says more than a thousand words.
Adding images or a demo to your post can help explaining the feature to other people.
It also can help getting people interested in your project.

### Contact Info and Source Link

Many times people will ask about things published in TWIM. Often times people will
use the TWIM Matrix room itself to do that. However, often time it would have been a better
choice to instead ask inside of a project room where the devs are present.
Therefore, linking to all the relevant places is definitely encouraged!
If your project appears frequently on TWIM, consider to
[add it to the bot](#reactions-and-adding-a-project-to-the-bot),
so all the boilerplate can get added to your post automatically.

### Correct Usage of Headers

As the [TWIM helper bot](https://github.com/haecker-felix/hebbot) takes messages
as verbatim, it is helpful to the editors to use the right header level.

We recommend `H3` (`###` in markdown) for the project title and `H4` (`####`in markdown)
for all titles below it. This way there is only minor human interaction necessary or none
at all.

Additionally please do not use headers for links but instead use bold links if you
want to highlight the links.

### Correct Linking

The static site generator that matrix.org is using uses CommonMark for content,
and requires bare links to be surrounded by angled brackets to produce
[autolinks](https://spec.commonmark.org/0.31.2/#autolinks). For example:
`Take a look at the TWIM entry guidelines <https://matrix.org/twim-guide/>`.
Most matrix clients will not automatically emit the CommonMark the site
generator expects for these links. If you are able to add them around your links,
it will help us in making sure your links will be clickable on the blog.

This is unnecessary if you are using a markdown link with text, such as:
`You can find our guidelines [here](https://matrix.org/twim-guide/).`.

## Reactions and Adding a Project to the Bot

For regular projects, the bot can, in addition to emoji reactions, also recognise projects.
This helps, because there will be a short project description as well as a link to the project
at the start of the entry.

To add your project to this list please head over to
[the configuration file](https://github.com/matrix-org/twim-config/blob/master/charts/files/config.toml)
which holds this information. Please be aware that it may take some time for changes
to get reflected in the room.

You can also take a look at the same configuration file to see which reaction has
which meaning. It can help us to choose the correct category for your project.
However, note that ultimately the TWIM editors are the ones deciding
on the category for a project.
