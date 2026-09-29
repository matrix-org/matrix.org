+++
title = "Tesseract"

[extra]
thumbnail = "tesseract.svg"
maintainer = "Marco Alvarez"
licence = "GPL-3.0-or-later"
latest_release = "2026-11-21"
maturity = "Beta"
repo = "https://github.com/surakin/tesseract"
website = "https://surakin.github.io/tesseract"
matrix_room = "#tesseract-client:matrix.org"
good_for = "Users who prefer a native desktop client"
screenshots = ["tesseract-screenshot-light.avif", "tesseract-screenshot-dark.avif"]

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
invisible_crypto = "partial"
image_packs = "supported"

[extra.features.2experimental]
voip_matrixrtc = "supported"
sliding_sync = "supported"

[extra.packages]
windows_installer = "https://github.com/surakin/tesseract/releases/latest"
macos_installer = "https://github.com/surakin/tesseract/releases/latest"
other_linux_link = "https://github.com/surakin/tesseract/releases/latest"
+++

A truly native desktop client built on the matrix-rust-sdk and native OS APIs, optimised for speed and low memory consumption.
