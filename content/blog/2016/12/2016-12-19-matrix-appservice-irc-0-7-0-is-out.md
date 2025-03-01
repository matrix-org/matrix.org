+++
title = "matrix-appservice-irc 0.7.0 is out!"
path = "/blog/2016/12/19/matrix-appservice-irc-0-7-0-is-out"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Also, we've just released a major update to the IRC bridge codebase after trialling it on the matrix.org-hosted bridges for the last few days.

The big news is:
<ul>
  <li>The bridge uses Synapse 0.18.5's new APIs for managing the public room list (improving performance a bunch)</li>
  <li>Much faster startup using the new /joined_rooms and /joined_members APIs in Synapse 0.18.5</li>
  <li>The bridge will now remember your NickServ password (encrypted at rest) if you want it to via the <code>!storepass</code> command</li>
  <li>You can now set arbitrary user modes for IRC clients on connection (to mitigate PM spam etc)</li>
  <li>After a split, the bridge will drop Matrix-&gt;IRC messages older than N seconds, rather than try to catch the IRC room up on everything they missed on Matrix :S</li>
  <li>Operational metrics are now implemented using Prometheus rather than statsd</li>
  <li>New <code>!quit</code> command to nuke your user from the remote IRC network</li>
  <li>Membership list syncing for IRC-&gt;Matrix is enormously improved, and enabled for all matrix.org-hosted bridges apart from Freenode.  &lt;b&gt;At last, membership lists should be in sync between IRC and Matrix; please let us know if they're not&lt;/b&gt;.</li>
  <li>Better error logging</li>
</ul>
For full details, please see <a href="https://github.com/matrix-org/matrix-appservice-irc/blob/master/CHANGELOG.md">the changelog</a>.

With things like NickServ-pass storing, !quit support and full bi-directional membership list syncing, it's never been a better time to run your own IRC bridge.  Please install or upgrade today from <a href="https://github.com/matrix-org/matrix-appservice-irc">https://github.com/matrix-org/matrix-appservice-irc</a>!
