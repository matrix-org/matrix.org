+++
title = "Announcing Synapse 0.9.0 and Matrix Angular SDK 0.6.6!"
path = "/blog/2015/05/11/announcing-synapse-0-9-0-and-matrix-angular-sdk-0-6-6"

[taxonomies]
author = ["Oddvar Lovaas"]
category = ["General"]
+++

We have pushed out a new release of both <a href="https://github.com/matrix-org/synapse" title="Synapse">Synapse</a>, our reference server implementation, and <a href="https://github.com/matrix-org/matrix-angular-sdk" title="matrix-angular-sdk">matrix-angular-sdk</a>, our reference webclient implementation!

The major new feature in Synapse is that you can now run Synapse backed by a PostgreSQL database. This increases performance and allows Synapse to scale much better! This, as well as various performance related bug fixes, should make things much snappier than before. Of course, you can still run SQLite; it's up to you what you want to use.

In the webclient you can now change or reset your password - we have had this feature requested a few times (although honestly I'm surprised it hasn't been mentioned even more - maybe people are just better than me at remembering/managing their passwords) so this should be a welcome addition! We also fixed a memory leak in Angular, so again expect better performance!

Finally, we have done some work on improving the Application Service API, making it more reliable and secure. Please see the <a href="https://github.com/matrix-org/synapse/blob/master/UPGRADE.rst" title="upgrade notes">upgrade notes</a> as well as the full changelog below.

<strong>Changes in Synapse v0.9.0:</strong>

General:
<ul>
 <li>Add support for using a PostgreSQL database instead of SQLite. See <a href="https://github.com/matrix-org/synapse/blob/master/docs/postgres.rst" title="postgres.rst">postgres.rst</a> for details.</li>
 <li>Add password change and reset APIs. See <a href="https://github.com/matrix-org/matrix-doc/blob/master/specification/10_client_server_api.rst#registration" title="Registration">Registration</a> in the spec.</li>
 <li>Fix memory leak due to not releasing stale notifiers - <a href="/jira/browse/SYN-339" title="SYN-339">SYN-339</a>.</li>
 <li>Fix race in caches that occasionally caused some presence updates to be dropped - <a href="/jira/browse/SYN-369" title="SYN-369">SYN-369</a>.</li>
 <li>Check server name has not changed on restart.</li>
 <li>Add a sample systemd unit file and a logger configuration in <a href="https://github.com/matrix-org/synapse/tree/master/contrib/systemd" title="contrib/systemd">contrib/systemd</a>. Contributed Ivan Shapovalov.</li>
</ul>

Federation:

<ul>
 <li>Add key distribution mechanisms for fetching public keys of unavailable remote home servers. See <a href="https://github.com/matrix-org/matrix-doc/blob/6f2698/specification/30_server_server_api.rst#retrieving-server-keys" title="Retrieving Server Keys">Retrieving Server Keys</a> in the spec.</li>
</ul>

Configuration:

<ul>
 <li>Add support for multiple config files.</li>
 <li>Add support for dictionaries in config files.</li>
 <li>Remove support for specifying config options on the command line, except for:
            <ul><li>--daemonize - Daemonize the home server.</li>
         <li>--manhole - Turn on the twisted telnet manhole service on the given port.</li>
            <li>--database-path - The path to a sqlite database to use.</li>
         <li>--verbose - The verbosity level.</li>
          <li>--log-file - File to log to.</li>
         <li>--log-config - Python logging config file.</li>
         <li>--enable-registration - Enable registration for new users.</li></ul>
 </li>
</ul>

Application services:

<ul>
 <li>Reliably retry sending of events from Synapse to application services, as per <a href="https://github.com/matrix-org/matrix-doc/blob/0c6bd9/specification/25_application_service_api.rst#home-server---application-service-api" title="Application Services">Application Services</a> spec.</li>
 <li>Application services can no longer register via the /register API, instead their configuration should be saved to a file and listed in the synapse app_service_config_files config option. The AS configuration file has the same format as the old /register request. See <a href="https://github.com/matrix-org/synapse/blob/master/docs/application_services.rst" title="application_services.rst">application_services.rst</a> for more information.</li>
</ul>

<strong>Changes in Matrix Angular SDK 0.6.6:</strong>

Features:

<ul>
 <li>Add password change and reset feature using v2_alpha APIs.</li>
</ul>

Bug fixes:

<ul>
 <li>Fix memory leak caused by not removing a watcher on the root scope.</li>
</ul>
