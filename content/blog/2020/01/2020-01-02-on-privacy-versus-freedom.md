+++
title = "On Privacy versus Freedom"
path = "/blog/2020/01/02/on-privacy-versus-freedom"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Thoughts"]
+++

A few years ago, back when Matrix was originally implementing end-to-end encryption, we asked Moxie (the project lead for Signal) whether he’d ever consider connecting Signal (then TextSecure) to Matrix.  After all, one of Matrix’s goals is to be an interoperability layer between other communication silos, and one of the reasons for us using Signal’s Double Ratchet Algorithm for Matrix’s encryption was to increase our chances of one day connecting with other apps using the same algorithm (Signal, WhatsApp, Google Allo, Skype, etc).  Moxie politely declined, and then a few months later wrote “[The ecosystem is moving](https://signal.org/blog/the-ecosystem-is-moving/)” to elaborate his thoughts on why he feels he “no longer believes that it is possible to build a competitive federated messenger at all.”

At the time we didn’t respond via a blog post; instead we ended up talking it through a few times in person to see how misaligned we really were. The conclusion was that we agreed to disagree and Moxie said he’d be happy to be proved wrong, and wished us good luck.  However, the subject has come up again thanks to [Moxie’s talk on the same subject](https://fahrplan.events.ccc.de/congress/2019/Fahrplan/events/11086.html) at 36C3 last week, and we [keep](https://news.ycombinator.com/item?id=21933891) [getting](https://news.ycombinator.com/item?id=21935219) [asked](https://matrix.to/#/!OGEhHVWSdvArJzumhm:matrix.org/$SzdpeR_Hji5AMOkydnYzv5UN_UaGdN710ThF-lfAt9A?via=matrix.org&via=t2bot.io&via=privacytools.io) to write a formal response on the Matrix side.  So, here’s an attempt to do so.  (Moxie didn’t want the 36C3 talk recorded, and I haven’t watched it, so this is responding to the original blog post).

From my perspective, the main points proposed in ‘The ecosystem is moving’ boil down to:

* Decentralised systems are harder to design and build than centralised ones, as coordination is harder if you don’t have a single authority to trust.

* Decentralised systems are harder and slower to evolve than centralised ones, as you can’t force participants to rapidly roll out (or even agree on) new features.

* Users in federated systems tend to coalesce around the best/biggest server that the bulk of people use - which means that server typically gets to see a disproportionate amount of communication metadata (who’s talking to who, and when), and has disproportionate power over the network, which could bully others away from running their own deployments.

* If users don’t trust their app provider, they can always go switch apps, which gives them freedom.

* Open systems are less secure because you have no control over the quality of the implementations - if anyone can bring their own client or server to the table, all it takes is one bad implementation to compromise everyone in the vicinity.

Now, all of these points are valid to some extent.

It’s absolutely true that decentralised systems are harder than centralised ones.  Prior to Matrix we built centralised comms systems - we literally can do a side-by-side comparison for the same team to see how easily and fast we built our centralised comms system relative to Matrix.  Empirically It took us around 6 times longer to get to the same feature-set with Matrix.

It’s also true that decentralised systems are harder to evolve than centralised ones - you can’t just push out a given feature with a single app update, but you have to agree and publish a public spec, support incremental migration, and build governance processes and community dynamics which encourage everyone to implement and upgrade.  This is hard, but not impossible: we’ve spent loads of time and money on Matrix’s [governance model](https://matrix.org/foundation/) and [spec process](https://matrix.org/docs/spec/proposals) to get it right.  It’s still not perfect, but we haven’t seen much fragmentation so far, and when we’re pushing out a feature empirically we can and do go just as fast as the centralised alternatives. (E2E by default is a bit of a special case because we’ve had to go and reimplement many features users take for granted today in an E2E-capable manner, but we’re sprinting to get it done in the coming weeks).  A bigger problem is that there are hundreds of spec change proposals which folks would like to see in the protocol, and finding a way to manage expectations and parallelise spec progress is hard - something we’re looking to improve in 2020 (although still figuring out how!)

It’s also fair that in a multi-server federated model, users naturally tend to sign up on the most prominent server(s) (e.g. the matrix.org homeserver in the case of Matrix).  In practice, the matrix.org homeserver currently makes up about 35% of the visible Matrix network by active users.  It’s also true that Matrix servers currently store metadata about who’s talking to who, and when, as a side-effect of storing and relaying messages on behalf of their users.  And without an adequate protocol governance system in place, a large server could start pushing around smaller ones in terms of protocol behaviour.  In practice, we’re looking into solving metadata protection in Matrix by experimenting with hybrid P2P / Client Server models - letting users store their metadata purely clientside if they so desire, and potentially obfuscating who’s talking to who via mixnets of blinded store & forward servers (more about this coming up at [FOSDEM](https://fosdem.org/2020/schedule/event/dip_p2p_matrix/)). Combined with [nomadic accounts](https://github.com/matrix-org/matrix-doc/blob/rav/proposal/remove_mxids_from_events/proposals/1228-removing-mxids-from-events.md), this would let us eventually turn off the matrix.org server entirely and eliminate the pseudo-centralisation effect - the default ‘server’ would be the one running on your client.

It’s true that if a user doesn’t trust (say) Telegram, they are free to go switch to Signal or WhatsApp or whatever instead… at the massive expense of having to persuade all their friends to install yet another app, and fragmenting their conversation history across multiple apps.

Finally, it’s also true that because anyone can develop a Matrix client or server and connect to the global network, there’s a risk of bad quality implementations in the wild.  There are many forks of Riot on the app stores - we simply can’t vouch for whether they are secure.  Similarly there are Matrix clients whose E2E encryption is partial, missing, or unreviewed.  And there are a wide range of different Matrix servers run by different people with different agendas in different locations, which may be more or less trustworthy.

**HOWEVER: all of this completely ignores one critical thing - the value of freedom**.  Freedom to select which server to use.  Freedom to run your own server (perhaps invisibly in your app, in a P2P world). Freedom to pick which country your server runs in. Freedom to select how much metadata and history to keep. Freedom to choose which apps to use - while still having the freedom to talk to anyone you like (without them necessarily installing yet another app).  Freedom to connect your own functionality - bots, bridges, integrations etc.  Freedom to select which identifiers (if any) to use to register your account.  Freedom to extend the protocol.  Freedom to write your own client, or build whole new as-yet-unimagined systems on top.

It’s true that if you’re writing a messaging app optimised for privacy at any cost, Moxie’s approach is one way to do it. However, this ends up being a perversely closed world - a closed network, where unofficial clients are banned, with no platform to build on, no open standards, and you end up thoroughly putting all your eggs in one basket, trusting past, present & future Signal to retain its values, stay up and somehow dodge compromise & censorship… despite probably being the single highest value attack target on the ‘net.

Quite simply, that isn’t a world I want to live in.

We owe the entire success of the Internet (let alone the Web) to openness, interoperability and decentralisation.  To declare that openness, interoperability and decentralisation is ‘too hard’ and not worth the effort when building a messaging solution is to throw away *all* the potential of the vibrancy, creativity and innovation that comes from an open network.  Sure, you may end up with a super-private messaging app - but one that starts to smell alarmingly like a walled garden like Facebook’s Internet.org initiative, or an AOL keyword, or Google’s AMP.  

So, we continue to gladly take up Moxie’s challenge to prove him wrong - to show that it’s both possible and imperative to create an open decentralised messaging platform which (if you use reputable apps and servers) can be as secure and metadata-protecting as Signal… and indeed more so, given you can run your server off the grid, and don’t need to register with a phone number, and in future may not even need a server at all.

--Matthew

(Comments over at [HN](https://news.ycombinator.com/item?id=21936929))
