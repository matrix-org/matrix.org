+++
title = "Public Rooms"
weight = 300
template = "docs/with_menu.html"
[extra]
emoji = "🌐"
tile = "I want to join public conversations"
updated = "2022-10-18T16:00:00Z"
meta_description = """
Matrix is often use for public online discussions. Being an interoperable
protocol, it allows people using different providers to talk together online,
safely.
"""
+++

When you want to join larger public conversations, you have three major options
at hand:

1. Joining a specific room from its address / alias or from a `matrix.to` link
2. Browsing a public directory to find rooms of interest
3. Joining a room that was listed in a Space

## Joining a specific room

Someone might have shared a link that starts with `matrix.to` with you, or you
might have stumbled upon it on a website. Those links will bring you to the
public conversation you tried to join after asking you what client you want to
use.

Clicking a `matrix.to` link you will open a new tab in your browser, showing you
a UI that looks like the following.

<!-- markdownlint-disable-next-line no-alt-text -->
![](matrixto-HS.png)

Click on accept, and you will be redirected to a preview of the room you're
trying to join, containing its name, address (on the format
`#room-name:example.com`), and number of people currently in the room. Below
this preview is a list of clients you can use to join the room.

<!-- markdownlint-disable-next-line no-alt-text -->
![](matrixto-client-choice.png)

Since this documentation started with Element, let's carry on with it. You will
be able to seamlessly change to another client when you're more used to Matrix.

Click on "Continue" below Element. If you have installed Element Desktop, your
browser may ask you if you want to allow this page to open Element. Click on
Allow. If you haven't installed Element Desktop, you can either click on
"Download" to get it, or "Continue in your browser" to carry on with the web
app.

Depending on the privacy settings set by the administrators of the room, you may
or may not be able to see a preview of the conversation.

<!-- markdownlint-disable-next-line no-alt-text -->
![](room-preview.png)

Click on "Join the discussion": you can now participate in the room!

<!-- markdownlint-disable-next-line no-alt-text -->
![](room-participate.png)

## Browsing the public directory

Joining a specific room is handy when you know exactly what you want to discuss
or where, but sometimes you just want to find a casual place to talk of things
of interest with people on the Internet.

Matrix has a built-in directory where people can publish their public rooms for
others to find them. The directory only shows rooms published on a single
provider at once. If you have created an account on matrix.org, it's going to
show you only rooms published on matrix.org's directory.

To access the directory, click on the `+` in the left bar, and on "Join public
room".

<!-- markdownlint-disable-next-line no-alt-text -->
![](directory-menu.png)

It will open a list of all the public rooms published in the directory of your
provider.

<!-- markdownlint-disable-next-line no-alt-text -->
![](directory-list.png)

The directory can be very large sometimes, and the rooms displayed at the top of
the list may not be of interest to you. You can type a center of interest to see
if someone has created a room for it already.

<!-- markdownlint-disable-next-line no-alt-text -->
![](directory-filtered.png)

You can click "Join" to join the room, and voilà, you're in!

<!-- markdownlint-disable-next-line no-alt-text -->
![](directory-joined.png)

## Spaces

A Space is a way to group several rooms together. If you are familiar with other
platforms, Matrix Spaces are similar to Slack Workspaces or Discord Servers. It
looks like the following.

<!-- markdownlint-disable-next-line no-alt-text -->
![](space_home.png)

To join a Space, you need to either know its address, or click on a matrix.to
link to that space someone would have shared with you. For example, to join the
Space of the Matrix Community, you can click on
[https://matrix.to/#/#community:matrix.org](https://matrix.to/#/#community:matrix.org)

The process to join a Space is the same as for [Joining a specific room](#joining-a-specific-room).

Once you have joined a Space, clicking on its icon on the leftmost bar will
bring you to the index view of the space: you will see all the rooms contained
in this space, and you will be able to join them by clicking on "Join".

Note that when you join a Space, you are not automatically joining all the rooms
inside it.

Here are a few Spaces you might be interested in:

- Matrix Community [https://matrix.to/#/#community:matrix.org](https://matrix.to/#/#community:matrix.org)
- Science [https://matrix.to/#/#science-space:matrix.org](https://matrix.to/#/#science-space:matrix.org)
- Libre Gaming [https://matrix.to/#/#libregaming-games:tchncs.de](https://matrix.to/#/#libregaming-games:tchncs.de)
- Retro Computing & Gaming [https://matrix.to/#/#retro:nil.im](https://matrix.to/#/#retro:nil.im)
- Mathematics [https://matrix.to/#/#mathematics-on:matrix.org](https://matrix.to/#/#mathematics-on:matrix.org)
