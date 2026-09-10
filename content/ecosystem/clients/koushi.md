+++
title = "Koushi"

[extra]
thumbnail = "koushi.svg"
maintainer = "Hiroshi Shinaoka"
licence = "MIT OR Apache-2.0"
maturity = "Alpha"
repo = "https://github.com/shinaoka/koushi-matrix"
featured = false
good_for = "Desktop chat with full-text search across encrypted history, including Japanese and other CJK text."

[extra.features.1stable]
e2ee = "supported"
spaces = "partial"
threads = "supported"
voip_1to1 = "unsupported"
voip_jitsi = "unsupported"
voip_matrixrtc = "unsupported"
oauth = "supported"
sliding_sync = "supported"

[extra.packages]
macos_installer = "https://github.com/shinaoka/koushi-matrix/releases/latest/download/Koushi-macos-arm64.dmg"
+++

Koushi is a desktop Matrix client built with Tauri, React, and matrix-rust-sdk.
It offers end-to-end encrypted chat, browser-based OIDC sign-in, a three-pane
layout for spaces and rooms, threads, replies, reactions, and file uploads.
Full-text search works across encrypted message history, including Japanese
and other CJK text.

macOS on Apple Silicon is officially supported, with signed and notarized
releases. Experimental Windows and Linux builds are available from
[GitHub Releases](https://github.com/shinaoka/koushi-matrix/releases); feedback
on these platforms is welcome. Voice and video calls are not yet available.
