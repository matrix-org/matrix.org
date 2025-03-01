+++
title = "Synapse 0.3.3 released"
path = "/blog/2014/09/22/synapse-0-3-3-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hello world,

Synapse 0.3.3 was released today, concentrating on both feature & stability improvements on the webclient.  The big news is that 1:1 video calling via WebRTC is implemented (although we're still working on some stability issues, and Synapse doesn't support TURN yet.  This will be coming in the next few days however!).

Play with the demo server at <http://matrix.org/alpha>, or update your own homeserver with a <code>git pull && ./synctl restart</code> or by cloning a new checkout with <code>git clone https://github.com/matrix-org/synapse.git</code>

--Matthew

## Changes in synapse 0.3.3 (2014-09-22)

Homeserver:

* Fix bug where you continued to get events for rooms you had left.

Webclient:

* Add support for video calls with basic UI.
* Fix bug where one to one chats were named after your display name rather
   than the other person's.
* Fix bug which caused lag when typing in the textarea.
* Refuse to run on browsers we know won't work.
* Trigger pagination when joining new rooms.
* Fix bug where we sometimes didn't display invitations in recents.
* Automatically join room when accepting a VoIP call.
* Disable outgoing and reject incoming calls on browsers we don't support
   VoIP in.
* Don't display desktop notifications for messages in the room you are
   non-idle and speaking in.
