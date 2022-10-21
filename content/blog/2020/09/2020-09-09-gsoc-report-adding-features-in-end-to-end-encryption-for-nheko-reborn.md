+++
title = "GSOC report: Adding Features in End-to-End encryption for Nheko-Reborn"
path = "/blog/2020/09/09/gsoc-report-adding-features-in-end-to-end-encryption-for-nheko-reborn"

[taxonomies]
author = ["CH Chethan Reddy"]
category = ["GSOC"]
+++

This is part of a series of reports on the [*six* projects](https://summerofcode.withgoogle.com/organizations/6060943798173696) assigned to Matrix for Google Summer of Code 2020.

[View project: Adding Features in End-to-End encryption for Nheko-Reborn](https://summerofcode.withgoogle.com/organizations/6060943798173696/#6274781747347456)

This is a re-publishing of Chetan's [original blog post](https://chethan2k1.github.io/blog/working-with-matrix.html).

----

## whoami?

I'm [CH Chethan Reddy](https://github.com/Chethan2k1). I'm currently pursuing Bachelors in Electronics and Communication Engineering at the [National Institute of Technology, Trichy in India](https://www.nitt.edu/). In my free time I like to swim, work on projects I find interesting, watch movies and do a lot of other "interesting" stuff. This summer I have interned in Matrix.org for around 3-4 months under GSoC and in this blog I'll be sharing my experience.

## Why Matrix.org?

Being passionate about privacy, I wanted to select an organization that actively works on that, and clearly, Matrix.org topped my list. For anyone who doesn't know what Matrix is, in simple words, It is a decentralized communication protocol that supports many awesome features like messaging, end-to-end encryption, voip/video calls support, etc. It uses simple RESTful http APIs which keeps things very simple. The best part of the protocol is, it is decentralized, so if you have a custom domain name, you can setup a synapse server in a jiffy. Knowing all these who wouldn't choose Matrix?

## My Work

I worked on Desktop Client called [Nheko](https://github.com/Nheko-Reborn/nheko). It is a light-weight Desktop Client that uses Qt Framework in the frontend and also uses a mtxclient library that implements Matrix-client server API written in C++. The scope of my project involved implementing Device-Verification and Cross-Signing in Nheko.

For people who have not used Matrix before, it is important to note that every device of a particular user is considered as a separate unit rather than user itself. For end-to-end encrypted chat to be viewable from a device, that particular device should be trusted by the sender's device. Device-verification and Cross-Signing are methods used for verifying.

Coming to [the work I have implemented](https://chethan2k1.github.io/blog/final-report.html), Device-verification is completely implemented in Nheko. As of now, SAS verification with to-device and room message verification is supported in Nheko. As far as Cross-Signing is concerned, verifying signatures of Cross-Signing keys and showing the verified status of devices have been implemented. The only remaining unfinished parts are SSSS and signing the keys after verification. After that Cross-signing should be feature-complete.

I wished to implement SSSS during my GSoC period, but I couldn't because I did not anticipate the additional things which came with verification while making my proposal. The additional works included : implementing the UI, changes to the userprofile dialog, working on the caching of verified users, and user keys. Moreover, due to the current pandemic, there were a few sudden changes in my academic schedule, which interrupted my work to some extent. While contributing at times I was stuck on some bugs like verifying the signatures, some random crashes in UserProfile and setting up relations in Room-Verification. However, with the help of my mentors, I was able to fix these bugs.

I'm really happy about the work I have done. I am hoping to further work on Nheko in the future, complete Cross-Signing and work on additional features for Nheko.

## Community and Mentors

The best part of my experience this summer was the the Matrix community and the learning I had. I am really lucky to be part of the Matrix community which has many passionate people collectively working on really cool projects with clients, bridges, servers, bots and the spec. A special thanks to Uhoreg and Sorunome who have helped me in navigating through the spec.

Last but not the least, a big shout-out to both my mentors, Nico and red_sky, who were always there to help me with any issue in the project in spite of their personal commitments and dealt with my stupid questions with utmost patience and kindness. Without their active help and guidance this experience definitely would not have been so fun and great, they have clearly surpassed the expectations I had from mentors.
