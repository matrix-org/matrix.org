+++
date = "2023-07-31T11:40:00Z"
title = "Bridges Security Update"

[taxonomies]
author = ["Integrations Team", "Matrix Security Team"]
category = ["Bridges", "Security"]
+++


Today we are announcing security updates for several of our bridges.

* matrix-appservice-irc [1.0.1](https://github.com/matrix-org/matrix-appservice-irc/releases/tag/1.0.1) affected by GHSA-vc7j-h8xg-fv5x [CVE-2023-38691](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-38691), GHSA-3pmj-jqqp-2mj3 / [CVE-2023-38690](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-38690), and GHSA-c7hh-3v6c-fj4q
* matrix-hookshot [4.4.1](https://github.com/matrix-org/matrix-hookshot/releases/tag/4.4.1) affected by GHSA-vc7j-h8xg-fv5x / [CVE-2023-38691](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-38691)
* matrix-appservice-slack [2.1.2](https://github.com/matrix-org/matrix-appservice-slack/releases/tag/2.1.2) affected by GHSA-vc7j-h8xg-fv5x / [CVE-2023-38691](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-38691)

In addition we have released matrix-appservice-bridge [9.0.1](https://github.com/matrix-org/matrix-appservice-bridge/releases/tag/9.0.1) (and backported to [8.1.2](https://github.com/matrix-org/matrix-appservice-bridge/releases/tag/8.1.2)) which patches GHSA-vc7j-h8xg-fv5x.

All mentioned bridges are affected by a vulnerability in the provisioning interfaces of these bridges. If you are unable to upgrade, please disable provisioning for now (which should be documented in the relevant bridge sample config).

<!-- more -->

* [IRC bridge config](https://github.com/matrix-org/matrix-appservice-irc/blob/develop/config.sample.yaml#L520-L522)
    * Set `provisioning.enabled` to false.
* [Slack bridge config](https://github.com/matrix-org/matrix-appservice-slack/blob/a9f555308fb7485ebb1df98e6c327808915f816f/config/config.sample.yaml#L163)
    * Set `provisioning.enabled` to false.
* [Hookshot config](https://github.com/matrix-org/matrix-hookshot/blob/main/config.sample.yml#L192)
    * Remove the `widgets` resource (NOT provisioning)

The IRC bridge is also affected by two additional vulnerabilities. In this case, we would recommend upgrading **immediately** rather than working around the problems.

Disclosures for these vulnerabilities, as well as CVE numbers will be out in three days (Thursday 3rd).

**We advise to upgrade as soon as possible.**

If you have further questions, please reach out on [security@matrix.org](mailto:security@matrix.org)
