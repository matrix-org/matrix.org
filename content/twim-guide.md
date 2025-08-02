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

We collect submissions with help of the [TWIM bot](https://github.com/haecker-felix/hebbot)
`@this-week-in:matrix.org`, who will confirm having received your entry if everything went well.

The digest gets published on Friday evening, so make sure to post your submission before
entries close around 17:00 Paris time.

Images and other media are supported as well. To add them you should react with
`⭕` on your media file. Please make sure to do this right after submitting your text so it gets added
to the correct entry and not to another project of yours.

{% notice_box() %}
At times, sending media to Matrix rooms moderated by the Matrix Foundation may be prohibited
for moderation reasons. If this is the case, please reach out to the TWIM editors via chat.
{% end %}

By submitting content to TWIM, you agree to publishing it under the [matrix.org website's
licenses](https://github.com/matrix-org/matrix.org/blob/main/LICENSE.md).
Videos will be uploaded to the [Matrixdotorg](https://www.youtube.com/@Matrixdotorg) YouTube channel.

## How to Write a Good Entry

Writing a good entry can be challenging. Below are some recommendations
to help the editors by lowering their workload when publishing the post.

### Submitting Multiple Entries

If you want to share news about more than one project, please submit individual entries, one for each project.
This allows us to sort and categorise your entries appropriately, since this is done on a
per-message basis.

### Editing an Entry

Matrix supports editing messages, and our TWIM bot also supports reading them.

If you need to change something in your entry, the simplest way is usually to edit it
through your Matrix client.
If for some reason that does not work for you, deleting the previous entry and submitting
a new one works just as well.

### Markdown

The bot expects Markdown as part of the plaintext event body. Please use a client which
sends the Markdown formatted text in the "plaintext" body. While we currently accept other formats as well,
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

We recommend `H3` (`###` in Markdown) for the project title and `H4` (`####`in Markdown)
for all titles below it. This way there is only minor human interaction necessary or none
at all. Like [Contact Info and Source Link](#contact-info-and-source-link), the bot adds
your project's title automatically when it knows your project.

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

This is unnecessary if you are using a Markdown link with text, such as:
`You can find our guidelines [here](https://matrix.org/twim-guide/).`.

## Reactions and Adding a Project to the Bot

For regular projects, the bot can, in addition to emoji reactions, also recognise projects.
This helps, because there will be a short project description as well as a link to the project
at the start of the entry.

To add your project to this list please head over to
[the configuration file](https://github.com/matrix-org/twim-config/blob/master/charts/files/config.toml)
which holds this information. Please be aware that it may take some time for changes
to get reflected in the room.

You can tell that the TWIM editors are using your project's configuration by checking the
text reactions on your submissions.
When text reactions are used, the bot will add boilerplate including project title header,
description, and link automatically, and you can drop it from your submission so the editors
don't have to remove duplicate titles.

You can also take a look at the same configuration file to see which reaction has
which meaning. It can help us to choose the correct category for your project.
However, note that ultimately the TWIM editors are the ones deciding
on the category for a project.

## Appendix: The TWIM-Process

{% notice_box() %}
This section documents the process "behind the scenes" for anyone interested.
Reading the above info is sufficient to ensure writing a great TWIM entry.
Please approach the [Website and Content Working Group](https://matrix.to/#/#matrix.org-website:matrix.org)
with any questions or ideas about TWIM and its process.
{% end %}

This Week in Matrix is part of the outreach programme of the Matrix Foundation.

The Matrix Foundation hosts the [TWIM Matrix room](https://matrix.to/#/#twim:matrix.org) for the purpose of
communicating with the wider ecosystem and allowing everyone to announce Matrix-related news to be published
in the weekly digest.

TWIM is compiled, edited, and published by the [Website and Content Working Group](/foundation/working-groups).
To ensure enough bandwidth for regular publications, Foundation staff is part of this group.
The current members of this team are based in Europe, hence most of the work happens during
European working hours (i.e. CE(S)T "Paris time").

The team is aided by the aforementioned TWIM helper bot, a [Hebbot](https://github.com/haecker-felix/hebbot)
instance configured via the [twim-config](https://github.com/matrix-org/twim-config) repository
and deployed with the help of the Foundation's SRE team.
It uses the Matrix account `@this-week-in:matrix.org`.

With few exceptions, such as the Christmas holiday season, or during Conferences,
TWIM is published every Friday by the following process.

The Website and Content WG usually internally determines the editor for the week ahead of time
in order to ensure there will be a TWIM during any given week, even considering holidays etc.
They also determine a reviewer, who ideally is also a member of the Working Group, since a review from
someone with commit access is needed to merge to the matrix.org website Git repository.

On Friday morning, the editor for the week announces via `@room` ping to the TWIM room
that TWIM will be published that day, reminding readers of this guide and the submission deadline.
While submissions are open 24/7 and this deadline only determines whether an announcement
goes into this or the next edition, we have found that reminding teams in time to report news
fits their workflow, and regular bleeding edge progress updates help making the Matrix
ecosystem lively.

Over the course of the day (and the week), the editor watches submissions as they are sent
and categorises them using emoji or in case of frequent projects even text labels as defined in the
[twim-config](https://github.com/matrix-org/twim-config).
The other editors (also defined in the twim-config) may help out with this.

The editors also try to keep an eye on submissions being properly picked up by the TWIM bot ([see above](#publishing)).

Sometimes, the TWIM editors may be aware of a team having news to share, such as very regular submissions
like the weekly spec update from the Spec Core Team, or giving a shout-out to another publication.
When this submission has not happened yet as the submission deadline draws near, the editors might remind
the respective teams of their news.
Similarly, a submitter may sometimes have (publicly or privately) asked the editors to extend the submission
deadline so they can finish writing their entry.
Whether such a request is granted depends entirely on the editor and their circumstances.

The regular deadline is 17:00 CE(S)T "Paris time" and submitting in time will ensure your news get
included in the blog if you have followed the above steps successfully.
If you operate in a time zone that makes it difficult to keep to this time frame on the same day,
if may thus be advisable to share your news on the preceding (European) day.
Sometimes life happens and the editors have to announce an earlier deadline on a best effort basis,
but this is extremely rare.
Usually, submissions will close at or shortly after 17:00.
It is possible depending on the circumstances of the editor that submissions also remain open for a while longer.
Whichever is the case, the editor will announce the fact that submissions have been closed via
impersonating the TWIM bot.

After closing the entries, the editor does a last manual best-effort check if all submissions have
been collected by the bot and assigned the right project or category, fixing any stragglers.
Finally, the editor `!render`s the bot's digest to Markdown and adds it to a feature branch of
the website repository to finish it up:
- configure the right `path` in the metadata
- add Matrix Live video embed and title
- poll the ping stats and include them in the post
- add any images to the repo and write `alt` text for accessibility
- upload any videos to YouTube and embed them in the post
- verify Markdown correctness regarding e.g. headings, links

The blog post is pushed to a new pull request on the matrix.org website repository and a review requested
from the week's assigned reviewer.
The repository's contribution guidelines apply.
In parallel to the human review, the website CI also runs an automatic review to help spot
spelling mistakes, Markdown errors, and the like.
The CI also builds and posts a preview of the website which can be used by reviewers to verify the result.

Once everything looks good, the pull request is merged.
While the CI builds and publishes the post on the website, the editor comes up with a 1-2 line teaser summary
of the digest's contents, mentioning the most interesting or significant changes.
They also consider factors such as time sensitivity of news (e.g. security updates) and repetitiveness
(e.g. naming different projects week-to-week).
After the website updated and everything looks good, the editor posts the summary and link to the TWIM room
using a `@room` ping, as well as to social media.
After some minutes have passed, the editor checks that the RSS bot announced it also to
the [Matrix News](https://matrix.to/#/#matrix-news:matrix.org) room, or does so manually if not.

Finally, the editor `!clear`s the now published entries from the TWIM bot, making sure to re-add any
submissions that arrived in the meantime using the `⭕` reaction.
