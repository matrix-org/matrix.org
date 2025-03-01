+++
title = "Synapse 0.3.2 released"
path = "/blog/2014/09/18/synapse-0-3-2-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

We just pushed out a major new release (0.3.0) of Synapse: the current reference Matrix homeserver, swiftly followed by some hotfixes (0.3.1, 0.3.2).

The big changes are:

* Change the VoIP setup API to be more efficient (bundling together media stream candidates into a single setup object). <strong>API breaking change!</strong>
* Change the Registration API to be more consistent. <strong>API breaking change!</strong>
* Lots of nice usability refinements to webclient - e.g. per-message notifications; cursor-key history navigation; faster room loading
* More bugfixes and stability fixes on the homeserver

Please reload the page if you're lurking on <http://matrix.org/alpha> to pull in the new webclient.

If you're running a homeserver - please upgrade with a quick <code>git pull && ./synctl restart</code>.

If you're not running a homeserver... why not? ;D

--Matthew

## Changes in synapse 0.3.2 (2014-09-18)

Webclient:

* Fix regression where an empty "bing words" list in old accounts didn't send
   notifications when it should have done.

## Changes in synapse 0.3.1 (2014-09-18)

This is a release to hotfix v0.3.0 to fix two regressions.

Webclient:

* Fix a regression where we sometimes displayed duplicate events.
* Fix a regression where we didn't immediately remove rooms you were
banned in from the recents list.

## Changes in synapse 0.3.0 (2014-09-18)

See UPGRADE for information about changes to the client server API, including
breaking backwards compatibility with VoIP calls and registration API.

Homeserver:

* When a user changes their displayname or avatar the server will now update
all their join states to reflect this.
* The server now adds "age" key to events to indicate how old they are. This
is clock independent, so at no point does any server or webclient have to
assume their clock is in sync with everyone else.
* Fix bug where we didn't correctly pull in missing PDUs.
* Fix bug where prev_content key wasn't always returned.
* Add support for password resets.

Webclient:

* Improve page content loading.
* Join/parts now trigger desktop notifications.
* Always show room aliases in the UI if one is present.
* No longer show user-count in the recents side panel.
* Add up & down arrow support to the text box for message sending to step
through your sent history.
* Don't display notifications for our own messages.
* Emotes are now formatted correctly in desktop notifications.
* The recents list now differentiates between public & private rooms.
* Fix bug where when switching between rooms the pagination flickered before
the view jumped to the bottom of the screen.
* Add support for password resets.
* Add bing word support.
* Update VoIP implementation to use new API

Registration API:

* The registration API has been overhauled to function like the login API. In
practice, this means registration requests must now include the following:
'type':'m.login.password'. See UPGRADE for more information on this.
* The 'user_id' key has been renamed to 'user' to better match the login API.
* There is an additional login type: 'm.login.email.identity'.
* The command client and web client have been updated to reflect these changes.
