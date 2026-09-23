+++
title = "Lightning"

[extra]
thumbnail = "lightning.svg"
maintainer = "Rokas Smetonis"
licence = "GPL-3.0-or-later"
language = "C++"
maturity = "Beta"
repo = "https://github.com/Mizerd/lightning"
website = "https://www.lightning-matrix.org"
matrix_room = "#lightning:matrix.smetonis.net"
featured = false
screenshots = ["lightning-main-chat.avif", "lightning-media-gallery.avif", "lightning-thread-view.avif"]
good_for = "Linux, Windows and macOS users who want a fast, native desktop Matrix client with encryption, Spaces, threads and MatrixRTC calls"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "partial"
threads = "supported"
sso = "supported"
voip_jitsi = "partial"
multi_account = "supported"
multi_language = "supported"
oauth = "supported"
invisible_crypto = "partial"
image_packs = "partial"

[extra.features.2experimental]
voip_matrixrtc = "supported"
sliding_sync = "supported"

[extra.packages]
windows_installer = "https://www.lightning-matrix.org/#download"
macos_installer = "https://www.lightning-matrix.org/#download"
flathub.app_id = "org.lightning_matrix.Lightning"
other_linux_link = "https://www.lightning-matrix.org/#download"
+++

A real desktop app, not a website in a window — Qt 6, the Rust Matrix SDK, and calls that reach Element.
