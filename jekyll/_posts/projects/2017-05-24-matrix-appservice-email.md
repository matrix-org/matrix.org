---
layout: projectimage
title: Matrix Email Bridge
categories: projects bridge
thumbnail: /docs/projects/images/email-icon.svg
description: Two ways Email<->Matrix bridge
author: Kamax.io and Open-Xchange
maturity: Alpha
language: Java
license: AGPL3
repo: https://github.com/kamax-io/matrix-appservice-email
room: "#mxasd-email:kamax.io"
featured: "TRUE"
bridges: "Email"
---

An application service gateway for bridging between Email and Matrix, written using Spring Boot (Java) using [matrix-java-sdk](https://github.com/kamax-io/matrix-java-sdk). 
You can get the [code on github](https://github.com/kamax-io/matrix-appservice-email).

Features:
- Matrix to Email forwarding
- Email to Matrix forwarding
- Email <-> Matrix <-> Email forwarding, if several bridge users are present within a room
- Fully configuration notification templates, per event
- Subscription portal where E-mail users can manage their notifications

It can be self hosted, and it is also available from t2bot.io at <https://t2bot.io/email>.
