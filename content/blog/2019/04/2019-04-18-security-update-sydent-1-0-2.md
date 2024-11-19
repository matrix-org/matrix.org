+++
title = "Security Update: Sydent 1.0.2"
path = "/blog/2019/04/18/security-update-sydent-1-0-2"

[taxonomies]
author = ["Matrix.org Team"]
category = ["General"]
+++

## Overview

We became aware today of a flaw in [sydent](https://github.com/matrix-org/sydent)’s validation of email addresses which can lead to a failure to correctly limit registration to a given email domain.  **This only affects people who run their own sydent, and are relying on allowed_local_3pid in their synapse config.** We’d like to thank [@fs0c131y](https://twitter.com/fs0c131y) for bringing it to our attention on [Twitter](https://twitter.com/fs0c131y/status/1118791420624687104) this morning.  We are not aware of this being exploited in the wild other than the initial report.

**If you are running your own sydent, and limiting signup for your server using the `allowed_local_3pids` configuration option, then you need to upgrade your sydent immediately to Sydent 1.0.2.**

Meanwhile, if you have been relying on the `allowed_local_3pids` configuration option to restrict access to your homeserver, you may wish to check your homeserver’s user_threepids table for malformed email addresses and your sydent’s database as follows:

```bash
$ sqlite3 sydent.db 
sqlite> select count(*) from global_threepid_associations where address like '%@%@%';
0

$ psql matrix
matrix=> select count(*) from user_threepids where address like '%@%@%';
 count 
-------
     0
```

If the queries return more than 0 results, please let us know at [security@matrix.org](mailto:security@matrix.org) - otherwise you are fine.

## Details

A flaw existed in sydent whereby it was possible to bypass the requirement specified in synapse’s `allowed_local_3pids` option, which restricts that users may only register with an email address matching a specific format.

This relied on two things:

1. sydent uses python's email.utils.parseaddr function to parse the input email address before sending validation mail to it, but it turns out that if you hand parseaddr an malformed email address of form <a@b.com>@c.com, it silently discards the @c.com prefix without error.  The result of this is that if one requested a validation token for '<a@malicious.org>@important.com', the token would be sent to '<a@malicious.org>', but the address '<a@malicious.org>@important.com' would be marked as validated.  This release fixes this behaviour by asserting that the parsed email address is the same as the input email address.
2. synapse's checking of email addresses relies on regular expressions in the home server configuration file. synapse does not validate email addresses before checking them against these regular expressions, so naive regular expressions will detect the second domain in email addresses such as the above, causing them to pass the check.

You can get sydent 1.0.2 from <https://github.com/matrix-org/sydent/releases/tag/v1.0.2>.
