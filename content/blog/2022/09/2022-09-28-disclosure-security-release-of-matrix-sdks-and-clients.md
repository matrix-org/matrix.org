+++
date = "2022-09-28T12:53:12Z"
title = "Upgrade now to address E2EE vulnerabilities in matrix-js-sdk, matrix-ios-sdk and matrix-android-sdk2"
path = "/blog/2022/09/28/upgrade-now-to-address-encryption-vulns-in-matrix-sdks-and-clients"
template = "post.html"
[taxonomies]
category = ["Security"]
author = ["Matthew Hodgson", "Denis Kasak", "Matrix Security", "Matrix cryptography"]
+++

**TL;DR:**

* Two critical severity vulnerabilities in end-to-end encryption were found in
  the SDKs which power Element, Beeper, Cinny, SchildiChat, Circuli, Synod.im
  and any other clients based on matrix-js-sdk, matrix-ios-sdk or
  matrix-android-sdk2.
* These have now been fixed, and we have not seen evidence of them being
  exploited in the wild. All of the critical vulnerabilities require
  cooperation from a malicious homeserver to be exploited.
* **Please upgrade immediately in order to be protected against these
  vulnerabilities.**
* Clients with other encryption implementations (including Hydrogen, ElementX,
  Nheko, FluffyChat, Syphon, Timmy, Gomuks and Pantalaimon) are not affected;
  **this is not a protocol bug**.
* We take the security of our end-to-end encryption extremely seriously, and we
  have an ongoing series of public independent audits booked to help guard
  against future vulnerabilities.  We will also be making some protocol changes
  in the future to provide additional layers of protection.
* This resolves the [pre-disclosure][predisclosure] issued on September 23rd.

[predisclosure]:
<https://matrix.org/blog/2022/09/23/pre-disclosure-upcoming-critical-security-release-of-matrix-sd-ks-and-clients>

Hi all,

Recently we have been hard at work investigating some subtle security
vulnerabilities in certain implementations of Matrix's end-to-end encryption
which were responsibly disclosed to us by researchers at Royal Holloway
University London, University of Sheffield and Brave Software. Two of these
vulnerabilities are critical severity, in that they could allow malicious
server admins to attack their users, and are implementation bugs in clients
using matrix-js-sdk (e.g. Element Web) or implementations derived from
matrix-js-sdk, rather than protocol flaws. matrix-rust-sdk (and other 2nd/3rd
generation SDKs) are not affected by these.  These vulnerabilities are fixed in
today's release, and we are not aware of them having been exploited in the
wild.

**If you're using Element or an application that shares the same SDKs (Beeper,
Cinny, SchildiChat, Circuli, Synod.im) then please upgrade now. Do not perform
verification with new devices until you have upgraded.**

We'd like to thank the security researchers for investing significant time and
effort into doing a deep dive to find these issues, and thus contributing
materially to making Matrix more secure for the whole ecosystem.  Despite our
best efforts, there is always a risk of security issues in software, and we're
very glad to have identified and fixed these issues while also taking the
opportunity to improve our vulnerability disclosure and coordinated upgrade
process.

Please note that the critical severity issues are implementation issues in
matrix-js-sdk and derivatives, and are **not** protocol issues in Matrix. The
latest version of the researchers' paper that we've seen incorrectly presents
Element as 'the reference Matrix client', and confuses the higher severity
implementation bugs with lower severity protocol critique.  This is very
unfortunate, given Hydrogen, ElementX, Nheko, FluffyChat, Syphon, Timmy, Gomuks
and Pantalaimon and other independent implementations are not affected. In
fact, every client independently implemented using the Matrix spec seems to
have got it right, which speaks well of the protocol.  It's only the first
generation SDK (predating the spec) and its derivatives which had these bugs.

The two critical severity issues lead to three attack scenarios, all of which
are prevented by today's releases:

* "*Key/Device Identifier Confusion in SAS Verification*" – A bug existed in
  matrix-js-sdk where it confused together device IDs and cross-signing keys
  (given under the hood, cross-signing keys are represented as devices). This
  could be exploited by a malicious server admin to break emoji-based
  verification when cross-signing is in use, authenticating themselves rather
  than the target user being verified. This bug is only present in
  matrix-js-sdk (not iOS or Android SDKs), tracked as a critical severity CVE:
  CVE-2022-39250.

* "*Trusted Impersonation*" – matrix-js-sdk (and derived SDKs) suffered from
  a protocol-confusion bug where it would incorrectly accept to-device messages
  encrypted by Megolm rather than Olm, attributing them to the Megolm sender
  rather than the actual sender. As a result, an attacker could fake the
  trusted sender of to-device messages, allowing them to send fake to-device
  messages to devices - e.g. fake keys to spoof historical messages from other
  users.  This bug is tracked as a critical severity CVE: CVE-2022-39251
  (matrix-js-sdk), CVE-2022-39255 (matrix-ios-sdk) and CVE-2022-39248
  (matrix-android-sdk2).

* "*Malicious key backup*" – the above 'trusted impersonation' bug in
  matrix-js-sdk (and derived SDKs) could be used by a malicious homeserver
  admin to add a malicious key backup to the user's account under certain
  unusual conditions in order to exfiltrate message keys. While we are not
  aware of this being exploited in the wild, out of an abundance of caution we
  recommend checking your key backup settings. If you are particularly paranoid
  you may wish to reset your online key backup.  This doesn't have a separate
  CVE, as the root cause is the same as "Trusted Impersonation".

Three lower priority issues were also identified by the researchers:

* "*Semi-trusted Impersonation*" – matrix-js-sdk (and derived SDKs) accepted keys
  forwarded by other users, even if your client didn't request them. As
  a result, a malicious server admin could fake an encrypted message to look as
  if it was sent from a given user on that server. However, impersonated
  messages like this are clearly marked  by clients like Element with a clear
  "The authenticity of this encrypted message can't be guaranteed" warning
  – which is why we consider this low severity. That said, it's an avoidable
  attack, and we've fixed this by ensuring that clients don't accept 'unsafe'
  keys (with the exception of keys forwarded when you invite a user to an
  existing conversation).  In future, in Olm/Megolm v2 we're also linking
  key-sending events to the underlying recipient Olm identity to ensure that
  keys cannot be misappropriated.  This issue is tracked as a moderate severity
  CVE: CVE-2022-39249 (matrix-js-sdk), CVE-2022-39257 (matrix-ios-sdk) and
  CVE-2022-39246 (matrix-android-sdk2).

* "*Homeserver Control of Room Membership*" – A malicious homeserver can fake
  invites on behalf of its users to invite malicious users into their
  conversations, or add malicious devices into its users accounts.  However,
  when this happens, we clearly warn the user: if you have verified the users
  you are talking to, the room and user will be shown with a big red cross to
  mark if malicious devices have been added.  Similarly, if an unexpected user
  is invited to a conversation, all users can clearly see and take evasive
  action.  Therefore we consider this a low severity issue.  That said, this
  behaviour can be improved, and we've started work on switching our trust
  model to trust-on-first-use (so that new untrusted devices are proactively
  excluded from conversations, even if you haven't explicitly verified their
  owner) - and we're also looking to add cryptographic signatures to membership
  events in E2EE rooms to stop impersonated invites.  These fixes will land
  over the coming months.

* "*IND-CCA break*" – Matrix's usage of AES-CTR to encrypt attachments, secrets
  and symmetric key backups is not "IND-CCA2 secure", because it does not
  include the AES initialisation vector within the hash used to secure the
  payload from tampering. As a result, if an attacker could observe the result
  of both a given encryption and a given decryption operation, it would be
  possible to extract the encryption private key. However, this is a purely
  theoretical attack as Matrix does not provide a way to mount the attack. In
  the future, we will fix our use of AES-CTR to include the IV within the hash.

We'd like to again thank Martin R. Albrecht and Dan Jones from the Information
Security Group at Royal Holloway University London, Benjamin Dowling from
Security of Advanced Systems Group, University of Sheffield and Sofía Celi from
Brave Software for discovering these issues and responsibly disclosing them to
us, and then working with us to agree on an extended disclosure window given
the amount of work needed to verify and ship fixes throughout Matrix over the
course of the summer period.  We welcome any further formal security analysis
work, and hope that it will distinguish clearly between Matrix-the-protocol and
Matrix implementations like matrix-js-sdk, rather than conflating them. You can
read their full paper [here](https://nebuchadnezzar-megolm.github.io/).

We'd also like to thank all the downstream Element package maintainers,
downstream forks and other affected clients for working together under time
constraints for this coordinated release - your patience and understanding is
very much appreciated indeed.

Meanwhile, we are taking extreme measures to avoid future E2EE vulnerabilities.
You will notice that matrix-rust-sdk, hydrogen-sdk and other 2nd and 3rd
generation SDKs were not affected by the bugs at the root cause of the critical
issues here. This is **precisely** why we have been working on replacing the
first generation SDKs with a clean, carefully written Rust implementation in
the form of matrix-rust-sdk, complete with an ongoing independent public audit.

We started the process of auditing matrix-rust-sdk with the [Least Authority
vodozemac audit in May][audit_blog], and we have three more audits agreed
– covering matrix-rust-sdk-crypto, matrix-rust-sdk, and a whole reference
Matrix stack.  Ironically, the mitigation work for these vulnerabilities in the
legacy SDKs has severely impacted our timelines for finishing
matrix-rust-sdk-crypto work (in fact, we had to push back the Least Authority
audit of matrix-rust-sdk-crypto given the
[burndown](https://github.com/matrix-org/matrix-rust-sdk/milestone/1) has not
progressed), but we will be shifting to the new audited codebase as rapidly as
we possibly can.

[audit_blog]:
<https://matrix.org/blog/2022/05/16/independent-public-audit-of-vodozemac-a-native-rust-reference-implementation-of-matrix-end-to-end-encryption>

Over the coming months we will also introduce our first ever major version
update of Olm and Megolm, in order to fix the MAC truncation issue highlighted
in the [vodozemac audit][audit_post] (Issue J), and reduce the risk of further
key-forwarding issues (as per the "Semi-trusted Impersonation" vulnerability
above). New conversations will default to using v2 of Olm/Megolm for security,
and existing conversations can be optionally upgraded (similar to a 'room
version' upgrade in Matrix today). We are also adding extensive end-to-end
testing using [Polyjuice](https://gitlab.com/polyjuice) and [Traffic
Light](https://github.com/matrix-org/trafficlight) to stress-test encryption
and improve reliability.

[audit_post]:
<https://matrix.org/media/Least%20Authority%20-%20Matrix%20vodozemac%20Final%20Audit%20Report.pdf>

Finally, we will continue our research into layering Matrix over Messaging
Layer Security (MLS) - the IETF proposed standard for interoperable end-to-end
encrypted group messaging.  This work has been delayed by the mitigation
activity above, but otherwise it's making good progress and we're excited to
see how Decentralised MLS performs in reality against Olm+Megolm v2.

We'd like to apologise to the wider Matrix community for the inconvenience and
disruption of these issues, and thank you for your patience while we've
resolved them.

Matthew, Denis and the Matrix cryptography & security teams.
