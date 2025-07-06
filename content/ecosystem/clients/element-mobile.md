+++
title = "Element Mobile"
template = "ecosystem/client.html"
[extra]
thumbnail = "element-mobile.svg"
maintainer = "Element"
maturity = "Stable"
repo = "https://github.com/element-hq"
matrix_room = "#element-x-ios:matrix.org"
licence = "Apache-2.0"
featured = true
[extra.features]
e2ee = true
spaces = false
voip_1to1 = false
voip_jitsi = false
threads = false
sso = true
multi_account = false
multi_language = true
[extra.packages]
google_play_store.app_id = "io.element.android.x"
apple_app_store = { app_id = "id1631335820", org = "vector" }
+++

The Element mobile app, built on the Matrix 2.0 foundation with native sliding sync and OIDC.
