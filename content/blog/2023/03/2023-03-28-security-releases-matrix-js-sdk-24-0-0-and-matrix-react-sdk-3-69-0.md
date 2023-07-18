+++
title = "Security releases: matrix-js-sdk 24.0.0 and matrix-react-sdk 3.69.0"
path = "/blog/2023/03/28/security-releases-matrix-js-sdk-24-0-0-and-matrix-react-sdk-3-69-0"

[taxonomies]
author = ["Denis Kasak"]
category = ["Releases", "Security"]
+++

Today we are issuing security releases of matrix-js-sdk and matrix-react-sdk to
patch a pair of High severity vulnerabilities
([CVE-2023-28427](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE-2023-28427)
/ [GHSA-mwq8-fjpf-c2gr](https://github.com/matrix-org/matrix-js-sdk/security/advisories/GHSA-mwq8-fjpf-c2gr)
for matrix-js-sdk and
[CVE-2023-28103](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE-2023-28103)
/ [GHSA-6g43-88cp-w5gv](https://github.com/matrix-org/matrix-react-sdk/security/advisories/GHSA-6g43-88cp-w5gv)
for matrix-react-sdk).

Affected clients include those which depend on the affected libraries, such as
Element Web/Desktop and Cinny. Releases of the affected clients should follow
shortly. We advise users of those clients to upgrade at their earliest
convenience.

The issues involve prototype pollution via events containing special strings in
key locations, which can temporarily disrupt normal functioning of
matrix-js-sdk and matrix-react-sdk, potentially impacting the consumer's
ability to process data safely.

Although we have only demonstrated a denial-of-service-style impact, we cannot
completely rule out the possibility of a more severe impact due to the
relatively extensive attack surface. We have therefore classified this as High
severity and strongly recommend upgrading as a precautionary measure.

We found these issues during a codebase audit that we had [previously
announced](https://matrix.org/blog/2022/08/31/security-releases-matrix-js-sdk-19-4-0-and-matrix-react-sdk-3-53-0)
in an earlier security release of matrix-js-sdk and matrix-react-sdk. The
earlier release had already addressed a set of similar vulnerabilities that
were assigned
[CVE-2022-36059](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE%2D2022%2D36059)
/ [GHSA-rfv9-x7hh-xc32](https://github.com/matrix-org/matrix-js-sdk/security/advisories/GHSA-rfv9-x7hh-xc32)
and
[CVE-2022-36060](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE%2D2022%2D36060)
/ [GHSA-2x9c-qwgf-94xr](https://github.com/matrix-org/matrix-react-sdk/security/advisories/GHSA-2x9c-qwgf-94xr),
which we had initially decided not to disclose until the completion of the
audit. Now that the audit is finished, we are disclosing those previous
advisories as well.
