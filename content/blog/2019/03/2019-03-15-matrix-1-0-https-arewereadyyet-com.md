+++
title = "Matrix 1.0  - Are We Ready Yet?"
path = "/blog/2019/03/15/matrix-1-0-https-arewereadyyet-com"

[taxonomies]
author = ["Neil Johnson"]
category = ["General"]
+++

TL;DR

<ul>
  <li style="font-weight: 400;">If you run a Synapse ensure that your federation certificates are valid <a href="/federationtester/">here</a>.
</li>
  <li style="font-weight: 400;">If they are not valid check out the <a href="https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md">FAQ</a>.
</li>
  <li style="font-weight: 400;">Follow along with progress at <a href="https://arewereadyyet.com">https://arewereadyyet.com</a></li>
  <li style="font-weight: 400;">Tell all your admin friends.
</li>
</ul>
Folks, as you know we are now very close to achieving Matrix 1.0 and finally being in a position to shed our ‘beta' tag. It has been a long time coming and speaks to the huge effort from hundreds of people over the past 5 years.

A critical step towards this goal is the release of Synapse 1.0. We want to ship Synapse 1.0 as soon as possible but can't do so without your help!

We'd like to introduce <a href="http://arewereadyyet.com/"> AreWeReadyYet.com</a> - a quick and easy way for everyone to track the progress and check if their federation is ready for Matrix 1.0!!

<p style="text-align: center;"><a href="https://www.arewereadyyet.com/"><img class="alignnone wp-image-4110 size-medium" src="/blog/wp-content/uploads/2019/03/Screenshot-2019-03-15-at-10.05.19-300x214.png" alt="Are we ready yet?" width="300" height="214" /></a></p>
Synapse 1.0 is good news for anyone running a Synapse installation - it contains critical bug fixes, security patches, a new room algorithm version and dramatically improved user and room search. However, as part of the security work it also
<b>contains a breaking change from previous Synapse versions. From 1.0 onwards it will necessary to ensure a valid TLS certificate on the federation API. Self signed certificates will no longer be accepted</b>. <a href="https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md#it-used-to-work-just-fine-why-are-you-breaking-everything">Why would we do such a thing?</a>

In anticipation for this, everyone currently running a homeserver must ensure that they have checked their federation certificate (check yours <a href="/federationtester/">here</a>). Failure to do so will mean being unable to federate with any Matrix 1.0 compliant server. If your server fails the check, our <a href="https://github.com/matrix-org/synapse/blob/master/docs/MSC1711_certificates_FAQ.md">FAQ</a> has all the details on what you need to do.

This post is a call to arms to try and get as many admins to upgrade their certificates as possible. We are tracking adoption at <a href="https://arewereadyyet.com">https://arewereadyyet.com</a> - currently this sits at about 55% - we need this figure to be higher before we can pull the lever.  

So what are you waiting for? Check that your server has valid certs - then tell all your admin pals to do the same.
<b>Friends don't let friends miss out on Synapse 1.0, send them to</b><a href="http://arewereadyyet.com/"><b> arewereadyyet.com</b></a><b> (or tweet </b><a href="https://twitter.com/intent/tweet?text=Are%20you%20running%20a%20Matrix%20server%3F%20Are%20you%20ready%20for%20Matrix%201.0%3F%20Find%20out%20at%20https%3A%2F%2Farewereadyyet.com!"><b>here</b></a><b> to remind them!)</b> We really need the community to help us here because at some point soon, we will need to pull the lever and release.

Once we make more progress on adoption, we will announce an official release date and finally get Synapse out of beta!
