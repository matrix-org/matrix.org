+++
title = "Security disclosure for matrix-js-sdk (CVE-2024-47080) and matrix-react-sdk (CVE-2024-47824)"
date = "2024-10-15T11:39:35Z"

[taxonomies]
author = ["Matrix.org Security Team"]
category = ["Security"]
+++

Hi all,

We are disclosing two high-severity vulnerabilities in matrix-js-sdk and matrix-react-sdk related to
[MSC3061](https://github.com/matrix-org/matrix-spec-proposals/pull/3061),
which specifies sharing room keys with newly invited users for message history access.

### Affected versions

- **matrix-js-sdk** ≥ 9.11.0, < 34.8.0
  ([CVE-2024-47080](https://www.cve.org/CVERecord?id=CVE-2024-47080) /
  [GHSA-4jf8-g8wp-cx7c](https://github.com/matrix-org/matrix-js-sdk/security/advisories/GHSA-4jf8-g8wp-cx7c)). Fixed in 34.8.0.
- **matrix-react-sdk** ≥ 3.18.0, < 3.102.0
  ([CVE-2024-47824](https://www.cve.org/CVERecord?id=CVE-2024-47824) /
  [GHSA-qcvh-p9jq-wp8v](https://github.com/matrix-org/matrix-react-sdk/security/advisories/GHSA-qcvh-p9jq-wp8v)).
  Fixed in 3.102.0.

### Vulnerability details

When inviting a user to an encrypted room, in the legacy (pre-Rust) encryption implementation,
matrix-react-sdk forwarded existing message keys to the newly invited user so they could decrypt shared message history
as per MSC3061. The implementation is provided by matrix-js-sdk, which incorrectly applied the same rules for sending
*existing* keys to the invited user as for sending *new* keys,
which allows them to be sent to unverified devices and unverified users.
While there's always some risk of key exposure to a server-side attacker when you're interacting with unverified users,
the risk is higher for historical keys.

### Root cause and remediation

The root cause of the matrix-react-sdk vulnerability is a function call into vulnerable functionality implemented
in the matrix-js-sdk. The matrix-react-sdk vulnerability was addressed earlier,
in matrix-react-sdk version 3.102.0, by removing the call.
The matrix-js-sdk vulnerability will be addressed in version 34.8.0 to remove the vulnerable functionality completely.
Because of these differences, two separate advisories were warranted.

Note that the vulnerability is only present in the matrix-js-sdk when running the old, non-Rust encryption stack.
The vulnerable functionality was never implemented in the Rust-based stack. As a result,
clients using the matrix-js-sdk in Rust crypto mode (i.e. calling `initRustCrypto` rather than `initCrypto`)
are *not* vulnerable, even if on a nominally vulnerable version.

Furthermore, matrix-android-sdk2 and matrix-ios-sdk have similar functionality that is gated behind an experimental
setting—we recommend avoiding use of this setting, though there are no specific advisories since the feature has only
been available in an experimental state.

### Proposed specification changes

To fix this functionality in terms of the specification process, we will open an MSC to explicitly clarify that MSC3061
key forwarding should only forward keys to verified devices owned by verified users,
ensuring that historical keys are never shared with untrusted devices.
This also encourages users to verify each other to enable reading message history,
thereby improving Matrix security against interception.

### Note on project ownership

The matrix-react-sdk is no longer a Foundation project but that of
Element and has been moved to <https://github.com/element-hq/matrix-react-sdk>.
However, the vulnerability in question was introduced, found and patched while it was still under Foundation ownership.
For this reason, the Matrix.org Security team decided to treat this as a Foundation advisory.
Future advisories for matrix-react-sdk (if any) will come from Element.
