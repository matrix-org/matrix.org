+++
title = "Synapse 0.19.1 released"
path = "/blog/2017/02/14/synapse-0-19-1-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi folks,

We're a little late with this, but Synapse 0.19.1 was released last week. The only change is a bugfix to a regression in room state replication that snuck in during the performance improvements that landed in 0.19.0. Please upgrade if you haven't already. We've also fixed the Debian repository to make installing Synapse easier on Jessie by including backported packages for stuff like Twisted where we're forced to use the latest releases.

You can grab it from <a href="https://github.com/matrix-org/synapse/">https://github.com/matrix-org/synapse/</a> as always.

### Changes in synapse v0.19.1 (2017-02-09)

<ul>
  <li>Fix bug where state was incorrectly reset in a room when synapse received an event over federation that did not pass auth checks (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/1892" data-url="https://github.com/matrix-org/synapse/issues/1892" data-id="206218885" data-error-text="Failed to load issue title" data-permission-text="Issue title is private">#1892</a>)</li>
</ul>
