# Communicating with clients

Widgets can communicate with their host client over a `postMessage` API known as the Widget API.
This API provides the widget with some abilities, such as being able to send stickers or ask
to be left on screen, and allows the client to more directly integrate with the widget.

The API is split into two parts: the `toWidget` API and `fromWidget` API, where the difference
is where a request over the API comes from. The communication channel in which widgets and clients
speak to each other is known as a "session".
