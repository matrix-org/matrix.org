+++
title = "Synapse 1.33.0 released"
path = "/blog/2021/05/05/synapse-1-33-0-released"

[taxonomies]
author = ["Dan Callahan"]
category = ["Releases"]
+++

Synapse 1.33.0 is out! Three main items of note:

1. We plan to release ~~1.33.1~~ <ins>1.33.2</ins> with a **low severity security fix** on Tuesday next week, and we're interested in your thoughts on decoupling routine security fixes from normal releases. Please weigh in on [this discussion](https://github.com/matrix-org/synapse/discussions/9914).

   _**Note:** We shipped 1.33.1 with a [small dependency fix](https://github.com/matrix-org/synapse/issues/9936) when installing Synapse via `pip`. A security release is still planned for Tuesday, which will now be 1.33.2._

2. If you use Synapse's optional account revalidation feature (see `account_validity` in [config.yaml](https://github.com/matrix-org/synapse/blob/v1.33.0/docs/sample_config.yaml#L1373-L1455)), you'll want to review the [upgrading instructions](https://github.com/matrix-org/synapse/blob/v1.33.0/UPGRADE.rst#upgrading-to-v1330) as we've made a few small changes to the email templates it uses.

3. Synapse now has _very_ experimental support for moving presence off of the main process. This has not yet been extensively validated, so please proceed with caution. We expect to get this to a point where we can confidently recommend it in the coming weeks.

Otherwise, this is another release focused on internals. We're driving toward a goal of reducing excess memory consumption when joining large or complex rooms, and most of our effort (aside from the presence work) has been focused on measurement, instrumentation, and experimentation for that.

We did manage to [slightly speed up room joins](https://github.com/matrix-org/synapse/pull/9825), improve the [performance of the user directory](https://github.com/matrix-org/synapse/pull/9821), and refine our implementation of [MSC3083](https://github.com/matrix-org/matrix-doc/pull/3083). Additionally, thanks to work by ShadowJonathan, Synapse now passes all of `flake8-bugbear`'s [lints](https://github.com/PyCQA/flake8-bugbear).

See the [Upgrading Instructions](https://github.com/matrix-org/synapse/blob/v1.33.0/UPGRADE.rst#upgrading-to-v1330) and [Release Notes](https://github.com/matrix-org/synapse/blob/v1.33.0/CHANGES.md) for further information.

### Thank You

Synapse is a Free and Open Source Software project, and we'd like to extend our thanks to everyone who contributed to this release, including [rkfg](https://github.com/rkfg), and [ShadowJonathan](https://github.com/ShadowJonathan).
