---
layout: post
categories: guides
title: Installing Synapse
section: docs
---

# Installing Synapse

[Synapse](https://github.com/matrix-org/synapse/) is the most widely installed Matrix homeserver implementation. It is written in Python - originally Python 2, but a Python 3 implementation is available and is set to become the new standard.

[Many guides have been written](https://matrix.org/docs/guides/#installing-synapse) explaining how to install Synapse, but there is sometimes confusion about the exact steps.

matrix.org has two recommended methods for installing Synapse:

## matrix-docker-ansible-deploy

First, Slavi has created a very useful set of Ansible playbooks which install containerised instances of multiple Matrix-ecosystem packages, the Synapse container being the centerpiece of these.

You can find the playbooks at <https://github.com/spantaleev/matrix-docker-ansible-deploy>, and there are instructions included in the repo.

To talk about the playbooks or get installation support, talk in [#matrix-docker-ansible-deploy:devture.com](https://matrix.to/#/#matrix-docker-ansible-deploy:devture.com).

It's also possible to use Docker containers without Ansible, just follow the intructions in [the Synapse Docker README](https://github.com/matrix-org/synapse/tree/master/docker).

## Installation guide for Ubuntu

matrix.org recommends [this guide hosted by natrius.eu](https://www.natrius.eu/dokuwiki/doku.php?id=digital:server:matrixsynapse) as a guide to installing Synapse manually. It is written specifically for Ubuntu 18.04 LTS, but many of the steps can be generalised to any Linux distro.

For further help join [#synapse:matrix.org](https://matrix.to/#/#synapse:matrix.org), or to give feedback about this guide visit [#synapseguide:matrix.org](https://matrix.to/#/#synapseguide:matrix.org).
