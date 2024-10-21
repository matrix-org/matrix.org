+++
title = "How can I get involved?"
aliases = ["/docs/guides/getting-involved"] 
+++

Matrix is an ecosystem consisting of several apps written by lots of people. We
at Matrix.org have written one server and a few clients, and people in the
community have also written several clients, servers, and Application Services.
We are collecting [a list of all known Matrix-apps](/try-matrix).

You have a few options when it comes to getting involved: if you just want to
use Matrix, you can [register an account on a public server using a public web
client](/try-matrix). If you have a virtual private server (VPS) or similar, you
might want to [run a server](/ecosystem/servers) and/or
[run a client yourself](/ecosystem/clients). If you want to look under the
hood, you can checkout the code of existing implementations and modify them -
or write your own client or server. Or you can write an
[Application Service](/ecosystem/sdks), for example a bridge to an existing
ecosystem.

We very much welcome
[contributions](https://github.com/matrix-org/synapse/blob/master/CONTRIBUTING.md)
to any of our projects, which you can find in our
[github space](https://github.com/matrix-org/).

## Access Matrix via a public web client/server

The easiest thing to do if you want to just have a play, is to use the
[Element Web client](https://app.element.io/). You can use it as a guest, or
register for an account. For details of other clients, see
[Try Matrix](/try-matrix).

## Run a server and/or client yourself

You can clone our open source projects and run clients and servers yourself.
Here is how:

### Running your own client

You can run your own Matrix client; there are
[numerous clients available](/ecosystem/clients). You can easily
[run your own copy](https://github.com/vector-im/element-web#getting-started)
of the Element Web client.

### Running your own homeserver

One of the core features of Matrix is that anyone can run a homeserver and join
the federated network on equal terms (there is no hierarchy). If you want to
set up your own homeserver, please see the relevant docs of the server you want
to run. If you want to run Matrix.org's reference homeserver, please consult
the
[readme of the Synapse project](https://github.com/matrix-org/synapse/blob/master/README.rst).

## Checkout our code - or write your own

All the code that we at Matrix.org write is available from
[our github](https://github.com/matrix-org) - and other servers and clients may
also be open sourced - see [our list of all known Matrix-apps](/ecosystem).

You can also implement your own client or server - after all, Matrix is at its
core "just" a specification of a protocol.

### Write your own client

The
[client-server API spec](https://matrix.org/docs/spec/client_server/latest.html)
describes what API calls are available to clients, and there is a [HOWTO
guide](https://matrix.org/docs/guides/client-server.html) which provides an
introduction to using the API along with some common operations. A quick
step-by-step guide would include:

1. Get a user either by registering your user in an existing client or running
   the [new-user script](https://github.com/matrix-org/synapse/blob/master/scripts/register_new_matrix_user)
   if you are running your own Synapse homeserver.

2. Assuming the homeserver you are using allows logins by password, log in via the login API:

   ```bash
   curl -XPOST -d '{"type":"m.login.password", "user":"example", "password":"wordpass"}' \
   "http://localhost:8008/_matrix/client/api/v1/login"
   ```

3. If successful, this returns the following, including an `access_token`:

   ```json
   {
       "access_token": "QGV4YW1wbGU6bG9jYWxob3N0.vRDLTgxefmKWQEtgGd",
       "home_server": "localhost",
       "user_id": "@example:localhost"
   }
   ```

4. This `access_token` will be used for authentication for the rest of your API
   calls. Potentially the next step you want is to make a call to the sync API and
   get the last few events from each room your user is in:

   ```bash
   curl -XGET "http://localhost:8008/_matrix/client/r0/sync?access_token=YOUR_ACCESS_TOKEN"
   ```

5. The above will return something like this:

   ```json
   {
       "next_batch": "s72595_4483_1934",
       "rooms": {
           "join": {
               "!726s6s6q:example.com": {
                   "state": {
                       "events": [
                           ...
                       ]
                   },
                   "timeline": {
                       "events": [
                           ...
                       ]
                   }
               },
               ...
           }
       }
   }
   ```

   You can then use the "next_batch" token to start listening for new events like
   so:

   ```bash
   curl -XGET "http://localhost:8008/_matrix/client/r0/sync?access_token=YOUR_ACCESS_TOKEN&since=s72595_4483_1934"
   ```

6. This request will block waiting for an incoming event, timing out after
   several seconds if there is no event. This ensures that you only get new
   events. Now you have the initial room states, and a stream of events - a good
   client should be able to process all these events and present them to the user.
   And potentially you might want to add functionality to generate events as well
   (such as messages from the user, for example)!

### Write your own server

We are still working on the server-server spec, so the best thing to do if you
are interested in writing a server,
is to come talk to us in [#matrix:matrix.org](https://matrix.to/#/#matrix:matrix.org).

If you are interested in how federation works, please see the [Server-Server
API spec](https://matrix.org/docs/spec/server_server/latest.html).

## Write an Application Service

Information about Application services and how they can be used can be found in
the [Application services](/docs/legacy/application-services) document!
(This is based on Kegan's excellent blog posts, but now lives here so it can be
kept up-to-date!)
