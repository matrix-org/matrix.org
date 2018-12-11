---
layout: projectimage
title: botkit-matrix
categories: projects sdk
description: A Botkit connector for Matrix
author: frankgerhardt
maturity: Alpha
language: JavaScript
license: Apache
repo: https://github.com/frankgerhardt/botkit-matrix
---

A Botkit connector for Matrix

### Install

```$ npm install botkit-matrix```

### Usage

```JavaScript
let config = {
    'baseUrl': 'https://matrix.org',
    'botUserId': '@youruserid:matrix.org',
    'password': 'yourpassword',
    'localStorage': 'filepath'
};

require('botkit-matrix').MatrixController(config)
.then((controller) => {

    controller.hears(['hi', 'hello'], 'message_received', function (bot, message) {
        bot.reply(message, "Hello, world!");
    });
});
```

You can get a sample bot at [botkit-matrix-sample](https://github.com/frankgerhardt/botkit-matrix-sample)

For more features see [Botkit Core](https://botkit.ai/docs/core.html)

Repository: <{{page.repo}}>
