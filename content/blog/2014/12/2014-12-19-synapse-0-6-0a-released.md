+++
title = "Synapse 0.6.0a released!"
path = "/blog/2014/12/19/synapse-0-6-0a-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

We're proud to announce the new 0.6.0 major release of Synapse: the Python reference implementation of Matrix - as well as 0.6.0 of the AngularJS example Matrix client, as a special early Christmas present from the Matrix team :)

The main priority here has been hunting down stability bugs whilst also adding in a few more features.  The most exciting new feature is the new Media/Content API: this allows every homeserver to replicate, cache and thumbnail any files associated with Matrix rooms, rather than relying on retrieving them from the origin homeserver as was previously the case.  This is really cool, as it effectively makes Matrix a distributed content distribution network and gives the same replication semantics to file attachments as to the rest of JSON in rooms.

We've also landed a major new branch which changes the way events are represented internally in order to make them immutable, and fixes a whole range of minor stability issues.  In other news, performance issues are still a work in progress...

To get involved, head over to <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a> and install and upgrade today!

<code>
Changes in synapse 0.6.0 (2014-12-19)
=====================================

* Add new API for media upload and download that supports thumbnailing.
* Replicate media uploads over multiple homeservers so media is always served
   to clients from their local homeserver.  This obsoletes the
   --content-addr parameter and confusion over accessing content directly
   from remote homeservers.
* Implement exponential backoff when retrying federation requests when
   sending to remote homeservers which are offline.
* Implement typing notifications.
* Fix bugs where we sent events with invalid signatures due to bugs where
   we incorrectly persisted events.
* Improve performance of database queries involving retrieving events.

</code>

<code>
Changes in Matrix Angular SDK 0.6.0 (2014-12-19)
================================================

Breaking changes:

* Uploading files in the web client will now hit the new content repository URL
   introduced in Synapse 0.6, and be incompatible with previous Matrix clients.

Bug fixes:

* Fixed a bug which caused the event stream to become wedged when the computer is asleep.
* Fixed a bug which caused the recents to update but not the message window.

Features:

* Typing notifications will now be sent.
* Typing notifications will now be displayed for other users.
* Use the new content repository introduced in Synapse 0.6 when uploading files.

Improvements:

* Display more error dialogs rather than silently failing.
* Display loading spinners on signup.
* Display feedback when joining a room.
* CTRL + clicking on a recents entry will now open that room in a new tab.
* Clicking on links in messages will now open them in a new tab.
* Provide a progress dialog when uploading files.
* Display a red bar when the event stream connection is lost for an extended period of time.

</code>
