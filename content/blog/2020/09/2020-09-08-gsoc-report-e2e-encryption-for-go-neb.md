+++
title = "GSOC report: E2E encryption for go-neb"
date = "2020-09-08T17:37:43Z"
path = "/blog/2020/09/08/gsoc-report-e2e-encryption-for-go-neb"

[taxonomies]
author = ["Nikolaos Filippakis"]
category = ["GSOC"]
+++

This is part of a series of reports on the [*six* projects](https://summerofcode.withgoogle.com/organizations/6060943798173696) assigned to Matrix for Google Summer of Code 2020.

[View project: E2E encryption for go-neb](https://summerofcode.withgoogle.com/organizations/6060943798173696/#5910277670830080)

----

Hello! I am [Nikos](https://github.com/nikofil), an MSc student in Computer Security. My original goal for this GSoC was to implement the basics of end-to-end encryption for [Go-NEB](https://github.com/matrix-org/go-neb), which is a popular and easily extendable bot for the Matrix protocol. I chose this project because it ticked off a lot of the boxes that I look for in a project: The Matrix protocol is very interesting and the e2e specification is fascinating, Go-NEB is written in Go which I wanted to learn better, plus I believe personally that crypto should be easy for everyone to use and adopted more.

My initial plan was to first create bindings in gomatrix for libolm, the C library that implements most of the necessary algorithms for Olm/Megolm, the protocols used in Matrix' end-to-end encryption. Then, I was going to write some nice APIs around those bindings so that most of the work done is hidden from the client that uses the library, and finally I would call these APIs from [Go-NEB](https://github.com/matrix-org/go-neb) when needed to set up the encrypted sessions between devices in a room and use them to encrypt/decrypt messages as necessary. What we found out soon after GSoC started was that another library called [mautrix-go](https://github.com/tulir/mautrix-go) that was based on gomatrix already did most of these things. My task then became to change the uses of gomatrix in Go-NEB for mautrix-go and make some slight changes to the latter if there were some incompatibilities. A month later, that task was done.

With two months to go in GSoC, my mentors came up with a new task: to implement a service for [Go-NEB](https://github.com/matrix-org/go-neb) that allows other client developers to test their e2ee implementations easily. That resulted in a service called "cryptotest" which allows other clients in a specified room to execute some Neb commands which would trigger functions like the forwarding of keys between clients, another feature that had to be implemented in mautrix. Something else that I wanted to add and grabbed my interest was SAS device verification, a multi-step process that involves users comparing a string of numbers or emojis out-of-band to configure they are indeed talking to each other and not to a MITM. These were my main tasks during the second month and I was happy to have achieved them and made a decent verification API for clients to use. They were soon merged into mautrix and Go-NEB.

For my third month I proposed to implement a new Matrix feature called cross-signing, which was similar to SAS verification but dealt with verifying other users instead of their devices who would in turn verify their own devices, creating a graph of trust between users and devices. This functionality was strongly coupled with SSSS, another new feature that allows clients to store their encrypted secrets (in this case the multiple necessary signing keys) on the server, as well as in-room verification which allows verification between users. This task was more challenging as it uses multiple algorithms (some of which not in libolm) for deriving the keys, using them to encrypt other keys which in turn sign other keys. It was also more satisfying when I finally managed to generate the keys, store and retrieve them and then use them to sign another user and when I was done I felt like my understanding of cryptography levelled up.

All in all, I'm very satisfied with the overall experience. The spec was very clear in most cases and when it wasn't the community was always helpful and responsive. They were also happy to discuss the spec with me and explain the more intricate details. For that reason I wasn't asking questions directly to my mentors (besides for defining my tasks) but to the overall community. I'm also very grateful to my mentors, [@uhoreg](https://github.com/uhoreg) and [@Kegan](https://github.com/Kegsay) for picking me for this project and helping me with the planning aspect and reviewing my PRs. I'd lastly like to thank the maintainer of mautrix, [@tulir](https://github.com/tulir/), for reviewing and merging a lot of my work into his library.
