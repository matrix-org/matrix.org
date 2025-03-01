+++
title = "iOS: SDK and Matrix Console 0.2.2 released"
path = "/blog/2015/02/05/ios-sdk-and-matrix-console-0-2-2-released"

[taxonomies]
author = ["Emmanuel Rohee"]
category = ["Tech"]
+++

A new release of the iOS SDK and the iOS Matrix Console app is available on GitHub: <a title="https://github.com/matrix-org/matrix-ios-sdk" href="https://github.com/matrix-org/matrix-ios-sdk">https://github.com/matrix-org/matrix-ios-sdk</a>.

If you use CocoaPods to manage your application dependencies, note that the Matrix SDK pod has been updated too.

The changes since the last release are:

### SDK

<dl><dt>Improvements:</dt><dd>
<ul>
 <li>MXFileStore stores data on a separated thread to avoid blocking the UI thread.</li>
 <li>MXRestClient: Callback blocks in all MXRestClient methods are now optional.</li>
 <li>MXEvent: Cleaned up exposed properties and added a description for each of them.</li>
</ul>
</dd><dt>Features:</dt><dd>
<ul>
 <li>Added API for registering for push notifications.</li>
 <li>Added generic API methods to make any kind of registration or login flow.</li>
 <li>Added Identity server API: lookup3pid, requestEmailValidation, validateEmail and bind3PID.</li>
 <li>Management of event redaction: there is a new method in the SDK to redact an event and the SDK updates its data on redaction event.</li>
</ul>
</dd><dt>Bug fixes:</dt><dd>
<ul>
 <li>SYIOS-5 - Expose registration API</li>
 <li>SYIOS-44 - Credentials persist across logout</li>
 <li>SYIOS-54 - Matrix Console app slightly freezes when receiving a message</li>
 <li>SYIOS-59 - Infinite loop in case of back pagination on new created room</li>
 <li>MXRoom: Fixed [MXRoom sendTextMessage]</li>
</ul>
</dd></dl>

### Matrix Console

<dl><dt>Improvements:</dt><dd>
<ul>
 <li>When long pressing on a message, the app shows the JSON string of the Matrix event.</li>
 <li>On this screen, the user can redact the event - if he has enough power level.</li>
 <li>Use home server media repository facilities to use lower image size for thumbnails and avatars</li>
 <li>Settings screen: show build version with the app version.</li>
 <li>Settings screen: added an option to hide information related to redacted event.</li>
 <li>Settings screen: added an option to enable reading of local phonebook. The country is required to internationalise phone numbers.</li>
</ul>
</dd><dt>Features:</dt><dd>
<ul>
 <li>Push notifications.</li>
 <li>Added a contacts screen that displays Matrix users the user had interactions with and contacts from the device phonebook.</li>
 <li>Contacts from the device phonebook who have an email linked to a Matrix user id are automatically recognised.</li>
</ul>
</dd><dt>Bug fixes:</dt><dd>
<ul>
 <li>SYIOS-53 - multilines text input that expands as you type mutiplines would be nice</li>
 <li>SYIOS-45 - Need to check the thumbnail params requested by iOS</li>
 <li>SYIOS-55 - High resolution avatars create memory pressure</li>
 <li>SYIOS-57 - Back pagination does not work well for self chat</li>
 <li>SYIOS-56 - add cache size handling in settings</li>
 <li>SYIOS-60 - In a self chat, Console takes ages to paginate back even if messages are in cache</li>
 <li>SYIOS-61 - Chat room : cannot scroll to bottom when keyboard is opened whereas the growing textview contains multi-lines text.</li>
 <li>SYIOS-63 - calculate room names for 3+ members if no room name/alias</li>
 <li>SYIOS-44 - Credentials persist across logout</li>
 <li>SYIOS-64 - Chat room : unexpected blank lines are added into history when user types in growing textview</li>
 <li>SYIOS-65 - IOS8 : in case of search in recents, keyboard is not dismisssed when user selects a room.</li>
 <li>SYIOS-16 Add option in Console to join room thanks to its alias</li>
</ul>
</dd></dl>
