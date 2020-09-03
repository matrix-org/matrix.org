# Widget basics

Widgets exist in two places currently: rooms and on a user's account. Room widgets are accessible
to anyone who can see the room while account widgets are only accessible to that user.

Both forms of widget have the same general structure:

```json
{
    "id": "20200827_WidgetExample",
    "type": "m.custom",
    "name": "My Cool Widget",
    "url": "https://example.org/my/widget.html?roomId=$matrix_room_id",
    "creatorUserId": "@alice:example.org",
    "data": {
        "custom-key": "This is a custom key",
        "title": "This is a witty description for the widget"
    }
}
```

The `id` is the widget's ID, which must be unique to the room/account where the widget will be
located. The `type` is almost always going to be `m.custom` to indicate it is a generic widget,
though other types are available. The `name` is simply what the widget should be called, and the
`url` is where the widget is located.

The `creatorUserId` is the user ID of who added the widget. For account widgets this should be
the user's own ID, though for rooms it should be whoever originally added the widget. Room widgets
can be edited over time by other members of the room, so this indicates who was responsible for
the widget's construction rather than who edited it last.

`data` has a special meaning for the `url` in that the keys of the the object can be used as variables
to the `url`. This is most useful when using a custom `type` so variables can be provided to the
client when they are using purpose-built UI. An optional `title` can be specified in the `data`
to give a short summary of what the widget is representing alongside the `name`.

## Room widgets

Widgets at the room level are stored as state events in the room with an event type of `m.widget`
and a state key matching the widget's `id`. The state event's content is the same as the object
described above.

State events that are missing a `url` or `type` in the event content will not be rendered by clients.

## Account widgets

Widgets at the user/account level are stored in that user's account data under a single `m.widgets`
type. This type has keys which are each widget's `id` and a value consisting of a minimal room widget.

For example:

```json
{
    "20200827_WidgetExample": {
        "content": {
            "id": "20200827_WidgetExample",
            "type": "m.custom",
            "name": "My Cool Widget",
            "url": "https://example.org/my/widget.html?roomId=$matrix_room_id",
            "creatorUserId": "@alice:example.org",
            "data": {
                "custom-key": "This is a custom key",
                "title": "This is a witty description for the widget"
            }
        },
        "sender": "@alice:example.org",
        "state_key": "20200827_WidgetExample",
        "type": "m.widget"
    }
}
```

This looks a bit confusing, though the idea is that clients can use this similarity to render
widgets mroe easily.

To remove a widget from the user's account, simply remove all references to it from the `m.widgets`
object.
