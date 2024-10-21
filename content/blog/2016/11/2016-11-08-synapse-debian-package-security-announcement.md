+++
title = "Synapse Debian Package Security Announcement - and Synapse 0.18.3"
path = "/blog/2016/11/08/synapse-debian-package-security-announcement"

[taxonomies]
author = ["Erik Johnston"]
category = ["General"]
+++

We were advised of a bug with the LDAP integration an hour ago that allowed unauthenticated login in certain circumstances when using an old version of the ldap3 python module (v0.9.x).

Currently, this is only known to affect the debian packages of synapse. <strong>A fix has been pushed, v0.18.2-2, and it is strongly advised for you to update as soon as possible</strong>.

Synapse installed using pip should not be affected, as pip will have bundled a newer version of the ldap3 module.

### UPDATE: Synapse v0.18.3 released

This issue only affects OS (not virtualenv) installations using v0.9.x of the ldap3 python package (e.g. Debian Stable (Jessie)).  Synapse itself specifies a dependency on &gt;v1.0 of ldap3, but as the dependency is optional there is a risk that a stale operating system dependency will be pulled in instead.  To be safe, <strong>0.18.3 of Synapse</strong> has just been released to fix the underlying problem for anyone using the older ldap3 package, regardless of their OS. <a href="https://github.com/matrix-org/synapse/releases/tag/v0.18.3">https://github.com/matrix-org/synapse/releases/tag/v0.18.3</a> has the details.

Many thanks to Adrián Pérez for reporting the problem, and to hexa- for assistance in quickly solving it!

Signed announcement: <a href="/blog/wp-content/uploads/2016/11/synapse-debian-security-announcement-1.asc">synapse-debian-security-announcement</a>
