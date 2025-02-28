+++
date = "2023-12-14T16:00:00Z"
title = "Cleaning up Libera.Chat aliases"

[taxonomies]
author = ["Thib"]
category = ["Bridges"]

[extra]
image = "https://matrix.org/blog/img/libera-chat-bridge-og.png"
+++

The Matrix.org Foundation has taken down the bridge with the Libera Chat network. This only prevented messages from making it across the bridges, for Matrix users to appear on the IRC side, and for new IRC users to appear on the Matrix side.

As part of our work to remove the bridge leftovers, we have removed the ghosts in Matrix rooms and demoted the Libera Chat appservice user. We will now remove the aliases from the rooms, and strongly encourage you to make sure you update the links to your Matrix room if they relied on a `matrix.to` link that contains `:libera.chat`

<!-- more -->

## Ghosts cleanup

One of the core concepts of Matrix is interoperability with third party platforms via bridges. In the example of Libera Chat, when an IRC user appears on the Matrix side, it’s called a ghost. When a Matrix user appears on IRC, it’s called a puppet.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/libera-chat-bridge.png)

When the IRC bridge was taken down, all the puppets disappeared from IRC. Matrix works differently than IRC, and all the ghosts remained in most bridged rooms.

The Foundation has performed the clean-up work to remove ghosts from the rooms, and will now tackle the alias clean-up.

## Aliases cleanup

The bridge operated by the Matrix.org Foundation was hosted on a dedicated Matrix server that lived under the libera.chat domain. This means that all the matrix users whose username looks like `@username:libera.chat` are ghosts. It also means that aliases looking like `#roomname:libera.chat` are hosted on the libera.chat Matrix instance.

The Foundation will decommission this server, and as such those aliases will stop working. This doesn’t mean the room will stop working, but _links_ to this room might stop working because the alias won’t resolve.

The Foundation is going to remove all the libera.chat aliases from rooms that have them by January 7. After this date matrix.to links that contain `:libera.chat` will stop working. You will need to update them by going to your matrix client, and asking it for a new link to share the room. In Element on a computer, you can do this by clicking on the room header and then clicking on “Copy room link”.

If you are the administrator of such a room, you can change the alias in advance. To do so, in your favourite client go to the room settings, add a new published address if none exists, and change the main address. You can then repeat the “copy room link” steps to get a new matrix.to link.
