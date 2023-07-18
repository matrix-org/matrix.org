+++
title = "Synapse 0.21.0 is released!"
path = "/blog/2017/05/18/synapse-0-21-0-is-released"

[taxonomies]
author = ["Thomas Lant"]
category = ["Tech"]
+++

Hi all,

Synapse 0.21.0 was released a moment ago. This release lands a number of performance improvements and stability fixes, plus a couple of small features.

For those of you upgrading <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a> has the details as usual.  Full changelog follows:

## Changes in synapse v0.21.0 (2017-05-17)

Features:
<ul>
 	<li>Add per user rate-limiting overrides (PR <a href="https://github.com/matrix-org/synapse/pull/2208">#2208</a>)</li>
 	<li>Add config option to limit maximum number of events requested by <code>/sync</code> and <code>/messages</code> (PR <a href="https://github.com/matrix-org/synapse/pull/2221">#2221</a>) Thanks to @psaavedra!</li>
</ul>
Changes:
<ul>
 	<li>Various small performance fixes (PR <a href="https://github.com/matrix-org/synapse/pull/2201">#2201</a>, <a href="https://github.com/matrix-org/synapse/pull/2202">#2202</a>, <a href="https://github.com/matrix-org/synapse/pull/2224">#2224</a>, <a href="https://github.com/matrix-org/synapse/pull/2226">#2226</a>, <a href="https://github.com/matrix-org/synapse/pull/2227">#2227</a>, <a href="https://github.com/matrix-org/synapse/pull/2228">#2228</a>, <a href="https://github.com/matrix-org/synapse/pull/2229">#2229</a>)</li>
 	<li>Update username availability checker API (PR <a href="https://github.com/matrix-org/synapse/pull/2209">#2209</a>, <a href="https://github.com/matrix-org/synapse/pull/2213">#2213</a>)</li>
 	<li>When purging, don't de-delta state groups we're about to delete (PR <a href="https://github.com/matrix-org/synapse/pull/2214">#2214</a>)</li>
 	<li>Documentation to check synapse version (PR <a href="https://github.com/matrix-org/synapse/pull/2215">#2215</a>) Thanks to @hamber-dick!</li>
 	<li>Add an index to event_search to speed up purge history API (PR <a href="https://github.com/matrix-org/synapse/pull/2218">#2218</a>)</li>
</ul>
Bug fixes:
<ul>
 	<li>Fix API to allow clients to upload one-time-keys with new sigs (PR <a href="https://github.com/matrix-org/synapse/pull/2206">#2206</a>)</li>
</ul>
<a name="user-content-changes-in-synapse-v0-21-0-rc2-2017-05-08"></a>

## Changes in synapse v0.21.0-rc2 (2017-05-08)

Changes:
<ul>
 	<li>Always mark remotes as up if we receive a signed request from them (PR <a href="https://github.com/matrix-org/synapse/pull/2190">#2190</a>)</li>
</ul>
Bug fixes:
<ul>
 	<li>Fix bug where users got pushed for rooms they had muted (PR <a href="https://github.com/matrix-org/synapse/pull/2200">#2200</a>)</li>
</ul>
<a name="user-content-changes-in-synapse-v0-21-0-rc1-2017-05-08"></a>

## Changes in synapse v0.21.0-rc1 (2017-05-08)

Features:
<ul>
 	<li>Add username availability checker API (PR <a href="https://github.com/matrix-org/synapse/pull/2183">#2183</a>)</li>
 	<li>Add read marker API (PR <a href="https://github.com/matrix-org/synapse/pull/2120">#2120</a>)</li>
</ul>
Changes:
<ul>
 	<li>Enable guest access for the 3pl/3pid APIs (PR <a href="https://github.com/matrix-org/synapse/pull/1983">#1986</a>)</li>
 	<li>Add setting to support TURN for guests (PR <a href="https://github.com/matrix-org/synapse/pull/2011">#2011</a>)</li>
 	<li>Various performance improvements (PR <a href="https://github.com/matrix-org/synapse/pull/2075">#2075</a>, <a href="https://github.com/matrix-org/synapse/pull/2076">#2076</a>, <a href="https://github.com/matrix-org/synapse/pull/2080">#2080</a>, <a href="https://github.com/matrix-org/synapse/pull/2083">#2083</a>, <a href="https://github.com/matrix-org/synapse/pull/2108">#2108</a>, <a href="https://github.com/matrix-org/synapse/pull/2158">#2158</a>, <a href="https://github.com/matrix-org/synapse/pull/2176">#2176</a>, <a href="https://github.com/matrix-org/synapse/pull/2185">#2185</a>)</li>
 	<li>Make synctl a bit more user friendly (PR <a href="https://github.com/matrix-org/synapse/pull/2078">#2078</a>, <a href="https://github.com/matrix-org/synapse/pull/2127">#2127</a>) Thanks @APwhitehat!</li>
 	<li>Replace HTTP replication with TCP replication (PR <a href="https://github.com/matrix-org/synapse/pull/2082">#2082</a>, <a href="https://github.com/matrix-org/synapse/pull/2097">#2097</a>, <a href="https://github.com/matrix-org/synapse/pull/2098">#2098</a>, <a href="https://github.com/matrix-org/synapse/pull/2099">#2099</a>, <a href="https://github.com/matrix-org/synapse/pull/2103">#2103</a>, <a href="https://github.com/matrix-org/synapse/pull/2014">#2014</a>, <a href="https://github.com/matrix-org/synapse/pull/2016">#2016</a>, <a href="https://github.com/matrix-org/synapse/pull/2115">#2115</a>, <a href="https://github.com/matrix-org/synapse/pull/2116">#2116</a>, <a href="https://github.com/matrix-org/synapse/pull/2117">#2117</a>)</li>
 	<li>Support authenticated SMTP (PR <a href="https://github.com/matrix-org/synapse/pull/2102">#2102</a>) Thanks @DanielDent!</li>
 	<li>Add a counter metric for successfully-sent transactions (PR <a href="https://github.com/matrix-org/synapse/pull/2121">#2121</a>)</li>
 	<li>Propagate errors sensibly from proxied IS requests (PR <a href="https://github.com/matrix-org/synapse/pull/2147">#2147</a>)</li>
 	<li>Add more granular event send metrics (PR <a href="https://github.com/matrix-org/synapse/pull/2178">#2178</a>)</li>
</ul>
Bug fixes:
<ul>
 	<li>Fix nuke-room script to work with current schema (PR <a href="https://github.com/matrix-org/synapse/pull/1927">#1927</a>) Thanks @zuckschwerdt!</li>
 	<li>Fix db port script to not assume postgres tables are in the public schema (PR <a href="https://github.com/matrix-org/synapse/pull/2024">#2024</a>) Thanks @jerrykan!</li>
 	<li>Fix getting latest device IP for user with no devices (PR <a href="https://github.com/matrix-org/synapse/pull/2118">#2118</a>)</li>
 	<li>Fix rejection of invites to unreachable servers (PR <a href="https://github.com/matrix-org/synapse/pull/2145">#2145</a>)</li>
 	<li>Fix code for reporting old verify keys in synapse (PR <a href="https://github.com/matrix-org/synapse/pull/2156">#2156</a>)</li>
 	<li>Fix invite state to always include all events (PR <a href="https://github.com/matrix-org/synapse/pull/2163">#2163</a>)</li>
 	<li>Fix bug where synapse would always fetch state for any missing event (PR <a href="https://github.com/matrix-org/synapse/pull/2170">#2170</a>)</li>
 	<li>Fix a leak with timed out HTTP connections (PR <a href="https://github.com/matrix-org/synapse/pull/2180">#2180</a>)</li>
 	<li>Fix bug where we didn't time out HTTP requests to ASes (PR <a href="https://github.com/matrix-org/synapse/pull/2192">#2192</a>)</li>
</ul>
Docs:
<ul>
 	<li>Clarify doc for SQLite to PostgreSQL port (PR <a href="https://github.com/matrix-org/synapse/pull/1961">#1961</a>) Thanks @benhylau!</li>
 	<li>Fix typo in synctl help (PR <a href="https://github.com/matrix-org/synapse/pull/2107">#2107</a>) Thanks @HarHarLinks!</li>
 	<li><code>web_client_location</code> documentation fix (PR <a href="https://github.com/matrix-org/synapse/pull/2131">#2131</a>) Thanks @matthewjwolff!</li>
 	<li>Update README.rst with FreeBSD changes (PR <a href="https://github.com/matrix-org/synapse/pull/2132">#2132</a>) Thanks @feld!</li>
 	<li>Clarify setting up metrics (PR <a href="https://github.com/matrix-org/synapse/pull/2149">#2149</a>) Thanks @encks!</li>
</ul>
