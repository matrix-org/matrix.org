+++
title = "Usage of matrix-nio (Python Matrix client library)"
aliases = ["/docs/guides/usage-of-matrix-nio"]
extra.new_doc = "https://matrix-nio.readthedocs.io/en/latest"
+++

This article concerns [matrix-nio](https://github.com/poljar/matrix-nio), and
[asyncio](https://docs.python.org/3/library/asyncio.html). We'll build a
simple "echo bot", meaning a bot which replies to messages with the text it has
just read. Note that this article does not cover E2EE with matrix-nio.

## Instantiation and Login

First create a new venv, and install matrix-nio via `pip`. On the command line,
run:

```bash
python3 -m venv env
source env/bin/activate
pip install matrix-nio
```

Next, create a new Python file, and open it for editing. We'll import everything
we require for this tutorial:

```python
from importlib import util
import asyncio
from nio import (AsyncClient, SyncResponse, RoomMessageText)
```

We're importing asyncio so we can use the `AsyncClient` class from matrix-nio.

Create a new instance of `AsyncClient` by passing the homeserver and username as
arguments:

```python
async_client = AsyncClient(
    "https://matrix.org", "%%YOUR-USERNAME-HERE%%"
)
```

Then login, and await the response:

```python
response = await async_client.login("%%YOUR-PASSWORD-HERE%%")
print(response)
```

Of course, we are using an async client, and awaiting the response. Because of
this, we must call the `async_client.login()` from an async method, like so:

```python
async def main():
    response = await async_client.login("%%YOUR-PASSWORD-HERE%%")
    print(response)

asyncio.run(main())
```

Note that for versions of Python before 3.7 the asyncio syntax must be:

```python
async def main():
    response = await async_client.login("%%YOUR-PASSWORD-HERE%%")
    print(response)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

The remainder of this tutorial assumes you are running everything from an
`async` method.

The response string should look like:

```txt
Logged in as @pyconweb-bot:matrix.org, device id: ZBLAJHLKVP.
```

## Get into a `/sync` loop

To get updates from a Matrix homeserver to the client, the client makes a
request to the `/sync` endpoint. In the matrix-nio AsyncClient, this is wrapped
by the `sync()` method. We can get the latest updates:

```python
sync_response = await async_client.sync(30000)
```

30000 means we will wait up to 30 seconds before returning. `sync_response` will
now contain a Python object containing a mapping of the (JSON)
[response from the Matrix homeserver](https://matrix.org/docs/spec/client_server/latest#get-matrix-client-r0-sync).
We'll inspect this response in the next section.

In fact, we expect there to be updates regularly, so let's create a very simple
loop:

```python
while (True):
    sync_response = await async_client.sync(30000)
    print(sync_response) # note that this could be LARGE!
    # do some reading from sync_response
```

In this way, every time there is a response (i.e. new events) from the
homeserver, they are made available in `sync_response` for processing, and we
loop again.

## Explore the sync response object

`sync_response` [can contain multitudes](https://matrix.org/docs/spec/client_server/latest#get-matrix-client-r0-sync),
depending on the rooms this user is part of, or has been part of.
`sync_response.rooms.join` contains updates for the rooms which the current
user is "joined to" (meaning, is a member of.)

Of these joined rooms, we are (perhaps!) most interested in the events on the
timeline. These are stored in `timeline.events`, see below:

```python
if len(sync_response.rooms.join) > 0:

    joins = sync_response.rooms.join
    for room_id in joins:
        for event in joins[room_id].timeline.events:
            print(event)
```

*Message events* are a specific type of event which contain an Instant Messenger
 message. We can check the type before proceeding:

```python
for event in joins[room_id].timeline.events:
    if isinstance(event, RoomMessageText):
        print (event.body)
```

In these cases, where the event is a message to a room, the `body` field will
contain the message text.

## Isolate specific message event objects

Knowing that we can get the message text from an event, we can read it to
determine a response. Let's make a new variable and have it store some string
we'll check for:

```python
response_string = "!replybot"
```

Now let's suppose we're in our `/sync` loop, and just received an event. We can
filter messages that are meant for our bot as follows:

```python
if len(sync_response.rooms.join) > 0:
    joins = sync_response.rooms.join
    for room_id in joins:
        for event in joins[room_id].timeline.events:
            if hasattr(event, 'body') and event.body.startswith(response_string):
                print(event)
```

## Use `room_send`

To send messages, matrix-nio provides a `room_send()` method. There are three
arguments:

* the room_id
* the message type, we will use "m.room.message"
* a JSON object representing the content of the message

Let's improve the example above, by sending back a message to echo the ones we
isolated above:

```python
joins = sync_response.rooms.join
for room_id in joins:
    for event in joins[room_id].timeline.events:
        if hasattr(event, 'body') and event.body.startswith(response_string):
            response_body = event.body.replace(response_string, "").strip()
            content = {
               "body": response_body,
               "msgtype": "m.text"
            }
            await async_client.room_send(room_id, 'm.room.message', content)
```

Now whenever the bot receives a message "!replybot *some message*" it will send
back "some message".

## Use of /sync next_batch tokens

Finally, let's consider the importance of `next_batch` tokens. Whenever you
receive a response from the `/sync` endpoint, the response will contain
a "next_batch" field, which you then pass on the next request to ensure you
have the latest messages. matrix-nio keeps track of this automatically, so it
doesn't get repeated messages. However, when you stop the program and call the
`.sync()` method again, how can you tell it where to start from? First let's
get the latest `next_batch` token:

```python
async def main():
    response = await async_client.login("%%YOUR-USERNAME-HERE%%", "")

    while (True):
        sync_response = await async_client.sync(30000)
        print(sync_response.next_batch) # this is the token
```

Then we'll write the token to a file:

```python
async def main():
    response = await async_client.login("%%YOUR-USERNAME-HERE%%", "")

    while (True):
        sync_response = await async_client.sync(30000)

        # we write the token to a file here
        with open("next_batch","w") as next_batch_token:
            next_batch_token.write(sync_response.next_batch)
```

Once that token is written, we know we can re-use it for the first `/sync/`
request next time:

```python
async def main():
    response = await async_client.login("%%YOUR-USERNAME-HERE%%", "")

    # we read the previously-written token...
    with open ("next_batch","r") as next_batch_token:
        # ... and well async_client to use it
        async_client.next_batch = next_batch_token.read()

    while (True):
        sync_response = await async_client.sync(30000)
        with open("next_batch","w") as next_batch_token:
            next_batch_token.write(sync_response.next_batch)
```

## Conclusion

With this, you can see that in very few lines, it's possible to write a working
Matrix bot in Python, using [matrix-nio](https://github.com/poljar/matrix-nio).

*The content in this article was first presented as a workshop at PyConWeb
 2019.*
