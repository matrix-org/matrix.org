# Communicating with the client

To recap, at this point we have a stickerpicker which tries to send stickers to the client
but instead just encounters errors. Most importantly, we need to know our `widgetId` so we can
send a valid request and we need to ask for permission to send stickers.

Let's set up some basic request handling and validation at the top of our `stickerpicker.js`
file:

```javascript
let widgetId = null; // to be populated on the first `toWidget` request.

// First we need to set up a listener to ensure we're able to hear the client's requests
window.onmessage = function(event) {
    // First make sure we are roughly in shape to be a widget: we need a parent window to
    // make sure it's not another tab trying to contact us.
    if (!window.parent) return;

    // Next we validate to make sure the request is a valid shape
    const request = event.data;
    if (!request) return;
    if (!request['requestId'] || !request['widgetId'] || !request['action']) return;
    if (request['api'] !== "toWidget") return;

    // Now we see if it is for us, if we know what our widget ID is
    if (widgetId) {
        if (widgetId !== request['widgetId']) return;
    } else {
        widgetId = request['widgetId'];
    }

    // We'll finish this function in a moment.
};
```

We define a variable outside our function so we can use it wherever we want, which in our case will
be the `sendSticker` function where we currently have `widgetId: null`. Change that to
`widgetId: widgetId` so we can make sure we have a valid request.

A lot of the `onmessage` event handler function is just making sure that the client is sending a
valid request. We don't want the user's browser extensions to interfere with our stickerpicker, so
we try and filter them out. We also filter out any requests that are not sent over the `toWidget`
API because we're not supposed to receive any other kind of request as a widget.

Once we know we have a valid request, we'll capture the `widgetId` sent by the client or, if we
already know the widget ID, we'll make sure the client is talking to us.

What we're looking to handle with this function is a capabilities request from the client so we can
claim our required permissions. If we set up Element Web correctly later in this guide, it will
auto-accept the permissions we need as long as we're not trying to ask for too much. This means
we need to watch out for an `action` of `capabilities` and reply to it, like the following. We'll
also respond with an error to all other actions because we aren't worried about handling them in
this proof of concept.

```javascript
// Finally, we can get on to the action handling.
if (request['action'] === 'capabilities') {
    // We're going to respond with the capabilities we want: m.sticker
    window.parent.postMessage({
        ...request, // include the original request
        response: {
            capabilities: ['m.sticker'],
        },
    }, event.origin);
} else {
    // We'll send an error response for this. Ideally we'd do a full implementation
    // of the widget API, but that is out of scope for this tutorial.
    window.parent.postMessage({
        ...request, // include the original request
        response: {
            error: {
                message: "Action not supported",
            },
        },
    }, event.origin);
}
```

Both for the `capabilities` response and the error response we have `...request` which just includes
the original request object in the response for us. This ensures that we don't miss any detail when
replying, and the client will know what we're replying to.

The `response` object for the `capabilities` request is simply the capabilities we want. We only
want to send stickers, so that's all we'll ask for.

**Note**: This is where we diverge from the spec: we're supposed to handle a lot more request actions,
but that would make this guide complicated so we've excluded them here.

We should now have enough to try out our widget, but we need to add it to our account first.
