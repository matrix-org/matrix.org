+++
title = "Tesseract"

[extra]
thumbnail = "tesseract.svg"
maintainer = "Marco Alvarez"
licence = "GPL-3.0-or-later"
maturity = "Beta"
repo = "https://github.com/surakin/tesseract"
website = "https://surakin.github.io/tesseract"
matrix_room = "#tesseract-client:matrix.org"
good_for = "Users who prefer a native desktop client"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
threads = "supported"
voip_1to1 = "unsupported"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "supported"
oauth = "supported"
image_packs = "supported"

[extra.features.2experimental]
sliding_sync = "supported"
voip_matrixrtc = "supported"

[extra.packages]
windows_installer = "https://github.com/surakin/tesseract/releases/latest"
macos_installer = "https://github.com/surakin/tesseract/releases/latest"
other_linux_link = "https://github.com/surakin/tesseract/releases/latest"
+++

A native desktop client built on the matrix-rust-sdk.
