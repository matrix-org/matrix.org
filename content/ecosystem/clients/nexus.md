+++
title = "Nexus"

[extra]
thumbnail = "nexus.svg"
maintainer = "Henry Hiles"
licence = "GPL-3.0-only"
maturity = "Stable"
repo = "https://git.federated.nexus/Nexus/nexus"
website = "https://nexus.federated.nexus"
screenshots = ["nexus-screenshot.avif"]
good_for = "Users who want a simple, modern client that works on desktop and mobile"
matrix_room = "#nexus:federated.nexus"
featured = false

[extra.features.1stable]
e2ee = "supported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "supported"
sso = "unsupported"
voip_jitsi = "unsupported"
multi_account = "supported"
multi_language = "unsupported"
oauth = "supported"
invisible_crypto = "unsupported"
image_packs = "supported"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "unsupported"

[extra.packages]
windows_installer = "https://nexus.federated.nexus/releases/latest"
macos_installer = "https://nexus.federated.nexus/releases/latest"
other_linux_link = "https://nexus.federated.nexus/#nightly-flatpak-repo"
+++

A simple and user-friendly Matrix client made with Flutter and a Gomuks backend.
