# End-to-end Encryption

Matrix uses two different cryptographic ratchets for end-to-end encryption:
Megolm and Olm.

Megolm is a symmetric ratchet for encryption, along with a
signing key for proving authenticity, and is used to encrypt messages within a
Matrix room. Once a device has a Megolm session, it can advance the ratchet to
decrypt messages. Each device uses their own Megolm session for each room that
they send a message to, and rotates that session periodically.

Olm is a [double
ratchet](https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm) that is
established between two devices and is used to send a Megolm session from one
device to another.  Both devices use the same Olm session to send their Megolm
sessions to the other device.

To encrypt a message in Matrix, a client

- ensures that it has established an Olm session to all the other devices that
  are currently in the room;
- creates a Megolm session (if it does not already have a session that can
  still be used);
- sends the Megolm session to each other device in the room, using the Olm
  sessions established above;
- encrypts the message using the Megolm session; and
- sends the encrypted message to the room.

To decrypt a message, a client

- decrypts the Megolm session from the Olm session, and
- decrypts the message.

## libolm

Clients can use [libolm](https://gitlab.matrix.org/matrix-org/olm), which
implements Olm and Megolm. It is written in C/C++, but has [bindings for
several different
languages](https://gitlab.matrix.org/matrix-org/olm#bindings-1). This guide
assumes that libolm is used, and gives code examples in C++ and JavaScript
(TODO: and Python). Note that the code examples have not been tested, and are
only for illustrative purposes only.

When using libolm directly, you will need to allocate the necessary buffers,
and provide the necessary randomness in the form of byte arrays of the
appropriate size filled with random values. Functions are provided to indicate
the required sizes for buffers and random arrays. Random arrays must also be
cleared after they are used. Bindings for other languages will often hide such
details. In addition, some SDKs may handle many of the details required for
handling end-to-end encryption; if you are using an SDK, you should refer to
its documentation.

Many functions will return the value given by `olm_error()` if an error
occurs. The error can be checked by calling `olm_*_last_error` (which returns a
string), or `olm_*_last_error_code` (which returns a numeric code). Bindings
may do something similar, or may use native error-handling techniques such as
throwing an exception.

After you are done using objects, make sure to use the appropriate
`olm_clear_*` function to clear the memory used by the objects.

libolm contains functions for "pickling/unpickling" its objects. This allows
the objects to be serialized and encrypted as a byte string so that they can be
stored. Since some operations change the objects, objects that have been
pickled and stored will need to be pickled and stored again after those
operations are performed.

When using the JavaScript bindings, libolm has access to a limited
amount of memory. Clients can reduce the amount of memory used by libolm by not
keeping libolm objects in memory; instead, clients can pickle the object when
it is not being used and free the memory, and unpickle the object when it is
needed again.

### Other requirements

In addition to libolm, you will need:

- a method to generate random bytes to provide to libolm (some bindings will
  take care of this already; in the C++ examples, we will assume that there is
  a function called `fill_with_random` that fills a buffer with random bytes),
- a JSON parser (in the C++ examples, we will use the [nlohmann JSON
  library](https://github.com/nlohmann/json)),
- a function to create [canonical
  JSON](https://spec.matrix.org/v1.1/appendices/#canonical-json) (use
  [another-json](https://www.npmjs.com/package/another-json) in JavaScript and
  [canonicaljson](https://pypi.org/project/canonicaljson/) in Python; in the
  C++ examples, we will assume that there is a function called `canonical_json`
  that does this),
- an AES-CTR implementation (for encrypted attachments),
- a way to make HTTP requests to the homeserver (in the examples, we assume
  that there is a function called `http_request(method, endpoint, body)` that
  does this), and
- a function that creates a unique transaction ID for use when calling certain
  endpoints (in the examples, we assume that there is a function called
  `make_txn_id()` that does this).

You will probably also want:

- a way to store pickles, if your client will be stopped and restarted, and
- a secure way to store the pickle keys.

## Concepts

### Devices

We have a particular meaning for "device". As a user, I might have
several devices (a desktop client, some web browsers, an Android device,
an iPhone, etc). When I first use a client, it should register itself as
a new device. If I log out and log in again as a different user, the
client must register as a new device. Critically, the client must create
a new set of keys (see below) for each "device".

The longevity of devices will depend on the client. In the web client,
we create a new device every single time you log in. In a mobile client,
it might be acceptable to reuse the device if a login session expires,
**provided** the user is the same. **Never** share keys between
different users.

Devices are identified by their `device_id` (which is unique within the
scope of a given user). By default, the `/login` and `/register`
endpoints will auto-generate a `device_id` and return it in the
response; a client is also free to generate its own `device_id` or, as
above, reuse a device, in which case the client should pass the
`device_id` in the request body.

The lifetime of devices and `access_token`s are closely related. Each
`access_token` corresponds to a single `device_id`, and each `device_id` should
only be used by a single `access_token` (although Synapse [doesn't enforce this
yet](https://github.com/matrix-org/synapse/issues/6616)).

### Keys

There are a number of keys involved in encrypted communication; a summary of
them follows.

#### Device-related keys

Each device as various keys associated with it.  These are used for
establishing the Olm sessions between devices.

- **Ed25519 fingerprint key pair**: Ed25519 is a public-key cryptographic
  system for signing messages. In Matrix, each device has an Ed25519 key pair
  which serves to identify that device. The private part of the key pair should
  never leave the device, but the public part is published to the Matrix
  network and is visible to other users.

- **Curve25519 identity key pair**: Curve25519 is a public-key cryptographic
  system which can be used to establish a shared secret. In Matrix, each device
  has a long-lived Curve25519 identity key which is used to establish Olm
  sessions with that device. Again, the private key should never leave the
  device, but the public part is signed with the Ed25519 fingerprint key and
  published to the network.

  Theoretically we should rotate the Curve25519 identity key from time to time,
  but we haven't implemented this yet.

- **Curve25519 one-time keys**: As well as the identity key, each device
  creates a number of Curve25519 key pairs which are also used to establish Olm
  sessions, but can only be used once. Once again, the private part remains on
  the device.

  At startup, Alice creates a number of one-time key pairs, and publishes the
  public parts to her homeserver. If Bob wants to establish an Olm session with
  Alice, he needs to claim one of Alice's one-time keys, and creates a new one
  of his own. Those two keys, along with Alice's and Bob's identity keys, are
  used in establishing an Olm session between Alice and Bob.

  The homeserver will only allow each key to be claimed once; once a key is
  claimed, the homeserver will forget about it. When Alice receives a message
  over the Olm session that Bob established, she will create her side of the
  session and then discard the private part of one-time key that Bob used.

  The homeserver will notify the device of how many one-time keys
  remain. Devices can use this to ensure that there are sufficient one-time
  keys available by uploading new one-time keys as needed.

- **Curve25519 fallback keys**: The fallback key functions similarly to the
  one-time keys, with the main exception that fallback keys may be used more
  than once. If a device uploads a fallback key and all of its one-time keys
  are claimed, the server will offer the fallback key when another device wants
  to claim a key. Without this, Olm sessions would not be able to be
  established when the one-time keys are exhausted, but the security is reduced
  slightly.

The Ed25519 fingerprint key and the Curve25519 identity key are sometimes
collectively referred to as "device keys", since they identify a device.

#### Megolm keys

Each Megolm session also has a set of keys:

- **Encryption keys**: The Megolm key is used to encrypt group messages (in
  fact it is used to derive an AES-256 key, and an HMAC-SHA-256 key). It is
  initialised with random data. Each time a message is sent, a hash calculation
  is done on the Megolm key to derive the key for the next message. It is
  therefore possible to share the current state of the Megolm key with a user,
  allowing them to decrypt future messages but not past messages.

- **Ed25519 signing key**: Each Megolm session has its own Ed25519 signing key
  pair. This is used to sign messages sent via that Megolm session, to
  authenticate the sender. Once again, the private part of the key remains on
  the device. The public part is shared with other devices in the room
  alongside the encryption key.

## Olm Account

Each device creates an `OlmAccount` object. This object manages the device's keys
(Ed25519 fingerprint key, Curve25519 identity key, Curve25519 one-time keys,
and Curve25519 fallback keys), and is used to create Olm sessions with other
users.

When first initialized, it will generated the Ed25519 fingerprint key and
Curve25519 identity key.

C++:
```c++
// Helper class for handling random arrays.  It ensures that the array gets
// cleared when the object goes out of scope.
class Random {
  void *_data;
  size_t _length;

  Random(size_t length): _data(malloc(length)), _length(length) {
    fill_with_random(_data, _length);
  }
  ~Random() {
    memset(_data, 0, _length);
    free(_data);
  }
  size_t length() const {
    return _length;
  }
  const void *data() const {
    return _data;
  }
}

void *account_memory = malloc(olm_account_size());
OlmAccount *account = olm_account(account_memory);
Random random(olm_create_account_random_length(account));
size_t ret = olm_create_account(account, random.data(), random.length());
if (ret == olm_error()) {
  // handle error
}
```

JavaScript:
```javascript
await global.Olm.init(); // this must be done at least once, before using any libolm functions

const account = new global.Olm.Account();
account.create();
```

Python: (TODO)

When the client is closed and re-opened, it should use the same `OlmAccount`
object. This can be done using the `pickle`/`unpickle` functions:

C++:
```c++
// To pickle the account:

// The application will need to determine a pickle key to encrypt the pickle.
// For example, it can generate a random pickle key, and store it in the
// operating system's keyring or similar
size_t key_length;
char *key;

size_t pickle_length = olm_pickle_account_length(account);
char *pickle = malloc(pickle_length);
if (olm_pickle_account(account, key, key_length, pickle, pickle_length) == olm_error()) {
  // handle error
}

// store the pickle, and then

free(pickle);

// if the application is done using the account, then it should:
olm_clear_account(account); // clear the memory (so that private keys aren't left around)
free(account_memory);


// To unpickle the account:

// use the same pickle key that was used when pickling the account
size_t key_length;
char *key;

// load the pickle
size_t pickle_length;
char *pickle;

void *account_memory = malloc(olm_account_size());
OlmAccount *account = olm_account(account_memory);
if (olm_unpickle_account(account, key, key_length, pickle, pickle_length) == olm_error()) {
  // handle error
}
free(pickle);

// account can now be used as before
```

JavaScript:
```javascript
// To pickle the account:
const pickle = account.pickle(key);


// To unpickle the account:
const account = new global.Olm.Account();
account.unpickle(key, pickle);
```

### Uploading device keys

Once the `OlmAccount` is created, the client should upload its device keys to
the homeserver so that they are available to others.  Olm provides the identity
keys as a JSON object, so you will need to parse the JSON.  The identity keys
are placed in a new JSON object that includes the user ID and device ID, and it
is then signed by the device's Curve25519 fingerprint key.  The signature is
then added to the JSON object (using the method given in the [Signing
JSON](https://spec.matrix.org/v1.1/appendices/#signing-json) section of the
spec), and it is uploaded to the server using the [`POST
/keys/upload`](https://spec.matrix.org/v1.1/client-server-api/#post_matrixclientv3keysupload)
endpoint.

C++:
```c++
// assuming that the user ID is stored in a variable named "user_id", and the
// device ID is stored in a variable named "device_id":

size_t identity_keys_length = olm_account_identity_keys_length(account);
char *identity_keys_buf = malloc(identity_keys_length + 1);
size_t size = olm_account_identity_keys(account, identity_keys_buf, identity_keys_length);
if (size == olm_error()) {
  // handle error
}
identity_keys_buf[size] = '\0';
auto identity_keys = json::parse(identity_keys_buf);
free(identity_keys_buf);

json device_keys = {
  {"algorithms", {"m.olm.v1.curve25519-aes-sha2", "m.megolm.v1.aes-sha2"}},
  {"device_id", device_id},
  {"user_id", user_id},
  {"keys", {
    {std::string("ed25519:") + device_id, identity_keys["ed25519"]},
    {std::string("curve25519:") + device_id, identity_keys["curve25519"]}
  }}
};
std::string device_keys_to_sign = canonical_json(device_keys);
size_t signature_length = olm_account_signature_length(account)
char *signature = malloc(signature_length + 1);
if (olm_account_sign(
      account,
      device_keys_to_sign.data(), device_keys_to_sign.length(),
      signature, signature_length
    ) == olm_error()) {
  // handle error
}
signature[signature_length] = '\0';
device_keys["signatures"] = {
  {user_id, {
    {std::string("ed25519:") + device_id, signature}
  }}
};
json body = {{"device_keys", device_keys}};

http_request("POST", "/keys/upload", body.dump());
free(identity_keys_buf);
```

JavaScript:
```javascript
// assuming that the user ID is stored in a variable named "userId", and the
// device ID is stored in a variable named "deviceId":

const identityKeys = JSON.parse(account.identity_keys());

const deviceKeys = {
  algorithms: [
    "m.olm.v1.curve25519-aes-sha2",
    "m.megolm.v1.aes-sha2"
  ],
  device_id: device.deviceId,
  keys: {
    [`ed25519:${deviceId}`]: identityKeys.ed25519,
    [`curve25519:${deviceId}`]: identityKeys.curve25519,
  },
  user_id: userId,
}
const signature = account.sign(anotherjson.stringify(deviceKeys));
deviceKeys.signatures = {
  [userId]: {
    [`ed25519:${deviceId}`]: signature,
  },
};
await http_request("POST", "/keys/upload", { device_keys: deviceKeys });
```

### Uploading one-time keys

The client should maintain a pool of one-time keys available for other devices
to claim so that they can create new Olm sessions. The `OlmAccount` has a
maximum number of one-time keys that it can remember, which can be obtained by
calling `olm_account_max_number_of_one_time_keys`. Clients should generally
ensure that the server has half this number of keys available.  Using half the
number means that if all the keys are claimed, the client can upload new keys
while it waits to receive the initial messages for the Olm sessions, without
overwriting the old keys.

The number of keys remaining on the server is given by the `signed_curve25519`
property of the `device_one_time_keys_count` property of the `GET /sync`
response.  If this property is not present, then there are no keys remaining.
Alternatively, the number can be obtained by the `signed_curve25519` property
of the `one_time_key_counts` property of the `POST /keys/upload` response.  An
empty request body can be used to query the number of keys without uploading
any new keys.

Keys are signed, similar to the way the device keys are signed, and uploaded
using the [`POST
/keys/upload`](https://spec.matrix.org/v1.1/client-server-api/#post_matrixclientv3keysupload)
endpoint. Note that this is the same endpoint as the one used for uploading the
device keys, the client can upload both the device keys and the one-time keys
at the same time.

libolm keeps track of which keys have been successfully uploaded to the server,
so that keys are not re-uploaded. Thus, when uploading one-time keys to the
server, clients should:

- check whether there are any unpublished one-time keys available, and
  determine how many (if any) new keys need to be generated
- generate new one-time keys if necessary
- fetch the one-time keys and sign them
- upload them to the server
- mark them as published

C++:
```c++
// get this value from sync_response["device_one_time_key_counts"]["signed_curve25519"]
size_t keys_remaining_on_server;

size_t keys_to_keep_on_server = olm_account_max_number_of_one_time_keys(account) / 2;

if (keys_remaining_on_server < keys_to_keep_on_server) {
  size_t keys_needed = keys_to_keep_on_server - keys_remaining_on_server;

  // how many unpublished keys do we already have available?
  size_t otk_length = olm_account_one_time_keys_length(account)
  char* otk_buffer = malloc(otk_length + 1);
  size_t size = olm_account_one_time_keys(account, otk_buffer, otk_length);
  if (size == olm_error()) {
    // handle error
  }
  otk_buffer[size] = '\0';
  auto otks = json::parse(otk_buffer);
  free(otk_buffer);
  int keys_available = otks["ed25519"].size();

  // generate new keys if needed
  if (keys_needed > keys_available) {
    size_t keys_to_generate = keys_needed - keys_available;
    size_t otk_random_length = olm_account_generate_one_time_keys_random_length(
      account, keys_to_generate
    );
    Random otk_random(otk_random_length);
    size_t ret = olm_account_generate_one_time_keys(
      account, keys_to_generate, otk_random.data(), otk_random.length()
    );
    if (ret == olm_error()) {
      // handle error
    }

    // and get all the keys that we have
    otk_length = olm_account_one_time_keys_length(account)
    otk_buffer = malloc(otk_length + 1);
    size = olm_account_one_time_keys(account, otk_buffer, otk_length);
    if (size == olm_error()) {
      // handle error
    }
    otk_buffer[size] = '\0';
    otks = json::parse(otk_buffer);
    free(otk_buffer);
  }

  // sign the keys and put them in a JSON object for upload
  json signed_otks;
  for (auto& el : otks["ed25519"].items()) {
    json key = {
      {"key", el.value()}
    };
    std::string keys_to_sign = canonical_json(keys);
    size_t signature_length = olm_account_signature_length(account)
    char *signature = malloc(signature_length + 1);
    if (olm_account_sign(
          account,
          keys_to_sign.data(), keys_to_sign.length(),
          signature, signature_length
        ) == olm_error()) {
      // handle error
    }
    signature[signature_length] = '\0';
    key["signatures"] = {
      {user_id, {
        {std::string("ed25519:") + device_id, signature}
      }}
    };
    signed_otks[std::string("signed_curve25519:") + el.key()] = key;
    free(signature);
  }

  // upload and mark as published
  json body = {{"one_time_keys", signed_otks}};
  http_request("POST", "/keys/upload", body.dump());
  olm_account_mark_keys_as_published(account);
}
```

JavaScript:
```javascript
// get this value from sync_response["device_one_time_key_counts"]["signed_curve25519"]
const keysRemainingOnServer;

const keysToKeepOnServer = account.max_number_of_one_time_keys();

if (keysRemainingOnServer < keysToKeepOnServer) {
  const keysNeeded = keysToKeepOnServer - keysRemainingOnServer;

  // how many unpublished keys do we already have available?
  let otks = JSON.parse(account.one_time_keys());
  const keysAvailable = [...Object.keys(otks.ed25519)].length;

  // generate new keys if needed
  if (keysNeeded > keysAvailable) {
    const keysToGenerate = keysNeeded - keysAvailable;
    account.generate_one_time_keys(keysToGenerate);
    otks = JSON.parse(account.one_time_keys());
  }

  // sign the keys and put them in an object for upload
  const signedOtks = {};
  for (const [keyId, key] of Object.entries(otks.ed25519)) {
    keyObj = { key };
    const signature = account.sign(anotherjson.stringify(keyObj));
    keyObj.signatures = {
      [userId]: {
        [`ed25519:${deviceId}`]: signature,
      },
    };
    signedOtks["signed_curve25519:" + keyId] = keyObj;
  }

  // upload and mark as published
  await http_request("POST", "/keys/upload", { one_time_keys: signedOtks });
}
```

Note that there may be a race condition between calls to `GET /sync` and `POST
/keys/upload`: if you perform both requests at the same time, then you may not
know if the `device_one_time_key_counts` from the `/sync` response represents
the state from before, after, or during the call to `/keys/upload`.  For this
reason, after you receive a `/sync` response that indicates that one-time keys
are required, you may wish to wait for the call to `/keys/upload` to complete
before making the next `/sync` request.

### Uploading a fallback key

TODO:

## Enabling encryption in a room

Encryption is enabled in a room by the presence of an `m.room.encryption` state
event (with `state_key` being the empty string).  The encryption algorithm is
given in the `algorithm` property; for Megolm, it is set to
`m.megolm.v1.aes-sha2`.  The event also includes parameters controlling how
often the Megolm session gets rotated (see below for more about rotating Megolm
sessions).

Clients must be careful when processing incoming `m.room.encryption` events.
Once encryption is enabled in a room, clients should not allow it to be
disabled. This is to avoid a situation where a MITM can simply ask participants
to disable encryption in a room that the participants expect to be
encrypted. If a client receives an invalid `m.room.encryption` event (for
example, it does not have an `algorithm` property, or the algorithm given is
unknown), the client should prevent users from sending messages to the room.

## Sending an encrypted message

Clients must take several steps to send an encrypted message.

### Establishing an Olm session with all devices in a room

Room messages are encrypted using a Megolm session, but the Megolm session must
be distributed to all the devices that are currently in the room. This is done
using Olm sessions established with each device. This can be an existing Olm
session, or if no session exists, a newly created session.

#### Tracking device changes

In order to send Megolm sessions to the correct devices, the client must keep
track of what devices are in the room. So if a new device is present in the
room, the Megolm sessions for new messages should be sent to it, and if a
device leaves the room, the Megolm sessions for new messages should no longer
be sent to it. Device changes can happen from membership changes, or from a
room member logging in to or out of a device.

When a user joins a room, all of their devices are added. The client can
determine the user's devices, along with the device keys, by calling [`POST
/keys/query`](https://spec.matrix.org/v1.1/client-server-api/#post_matrixclientv3keysquery),
if they are not already tracking that user's devices. When a user leaves a
room, all of their devices are removed. When a user is no longer in any
encrypted rooms with the client, their Matrix ID will be listed in the `left`
property of the `device_lists` property of the `/sync` response.

When a room member's devices change, the member's Matrix ID will be listed in
the `changed` property of the `device_lists` property of the `/sync` response.
Again, the user's device, along with the device keys, can be obtained by
calling `POST /keys/query`

Some clients may wish to prevent sending of Megolm sessions to certain
devices. For example, some clients may allow the user to manually block certain
users or devices from receiving Megolm sessions, or may automatically block
unverified users or devices.

#### Creating a new Olm session

If the client does not already have an Olm session established with a device
that it needs to send a Megolm session to (established either by itself or by
the other device), it must create a new Olm session. To do so, it first fetches
the device's fingerprint and identity keys, if it does not already have them
(by calling [`POST
/keys/query`]((https://spec.matrix.org/v1.1/client-server-api/#post_matrixclientv3keysquery))),
claims a one-time key (by calling [`POST
/keys/claim`](https://spec.matrix.org/v1.1/client-server-api/#post_matrixclientv3keysclaim)),
checks the signatures on them, and then creates the Olm session. When the
client encrypts the Megolm session with the Olm session and sends it to the
other device, this will provide the other device the information necessary to
create the Olm session on its side.

C++:
```c++
// (assume that olm_utility is a previously-created OlmUtility object)
// for each device that we need to create an Olm session with:
std::string target_user_id;
std::string target_device_id;

// get the device keys/one-time key
// note: keys for multiple devices can be queried/claimed at the same time,
// which is better to do than doing one device at a time.  See the spec for
// these endpoits for more details.
json keys_query_body = {
  {"device_keys", {
    {target_user_id, {target_device_id}}
  }}
}
json res;
res = http_request("POST", "/keys/query". keys_query_body.dump());
// note: a proper client should check that the properties exist in the response.
// If they do not exist, then an Olm session cannot be established.
json target_device_keys = res["device_keys"][target_user_id][target_device_id];
json keys_claim_body = {
  {"one_time_keys", {
    {target_user_id, {
      {target_device_id, "signed_curve25519"}
    }}
  }}
};
res = http_request("POST", "/keys/claim", keys_claim_body.dump());
json signed_otk = res["one_time_keys"][target_user_id][target_device_id];


// check the signatures on the keys
std::string target_ed25519_key =
  target_device_keys["keys"][target_user_id][std::string("ed25519:") + target_device_id].get<std::string>();

json stripped_target_device_keys = target_device_keys;
stripped_device_keys.erase("signatures");
stripped_device_keys.erase("unsigned");
std::string device_keys_for_signing = canonical_json(stripped_device_keys);
std::string device_keys_signature =
  target_device_keys["signatures"][target_user_id][std::string("ed25519:") + target_device_id].get<std::string>();
// copy the signature because olm_ed25519_verify will overwrite it
char *signature_copy = malloc(device_keys_signature.length());
device_keys_signature.copy(signature_copy, device_keys_signature.length());
if (olm_ed25519_verify(olm_utility,
      target_ed25519_key.data(), target_ed25519_key.length(),
      device_keys_for_signing.data(), device_keys_for_signing.length(),
      signature_copy, device_keys_signature.length()) == olm_error()) {
  // signature not valid, so this device should be dropped
}
free(signature_copy);

json stripped_otk = signed_otk;
stripped_otk.erase("signatures");
stripped_otk.erase("unsigned");
std::string otk_for_signing = canonical_json(stripped_otk);
std::string otk_signature =
  signed_otk["signatures"][target_user_id][std::string("ed25519:") + target_device_id].get<std::string>();
// copy the signature because olm_ed25519_verify will overwrite it
signature_copy = malloc(otk_signature.length());
device_keys_signature.copy(signature_copy, device_keys_signature.length());
if (olm_ed25519_verify(
      olm_utility,
      target_ed25519_key.data(), target_ed25519_key.length(),
      otk_for_signing.data(), otk_for_signing.length(),
      signature_copy, otk_signature.length()) == olm_error()) {
  // signature not valid, so this device should be dropped
}
std::string one_time_key = signed_otk["key"].get<std::string>();
free(signature_copy);


// create the olm session
std::string target_curve25519_key =
  target_device_keys["keys"][target_user_id][std::string("curve25519:") + target_device_id].get<std::string>();
void *olm_session_memory = malloc(olm_session_size);
OlmSession *olm_session = olm_session(olm_session_memory);
Random random(olm_create_outbound_session_random_length(olm_session));
if (olm_create_outbound_session(
      session, account,
      target_ed25519_key.data(), target_ed25519_key.length(),
      one_time_key.data(), one_time_key.length(),
      random.data(), random.length()) == olm_error()) {
  // handle error
}
```

JavaScript:
```javascript
// (assume that olmUtility is a previously-created Olm.Utility object)
// for each device that we need to create an Olm session with:
const targetUserId;
const targetDeviceId;

// get the device keys/one-time key
// note: keys for multiple devices can be queried/claimed at the same time,
// which is better to do than doing one device at a time.  See the spec for
// these endpoits for more details.
let res: Record<string, any>;

// note: a proper client should check that the properties exist in the response.
// If they do not exist, then an Olm session cannot be established.
res = await http_request("POST", "/keys/query", {
  device_keys: {
    [targetUserId]: [targetDeviceId],
  }
});
const targetDeviceKeys = res.device_keys[targetUserId][targetDeviceId];
res = await http_request("POST", "/keys/claim", {
  one_time_keys: {
    [targetUserId]: {
      [targetDeviceId]: "signed_curve25519"
    }
  }
});
const signedOtk = res.one_time_keys[targetUserId][targetDeviceId];


// check the signatures on the keys
const targetEd25519Key = targetDeviceKeys.keys[targetUserId][`ed25519:${targetDeviceId}`];
const strippedDeviceKeys = Object.assign({}, targetDeviceKeys);
delete strippedDeviceKeys.signatures;
delete strippedDeviceKeys.unsigned;
const deviceKeysForSigning = anotherjson(strippedDeviceKeys);
const deviceKeysSignature = targetDeviceKeys.signatures[targetUserId][`ed25519:${targetDeviceId}`];
// throws an exception if the verification fails
olmUtility.ed25519_verify(targetEd25519Key, deviceKeysForSigning, deviceKeysSignature);

const strippedOtk = Object.assign({}, signedOtk);
delete strippedOtk
const otkForSigning = anotherjson.stringify(strippedOtk);
const otkSignature = signedOtk.signatures[targetUserId][`ed25519:${targetDeviceId}`];
olmUtility.ed25519_verify(targetEd25519Key, otkForSigning, otkSignature);
const otk = signedOtk.key;


// create the olm session
const targetCurve25519Key = targetDeviceKeys.keys[targetUserId][`curve25519:${targetDeviceId}`];
const olmSession = new global.Olm.Session();
olmSession.create_outbound(account, targetCurve25519Key, otk);
```

#### Multiple Olm sessions

In some cases, a client may have multiple Olm sessions with the same device.
In this case, the client should use the Olm session from which it most recently
received and decrypted a message.

### Creating a Megolm session (if necessary)

If the device does not already have a Megolm session for the room, or if the
Megolm session needs to be rotated, it will need to create a new one.  An
existing Megolm session will need to be rotated if:

- the session was shared with a device that is no longer in the room,
- the session is older the period specified by the `rotation_period_ms`
  property of the `m.room.encryption` state event, or
- the session was used to encrypt more messages than the number given in the
  `rotation_period_msgs` property of the `m.room.encryption` state event.

If the `m.room.encryption` state event does not have `rotation_period_ms` or
`rotation_period_msgs` properties, the client should default to one week, or
100 messages, respectively, unless the client wishes to use shorter
values. The client may also use smaller values that the values given in those
properties, or allow the user to manually discard the current Megolm session.

To create a Megolm session for sending, the client creates an
`OlmOutboundGroupSession` object.

C:
```c++
void *megolm_session_memory = malloc(olm_outbound_group_session_size());
OlmOutboundGroupSession *megolm_session = olm_outbound_group_session(megolm_ession_memory);
Random megolm_session_random(olm_init_outboud_group_session_random_length(megolm_session));
fill_with_random(megolm_session_random, megolm_session_random_length);
if (olm_init_outbound_group_session(
      session,
      megolm_session_random.data(), megolm_session_random.length()) == olm_error()) {
  // handle error
}
```

JavaScript:
```javascript
const megolmSession = new global.Olm.OutboundGroupSession();
megolmSession.create();
```

### Sending the Megolm key to each device

The Megolm session is then sent to each device in the room that it has not
already sent the session to. This is done by creating an
[`m.room_key`](https://spec.matrix.org/v1.1/client-server-api/#mroom_key) event
that includes the Megolm session ID and Megolm session key, encrypting it with
the Olm session, and sending it as an `m.room.encrypted` to-device message.

Getting the session key from the Megolm session will give a key that will allow
the recipient to decrypt the next message and all future messages encrypted
with that Megolm session. Thus the client should re-fetch the session key when
sending it to other devices, rather than re-using a previously-fetched session
key. However, the session ID remains the same and can be reused.

C:
```c++
size_t megolm_session_id_length = olm_outbound_group_session_id_length(megolm_session);
char *megolm_session_id = malloc(megolm_session_id_length + 1);
size_t size = olm_outbound_group_session_id(megolm_session, megolm_session_id, megolm_session_id);
if (size == olm_error()) {
  // handle error
}
megolm_session_id[size] = '\0';

size_t megolm_session_key_length = olm_outbound_group_session_key_length(megolm_session);
char *megolm_session_key = malloc(megolm_session_key_length + 1);
size = olm_outbound_group_session_key(megolm_session, megolm_session_key, megolm_session_ey_length);
if (size == olm_error()) {
  // handle error
}
megolm_session_key[size] = '\0';

// construct m.room_key message
json room_key_message_content = {
  {"algorithm", "m.megolm.v1.aes-sha2"},
  {"room_id", roomId},
  {"session_id", megolm_session_id},
  {"session_key", megolm_session_key}
};
free(megolm_session_key);

json room_key_message = {
  {"type", "m.room_key"},
  {"content", room_key_message_content},
  {"sender", user_id},
  {"recipient", target_user_id},
  {"recipient_keys", {
    {"ed25519", target_ed25519_key}
  }},
  {"keys", {
    {"ed25519", identity_keys["ed25519"]}
  }}
};

std::string plaintext = room_key_message.dump();

// encrypt with olm session
Random encrypt_random(olm_encrypt_random_length(olm_session));
size_t ciphertext_length = olm_encrypt_message_length(olm_session, plaintext.length());
char *ciphertext = malloc(ciphertext_length);
size = olm_encrypt(
  olm_session,
  plaintext.data(), plaintext.length(),
  encrypt_random.data(), encrypt_random.length(),
  ciphertext, ciphertext_length
);
if (size == olm_error()) {
  // handle error
}

ciphertext[size] = '\0';

// create m.room.encrypted message and send it
json encrypted_message = {
  {"algorithm", "m.olm.v1.curve25519-aes-sha2"},
  {"sender_key", identity_keys["curve25519"]},
  {"ciphertext", {
    {target_curve25519_key, {
      {"type", olm_encrypt_message_type(olm_session)},
      {"body", ciphertext}
    }}
  }}
};

std::string txnId = make_txn_id();
http_request("PUT", "/sendToDevice/m.room.encrypted/" + txnId, encrypted_message.dump());
free(ciphertext);
```

JavaScript:
```javascript
const roomKeyMessage = {
  type: "m.room_key",
  content: {
    algorithm: "m.megolm.v1.aes-sha2",
    room_id: roomId,
    session_id: megolmSession.session_id(),
    session_key: megolmSession.session_key(),
  },
  sender: userId,
  recipient: targetUserId,
  recipient_keys: {
      ed25519: targetEd25519Key,
  },
  keys: {
      ed25519: identityKeys.ed25519,
  },
};
const encryptedMessage = {
    algorithm: "m.olm.v1.curve25519-aes-sha2",
    sender_key: identityKeys.curve25519,
    ciphertext: {
        [targetCurve25519DeviceKey]: olm_sessions.encrypt(JSON.stringify(roomKeyMessage)),
    },
};

const txnId = make_txn_id();
await http_request("PUT", `/sendToDevice/m.room.encrypted/${txnId}`, {
  messages: {
    [targetUserId]: {
      [targetDeviceId]: encryptedMessage
    }
  }
);
```

Note that the [`PUT
/sendToDevice/{eventType}/{txnId}`](https://spec.matrix.org/v1.1/client-server-api/#put_matrixclientv3sendtodeviceeventtypetxnid)
endpoint can be used to send to-device messages to multiple devices at the same
time. This should be done rather than sending one message at a time, to avoid
having extra overhead from making too many HTTP requests, but the requests
should be kept to a reasonable size. Clients should batch up the encrypting and
sending of the Megolm sessions, for example processing them 100 devices at a
time. If possible, clients can also pipeline the encrypting and sending of the
Megolm sessions: rather than encrypting the first batch, sending those
to-device messages, and waiting for the server to respond before encrypting to
the next batch, the client can start encrypting to the next batch while it
sends the first batch of to-device messages to the server.

### Encrypting the room message

The room message is then encrypted with the Megolm session and sent as an
`m.room.encrypted` event. Note that if the message is a file that is stored in
the media repository, the file itself must be encrypted, and the room message
will be modified to contain the decryption key. This is explained in more
detail below (FIXME: link).

C++:
```c++
// the room message to encrypt:
json message = {
  {"type", "m.room.message"},
  {"room_id", room_id},
  {"content", {
    {"body", "Hello world!"},
    {"msgtype", "m.text"}
  }}
};

std::string plaintext = message.dump();
size_t ciphertext_length = olm_group_encrypt_message_length(megolm_session, plaintext.length());
char *ciphertext = malloc(ciphertext_length + 1);
size_t size = olm_group_encrypt(
  megolm_session,
  plaintext.data(), plaintext.length(),
  ciphertext, ciphertext_length
);
if (size == olm_error()) {
  // handle error
}
ciphertext[size] = '\0';

json encrypted_message = {
  {"algorithm", "m.megolm.v1.aes-sha2"},
  {"sender_key", identityKeys["curve25519"]},
  {"ciphertext", ciphertext},
  {"session_id", megolm_session_id},
  {"device_id", device_id}
};

std::string txn_id = make_txn_id();
http_request(
  "PUT",
  std::string("/rooms/") + room_id + "/send/m.room.encrypted/" + txn_id,
  encrypted_message.dump()
);
free(ciphertext);
```

JavaScript
```javascript
// the room message to encrypt:
const message = {
  type: "m.room.message",
  room_id: roomId,
  content: {
    body: "Hello world!",
    msgtype: "m.text"
  }
};
const txnId = make_txn_id();
await http_request(
  "PUT", `/rooms/${roomId}/send/m.room.encrypted/${txnId}`, {
    algorithm: "m.megolm.v1.aes-sha2",
    sender_key: identityKeys.curve25519,
    ciphertext: megolmSession.encrypt(JSON.stringify(message)),
    session_id: megolmSession.session_id(),
    device_id: deviceId
  }
);
```

## Reading encrypted messages

To read an encrypted message, a client must first obtain the Megolm session
sent to it, and use that Megolm session to decrypt the message.

### Decrypting with Olm

The Megolm session will be sent in a send-to-device event encrypted using Olm.
This event can be encrypted using either an existing Olm session or a
newly-created one.  So to decrypt the event, the client should first try using
any existing Olm sessions that it has with the sender, and if none of them work
(and the message type is `0`), try creating a new Olm session from the event.
When new Olm sessions are created, clients are not required to keep all the
sessions, but should keep at least the four most-recently-used sessions for
each device.

C++:
```c++
// assume we have the following functions available:
// - get_existing_olm_sessions_for_sender: get the Olm sessions that have already
//   been established with the given sender
// - mark_olm_session_as_successfully_used: mark that the given Olm session was
//   successfully used to decrypt a message (this is needed since encrypting with
//   Olm should use the session that was most recently used, as described in the
//   "Multiple Olm sessions" section)
// - save_olm_session: save a new Olm session
// - get_device_info: get information about a device.  In particular, its
//   curve25519 and ed25519 keys are needed
// - save_inbound_megolm_session: save an inbound megolm session

json to_device_event; // the received send-to-device event

json event_content = to_device_event["content"];

if (to_device_event["type"].get<std::string>() != "m.room.encrypted"
    || event_content["algorithm"].get<std::string>() != "m.olm.v1.curve25519-aes-sha2")) {
  // This is not an Olm-encrypted message.  Handle it somehow else, or ignore it.
}

std::string sender = to_device_event["sender"].get<std::string>();
std::string sender_key = event_content["sender_key"].get<std::string>();

json ciphertext = event_content["ciphertext"];
int message_type = ciphertext["type"].get<int>();
std::string ciphertext_body = ciphertext["body"].get<std::string>();

// try to decrypt using an existing session
auto olm_sessions = get_existing_olm_sessions_for_sender(sender, sender_key);
bool decrypted = false;
std::string plaintext;
for(auto it = olm_sessions.begin(); it != olm_sessions.end(); ++it) {
  OlmSession *session = *it;

  // copy ciphertext because olm_decrypt_* overwrites the buffer
  char *ciphertext_copy = malloc(ciphertext_body.length());
  ciphertext_body.copy(ciphertext_copy, ciphertext_body.length());

  size_t plaintext_length = olm_decrypt_max_plaintext_length(
    session,
    message_type,
    ciphertext_copy, ciphertext_body.length()
  );
  char *plaintext_buf = malloc(plaintext_length);
  ciphertext_body.copy(ciphertext_copy, ciphertext_body.length());
  size_t len = olm_decrypt(
    session,
    message_type,
    ciphertext_copy, ciphertext_body.length(),
    plaintext_buf, plaintext_length
  );

  free(ciphertext_copy);

  if (len != olm_error()) {
    mark_session_as_successfully_used(sender, sender_key, session);
    decrypted = true;
    plaintext = std::string(plaintext_buf, len);
    free(plaintext_buf);
    break;
  }
  free(plaintext_buf);
}

if (!decrypted && message_type == 0) {
  // none of the existing sessions worked, so try creating a new Olm session
  void *session_memory = malloc(olm_session_size());
  OlmSession *session = olm_session(session_memory);

  // copy the ciphertext because olm_create_inbound_session_from will overwrite it
  char *ciphertext_copy = malloc(ciphertext_body.length());
  ciphertext_body.copy(ciphertext_copy, ciphertext_body.length());

  size_t rv = olm_create_inbound_session_from(
    session, account,
    sender_key.data(), sender_key.length(),
    ciphertext_copy, ciphertext_body.length()
  )
  if (rv != olm_error) {
    ciphertext_body.copy(ciphertext_copy, ciphertext_body.length());
    size_t plaintext_length = olm_decrypt_max_plaintext_length(
      session,
      message_type,
      ciphertext_copy, ciphertext_body.length()
    );
    ciphertext_body.copy(ciphertext_copy, ciphertext_body.length());
    char *plaintext_buf = malloc(plaintext_length);
    size_t len = olm_decrypt(
      session,
      message_type,
      ciphertext_copy, ciphertext_body.length(),
      plaintext_buf, plaintext_length
    );
    free(ciphertext_copy);
    if (len != olm_error()) {
      save_olm_session(sender, sender_key, session);
      decrypted = true;
      plaintext = std::string(plaintext_buf, len);
    } else {
      olm_clear_session(session);
      free(session_memory);
    }
    free(plaintext_buf);
  } else {
    olm_clear_session(session);
    free(session_memory);
  }
}

if (!decrypted) {
  // handle error
}

// retrieve the megolm key from the message
json decrypted_event = json::parse(plaintext);

assert(decrypted_event["sender"].get<std::string>() == sender);
auto device_info = get_device_info(sender, decrypted_event["sender_device"].get<std::string>());
assert(device_info.ed25519_key == decrypted_event["keys"]["ed25519"].get<std::string>());
assert(device_info.curve25519_key == sender_key);
assert(decrypted_event["recipient"].get<std::string>() == user_id);
assert(decrypted_event["recipient_keys"]["ed25519"] == identity_keys["ed25519"]);

if (decrypted_event["type"].get<std::string>() == "m.room_key") {
  json decrypted_content = decrypted_event["content"];
  if (decrypted_content["algorithm"].get<std::string>() == "m.megolm.v1.aes-sha2") {
    void *inbound_session_memory = malloc(olm_inbound_group_session_size());
    OlmInboundGroupSession *inbound_session = olm_inbound_group_session(inbound_session_memory);
    std::string session_key = decrypted_content["session_key"].get<std::string>();
    size_t ret = olm_init_inbound_group_session(
      inbound_session,
      session_key.data(), session_key.length()
    );
    if (ret != olm_error()) {
      save_inbound_megolm_session(
        decrypted_content["room_id"].get<std::string>(),
        decrypted_content["session_id"].get<std::string>(),
        inbound_session,
        decrypted_event
      );
    } else {
      olm_clear_inbound_group_session(inbound_session);
      free(inbound_session_memory);
      // handle error
    }
  } else {
    // probably just ignore, maybe log that an unknown algorithm was used
  }
} else {
  // handle other event types
}
```

JavaScript:
```javascript
// assume we have have the following functions available:
// - getExistingOlmSessionsForSender: get the Olm sessions that have already
//   been established with the given sender
// - markOlmSessionAsSuccessfullyUsed: mark that the given Olm session was
//   successfully used to decrypt a message (this is needed since encrypting with
//   Olm should use the session that was most recently used, as described in the
//   "Multiple Olm sessions" section)
// - saveOlmSession: save a new Olm session
// - getDeviceInfo: get information about a device.  In particular, its
//   curve25519 and ed25519 keys are needed
// - saveInboundMegolmSession: save an inbound megolm session
//
// Note that due to the limited memory available to the JavaScript Olm bindings,
// the Old and Megolm sessions should be stored in pickled form and unpickled
// when needed, rather than keeping the objects in memory.  This means that some
// of the code below will need to be modified to, for example, free session
// objects after they are used.

const toDeviceEvent; // the received send-to-device event

const eventContent = toDeviceEvent.content;

if (toDeviceEvent.type != "m.room.encrypted"
    || eventContent.algorithm != "m.olm.v1.curve25519-aes-sha2") {
  // This is not an Olm-encrypted message.  Handle it somehow else, or ignore it.
}

const sender = toDeviceEvent.sender;
const senderKey = eventContent.sender_key;

const ciphertext = eventContent.ciphertext;
const messageType = ciphertext.type;
const ciphertextBody = ciphertext.body;

// try to decrypt using an existing session
const olmSessions = getExistingOlmSessionsForSender(sender, senderKey);
let decrypted = false;
let plaintext;
for(const session of olmSessions) {
  try {
    plaintext = session.decrypt(messageType, ciphertextBody);
    markOlmSessionAsSuccessfullyUsed(session);
    break;
  } catch (e) {
    // if the decryption failed, do nothing -- we'll just try the next session
  }
}

if (!decrypted && messageType == 0) {
  // none of the existing sessions worked, so try creating a new Olm session
  const session = new global.Olm.Session();
  session.create_inbound_from(account, senderKey, ciphertextBody);
  saveOlmSession(sender, senderKey, session);
}

// retrieve the megolm key from the message
const decryptedEvent = JSON.parse(plaintext);
const deviceInfo = getDeviceInfo(sender, decryptedEvent.sender_device);
if (decryptedEvent.sender !== sender
    || deviceInfo.ed25519Key !== decryptedEvent.keys.ed25519
    || deviceInfo.curve25519Key !== senderKey
    || decryptedEvent.recipient !== userId
    || decryptedEvent.recipient_keys.ed25519 !== identityKeys.ed25519) {
    throw new Error("Decrypted event does not have the right format");
}

switch (decryptedEvent.type) {
  case "m.room_key":
    switch (decryptedContent.algorithm) {
      case "m.megolm.v1.aes-sha2":
        {
          const inboundSession = new global.Olm.InboundGroupSession();
          try {
            inboundSession.create(decryptedContent.session_key);
            saveInboundMegolmSession(
              decryptedContent.room_id, decryptedContent.session_id,
              inboundSession, decryptedEvent
            );
          } catch (e) {
            inboundSession.free();
          }
        }
        break;

      default:
        // probably just ignore, maybe log that an unknown algorithm was used
    }
    break;

  default:
    // handle other event types
}
```

### Decrypting with Megolm

## Encrypted attachments

## Requesting and forwarding keys

## Corrupted Olm sessions
