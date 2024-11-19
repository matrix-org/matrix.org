<div>

![basic lock](assets/basic_lock.svg)

## End-to-end encryption

</div>

Matrix provides state-of-the-art end-to-end-encryption via the
[Olm](https://gitlab.matrix.org/matrix-org/olm/blob/master/docs/olm.md) and
[Megolm](https://gitlab.matrix.org/matrix-org/olm/blob/master/docs/megolm.md) cryptographic ratchets.
This ensures that only the intended recipients can ever decrypt your messages,
while warning if any unexpected devices are added to the conversation.

Matrix’s encryption is based on the [Double Ratchet Algorithm](https://signal.org/docs/specifications/doubleratchet/)
popularised by Signal,
but extended to support encryption to rooms containing thousands of devices.
Olm and Megolm are specified as an [open standard](https://gitlab.matrix.org/matrix-org/olm/blob/master/docs/) and
[implementations](https://gitlab.matrix.org/matrix-org/olm/) are released under the Apache license,
[independently audited by NCC Group](/blog/2016/11/21/matrixs-olm-end-to-end-encryption-security-assessment-released-and-implemented-cross-platform-on-riot-at-last).
