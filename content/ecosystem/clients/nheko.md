+++
title = "Nheko"

[extra]
thumbnail = "nheko.svg"
maintainer = "red_sky, deepbluev7"
licence = "GPL-3.0-or-later"
language = "C++"
maturity = "Beta"
repo = "https://github.com/Nheko-Reborn/nheko"
website = "https://nheko-reborn.github.io/"
matrix_room = "#nheko:nheko.im"
featured = true
featured_order = 5
screenshots = ["nheko-screenshot.avif"]
good_for = "Power users and tinkerers who prefer a lean native desktop app"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "supported"
threads = "supported"
sso = "supported"
voip_jitsi = "unsupported"
multi_account = "unsupported"
multi_language = "supported"
oauth = "unknown"
invisible_crypto = "unknown"
image_packs = "partial"

[extra.features.2experimental]
voip_matrixrtc = "unknown"
sliding_sync = "unknown"

[extra.packages]
windows_installer = "https://github.com/Nheko-Reborn/nheko/releases"
macos_installer = "https://github.com/Nheko-Reborn/nheko/releases"
flathub.app_id = "im.nheko.Nheko"
+++

Desktop client for Matrix using Qt and C++20.
