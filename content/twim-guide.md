+++
title = "Writing a good \"This Week in Matrix\" entry"
+++

This week in Matrix, which usually gets called TWIM, is a concept of posting
small but precise project updates. Those updates are collected in a digest, published every Friday on
the [matrix.org blog](/blog/twim). It aims to allow the community to show off their
progress in the Matrix ecosystem.

## Prerequisites

There are some guidelines you should be aware of before publishing your
update to TWIM:

Like all things on matrix.org your post has to follow and comply with the
[Matrix.org Code of Conduct](/legal/code-of-conduct). Additionally the authors
can decline entries related to dangerous or unethical software.

## Publishing

For publishing to TWIM all you need is a Matrix account and participate in the
[#thisweekinmatrix:matrix.org](https://matrix.to/#/#thisweekinmatrix:matrix.org)
Matrix room.

After joining you should start your post with a mention of the user "TWIM".
Easiest to do this is to use your client's mention completion feature.
After that mention everything contained in the message will be part of the entry.
If you want to post more than one project please split each into individual entries.

Images and other media are supported as well. To add them you should react with
`⭕` on your media file. Please make sure to do this after your entry so it gets added
to the correct entry and not on another project of yours.

## How to make it a good entry

Making a good entry can have some challenges. Below are some recommendations
to help the authors to lower their workload when publishing the post.

### Markdown

The bot expected markdown as part of the plaintext event body. Please use a client which
does send the plaintext as markdown. While we currently accept other formats as well
it will add manual work for the post by a human.

### Do not treat it as a Changelog

Copying a Changelog is easy but not what TWIM is about. Ideally we prefer posts
which are a few paragraphs long outlining features which were added or changed
over a bulletpoint list. This makes it more readable to humans. You may still of course
link to the changelog.

### Add images or videos

Adding images or a demo to your post can help explaining the feature to other people.
It also can help getting people interested in your project.

### Contact info and Source link

Many times people will ask about things published in TWIM. Often times people will
use the TWIM Matrix room itself to do that. However often time it would have been a better
choice to instead ask inside of a project room where the devs are present.

### Correct usage of Headers

As the [TWIM helper bot](https://github.com/haecker-felix/hebbot) takes messages
as verbatism it is helpful to the authors to use the right header level.

We recommend `H3` (`###` in markdown) for the project title and `H4` (`####`in markdown)
for all titles below it. This way there is only minor human interaction necessary or none
at all.

Additionally please do not use headers for links but instead use bold links if you
want to highlight the links.

### Correct linking

Due to the static site generator matrix.org is using we require bare links to be
surrounded by `<>`. Most matrix clients dont do this. If you are able to add those around
links it would help us.

## Reactions and adding a project to the bot

For regular projects the bot can additionally to emoji reactions also recognise projects.
This helps because there will be a short project description as well as a link to the project
at the start of the entry.

To add your project to this list please head over to [the configuration file](https://github.com/matrix-org/twim-config/blob/master/charts/files/config.toml)
which holds this information. Please be aware that it may take some time for changes
to get reflected in the room.

You can also take a look at the same configuration file to see which reaction has
which meaning. It can help us to also choose the correct category for your project.
However note that ultimately the TWIM authors are the ones deciding
on the category for a project.
