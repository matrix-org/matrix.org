# A simple stickerpicker

This guide covers writing your very own simple stickerpicker to explore some of the widget API
and gain a better understanding of the protocol. The end result for this is available on
[GitHub](https://github.com/matrix-org/simple-stickerpicker-widget) for ease of reference.

If all goes according to plan, your widget will look like this in Element Web/Desktop:

![stickerpicker](https://raw.githubusercontent.com/matrix-org/simple-stickerpicker-widget/master/stickerpicker.png)

**Note**: The widget that is created this way is not fully compliant with the spec. It is for
demonstration and educational purposes only.

## The HTML

Luckily for this kind of widget the amount of HTML is relatively small. We're using hardcoded
stickers here, however this is just meant to teach the basics.

To get started, create a `stickerpicker.html` with the following HTML in it:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Example Stickerpicker</title>
    <!-- Make the sticker picker look roughly like the matrix.org site -->
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    <link rel="stylesheet" href="stickerpicker.css" />
</head>

<body>
    <h1>Sample Stickers</h1>
    <p>Click a sticker to send it.</p>
    <div class="sticker" onclick="sendSticker('normal')">
        <img src="https://matrix-client.matrix.org/_matrix/media/r0/thumbnail/matrix.org/AFdISYOGCRXUIJejgxeRxaEg?width=256&height=256&method=crop" />
    </div>
    <div class="sticker" onclick="sendSticker('inverted')">
        <img src="https://matrix-client.matrix.org/_matrix/media/r0/thumbnail/matrix.org/wKGtfcEVxrUFXbbipBzfvfpD?width=256&height=256&method=crop" />
    </div>
    <script src="stickerpicker.js"></script>
</body>

</html>
```

*Full source: https://github.com/matrix-org/simple-stickerpicker-widget/blob/master/stickerpicker.html*

The CSS is also minimal and is just there to make it look relatively okay compared to the default
browser styling. Put this in a file named `stickerpicker.css` next to your `stickerpicker.html`:

```css
* {
    font-family: Inter, Arial, Helvetica, sans-serif;
    color: #333333;
    background-color: #ffffff;
}

.sticker {
    display: inline-block;
    margin-right: 8px;
    padding: 8px;
    border-radius: 4px;
    background-color: #f4f4f4;
    cursor: pointer;
    position: relative;
}

.sticker:hover {
    border-bottom: 5px solid #0098d4;
}

h1 {
    font-size: 1.5em;
}
```

*Full source: https://github.com/matrix-org/simple-stickerpicker-widget/blob/master/stickerpicker.css*

All we have to do now is create and populate `stickerpicker.js` so the buttons work!
