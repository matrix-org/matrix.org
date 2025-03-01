+++
title = "Synapse 0.8.0, Android 0.2.2 SDK & App, iOS 0.3.1 SDK & App, JavaScript SDK 0.0.1 released! (oh my!)"
path = "/blog/2015/03/09/synapse-0-8-0-android-0-2-2-sdk-app-ios-0-3-1-sdk-app-javascript-sdk-0-0-1-released-oh-my"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tutorials"]
+++

Hi all,

What with the chaos of Mobile World Congress last week we seem to have been hoarding releases - so here's what's been happening!

<a href="https://github.com/matrix-org/synapse">Synapse 0.8.0</a> was released this afternoon.  This is a major performance/stability release, with lots of good stuff going on - especially adding more customisable push notification support APIs for iOS/Android; support for registering accounts from mobile devices; extensions to the new Application Service API and lots of federation improvements and bug fixes.  <b>Please upgrade at your earliest convenience.</b>

Meanwhile, we quietly released the <a href="https://play.google.com/store/apps/details?id=org.matrix.androidsdk.alpha">Matrix Console</a> Android example app to the Google Play last week, alongside <a href="https://github.com/matrix-org/matrix-android-sdk">v0.2.2 of the Android SDK</a> - release notes below.  There'll be a new version of the Android Console app out tomorrow, but mentioning here for completeness and to share the release notes.  Also, the <a href="https://github.com/matrix-org/matrix-ios-sdk">iOS SDK is now on v0.3.1</a>, with lots of performance and usability improvements.

Finally, we have a whole new official <a href="https://github.com/matrix-org/matrix-js-sdk">Matrix client SDK for JavaScript</a>, all packaged up ready for use by Node developers and JS purists alike as an NPM with minimal dependencies.  Meanwhile, the <a href="https://github.com/matrix-org/matrix-angular-sdk">matrix-angular-sdk</a> has been switched to use matrix-js-sdk from now on.  You can use the plain JS API with a <code>npm install matrix-js-sdk</code> and then:

<pre>
var sdk = require("matrix-js-sdk");
var client = sdk.createClient("https://matrix.org");
client.publicRooms(function(err, data) {'{'}
    console.log("Public Rooms: %s", JSON.stringify(data));
{'}'});

</pre>

Meanwhile, release notes for all & sundry lie below.

<pre>

Changes in synapse v0.8.0 (2015-03-06)
======================================

General:

* Add support for registration fallback. This is a page hosted on the server
  which allows a user to register for an account, regardless of what client
  they are using (e.g. mobile devices).

* Added new default push rules and made them configurable by clients:

  * Suppress all notice messages.
  * Notify when invited to a new room.
  * Notify for messages that don't match any rule.
  * Notify on incoming call.

Federation:

* Added per host server side rate-limiting of incoming federation requests.
* Added a ``/get_missing_events/`` API to federation to reduce number of
  ``/events/`` requests.

Configuration:

* Added configuration option to disable registration:
  ``disable_registration``.
* Added configuration option to change soft limit of number of open file
  descriptors: ``soft_file_limit``.
* Make ``tls_private_key_path`` optional when running with ``no_tls``.

Application services:

* Application services can now poll on the CS API ``/events`` for their events,
  by providing their application service ``access_token``.
* Added exclusive namespace support to application services API.

</pre>

<pre>
Changes in Matrix Android SDK in 0.2.2 (2015-02-27)
===============================================

-----
 SDK
-----
  
-----------------
 Matrix Console
-----------------
Improvements:
 * Exif management : the uploaded image is rotated according to the exif metadata
   (if the device has enough free memory).
 * Add a piechart while downloading an image
 * Add JSON representation of a message (tap on its row, “Message details”
 * The public rooms list is now sorted according to the number of members.

Features:
 * Add configuration and skeleton classes for receiving GCM messages
 * Add REST client for pushers API with add method for HTTP pushers.
 * Add the account creation.

Bug fixes:
 * Reset the image thumbnail when a row is reused.
 * SYAND-30 Notification should be away when entering a room.
 * Some images thumbnails were downloaded several times.
 * Restore the foreground service
 * The medias cache was not cleared after logging out.
 * The client crashed when joining #anime:matrix.org.
 * SYAND-29 Messages in delivery status are not seen
 * Some user display names were their matrix IDs.
 * The room name/ topic were invalid when inviting to a room.

</pre>

<pre>
Changes in Matrix iOS SDK in 0.3.1 (2015-03-03)
===============================================

-----
 SDK
-----
Improvements:
 * Improved push notifications documentation.
 * MXSession: Slightly randomise reconnection times by up to 3s to prevent all
   Matrix clients from retrying requests to the homeserver at the same time.
 * Improved logs

Bug fixes:
 * SYIOS-90 - iOS can receive & display messages multiple times when on bad connections

-----------------
 Matrix Console
-----------------
Improvements:
 * Fixed warnings with 64bits builds.
 * Room history: Improve scrolling handling when keyboard appears.
 * Contacts: Prompt user when local contacts tab is selected if constact sync is disabled.

Bug fixes:
 * Fix crash when switching rooms while the event stream is resuming.
 * SYIOS-69 - On Screen Keyboard can end up hiding the most recent messages in a room.
 * SYIOS-98 - Crash when attempting to attach image on iPad

Changes in Matrix iOS SDK in 0.3.0 (2015-02-23)
===============================================

-----
 SDK
-----
Breaks:
 * [MXSession initWithMatrixRestClient: andStore: ] and the onStoreDataReady argument in
   [MXSession start:] has been removed. The SDK client can now use the asynchronous
   [MXSession setStore:] method to define a store and getting notified when the SDK can
   read cached data from it. (SYIOS-62)
 * MXStore implementations must now implement [MXStore openWithCredentials].
 * All MXRestClient methods now return MXHTTPOperation objects.

Improvements:
 * Created the MXSession.notificationCenter component: it indicates when an event must be
   notified to the user according to user's push rules settings.
 * MXFileStore: Improved loading performance by 8x.
 * Added an option (MXSession.loadPresenceBeforeCompletingSessionStart) to refresh presence
   data in background when starting a session.
 * Created MXLogger to redirect NSLog to file and to log crashes or uncaught exception.
 * MXRestClient: Added [MXRestClient registerFallback].
 * Logs: Make all NSLog calls follows the same format.

Features:
 * SYIOS-40 - Any HTTP request can fail due to rate-limiting on the server, and need to be retried.
 * SYIOS-81 - Ability to send messages in the background.

Bug fixes:
 * SYIOS-67 - We should synthesise identicons for users with no avatar.
 * MXSession: Fixed crash when closing the MXSession before the end of initial Sync.
</pre>
