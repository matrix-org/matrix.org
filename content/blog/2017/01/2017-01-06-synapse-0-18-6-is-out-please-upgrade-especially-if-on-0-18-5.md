+++
title = "Synapse 0.18.7 is out - Please upgrade, especially if on 0.18.5 or 0.18.6."
path = "/blog/2017/01/06/synapse-0-18-6-is-out-please-upgrade-especially-if-on-0-18-5"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

~~TL;DR: Please upgrade to <a href="https://github.com/matrix-org/synapse/releases/tag/v0.18.6">Synapse 0.18.6</a>, especially if you are on 0.18.5 which is a bad release.~~

TL;DR: Please upgrade to <strong><a href="https://github.com/matrix-org/synapse/releases/tag/v0.18.7">Synapse 0.18.7</a> </strong>- especially if you are on 0.18.5 or 0.18.6 which both have serious federation bugs.

Synapse 0.18.5 contained a really nasty regression in the federation code which causes servers to echo transactions that they receive back out to the other servers participating in a room. This has effectively resulted in a gradual amplification of federation traffic as more people have installed 0.18.5, causing every transaction to be received N times over where N is the number of servers in the room.

We'll do a full write-up once we're happy we've tracked down all the root problems here, but the short story is that this hit critical mass around Dec 26, where typical Synapses started to fail to keep up with the traffic - especially when requests hit some of the more inefficient or buggy codepaths in Synapse.  As servers started to overload with inbound connections, this in turn started to slow down and consume resources on the connecting servers - especially due to an architectural mistake in Synapse which blocks inbound connections until the request has been fully processed (which could require the receiving server in turn to make outbound connections), rather than releasing the inbound connection asap.  This hit the point that servers were running out of file descriptors due to all the outbound and inbound connections, at which point they started to entirely tarpit inbound connections, resulting in a slow feedback loop making the whole situation even worse.

We've spent the last two weeks hunting all the individual inefficient requests which were mysteriously starting to cause more problems than they ever had before; then trying to understand the feedback misbehaviour; before finally discovering the regression in 0.18.5 as the plausible root cause of the problem.  Troubleshooting has been complicated by most of the team having unplugged for the holidays, and because this is the first (and hopefully last!) failure mode to be distributed across the whole network, making debugging something of a nightmare - especially when the overloading was triggering a plethora of different exotic failure modes.  Huge thanks to everyone who has shared their server logs with the team to help debug this.

Some of these failure modes are still happening (and we're working on fixing them), but we believe that if everyone upgrades away from the bad 0.18.5 release most of the symptoms will go away, or at least go back to being as bad as they were before.  Meanwhile, if you find your server suddenly grinding to a halt after upgrading to ~~0.18.6~~ 0.18.7 please come tell us in <a href="https://matrix.to/#/#matrix-dev:matrix.org">#matrix-dev:matrix.org</a>.

We're enormously sorry if you've been bitten by the federation instability this has caused - and many many thanks for your patience whilst we've hunted it down.  On the plus side, it's given us a lot of *very* useful insight into how to implement federation in future homeservers to not suffer from any of these failure modes.  It's also revealed the root cause of why Synapse's RAM usage is quite so bad - it turns out that it actually idles at around 200MB with default caching, but there's a particular codepath which causes it to spike temporarily by 1GB or so - and that RAM is then not released back to the OS.  We're working on a fix for this too, but it'll come after 0.18.7.

Unfortunately the original release of 0.18.6 still exhibits the root bug, but 0.18.7 (originally released as 0.18.7-rc2) should finally fix this.  Sorry for all the upgrades :(

So <a href="https://github.com/matrix-org/synapse/releases/tag/v0.18.7">please upgrade as soon as possible</a> to 0.18.7.  <a href="/packages/debian">Debian packages</a> are available as normal.

thanks,

Matthew

### Changes in synapse v0.18.7 (2017-01-09)

<ul>
<li>No changes from v0.18.7-rc2</li>
</ul>

### Changes in synapse v0.18.7-rc2 (2017-01-07)

Bug fixes:
<ul>
  <li>Fix error in rc1's discarding invalid inbound traffic logic that was incorrectly discarding missing events
</li>
</ul>

### Changes in synapse v0.18.7-rc1 (2017-01-06)

Bug fixes:
<ul>
  <li>Fix error in #PR 1764 to actually fix the nightmare #1753 bug.
</li>
  <li>Improve deadlock logging further
</li>
  <li>Discard inbound federation traffic from invalid domains, to immunise
against #1753
</li>
</ul>

### Changes in synapse v0.18.6 (2017-01-06)

Bug fixes:
<ul>
  <li>Fix bug when checking if a guest user is allowed to join a room - thanks to Patrik Oldsberg (PR <a class="issue-link js-issue-link" title="handlers/room_member: fix guest access check when joining rooms" href="https://github.com/matrix-org/synapse/pull/1772" data-id="199209215" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1772</a>)</li>
</ul>

### Changes in synapse v0.18.6-rc3 (2017-01-05)

Bug fixes:
<ul>
  <li>Fix bug where we failed to send ban events to the banned server (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1758" data-url="https://github.com/matrix-org/synapse/issues/1758" data-id="198709898" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1758</a>)</li>
  <li>Fix bug where we sent event that didn't originate on this server to other servers (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1764" data-url="https://github.com/matrix-org/synapse/issues/1764" data-id="198934605" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1764</a>)</li>
  <li>Fix bug where processing an event from a remote server took a long time because we were making long HTTP requests (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1765" data-url="https://github.com/matrix-org/synapse/issues/1765" data-id="198940353" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1765</a>, PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1744" data-url="https://github.com/matrix-org/synapse/issues/1744" data-id="198236017" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1744</a>)</li>
</ul>
Changes:
<ul>
  <li>Improve logging for debugging deadlocks (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1766" data-url="https://github.com/matrix-org/synapse/issues/1766" data-id="198946790" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1766</a>, PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1767" data-url="https://github.com/matrix-org/synapse/issues/1767" data-id="198958245" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1767</a>)</li>
</ul>

### Changes in synapse v0.18.6-rc2 (2016-12-30)

Bug fixes:
<ul>
  <li>Fix memory leak in twisted by initialising logging correctly (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1731" data-url="https://github.com/matrix-org/synapse/issues/1731" data-id="198134635" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1731</a>)</li>
  <li>Fix bug where fetching missing events took an unacceptable amount of time in large rooms (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1734" data-url="https://github.com/matrix-org/synapse/issues/1734" data-id="198178611" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1734</a>)</li>
</ul>

### Changes in synapse v0.18.6-rc1 (2016-12-29)

Bug fixes:
<ul>
  <li>Make sure that outbound connections are closed (PR <a class="issue-link js-issue-link" title="Wrap connections in an N minute timeout to ensure they get reaped correctly" href="https://github.com/matrix-org/synapse/pull/1725" data-id="197934419" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1725</a>)</li>
</ul>
