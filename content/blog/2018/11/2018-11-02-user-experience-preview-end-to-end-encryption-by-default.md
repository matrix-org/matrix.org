+++
title = "User Experience Preview: End-to-end encryption"
path = "/blog/2018/11/02/user-experience-preview-end-to-end-encryption-by-default"

[taxonomies]
author = ["Nad Chishtie"]
category = ["General"]
+++

<span style="font-weight: 400">It's been a long-standing goal to enable end-to-end encryption by default for private communication in Matrix. The technical effort so far has included </span>
<a href="/docs/guides/e2e_implementation.html"><span style="font-weight: 400">our libolm library</span></a><span style="font-weight: 400">, </span>
<a href="https://www.nccgroup.trust/us/our-research/matrix-olm-cryptographic-review/"><span style="font-weight: 400">an independent cryptographic review</span></a><span style="font-weight: 400"> and </span>
<a href="https://github.com/vector-im/riot-web/issues/6779"><span style="font-weight: 400">a massive backlog of feature development and bug fixes</span></a><span style="font-weight: 400">. Today, instead I'd like to focus on some of the User Experience challenges and goals we're facing.</span>

<span style="font-weight: 400">I should also introduce myself—I'm Nad Chishtie (</span>
<a href="https://matrix.to/#/@nadonomy:matrix.org"><span style="font-weight: 400">@nadonomy:matrix.org</span></a><span style="font-weight: 400">) and I recently joined the Matrix core team (at New Vector) as Lead Designer, most recently focusing on end-to-end encryption.</span>

When using encrypted messages, most existing services fall short in one or all of the following:
<ul>
  <li style="font-weight: 400"><span style="font-weight: 400">They don't allow you to use multiple devices independently. For example, a web session might be locally tethered to a mobile device.</span>
</li>
  <li style="font-weight: 400"><span style="font-weight: 400">They don't support a way to restore or temporarily access message history. For example, if you don't have physical access to your main device because it's broken or has been stolen.</span>
</li>
  <li style="font-weight: 400"><span style="font-weight: 400">They don't allow you to verify that devices are controlled by their owners rather than eavesdroppers, and persist that trust across multiple devices, sessions or rooms.</span>
</li>
</ul>
<span style="font-weight: 400">Modern users, even those we talk to at security and privacy-led organisations, expect these features to 'just work' by default out of the box. Before enabling end-to-end encryption by default, we've been hard at work figuring out how we can deliver these features without compromising security or usability.</span>

<span style="font-weight: 400">(For some users, restrictions such as limiting the number of places encryption keys reside, and not having a synchronised message history may be desirable </span>
<i><span style="font-weight: 400">security features.</span>
</i><span style="font-weight: 400"> We'll support these cases, but just not as the default behaviour.)</span>

<span style="font-weight: 400">Let's dive in to some of the fundamental concepts we'll be putting forward to deliver a default end-to-end encryption experience that makes sense for most modern users. In this post we'll look at an overview of</span>
<b> work-in-progress wireframes</b><span style="font-weight: 400">, in the spirit of designing in the open and gathering feedback from the wider Matrix community. Please note that these don't represent the actual interface design.</span>

## Cross-signing personal devices

<a href="/blog/wp-content/uploads/2018/11/E2E-UX-Cross-signing.png"><img class="alignnone wp-image-3708 size-large" src="/blog/wp-content/uploads/2018/11/E2E-UX-Cross-signing-1024x576.png" alt="" width="1024" height="576" /></a>

<span style="font-weight: 400">When logging in to a new device, you'll be able to use an existing device to verify your new one. Verification is done by </span>
<a href="https://github.com/matrix-org/matrix-doc/issues/1543"><span style="font-weight: 400">scanning a QR code</span></a><span style="font-weight: 400"> on whichever device has the most convenient camera to use, or by </span>
<a href="https://github.com/matrix-org/matrix-doc/issues/1267"><span style="font-weight: 400">comparing a short text string</span></a><span style="font-weight: 400">. You only have to complete this process once to mutually verify both devices.</span>

<a href="https://github.com/matrix-org/matrix-doc/issues/1680"><span style="font-weight: 400">Verifying your new device by cross-signing</span></a><span style="font-weight: 400"> transfers encryption keys, giving it access to your encrypted messages, and also signals to other users that the new device is trustworthy.</span>

## Secure Message Recovery

<a href="/blog/wp-content/uploads/2018/11/E2E-UX-Secure-Message-Recovery.gif.gif"><img class="alignnone size-large wp-image-3725" src="/blog/wp-content/uploads/2018/11/E2E-UX-Secure-Message-Recovery.gif.gif" alt="" width="1024" height="577" /></a>

<span style="font-weight: 400">To the end user, Secure Message Recovery works a lot like setting up disk encryption or a password manager. A user can optionally secure their message history using a recovery passphrase and/or key. If logged out, or using another device, the user can use the recovery passphrase or key to access their encrypted message history.</span>

<span style="font-weight: 400">In practise, this </span>
<a href="https://github.com/vector-im/riot-web/issues/5675"><span style="font-weight: 400">incrementally encrypts and backs up encryption keys to a user's homeserver</span></a><span style="font-weight: 400">, kept secure by the homeserver never having access to the passphrase or key. Like cross-signing, using a recovery passphrase or key will also signal to other users that a device is trustworthy.</span>

<span style="font-weight: 400">We think that in most cases users will cross-sign personal devices, but as a safety net (for example, if a user's devices are broken or lost) Secure Message Recovery is an invaluable tool for users to minimise the chance of them losing their encrypted message history.
</span>

## People should trust people

<a href="/blog/wp-content/uploads/2018/11/E2E-UX-Verification.gif"><img class="alignnone size-large wp-image-3726" src="/blog/wp-content/uploads/2018/11/E2E-UX-Verification.gif" alt="" width="1024" height="577" /></a>

<span style="font-weight: 400">With both cross-signing and Secure Message Recovery in place, we think that people should trust people, instead of individual devices. Now, when you verify a device, it'll mark all of that users trusted devices as trusted.</span>

<span style="font-weight: 400">Gone are the days of every person you talk to having to independently verify your new device upgrade. Like cross-signing, you can verify a device by scanning a QR code or comparing a short text string.</span>

## Sensible and extensible

<a href="/blog/wp-content/uploads/2018/11/E2E-UX-Settings.gif"><img class="alignnone size-large wp-image-3727" src="/blog/wp-content/uploads/2018/11/E2E-UX-Settings.gif" alt="" width="1024" height="577" /></a>

<span style="font-weight: 400">In Riot, we're implementing these features with a sensible default experience that strikes a balance between usability and security. We think most people would prefer to trust cross-signed devices, and that user trust shouldn't block encryption. However, if you aren't most people, you'll be free to configure whatever level of security you need.
</span>

## In Summary

<span style="font-weight: 400">With all of the above in place, and after resolving any remaining technical issues, users will be able to:</span>

<ul>
  <li>Use end-to-end encryption by default in private rooms.</li>
  <li><span style="font-weight: 400">Use an existing device or Secure Message Recovery to access their encrypted message history on multiple devices, and to signal device trust to other users.</span>
</li>
  <li><span style="font-weight: 400">Access their encrypted message history using Secure Message Recovery, by storing encrypted message keys on their homeserver.</span>
</li>
  <li><span style="font-weight: 400">Mark a user as trusted by verifying one of their devices, persisting across all rooms and devices.</span>
</li>
  <li>Keep their encrypted messages out of the hands of eavesdroppers.</li>
  <li>Opt out, or further configure if they have more specific security requirements.</li>
</ul>
<span style="font-weight: 400">There's more nuance to making all this work than we can cover in this overview post; things like recovery key management and immutable security notifications are all important pieces of the puzzle. For further reading, we're filling up more detail in </span>
<a href="https://docs.google.com/document/d/1TIZarCxP0UHcn52o3YdKrFs_ESB3YvDxvCY_SoY-FUk/edit?usp=sharing"><span style="font-weight: 400">UX reference documentation</span></a><span style="font-weight: 400">, </span>
<a href="https://xd.adobe.com/view/aa55e61a-c9b5-4ab2-5d45-71e40b5447dc-dc64/"><span style="font-weight: 400">interactive wireframes</span></a><span style="font-weight: 400">, </span>
<a href="https://github.com/vector-im/riot-meta/issues/222"><span style="font-weight: 400">GitHub issues</span></a><span style="font-weight: 400"> and a </span>
<a href="https://docs.google.com/spreadsheets/d/1Bv2Pf4rz62nB8omDFoolRmONmU47zIeGewJBbPeADoM/edit#gid=0"><span style="font-weight: 400">work-in-progress threat model</span></a><span style="font-weight: 400">. </span>

<span style="font-weight: 400">Over the coming days we're polishing wireframes, nomenclature, iconography and microcopy as we dig deeper into development and implementation, as well as designing these features for </span>
<a href="https://medium.com/@dharmaone/redesigning-matrix-riot-chat-c7bffd9eb841"><span style="font-weight: 400">the upcoming Riot redesign</span></a><span style="font-weight: 400">. Cryptography needn't be intimidating, and we're excited to iterate on these advanced features to make them work for everyone.</span>

<span style="font-weight: 400">We'd love to hear your feedback! Let us know your thoughts here or in </span>
<a href="https://matrix.to/#/#e2e-dev:matrix.org"><span style="font-weight: 400">#e2e-dev:matrix.org</span></a><span style="font-weight: 400">.</span>
