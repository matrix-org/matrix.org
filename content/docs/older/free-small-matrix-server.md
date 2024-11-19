+++
title = "Free Matrix Server using Oracle Cloud"
extra.author = "Paul Tötterman <paul.totterman@iki.fi>"
aliases = ["/docs/guides/free-small-matrix-server"]
+++

*Canonical version of this article at
<https://gitlab.com/ptman/matrix-docs/tree/master/free-matrix-server>*

Ingredients:

- Domain
- Server
- Software
- Configuration

## Free domain name

Get one from [Freenom] or [DuckDNS] for free or any other place you wish.
Freenom can be tricky to renew for free after the first year. A Matrix server
cannot be [migrated] from one domain to another, so you might want to get a
longer-lived one.

- <https://tld-list.com/> - find cheap domains, look at renewal fees also
- <https://www.namecheap.com/promos/99-cent-domain-names/> - cheap first year

You also need to specify subdomains (which is why most dynamic dns services
aren't sufficient). To do this I added the domain on the free [Cloudflare] plan.
You can also use freenom dns management if you prefer.

[Freenom]: https://www.freenom.com
[DuckDNS]: https://www.duckdns.org/
[Cloudflare]: https://www.cloudflare.com
[migrated]: https://github.com/matrix-org/synapse/issues/1209

## Get a free server

Comparison of free cloud offerings (2021/09):

| Vendor   | Time-limit | Count                    | RAM (GB) | Storage (GB) | Transfer (GB) |
| -------- | ---------- | ----------------------- | -------: | -----------: | ------------: |
| [AWS]    | 12 months  | 1 t2.micro              | 1        | 30           | 15            |
| [Azure]  | 12 months  | 1 B1S                   | 1        | 2x 64        | 15            |
| [GCP]    | no limit   | 1 e2-micro              | 1        | 30           | 1             |
| [Oracle] | no limit   | 1-4 VM.Standard.A1.Flex | 24       | 200          | 10000         |

Note that the Oracle ARM instances may not be compatible with all available
software. Also, Oracle seems to shut down your always free cloud instances at
the end of your 30 day trial. They can not be started back up, but you can
create new ones by cloning the disk images, so no data should be lost. Keeping
backups is good practise in any case.

[AWS]: https://aws.amazon.com/free/
[Azure]: https://azure.microsoft.com/en-us/free/
[GCP]: https://cloud.google.com/free/
[Oracle]: https://www.oracle.com/cloud/free/

If you choose to, register on Oracle Cloud (requires credit card for
verification) and create a free VM:

1. Create a VM.Standard.A1.Flex VM instance
2. Give it a name
3. OS/image: Canonical Ubuntu 20.04
4. Show Shape, Network and Storage Options -> Assign a public IP address
5. Add SSH key ([generate one][sshkey] using `ssh-keygen` if you don't have one)
6. Show advanced options. I removed monitoring, since I'll remove the monitoring
   agent later.

View resources and make sure the instance and boot volume are "Always Free" if
you don't intent to pay for them.

Make sure you can ssh to the server (using the ssh key you generated/picked)
using the user 'ubuntu' and can use `sudo`.

[sshkey]: https://docs.oracle.com/en/cloud/iaas/compute-iaas-cloud/stcsg/generating-ssh-key-pair.html

## Open firewall

### TURN/STUN and coturn

TURN/STUN is used for audio and video stream NAT/firewall traversal. coturn
implements the protocol. If you don't need 1-on-1 video/audio calls, or if
you're sure NAT and firewall won't be a problem (e.g. you only do calls on
networks where you're sure traffic can flow) you can disable coturn to save some
more RAM. Generally using coturn gives you much more reliable audio/video calls.

### Oracle Cloud Security lists

View resources -> Instances -> Select instance -> Virtual Cloud Network ->
Public Subnet -> Security Lists -> Default -> Ingress

Open incoming for CIDR 0.0.0.0/0:

- 22/tcp for SSH (should be open already)
- 80/tcp for HTTP
- 443/tcp for HTTPS
- 8448/tcp for Matrix federation
- 3478/tcp, 5349/tcp, 3478/udp, 5349/udp, 49152-49172/udp for TURN/STUN

### Ubuntu iptables

The Oracle Cloud Ubuntu images come with somewhat restrictive iptables rules by
default. Docker manages the instance firewall and we have the Oracle Cloud
firewall in front, so let's remove the current firewall to avoid trouble:

```bash
apt purge netfilter-persistent iptables-persistent
```

## Point domain at server

Assuming you're using a new domain only for this you need the following DNS
records:

- A record `$domain` pointing to `$instance_external_ip_address`
- CNAME record `matrix.$domain` pointing to `$domain`
- CNAME record `element.$domain` pointing to `$domain`

## Use matrix-docker-ansible-deploy

Follow the [guide], with some tweaks:

[guide]: https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/README.md

### Guide in a nutshell, TL;DR

If you are too busy to read the guide, here are the most important steps:

```bash
git clone https://github.com/spantaleev/matrix-docker-ansible-deploy/
cd matrix-docker-ansible-deploy
mkdir inventory/host_vars/matrix.$domain
cp examples/vars.yml inventory/host_vars/matrix.$domain/vars.yml
cp examples/hosts inventory/hosts
$EDITOR inventory/hosts
# put most settings here in vars.yml, read following sections for some ideas
$EDITOR inventory/host_vars/matrix.$domain/vars.yml
# you'll need to rerun setup-all and start tags again if you edit vars later
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
ansible-playbook -i inventory/hosts setup.yml --tags=self-check
ansible-playbook -i inventory/hosts setup.yml -e username=$user -e password=$pass -e admin=yes --tags=register-user
```

### Set playbook architecture to arm64 if using Oracle Cloud ARM instances

```yaml
matrix_architecture: 'arm64'
```

### Serve the base domain as well (unless you already have something serving it)

```yaml
matrix_nginx_proxy_base_domain_serving_enabled: true
```

### Configure the public IP address for coturn

```yaml
matrix_coturn_turn_external_ip_address: $instance_external_ip_address
```

## Done

Point your browser to <https://element.$domain> or use [another
client](https://matrix.org/clients).

## Maintenance

Remember to keep your VM up to date!

```bash
apt update
apt upgrade
reboot # e.g. kernel,dbus,systemd updates
```

To keep the matrix services upgraded, start by reading the [maintenance docs],
but really, take a brief look at all the documentation.

[maintenance docs]: https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/maintenance-upgrading-services.md

Keep backups! You never know when the providers decide the free resources won't
be offered anymore.

## Discussion

- [#free-matrix-server:matrix.org](https://gitlab.com/ptman/matrix-docs/-/tree/master/free-matrix-server)
  to discuss this guide specifically
- [#matrix-docker-ansible-deploy:devture.com](https://matrix.to/#/#matrix-docker-ansible-deploy:devture.com)
  to discuss the playbook used in this guide
- [#synapse:matrix.org](https://matrix.to/#/#synapse:matrix.org) to discuss
  running synapse in general
- Email author at <a
  href="mailto:paul.totterman@gmail.com">paul.totterman@gmail.com</a>.

Please contribute improvements to this guide via PRs ([github] or [gitlab])

[github]: https://github.com/ptman/matrix-docs
[gitlab]: https://gitlab.com/ptman/matrix-docs
