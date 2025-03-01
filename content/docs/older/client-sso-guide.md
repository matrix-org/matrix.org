+++
title = "Client Developers' Guide to Supporting SSO"
aliases = ["/docs/guides/sso-for-client-developers"]
+++

## What is Single Sign-On?

Single Sign-On allows users to easily connect to services if they’re already
signed into another umbrella account. This document describes how to use the
[SSO client login flow](https://matrix.org/docs/spec/client_server/latest#sso-client-login)
to enable SSO in a Matrix Client you are developing.

## When to use it

The first thing to do, as soon as you have the homeserver for the user, is to
make a `GET` query to `/_matrix/client/r0/login` on the homeserver. Most
commonly, the response will be:

```json
{
  "flows": [
    {
      "type": "m.login.password"
    }
  ]
}
```

In which case you proceed with password authentication as normal. If the
response is:

```json
{
  "flows": [
    {
      "type": "m.login.sso"
    },
    {
      "type": "m.login.token"
    }
  ]
}
```

Then you know you will begin the
[SSO client login flow](https://matrix.org/docs/spec/client_server/latest#sso-client-login).

## Handling SSO

In this case, you should render some UI to tell the user to start SSO login. For
example, on <https://chat.mozilla.org> the screen looks like:

![Mozilla login screen](/docs/legacy/mozilla-sso.png)

When the user clicks/taps to start, open a browser or in-app browser with the
url `<homeserver>/_matrix/client/r0/login/sso/redirect?redirectUrl=<your app
url>`.

Now, the login process is out of your hands.

`/_matrix/client/r0/login/sso/redirect` will trigger a 302 redirect chain
through whatever SSO login mechanism the server offers the user. When they pass
through this successfully, they will be eventually redirected to `<your app
url>/?loginToken=<some login token>`. If the user does not auth successfully,
they will be informed in the browser.

You will read the `loginToken` parameter from this response, and use it to login
with the [token-based login flow](https://matrix.org/docs/spec/client_server/latest#token-based), thus obtaining
a mxid, access_token and device ID.
