+++
date = "2025-01-06T18:00:00Z"
title = "Authentication changes on Matrix.org"
path = "/blog/2025/01/06/authentication-changes"

[taxonomies]
author = ["Will Lewis"]
category = ["Tech", "matrix.org homeserver"]
+++

The Matrix.org homeserver will see changes related to authentication in Q1 2025. The team will turn off guest account access on Matrix.org on January 16th and roll out Matrix Authentication Service (MAS) to embrace Matrix 2.0 after February 10. Client developers need to ensure their clients support the required changes.

## What is MAS

Matrix Authentication Service is Matrix's next-generation authentication stack. It allows for more flexible authentication journeys without requiring client developers to support every one of them.

You can find all the technical details in Quentin's Matrix Conf talk, [Harder Better Faster Stronger Authentication with OpenID Connect](https://www.youtube.com/watch?v=wOW8keNafdE).

## What's the impact

Client developers need to ensure that their projects support [the requirements listed on areweoidcyet.com](https://areweoidcyet.com/#next-gen-auth-aware-clients) and, more precisely, the requirements listed in [MSC3824](https://github.com/matrix-org/matrix-spec-proposals/pull/3824).

Developers can already use beta.matrix.org to see if their clients are compatible with MAS. **If you notice anything that doesn't work as intended, make sure to give your feedback on [those MSCs](https://areweoidcyet.com/#next-gen-auth-aware-clients).** If clients work on beta.matrix.org, they will be able to connect to matrix.org after the rollout.

Homeserver administrators from the public federation don't have to worry about this deployment. MAS only affects the APIs between the clients and the server, so this deployment only impacts clients connecting to matrix.org. Federation APIs, used for servers to talk to each other, remain unchanged.

## Disabling guest accounts

Guest accounts are a legacy Matrix feature that allows clients to create temporary, limited technical accounts to participate in specific rooms that allow it.

The Matrix.org Foundation would have liked to find an efficient way to let people create guest accounts when joining a conversation and then turn them into fully fledged accounts later. Nobody in the ecosystem found resources to design and implement such a user journey, and guest accounts ended up being used for technical reasons, like displaying room previews or badges via shields.io.

Those accounts make up a significant load on the matrix.org homeserver. For that reason, the Matrix.org Foundation has decided to disable them at least temporarily to save precious resources and go ahead with the rollout of the new authentication stack.

The Matrix.org Foundation is open to re-enabling guests accounts once it has the financial capacity to support them. If guest accounts on matrix.org are important to you and your business, please [join the Matrix.org Foundation as a supporting member](https://matrix.org/membership/) to contribute to its financial sustainability.

We encourage developers using guest access for room information, such as topics, aliases, or member counts, to utilize the endpoint proposed by [MSC3266](https://github.com/matrix-org/matrix-spec-proposals/pull/3266). This endpoint is publicly accessible without authentication and can serve as an alternative resource until guest access is reinstated in a more robust form.

We appreciate your understanding as we take these steps to enhance the user experience on Matrix.org. 