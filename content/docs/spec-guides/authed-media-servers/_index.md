+++
title = "Authenticated Media for Servers"
weight = 100
template = "docs/with_menu.html"
[extra]
updated = "2024-06-19T08:00:00Z"
meta_description = """
Authenticated media (MSC3916) lands in Matrix 1.11, requiring servers to support
new endpoints on the Client-Server API and Federation API. This guide covers the
Federation API changes in detail.
"""
+++

With Matrix 1.11 (via [MSC3916]), there are new media download endpoints to replace the outdated
`/_matrix/media/*` ones. They are:

* [`GET /_matrix/client/v1/media/download/{serverName}/{mediaId}`]
* [`GET /_matrix/client/v1/media/download/{serverName}/{mediaId}/{fileName}`]
* [`GET /_matrix/client/v1/media/thumbnail/{serverName}/{mediaId}`]
* [`GET /_matrix/client/v1/media/config`]
* [`GET /_matrix/client/v1/media/preview_url`]
* [`GET /_matrix/federation/v1/media/download/{mediaId}`]
* [`GET /_matrix/federation/v1/media/thumbnail/{mediaId}`]

Note that the media [`/upload`] and [`/create`] endpoints are not yet moved over
to this new namespace. A future spec release will do that.

The Client-Server API endpoints should be largely the same as their deprecated
counterparts with a few minor parameter changes. The Federation API endpoints are
a bit trickier. They use a `multipart/mixed` response format with exactly 2 parts:
metadata about the file, and the file itself (or a pointer to the file). This can
look like either of the following two examples:

```txt
Content-Type: multipart/mixed; boundary=gc0p4Jq0M2Yt08jU534c0p

--gc0p4Jq0M2Yt08jU534c0p
Content-Type: application/json

{}

--gc0p4Jq0M2Yt08jU534c0p
Content-Type: text/plain

This media is plain text. Maybe somebody used it as a paste bin.

--gc0p4Jq0M2Yt08jU534c0p
```

```txt
Content-Type: multipart/mixed; boundary=gc0p4Jq0M2Yt08jU534c0p

--gc0p4Jq0M2Yt08jU534c0p
Content-Type: application/json

{}

--gc0p4Jq0M2Yt08jU534c0p
Location: https://cdn.example.org/ab/c1/2345.txt

--gc0p4Jq0M2Yt08jU534c0p
```

Note that the second example uses a `Location` header to point to the file instead.
Servers will need to make a regular GET request to the provided URL to fetch the
media - `Content-Type` and `Content-Disposition` headers will be present on that
URL instead of in the headers on the part.

Currently, the metadata object is always an empty JSON object, but in future may
contain details about which users are able to view the media. An example in this
area is [MSC3911].

The new endpoints require authentication like most other federation endpoints.

Additionally, servers will need to try the new download endpoints before falling
back to the existing `/_matrix/media/*` ones. Specifically, if a `404 M_UNRECOGNIZED`
error is received, servers should fall back rather than treat the media as
non-existent.

<!-- Link tree -->
[MSC3911]: https://github.com/matrix-org/matrix-spec-proposals/pull/3911
[MSC3916]: https://github.com/matrix-org/matrix-spec-proposals/pull/3916
[`GET /_matrix/client/v1/media/download/{serverName}/{mediaId}`]: https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediadownloadservernamemediaid
[`GET /_matrix/client/v1/media/download/{serverName}/{mediaId}/{fileName}`]: https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediadownloadservernamemediaidfilename
[`GET /_matrix/client/v1/media/thumbnail/{serverName}/{mediaId}`]: https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediathumbnailservernamemediaid
[`GET /_matrix/client/v1/media/config`]: https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediaconfig
[`GET /_matrix/client/v1/media/preview_url`]: https://spec.matrix.org/v1.11/client-server-api/#get_matrixclientv1mediapreview_url
[`/create`]: https://spec.matrix.org/v1.11/client-server-api/#post_matrixmediav1create
[`/upload`]: https://spec.matrix.org/v1.11/client-server-api/#post_matrixmediav3upload
[`GET /_matrix/federation/v1/media/download/{mediaId}`]: https://spec.matrix.org/v1.11/server-server-api/#get_matrixfederationv1mediadownloadmediaid
[`GET /_matrix/federation/v1/media/thumbnail/{mediaId}`]: https://spec.matrix.org/v1.11/server-server-api/#get_matrixfederationv1mediathumbnailmediaid
