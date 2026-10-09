+++
title = "Axon"

[extra]
thumbnail = "axon.svg"
maintainer = "Matrix-Axon"
maturity = "Beta"
licence = "Apache-2.0"
repo = "https://github.com/matrix-axon/matrix-axon"
website = "https://matrix-axon.github.io/matrix-axon/"
matrix_room = "#axon-support:bostoncoop.net"
latest_release = "2026-10-07"
featured = false
screenshots = ["axon-web.png", "axon-tui.png"]
good_for = "Self-hosters who want one encrypted, searchable archive across several Matrix accounts"

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "supported"
sso = "unknown"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "unsupported"
oauth = "supported"
invisible_crypto = "unknown"
image_packs = "unknown"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "supported"

[extra.packages]
windows_installer = "https://github.com/matrix-axon/matrix-axon/releases"
macos_installer = "https://github.com/matrix-axon/matrix-axon/releases"
other_linux_link = "https://github.com/matrix-axon/matrix-axon/releases"
+++

Axon is a self-hosted personal agent for Matrix. It runs on your own MacOS, Linux, or Windows hardware or cloud instance (available as a Docker stack, Debian package, homebrew install, or direct download), keeps your decrypted history, full-text search and media cache in a local Postgres database, and serves them to two first-party clients: a web client (also packaged as a desktop app for macOS, Windows and Linux and iOS and Android mobile apps) and a terminal UI with inline image rendering, full-text search, threads, replies, and reactions. One Axon can hold several Matrix accounts at once.
