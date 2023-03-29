+++
title = "Discord"
weight = 100
template = "ecosystem/bridge_implementations.html"

[extra.implementations.matrix-appservice-discord]
maintainer = "Matrix.org Foundation"
summary = "This project bridges Discord to Matrix via the Application Service API"
maturity = "Beta"
language = "TypeScript"
license = "Apache-2.0"
repo = "https://github.com/matrix-org/matrix-appservice-discord"
room = "#discord:matrix.org"
featured = true
privilege.platform = "Admin" # Free text
privilege.matrix = "Homeserver Admin" # Any of Homeserver Admin, Room Admin, None
[extra.implementations.matrix-appservice-discord.supports]
dm = true
channels = true
formatted_text = true
message_media = true
replies = true
mentions = true 
threads = false
redactions = true
editing = true
reactions = true
presence = true
typing_notifications = false

[extra.implementations.mautrix-discord]
maintainer = "Tulir"
summary = "A Matrix-Discord puppeting bridge"
maturity = "Beta"
language = "Go"
license = "AGPL-3.0-or-later"
repo = "https://github.com/mautrix/discord"
room = "#discord:maunium.net"
featured = true
privilege.platform = "None"
privilege.matrix = "None"
[extra.implementations.mautrix-discord.supports]
dm = true
channels = true
formatted_text = true
message_media = true
replies = true
mentions = true 
threads = true
redactions = true
editing = true
reactions = true
presence = true
typing_notifications = true
+++
