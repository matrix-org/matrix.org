+++
title = "Matrix: One year in."
path = "/blog/2015/09/07/matrix-one-year-in"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tech"]
+++

Hi all,

Just realised that the release of Synapse 0.10.0 on Sept 3rd 2015 was precisely one year from the <a href="http://matrix.org/blog/2014/09/03/welcome-to-the-matrix-blog/">initial launch of Matrix</a>. As such, it feels only right to have a quick update on where we've got to so far, and where we expect things to go from here!

Back at the original launch, all we had was a *very* rough and ready Synapse homeserver, an early draft of the spec, and precisely one client - the Angular webclient, much of which was mainly written at the last minute on the plane to TechCrunch Disrupt SF (and has never quite recovered :S). From this initial seed it's been incredibly exciting and slightly scary to see how much things have advanced and grown - the big headlines for the past year (in roughly chronological order) include:
<ul>
 <li>Making Federation Work:
<ul>
 <li>Switching all of federation over to SSL, using perspectives for key management</li>
 <li>Crypto-signing all the events in a room's message graph to assert integrity</li>
 <li>Sorting out 'power levels' and 'auth events' to allow totally decentralised kicks/bans/etc to work in an open federated environment</li>
</ul>
</li>
 <li>Decentralised content repository and thumbnailing</li>
 <li>Reference mobile "Matrix Console" clients for iOS and Android</li>
 <li>Official client SDKs for iOS and Android - both at the API wrapping layer and the reusable UI component layer</li>
 <li>Push notifications for APNS and GCM (both on server & clients)</li>
 <li>Official client SDKs for JavaScript, Python and Perl</li>
 <li>Typing notifications</li>
 <li>The sytest integration test harness</li>
 <li>Proper WebRTC support for VoIP, including TURN.</li>
 <li>Application Services and Bots - actually letting Matrix defragment communications :)
<ul>
 <li>Bridging to all of Freenode, Moznet and other IRC networks</li>
 <li>Matrix&lt;-&gt;SMS bridge from OpenMarket</li>
 <li>SIP bridges via FreeSWITCH and Verto</li>
 <li>Parrot Bebop Drone &lt;-&gt; Matrix bridge via Janus</li>
 <li>ODB2 telemetry &lt;-&gt;  Matrix bridge via Android SDK</li>
 <li>Reusable bridging framework in Node</li>
</ul>
</li>
 <li>Many iterations and refinements to the spec, including designing v2 of the client SDK</li>
 <li>Switching from Angular to React for all of our web-client development</li>
 <li>Customisable skins and embedding support for the matrix-react-sdk</li>
 <li>End-to-end encryption (not quite formally released yet, but it's written, specced and it works!)</li>
 <li>VoIP support on mobile (landed in Android; still experimenting with different WebRTC stacks on iOS)</li>
 <li>History ACLs</li>
 <li>Delivery reports</li>
 <li>Switching from access_tokens to macaroons for authentication (not yet released)</li>
 <li>Lots and lots of performance work on Synapse, as we've tried to get the most out of Twisted.</li>
</ul>
...and last but not least, the evolution of the #matrix:matrix.org community - including loads of 3rd party clients, SDKs and application services, synapse packaging and even experimental home servers :)

Overall the last year was an exercise in actually fleshing out the whole ecosystem of Matrix and getting it to a stable usable beta acceptable to early adopters. The plan for the next 12 months is then to make the transition from stable beta to a properly production grade environment that can be used to run large scale services used by normal end-users. In practice, this means:
<ul>
 <li>A major rearchitecture of Synapse.
<ul>
 <li>Synapse currently has no support for horizontal scaling or clustering within a single instance, and many will have seen the performance problems we've hit with a relatively monolithic Twisted app architecture. Profiling deferreds in Twisted has been a particular nightmare.</li>
 <li>During September we are starting the process of splitting Synapse apart into separate services (e.g. separating reading eventstreams from writing messages) both to allow horizontal scalability and to experiment with implementing the services in more efficient languages than Python/Twisted.</li>
 <li>We will continue the normal Synapse release process in parallel with this work.</li>
</ul>
</li>
 <li>Ensuring Matrix can support a genuinely excellent UX for normal end-users on glossy clients, and supporting glossy client development as required.  The days of Matrix being just for powerusers are numbered... :)</li>
 <li>Switching to use 3rd party IDs as the primary means of referring to users in Matrix, hiding matrix IDs as a feature for powerusers and developers.</li>
 <li>Finishing the spec. You may have noticed the spec has been quietly evolving over the last few months - finally gaining a versioning system, and with larger chunks of it being automatically generated from formal API spec descriptions. We will be finishing off and filling in the remaining holes.</li>
 <li>Improving the documentation (and FAQ!) on matrix.org in general by switching to a git-backed jekyll system for all the staticish content</li>
 <li>Replace the Angular-based reference webapp bundled with Synapse entirely with a matrix-react-sdk based reference app, and providing better examples and documentation for using it to embed Matrix functionality into existing websites.</li>
 <li>Moving to v2 of the client-server API. This fixes some significant limitations in the v1 API that everyone's been using all year, and should improve performance significantly for many use cases (especially when launching apps). The v1 API will hang around for a very very long time for backwards compatibility.</li>
 <li>Writing *lots* more bridges and integrations to other protocols, now we have a nice framework for rapidly developing them.</li>
 <li>General security audits and double-checking the security model.</li>
 <li>New features, including:
<ul>
 <li>Multiway VoIP and Video conferencing, most likely using FreeSWITCH's new conferencing capabilities via an Application Service bridge (should be ready very shortly!)</li>
 <li>Getting E2E crypto reviewed/audited and putting it live across the board.</li>
 <li>Adding VoIP to iOS</li>
 <li>Implementing delivery reports in all clients</li>
 <li>Improving how invites work (ability to reject them; metadata about where they came from)</li>
 <li>Search API</li>
 <li>Improved file management</li>
</ul>
</li>
 <li>...and an awful lot of bug fixing as we work through the backlog we've accumulated on JIRA.</li>
</ul>
Hopefully this won't take up all year(!) and is just a beginning - there's a huge list of interesting ideas beyond this baseline which we'll be looking at assuming the core stuff above is on track. For instance, we need to work out how to decentralise the identity services that mapping 3rd party IDs to matrix IDs. We need to work out how to avoid spam. And it could be fascinating to start bridging more internet-of-things devices and ecosystems into Matrix, or decentralising user accounts between homeservers, or perhaps using Matrix for synchronising more sophisticated data structures than timelines and key-value state dictionaries...

Finally, we also want to save as much time as possible to help support the wider community in building out clients, services and servers on top of Matrix. Just like the web itself, Matrix is only as useful as the content and services built on top of it - and we will do everything we can to help the pioneers who are interested in colonising this brave new world :)

Huge thanks to everyone over the last year who have supported us - whether that's by creating an account and using the system, running a homeserver, hacking on top of the platform, contributing to the core project, enduring one of our presentations, or even paying for us to work on this. The coming year should prove incredibly interesting, and we hope you'll stay and bring along all your friends, family and colleagues for the ride as the adventure continues!

Matthew, Amandine & the whole Matrix.org team.
