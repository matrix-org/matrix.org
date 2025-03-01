+++
title = "Update on Matrix.org homeserver reliability"
path = "/blog/2017/05/12/update-on-matrix-org-homeserver-reliability"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi folks,

We've had a few outages over the last week on the Matrix.org homeserver which have caused problems for folks using bridges or accounts hosted on matrix.org itself - we'd like to apologise to everyone who's been caught in the crossfire.  In the interests of giving everyone visibility on what's going on and what we're doing about it (and so folks can learn from our mistakes! :), here's a quick writeup (all times are UTC):
<ul>
  <li>2017-05-04 21:05: The datacenter where we host matrix.org performs an emergency unscheduled upgrade of the VM host where the main matrix.org HS & DB master lives.  This means a live-migration of the VM onto another host, which freezes the (huge) VM for 9 minutes, during which service is (obviously) down.  Monitoring fires; we start investigating and try to get in on the console, but by the point we're considering failing over to the hot-spare, the box has come back and recovers fine other than a load spike as all the traffic catches up.  The clock however is off by 9 minutes due to its world having paused.</li>
  <li>2017-05-04 22:30: We step NTP on the host to fix the clock (maximum clock skew on ISC ntpd is 500ppm, meaning it would take weeks to reconverge naturally, during which time we're issuing messages with incorrect timestamps).</li>
  <li>2017-05-05 01:25: Network connectivity breaks between the matrix.org homeserver and the DC where all of our bridges/bots are hosted.</li>
  <li>2017-05-05 01:40: Monitoring alerts fire for bridge traffic activity and are picked up.  After trying to restart the VPN between the DC a few times, it turns out that the IP routes needed for the VPN have mysteriously disappeared.</li>
  <li>2017-05-05 02:23: Routes are manually readded and VPN recovers and traffic starts flowing again.  It turns out that the routes are meant to be maintained by a post-up script in /etc/network/interfaces, which assumes that /sbin/ip is on the path.  Historically this hasn't been a problem as the DHCP lease on the host has never expired (only been renewed every 6 hours) - but the time disruption caused by the live-migration earlier means that on this renewal cycle the lease actually expires and the routes are lost and not-readded.  Basic bridging traffic checks are done (e.g. Freenode-&gt;Matrix).</li>
  <li>2017-05-05 08:30: Turns out that whilst Freenode-&gt;Matrix traffic was working, Matrix-&gt;Freenode was wedged due to a missing HTTP timeout in the AS logic on Synapse.  Synapse is restarted and the bug fixed.</li>
  <li>...the week goes by...</li>
  <li>2017-05-11 18:00: (Unconnected to the rest of this outage, an IRC DDoS on GIMPnet cause intermittent load problems and delayed messages on matrix.org; we turn off the bridge for a few hours until it subsides).</li>
  <li>2017-05-12 02:50: The postgres partition on the matrix.org DB master diskfills and postgres halts.  Monitoring alerts fire (once, phone alerts), but the three folks on call manage to sleep through their phone ringing.</li>
  <li>2017-05-12 04:45: Folks get woken up and notice the outage; clear up diskspace; restart postgres. Meanwhile, synapse appears to recover, other than mysteriously refusing to send messages from local users.  Investigation commences in the guts of the database to try to see what corruption has happened.</li>
  <li>2017-05-12 06:00: We realise that nobody has actually restarted synapse since the DB outage begun, and the failure is probably a known issue where worker replication can get fail and cause the master synapse process to fail to process writes.  Synapse is restarted; everything recovers (including bridges).</li>
  <li>2017-05-12 06:20: Investigation into the cause of the diskfill reveals it to be due to postgres replication logs (WALs) stacking up on the DB master, due to replication having broken to a DB slave during the previous networking outage.  Monitoring alerts triggered but weren't escalated due to a problem in PagerDuty.</li>
</ul>
Lessons learned:
<ul>
  <li>Test your networking scripts and always check your box self-recovers after a restart (let alone a DHCP renewal).</li>
  <li>Don't use DHCP in production datacenters unless you really have no choice; it just adds potential ways for everything to break.</li>
  <li>We need better end-to-end monitoring for bridged traffic.</li>
  <li>We need to ensure HS&lt;-&gt;Bridge traffic is more reliable (improved by fixing timeout logic in synapse).</li>
  <li>We need better monitoring and alerting of DB replication traffic.</li>
  <li>We need to escalate PagerDuty phone alerts more aggressively (done).</li>
  <li>We need better alerting for disk fill thresholds (especially "time until fill", remembering to take into account the emergency headroom reserved by the filesystem for the superuser).</li>
  <li>We should probably have scripts to rapidly (or even automatedly) switch between synapse master & hot-spare, and to promote DB slaves in the event of a master failure.</li>
</ul>
Hopefully this is the last we've seen of this root cause; we'll be working through the todo list above.  Many apologies again for the instability - however please do remember that you can (and should!) run your own homeserver & bridges to stay immune to whatever operational dramas we have with the matrix.org instance!
