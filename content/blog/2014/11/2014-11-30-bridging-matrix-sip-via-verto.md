+++
title = "Bridging Matrix & SIP via Verto"
path = "/blog/2014/11/30/bridging-matrix-sip-via-verto"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Tutorials"]
+++

One of the final remaining missing bits of Matrix today is specifying and implementing the Application Service (AS) APIs which allow you to easily extend Matrix with custom server-side functionality. The AS APIs should let you perform any arbitrary manipulation on chatroom contents, modulo end-to-end encryption constraints - e.g. machine translation; archiving/searching contents; interactive automated services; conferencing; firing push notifications and other hooks; etc. If you really want to look behind the curtain, the bug tracking the development (somewhat out-of-date) is at <a href="/jira/browse/SPEC-34">SPEC-34</a>.

However, the most obvious use case for this is gatewaying Matrix rooms through to existing communication platforms (XMPP, SIP, non-standardised systems) - which is obviously key to Matrix's overall goal of defragmenting communication.  And the good news is that even though the AS APIs don't yet exist, we can still make good progress here through the existing client-server API.  Anyone who's hung around chat systems like IRC should be familiar with the idea of bots - non-human users who participate in chatrooms and but perform arbitrary automated functionality - and you can go quite a long way in using the 'bot' idiom to add automatic functionality to Matrix.

[In fact the first AS API we'll be adding will probably be simply extending the client-server API with some additional privileges to allow homeserver admins to hook up services to their server which are essentially privileged bots (e.g. ability to autojoin rooms created on that server with high power-level; ability to flag themselves as an invisible 'service bot'; ability to monitor events from rooms without joining them: useful for read-only services such as sending push notifications, adding search/archive functionality; etc).  This should also be familiar to IRC users, as it's similar to the model that IRC Services uses.]

So, we already have a few bots hanging around prototyping out bridging to other systems, which hopefully should evolve into full Application Services (where it makes sense; sometimes a bot is good enough).  For instance, we have the <a href="https://github.com/tm604/Matrix-IRCBridge">Matrix/IRC Bridge</a> thanks to tm604 and LeoNerd.  The way this works is simply a bot which joins IRC channels and their Matrix room equivalents; watching the messages on both sides of the bridge and relaying them to the other side, creating virtual users as required.  In future we can be smarter about having the bridge talk on behalf of actual users, or letting actual users control their virtual users, but it's good enough as a first cut.

So for Friday's <a href="http://www.voipusersconference.org/2014/vuc517-matrix-org/">VUC 517</a>, we decided at the last minute (on Tuesday) to make as much of VUC accessible via Matrix as possible.  One side of this was hooking up the <a href="https://jitsi.org/Projects/JitsiMeet">Jitsi Video Bridge</a> to be accessible by talking to the underlying XMPP server - the other side was hooking up via SIP to the <a href="https://www.zipdx.info">ZipDX audio bridge</a> that is used for audio-only participants in the conference.  Both of these would be done as Matrix bots - a virtual user that you could voice/video call 1:1 over Matrix which would then route your call into VUC appropriately.

By Thursday, the Jitsi bot got to the point of being able to place calls and see a single video stream (picked at random), but the video uplink wasn't getting through and actually selecting the right stream to watch (or viewing multiple streams) wasn't in place either.  I'm sure there'll be a similar blogpost once it's finished, so I'm not going to talk about it further here.  Meanwhile, on Thursday night we hacked together a separate bot to jack into the ZipDX bridge via SIP.  Tim Panton's suggestion was to use <a href="http://www.freeswitch.org">FreeSWITCH</a>'s <a href="https://freeswitch.org/confluence/display/FREESWITCH/mod_verto">mod_verto</a> for this, and after Anthony Minesalle and Mike Jerris from FreeSWITCH had popped up on <a href="http://matrix.org/beta">#matrix:matrix.org</a> on Tuesday to find out what we're up to, this seemed like serendipity.

We hadn't played with mod_verto before, although had been pointed at it by someone on IRC shortly after we released Matrix - it's a cool project from the FreeSWITCH dev team that exposes a simple JSON-RPC interface for call signalling over websockets, providing a much more suitable way for WebRTC developers to get calls in and out of FreeSWITCH than shoehorning a SIP stack into their browser.  In this respect it's quite similar to Matrix, but there are some huge differences:
<ul>
 <li>Verto doesn't (yet) do federation - either for message-passing (like XMPP) or history-replication (like Matrix or XMPP FMUCs).  In fact, Matrix fundamentally competes more with JSON-RPC at OSI layer 5 by defining a standardised RESTful API for federated state synchronisation - which so happens to define some datatypes for VoIP signalling; whereas Verto currently seems to be focused solely on the application-layer problem of VoIP signalling.</li>
 <li>Verto is a generic RPC API with method names like verto.invite, verto.answer, verto.media, verto.bye etc. for handling call signalling.  It's obviously readily extensible to any other functionality expressed as an RPC invocation.  The Matrix client-server API however passes around event objects within the context of a room - it's message passing rather than RPC.</li>
 <li>Matrix's VoIP events support trickle-ICE; announcing ICE candidates from WebRTC as and when they become available.  This good is for speedy call-setup (you don't have to wait for all ICE to complete before setting up the call) and to support call continuity when roaming between different IP networks (in theory).  However, Verto currently requires ICE candidates to be presented monolithically - it hasn't made sense to implement trickle-ICE as FreeSWITCH's core engine doesn't support it yet.</li>
        <li>Verto looks to be wired to speak JSON-RPC over Websockets, whereas Matrix deliberately uses plain old HTTP as its baseline for maximum simplicity and compatibility in PUTting and GETting JSON events around</li>
 <li>Verto could be an interoperable standard but the API hasn't been documented yet (unless I've totally missed it) - to build the bot we looked at the websockets tab in Chrome's network inspector and drew some inferences from the <a href="https://github.com/matrix-org/synapse/blob/e43139ac5e1f337d9a82ee16d9a4f15195120ec3/contrib/vertobot/verto-example.json">JSON seen in a call</a> placed using the <a href="https://webrtc.freeswitch.org/verto">FreeSWITCH Verto demo site</a>, which was very intuitive and almost self-documenting.  Meanwhile, the (minimal) doc for Matrix's events is up at <a href="http://matrix.org/docs/spec/#voice-over-ip">http://matrix.org/docs/spec/#voice-over-ip</a>.</li>
</ul>
Verto has a huge advantage however, in that FreeSWITCH has a mod_verto today, and doesn't have a mod_matrix - so one can use mod_verto right now as an easy way to get VoIP calls in and out of FreeSWITCH from the web and bridge them to SIP!  So, when writing a Matrix&lt;-&gt;SIP bridging bot for VUC, Verto turned out to be a really nice way to quickly get something up and running.  The end result is at <a href="https://github.com/matrix-org/synapse/blob/e43139ac5e1f337d9a82ee16d9a4f15195120ec3/contrib/vertobot/bot.pl">https://github.com/matrix-org/synapse/blob/develop/contrib/vertobot/bot.pl</a> - a (precisely!) 300 line perl script built on LeoNerd's <a href="https://metacpan.org/release/Net-Async-Matrix">Net-Async-Matrix</a> and <a href="https://metacpan.org/release/Net::Async::Protocol::WebSocket">Net::Async::Protocol::WebSocket</a> which logs into Matrix and routes any 1:1 audio calls it receives through to the defined mod_verto service.  Currently it gleefully hardcodes in the destination extension it calls and the caller-ID, but this could trivially be extended.  It also chokes on SSL WebSockets, so your mod_verto needs to be listening unencrypted on port 8081.

The task of mapping between Matrix m.call.*VoIP events and Verto verto.* RPC methods was almost entirely trivial (although I hasten to add that Matrix's and Verto's were developed completely independently - it's just that there are only so many ways to express VoIP signalling in JSON!)
<ul>
 <li>Matrix's m.call.invite is equivalent to the combination of verto.invite + verto.media (but may lack ICE candidates)</li>
 <li>Matrix's m.call.candidates has no direct equivalent, so has to be coalesced and merged into verto.media</li>
 <li>Matrix's m.call.answer is equivalent to verto.answer (but may lack ICE candidates)</li>
 <li>Matrix's m.room.displayname is equivalent to verto.display (assuming I understand verto.display)</li>
 <li>Matrix's m.call.hangup is equivalent to verto.bye</li>
 <li>…and these are the only verto RPCs we mapped.</li>
</ul>
For the demo itself, we obviously needed a FreeSWITCH with mod_verto all up and running to hook into the ZipDX bridge: our friends at <a href="http://truphone.com">Truphone</a> were good enough to provide one at zero notice (Thanks James, Andy, Giacomo!), and we were up and running.

Unfortunately we did hit some problems: Net::Async::Matrix has a few quirks which LeoNerd is working out currently; the bot doesn't coalesce the trickle-ICE properly currently causing a race-condition that means ICE setup may fail; Matthew's use of IO::Async was a bit buggy; and moreover we didn't have time to implement DTMF… which was a bit of a shame as you can only unmute yourself on the ZipDX bridge via DTMF *5!

But in general, the mini-hackathon was a success and it was great fun to be able to listen into VUC via the bridge and demonstrate the first ever Matrix&lt;-&gt;SIP call!  The bot ran as @vucbot:matrix.org, although is turned off now as there's no VUC to listen to, and the FreeSWITCH & bot were only deployed temporarily.  Once the kinks mentioned above are sorted out we'll hopefully set it running again permanently!  And hopefully this little bot is an exciting precursor to more robust Matrix bridges and application services in the months to come...

If you're crazy enough to want to try to run the bot yourself, then it should actually be quite simple to get up and running:

```bash
# grab synapse if you don't have it already
git clone <https://github.com/matrix-org/synapse.git> synapse-develop
cd synapse-develop

# you'll need the develop branch, as we haven't released a build with vertobot in it yet

git checkout develop
cd contrib/vertobot

# you'll need cpanm to install the perl dependencies

cpan -i App::cpanminus
cpanm --installdeps .

# manually install a develop version of Net::Async::Matrix as cpanm can't figure it out, seemingly

cpanm --force PEVANS/Net-Async-Matrix-0.11_002

# (you may need to also replace the 'croak' for the "Already have a room with ID" error with 'warn' in Net::Async::Matrix if the bot crashes with this error)

# create a username account for your bot on a Matrix homeserver somewhere at this point

# set up a config file

cp config.yaml mybot.yaml

# edit mybot.yaml to taste - at the least you must specify the login & password & homeserver for your bot

# run it

./bot.pl -c mybot.yaml
```

Finally, huge thanks to everyone to helped make the VUC bridging escapade work out - Emil Ivov at Jitsi, James Body, Andy Smith and Giacomo Vacca at Truphone, Anthony Minesalle & Mike Jerris & Brian West at FreeSWITCH for writing freeswitch and mod_verto, Tim Panton for the VUC intro and suggestion of mod_verto, Randy Resnick & Michael Graves at VUC itself, and of course the Matrix team for glueing our side of it together!

Looking forward to lots more ambitious cross-protocol gatewaying and federation in future!
