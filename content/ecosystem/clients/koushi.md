+++
title = "Koushi"

[extra]
thumbnail = "koushi.svg"
maintainer = "Hiroshi Shinaoka"
licence = "MIT OR Apache-2.0"
language = "Rust, TypeScript"
latest_release = "2026-09-10"
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
windows_installer = "https://github.com/shinaoka/koushi-matrix/releases/latest"
other_linux_link = "https://github.com/shinaoka/koushi-matrix/releases/latest"
+++

Koushi is a desktop Matrix client built with Tauri, React, and matrix-rust-sdk.
It offers end-to-end encrypted chat, browser-based OIDC sign-in, a three-pane
layout for spaces and rooms, threads, replies, reactions, and file uploads.
Full-text search works across encrypted message history, including Japanese
and other CJK text.

macOS on Apple Silicon is officially supported, with signed and notarized
releases. Windows and Linux installers are available but are untested and
unsupported by the maintainer; contributors who can test these platforms are
welcome. Voice and video calls are not yet available.
