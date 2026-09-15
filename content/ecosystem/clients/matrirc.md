+++
title = "matrirc"

[extra]
maintainer = "pawelb0"
maturity = "Beta"
repo = "https://github.com/pawelb0/matrirc"
licence = "GPL-3.0-or-later"
language = "Rust"
featured = false
good_for = "IRC users who want to use Matrix from their existing IRC client (irssi, weechat, hexchat)"

[extra.features.1stable]
e2ee = "supported"
spaces = "unsupported"
voip_1to1 = "unsupported"
threads = "unsupported"
sso = "unsupported"
voip_jitsi = "unsupported"
multi_account = "unsupported"
multi_language = "unsupported"
oauth = "unsupported"
invisible_crypto = "unknown"
image_packs = "unsupported"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "unsupported"

[extra.packages]
macos_installer = "https://github.com/pawelb0/matrirc/releases/latest"
other_linux_link = "https://github.com/pawelb0/matrirc/releases/latest"
+++

A local IRC server that bridges to Matrix with native E2EE. Run matrirc on localhost; connect any IRC client (irssi, weechat, hexchat) and chat in your Matrix rooms and DMs.
