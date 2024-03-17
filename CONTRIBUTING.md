## What we are trying to achieve

The Matrix Foundation is in charge of various activities revolving around Matrix. One of the most important activities to make Matrix a mainstream protocol is lowering the barrier to entry for the general public. The Matrix.org website is a critical step of the onboarding: this is what people will stumble upon when they look up “what is Matrix chat” or “chatting on Matrix” in a search engine.

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

- All of the changes on the website happen [through a Pull Request](https://github.com/matrix-org/matrix.org/pulls)
- Pull Requests should fix a documented and accepted [issue](https://github.com/matrix-org/matrix.org/pulls)
- Issues are reviewed by the maintainers of the project (@thibaultamartin and @MTRNord as of now). Some discussion can happen in [#matrix.org-website:matrix.org](https://matrix.to/#/%23matrix.org-website:matrix.org) but all decisions are logged in the issues themselves.

We keep this paper trail to avoid having to review Pull Requests "fixing" things we don't need or want to be fixed. Of course we try to remain flexible where it makes sense, but want to stick to this process as much as possible.
