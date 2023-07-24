+++
title = "On Matrix and the log4j vulnerabilities"
date = "2021-12-15T12:58:02Z"
path = "/blog/2021/12/15/on-matrix-and-the-log4j-vulnerabilities"

[taxonomies]
author = ["Matrix Security Team"]
category = ["Security"]
+++

There is currently a lot of buzz and uncertainty around a number of vulnerabilities discovered in the log4j library in the Java ecosystem. These vulnerabilities are collectively known as "Log4Shell" and currently encompass CVE-2021-44228 and CVE-2021-45046.

First and foremost, there are to our knowledge no Matrix homeservers written in Java. [Synapse](https://github.com/matrix-org/synapse/), the canonical implementation developed by the Matrix Foundation and the implementation that is backing matrix.org, is written in Python and thus unaffected. P2P Matrix relies on [Dendrite](https://github.com/matrix-org/dendrite), our next-gen homeserver which is written in Go and is unaffected. [Conduit](https://gitlab.com/famedly/conduit/), a community homeserver, is written in Rust and also unaffected. Supporting components like [Sygnal](https://github.com/matrix-org/sygnal) and [Sydent](https://github.com/matrix-org/sydent) are written in Python and unaffected.

There are two components that are commonly used in the Matrix ecosystem that do rely on Java. These are Jitsi, specifically the [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge) for VoIP, and [signald](https://gitlab.com/signald/signald) used by the Signal bridge. Both components pull in log4j as part of their (transitive) dependencies. We're not aware of other bridges that are dependent on Java-based components.

For both of these projects updates have been published that integrate log4j 2.15.0 covering the initial CVE and we're currently waiting for additional updates to be published that integrate log4j 2.16.0 to cover the second. In the meantime, we've put all mitigations we are aware of in place on our systems and we strongly recommend everyone do the same.

For what mitigations to put in place, we recommend following the [recommendations provided by LunaSec](https://www.lunasec.io/docs/blog/log4j-zero-day-mitigation-guide/). They also provide a lot of background information on the vulnerabilities and how to audit for them.

Please keep an eye out for releases from the Jitsi and signald projects and follow their upgrade instructions to update your own deployments as soon as possible.
