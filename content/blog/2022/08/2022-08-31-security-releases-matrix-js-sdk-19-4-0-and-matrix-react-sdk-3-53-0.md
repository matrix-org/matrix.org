+++
title = "Security releases: matrix-js-sdk 19.4.0 and matrix-react-sdk 3.53.0"
date = "2022-08-31T18:13:45Z"
path = "/blog/2022/08/31/security-releases-matrix-js-sdk-19-4-0-and-matrix-react-sdk-3-53-0"

[taxonomies]
author = ["Denis Kasak"]
category = ["Releases", "Security"]
+++

Today we are issuing security releases of matrix-js-sdk and matrix-react-sdk to
patch a couple of High severity vulnerabilities (reserved as
[CVE-2022-36059](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE%2D2022%2D36059)
for the matrix-js-sdk and
[CVE-2022-36060](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE%2D2022%2D36060)
for the matrix-react-sdk).

Affected clients include those which depend on the affected libraries, such as
Element Web/Desktop and Cinny. Releases of the affected clients will follow
shortly. We advise users of those clients to upgrade at their earliest
convenience.

The vulnerabilities give an adversary who you share a room with the ability to
carry out a denial-of-service attack against the affected clients, making it
not show all of a user's rooms or spaces and/or causing minor temporary
corruption.

The full vulnerability details will be disclosed at a later date, to give
people time to upgrade and us to perform a more thorough audit of the codebase.

Note that while the vulnerability was to our knowledge never exploited
maliciously, some unintentional public testing has left some people affected by
the bug. We made a best effort to sanitize this to stop the breakage. If you
are affected, you may still need to clear the cache and reload your Matrix
client for it to take effect.

We thank [Val Lorentz](https://valentin-lorentz.fr/) who discovered and
reported the vulnerability over the weekend.
