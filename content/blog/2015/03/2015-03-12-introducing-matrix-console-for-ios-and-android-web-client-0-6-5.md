+++
title = "Introducing Matrix Console for iOS (and Android) + Web client 0.6.5"
path = "/blog/2015/03/12/introducing-matrix-console-for-ios-and-android-web-client-0-6-5"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News"]
+++

Hi folks,

As of today you can install the <a href="https://itunes.apple.com/gb/app/matrix-console/id970074271">basic reference Matrix client</a> on iOS from the App Store.  We've called the app "Matrix Console" to try to make it clear that it's very much a developer/poweruser tool for experimenting with Matrix and showcasing the Matrix APIs and an example of how to use the iOS SDK - whilst it can be used as a great replacement to IRC, it's by no means meant to be a glossy polished app like Hangouts or Slack.

Meanwhile you can also get <a href="https://play.google.com/store/apps/details?id=org.matrix.androidsdk.alpha">the Android version of Console</a> at the Google Play Store as we mentioned in the last post.

<a href="https://itunes.apple.com/gb/app/matrix-console/id970074271"><img src="http://matrix.org/img/screenie.jpg" width="375" height="667" alt="iOS screenshot" class="aligncenter" /></a>

Needless to say, they're both entirely open-source (Apache license) and you can grab the code from <a href="https://github.com/matrix-org/matrix-ios-sdk">https://github.com/matrix-org/matrix-ios-sdk</a> and <a href="https://github.com/matrix-org/matrix-android-sdk">https://github.com/matrix-org/matrix-android-sdk</a> respectively if you want to play with your own copy.

The mobile apps currently act very similarly to <a href="http://matrix.org/beta">the reference web app</a> - providing group chat (text/images/video etc) in decentralised public and private rooms, with room history kept in sync across all your different Matrix-enabled apps.  They don't yet do VoIP, although we're working on it.  Please give the apps a go and file all your bugs and feedback into <a href="http://matrix.org/jira">JIRA</a> or <a href="/beta/#/room/#ios:matrix.org">#ios:matrix.org</a> and <a href="/beta/#/room/#android:matrix.org">#android:matrix.org</a> so we can make them even better :)

The iOS app in particular showcases one of the coolest new features in Matrix: the ability for homeservers to support highly configurable push notifications, ensuring you never miss messages on Matrix ever again.  The way this works is that when you install the Matrix Console app from iTunes and log in, the app tells your homeserver to send push notifications to a simple push server on Matrix.org running the <a href="http://github.com/matrix-org/sygnal">sygnal</a> codebase (you can also run your own sygnal for your own Matrix apps).  You can then configure some excitingly comprehensive push settings in the settings page of the web client (we haven't exposed the UI to configure these on the mobile apps yet) to configure what events in Matrix should trigger push notifications - and then you will automatically receive the desired pushes even when the app isn't running.

We think this is incredibly powerful: there are no longer *any* client-side notification settings.  Instead, all your notifications are stored server-side - per-room, per-user, per-word and as many other extensible rules as you desire (plus some helpful common special cases).  This means that the rules that determine whether you see notifications on the desktop from the webclient are *identical* to the notifications you receive push notifications on your mobile devices.  We hope this is a huge improvement over the inflexible notification rules that iMessage, Hangouts etc push onto you (so to speak).

To support the new push rules we've just released a new version of the web client - 0.6.5.  This implements the new rule configuration UI - see below for example UI.

<img src="http://matrix.org/img/push-settings.jpg" width="988" height="1252" alt="push settings UI" class="aligncenter" />

The full list of changes in matrix-angular-sdk 0.6.5 is as per below.  We hope you enjoy the new clients and push settings - thanks for flying Matrix :)

<pre>

Changes in Matrix Angular SDK 0.6.5 (2015-03-12)
================================================
Features:
 - Push notifications can now be set up in the Settings page.
 - Text entered into the input box for a room will be preserved across
   room swaps.

Bug fixes:
 - Fixed a bug where auto-scroll for images did not work correctly.
 - Fixed a bug which resulted in a partially populated room when another
   device joined a room.
 - Fixed a bug which prevented files with the same name being uploaded
   sequentially.
 - Correctly remove redacted event text from the recent activity list.
 - Firefox: Can now join rooms which have a double ## alias.

Improvements:
 - Modified Settings page layout.
 - Angular SDK now relies on the Javascript SDK for new API features.
 - Transparent images will now be shown on a white background.
 - GIFs are now marked as such on the thumbnail for the image.
 - The web client version is now shown in Settings.
</pre>
