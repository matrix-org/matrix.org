+++
title = "Lightning"

[extra]
thumbnail = "lightning.svg"
maintainer = "Rokas Smetonis"
licence = "GPL-3.0-or-later"
language = "C++"
maturity = "Alpha"
repo = "https://github.com/Mizerd/lightning"
website = "https://www.lightning-matrix.org"
matrix_room = "#lightning:matrix.smetonis.net"
featured = false
screenshots = ["lightning-main-chat.avif", "lightning-media-gallery.avif", "lightning-thread-view.avif"]
good_for = "Linux, Windows and macOS users who want a fast, native desktop Matrix client with encryption, Spaces, threads and MatrixRTC calls"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "supported"
sso = "supported"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "supported"
oauth = "supported"
invisible_crypto = "unsupported"
image_packs = "unsupported"

[extra.features.2experimental]
voip_matrixrtc = "supported"
sliding_sync = "supported"

[extra.packages]
windows_installer = "https://www.lightning-matrix.org/#download"
macos_installer = "https://www.lightning-matrix.org/#download"
other_linux_link = "https://www.lightning-matrix.org/#download"
+++

Lightning is a native desktop Matrix client for Linux, Windows and macOS, built with Qt 6 / QML and the official Rust Matrix SDK. It supports end-to-end encrypted messaging, rooms and Spaces, threads, MatrixRTC group calls with camera and screen sharing, reactions, MSC3381 polls, inline media, notifications, themes and multi-account switching.
