# Introduction

Widgets are embedded applications in Matrix which clients use to add functionality to their user
experience. Currently only rooms and users can have widgets associated with them, though in the
future it is planned to be possible to have "inline widgets" - widgets that can be sent as events
in a room.

The most common widgets are video conferencing, sticker pickers, and notepads though anything that
can be represented as a website can be embedded as a widget. Clients are also able to present
widgets with purpose-built UI if they recognize the widget type.

This implementation guide focuses on what widget and client authors need to know for enabling or
making widgets. The [specification](https://matrix.org/docs/spec/widgets) has many more details
about widgets, such as the security considerations clients and widgets should take into account.
