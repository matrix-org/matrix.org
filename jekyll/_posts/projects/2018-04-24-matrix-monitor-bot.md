---
layout: project
title: matrix-monitor-bot
categories: projects bot
description: A bot to measure latency between homeservers.
author: Travis Ralston
maturity: Alpha
language: Go
license: Apache
repo: https://github.com/turt2live/matrix-monitor-bot
---

# {{ page.title }}
#monitorbot:t2bot.io is a bot to measure latency between homeservers (as perceived by users).

It’s able to report metrics to Prometheus and has it’s own built-in dashboard (see <https://lag.t2bot.io/> for some horrendous times). In the coming weeks it’ll become more production-ready, however in the meantime if people are looking to help iron out the scalability issues, please run an instance on your homeserver.

Repository: <{{page.repo}}>
