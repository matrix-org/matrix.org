+++
title = "matrix-bot-sdk Room Admin Features"
aliases = ["/docs/guides/matrix-bot-sdk-room-admin-features"]
extra.new_doc = "https://turt2live.github.io/matrix-bot-sdk/index.html"
+++

## Intro

[matrix-bot-sdk] has features which enable bots to perform administration of
Matrix roooms - tasks like kicking, banning and inviting users. Of course, the
bot must have the appropriate permissions for the room in order for this to
work.

You should read [Usage of matrix-bot-sdk] for a more fundamental introduction to
the SDK.

## Kicking

Kicking a user means that user is removed from the room by force, but is not
banned - so they are able to re-join.

Once you have your client object running (see
[usage-of-matrix-bot-sdk#instantiation](https://matrix.org/docs/guides/usage-of-matrix-bot-sdk#instantiation)), you
can use the `kickUser()` method. There are three parameters:

* the user ID (MXID) you want to kick
* the room ID they will be removed from
* (optional) a string explaining why they were kicked

```javascript
var userId = "@theirmxid:theirserver.tld";
var roomId = "!theroomid:servername.tld";
var message = "Get out!";
client.kickUser(userId, roomId, message);
```

## Banning

Banning means the user is kicked from a room and unable to re-enter. The method
is very similar to Kicking in that it has three parameters:

* the user ID (MXID) you want to ban
* the room ID they will be removed and banned from
* (optional) a string explaining why they were banned

```javascript
var userId = "@theirmxid:theirserver.tld";
var roomId = "!theroomid:servername.tld";
var message = "Get out, and don't come back!";
client.banUser(userId, roomId, message);
```

## Inviting

Inviting a user to join a room - much friendlier than kicking or banning them!
Inviting a user needs only two parameters:

* the userId to invite
* the roomId you're inviting them to join

```javascript
var userId = "@theirmxid:theirserver.tld";
var roomId = "!theroomid:servername.tld";
client.inviteUser(userId, roomId);
```

## Reading the members list

How about if we want to know who is currently in (joined to) a room? We can use
the `getJoinedRoomMembers()` method, which takes only a roomId as a param. To
get a result from this method, we should await it:

```javascript
var roomId = "!theroomid:servername.tld";
const members = await client.getJoinedRoomMembers(roomId);
```

`members` will now contain an array of strings we can inspect.

## Responding to a keyword

In [usage-of-matrix-bot-sdk#implementing-echobot-functionality](https://matrix.org/docs/guides/usage-of-matrix-bot-sdk#implementing-echobot-functionality),
we showed how it's possible to read the content of messages and respond to
them. To reiterate:

```javascript
client.on("room.message", (roomId, event) => {
    if (! event["content"]) return;
    const body = event["content"]["body"];

    if (body && body.indexOf("keyword") !== -1) {
        client.sendMessage(roomId, {
            "msgtype": "m.text",
            "body": "response to keyword",
        });
    }
});
```

Here we read the contents of a message, check for the presence of the
string "keyword". If we find that string, we send a response to that message.

> Note the very subtle bug/issue with this snippet as written: Since the
  callback doesn't check the sender, and it sends the string "keyword" in the
  reply, this would actually respond to itself forever!

## Reacting to a keyword with a kick

Now that we've seen kicks, and we've seen reading a message to decide how to
respond, we can make a (very crude) automoderator:

```javascript
client.on("room.message", (roomId, event) => {
    if (! event["content"]) return;
    const body = event["content"]["body"];

    if (body && body.indexOf("keyword") !== -1) {
        client.kickUser(event["sender"], roomId, "no!")
    }
});
```

It's as simple as taking the `event["sender"]` field, and passing it to
`kickUser()`. Now, any time anyone says "keyword", they'll be kicked.

## Using promises to know if a request succeeded

[matrix-bot-sdk] is promise-based, so you can chain `.then()` and `.catch
()` methods to your Matrix calls to respond after they return:

```javascript
client.kickUser(userId, roomId, "no!")
    .then(() => {
        client.sendMessage(roomId, {
            "msgtype": "m.text",
            "body": `please don't say that in here`
        });
    });
```

## Putting it all together absurdly

I was inspired by [this bash.org Quote](http://bash.org/?178890), in which a
user baits two bots:

* one bot is baited into saying a forbidden keyword
* and is immediately banned by an overzealous automoderator

I created a series of bots to endlessly recreate the scene in Matrix:

1. replies with a specific string when asked
2. checks for the presence of (1), requests the string when it sees them
3. kicks anyone who says a word that happens to be included in (1)'s string
4. invites (1) when they are seen to be absent

This uses several concepts from this guide to create an endless silly scene.

![screenshot showing the bots interacting](/docs/legacy/bot-dance.png)

You can find the code for [this strange project here](https://github.com/benparsons/bot-dance).

## Conclusion

[matrix-bot-sdk] can do a great deal when it comes to room administration.
Check out [the repo][matrix-bot-sdk] directly to find out more - or if you need a more introductory guide see [Usage of matrix-bot-sdk].

[matrix-bot-sdk]: https://github.com/turt2live/matrix-bot-sdk
[Usage of matrix-bot-sdk]: https://matrix.org/docs/guides/usage-of-matrix-bot-sdk
