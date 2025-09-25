# Contributing to matrix.org

Thank you for taking the time to contribute to Matrix!

This is the repository for the matrix.org website.

## Sign off

We ask that everybody who contributes to this project signs off their contributions, as explained below.

We follow a simple 'inbound=outbound' model for contributions: the act of submitting an 'inbound' contribution means that the contributor agrees to license their contribution under the same terms as the project's overall 'outbound' license - in our case, this is Apache Software License v2 (see [LICENSE-Apache-2.0](./LICENSE-Apache-2.0)) for code and Creative Commons Attribution-ShareAlike 4.0 International (see [LICENSE-CC-BY-SA](./LICENSE-CC-BY-SA)) for other things, including text and graphics.

In order to have a concrete record that your contribution is intentional and you agree to license it under the same terms as the project's license, we've adopted the same lightweight approach used by the [Linux Kernel](https://www.kernel.org/doc/html/latest/process/submitting-patches.html), [Docker](https://github.com/docker/docker/blob/master/CONTRIBUTING.md), and many other projects: the [Developer Certificate of Origin](https://developercertificate.org/) (DCO). This is a simple declaration that you wrote the contribution or otherwise have the right to contribute it to Matrix:

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
660 York Street, Suite 102,
San Francisco, CA 94110 USA

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

If you agree to this for your contribution, then all that's needed is to include the line in your commit or pull request comment:

```
Signed-off-by: Your Name <your@email.example.org>
```

Git allows you to add this signoff automatically when using the `-s` flag to `git commit`, which uses the name and email set in your `user.name` and `user.email` git configs.

## What we are trying to achieve

One key mission of the Foundation is to make Matrix a mainstream protocol. For this, onboarding needs to be made easy for new users. The Matrix.org website is a critical step in this journey: this is where people land when they look up "what is Matrix chat" or "chatting on Matrix" in a search engine.

**The primary mission of the matrix.org website is to onboard various populations on Matrix, and turn them into supporters of the project.**

We identified 4 different kind of populations that we want to address with the Matrix.org website.

- **Everyday people** who want to use Matrix for instant messaging with family and friends. They are not tech savvy and just want simple steps to follow, and something that "just works™". They don't particularly care about Matrix. They could use WhatsApp or Signal.
- **Community managers** who want to find a platform for their community to talk on. They could use Slack or Discord.
- **Developers** who want to create clients, servers, bridges or bots. They are tech literate and are interested in how things work from a technical perspective. They are already convinced Matrix is useful and want either to create toys for it, or Matrix-based tools for production.
- **Entrepreneurs** who were told about Matrix and who need to see how it can bring value to them to create products based on Matrix.

## How we measure progress

The tools we have at our disposal are:

- Privacy-preserving analytics with Plausible.io ([rationale here](https://ergaster.org/posts/2024/01/24-tracking-what-works/)). They allow us to track which are the most popular pages, custom events (e.g. to track if a call to action is often clicked on or not), and funnels
- User feedback, which will necessarily suffer the survivor bias

## How we take decisions

We try to keep a paper trail for all the decisions and implementation:

- All of the changes on the website need to happen [through a Pull Request](https://github.com/matrix-org/matrix.org/pulls)
  - The only exception to this rules are if we broke things preventing our usual workflow.
- Pull Requests which do changes to existing content or add content outside of the blog should fix a documented and accepted [issue](https://github.com/matrix-org/matrix.org/pulls)
- Issues are reviewed by the maintainers of the project (the [Website and Content Working Group](https://matrix.org/foundation/working-groups/)). Some discussion can happen in [#matrix.org-website:matrix.org](https://matrix.to/#/%23matrix.org-website:matrix.org) but all decisions are logged in the issues themselves.

We keep this paper trail to avoid having to review Pull Requests "fixing" things we don't need or want to be fixed. Of course we try to remain flexible where it makes sense, but want to stick to this process as much as possible.

## Review & Publishing Policy

This policy outlines the expectations by the Website and Content Working Group
("WG") for contributions as well as the expectations that contributors can have
of the WG in return. The aim of this process is to make contributions easy and
painless while at the same time enabling collaboration between Foundation teams
and other WGs to guarantee that we meet the quality standards we have set for
the matrix.org website. Our aim is to improve this process continually, so
please reach out with your feedback or suggestions directly, or our public room
[#matrix.org-website:matrix.org](https://matrix.to/#/#matrix.org-website:matrix.org).

When contributing to our repos:
- Please read and apply our [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.
  This document explains everything about the contribution process, i.e. what
  to mind when creating your pull request. This includes but is not limited to:
  - Please follow the Pull Request ("PR") workflow and do not push directly to
    the main branch. This is designed to help us run both automated and manual
    checks to ensure the website is the best it can be.
  - A PR approval _by a member of the Website and Content WG_ is required
    before merging. We are unable to fulfill our mandate if we don't get the
    time to act on it. Please see below for details.
  - We are aware that this introduces an extra step with a separate team, and
    that such extra loops can mean introducing more delay to your publishing
    timeline than expected. To counter this effect while still filling our
    mandate, we offer you to inform the WG in advance when a blog post is meant
    to be published at a known, predetermined time. Generally, we expect a
    working day advance notice should be enough for us to react to it.
- Please read and apply our [CONTENT.md](./CONTENT.md) guidelines. This
  document explains how the website is set up from a technical standpoint, e.g.
  what to mind when creating a new blog post, or how to add/update a project in
  the ecosystem section.
<!-- - Please adhere to the Matrix Foundation's communication strategy/content policy.
       *TODO: this policy will be established separately* -->
- You are taking ownership of your PR. We will review your PR and give you
  feedback.
  - It is possible that we request changes, for example we will help you make
    sure to meet all the requirements from the policies named above. As author,
    you have the responsibility to act on changes requested and update your
    contribution if necessary, until merged. If we don't hear back from you
    within 3 weeks, we will close your PR as abandoned.
  - It may be useful or necessary for you to determine a delegate to handle
    this process. Please let us know when you decide to delegate PR ownership
    to someone else. Be aware there might arise questions regarding the
    contents of your contribution.
- If you are contributing a whole article, such as a blog post or documentation
  page, we assume you are taking ownership of this article.
  - Be aware that your author name will be listed publicly. We expect you to
    state clearly in which role and/or whose behalf you are writing your
    article. For example, an employee of Element might be writing on behalf of
    the team running the matrix.org homeserver; then the article would be
    credited to the individual person and the text might start with "Hello from
    Element's backend/SRE team who run the matrix.org homeserver on behalf of
    the Foundation".
  - For blog posts about announcements that warrant follow-ups, e.g. a
    migration on the matrix.org homeserver, it is the responsibility of the
    author to take care of follow-up posts. Please see the Foundation's
    communication policy for more information.
  - For documentation, it is the responsibility of the author to maintain and
    keep this information up to date.
  - You may also delegate these responsibilities as appropriate.

In order to make this process work smoothly, the WG aims to meet the following
expectations:
- The WG is expected to react with a review within one business day of a new PR
  being opened. At this time, we cannot guarantee a faster reaction time.
- The WG will make the contribution process transparent and document any
  policies and requirements. It will set up tooling to help contributors find
  their way through it as easily as possible, e.g. by setting up PR templates,
  repo protections, or CI.
- The WG is open to taking feedback on how to improve their work and this
  process. Particularly, it aims to keep the process as lightweight as possible
  with the goal to enable contributions while ensuring quality.

Notably, we are aware that some exceptions to the above expectations are
required:
- Publishing news about immediate security updates is exempt from the review
  requirement due to their nature of being important to get published. The WG
  will review the changes in hindsight and request that further tweaks get
  applied at a later time.
- Security updates and other sensitive information might not be possible to
  effectively publish a day early to the PR list. For such cases we suggest
  contacting a member of the WG directly or a private review. If there are
  further restrictions, the previous point can apply.
- Sometimes we share repositories with other groups. For example there are
  pages of matrix.org about legal details, which are owned by the Foundation's
  legal team, and there are files concerning homeserver operation such as
  `.well-known`, which are owned by the team operating the homeserver. These
  parts of the repos are also exempt from the above requirements and follow the
  respective team's processes instead. We maintain a
  [CODEOWNERS](./.github/CODEOWNERS) file to mark these areas of the repository
  appropriately. The WG is available for support to these teams.

It’s understood that there will be times when this process will be ignored -
either because of time-critical needs, or because of human error. The WG
believes this should be minimised, because the benefit of extra eyes on a PR
generally outweighs the urgency of publishing. As such, we’ll track
out-of-process commits, and if trends suggest action is needed, will refer the
matter to the Governing Board for assistance.

To contact the working group, you can always use our [public
room](https://matrix.to/#/%23matrix.org-website:matrix.org) or, if this is not
a suitable option for your inquiry, please reach out to a [WG
member](https://matrix.org/foundation/working-groups/) via a DM.
