+++
title = "Hosting"
template = "ecosystem/hosting.html"
weight = 4
extra.summary = """
Everyone can host their Matrix server, but not everybody wants. Those are the
providers the Matrix Foundation knows about.
"""
+++

## Why not matrix.org?

Matrix could be described as what happens when email, instant messaging and
encryption meet. To be able to use Matrix, you need a Matrix account which is
provided by... a provider! The matrix accounts identifiers look like
`@username:example.com`. People on different providers can talk to one another,
in the same way you can send emails to someone using another email provider.

Matrix.org is the largest, free provider of Matrix accounts. Many people have an
identifier like `@username:matrix.org`. This also means that the Matrix.org
servers are crowded. Using your own provider **as an individual** can not only
make your Matrix experience snappier, but also give you access to a set of
pre-configured [bridges](#) to talk to friends on other networks such as Signal
or WhatsApp.

**Organisations and community managers** will be interested in providers for two
main reasons: they can proudly display their identity with their own domain
in username and rooms identifiers, and their administrators remain in control
of the data of their organisation.

The following providers have been brought to the attention of the Matrix.org
Foundation. Please note that the Matrix.org Foundation doesn't endorse them,
nor provides any warranties for using them.

## Known providers

{{ hosting_providers() }}
