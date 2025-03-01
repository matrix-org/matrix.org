+++
title = "The Matrix Holiday Mini-Special (2017 edition)"
path = "/blog/2017/12/25/the-matrix-holiday-mini-special-2017-edition"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

Hi folks,

Since we began Matrix it's been a sort of tradition to do a huge update on Christmas Eve to reflect on the past year and tease the future - you can check out the <a href="/blog/2016/12/26/the-matrix-holiday-special-2016-edition/">2016 edition</a> or the <a href="/blog/2015/12/25/the-matrix-holiday-special/">2015 edition</a> and a sort of <a href="/blog/2015/01/07/synapse-0-6-1-released-and-other-news/">proto-update for 2014</a> too if you're feeling nostalgic.  This year I'm going to try to keep it short though, as I'm hoping to write a Very Big Update related to long-term-funding progress in the relatively near future.

2017 has been a weird year for us: progress in the core team has been relatively badly impacted by the mission to secure long-term funding, with myself (Matthew) & Amandine spending the vast majority of our time handling the meta-problem of keeping the core team secure rather than actually working on the project itself.  Meanwhile we've lost a few of the original team during the disruption, which has particularly impacted Spec, E2E and Dendrite progress (such are the risks of running a very lean team in the first place!).  However, against the odds, we have (hopefully) prevailed - and this is almost <strong>entirely</strong> due to the massive support we've seen through donations via <a href="https://patreon.com/matrixdotorg">Patreon</a>, <a href="https://liberapay.com/matrixdotorg">Liberapay</a>, Ethereum, Bitcoin and <a href="https://paypal.me/matrixdotorg">PayPal</a>, and some much-appreciated paid consulting work.

Simply put, without the donation support we would have not been able to pay the core team over the last 3 months, and we would not be able to pay for the legal costs of setting up the team as an independent company, and we would be completely screwed for securing large-scale long-term funding if we couldn't point to the community's support as evidence that Matrix is worthy of funding.  So: we sincerely owe our thanks to those who heeded the <a href="/blog/2017/07/07/a-call-to-arms-supporting-matrix/">call to arms</a> and are supporting us.  We've also been pretty lucky in benefiting from the skyrocketing value of Ethereum and Bitcoin donations.  And even if/when long-term funding is secured for New Vector (the company we formed in July to hire the core team), donations will continue to be vital to support the Matrix.org Foundation itself as an independent non-profit entity - as it's obviously not in Matrix.org's interests to be entirely financially dependent on New Vector.  Hopefully this whole episode will end up being a bit like a <a href="http://www.startrek.com/article/john-trimbles-contribution-to-saving-star-trek">Save Star Trek</a> scenario - where something fun and amazing almost gets almost wiped out when it's only a few years old due to corporate factors... only for the community to band together to save it, and then for it to go from strength to strength for the next 50 years or more! :D

That said, we've made some major progress this year anyway: the addition of Widgets to Matrix; the addition of Communities (aka Groups) and Flair; major improvements to E2E encryption (even though it's not out of beta yet); lots of progress on Dendrite (the minimum-viable phase 1 is now about 75% complete); switching everything over to Jitsi for group video conferencing; rewriting onboarding for Riot/Web; Antiscam/spam support for cryptocommunities; the whole VR proof-of-concept of Matrix+WebVR+WebRTC video and voip calling; Version 0.3 of the Matrix spec; and a whole lot more which I'm probably forgetting right now.  And meanwhile the community has been more active than ever, with major new clients like <a href="https://github.com/mujx/nheko">Nheko</a> hitting the scene with a large and loyal community of open source contributors (over the last few weeks I've literally seen more nheko PRs fly past than Riot ones!) - and we've also been *incredibly* glad of community contributions towards Dendrite.  Dendrite is already way ahead of Synapse in terms of % community contributed code - we have hope that it will end up being a model FOSS project :)

So what lies ahead?  It's hard to predict the level of progress we're going to make in the core team, as it really depends on long-term funding.  Whatever happens, one of our top priorities is to improve our governance so that everyone can better contribute in places that have historically been more blocked on the core team (i.e. the spec; synapse)... whilst still maintaining coherency across the project.  Ideally we'll end up with more folks pushing Matrix forwards from both the wider world and the core team however, and right now the main priorities are:
<ul>
  <li>Phase 2 of Communities: letting users filter their current view of Matrix to rooms associated with a given subset of communities (if desired), for Slack/Discord-style semantics</li>
  <li>Fixing the remaining end-to-end encryption failures (although the majority of them have now been solved)</li>
  <li>Finalising proper UI/UX for end-to-end encryption (at last), including the option to transparently back up your room keys if desired.</li>
  <li>Dendrite Phase 1</li>
  <li>Performance in Riot (on all platforms)</li>
  <li>Editable messages</li>
  <li>Reactions</li>
  <li>Making widgets much more useful</li>
  <li>Paid integrations and hosting options to help avoid further funding nightmares.</li>
</ul>
Looking at the bigger picture, what we'd really love for 2018 would be to finally get to a 1.0 release of the Matrix Spec (i.e. catching up on our massive backlog of merging unstable spec drafts & proposals into the spec) - and for Dendrite to start to replace Synapse as the reference home server from Matrix.org and become really ubiquitous, and for E2E encryption be turned on by default in private rooms.  Beyond the above list, we don't really have any other features urgently planned (threading, for instance, is on hold until we have the rest of the above sorted) - but we believe that if we stabilise everything we have today (plus that list), then there is no reason for Matrix to not fulfil its full potential as a true global open decentralised communications standard.  And then it's on to threading, P2P matrix, decentralised reputation and all that good stuff!

It's going to be a crazy year ahead, either way: so thank you, once again, for supporting Matrix - whether that's financially, or by contributing code, or running a server, or just using the protocol as a user.  We literally wouldn't be here without you!! :)

Matthew, Amandine & the whole core team.
