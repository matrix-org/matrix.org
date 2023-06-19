+++
title = "The story of Giveth’s new Matrix chatbot"
path = "/blog/2018/10/11/the-story-of-giveths-new-matrix-chatbot"

[taxonomies]
author = ["Eli Etzioni"]
category = ["General"]
+++

Guest post today from <a href="https://giveth.io/">Giveth</a>: <em>Giveth is re-engineering charitable giving, by creating an entirely free, open-source platform, built on the Ethereum Blockchain. Our system cuts out bureaucracy and enables nonprofits to create a high level of transparency and accountability towards Givers.</em>

<hr />

<a href="/blog/wp-content/uploads/2018/10/giveth1.png"><img class="alignnone size-full wp-image-3629" src="/blog/wp-content/uploads/2018/10/giveth1.png" alt="" width="901" height="253" /></a>

<i>Giveth's new chatbot in action!
</i>

Online or offline, joining a new community always requires some adjustment. Even the most open, inclusive communities have shared knowledge and shared practices which new members learn as they participate. 


I recently joined <a href="https://giveth.io">Giveth's</a> Riot community, where the majority of Giveth's communication occurs. Immediately upon joining, I received the message pictured above from the Giveth Bot, kindly encouraging me to download Riot mobile and change my notifications to mention-only. The bot shortened my adjustment period by giving me key tidbits of information that everyone in Giveth's community knows, but that may have taken me time to pick up on my own. This blog post will cover how the Giveth Bot came to be, what it is capable of, and where the project is headed in the future. 


The Giveth Bot actually started out as an attempt to solve a completely different problem: helping Giveth efficiently distribute internal reward points. Giveth's system for rewarding people who meaningfully contribute to the project is called RewardDAO. “If someone contributes in a meaningful way, a core contributor from each of the Giveth Campaigns can dish them points to recognize the contribution”, describes <a href="https://medium.com/@cle0">Cleo</a> in an article explaining <a href="https://medium.com/giveth/how-rewarddao-works-aka-what-are-points-7388f70269a">how RewardDAO works</a>. At the end of each month, contributors receive Ether based on how many points they have earned.


<a href="/blog/wp-content/uploads/2018/10/giveth2.png"><img class="alignnone size-large wp-image-3626" src="/blog/wp-content/uploads/2018/10/giveth2-1024x246.png" alt="" width="1024" height="246" /></a>

<i>The Giveth RewardDAO motto. Photo from https://medium.com/giveth.
</i>

However, any time that a core contributor dished points to someone, they had to record who received the points, and how many, on a spreadsheet. In search of a better way, Giveth opened up the project of automating this system to the <a href="https://medium.com/giveth/what-is-social-coding-fa81feacfa32">social coding hub</a>, a community of altruistic developers looking to tackle impactful and interesting projects, offering a 2 eth bounty for a solution.


A lot of great work was submitted, and ultimately Deam's (
<a href="https://twitter.com/deamlabs">@deamlabs</a>) code was chosen to power the bot and the code for the pointsbot itself was further developed and refined by <a href="https://github.com/FrederikBolding">Frederik Bolding</a>. Now, by using a command of the form “!dish [number] [type] points to [contributor] for [contribution]”, Giveth core contributors can distribute points as needed, and the bot will automatically update the spreadsheet accordingly.


<a href="/blog/wp-content/uploads/2018/10/giveth3.png"><img class="alignnone size-full wp-image-3628" src="/blog/wp-content/uploads/2018/10/giveth3.png" alt="" width="918" height="520" /></a>

<i>The Giveth Bot dishing points like a champion! 
</i>

Once the bot's framework was established, chatbot features were added. In addition to the welcome message I received, the bot gives custom welcome messages in each of Giveth's different rooms, allows Matrix users to have 1-on-1 chats with it, and listens for keywords and sentences it recognizes in rooms and private chats. Riot is built on top of an open-source protocol called Matrix. Matrix has a javascript standard development kit (SDK), which the bot uses to detect events occurring in each of the Riot rooms and chats that it is a part of.


Giveth began by using Slack, but switched to Riot to support Matrix's decentralized, open-source model, which which aligns far more with Giveth's own business model and values. The Giveth Bot is a great example of how Matrix enables users to build their own solutions to problems. In the future, we hope that the Giveth Bot will be able to interact directly with the Ethereum Blockchain, and that more analytics and measurement tools can be incorporated. And of course, we welcome any and all feedback on the Giveth Bot!


<i>Giveth is an open-source platform for building decentralized altruistic communities. Anyone interested in getting involved should head to 
</i><a href="https://giveth.io/join/"><i>join.giveth.io
</i></a>

<i>Interested in checking out the Giveth Bot's inner workings? All code is available at 
</i><a href="https://github.com/Giveth/giveth-bot"><i>https://github.com/Giveth/giveth-bot
</i></a><i>. 
</i>

<i>Interested in learning DApp development or helping out with cool projects like the Giveth Bot? Check out the 
</i><a href="https://riot.im/app/#/room/#giveth-social-coding:matrix.org"><i>social_coding Riot channel
</i></a><i>, tell us what you're interested in, and help build awesome stuff!
</i>
