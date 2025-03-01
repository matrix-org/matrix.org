+++
title = "Porting Synapse to Python 3"
path = "/blog/2018/12/21/porting-synapse-to-python-3"

[taxonomies]
author = ["Neil Johnson"]
category = ["Tech"]
+++

Matrix's reference homeserver, Synapse, is written in Python and uses the Twisted networking framework to power its bitslinging across the Internet. The Python version used has been strictly Python 2.7, the last supported version of Python 2, but as of this week that changes! Since Twisted and our other upstream dependencies now support the newest version of Python, Python 3, we are now able to finish the jump and port Synapse to use it by default. The port has been done in a backwards compatible way, written in a subset of Python that is usable in both Python 2 and Python 3, meaning your existing Synapse installs still work on Python 2, while preparing us for a Python 3 future.

## Why port?

Porting Synapse to Python 3 prepares Synapse for a post-Python 2 world, currently scheduled for 2020. After the 1st of January in 2020, Python 2 will no longer be supported by the core Python developers and no bugfixes (even critical security ones) will be issued. As the security of software depends very much on the runtime and libraries it is running on top of, this means that by then all Python 2 software in use should have moved to Python 3 or other runtimes.

The Python 3 port has benefits other than just preparing for the End of Life of Python 2.7. Successive versions of Python 3 have improved the standard library, provided newer and clearer syntax for asynchronous code, added opt-in static typing to reduce bugs, and contained incremental performance and memory management improvements. These features, once Synapse stops supporting Python 2, can then be fully utilised to make Synapse's codebase clearer and more performant. One bonus that we get immediately, though, is Python 3's memory compaction of Unicode strings. Rather than storing as UCS-2/UTF-16 or UCS-4/UTF-32, it will instead store it in the smallest possible representation giving a 50%-75% memory improvement for strings only containing Latin-1 characters, such as nearly all dictionary keys, hashes, IDs, and a large proportion of messages being processed from English speaking countries. Non-English text will also see a memory improvement, as it can be commonly stored in only two bytes instead of the four in a UCS-4 “wide” Python 2 build.

<i>Editor's note: If you were wondering how this fits in with Dendrite (the next-gen golang homeserver): our plan is to use Synapse as the reference homeserver for all the current work going on with landing a 1.0 release of the Matrix spec: it makes no sense to try to iterate and converge on 1.0 on both Synapse and Dendrite in parallel. In order to prove that the 1.0 spec is indeed fit for purpose we then also need Synapse to exit beta and hit a 1.0 too, hence the investment to get it there. It's worth noting that over the last year we've been plugging away solidly improving Synapse in general (especially given the increasing number of high-profile deployments out there), so we're committed to getting Synapse to a formal production grade release and supporting it in the long term. Meanwhile, Dendrite development is still progressing - currently acting as a place to experiment with more radical blue-sky architectural changes, especially in low-footprint or even clientside homeservers. We expect it to catch up with Synapse once 1.0 is out the door; and meanwhile Synapse is increasingly benefiting from performance work inspired by Dendrite.
</i>

## When will the port be released?

The port is has been released in a “production ready” form in <a href="/blog/2018/12/20/synapse-0-34-0-released/">Synapse 0.34.0</a>, supporting Python 3.5, 3.6, and 3.7. This will work on installations with and without workers.

## What's it like in the real world?

Beta testers of the Python 3 port have reported lower memory usage, including lower memory “spikes” and slower memory growth. You can see this demonstrated on matrix.org:

<a href="/blog/wp-content/uploads/2018/12/image3.png"><img class="alignnone size-large wp-image-3830" src="/blog/wp-content/uploads/2018/12/image3-1024x223.png" alt="" width="1024" height="223" /></a>

See 10/15, ~20:00 for the Python 3 migration. This is on some of the Synchrotrons on matrix.org.

<a href="/blog/wp-content/uploads/2018/12/image1.png"><img class="alignnone size-large wp-image-3824" src="/blog/wp-content/uploads/2018/12/image1-1024x237.png" alt="" width="1024" height="237" /></a>

See ~11/8 for the Python 3 migration. This is on the Synapse master on matrix.org.

We have also noticed some better CPU utilisation:

<span style="font-weight: 400;"><a href="/blog/wp-content/uploads/2018/12/image2.png"><img class="alignnone size-large wp-image-3822" src="/blog/wp-content/uploads/2018/12/image2-1024x296.png" alt="" width="1024" height="296" /></a>
</span>
See 21:30 for the migration of federation reader 1, and 21:55 for the others. The federation reader is a particular pathological case, where the replacement of lists with iterators internally on Python 3 has given us some big boosts.

<a href="/blog/wp-content/uploads/2018/12/image4.png"><img class="alignnone size-large wp-image-3829" src="/blog/wp-content/uploads/2018/12/image4-1024x296.png" alt="" width="1024" height="296" /></a>

See 10/15, 4:00.The CPU utilisation has gone down on synchrotron 1 after the Python 3 migration, but not as dramatically as the federation reader. Synchrotron 3 was migrated a few days later.

As some extra data-points, my personal HS consumes about 300MB now at initial start, and grows to approximately 800MB -- under Python 2 the growth would be near-immediate to roughly 1.4GB.

## Where to from here?

Python 2 is still a supported platform for running Synapse for the time being. We plan on ending mainstream support on 1st April 2019, where upon Python 3.5+ will be the only officially supported platform. Additionally, we will give notice ahead of time once we are ready to remove Python 2.7 compatibility from the codebase (which will be no sooner than 1st April). Although slightly inconvenient, we hope that this gives our users and integrators adequate time to migrate, whilst giving us the flexibility to use modern Python features and make Synapse a better piece of software to help power the Matrix community.

## How can I try it?

The port is compatible with existing homeservers and configurations, so if you install Synapse inside a Python 3 virtualenv, you can run it from there. Of course, this differs based on your installation method, operating system, and what version of Python 3 you wish to use. Full upgrade notes live <a href="https://github.com/matrix-org/synapse/blob/release-v0.34.0/UPGRADE.rst#upgrading-to-v0340">here</a> but if you're having problems or want to discuss specific packagings of Synapse please come ask in <a href="https://matrix.to/#/#synapse:matrix.org">#synapse:matrix.org</a>.

## Thanks

Many thanks go to fellow Synapse developers Erik and Rich for code review, as well as community contributors such as notafile and krombel for laying the foundations many months ago allowing this port to happen. Without them, this wouldn't have happened.

Happy Matrixing,

Amber Brown (hawkowl)
