+++
title = "Synapse 0.33.0 is here!!"
path = "/blog/2018/07/19/synapse-0-33-0-is-here"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

We've just released <a href="https://github.com/matrix-org/synapse/releases/tag/v0.33.0">Synapse 0.33.0</a>!  This is a <strong>major performance upgrade</strong> which speeds up /sync (i.e. receiving messages) by a factor of almost 2x!  This has already made a massive difference to the CPU usage and snappiness of the matrix.org homeserver since we rolled it out a few days ago - you can see the drop in sync worker CPU just before midday on July 17th; previously we were regularly hitting the CPU ceiling (at which point everything grinds to a halt) - now we're back down hovering between 40% and 60% CPU (at the current load).  This is actually fixing a bug which crept in around Synapse 0.31, so please upgrade - especially if Synapse has been feeling slower than usual recently, and especially if you are still on Synapse 0.31.

<a href="/blog/wp-content/uploads/2018/07/Screen-Shot-2018-07-19-at-13.00.01-1.png"><img class="aligncenter wp-image-3406" src="/blog/wp-content/uploads/2018/07/Screen-Shot-2018-07-19-at-13.00.01-1-1024x639.png" alt="" width="813" height="507" /></a>

Meanwhile we have a <strong>lot</strong> of new stuff coming on the horizon - a whole new algorithm for state resolution (watch this space for details); incremental state resolution (at last!) to massively speed up state resolution and mitigate extremities build up (and speed up the synapse master process, which is now the bottleneck again on the matrix.org homeserver); better admin tools for managing resource usage, and all the Python3 porting work (with associated speedups and RAM & GC improvements).  Fun times ahead!

The full changelog follows below; as always you can grab Synapse from <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>.   Thanks for flying Matrix!

### Synapse 0.33.0 (2018-07-19)

#### Bugfixes

<ul>
  <li>Disable a noisy warning about logcontexts. (<a href="https://github.com/matrix-org/synapse/issues/3561">#3561</a>)</li>
</ul>

### Synapse 0.33.0rc1 (2018-07-18)

#### Features

<ul>
  <li>Enforce the specified API for report_event. (<a href="https://github.com/matrix-org/synapse/issues/3316">#3316</a>)</li>
  <li>Include CPU time from database threads in request/block metrics. (<a href="https://github.com/matrix-org/synapse/issues/3496">#3496</a>, <a href="https://github.com/matrix-org/synapse/issues/3501">#3501</a>)</li>
  <li>Add CPU metrics for _fetch_event_list. (<a href="https://github.com/matrix-org/synapse/issues/3497">#3497</a>)</li>
  <li>Optimisation to make handling incoming federation requests more efficient. (<a href="https://github.com/matrix-org/synapse/issues/3541">#3541</a>)</li>
</ul>

#### Bugfixes

<ul>
  <li>Fix a significant performance regression in /sync. (<a href="https://github.com/matrix-org/synapse/issues/3505">#3505</a>, <a href="https://github.com/matrix-org/synapse/issues/3521">#3521</a>, <a href="https://github.com/matrix-org/synapse/issues/3530">#3530</a>, <a href="https://github.com/matrix-org/synapse/issues/3544">#3544</a>)</li>
  <li>Use more portable syntax in our use of the attrs package, widening the supported versions. (<a href="https://github.com/matrix-org/synapse/issues/3498">#3498</a>)</li>
  <li>Fix queued federation requests being processed in the wrong order. (<a href="https://github.com/matrix-org/synapse/issues/3533">#3533</a>)</li>
  <li>Ensure that erasure requests are correctly honoured for publicly accessible rooms when accessed over federation. (<a href="https://github.com/matrix-org/synapse/issues/3546">#3546</a>)</li>
</ul>

#### Misc

<ul>
  <li>Refactoring to improve testability. (<a href="https://github.com/matrix-org/synapse/issues/3351">#3351</a>, <a href="https://github.com/matrix-org/synapse/issues/3499">#3499</a>)</li>
  <li>Use <code>isort</code> to sort imports. (<a href="https://github.com/matrix-org/synapse/issues/3463">#3463</a>, <a href="https://github.com/matrix-org/synapse/issues/3464">#3464</a>, <a href="https://github.com/matrix-org/synapse/issues/3540">#3540</a>)</li>
  <li>Use parse and asserts from http.servlet. (<a href="https://github.com/matrix-org/synapse/issues/3534">#3534</a>, <a href="https://github.com/matrix-org/synapse/issues/3535">#3535</a>).</li>
</ul>
