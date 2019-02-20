---
layout: projectimage
title: matrix-puppet-slack
categories: projects as
thumbnail: /docs/projects/images/slack-logo.svg
description: puppet style slack bridge for matrix
author: Keyvan Fatehi
maturity: Beta
language: JavaScript
license: 
repo: https://github.com/matrix-hacks/matrix-puppet-slack
featured: "TRUE"
bridges: "Slack"
---

This is an unofficial matrix slack bridge that works by means of [user puppetting](https://github.com/AndrewJDR/matrix-puppet-bridge).

Get your `user_access_token` from here:

https://api.slack.com/docs/oauth-test-tokens

The bridge uses that access token to connect as a client using the slack RTM API.

This technique does not require admin on the slack team; instead, the bridge is simply a custom slack client.

The bridge supports multiple teams at once, see the config.sample.json
