+++
title = "Security Disclosure Policy"
+++

Matrix.org greatly appreciates investigative work into security vulnerabilities
carried out by well-intentioned, ethical security researchers. We follow the
practice of [responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure)
in order to best protect Matrix's user base from the impact of security issues.
On our side, this means:

- We will respond to security incidents as a priority.
- We will work with you to establish a disclosure time frame for the reported
  vulnerability. During this time frame, we will either work on a fix or decide
  to accept the risk, after which we will disclose the vulnerability.
- We will always transparently let the community know about any incident that
  affects them.
- After disclosing the vulnerability, we will credit you for the report in our
  [Security Hall of Fame](/security-hall-of-fame/), if you wish.

In general, we will aim for a fix within 90 days of receiving your report, but
we may propose a longer time frame (usually 120 days) for especially complex
vulnerabilities. In some cases, when a vulnerability is particularly disruptive
and/or easy to exploit, we may delay publishing technical details for an
additional period after the fix is publicly available (usually no longer than
30 days).

If you have found a security vulnerability in Matrix, we ask that you disclose
it responsibly by emailing [security@matrix.org](mailto:security@matrix.org).
Optionally, if you want to encrypt your email, you can use our [PGP key](/.well-known/pgp-key.txt).
Please do not discuss potential vulnerabilities in public without validating
with us first.

On receipt, the security team will:

- Review the report, verify the vulnerability and respond with confirmation
  and/or further information requests; we reply within 5 business days.
- Once the reported security bug has been addressed we will notify the
  Researcher, who is then welcome to optionally disclose publicly.

The following is a list of known issues and/or things we do not consider to be
an issue. Please **do not** send reports regarding the following:

- Issues relating to SPF or DMARC.

The Matrix.org Foundation does not ordinarily provide bug bounties, though
organisations building on top of Matrix may do so in future. We maintain a
[Security Hall of Fame](/security-hall-of-fame) to recognise those who have
responsibly disclosed security issues to us in the past.
