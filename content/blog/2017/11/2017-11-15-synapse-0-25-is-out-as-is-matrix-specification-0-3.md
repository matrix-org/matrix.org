+++
title = "Synapse 0.25 is out... as is Matrix Specification 0.3(!!!)"
path = "/blog/2017/11/15/synapse-0-25-is-out-as-is-matrix-specification-0-3"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

Today is a crazy release day here - not only do we have Synapse 0.25, but we've also made a formal release of the Matrix Specification (CS API) for the first time in 16 months!

### Matrix CS API 0.3

Talking first about the spec update: the workflow of the Matrix spec is that new experimental features get added to an /unstable API prefix, and then whenever we release the Matrix spec, these get moved over to being part of the /r0 prefix (or whatever version we happen to be on).  We've been <strong>very</strong> constrained on manpower to work on the spec over the last ~18 months, but we've been keeping it up-to-date on a best effort basis, with a bit of help from the wider community.  <b> </b>As such, this latest release does not contain all the latest APIs (and certainly not experimental ones like Groups/Communities which are still evolving), but it does release all of the unstable ones which we've managed to document and which are considered stable enough to become part of the 'r0' prefix.  Going forwards, we're hoping that the wider community will help us fill in the remaining gaps (i.e. propose PRs against the matrix-org/matrix-doc repository to formalise the various spec drafts flying around the place) - and we're also hoping (if/when funding crisis is abated) to locate full-time folk to work on the spec.

The full changelog for 0.3 of the spec is:
<ul class="simple">
  <li>Breaking changes:
<ul>
  <li>Change the rule kind of <cite>.m.rule.contains_display_name</cite> from <cite>underride</cite> to <cite>override</cite>. This works with all known clients which support push rules, but any other clients implementing the push rules API should be aware of this change. This makes it simple to mute rooms correctly in the API (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/373">#373</a>).</li>
  <li>Remove <tt class="docutils literal">/tokenrefresh</tt> from the API (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/395">#395</a>).</li>
  <li>Remove requirement that tokens used in token-based login be macaroons (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/395">#395</a>).</li>
</ul>
</li>
  <li>Changes to the API which will be backwards-compatible for clients:
<ul>
  <li>Add <tt class="docutils literal">filename</tt> parameter to <tt class="docutils literal">POST /_matrix/media/r0/upload</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/364">#364</a>).</li>
  <li>Document CAS-based client login and the use of <tt class="docutils literal">m.login.token</tt> in <tt class="docutils literal">/login</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/367">#367</a>).</li>
  <li>Make <tt class="docutils literal">origin_server_ts</tt> a mandatory field of room events (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/370">#379</a>).</li>
  <li>Add top-level <tt class="docutils literal">account_data</tt> key to the responses to <tt class="docutils literal">GET /sync</tt> and <tt class="docutils literal">GET /initialSync</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/380">#380</a>).</li>
  <li>Add <tt class="docutils literal">is_direct</tt> flag to <tt class="docutils literal">POST /createRoom</tt> and invite member event. Add 'Direct Messaging' module (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/389">#389</a>).</li>
  <li>Add <tt class="docutils literal">contains_url</tt> option to <tt class="docutils literal">RoomEventFilter</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/390">#390</a>).</li>
  <li>Add <tt class="docutils literal">filter</tt> optional query param to <tt class="docutils literal">/messages</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/390">#390</a>).</li>
  <li>Add 'Send-to-Device messaging' module (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/386">#386</a>).</li>
  <li>Add 'Device management' module (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/402">#402</a>).</li>
  <li>Require that User-Interactive auth fallback pages call <tt class="docutils literal">window.postMessage</tt> to notify apps of completion (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/398">#398</a>).</li>
  <li>Add pagination and filter support to <tt class="docutils literal">/publicRooms</tt>. Change response to omit fields rather than return <tt class="docutils literal">null</tt>. Add estimate of total number of rooms in list. (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/388">#388</a>).</li>
  <li>Allow guest accounts to use a number of endpoints which are required for end-to-end encryption. (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/751">#751</a>).</li>
  <li>Add key distribution APIs, for use with end-to-end encryption. (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/894">#894</a>).</li>
  <li>Add <tt class="docutils literal">m.room.pinned_events</tt> state event for rooms. (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/1007">#1007</a>).</li>
  <li>Add mention of ability to send Access Token via an Authorization Header.</li>
  <li>New endpoints:
<ul>
  <li><tt class="docutils literal">GET /joined_rooms</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/999">#999</a>).</li>
  <li><tt class="docutils literal">GET <span class="pre">/rooms/{'{'}roomId{'}'}/joined_members</span>
</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/999">#999</a>).</li>
  <li><tt class="docutils literal">GET /account/whoami</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/1063">#1063</a>).</li>
  <li><tt class="docutils literal">GET <span class="pre">/media/{'{'}version{'}'}/preview_url</span>
</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/1064">#1064</a>).</li>
</ul>
</li>
</ul>
</li>
  <li>Spec clarifications:
<ul>
  <li>Add endpoints and logic for invites and third-party invites to the federation spec and update the JSON of the request sent by the identity server upon 3PID binding (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/997">#997</a>)</li>
  <li>Fix "membership" property on third-party invite upgrade example (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/995">#995</a>)</li>
  <li>Fix response format and 404 example for room alias lookup (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/960">#960</a>)</li>
  <li>Fix examples of <tt class="docutils literal">m.room.member</tt> event and room state change, and added a clarification on the membership event sent upon profile update (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/950">#950</a>).</li>
  <li>Spell out the way that state is handled by <tt class="docutils literal">POST /createRoom</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/362">#362</a>).</li>
  <li>Clarify the fields which are applicable to different types of push rule (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/365">#365</a>).</li>
  <li>A number of clarifications to authentication (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/371">#371</a>).</li>
  <li>Correct references to <tt class="docutils literal">user_id</tt> which should have been <tt class="docutils literal">sender</tt> (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/376">#376</a>).</li>
  <li>Correct inconsistent specification of <tt class="docutils literal">redacted_because</tt> fields and their values (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/378">#378</a>).</li>
  <li>Mark required fields in response objects as such (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/394">#394</a>).</li>
  <li>Make <tt class="docutils literal">m.notice</tt> description a bit harder in its phrasing to try to dissuade the same issues that occurred with IRC (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/750">#750</a>).</li>
  <li><tt class="docutils literal">GET <span class="pre">/user/{'{'}userId{'}'}/filter/{'{'}filterId{'}'}</span>
</tt> requires authentication (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/1003">#1003</a>).</li>
  <li>Add some clarifying notes on the behaviour of rooms with no <tt class="docutils literal">m.room.power_levels</tt> event (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/1026">#1026</a>).</li>
  <li>Clarify the relationship between <tt class="docutils literal">username</tt> and <tt class="docutils literal">user_id</tt> in the <tt class="docutils literal">/register</tt> API (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/1032">#1032</a>).</li>
  <li>Clarify rate limiting and security for content repository. (<a class="reference external" href="https://github.com/matrix-org/matrix-doc/pull/1064">#1064</a>).</li>
</ul>
</li>
</ul>
...and you can read the spec itself of course over at <a href="/docs/spec">https://matrix.org/docs/spec</a>.  It's worth noting that we have slightly bent the rules by including three very minor 'breaking changes' in 0.3, but all for features which to our knowledge nobody is depending on in the wild.  Technically this should mean bumping the major version prefix (i.e. moving to r1), but given how minor and nonimpacting these are we're turning a blind eye this time.

### Meanwhile, Synapse 0.25 is out

This is a medium-sized release; the main thing being to support configurable room visibility within groups (so that whenever you add a room to a group, you're not forced into sharing their existence with the general public, but can choose to just tell group members about them).  There's also a bunch of useful bug fixes and some performance improvements, including lots of contributions from the community this release (thank you!).  Full release notes are:

#### Changes in synapse v0.25.0 (2017-11-15)

Bug fixes:
<ul>
  <li>Fix port script (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2673" data-error-text="Failed to load issue title" data-id="273841564" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2673">#2673</a>)</li>
</ul>

##### Changes in synapse v0.25.0-rc1 (2017-11-14)

Features:
<ul>
  <li>Add is_public to groups table to allow for private groups (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2582" data-error-text="Failed to load issue title" data-id="268816516" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2582">#2582</a>)</li>
  <li>Add a route for determining who you are (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2668" data-error-text="Failed to load issue title" data-id="273327989" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2668">#2668</a>) Thanks to <a class="user-mention" href="https://github.com/turt2live">@turt2live</a>!</li>
  <li>Add more features to the password providers (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2608" data-error-text="Failed to load issue title" data-id="269913170" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2608">#2608</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2610" data-error-text="Failed to load issue title" data-id="269969920" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2610">#2610</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2620" data-error-text="Failed to load issue title" data-id="270352778" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2620">#2620</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2622" data-error-text="Failed to load issue title" data-id="270373940" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2622">#2622</a>,
<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2623" data-error-text="Failed to load issue title" data-id="270374613" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2623">#2623</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2624" data-error-text="Failed to load issue title" data-id="270374846" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2624">#2624</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2626" data-error-text="Failed to load issue title" data-id="270676451" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2626">#2626</a>, <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2628" data-error-text="Failed to load issue title" data-id="270677175" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2628">#2628</a>, <a class="issue-link js-issue-link tooltipped tooltipped-ne" href="https://github.com/matrix-org/synapse/pull/2629" data-error-text="Failed to load issue title" data-id="270721791" data-permission-text="Issue title is private">#2629</a>)</li>
  <li>Add a hook for custom rest endpoints (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2627" data-error-text="Failed to load issue title" data-id="270676740" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2627">#2627</a>)</li>
  <li>Add API to update group room visibility (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2651" data-error-text="Failed to load issue title" data-id="272257429" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2651">#2651</a>)</li>
</ul>
Changes:
<ul>
  <li>Ignore tags when generating URL preview descriptions (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2576" data-error-text="Failed to load issue title" data-id="268596188" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2576">#2576</a>)
Thanks to <a class="user-mention" href="https://github.com/maximevaillancourt">@maximevaillancourt</a>!</li>
  <li>Register some /unstable endpoints in /r0 as well (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2579" data-error-text="Failed to load issue title" data-id="268761262" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2579">#2579</a>) Thanks to
<a class="user-mention" href="https://github.com/krombel">@krombel</a>!</li>
  <li>Support /keys/upload on /r0 as well as /unstable (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2585" data-error-text="Failed to load issue title" data-id="268842938" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2585">#2585</a>)</li>
  <li>Front-end proxy: pass through auth header (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2586" data-error-text="Failed to load issue title" data-id="268843185" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2586">#2586</a>)</li>
  <li>Allow ASes to deactivate their own users (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2589" data-error-text="Failed to load issue title" data-id="268938259" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2589">#2589</a>)</li>
  <li>Remove refresh tokens (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2613" data-error-text="Failed to load issue title" data-id="270111173" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2613">#2613</a>)</li>
  <li>Automatically set default displayname on register (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2617" data-error-text="Failed to load issue title" data-id="270304979" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2617">#2617</a>)</li>
  <li>Log login requests (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2618" data-error-text="Failed to load issue title" data-id="270316951" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2618">#2618</a>)</li>
  <li>Always return <code>is_public</code> in the <code>/groups/:group_id/rooms</code> API (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2630" data-error-text="Failed to load issue title" data-id="270724819" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2630">#2630</a>)</li>
  <li>Avoid no-op media deletes (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2637" data-error-text="Failed to load issue title" data-id="271174567" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2637">#2637</a>) Thanks to <a class="user-mention" href="https://github.com/spantaleev">@spantaleev</a>!</li>
  <li>Fix various embarrassing typos around user_directory and add some doc. (PR
<a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2643" data-error-text="Failed to load issue title" data-id="271218429" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2643">#2643</a>)</li>
  <li>Return whether a user is an admin within a group (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2647" data-error-text="Failed to load issue title" data-id="271795951" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2647">#2647</a>)</li>
  <li>Namespace visibility options for groups (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2657" data-error-text="Failed to load issue title" data-id="272604541" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2657">#2657</a>)</li>
  <li>Downcase UserIDs on registration (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2662" data-error-text="Failed to load issue title" data-id="272746677" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2662">#2662</a>)</li>
  <li>Cache failures when fetching URL previews (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2669" data-error-text="Failed to load issue title" data-id="273404602" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2669">#2669</a>)</li>
</ul>
Bug fixes:
<ul>
  <li>Fix port script (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2577" data-error-text="Failed to load issue title" data-id="268680457" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2577">#2577</a>)</li>
  <li>Fix error when running synapse with no logfile (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2581" data-error-text="Failed to load issue title" data-id="268813288" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2581">#2581</a>)</li>
  <li>Fix UI auth when deleting devices (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2591" data-error-text="Failed to load issue title" data-id="268938993" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2591">#2591</a>)</li>
  <li>Fix typo when checking if user is invited to group (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2599" data-error-text="Failed to load issue title" data-id="269155496" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2599">#2599</a>)</li>
  <li>Fix the port script to drop NUL values in all tables (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2611" data-error-text="Failed to load issue title" data-id="270038737" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2611">#2611</a>)</li>
  <li>Fix appservices being backlogged and not receiving new events due to a bug in
notify_interested_services (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2631" data-error-text="Failed to load issue title" data-id="270787064" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2631">#2631</a>) Thanks to <a class="user-mention" href="https://github.com/xyzz">@xyzz</a>!</li>
  <li>Fix updating rooms avatar/display name when modified by admin (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2636" data-error-text="Failed to load issue title" data-id="271057913" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2636">#2636</a>)
Thanks to <a class="user-mention" href="https://github.com/farialima">@farialima</a>!</li>
  <li>Fix bug in state group storage (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2649" data-error-text="Failed to load issue title" data-id="271901224" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2649">#2649</a>)</li>
  <li>Fix 500 on invalid utf-8 in request (PR <a class="issue-link js-issue-link" href="https://github.com/matrix-org/synapse/pull/2663" data-error-text="Failed to load issue title" data-id="272868148" data-permission-text="Issue title is private" data-url="https://github.com/matrix-org/synapse/issues/2663">#2663</a>)</li>
</ul>

## Finally

If you haven't noticed already, Riot/Web 0.13 is out today, as is Riot/iOS 0.6.2 and Riot/Android 0.7.4.  These contain massive improvements across the board - particularly mainstream Communities support at last on Riot/Web; CallKit/PushKit on Riot/iOS thanks to Denis Morozov (GSoC 2017 student for Matrix) and Share Extension on iOS thanks to Aram Sargsyan (also GSoC 2017 student!); and End-to-end Key Sharing on Riot/Android and a full rewrite of the VoIP calling subsystem on Android.

Rather than going on about it here, though, there's a <a href="https://medium.com/@RiotChat/communities-aka-groups-are-here-announcing-riot-web-0-13-riot-ios-0-6-and-riot-android-0-7-4-933cb193a28e">full write-up over on the Riot Blog.</a>

And so there you go - new releases for eeeeeeeeveryone!  Enjoy! :)

--Matthew, Amandine & the team.
