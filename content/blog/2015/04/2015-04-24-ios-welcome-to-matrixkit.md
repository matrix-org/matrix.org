+++
title = "iOS: Welcome to MatrixKit"
path = "/blog/2015/04/24/ios-welcome-to-matrixkit"

[taxonomies]
author = ["Emmanuel Rohee"]
category = ["Tutorials"]
+++

Historically we've had two projects for iOS:
<ul>
 <li><strong>MatrixSDK</strong>: a low level library to interact with a Matrix homeserver</li>
 <li><strong>Console</strong>: an example Matrix client based on MatrixSDK</li>
</ul>

The primary intention of Console was to demonstrate how to use MatrixSDK to write a Matrix client app.
However, this split isn't helpful for developers who want higher level modules that provides UIViewControllers ready to use in an existing app, with no need to manage low level communications with the Matrix homeserver.

It is where the <strong>MatrixKit</strong> project started. MatrixKit sits between MatrixSDK and your existing iOS app.

It provides customisable UIViewControllers a developer can integrate in their app.  If you want to add to your app a screen to chat in a room, you just need to use the MXKRoomViewController.

We made MatrixKit so that the components it provides are <strong>easy to integrate</strong> but also <strong>easy to customise</strong>. We do not have yet full samples of customisation as we've been focused on the library core, but here are a few examples:
<br/>
<div style="text-align: center">
<img class="alignnone size-medium wp-image-918" src="http://matrix.org/blog/wp-content/uploads/2015/04/MXKRoomViewController-169x300.jpeg" alt="MXKRoomViewController" width="169" height="300" />  <img class="alignnone size-medium wp-image-917" src="http://matrix.org/blog/wp-content/uploads/2015/04/JSQMessagesViewController-169x300.jpeg" alt="JSQMessagesViewController" width="169" height="300" />
</div>
<br/>
You probably recognise the theme of the first one, as it's what we use in the Console app today.
The second one is the iOS7-style look and feel from <a href="https://github.com/jessesquires/JSQMessagesViewController">JSQMessagesViewController</a>. With few lines of code we connected it to MatrixKit data models. Yes, data models provided by MatrixKit are reusable too.

MatrixKit is also <strong>highly extensible</strong>. If you want to create new table cells to render messages, new views, new view controllers, etc, you will find a place to hook them into the MatrixKit code.

MatrixKit repository is here: <a href="https://github.com/matrix-org/matrix-ios-kit">https://github.com/matrix-org/matrix-ios-kit</a> and it is available via CocoaPods (the MatrixKit pod).

In parallel of MatrixKit, we did some spring-cleaning - the official Matrix.org iOS offerings are now split into three github repos. One for each deliverable:
<ul>
 <li><a href="https://github.com/matrix-org/matrix-ios-sdk">https://github.com/matrix-org/matrix-ios-sdk</a></li>
 <li><a href="https://github.com/matrix-org/matrix-ios-kit">https://github.com/matrix-org/matrix-ios-kit</a></li>
 <li><a href="https://github.com/matrix-org/matrix-ios-console">https://github.com/matrix-org/matrix-ios-console</a></li>
</ul>

<strong>Other releases:</strong>

Today, we released MatrixSDK 0.4.0 (<a href="https://github.com/matrix-org/matrix-ios-sdk/blob/master/CHANGES.rst#changes-in-matrix-ios-sdk-in-040-2015-04-23">changes</a>). Update your pods :)

Console 0.4.0 (<a href="https://github.com/matrix-org/matrix-ios-console/blob/master/CHANGES.rst#changes-in-console-in-040-2015-04-23">changes</a>) is in the Apple submission process. This will be the first version of the app using MatrixKit. Aesthetically, there is no change since the previous version. The app is more stable due to all the data abstractions and management improvements provided by MatrixKit.

If you're an iOS developer, please have a go with MatrixKit and let us know on <a href="/beta/#/room/#ios:matrix.org">#ios:matrix.org</a> how you get on!
