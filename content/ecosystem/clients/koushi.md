+++
title = "Koushi"

[extra]
thumbnail = "koushi.svg"
maintainer = "Hiroshi Shinaoka"
licence = "MIT OR Apache-2.0"
maturity = "Alpha"
repo = "https://github.com/shinaoka/koushi-matrix"
featured = false

[extra.features.1stable]
e2ee = "supported"
spaces = "partial"
threads = "supported"
voip_1to1 = "unsupported"
voip_jitsi = "unsupported"
sso = "supported"
multi_account = "supported"
multi_language = "supported"
oauth = "supported"
invisible_crypto = "unknown"
image_packs = "unsupported"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "supported"

[extra.packages]
macos_installer = "https://github.com/shinaoka/koushi-matrix/releases/latest/download/Koushi-macos-arm64.dmg"
+++

Koushi is a desktop Matrix client with multiple account tabs and threads.
Its full-text search uses n-gram indexing to search encrypted history in
multiple languages, including Japanese, Chinese, and Korean. The interface
is available in English and Japanese. macOS on Apple Silicon is officially
supported; experimental Windows and Linux builds are
available from [GitHub Releases](https://github.com/shinaoka/koushi-matrix/releases).
