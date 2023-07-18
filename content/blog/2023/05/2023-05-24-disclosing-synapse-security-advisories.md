+++
title = "Disclosing Synapse security advisories"
date = "2023-05-24T13:44:36Z"
updated = "2023-05-24T13:36:50Z"
path = "/blog/2023/05/24/disclosing-synapse-security-advisories"

[taxonomies]
author = ["Denis Kasak"]
category = ["Security"]
+++

Today we are retroactively publishing advisories for security bugs in [Synapse](https://github.com/matrix-org/synapse/). From oldest to most recent, they are:

- [GHSA-p9qp-c452-f9r7](https://github.com/matrix-org/synapse/security/advisories/GHSA-p9qp-c452-f9r7) ([CVE-2022-39374](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE-2022-39374)), fixed in Synapse 1.68.0 and affecting all prior versions since Synapse 1.62.0;
- [GHSA-45cj-f97f-ggwv](https://github.com/matrix-org/synapse/security/advisories/GHSA-45cj-f97f-ggwv) ([CVE-2022-39335](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE-2022-39335)), fixed in Synapse 1.69.0 and affecting all prior versions; and finally
- [GHSA-f3wc-3vxv-xmvr](https://github.com/matrix-org/synapse/security/advisories/GHSA-f3wc-3vxv-xmvr) ([CVE-2023-32323](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=CVE-2023-32323)), fixed in Synapse 1.74.0 and affecting all prior versions.

We strongly advise Synapse operators who are still on earlier Synapse versions to upgrade to the latest version ([v1.84.0](https://github.com/matrix-org/synapse/releases/tag/v1.84.0)) or at the very least v1.74.0 ([released Dec 2022](https://github.com/matrix-org/synapse/releases/tag/v1.74.0)), to prevent attacks based on these vulnerabilities. Please see the advisories for the full details, including a description of

- the vulnerability and potential attacks,
- exactly which deployments are vulnerable, and
- workarounds and mitigations.

Because these bugs are either related to or exploitable over Matrix federation, we have delayed publishing these advisories until now out of caution. This allowed us to ensure that the majority of Synapse homeservers across the public federation have upgraded to a sufficiently patched version, based on the (opt-in) [stats reporting](https://matrix-org.github.io/synapse/latest/usage/administration/monitoring/reporting_homeserver_usage_statistics.html) to the Matrix.org foundation.

If you have any questions or comments about this announcement or any of the advisories, e-mail us at [security@matrix.org](mailto:security@matrix.org).
