+++
title = "Tesseract"

[extra]
thumbnail = "tesseract.svg"
maintainer = "Marco Alvarez"
licence = "GPL-3.0-or-later"
language = "Rust, C++"
latest_release = "2026-06-24"
maturity = "Alpha"
repo = "https://github.com/surakin/tesseract"
website = "https://surakin.github.io/tesseract"
matrix_room = "#tesseract-client:matrix.org"
good_for = "A native desktop client built on the matrix-rust-sdk."

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
threads = "supported"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "supported"
oauth = "supported"
sliding_sync = "supported"

[extra.features.2experimental]
voip_1to1 = "supported"
voip_matrixrtc = "supported"

[extra.packages]
windows_installer = "https://github.com/surakin/tesseract/releases/latest"
macos_installer = "https://github.com/surakin/tesseract/releases/latest"
other_linux_link = "https://github.com/surakin/tesseract/releases/latest"
+++

A native desktop client built on the matrix-rust-sdk.
