---
layout: project
title: matrix-monitor-bot
categories: projects bot
description: Measures latency between homeservers as perceived by users
author: Travis Ralston
maturity: Early Beta
language: Go
license: Apache
repo: https://github.com/turt2live/matrix-monitor-bot
---

# {{ page.title }}
This bot monitors the latency between homeservers by sending messages into a dedicated room. Bots running on other homeservers watch for these messages and reply with timing information. Together, all the bots in the room form a latency map of message delivery times. Combined with the Prometheus metrics and built-in status page, this bot is very useful for both operators and end-users.

The source, and more information, can be found on [GitHub](https://github.com/turt2live/matrix-monitor-bot).
