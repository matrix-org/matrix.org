+++
title = "Android 0.2.3 SDK and Application released"
path = "/blog/2015/03/10/android-0-2-3-sdk-and-application-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi folks,

We released a new version (0.2.3) of the <a href="https://play.google.com/store/apps/details?id=org.matrix.androidsdk.alpha">Android Matrix Console</a> application today - this is a decent upgrade over 0.2.2.  Changelog below.

If you're an Android user, please install the app from the Play Store and give it a go and give us some feedback on #android:matrix.org or Google Play.

thanks!

## Changes in Matrix Android SDK in 0.2.3 (2015-03-10)

---

### SDK

---

### Matrix Console

Improvements:

* Avoid refreshing the home page when it is not displayed.
* Display a piechart while uploading a media.
* Refresh the display when some messages are automatically resent (after retrieving a data network connection for example).
* Update the user rename message to be compliant with the web client.
* Use the local media files instead of downloading them when they are acknowledged (messages sending).
* Create a medias management class.
* Display the offline status in the members list.
* Avoid creating new homeActivity instance when joining a room from member details sheet.
* The public rooms list are now saved in the bundle state : it should avoid having a spinner when rotated the device.
* The animated GIFs are now supported.

Features:

* Add the rate limits error management. The server could request to delay the messages sending because they were too many messages sent in a short time (to avoid spam).
* Can take a photo to send it.
* A chat room page is automatically paginated to fill. It used to get only the ten latest messages : it displayed half filled page on tablet.
* Add the sending failure reason in the message details (long tap on a message, “Message details”).
* The user is not anymore notified it the push rules are not fulfilled.
* Add some room settings (Display all events, hide unsupported events, sort members by last seen time, display left members, display public rooms in the home page).
* Add various accessibility tweaks.

Bug fixes:

* The media downloads/uploads were sometimes stuck.
* The private room creation was broken.
* SYAND-33 : number of unread messages disappears when entering another room.
* The RoomActivity creation used to crash when it was cancelled because the Room id param was not provided.
* The client used to crash when the home server was invalid but started with http.
* The account creation used to fail if the home server had a trailing slash.
* SYAND-44 In progress text entry could be saved across crashes.
* SYAND-38 Inline image viewer in Android app.
