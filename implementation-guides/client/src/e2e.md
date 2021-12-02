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
assumes that libolm is used, and gives code examples in C++ and Javascript
(TODO: and Python).

When using libolm directly, you will need to allocate the necessary buffers,
and provide the necessary randomness in the form of byte arrays of the
appropriate size filled with random values. Functions are provided to indicate
the required sizes for buffers and random arrays. Random arrays must also be
cleared after they are used. Bindings for other languages will often hide such
details.

Many functions will return the value given by `olm_error()` if an error
occurs. The error can be checked by calling `olm_*_last_error` (which returns a
string), or `olm_*_last_error_code` (which returns a numeric code). Bindings
may do something similar, or may use native error-handling techniques such as
throwing an exception.

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
  [another-json](https://www.npmjs.com/package/another-json) in JavaScript; in
  the C++, we will assume that there is a function called `canonical_json` that
  does this),
- an AES-CTR implementation (for encrypted attachments), and
- a way to make HTTP requests to the homeserver (in the examples, we assume
  that there is a function called `request(method, endpoint, body)` that does
  this).

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
void *account_memory = malloc(olm_account_size());
OlmAccount *account = olm_account(account_memory);
void create_account_random_length = olm_create_account_random_length(account);
void *create_account_random = malloc(create_account_random_length);
fill_with_random(create_account_random, create_account_random_length);
size_t ret = olm_create_account(account, create_account_random, create_account_random_length);
memset(create_account_random, 0, create_account_random_length);
free(create_account_random);
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
void *key;

size_t pickle_length = olm_pickle_account_length(account);
void *pickle = malloc(pickle_length);
if (olm_pickle_account(account, key, key_length, pickle, pickle_length) == olm_error()) {
  // handle error
}

// store the pickle, and then

free(pickle);

// if the application is done using the account, then it should
olm_clear_account(account); // clear the memory (so that private keys aren't left around)
free(account_memory);


// To unpickle the account:

// use the same pickle key that was used when pickling the account
size_t key_length;
void *key;

// load the pickle
size_t pickle_length;
void *pickle;

void *account_memory = malloc(olm_account_size());
OlmAccount *account = olm_account(account_memory);
if (olm_unpickle_account(account, key, key_length, pickle, pickle_length) == olm_error()) {
  // handle error
}
free(pickle);

// account can now be use as before
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
then added to the JSON object, and it is uploaded to the server using the
[`POST
/keys/upload`](https://spec.matrix.org/v1.1/client-server-api/#post_matrixclientv3keysupload)
endpoint.

C++:
```c++
// assuming that the user ID is stored in a variable named "user_id", and the
// device ID is stored in a variable named "device_id":

size_t identity_keys_length = olm_account_identity_keys_length(account);
void *identity_keys_buf = malloc(identity_keys_length + 1);
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
  void* otk_buffer = malloc(otk_length + 1);
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
    void *otk_random = malloc(otk_random_length);
    fill_with_random(otk_random, otk_random_length);
    size_t ret = olm_account_generate_one_time_keys(
      account, keys_to_generate, otk_random, otk_random_length
    );
    if (ret == olm_error()) {
      // handle error
    }
    memset(otk_random, 0, otk_random_length);
    free(otk_random);

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
  http_request("POST", "/keys/upload", { one_time_keys: signedOtks });
}
```

### Uploading a fallback key

TODO:

## Enabling encryption in a room

## Sending an encrypted message

### Establishing an Olm session with all devices in a room

#### Tracking device changes

#### Creating a new Olm session

### Creating a Megolm session (if necessary)

### Sending the Megolm key to each device

### Encrypting and the room message

## Reading encrypted messages

### Decrypting with Olm

### Decrypting with Megolm

## Encrypted attachments

## Requesting and sharing keys
