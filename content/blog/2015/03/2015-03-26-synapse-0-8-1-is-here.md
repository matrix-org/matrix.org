+++
title = "Synapse 0.8.1 is here!"
path = "/blog/2015/03/26/synapse-0-8-1-is-here"

[taxonomies]
author = ["David Baker"]
category = ["General"]
+++

Heads up that we released Synapse 0.8.1 a little while back, but we've all been too busy writing software to announce it... you know how it goes. Anyway, here are the changes:
<ul>
 <li>Disable registration by default. New users can be added using the included <code>register_new_matrix_user</code> script or by enabling registration in the config.</li>
 <li>Add metrics to synapse. To enable metrics use config options <code>enable_metrics</code> and <code>metrics_port</code>.</li>
 <li>Fix bug where banning only kicked the user.</li>
</ul>
Note that first one in particular: if you set up a new install, you won't be able to register new users using the API by default. This means random people on the Internet can't create accounts on your Home Server unless you actually choose to let them. Also, if you were trying to ban users and noticed that didn't work... yeah, we fixed that.

Okay, back to writing software again!
