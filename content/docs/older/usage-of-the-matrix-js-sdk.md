+++
title = "Usage of the matrix-js-sdk"
aliases = ["/docs/guides/usage-of-the-matrix-js-sdk"]
+++

Matrix allows open real-time communications over the Internet using HTTP and
JSON. This makes developing clients to connect to Matrix servers really easy!
Because it's open, and uses simple syntax for messages, you can connect Matrix
to anything that communicates over a standard HTTP interface - later projects
in this series will explore ideas such as building bots, performing machine
learning on message content, and connecting IoT devices such as Philips Hue
lights.

## Making a Matrix Client

Let's explore how we would make a very simple Matrix client, with only the
ability to perform an initial sync, and to get member lists and the timeline
for rooms of our choice.

This article will explore the Matrix Client-Server API, making use of the
matrix-js-sdk. Later articles may discuss making the underlying calls.
Specifically we will cover:

* login
* simple syncing
* listening for timeline events
* access the `MatrixInMemoryStore`
* sending messages to rooms
* how to respond to specific messages, as a bot would

We'll use Node.js as our environment, though the [matrix-js-sdk] can also be
used directly in the browser.

Before we start, make sure you have Node.js and NPM installed: follow
instructions at [nodejs.org](https://nodejs.org/) for your platform. Then
create a new directory to work in:

```bash
mkdir my-first-matrix-client
cd my-first-matrix-client
```

## Let's write JavaScript

Once you're ready, the first thing to do is install the matrix-js-sdk from
NPM:

```bash
npm install matrix-js-sdk
```

We include the SDK in our source exactly as expected:

```javascript
import sdk from 'matrix-js-sdk';
```

## Login with an access token

Instantiate a new client object and use an `access token` to login:

```javascript
const client = sdk.createClient({
    baseUrl: "https://matrix.org",
    accessToken: "....MDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2Vu....",
    userId: "@USERID:matrix.org"
});
// note that we use the full MXID for the userId value
```

If you are logged into Element, you can find an `access token` for the logged-in
user on the Settings page.

If the homeserver you're logging in to supports logging in with a password, you
can also retrieve an `access token` programmatically using the API. To do this,
create a new `client` with no authentication parameters, then call
`client.login()` with `"m.login.password"`:

```javascript
const client = sdk.createClient("https://matrix.org");
client.login("m.login.password", {"user": "USERID", "password": "hunter2"}).then((response) => {
    console.log(response.access_token);
});
```

In any case, once logged in either with a password or an access token, the
client can get the current access token via:

```javascript
console.log(client.getAccessToken());
```

**Note:** it is essential to keep this access token safe, as it allows complete
  access to your Matrix account!

## Sync and Listen

Next we start the client, this sets up the connection to the server and allows
us to begin syncing:

```javascript
client.startClient();
```

Perform a first sync, and listen for the response, to get the latest state from
the homeserver:

```javascript
client.once('sync', function(state, prevState, res) {
    console.log(state); // state will be 'PREPARED' when the client is ready to use
});
```

Once the sync is complete, we can add listeners for events. We could listen to
ALL incoming events, but that would be a lot of traffic, and too much for our
simple example. If you want to listen to all events, you can add a listen as
follows:

```javascript
client.on("event", function(event){
    console.log(event.getType());
    console.log(event);
})
```

Instead, let's just listen to events happening on the timeline of rooms for
which our user is a member:

```javascript
client.on("Room.timeline", function(event, room, toStartOfTimeline) {
    console.log(event.event);
});
```

## Access the Store

When we created a new client with `sdk.createClient()`, an instance of the
default store, `MatrixInMemoryStore` was created and enabled. When we sync, or
instruct otherwise our client to fetch data, the data is automatically added to
the store.

To access the store, we use accessor methods. For example, to get a list of
rooms in which our user is joined:

```javascript
// client.client.getRooms() returns an array of room objects
var rooms = client.getRooms();
rooms.forEach(room => {
    console.log(room.roomId);
});
```

More usefully, we could get a list of members for each of these rooms:

```javascript
var rooms = client.getRooms();
rooms.forEach(room => {
    var members = room.getJoinedMembers();
    members.forEach(member => {
        console.log(member.name);
    });
});
```

For each room, we can inspect the timeline in the store:

```javascript
var rooms = client.getRooms();
rooms.forEach(room => {
    room.timeline.forEach(t => {
        console.log(JSON.stringify(t.event.content));
    });
});
```

## Send messages to rooms

To send a message, we create a content object, and specify a room to send to. In
this case, I've taken the room ID of `#test:matrix.org`, and used it as an
example:

```javascript
var testRoomId = "!jhpZBTbckszblMYjMK:matrix.org";

var content = {
    "body": "Hello World",
    "msgtype": "m.text"
};

client.sendEvent(testRoomId, "m.room.message", content, "").then((res) => {
   // message sent successfully
}).catch((err) => {
    console.log(err);
}
```

Knowing this, we can put together message listening and message sending, to
build a bot which just echos back any message starting with a "!":

```javascript
var testRoomId = "!jhpZBTbckszblMYjMK:matrix.org";

client.on("Room.timeline", function(event, room, toStartOfTimeline) {
    // we know we only want to respond to messages
    if (event.getType() !== "m.room.message") {
        return;
    }

    // we are only interested in messages from the test room, which starts with "!"
    if (event.getRoomId() === testRoomId && event.getContent().body[0] === '!') {
        sendNotice(event.event.content.body);
    }
});

function sendNotice(body) {
    var content = {
        "body": body.substring(1),
        "msgtype": "m.notice"
    };
    client.sendEvent(testRoomId, "m.room.message", content, "", (err, res) => {
        console.log(err);
    });
}
```

Take a look at the `msgtype` in the object above. In the previous example, we
used "m.text" for this field, but now we're using "m.notice". Bots will often
use "m.notice" to differentiate their messages. This allows the client to
render notices differently, for example Element, the most popular client,
renders notices with a more pale text colour.

## Further

There is much, much more to Matrix, the Client-Server API and the matrix-js-sdk,
but this guide should give some understanding of simple usage. In subsequent
guides we'll cover more detail and also explore projects you can build on top,
such as IoT controls and chatbot interfaces. For now you can take a look at
[other examples in the matrix-js-sdk itself](https://github.com/matrix-org/matrix-js-sdk/tree/master/examples), and also
the Matrix Client-Server API which it implements.
