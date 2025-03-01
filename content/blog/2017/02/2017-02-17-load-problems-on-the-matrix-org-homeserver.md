+++
title = "Load problems on the Matrix.org homeserver"
path = "/blog/2017/02/17/load-problems-on-the-matrix-org-homeserver"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi folks,

Since FOSDEM we've seen even more interest in Matrix than normal, and we've been having some problems getting the Matrix.org homeserver to keep up with demand.  This has resulted in performance being slightly slower than normal at peak times, but the main impact has been the additional traffic exacerbating outages on the homeserver - either by revealing new failure modes, or making it harder to recover rapidly after something goes wrong.

Specifically: on Friday afternoon we had a service disruption caused by someone sending an unusual event into Matrix HQ.  It turns out that both matrix-android-sdk and matrix-ios-sdk based clients (e.g. Riot/Android and iOS) handled this naively by simply resyncing the room state... which has been fine in the past, but not when you have several hundred clients actively syncing the room, and resulted in a thundering herd effect which overloaded the server for ~10 mins or so whilst they all resynced the room (which, in turn, nowadays, involves calculating and syncing several MB of JSON state to each client).  The traffic load was then high enough that it took the server a further 10-20 minutes for the server to fully catch up and recover after the herd had dissipated.  We then had a repeat performance on Monday morning of the same failure mode.

Similarly, we had disruption last night after a user who hadn't used the service for ages logged on for the first time and rapidly caught up on a few rooms which literally had *millions* of unread messages in them.  Generally this would be okay, but the combination of loaded DB and the sheer number of notifications being deleted ended up with 4 long-running DB deletes in parallel.  This seems to have caused postgres to lock the event_actions_table more aggressively than we'd expect, blocking other queries which were trying to access it... causing most requests to block until the deletes were over.  At the current traffic volumes this meant that the main synapse process tried to serve thousands of simultaneous requests as they stacked up and ran out of filehandles within about 10 minutes and wedged the whole synapse solid before the DB could unblock.  Irritatingly, it turns out our end-to-end monitoring has a bug where it in turn can crash on receiving a 500 from synapse, so despite having PagerDuty all set up and running (and having been receiving pages for traffic delays over the last few weeks)... we didn't get paged when we got actual failed traffic rather than slow traffic, which delayed resolving the issue.  Finally, whilst rolling out a fix this afternoon, we again hit issues with the traffic load causing more problems than we were expecting, making a routine redeploy distinctly more disruptive.

So, what are we doing about this?
<ol>
  <li>Fix the root causes:
<ul>
  <li>The 'android/iOS thundering herd' bug is being worked on both the android/iOS side (fixing the naive behaviour) and the server side.  A temporary mitigation is in now place which moves the server-side code to worker processes so that worst case it can't take out the main synapse process and can scale better.</li>
  <li>The 'event_push_actions table is inefficient' bug had <a href="https://github.com/matrix-org/synapse/pull/1916">already been fixed</a> - so this was a matter of rushing through the hotfix to matrix.org before we saw a recurrence.</li>
</ul>
</li>
  <li>Move to faster hardware.  Our current DB master is a "fast when we bought it 5 years ago" machine whose IO is simply starting to saturate (6x 300GB 10krpm disks in RAID5, fwiw), which is maxing out at around 500IOPS and 20MB/s of random access, and acting as a *very* hard limit to the current synapse performance.  We're currently in the process of evaluating SSD-backed IO for the DB (in fact, we're already running a DB slave), and assuming this tests out okay we're hoping to migrate next week, which should give us a 10x-20x speed up on disk IO and buy considerable headroom.  Watch this space for details.</li>
  <li>Make synapse faster.  We're continuing to plug away at optimisations (e.g. <a href="https://github.com/matrix-org/synapse/pull/1923">stuff like this</a>), but these are reaching the point of diminishing returns, especially relative to the win from faster hardware.</li>
  <li>Fix the end-to-end monitoring.  <a href="https://github.com/matrix-org/matrixmon/commit/9481da67b87c1d5142dbc76d9e4b6eb29c56398b">This already happened</a>.</li>
  <li>Load-test before deploying.  This is hard, as you really need to test against precisely the same traffic profile as live traffic, and that's hard to simulate.  We're thinking about ways of fixing this, but the best solution is probably going to be clustering and being able to do incremental redeploys to gradually test new changes.  On which note:</li>
  <li>Fix synapse's architectural deficiencies to support clustering, allowing for rolling zero-downtime redeploys, and better horizontal scalability to handle traffic spikes like this.  We're choosing not to fix this in synapse, but we are currently in full swing implementing <a href="https://github.com/matrix-org/dendrite">dendrite</a> as a next-generation homeserver in Golang, architected from the outset for clustering and horizontal scalability.  N.B. most of the exciting stuff is happening on <a href="https://github.com/matrix-org/dendrite/branches">feature branches</a> and <a href="https://github.com/matrix-org/gomatrixserverlib">gomatrixserverlib</a> atm. Also, we're deliberately taking the time to try to get it right this time, unlike bits of synapse which were something of a rush job.  It'll be a few weeks before dendrite is functional enough to even send a message (let alone finish the implementation), but hopefully faster hardware will give the synapse deployment on matrix.org enough headroom for us to get dendrite ready to take over when the time comes!</li>
</ol>
The good news of course is that you can run your own synapse today to avoid getting caught up in this operational fun & games, and unless you're planning to put tens of thousands of daily active users on the server you should be okay!

Meanwhile, please accept our apologies for the instability and be assured that we're doing everything we can to get out this turbulence as rapidly as possible.

Matthew
