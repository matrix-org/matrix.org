+++
title = "Matrix’s ‘Olm’ End-to-end Encryption security assessment released - and implemented cross-platform on Riot at last!"
path = "/blog/2016/11/21/matrix-s-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last"
aliases = ["/blog/2016/11/21/matrixs-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last"]

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

TL;DR: We're officially starting the cross-platform beta of end-to-end encryption in Matrix today, with matrix-js-sdk, matrix-android-sdk and matrix-ios-sdk all supporting e2e via the <a href="/docs/spec/olm.html">Olm</a> and <a href="/docs/spec/megolm.html">Megolm</a> cryptographic ratchets.  Meanwhile, <a href="https://www.nccgroup.trust/us/our-research/matrix-olm-cryptographic-review">NCC Group have publicly released their security assessment</a> of the underlying libolm library, kindly funded by the <a href="https://www.opentech.fund/">Open Technology Fund</a>, giving a full and independent transparent report on where the core implementation is at. The assessment was incredibly useful, finding some interesting issues, which have all been solved either in libolm itself or at the Matrix client SDK level.


If you want to get experimenting with E2E, the flagship Matrix client <a href="https://riot.im">Riot</a> has been updated to use the new SDK on Web, Android and iOS… although the iOS App is currently stuck in “export compliance” review at Apple. However, iOS users can mail <a href="mailto:support@riot.im">support@riot.im</a> to request being added to the TestFlight beta to help us test!  <strong>Update: iOS is now live and approved by Apple (as of Thursday Nov 24.  You can still mail us if you want to get beta builds though!)</strong>


We are ridiculously excited about adding an open decentralised e2e-encrypted pubsub data fabric to the internet, and we hope you are too! :D


---

Ever since the beginning of the Matrix we've been promising end-to-end (E2E) encryption, which is rather vital given conversations in Matrix are replicated over every server participating in a room.  This is no different to SMTP and IMAP, where emails are typically stored unencrypted in the IMAP spools of all the participating mail servers, but we can and should do much better with Matrix: there is no reason to have to trust all the participating servers not to snoop on your conversations.  Meanwhile, the internet is screaming out for an open decentralised e2e-encrypted pubsub data store - which we're now finally able to provide :)


Today marks the start of a formal public beta for our <a href="/docs/spec/megolm.html">Megolm</a> and <a href="/docs/spec/olm.html">Olm</a>-based end-to-end encryption across Web, Android and iOS. New builds of the <a href="https://riot.im">Riot</a> matrix client have just been released on top of the newly 
Megolm
-capable <a href="https://github.com/matrix-org/matrix-js-sdk">matrix-js-sdk</a>, <a href="https://github.com/matrix-org/matrix-ios-sdk">matrix-ios-sdk</a> and <a href="https://github.com/matrix-org/matrix-android-sdk">matrix-android-sdk</a> libraries
.  The stuff that ships today is:

<ul>
 	<li style="font-weight: 400;"><b>E2E encryption, based on the <a href="/git/olm/about">Olm</a> <a href="https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm">Double Ratchet</a> and Megolm ratchet, working in beta on all three platforms</b>.  We're still chasing a few nasty bugs which can cause ‘unknown inbound session IDs', but in general it should be stable: please report these via Github if you see them.
</li>
 	<li style="font-weight: 400;"><b>Encrypted attachments are here!</b> (limited to ~2MB on web, but as soon as <a href="https://github.com/matrix-org/matrix-react-sdk/pull/562">https://github.com/matrix-org/matrix-react-sdk/pull/562</a> lands this limit will go away)
</li>
 	<li style="font-weight: 400;"><b>Encrypted VoIP signalling</b> (and indeed any arbitrary Matrix events) are here!
</li>
 	<li style="font-weight: 400;">Tracking whether the messages you receive are from <strong>‘verified' devices</strong> or not.
</li>
 	<li style="font-weight: 400;">Letting you <strong>block specific target devices</strong> from being able to decrypt your messages or not.
</li>
 	<li style="font-weight: 400;"><strong>The <a href=" http://matrix.org/docs/guides/e2e_implementation.html">Official Implementor's Guide</a></strong>.  If you're a developer wanting to add Olm into your Matrix client/bot/bridge etc, this is the place to start.
</li>
</ul>
Stuff which remains includes:

<ul>
 	<li style="font-weight: 400;">Speeding up sending the first message after adds/removes a device from a room (this can be <a href="https://github.com/vector-im/vector-web/issues/2157"><em>very</em> slow</a> currently - e.g. 10s, but we can absolutely do better).
</li>
 	<li style="font-weight: 400;">Proper device verification.  Currently we compare out-of-band device fingerprints, which is a terrible UX.  Lots of work to be done here.
</li>
 	<li style="font-weight: 400;">Turning on encryption for private rooms by default.  We're deliberately keeping E2E opt-in for now during beta given there is a small risk of undecryptable messages, and we don't want to lull folks into a false sense of security.  As soon as we're out of beta, we'll obviously be turning on E2E for any room with private history by default.  This also gives the rest of the Matrix ecosystem a chance to catch up, as we obviously don't want to lock out all the clients which aren't built on matrix-{'{'}js,ios,android{'}'}-sdk.
</li>
 	<li style="font-weight: 400;">We're also considering building a simple Matrix proxy to aid migration that you can run on localhost that E2Es your traffic as required (so desktop clients like WeeChat, NaChat, Quaternion etc would just connect to the proxy on localhost via pre-E2E Matrix, which would then manage all your keys & sessions & ratchets and talk E2E through to your actual homeserver.
</li>
 	<li style="font-weight: 400;">Matrix clients which can't speak E2E won't show encrypted messages at all.
</li>
 	<li style="font-weight: 400;">...<a href="https://github.com/vector-im/vector-web/issues?q=is%3Aissue%20is%3Aopen%20label%3Atype%3Ae2e">lots and lots of bugs</a> :D
.  We'll be out of beta once these are all closed up.
</li>
</ul>
In practice the system is working very usably, especially for 1:1 chats.  Big group chats with lots of joining/parting devices are a bit more prone to weirdness, as are edge cases like running multiple Riot/Webs in adjacent tabs on the same account.  Obviously we don't recommend using the E2E for anything mission critical requiring 100% guaranteed privacy whilst we're still in beta, but we do thoroughly recommend everyone to give it a try and <a href="https://github.com/vector-im/vector-web/issues">file bugs</a>!


In Riot you can turn it on a per-room basis if you're an administrator that room by flipping the little padlock button in Room Settings.  Warning: once enabled, you cannot turn it off again for that room (to avoid the race condition of people suddenly decrypting a room before someone says something sensitive):


<img class="aligncenter wp-image-1849" src="/blog/wp-content/uploads/2016/11/Screen-Shot-2016-11-21-at-15.21.15-1024x646.png" alt="screen-shot-2016-11-21-at-15-21-15" width="552" height="348" />

The journey to end-to-end encryption has been a bit convoluted, with work beginning in Feb 2015 by the Matrix team on <a href="/git/olm"><b>Olm</b></a>: an independent Apache-licensed implementation in C/C++11 of the Double Ratchet algorithm designed by Trevor Perrin and Moxie Marlinspike (
<a href="https://github.com/trevp/double_ratchet/wiki">https://github.com/trevp/double_ratchet/wiki</a> - then called ‘axolotl').  We picked the Double Ratchet in its capacity as the most ubiquitous, respected and widely studied e2e algorithm out there - mainly thanks to Open Whisper Systems implementing it in Signal, and subsequently licensing it to Facebook for WhatsApp and Messenger, Google for Allo, etc.  And we reasoned that if we are ever to link huge networks like WhatsApp into Matrix whilst preserving end-to-end encrypted semantics, we'd better be using at least roughly the same technology :D


One of the first things we did was to write a <a href="/docs/spec/olm.html">terse but formal spec</a> for the Olm implementation of the Double Ratchet, fleshing out the original sketch from Trevor & Moxie, especially as at the time there wasn't a formal spec from Open Whisper Systems (until yesterday! Congratulations to Trevor & co for publishing their <a href="https://whispersystems.org/docs/specifications/doubleratchet/">super-comprehensive spec</a> :).  We wrote a first cut of the ratchet over the course of a few weeks, which looked pretty promising but then the team got pulled into improving Synapse performance and features as our traffic started to accelerate faster than we could have possibly hoped.  We then got back to it again in June-Aug 2015 and basically finished it off and added a basic implementation to matrix-react-sdk (and picked up by Vector, now Riot)… before getting side-tracked again.  After all, there wasn't any point in adding e2e to clients if the rest of the stack is on fire!


Work resumed again in May 2016 and has continued ever since - starting with the addition of a new ratchet to the mix.  The Double Ratchet (Olm) is great at encrypting conversations between pairs of devices, but it starts to get a bit unwieldy when you use it for a group conversation - especially the huge ones we have in Matrix.  Either each sender needs to encrypt each message N times for every device in the room (which doesn't scale), or you need some other mechanism.


For Matrix we also require the ability to explicitly decide how much conversation history may be shared with new devices.  In classic Double Ratchet implementations this is anathema: the very act of synchronising history to a new device is a huge potential privacy breach - as it's deliberately breaking perfect forward secrecy.  Who's to say that the device you're syncing your history onto is not an attacker?  However, in practice, this is a very common use case.  If a Matrix user switches to a new app or device, it's often very desirable that they can decrypt old conversation history on the new device.  So, we make it configurable per room.  (In today's implementation the ability to share history to new devices is still disabled, but it's coming shortly).


The end result is an entirely new ratchet that we've called <a href="/docs/spec/megolm.html"><b>Megolm</b></a> - which is included in the same <a href="/git/olm">libolm library</a> as Olm.  The way Megolm works is to give every sender in the room its own encrypted ratchet (‘outbound session'), so every device encrypts each message once based on the current key given by their ratchet (and then advances the ratchet to generate a new key).  Meanwhile, the device shares the state of their ‘outbound session' to every other device in the room via the normal Olm ratchet in a 1:1 exchange between the devices.  The other devices maintain an ‘inbound session' for each of the devices they know about, and so can decrypt their messages.  Meanwhile, when new devices join a room, senders can share their sessions according to taste to the new device - either giving access to old history or not depending on the configuration of the room.  You can read more in the <a href="/docs/spec/megolm.html">formal spec for Megolm</a>.


We finished the combination of Olm and Megolm back in September 2016, and shipped the very first implementation in the matrix-js-sdk and matrix-react-sdk as used in <a href="https://riot.im">Riot</a> with some major limitations (no encrypted attachments; no encrypted VoIP signalling; no history sharing to new devices).


Meanwhile, we were incredibly lucky to receive a public security assessment of the Olm & Megolm implementation in libolm from <a href="https://www.nccgroup.trust/us/our-services/security-consulting/cryptography-services/">NCC Group Cryptography Services</a> - famous for assessing the likes of Signal, Tor, OpenSSL, etc and other Double Ratchet implementations. The assessment was very generously funded by the <a href="https://opentech.fund">Open Technology Fund</a> (who specialise in paying for security audits for open source projects like Matrix).  Unlike other Double Ratchet audits (e.g. Signal), we also insisted that the end report was publicly released for complete transparency and to show the whole world the status of the implementation.


<a href="https://www.nccgroup.trust/us/our-research/matrix-olm-cryptographic-review/">NCC Group have released the public report today</a> - it's pretty hardcore, but if you're into the details please go check it out.  The version of libolm assessed was v1.3.0, and the report found 1 high risk issue, 1 medium risk, 6 low risk and 1 informational issues - of which 3 were in Olm and 6 in Megolm.  Two of these (‘Lack of Backward Secrecy in Group Chats' and ‘Weak Forward Secrecy in Group Chats') are actually features of the library which power the ‘configurable privacy per-room' behaviour mentioned a few paragraphs above - and it's up to the application (e.g. matrix-js-sdk) to correctly configure privacy-sensitive rooms with the appropriate level of backward or forward secrecy; the library doesn't enforce it however.  The most interesting findings were probably the fairly exotic Unknown Key Share attacks in both Megolm and Olm - check out NCC-Olm2016-009 and NCC-Olm2016-010 in the report for gory details!


Needless to say all of these issues have been solved with the release of libolm 2.0.0 on October 25th and included in today's releases of the client SDKs and Riot.  Most of the issues have been solved at the application layer (i.e. matrix-js-sdk, ios-sdk and android-sdk) rather than in libolm itself.  Given the assessment was specifically for libolm, this means that technically the risks still exist at libolm, but given the correct engineering choice was to fix them in the application layer we went and did it there. (This is explains why the report says that some of the issues are ‘not fixed' in libolm itself).


Huge thanks to Alex Balducci and Jake Meredith at NCC Group for all their work on the assessment - it was loads of fun to be working with them (over Matrix, of course) and we're really happy that they caught some nasty edge cases which otherwise we'd have missed.  And thanks again to Dan Meredith and Chad Hurley at OTF for funding it and making it possible!


Implementing decentralised E2E has been by far the hardest thing we've done yet in Matrix, ending up involving most of the core team.  Huge kudos go to: Mark Haines for writing the original Olm and matrix-js-sdk implementation and devising Megolm, designing attachment encryption and implementing it in matrix-{'{'}js,react{'}'}-sdk, Richard van der Hoff for taking over this year with implementing and speccing Megolm, finalising libolm, adding all the remaining server APIs (device management and to_device management for 1:1 device Olm sessions), writing the <a href=" http://matrix.org/docs/guides/e2e_implementation.html">Implementor's Guide</a>, handling the NCC assessment, and pulling together all the strands to land the final implementation in matrix-js-sdk and matrix-react-sdk.  Meanwhile on Mobile, iOS & Android wouldn't have happened without Emmanuel Rohée, who led the development of E2E in matrix-ios-sdk and <a href="http://matrix.org/git/olm/log/?h=olmkit">OLMKit</a> (the iOS wrappers for libolm based on the <a href="https://github.com/chrisballinger/OLMKit">original work by Chris Ballinger</a> at <a href="https://chatsecure.org/">ChatSecure</a> - many thanks to Chris for starting the ball rolling there!), Pedro Contreiras and Yannick Le Collen for doing all the Android work, Guillaume Foret for all the application layer iOS work and helping coordinate all the mobile work, and Dave Baker who got pulled in at the last minute to rush through encrypted attachments on iOS (thanks Dave!).  Finally, eternal thanks to everyone in the wider community who's patiently helped us test the E2E whilst it's been in development in <a href="https://matrix.to/#/#megolm:matrix.org">#megolm:matrix.org</a>; and to Moxie, Trevor and <a href="https://whispersystems.org">Open Whisper Systems</a> for inventing the Double Ratchet and for allowing us to write our own implementation in Olm.


It's literally the beginning for end-to-end encryption in Matrix, and we're unspeakably excited to see where it goes.  More now than ever before the world needs an open communication platform that combines the freedom of decentralisation with strong privacy guarantees, and we hope this is a major step in the right direction.


-- Matthew, Amandine & the whole Matrix team.


Further reading:

<ul>
 	<li>Libolm website: <a href="/git/olm/about">https://matrix.org/git/olm/about</a></li>
 	<li>Libolm implementor's guide: <a href="http://matrix.org/docs/guides/e2e_implementation.html">http://matrix.org/docs/guides/e2e_implementation.html</a></li>
 	<li>Formal specification for Olm: <a href="/docs/spec/olm.html">https://matrix.org/docs/spec/olm.html</a></li>
 	<li>Formal specification for Megolm: <a href="/docs/spec/megolm.html">https://matrix.org/docs/spec/megolm.html</a></li>
 	<li>Formal specification for E2E in Matrix (WIP, yet to be merged): <a href="http://matrix.org/speculator/spec/drafts%2Fe2e/client_server/unstable.html#end-to-end-encryption">http://matrix.org/speculator/spec/drafts%2Fe2e/client_server/unstable.html#end-to-end-encryption</a></li>
 	<li>The full security assessment: <a href="https://www.nccgroup.trust/us/our-research/matrix-olm-cryptographic-review/">https://www.nccgroup.trust/us/our-research/matrix-olm-cryptographic-review/</a></li>
 	<li>NCC Group: <a href="https://www.nccgroup.trust/us/">https://www.nccgroup.trust/us/</a></li>
 	<li>Open Technology Fund: <a href="https://www.opentech.fund/">https://www.opentech.fund/</a></li>
 	<li>If you're from the press and you've read this far... congratulations, but you probably wanted <a href="https://pr.blonde20.com/matrix-e2e/">this instead</a> :D</li>
</ul>
