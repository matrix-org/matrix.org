+++
title = "Sable"

[extra]
thumbnail = "sable.svg"
maintainer = "Seven"
licence = "AGPL-3.0-or-later (with an additional permission)"
maturity = "Stable"
repo = "https://git.sable.moe/SableClient/Sable-next"
website = "https://docs.sable.moe/"
matrix_room = "#sable:sable.moe"
featured = false

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
sso = "supported"
threads = "supported"
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
windows_installer = "https://git.sable.moe/SableClient/sable-next/releases/latest"
macos_installer = "https://git.sable.moe/SableClient/sable-next/releases/latest"
google_play_store.app_id = "moe.sable.client"
apple_app_store = { app_id = "id6820482696", org = "sable-chat" }
flathub.app_id = "moe.sable.client"
webapp = "https://app.sable.moe/"
other_linux_link = "https://git.sable.moe/SableClient/sable-next/releases/latest"
+++

An almost stable Matrix client with end-to-end encryption, spaces, threads, multiple accounts, and voice and video calls.

Also available from the [AUR](https://aur.archlinux.org/packages/sable-bin),
[Homebrew](https://git.sable.moe/SableClient/homebrew-sable), and
[IzzyOnDroid](https://apt.izzysoft.de/packages/moe.sable.client).
iOS builds can be installed using
[AltStore or SideStore](https://git.sable.moe/SableClient/sable-next#altstore-sidestore).
[Forgejo releases](https://git.sable.moe/SableClient/sable-next/releases/latest)
provide downloads for Windows, macOS, Linux (AppImage, deb, rpm), Android, and iOS.

The web client can be [self-hosted with Docker](https://git.sable.moe/SableClient/sable-next/src/branch/main/docs/web.md)
using the `git.sable.moe/sableclient/sable-next:latest` image.
