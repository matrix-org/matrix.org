+++
title = "Matrix-IRC Bridge reaches v0.4.0"
path = "/blog/2016/08/15/matrix-irc-bridge-reaches-v0-4-0"

[taxonomies]
author = ["Kegan Dougal"]
category = ["Tech"]
+++

A new version of the IRC bridge has been released onto NPM and the matrix.org bridges!

The IRC bridge has undergone quite a number of modifications since its <a href="/blog/2015/04/22/matrix-irc-application-service/">original inception</a> over a year ago. Version 0.4 introduces a number of additional features and improvements, which can be found in the <a href="https://github.com/matrix-org/matrix-appservice-irc/blob/master/CHANGELOG.md">changelog</a>. These include automatically linkifying large blocks of text and mirroring kicks/bans to and from Matrix.

With a plethora of protocol gotchas and non-standard features on well-known IRC networks, IRC is a challenging protocol to work with. It's inevitable that some corner cases are not handled well by the bridge. Over time, the bridge has been hardened by edge cases which we have encountered and patched. These releases signify the continual improvement in the robustness of the bridge, which we aim to continue with into the foreseeable future.

Performance wise, our busiest bridge which we host is the bridge to <a href="http://freenode.net/">Freenode</a>. We now have over 1300 active connections to it and have a steady rate of about 240 messages per minute going through to Matrix. We expect to see this number increase significantly over the next few months. Let's see what the next year will bring!
