+++
title = "Synapse 1.30.1 released"
date = "2021-03-26T16:12:04Z"
path = "/blog/2021/03/26/synapse-1-30-1-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases", "Security"]
+++

[Synapse 1.30.1](https://github.com/matrix-org/synapse/releases/tag/v1.30.1) is now available. This release is identical to Synapse 1.30.0, with the exception of explicitly setting a minimum version of the Python Cryptography library to ensure that users of Synapse are protected from yesterday's [OpenSSL security advisories](https://mta.openssl.org/pipermail/openssl-announce/2021-March/000198.html), especially CVE-2021-3449.

Note that Cryptography defaults to bundling its own statically linked copy of OpenSSL, which means that you may not be protected by your operating system's security updates.

It's also worth noting that Cryptography no longer supports Python 3.5, so admins deploying to older environments like Debian 9 (Stretch) or Ubuntu 16.04 (Xenial) may not be protected against this or future vulnerabilities.

The next release of Synapse will be the last to support Python 3.5.
