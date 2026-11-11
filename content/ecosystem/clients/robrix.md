+++
title = "Robrix"

[extra]
thumbnail = "robrix.png"
maintainer = "Project Robius"
maturity = "Beta"
repo = "https://github.com/project-robius/robrix"
website = "https://github.com/project-robius/robrix/releases/latest"
matrix_room = "#robius-robrix:matrix.org"
licence = "MIT"
screenshots = [
    "robrix-desktop-light.png",
    "robrix-android-phone.png",
    "robrix-android-foldable.png",
]
featured = false
good_for = "Power users, multi-room split view, customizability, performance"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "supported"
sso = "supported"
voip_jitsi = "unsupported"
multi_account = "unsupported"
multi_language = "unsupported"
oauth = "supported"
invisible_crypto = "supported"
image_packs = "partial"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "supported"

[extra.packages]
windows_installer = "https://github.com/project-robius/robrix/releases/latest"
macos_installer = "https://github.com/project-robius/robrix/releases/latest"
other_linux_link = "https://github.com/project-robius/robrix/releases/latest"
+++

A high-performance, customizable client for power users, featuring our signature **dockable tabs** workspace layout for chatting in multiple rooms/threads at once.
Robrix is written from scratch in Rust and available on macOS, iOS, Android, Linux, and Windows.
