+++
title = "Synapse v0.2.2 released!"
path = "/blog/2014/09/06/synapse-v0-2-2-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi all,

We just pushed our first major update since matrix.org launched for Synapse, the reference Matrix homeserver:

### Changes in synapse 0.2.2 (2014-09-06)

Webclient:

* Fix desktop notifications
* Add support for captchas on registration
* Handle `m.room.aliases` events.
* Implement local echo when sending message
* Inform the UI when a message failed to send.
* Only autoscroll on receiving a new message if the user was already at the bottom of the screen.
* Add support for ban/kick reasons.
* Add /join support for IRC acolytes
* Make IRC-style commands a little more forgiving

Homeserver:

* Validate `m.room.power_level` events.
* When the server returns state events it now also includes the previous content if any to aid pagination
* Add support for inviting people when creating a new room.
* Make the homeserver inform the room via `m.room.aliases` when a new alias is added for a room.

The <a href="http://matrix.org/alpha">matrix.org homeserver</a> & webclient has already been updated to the latest version - if you're running your own homeserver, please update. v0.2.2 retains backwards compatibility with previous homeserver releases.

Get the code from <a href="http://github.com/matrix-org/synapse">http://github.com/matrix-org/synapse</a>!
