+++
title = "Element X"

[extra]
thumbnail = "element-x.svg"
maintainer = "Element Creations Ltd."
maturity = "Stable"
repo = "https://github.com/element-hq"
matrix_room = "#element-x-ios:matrix.org"
licence = "AGPL-3.0-or-later OR Element Commercial License"
featured = true
featured_order = 2
screenshots = ["element-x-screenshot-roomlist.avif", "element-x-screenshot-timeline.avif"]
good_for = "Mobile-first users who want a fast, modern experience"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "partial"
sso = "unsupported"
voip_jitsi = "unsupported"
multi_account = "unsupported"
multi_language = "supported"
oauth = "supported"
invisible_crypto = "supported"

[extra.features.2experimental]
voip_matrixrtc = "supported"
sliding_sync = "supported"

[extra.packages]
google_play_store.app_id = "io.element.android.x"
f_droid.app_id = "io.element.android.x"
apple_app_store = { app_id = "id1631335820", org = "vector" }
+++

Next generation Element on mobile with native OIDC, sliding sync and Matrix RTC for calls.
