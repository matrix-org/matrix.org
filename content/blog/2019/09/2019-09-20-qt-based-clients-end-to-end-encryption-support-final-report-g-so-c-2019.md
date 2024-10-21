+++
title = "Qt-based clients end-to-end encryption support -- final report (GSoC 2019)"
date = "2019-09-20T02:10:21Z"
path = "/blog/2019/09/20/qt-based-clients-end-to-end-encryption-support-final-report-g-so-c-2019"

[taxonomies]
author = ["Alexey Andreyev"]
category = ["GSOC"]
+++

## Overview

**libQMatrixClient was [renamed](https://github.com/quotient-im/libQuotient/issues/325) to libQuotient*

The project aimed at adding end-to-end encryption to [libQuotient](https://github.com/quotient-im/libQuotient) for future support in Qt/libQuotient-based clients like [Quaternion](https://matrix.org/docs/projects/client/quaternion) and [Spectal](https://matrix.org/docs/projects/client/spectral), or even [Telepathy IM](https://github.com/TelepathyIM/telepathy-tank).

## The work done

Regarding my initial [proposal](https://github.com/quotient-im/libQuotient/wiki/_GSoC-2019-E2EE-proposal), I’ve completed tasks enough for message receiving, and not finished tasks related to message sending.

Focused on libQuotient, I've also [added changes to Quaternion client](https://github.com/quotient-im/Quaternion/commits/aa13q-e2ee) to support the proposed API and test the results.
I've reused libQtOlm, which is a Qt wrapper to the matrix olm library and [contributed to provide better compatibility during its building and deployment](https://gitlab.com/b0/libqtolm/merge_requests?scope=all&utf8=%E2%9C%93&state=all&author_username=aa13q).
This also required to dive into the olm library itself and provide [minor patch](https://gitlab.matrix.org/matrix-org/olm/commit/aa0c9ab6b51d182cb78ab4cc75c81c0054765bde) for the olm CMake files too.

So, the basic structure of the project changed a bit, libQtOlm was added as a dependency to support libolm:

```txt
                              +--------------------------------------------+
                              |   Quaternion/Spectral/Telepathy|Tank/etc   |
+------------------+          +--------------------------------------------+
|      CS API      |  <---->  |                  libQuotient               |
+------------------+          +-------------------------------+------------+
|Synapse homeserver|          |               Qt              |  libQtOlm  |
+------------------+          +--------------------------------------------+
                                                              |   libolm   |
                                                              +------------+
```

During the coding period, I've resorted to [the specification](https://matrix.org/docs/spec/client_server/latest), [the guide](https://matrix.org/docs/guides/end-to-end-encryption-implementation-guide) and the [last year GSoC python implementation](https://github.com/Zil0/matrix-python-sdk/wiki) actively. And added [minor fix for the documentation](https://github.com/matrix-org/matrix-doc/pull/2157) about names constants at the documentation examples.

## Demonstration

[![Imgur](https://i.imgur.com/BKmhvni.jpg)](https://youtu.be/gGykLh4mVDg)

## Future work

Talking about future work, the status is going to be captured at [libQuotient project board](https://github.com/quotient-im/libQuotient/projects). Next steps are:

- Managing devices list for users in the room
- Sending encrypted messages

While olm account management architecture and `device_one_time_keys_count` sync data handling is here, such tasks as session management after a restart and device verification still requires additional efforts. After that encrypted attachments support and key backups could also be added.

I'm going to take care about that, but it definitely will be harder as just a side project. I still have enthusiasm though :)

## Conclusion

To take part in the Google Summer of Code project was my dream. I'm very happy I've managed to took part this year, since it was the last year of my study, while I had doubts about my personal results until I've received final confirmation and the review.

From the beginning of the project, I've realized I'm very lucky since I've got all the chances to provide perfect results. [@Kaffeine](https://github.com/Kaffeine) helped me a lot with my TelepathyIM contribution. He helped me to evolve my CMake, git and Qt/C++ skills and that's how I've started contributing to the libQuotient before GSoC. After that, it turns out that I've accepted and received even two mentors. [@uhoreg](https://github.com/uhoreg) from the Matrix team, who helped me with End-to-End Encryption logic and olm/megolm understanding. And [@kitsune](https://github.com/KitsuneRal) from the Quotient project, who helped me a lot with the code review, with the architecture decisions and the library logic, and even with the time management (he was the one who watched carefully about my results). The last year GSoC python implementation and guide from [@Zil0](https://github.com/Zil0) were also here, and it turns out that Spectral developer [@BHat](https://github.com/encombhat) provided QtOlm wrapper right before GSoC stated.

However, planning and updating the plan were my weak points, where I've made key mistakes, such as poor combination with my regular part-time job. And I definitely should have reserved a small vacation at least for the final period of the project to handle tasks better.

In the end, I've managed to debug the mistakes and provided encrypted messages receiving that could already be used at the clients. Also, I evolved my skills and dived into the megolm E2EE subject. I'm willing to continue my contribution to develop libQuotient as full-featured Qt-based Matrix library.

In general, I am not disappointed. I'm wishing luck to all the future students who are reading this. I'm happy to receive support and contribute to an international open project not only for myself, but also for the other developers and users.

## Appendix: Additional links

**GSoC project page**: [link](https://summerofcode.withgoogle.com/organizations/6624344617254912/#5821516577505280)

**Mentors**: [Alexey Rusakov](https://matrix.to/#/@kitsune:matrix.org), [Hubert Chathi](https://matrix.to/#/@uhoreg:matrix.org)

**GSoC Matrix room**: [link](https://matrix.to/#/#gsoc:matrix.org)

**Contribution**: [libQuotient GSoC E2EE PRs list](https://github.com/quotient-im/libQuotient/issues?q=author%3Aa-andreyev+label%3AGSoC2019), [full final report at the project wiki](https://github.com/quotient-im/libQuotient/wiki/_GSoC-2019-E2EE-final-evaluation)
