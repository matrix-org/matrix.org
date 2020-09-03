# URL templating

To render a widget by URL, clients will first replace any keys from `data` with their associated
values in the `url`. For example, if the `data` object was
`{"custom-key": 1234, "another-key": "hello!"}` then the client would replace `$custom-key` with
`1234` and `$another-key` with `hello!`, wherever those appear in the URL.

Some additional variables are defined by the specification for use in the widget URL:

* `$matrix_user_id` - The current user's ID.
* `$matrix_room_id` - The room ID the user is currently viewing, or an empty string if none
  applicable.
* `$matrix_display_name` - The current user's display name, or user ID if not set.
* `$matrix_avatar_url` - An HTTP URL to the current user's avatar, or an empty string if not set.
