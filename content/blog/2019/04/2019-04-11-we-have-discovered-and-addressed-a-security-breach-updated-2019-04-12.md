+++
title = "We have discovered and addressed a security breach. (Updated 2019-04-12)"
path = "/blog/2019/04/11/we-have-discovered-and-addressed-a-security-breach-updated-2019-04-12"

[taxonomies]
author = ["Matrix.org Team"]
category = ["General"]
+++

<b>Update: for the full story here, please see <a href="https://matrix.org/blog/2019/05/08/post-mortem-and-remediations-for-apr-11-security-incident">the post mortem</a>.</b>
<br/>

## Here's what you need to know

<strong>TL;DR:</strong> An attacker gained access to the servers hosting Matrix.org. The intruder had access to the production databases, potentially giving them access to unencrypted message data, password hashes and access tokens. As a precaution, if you're a matrix.org user you should <strong>change your password now</strong>.

The matrix.org homeserver has been rebuilt and is running securely; bridges and other ancillary services (e.g. this blog) will follow as soon as possible. Modular.im homeservers have not been affected by this outage.

### The security breach is not a Matrix issue

The hacker exploited a vulnerability in our production infrastructure (specifically a slightly outdated version of Jenkins). <strong>Homeservers other than matrix.org are unaffected.</strong>

### How does this affect me?

We have invalidated all of the active access tokens for users on Matrix.org - all users have been logged out.

Users with <strong>Matrix.org accounts</strong> should:

<ul>
<li><strong>Change your password now</strong> - no plaintext Matrix passwords were leaked, but weak passwords could still be cracked from the hashed passwords</li>
<li><strong>Change your NickServ password (if you're using IRC bridging)</strong> - there's no evidence bridge credentials were compromised, but if you have given the IRC bridges credentials to your NickServ account we would recommend changing this password</li>
</ul>

And as a reminder, it's good practice to:

<ul>
<li><strong>Review your device list regularly</strong> - make sure you recognise all of the devices connected to your account</li>
<li><strong>Always make sure you enable E2E encryption for private conversations</strong></li>
</ul>

### What user data has been accessed?

Forensics are ongoing; so far we've found no evidence of large quantities of data being downloaded. The attacker did have access to the production database, so unencrypted content (including private messages, password hashes and access tokens) may be compromised.

### What has not been affected?

<ul>
<li>Source code and packages have not been impacted based on our initial investigations.  However, we will be replacing signing keys as a precaution.</li>
<li>Modular.im servers are not affected, based on our initial analysis</li>
<li>Identity server data does not appear to have been compromised</li>
</ul>

The target appeared to be internal credentials for onward exploits, not end user information from the matrix.org homeserver.

### You might have lost access to your encrypted messages

As we had to log out all users from matrix.org, if you do not have backups of your encryption keys you will not be able to read your encrypted conversation history.  However, if you use server-side encryption key backup (the default in Riot these days) or take manual key backups, you’ll be okay.

This was a difficult choice to make. We weighed the risk of some users losing access to encrypted messages against that of all users' accounts being vulnerable to hijack via the compromised access tokens. We hope you can see why we made the decision to prioritise account integrity over access to encrypted messages, but we're sorry for the inconvenience this may have caused.

## What happened?

We were using Jenkins for continuous integration (automatically testing our software). The version of Jenkins we were using had a vulnerability (<a href="https://nvd.nist.gov/vuln/detail/CVE-2019-1003000">CVE-2019-1003000</a>, <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-1003001">CVE-2019-1003001</a>, <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-1003002">CVE-2019-1003002</a>) which allowed an attacker to hijack credentials (forwarded ssh keys), giving access to our production infrastructure. Thanks to <a href="https://twitter.com/jaikeysarraf">@jaikeysarraf</a> for drawing this to our attention.

### Timeline

March 13th <b>Updated 2019-04-12 11:00 UTC</b>
<ul>
<li>Attacker compromises Jenkins CI server</li>
</ul>

April 4th <b>Updated 2019-04-12 11:00 UTC</b>
<ul>
<li>Attacker gains access to production infrastructure by hijacking a forwarded SSH agent logging into the compromised Jenkins worker</li>
</ul>

April 9th

<ul>
<li>Jenkins vulnerability brought to our attention by <a href="https://twitter.com/jaikeysarraf">@jaikeysarraf</a></li>
</ul>

April 10th

<ul>
<li>Investigation identified the compromised machines and the full scope of the attack</li>
<li>Jenkins was removed</li>
<li>Attacker's access to compromised machines was removed</li>
</ul>

April 11th

<ul>
<li>Matrix.org was taken offline and production infrastructure fully rebuilt</li>
<li>Having fully flushed out the attacker, external communication was published informing users and advising on next steps</li>
<li>Matrix.org homeserver restored, with bridges and ancillary services (e.g. this blog) following as soon as possible</li>
</ul>

## Update 2019-04-12

At around 5am UTC on Apr 12, the attacker used a cloudflare API key to repoint DNS for matrix.org to a defacement website (<https://github.com/matrixnotorg/matrixnotorg.github.io>).
The API key was known compromised in the original attack, and during the rebuild the key was theoretically replaced.  However, unfortunately
only personal keys were rotated, enabling the defacement.  We are currently doublechecking that all compromised secrets have been rotated.

The rebuilt infrastructure itself is secure, however, and the DNS issue has been solved without further abuse.
If you have already changed your password, you do not need to do so again.

The defacement confirms that encrypted password hashes were exfiltrated from the production database, so <b>it is even more important
for everyone to change their password</b>.  We will shortly be messaging and emailing all users to announce the breach and advise them
to change their passwords.  We will also look at ways of non-destructively forcing a password reset at next login.

The attacker has also posted github issues detailing some of their actions and suggested remediations at
<https://github.com/matrix-org/matrix.org/issues/created_by/matrixnotorg>.

This confirms that GPG keys used for signing packages were compromised.  These keys are used for signing
the synapse debian repository (AD0592FE47F0DF61), and releases of Riot/Web (E019645248E8F4A1).
Both keys have now been revoked.  The window of compromise for the keys started from April 4th; there have
been no Synapse releases since then.  There has been one release of Riot/Web (1.0.7), however as the key
was passphrased and based on our initial analysis of the release, we believe it to be secure.

## What are we doing to prevent this in future?

Once things are back up and running we will retrospect on this incident in detail to identify the changes we need to make. We will provide a proper postmortem, including follow-up steps; meanwhile we are obviously going to take measures to improve the security of our production infrastructure, including patching services more aggressively and more regular vulnerability scans.
