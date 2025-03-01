+++
title = "Synapse: Deprecating Postgres 9.4 and Python 2.x"
path = "/blog/2019/04/08/synapse-deprecating-postgres-9-4-and-python-2-x"

[taxonomies]
author = ["Neil Johnson"]
category = ["General"]
+++

<strong>TL;DR DON'T PANIC - Synapse 1.0 will support Postgres 9.4 and Python 2.7</strong>

Folks, this is an update to explain that we will be shortly deprecating Synapse support for Postgres 9.4 and Python 2.x.

## What are we doing?

From the dates described below, we will no longer guarantee support for deprecated versions. This means that Synapse <em>may </em>continue to work with these versions but we will not make any attempt to ensure compatibility and will remove old library versions from our CI.

## When is this happening?

<strong>Synapse 1.0 will continue to support both technologies, but subsequent releases may not:-</strong>

For Python, we shared that we would discontinue to Python 2.x support from<a href="/blog/2018/12/21/porting-synapse-to-python-3/"> April 1st 2019</a>, so for the first release that follows 1.0 we do not guarantee Python 2.x support.

For Postgres, will give server admins 6 weeks to upgrade to a newer version, and will guarantee support <strong>up until 20th May 2019.</strong>

## Why would you do this to us?

We have multiple reasons, but broadly:-
<ul>
  <li>We want to make use of new language features not supported in old versions. This will enable us to continue to improve the performance and maintainability of Synapse.</li>
  <li>Python 2.x overall will be <a href="https://pythonclock.org/">end of life'd at the end of the year</a>. <a href="https://www.postgresql.org/support/versioning/">Postgres 9.4's final release</a> will follow 2 months later on 13th February 2020.</li>
  <li>Since very few server admins still use these technologies on the wild, providing support is costly and we want to reduce our overall maintenance load.</li>
</ul>

## La la la I am ignoring you - what will happen?

You will be able to upgrade to Synapse 1.0, but will likely experience incompatibilities that prevent you upgrading further. Seriously, you really need to upgrade.

## Okay, but I have questions, where should I go?

Come and say Hi in #synapse:matrix.org and we'll do our best to help you.
