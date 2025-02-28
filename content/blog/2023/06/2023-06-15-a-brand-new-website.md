+++
title = "A brand new website"
date = "2023-06-15T15:21:45Z"
updated = "2023-06-15T14:16:31Z"
path = "/blog/2023/06/15/a-brand-new-website"

[taxonomies]
author = ["Thib"]
category = ["General"]

[extra]
image = "https://matrix.org/blog/img/new-morg.png"
+++

Hello federation,

**TLDR: New website is coming tomorrow, your RSS reader might be disoriented during the switch.**

That's right, after several months of studying, designing and implementing: we're finally going to deploy the new matrix.org website on June 16! Let's have a look back at the why and how.

I also need to thank Jonas Platte not only for his technical expertise but also for his kind support and patience. Thanks to MTRNord as well for kickstarting the project, and to the various designers involved.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/blog/img/new-morg.png)

<!-- more -->

## Growing is exciting

The website you have been used to for a few years grew organically with Matrix. The protocol was maturing, the community was getting wider, Matrix was getting more traction in various places, the commercial activity around Matrix allowed companies to hire people to work on the protocol and implementations around it, and as a lot of content was produced.

This growth was an exciting period and we couldn't resist the call to publish documentation, add projects to the website… if not new sections entirely!

This enthusiasm had two major drawbacks:

1. **Lack of structure.** The website tried to yell everything to everyone at once. You didn't know what Matrix was? It yelled open communication decentralised end-to-end encrypted VoIP bridging VR and more at you!
2. **Lack of maintenance.** Adding content is exciting and satisfying, but maintaining and updating said content in the long run is a tedious task that requires a lot more work. Outdated content gives active projects a bad look, and Matrix is no exception.

Over the time, the website has become difficult to navigate even for seasoned users, and some of the content didn't match the state of affairs in Matrix.

## Website existential crisis

The matrix.org website needed more than a facelift: a coat of paint can't fix a message that doesn't get across. The first question to answer was: who are we talking to? The question might sound trivial but trying to answer it as a project can lead you into an existential crisis.

Matrix is a protocol, and not a product. Matrix is the fertile ground you can use to grow completely different applications for radically different audiences. You can make an instant messaging application. You can make a VoIP conferencing system. You can use it to bridge several platforms together even if no user interacts with Matrix directly.

We narrowed down the audience to three categories, each with their different interests and needs:

1. **The general public** who wants to use **products** for instant messaging with their friends and family. They are not necessarily tech-savvy and want something that _just works™_. They don't particularly care about Matrix, and could be using other popular instant messaging apps.
2. **Community managers** who want to find a platform their community can organise on. They might be a little more tech-savvy than the general public and are willing to spend more time understanding how to use products, but they are not necessarily able to self-host, deploy or build software by themselves.
3. **Developers** who obviously are tech-literate. They are interested in how things work from a technical perspective. They want to get an overview of the ecosystem and easily find the tools that will allow them to play with Matrix or build products on top of it. They can also be entrepreneurs who want to see the value of creating products on top of Matrix.

These categories are ordered by complexity of the message we can convey to catch their attention: the general public wants to know what products can do for them at a glance, while the developers will be more interested in spending time understanding the technicalities of the protocol.

Importantly: the website needs to be accessible. Eventually we want it to be WCAG 2.1 compliant. If you find something that is not accessible, please report it [in our issue tracker](https://github.com/matrix-org/matrix.org/issues) and we'll get to it!

## Less is more

The most obvious issue we had was that the website tried to showcase the richness of the Matrix ecosystem to the user right as they arrived. Matrix is not a consumer ready product in itself, but its most popular use case is instant messaging. This is also a very tangible use case with actual products the general public can use.

**The new website is making a lot of room for the communications use case and in particular for instant messaging**, but we are open to reshuffle or add sections if the need arises. The landing page and "Try Matrix" one have been reworked to onboard people more easily.

The projects sections also now allow you to filter projects by maturity and features supported (or e.g. programming language, when the pages are meant for developers), and a few clients are in the featured section to make choosing one easier.

Finally our stance on documentation has changed: **each project is responsible for its own documentation, and duplicating project-specific documentation on the website can cause more harm than good.** The documentation on matrix.org should be as generic and as product-independent _as reasonable_.

As a developer advocate, it is in my direct interest to make sure the Foundation remains as neutral as possible and to make room for everyone in our community of individuals and vendors working on Matrix. This was a difficult decision to make, but I (Thib) decided to use the Element client to illustrate the end-user and community manager documentation to flesh them out and show concrete _first steps_ taken in a Matrix journey, regularly reminding readers that they can use another client whenever they want.

If you feel strongly about it and have ideas about how to make the docs more vendor-neutral, please head out to our [issues tracker](https://github.com/matrix-org/matrix.org/issues) and let us know about it!

Finally, **we made sure that the website can be browsed without javascript enabled**. I'm not just talking about trackers which we would not even think about introducing, but about the little vanilla javascript we used here and there to improve the experience (e.g. filters to pick the best suited client for you).

## Future plans

The most important step ahead is to create [a public instance picker](https://github.com/matrix-org/matrix.org/issues/1570). The two major benefits expected are:

- Easier onboarding for most Matrix clients who can reuse the data
- More decentralisation by reducing the need to default on matrix.org

Another significant improvement to the website would be the creation of an engine that pulls data directly from the git repositories of the various projects to keep track of information such as the release date. Nothing is set in stone regarding how to make it work, and the community will be consulted to make the tool painless to use for all.

There is also still a lot of work to do in terms of processes. You might see on the website that the various projects have a maturity assigned to them, or that some projects are featured. Both of those are useful to get a sense of what project is relevant to you, but for now they are "Thib's picks". More formal processes would benefit the Matrix community as a whole. If you want to get involved in the conversation, please share your thoughts in [this issue](https://github.com/matrix-org/matrix.org/issues/1584).
