+++
title = "Synapse 0.3.4 released!"
path = "/blog/2014/09/25/synapse-0-3-4-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

Synapse 0.3.4 is out! The main changes here are a huge fleet of bugfixes to the webclient, and the addition of TURN support for VoIP relaying. This makes VoIP/Video call setup much more reliable (although the UI still needs some love).

Meanwhile, we set an IRC bridge (<a href="https://github.com/tm604/Matrix-IRCBridge">https://github.com/tm604/Matrix-IRCBridge</a>) running linking #matrix:matrix.org and #matrix-dev:matrix.org to their Freenode counterparts (#matrix & #matrix-dev respectively) - much fun to see innocent IRC users assimilated up into Matrix, and for us to now be using Matrix for /all/ our development chat and interaction (whether it's through a Matrix client or an IRC client).

To upgrade to the latest homeserver, just <code>git pull && ./synctl restart</code>.  If you want to start playing with VoIP in earnest on your own homeserver, you'll need to install a TURN server - see <a href="https://github.com/matrix-org/synapse/blob/master/docs/turn-howto.rst">docs/turn-howto.rst</a> for details on how to set one up.

<a href="http://matrix.org/alpha">http://matrix.org/alpha</a> has already been upgraded to 0.3.4, so feel free to play with all the new stuff there.

thanks,

Matthew

## Changes in synapse 0.3.4 (2014-09-25)

This version adds support for using a TURN server. See docs/turn-howto.rst on
how to set one up.

Homeserver:

* Add support for redaction of messages.
* Fix bug where inviting a user on a remote home server could take up to
20-30s.
* Implement a get current room state API.
* Add support specifying and retrieving turn server configuration.

Webclient:

* Add button to send messages to users from the home page.
* Add support for using TURN for VoIP calls.
* Show display name change messages.
* Fix bug where the client didn't get the state of a newly joined room
until after it has been refreshed.
* Fix bugs with tab complete.
* Fix bug where holding down the down arrow caused chrome to chew 100% CPU.
* Fix bug where desktop notifications occasionally used "Undefined" as the
display name.
* Fix more places where we sometimes saw rooms as IDs rather than aliases.
* Fix bug which caused lag when entering text in the text box.
