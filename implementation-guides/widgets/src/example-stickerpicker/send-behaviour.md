# Defining our stickers

Create a new `stickerpicker.js` file next to your `stickerpicker.html` file and put the following
in it:

```javascript
// This is where we register our stickers. The HTML calls sendSticker() with the ID
// of the sticker to send, which is the key of this object. The value of the object
// is simply StickerActionRequestData which gets placed in the request.
const stickers = {
    'normal': {
        name: "Made for Matrix badge",
        content: {
            url: "mxc://matrix.org/AFdISYOGCRXUIJejgxeRxaEg",
            info: {
                w: 256,
                h: 256,
                mimetype: "image/png",
            },
        },
    },
    'inverted': {
        name: "Made for Matrix badge (inverted)",
        content: {
            url: "mxc://matrix.org/wKGtfcEVxrUFXbbipBzfvfpD",
            info: {
                w: 256,
                h: 256,
                mimetype: "image/png",
            },
        },
    },
};
```

This object is used to define or "register" our stickers so we can send the right sticker to the
client. The key name is what is referenced by our HTML and the value is what we'll be sending
to the client. There are more options available, see
[the specification for StickerActionRequest](https://matrix.org/docs/spec/widgets/latest#stickeractionrequest-schema).

**Tip**: For the best quality stickers, upload them to your server as 512x512 but say they are 256x256
in the `info`, as we've done here. This helps Retina displays come to a less blurry result.

We also need to define the `sendSticker` function referenced by the `onclick` handlers in the HTML, so
let's do that:

```javascript
function sendSticker(id) {
    // First, see if we forgot to register the sticker
    const sticker = stickers[id];
    if (!sticker) {
        alert("Error: unknown sticker");
        return;
    }

    // Now create and send a request to the client to send a sticker
    window.parent.postMessage({
        api: "fromWidget", // because we're sending from the widget
        requestId: "sticker-" + Date.now(), // we'll use the current time to make a unique request ID
        action: "m.sticker", // we want to send a sticker
        widgetId: null, // we'll figure this out in a moment
        data: sticker, // send the sticker request body
    }, '*');

    // Note: We post to '*' as an origin because we don't have a reliable origin to
    // get access to (browsers think that `window.parent.location.origin` is cross-origin and do
    // not let us see it).
}
```

The first half of the function ensures that we've properly defined our sticker in the `stickers`
object, allowing us to move on to sending it.

The second half is where we send the request to the client, so let's break that down. We're using
the `window.parent` to ensure that we contact the client and not accidentally send a request to
ourselves. We're also telling the browser that we want to `postMessage` our object to all origins,
as denoted by the `*`. We have to do this because we don't really know what origin, if any, the
client is on so can't scope it to that particular location. This does mean that the user's extensions
could potentially see the message, though for this proof of concept we aren't concerned with this.

The object itself is a [StickerActionRequest](https://matrix.org/docs/spec/widgets/latest#stickeractionrequest-schema)
originating from us (the widget), so we use `api: "fromWidget"`. Because we're starting the request,
we also need to define a `requestId` that is unique. The thing we're trying to do is send a sticker,
so say that with `action: "m.sticker"`. We don't have a `widgetId` to supply yet, but we'll get there.
Finally, as mentioned above, our `data` is simply the object defined by `stickers`, so put that there.

Now if we were to use this stickerpicker as-is in Element Web/Desktop, we'd see a lot of errors in
the JavaScript console and nothing would work. Let's fix that.
