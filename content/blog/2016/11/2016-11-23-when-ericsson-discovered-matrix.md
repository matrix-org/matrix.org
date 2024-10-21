+++
title = "When Ericsson discovered Matrix..."
path = "/blog/2016/11/23/when-ericsson-discovered-matrix"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

<i>As something completely different, we've invited Stefan Ålund and his team at Ericsson to write a guest blog
post about the really cool stuff Ericsson is doing with Matrix.  This is a fascinating glimpse into how major folks
are already launching commercial products on top of Matrix - whilst also making significant contributions back to
the projects and the community.  We'd like to thank Stefan and Ericsson for all their support and perseverance,
and we wish them the very best with the Ericsson Contextual Communication Cloud!
</i>

<i>-- Matthew
</i>

At the end of 2014, my colleague Adam Bergkvist and I attended the WebRTC Expo in Paris, partly to promote our
Open Source project <a href="https://www.openwebrtc.org">OpenWebRTC</a>, but also to meet the rest of the European
WebRTC community and see what others were working on.

At Ericsson Research we had been working on WebRTC for quite some time. Not only on the client-side framework and
how those could enable some truly <a href="https://www.youtube.com/watch?v=0nl0fuWzoGk">experimental stuff</a>, but
more importantly how this emerging technology could be used to build new kinds of communication services where
communication is not *the* service (A calling B), but is integrated as part of some other service or context. A simple
example would be a health care solution, where the starting point could be the patient records and communication
technologies are integrated to enable remote discussions between patients and their doctors.

Our research in this area, that we started calling “contextual communication”, pointed in a different direction from
Ericsson's traditional communication business, therefore making it hard for us to transfer our ideas and technologies
out from Ericsson Research. We increasingly had the feeling that we needed to build something new and start from a
clean slate, so to speak.

Some of our guiding principles:

<ul>
  <li style="font-weight: 400;">Flexibility - the communication should be able to integrate anywhere
</li>
  <li style="font-weight: 400;">Fast iterations - browsers and WebRTC are moving targets
</li>
  <li style="font-weight: 400;">Open - interoperability is important for communication systems
</li>
  <li style="font-weight: 400;">Low cost - operations for the core communication should approach 0
</li>
  <li style="font-weight: 400;">Trust - build on the Ericsson brand and technology leadership
</li>
</ul>
We had a pretty good idea about what we wanted to build, but even though Ericsson is a big company, the team working in this area was relatively small and also had a number of other commitments that we couldn't abandon.

I think that is enough of a background, let's circle back to the WebRTC Expo and the reason why I am writing this post on the Matrix blog.

Adam and I were pretty busy in <a href="https://twitter.com/OpenWebRTC/status/544781293838684161">our booth</a> talking
to people and giving demos, so we actually missed when Matrix won
the <a href="/blog/2014/12/24/matrix-wins-best-innovation-award-at-webrtc-paris/"> Best Innovation Award</a>.
Nonetheless we finally got some time to walk around and I started chatting with Matthew and Amandine who were manning
the Matrix booth. Needless to say, I was really impressed with their vision and what they wanted to build. The
comparison to email and how they wanted to make it possible to build an interoperable bridge between communication
“islands”, all in an open (source) manner, really appealed to me.

To be honest, the altruistic aspects of decentralising communication was not the most important part for us,
even if we were sympathetic to the cause, working for a company that was founded from
"<a href="http://www.ericsson.hr/lars-magnus-ericsson-entrepreneur">the belief that communication is a basic human need</a>".
We ultimately wanted to build a new kind of communication offering from Ericsson, and it looked like Matrix might be able
to play a part in that.

I had recently hired a couple of <a href="http://teknikspranget.se">interns</a> and as soon as I came back from Paris, we
set them to work evaluating Matrix. They were quickly able to port an existing WebRTC service (developed and used in-house)
to use Matrix signalling and user management. We initially had some concerns about the maturity of the reference
Home Server <a href="https://github.com/matrix-org/synapse">implementation</a> (remember, this was almost 2 years ago) and
we didn't want to start developing our own since we were still a small team. However, Matthew and the rest of the Matrix
team worked closely with us, helping to answer all our (dumb) questions and we finally got to a point where we had the
confidence to say “screw it, let's try this and see if it flies”. ?

Ericsson had recently launched the <a href="https://www.ericsson.com/innovation/ericsson-garage">Ericsson Garage</a> where
employees could pitch ideas for how to build new business. So we decided to give the process a try and presented an idea
on how Ericsson could start selling contextual communication as-a-Service, directly to enterprises that wanted help
integrating communication into their business processes, but didn't necessarily have the competence or business interest
to run their own communication services. We got accepted and moved (physically) out of Research to sit in the Garage for
the next 4 months, developing a <a href="https://en.wikipedia.org/wiki/Minimum_viable_product">MVP</a>.

Since the primary interface to our offering would be through SDKs on various platforms, we decided early on to develop our
own. The SDKs were implementing the standard Matrix specification, but we put a lot of time in increasing the robustness
and flexibility in the WebRTC call handling and eventually with added peer-2-peer data and collaboration features, on top
of the secure WebRTC <a href="https://tools.ietf.org/html/draft-ietf-rtcweb-data-channel-13">DataChannel</a>. On the
server side, our initialconcerns about Synapse were eventually removed completely as the Matrix team relentlessly kept
working on fixing performance issues, patching security holes and provided a story on how to scale. Over the years we
have contributed with several patches to Synapse (SAML auth and auth improvements; application service improvements) and
provided input to the Matrix specification. We have always found the Matrix team be very inclusive and easy to work with.

The project graduated successfully from the Ericsson Garage and moved in to Ericsson's Business Unit IT & Cloud
Products, where we started to increase the size of the team and just last month signed a contract with our first
customer. We call the solution Ericsson Contextual Communication Cloud, or ECCC for short, and it can be summarised on a
high level by the following picture:

<img class="aligncenter size-full wp-image-1852" src="/blog/wp-content/uploads/2016/11/Picture1.png" alt="ECCC in a nutshell" width="975" height="546" />

If you are interested in ECCC, feel free to reach out at <a href="https://discuss.c3.ericsson.net">https://discuss.c3.ericsson.net</a>

As with any project developed in the open, it is essential to have a healthy community around it. We have received
excellent support from the Matrix project and they have always been open for discussion, engaged our developers and
listened to our needs. We depend on Matrix now and we see great potential for the future. We hope that others will adopt the
technology and help make the community grow even stronger.

- Stefan Ålund and the Ericsson ECCC Team
