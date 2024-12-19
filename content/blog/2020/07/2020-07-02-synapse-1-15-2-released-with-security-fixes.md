+++
title = "Synapse 1.15.2 released with security fixes"
date = "2020-07-02T17:58:57Z"
path = "/blog/2020/07/02/synapse-1-15-2-released-with-security-fixes"

[taxonomies]
author = ["Richard van der Hoff"]
category = ["Releases", "Security"]
+++

Folks, today we are releasing Synapse 1.15.2, which is a security release which contains fixes to two separate problems. We are also putting out the second release candidate for the forthcoming Synapse 1.16, including the same fixes.

Firstly, we have fixed a bug in the implementation of the room state resolution algorithm which could cause users to be unexpectedly ejected from rooms (Synapse issue [#7742](https://github.com/matrix-org/synapse/issues/7742)).

Secondly, we have improved the security of pages served as part of the Single-Sign-on login flows to prevent clickjacking attacks. Thank you to [Quentin Gliech](https://sandhose.fr/) for reporting this.

We are not aware of either of these vulnerabilities being exploited in the wild, but we recommend that administrators upgrade as soon as possible. Those on Synapse 1.15.1 or earlier should upgrade to Synapse 1.15.2, while those who have already upgraded to Synapse 1.16.0rc1 should upgrade to 1.16.0rc2.

Get the new releases from any of the usual sources mentioned at <https://github.com/matrix-org/synapse/blob/master/INSTALL.md>. 1.15.2 is on github [here](https://github.com/matrix-org/synapse/releases/tag/v1.15.2), and 1.16.0rc2 is [here](https://github.com/matrix-org/synapse/releases/tag/v1.16.0rc2).

Changelog for 1.15.2 follows:

## Synapse 1.15.2 (2020-07-02)

Due to the two security issues highlighted below, server administrators are
encouraged to update Synapse. We are not aware of these vulnerabilities being
exploited in the wild.

### Security advisory

* A malicious homeserver could force Synapse to reset the state in a room to a
  small subset of the correct state. This affects all Synapse deployments which
  federate with untrusted servers. ([96e9afe6](https://github.com/matrix-org/synapse/commit/96e9afe62500310977dc3cbc99a8d16d3d2fa15c))
* HTML pages served via Synapse were vulnerable to clickjacking attacks. This
  predominantly affects homeservers with single-sign-on enabled, but all server
  administrators are encouraged to upgrade.  ([ea26e9a9](https://github.com/matrix-org/synapse/commit/ea26e9a98b0541fc886a1cb826a38352b7599dbe))

  This was reported by [Quentin Gliech](https://sandhose.fr/).
  