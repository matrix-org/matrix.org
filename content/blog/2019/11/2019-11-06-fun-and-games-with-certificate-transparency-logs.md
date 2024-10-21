+++
title = "Fun and games with certificate transparency logs"
path = "/blog/2019/11/06/fun-and-games-with-certificate-transparency-logs"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["Security"]
+++

Hi all,

This morning (06:11 UTC) it became apparent through mails to <support@matrix.org> that a security researcher was working through the TLS Certificate Transparency logs for `*.matrix.org`,`*.riot.im` and `*.modular.im` to identify and try to access non-public services run by New Vector (the company formed by the original Matrix team, which hosts `*.matrix.org` on behalf of the Matrix.org Foundation, and develops Riot and runs the <https://modular.im> hosting service).

Certificate Transparency (CT) is a feature of the TLS ecosystem which lets you see which public certificates have been created and signed by given authorities - intended to help identify and mitigate against malicious certificates.  This means that the DNS name of any host with a dedicated public TLS certificate (i.e. not using a wildcard certificate) is visible to the general public.

In practice, this revealed a handful of internal-facing services using dedicated public TLS certificates which were accessible to the general internet - some of which should have been locked to be accessible only from our internal network.  

Specifically:

* `kibana.ap-southeast-1.k8s.i.modular.im` - a Kibana deployment for a new experimental Modular cluster which is being set up in SE Asia. The Kibana is in the middle of being deployed, and was exposed without authentication during deployment due to a firewall & config error.  However, **it is not a production system and carries no production traffic or user data** (it was just being used for experimentation for hypothetical geography-specific Modular deployments).  We firewalled this off at 07:53 UTC, and are doing analysis to confirm there was no further compromise, and will then rebuild the cluster (having fixed the firewall config error from repeating).
* AWX deployments used by our internal Modular platform, which were behind authentication but should not be exposed to the public net.
* Various semi-internal dev and testing services which should be IP-locked to our internal network (but are all locked behind authentication too).

Additionally, certain historical Modular homeservers & Riots (from before we switched to using wildcard certs, or where we’ve created a custom LetsEncrypt certificate for the server) are named in the CT logs - thus leaking the server’s name (which is typically public anyway in that server’s matrix IDs if the server is federated).

We’re working through the services whose names were exposed checking for any other issues, but other than the non-production SE Asia Kibana instance we are not aware of problems resulting from this activity.

Meanwhile, we’ll be ensuring that semi-internal services are only exposed on our internal network in future, and that Modular server names are not exposed by CT logs where possible.

**TL;DR**: You can list all the public non-wildcard TLS certs for a given domain by looking somewhere like <https://crt.sh/?q=%25.matrix.org>.  This lets you find internal-sounding services to try to attack.  In practice no production services were compromised, and most of our internal services are correctly firewalled from the public internet.  However, we’re reviewing the IP locking for ones in the grey zone (and preventing the bug which caused an experimental Kibana to be exposed without auth).

We’d like to thank Linda Lapinlampi for notifying us about this.  We’d also like to remind everyone that we operate a Security Disclosure Policy (SDP) and Hall of Fame at <https://matrix.org/security-disclosure-policy/> which is designed to protect innocent users from being hurt by security issues - everyone: please consider disclosing issues responsibly to us as per the SDP.
