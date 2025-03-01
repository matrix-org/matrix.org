+++
title = "Experiments with payments over Matrix"
path = "/blog/2019/03/07/experiments-with-payments-over-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["In the News"]
+++

Hi all,

Heads up that<a href="https://modular.im"> Modular.im</a> (the paid hosting Matrix service provided by <a href="https://vector.im">New Vector</a>, the company who employs much of the Matrix core team) launched a pilot today for paid Matrix integrations in the form of paid sticker packs.  Yes kids, it's true - for only $0.50 you can slap Matrix and Riot hex stickers all over your chatrooms. It's a toy example to test the payments infrastructure and demonstrate the concept - the proceeds go towards funding development work on Matrix.org :)  
You can read more about over on <a href="https://www.modular.im/stickers">Modular's blog</a>.

We wanted to elaborate on this a bit from the Matrix.org perspective, specifically:

<ul>
  <li style="font-weight: 400;">We are categorically <strong>not</strong> baking payments or financial incentives as a first class citizen into Matrix, and we're not going to start moving stuff behind paywalls or similar.
</li>
  <li style="font-weight: 400;">This demo is a proof-of-concept to illustrate how folks could do this sort of thing in general in Matrix - it's not a serious product in and of itself.
</li>
  <li style="font-weight: 400;">What it shows is that an Integration Manager like Modular can be used as a way to charge for services in Matrix - whether that's digital content within an integration, or bots/bridges/etc.
</li>
  <li style="font-weight: 400;">While Modular today gathers payments via credit-card (Stripe), it could certainly support other mechanisms (e.g. cryptocurrencies) in future.
</li>
  <li style="font-weight: 400;">The idea in future is for Modular to provide this as a mechanism that <em>anyone</em> can use to charge for content on Matrix - e.g. if you have your own sticker pack and want to sell it to people, you'll be able to upload it and charge people for it.
</li>
</ul>
Meanwhile, there's a lot of interesting stuff on the horizon with integration managers in general - see <a href="https://github.com/matrix-org/matrix-doc/issues/1236">MSC1236</a> and an upcoming MSC from TravisR (based around <a href="https://github.com/matrix-org/matrix-doc/issues/1286">https://github.com/matrix-org/matrix-doc/issues/1286</a>) proposing new integration capabilities.  We're also hoping to implement inline widgets soon (e.g. chatbot buttons for voting and other semantic behaviour) which should make widgets even more interesting!

So, feel free to go stick some hex stickers on your rooms if you like and help test this out.  In future there should be more useful things available :)
