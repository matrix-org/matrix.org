+++
title = "Low Bandwidth Matrix: An implementation guide"
date = "2021-06-10T17:08:54Z"
updated = "2021-06-10T11:28:12Z"
path = "/blog/2021/06/10/low-bandwidth-matrix-an-implementation-guide"

[taxonomies]
author = ["Kegan Dougal"]
category = ["Tutorials"]
+++

*Disclaimer: Low bandwidth Matrix is experimental, not yet standardised, and subject to change without notice.*

This guide is for Matrix developers who want to support
[MSC3079: Low Bandwidth CS API](https://github.com/matrix-org/matrix-doc/pull/3079) in their
clients/servers. Please read the experimental MSC if you want to learn more about what is happening
at a protocol level. If you want a high level overview of low bandwidth Matrix and why you should
care, watch the [12 minute demo on Matrix Live](http://www.youtube.com/watch?v=_E-J6Hk2dYs&t=14m14s).

Matrix currently uses HTTP APIs with JSON data to communicate from the client to the server. This is
widely supported but is not very bandwidth efficient. This means that the protocol is slower, more
costly and less able to be used on low bandwidth links (e.g 2G networks) which are common in certain
parts of the world. MSC3079 defines a low bandwidth protocol using CoAP and CBOR instead of HTTP and
JSON respectively. In the future homeservers will natively support some form of low bandwidth
protocol. However, at present, no homeserver natively supports MSC3079. Therefore, this guide will
set up a low bandwidth proxy server which can be put in front of any Matrix homeserver
(Synapse, Dendrite, Conduit, etc) to make it MSC3079-compatible. This guide will also configure an
Android device to speak MSC3079.

Low bandwidth Matrix currently does not support web browsers due to their inability to send UDP
traffic. You do *not* need to be running a homeserver to follow this tutorial.

## Setting up a low bandwidth proxy for your homeserver

Prerequisites:

- Go 1.13+
- `openssl` to generate a self-signed DTLS certificate, or an existing certificate you want to use.
- Linux or Mac user

Steps:

- Clone the repo: `git clone https://github.com/matrix-org/lb.git`
- Build the low bandwidth proxy: `go build ./cmd/proxy`
- Generate a elliptic curve DTLS key/certificate: (we use curve keys as they are smaller than RSA
  keys, but both work.)

  ```bash
  openssl ecparam -name prime256v1 -genkey -noout -out private-key.pem
  openssl req -new -x509 -key private-key.pem -out cert.pem -days 365
  # you now have cert.pem and private-key.pem
  ```

- Run it pointing at matrix.org:

  ```bash
  ./proxy -local 'https://matrix-client.matrix.org' \
  --tls-cert cert.pem --tls-key private-key.pem \
  --advertise "http://127.0.0.1:8008" \
  --dtls-bind-addr :8008
  ```

- You should see something like this:

  ```txt
  INFO[0000] Listening on :8008/tcp to reverse proxy from http://127.0.0.1:8008 to https://matrix-client.matrix.org - HTTPS enabled: false 
  INFO[0000] Listening for DTLS on :8008 - ACK piggyback period: 5s
  ```

Mac users: If you are having trouble generating EC certificates, make sure you are using OpenSSL and
not LibreSSL which comes by default: `openssl version`. To use OpenSSL, `brew install openssl` which
then dumps the binary to `/usr/local/opt/openssl/bin/openssl`.

To test it is working correctly:

```bash
# build command line tools we can use to act as a low bandwidth client
go build ./cmd/jc
go build ./cmd/coap

# do a CoAP GET request to matrix.org via the proxy
./coap -X GET -k 'http://localhost:8008/_matrix/client/versions' | ./jc -c2j '-'

{"unstable_features":{"io.element.e2ee_forced.private":false,"io.element.e2ee_forced.public":false,"io.element.e2ee_forced.trusted_private":false,"org.matrix.e2e_cross_signing":true,"org.matrix.label_based_filtering":true,"org.matrix.msc2432":true,"org.matrix.msc3026.busy_presence":false,"uk.half-shot.msc2666":true},"versions":["r0.0.1","r0.1.0","r0.2.0","r0.3.0","r0.4.0","r0.5.0","r0.6.0"]}
```

If this doesn't work:

- Check the proxy logs for errors (e.g bad hostname)
- Try adding `-v` to `./coap` (e.g bad method or path)
- Run the proxy with `SSLKEYLOGFILE=ssl.log` and inspect the decrypted traffic using Wireshark.

Otherwise, congratulations! You now have a low bandwidth proxy! You can connect to your proxy just
like you would to matrix.org or any other homeserver.

### Security considerations

- The proxy acts as a man in the middle and can read all non-E2EE traffic, including login
  credentials. DO NOT USE UNTRUSTED LOW BANDWIDTH PROXY SERVERS. Only use proxy servers run by
  yourself or the homeserver admins.

### Further reading

- The `proxy` [README](https://github.com/matrix-org/lb/tree/main/cmd/proxy)
- `coap` [README](https://github.com/matrix-org/lb/tree/main/cmd/coap) and `jc`
  [README](https://github.com/matrix-org/lb/tree/main/cmd/jc)

## Setting up a custom Element Android

We'll add low bandwidth matrix to Element Android and iOS by default once it's standardised - but
while things are still experimental, here's a guide for how to build Element Android to do it
yourself if you feel the urge.  This can be used as inspiration for other Matrix clients too.

Prerequisites:

- Android Studio

Steps:

- Clone the repo: `git clone https://github.com/vector-im/element-android.git`
- Checkout `kegan/lb`: `git checkout kegan/lb`. This branch replaces all HTTP traffic going to
   `/_matrix/client/*` with LB traffic. `/_matrix/media` traffic is left untouched. This branch also
   disables TLS checks entirely so self-signed certificates will work.
- Clone the low bandwidth repo if you haven't already:
   `git clone https://github.com/matrix-org/lb.git`
- In the low bandwidth repo, build the mobile bindings:

   ```bash
   go get golang.org/x/mobile/cmd/gomobile
   cd mobile
   # if gomobile isn't on your path, then ~/go/bin/gomobile
   gomobile bind -target=android
   ```

- Copy the output files to a directory in the Element Android repo which Gradle will pick up:

   ```bash
   mkdir $PATH_TO_ELEMENT_ANDROID_REPO/matrix-sdk-android/libs
   cp mobile-sources.jar $PATH_TO_ELEMENT_ANDROID_REPO/matrix-sdk-android/libs
   cp mobile.aar $PATH_TO_ELEMENT_ANDROID_REPO/matrix-sdk-android/libs
   ```

- Open the project in Android Studio.
- Build and run on a device/emulator.
- Configure the proxy's `--advertise` address. If you are running on a local device, restart the
   proxy with an `--advertise` of your machines LAN IP e.g 192.168.1.2 instead of 127.0.0.1.
   If you are running on an emulator, restart the proxy with an `--advertise` of the
   [host IP](https://developer.android.com/studio/run/emulator-networking#networkaddresses):
   10.0.2.2. The URL scheme should be `https` not `http`, else image loading won't work as Element
   Android won't download media over `http`.
- Login to your matrix.org account via the proxy with the `--advertise` address as the HS URL
   e.g `https://192.168.1.2:8008` or `https://10.0.2.2:8008`. The port is important.

To verify it is running via low bandwidth:

- Install Wireshark.
- Restart the proxy with the environment variable `SSLKEYLOGFILE=ssl.log`.
- Run tcpdump on the right interface e.g: `sudo tcpdump -i en0 -s 0 -v port 8008 -w lb.pcap`
- Force stop the android app to forcibly close any existing DTLS connections.
- Re-open the app.
- Open `lb.pcap` in Wireshark and set `ssl.log` as the Pre-Master Secret log filename via
   Preferences -> Protocols -> TLS -> Pre-Master Secret log filename.
- Check there is DTLS/CoAP traffic.

## Performance

To send a single 'Hello World' message to `/room/$room_id/send/m.room.message/$txn_id`
and receive the response, including connection setup:

| Protocol | Num packets | Total bytes |
|----------|-------------|-------------|
| HTTP2+JSON | 43 | 6533 |
| CoAP+CBOR | 6 | 1440 |

## Limitations

- CoAP [OBSERVE](https://datatracker.ietf.org/doc/html/rfc7641) is not enabled by default.
  This extension allows the server to push data to the client so the client doesn't need to
  long-poll. It is not yet enabled because of the risk of state synchronisation issues between the
  proxy and the client. If the proxy gets restarted, the client will not receive sync updates
  until it refreshes its subscription, which happens infrequently. During this time the client
  is not aware that anything is wrong.
- CoAP uses [Blockwise Transfer](https://datatracker.ietf.org/doc/html/rfc7959) to download
  large responses. Each block must be ACKed before the next block can be sent. This is less
  efficient than TCP which has a Receive Window which allows multiple in-flight packets at
  once. This means CoAP is worse at downloading large responses, requiring more round trips
  to completely send the data.
- The current version of `/sync` sends back much more data than is strictly necessary. This
  means the initial sync can be slower than expected. On a low kbps link this can flood the
  network with so much data that the sync stream begins to fall behind. Future work will look
  to optimise the sync API.
- The proxy currently doesn't implement the [low bandwidth response](https://github.com/matrix-org/matrix-doc/blob/kegan/low-bandwidth/proposals/3079-low-bandwidth-csapi.md#versioning) in `/versions`.
