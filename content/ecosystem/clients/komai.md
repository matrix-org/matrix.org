+++
title = "Komai"

[extra]
thumbnail = "komai.svg"
maintainer = "etke.cc"
licence = "GPL-3.0-or-later"
language = "Rust, C++, QML"
maturity = "Beta"
repo = "https://github.com/etkecc/komai"
website = "https://komai.chat"
docs = "https://github.com/etkecc/komai/tree/main/docs"
matrix_room = "#komai:etke.cc"
featured = false
screenshots = ["komai-main-view.webp", "komai-room-directory.webp"]
good_for = "Linux, Windows and macOS users who want a fast native desktop app with room tabs and built-in MatrixRTC calls"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "partial"
threads = "supported"
sso = "supported"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "supported"
oauth = "supported"
invisible_crypto = "unsupported"
image_packs = "supported"

[extra.features.2experimental]
voip_matrixrtc = "supported"
sliding_sync = "supported"

[extra.packages]
windows_installer = "https://github.com/etkecc/komai/releases/latest"
macos_installer = "https://github.com/etkecc/komai/releases/latest"
other_linux_link = "https://github.com/etkecc/komai/releases/latest"
+++

A native, desktop-first Matrix client for Linux, Windows and macOS, built on Qt/QML and the Rust matrix-sdk.
