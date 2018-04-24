---
layout: project
title: matrix-synapse-rest-auth
categories: projects other
description: REST endpoint Authentication module for synapse
author: Max Dor
maturity: 
language: Python
license: 
---

# {{ page.title }}
This synapse authentication module (password provider) allows you to query identity data in existing webapps, like:
- Forums (phpBB, Discourse, etc.)
- Custom Identity stores (Keycloak, ...)
- CRMs (Wordpress, ...)
- self-hosted clouds (Nextcloud, ownCloud, ...)

It is mainly used with [mxisd](https://github.com/kamax-io/mxisd), the Federated Matrix Identity Server, to provide
missing features and offer a fully integrated solution (directory, authentication, search).
