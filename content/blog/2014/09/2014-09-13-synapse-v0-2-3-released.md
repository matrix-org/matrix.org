+++
title = "Synapse v0.2.3 released"
path = "/blog/2014/09/13/synapse-v0-2-3-released"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

We're back home from TechCrunch where we had a great time arguing the pros and cons of Matrix versus XMPP with anyone and everyone - thanks to all who came to talk to us!

Meanwhile, Synapse v0.2.3 was released yesterday: the emphasis this week has been on improving stability issues on the server, and lots of cosmetic and functionality fixes on the webclient.

If you're running a homeserver, please upgrade asap - upgrading has never been easier - assuming you've checked out the master branch, simply:

<pre>
git pull
./synctl restart
</pre>

...and you will be up and running on 0.2.3.  We keep the master branch tracking the latest release.  <a class="moz-txt-link-freetext" href="http://matrix.org/alpha">http://matrix.org/alpha</a> is already on the latest release should you wish to experiment first!

Alternatively, if you're installing from scratch, try:

<pre>
git clone https://github.com/matrix-org/synapse.git
python setup.py develop --user
./synctl start # to generate a default config
./synctl start # to actually set it running
</pre>

and then head over to <http://localhost:8008> to play with your very own Matrix homeserver!

## Changes in synapse 0.2.3 (2014-09-12)

Homeserver:

* Fix bug where we stopped sending events to remote home servers if a
user from that home server left, even if there were some still in the
room.
* Fix bugs in the state conflict resolution where it was incorrectly
rejecting events.
* Many stability fixes

Webclient:

* Display room names and topics.
* Allow setting/editing of room names and topics.
* Display information about rooms on the main page.
* Handle ban and kick events in real time.
* VoIP UI and reliability improvements.
* Add glare support for VoIP.
* Improvements to initial startup speed.
* Don't display duplicate join events.
* Show message sent/sending state via opacity
* Multiline message sending support
* Many other bug & stability fixes
