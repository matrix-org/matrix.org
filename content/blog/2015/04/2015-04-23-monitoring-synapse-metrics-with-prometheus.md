+++
title = "Monitoring Synapse Metrics with Prometheus"
path = "/blog/2015/04/23/monitoring-synapse-metrics-with-prometheus"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tutorials"]
+++

## Note: This blog post is outdated, and an up-to-date tutorial is located <a href="https://github.com/matrix-org/synapse/blob/master/docs/metrics-howto.md">on the synapse project repo</a>

Synapse has had support for exporting a comprehensive range of metrics via HTTP since 0.8.1 - we added this to help quantify the benefits of all the performance work which is going on currently in advance of Synapse 0.9. If you're interested in monitoring your own synapse and seeing what's going on using something like Prometheus, Leo just wrote a quick tutorial on getting up and running:

### How to monitor Synapse metrics using Prometheus

<dl>
<dt>1: Install prometheus:</dt><dd>Follow instructions at <a href="http://prometheus.io/docs/introduction/install/">http://prometheus.io/docs/introduction/install/</a></dd>

<dt>2: Enable synapse metrics:</dt><dd>Simply setting a (local) port number will enable it. Pick a port. prometheus itself defaults to 9090, so starting just above that for locally monitored services seems reasonable. E.g. 9092:

Add to homeserver.yaml
<pre>metrics_port: 9092</pre>
Restart synapse

</dd>

<dt>3: Check out synapse-prometheus-config</dt><dd><a href="https://github.com/matrix-org/synapse-prometheus-config">https://github.com/matrix-org/synapse-prometheus-config</a></dd>

<dt>4: Add <code>synapse.html</code> and <code>synapse.rules</code></dt><dd>The <code>.html</code> file needs to appear in prometheus's <code>consoles</code> directory, and the <code>.rules</code> file needs to be invoked somewhere in the main config file. A symlink to each from the git checkout into the prometheus directory might be easiest to ensure <code>git pull</code> keeps it updated.</dd>

<dt>5: Add a prometheus target for synapse</dt><dd>This is easiest if prometheus runs on the same machine as synapse, as it can then just use localhost:
<pre>global: {'{'}
  rule_file: "synapse.rules"
{'}'}

job: {'{'}
  name: "synapse"

  target_group: {'{'}
    target: "<http://localhost:9092/>"
  {'}'}
{'}'}
</pre>

</dd>
<dt>6: Start prometheus:</dt><dd><pre>./prometheus -config.file=prometheus.conf
</pre>
</dd>

<dt>7: Wait a few seconds for it to start and perform the first scrape,</dt><dd>then visit the console:
<pre><a href="http://server-where-prometheus-runs:9090/consoles/synapse.html">http://server-where-prometheus-runs:9090/consoles/synapse.html</a></pre>
</dd></dl>

And the end result looks something like...

<a href="http://matrix.org/blog/wp-content/uploads/2015/04/Screen-Shot-2015-04-23-at-16.32.01.png"><img src="http://matrix.org/blog/wp-content/uploads/2015/04/Screen-Shot-2015-04-23-at-16.32.01-1024x930.png" alt="Prometheus screenshot" width="1024" height="930" class="aligncenter size-large wp-image-905" /></a>

...amongst many many other system & application metrics.

You can grab the latest version of the tutorial at <a href="https://github.com/matrix-org/synapse/blob/master/docs/metrics-howto.md">https://github.com/matrix-org/synapse/blob/master/docs/metrics-howto.md</a> - thanks to Leo for writing it up.  Any questions, let us know!
