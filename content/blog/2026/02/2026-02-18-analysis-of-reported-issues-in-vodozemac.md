+++
date = "2026-02-18T21:21:47+00:00"
title = "Analysis of reported issues in vodozemac"

[taxonomies]
author = ["Matrix.org Security Team"]
category = ["Security", "Cryptography"]
+++

Today a [blog post](https://soatok.blog/2026/02/17/cryptographic-issues-in-matrixs-rust-library-vodozemac/) was published alleging a series of vulnerabilities in Matrix's vodozemac cryptographic library. The post follows a private disclosure to <security@matrix.org>. While we prefer coordinated disclosure, the author chose to publish prior to further technical discussion, including clarification of the claimed severity.

We take cryptographic concerns seriously and welcome scrutiny of our cryptographic protocols and implementations. However, we disagree with several conclusions in the post regarding exploitability and impact to Matrix deployments. Below we analyse the claims in terms of realistic attacker capabilities and protocol invariants.

## Executive summary

* We confirm the Olm 3DH code path in vodozemac doesn't currently reject all-zero X25519 outputs.  
* We disagree with the post's claim that this leads to any loss of confidentiality in Matrix, let alone complete loss.  
* Olm v2 is neither standardised nor deployed in today's Matrix. Claims framed as downgrades are about experimental future configuration, not the current spec.  
* Olm v1 uses truncated 64-bit message authentication tags, a remnant of an earlier time when Matrix's cryptography was closely following Signal's. We acknowledge this as a trade-off and that using longer authentication tags would provide a larger security margin, as has been publicly documented in a [previous audit of vodozemac](https://matrix.org/media/Least%20Authority%20-%20Matrix%20vodozemac%20Final%20Audit%20Report.pdf).  
* Nevertheless, truncated 64-bit message authentication tags remain a common trade-off in deployed messaging systems and we do not consider this a practically exploitable vulnerability. For example, Signal also [uses 64-bit message authentication tags](https://github.com/signalapp/libsignal/blob/12d487ffb94c9542c005082efd92b7a0926b9f5d/rust/protocol/src/protocol.rs#L74).  
* The "Miscellaneous Issues" are a mix of UX mechanisms being misinterpreted as cryptographic checks (e.g. the CheckCode) and observations without demonstrated security impact.  
* In summary, we believe the post does not describe any practically exploitable vulnerabilities.

The central claim of the blog post is that an attacker can read Matrix users' conversations. That claim requires an attacker to cause two honest clients to derive the same predictable session key. The post does not demonstrate a path to achieve this under Matrix's authenticated key distribution model.

## Issue analysis

### Olm Diffie-Hellman Accepts the Identity Element

The claim in the title is accurate and not disputed (with some imprecision in terminology: the all-zero Montgomery `u` encoding does not represent the curve's identity element). vodozemac's X25519 Diffie-Hellman method does not currently reject computations involving the all-zero input nor indeed any of the small-order subgroup elements, neither via direct validation of the input points nor via the rejection of the all-zero Diffie-Hellman output.

What we dispute is the later impact claim, that this leads to a complete loss of Olm and Matrix room confidentiality. That conclusion does not follow under Matrix's authenticated key distribution model.

The core claim is that an attacker can cause both parties to derive a predictable session key by introducing a low-order public key input into the 3DH computation.

In Olm's 3DH, the session key is derived from three Diffie-Hellman outputs:

* `DH(ia, EB)`
* `DH(ea, IB)`
* `DH(ea, EB)`

where `ia`/`IB` are long-term identity keys and `ea`/`EB` are pre-keys. Lowercase denotes private keys; uppercase denotes public keys.

For an attacker Mallory to force a predictable session key known to her, she must cause both Alice and Bob to derive identical, attacker-controlled outputs for all three DH computations.

In Matrix, the identity key and pre-keys are authenticated via signatures from the device's long-term Ed25519 identity key. Clients verify these signatures before establishing a session. Therefore, a network attacker cannot substitute low-order public keys for those inputs.

Consequently, under Matrix's authenticated key distribution model, the described behavior does not yield a confidentiality break between two honest clients.

That said, in our brief correspondence with the reporter, after outlining our position and asking for clarification or a sketch of an actual attack, we agreed to add the check as a defence-in-depth and to preempt future doubt about whether this is a vulnerability. We also noted the possibility of vodozemac being used outside the context of Matrix, acknowledging this should at the very least be documented. We did not receive further technical clarification before publication.

The post argues that references to RFC 7748 and Trevor Perrin are misplaced because they concern the Diffie-Hellman primitive rather than protocols. We disagree with this reading. RFC 7748 makes the all-zero output check optional at the primitive level and explicitly notes that protocol designers must consider whether contributory behavior is required. Perrin's discussion similarly distinguishes between "safe" and "unsafe" DH protocols, defining safe protocols as those that authenticate peer keys before use. Notably, even Signal [only recently](https://github.com/signalapp/libsignal/commit/dce9c0d30a833448b605eda987844a5834b309c3) added an explicit all-zero X25519 output check, about a week prior to this post.

Matrix's Olm handshake authenticates identity keys and pre-keys via device signatures prior to session establishment. In that context, contributory behavior is not relied upon for protection against active network attackers.

### Downgrade Attacks From V2 to V1

[Olm V1](https://spec.matrix.org/v1.17/olm-megolm/olm/#version-1) is the only currently specified Olm version. The Olm V2 implementation in vodozemac is an experimental implementation of an anticipated future version that has not yet been specified. Given that there is only one standardised version, downgrades are not a current concern and we have not attempted to guard against them. Version negotiation and downgrade resistance become relevant once multiple versions are specified and deployed.

### ECIES CheckCode Has Only 100 Possible Values

The claims in this section stem from a misunderstanding of the purpose of the check code, which is purely a UX feature, not a cryptographic check.

Since the security of QR code login relies on the user correctly confirming on their secondary device that their primary device is signalling success, we thought it would be unwise to simply ask the user about this in yes/no form. Such a design would carry too large of a risk that the user will simply click through without understanding what is asked.

The check code serves as an action requiring higher engagement from the user, slowing them down and forcing them to replicate what they see. The actual information being transferred is only a single bit: success or failure. The slight bias in the digits is therefore irrelevant.

### Message Keys Silently Dropped After `MAX_MESSAGE_BYTES`

> Vodozemac hard-codes a constant, `MAX_MESSAGE_BYTES` to equal 40. After more than 40 skipped messaged keys are buffered, any additional keys are silently discarded, making corresponding messages permanently undecryptable.

The constant referred to in the post as `MAX_MESSAGE_BYTES` is in fact `MAX_MESSAGE_KEYS`. This number controls the largest difference in message indices that can be successfully received out-of-order within a given receiving chain. So for example, if one side sends 50 messages in a row, before receiving any message from the other side, and these messages arrive significantly out of order, such that message 49 arrives first, then we will fail to decrypt message 2, but will still be able to decrypt message 50. The number was chosen empirically, based on typical network conditions. This is not a significant source of undecryptable messages.

Similarly, `MAX_MESSAGE_GAP = 2000` is a hard limit on the message index jump that we will even attempt to decrypt, and again chosen empirically. For example, if we receive message 1 and then message 2100, we will refuse to decrypt it since it is deemed to be too large of a jump at once.

### Pickle Format Uses Deterministic IV

As noted by the reporter, this is merely a sharp edge in the API to support legacy pickles and has no security impact. Client applications only ever use this key to encrypt a single pickle and never reuse it.

### `#[cfg(fuzzing)]` Bypasses MAC and Signature Verification

This has already been retracted by the reporter.

### Strict Ed25519 Verification is Disabled By Default

This is a trade-off between compatibility and additional protection from signature malleability, which in our usage does not lead to a practical exploit scenario. The reason it's a compatibility trade-off is that RFC 8032, the EdDSA RFC, specifies a looser validation than `ed25519-dalek`'s `strict-signatures`. See point 3 in [https://datatracker.ietf.org/doc/html/rfc8032\#section-5.1.7](https://datatracker.ietf.org/doc/html/rfc8032#section-5.1.7).

The reporter did not report this finding in his latest report, but when he did in 2024, we asked what attack scenario he had in mind. In [his own words](https://soatok.blog/2024/08/14/security-issues-in-matrixs-olm-library/#vuln-ed25519&:~:text=no-impact%20finding)

> This is almost certainly a no-impact finding (or low-impact at worst), but still an annoying one to see in 2024\.

If any new information to the contrary has come to light, we are open to reevaluating this.

## On the timeline

In his timeline, the reporter notes:

> 2026-02-17: I respond to Matrix.org with an additional PoC, a patch, and express disagreement with their reasoning

We did not receive the referenced additional response prior to publication of the reporter's blog post. Our response was sent at 22:19 UTC while the blog post was published no later than 23:47 UTC.

## Closing words

In summary, Matrix's threat model relies on authenticated key distribution: identity keys and pre-keys are signed by device keys and verified prior to session establishment. This prevents a network adversary from substituting non-contributory public keys to force a predictable shared secret between honest clients. The absence of an all-zero check does not compromise this.

It's worth saying that in our private correspondence with the reporter we agreed to add the check as a defence-in-depth and to remove any doubt of whether this constitutes a vulnerability. The check will be added in a future vodozemac release.

We regret that the public post was published without engaging on the technical questions we raised. Coordinated disclosure works best when both parties explore exploitability in good faith.

## Reply to the reporter

Attached below is our verbatim response to the reporter, which was sent shortly before the publication of their blog post:

> Hi Soatok,
> 
> We've now completed our assessment of your report. Taking each issue in turn:
> 
> 1. Olm mishandles the identity element
> 
> Your PoC correctly demonstrates that the Olm 3DH implementation in vodozemac does not currently perform the all-zero DH output check. As we're sure you're aware, the check for contributory behaviour in X25519 is a contentious topic among cryptographers, with some calling for it, but others like RFC 7748[1](https://www.rfc-editor.org/rfc/rfc7748) calling it optional or even arguing against it (e.g. Trevor Perrin[2](https://moderncrypto.org/mail-archive/curves/2017/000896.html)). We've previously considered adding it but ultimately avoided it due to the conclusion that there's no practical security impact on Matrix. In other places like SAS/ECIES we explicitly reject non-contributory outputs because those handshakes can be used in unauthenticated contexts where an all-zero DH output *could* directly collapse channel security.
> 
> To sketch out an argument, it's helpful to consider two possible cases of where it might matter. One, an active attacker, Mallory, trying to manipulate a handshake between two honest parties Alice and Bob. Two, a dishonest participant, Malice, taking the place of Bob.
> 
> In the first case, the handshake is protected from Mallory on the Matrix level, by the fact that Matrix requires all key inputs used in the Olm 3DH handshake (except for the "base key") be signed by the long-term Ed25519 identity keys of the participants. Inbound session establishment is only accepted when the sender identity key matches a signature-verified device key for the claimed sender, and outbound uses signature-verified key bundles.
> 
> Thus, a third party like Mallory cannot replace any of the bundle keys (the X25519 identity key or the signed pre-key, be it an OTK or the fallback key). The only key that can be replaced is the base key Ea (i.e. Alice's ephemeral "base" key, assuming Alice is the one opening a channel with Bob) which, if replaced with a small order subgroup element, would result in an all-zero DH(Ib, Ea) output on Bob's side. But even then, the attacker cannot influence the corresponding term on Alice's side, so Alice and Bob would still derive different shared secrets and therefore the session would not be viable.
> 
> The second case is outside our threat model, given that Malice doesn't gain any additional advantage from using this attack compared to the things she can already do by virtue of being one of the conversation endpoints.
> 
> We believe this covers all threat scenarios relevant for Matrix. If our reasoning is flawed and you see a practical attack, can you please sketch it out?
> 
> That said, given that vodozemac could potentially be used outside the context of Matrix, we will consider adding the all-zero DH output rejection check in the 3DH path as a defence-in-depth. As a nice side effect, this stops further confusion on whether this is an issue and makes X25519 handling consistent across the entire crate. At the very least, the behaviour should be documented so the user can make an informed decision.
> 
> 2, 3, and 4\. Olm v1 vs v2
> 
> Olm v1 is the version of the protocol currently standardised by the Matrix specification. Olm v2 is a planned future upgrade that hasn't yet gone through the specification process. The implementation in vodozemac is there so that we are ready for when it does.
> 
> That there is no configuration knob for controlling the required version via policy is a fair observation. We are already aware of this and are planning to add such a mechanism once Olm v2 is specced and deployed. Given this, vodozemac defaulting on v1 is intentional.
> 
> Regarding specifically the pickle downgrade attack, there is no version of vodozemac that supports v2 sessions that also omits the config field from the `SessionPickle`, so a v2 session pickle without a config field cannot arise in an honest setting. It could be constructed maliciously, but what would the attacker gain from this? Once a future version of vodozemac supports policy-enforced minimal session versions, we will consider dropping support for old pickles without a config field and may start rejecting them.
> 
> ---
> 
> In terms of timelines, we follow coordinated disclosure because fixes in the Matrix ecosystem often require changes across multiple implementations and release cycles. We disagree with the characterisation that the response time for your last report was "squandered". In general, we ask reporters to follow our Security Disclosure Policy.
> 
> That said, based on our current assessment, we do not believe the issues described have a practical security impact for Matrix deployments. We are therefore not requesting an extension and we do not object to publication on 2026-02-18.
> 
> However, if you believe your report does result in a concrete high-severity attack on Matrix, please share a brief attack sketch (attacker capabilities, prerequisites, and expected impact). If that changes the severity assessment, we will prioritize a fix and coordinate an ecosystem release accordingly.
> 
> Once again, we thank you for your continued research of the Matrix protocol and software stack.
> 
> Best regards,
> 
> Matrix.org Security Team
