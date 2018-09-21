---
layout: post
categories: guides
---

<style>
ul {
    list-style: circle;
    margin-left: 30px;
}
p {
    padding-bottom: 1em;
    line-height: 1.7em;
}
h2 {
    margin-bottom: 15px;
    margin-top: 30px;
}

</style>

# Usage of the matrix-js-sdk

Let's explore how we would make a very simple Matrix client, with only the ability to perform an initial sync, and to get member lists and the timeline for rooms of our choice.

This article will explore the [Matrix Client-Server API], making use of the [matrix-js-sdk]. Later articles may discuss making the underlying calls. Specifically we will cover:

* login
* simple syncing
* listening for timeline events
* access the `MatrixInMemoryStore`
* sending messages to rooms

We'll use Node.js as our environment, though the [matrix-js-sdk] can also be used directly in the browser.

## Let's write JavaScript

The first thing to do is install the [matrix-js-sdk] from NPM:

```unix
npm install matrix-js-sdk
```

We include the SDK in our source exactly as expected:

```javascript
var sdk = require("matrix-js-sdk");
```

## Login with an access token

Instantiate a new client object and use an `access token` to login:

```javascript
var client = sdk.createClient({
    baseUrl: "https://matrix.org",
    accessToken: "....MDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2Vu....",
    userId: "@USERID:matrix.org"
});
// note that we use the full MXID for the userId value
```

If you are logged into Riot, you can find an `access token` for the logged-in user on the Settings page.

We can also retrieve an `access token` programmatically using the API:

```javascript
var client = sdk.createClient("https://matrix.org");
client.login("m.login.password", {"user": "USERID", "password":"hunter2"}, function(err, response){
    console.log(response.access_token);
});
```

In any case, once logged in either with a password or an access token, the client can get the current access token via:

```javascript
console.log(client.getAccessToken());
```

## Sync and Listen

Let's perform a first sync, and listen for the response:

```javascript
client.once('sync', function(state, prevState, res) {
    //console.log(res);
    if(state === 'PREPARED') {
        console.log("prepared");
    } else {
        console.log(state);
        process.exit(1);
    }
});
```

Once the sync is complete, we can add listeners for events. To listen to ALL incoming events:

```javascript
client.on("event", function(event){
    console.log(event.getType());
    console.log(event);
})
```

But that would be a lot of traffic, and too much for our simple example. Let's just listen to events happening on the timeline of rooms for which our user is a member:

```javascript
client.on("Room.timeline", function(event, room, toStartOfTimeline) {
    console.log(event.event);
});
```

## Access the Store

When we created a new client with `sdk.createClient()`, an instance of the default store, `MatrixInMemoryStore` was created and enabled.

To access it, we use `client.store`. For example, to get a list of rooms in which our user is joined:

```javascript
// client.store.rooms is an object with room IDs as property keys
var roomIds = Object.keys(client.store.rooms);
roomIds.forEach(roomId => {
    console.log(roomId);
});
```

More usefully, we could get a list of members for each of these rooms:

```javascript
var roomIds = Object.keys(client.store.rooms);
roomIds.forEach(roomId => {
    var members = client.store.rooms[roomId].getJoinedMembers();
    members.forEach(member => {
        console.log(member.name);
    });
});
```

For each room, we can inspect the timeline in the store:

```javascript
var roomIds = Object.keys(client.store.rooms);
roomIds.forEach(roomId => {
    client.store.rooms[roomId].timeline.forEach(t => {
        console.log(JSON.stringify(t.event.content));
    });
});
```

## Send messages to rooms

To send a message, we create a content object, and specify a room to send to:

```javascript
var content = {
    "body": "Hello World",
    "msgtype": "m.text"
};

client.sendEvent("!jhpZBTbckszblMYjMK:matrix.org", "m.room.message", content, "", (err, res) => {
    console.log(err);
});
```

Knowing this, we can build a bot which just echos back any message starting with a "!"

```javascript
var testRoomId = "!jhpZBTbckszblMYjMK:matrix.org";

client.on("Room.timeline", function(event, room, toStartOfTimeline) {
    // we know we only want to respond to messages
    if (event.getType() !== "m.room.message") {
        return;
    }

    // we are only intested in messages from the test room, which start with "!"
    if (event.event.room_id === testRoomId && event.event.content.body[0] === '!') {
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

## Further

There is much, much more to Matrix, the Client-Server API and the [matrix-js-sdk], but this guide should give some understanding of simple usage. We'll cover more detail in subsequent guides, but for now you can take a look at [other examples in the matrix-js-sdk itself](https://github.com/matrix-org/matrix-js-sdk/tree/master/examples), and also the [Matrix Client-Server API] which it implements.

[Matrix Client-Server API]: https://matrix.org/docs/spec/client_server/latest.html
[matrix-js-sdk]: https://github.com/matrix-org/matrix-js-sdk/