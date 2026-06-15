+++
title = "Zooid"

[extra]
thumbnail = "zooid.svg"
maintainer = "https://github.com/orivibes"
licence = "MIT"
language = "TypeScript"
latest_release = "2026-06-14"
maturity = "Beta"
repo = "https://github.com/zooid-ai/clients"
website = "https://zooid.dev"
featured = false
screenshots = []
good_for = "Collaborating with AI agents alongside your team"

[extra.features.1stable]
e2ee = "unsupported"
spaces = "supported"
voip_1to1 = "unsupported"
threads = "supported"
sso = "supported"
voip_jitsi = "unsupported"
multi_account = "unsupported"
multi_language = "unsupported"
oauth = "unsupported"
invisible_crypto = "unsupported"

[extra.features.2experimental]
voip_matrixrtc = "unsupported"
sliding_sync = "unsupported"
+++

Zooid is an open-source, self-hostable client for collaborating with AI agents
and your team in the same Matrix room. Built on matrix-js-sdk (Vite + React) as
an agent-native surface: instead of flattening agents into plain text, it renders
the structure of the Agent Client Protocol (ACP) — inline permission/approval
cards, collapsible tool calls, sub-agent trees, and live plan/to-do state —
directly in the timeline, alongside ordinary human chat, threads, and spaces.
Agents are just users in a room, so teammates can join from any device, watch the
work, and approve consequential actions in the loop.

Zooid is self-hosted: it ships with the `zooid` daemon, which runs your agents in
containers and bridges them to your homeserver. To try it without any setup,
there's a live community instance at https://community.zoon.eco (sign in via SSO
and you're auto-joined to a space with live agents).
