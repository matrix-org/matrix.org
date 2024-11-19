+++
title = "Usage of matrix-bot-sdk"
aliases = ["/docs/guides/usage-of-matrix-bot-sdk"]
extra.new_doc = "https://turt2live.github.io/matrix-bot-sdk/index.html"
+++

This article concerns [matrix-bot-sdk], a TypeScript client SDK for Matrix.
We'll build a simple "echo bot", meaning a bot which replies to messages with
the text it has just read.

Note that although the SDK is written in TypeScript, we'll use JavaScript in our
examples. If you'd prefer to use TypeScript, then do!

## Setup

Let's make a new folder, and import our only npm dependency. The following
examples are all meant to be run in a bash terminal.

```bash
mkdir matrix-js-echo-bot
cd matrix-js-echo-bot
npm install matrix-bot-sdk
```

Create a new file named "index.js", and let's get started.

## Instantiation

In our js file, start by importing the minimum we'll need for this example:

```javascript
const sdk = require("matrix-bot-sdk");
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;
```

Create a new account for your bot on a homeserver, then get the `access_token`.
The simplest way to do this is using Element, [take a look at these
instructions](https://t2bot.io/docs/access_tokens/). Set some variables to
store the homeserver and `access_token`. This is all the authentication you
need!

```javascript
const homeserverUrl = "https://matrix.org"; // make sure to update this with your url
const accessToken = "YourSecretAccessToken";
```

Now we'll configure a storage provider - matrix-bot-sdk provides the
`SimpleFsStorageProvider`, which is ideal for most cases:

```javascript
const storage = new SimpleFsStorageProvider("bot.json");
```

When the bot starts, the SDK will create a a new file called "bot.json" to store
the data it needs.

Finally we're ready to start the client! As you'd expect, we'll use the
variables we've already specified.

```javascript
const client = new MatrixClient(homeserverUrl, accessToken, storage);
```

There is one more thing we need to do. We'll include a mixin which instructs the
bot to auto-accept any room invite it receives. This makes testing much more
convenient.

```javascript
AutojoinRoomsMixin.setupOnClient(client);
```

Finally, let's start the Client:

```javascript
client.start().then(() => console.log("Client started!"));
```

If you're keeping up, your code should look something like:

```javascript
import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin
} from "matrix-bot-sdk";

const homeserverUrl = "https://matrix.org"; // make sure to update this with your url
const accessToken = "YourSecretAccessToken";
const storage = new SimpleFsStorageProvider("bot.json");

const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

client.start().then(() => console.log("Client started!"));
```

Let's run it:

```bash
node index.js
```

This should now join and sit idle, but join any room you invite the bot to.

## /sync loop

Right now, while it's just listening to invites and nothing else, what is the
bot actually doing? It's calling the `/sync` endpoint in a loop. Calling this
endpoint returns all new events since some previous point.

Leave the script running and open `bot.json`, which is the file we specified for
storage. This file contains a field `syncToken`, which is being occasionally
updated - the SDK uses this field to give a token to the homeserver, which uses
it to know which events to send back.

## Receiving and Sending events

In order to echo messages, our bot must first be able to read them. The
`client.on()` method of our MatrixClient takes two arguments: one for the event
type, one for a callback to handle the event:

```javascript
client.on("room.message", (roomId, event) => {
    if (! event["content"]) return;
    const sender = event["sender"];
    const body = event["content"]["body"];
    console.log(`${roomId}: ${sender} says '${body}`);
});
```

This way we can inspect the contents of an event and render them. We
choose to exit early in the case that `event["content"]` is empty because this
will usually mean the message was redacted.

To send a message, we use the `client.sendMessage()` method. This takes two
arguments: the roomId, and a JSON object containing the contents of the message
to send, for example:

```javascript
client.sendMessage(roomId, {
    "msgtype": "m.text",
    "body": "This is message text.",
});
```

Note, it's also possible to use `client.sendText()` to achieve the same result,
as in

```javascript
client.sendText(roomId, "This is message text.")
```

The reason for showing `client.sendMessage()` is to make it clear that the
message format is [just the same as you'd find in the spec](https://matrix.org/docs/spec/client_server/latest#put-matrix-client-r0-rooms-roomid-send-eventtype-txnid).

## Implementing echobot functionality

To work, an echobot needs only to listen for incoming messages, read the message
text, and use it to reply. Let's demonstrate that now.

* Read the message as in the example above
* Inspect the body text, if it starts with "!echo", send back the remaining
  text
* Strip out the "!echo" tag
* Send a message containing the result

```javascript
client.on("room.message", (roomId, event) => {
    if (! event["content"]) return;
    const sender = event["sender"];
    const body = event["content"]["body"];
    console.log(`${roomId}: ${sender} says '${body}`);

    if (body.startsWith("!echo")) {
        const replyText = body.substring("!echo".length).trim();
        client.sendMessage(roomId, {
            "msgtype": "m.notice",
            "body": replyText,
        });
    }
});
```

## Conclusion

It's extremely simple to listen to messages with [matrix-bot-sdk] create an
echobot! There are many more features, you can see the MatrixClient class is
[very well documented](https://github.com/turt2live/matrix-bot-sdk/blob/master/src/MatrixClient.ts).
Next in this series, we'll explore Rich Replies, and take a look at the kick
and ban functions for room administration.

[matrix-bot-sdk]: https://github.com/turt2live/matrix-bot-sdk

## PS, use TypeScript

This SDK uses TypeScript, which provides a lot of benefits. In this example, we
used JavaScript, but it's just as easy to use TypeScript and maybe preferable,
since it is the language [matrix-bot-sdk] is written in.

First let's install `tsc`, which compiles from TypeScript to JavaScript:

```bash
npm install typescript
```

Now, start tsc in watch-mode (`-w`), and leave it to compile our code:

```bash
npx tsc --watch *.ts
```

Now, whenever we create a new TypeScript (`.ts`) file, it will be automatically
watched and compiled to JavaScript.

When you have your .js file(s), you can run them with `node <filename>` as
normal.
