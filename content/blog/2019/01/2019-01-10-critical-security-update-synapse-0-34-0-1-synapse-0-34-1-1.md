+++
title = "Critical Security Update: Synapse 0.34.0.1/Synapse 0.34.1.1"
path = "/blog/2019/01/10/critical-security-update-synapse-0-34-0-1-synapse-0-34-1-1"

[taxonomies]
author = ["Neil Johnson"]
category = ["Security", "Releases"]
+++

After releasing Synapse v0.34.1, we have become aware of a security vulnerability affecting all previous versions (<a href="http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-5885">CVE-2019-5885</a>). v0.34.1 closed the vulnerability but, in some cases, caused users to be logged out of their clients, so we do not recommend v0.34.1 for production use.

<b>Today we release two mitigating versions v0.34.0.1 and v0.34.1.1</b>. Both versions close the vulnerability and will not cause users to be logged out. <b>All installations should be upgraded to one or other immediately.</b>

<ul>
  <li style="font-weight: 400;">Admins who would otherwise upgrade to v0.34.1 (or those that have already done so) should upgrade to v0.34.1.1.
</li>
  <li style="font-weight: 400;">Admins on v0.34.0, who do not wish to bring in new non-security related behaviour, should upgrade to v0.34.0.1.
</li>
</ul>

You can get the new updates for <a href="https://github.com/matrix-org/synapse/releases/tag/v0.34.0.1">v0.34.0.1</a> and <a href="https://github.com/matrix-org/synapse/releases/tag/v0.34.1.1">v0.34.1.1</a> here or any of the sources mentioned at <a href="https://github.com/matrix-org/synapse">https://github.com/matrix-org/synapse</a>. Note, Synapse is now available from PyPI, pick it up <a href="https://pypi.org/project/matrix-synapse/">here</a>. See also our <a href="/docs/guides/installing-synapse">Synapse installation guide page.</a>

We will publish more details of the vulnerability once admins have had a chance to upgrade. To our knowledge the vulnerability has not been exploited in the wild.

Many thanks for your patience, we are moving ever closer to Synapse reaching v1.0, and fixes like this one edge us ever closer.

Thanks also to the package maintainers who have coordinated with us to ensure distro packages are available for a speedy upgrade!

<ul>
  <li><a href="https://github.com/matrix-org/synapse/releases/tag/v0.34.0.1">Synapse v0.34.0.1 Changelog</a></li>
  <li><a href="https://github.com/matrix-org/synapse/releases/tag/v0.34.1.1">Synapse v0.34.1.1 Changelog</a></li>
</ul>
