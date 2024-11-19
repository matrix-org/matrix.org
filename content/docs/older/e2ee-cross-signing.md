+++
title = "Implementing more advanced e2ee features, such as cross-signing"
extra.author = "Sorunome"
aliases = ["/docs/guides/implementing-more-advanced-e-2-ee-features-such-as-cross-signing"]
+++

PLEASE NOTE THAT THIS GUIDE IS STILL A WIP!

So, you successfully implemented end-to-end encryption in your matrix client? Congratulations! This
is a real step to be proud of and reason to celebrate!

You might have noticed, however, that some things are still on the rough edge: You have to manually
verify every other device by comparing the public keys, decryption keys aren't shared between your
devices, etc. In comparison, Element has cross-signing so that you have to only verify people in a user-
friendly way, and it has things like online key backup. If you want to implement these features into
your own client (or only some of them), then this guide is for you!

This guide will be using libolm. Of course, the general ideas etc. and process flows behind it will
be the same, no matter if you use libolm or not. So, if you use something else than libolm, simply
substitute those parts with whatever other libraries / algorithms you are using.

Here is a general road map of what is needed in order implement all of the following:

1. Emoji verification (SAS or Short Authentication Strings)
2. Display verification status based on cross signing status
3. SSSS (Secure Secret Storage and Sharing)
4. Signing of other keys
5. In-room verification (Verification through messages in a room)
6. Miscellaneous cross-signing things
7. Bootstrapping SSSS and cross-signing
8. Online key backup

Wow, that's a lot of steps... but don't worry, we'll tackle them one at a time. Each step (apart
from perhaps #3) will greatly improve the user experience, so that should be a lot of motivation
to keep going!

As a general warning, at the point of writing this guide (May, June 2020) not everything discussed
here is in the spec yet, and some of the information can only be found scattered across multiple MSCs
and reading through the source code of [matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk).

## 1. Implement emoji verification (SAS)

Emoji verification is part of a verification model called SAS, for Short Authentication String. In
addition to emoji verification, there is also numerical verification. It is expected that all clients
that support SAS support *at least* numerical verification. This is to ensure that clients that may
not be able to display emoji (perhaps some CLI application or embedded device display) can still be
verified. Fortunately, the way these verification methods work is almost identical.

Unfortunately, due to legacy reasons, there are multiple ways you can receive a verification request
for SAS. However, all of the cryptographically methods are already a part of libolm, so if you already
use libolm bindings, it will be a breeze to implement!

There are two ways to verify other devices (and, by extension, other people): One way is via to_device
messages, and the other is via messages in rooms. Verification via to_device messages is typically
done to verify *devices*, while verification via messages in a room is typically done to verify
*people*. While in-room verification will be added in this guide only later on, it is a good idea to
think about how to structure your code to already support this from the start.

### A general look at the verification process

Verification works via two devices sending each other messages, either via to_device messaging or through
messages in a room. A device (Alice) that wants to verify another device (Bob) sends a `m.key.verification.request`
message along with the methods it supports. Bob
answers with a `m.key.verification.ready`, also informing Alice of which methods it support. In the
client UI, Bob would get a new verification request popup after receiving a `m.key.verification.request`
message. After both have accepted to start, either party (Alice and/or Bob) can send a `m.key.verification.start`,
which is specific to the verification method used. In the case that both Alice and Bob send a
`m.key.verification.start` and the verification method does *not* match, the verification request is
canceled. If the verification matches, the `m.key.verification.start` of the lexicographically smaller
user ID is used. If those also match up (as in, if you are verifying your own device), then the
lexicographically smaller device ID is used. This ensures that it is unambiguous which `m.key.verification.start`
is used. From now on, the device whose `m.key.verification.start` is used is the one who started the
request (This is important as some things in SAS depend on who started the request). After that, some
verification process happens, which is specific the specified verification method. If all is successful,
both send a `m.key.verification.done` to each other.

To make all this work, each verification request has a unique transaction ID, which is an
opaque string used to identify the specific verification request. In case of room verification, this
is the event ID of the first sent message (`m.key.verification.request`). A verification request can
be canceled at any time by either party by sending an `m.key.verification.cancel`, along with some
information on the reason for cancellation.

As all messages sent get some common metadata added, it might be a good idea to write a `send` wrapper
function to send key verification data. This function could also handle sending events as either to_device
messages or as room events. The contents of the message differ slightly between to_device and for
room verification:

For to_device messages, the `transaction_id` and `from_device` is simply added to the object sent.
`transaction_id` denotes the unique ID of the transaction, whereas `from_device` is simply a string
containing your own device ID. A payload such as

```json
{
  "foo": "bar"
}
```

would thus look like:

```json
{
  "foo": "bar",
  "transaction_id": "some-awesome-id",
  "from_device": "DXKKF"
}
```

For room messages, the transaction ID, which is the event Id of the first event, is added in the
`m.relates_to` section of the event. The device ID is the same as to_device massages; it should be
set to the ID of the sending device. So the above payload becomes:

```json
{
  "foo": "bar",
  "from_device": "DXKKF",
  "m.relates_to": {
    "rel_type": "m.reference",
    "event_id": "$firstEventId"
  }
}
```

For simplicity, all payloads mentioned below will be shown without those extra keys.

The to_devices sent don't have to be encrypted, as the entire idea of verification requests is that
they could be out in the open. The client may, however, chose to do so anyways, if e.g. their function
for sending to_device messages defaults to sending them encrypted. Whether room messages are encrypted
typically depends on whether the room they are sent in is encrypted or not.

#### `m.key.verification.request`

Sending this starts a verification request. It sends all the verification methods you know (in the
case of SAS that is only `m.sas.v1`), along with the current timestamp in milliseconds.

```json
{
  "methods": ["m.sas.v1"],
  "timestamp": 1590314157821
}
```

A receiving client is expected to reject the request if it is more than 10 minutes in the past or more
than 5 minutes in the future.

#### `m.key.verification.ready`

Sending this indicates that you accept the key verification request and additionally reveals which
methods you support yourself. That way both verification partners will be able to figure out which
methods they have in common.

```json
{
  "methods": ["m.sas.v1"],
}
```

#### `m.key.verification.start`

Sending this indicates that you are starting verification with a specific method. The exact payload
is dependent on the verification method.

```json
{
  "method": "m.sas.v1",
  // additional keys specific to m.sas.v1
}
```

#### `m.key.verification.done`

Sending this indicates that the verification process is *fully* done.

```json
{}
```

#### `m.key.verification.cancel`

Sending this cancels the verification (timeout, key mismatch, user cancellation, etc.). It has a
human-readable reason, along with a cancellation code.

```json
{
  "reason": "The verification timed out",
  "code": "m.timeout"
}
```

A list of all cancellation codes and their use can be found in
[the Client-Server Spec](https://matrix.org/docs/spec/client_server/latest#m-key-verification-cancel).

#### Recap

To recap, the *general* verification process of Alice wanting to verify Bob works as follows:

1. Alice sends Bob an `m.key.verification.request` along with the methods she supports.
2. Bob receives that request. His device asks him if he wants to verify with Alice. He hits accept.
3. Bob sends an `m.key.verification.ready` along with the methods he supports.
4. Alice receives Bob's methods, and based on that and her own, she sends
   an `m.key.verification.start` for a method that they have in common.
5. Bob also sends an `m.key.verification.start`, which happens to be the same method as alices
6. As Alices user ID is lexicographically smaller (`@alice:example.org` vs `@bob:example.org`), the
     start command sent by Alice is used.
7. The specific verification method follows here.
8. When Alice and Bob are fully done with verification, they send each other an `m.key.verification.done`.

### Taking a look at SAS

Okay, now that we took a look at how the verification process framework works in general, lets take a
look at SAS specifically.

For legacy reasons there are unfortunately clients that directly want to start SAS verification with
`m.key.verification.start`, so that will need to be handled. If such a start request comes in, and
it is SAS, prompt the user if they want to accept the verification or not. Then simply continue with
the SAS flow as normal.

The general idea of SAS verification is that both parties wanting to verify each other, Alice and Bob,
generate an ephemeral public/private keypair and exchange the public keys. Using
[Elliptic-curve Diffie-Hellman](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman) (ECDH)
they both generate the same key, provided that there was no man in the middle. This generated
key is then compared, using either emoji or numbers. After it is verified that they both match up on
either side, it is then known that the output of ECDH is the same. Thus the ephemeral public keys for
ECDH sent to each other got successfully verified. With these keys, a secure channel can be formed,
where the actual device keys that want to verify to each other are sent over. Upon receipt, the
verification process is complete!

In practice, this works as follows: Alice sends Bob a `m.key.verification.start` along with a bunch
of different parameters she supports (hash method, emoji/number verification, which specific ECDH to
use, etc.) and Bob will reply with a `m.key.verification.accept`, which will, based on the capabilities
Alice advertised and based on what Bob knows he can do himself, determine which exact method to use.
Afterwards, they both generate and send to each other the ephemeral public keys for ECDH, and the
emojis or numbers are displayed on screen. Once they both verified that they match using some secure
third-party channel like meeting up in person, they will send each other a `m.key.verification.mac`,
containing a MAC of the keys they should verify. After verifying them, they both send each other a
`m.key.verification.done` and they are verified!

SAS introduces a few more cancellation codes, specific to SAS verification,
[as seen in the client-server spec](https://matrix.org/docs/spec/client_server/latest#verification-messages-specific-to-sas).

<!-- markdownlint-disable-next-line no-duplicate-heading -->
#### `m.key.verification.start`

This sends a bunch of parameters that the sending device supports. Please note that you will have to
remember this object while performing a commitment check (explained in the next section), of the one
that *includes* the metadata of `transaction_id` and `from_device` keys, omitted in these examples.

```json
{
  "method": "m.sas.v1",
  "key_agreement_protocols": ["curve25519-hkdf-sha256"],
  "hashes": ["sha256"],
  "message_authentication_codes": ["hkdf-hmac-sha256"],
  "short_authentication_string": ["emoji", "decimal"]
}
```

#### Commitment generation

A commitment is an additional verification process. It is the hash (based on the hash method
specified) of the concatenated ephemeral public key you generate and the canonical json of the
`m.key.verification.start` body. Libolm provides both the hashing method and the public/private key
generation. Code for calculating the commitment could look as follows:

```dart
var sas = olm.SAS(); // save for later. This will generate our ephemeral public/private keypair
var canonicalJson = ""; // the canonical json of the `m.key.verification.start` request

var commitment = "";
if (hashMethod == "sha256") {
  var olmutil = olm.Utility();
  commitment = olmutil.sha256(sas.get_pubkey() + canonicalJson);
  olmutil.free();
} else {
  throw "Unknown hash method";
}
```

#### `m.key.verification.accept`

This accepts the `m.key.verification.start` request, and sends the parameters that both parties support.
Along with that, it also sends a `commitment`, as defined above.

```json
{
  "method": "m.sas.v1",
  "key_agreement_protocol": "curve25519-hkdf-sha256",
  "hash": "sha256",
  "message_authentication_code": "hkdf-hmac-sha256",
  "short_authentication_string": ["emoji", "decimal"],
  "commitment": "the-commitment-calculated"
}
```

#### `m.key.verification.key`

This sends the ephemeral *public* key to each other. If you haven't generated it yet (due to not having
calculated the commitment), do so now with `var sas = olm.SAS();` and read it with `sas.get_pubkey();`.
Be sure that if you received the commitment, you use the received public key to verify the commitment
you received earlier. The public key is both added to the `sas` object with `sas.set_their_key(payload["key"]);`
and also saved in a separate variable, as you'll need it later, as unfortunately the `sas` object does
not allow for it to be retrieved again.

```json
{
  "key": "your-public-key"
}
```

#### Display Emojis / Numbers

Based on the agreed upon `key_agreement_protocol` and which `short_authentication_string`s are supported,
the user should now be prompted with the emojis/numbers, so that they can verify that they match. For
that, you will have to generate bytes to derive the emojis from for comparison. For that, a "SAS info"
is created. For the key agreement protocol `curve25519-hkdf-sha256` it works as follows:

The SAS info is `MATRIX_KEY_VERIFICATION_SAS|` concatenated with the user ID of whomever started the
verification plus `|` plus the device ID who started the verification plus `|` plus the SAS public key
who started the verification plus `|` plus the user ID who received the verification plus `|` plus
the device ID who received the verification plus `|` plus the SAS public key of who received the verification
plus `|` plus the transaction ID. In code that could look as follows:

```dart
var ourInfo = '${client.userID}|${client.deviceID}|${sas.get_pubkey()}|';
var theirInfo = '${request.userId}|${request.deviceId}|${theirPublicKey}|';
var sasInfo = 'MATRIX_KEY_VERIFICATION_SAS|' +
    (request.startedVerification
        ? ourInfo + theirInfo
        : theirInfo + ourInfo) +
    request.transactionId;
```

The key agreement protocol `curve25519` is deprecated and should not be implemented. As such, it isn't
outlined here.

##### Generate bytes

Once you have that SAS info, you use it to generate bytes through `sas.generate_bytes(sasInfo, bytes)`.
For emoji verification, 6 bytes are needed, for number verification 5 are needed. You could, however,
always generate 6 bytes and, for number verification, only use the first 5.

If both parties said they can display emoji, display those! If one party only supports numbers, then
display numbers. It might be a good idea to have a button to switch back and forth between emoji and
numbers, just in case.

##### Numbers

To get the numbers you compare, you need to generate 5 bytes using the above method. Split these into
three chunks of 13 bits each, discarding the last bit. Then add 1000 to each number, meaning they can
be in the range of 1000 to 9191. It is expected to to display the numbers with some separator in between,
e.g. `1337-4242-9001`.

##### Emoji

To get the emoji to compare, you need to generate 6 bytes using the method above. Split these into 7
chunks of 6 bits each, discarding the last 6 bits. Then use the appropriate table
[in the client-server spec](https://matrix.org/docs/spec/client_server/latest#sas-method-emoji) to
display the emoji, along with their name.

#### Emojis / Numbers match: Calculating the MAC

Once the user says that their emojis / numbers match, that means that they have a secure channel! A
MAC is then calculated out of the device IDs and the public keys you want the other party to verify.
For now, only send your own public key using that method. Later on in this guide, you will also send your
master cross-signing key. For that, a base information is created, which is the concatenated string of
`MATRIX_KEY_VERIFICATION_MAC`, your own user ID, your own device ID, the other user's ID, the other
device's ID, and the transaction ID. Note how, unlike SAS, no `|` delimiter is used and the order
does *not* depend on who started the verification:

```dart
var baseInfo = 'MATRIX_KEY_VERIFICATION_MAC' +
    client.userID +
    client.deviceID +
    request.userId +
    request.deviceId +
    request.transactionId;
```

Next calculate the MAC of your device IDs and the fingerprints that you want to send:

<!-- markdownlint-disable line-length -->
```dart
String _calculateMac(String input, String info) {
  if (messageAuthenticationCode == "hkdf-hmac-sha256") { // this is from the m.key.verification.accept call
    return sas.calculate_mac(input, info); // the same sas object we used previously, from libolm
  } else {
    throw "Unknown message authentication code";
  }
}

Map<String, String> mac = {}; // create the map for the MACs
List<String> keyList = []; // the list / array holding all the key Ids to verify

// now add all the keys we want to verify
var deviceKeyId = "ed25519:${client.deviceID}";
mac[deviceKeyId] = _calculateMac(client.fingerprintKey, baseInfo + deviceKeyId); // client.fingerprintKey is here the public key string for our device
keyList.add(deviceKeyId);

// now we still need to sort the key list
keyList.sort();
var keys = _calculateMac(keyList.join(","), baseInfo + "KEY_IDS");

// send off the stuff!
```
<!-- markdownlint-enable line-length -->

#### `m.key.verification.mac`

Sends the MAC of the keys to verify off to the other party.

```json
{
  "mac": { // is the "mac" object calculated above
    "ed25519:CCKDF": "<calculated MAC here>"
  },
  "keys": "<MAC for keys here>" // is the calculated "keys" string above
}
```

#### Receiving / verifying the MAC

After receiving the MAC and having the user verify that the emoji match (and thus also sending
your own MAC), you have to verify that the received MACs are valid, and only verify the keys if the
MACs are valid. For that, generate the base info from the perspective of the other party; essentially
placing other person's information before your own:

```dart
final baseInfo = 'MATRIX_KEY_VERIFICATION_MAC' +
    request.userId +
    request.deviceId +
    client.userID +
    client.deviceID +
    request.transactionId;
```

Then generate the key list out of the dictionary keys of the `mac` object received and verify that
the MAC matches up:

```dart
final keyList = payload["mac"].keys.toList();
keyList.sort();
if (payload["keys"] != _calculateMac(keyList.join(","), baseInfo + "KEY_IDS")) {
  await request.cancel("m.key_mismatch");
  return;
}
```

Then verify the MACs of the keys themselves by iterating over the objects, and calculating the MACs
of the keys again as above. You should have the public key yourself already, as you are just verifying
if the key matches. If you received the MAC of a key you don't know, just ignore it. It is likely to
be a cross-signing key that you don't know how to handle yet. If only *one* of the MACs mismatch,
however, don't verify *any* devices and cancel the entire request.

Finally send a `m.key.verification.done`, and you are done!

<!-- markdownlint-disable-next-line no-duplicate-heading -->
#### Recap

So, the entire SAS verification flow in short is as follows:

1. (Optional) Alice sends Bob a `m.key.verification.request` along with the methods she supports, including
   `m.sas.v1`.
2. (Optional) Bob receives that request. His device asks him if he wants to verify with Alice. He hits accept.
3. (Optional) Bob sends a `m.key.verification.ready` along with the methods he supports, including `m.sas.v1`.
4. Alice receives Bob's methods, and based on that, and the ones she knows how to do herself, she sends
   a `m.key.verification.start` for `m.sas.v1`. This will contain a bunch of parameters for how the
   SAS will specifically work. Alice's device notes down the canonical json of the request for later
   commitment verification.
5. Bob could also send an `m.key.verification.start` for `m.sas.v1`. As Alice user ID is lexicographically
     smaller it is discarded, though.
6. Bob received the `m.key.verification.start`, and generates his own ephemeral keypair with `var sas = olm.SAS();`. He then
   calculates the commitment using the canonical json of the `m.key.verification.start` request, before sending a
   `m.key.verification.accept` back to Alice, along with specific parameters to use for this SAS
   verificaton.
7. Alice receives the `m.key.verification.accept` and stores the commitment to verify it later. She now creates her own
   ephemeral key pair with `var sas = olm.SAS();` and sends Bob the public key, via `m.key.verification.key`.
8. Bob receives the public key from Alice and sends his own public key. Bob's device displays
   the emoji / numbers for verification now.
9. Alice receives Bob's public key, and can finally verify the commitment she saved earlier. If all
   matches, Alice's device will now display the emoji / numbers for verification.
10. If the emoji / numbers both match up, they will send each other an `m.key.verification.mac` with
   the MAC'd information of the keys that should be verified.
11. Finally, if all checks out, they send each other a `m.key.verification.done` and
    the verification process is concluded.

### Things to look out for

1. *Always* verify that an incoming message has a valid, known transaction ID.
2. *Always* verify that an incoming message is no more than 10 minutes in the past.
3. *Always* stop the verification process as soon as you receive a `m.key.verification.cancel`, be
   it for whatever reason.
4. *Don't* just blindly assume that methods, `message_authentication_code`, etc. are as outlined here.
   More might be added in the future (e.g. to fix a discovered security flaw), as such *always* verify
   which ones you actually support and act accordingly.
5. Don't forget to `sas.free();` your generated SAS object all at the end of verification or when timing
   out or when it is being canceled.
6. Don't forget to calculate *and verify* the commitment!
7. It might be a good idea to generalize the code handling the verification flow so that you can easily
   add other methods than `m.sas.v1` later on.

## 2. Display verification status based on signatures

Don't worry, after having implemented SAS this should be a breeze, it's way simpler and way less of a
hassle to implement!

### General ideas of Cross-Signing

The general idea of cross-signing is that instead of every device having to verify every other device,
people will only have to verify other people, and you will have to verify each of your own new sessions
(logins) only once. For this, each *user* has three keys: A master key, a self-signing key and a
user-signing key. The master key will sign both the self-signing and the user-signing key. The
self-signing key will then sign your own device keys, and the user-signing key will sign other people's
master keys. The purpose of splitting this up into three keys is that in the case of either the
self-signing key or the user-signing key getting compromised, you can easily exchange them, while
still keeping the master key. As the master key is *only* used for signing your *own* user-signing and
self-signing key, it is rarely used, so the attack surface to obtain it is minimal. Optionally, device
keys themselves can sign their own master key.

<!-- markdownlint-disable-next-line no-alt-text -->
![](/docs/guides/img/matrix-cross-signing-key-diagram.svg)
Graph from [jcgruenhage's blog](https://jcg.re/blog/quick-overview-matrix-cross-signing/), licensed as [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/).

So, in addition to the device keys of others, we also need to fetch their cross-signing
keys. We can then verify their signatures!

### Cross-Signing keys

In addition to device keys, cross-signing keys are introduced. Instead of being identified by a
key ID, they are identified via their public key. In order to prevent collisions, homeservers
*must* make sure that no user has a key ID that is the same as a cross-signing key's public key. That
is handy, as it means that as clients, we don't have to care about that part!

### Keeping track of cross-signing keys

Keeping track of cross-signing keys should be simple if you already do so for device keys. When a
user is flagged as out-of-date, you should already query their keys again with `POST /_matrix/client/r0/keys/query`
and update your `device_keys` dictionary accordingly, just as before. This endpoint should now also
return the `master_keys`, `self_signing_keys` and `user_signing_keys` of a user, given they are using
cross-signing. Simply update and store this information locally as well. The format of these are
pretty similar to the `device_keys` dictionary:

```json
{
  "self_signing_keys": {
    "@bob:example.org": {
      "user_id": "@bob:example.org",
      "usage": ["self_signing"],
      "keys": {
        "ed25519:base64+self+signing+public+key": "base64+self+signing+public+key"
      },
      "signatures": {
        "@bob:example.org": {
          "ed25519:base64+master+public+key": "signature+of+self+signing+key"
        }
      }
    }
  }
}
```

In this example we have Bob's self-signing key which has a signature of Bob's master key. The `usage`
array additionally indicates the usage of the key, which is `master`, `self_signing` or `user_signing`.
While for cross-signing there should only be one item in `usage`, in the future some other keys might be added
that could have multiple uses. As such, an array is used here to future-proof things.

The `master_keys` and `user_signing_keys` sections look the same.

### Changes to key verification

Now, there is a slight change you need to perform to the key verification, specifically SAS, that we previously
implemented: In the `m.key.verification.mac` reply, there will be a dictionary of MACs to verify certain
keys. These don't only contain device keys, but also contain cross-signing keys, identified by
`ed25519:base64+master+public+key`, etc. Be sure to flag those cross-signing keys as verified, too.

### Getting the verification level based on cross-signing status

If you want to know if a device key is verified, just recursively check all of the *valid* signatures
of the keys, until you hit a key that is already verified! This means that given a signature chain as
follows (assuming you are Alice):

Alice' Master Key --> Alice' User-Signing Key --> Bob's Master Key --> Bob's Self-Signing Key --> Bob's Tablet

And you have previously (via e.g. emoji verification) verified Alice's (your own) master key, and want
to know if Bob's Tablet is verified, you propagate that chain backwards, provided all the signatures
are valid, until you hit your verified master Key.

### Verifying a signature

Libolm to the rescue! It has a method which makes verifying signatures easy! If you have key A and want
to verify the signature that key B added, you will have to do the following:

1. In the key A `signatures` dict, find the entry for key B and note down the signature.
2. Create the string for verification: take key A's complete dictionary, strip off of the `unsigned`
   and `signature` dictionaries and convert it into canonical json.
3. Use `olmutil.ed25519_verify(key_b_pub_key, canonical_json, signature);` to verify the signature:
   note that this will throw an error if invalid, and none if valid.
4. That's it, you have verified the signature!

### Check if a *user* is verified

To see if a user is verified, simply check if their master key is verified! You can find the master
key of a user by looking for a cross-signing key which has `master` within their `usage` array.

If a user is verified but all of their devices are not, it is a good idea to display a warning.

<!-- markdownlint-disable-next-line no-duplicate-heading -->
### Things to look out for

1. *Never* trust invalid signatures. Just treat them as if there was no signature at all.
2. Signature loops *will* exist. Add infinite recursion protection to your signature loop checking.
3. While signature checking doesn't seem to be expensive, it might be a good idea to cache the results
   in-memory while the program is running.
4. Be sure to query the keys for a user if you are told in the sync loop they need updating (if you
   implemented this correctly previously, nothing changes here).
5. Instead of recursing until you have found a valid key, you could also recurse until you find your own,
   verified master key. This in practice, however, does not allow easy migration between device-device verification and
   cross-signing verification. Recursing until you hit a verified device is thus preferred.

## 3. Implementing SSSS

SSSS is short for Secure Secret Storage and Sharing, which provides a method of storing secret data
on the server, without the server administrator or anyone else having access to that data. As such,
this is optimal for storing the private keys for cross-signing on the server so that all your devices
can use them later on to generate signatures, and thus verify other people.

Unfortunately there doesn't seem to be any help from libolm for implementing SSSS so this will
become rather cryptographic-y to implement. You will mainly need to find libraries for the following
functions:

1. AES-CTR encryption and decryption
2. SHA256 HMAC calculation
3. Base58 encoding and decoding
4. PBKDF2

As the "sharing" aspect is simpler to implement, here it will be implemented first. It can later on
also be easily used to debug & verify the functionality of the "secure secret storage" part. It is,
however, still crucial to look at the general structure of the SSSS first.

TODO: This section doesn't list yet how to *create* keys, add this later on.

### General Structure of SSSS storage

SSSS depends on keys with which the actual secrets are being encrypted to be stored. These keys need
to be provided by the client. There is, however, metadata information on the keys in a users account_data.
For that, there are entries `m.secret_storage.key.<keyId>`, where the keyId is the unique ID of said
key. In addition, there is an `m.secret_storage.default_key` which denotes the default key to use.

The `m.secret_storage.<keyId>` objects contain a MAC and an IV to easily verify if you have the correct
key, and, in case if there is also a password associated with it, some information on how to generate
the key out of the password. More specific on that later.

Secrets, such as the private keys for cross-signing, can only be strings (not binary data) and are
stored encrypted in the account data of your account. For example, the `m.cross_signing.master` entry
in account data is the private key of your master cross-signing key. Each secret can be encrypted by
multiple SSS keys. Inside the `encrypted` object there is a mapping of key ID to the ciphertext, iv
and MAC of the secret. A content could look as following:

```json
{
  "encrypted": {
    "awesomeKeyId": {
      "iv": "supercooliv",
      "ciphertext": "secretciphertext",
      "mac": "macthingy"
    }
  }
}
```

### Caching of secrets

You have to access some secrets comparatively often. As fetching from the store requires to get a key
for said secret, that requires user interaction. As such, if a client can store a secret reasonably
securely client-sided, the client could cache some secrets locally. As this introduces an attack surface
of a third party manually reading out the clients cache, but also improves user experience to not have
to ask the user for their secret store passphrase, each client will have to decide which secrets to
cache and which not, based on what kind of security it can offer. For cross-signing the needed secrets
would be `m.cross_signing.self_signing`, `m.cross_signing.user_signing` and for online key backup that
would be `m.megolm_backup.v1`. Blindly caching all secrets is a security risk, as some secrets such
as `m.cross_signing.master` are highly sensitive and shouldn't be stored in plaintext on any disk, ever.

You should always keep a whitelist of what secrets to cache, never a blacklist, as in the future some
new highly-sensitive secret may be added.

As a secret might change in the future, it might be a good idea to store in the secret cache some more
information along with the secret - perhaps its ciphertext with key id? So that if either key id or
ciphertext changes, you know that you'll have to fetch the secret from the store again, and your cache
is out-of-date.

### Sharing

The same limitations of caching apply to sharing: It only makes sense to request secrets or share
secrets that are cacheable, as else potentially sensitive data is leaked, or it requires user interaction
to load those secrets in the first place anyways.

Secrets can only be requested from other devices of your account that you already have verified, be
it via cross-signing or directly. As such, it might be a good idea to request all cacheable secrets
after successfully completing verification with yourself, as far as that also verifies your own master
key (else the other client likely doesn't have cross signing and thus requesting secrets doesn't make
much sense). For that you would also want to add a short delay prior requesting secrets, just to be
sure that the other device has already finished processing the verification.

You request a secret by sending an `m.secret.request`, and you receive it back via an `m.secret.send`
to_device event. Please keep in mind that `m.secret.send` has to be encrypted! To do your part in the sharing
of secrets, you should also appropriately reply to a sharing request of another of your verified devices,
provided you have that secret cached.

#### `m.secret.request`

This requests a secret from another device, or cancels a pending request.

```json
{
  "action": "request", // or request_cancellation
  "name": "m.cross_signing.self_signing", // the name of the secret you are trying to receive
  "requesting_device_id": "<your own device id>",
  "request_id": "<unique string to identify this request>"
}
```

#### `m.secret.send`

This sends / shares a secret with another device

```json
{
  "request_id": "<same request id as received in m.secret.request>",
  "secret": "<contents of the secret>"
}
```

#### Asking for a secret

1. Only ask your own, verified devices for a secret. Be reasonably sure that they might have it (e.g.
   the other device sent you your master key to verify).
2. When receiving a secret, verify that it was encrypted
3. When receiving a secret, verify that it was from one of the devices you sent the request to (possible
   via `sender_key` of the encrypted to_device content).
4. Optionally, validate the secrets you received: In the case of the cross-signing and the online key
   backup secrets, calculate the public key out of the received private key and compare them with the
   advertised values.
5. Send a request cancellation to all other devices you sent the request to but haven't heard back from
   yet.

#### Sharing a secret

1. Make sure the request is coming from ourself
2. Make sure that that particular device is verified
3. Make sure we have the secret cached
4. Make sure the request hasn't been canceled yet
5. Make sure that the shared secret is verified

### Opening keys

To be able to access stored secrets, or store some yourself, you need to be able to access the SSSS
keys. This is done either by passphrase or by keyfile, afterwards the `m.secret_storage.key.<keyId>` is
used to verify the validity of the key.

#### Keyfile

The contents of the keyfile is just base58-encoded data. They consist of two prefix bytes, `0x8B` and
`0x01`. Additionally they contain a parity byte all at the end, which is all other bytes XOR'd onto
each other. The key itself is base58-encoded chunked into characters of four. As such, the key can
easily be decoded like the following:

```dart
Uint8List decodeRecoveryKey(String recoveryKey) {
  // don't forget to strip all spaces before base58 decoding!
  final result = base58.decode(recoveryKey.replaceAll(' ', ''));

  // check the parity byte
  var parity = 0;
  for (final b in result) {
    parity ^= b;
  }
  // as we xor'd ALL the bytes, including the parity byte, the result should be zero!
  if (parity != 0) {
    throw 'Incorrect parity';
  }

  // check if we have the correct header prefix
  var OLM_RECOVERY_KEY_PREFIX = [0x8B, 0x01];
  for (var i = 0; i < OLM_RECOVERY_KEY_PREFIX.length; i++) {
    if (result[i] != OLM_RECOVERY_KEY_PREFIX[i]) {
      throw 'Incorrect prefix';
    }
  }

  // verify that the length of the key is correct
  var OLM_PRIVATE_KEY_LENGTH = 32; // can also be fetched from olm somehow...
  if (result.length !=
      OLM_RECOVERY_KEY_PREFIX.length + OLM_PRIVATE_KEY_LENGTH + 1) {
    throw 'Incorrect length';
  }

  // and finally, strip the prefix and the parity byte to return the raw key
  return Uint8List.fromList(result.sublist(OLM_RECOVERY_KEY_PREFIX.length,
      OLM_RECOVERY_KEY_PREFIX.length + OLM_PRIVATE_KEY_LENGTH));
  }
}
```

#### Passphrase

The `passphrase` block of the key information in the account data specifies information on how to
generate the key off of the password. It an look as follows:

```json
"passphrase": {
  "algorithm": "m.pbkdf2", // currently only this one is supported
  "iterations": 500000,
  "salt": "<some-random-string>",
  "bits": 256 // optional, defaults to 256
}
```

Out of this information we need the iteration, the salt and the number of bits for PBKDF2. Simply use
these parameters with the hash algorithm SHA-512 to generate a key:

```dart
Uint8List keyFromPassphrase(String passphrase, _PassphraseInfo info) {
  if (info.algorithm != 'm.pbkdf2') {
    throw 'Unknown algorithm';
  }
  var generator = PBKDF2(hashAlgorithm: sha512);
  return Uint8List.fromList(generator.generateKey(passphrase, info.salt,
      info.iterations, info.bits != null ? info.bits / 8 : 32));
}
```

Important: Some PBKDF2 implementations take the length in bytes (like here), while others take
the length in bits. Divide by 8 appropriately, and only when needed.

#### Validating the generated key

To know if the right keyfile was supplied or if the user entered the right password, we need to verify
the resulting keys validity. For that, the other information of the keys object in account data is
relevant:

<!-- markdownlint-disable line-length -->
```json
{
  "algorithm": "m.secret_storage.v1.aes-hmac-sha2", // some old accounts might use a different algorithm, which is not covered in this guide
  "iv": "<base64 encoded iv>",
  "mac": "<bae64 encoded MAC>"
}
```
<!-- markdownlint-enable line-length -->

To verify the key, encrypt 32 bytes of 0 with a blank name and the IV of the key information. Compare
the resulting MACs with each other. Be sure to compare the *unpadded* Base64-encoded MACs, so strip
all the trailing `=`'s! The encryption itself will be outlined below.

```dart
bool checkKey(Uint8List key, AccountData keyData) {
  var info = keyData.content;
  if (info['algorithm'] == 'm.secret_storage.v1.aes-hmac-sha2') {
    if ((info['mac'] is String) && (info['iv'] is String)) {
      // ZERO_STR are 32 bytes of zero. We encrypt with our generated key, a blank name and the iv of the event
      var encrypted = encryptAes(ZERO_STR, key, '', info['iv']);
      // stripping all the trailing = of the MACs prior comparing
      return info['mac'].replaceAll(RegExp(r'=+$'), '') ==
          encrypted.mac.replaceAll(RegExp(r'=+$'), '');
    } else {
      // no real information about the key, assume it is valid
      return true;
    }
  } else {
    throw 'Unknown Algorithm';
  }
}
```

### Encrypting and decrypting

Both encrypting and decrypting is done with AES-CTR. Out of the secret key and the name of the secret
using [HKDF](https://en.wikipedia.org/wiki/HKDF) with SHA-256 both the actual AES key and the key for
the MAC integrity is generated. IVs are randomly generated 16 bytes, with bit 63 set to 0. In the
account data events of the secrets, the MAC, the IV and the ciphertext are all base64 encoded.

Note: AES-CTR is a stream cipher, not a block cipher. As such, the input data is *unpadded*. If your
library (incorrectly) does not properly handle that due to an invalid block, simply append prior
en/decryption 0's to your data to fill up the input to a full number of blocks. One block here is
typically 16 bytes in size. After en/decrypting, strip the extra bytes again. Please note that this
method will *not* work with block ciphers (e.g. XTS), it is something specific to stream ciphers, such
as CTR.

#### Deriving the keys using HKDF

As key deriving is needed for both encrypting and decrypting it makes sense to implement this first.
If you have a working HKDF implementation, you can use that. If not, you can implement it yourself.
HKDF is a series of specific HMAC-SHA256 MACs, as following:

```dart
_DerivedKeys deriveKeys(Uint8List key, String name) {
  var zerosalt = Uint8List(32); // generate 32 bytes of zero
  // hash the key with the zeros as secret
  var prk = Hmac(sha256, zerosalt).convert(key);

  var b = Uint8List(1); // generate one byte
  b[0] = 1; // and set it to one
  // use the previously resulted MAC as key, and hash the name, with the one-byte added to the end
  // the result is the aes key
  final aesKey = Hmac(sha256, prk.bytes).convert(utf8.encode(name) + b);

  b[0] = 2; // set the byte to 2
  // use the first computed MAC as a key, this time hashing the aes key plus the name plus the byte two
  // the result is the HMAC key
  var hmacKey = Hmac(sha256, prk.bytes).convert(aesKey.bytes + utf8.encode(name) + b);

  // this just returns the raw, derived aes and HMAC keys in an object
  return _DerivedKeys(aesKey: aesKey.bytes, hmacKey: hmacKey.bytes);
}
```

#### Decrypting

Now, to decrypt, you just create a MAC with the HMAC key of the raw ciphertext, and compare it with
the MAC stored in the account data secret. If it matches, you decrypt using AES-CTR. The name here
is the name of the secret we want to decrypt. The resulting code could look as follows:

```dart
String decryptAes(_Encrypted data, Uint8List key, String name) {
  // derive our keys using the before written function
  var keys = deriveKeys(key, name);

  // decode our ciphertext, as it is base64 encoded
  var cipher = base64.decode(data.ciphertext);

  // HMAC our cipher with the generated HMAC key, base64'ing it afterwards
  var hmac = base64.encode(Hmac(sha256, keys.hmacKey).convert(cipher).bytes);

  // compare the resulted MAC with with the one stored, unpadding both encoded values
  if (hmac.replaceAll(RegExp(r'=+$'), '') != data.mac.replaceAll(RegExp(r'=+$'), '')) {
    throw 'Bad MAC';
  }

  // decrypt the cipher with the generated aesKey, using AES-CTR and the supplied IV
  var decipher = AES(Key(keys.aesKey), mode: AESMode.ctr, padding: null)
      .decrypt(Encrypted(cipher), iv: IV(base64.decode(data.iv)));

  // and return the decrypted secret
  return String.fromCharCodes(decipher);
}
```

#### Encrypting

Encrypting is rather similar. If no IV is specified, you have to randomly generate 16 bytes and set
bit 63 to 0, as mentioned above. Again, we derive our AES and HMAC keys off of the supplied key and
the name. Then the ciphertext and the HMAC is computed, which is can be then stored later on. The name
here is the name of the secret we want to encrypt. The resulting code could look as follows:

```dart
_Encrypted encryptAes(String data, Uint8List key, String name, [String ivStr]) {
  Uint8List iv;
  if (ivStr != null) {
    // if we have an IV already, let's just use this
    iv = base64.decode(ivStr);
  } else {
    // if we don't have one, generate a random 16-byte IV
    iv = Uint8List.fromList(SecureRandom(16).bytes);
  }
  // And don't forget to set bit 63 of the IV to zero
  iv[8] &= 0x7f;

  // derive our AES and HMAC keys using the before written function
  var keys = deriveKeys(key, name);

  // get our plain string (utf8) into bytes
  var plain = Uint8List.fromList(utf8.encode(data));

  // encrypt our plain text, using unpadded AES-CTR, with our aesKey and our (possibly generated) IV
  var cipher = AES(Key(keys.aesKey), mode: AESMode.ctr, padding: null).encrypt(plain, iv: IV(iv)).bytes;

  // calculate the HMAC of the resulting cipher, using the hmacKey
  var hmac = Hmac(sha256, keys.hmacKey).convert(cipher);

  // base64 the iv, the cipher and the MAC, returning it all
  return _Encrypted(
    iv: base64.encode(iv),
    ciphertext: base64.encode(cipher),
    mac: base64.encode(hmac.bytes),
  );
}
```

#### Storing a secret

To store a secret, just encrypt it and save the outcome to the account data, using the format mentioned
above.

#### Debugging hints

Debugging can be hard. If you successfully encrypt and decrypt a secret using your methods, how do
you know that you followed through implementation correctly and didn't just e.g. derive the keys wrong?
To mitigate that, you could receive a secret (e.g. `m.cross_signing.self_signing`) via sharing from
another device, and then compare that received value with what is stored in SSSS. If your decryption
works properly, they should match up. If you *then* can successfully encrypt and decrypt something,
that means your encryption is working, too.

As using a keyfile is simpler in implementation than using password, you could also test with keyfile
first, and only after that is working fine, debug any errors you might have in deriving the key from
the password.

<!-- markdownlint-disable-next-line no-duplicate-heading -->
### Things to look out for

- *Only* cache a whitelisted set of secrets, that is `m.cross_signing.self_signing`,
   `m.cross_signing.user_signing` and `m.megolm_backup.v1`.
- When fetching a secret from the store that is cacheable - cache it!
- Only share secrets with own devices you trust.
- Only request secrets from own devices you trust.

## 4. Signing of other keys

At this point you already display the verification status of others based on cross signing and are
able to access your own private keys - either cached in some way, or you decrypt them from SSSS, or
you request them from other devices via SSSS as outlined above.

This means that now you have the ability to sign other peoples keys! This is an important step - that
way when you verify other people, you can also sign their master key, so that other of your own devices
will see all of their other devices verified.

### Which keys to sign

This step is rather simple: When successfully verifying either another of your own devices or another
person via interactive verification, you take all the devices you verify and (potentially) all the
devices you receive, be it device keys or cross signing keys, and sign them with one of your own keys:

1. If you receive your own master key, you sign it with your own device key
2. If you receive a device key of your own account, you sign it with your own self-signing key
3. If you receive another persons master key, you sign it with your own user-signing key

All other keys received, that is device keys of other people, are *not* signed.

### How to sign a key

To sign a key, you take the device key object, or the cross signing key object, remove the `unsigned`
and `signature` keys and sign the canonical json encoded object. Afterwards you upload them to the
server.

For example, you want to sign the following device key:

```json
{
  "user_id": "@alice:example.com",
  "device_id": "JLAFKJWSCS",
  "algorithms": [
    "m.olm.v1.curve25519-aes-sha2",
    "m.megolm.v1.aes-sha2"
  ],
  "keys": {
    "curve25519:JLAFKJWSCS":
        "3C5BFWi2Y8MaVvjM8M22DBmh24PmgR0nPvJOIArzgyI",
    "ed25519:JLAFKJWSCS":
        "lEuiRJBit0IG6nUf5pUzWTUEsRVVe/HJkoKuEww9ULI"
  },
  "signatures": {
    "@alice:example.com": {
      "ed25519:JLAFKJWSCS":
          "dSO80A01XiigH3uBiDVx/EjzaoycHcjq9lfQX0uWsqxl2giMIiSPR8a4d291W1ihKJL/a+myXS367WT6NAIcBA"
    }
  },
  "unsigned": {"device_display_name": "Alices mobile phone"}
}
```

Then you strip the `signatures` and `unsigned` keys:

```json
{
  "user_id": "@alice:example.com",
  "device_id": "JLAFKJWSCS",
  "algorithms": [
    "m.olm.v1.curve25519-aes-sha2",
    "m.megolm.v1.aes-sha2"
  ],
  "keys": {
    "curve25519:JLAFKJWSCS":
        "3C5BFWi2Y8MaVvjM8M22DBmh24PmgR0nPvJOIArzgyI",
    "ed25519:JLAFKJWSCS":
        "lEuiRJBit0IG6nUf5pUzWTUEsRVVe/HJkoKuEww9ULI"
  }
}
```

And then the canonical json you need to sign is:

```json
{"algorithms":["m.olm.v1.curve25519-aes-sha2","m.megolm.v1.aes-sha2"],"device_id":"JLAFKJWSCS","keys":{"curve25519:JLAFKJWSCS":"3C5BFWi2Y8MaVvjM8M22DBmh24PmgR0nPvJOIArzgyI","ed25519:JLAFKJWSCS":"lEuiRJBit0IG6nUf5pUzWTUEsRVVe/HJkoKuEww9ULI"},"user_id":"@alice:example.com"}
```

You can easily sign a key with libolm:

```dart
String sign(String canonicalJson, Uint8List key) {
  final keyObj = olm.PkSigning();
  try {
    keyObj.init_with_seed(key);
    return keyObj.sign(canonicalJson);
  } finally {
    keyObj.free();
  }
}
```

Keep in mind that the keys coming from SSSS are base64 encoded and olm needs a raw byte array, so you
will have to base64 decode that!

### Uploading signatures

After creating the signatures, you need to upload them! For that you bundle all the key objects with
only your *new* signatures together and POST them to `/_matrix/client/unstable/keys/signatures/upload`.
The payload is bundled by user ID, mapped to device ID or cross signing public key, which then contains
the key objects with the new signatures. An example payload could thus look as following (taken from
the spec):

```txt
POST /_matrix/client/unstable/keys/signatures/upload HTTP/1.1
Content-Type: application/json

{
  "@alice:example.com": {
    "HIJKLMN": {
      "user_id": "@alice:example.com",
      "device_id": "HIJKLMN",
      "algorithms": [
        "m.olm.curve25519-aes-sha256",
        "m.megolm.v1.aes-sha"
      ],
      "keys": {
        "curve25519:HIJKLMN": "base64+curve25519+key",
        "ed25519:HIJKLMN": "base64+ed25519+key"
      },
      "signatures": {
        "@alice:example.com": {
          "ed25519:base64+self+signing+public+key": "base64+signature+of+HIJKLMN"
        }
      }
    },
    "base64+master+public+key": {
      "user_id": "@alice:example.com",
      "usage": [
        "master"
      ],
      "keys": {
        "ed25519:base64+master+public+key": "base64+master+public+key"
      },
      "signatures": {
        "@alice:example.com": {
          "ed25519:HIJKLMN": "base64+signature+of+master+key"
        }
      }
    }
  },
  "@bob:example.com": {
    "bobs+base64+master+public+key": {
      "user_id": "@bob:example.com",
      "keys": {
        "ed25519:bobs+base64+master+public+key": "bobs+base64+master+public+key"
      },
      "usage": [
        "master"
      ],
      "signatures": {
        "@alice:example.com": {
          "ed25519:base64+user+signing+public+key": "base64+signature+of+bobs+master+key"
        }
      }
    }
  }
}
```

<!-- markdownlint-disable-next-line no-duplicate-heading -->
### Things to look out for

1. *Only* sign the keys mentioned above, do *not* sign any other keys.
2. Use the correct key to sign the correct key type - self_signing for your own things, user_signing
   for other users and your own device key for your own master key.
3. If you don't have the self_signing or user_signing keys cached, you might have to prompt the user
   to open their SSSS with their recovery passphrase / key.
4. If you are doing the first verification with an own device you don't have any cross-signing keys
   yet. Signing the other persons device key doesn't make much sense, as it is likely already signed.
   Instead, only sign your own master key in that specific case. In a following section will be discussed
   how you can detect whether you should do this behaviour - for now you could only sign other own
   device keys if you have your own self_signing key cached.
5. Don't forget to request SSSS secrets over share requests when verifying an own device and you don't
   have them yet.

## 5. In-room verification

The idea of cross-signing is that users verify other users. So far we only talked about devices
verifying devices, though. For that, in-room verification is introduced. In-room verification is
typically used when verifying *other* users. To not confused the user it should be considered to
hide device verification for other users all-together, and to only show device verification for
verification with yourself.

### Starting in-room verification

In-room verification happens in a direct message room between two users. So, when Alice wants to verify
Bob she has to find an existing direct message room she has with Bob, and, if there is none, create
it and invite him.

Afterwards, as with the to_device verification flow, messages are sent in the room specific to the
verification flow chosen. There are, however, a few changes.

### Sending a verification request

Instead of sending an event with type `m.verification.key.request`, a normal message event with the
msgtype of `m.verification.key.request` is sent. As normal room messages already have an `origin_server_ts`
the `timestamp` field is omitted. As transaction ID the event of this message sent is used. Additionally,
a `from_device` and `to` field are added. A `body` is present as fallback for clients that do not
support in-room verification.

As the content of such an `m.room.message` for Alice to start an in-room verification request with Bob
could look as follows:

```json
{
  "methods": [
    "m.sas.v1"
  ],
  "from_device": "MPLIJIXIIF", // The device ID of Alice device starting the request
  "msgtype": "m.key.verification.request",
  "to": "@bob:example.org", // Bobs mxid
  "body": "Attempting verification request. (m.key.verification.request) Apparently your client doesn't support this"
}
```

### Sending other payloads

Next messages are sent with the type being the type of that specific step, e.g. instead of sending
a message as `m.room.message` as above, you send it as `m.key.verification.accept`. The `from_device`
property is still added as usual.

As transaction ID the event ID of the original request is used. That, however, is added in an `m.relates_to`
block as follows:

```json
{
  // other content of that specific type
  "from_device": "DEVICE_ID",
  "m.relates_to": {
    "rel_type": "m.reference",
    "event_id": "$event_id_of_the_original_request"
  }
}
```

<!-- markdownlint-disable-next-line no-duplicate-heading -->
### Things to look out for

1. Don't allow to directly verify other users devices
2. Use in-room verification to verify other users, not specific devices
3. Don't use in-room verification for self-verification, use device verification for that
4. If Alice starts an in-room verification with Bob and Bob has two devices, only one of the devices,
   probably the one Bob uses to accept the verification, should send verification messages.

## 6. Miscellaneous cross-signing things

Apart from bootstrapping cross-signing there are a few miscellaneous things that you can optionally
implement to smoothen out the cross-signing experience for the user, things that don't justify their
own section. As such, they are listed here.

### Detect if you are verified for others

Your client might want to introduce a popup or something saying "This session isn't verified for others.
Please verify it with one of your devices.". For that, you need to detect if that is the case.

To do so, you have to check the valid signature of your own device to your own master key. It should
look as following, where `->` denotes "is signed by":
`Own device -> Own self-signing key -> Own master key`

You could re-use the same recursive method to determine if a device is verified as previously implemented,
but only cut off if it reaches at your own verified master key, not at any verified key.

### Migration of previous verifications

Let's say Alice and Bob previously met, before cross-signing and had manually verified their devices
specifically. And now, both have enabled cross signing. Alice could detect Bobs master key as verified
with the following signature chain, where `->` denotes "is signed by":
`Bobs master key -> Bobs device key, previously verified`

Alice could then, based on this trust establishment, sign bobs master key with her own user-signing
key, thus bootstrapping a cross-signing relationship from Alice to Bob.

### Self-Verification

Let's say you log into a new device but don't have any other device to verify with around. Don't worry,
this is where self-verification comes in: You prompt the user their SSSS passphrase / recovery key
and use that to verify and sign yourself:

1. Ask for SSSS credentials
2. Decrypt your master key (`m.cross_signing.master`), generate the public key out of it and compare
   it with your own advertised master ed25519 key. You can do this with libolms `olm.PkSigning()`,
   property `init_with_seed`. Keep in mind that you have to base64-decode the secret of SSSS!
3. Decrypt your own self-signing key, and sign your own device key with it.
4. Sign your own master key with your own device key.
5. Upload the signatures.
6. Fetch all entries from SSSS that you want to cache and cache them.

## 7. Bootstrapping SSSS and cross-signing

By now your client should be able to cross-sign other devices, use SSSS if it is set up and sign other
people via verification. To set up all the things that means to *bootstrap* them, you still rely on
other clients, such as element.

Bootstrapping is actually pretty straight-forward: You create all the keys, encrypt the cross-signing
keys and set the events. So, a rough roadmap of what to do can look as following:

1. Create a new SSSS key, be it via a randomly generated key or from a passphrase
2. Generate a new, random, key ID for that key
3. Set the information for that key in your account data
4. Set the new key as default key
5. Do other things (generate cross-signing keys, etc.) with that new key

### Creating the SSSS key information

Creating the key information for the new `m.secret_storage.key.<keyid>` event is basically just doing
what you did before to verify if an entered key is correct, but now using the data to set the account
data event. In the case of a passphrase you will have to generate a salt and iteration times yourself.
All keys have 256 bits.

**Important**: Make sure that all random things generated here, be it keys or salts, are as securely
random as possible. Many languages have libraries for creating more securely random data than the
default pseudo random number generator.

#### Key from passphrase

A reasonably-secure iteration number for PBKDF2 is `500000` (That is five-hundred thousand). The salt
needs as much random data as our hash function. While PBKDF2 uses sha512 as hash, the generated key
is only 256 bits long, so 256 bits should be reasonably secure. To make sure that the salt is usable,
you can just base64 the randomly generated salt.

After that, you use PBKDF2 to get the key from the passphrase, and calculate the MAC and IV.

Code for generating the key could look as follows:

```dart
// "passphrase" is the passphrase by the user

var passphraseInfo = {
  "algorithm": "m.pbkdf2",
  "iterations": 500000,
  "salt": base64.encode(SecureRandom(32).bytes), // we use secure random! 32 bytes = 256 bits
  "bits": 256,
};
var generator = PBKDF2(hashAlgorithm: sha512);
var key = Uint8List.fromList(generator.generateKey(passphrase, passphraseInfo["salt"],
      passphraseInfo["iterations"], passphraseInfo["bits"] / 8));
```

#### Generating a random key without a passphrase

Just generate a 256-bit long key.

```dart
var key = SecureRandom(32).bytes; // 32 bytes = 256 bits
```

#### Calculating the key information

You still need an IV to be able to calculate the MAC you later on use to verify the key. For that,
generate 16 bytes and base64-encode them. Afterwards you just generate the MAC like you would for
verifying the key, and then store the account data event.

```dart
// "key" is the key
var iv = base64.encode(SecureRandom(16).bytes);
// ZERO_STR are 32 bytes of zero. We encrypt with our generated key, a blank name and the iv of the event
var encrypted = encryptAes(ZERO_STR, key, '', iv);
var info = {
  "algorithm": "m.secret_storage.v1.aes-hmac-sha2",
  "iv": iv,
  "mac": encrypted.mac,
  "passphrase": passphraseInfo,
};
```

#### Generating the key ID

The key ID is just a short, random string which doesn't contain a dot. For that, you can e.g. generate
a few random bytes and base64 encode them. Make sure no key with such an ID exists yet! After you have
the key ID, set your key information object to account data `m.secret_storage.key.<keyId>`.

To set the newly generated key as default key, simply set the `m.secret_storage.default_key` account
data to the key ID (*NOT* the full account data type):

```json
{
  "key": "<keyId>"
}
```

### Bootstrapping cross-signing

Now that you bootstrapped SSSS, it is time to bootstrap cross-signing! For that, you generate an
ed25519 keypair for master key, self-signing key and user-signing key. Afterwards you store the
base64-encoded private keys in SSSS, generate the key objects with the public keys for uploading,
sign the self-signing and user-signing key with the master key, and upload them. While you are at it,
you can also sign your own device with the newly generated self-signing key and sign the newly
generated master key with your own device key. Don't forget to mark the master key you just generated
as verified!

Fortunately libolm gives us methods for creating an ed25519 keypair. We already showed how to sign
key objects with libolm above, when creating new signatures after verifying.

<!-- markdownlint-disable line-length -->
```dart
var master = olm.PkSigning();
try {
  var masterPrivateKey = master.generate_seed();
  var masterPublicKey = master.init_with_seed(masterPrivateKey);
  // generate key object (and save for later)
  var json = {
    "user_id": "@alice:example.com",
    "user": ["master"], // adjust to "self_signing" and "user_signing" for the other keys
    "keys": {
      "ed25519:$masterPublicKey": masterPublicKey,
    },
  };

  // self_signing and user_signing ONLY! Generate signature:
  var signature = signWithMasterKey(json);
  json["signatures"] = {
    "@alice:example.com": {
      // as it was the *master* key that made the signature, we always need to put the master key
      // here
      "ed25519:<base64-of-master-public-key>": signature,
    },
  };

  // store in SSSS
  var secret = base64.encode(masterPrivateKey);
  storeInSsss("m.cross_signing.master", secret); // adjust to "m.cross_signing.self_signing" and "m.cross_signing.user_signing" for the other keys.
} finally {
  master.free();
}
```
<!-- markdownlint-enable line-length -->

After you generated all the json key objects you can POST them to `/_matrix/client/unstable/keys/device_signing/upload`.
Keep in mind that this endpoint uses user-interactive authentication, so you will also have to send
an additional `auth` array with the needed information to complete stages. Hereby `master_key` holds
the master key object, `self_signing_key` the self-signing key and `user_signing_key` the user-signing
key. An example request could look as following (taken from the spec):

```txt
POST /_matrix/client/unstable/keys/device_signing/upload HTTP/1.1
Content-Type: application/json

{
  "master_key": {
    "user_id": "@alice:example.com",
    "usage": [
      "master"
    ],
    "keys": {
      "ed25519:base64+master+public+key": "base64+master+public+key"
    }
  },
  "self_signing_key": {
    "user_id": "@alice:example.com",
    "usage": [
      "self_signing"
    ],
    "keys": {
      "ed25519:base64+self+signing+public+key": "base64+self+signing+master+public+key"
    },
    "signatures": {
      "@alice:example.com": {
        "ed25519:base64+master+public+key": "signature+of+self+signing+key"
      }
    }
  },
  "user_signing_key": {
    "user_id": "@alice:example.com",
    "usage": [
      "user_signing"
    ],
    "keys": {
      "ed25519:base64+user+signing+public+key": "base64+user+signing+master+public+key"
    },
    "signatures": {
      "@alice:example.com": {
        "ed25519:base64+master+public+key": "signature+of+user+signing+key"
      }
    }
  }
}
```

### Changing SSSS passphrase / key

Along with bootstrapping you can implement other things, such as the ability to change the SSSS passphrase.
When doing so, keep in mind that keeping an in-tact SSSS is crucial for having a functional account,
as such an algorithm is needed where any single step can fail and no data at all is lost. For this,
it is helpful to utilize that an encrypted SSSS secret in account data can be encrypted by *multiple*
keys at once, by setting multiple ciphertexts:

```json
{
  "encrypted": {
    "firstKeyId": {
      "iv": "supercooliv",
      "ciphertext": "secretciphertext",
      "mac": "macthingy"
    },
    "secondKeyId": {
      "iv": "othersupercooliv",
      "ciphertext": "othersecretciphertext",
      "mac": "othermacthingy"
    }
  }
}
```

Now, the following algorithm could be used to change the SSSS passphrase:

1. Scan all account data for things that look like they could be stored SSSS secrets
2. Gather all needed SSSS keys needed to decrypt them (typically only one - the current default)
3. Prompt the user to unlock all of those keys
4. Decrypt and cache all secrets
5. Prompt the user for a new passphrase / key
6. Generate the new SSSS key
7. Re-encrypt all cached secrets with the new SSSS key, putting the new ciphertext there *in addition*
   to the old ciphertext
8. (Optional) Re-verify that all account data events have been set correctly, e.g. by attempting to
   decrypt with the new key and comparing with the cached secrets
9. Set the new key as default key
10. Remove from the account data events the old ciphertext, as only the new one is needed anymore
