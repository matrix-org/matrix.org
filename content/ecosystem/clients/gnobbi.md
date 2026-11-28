+++
title = "Gnobbi"

[extra]
thumbnail = "gnobbi.png"
maintainer = "Marco Mescalchin"
maturity = "Beta"
repo = "https://github.com/meska/gnobbi"
licence = "MIT OR Apache-2.0"
featured = false

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "supported"
sso = "unsupported"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "supported"
oauth = "unsupported"
invisible_crypto = "unknown"
image_packs = "supported"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "supported"

[extra.packages]
windows_installer = "https://github.com/meska/gnobbi/releases"
macos_installer = "https://github.com/meska/gnobbi/releases"
other_linux_link = "https://github.com/meska/gnobbi/releases"
+++

A Matrix client for desktop and mobile written in Rust, with an egui interface and the Matrix Rust SDK. One codebase builds Linux (native Wayland), macOS, Windows, iOS and Android; several accounts on different homeservers can be signed in at once with a combined chat list.
