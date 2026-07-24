+++
title = "Lightning"

[extra]
thumbnail = "lightning.svg"
maintainer = "Rokas Smetonis"
licence = "GPL-3.0-or-later"
language = "C++"
maturity = "Alpha"
repo = "https://gitlab.smetonis.net/Mizerd/lightning"
matrix_room = "#lightning:matrix.smetonis.net"
featured = false
screenshots = ["lightning-main-chat.avif", "lightning-media-gallery.avif", "lightning-thread-view.avif"]
good_for = "Linux and Windows users who want a fast, native desktop Matrix client with encryption, Spaces and threads"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "supported"
sso = "unsupported"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "unsupported"
oauth = "unsupported"
invisible_crypto = "unknown"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "partial"

[extra.packages]
windows_installer = "https://gitlab.smetonis.net/Mizerd/lightning/-/releases"
other_linux_link = "https://gitlab.smetonis.net/Mizerd/lightning/-/releases"
+++

Lightning is a native desktop Matrix client for Linux and Windows, built with Qt 6 / QML and the official Rust Matrix SDK. It supports end-to-end encrypted messaging, rooms and Spaces, threads, reactions, MSC3381 polls, inline media, notifications, themes and multi-account switching.
