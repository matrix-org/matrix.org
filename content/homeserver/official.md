+++
title = "Matrix.org (Official Account)"
weight = 10
+++

## Who is the Matrix.org (Official Account) `@server:matrix.org`?

The Matrix.org Foundation uses `@server:matrix.org` to message users on the matrix.org homeserver. It is a special account, used to send information from the server to registered users.

{% notice_box() %}
We will **never** ask for your personal information or password
{% end %}

## Why am I in a room called Matrix.org (Official Account)?

We invite users to this room when you first register your account. For long-term users, we started inviting you in June 2025. We use this room to send you information about your account on the matrix.org homeserver.

Note: You can't send a message to this room.

## How can I tell that this is the official account in my Matrix client or app?

You can verify that the message is from the official account by checking the Matrix user ID of the sender. The user ID should match `@server:matrix.org` exactly.

How to check this depends on the client or app you use. Typically you need to click or tap the profile or avatar of the user.

Here are some examples of how it looks in some common apps:

<div style="display:flex; flex-direction:row; flex-wrap: wrap; gap: 8px; align-items: baseline; justify-content: center;">
{{ figure(
    img="/images/homeserver/official/client1.png"
    alt="Element Web's right panel"
    caption="")
}}
{{ figure(
    img="/images/homeserver/official/client3.png"
    alt="Cinny's user info popup"
    caption="")
}}
{{ figure(
    img="/images/homeserver/official/client2.png"
    alt="Element Web's tooltip on the avatar"
    caption="")
}}
</div>

## What should I do if the user ID doesn’t match?

If you receive a message pretending to be the official account, you should report the message immediately. If you are a matrix.org user, you can use the "report user" function in your app or client to let us know.

If your client doesn't provide a way to do this, or if you are on a different homeserver, then please email us at [abuse@matrix.org](mailto:abuse@matrix.org) with the details.

## Why does the official account room show as unencrypted/not encrypted?

Depending on the Matrix client being used, it may show the room as being "not encrypted" or something similar.

This is expected as the official account room does not make use of the [End-to-End Encryption](https://spec.matrix.org/latest/client-server-api/#end-to-end-encryption) feature of Matrix.

This is because the messages in the official account room are only ever sent by the server to you, and are already protected by secure HTTPS encryption during transmission making them end-to-end encrypted at the transport layer. Therefore, additional Matrix-level encryption is not needed for these messages.
