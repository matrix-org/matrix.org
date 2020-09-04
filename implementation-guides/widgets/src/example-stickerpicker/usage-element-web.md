# Using the stickerpicker in Element

Our widget is finally ready to be used. All we have to do is upload it to an SSL-protected website
to ensure we don't run into mixed content problems. Many hosting providers, like GitHub Pages, offer
free SSL certificates and can easily deploy this widget.

**Note**: At this point in the tutorial you'll want to use a test account to avoid causing problems
on your main account.

In Element Web or Desktop, open up a room and type `/devtools` to open up the Developer Tools. After
clicking 'Send Account Data' you should see a form to fill out. For the Event Type, put `m.widgets`
and in the Event Content put something similar to the following:

```json
{
    "my-stickerpicker": {
        "type": "m.widget",
        "state_key": "my-stickerpicker",
        "creatorUserId": "@yourusername:example.org",
        "content": {
            "type": "m.stickerpicker",
            "url": "https://yourdomain.com/stickerpicker.html",
            "name": "Stickerpicker",
            "data": {}
        }
    }
}

```

The `url` and `creatorUserId` will need updating to match your particular setup.

If everything looks good, click 'Send' and wait a few moments. Then you should be able to click the
'Show Stickers' button near the voice/video call options and see your stickerpicker. If all went
according to plan, clicking the stickers should send them into the room you're looking at.

If for some reason your stickerpicker isn't working, visit
[#matrix-dev:matrix.org](https://matrix.to/#/#matrix-dev:matrix.org) and other members of the
community should be able to help out.

## Next steps

As mentioned, this stickerpicker is technically not spec compliant. Getting it up to spec is
difficult, so we've done the hard work for you in [matrix-widget-api](https://github.com/matrix-org/matrix-widget-api). Using matrix-widget-api will take care of all of the things we've covered in this
guide and make the API a bit easier to use.

If you've been spying on the JavaScript console while trying out the sticker picker you might have
noticed some errors about widget visibility requests. This is the client trying to tell the
stickerpicker that it is visible or not visible to the user (you) - we don't need this functionality
in this guide, but if a server-side component was added to the stickerpicker to let users add or
remove their own sticker packs, it would be a good opportunity to reload data from the server.
