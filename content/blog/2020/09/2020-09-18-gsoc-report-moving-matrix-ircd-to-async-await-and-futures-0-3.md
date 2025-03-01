+++
title = "GSOC report: Moving matrix-ircd to async/await and futures 0.3"
date = "2020-09-18T13:05:13Z"
path = "/blog/2020/09/18/gsoc-report-moving-matrix-ircd-to-async-await-and-futures-0-3"

[taxonomies]
author = ["Brooks Karlik"]
category = ["GSOC"]
+++

This is part of a series of reports on the [*six* projects](https://summerofcode.withgoogle.com/organizations/6060943798173696) assigned to Matrix for Google Summer of Code 2020.

[View project: Moving `matrix-ircd` to async/await and `futures` 0.3](https://summerofcode.withgoogle.com/organizations/6060943798173696/#5911643604647936)

----

The goal of this project was to port `matrix-ircd` from the outdated combinators style of `futures` 0.1 to the new-and-improved style of `futures` 0.3. As initially proposed, this greatly improves code readability and removes the convoluted compiler errors that were pervasive in `futures` 0.1

## matrix-ircd

The matrix-ircd project functions as a bridge between two chat platforms: Internet relay chat (irc) and Matrix. matrix-ircd lets you use any standard IRC Client to communicate with Matrix chatrooms and direct messages.

## Mentors

This project is mentored by Philipp Mandler ([@phlmn](https://github.com/phlmn)) and Jonas Platte ([@jplatte](https://github.com/jplatte)). I would like to thank them for the helpful advice and code reviews they have given me over the course of GSoC 2020.

## Project Results

Since much of the code was written in late 2016, there were many portions of the code that were unidiomatic and produced compiler errors. The first step I made was to remove all compiler errors from `cargo` and `clippy` in [#64](https://github.com/matrix-org/matrix-ircd/pull/64).

Additional tests were then written in various parts of the codebase to ensure that the upgrade would produce the same results. These changes were made in [#64](https://github.com/matrix-org/matrix-ircd/pull/65) and [#66](https://github.com/matrix-org/matrix-ircd/pull/66).

Since the project master branch currently used a custom http implementation, I moved it to use [hyper](https://crates.io/crates/hyper), a fast and correct http implementation that already supported async/await. Additionally, I moved the module that most utilized http, `matrix`, to async-await and the new `hyper` code. Not only did these changes shrink the code by ~700 lines, they also removed a lot of unnecessary complexity. These changes were made in [#67](https://github.com/matrix-org/matrix-ircd/pull/67).

The last large module remaining, `irc`, was then ported to `irc`, along with its dependencies in `stream_fold.rs` and its upstream user in the `bridge` module. The most exciting part of these changes was the removal of the `futures` 0.1 dependency. All code was now running in `futures` 0.3! These changes also moved away from [tasked-futures](https://github.com/erikjohnston/tasked-futures) which further improved code readability. This PR was in [#71](https://github.com/matrix-org/matrix-ircd/pull/71).

Since the bulk of the changes were now complete, I moved onto bug fixes. As [@jplatte](github.com/jplatte) mentioned in #71, the current single threaded approach to the application was not ideal. In [#72](https://github.com/matrix-org/matrix-ircd/pull/72) I updated all code to be multithreaded-compatible.

Lastly, In [#77](https://github.com/matrix-org/matrix-ircd/pull/77) I included more tests to functions with heavy changes, added additional logging, removed unnecessary complexity that was introduced to keep code as "1:1" as possible, and added TLS support to `hyper` so that https would work. This patch also fixed a rather difficult bug regarding the irc TCP streams and the buffer they were reading into.

## Remaining Work

Based on my personal testing there is *no additional work* to be done in the realm of updating to async/await. All tests pass and the IRC server and matrix bridge function as expected. @jplatte kindly announced in the [This Week In Matrix](https://matrix.org/blog/category/this-week-in-matrix#matrix-ircd---call-for-testing) blog that we will be conducting public testing of the `async_await` branch on github. Barring any issues the async/await code should be merged into the master branch in the next few weeks.

### Pull request list

* <https://github.com/matrix-org/matrix-ircd/pull/64>
* <https://github.com/matrix-org/matrix-ircd/pull/65>
* <https://github.com/matrix-org/matrix-ircd/pull/66>
* <https://github.com/matrix-org/matrix-ircd/pull/67>
* <https://github.com/matrix-org/matrix-ircd/pull/71>
* <https://github.com/matrix-org/matrix-ircd/pull/72>
* <https://github.com/matrix-org/matrix-ircd/pull/77>
