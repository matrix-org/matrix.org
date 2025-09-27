+++
title = "Element X"
template = "ecosystem/client.html"
[extra]
thumbnail = "element-x.svg"
maintainer = "Element"
maturity = "Stable"
repo = "https://github.com/element-hq"
matrix_room = "#element-x-ios:matrix.org"
licence = "AGPL-3.0-or-later OR Element Commercial License"
latest_release = "2025-09-23"
featured = true
[extra.features]
e2ee = true
spaces = false
voip_1to1 = false
voip_jitsi = false
threads = false
sso = false
multi_account = false
multi_language = true

[extra.packages]
google_play_store.app_id = "io.element.android.x"
f_droid.app_id = "io.element.android.x"
apple_app_store = { app_id = "id1631335820", org = "vector" }
+++

Next generation Element on mobile with native OIDC, sliding sync and Matrix RTC for calls.
